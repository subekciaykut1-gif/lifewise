"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { trackNewsletterSignup } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface NewsletterBannerProps {
  sidebar?: boolean;
}

export default function NewsletterBanner({ sidebar }: NewsletterBannerProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
        trackNewsletterSignup(sidebar ? "sidebar_newsletter" : "newsletter_banner", "Subscribe Free");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl bg-gradient-newsletter flex flex-col items-center gap-6 shadow-lg",
      sidebar ? "p-6" : "md:p-12 md:flex-row md:items-center md:gap-8 p-6 mb-10"
    )}>
      {/* Decorative Circle */}
      <div className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full bg-accent/30 blur-3xl pointer-events-none"></div>
      
        <div className={cn(
          "w-16 h-16 bg-accent-soft rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-2",
          sidebar ? "w-12 h-12 mb-3" : "w-16 h-16 mb-4"
        )}>
           <Mail className="text-accent" size={sidebar ? 24 : 32} />
        </div>

        <h3 className={cn(
          "font-display font-bold text-white mb-2 leading-tight",
          sidebar ? "text-[1.2rem]" : "text-[1.4rem] md:text-[1.5rem]"
        )}>
          Join 50,000+ Smart Readers
        </h3>
        {!sidebar && (
          <p className="font-ui text-[0.9rem] text-white/70 leading-relaxed max-w-[400px] mx-auto md:mx-0">
            Get the best life hacks, health tips & viral stories delivered weekly — free!
          </p>
        )}
 
      <form 
        className={cn(
          "flex flex-col gap-3 w-full z-10",
          sidebar ? "" : "md:w-auto md:flex-shrink-0"
        )}
        onSubmit={handleSubmit}
      >
        <input 
          type="email" 
          name="EMAIL"
          placeholder="your@email.com" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white font-ui text-[0.9rem] w-full focus:outline-none focus:border-white/50 focus:bg-white/15 placeholder:text-white/40 transition-all",
            sidebar ? "" : "md:w-[240px]"
          )}
        />
        
        {message && (
          <div className={cn(
            "p-2 rounded-md text-xs font-ui",
            status === "success" ? "bg-green-500/20 text-green-100" : "bg-red-500/20 text-red-100"
          )}>
            {message}
          </div>
        )}

        <button 
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="bg-accent text-white border-none px-6 py-3 rounded-lg font-ui text-[0.9rem] font-bold hover:bg-accent/90 hover:translate-y-px hover:shadow-lg transition-all whitespace-nowrap cursor-pointer w-full disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe Free"}
        </button>
      </form>
    </div>
  );
}
