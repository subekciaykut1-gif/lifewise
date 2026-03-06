"use client";

import { useEffect, useState } from "react";
import { X, Mail } from "lucide-react";
import { trackNewsletterSignup } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check if the user has already seen the modal recently
    const lastShown = localStorage.getItem("exit_intent_last_shown");
    const COOLDOWN_DAYS = 7;
    const now = new Date().getTime();

    if (lastShown && now - parseInt(lastShown, 10) < COOLDOWN_DAYS * 24 * 60 * 60 * 1000) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true);
        localStorage.setItem("exit_intent_last_shown", now.toString());
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

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
        trackNewsletterSignup("exit_intent_modal", "Join Now");
        // Close modal after success after a delay
        setTimeout(() => setIsOpen(false), 3000);
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="relative bg-surface w-full max-w-[500px] rounded-3xl overflow-hidden shadow-2xl border border-border animate-in zoom-in-95 slide-in-from-bottom-10 duration-500"
        role="dialog"
        aria-modal="true"
      >
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/10 rounded-full -ml-16 -mb-16 blur-3xl"></div>

        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 hover:bg-bg rounded-full transition-colors z-10 text-muted"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-10 text-center">
          <div className="w-20 h-20 bg-accent-soft rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
             <Mail className="text-accent" size={36} />
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-bold text-primary mb-3">
            Wait! Don&apos;t Leave Yet
          </h3>
          <p className="font-ui text-muted text-[0.95rem] leading-relaxed mb-8">
            Join 50,000+ others getting the best life hacks and health tips delivered weekly. No spam, just pure value.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input 
                type="email" 
                placeholder="your@email.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg border border-border rounded-xl px-4 py-4 text-primary font-ui text-[1rem] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all pl-12"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50" size={20} />
            </div>

            {message && (
              <div className={cn(
                "p-3 rounded-lg text-sm font-ui border animate-in slide-in-from-top-2",
                status === "success" 
                  ? "bg-green-100/10 text-green-600 dark:text-green-400 border-green-500/20" 
                  : "bg-red-100/10 text-red-600 dark:text-red-400 border-red-500/20"
              )}>
                {message}
              </div>
            )}

            <button 
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full bg-accent text-white border-none px-6 py-4 rounded-xl font-ui text-[1rem] font-bold hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Subscribing..." : status === "success" ? "See you in court! (Just kidding)" : "Join Now — It's Free"}
            </button>
            <p className="text-[0.7rem] text-muted-500 uppercase tracking-widest font-bold">
              Unsubscribe anytime with one click
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
