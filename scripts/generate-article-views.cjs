/**
 * Generates data/article-views.json with one entry per article (category/slug -> 0).
 * Run: node scripts/generate-article-views.cjs
 * Then update the JSON with real view counts from Google Analytics or your analytics export.
 */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const DATA_DIR = path.join(process.cwd(), "data");
const VIEWS_FILE = path.join(DATA_DIR, "article-views.json");

function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...getFiles(full));
    else if (e.isFile() && e.name.endsWith(".mdx")) files.push(full);
  }
  return files;
}

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i) | 0;
  return Math.abs(h);
}

function main() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const files = getFiles(ARTICLES_DIR);
  
  let views = {};
  if (fs.existsSync(VIEWS_FILE)) {
    try {
      views = JSON.parse(fs.readFileSync(VIEWS_FILE, "utf8"));
    } catch (e) {
      console.warn("Could not parse existing views file, starting fresh.");
    }
  }

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = matter(content);
    const slug = path.basename(filePath, ".mdx");
    const category = data.category || "life-hacks";
    const key = `${category}/${slug}`;
    
    // Only set to 0 if it doesn't already exist
    if (views[key] === undefined) {
      views[key] = 0;
    }
  }

  fs.writeFileSync(VIEWS_FILE, JSON.stringify(views, null, 2) + "\n", "utf8");
  console.log(`Wrote ${Object.keys(views).length} entries to ${VIEWS_FILE}`);
}

main();
