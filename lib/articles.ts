import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getArticleImage } from "./article-images";
import { getArticleViews } from "./article-views";

const articlesDirectory = path.join(process.cwd(), "content/articles");
const publicDirectory = path.join(process.cwd(), "public");

const CACHE_TTL_MS = 60 * 1000; // 1 min; avoid re-reading 600+ MDX on every request
let cachedArticles: Article[] | null = null;
let cacheExpiry = 0;

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  publishedAt?: string;
  /** When the article was last updated (optional). Use in schema and show "Updated ..." in UI. */
  dateModified?: string;
  readTime: number;
  image: string;
  featured: boolean;
  mostRead: boolean;
  author?: string;
  content: string;
  /** View count from data/article-views.json (optional). */
  views?: number;
}

function getFiles(dir: string): string[] {
  const subdirs = fs.readdirSync(dir);
  const files = subdirs.map((subdir) => {
    const res = path.resolve(dir, subdir);
    return fs.statSync(res).isDirectory() ? getFiles(res) : [res];
  });
  return files.reduce((a, f) => a.concat(f), []);
}

function loadAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) return [];

  const filePaths = getFiles(articlesDirectory);

  const allArticles = filePaths
    .filter((filePath) => filePath.endsWith(".mdx"))
    .map((filePath) => {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const slug = path.basename(filePath, ".mdx");
      const imagePath = getArticleImage(
        slug,
        data.category || "life-hacks",
        data.image,
        publicDirectory
      );

      const category = data.category || "life-hacks";
      const views = getArticleViews(category, slug);
      return {
        slug,
        content,
        ...data,
        image: imagePath,
        views,
      } as Article;
    });

  return allArticles.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}

/** Cached list of all articles. Revalidates after 1 min to avoid re-reading 600+ MDX files on every request. */
export function getAllArticles(): Article[] {
  const now = Date.now();
  if (cachedArticles !== null && now < cacheExpiry) return cachedArticles;
  cachedArticles = loadAllArticles();
  cacheExpiry = now + CACHE_TTL_MS;
  return cachedArticles;
}

/** Returns only articles whose publishedAt (or date) is on or before now. Use for public listing. */
export function getPublishedArticles(): Article[] {
  const all = getAllArticles();
  const now = new Date();
  return all
    .filter((a) => {
      const pub = a.publishedAt || a.date;
      return new Date(pub) <= now;
    })
    .sort((a, b) => {
      const da = new Date(a.publishedAt || a.date).getTime();
      const db = new Date(b.publishedAt || b.date).getTime();
      return db - da;
    });
}

export function getArticleBySlug(slug: string, category?: string): Article | undefined {
  const articles = getAllArticles();
  const match = articles.find((article) => article.slug === slug);
  if (!match) return undefined;
  if (category != null && match.category !== category) return undefined;
  return match;
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  const articles = getAllArticles();
  return articles.filter((article) => article.category === categorySlug);
}

export function getFeaturedArticles(): Article[] {
  const articles = getPublishedArticles();
  return articles.filter((article) => article.featured);
}

export function getMostReadArticles(): Article[] {
  const articles = getPublishedArticles();
  return articles.filter((article) => article.mostRead);
}
