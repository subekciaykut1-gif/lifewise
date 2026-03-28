const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'next.config.ts');
const mapPath = path.join(__dirname, 'viral-redirects.txt');

const lines = fs.readFileSync(mapPath, 'utf8').split('\n').filter(l => l.trim());
let redirectBlock = '';

for (const line of lines) {
  const [source, destination] = line.split(' -> ');
  if (source && destination) {
    redirectBlock += `      {\n        source: '${source.trim()}',\n        destination: '${destination.trim()}',\n        permanent: true,\n      },\n`;
  }
}

let config = fs.readFileSync(configPath, 'utf8');
const searchRegex = /permanent:\s*true,\r?\n\s*},/;
if (searchRegex.test(config)) {
  config = config.replace(searchRegex, (match) => match + '\n' + redirectBlock);
  fs.writeFileSync(configPath, config, 'utf8');
  console.log(`Successfully injected ${lines.length} explicit URL redirects into next.config.ts!`);
} else {
  console.error("Could not find the injection anchor point inside next.config.ts");
}
