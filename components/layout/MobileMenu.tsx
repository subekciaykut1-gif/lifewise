"use client";

import { Link } from "@/i18n/routing";
import { X, ChevronRight, Home, Brain } from "lucide-react";
import { categories } from "@/lib/categories";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations("Nav");
  const tCat = useTranslations("Categories");

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Siderbar Drawer */}
      <div className="relative w-full max-w-[300px] bg-surface h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300 ease-out">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="font-display text-xl font-extrabold text-primary tracking-tighter">
            Life<span className="text-accent">Wise</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-muted hover:text-primary transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-1 mb-8">
            <Link 
              href="/" 
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-primary font-ui font-semibold no-underline"
            >
              <Home size={18} className="text-accent" /> {t("home")}
            </Link>
            <Link 
              href="/quizzes" 
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-primary font-ui font-semibold no-underline"
            >
              <Brain size={18} className="text-accent" /> {t("quizzes")}
            </Link>
          </div>

          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted/60 px-3 mb-3">Explore Categories</p>
          
          <div className="grid grid-cols-1 gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 group transition-all no-underline"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <span className="text-sm font-ui font-medium text-primary group-hover:text-accent transition-colors">
                    {tCat(`${cat.slug}.name`)}
                  </span>
                </div>
                <ChevronRight size={14} className="text-muted/40 group-hover:text-accent/60 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        <div className="p-5 bg-muted/20 border-t border-border mt-auto">
          <p className="text-[0.7rem] text-muted text-center">
            Smarter Living, Every Day.
          </p>
        </div>
      </div>
    </div>
  );
}
