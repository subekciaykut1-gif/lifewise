"use client";

import { useState } from "react";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Link } from "@/i18n/routing";

interface CommentFormProps {
  articleSlug: string;
  onCommentAdded: (comment: any) => void;
}

export default function CommentForm({ articleSlug, onCommentAdded }: CommentFormProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: articleSlug, content }),
      });

      const data = await res.json();
      if (res.ok) {
        setContent("");
        onCommentAdded(data.comment);
      } else {
        setError(data.error || "Failed to post comment");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return (
      <div className="bg-bg border border-border rounded-xl p-8 text-center shadow-sm">
        <MessageSquare className="mx-auto text-muted mb-4 opacity-50" size={32} />
        <h3 className="font-display font-bold text-lg text-primary mb-2">Join the Conversation</h3>
        <p className="text-muted font-ui text-sm mb-6 max-w-xs mx-auto">Please sign in to share your thoughts and connect with our community.</p>
        <Link 
          href="/auth/login" 
          className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-md font-ui text-sm font-bold hover:scale-[1.02] transition-all shadow-lg"
        >
          Sign In to Comment
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-soft">
      <div className="flex items-start gap-4 mb-4">
        {session.user?.image ? (
          <img src={session.user.image} alt={session.user.name || ""} className="w-10 h-10 rounded-full border border-border shadow-sm" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
            {session.user?.name?.charAt(0) || "U"}
          </div>
        )}
        <div className="flex-1">
          <p className="text-xs font-ui font-bold text-muted uppercase tracking-wider mb-1">Commenting as</p>
          <p className="text-sm font-body font-semibold text-primary">{session.user?.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What do you think about this article?"
          className="w-full min-h-[120px] bg-bg border border-border rounded-xl p-4 font-body text-primary placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none mb-4"
          required
        />
        
        {error && <p className="text-red-500 text-xs font-ui mb-4 flex items-center gap-2">⚠️ {error}</p>}
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="inline-flex items-center gap-2 bg-accent text-white px-6 py-2.5 rounded-lg font-ui text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-dark transition-all shadow-md active:scale-95"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Posting...
              </>
            ) : (
                <>
                <Send size={18} />
                Post Comment
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
