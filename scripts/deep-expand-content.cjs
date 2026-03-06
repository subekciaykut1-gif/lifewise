const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(process.cwd(), 'content/articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

const EXPANSION_DATA = {
  "cleaning": {
    "expert_tips": [
      "**The Top-to-Bottom Rule**: Always start cleaning from the highest point in a room (like ceiling fans or top shelves) and work your way down. This ensures that any falling dust or debris is cleaned at the very end when you do the floors.",
      "**Product Dwell Time**: Most cleaning solutions need 5-10 minutes of 'dwell time' to properly break down grease and bacteria. Spray your surfaces and wait before wiping for much better results with less scrubbing.",
      "**Microfiber Magic**: Stop using paper towels. High-quality microfiber cloths are electrostatically charged to grab dust rather than just moving it around, and they can be washed hundreds of times."
    ],
    "pitfalls": [
      "**Mixing Chemicals**: Never mix bleach with ammonia or vinegar. This can create toxic gases that are extremely dangerous in enclosed spaces.",
      "**Over-Watering Wood**: When cleaning hardwood or laminate, use a damp—not dripping wet—mop. Excess water can cause boards to warp or delaminate over time."
    ],
    "faq": [
      { "q": "What is the best all-natural cleaner?", "a": "A 50/50 mix of white vinegar and water with a few drops of dish soap is highly effective for most surfaces and costs pennies." },
      { "q": "How often should I deep clean?", "a": "Most experts recommend a deep clean once per quarter, focusing on areas like baseboards, light fixtures, and behind appliances." }
    ]
  },
  "health": {
    "expert_tips": [
      "**The 80/20 Rule**: Focus on being consistent with your healthy habits 80% of the time. This prevents burnout and makes your lifestyle sustainable in the long run.",
      "**Sleep Hygiene**: Your 'sleep window' is more important than the total hours. Try to go to bed and wake up at the same time every day to regulate your circadian rhythm.",
      "**Functional Movement**: You don't always need a gym. Incorporate 'NEAT' (Non-Exercise Activity Thermogenesis) like taking the stairs or walking while on phone calls."
    ],
    "pitfalls": [
      "**Ignoring Minor Pain**: Small aches can lead to chronic injuries if ignored. Always listen to your body and prioritize recovery when needed.",
      "**Inconsistent Hydration**: Many people wait until they are thirsty to drink. Sip water consistently throughout the day to maintain optimal cognitive function."
    ],
    "faq": [
      { "q": "How much water do I really need?", "a": "While the '8-cup rule' is a baseline, most active adults need about 3 liters a day, adjusted for climate and activity level." },
      { "q": "Is morning or evening exercise better?", "a": "The best time is whenever you are most likely to stick to it, though morning exercise is often better for establishing a long-term habit." }
    ]
  },
  "food": {
    "expert_tips": [
      "**Mise en Place**: Always prep and measure all your ingredients before you turn on the stove. This 'everything in its place' approach prevents burning and reduces kitchen stress.",
      "**Salt in Cycles**: Season your food at every stage of cooking, not just at the end. This builds layers of flavor that a final dusting of salt cannot replicate.",
      "**Knife Sharpness**: A dull knife is more dangerous than a sharp one because it requires more force and is prone to slipping. Sharpen your main chef's knife every 3-6 months."
    ],
    "pitfalls": [
      "**Overcrowding the Pan**: If you put too much food in a skillet, the temperature drops and the food steams instead of searing. Cook in batches for that perfect golden-brown finish.",
      "**Not Resting Meat**: Always let your protein rest for 5-10 minutes after cooking. This allows the juices to redistribute, ensuring a tender and moist result."
    ],
    "faq": [
      { "q": "How can I make my vegetables taste better?", "a": "High-heat roasting at 400°F (200°C) with olive oil and a dash of acid (lemon juice or vinegar) at the end completely changes the flavor profile." },
      { "q": "Can I use dried herbs instead of fresh?", "a": "Yes, but remember that dried herbs are more potent. Use a 1:3 ratio (1 teaspoon of dried for 1 tablespoon of fresh)." }
    ]
  },
  "home-and-garden": {
    "expert_tips": [
      "**Layered Lighting**: Don't rely on just one overhead light. Combine 'Ambient' (main light), 'Task' (reading lamps), and 'Accent' (LED strips) to create depth and warmth in any room.",
      "**Pruning Timing**: Most plants should be pruned in the late winter or early spring before new growth starts. This focuses the plant's energy on the new season's blooms.",
      "**Soil Health**: Your garden is only as good as your soil. Mix in fresh organic compost every spring to nourish the microbial life that feeds your plants."
    ],
    "pitfalls": [
      "**Over-Watering Indoor Plants**: More house plants die from over-watering than under-watering. Always check the soil 2 inches deep before adding more moisture.",
      "**Buying Before Measuring**: Always measure your space and your doorways before purchasing furniture. A piece that looks small in a showroom can overwhelm a living room."
    ],
    "faq": [
      { "q": "What's the best way to get rid of garden pests naturally?", "a": "Neem oil and insecticidal soaps are excellent non-toxic options. You can also attract beneficial insects like ladybugs." },
      { "q": "How do I make a small room feel bigger?", "a": "Use mirrors to reflect light, choose furniture with visible legs, and stick to a cohesive, light-colored palette." }
    ]
  },
  "life-hacks": {
    "expert_tips": [
      "**The 2-Minute Rule**: If a task takes less than two minutes (like replying to an email or hanging up a coat), do it immediately. It takes more energy to track it later than to finish it now.",
      "**Time Blocking**: Stop using giant to-do lists. Instead, block specific times on your calendar for specific tasks. This protects your 'deep work' hours from interruptions.",
      "**Digital Minimalism**: Turn off all non-human notifications on your phone. If it's not a person trying to reach you, it probably doesn't need your immediate attention."
    ],
    "pitfalls": [
      "**Multi-Tasking Myth**: Your brain doesn't actually multi-task; it 'task-switches,' which costs about 40% of your productivity. Focus on one high-value task at a time.",
      "**Ignoring the Basics**: No hack can replace basic health. Prioritize sleep, movement, and nutrition first—everything else is much easier when your baseline is high."
    ],
    "faq": [
      { "q": "How can I beat morning procrastination?", "a": "Decide on your 'Top 3' tasks the night before. Wake up knowing exactly what you need to do first." },
      { "q": "What's the best way to save money daily?", "a": "Automate your savings. Even $5 a day into a separate account adds up to over $1,800 a year without you noticing it." }
    ]
  },
  "diy": {
    "expert_tips": [
      "**Measure Twice, Cut Once**: It's a cliché for a reason. Always verify your measurements one last time before making any permanent changes or cuts.",
      "**Surface Preparation**: 70% of a good paint job is the prep work. Sanding, cleaning, and priming are more important than the actual painting stage.",
      "**Buy Quality Basics**: You don't need a tool for everything, but buy the best you can afford for the ones you use most (drill, hammer, tape measure)."
    ],
    "pitfalls": [
      "**Skipping Safety Gear**: Eye and ear protection are not optional. Most DIY injuries are preventable with a simple pair of safety glasses.",
      "**Starting Too Big**: Don't renovate your whole kitchen as a first project. Start with smaller wins like shelf-building to build your confidence and skills."
    ],
    "faq": [
      { "q": "Is it worth repairing or should I replace?", "a": "If the repair cost is more than 50% of the replacement cost, it's usually better to upgrade. If it's a 'classic' item, repair is almost always better." },
      { "q": "How do I find a stud without a stud finder?", "a": "Look for outlets (usually attached to studs), tap the wall and listen for a solid sound, or use a strong magnet to find the drywall screws." }
    ]
  },
  "beauty": {
    "expert_tips": [
      "**Sunscreen, Always**: 90% of visible skin aging is caused by UV rays. Wear SPF 30+ every single day, even in the winter and even when it's cloudy.",
      "**Double Cleansing**: Use an oil-based cleanser first to break down makeup and SPF, then a water-based one to clean the skin. This prevents breakouts and improves texture.",
      "**Consistency Over Gimmicks**: A simple, consistent routine used every day is far more effective than an expensive 10-step routine used only once a week."
    ],
    "pitfalls": [
      "**Over-Exfoliating**: Using harsh acids or scrubs every day can damage your skin barrier, leading to redness and sensitivity. Limit exfoliation to 2-3 times a week.",
      "**Using Dired Products**: Pay attention to the 'open jar' icon on your products. Using expired skincare or makeup can lead to irritation and bacterial infections."
    ],
    "faq": [
      { "q": "In what order should I apply skincare?", "a": "The general rule is thinnest to thickest: Cleanser, Toner, Serum, Moisturizer, and finally SPF (during the day) or Oil (at night)." },
      { "q": "How often should I wash my hair?", "a": "It depends on your hair type, but most experts suggest 2-3 times a week to allow your natural oils to nourish the scalp." }
    ]
  },
  "viral-stories": {
    "expert_tips": [
      "**Fact-Check First**: Before sharing a viral story, do a quick search on Snopes or reputable news outlets. Viral 'facts' are often missing critical context or are outright fabrications.",
      "**The 'Why' Factor**: Stories go viral when they trigger a strong emotional response—wonder, anger, or joy. Being aware of this 'emotional hook' helps you consume content more mindfully.",
      "**Support Local**: Behind many viral local stories are real people and communities. Look for ways to support the causes mentioned in the stories you share."
    ],
    "pitfalls": [
      "**Rage-Baiting**: Many viral posts are designed to make you angry to drive engagement. Don't waste your energy on content specifically engineered for conflict.",
      "**Ignoring the Source**: Always check the date and the source. Old news often goes viral again as if it's currently happening, leading to unnecessary confusion."
    ],
    "faq": [
      { "q": "Why do some stories go viral and others don't?", "a": "It's usually a combination of timing, relatability, and a high 'emotional arousal' score that drives people to share." },
      { "q": "How can I spot a fake image?", "a": "Look for irregularities in shadows, edges, and repeating patterns. AI-generated images often struggle with hands, text, and perfect symmetry." }
    ]
  }
};

let expandedCount = 0;

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content: body } = matter(fileContent);

  // Guard: Don't expand if already expanded
  if (body.includes('Expert Pro Tips') || body.includes('Common Mistakes to Avoid')) {
    return;
  }

  const category = data.category || 'life-hacks';
  const expansion = EXPANSION_DATA[category] || EXPANSION_DATA['life-hacks'];

  // 1. Expert Tips Section
  let tipsStr = `\n\n## Expert Pro Tips for ${category.replace(/-/g, ' ').toUpperCase()}\n\n`;
  expansion.expert_tips.forEach(tip => {
    tipsStr += `- ${tip}\n`;
  });

  // 2. Mistakes Section
  let mistakesStr = `\n\n## Common Mistakes to Avoid\n\n`;
  expansion.pitfalls.forEach(pitfall => {
    mistakesStr += `- ${pitfall}\n`;
  });

  // 3. FAQ Section
  let faqStr = `\n\n## Frequently Asked Questions\n\n`;
  expansion.faq.forEach(f => {
    faqStr += `### ${f.q}\n${f.a}\n\n`;
  });

  // 4. Wrap it up with a relevant SmartAffiliateBox trigger
  const affiliateTriggers = {
    "cleaning": "cleaning supplies",
    "health": "wellness tools",
    "food": "kitchen essentials",
    "home-and-garden": "home organization",
    "life-hacks": "smart tools",
    "diy": "DIY gear",
    "beauty": "beauty essentials",
    "viral-stories": "trending items"
  };
  const trigger = affiliateTriggers[category] || "helpful tools";
  const boxStr = `\n\nLooking for the best **${trigger}** to help you get started? Check out our editors' top picks for this category below!`;

  const newBody = body.trim() + tipsStr + mistakesStr + faqStr + boxStr;

  const newFileContent = matter.stringify(newBody, data);
  fs.writeFileSync(filePath, newFileContent);
  expandedCount++;
});

console.log(`Successfully expanded ${expandedCount} articles with professional insights.`);
