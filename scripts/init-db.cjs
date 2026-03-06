require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function init() {
  console.log('🚀 Initializing article_views table in Neon...');
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS article_views (
        id SERIAL PRIMARY KEY,
        category TEXT NOT NULL,
        slug TEXT NOT NULL,
        views INTEGER DEFAULT 0,
        UNIQUE(category, slug)
      );
    `;
    console.log('✅ Table created or already exists.');
  } catch (error) {
    console.error('❌ Error initializing table:', error);
  }
}

init();
