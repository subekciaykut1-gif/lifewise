"use client";

import { useState, useEffect } from "react";
import { ThumbsUp } from "lucide-react";
import { clsx } from "clsx";

interface ArticleUpvoteButtonProps {
  slug: string;
}

export default function ArticleUpvoteButton({ slug }: ArticleUpvoteButtonProps) {
  const [upvotes, setUpvotes] = useState<number>(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Load initial upvotes and check local storage
  useEffect(() => {
    // Check if user already upvoted this exact article in this browser
    const upvotedArticles = JSON.parse(localStorage.getItem("upvoted_articles") || "[]");
    if (upvotedArticles.includes(slug)) {
      setHasUpvoted(true);
    }

    // Fetch total upvotes from server
    const fetchUpvotes = async () => {
      try {
        const res = await fetch(`/api/articles/${slug}/upvote`);
        if (res.ok) {
          const data = await res.json();
          setUpvotes(data.upvotes);
        }
      } catch (err) {
        console.error("Failed to fetch upvotes", err);
      }
    };

    fetchUpvotes();
  }, [slug]);

  const handleUpvote = async () => {
    if (hasUpvoted || isLiking) return;

    // Optimistic UI update
    setUpvotes(prev => prev + 1);
    setHasUpvoted(true);
    setIsLiking(true);
    setAnimate(true);
    
    // Remove animation class after it plays
    setTimeout(() => setAnimate(false), 1000);

    // Save to local storage
    const upvotedArticles = JSON.parse(localStorage.getItem("upvoted_articles") || "[]");
    localStorage.setItem("upvoted_articles", JSON.stringify([...upvotedArticles, slug]));

    // Send to server
    try {
      const res = await fetch(`/api/articles/${slug}/upvote`, {
        method: "POST",
      });
      if (!res.ok) {
        // Revert on failure
        setUpvotes(prev => prev - 1);
        setHasUpvoted(false);
        const filtered = upvotedArticles.filter((s: string) => s !== slug);
        localStorage.setItem("upvoted_articles", JSON.stringify(filtered));
      }
    } catch (err) {
      console.error("Failed to upvote", err);
      // Revert on failure
      setUpvotes(prev => prev - 1);
      setHasUpvoted(false);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={hasUpvoted || isLiking}
      className={clsx(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 font-bold text-xs font-ui",
        "border shadow-sm",
        hasUpvoted 
          ? "bg-accent/10 border-accent/20 text-accent" 
          : "bg-surface border-border text-muted hover:text-primary hover:border-accent/30 hover:shadow-md active:scale-95",
        animate && "animate-in slide-in-from-bottom-2 zoom-in"
      )}
      title={hasUpvoted ? "You liked this!" : "Give this article an upvote"}
    >
      <ThumbsUp 
        size={14} 
        className={clsx(
          "transition-all duration-500",
          hasUpvoted ? "fill-accent" : "fill-transparent hover:fill-accent/20",
          animate && "animate-bounce"
        )} 
      />
      <span className="tabular-nums">{upvotes > 0 ? upvotes : "Helpful?"}</span>
    </button>
  );
}
