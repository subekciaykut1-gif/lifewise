import { Article } from "@/lib/articles";
import ArticleCard from "./ArticleCard";

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;
  return (
    <div className="no-print mt-12 pt-8 border-t border-border">
      <h3 className="font-display text-[1.2rem] font-bold text-primary mb-6 flex items-center gap-2">
        <span>📚</span> Related Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
