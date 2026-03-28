/**
 * fix-broken-excerpts.js
 * Finds MDX files where the excerpt field has newlines or unclosed quotes
 * that break YAML parsing, and replaces them with a safe single-line version.
 */
const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '..', 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

let fixed = 0;

for (const file of files) {
  const filePath = path.join(articlesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Split into frontmatter + body
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) continue;

  const originalFM = match[0];
  let fm = match[1];

  // Fix multiline excerpt values — collapse them to single line
  // This regex handles both "excerpt: |" and "excerpt: "...\n... continued"
  fm = fm.replace(
    /excerpt:\s*(["'])([\s\S]*?)\1/g,
    (fullMatch, quote, value) => {
      const cleaned = value
        .replace(/\r?\n/g, ' ')   // collapse newlines
        .replace(/\s{2,}/g, ' ')  // collapse multi-spaces
        .replace(/["']/g, '')     // remove any internal quotes
        .trim()
        .substring(0, 160);       // max 160 chars
      return `excerpt: "${cleaned}..."`;
    }
  );

  // Also fix bare multi-line excerpts (no quotes, indented continuation)
  fm = fm.replace(
    /^(excerpt:\s*)(.+)(\n[ \t]+.+)+/m,
    (fullMatch, key, firstLine) => {
      const cleaned = fullMatch
        .replace(/^excerpt:\s*/m, '')
        .replace(/\r?\n[ \t]*/g, ' ')
        .replace(/["']/g, '')
        .trim()
        .substring(0, 160);
      return `excerpt: "${cleaned}..."`;
    }
  );

  const newFMBlock = `---\n${fm}\n---`;

  if (newFMBlock === originalFM) continue; // No change needed

  const newContent = content.replace(originalFM, newFMBlock);
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✅ Fixed: ${file}`);
  fixed++;
}

console.log(`\n🎉 Done! Fixed ${fixed} files.`);
