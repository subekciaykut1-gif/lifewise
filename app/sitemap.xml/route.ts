import { SITE_URL } from "@/lib/site";

export async function GET() {
  const locales = ["en", "es", "fr", "de", "pt"];
  const sitemaps = locales.map(locale => {
    return `  <sitemap>
    <loc>${SITE_URL}/${locale}/sitemap.xml</loc>
  </sitemap>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.join("\n")}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
