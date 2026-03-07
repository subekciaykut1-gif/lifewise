import Link from "next/link";
import { Search } from "lucide-react";
import { categories } from "@/lib/categories";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import TrendingTicker from "./TrendingTicker";

export default function Header() {
  return (
    <header className="no-print sticky top-0 z-50 backdrop-blur-md bg-surface/90 border-b border-border">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
        <Link href="/" className="font-display text-[1.5rem] sm:text-[1.6rem] md:text-[1.85rem] font-extrabold tracking-tighter text-primary no-underline shrink-0">
          Life<span className="text-accent">Wise</span>
        </Link>
        <div className="flex gap-2 sm:gap-3 items-center shrink-0">
          <ThemeToggle />
          <Link href="/search" className="bg-transparent border-[1.5px] border-border rounded-full w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer text-muted text-sm hover:border-accent hover:text-accent transition-colors" aria-label="Search">
            <Search size={20} />
          </Link>
          <Link href="/subscribe" className="hidden sm:inline-flex bg-accent text-white border-none px-[18px] py-2.5 min-h-[44px] items-center rounded-[20px] font-ui text-[0.8rem] font-semibold cursor-pointer tracking-normal hover:shadow-cta-hover transition-all transform hover:-translate-y-px no-underline">
            Subscribe Free
          </Link>
        </div>
      </div>
      <div className="bg-primary dark:bg-surface w-full">
        <nav className="max-w-[1280px] mx-auto overflow-x-auto scrollbar-hide overscroll-x-contain" aria-label="Main categories">
          <div className="px-4 md:px-6 flex whitespace-nowrap min-w-max py-1">
            <Link href="/" className="px-3 py-3 md:px-4 font-ui text-xs font-semibold uppercase tracking-wider text-bg/70 dark:text-primary/70 hover:text-bg dark:hover:text-primary border-b-2 border-transparent hover:border-accent transition-colors flex-shrink-0 min-h-[44px] flex items-center justify-center min-w-[48px]">
              🏠 Home
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-3 py-3 md:px-4 font-ui text-xs font-semibold uppercase tracking-wider text-bg/70 dark:text-primary/70 hover:text-bg dark:hover:text-primary border-b-2 border-transparent hover:border-accent transition-colors flex-shrink-0 min-h-[44px] flex items-center justify-center gap-1 min-w-[48px]"
              >
                <span>{cat.icon}</span> <span>{cat.name}</span>
              </Link>
            ))}
            <Link 
              href="/quizzes" 
              className="px-3 py-3 md:px-4 font-ui text-xs font-semibold uppercase tracking-wider text-bg/70 dark:text-primary/70 hover:text-bg dark:hover:text-primary border-b-2 border-transparent hover:border-accent transition-colors flex-shrink-0 min-h-[44px] flex items-center justify-center gap-1 min-w-[48px]"
            >
              <span>🧠</span> <span>Quizzes</span>
            </Link>
          </div>
        </nav>
      </div>
      <TrendingTicker />
    </header>
  );
}
