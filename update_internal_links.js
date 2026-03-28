const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'content', 'articles');
const mapFile = path.join(__dirname, 'viral-redirects.txt');

// Read mapFile directly to parse old/new pairs dynamically
const redirects = fs.readFileSync(mapFile, 'utf8').split('\n').filter(l => l.trim());
// Extract unique oldSlug -> newSlug from the redirects
const mapping = new Map();
for (const line of redirects) {
  // Format: /en/viral-stories/oldSlug -> /en/viral-stories/newSlug
  const match = line.match(/\/viral-stories\/([^\s]+) -> \/[^\/]+\/viral-stories\/([^\s]+)/);
  if (match) {
    mapping.set(match[1], match[2]);
  }
}

let modifiedFiles = 0;
let totalReplacedLinks = 0;

function scanAndReplace() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
  
  for (const file of files) {
    const filePath = path.join(articlesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let fileModified = false;

    // Iterate over all entries to ensure we catch everything
    for (const [oldSlug, newSlug] of mapping.entries()) {
      // Find exact matches like "viral-stories/old-slug" avoiding partial matches 
      // by using boundaries. 
      const regex = new RegExp(`viral-stories/${oldSlug}(['"\\)\\s#/?/])`, 'g');
      
      const prevContent = content;
      content = content.replace(regex, `viral-stories/${newSlug}$1`);
      
      if (content !== prevContent) {
        fileModified = true;
        totalReplacedLinks++;
      }
    }

    if (fileModified) {
      fs.writeFileSync(filePath, content, 'utf8');
      modifiedFiles++;
    }
  }

  console.log(`Scan completed. Replaced ${totalReplacedLinks} old internal links across ${modifiedFiles} files.`);
}

scanAndReplace();
