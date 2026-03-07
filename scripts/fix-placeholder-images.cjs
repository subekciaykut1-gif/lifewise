const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(process.cwd(), 'content/articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

// Pool of valid Unsplash IDs per category based on existing working articles
const VALID_IMAGES = {
  cleaning: [
    "https://images.unsplash.com/photo-1638405803126-d12de49c7d47?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1638949493140-edb10b7be2f3?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1469504512102-900f29606341?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1589226849736-8d0e0c78e869?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1612705166546-641e59cef326?auto=format&fit=crop&q=80&w=1200"
  ],
  health: [
    "https://images.unsplash.com/photo-1663089590359-6ec775dd518e?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1621135177072-57c9b6242e7a?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1588413333412-82148535db53?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1617854307432-13950e24ba07?auto=format&fit=crop&q=80&w=1200"
  ],
  food: [
    "https://images.unsplash.com/photo-1677437035387-26049940fb90?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1667499745120-f9bcef8f584e?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1643494847705-74808059bf07?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1683555500010-e2315045eef9?auto=format&fit=crop&q=80&w=1200"
  ],
  "home-and-garden": [
    "https://images.unsplash.com/photo-1678108040468-0cc9addd984d?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1553275991-b6ba99f234e1?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1769146108386-b622a42acd90?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1601760561441-16420502c7e0?auto=format&fit=crop&q=80&w=1200"
  ],
  "life-hacks": [
    "https://images.unsplash.com/photo-1507281549113-040fcfef650e?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1506452819137-0422416856b8?auto=format&fit=crop&q=80&w=1200"
  ],
  beauty: [
    "https://images.unsplash.com/photo-1626783416763-67a92e5e7266?auto=format&fit=crop&q=80&w=1200"
  ],
  diy: [
    "https://images.unsplash.com/photo-1608752503578-52f35965e3d9?auto=format&fit=crop&q=80&w=1200"
  ]
};

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: body } = matter(content);
  
  const isGeneric = !data.image || 
                  data.image === "" || 
                  data.image.includes('picsum.photos') || 
                  data.image.includes('photo-1?');

  if (isGeneric) {
    const category = data.image?.includes('cleaning') ? 'cleaning' : (data.category || 'life-hacks');
    
    // Create a unique integer seed from the filename
    let hash = 0;
    for (let i = 0; i < file.length; i++) {
      hash = ((hash << 5) - hash) + file.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    const seed = Math.abs(hash);

    // Use LoremFlickr for relevance + lock for uniqueness
    // lock ensures the same seed always gets the same image
    data.image = `https://loremflickr.com/1200/800/${category}?lock=${seed}`;
    
    const newFileContent = matter.stringify(body, data);
    fs.writeFileSync(filePath, newFileContent);
    updatedCount++;
  }
});

console.log(`Successfully updated ${updatedCount} articles with unique seeded images.`);

