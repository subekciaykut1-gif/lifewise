import { getPublishedArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600; // Revalidate every hour

const SITE_NAME = "LifeWise";

function escapeXml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** English-only feed at /feed (canonical). Locale feeds at /es/feed, /fr/feed, etc. */
export async function GET() {
  const articles = (await getPublishedArticles("en")).slice(0, 50);
  const lastBuild = articles[0]
    ? new Date(articles[0].publishedAt || articles[0].date).toUTCString()
    : new Date().toUTCString();

  const items = articles
    .map((a) => {
      const link = `${SITE_URL}/en/${a.category}/${a.slug}`;
      const pubDate = new Date(a.publishedAt || a.date).toUTCString();
      const title = escapeXml(a.title);
      const description = escapeXml(a.excerpt || "");
      return `  <item>
    <title>${title}</title>
    <link>${escapeXml(link)}</link>
    <description>${description}</description>
    <pubDate>${pubDate}</pubDate>
    <guid isPermaLink="true">${escapeXml(link)}</guid>
  </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}/en</link>
    <description>Smarter Living, Every Day. Life hacks, health tips, cleaning tricks, and viral stories.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
