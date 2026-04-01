import matter from 'gray-matter';
import fs from 'fs';

const filePath = 'content/articles/100-items-only.mdx';
try {
  const content = fs.readFileSync(filePath, 'utf8');
  const result = matter(content);
  console.log('Successfully parsed FRONTMATTER:', result.data);
} catch (e) {
  console.error('FAILED parsing:', e);
}

