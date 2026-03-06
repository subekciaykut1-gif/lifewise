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
    <div className="fixed bottom-6 left-6 right-6 max-w-[900px] mx-auto bg-primary text-white p-6 rounded-xl shadow-2xl z-cookie flex flex-col md:flex-row items-center gap-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="flex-1 font-ui text-[0.8rem] text-white/80 leading-relaxed">
        <strong className="text-white">🍪 We use cookies</strong> to personalize content and ads, provide social media features, and analyze our traffic. By continuing to use LifeWise, you consent to our use of cookies.
      </div>
      <div className="flex gap-3 shrink-0">
        <button 
          onClick={accept}
          className="bg-accent text-white px-5 py-2.5 rounded-lg font-ui text-xs font-bold uppercase tracking-wide hover:bg-accent/90 transition-colors"
        >
          Accept All
        </button>
        <button 
          onClick={preferEssentialOnly}
          className="bg-white/10 text-white border border-white/20 px-4 py-2.5 rounded-lg font-ui text-xs font-semibold hover:bg-white/20 transition-colors"
        >
          Essential Only
        </button>
      </div>
      <button 
        onClick={() => setShow(false)} 
        className="absolute top-2 right-2 text-white/40 hover:text-white transition-colors md:hidden"
      >
        <X size={16} />
      </button>
    </div>
  );
}
