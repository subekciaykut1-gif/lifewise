import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getArticleImage } from "./article-images";
import { getAllArticleViews } from "./article-views";
import { cache } from "react";

const contentDir = path.join(process.cwd(), "content");
const articlesDirectory = path.join(contentDir, "articles");
const publicDirectory = path.join(process.cwd(), "public");

/** Locale -> content subdir (en = articles, es/fr/pt/de = es/fr/pt/de) */
const LOCALE_DIRS: Record<string, string> = {
  en: "articles",
  es: "es",
  fr: "fr",
  pt: "pt",
  de: "de",
};

import { Article } from "./types";

function getFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const subdirs = fs.readdirSync(dir);
  const files = subdirs.map((subdir) => {
    const res = path.resolve(dir, subdir);
    return fs.statSync(res).isDirectory() ? getFiles(res) : [res];
  });
  return files.reduce((a, f) => a.concat(f), []);
}

function getArticlesDirForLocale(locale: string): string {
  const sub = LOCALE_DIRS[locale];
  if (sub) return path.join(contentDir, sub);
  return articlesDirectory;
}

async function loadArticlesFromDir(dir: string): Promise<Article[]> {
  if (!fs.existsSync(dir)) return [];
  const filePaths = getFiles(dir);
  const viewsMap = await getAllArticleViews();

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
      const views = viewsMap.get(`${category}/${slug}`) || 0;
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

async function loadAllArticles(): Promise<Article[]> {
  return loadArticlesFromDir(articlesDirectory);
}

/** Cached list of all articles. Uses React's Built-in Cache function. */
export const getAllArticles = cache(async (locale: string = "en"): Promise<Article[]> => {
  const dir = getArticlesDirForLocale(locale);
  let all = await loadArticlesFromDir(dir);

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
});

/** Returns only articles whose publishedAt (or date) is on or before now. Use for public listing. */
export const getPublishedArticles = cache(async (locale?: string): Promise<Article[]> => {
  const dir = getArticlesDirForLocale(locale || "en");
  let all = await loadArticlesFromDir(dir);
  
  // Only fall back to English if localized directory truly has no articles
  // (not due to parsing errors from malformed publishedAt fields)
  if (locale && locale !== "en" && all.length === 0) {
    console.log(`No articles found for locale ${locale}, falling back to English`);
    all = await loadArticlesFromDir(articlesDirectory);
  }
  
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
});

export async function getArticleBySlug(
  slug: string,
  category?: string,
  locale: string = "en"
): Promise<Article | undefined> {
  const dir = getArticlesDirForLocale(locale);
  let articles = await loadArticlesFromDir(dir);
  let match = articles.find((a) => a.slug === slug);
  if (!match && locale !== "en") {
    articles = await loadArticlesFromDir(articlesDirectory);
    match = articles.find((a) => a.slug === slug);
  }
  if (!match) return undefined;
  if (category != null && match.category !== category) return undefined;
  return match;
}

export async function getArticlesByCategory(
  categorySlug: string,
  locale?: string
): Promise<Article[]> {
  const articles = await getPublishedArticles(locale);
  return articles.filter((article) => article.category === categorySlug);
}

function getDynamicScore(article: Article): number {
  let score = article.views || 0;
  
  // Recency Boost
  const pubDate = new Date(article.publishedAt || article.date);
  const now = new Date();
  const daysOld = (now.getTime() - pubDate.getTime()) / (1000 * 60 * 60 * 24);
  
  if (daysOld < 7) score += 2000;
  else if (daysOld < 30) score += 1000;
  
  // Manual Feature Weight (Editor's Choice)
  if (article.featured) score += 5000;
  
  return score;
}

export async function getFeaturedArticles(locale?: string): Promise<Article[]> {
  const articles = await getPublishedArticles(locale);
  return [...articles].sort((a, b) => getDynamicScore(b) - getDynamicScore(a));
}

export async function getMostReadArticles(locale?: string): Promise<Article[]> {
  const articles = await getPublishedArticles(locale);
  return [...articles].sort((a, b) => (b.views || 0) - (a.views || 0));
}

export async function getRelatedArticles(
  currentArticle: Article,
  limit: number = 3,
  locale?: string
): Promise<Article[]> {
  const allArticles = await getPublishedArticles(locale);
  
  return allArticles
    .filter((a) => a.slug !== currentArticle.slug)
    .map(article => {
      // Calculate relevance score
      let score = 0;
      if (article.category === currentArticle.category) score += 2; // Category match weight
      
      const commonTags = (article.tags || []).filter(tag => 
        (currentArticle.tags || []).includes(tag)
      );
      score += commonTags.length; // 1 point per matching tag
      
      return { article, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score; // Sort by relevance score
      return (b.article.views || 0) - (a.article.views || 0); // Break ties with views
    })
    .map(item => item.article)
    .slice(0, limit);
}
