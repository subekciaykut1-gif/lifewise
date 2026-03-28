const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

let fixedCount = 0;
const fixedFiles = [];

const categoryReplacements = {
  food: "For best results, many people use high-quality kitchen tools and fresh ingredients to make the preparation easier.",
  home: "For best results, many people use reliable household staples and organizers to keep their space tidy.",
  health: "For best results, maintaining a consistent daily routine can make achieving your wellness goals much easier.",
  money: "For best results, setting up automated tracking systems can make managing your budget significantly easier.",
  'life-hacks': "For best results, combining these simple tricks with everyday items makes the whole process much easier.",
};

function generateReplacement(title, category) {
  // If we have a specific category string, use it, otherwise fallback
  const fallback = `For best results when applying these tips about ${title.toLowerCase()}, taking a consistent approach makes everything easier.`;
  return categoryReplacements[category] || fallback;
}

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const brokenRegex = /For best results, many people use a quality\s*to make the job easier\./g;
  
  if (brokenRegex.test(content)) {
    // Extract title and category from frontmatter
    const titleMatch = content.match(/title:\s*"([^"]+)"/);
    const catMatch = content.match(/category:\s*"([^"]+)"/);
    
    const title = titleMatch ? titleMatch[1] : "this topic";
    const category = catMatch ? catMatch[1] : "life-hacks";
    
    const replacement = generateReplacement(title, category);
    content = content.replace(brokenRegex, replacement);
    
    fs.writeFileSync(filePath, content, 'utf-8');
    fixedCount++;
    fixedFiles.push(file);
  }
});

console.log(`Fix 1 complete. Fixed ${fixedCount} files.`);
// console.log("Files fixed:", fixedFiles.join(", "));
