const fs = require('fs');
const path = require('path');

const targets = ['lip-care-279', 'lip-care-495', 'cuticle-care-383', 'eyebrow-shape', 'foundation-match', 'nail-strengthening-391', 'nail-strengthening', 'concealer-tips-351', 'concealer-tips-567', 'cuticle-care'];
const articlesDir = path.join(__dirname, 'content', 'articles');
const reportPath = path.join(__dirname, 'thin-articles-report.txt');

let report = fs.readFileSync(reportPath, 'utf8');
const banned = ["Consistency beats intensity", "doesn't always require expensive tools", "Pick one area to focus"];

console.log("Verification Results:");
for (const slug of targets) {
  const content = fs.readFileSync(path.join(articlesDir, slug + '.mdx'), 'utf8');
  const words = content.trim().split(/\s+/).filter(w => w.length > 0).length;
  
  const hasBanned = banned.some(b => content.includes(b));
  console.log(`${slug}: ${words} words | Banned Phrases: ${hasBanned ? 'FAIL' : 'PASS'}`);
  
  // Update report
  const lineRegex = new RegExp(`^${slug} \\| ([^\\|]+) \\| \\d+ words \\[TEMPLATE_SHELL\\]$`, 'm');
  report = report.replace(lineRegex, `${slug} | $1 | ${words} words [REWRITTEN]`);
}

fs.writeFileSync(reportPath, report, 'utf8');
console.log("Report updated.");
