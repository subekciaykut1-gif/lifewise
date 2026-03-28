const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

let fixedCount = 0;

// Simple generator for unique excerpts based on title and category
function generateExcerpt(title, category) {
  const hooks = [
    `Discover the easiest way to master ${title.toLowerCase()}. `,
    `Stop wasting time. These techniques for ${title.toLowerCase()} yield instant results. `,
    `Most people do ${title.toLowerCase()} wrong without knowing it. `,
    `Unlock the hidden benefits of ${title.toLowerCase()}. `,
    `Transform your routine forever. These ${title.toLowerCase()} secrets are game changers. `
  ];
  
  const hooksByCat = {
    food: `Stop wasting groceries. These specific methods for ${title.toLowerCase()} keep everything fresher for longer.`,
    home: `A cleaner space brings a clearer mind. Explore these brilliant tricks for ${title.toLowerCase()} to organize your home today.`,
    health: `Most people struggle with this without knowing it. Here's how to build habits for ${title.toLowerCase()} that actually stick to your routine.`,
    money: `Financial freedom doesn't require complex math. Learn how smart strategies for ${title.toLowerCase()} can drastically change your monthly budget.`,
    'life-hacks': `Why do things the hard way? These brilliant bypasses for ${title.toLowerCase()} save both time and energy immediately.`
  };
  
  if (hooksByCat[category]) {
    return hooksByCat[category];
  } else {
    // Pick a pseudo-random hook based on title length
    return hooks[title.length % hooks.length] + `Implement these strategies to see a huge difference almost immediately.`;
  }
}

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const excerptRegex = /excerpt:\s*"([^"]+)"/;
  const match = content.match(excerptRegex);
  
  if (match) {
    const excerpt = match[1];
    if (excerpt.includes("Learn how to get better results with") || excerpt.includes("Practical tips you can use today")) {
      const titleMatch = content.match(/title:\s*"([^"]+)"/);
      const catMatch = content.match(/category:\s*"([^"]+)"/);
      
      const title = titleMatch ? titleMatch[1] : "this topic";
      const category = catMatch ? catMatch[1] : "life-hacks";
      
      const newExcerpt = generateExcerpt(title, category);
      content = content.replace(excerptRegex, `excerpt: "${newExcerpt}"`);
      fs.writeFileSync(filePath, content, 'utf-8');
      fixedCount++;
    }
  }
});

console.log(`Fix 6 complete. Rewrote ${fixedCount} excerpts.`);
