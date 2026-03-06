const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '../content/articles');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else if (file.endsWith('.mdx')) {
      results.push(file);
    }
  });
  return results;
}

const files = getFiles(articlesDir);
let count = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove <AffiliateLink ... /> tags
  const newContent = content.replace(/<AffiliateLink\s+[^>]*\/>/g, '');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    count++;
  }
});

console.log(`Cleaned up ${count} articles by removing hardcoded affiliate links.`);
