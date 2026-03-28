const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

const reportLines = [];
let thinCount = 0;
let templateShellCount = 0;

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract frontmatter
  const titleMatch = content.match(/title:\s*"([^"]+)"/);
  const catMatch = content.match(/category:\s*"([^"]+)"/);
  
  const title = titleMatch ? titleMatch[1] : "Unknown";
  const category = catMatch ? catMatch[1] : "Unknown";
  const slug = file.replace('.mdx', '');
  
  // Strip frontmatter
  const bodyMatch = content.match(/---\n[\s\S]*?\n---\n([\s\S]*)$/);
  const body = bodyMatch ? bodyMatch[1] : content;
  
  const words = body.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  
  // Check for template shell flags
  const hasPhrase1 = body.includes("doesn't always require expensive tools");
  const hasPhrase2 = body.includes("Consistency beats intensity");
  const hasPhrase3 = body.includes("Pick one area to focus on this week");
  const isTemplateShell = hasPhrase1 && hasPhrase2 && hasPhrase3;
  
  if (wordCount < 350 || isTemplateShell) {
    let flag = "";
    if (isTemplateShell) {
      flag = " [TEMPLATE_SHELL]";
      templateShellCount++;
    }
    if (wordCount < 350) {
      thinCount++;
    }
    reportLines.push({ slug, category, wordCount, flag });
  }
});

reportLines.sort((a, b) => a.wordCount - b.wordCount);

let reportText = `Total Thin/Templated Articles Found: ${reportLines.length} (Thin: ${thinCount}, Template Shell: ${templateShellCount})\n\n`;
reportLines.forEach(line => {
  reportText += `${line.slug} | ${line.category} | ${line.wordCount} words${line.flag}\n`;
});

fs.writeFileSync(path.join(__dirname, 'thin-articles-report.txt'), reportText, 'utf-8');
console.log('Fix 3 report generated.');
