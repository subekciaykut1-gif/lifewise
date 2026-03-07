require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log('🚀 Adding publish_at field to quizzes table...');
  try {
    await sql`
      ALTER TABLE quizzes 
      ADD COLUMN IF NOT EXISTS publish_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
    `;
    console.log('✅ Migration successful.');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

migrate();
