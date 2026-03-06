require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const VIEWS_FILE = path.join(process.cwd(), 'data', 'article-views.json');

async function migrate() {
  if (!fs.existsSync(VIEWS_FILE)) {
    console.log('ℹ️ No existing views file found. Skipping migration.');
    return;
  }

  const raw = fs.readFileSync(VIEWS_FILE, 'utf8');
  const viewsMap = JSON.parse(raw);
  const keys = Object.keys(viewsMap);

  console.log(`🚀 Migrating ${keys.length} entries to Neon...`);

  let count = 0;
  for (const key of keys) {
    const [category, slug] = key.split('/');
    const views = viewsMap[key];

    try {
      await sql`
        INSERT INTO article_views (category, slug, views)
        VALUES (${category}, ${slug}, ${views})
        ON CONFLICT (category, slug)
        DO UPDATE SET views = EXCLUDED.views;
      `;
      count++;
      if (count % 50 === 0) console.log(`  Processed ${count}/${keys.length}...`);
    } catch (error) {
      console.error(`❌ Error migrating ${key}:`, error);
    }
  }

  console.log(`✅ Migration complete. ${count} records processed.`);
}

migrate();
