require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function init() {
  console.log('🚀 Initializing survey tables in Neon...');
  try {
    // 1. Create Surveys table
    await sql`
      CREATE TABLE IF NOT EXISTS surveys (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        type TEXT DEFAULT 'general',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Create Survey Options table (with vote counts for performance)
    await sql`
      CREATE TABLE IF NOT EXISTS survey_options (
        id SERIAL PRIMARY KEY,
        survey_id INTEGER REFERENCES surveys(id) ON DELETE CASCADE,
        label TEXT NOT NULL,
        vote_count INTEGER DEFAULT 0
      );
    `;

    console.log('✅ Tables created successfully.');

    // 3. Seed a default survey if none exists
    const existing = await sql`SELECT id FROM surveys LIMIT 1`;
    if (existing.length === 0) {
      console.log('🌱 Seeding initial survey...');
      const [survey] = await sql`
        INSERT INTO surveys (question, type) 
        VALUES ('Which cleaning hack is most useful for you?', 'sidebar') 
        RETURNING id
      `;
      
      await sql`
        INSERT INTO survey_options (survey_id, label) VALUES 
        (${survey.id}, 'Baking Soda & Vinegar'),
        (${survey.id}, 'Lemon & Salt'),
        (${survey.id}, 'Microfiber Magic'),
        (${survey.id}, 'Steam Power')
      `;
      console.log('✅ Initial survey seeded.');
    }

  } catch (error) {
    console.error('❌ Error initializing survey tables:', error);
  }
}

init();
