const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'content', 'articles');
const auditFile = path.join(__dirname, 'all-articles-audit.csv');

function escapeCSV(str) {
  const value = String(str || '');
  const escaped = value.replace(/"/g, '""');
  return `"${escaped}"`;
}

async function audit() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
  const results = [['Slug', 'Title', 'Category', 'PublishedAt', 'WordCount']];

  for (const file of files) {
    const slug = file.replace('.mdx', '');
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');

    // Simple frontmatter extraction
    const fmMatch = content.match(/^---([\s\S]*?)---/);
    const body = content.replace(/^---[\s\S]*?---/, '').trim();
    
    let title = '';
    let category = '';
    let publishedAt = '';

    if (fmMatch) {
      const fm = fmMatch[1];
      const titleM = fm.match(/title:\s*['"]?([^'"\n]+)['"]?/);
      const catM = fm.match(/category:\s*(.+)/);
      const pubM = fm.match(/publishedAt:\s*['"]?([^'"\n]+)['"]?/);

      title = titleM ? titleM[1].trim() : '';
      category = catM ? catM[1].trim() : '';
      publishedAt = pubM ? pubM[1].trim() : '';
    }

    const words = body.split(/\s+/).filter(w => w.length > 0).length;

    results.push([
      slug,
      title,
      category,
      publishedAt,
      words
    ]);
  }

  const csvContent = results.map(row => row.map(escapeCSV).join(',')).join('\n');
  fs.writeFileSync(auditFile, csvContent, 'utf8');
  console.log(`Generated audit for ${files.length} articles at: ${auditFile}`);
}

audit().catch(console.error);
