/**
 * Pinterest-optimized image URLs.
 * Use getPinterestImageUrl to get a 1000×1500 image URL (served by /api/pinterest-image).
 */

import type { Article } from "./types";
import { SITE_URL } from "./site";

/**
 * Returns the public URL for the Pinterest-optimized image (1000×1500 with title overlay).
 * This URL is consumed by the /api/pinterest-image route and by the Save button.
 */
export function getPinterestImageUrl(article: Pick<Article, "slug" | "category">, baseUrl?: string): string {
  const base = baseUrl ?? SITE_URL;
  const params = new URLSearchParams({ slug: article.slug, category: article.category });
  return `${base.replace(/\/$/, "")}/api/pinterest-image?${params.toString()}`;
}

/**
 * Pinterest recommended pin size (2:3 aspect ratio).
 */
export const PINTEREST_IMAGE_WIDTH = 1000;
export const PINTEREST_IMAGE_HEIGHT = 1500;
