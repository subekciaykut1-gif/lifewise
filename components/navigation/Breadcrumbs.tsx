import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-[0.75rem] font-ui text-muted mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide py-1">
      <Link href="/" className="flex items-center hover:text-accent transition-colors">
        <Home size={14} className="mr-1" />
        <span>Home</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <ChevronRight size={12} className="text-muted/40" />
          {index === items.length - 1 ? (
            <span className="text-primary font-semibold truncate max-w-[200px] md:max-w-none">
              {item.label}
            </span>
          ) : (
            <Link href={item.href} className="hover:text-accent transition-colors">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
