"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
      }
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-[3px] bg-accent z-progress transition-all duration-100 ease-out" 
      style={{ width: `${progress}%` }} 
    />
  );
}
