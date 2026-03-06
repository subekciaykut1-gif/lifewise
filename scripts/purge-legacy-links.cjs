const fs = require('fs');
const path = require('path');

const articlesDir = path.join(process.cwd(), 'content/articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

const LEGACY_LINK_PATTERN = /\[[^\]]+\]\(https:\/\/amazon\.com\/dp\/B00004SPEU\)/g;

let removedCount = 0;
let filesAffected = 0;

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (LEGACY_LINK_PATTERN.test(content)) {
    const newContent = content.replace(LEGACY_LINK_PATTERN, '');
    fs.writeFileSync(filePath, newContent);
    removedCount += (content.match(LEGACY_LINK_PATTERN) || []).length;
    filesAffected++;
  }
});

console.log(`Successfully removed ${removedCount} legacy links from ${filesAffected} files.`);
