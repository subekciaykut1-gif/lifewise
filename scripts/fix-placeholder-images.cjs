const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(process.cwd(), 'content/articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

// Pool of valid Unsplash IDs per category based on existing working articles
const POOL_FILE = path.join(__dirname, '..', 'unsplash-ids-pool.json');
let pool = { categoryPool: {} };

if (fs.existsSync(POOL_FILE)) {
  pool = JSON.parse(fs.readFileSync(POOL_FILE, 'utf8'));
}

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
  
  // Refresh images that are generic or LoremFlickr
  const isGeneric = !data.image || 
                  data.image === "" || 
                  data.image.includes('picsum.photos') || 
                  data.image.includes('photo-1?') ||
                  data.image.includes('loremflickr.com'); 

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

    // Pick from pool if possible
    const categoryPool = pool.categoryPool[category] || [];
    if (categoryPool.length > 0) {
      const index = seed % categoryPool.length;
      const baseUrl = categoryPool[index];
      // Append sig and auto-format for uniqueness and quality
      data.image = `${baseUrl}?auto=format&fit=crop&q=80&w=1200&sig=${seed}`;
    } else {
      // Fallback to high-quality Unsplash keyword-based random if pool is empty
      data.image = `https://images.unsplash.com/photo-1?auto=format&fit=crop&q=80&w=1200&sig=${seed}&q=${keywords}`;
    }
    
    const newFileContent = matter.stringify(body, data);
    fs.writeFileSync(filePath, newFileContent);
    updatedCount++;
  }
});

console.log(`Successfully updated ${updatedCount} articles with unique seeded images.`);

