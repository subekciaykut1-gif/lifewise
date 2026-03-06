import { getPublishedArticles } from "@/lib/articles";
import { Metadata } from "next";
import SearchClient from "@/components/search/SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search LifeWise for tips, life hacks, and articles.",
};

export default async function SearchPage() {
  const articles = await getPublishedArticles();

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 mt-6 md:mt-10 mb-16 md:mb-20 min-w-0">
      <SearchClient articles={articles} />
    </div>
  );
}
