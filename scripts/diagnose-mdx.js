const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '..', 'content', 'articles');

const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
const issues = [];

for (const file of files) {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const slug = file.replace('.mdx', '');

  // Extract frontmatter
  const parts = content.split(/^---$/m);
  if (parts.length < 3) {
    issues.push({ slug, error: 'MISSING FRONTMATTER — no --- delimiters found' });
    continue;
  }

  const fm = parts[1];
  const fileIssues = [];

  // Check for required fields
  if (!fm.match(/title:/)) fileIssues.push('missing title');
  if (!fm.match(/category:/)) fileIssues.push('missing category');

  const dateMatch = fm.match(/date:\s*['"]?(.+?)['"]?\s*$/m);
  const pubMatch = fm.match(/publishedAt:\s*['"]?(.+?)['"]?\s*$/m);

  if (!dateMatch && !pubMatch) {
    fileIssues.push('missing BOTH date and publishedAt');
  } else {
    if (dateMatch) {
      const d = new Date(dateMatch[1].trim());
      if (isNaN(d.getTime())) fileIssues.push(`invalid date: "${dateMatch[1].trim()}"`);
    }
    if (pubMatch) {
      const d = new Date(pubMatch[1].trim());
      if (isNaN(d.getTime())) fileIssues.push(`invalid publishedAt: "${pubMatch[1].trim()}"`);
    }
  }

  // Check for unclosed quotes in frontmatter (common Ollama output bug)
  const lines = fm.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('-')) continue;
    const quoteCount = (trimmed.match(/"/g) || []).length;
    if (quoteCount % 2 !== 0) {
      fileIssues.push(`unclosed quote on line: ${trimmed.substring(0, 80)}`);
    }
  }

  if (fileIssues.length > 0) {
    issues.push({ slug, errors: fileIssues });
  }
}

if (issues.length === 0) {
  console.log('✅ All MDX files look clean! No frontmatter issues found.');
} else {
  console.log(`\n❌ Found ${issues.length} files with issues:\n`);
  for (const issue of issues) {
    console.log(`  📄 ${issue.slug}`);
    const errs = issue.error ? [issue.error] : issue.errors;
    for (const e of errs) {
      console.log(`     → ${e}`);
    }
  }
  console.log('\nRun: node scripts/fix-article-dates.js to auto-fix date issues.');
}
