const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

let fixedCount = 0;

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
    return hooks[title.length % hooks.length] + `Implement these strategies to see a huge difference almost immediately.`;
  }
}

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Match excerpt block including multi-line scalar `>-` up to the next key (like category:)
  const excerptRegex = /excerpt:\s*>?-?\s*([\s\S]*?)\n([a-z]+:)/;
  const match = content.match(excerptRegex);
  
  if (match) {
    const excerptText = match[1].replace(/\n/g, ' ');
    if (excerptText.includes("Learn how to get better results with") || excerptText.includes("Practical tips you can")) {
      const titleMatch = content.match(/title:\s*'([^']+)'|title:\s*"([^"]+)"|title:\s*(.+)/);
      const catMatch = content.match(/category:\s*'([^']+)'|category:\s*"([^"]+)"|category:\s*(.+)/);
      
      const title = titleMatch ? (titleMatch[1] || titleMatch[2] || titleMatch[3]) : "this topic";
      const category = catMatch ? (catMatch[1] || catMatch[2] || catMatch[3]) : "life-hacks";
      
      const newExcerpt = generateExcerpt(title.trim(), category.trim());
      // Replace the entire old excerpt block with our new one-line quote
      content = content.replace(excerptRegex, `excerpt: "${newExcerpt}"\n$2`);
      fs.writeFileSync(filePath, content, 'utf-8');
      fixedCount++;
    }
  }
});

console.log(`Fix 6 complete. Rewrote ${fixedCount} excerpts.`);
