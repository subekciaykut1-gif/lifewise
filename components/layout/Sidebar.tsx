import Link from "next/link";
import Image from "next/image";
import { Trophy, FolderOpen } from "lucide-react";
import { categories } from "@/lib/categories";
import AdSlot from "@/components/monetization/AdSlot";
import { getAllArticles, getMostReadArticles } from "@/lib/articles";

export default function Sidebar() {
  const articles = getAllArticles();
  // Get real most read articles or fallback to first 5
  const mostReadArticles = getMostReadArticles().slice(0, 5);
  const displayArticles = mostReadArticles.length > 0 ? mostReadArticles : articles.slice(0, 5);

  // Calculate category counts
  const categoryCounts = articles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <aside className="space-y-6 hidden md:block">
      <AdSlot slot="sidebar-top" format="rectangle" height={250} />

      <div className="bg-surface border border-border rounded-xl p-5 mb-6">
        <div className="font-display text-base font-bold text-primary mb-4 pb-2.5 border-b-2 border-border flex items-center gap-2">
          <Trophy size={18} className="text-gold" /> Most Read
        </div>
        
        {displayArticles.map((article, i) => (
          <Link key={article.slug} href={`/${article.category}/${article.slug}`} className="flex gap-3 items-start py-2.5 border-b border-border last:border-0 cursor-pointer group no-underline">
            <span className="font-display text-2xl font-extrabold text-border min-w-[28px] leading-none group-hover:text-accent transition-colors">0{i + 1}</span>
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
