/**
 * Generates single sitemap for SEO.
 * Run: node scripts/generate-sitemaps.cjs
 */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://wisetips.co";
const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const LOCALE_DIRS = {
  es: path.join(process.cwd(), "content", "es"),
  fr: path.join(process.cwd(), "content", "fr"),
  de: path.join(process.cwd(), "content", "de"),
  pt: path.join(process.cwd(), "content", "pt"),
};
const PUBLIC_DIR = path.join(process.cwd(), "public");

function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...getFiles(full));
    else if (e.isFile() && e.name.endsWith(".mdx")) files.push(full);
  }
  return files;
}

function parseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function getAllArticles(locale = null) {
  const dir = locale ? LOCALE_DIRS[locale] : ARTICLES_DIR;
  if (!fs.existsSync(dir)) return [];
  
  const files = getFiles(dir);
  const now = new Date();
  return files
    .map((filePath) => {
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);
      const slug = path.basename(filePath, ".mdx");
      const publishedAt = parseDate(data.publishedAt || data.date) || parseDate(data.date) || now;
      return {
        slug,
        category: data.category || "life-hacks",
        date: data.date,
        publishedAt,
        locale: locale || 'en',
      };
    });
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function main() {
  const allArticles = [];
  
  // Add English articles
  allArticles.push(...getAllArticles());
  
  // Add localized articles
  for (const locale of Object.keys(LOCALE_DIRS)) {
    allArticles.push(...getAllArticles(locale));
  }

  const staticLastmod = new Date().toISOString().slice(0, 10);
  
  // Static URLs
  const staticUrls = [
    { path: "", priority: "1.0" },
    { path: "about", priority: "0.8" },
    { path: "contact", priority: "0.7" },
    { path: "subscribe", priority: "0.8" },
    { path: "latest", priority: "0.9" },
    { path: "trending", priority: "0.8" },
    { path: "search", priority: "0.6" },
  ];
  
  // Add localized static URLs
  for (const locale of Object.keys(LOCALE_DIRS)) {
    staticUrls.push({ path: locale, priority: "0.9" });
    staticUrls.push({ path: `${locale}/about`, priority: "0.8" });
    staticUrls.push({ path: `${locale}/contact`, priority: "0.7" });
    staticUrls.push({ path: `${locale}/subscribe`, priority: "0.8" });
    staticUrls.push({ path: `${locale}/latest`, priority: "0.9" });
    staticUrls.push({ path: `${locale}/trending`, priority: "0.8" });
    staticUrls.push({ path: `${locale}/search`, priority: "0.6" });
  }
  
  const categorySlugs = ["cleaning", "health", "food", "home-and-garden", "life-hacks", "diy", "beauty", "viral-stories"];
  for (const c of categorySlugs) {
    staticUrls.push({ path: "category/" + c, priority: "0.8" });
    // Add localized category URLs
    for (const locale of Object.keys(LOCALE_DIRS)) {
      staticUrls.push({ path: `${locale}/category/${c}`, priority: "0.8" });
    }
  }

  // Generate article URLs
  const articleUrls = allArticles.map((a) => {
    const urlPrefix = a.locale === 'en' ? '' : `/${a.locale}`;
    return `  <url>\n    <loc>${escapeXml(SITE_URL + urlPrefix + "/" + a.category + "/" + a.slug)}</loc>\n    <lastmod>${a.publishedAt.toISOString().slice(0, 19).replace("T", "T")}Z</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
  });

  // Generate static URLs
  const staticXmlEntries = staticUrls.map((u) => 
    `  <url>\n    <loc>${escapeXml(SITE_URL + "/" + u.path)}</loc>\n    <lastmod>${staticLastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXmlEntries.join("\n")}
${articleUrls.join("\n")}
</urlset>`;
  
  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), xml);

  console.log("Generated single sitemap.xml with", allArticles.length, "articles and", staticUrls.length, "static pages");
}

main();
