import { getPublishedArticles } from "@/lib/articles";

export const revalidate = 3600; // Revalidate every hour

import { SITE_URL } from "@/lib/site";

const SITE_NAME = "LifeWise";

function escapeXml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ locale?: string }> }
) {
  const { locale = "en" } = await context.params;
  const articles = (await getPublishedArticles(locale)).slice(0, 50);
  const lastBuild = articles[0] ? new Date(articles[0].publishedAt || articles[0].date).toUTCString() : new Date().toUTCString();

  const items = articles
    .map(
      (a) => {
        const link = `${SITE_URL}/${locale}/${a.category}/${a.slug}`;
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
      }
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>Smarter Living, Every Day. Life hacks, health tips, cleaning tricks, and viral stories.</description>
    <language>en-us</language>
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
