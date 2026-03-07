const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(process.cwd(), 'content/articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

// Pool of valid Unsplash IDs per category based on existing working articles
const STOP_WORDS = new Set(['the', 'and', 'for', 'with', 'your', 'best', 'tips', 'guide', 'how', 'to', 'this', 'that', 'from', 'uses', 'into', 'top', 'simple', 'easy', 'practical', 'master', 'searching', 'place', 'right', 'effective']);

function getKeywordsFromTitle(title, category) {
  const words = title.toLowerCase().split(/[^a-z]+/).filter(w => w.length > 3 && !STOP_WORDS.has(w));
  // Take up to 2 key words + the category
  const keywords = [...new Set([category, ...words])].slice(0, 3);
  return keywords.join(',');
}

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: body } = matter(content);
  
  // Force update to refresh relevance with new title-based keywords
  const isGeneric = !data.image || 
                  data.image === "" || 
                  data.image.includes('picsum.photos') || 
                  data.image.includes('photo-1?') ||
                  data.image.includes('loremflickr.com'); // Force refresh LoremFlickr too

  if (isGeneric) {
    const category = data.category || 'life-hacks';
    const keywords = getKeywordsFromTitle(data.title, category);
    
    // Create a unique integer seed from the filename
    let hash = 0;
    for (let i = 0; i < file.length; i++) {
      hash = ((hash << 5) - hash) + file.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    const seed = Math.abs(hash);

    // Use LoremFlickr with title-based keywords + lock for uniqueness
    data.image = `https://loremflickr.com/1200/800/${keywords}?lock=${seed}`;
    
    const newFileContent = matter.stringify(body, data);
    fs.writeFileSync(filePath, newFileContent);
    updatedCount++;
  }
});

console.log(`Successfully updated ${updatedCount} articles with unique seeded images.`);

