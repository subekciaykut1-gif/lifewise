/**
 * Pinterest-optimized image URLs.
 * Use getPinterestImageUrl to get a 1000×1500 image URL (served by /api/pinterest-image).
 */

import type { Article } from "./articles";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://wisetips.co";

/**
 * Returns the public URL for the Pinterest-optimized image (1000×1500 with title overlay).
 * This URL is consumed by the /api/pinterest-image route and by the Save button.
 */
export function getPinterestImageUrl(article: Pick<Article, "slug" | "category">, baseUrl = SITE_URL): string {
  const params = new URLSearchParams({ slug: article.slug, category: article.category });
  return `${baseUrl.replace(/\/$/, "")}/api/pinterest-image?${params.toString()}`;
}

/**
 * Pinterest recommended pin size (2:3 aspect ratio).
 */
export const PINTEREST_IMAGE_WIDTH = 1000;
export const PINTEREST_IMAGE_HEIGHT = 1500;
