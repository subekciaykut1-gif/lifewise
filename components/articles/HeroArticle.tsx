"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Article } from "@/lib/types";
import { Clock, Calendar, Eye } from "lucide-react";
import { format } from "date-fns";
import { formatViewCount } from "@/lib/article-views";
import { getAuthorPersona, getAuthorSlug } from "@/lib/authors";
import { useTranslations } from "next-intl";
import AuthorAvatar from "@/components/ui/AuthorAvatar";

interface HeroArticleProps {
  article: Article;
}

export default function HeroArticle({ article }: HeroArticleProps) {
  const tArticle = useTranslations("Article");
  const tNav = useTranslations("Nav");
  
  // Image fallback is now handled in lib/articles.ts

  return (
    <section className="relative w-full aspect-[4/3] md:aspect-[16/7] rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer shadow-lg mb-6 md:mb-10 min-w-0">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      
      {/* Linear Gradient Overlay for Text Readability */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)" 
        }}
      ></div>
      
      {/* Content */}
      <div className="absolute inset-0 p-5 md:p-10 flex flex-col justify-end z-20">
        <div className="max-w-[700px]">
          <div className="flex gap-2 mb-4">
            <span className="bg-accent text-white font-ui text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1.5 rounded">
              ⭐ Featured
            </span>
            <span className="bg-white/15 backdrop-blur-sm text-white/90 border border-white/20 font-ui text-[0.65rem] font-semibold uppercase tracking-widest px-3 py-1.5 rounded">
              {article.category}
            </span>
          </div>

          <Link href={`/${article.category}/${article.slug}`} className="no-underline block">
            <h1 className="font-display text-[1.4rem] md:text-[2.4rem] font-extrabold text-white leading-[1.3] md:leading-[1.2] mb-3 tracking-tight group-hover:text-accent-soft transition-colors drop-shadow-md">
              {article.title}
            </h1>
          </Link>
          
          <div className="flex flex-wrap gap-4 items-center mb-6 text-white/70">
            <div className="flex items-center gap-2 pr-4 border-r border-white/10">
              <AuthorAvatar 
                name={getAuthorPersona(article.author || "", article.category).name} 
                image={getAuthorPersona(article.author || "", article.category).image} 
                size="xs" 
                className="border border-white/20"
              />
              <Link href={`/author/${getAuthorSlug(article.author || "", article.category)}`} className="font-ui text-xs font-bold text-white hover:text-accent-soft transition-colors">
                {getAuthorPersona(article.author || "", article.category).name}
              </Link>
            </div>
            <span className="font-ui text-xs flex items-center gap-1.5">
              <Calendar size={14} /> {format(new Date(article.date), "MMMM d, yyyy")}
            </span>
            <span className="font-ui text-xs flex items-center gap-1.5">
              <Clock size={14} /> {article.readTime} {tArticle("minRead")}
            </span>
            {typeof article.views === "number" && (
              <span className="font-ui text-xs flex items-center gap-1.5">
                <Eye size={14} /> {formatViewCount(article.views)} {tArticle("views")}
              </span>
            )}
          </div>

          <Link 
            href={`/${article.category}/${article.slug}`} 
            className="inline-flex items-center gap-2 bg-accent text-white border-none px-7 py-3 rounded-md font-ui text-[0.85rem] font-semibold hover:-translate-y-0.5 hover:shadow-cta-hover transition-all"
          >
            {tNav("viewAll").replace(" →", "")} →
          </Link>
        </div>
      </div>
    </section>
  );
}

