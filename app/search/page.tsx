import { getAllArticles } from "@/lib/articles";
import { Metadata } from "next";
import SearchClient from "@/components/search/SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search LifeWise for tips, life hacks, and articles.",
};

export default function SearchPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-[1280px] mx-auto px-6 mt-10 mb-20">
      <SearchClient articles={articles} />
    </div>
  );
}
