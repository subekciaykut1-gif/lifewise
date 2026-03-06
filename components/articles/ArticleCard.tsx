import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/articles";
import { Clock, Calendar } from "lucide-react";
import { format } from "date-fns";
import { getAuthorPersona, getAuthorSlug } from "@/lib/authors";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  // Image fallback is now handled in lib/articles.ts
  const rawExcerpt = (article.content ?? "").substring(0, 120).replace(/[#*]/g, "").trim();
  const excerpt = article.excerpt || (rawExcerpt ? `${rawExcerpt}...` : "");
  
  return (
    <article className="group bg-surface border border-border rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover cursor-pointer h-full flex flex-col">
      <Link href={`/${article.category}/${article.slug}`} className="block relative aspect-[16/9] md:aspect-[3/2] overflow-hidden bg-gray-100">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-2.5 left-2.5 bg-accent text-white font-ui text-[0.6rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-[3px] z-10">
          {article.category}
        </span>
      </Link>
      <div className="p-[12px] pt-[12px] pb-[14px] md:p-4 md:pt-4 md:pb-5 flex flex-col flex-1">
        <Link href={`/${article.category}/${article.slug}`} className="no-underline">
          <h3 className="font-display text-[1rem] md:text-[1.05rem] font-bold text-primary leading-snug mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="font-body text-[0.82rem] text-muted leading-relaxed mb-3 line-clamp-2 flex-1">
          {excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Link href={`/author/${getAuthorSlug(article.author || article.category)}`} className="relative w-6 h-6 rounded-full overflow-hidden border border-accent/20">
              <Image 
                src={getAuthorPersona(article.author || article.category).image} 
                alt={getAuthorPersona(article.author || article.category).name}
                fill
                className="object-cover"
                sizes="24px"
              />
            </Link>
            <Link href={`/author/${getAuthorSlug(article.author || article.category)}`} className="font-ui text-[0.7rem] font-bold text-primary hover:text-accent transition-colors">
              {getAuthorPersona(article.author || article.category).name}
            </Link>
          </div>
          <div className="flex gap-3 items-center">
            <span className="font-ui text-[0.7rem] text-muted flex items-center gap-1">
              <Clock size={12} /> {article.readTime} min
            </span>
            <span className="font-ui text-[0.7rem] text-muted flex items-center gap-1">
              <Calendar size={12} /> {format(new Date(article.date), "MMM d")}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
