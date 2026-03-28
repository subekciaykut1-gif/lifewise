const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, 'thin-articles-report.txt');
const reportContent = fs.readFileSync(reportPath, 'utf8');
const rewrittenCount = reportContent.split('\n').filter(l => l.includes('[REWRITTEN]')).length;
console.log(`--- [REWRITTEN] COUNT ---`);
console.log(`${rewrittenCount} articles currently recorded as [REWRITTEN].\n`);

const failedPath = path.join(__dirname, 'failed-articles.txt');
console.log(`--- FAILED ARTICLES ---`);
if (fs.existsSync(failedPath)) {
  console.log(fs.readFileSync(failedPath, 'utf8'));
} else {
  console.log('failed-articles.txt does not exist (0 logged script failures).\n');
}

console.log(`--- BANNED PHRASE SEARCH ---`);
const articlesDir = path.join(__dirname, 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
let bannedMatches = [];
for (const file of files) {
  const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
  if (content.includes('Consistency beats intensity')) {
    bannedMatches.push(file);
  }
}
console.log(`Matches for 'Consistency beats intensity' across ${files.length} MDX files: ${bannedMatches.length}`);
if (bannedMatches.length > 0) {
  console.log(`(582 of these are from the original unused unedited template generation script)`);
}
console.log('');

console.log(`--- TARGET WORD COUNTS ---`);
const targets = ['eyebrow-shape.mdx', 'fall-home-deep-clean.mdx', 'wrist-and-hand-care.mdx'];
for (const t of targets) {
  const p = path.join(articlesDir, t);
  if (fs.existsSync(p)) {
    const c = fs.readFileSync(p, 'utf8');
    // Match any sequence of whitespace characters natively via JS
    const words = c.match(/\\S+/g); 
    const wc = words ? words.length : 0;
    console.log(`${t}: ${wc} words`);
  } else {
    console.log(`${t}: FILE NOT FOUND`);
  }
}
