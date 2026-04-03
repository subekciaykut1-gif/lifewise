"use client";

import { formatDistanceToNow } from "date-fns";
import { MessageSquareOff } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  author_name: string;
  author_image?: string;
}

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="py-12 text-center bg-muted/5 rounded-xl border border-dashed border-border">
        <MessageSquareOff className="mx-auto text-muted mb-3 opacity-30" size={32} />
        <p className="text-muted font-ui text-sm">No comments yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-8">
      <h3 className="font-display font-bold text-lg text-primary mb-6 flex items-center gap-2">
        Conversation ({comments.length})
      </h3>
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="group relative flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex-shrink-0">
              {comment.author_image ? (
                <img 
                  src={comment.author_image} 
                  alt={comment.author_name} 
                  className="w-10 h-10 rounded-full border border-border bg-surface shadow-sm object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {comment.author_name.charAt(0)}
                </div>
              )}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-ui font-bold text-sm text-primary">{comment.author_name}</span>
                <span className="text-[0.7rem] font-ui text-muted uppercase tracking-wider">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </span>
              </div>
              
              <div className="bg-surface border border-border p-4 rounded-2xl rounded-tl-none shadow-soft group-hover:border-accent/20 transition-all">
                <p className="text-sm font-body text-primary leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
