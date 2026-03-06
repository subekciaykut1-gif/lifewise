"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { trackNewsletterSignup } from "@/lib/analytics";

export default function NewsletterBanner() {
  const mailchimpUrl = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    if (!mailchimpUrl || mailchimpUrl === "#") {
      e.preventDefault();
      alert("Please configure NEXT_PUBLIC_MAILCHIMP_URL in your .env.local file to enable newsletter subscriptions.");
      return;
    }
    trackNewsletterSignup("newsletter_banner", "Subscribe Free");
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-newsletter p-6 md:p-12 flex flex-col items-center md:flex-row md:items-center gap-6 md:gap-8 mb-10 shadow-lg">
      {/* Decorative Circle */}
      <div className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full bg-accent/30 blur-3xl pointer-events-none"></div>
      
      <div className="text-[3rem] md:text-[3.5rem] flex-shrink-0 animate-bounce">📬</div>
      
      <div className="flex-1 text-center md:text-left z-10 w-full">
        <h3 className="font-display text-[1.4rem] md:text-[1.5rem] font-bold text-white mb-2 leading-tight">
          Join 50,000+ Smart Readers
        </h3>
        <p className="font-ui text-[0.9rem] text-white/70 leading-relaxed max-w-[400px] mx-auto md:mx-0">
          Get the best life hacks, health tips & viral stories delivered weekly — free!
        </p>
      </div>

      <form 
        action={mailchimpUrl || "#"} 
        method="POST" 
        target="_blank"
        className="flex flex-col gap-3 w-full md:w-auto flex-shrink-0 z-10"
        onSubmit={handleSubmit}
      >
        <input 
          type="email" 
          name="EMAIL"
          placeholder="your@email.com" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white font-ui text-[0.9rem] w-full md:w-[240px] focus:outline-none focus:border-white/50 focus:bg-white/15 placeholder:text-white/40 transition-all"
        />
        
        {/* Anti-bot field */}
        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          <input type="text" name="b_897bdde3409a948b47edc9d01_52d8ce09fa" tabIndex={-1} defaultValue="" />
        </div>

        <button className="bg-accent text-white border-none px-6 py-3 rounded-lg font-ui text-[0.9rem] font-bold hover:bg-accent/90 hover:translate-y-px hover:shadow-lg transition-all whitespace-nowrap cursor-pointer w-full">
          Subscribe Free
        </button>
      </form>
    </div>
  );
}
