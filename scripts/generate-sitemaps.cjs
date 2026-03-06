/**
 * Generates staggered monthly sitemaps + index for SEO (avoids Google spam flags).
 * Run: node scripts/generate-sitemaps.cjs
 */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://wisetips.co";
const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const SITEMAP_DIR = path.join(process.cwd(), "public", "sitemaps");

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

function getAllArticles() {
  const files = getFiles(ARTICLES_DIR);
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
  if (!fs.existsSync(SITEMAP_DIR)) fs.mkdirSync(SITEMAP_DIR, { recursive: true });

  const articles = getAllArticles();
  const byMonth = {};
  for (const a of articles) {
    const key = a.publishedAt.toISOString().slice(0, 7);
    if (!byMonth[key]) byMonth[key] = [];
    byMonth[key].push(a);
  }

  const indexEntries = [];

  for (const [month, monthArticles] of Object.entries(byMonth).sort()) {
    const filename = `sitemap-${month}.xml`;
    const urlset = monthArticles
      .map(
        (a) =>
          `  <url>\n    <loc>${escapeXml(SITE_URL + "/" + a.category + "/" + a.slug)}</loc>\n    <lastmod>${a.publishedAt.toISOString().slice(0, 19).replace("T", "T")}Z</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
      )
      .join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`;
    fs.writeFileSync(path.join(SITEMAP_DIR, filename), xml);
    const lastMod = monthArticles[monthArticles.length - 1].publishedAt.toISOString().slice(0, 10);
    indexEntries.push({ loc: `${SITE_URL}/sitemaps/${filename}`, lastmod: lastMod });
  }

  const staticLastmod = new Date().toISOString().slice(0, 10);
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${escapeXml(SITE_URL)}/sitemaps/sitemap-static.xml</loc>
    <lastmod>${staticLastmod}</lastmod>
  </sitemap>
${indexEntries.map((e) => `  <sitemap>\n    <loc>${escapeXml(e.loc)}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </sitemap>`).join("\n")}
</sitemapindex>`;
  fs.writeFileSync(path.join(SITEMAP_DIR, "sitemap-index.xml"), indexXml);

  const staticUrls = [
    { path: "", priority: "1.0" },
    { path: "about", priority: "0.8" },
    { path: "contact", priority: "0.7" },
    { path: "subscribe", priority: "0.8" },
    { path: "latest", priority: "0.9" },
    { path: "trending", priority: "0.8" },
    { path: "search", priority: "0.6" },
  ];
  const categorySlugs = ["cleaning", "health", "food", "home-and-garden", "life-hacks", "diy", "beauty", "viral-stories"];
  for (const c of categorySlugs) staticUrls.push({ path: "category/" + c, priority: "0.8" });
  const staticXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.map((u) => `  <url>\n    <loc>${escapeXml(SITE_URL + "/" + u.path)}</loc>\n    <lastmod>${staticLastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join("\n")}
</urlset>`;
  fs.writeFileSync(path.join(SITEMAP_DIR, "sitemap-static.xml"), staticXml);

  console.log("Generated sitemap-index.xml +", Object.keys(byMonth).length, "monthly sitemaps + sitemap-static.xml in public/sitemaps/");
}

main();
