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
  const allLocaleSlugs = ['en', 'es', 'fr', 'de', 'pt'];
  const ARTICLES_DIR_EN = ARTICLES_DIR;
  
  // Get all unique article slugs across all locales
  const articleMap = new Map(); // slug -> { category, publishedAt }
  
  const localesToScan = [{ code: 'en', dir: ARTICLES_DIR_EN }, ...Object.keys(LOCALE_DIRS).map(l => ({ code: l, dir: LOCALE_DIRS[l] }))];
  
  for (const { dir } of localesToScan) {
    if (!fs.existsSync(dir)) continue;
    const files = getFiles(dir);
    for (const filePath of files) {
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);
      const slug = path.basename(filePath, ".mdx");
      const category = data.category || "life-hacks";
      const publishedAt = parseDate(data.publishedAt || data.date) || parseDate(data.date) || new Date();
      
      const key = `${category}/${slug}`;
      if (!articleMap.has(key) || articleMap.get(key).publishedAt < publishedAt) {
        articleMap.set(key, { category, slug, publishedAt });
      }
    }
  }

  const staticLastmod = new Date().toISOString().slice(0, 10);
  
  // Base paths for static pages (without locale)
  const baseStaticPaths = [
    { path: "", priority: "1.0", freq: "weekly" },
    { path: "about", priority: "0.8", freq: "monthly" },
    { path: "contact", priority: "0.7", freq: "monthly" },
    { path: "subscribe", priority: "0.8", freq: "monthly" },
    { path: "latest", priority: "0.9", freq: "weekly" },
    { path: "trending", priority: "0.8", freq: "weekly" },
    { path: "search", priority: "0.6", freq: "monthly" },
  ];
  
  const categorySlugs = [
    "cleaning", "health", "food", "home-and-garden", "life-hacks", "diy", "beauty", "viral-stories",
    "technology", "finance", "real-estate", "careers", "auto", "travel", "gaming", "lifestyle"
  ];
  for (const c of categorySlugs) {
    baseStaticPaths.push({ path: "category/" + c, priority: "0.8", freq: "weekly" });
  }

  const xmlEntries = [];

  // Generate static URLs for all locales
  for (const item of baseStaticPaths) {
    for (const locale of allLocaleSlugs) {
      const urlPath = item.path === "" ? locale : `${locale}/${item.path}`;
      xmlEntries.push(`  <url>
    <loc>${escapeXml(SITE_URL + "/" + urlPath)}</loc>
    <lastmod>${staticLastmod}</lastmod>
    <changefreq>${item.freq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`);
    }
  }

  // Generate article URLs for all locales
  for (const [key, a] of articleMap.entries()) {
    for (const locale of allLocaleSlugs) {
      const locUrl = `${SITE_URL}/${locale}/${key}`;
      xmlEntries.push(`  <url>
    <loc>${escapeXml(locUrl)}</loc>
    <lastmod>${a.publishedAt.toISOString().slice(0, 19)}Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries.join("\n")}
</urlset>`;
  
  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), xml);

  console.log("Generated single sitemap.xml with", articleMap.size * 5, "article entries and", baseStaticPaths.length * 5, "static entries");
}

main();
