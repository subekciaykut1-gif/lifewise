require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function check() {
  const quizzes = await sql`SELECT slug, image_url FROM quizzes WHERE is_active = true AND publish_at <= NOW()`;
  console.log(quizzes);
}

check().catch(console.error);
