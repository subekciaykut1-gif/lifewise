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
  /** SEO keywords for meta tags and schema (optional). */
  keywords?: string[];
  /** View count from Neon Database (optional). */
  views?: number;
  /** Manually curated key takeaways from the frontmatter (optional). */
  takeaways?: string[];
  /** Locale of the article (optional). */
  locale?: string;
}
