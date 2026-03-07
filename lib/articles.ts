"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getArticleImage } from "./article-images";
import { getAllArticleViews } from "./article-views";
import { cache } from "react";

const articlesDirectory = path.join(process.cwd(), "content/articles");
const publicDirectory = path.join(process.cwd(), "public");

import { Article } from "./types";

function getFiles(dir: string): string[] {
  const subdirs = fs.readdirSync(dir);
  const files = subdirs.map((subdir) => {
    const res = path.resolve(dir, subdir);
    return fs.statSync(res).isDirectory() ? getFiles(res) : [res];
  });
  return files.reduce((a, f) => a.concat(f), []);
}

async function loadAllArticles(): Promise<Article[]> {
  if (!fs.existsSync(articlesDirectory)) return [];

  const filePaths = getFiles(articlesDirectory);
  
  // Fetch ALL views in one go for performance
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

/** Cached list of all articles. Uses React's Built-in Cache function. */
export const getAllArticles = cache(async (): Promise<Article[]> => {
  return loadAllArticles();
});

/** Returns only articles whose publishedAt (or date) is on or before now. Use for public listing. */
export async function getPublishedArticles(): Promise<Article[]> {
  const all = await getAllArticles();
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

export async function getArticleBySlug(slug: string, category?: string): Promise<Article | undefined> {
  const articles = await getAllArticles();
  const match = articles.find((article) => article.slug === slug);
  if (!match) return undefined;
  if (category != null && match.category !== category) return undefined;
  return match;
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const articles = await getAllArticles();
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

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await getPublishedArticles();
  return [...articles].sort((a, b) => getDynamicScore(b) - getDynamicScore(a));
}

export async function getMostReadArticles(): Promise<Article[]> {
  const articles = await getPublishedArticles();
  // Most read focuses more on views but still respects basic popularity
  return [...articles].sort((a, b) => (b.views || 0) - (a.views || 0));
}


export async function getRelatedArticles(currentArticle: Article, limit: number = 3): Promise<Article[]> {
  const allArticles = await getPublishedArticles();
  
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
