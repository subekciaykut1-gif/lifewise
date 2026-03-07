import { getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";
import { Article } from "@/lib/types";

// Static pages
const staticPages = [
  { path: "", priority: "1.0" },
  { path: "about", priority: "0.8" },
  { path: "contact", priority: "0.7" },
  { path: "subscribe", priority: "0.8" },
  { path: "latest", priority: "0.9" },
  { path: "trending", priority: "0.8" },
  { path: "search", priority: "0.6" },
];

const categorySlugs = ["cleaning", "health", "food", "home-and-garden", "life-hacks", "diy", "beauty", "viral-stories"];
const locales = ["es", "fr", "de", "pt"];

// Add category pages
for (const c of categorySlugs) {
  staticPages.push({ path: "category/" + c, priority: "0.8" });
}

// Add localized static pages
for (const locale of locales) {
  staticPages.push({ path: locale, priority: "0.9" });
  staticPages.push({ path: `${locale}/about`, priority: "0.8" });
  staticPages.push({ path: `${locale}/contact`, priority: "0.7" });
  staticPages.push({ path: `${locale}/subscribe`, priority: "0.8" });
  staticPages.push({ path: `${locale}/latest`, priority: "0.9" });
  staticPages.push({ path: `${locale}/trending`, priority: "0.8" });
  staticPages.push({ path: `${locale}/search`, priority: "0.6" });
  
  // Add localized category pages
  for (const c of categorySlugs) {
    staticPages.push({ path: `${locale}/category/${c}`, priority: "0.8" });
  }
}

function escapeXml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const allArticles: any[] = [];
  
  // Add English articles (call with no parameters to use default)
  const englishArticles = await getAllArticles();
  for (const article of englishArticles) {
    allArticles.push(Object.assign({}, article, { locale: 'en' }));
  }
  
  // Add localized articles
  for (const locale of locales) {
    const localeArticles = await getAllArticles(locale);
    for (const article of localeArticles) {
      allArticles.push(Object.assign({}, article, { locale }));
    }
  }

  const staticLastmod = new Date().toISOString().slice(0, 10);

  // Generate static URLs
  const staticXmlEntries = staticPages.map((u) => 
    `  <url>\n    <loc>${escapeXml(SITE_URL + "/" + u.path)}</loc>\n    <lastmod>${staticLastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  );

  // Generate article URLs
  const articleUrls = allArticles.map((a) => {
    const urlPrefix = a.locale === 'en' ? '' : `/${a.locale}`;
    const publishedDate = new Date(a.publishedAt || a.date);
    return `  <url>\n    <loc>${escapeXml(SITE_URL + urlPrefix + "/" + a.category + "/" + a.slug)}</loc>\n    <lastmod>${publishedDate.toISOString().slice(0, 19).replace("T", "T")}Z</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXmlEntries.join("\n")}
${articleUrls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
