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
  const allLocaleSlugs = ["en", "es", "fr", "de", "pt"];
  const defaultLocale = "en";
  const articleMap = new Map(); // slug -> { category, publishedAt }

  // Step 1: Discover articles from English source (Master List)
  if (!fs.existsSync(ARTICLES_DIR)) {
    console.error("English articles directory not found!");
    return;
  }
  
  const enFiles = getFiles(ARTICLES_DIR);
  for (const filePath of enFiles) {
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = matter(content);
    const slug = path.basename(filePath, ".mdx");
    const category = data.category || "life-hacks";
    const publishedAt = parseDate(data.publishedAt || data.date) || parseDate(data.date) || new Date();
    articleMap.set(`${category}/${slug}`, { category, slug, publishedAt });
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

  // Helper to generate hreflang blocks
  function getHreflangBlock(baseUrl) {
    const links = [];
    allLocaleSlugs.forEach(lang => {
      const langUrl = baseUrl.replace(`/${defaultLocale}/`, `/${lang}/`).replace(`/${defaultLocale}`, `/${lang}`);
      links.push(`    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(langUrl)}" />`);
    });
    // Add x-default (usually same as English)
    const xDefaultUrl = baseUrl.replace(`/${defaultLocale}/`, `/${defaultLocale}/`).replace(`/${defaultLocale}`, `/${defaultLocale}`);
    links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(xDefaultUrl)}" />`);
    return links.join("\n");
  }

  // Generate static URLs for all locales
  for (const item of baseStaticPaths) {
    for (const locale of allLocaleSlugs) {
      const urlPath = item.path === "" ? locale : `${locale}/${item.path}`;
      const fullUrl = `${SITE_URL}/${urlPath}`;
      xmlEntries.push(`  <url>
    <loc>${escapeXml(fullUrl)}</loc>
${getHreflangBlock(`${SITE_URL}/${item.path === "" ? defaultLocale : defaultLocale + "/" + item.path}`)}
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
${getHreflangBlock(`${SITE_URL}/${defaultLocale}/${key}`)}
    <lastmod>${a.publishedAt.toISOString().slice(0, 19)}Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${xmlEntries.join("\n")}
</urlset>`;
  
  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), xml);

  console.log(`Successfully generated SEO-optimized sitemap.xml with xhtml:link (hreflang) support.
Processed ${articleMap.size} unique articles for ${allLocaleSlugs.length} locales.
Total URL entries: ${xmlEntries.length}`);
}

main();
