const fs = require('fs');
const path = require('path');

const targets = [
  'lip-care-279', 'lip-care-495', 'cuticle-care-383', 'eyebrow-shape', 'foundation-match',
  'nail-strengthening-391', 'nail-strengthening', 'concealer-tips-351', 'concealer-tips-567', 'cuticle-care'
];

const articlesDir = path.join(__dirname, 'content', 'articles');
const results = {};

for (const slug of targets) {
  const filePath = path.join(articlesDir, slug + '.mdx');
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract frontmatter block
    const fmMatch = content.match(/^(---[\s\S]*?---)/);
    const frontmatter = fmMatch ? fmMatch[1] : '';
    
    // Extract affiliate block (usually at the bottom starting with ###)
    const affMatch = content.match(/(### \[.*\][\s\S]*?wisetips-20\))/);
    const affiliate = affMatch ? affMatch[1] : '';
    
    results[slug] = {
      title: content.match(/title:\s*'?([^'\n]+)'?/)?.[1] || slug,
      category: 'beauty',
      frontmatter,
      affiliate
    };
  }
}

fs.writeFileSync(path.join(__dirname, 'temp-targets.json'), JSON.stringify(results, null, 2), 'utf-8');
console.log('Targets extracted to temp-targets.json');
