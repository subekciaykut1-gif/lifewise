import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const ARTICLES_DIR = './content/articles';

async function fixTitles() {
  const files = (await fs.readdir(ARTICLES_DIR)).filter(f => f.endsWith('.mdx'));
  let fixedCount = 0;

  for (const file of files) {
    const filePath = path.join(ARTICLES_DIR, file);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data: frontmatter, content: body } = matter(fileContent);
    
    if (frontmatter.title) {
      const oldTitle = frontmatter.title;
      // Sanitize: remove **, quotes, and #
      const cleanTitle = oldTitle
        .replace(/\*\*/g, '')
        .replace(/^["']|["']$/g, '')
        .replace(/^#+\s?/, '')
        .trim();
      
      if (cleanTitle !== oldTitle) {
        frontmatter.title = cleanTitle;
        if (frontmatter.metaTitle) frontmatter.metaTitle = cleanTitle;
        const updatedContent = matter.stringify(body, frontmatter);
        await fs.writeFile(filePath, updatedContent, 'utf-8');
        console.log(`[FIXED] ${file}: ${oldTitle} -> ${cleanTitle}`);
        fixedCount++;
      }
    }
  }

  console.log(`\nDONE: Cleaned up ${fixedCount} article titles.`);
}

fixTitles().catch(console.error);
