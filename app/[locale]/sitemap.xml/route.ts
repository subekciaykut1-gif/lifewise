import { NextResponse } from "next/server";
import { getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

const localesList = ["en", "es", "fr", "de", "pt"];
const defaultLocale = "en";
const staticPages = [
  "", "about", "contact", "subscribe", "latest", "trending", "search",
  "category/cleaning", "category/health", "category/food", "category/home-and-garden", 
  "category/life-hacks", "category/diy", "category/beauty", "category/viral-stories",
  "category/technology", "category/finance", "category/real-estate", "category/careers",
  "category/auto", "category/travel", "category/gaming", "category/lifestyle"
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
  
  // Step 1: Discover articles from English source (Master List)
  const masterArticles = await getAllArticles(undefined);
  
  // Filter out future dates and duplicates
  const publishedArticles = masterArticles.filter(a => {
    if (new Date(a.publishedAt || a.date) > now) return false;
    return true;
  });

  const staticLastmod = now.toISOString().slice(0, 10);

  // Helper to generate xhtml:link alternates
  const getAlternates = (basePath: string) => {
    const links = localesList.map(l => 
      `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}${basePath ? '/' + basePath : ''}" />`
    );
    // Add x-default (usually English)
    links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/${defaultLocale}${basePath ? '/' + basePath : ''}" />`);
    return links.join('\n');
  };

  const xmlEntries = staticPages.map((path) => {
    const loc = `${SITE_URL}/${locale}${path ? '/' + path : ''}`;
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${staticLastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
${getAlternates(path)}
  </url>`;
  });

  for (const a of publishedArticles) {
    const path = `${a.category}/${a.slug}`;
    const loc = `${SITE_URL}/${locale}/${path}`;
    const publishedDate = new Date(a.publishedAt || a.date);
    xmlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${publishedDate.toISOString().slice(0, 19)}Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
${getAlternates(path)}
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${xmlEntries.join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
