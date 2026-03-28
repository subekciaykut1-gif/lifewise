const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(__dirname, '..', 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: body } = matter(content);

  // If publishedAt exists but date doesn't, sync them
  if (data.publishedAt && !data.date) {
    data.date = data.publishedAt.split('T')[0];
    const newContent = matter.stringify(body, data);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Fixed metadata for: ${file}`);
  }
});
console.log("Metadata sync complete.");
