require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const quizzes = [
  {
    title: 'Spring Cleaning Masterclass',
    slug: 'spring-cleaning-masterclass',
    category: 'cleaning',
    description: 'Are you ready for a fresh start? Test your deep-cleaning skills!',
    publish_at: '2026-03-15T09:00:00Z',
    image: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&q=80&w=1200',
    questions: [
      {
        text: 'What is the most effective way to remove hard water stains from a showerhead?',
        options: [
          { text: 'Scrubbing with soap', is_correct: false, explanation: 'Soap often just adds to the buildup.' },
          { text: 'Soaking in white vinegar', is_correct: true, explanation: 'Vinegar breaks down calcium deposits effortlessly!' },
          { text: 'Using hot water only', is_correct: false, explanation: 'Hot water won\'t dissolve the minerals.' }
        ]
      },
      {
        text: 'How often should you vacuum your refrigerator coils to maintain efficiency?',
        options: [
          { text: 'Once a month', is_correct: false, explanation: 'A bit overkill for most homes.' },
          { text: 'Every six months', is_correct: true, explanation: 'This keeps the motor running cool and saves energy!' },
          { text: 'Once every two years', is_correct: false, explanation: 'Too long; dust buildup will spike your bills.' }
        ]
      }
    ],
    outcomes: [
      { min: 0, max: 0, title: 'Cleaning Rookie', description: 'Looks like it\'s time to grab a mop and start learning!' },
      { min: 1, max: 2, title: 'Sparkle Professional', description: 'Great job! Your home is in safe, clean hands.' }
    ]
  },
  {
    title: 'The Herb Gardener’s Challenge',
    slug: 'herb-gardener-challenge',
    category: 'home-and-garden',
    description: 'Think you have a green thumb? Test your herb-growing knowledge!',
    publish_at: '2026-03-25T09:00:00Z',
    image: 'https://images.unsplash.com/photo-1592150621344-82839b6fc236?auto=format&fit=crop&q=80&w=1200',
    questions: [
      {
        text: 'Which herb is famous for thriving in poor soil and requiring very little water?',
        options: [
          { text: 'Basil', is_correct: false, explanation: 'Basil loves water and rich soil.' },
          { text: 'Rosemary', is_correct: true, explanation: 'Rosemary is a desert native and loves dry, sandy soul!' },
          { text: 'Mint', is_correct: false, explanation: 'Mint needs constant moisture.' }
        ]
      },
      {
        text: 'True or False: Mint should always be planted in a container to prevent it from taking over.',
        options: [
          { text: 'True', is_correct: true, explanation: 'Mint is invasive and its roots spread incredibly fast!' },
          { text: 'False', is_correct: false, explanation: 'Actually, it will take over your entire garden if not contained.' }
        ]
      }
    ],
    outcomes: [
      { min: 0, max: 0, title: 'Withered Leaf', description: 'Maybe try plastic plants first?' },
      { min: 1, max: 2, title: 'Garden Guru', description: 'You know your greens! Time to start a nursery.' }
    ]
  },
  {
    title: 'Eco-Warrior Trivia',
    slug: 'eco-warrior-trivia',
    category: 'life-hacks',
    description: 'How green is your lifestyle? Discover new ways to save the planet!',
    publish_at: '2026-04-10T09:00:00Z',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=1200',
    questions: [
      {
        text: 'Which common household item can be used as a natural alternative to fabric softener?',
        options: [
          { text: 'Salt', is_correct: false, explanation: 'Salt is better for set-in stains.' },
          { text: 'White Vinegar', is_correct: true, explanation: 'It softens clothes and removes odors without chemicals!' },
          { text: 'Baking Soda', is_correct: false, explanation: 'Good for washing, but doesn\'t soften as well as vinegar.' }
        ]
      }
    ],
    outcomes: [
      { min: 0, max: 0, title: 'Eco-Novice', description: 'There\'s always room for a greener footprint!' },
      { min: 1, max: 1, title: 'Earth Protector', description: 'Mother Nature thanks you for your wisdom!' }
    ]
  },
  {
    title: 'Summer Travel Pro',
    slug: 'summer-travel-pro',
    category: 'life-hacks',
    description: 'Ready for your summer vacation? See if you can pack like a pro!',
    publish_at: '2026-06-05T09:00:00Z',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200',
    questions: [
      {
        text: 'What is the most space-efficient way to pack clothes in a suitcase?',
        options: [
          { text: 'Folding them flat', is_correct: false, explanation: 'Traditional, but takes up more room.' },
          { text: 'Rolling them tightly', is_correct: true, explanation: 'Rolling saves space and reduces wrinkles significantly!' },
          { text: 'Using vacuum bags', is_correct: false, explanation: 'Saves space, but adds weight and might wrinkle delicates.' }
        ]
      }
    ],
    outcomes: [
      { min: 0, max: 0, title: 'Over-Packer', description: 'You might need an extra suitcase!' },
      { min: 1, max: 1, title: 'Carry-on King/Queen', description: 'You\'ll be through security in no time!' }
    ]
  }
];

// Helper to generate monthly content automatically
const topics = [
  { month: 5, category: 'food', title: 'BBQ Master Quiz', desc: 'Is your grill game on point?', q: 'What is the best way to clean a grill grate naturally?', o: ['Lemon', 'Soap', 'Vinegar'], c: 0 },
  { month: 7, category: 'life-hacks', title: 'Heatwave Survival', desc: 'Can you stay cool under pressure?', q: 'Where should you place a fan for maximum cooling?', o: ['Next to bed', 'Near an open window', 'Facing a wall'], c: 1 },
  { month: 8, category: 'life-hacks', title: 'Back-to-School Guru', desc: 'Aced the routine?', q: 'What is the "Golden Minute" rule for chores?', o: ['Do it in under 60 sec', 'Wait 60 min', 'Do it at 6 PM'], c: 0 },
  { month: 9, category: 'cleaning', title: 'Fall Deep Clean', desc: 'Ready for the pumpkin spice season?', q: 'What often-neglected area should be cleared of leaves in Oct?', o: ['Driveway', 'Gutters', 'Lawn'], c: 1 },
  { month: 11, category: 'food', title: 'The Turkey Master', desc: 'Can you handle the big feast?', q: 'How long does it take to thaw a frozen turkey safely?', o: ['1 day', '24h per 5 lbs', '2 hours'], c: 1 },
  { month: 12, category: 'health', title: 'Holiday Stress Buster', desc: 'Breathe through the festivities!', q: 'Which breathing technique helps lower cortisol fast?', o: ['Box breathing', 'Fast breathing', 'Holding breath'], c: 0 }
];

async function seed() {
  console.log('🌱 Starting full-year quiz seeding...');
  try {
    // Insert structured quizzes
    for (const qz of quizzes) {
      console.log(`- Seeding ${qz.title}...`);
      const [quiz] = await sql`
        INSERT INTO quizzes (title, slug, category, description, image_url, publish_at)
        VALUES (${qz.title}, ${qz.slug}, ${qz.category}, ${qz.description}, ${qz.image}, ${qz.publish_at})
        ON CONFLICT (slug) DO UPDATE SET publish_at = EXCLUDED.publish_at
        RETURNING id
      `;

      for (let i = 0; i < qz.questions.length; i++) {
        const q = qz.questions[i];
        const [question] = await sql`
          INSERT INTO quiz_questions (quiz_id, text, order_index)
          VALUES (${quiz.id}, ${q.text}, ${i})
          RETURNING id
        `;

        for (const opt of q.options) {
          await sql`
            INSERT INTO quiz_options (question_id, text, is_correct, explanation)
            VALUES (${question.id}, ${opt.text}, ${opt.is_correct}, ${opt.explanation || ''})
          `;
        }
      }

      for (const out of qz.outcomes) {
        await sql`
          INSERT INTO quiz_outcomes (quiz_id, min_score, max_score, title, description)
          VALUES (${quiz.id}, ${out.min}, ${out.max}, ${out.title}, ${out.description})
        `;
      }
    }

    // Insert auto-generated seasonal highlights
    for (const t of topics) {
      console.log(`- Seeding ${t.title}...`);
      const pubDate = new Date(2026, t.month - 1, 15).toISOString();
      const [quiz] = await sql`
        INSERT INTO quizzes (title, slug, category, description, image_url, publish_at)
        VALUES (${t.title}, ${t.title.toLowerCase().replace(/ /g, '-')}, ${t.category}, ${t.desc}, 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=1200', ${pubDate})
        ON CONFLICT (slug) DO UPDATE SET publish_at = EXCLUDED.publish_at
        RETURNING id
      `;

      if (quiz) {
        // Clear existing questions to avoid duplicates on re-run
        await sql`DELETE FROM quiz_questions WHERE quiz_id = ${quiz.id}`;

        const [question] = await sql`
          INSERT INTO quiz_questions (quiz_id, text, order_index)
          VALUES (${quiz.id}, ${t.q}, 0)
          RETURNING id
        `;

        for (let i = 0; i < t.o.length; i++) {
          await sql`
            INSERT INTO quiz_options (question_id, text, is_correct)
            VALUES (${question.id}, ${t.o[i]}, ${i === t.c})
          `;
        }

        await sql`
          INSERT INTO quiz_outcomes (quiz_id, min_score, max_score, title, description)
          VALUES (${quiz.id}, 0, 1, 'Seasonal Starter', 'Keep tracking our tips for more seasonal wisdom!')
        `;
      }
    }

    console.log('✅ Full-year sequence seeded successfully.');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    process.exit(0);
  }
}

seed();
