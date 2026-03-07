"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Search } from "lucide-react";
import { categories } from "@/lib/categories";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import AuthModal from "@/components/auth/AuthModal";

export default function Header({ children }: { children?: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
          
          {status === "authenticated" ? (
            <div className="relative group">
              <button className="w-11 h-11 rounded-full overflow-hidden border-2 border-accent/20 hover:border-accent transition-colors">
                {session.user?.image ? (
                  <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-accent text-white flex items-center justify-center font-bold">
                    {session.user?.name?.[0] || "U"}
                  </div>
                )}
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="px-4 py-2 border-b border-border mb-2">
                  <p className="text-sm font-bold text-primary truncate">{session.user?.name}</p>
                  <p className="text-xs text-muted truncate">{session.user?.email}</p>
                </div>
                <Link href="/profile" className="block px-4 py-2 text-sm text-primary hover:bg-muted/50 transition-colors">My Profile</Link>
                <Link href="/saved-hacks" className="block px-4 py-2 text-sm text-primary hover:bg-muted/50 transition-colors">Saved Hacks</Link>
                <button 
                  onClick={() => signOut()}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-muted/50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex bg-accent text-white border-none px-4 sm:px-[18px] py-2 sm:py-2.5 min-h-[40px] sm:min-h-[44px] items-center rounded-[20px] font-ui text-[0.75rem] sm:text-[0.8rem] font-semibold cursor-pointer tracking-normal hover:shadow-cta-hover transition-all transform hover:-translate-y-px no-underline"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
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
      {children}
    </header>
  );
}
