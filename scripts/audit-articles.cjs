const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(process.cwd(), 'content/articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

const auditResults = {
  total: files.length,
  placeholder: [],
  missingKeywords: [],
  missingImage: [],
  genericAuthor: [],
  shortContent: []
};

const PLACEHOLDER_TEXT = "Whether you're new to this or looking to level up";

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: body } = matter(content);

  const issues = [];
  if (body.includes(PLACEHOLDER_TEXT)) auditResults.placeholder.push(file);
  if (!data.keywords || data.keywords.length === 0) auditResults.missingKeywords.push(file);
  if (!data.image || data.image === "") auditResults.missingImage.push(file);
  if (data.author === "WiseTips Editorial") auditResults.genericAuthor.push(file);
  if (body.length < 500) auditResults.shortContent.push(file);
});

console.log(JSON.stringify({
  total: auditResults.total,
  placeholderCount: auditResults.placeholder.length,
  missingKeywordsCount: auditResults.missingKeywords.length,
  missingImageCount: auditResults.missingImage.length,
  genericAuthorCount: auditResults.genericAuthor.length,
  shortContentCount: auditResults.shortContent.length,
  samplePlaceholders: auditResults.placeholder.slice(0, 5)
}, null, 2));
