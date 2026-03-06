"use client";

import { useEffect, useRef } from "react";
import { trackScrollDepth, trackOutboundClick, trackAffiliateClick } from "@/lib/analytics";

interface ArticleAnalyticsProps {
  articleTitle: string;
  category?: string;
  author?: string;
}

export default function ArticleAnalytics({ articleTitle, category, author }: ArticleAnalyticsProps) {
  const trackedDepths = useRef<Set<number>>(new Set());

  // Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      
      if (scrollHeight <= 0) return;
      
      const percent = Math.min(100, Math.round((scrollTop / scrollHeight) * 100));

      [25, 50, 75, 100].forEach((depth) => {
        if (percent >= depth && !trackedDepths.current.has(depth)) {
          trackedDepths.current.add(depth);
          trackScrollDepth(depth, articleTitle, category, author);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [articleTitle, category, author]);

  // Click Tracking Delegation
  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const url = target.href;
      // Simple check for external links (not starting with / or current domain)
      const isExternal = url.startsWith("http") && !url.includes(window.location.hostname);
      
      // Check for affiliate markers (data attribute or common domains)
      const isAffiliate = 
        url.includes("amazon.com") || 
        url.includes("shareasale.com") || 
        url.includes("impact.com") ||
        url.includes("cj.com") ||
        target.getAttribute("data-affiliate") === "true";

      if (isAffiliate) {
        trackAffiliateClick(url, articleTitle, category);
      } else if (isExternal) {
        trackOutboundClick(url, articleTitle, category);
      }
      // Internal clicks are tracked by GA4 automatically as page_view, 
      // but specific link tracking can be added here if needed.
    };

    const container = document.querySelector("article") ?? document;
    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [articleTitle, category]);

  return null;
}
