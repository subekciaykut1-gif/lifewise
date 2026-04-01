"use client";

import { Link } from "@/i18n/routing";
import { useState, useEffect, useRef } from "react";
import { Search, Menu, ChevronDown } from "lucide-react";
import { categories } from "@/lib/categories";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import MobileMenu from "@/components/layout/MobileMenu";
import { useTranslations } from "next-intl";

export default function Header({ children }: { children?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Nav");
  const tCat = useTranslations("Categories");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const visibleCategories = categories.slice(0, 8);
  const hiddenCategories = categories.slice(8);

  return (
    <header className="no-print sticky top-0 z-50 backdrop-blur-md bg-surface/90 border-b border-border">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 -ml-2 text-primary hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <Link href="/" className="font-display text-[1.5rem] sm:text-[1.6rem] md:text-[1.85rem] font-extrabold tracking-tighter text-primary no-underline shrink-0 hover:text-accent transition-colors">
            Life<span className="text-accent">Wise</span>
          </Link>
        </div>
        
        <div className="flex gap-2 sm:gap-3 items-center shrink-0">
          <ThemeToggle />
          <Link href="/search" className="bg-transparent border-[1.5px] border-border rounded-full w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer text-muted text-sm hover:border-accent hover:text-accent transition-colors" aria-label={t("search")}>
            <Search size={20} />
          </Link>
          
          {/* Auth removed per user request (Option A) */}
        </div>
      </div>
      
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="bg-primary dark:bg-surface w-full relative">
        <nav className="max-w-[1280px] mx-auto flex items-center" aria-label="Main categories">
          {/* Main Scroller */}
          <div className="flex-1 overflow-x-auto scrollbar-hide flex whitespace-nowrap px-4 md:px-6 py-1">
            <Link href="/" className="px-3 py-3 md:px-4 font-ui text-xs font-semibold uppercase tracking-wider text-bg/70 dark:text-primary/70 hover:text-bg dark:hover:text-primary border-b-2 border-transparent hover:border-accent transition-colors flex-shrink-0 min-h-[44px] flex items-center justify-center min-w-[48px]">
              🏠 {t("home")}
            </Link>
            
            {/* Visible on all screens (first 8) */}
            {visibleCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-3 py-3 md:px-4 font-ui text-xs font-semibold uppercase tracking-wider text-bg/70 dark:text-primary/70 hover:text-bg dark:hover:text-primary border-b-2 border-transparent hover:border-accent transition-colors flex-shrink-0 min-h-[44px] flex items-center justify-center gap-1 min-w-[48px]"
              >
                <span>{cat.icon}</span> <span>{tCat(`${cat.slug}.name`)}</span>
              </Link>
            ))}

            {/* Visible ONLY on mobile in the scroll (remaining 8) */}
            <div className="flex md:hidden">
              {hiddenCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="px-3 py-3 md:px-4 font-ui text-xs font-semibold uppercase tracking-wider text-bg/70 dark:text-primary/70 hover:text-bg dark:hover:text-primary border-b-2 border-transparent hover:border-accent transition-colors flex-shrink-0 min-h-[44px] flex items-center justify-center gap-1 min-w-[48px]"
                >
                  <span>{cat.icon}</span> <span>{tCat(`${cat.slug}.name`)}</span>
                </Link>
              ))}
            </div>

            <Link 
              href="/quizzes" 
              className="px-3 py-3 md:px-4 font-ui text-xs font-semibold uppercase tracking-wider text-bg/70 dark:text-primary/70 hover:text-bg dark:hover:text-primary border-b-2 border-transparent hover:border-accent transition-colors flex-shrink-0 min-h-[44px] flex items-center justify-center gap-1 min-w-[48px]"
            >
              <span>🧠</span> <span>{t("quizzes")}</span>
            </Link>
          </div>

          {/* Desktop "More" Dropdown */}
          {mounted && hiddenCategories.length > 0 && (
            <div className="hidden md:block relative px-4 border-l border-bg/10 dark:border-primary/10" ref={moreRef}>
              <button 
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center gap-1 px-3 py-3 md:px-4 font-ui text-xs font-semibold uppercase tracking-wider text-bg/70 dark:text-primary/70 hover:text-bg dark:hover:text-primary border-b-2 border-transparent hover:border-accent transition-colors min-h-[44px]"
              >
                More <ChevronDown size={14} className={`transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreOpen && (
                <div className="absolute right-0 top-full mt-0 w-[420px] bg-surface border border-border shadow-2xl p-6 rounded-b-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-[100]">
                  <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted/60 mb-4 px-2">More Categories</p>
                  <div className="grid grid-cols-2 gap-2">
                    {hiddenCategories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={() => setIsMoreOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 group transition-all no-underline"
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                        <span className="text-xs font-ui font-bold text-primary group-hover:text-accent transition-colors">
                          {tCat(`${cat.slug}.name`)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
      {children}
    </header>
  );
}

