"use client";

import { useState } from "react";
import { trackNewsletterSignup } from "@/lib/analytics";

export default function SubscribeForm() {
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
        trackNewsletterSignup("subscribe_page", "Subscribe Free");
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
    <form 
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

      {message && (
        <div className={`p-3 rounded-md text-sm font-ui ${status === "success" ? "bg-green-100/10 text-green-600 dark:text-green-400 border border-green-500/20" : "bg-red-100/10 text-red-600 dark:text-red-400 border border-red-500/20"}`}>
          {message}
        </div>
      )}

      <button 
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="w-full bg-accent text-white border-none px-6 py-4 rounded-lg font-ui text-[1rem] font-bold hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-cta-hover transition-all cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe Free"}
      </button>
    </form>
  );
}
