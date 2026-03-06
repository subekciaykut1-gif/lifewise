/**
 * Article view counts. Data lives in data/article-views.json.
 * Key format: "category/slug". Run npm run generate:article-views to create/refresh the file.
 * Update the JSON from Google Analytics (or another source) for real counts.
 */
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const VIEWS_FILE = path.join(DATA_DIR, "article-views.json");

let viewsMap: Record<string, number> | null = null;

function loadViewsMap(): Record<string, number> {
  if (viewsMap !== null) return viewsMap;
  try {
    if (fs.existsSync(VIEWS_FILE)) {
      const raw = fs.readFileSync(VIEWS_FILE, "utf8");
      viewsMap = JSON.parse(raw) as Record<string, number>;
    } else {
      viewsMap = {};
    }
  } catch {
    viewsMap = {};
  }
  return viewsMap;
}

export function getArticleViews(category: string, slug: string): number {
  const key = `${category}/${slug}`;
  const map = loadViewsMap();
  const n = map[key];
  return typeof n === "number" && n >= 0 ? n : 0;
}

export function formatViewCount(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(views);
}

export function incrementArticleViews(category: string, slug: string): number {
  const key = `${category}/${slug}`;
  const map = loadViewsMap();
  map[key] = (map[key] || 0) + 1;
  
  // During local development, persist to the literal file so we can view changes
  if (process.env.NODE_ENV !== "production") {
    try {
      fs.writeFileSync(VIEWS_FILE, JSON.stringify(map, null, 2), "utf8");
    } catch (err) {
      console.error("Failed to write views JSON:", err);
    }
  }
  
  return map[key];
}
