import { getPublishedArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";
import { NextResponse } from "next/server";

export const revalidate = 3600; // Revalidate every hour

const SITE_NAME = "LifeWise";

const FEED_LANGUAGE: Record<string, string> = {
  es: "es",
  fr: "fr",
  de: "de",
  pt: "pt",
};

function escapeXml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRFC822(date: Date): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const pad = (n: number) => n < 10 ? '0' + n : n;
  
  return `${days[date.getUTCDay()]}, ${pad(date.getUTCDate())} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} +0000`;
}

/** Locale-specific feeds: /es/feed, /fr/feed, /de/feed, /pt/feed. English redirects to /feed. */
export async function GET(
  _request: Request,
  context: { params: Promise<{ locale: string }> }
) {
  const { locale } = await context.params;

  const articles = (await getPublishedArticles(locale)).slice(0, 50);
  const lastBuild = articles[0]
    ? toRFC822(new Date(articles[0].publishedAt || articles[0].date))
    : toRFC822(new Date());

  const selfLink = `${SITE_URL}/${locale}/feed`;
  const lang = FEED_LANGUAGE[locale] ?? locale;

  const items = articles
    .map((a) => {
      const link = `${SITE_URL}/${locale}/${a.category}/${a.slug}`;
      const pubDate = toRFC822(new Date(a.publishedAt || a.date));
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
    <link>${SITE_URL}/${locale}</link>
    <description>Smarter Living, Every Day. Life hacks, health tips, cleaning tricks, and viral stories.</description>
    <language>${lang}</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${selfLink}" rel="self" type="application/rss+xml" />
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
