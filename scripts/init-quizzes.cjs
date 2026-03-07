require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function init() {
  console.log('🚀 Initializing quiz tables in Neon...');
  try {
    // 1. Create Quizzes table
    await sql`
      CREATE TABLE IF NOT EXISTS quizzes (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Create Quiz Questions table
    await sql`
      CREATE TABLE IF NOT EXISTS quiz_questions (
        id SERIAL PRIMARY KEY,
        quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        image_url TEXT,
        order_index INTEGER DEFAULT 0
      );
    `;

    // 3. Create Quiz Options table
    await sql`
      CREATE TABLE IF NOT EXISTS quiz_options (
        id SERIAL PRIMARY KEY,
        question_id INTEGER REFERENCES quiz_questions(id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        is_correct BOOLEAN DEFAULT false,
        explanation TEXT
      );
    `;

    // 4. Create Quiz Outcomes table
    await sql`
      CREATE TABLE IF NOT EXISTS quiz_outcomes (
        id SERIAL PRIMARY KEY,
        quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
        min_score INTEGER NOT NULL,
        max_score INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT
      );
    `;

    console.log('✅ Quiz tables created successfully.');

    // 5. Seed initial "LifeWise Trivia" quiz
    const existing = await sql`SELECT id FROM quizzes WHERE slug = 'lifewise-essentials-trivia'`;
    if (existing.length === 0) {
      console.log('🌱 Seeding "LifeWise Essentials Trivia"...');
      
      const [quiz] = await sql`
        INSERT INTO quizzes (title, slug, category, description, image_url) 
        VALUES (
          'LifeWise Essentials Trivia', 
          'lifewise-essentials-trivia', 
          'life-hacks', 
          'Test your knowledge on the ultimate life hacks and cleaning tricks!',
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200'
        ) 
        RETURNING id
      `;

      // Question 1
      const [q1] = await sql`
        INSERT INTO quiz_questions (quiz_id, text, order_index) 
        VALUES (${quiz.id}, 'What is the "magic" ingredient for removing persistent laundry odors naturally?', 0)
        RETURNING id
      `;
      await sql`
        INSERT INTO quiz_options (question_id, text, is_correct, explanation) VALUES 
        (${q1.id}, 'Baking Soda', false, 'Good, but not the best for pervasive odors.'),
        (${q1.id}, 'White Vinegar', true, 'White vinegar is a natural deodorizer that breaks down odor-causing molecules!'),
        (${q1.id}, 'Baking Powder', false, 'Baking powder has extra ingredients and isn''t for cleaning.'),
        (${q1.id}, 'Lemon Juice', false, 'Great for stains, but vinegar wins on odors.')
      `;

      // Question 2
      const [q2] = await sql`
        INSERT INTO quiz_questions (quiz_id, text, order_index) 
        VALUES (${quiz.id}, 'Which natural fruit can help you descale a kettle or clean a microwave?', 1)
        RETURNING id
      `;
      await sql`
        INSERT INTO quiz_options (question_id, text, is_correct, explanation) VALUES 
        (${q2.id}, 'Apple', false, 'Apples won''t do much for scale.'),
        (${q2.id}, 'Lemon', true, 'The citric acid in lemons is powerful for descaling and refreshing appliances!'),
        (${q2.id}, 'Banana', false, 'Definitely not.'),
        (${q2.id}, 'Orange', false, 'Oranges have less acidity than lemons.')
      `;

      // Outcomes
      await sql`
        INSERT INTO quiz_outcomes (quiz_id, min_score, max_score, title, description) VALUES 
        (${quiz.id}, 0, 0, 'LifeWise Novice', 'Time to start reading some more of our tips! You have a lot to learn.'),
        (${quiz.id}, 1, 1, 'Hack Enthusiast', 'Not bad! You know some basics, but there is still much to discover.'),
        (${quiz.id}, 2, 2, 'LifeWise Master', 'Incredible! You are a true master of life hacks and cleaning tricks.')
      `;

      console.log('✅ Initial quiz seeded.');
    }

  } catch (error) {
    console.error('❌ Error initializing quiz tables:', error);
  }
}

init();
