const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(process.cwd(), 'content/articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

let placeholderCount = 0;

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);
  
  if (data.image && data.image.includes('photo-1?')) {
    placeholderCount++;
  }
});

console.log(`Total articles with placeholder images: ${placeholderCount}`);
