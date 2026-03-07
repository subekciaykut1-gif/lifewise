import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { sql } from "@/lib/db";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/articles/ArticleCard";
import { Bookmark, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Saved Hacks | LifeWise",
  description: "Your personal library of bookmarked life hacks and tips.",
  robots: "noindex, nofollow",
};

export default async function SavedHacksPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  // Fetch user bookmarks from DB
  const bookmarks = await sql`
    SELECT article_slug, created_at 
    FROM user_bookmarks 
    WHERE user_id = ${session.user.id}
    ORDER BY created_at DESC
  `;

  const bookmarkedSlugs = bookmarks.map((b: any) => b.article_slug);

  // Fetch full article objects
  const allArticles = await getAllArticles();
  
  // Map and sort articles based on bookmark creation date
  const savedArticles = bookmarkedSlugs
    .map((slug: string) => allArticles.find(a => a.slug === slug))
    .filter(Boolean); // Filter out any that might have been deleted

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-16 min-h-[70vh]">
      <header className="mb-12 border-b border-border pb-8">
        <div className="flex items-center gap-3 text-accent mb-3">
          <LayoutDashboard size={24} />
          <span className="font-ui text-xs font-bold uppercase tracking-widest text-muted">User Dashboard</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
          My Saved Hacks
        </h1>
        <p className="font-body text-muted mt-4 text-lg max-w-2xl">
          Welcome back, {session.user.name?.split(" ")[0] || "Wise Reader"}. Here is your personal library of bookmarked tips and tricks.
        </p>
      </header>

      {savedArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedArticles.map((article: any) => (
            <div key={article.slug} className="relative h-full animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-24 bg-surface border border-border rounded-2xl border-dashed">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6">
            <Bookmark size={32} />
          </div>
          <h2 className="font-display text-2xl font-bold text-primary mb-3">No saved hacks yet</h2>
          <p className="font-body text-muted max-w-md mb-8">
            When you find a life hack you love, click the bookmark icon on the article to save it here for quick reference.
          </p>
          <Link 
            href="/trending/top-hacks" 
            className="px-6 py-3 bg-primary text-bg font-ui font-bold rounded-full hover:bg-accent transition-colors"
          >
            Explore Top Hacks
          </Link>
        </div>
      )}
    </div>
  );
}
