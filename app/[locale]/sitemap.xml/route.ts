import { getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

const localesList = ["en", "es", "fr", "de", "pt"];
const staticPages = [
  "", "about", "contact", "subscribe", "latest", "trending", "search",
  "category/cleaning", "category/health", "category/food", "category/home-and-garden", 
  "category/life-hacks", "category/diy", "category/beauty", "category/viral-stories"
];

function escapeXml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(request: Request, context: { params: Promise<{ locale: string }> }) {
  const { locale } = await context.params;
  
  if (!localesList.includes(locale)) {
    return new Response("Not found", { status: 404 });
  }

  const now = new Date();
  const allArticles = await getAllArticles(locale === "en" ? undefined : locale);
  // Create set for duplicate checking
  const allSlugs = new Set(allArticles.map(a => a.slug));

  // Filter out future dates and numbered duplicates
  const publishedArticles = allArticles.filter(a => {
    if (new Date(a.publishedAt || a.date) > now) return false;
    const match = a.slug.match(/^(.+)-\d+$/);
    if (match && allSlugs.has(match[1])) return false;
    return true;
  });

  const staticLastmod = now.toISOString().slice(0, 10);

  // Generate xhtml:link alternates
  const generateAlternates = (basePath: string) => {
    return localesList.map(l => 
      `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}${basePath ? '/' + basePath : ''}" />`
    ).join('\n') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en${basePath ? '/' + basePath : ''}" />`;
  };

  const xmlEntries = staticPages.map((path) => {
    const loc = `${SITE_URL}/${locale}${path ? '/' + path : ''}`;
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${staticLastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
${generateAlternates(path)}
  </url>`;
  });

  for (const a of publishedArticles) {
    const path = `${a.category}/${a.slug}`;
    const loc = `${SITE_URL}/${locale}/${path}`;
    const publishedDate = new Date(a.publishedAt || a.date);
    xmlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${publishedDate.toISOString().slice(0, 19).replace("T", "T")}Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
${generateAlternates(path)}
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${xmlEntries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
