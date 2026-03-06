import Link from "next/link";
import { Search } from "lucide-react";
import { categories } from "@/lib/categories";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-surface/90 border-b border-border">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-[1.6rem] md:text-[1.85rem] font-extrabold tracking-tighter text-primary no-underline">
          Life<span className="text-accent">Wise</span>
        </Link>
        <div className="flex gap-3 items-center">
          <Link href="/search" className="bg-transparent border-[1.5px] border-border rounded-full w-9 h-9 flex items-center justify-center cursor-pointer text-muted text-sm hover:border-accent hover:text-accent transition-colors" aria-label="Search">
            <Search size={18} />
          </Link>
          <Link href="/subscribe" className="hidden sm:block bg-accent text-white border-none px-[18px] py-2 rounded-[20px] font-ui text-[0.8rem] font-semibold cursor-pointer tracking-normal hover:shadow-cta-hover transition-all transform hover:-translate-y-px no-underline">
            Subscribe Free
          </Link>
        </div>
      </div>
      <div className="bg-primary w-full">
        <nav className="max-w-[1280px] mx-auto overflow-x-auto scrollbar-hide">
          <div className="px-4 md:px-6 flex whitespace-nowrap min-w-full">
            <Link href="/" className="px-3 py-3 md:px-4 font-ui text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white border-b-2 border-transparent hover:border-accent transition-colors flex-shrink-0 min-w-[44px] text-center">
              🏠 Home
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-3 py-3 md:px-4 font-ui text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white border-b-2 border-transparent hover:border-accent transition-colors flex-shrink-0 min-w-[44px] flex items-center gap-1"
              >
                <span>{cat.icon}</span> <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
