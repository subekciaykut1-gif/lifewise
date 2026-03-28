const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const report = { sections: {} };

try {
  // SEC 1: Project Structure
  report.sections.structure = {};
  report.sections.structure.appLocale = fs.existsSync(path.join(rootDir, 'app', '[locale]'));
  report.sections.structure.articles = fs.existsSync(path.join(rootDir, 'content', 'articles'));
  
  const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
  report.sections.structure.deps = Object.keys(pkg.dependencies || {}).length;
  report.sections.structure.devDependencies = Object.keys(pkg.devDependencies || {}).length;
  
  const envPath = path.join(rootDir, '.env');
  const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
  report.sections.structure.env = {
    gemini: envContent.includes('GEMINI_API_KEY'),
    adsense: envContent.includes('NEXT_PUBLIC_ADSENSE_CLIENT') || envContent.includes('ADSENSE'),
    disqus: envContent.includes('NEXT_PUBLIC_DISQUS_SHORTNAME') || envContent.includes('DISQUS')
  };

  // SEC 2: Next.js Config
  const nextConfig = fs.existsSync(path.join(rootDir, 'next.config.ts')) ? fs.readFileSync(path.join(rootDir, 'next.config.ts'), 'utf8') : '';
  const middleware = fs.existsSync(path.join(rootDir, 'middleware.ts')) ? fs.readFileSync(path.join(rootDir, 'middleware.ts'), 'utf8') : '';
  report.sections.config = {
    remotePatterns: nextConfig.includes('remotePatterns') && nextConfig.includes('unsplash'),
    redirectsCount: (nextConfig.match(/permanent:\s*true/g) || []).length,
    nextIntlMiddleware: middleware.includes('createMiddleware') || middleware.includes('next-intl')
  };

  // SEC 3: i18n
  report.sections.i18n = {};
  const locales = ['en', 'es', 'fr', 'de', 'pt'];
  const keys = {};
  for (const loc of locales) {
    const p = path.join(rootDir, 'messages', `${loc}.json`);
    if(fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      keys[loc] = Object.keys(data).length; // Flat count just as heuristic
    } else {
      keys[loc] = 0;
    }
  }
  report.sections.i18n.keys = keys;

  // SEC 6: Content Audit
  const articlesDir = path.join(rootDir, 'content', 'articles');
  const mdxFiles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
  
  let totalWords = 0;
  let missingFrontmatter = 0;
  let wordDist = { '<300': 0, '300-449': 0, '450-599': 0, '600-799': 0, '800+': 0 };
  let scheduled = 0;
  let live = 0;
  let affiliateLinks = 0;
  let bannedCount = 0;
  const bannedPhrases = ["Consistency beats intensity", "doesn't always require expensive tools", "Pick one area to focus on this week", "use a quality"];

  for (const file of mdxFiles) {
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
    
    // Frontmatter check
    if (!content.includes('title:') || !content.includes('excerpt:')) missingFrontmatter++;
    
    // Words
    const bodyMatch = content.match(/^---[\s\S]+?---\n([\s\S]*)$/);
    if(bodyMatch) {
       const body = bodyMatch[1];
       const words = body.split(/\s+/).filter(w => w.length > 0).length;
       totalWords += words;
       if (words < 300) wordDist['<300']++;
       else if (words < 450) wordDist['300-449']++;
       else if (words < 600) wordDist['450-599']++;
       else if (words < 800) wordDist['600-799']++;
       else wordDist['800+']++;

       for(const bp of bannedPhrases) {
         if (body.includes(bp)) bannedCount++;
       }
       
       const amznLinks = (body.match(/amazon\.com/g) || []).length;
       affiliateLinks += amznLinks;
    }
  }

  report.sections.content = {
    totalArticles: mdxFiles.length,
    missingFrontmatter,
    wordDist,
    avgWords: Math.floor(totalWords / mdxFiles.length),
    affiliateLinks,
    bannedPhrasesHit: bannedCount
  };

  const thinReportPath = path.join(rootDir, 'thin-articles-report.txt');
  if (fs.existsSync(thinReportPath)) {
    const thinReport = fs.readFileSync(thinReportPath, 'utf8');
    report.sections.content.thinReport = {
      rewritten: (thinReport.match(/\[REWRITTEN\]/g) || []).length,
      shells: (thinReport.match(/\[TEMPLATE_SHELL\]/g) || []).length,
      totalLines: thinReport.split('\n').length
    };
  }

  // Write out
  console.log(JSON.stringify(report, null, 2));

} catch (e) {
  console.error("Audit script failed:", e);
}
