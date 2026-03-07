import Link from "next/link";
import Image from "next/image";
import { Trophy, FolderOpen, Clock } from "lucide-react";
import { categories } from "@/lib/categories";
import AdSlot from "@/components/monetization/AdSlot";
import CustomSurvey from "@/components/ui/CustomSurvey";
import { getPublishedArticles, getMostReadArticles } from "@/lib/articles";
import { Article } from "@/lib/types";

export default async function Sidebar() {
  const articles = await getPublishedArticles();
  // Get real most read articles or fallback to first 5
  const mostReadArticles = (await getMostReadArticles()).slice(0, 5);
  const displayArticles = mostReadArticles.length > 0 ? mostReadArticles : articles.slice(0, 5);

  // Calculate category counts
  const categoryCounts = articles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <aside className="no-print space-y-6 hidden md:block">
      <AdSlot slot="sidebar-top" format="rectangle" height={250} />

      <CustomSurvey type="sidebar" />

      <div className="bg-surface border border-border rounded-xl p-5 mb-6">
        <div className="font-display text-base font-bold text-primary mb-4 pb-2.5 border-b-2 border-border flex items-center gap-2">
          <Trophy size={18} className="text-gold" /> Most Read
        </div>
        
        {displayArticles.map((article, i) => (
          <Link key={article.slug} href={`/${article.category}/${article.slug}`} className="flex gap-3 items-start py-2.5 border-b border-border last:border-0 cursor-pointer group no-underline">
            <span className="font-display text-2xl font-extrabold text-border min-w-[28px] leading-none group-hover:text-accent transition-colors">{(i + 1).toString().padStart(2, "0")}</span>
            <div className="w-16 h-12 rounded-md shrink-0 overflow-hidden relative bg-gray-100">
               <Image 
                 src={article.image}
                 alt={article.title} 
                 width={64}
                 height={48}
                 style={{ objectFit: 'cover' }}
                 className="w-full h-full transition-transform duration-500 group-hover:scale-110"
               />
            </div>
            <p className="font-display text-[0.82rem] font-semibold text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2">
              {article.title}
            </p>
          </Link>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl p-5 mb-6">
        <div className="font-display text-base font-bold text-primary mb-4 pb-2.5 border-b-2 border-border flex items-center gap-2">
          <Clock size={18} className="text-accent" /> Latest Tips
        </div>
        
        {articles.slice(0, 5).map((article) => (
          <Link key={article.slug} href={`/${article.category}/${article.slug}`} className="flex gap-3 items-center py-2 border-b border-border last:border-0 cursor-pointer group no-underline">
            <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden relative border border-border">
               <Image 
                 src={article.image}
                 alt={article.title} 
                 fill
                 style={{ objectFit: 'cover' }}
                 className="transition-transform duration-500 group-hover:scale-110"
               />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[0.78rem] font-bold text-primary leading-tight group-hover:text-accent transition-colors line-clamp-2">
                {article.title}
              </p>
              <span className="text-[0.6rem] text-muted uppercase tracking-wider font-ui mt-0.5 block">
                {article.category}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl p-5 mb-6">
        <div className="font-display text-base font-bold text-primary mb-4 pb-2.5 border-b-2 border-border flex items-center gap-2">
          <FolderOpen size={18} className="text-gold" /> Categories
        </div>
        <ul className="list-none m-0 p-0">
          {categories.map((cat) => (
            <li key={cat.slug} className="group">
              <Link href={`/category/${cat.slug}`} className="flex items-center justify-between py-2 border-b border-border group-last:border-0 cursor-pointer no-underline">
                <span className="font-ui text-[0.82rem] font-medium text-primary flex items-center gap-2 group-hover:text-accent transition-colors">
                  {cat.icon} {cat.name}
                </span>
                <span className="font-ui text-[0.7rem] text-muted bg-bg px-2 py-0.5 rounded-full group-hover:bg-accent-soft group-hover:text-accent transition-colors">
                  {categoryCounts[cat.slug] || 0}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <AdSlot slot="sidebar-sticky" format="vertical" height={600} className="sticky top-[80px]" />
    </aside>
  );
}
