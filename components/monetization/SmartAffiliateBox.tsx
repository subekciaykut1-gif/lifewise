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
    <div className="my-10 overflow-hidden rounded-2xl border-2 border-accent/10 bg-gradient-to-br from-white to-accent/[0.03] dark:from-bg-alt dark:to-accent/[0.02] shadow-xl shadow-accent/5">
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
        <div className="bg-accent/10 p-5 rounded-2xl shrink-0 text-accent">
          <ShoppingCart size={40} strokeWidth={1.5} />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="bg-accent/10 text-accent text-[0.65rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck size={10} /> Recommended for You
            </span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-black text-primary mb-2 leading-tight">
            {bestMatch.label}
          </h3>
          <p className="font-ui text-sm text-muted max-w-[400px] leading-relaxed mx-auto md:mx-0">
            Our editors selected this tool as the best value for your {category} needs based on quality and performance.
          </p>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <a
            href={finalUrl}
            target="_blank"
            rel="nofollow sponsored"
            className="group flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-ui font-bold text-sm px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 no-underline"
          >
            Check Price on Amazon
            <ExternalLink size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <p className="text-[0.65rem] text-muted-more text-center mt-3 font-ui italic">
            * We may earn a commission from qualifying purchases.
          </p>
        </div>
      </div>
    </div>
  );
}
