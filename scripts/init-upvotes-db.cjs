require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

async function initUpvotesDb() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not defined in .env.local');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log('Creating article_upvotes table...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS article_upvotes (
        slug VARCHAR(255) PRIMARY KEY,
        upvotes INTEGER NOT NULL DEFAULT 0,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    console.log('Successfully created article_upvotes table.');
  } catch (error) {
    console.error('Error creating upvotes table:', error);
  }
}

initUpvotesDb();
