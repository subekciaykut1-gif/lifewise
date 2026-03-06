/**
 * Article view count utilities.
 * NOTE: Filesystem logic (fs/path) is only used on the server.
 */
import { formatViewCount } from "./article-views-shared";
import fs from "fs";
import path from "path";

export { formatViewCount };

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

export function incrementArticleViews(category: string, slug: string): number {
  const key = `${category}/${slug}`;
  const map = loadViewsMap();
  map[key] = (map[key] || 0) + 1;
  
  // Persist to the file on every increment so we don't lose data on restart
  try {
    fs.writeFileSync(VIEWS_FILE, JSON.stringify(map, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write views JSON:", err);
  }
  
  return map[key];
}
