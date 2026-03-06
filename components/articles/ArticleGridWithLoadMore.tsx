"use client";

import { useState } from "react";
import { Article } from "@/lib/articles";
import ArticleGrid from "./ArticleGrid";
import { ChevronDown, Loader2 } from "lucide-react";

interface ArticleGridWithLoadMoreProps {
  articles: Article[];
  initialCount?: number;
  perPage?: number;
}

export default function ArticleGridWithLoadMore({
  articles,
  initialCount = 12,
  perPage = 12,
}: ArticleGridWithLoadMoreProps) {
  const [visible, setVisible] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const visibleArticles = articles.slice(0, visible);
  const hasMore = visible < articles.length;
  const remaining = articles.length - visible;

  const loadMore = () => {
    setLoading(true);
    // Simulate a brief loading state for smooth UX
    setTimeout(() => {
      setVisible((prev) => Math.min(prev + perPage, articles.length));
      setLoading(false);
    }, 300);
  };

  return (
    <div>
      <ArticleGrid articles={visibleArticles} />

      {hasMore && (
        <div className="flex flex-col items-center mt-10 gap-3">
          <button
            onClick={loadMore}
            disabled={loading}
            className="group flex items-center gap-2.5 bg-surface border-2 border-border hover:border-accent text-primary hover:text-accent font-ui font-bold text-[0.9rem] px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ChevronDown size={18} className="transition-transform group-hover:translate-y-0.5" />
            )}
            {loading ? "Loading..." : `Load ${Math.min(perPage, remaining)} More Articles`}
          </button>
          <span className="font-ui text-[0.72rem] text-muted uppercase tracking-widest">
            Showing {visibleArticles.length} of {articles.length}
          </span>
        </div>
      )}
    </div>
  );
}
