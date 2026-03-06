/**
 * Run once to create the article_reactions table in Neon.
 * Usage: node scripts/init-reactions.cjs
 */
require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

async function main() {
  const sql = neon(process.env.DATABASE_URL);
  await sql`
    CREATE TABLE IF NOT EXISTS article_reactions (
      id          SERIAL PRIMARY KEY,
      category    TEXT NOT NULL,
      slug        TEXT NOT NULL,
      emoji       TEXT NOT NULL,
      count       INTEGER NOT NULL DEFAULT 0,
      UNIQUE (category, slug, emoji)
    )
  `;
  console.log('✅ article_reactions table ready');
}

main().catch(console.error);
