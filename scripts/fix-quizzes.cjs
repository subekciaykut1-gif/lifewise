require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1200`;

const updates = [
  // Backdate structured quizzes so there's content NOW
  { slug: 'spring-cleaning-masterclass', date: '2026-03-01T09:00:00Z', currentImage: true },
  { slug: 'herb-gardener-challenge', date: '2026-03-02T09:00:00Z', currentImage: true },
  { slug: 'eco-warrior-trivia', date: '2026-03-03T09:00:00Z', currentImage: true },
  
  // Fix images for seasonal auto-generated quizzes (they all got the sunset default)
  { slug: 'bbq-master-quiz', img: unsplash('1529193591184-b1d58069ecdd') }, // grill
  { slug: 'heatwave-survival', img: unsplash('1504386106331-3e4e71712b38') }, // fan/ice
  { slug: 'back-to-school-guru', img: unsplash('1503676260728-1c00da094a0b') }, // school supplies
  { slug: 'fall-deep-clean', img: unsplash('1508247656621-e3009d1ddff6') }, // leaves/autumn
  { slug: 'the-turkey-master', img: unsplash('1511690554-7f15494d40b9') }, // turkey
  { slug: 'holiday-stress-buster', img: unsplash('1512413910385-d7bc00bd78a9') }, // holiday tree
];

async function fixQuizzes() {
  console.log('Fixing quiz dates and images...');
  try {
    for (const u of updates) {
      if (u.date) {
        await sql`UPDATE quizzes SET publish_at = ${u.date} WHERE slug = ${u.slug}`;
        console.log(`Backdated ${u.slug}`);
      }
      if (u.img) {
        await sql`UPDATE quizzes SET image_url = ${u.img} WHERE slug = ${u.slug}`;
        console.log(`Updated image for ${u.slug}`);
      }
    }
    console.log('Done!');
  } catch (err) {
    console.error(err);
  }
}

fixQuizzes();
