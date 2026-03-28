const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, 'thin-articles-report.txt');
const articlesDir = path.join(__dirname, 'content', 'articles');

const lines = fs.readFileSync(reportPath, 'utf-8').split('\n');
const templateShells = [];

for (const line of lines) {
  if (line.includes('[TEMPLATE_SHELL]')) {
    const slug = line.split(' | ')[0].trim();
    const filePath = path.join(articlesDir, slug + '.mdx');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const catMatch = content.match(/category:\s*'?([^'\n]+)'?/);
      let cat = 'unknown';
      if (catMatch) {
         cat = catMatch[1].trim();
      }
      templateShells.push({ slug, category: cat });
    }
  }
}

templateShells.sort((a, b) => a.category.localeCompare(b.category));
console.log(templateShells.slice(0, 10).map(t => `${t.slug} (${t.category})`).join('\n'));
