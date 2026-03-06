"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, Suspense, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Fuse from "fuse.js";
import { Article } from "@/lib/articles";
import { format } from "date-fns";
import { Clock } from "lucide-react";

interface SearchClientProps {
  articles: Article[];
}

function SearchResults({ articles }: SearchClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qParam = (searchParams.get("q") ?? "").trim();
  const [inputValue, setInputValue] = useState(qParam);
  useEffect(() => setInputValue(qParam), [qParam]);
  const q = qParam.toLowerCase();

  const fuse = useMemo(() => new Fuse(articles, {
    keys: ['title', 'excerpt', 'content', 'tags', 'category'],
    threshold: 0.4,
    ignoreLocation: true,
  }), [articles]);

  const results = useMemo(() => {
    if (!q) return [];
    return fuse.search(q).map(result => result.item);
  }, [fuse, q]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (new FormData(e.currentTarget as HTMLFormElement).get("q") as string)?.trim() ?? "";
    setInputValue(value);
    router.push(value ? `/search?q=${encodeURIComponent(value)}` : "/search");
  };

  return (
    <>
      <h1 className="font-display text-[1.35rem] font-bold text-primary mb-6 flex items-center gap-2.5 before:content-[''] before:w-1 before:h-[22px] before:bg-accent before:rounded-sm">
        Search
      </h1>
      <form className="mb-8" onSubmit={handleSubmit}>
        <input
          type="search"
          name="q"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search articles..."
          className="w-full bg-bg border border-border rounded-lg px-4 py-3 font-ui text-primary placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          aria-label="Search articles"
        />
      </form>
      {!q ? (
        <p className="text-muted font-ui text-sm">Enter a search term above.</p>
      ) : results.length === 0 ? (
        <p className="text-muted font-ui text-sm">No articles match your search.</p>
      ) : (
        <ul className="space-y-6">
          {results.map((article) => (
            <li key={`${article.category}/${article.slug}`}>
              <Link
                href={`/${article.category}/${article.slug}`}
                className="flex gap-4 group no-underline text-primary"
              >
                <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface">
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="128px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-ui text-xs text-muted uppercase tracking-wide">
                    {article.category}
                  </span>
                  <h2 className="font-display font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 mt-0.5">
                    {article.title}
                  </h2>
                  <p className="font-body text-muted text-sm line-clamp-2 mt-1">
                    {article.excerpt || (article.content ?? "").slice(0, 100).replace(/[#*]/g, "")}...
                  </p>
                  <span className="font-ui text-xs text-muted flex items-center gap-1 mt-2">
                    <Clock size={12} /> {article.readTime} min · {format(new Date(article.date), "MMM d, yyyy")}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function SearchClient(props: SearchClientProps) {
  return (
    <Suspense fallback={<p className="text-muted font-ui text-sm">Loading search...</p>}>
      <SearchResults {...props} />
    </Suspense>
  );
}
