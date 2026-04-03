"use client";

import { useEffect, useState, useCallback } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { Loader2, MessageSquare } from "lucide-react";

interface CommentSectionProps {
  articleSlug: string;
}

export default function CommentSection({ articleSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?slug=${articleSlug}`);
      const data = await res.json();
      if (res.ok) {
        setComments(data.comments || []);
      } else {
        setError(data.error || "Failed to load comments");
      }
    } catch (err) {
      setError("An unexpected error occurred while loading comments.");
    } finally {
      setIsLoading(false);
    }
  }, [articleSlug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentAdded = (newComment: any) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <section id="comments" className="pt-12 mt-12 border-t border-border">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center shadow-inner">
          <MessageSquare size={24} />
        </div>
        <div>
          <h2 className="font-display text-2xl font-extrabold text-primary leading-tight">Expert Discussion</h2>
          <p className="text-muted font-ui text-xs uppercase tracking-widest mt-1">Share your knowledge with LifeWise</p>
        </div>
      </div>

      <CommentForm articleSlug={articleSlug} onCommentAdded={handleCommentAdded} />

      <div className="mt-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted font-ui opacity-50">
            <Loader2 className="animate-spin mb-4" size={32} />
            <p className="text-xs uppercase tracking-[0.2em] font-bold">Loading conversation...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-red-50/10 border border-red-500/20 rounded-xl">
             <p className="text-red-500 font-ui text-sm mb-4">⚠️ {error}</p>
             <button 
                onClick={() => { setIsLoading(true); fetchComments(); }}
                className="text-xs font-bold uppercase underline hover:text-red-400 transition-colors"
             >
                Try Again
             </button>
          </div>
        ) : (
          <CommentList comments={comments} />
        )}
      </div>
    </section>
  );
}
