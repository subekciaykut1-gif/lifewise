import Link from "next/link";
import { getFeaturedArticles } from "@/lib/articles";
import { Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function TrendingTicker() {
  const trending = (await getFeaturedArticles()).slice(0, 5);
  const t = await getTranslations("Home");

  if (trending.length === 0) return null;

  return (
    <div className="bg-surface border-b border-border py-2 overflow-hidden shadow-sm">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-accent font-ui text-[0.65rem] font-bold uppercase tracking-[0.2em] shrink-0 bg-accent-soft px-2 py-1 rounded">
          <Zap size={12} fill="currentColor" />
          <span>{t("trendingTicker")}</span>
        </div>
        
        <div className="relative flex-1 overflow-hidden h-5">
          <div className="absolute inset-0 flex items-center animate-ticker whitespace-nowrap gap-12 group">
             <div className="flex items-center gap-8">
               {trending.map((article) => (
                 <Link 
                   key={article.slug} 
                   href={`/${article.category}/${article.slug}`}
                   className="font-ui text-[0.8rem] text-muted hover:text-accent transition-colors flex items-center gap-2"
                 >
                   <span className="opacity-30">•</span>
                   <span className="truncate max-w-[200px] md:max-w-none">{article.title}</span>
                 </Link>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
