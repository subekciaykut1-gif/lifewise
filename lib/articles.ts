import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "content/articles");
const publicDirectory = path.join(process.cwd(), "public");

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readTime: number;
  image: string;
  featured: boolean;
  mostRead: boolean;
  content: string;
}

function getFiles(dir: string): string[] {
  const subdirs = fs.readdirSync(dir);
  const files = subdirs.map((subdir) => {
    const res = path.resolve(dir, subdir);
    return fs.statSync(res).isDirectory() ? getFiles(res) : [res];
  });
  return files.reduce((a, f) => a.concat(f), []);
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) return [];
  
  const filePaths = getFiles(articlesDirectory);
  
  const allArticles = filePaths
    .filter((filePath) => filePath.endsWith(".mdx"))
    .map((filePath) => {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const slug = path.basename(filePath, ".mdx");
      
      // Check if image exists in public folder
      let imagePath = data.image;
      if (imagePath) {
        const fullImagePath = path.join(publicDirectory, imagePath);
        if (!fs.existsSync(fullImagePath)) {
          // If image doesn't exist locally, use fallback
          imagePath = `https://picsum.photos/seed/${slug}/600/400`;
        }
      } else {
        // If no image specified, use fallback
        imagePath = `https://picsum.photos/seed/${slug}/600/400`;
      }
      
      return {
        slug,
        content,
        ...data,
        image: imagePath,
      } as Article;
    });

  return allArticles.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
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
  const articles = getAllArticles();
  return articles.filter((article) => article.featured);
}

export function getMostReadArticles(): Article[] {
  const articles = getAllArticles();
  return articles.filter((article) => article.mostRead);
}
