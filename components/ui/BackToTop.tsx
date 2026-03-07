"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const SCROLL_THRESHOLD = 400;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="no-print fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-accent text-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      aria-label="Back to top"
    >
      <ArrowUp size={22} />
    </button>
  );
}
