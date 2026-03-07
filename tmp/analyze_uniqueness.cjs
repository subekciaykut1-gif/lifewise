const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(process.cwd(), 'content/articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

const allImages = new Set();
const categoryCounts = {};

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);
  
  if (data.image && data.image.includes('unsplash.com') && !data.image.includes('photo-1?')) {
    allImages.add(data.image);
    const cat = data.category || 'misc';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  }
});

console.log(`Total unique Unsplash images found: ${allImages.size}`);
console.log('Images per category (with duplicates):', categoryCounts);
