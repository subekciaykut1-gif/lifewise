"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { formatViewCount } from "@/lib/article-views-shared";

interface LiveViewCounterProps {
  slug: string;
  category: string;
  initialViews: number;
}

export default function LiveViewCounter({ slug, category, initialViews }: LiveViewCounterProps) {
  const [views, setViews] = useState<number>(initialViews);

  useEffect(() => {
    // Fetch live views on mount
    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/views?slug=${slug}&category=${category}`);
        if (response.ok) {
          const data = await response.json();
          // We take the max of initial and live to avoid "flicker" if the local count is slightly ahead
          setViews(Math.max(initialViews, data.views));
        }
      } catch (error) {
        console.error("Failed to fetch live views:", error);
      }
    };

    fetchViews();
  }, [slug, category, initialViews]);

  return (
    <span className="flex items-center gap-1.5 transition-opacity duration-300">
      <Eye size={14} /> {formatViewCount(views)} views
    </span>
  );
}
