import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Trophy, FolderOpen, Clock } from "lucide-react";
import { categories } from "@/lib/categories";
import AdSlot from "@/components/monetization/AdSlot";
import CustomSurvey from "@/components/ui/CustomSurvey";
import { getPublishedArticles, getMostReadArticles } from "@/lib/articles";
import { getTranslations, getLocale } from "next-intl/server";

export default async function Sidebar() {
  const locale = await getLocale();
  const articles = await getPublishedArticles(locale);
  const mostReadArticles = (await getMostReadArticles(locale)).slice(0, 5);
  const displayArticles = mostReadArticles.length > 0 ? mostReadArticles : articles.slice(0, 5);
  
  const tHome = await getTranslations("Home");
  const tArticle = await getTranslations("Article");
  const tCat = await getTranslations("Categories");

  // Calculate category counts
  const categoryCounts = articles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <aside className="no-print space-y-6 mt-12 lg:mt-0">
      <AdSlot slot="sidebar-top" format="rectangle" height={250} />

      <CustomSurvey type="sidebar" />

      <div className="hidden md:block bg-surface border border-border rounded-xl p-5 mb-6">
        <div className="font-display text-base font-bold text-primary mb-4 pb-2.5 border-b-2 border-border flex items-center gap-2">
          <Trophy size={18} className="text-gold" /> {tHome("mostRead")}
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
            <span className="font-display text-[0.82rem] font-semibold text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2 block">
              {article.title}
            </span>
          </Link>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl p-5 mb-6">
        <div className="font-display text-base font-bold text-primary mb-4 pb-2.5 border-b-2 border-border flex items-center gap-2">
          <Clock size={18} className="text-accent" /> {tHome("latestTips")}
        </div>
        
        {articles.slice(0, 5).map((article) => (
          <Link key={article.slug} href={`/${article.category}/${article.slug}`} className="flex gap-3 items-center py-2 border-b border-border last:border-0 cursor-pointer group no-underline">
            <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden relative border border-border">
               <Image 
                 src={article.image}
                 alt={article.title} 
                 fill
                 sizes="40px"
                 style={{ objectFit: 'cover' }}
                 className="transition-transform duration-500 group-hover:scale-110"
               />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-display text-[0.78rem] font-bold text-primary leading-tight group-hover:text-accent transition-colors line-clamp-2 block">
                {article.title}
              </span>
              <span className="text-[0.6rem] text-muted uppercase tracking-wider font-ui mt-0.5 block">
                {tCat(`${article.category}.name`)}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl p-5 mb-6">
        <div className="font-display text-base font-bold text-primary mb-4 pb-2.5 border-b-2 border-border flex items-center gap-2">
          <FolderOpen size={18} className="text-gold" /> {tArticle("tags")}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <Link 
              key={cat.slug} 
              href={`/category/${cat.slug}`} 
              className="flex flex-col items-center justify-center p-3 border border-border rounded-lg bg-bg/30 hover:bg-accent-soft hover:border-accent group transition-all no-underline text-center"
            >
              <span className="text-xl mb-1 group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="font-ui text-[0.68rem] font-bold text-primary group-hover:text-accent transition-colors truncate w-full">
                {tCat(`${cat.slug}.name`)}
              </span>
              <span className="text-[0.6rem] text-muted font-medium mt-0.5">
                {categoryCounts[cat.slug] || 0}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <AdSlot slot="sidebar-sticky" format="vertical" height={600} className="sticky top-[80px]" />
    </aside>
  );
}
