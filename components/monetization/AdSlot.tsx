import React from "react";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "rectangle" | "leaderboard" | "vertical";
  className?: string;
  height?: number;
}

export default function AdSlot({ slot, format = "auto", className, height }: AdSlotProps) {
  // In a real app, this would be a Google AdSense script component
  // For now, it's a styled placeholder as per design system
  return (
    <div 
      className={cn(
        "bg-ad border-[1.5px] border-dashed border-ad-border rounded-lg flex flex-col items-center justify-center p-5 mb-6 gap-1.5",
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
