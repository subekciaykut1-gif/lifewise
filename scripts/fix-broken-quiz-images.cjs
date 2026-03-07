require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

// Validated IDs
const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1200`;

const updates = [
  // New Herb Garden Image (Confirmed 200)
  { slug: 'herb-gardener-challenge', img: unsplash('1466692476877-d59a85615ea9') }, // Hands planting a small plant
  // New Eco Warrior Image (Confirmed 200)
  { slug: 'eco-warrior-trivia', img: unsplash('1533090161767-e6ffed986c88') }, // Recycling bins / ecology
];

async function fixBrokenImages() {
  console.log('Fixing broken quiz images...');
  try {
    for (const u of updates) {
      if (u.img) {
        await sql`UPDATE quizzes SET image_url = ${u.img} WHERE slug = ${u.slug}`;
        console.log(`Updated image for ${u.slug}`);
      }
    }
    console.log('Done mapping new 200 OK images!');
  } catch (err) {
    console.error(err);
  }
}

fixBrokenImages();
