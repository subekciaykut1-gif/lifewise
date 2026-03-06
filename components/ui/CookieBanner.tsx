"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setShow(false);
  };

  const preferEssentialOnly = () => {
    localStorage.setItem("cookie-consent", "essential");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 max-w-[900px] mx-auto bg-primary text-white p-4 sm:p-6 rounded-xl shadow-2xl z-[9999] flex flex-col md:flex-row items-center gap-4 md:gap-6" style={{ animation: "fadeSlideUp 0.4s ease-out" }}>
      <div className="flex-1 font-ui text-[0.8rem] text-white/80 leading-relaxed">
        <strong className="text-white">🍪 We use cookies</strong> to personalize content and ads, provide social media features, and analyze our traffic. By continuing to use LifeWise, you consent to our use of cookies.
      </div>
      <div className="flex flex-wrap gap-3 shrink-0">
        <button
          type="button"
          onClick={accept}
          className="min-h-[44px] min-w-[44px] bg-accent text-white px-5 py-2.5 rounded-lg font-ui text-xs font-bold uppercase tracking-wide hover:bg-accent/90 transition-colors"
        >
          Accept All
        </button>
        <button
          type="button"
          onClick={preferEssentialOnly}
          className="min-h-[44px] min-w-[44px] bg-white/10 text-white border border-white/20 px-4 py-2.5 rounded-lg font-ui text-xs font-semibold hover:bg-white/20 transition-colors"
        >
          Essential Only
        </button>
      </div>
      <button
        type="button"
        onClick={() => setShow(false)}
        className="absolute top-2 right-2 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white/40 hover:text-white transition-colors md:hidden -m-2"
        aria-label="Dismiss"
      >
        <X size={20} />
      </button>
    </div>
  );
}
