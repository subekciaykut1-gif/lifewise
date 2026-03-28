const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, 'thin-articles-report.txt');
const lines = fs.readFileSync(reportPath, 'utf8').split('\n');

const uniqueTopics = new Set();
let count = 0;

for (const line of lines) {
  if (line.includes('[TEMPLATE_SHELL]')) {
    count++;
    const slug = line.split(' | ')[0].trim();
    // Remove numerical suffixes (e.g., "lip-care-279" -> "lip-care")
    const baseTopic = slug.replace(/-\d+$/, '');
    uniqueTopics.add(baseTopic);
  }
}

console.log(`Remaining articles: ${count}`);
console.log(`Unique base topics: ${uniqueTopics.size}`);
console.log(Array.from(uniqueTopics).slice(0, 50).join(', '));
