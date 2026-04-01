"use client";

import { useMemo } from "react";
import { addAmazonTag } from "@/lib/affiliate";
import { ShoppingCart, ExternalLink, ShieldCheck, Info } from "lucide-react";
import { CATEGORY_PRODUCT_MAP } from "@/lib/productMap";

export interface AffiliateProductBox {
  id: string;
  categories: string[];
  keywords: string[];
  label: string;
  url: string;
  active: boolean;
  description?: string;
  imageUrl?: string;
}

interface SmartAffiliateBoxProps {
  category: string;
  keywords: string[];
  /** When provided, uses trending/cached Amazon products instead of static list */
  products?: AffiliateProductBox[] | null;
}

export default function SmartAffiliateBox({ category, keywords, products: productsProp }: SmartAffiliateBoxProps) {
  // 1. Check if we have a direct category mapping first
  const mappedProduct = CATEGORY_PRODUCT_MAP[category] || CATEGORY_PRODUCT_MAP["life-hacks"];

  const bestMatch = useMemo(() => {
    return {
      label: mappedProduct.label,
      url: mappedProduct.url,
      description: `Our editors selected this as a top pick for ${category.replace('-', ' ')} based on quality and reader feedback.`,
      imageUrl: mappedProduct.imageUrl
    };
  }, [category, mappedProduct]);

  if (!bestMatch) return null;

  const finalUrl = addAmazonTag(bestMatch.url);

  return (
    <div className="my-12">
      {/* Affiliate Disclaimer ABOVE the card */}
      <div className="flex items-center gap-2 mb-4 px-2">
        <Info size={14} className="text-muted-more" />
        <p className="text-[0.7rem] text-muted-more dark:text-muted/60 font-ui italic m-0">
          * We may earn a commission from purchases made through our links.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-accent/5 relative group/box">
        {/* Subtle background glow for dark mode */}
        <div className="absolute -inset-px bg-gradient-to-br from-accent/10 to-transparent opacity-0 dark:group-hover/box:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-10 relative z-10">
          <div className="shrink-0 transition-transform duration-500 group-hover/box:scale-105">
            {bestMatch.imageUrl ? (
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-md bg-white p-2">
                <img 
                  src={bestMatch.imageUrl} 
                  alt={bestMatch.label}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover/box:scale-110"
                />
              </div>
            ) : (
              <div className="bg-accent/10 dark:bg-accent/20 p-6 rounded-2xl text-accent">
                <ShoppingCart size={42} strokeWidth={1.5} />
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <span className="bg-accent/10 dark:bg-accent/20 text-accent text-[0.7rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <ShieldCheck size={12} /> Top Recommendation
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-black text-primary mb-3 leading-tight tracking-tight">
              {bestMatch.label}
            </h3>
            <p className="font-ui text-[0.9rem] text-muted dark:text-muted-more max-w-[450px] leading-relaxed mx-auto md:mx-0">
              {bestMatch.description}
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
          </div>
        </div>
      </div>
    </div>
  );
}

