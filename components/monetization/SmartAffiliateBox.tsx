"use client";

import { useMemo } from "react";
import productsData from "@/data/affiliate-products.json";
import { addAmazonTag } from "@/lib/affiliate";
import { ShoppingCart, ExternalLink, ShieldCheck } from "lucide-react";

interface Product {
  id: string;
  categories: string[];
  keywords: string[];
  label: string;
  url: string;
  active: boolean;
}

interface SmartAffiliateBoxProps {
  category: string;
  keywords: string[];
}

export default function SmartAffiliateBox({ category, keywords }: SmartAffiliateBoxProps) {
  const bestMatch = useMemo(() => {
    const activeProducts = (productsData as Product[]).filter(p => p.active);
    
    let topProduct = activeProducts[0];
    let topScore = -1;

    activeProducts.forEach(product => {
      let score = 0;
      
      // Category match is strong
      if (product.categories.includes(category)) score += 10;
      
      // Keyword matches
      const matches = product.keywords.filter(kw => 
        keywords.some(articleKw => articleKw.toLowerCase().includes(kw.toLowerCase()))
      );
      score += matches.length * 5;

      if (score > topScore) {
        topScore = score;
        topProduct = product;
      }
    });

    return topProduct;
  }, [category, keywords]);

  if (!bestMatch) return null;

  const finalUrl = addAmazonTag(bestMatch.url);

  return (
    <div className="my-12 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-accent/5 relative group/box">
      {/* Subtle background glow for dark mode */}
      <div className="absolute -inset-px bg-gradient-to-br from-accent/10 to-transparent opacity-0 dark:group-hover/box:opacity-100 transition-opacity duration-500 pointer-events-none" />

      
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-10 relative z-10">
        <div className="bg-accent/10 dark:bg-accent/20 p-6 rounded-2xl shrink-0 text-accent transition-transform duration-500 group-hover/box:scale-110">
          <ShoppingCart size={42} strokeWidth={1.5} />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <span className="bg-accent/10 dark:bg-accent/20 text-accent text-[0.7rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <ShieldCheck size={12} /> Recommended for You
            </span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-black text-primary mb-3 leading-tight tracking-tight">
            {bestMatch.label}
          </h3>
          <p className="font-ui text-[0.9rem] text-muted dark:text-muted-more max-w-[450px] leading-relaxed mx-auto md:mx-0">
            Our editors selected this tool as the best value for your <span className="text-secondary font-semibold uppercase text-[0.7rem] tracking-wider">{category}</span> needs based on quality and performance.
          </p>
        </div>

        <div className="shrink-0 w-full md:w-auto flex flex-col items-center">
          <a
            href={finalUrl}
            target="_blank"
            rel="nofollow sponsored"
            className="group flex items-center justify-center gap-2.5 bg-accent hover:bg-accent/90 text-white font-ui font-extrabold text-[0.85rem] px-10 py-4.5 rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 no-underline w-full md:w-auto"
          >
            Check Price on Amazon
            <ExternalLink size={18} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <p className="text-[0.65rem] text-muted-more dark:text-muted/60 text-center mt-4 font-ui italic">
            * We may earn a commission from purchases.
          </p>
        </div>
      </div>
    </div>
  );
}

