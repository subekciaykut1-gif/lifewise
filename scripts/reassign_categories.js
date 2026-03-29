/**
 * reassign_categories.js
 * 
 * Deterministic keyword-scoring category reassignment.
 * No API - no cost. Reads title, tags, keywords, excerpt from MDX frontmatter
 * and assigns the best-matching category from the 16 defined in lib/categories.ts
 * 
 * Usage:
 *   node scripts/reassign_categories.js
 *   node scripts/reassign_categories.js --dry-run   (preview only, no writes)
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DRY_RUN = process.argv.includes('--dry-run');

const ARTICLES_DIR  = path.join(__dirname, '..', 'content', 'articles');
const LOCALE_DIRS   = ['es', 'fr', 'de', 'pt'].map(l => path.join(__dirname, '..', 'content', l));
const VALID_SLUGS   = [
  'finance', 'technology', 'estate', 'careers', 'auto',
  'pets', 'gaming', 'travel', 'life-hacks', 'health',
  'food', 'home-and-garden', 'cleaning', 'diy', 'beauty', 'viral-stories'
];

// ---------------------------------------------------------------------------
// Keyword map: category slug → list of weighted terms (higher weight = stronger signal)
// ---------------------------------------------------------------------------
const CATEGORY_KEYWORDS = {
  finance: [
    ['budget', 3], ['finance', 3], ['financial', 3], ['money', 3], ['savings', 3],
    ['debt', 3], ['invest', 3], ['income', 3], ['salary', 3], ['expense', 3],
    ['paycheck', 3], ['frugal', 3], ['mortgage', 2], ['credit', 2], ['cash', 2],
    ['afford', 2], ['loan', 2], ['spend', 2], ['fund', 2], ['bill', 2],
    ['subscription', 2], ['coupon', 2], ['negotiate bill', 2], ['side hustle', 1],
    ['wealth', 2], ['emergency fund', 3], ['rent', 1], ['grocery', 1],
  ],
  technology: [
    ['tech', 3], ['phone', 3], ['computer', 3], ['laptop', 3], ['software', 3],
    ['app', 3], ['digital', 3], ['password', 3], ['data', 3], ['security', 3],
    ['wifi', 2], ['internet', 2], ['backup', 2], ['device', 2], ['screen time', 2],
    ['two-factor', 3], ['smartphone', 3], ['browser', 2], ['email', 2],
    ['tracking', 2], ['privacy', 2], ['smart home', 2], ['led', 1],
  ],
  estate: [
    ['real estate', 3], ['property', 3], ['home buyer', 3], ['home buying', 3],
    ['mortgage', 3], ['rental property', 3], ['house', 2], ['rent', 2],
    ['property value', 3], ['staging', 2], ['home value', 2], ['first-time', 2],
    ['landlord', 2], ['tenant', 2], ['listing', 2], ['invest in rental', 3],
  ],
  careers: [
    ['career', 3], ['job', 3], ['resume', 3], ['salary negotiation', 3],
    ['remote work', 3], ['workplace', 3], ['burnout', 3], ['side hustle', 3],
    ['productivity', 2], ['professional', 2], ['interview', 2], ['negotiate', 2],
    ['work from home', 3], ['freelance', 2], ['income stream', 2], ['hustle', 2],
    ['profits', 1], ['employee', 2], ['meeting', 2], ['boss', 1],
  ],
  auto: [
    ['car', 3], ['vehicle', 3], ['driving', 3], ['fuel', 3], ['road trip', 3],
    ['mechanic', 3], ['tire', 3], ['maintenance', 2], ['engine', 2], ['gas', 2],
    ['auto', 3], ['truck', 2], ['mileage', 2], ['oil change', 3], ['parking', 2],
    ['highway', 2], ['traffic', 2], ['winter driving', 3],
  ],
  pets: [
    ['pet', 3], ['dog', 3], ['cat', 3], ['animal', 3], ['bird', 3],
    ['parrot', 3], ['horse', 3], ['kitten', 3], ['puppy', 3], ['fur', 2],
    ['vet', 2], ['leash', 2], ['treat', 2], ['paw', 2], ['adopt', 2],
    ['pet care', 3], ['fish', 2], ['hamster', 2],
  ],
  gaming: [
    ['gaming', 3], ['game', 3], ['gamer', 3], ['monitor', 3], ['setup', 3],
    ['console', 3], ['pc gaming', 3], ['controller', 3], ['fps', 3],
    ['co-op', 3], ['esports', 3], ['stream', 2], ['twitch', 2],
    ['graphics card', 3], ['keyboard', 2], ['mouse', 2], ['headset', 2],
  ],
  travel: [
    ['travel', 3], ['flight', 3], ['jet lag', 3], ['hotel', 3], ['airport', 3],
    ['destination', 3], ['tour', 3], ['passport', 3], ['luggage', 3],
    ['vacation', 3], ['booking flight', 3], ['digital nomad', 3],
    ['abroad', 3], ['solo travel', 3], ['europe trip', 3], ['budget travel', 3],
    ['travel hack', 3], ['travel document', 3], ['cheapest flight', 3],
    ['road trip', 2], ['packing light', 3], ['pack', 2],
  ],
  'life-hacks': [
    ['life hack', 3], ['productivity', 3], ['morning routine', 3], ['time management', 3],
    ['organization', 3], ['to-do', 3], ['calendar', 3], ['focus', 3],
    ['habit', 2], ['routine', 2], ['efficiency', 2], ['shortcut', 2],
    ['minimalist', 2], ['simplify', 2], ['time block', 3], ['inbox zero', 3],
    ['distraction', 2], ['procrastin', 2], ['evening routine', 2], ['todo', 2],
    ['home office hacks', 3], ['productive home office', 3], ['best productivity', 3],
    ['screen time rule', 2], ['negotiate bill', 2], ['money saving daily', 2],
    ['side hustle idea', 2], ['save time', 2], ['better sleep', 1],
  ],
  health: [
    ['health', 3], ['wellness', 3], ['sleep', 3], ['diet', 3], ['weight', 3],
    ['nutrition', 3], ['immune', 3], ['vitamin', 3], ['pain', 3], ['exercise', 3],
    ['mental health', 3], ['anxiety', 3], ['meditation', 3], ['stress', 2],
    ['gut', 2], ['inflammation', 2], ['hydration', 2], ['breathing', 2],
    ['posture', 2], ['back', 2], ['joint', 2], ['nap', 2], ['fatigue', 2],
    ['supplement', 2], ['omega', 2], ['blood sugar', 3], ['magnesium', 2],
    ['fiber', 2], ['probiotic', 2], ['caffeine', 2], ['hangover', 2],
    ['cold', 2], ['flu', 2], ['allergy', 2], ['headache', 2], ['cholesterol', 2],
    ['heart', 2], ['digestion', 2], ['walk', 1], ['yoga', 2], ['fitness', 2],
  ],
  food: [
    ['food', 3], ['recipe', 3], ['kitchen', 3], ['cook', 3], ['meal', 3],
    ['bake', 3], ['snack', 3], ['eat', 2], ['ingredient', 2], ['dish', 2],
    ['breakfast', 3], ['lunch', 3], ['dinner', 3], ['dessert', 2], ['grocery', 2],
    ['protein', 2], ['sugar', 2], ['salt', 2], ['spice', 2], ['herb', 2],
    ['noodle', 2], ['pasta', 2], ['bread', 2], ['rice', 2], ['egg', 2],
    ['cheese', 2], ['produce', 2], ['leftover', 2], ['freezer meal', 3],
    ['meal prep', 3], ['instant pot', 2], ['slow cooker', 2], ['batch cook', 3],
    ['smoothie', 2], ['coffee', 2], ['tea', 2], ['drink', 2], ['lemon water', 2],
    ['dairy', 2], ['gluten', 2], ['vegan', 2], ['food storage', 2],
  ],
  'home-and-garden': [
    ['home', 2], ['garden', 3], ['plant', 3], ['decor', 3], ['furniture', 3],
    ['interior', 3], ['room', 2], ['living room', 3], ['bedroom', 3],
    ['bathroom', 2], ['backyard', 3], ['outdoor', 3], ['patio', 3], ['balcony', 2],
    ['shelf', 2], ['lighting', 2], ['curtain', 2], ['rug', 2], ['color palette', 2],
    ['minimalist home', 2], ['tiny house', 3], ['apartment', 2], ['studio', 2],
    ['shed', 2], ['mulch', 2], ['weed', 2], ['prune', 2], ['seed', 2],
    ['compost', 2], ['herb garden', 3], ['vegetable patch', 3], ['flower', 2],
  ],
  cleaning: [
    ['clean', 3], ['wash', 3], ['laundry', 3], ['scrub', 3], ['sanitize', 3],
    ['disinfect', 3], ['stain', 3], ['mop', 3], ['dust', 3], ['vacuum', 3],
    ['baking soda', 2], ['vinegar', 2], ['bleach', 2], ['microfiber', 2],
    ['grout', 2], ['oven clean', 3], ['fridge clean', 2], ['bathroom clean', 3],
    ['kitchen clean', 2], ['odor', 2], ['mold', 2], ['deep clean', 3],
    ['spring clean', 3], ['steam clean', 3], ['sponge', 2], ['streak-free', 2],
    ['natural cleaner', 2], ['hydrogen peroxide', 2], ['essential oil clean', 2],
    ['window', 2], ['lemon clean', 2], ['garbage disposal', 2],
  ],
  diy: [
    ['diy', 3], ['build', 3], ['repair', 3], ['fix', 3], ['install', 3],
    ['paint a room', 3], ['painting cabinet', 3], ['repaint', 3],
    ['shelf', 2], ['wall', 2], ['drill', 2], ['hammer', 2],
    ['tile', 2], ['caulk', 3], ['drywall', 3], ['plumbing', 2],
    ['electrical', 2], ['outlet', 3], ['ceiling fan install', 3], ['fence built', 3],
    ['fence maintenance', 2], ['deck care', 2], ['woodwork', 2], ['sanding', 2],
    ['varnish', 3], ['pallet project', 3], ['upcycle furniture', 3],
    ['furniture flip', 3], ['concrete countertop', 3], ['pipe insulation', 3],
    ['window seal', 3], ['door hinge', 3], ['sticky door', 2], ['wobbly chair', 2],
    ['unclog drain', 3], ['toilet running', 3], ['toilet fix', 3],
    ['headboard diy', 3], ['desk build', 3], ['roller tip', 3], ['paint brush care', 3],
    ['led bulb upgrade', 3], ['light switch replace', 3], ['weather stripping', 3],
    ['simple diy', 3], ['wreath making', 3], ['holiday decor', 2],
    ['card making', 2], ['hanging picture', 2], ['floating shelf', 3],
    ['basic tool kit', 3], ['shed built', 3], ['screen door repair', 3],
    ['faucet drip', 3], ['water heater', 3],
  ],
  beauty: [
    ['beauty', 3], ['skin', 3], ['hair', 3], ['nail', 3], ['makeup', 3],
    ['moisturizer', 3], ['lip', 3], ['eye', 2], ['face', 3], ['serum', 3],
    ['sunscreen', 3], ['foundation', 3], ['concealer', 3], ['mascara', 3],
    ['skincare', 3], ['anti-aging', 3], ['eyebrow', 3], ['blush', 2],
    ['conditioner', 3], ['shampoo', 2], ['split end', 3], ['heat protectant', 3],
    ['hair mask', 3], ['natural beauty', 3], ['cuticle', 3], ['manicure', 3],
    ['oily skin', 3], ['dry skin', 3], ['acne', 2], ['glow', 2], ['toner', 2],
  ],
  'viral-stories': [
    ['viral', 3], ['went viral', 3], ['real story', 3], ['heartwarming', 3],
    ['kindness story', 3], ['animal story', 3], ['community story', 3],
    ['inspiring story', 3], ['stranger', 3], ['tiktok trend', 3],
    ['dog walks home', 3], ['cat saves owner', 3], ['parrot calls 911', 3],
    ['horse remembers', 3], ['baked feta', 3], ['pasta chips', 3], ['cloud bread', 3],
    ['butter board', 3], ['bus conversion', 3], ['quiet quitting', 3], ['bed rotting', 3],
    ['dopamine menu', 3], ['raw water trend', 3], ['hoarder room', 3],
    ['sold everything', 3], ['tiny home story', 3], ['cabin built alone', 3],
    ['learned language at', 3], ['learned to cook at', 3], ['chronotype', 3],
    ['mechanic fixes free', 3], ['cashier pays', 3], ['teacher lunch debt', 3],
    ['town saves bookshop', 3], ['neighbors rebuild', 3], ['strangers pay layaway', 3],
    ['stranger pays tuition', 3], ['dog adopts kitten', 3], ['layaway', 3],
    ['shed to office', 2], ['shipping container house', 2],
  ],
};

// ---------------------------------------------------------------------------
// Score an article against all category keyword maps
// ---------------------------------------------------------------------------
function scoreArticle(title = '', tags = [], keywords = [], excerpt = '') {
  const haystack = [title, excerpt, ...(Array.isArray(tags) ? tags : []), ...(Array.isArray(keywords) ? keywords : [])]
    .join(' ')
    .toLowerCase();

  const scores = {};
  for (const [slug, terms] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const [term, weight] of terms) {
      if (haystack.includes(term.toLowerCase())) {
        score += weight;
      }
    }
    scores[slug] = score;
  }
  return scores;
}

function bestCategory(scores, existing) {
  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) return existing; // no signal found – keep original
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  return best;
}

// ---------------------------------------------------------------------------
// Parse / stringify frontmatter without losing the rest of the file
// ---------------------------------------------------------------------------
function updateCategoryInFile(filePath, newCategory) {
  const raw = fs.readFileSync(filePath, 'utf8');
  let parsed;
  try {
    parsed = matter(raw);
  } catch (e) {
    console.warn(`  SKIP write (parse error): ${filePath} — ${e.message.split('\n')[0]}`);
    return false;
  }
  if (parsed.data.category === newCategory) return false;
  parsed.data.category = newCategory;
  const output = matter.stringify(parsed.content, parsed.data);
  fs.writeFileSync(filePath, output, 'utf8');
  return true;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.mdx'));
  const summary = {};
  const changes = [];

  console.log(`Scanning ${files.length} English articles...\n`);

  for (const file of files) {
    const filePath = path.join(ARTICLES_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    let data;
    try {
      ({ data } = matter(raw));
    } catch (e) {
      console.warn(`  SKIP (parse error): ${file} — ${e.message.split('\n')[0]}`);
      continue;
    }

    const scores = scoreArticle(
      data.title || '',
      data.tags || [],
      data.keywords || [],
      data.excerpt || ''
    );

    const oldCat = data.category || '[NONE]';
    const newCat = bestCategory(scores, oldCat);

    summary[newCat] = (summary[newCat] || 0) + 1;

    if (oldCat !== newCat) {
      changes.push({ file, oldCat, newCat });
      if (!DRY_RUN) {
        // Update English
        updateCategoryInFile(filePath, newCat);
        // Sync all locales
        for (const localeDir of LOCALE_DIRS) {
          const localePath = path.join(localeDir, file);
          if (fs.existsSync(localePath)) {
            updateCategoryInFile(localePath, newCat);
          }
        }
      }
    }
  }

  console.log('=== Category changes ===');
  for (const { file, oldCat, newCat } of changes) {
    console.log(`  [${oldCat}] → [${newCat}]  ${file}`);
  }

  console.log('\n=== Final distribution ===');
  const sorted = Object.entries(summary).sort((a, b) => b[1] - a[1]);
  for (const [cat, count] of sorted) {
    console.log(`  [${cat}] → ${count} articles`);
  }

  console.log(`\nTotal changes: ${changes.length}`);
  if (DRY_RUN) {
    console.log('DRY RUN — no files were modified. Re-run without --dry-run to apply.');
  } else {
    console.log('Done. All English + locale files updated.');
  }
}

main().catch(console.error);
