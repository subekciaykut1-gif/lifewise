"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { clsx } from "clsx";
import { useSession, signIn } from "next-auth/react";

interface BookmarkButtonProps {
  slug: string;
}

export default function BookmarkButton({ slug }: BookmarkButtonProps) {
  const { data: session, status } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const fetchBookmarkStatus = async () => {
        try {
          const res = await fetch(`/api/user/bookmarks?slug=${slug}`);
          if (res.ok) {
            const data = await res.json();
            setIsBookmarked(data.isBookmarked);
          }
        } catch (err) {
          console.error("Failed to fetch bookmark status", err);
        }
      };
      fetchBookmarkStatus();
    }
  }, [slug, status, session]);

  const toggleBookmark = async () => {
    if (status === "unauthenticated") {
      signIn();
      return;
    }

    if (isLoading) return;

    // Optimistic UI update
    const previousState = isBookmarked;
    setIsBookmarked(!isBookmarked);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);

    setIsLoading(true);

    try {
      const res = await fetch("/api/user/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          action: previousState ? "remove" : "add",
        }),
      });

      if (!res.ok) {
        // Revert on failure
        setIsBookmarked(previousState);
      }
    } catch (err) {
      console.error("Failed to toggle bookmark", err);
      // Revert on failure
      setIsBookmarked(previousState);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render until session is determined to prevent hydration mismatch
  if (status === "loading") {
    return (
      <button className="flex items-center justify-center p-2 rounded-full border border-border bg-surface text-muted animate-pulse h-[34px] w-[34px]">
        <Bookmark size={16} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleBookmark}
      disabled={isLoading}
      className={clsx(
        "flex items-center justify-center p-2 rounded-full transition-all duration-300 border shadow-sm group",
        isBookmarked 
          ? "bg-accent/10 border-accent/20 text-accent" 
          : "bg-surface border-border text-muted hover:text-primary hover:border-accent/30 hover:shadow-md active:scale-95",
        animate && "animate-in zoom-in-75 duration-200"
      )}
      title={isBookmarked ? "Remove from Saved Hacks" : "Save this hack"}
      aria-label={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
    >
      <Bookmark 
        size={16} 
        className={clsx(
          "transition-all duration-300",
          isBookmarked ? "fill-accent" : "fill-transparent group-hover:fill-accent/20"
        )} 
      />
    </button>
  );
}
