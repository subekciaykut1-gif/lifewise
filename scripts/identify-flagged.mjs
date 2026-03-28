
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = './content';
const locales = ['articles', 'es', 'fr', 'pt', 'de'];

let excerptWarnings = 0;
let seoWarnings = 0;
const flaggedFiles = [];

locales.forEach(locale => {
    const dir = path.join(contentDir, locale);
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        const genericExcerpt = "Learn how to get better results with";
        const hasExcerptWarning = !data.excerpt || data.excerpt.includes(genericExcerpt) || data.excerpt.includes("[topic]");
        
        const wordCount = content.trim().split(/\s+/).length;
        const hasSeoWarning = wordCount < 600;

        if (hasExcerptWarning || hasSeoWarning) {
            flaggedFiles.push({
                path: filePath,
                hasExcerptWarning,
                hasSeoWarning,
                wordCount,
                title: data.title
            });
            if (hasExcerptWarning) excerptWarnings++;
            if (hasSeoWarning) seoWarnings++;
        }
    });
});

console.log(`Total Flagged Files: ${flaggedFiles.length}`);
console.log(`Excerpt Warnings: ${excerptWarnings}`);
console.log(`SEO Warnings: ${seoWarnings}`);
fs.writeFileSync('flagged_articles.json', JSON.stringify(flaggedFiles, null, 2));
