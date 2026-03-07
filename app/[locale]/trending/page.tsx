import { getMostReadArticles, getPublishedArticles } from "@/lib/articles";
import { getLocale } from "next-intl/server";
import ArticleGrid from "@/components/articles/ArticleGrid";
import Sidebar from "@/components/layout/Sidebar";
import AdSlot from "@/components/monetization/AdSlot";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trending This Week",
  description: "Most popular tips and life hacks on LifeWise this week.",
};

export default async function TrendingPage() {
  const locale = await getLocale();
  const mostRead = await getMostReadArticles(locale);
  const trending = mostRead.length > 0 ? mostRead : (await getPublishedArticles(locale)).slice(0, 9);

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 mt-6 md:mt-10 mb-16 md:mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 md:gap-10">
        <main className="min-w-0">
          <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-border">
            <h1 className="font-display text-[1.35rem] font-bold text-primary flex items-center gap-2.5 before:content-[''] before:w-1 before:h-[22px] before:bg-accent before:rounded-sm">
              Trending This Week
            </h1>
          </div>

          {trending.length > 0 ? (
            <ArticleGrid articles={trending} />
          ) : (
            <div className="text-center py-20 bg-surface border border-border rounded-xl">
              <p className="text-muted font-ui text-sm">No trending articles yet.</p>
            </div>
          )}

          <AdSlot slot="trending-bottom" format="auto" height={100} className="my-10" />
        </main>

        <Sidebar />
      </div>
    </div>
  );
}
