"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const SLOT_TO_ENV: Record<string, string> = {
  "article-top": "NEXT_PUBLIC_AD_SLOT_ARTICLE_TOP",
  "article-bottom": "NEXT_PUBLIC_AD_SLOT_ARTICLE_BOTTOM",
  "sidebar-top": "NEXT_PUBLIC_AD_SLOT_SIDEBAR_TOP",
  "sidebar-sticky": "NEXT_PUBLIC_AD_SLOT_SIDEBAR_STICKY",
  "home-mid": "NEXT_PUBLIC_AD_SLOT_HOME_MID",
  "category-mid": "NEXT_PUBLIC_AD_SLOT_CATEGORY_MID",
  "trending-bottom": "NEXT_PUBLIC_AD_SLOT_TRENDING_BOTTOM",
  "latest-bottom": "NEXT_PUBLIC_AD_SLOT_LATEST_BOTTOM",
  "in-content-1": "NEXT_PUBLIC_AD_SLOT_IN_CONTENT_1",
};

interface AdSlotProps {
  slot: string;
  format?: "auto" | "rectangle" | "leaderboard" | "vertical" | "fluid";
  className?: string;
  height?: number;
  layout?: "in-article" | "multiplex";
  layoutKey?: string;
}

export default function AdSlot({ slot, format = "auto", className, height, layout, layoutKey }: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-2207377176181836";
  const slotId = process.env[SLOT_TO_ENV[slot] as keyof typeof process.env] as string | undefined;

  useEffect(() => {
    if (!publisherId || !slotId || !ref.current) return;
    try {
      (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || [];
      (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle.push({});
    } catch {
      // ignore
    }
  }, [publisherId, slotId]);

  if (publisherId && slotId) {
    return (
      <div className={cn("no-print min-h-[50px] overflow-hidden flex justify-center", className)} style={height ? { minHeight: `${height}px` } : undefined}>
        <ins
          ref={ref as React.RefObject<HTMLModElement>}
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-client={publisherId}
          data-ad-slot={slotId}
          data-ad-format={format === "auto" ? "auto" : format}
          data-ad-layout={layout}
          data-ad-layout-key={layoutKey}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "no-print bg-ad border-[1.5px] border-dashed border-ad-border rounded-lg flex flex-col items-center justify-center p-5 mb-6 gap-1.5",
        className
      )}
      style={{ height: height ? `${height}px` : "auto", minHeight: height ? undefined : "100px" }}
    >
      <span className="font-ui text-[0.65rem] uppercase tracking-widest text-ad-text-muted font-semibold">Advertisement</span>
      <span className="font-display text-[0.9rem] text-ad-text-light italic">Google AdSense</span>
      <span className="font-ui text-[0.7rem] text-ad-text-light">{slot} • {format}</span>
    </div>
  );
}
