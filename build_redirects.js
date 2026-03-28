const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'content', 'articles');
const mapFile = path.join(__dirname, 'duplicate-redirects.txt');
const locales = ['en', 'es', 'fr', 'de', 'pt'];

function buildMap() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
  const slugs = files.map(f => f.replace('.mdx', ''));
  const slugSet = new Set(slugs);

  let redirectPairs = [];
  let count = 0;

  for (const slug of slugs) {
    const match = slug.match(/^(.+)-(\d+)$/);
    if (match) {
      const baseSlug = match[1];
      if (slugSet.has(baseSlug)) {
        // Find category by reading frontmatter
        const content = fs.readFileSync(path.join(articlesDir, slug + '.mdx'), 'utf8');
        const catMatch = content.match(/category:\s*(.+)/);
        const category = catMatch ? catMatch[1].trim() : 'viral-stories';

        for (const locale of locales) {
          redirectPairs.push(`/${locale}/${category}/${slug} -> /${locale}/${category}/${baseSlug}`);
          count++;
        }
      }
    }
  }

  fs.writeFileSync(mapFile, redirectPairs.join('\n'), 'utf8');
  console.log(`Successfully generated ${count} total redirect pairs.`);
  console.log(`Saved map to ${mapFile}`);
}

buildMap();
