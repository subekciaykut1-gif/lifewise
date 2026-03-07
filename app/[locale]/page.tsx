import { getPublishedArticles, getFeaturedArticles, getMostReadArticles } from "@/lib/articles";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export const revalidate = 3600; // Revalidate every hour

import HeroArticle from "@/components/articles/HeroArticle";
import ArticleGrid from "@/components/articles/ArticleGrid";
import Sidebar from "@/components/layout/Sidebar";
import NewsletterBanner from "@/components/ui/NewsletterBanner";
import AdSlot from "@/components/monetization/AdSlot";
import Image from "next/image";

export default async function Home() {
  const articles = await getPublishedArticles();
  const featuredArticles = await getFeaturedArticles();
  const featured = featuredArticles[0] || articles[0]; // Fallback to first
  const latest = articles.slice(0, 6);
  const trending = articles.slice(6, 9); // Mock trending
  const mostRead = (await getMostReadArticles()).slice(0, 5); // For mobile strip
  
  const tHome = await getTranslations("Home");
  const tNav = await getTranslations("Nav");

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 mt-6 md:mt-8 overflow-hidden">
      {featured && <HeroArticle article={featured} />}
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 md:gap-10 mt-6 md:mt-10">
        <main className="min-w-0">
          <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b-2 border-border">
            <h2 className="font-display text-[1.2rem] md:text-[1.35rem] font-bold text-primary flex items-center gap-2.5 before:content-[''] before:w-1 before:h-[22px] before:bg-accent before:rounded-sm min-w-0">
              {tHome("latestArticles")}
            </h2>
            <Link href="/latest" className="font-ui text-xs font-semibold text-accent uppercase tracking-wide no-underline hover:text-primary transition-colors shrink-0 py-2 min-h-[44px] flex items-center">
              {tNav("viewAll")}
            </Link>
          </div>
          
          <ArticleGrid articles={latest} />
          
          <AdSlot slot="home-mid" format="auto" height={100} className="my-10" />
          
          <NewsletterBanner />
          
          {trending.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-border mt-10">
                <h2 className="font-display text-[1.2rem] md:text-[1.35rem] font-bold text-primary flex items-center gap-2.5 before:content-[''] before:w-1 before:h-[22px] before:bg-accent before:rounded-sm">
                  {tHome("trendingThisWeek")}
                </h2>
                <Link href="/trending" className="font-ui text-xs font-semibold text-accent uppercase tracking-wide no-underline hover:text-primary transition-colors">
                  {tNav("viewAll")}
                </Link>
              </div>
              <ArticleGrid articles={trending} />
            </>
          )}

          {/* Mobile Only Most Read Strip */}
          <div className="md:hidden mt-12 border-t border-border pt-8">
            <h2 className="font-display text-[1.2rem] font-bold text-primary mb-6 flex items-center gap-2">
              {tHome("mostRead")}
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
              {mostRead.map((article, i) => (
                <Link key={article.slug} href={`/${article.category}/${article.slug}`} className="flex-shrink-0 w-[240px] group no-underline">
                  <div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-3">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="240px"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-primary font-display font-bold text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-sm">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-primary leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </main>
        
        <Sidebar />
      </div>
    </div>
  );
}
