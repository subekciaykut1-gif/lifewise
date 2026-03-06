const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(process.cwd(), 'content/articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

const CATEGORY_KEYWORDS = {
  "cleaning": ["cleaning hacks", "deep cleaning", "stain removal", "organization tips", "home maintenance"],
  "health": ["wellness tips", "natural remedies", "healthy living", "nutrition advice", "mental health"],
  "food": ["cooking hacks", "kitchen tips", "recipe ideas", "food prep", "meal planning"],
  "home-and-garden": ["gardening tips", "home decor", "DIY home", "outdoor living", "renovation"],
  "life-hacks": ["productivity hacks", "life shortcuts", "efficiency tips", "smart living", "problem solving"],
  "diy": ["DIY projects", "upcycling", "crafting tips", "home improvement", "handyman skills"],
  "beauty": ["skincare routine", "beauty tips", "natural beauty", "style guide", "self care"],
  "viral-stories": ["trending news", "inspiring stories", "human interest", "viral content", "amazing facts"]
};

const UNSPLASH_MAPPING = {
  "cleaning": "cleaning,bubbles,housework",
  "health": "wellness,health,nature",
  "food": "cooking,kitchen,food",
  "home-and-garden": "garden,home,exterior",
  "life-hacks": "lightbulb,gears,brain",
  "diy": "tools,craft,handmade",
  "beauty": "beauty,skincare,spa",
  "viral-stories": "fire,sparkle,news"
};

const PLACEHOLDER_TEXT = "Whether you're new to this or looking to level up";

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content: body } = matter(fileContent);

  let updated = false;

  // 1. Remove generic author
  if (data.author === "WiseTips Editorial") {
    delete data.author;
    updated = true;
  }

  // 2. Add Keywords
  if (!data.keywords || data.keywords.length === 0) {
    const baseKeywords = CATEGORY_KEYWORDS[data.category] || ["lifestyle", "tips"];
    const titleWords = data.title.toLowerCase().split(' ').filter(w => w.length > 3);
    data.keywords = [...new Set([...baseKeywords, ...titleWords])].slice(0, 8);
    updated = true;
  }

  // 3. Add Image if missing
  if (!data.image || data.image === "") {
    const keyword = UNSPLASH_MAPPING[data.category] || "lifestyle";
    data.image = `https://images.unsplash.com/photo-1?auto=format&fit=crop&q=80&w=1200&sig=${Math.random().toString(36).substring(7)}&q=${keyword}`;
    updated = true;
  }

  // 4. Transform Body if placeholder
  let newBody = body;
  if (body.includes(PLACEHOLDER_TEXT)) {
    const title = data.title;
    const categoryName = data.category.replace(/-/g, ' ');
    
    // Create a more dynamic intro
    const intros = [
      `Searching for the most effective way to master **${title}**? You're in the right place. Understanding the nuances of ${categoryName} can drastically improve your daily routine.`,
      `If you've ever felt overwhelmed by **${title}**, don't worry—you're not alone. Our team has researched the best ${categoryName} techniques to help you get professional results at home.`,
      `Success with **${title}** doesn't always require expensive tools or endless time. Sometimes, a few smart shifts in your ${categoryName} approach are all you need.`
    ];
    
    const intro = intros[Math.floor(Math.random() * intros.length)];
    
    const conclusion = `\n\n### Final Thoughts\nMastering **${title}** is a journey of small improvements. By focusing on consistency and quality, you'll see your ${categoryName} skills grow in no time. For more inspiration, check out our related guides below!`;

    // Replace the specific placeholder block while keeping lists/links if they look real
    newBody = body.replace(PLACEHOLDER_TEXT + ".*consistency beats intensity", intro + conclusion);
    
    // If regex failed or didn't match perfectly, do a simpler replacement
    if (newBody === body) {
       const lines = body.split('\n');
       const cleanLines = lines.filter(l => !l.includes("Whether you're new") && !l.includes("Why It Matters") && !l.includes("Step-by-Step") && !l.includes("Keeping It Sustainable"));
       newBody = intro + "\n\n" + cleanLines.join('\n').trim() + conclusion;
    }
    
    updated = true;
  }

  if (updated) {
    const newFileContent = matter.stringify(newBody, data);
    fs.writeFileSync(filePath, newFileContent);
    updatedCount++;
  }
});

console.log(`Successfully updated ${updatedCount} articles.`);
