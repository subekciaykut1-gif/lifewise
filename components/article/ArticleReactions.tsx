"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const EMOJIS = [
  { emoji: "❤️", label: "Love it" },
  { emoji: "💡", label: "Helpful" },
  { emoji: "😂", label: "Funny" },
  { emoji: "🔥", label: "Fire" },
];

interface ArticleReactionsProps {
  category: string;
  slug: string;
}

export default function ArticleReactions({ category, slug }: ArticleReactionsProps) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [voted, setVoted] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState<string | null>(null);

  const storageKey = `reaction:${category}/${slug}`;

  useEffect(() => {
    // Restore previous vote from localStorage
    const saved = localStorage.getItem(storageKey);
    if (saved) setVoted(saved);

    // Fetch current counts from server
    fetch(`/api/reactions?category=${encodeURIComponent(category)}&slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.reactions) setCounts(data.reactions);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category, slug, storageKey]);

  const handleReact = async (emoji: string) => {
    if (voted) return; // one vote per session

    // Optimistic update
    setVoted(emoji);
    setAnimating(emoji);
    setCounts((prev) => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }));
    localStorage.setItem(storageKey, emoji);

    setTimeout(() => setAnimating(null), 600);

    try {
      await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, slug, emoji }),
      });
    } catch {
      // Silent fail — optimistic update stays
    }
  };

  return (
    <div className="my-10 py-8 border-t border-b border-border">
      <p className="font-ui text-[0.75rem] uppercase tracking-widest text-muted text-center mb-5 font-semibold">
        Was this article helpful?
      </p>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {EMOJIS.map(({ emoji, label }) => {
          const count = counts[emoji] || 0;
          const isVoted = voted === emoji;
          const hasVoted = voted !== null;

          return (
            <button
              key={emoji}
              onClick={() => handleReact(emoji)}
              disabled={hasVoted}
              aria-label={`React with ${label}`}
              className={cn(
                "group flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl border-2 transition-all duration-300 font-ui",
                isVoted
                  ? "border-accent bg-accent/10 shadow-lg shadow-accent/20 scale-110"
                  : hasVoted
                  ? "border-border bg-surface opacity-50 cursor-not-allowed"
                  : "border-border bg-surface hover:border-accent hover:bg-accent/5 hover:scale-105 cursor-pointer"
              )}
            >
              <span
                className={cn(
                  "text-2xl transition-transform duration-300",
                  animating === emoji && "animate-bounce"
                )}
              >
                {emoji}
              </span>
              <span
                className={cn(
                  "text-[0.7rem] font-bold tabular-nums",
                  isVoted ? "text-accent" : "text-muted"
                )}
              >
                {loading ? "—" : count > 0 ? count.toLocaleString() : label}
              </span>
            </button>
          );
        })}
      </div>
      {voted && (
        <p className="text-center font-ui text-[0.78rem] text-muted mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          Thanks for your reaction! {voted}
        </p>
      )}
    </div>
  );
}
