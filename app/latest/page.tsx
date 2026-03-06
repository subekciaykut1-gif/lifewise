import { getPublishedArticles } from "@/lib/articles";
import ArticleGrid from "@/components/articles/ArticleGrid";
import Sidebar from "@/components/layout/Sidebar";
import AdSlot from "@/components/monetization/AdSlot";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Articles",
  description: "Read the latest tips, tricks, and life hacks on LifeWise.",
};

export default function LatestPage() {
  const articles = getPublishedArticles(); // Only published, sorted by date

  return (
    <div className="max-w-[1280px] mx-auto px-6 mt-10 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <main>
          <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-border">
            <h1 className="font-display text-[1.35rem] font-bold text-primary flex items-center gap-2.5 before:content-[''] before:w-1 before:h-[22px] before:bg-accent before:rounded-sm">
              Latest Articles
            </h1>
          </div>
          
          <ArticleGrid articles={articles} />
          
          <AdSlot slot="latest-bottom" format="auto" height={100} className="my-10" />
        </main>
        
        <Sidebar />
      </div>
    </div>
  );
}
