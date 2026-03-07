"use server";

import { formatViewCount } from "./article-views-shared";
import { sql } from "./db";

export { formatViewCount };

export interface ViewStats {
  category: string;
  slug: string;
  views: number;
}

/**
 * Fetches the view count for a single article.
 */
export async function getArticleViews(category: string, slug: string): Promise<number> {
  try {
    const result = await sql`
      SELECT views FROM article_views 
      WHERE category = ${category} AND slug = ${slug}
      LIMIT 1
    `;
    return result[0]?.views || 0;
  } catch (error) {
    console.error(`Error fetching views for ${category}/${slug}:`, error);
    return 0;
  }
}

/**
 * Fetches ALL view counts in a single query for optimized bulk loading.
 * Returns a Map for fast O(1) lookups.
 */
export async function getAllArticleViews(): Promise<Map<string, number>> {
  try {
    const results = await sql`SELECT category, slug, views FROM article_views`;
    const viewsMap = new Map<string, number>();
    for (const row of results) {
      viewsMap.set(`${row.category}/${row.slug}`, row.views);
    }
    return viewsMap;
  } catch (error) {
    console.error("Error fetching all article views:", error);
    return new Map();
  }
}

/**
 * Increments the view count for an article using atomic SQL update.
 */
export async function incrementArticleViews(category: string, slug: string): Promise<number> {
  try {
    const result = await sql`
      INSERT INTO article_views (category, slug, views)
      VALUES (${category}, ${slug}, 1)
      ON CONFLICT (category, slug)
      DO UPDATE SET views = article_views.views + 1
      RETURNING views
    `;
    return result[0]?.views || 0;
  } catch (error) {
    console.error(`Error incrementing views for ${category}/${slug}:`, error);
    return 0;
  }
}
