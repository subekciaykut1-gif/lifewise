const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const POOL_FILE = path.join(__dirname, '..', 'unsplash-ids-pool.json');
const CATEGORIES = ['cleaning', 'food', 'health', 'home-and-garden', 'life-hacks', 'beauty', 'diy'];

if (!ACCESS_KEY) {
  console.error('Error: UNSPLASH_ACCESS_KEY is missing in .env.local');
  process.exit(1);
}

async function fetchImagesForCategory(category) {
  console.log(`Fetching images for category: ${category}...`);
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${category}&per_page=30&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Unsplash API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    // Extract base URLs (without query params) for the pool
    return data.results.map(img => img.urls.raw.split('?')[0]);
  } catch (error) {
    console.error(`Failed to fetch images for ${category}:`, error.message);
    return [];
  }
}

async function main() {
  let pool = { categoryPool: {}, restorations: {} };

  if (fs.existsSync(POOL_FILE)) {
    pool = JSON.parse(fs.readFileSync(POOL_FILE, 'utf8'));
  }

  for (const category of CATEGORIES) {
    const newImages = await fetchImagesForCategory(category);
    
    if (newImages.length > 0) {
      const existing = pool.categoryPool[category] || [];
      // Combine and filter duplicates
      const updatedPool = [...new Set([...existing, ...newImages])];
      pool.categoryPool[category] = updatedPool;
      console.log(`Updated ${category} pool with ${newImages.length} new images (total: ${updatedPool.length}).`);
    }

    // Small delay to respect rate limits if needed (though 50/hour is plenty for a one-off)
    await new Promise(r => setTimeout(r, 1000));
  }

  fs.writeFileSync(POOL_FILE, JSON.stringify(pool, null, 2));
  console.log('Successfully updated unsplash-ids-pool.json');
}

main();
