"use client";

import { useState } from "react";
import { Twitter, Facebook, Link2, MessageCircle, Check } from "lucide-react";

export interface ShareBarProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

function encodeUri(s: string): string {
  return encodeURIComponent(s);
}

export default function ShareBar({ url, title, description, className = "" }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const twitterHref = `https://twitter.com/intent/tweet?url=${encodeUri(url)}&text=${encodeUri(title)}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeUri(url)}`;
  const whatsappHref = `https://wa.me/?text=${encodeUri(`${title} ${url}`)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const btn = "w-10 h-10 min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center text-muted hover:text-primary hover:bg-border transition-colors";
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="font-ui text-xs font-semibold text-muted uppercase tracking-wide mr-1">Share</span>
      <a href={twitterHref} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on X (Twitter)">
        <Twitter size={18} />
      </a>
      <a href={facebookHref} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on Facebook">
        <Facebook size={18} />
      </a>
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on WhatsApp">
        <MessageCircle size={18} />
      </a>
      <button type="button" onClick={copyLink} className={btn} aria-label="Copy link">
        {copied ? <Check size={18} className="text-accent" /> : <Link2 size={18} />}
      </button>
    </div>
  );
}
