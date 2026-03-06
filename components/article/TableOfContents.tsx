"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Find all h2 and h3 elements within the article content
    const articleContent = document.querySelector(".prose-article");
    if (!articleContent) return;

    const elements = Array.from(articleContent.querySelectorAll("h2, h3"));
    const items: TocItem[] = elements.map((el, index) => {
      // Ensure each heading has an ID
      if (!el.id) {
        el.id = `heading-${index}`;
      }
      return {
        id: el.id,
        text: el.textContent || "",
        level: parseInt(el.tagName.replace("H", ""), 10),
      };
    });

    setHeadings(items);

    // Set up IntersectionObserver to track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-28 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto w-64 p-6 bg-surface border border-border rounded-xl shadow-sm">
      <h4 className="font-display text-[1rem] font-bold text-primary mb-4 uppercase tracking-wider border-b border-border pb-2">
        In This Article
      </h4>
      <ul className="space-y-3">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${heading.level - 2}rem` }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className={cn(
                "block text-[0.85rem] font-ui transition-all hover:text-accent leading-tight",
                activeId === heading.id
                  ? "text-accent font-bold translate-x-1"
                  : "text-muted font-medium"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
