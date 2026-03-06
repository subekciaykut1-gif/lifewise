"use client";

import { useState } from "react";
import { trackNewsletterSignup } from "@/lib/analytics";

export default function SubscribeForm() {
  const mailchimpUrl = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    if (!mailchimpUrl || mailchimpUrl === "#") {
      e.preventDefault();
      alert("Please configure NEXT_PUBLIC_MAILCHIMP_URL in your .env.local file to enable newsletter subscriptions.");
      return;
    }
    // Only track when form actually submits to Mailchimp
    trackNewsletterSignup("subscribe_page", "Subscribe Free");
  };

  return (
    <form 
      action={mailchimpUrl || "#"} 
      method="POST" 
      target="_blank"
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-primary mb-2 font-ui uppercase tracking-wide">
          Email Address
        </label>
        <input 
          type="email" 
          name="EMAIL"
          id="email" 
          placeholder="your@email.com" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-primary font-ui text-[1rem] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
        />
      </div>
      
      {/* Real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
        <input type="text" name="b_897bdde3409a948b47edc9d01_52d8ce09fa" tabIndex={-1} defaultValue="" />
      </div>

      <button 
        type="submit"
        className="w-full bg-accent text-white border-none px-6 py-4 rounded-lg font-ui text-[1rem] font-bold hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-cta-hover transition-all cursor-pointer mt-2"
      >
        Subscribe Free
      </button>
    </form>
  );
}
