"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-11 h-11 min-w-[44px] min-h-[44px]" />;

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      onClick={cycleTheme}
      className="bg-transparent border-[1.5px] border-border rounded-full w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer text-muted text-sm hover:border-accent hover:text-accent transition-all shrink-0 active:scale-90"
      aria-label={`Switch to ${theme === "light" ? "dark" : theme === "dark" ? "system" : "light"} mode`}
      title={`Current: ${theme} - Click to switch`}
    >
      {theme === "light" && <Sun size={20} className="animate-in zoom-in-50 duration-300" />}
      {theme === "dark" && <Moon size={20} className="animate-in zoom-in-50 duration-300" />}
      {theme === "system" && <Monitor size={20} className="animate-in zoom-in-50 duration-300" />}
    </button>
  );
}
