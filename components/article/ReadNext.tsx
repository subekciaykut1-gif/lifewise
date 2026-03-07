import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/types";
import { getRelatedArticles } from "@/lib/articles";
import { ArrowRight } from "lucide-react";

interface ReadNextProps {
  currentArticle: Article;
}

export default async function ReadNext({ currentArticle }: ReadNextProps) {
  // Get 1 related article that isn't the current one
  const nextArticles = await getRelatedArticles(currentArticle, 1);
  const next = nextArticles[0];

  if (!next) return null;

  return (
    <div className="my-12 group">
      <Link href={`/${next.category}/${next.slug}`} className="block no-underline">
        <div className="relative overflow-hidden rounded-2xl bg-surface border border-border shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row items-stretch">
          <div className="w-full md:w-1/3 relative aspect-video md:aspect-square overflow-hidden">
            <Image
              src={next.image}
              alt={next.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
            <span className="font-ui text-[0.65rem] font-bold text-accent uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-accent/30" />
              Up Next
            </span>
            
            <h3 className="font-display text-xl md:text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors leading-tight">
              {next.title}
            </h3>
            
            <p className="font-body text-muted text-sm line-clamp-2 mb-6 opacity-80">
              {next.excerpt}
            </p>
            
            <div className="mt-auto flex items-center gap-2 text-accent font-ui text-sm font-bold">
              Read Story <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
