require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

async function initBookmarksDb() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not defined in .env.local');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log('Creating user_bookmarks table...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS user_bookmarks (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        article_slug VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, article_slug),
        CONSTRAINT fk_user
          FOREIGN KEY(user_id) 
          REFERENCES users(id)
          ON DELETE CASCADE
      );
    `;
    
    // Add index for faster reads when filtering by user
    await sql`
      CREATE INDEX IF NOT EXISTS idx_user_bookmarks_user_id ON user_bookmarks(user_id);
    `;

    console.log('Successfully created user_bookmarks table and indexes.');
  } catch (error) {
    console.error('Error creating bookmarks table:', error);
  }
}

initBookmarksDb();
