import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import path from "path";

/** Browse node from https://www.amazon.com/b?node=120697190011 */
export const AMAZON_TRENDING_BROWSE_NODE = "120697190011";

export interface AffiliateProduct {
  id: string;
  categories: string[];
  keywords: string[];
  label: string;
  url: string;
  active: boolean;
  description?: string;
  imageUrl?: string;
}

const CACHE_FILENAME = "amazon-trending-cache.json";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function getCachePath(): string {
  return path.join(process.cwd(), "data", CACHE_FILENAME);
}

function getStaticPath(): string {
  return path.join(process.cwd(), "data", "affiliate-products.json");
}

interface CacheShape {
  fetchedAt: string;
  products: AffiliateProduct[];
}

/**
 * Reads affiliate products: prefers cached trending from Amazon (browse node 120697190011)
 * when cache exists and is fresh; otherwise falls back to static data/affiliate-products.json.
 */
export function getAffiliateProducts(): AffiliateProduct[] {
  const cachePath = getCachePath();
  if (existsSync(cachePath)) {
    try {
      const raw = readFileSync(cachePath, "utf-8");
      const cache: CacheShape = JSON.parse(raw);
      const fetchedAt = new Date(cache.fetchedAt).getTime();
      if (Date.now() - fetchedAt < CACHE_TTL_MS && Array.isArray(cache.products) && cache.products.length > 0) {
        return cache.products;
      }
    } catch {
      // ignore parse/read errors, fall through to static
    }
  }

  try {
    const staticPath = getStaticPath();
    if (existsSync(staticPath)) {
      const raw = readFileSync(staticPath, "utf-8");
      const products = JSON.parse(raw) as AffiliateProduct[];
      return Array.isArray(products) ? products : [];
    }
  } catch {
    // ignore
  }

  return [];
}

/**
 * Writes the trending cache (used by scripts/refresh-amazon-trending.cjs).
 */
export function writeTrendingCache(products: AffiliateProduct[]): void {
  const cachePath = getCachePath();
  const dir = path.dirname(cachePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  const payload: CacheShape = {
    fetchedAt: new Date().toISOString(),
    products,
  };
  writeFileSync(cachePath, JSON.stringify(payload, null, 2), "utf-8");
}
