const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(__dirname, 'content', 'articles');
const appLocaleDir = path.join(__dirname, 'app', '[locale]');

// Standard next.js routes in the website vs potential explicit categories
const commonRoutes = [
    '[category]', '[slug]', 'about', 'advertise', 'affiliate-disclosure', 'author',
    'category', 'contact', 'cookie-policy', 'feed', 'latest', 'privacy-policy', 
    'quizzes', 'saved-hacks', 'search', 'sitemap.xml', 'subscribe', 'terms-of-use', 
    'trending', 'write-for-us'
];

async function main() {
    // 1. Scan MDX files
    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
    const categoryCounts = {};
    
    for (const file of files) {
        const filePath = path.join(articlesDir, file);
        const raw = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(raw);
        
        const cat = data.category || '[NONE/MISSING]';
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }
    
    // Sort descending
    const sortedCats = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([c, count]) => ({ category: c, count }));
    
    // 2. Map existing routes in app/[locale]/
    const allRoutes = fs.readdirSync(appLocaleDir).filter(f => {
        const stat = fs.statSync(path.join(appLocaleDir, f));
        return stat.isDirectory() && !f.startsWith('(');
    });

    // Let's also check if they have explicit folders manually created
    const explicitCategoryRoutes = allRoutes.filter(r => !commonRoutes.includes(r));

    // Wait, the prompt exactly says:
    // "Category pages that exist in app/[locale]/category/ but have NO articles assigned to them"
    // Let's check app/[locale]/category/
    let categoryFolderRoutes = [];
    const appLocaleCategoryDir = path.join(appLocaleDir, 'category');
    if (fs.existsSync(appLocaleCategoryDir)) {
        categoryFolderRoutes = fs.readdirSync(appLocaleCategoryDir).filter(f => fs.statSync(path.join(appLocaleCategoryDir, f)).isDirectory());
    }

    const report = {
        scanResults: sortedCats,
        appLocaleRoutes: allRoutes,
        categoryFolderRoutes: categoryFolderRoutes,
        explicitCategoryFolders: explicitCategoryRoutes
    };

    fs.writeFileSync('category_scan_report.json', JSON.stringify(report, null, 2));
}

main().catch(console.error);
