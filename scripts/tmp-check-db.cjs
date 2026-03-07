require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

async function check() {
  const quizzes = await sql`SELECT slug, title, image_url, publish_at, is_active FROM quizzes ORDER BY publish_at DESC LIMIT 5`;
  console.log(quizzes);
}

check().catch(console.error);
