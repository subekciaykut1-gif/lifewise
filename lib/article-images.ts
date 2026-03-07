"use server";

import fs from "fs";
import path from "path";

const UNSPLASH_BASE = "https://images.unsplash.com";
const unsplash = (id: string, w = 1200) =>
  `${UNSPLASH_BASE}/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

/**
 * Contextual image overrides for articles that had duplicate or mismatched images.
 * Only slugs listed here replace frontmatter; all others use frontmatter image or category fallback.
 */
const SLUG_IMAGE_OVERRIDES: Record<string, string> = {
  "eggs-in-fridge": unsplash("1520715293529-bbc0a2793fea"), // eggs / breakfast (was same as freezer)
  "baking-soda-cleaning-hacks": unsplash("1638949493140-edb10b7be2f3"), // cleaning supplies (was same as baking-soda-hacks)
  "15-kitchen-hacks": unsplash("1683555500010-e2315045eef9"), // people preparing food in kitchen (replaces 404)
  "apple-cider-vinegar-benefits": unsplash("1628268909461-ec1eec52a74e"), // vinegar bottle / healthy drink (replaces 404)
};

/** Category fallbacks when no valid image is set (thematic default per category). */
const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  cleaning: unsplash("1638949493140-edb10b7be2f3"),
  health: unsplash("1659087374131-6707281eba1a"),
  food: unsplash("1683555500010-e2315045eef9"), // kitchen/food prep (replaces 404 ID)
  "home-and-garden": unsplash("1601760561441-16420502c7e0"),
  "life-hacks": unsplash("1506452819137-0422416856b8"),
  diy: unsplash("1608752503578-52f35965e3d9"),
  beauty: unsplash("1626783416763-67a92e5e7266"),
  "viral-stories": unsplash("1506452819137-0422416856b8"),
};

/**
 * Returns a contextually appropriate image URL for an article.
 * Priority: slug override > valid frontmatter/local image > category fallback > themed picsum.
 */
export function getArticleImage(
  slug: string,
  category: string,
  frontmatterImage: string | undefined,
  publicDirectory: string
): string {
  const override = SLUG_IMAGE_OVERRIDES[slug];
  if (override) return override;

  if (frontmatterImage) {
    const isExternal = frontmatterImage.startsWith("http");
    if (isExternal) return frontmatterImage;
    const fullPath = path.join(publicDirectory, frontmatterImage);
    if (fs.existsSync(fullPath)) return `/${frontmatterImage}`;
  }

  const categoryFallback = CATEGORY_FALLBACK_IMAGES[category];
  if (categoryFallback) return categoryFallback;

  return `https://picsum.photos/seed/${slug}-${category}/600/400`;
}
