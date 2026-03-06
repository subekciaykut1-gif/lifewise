import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-12 font-ui">
      {currentPage > 1 ? (
        <Link 
          href={`${baseUrl}?page=${currentPage - 1}`} 
          className="px-4 py-2 border border-border rounded-md hover:border-accent hover:text-accent transition-colors text-sm font-semibold"
        >
          ← Previous
        </Link>
      ) : (
        <span className="px-4 py-2 border border-border rounded-md text-muted text-sm font-semibold opacity-50 cursor-not-allowed">
          ← Previous
        </span>
      )}
      
      <span className="text-sm font-semibold text-primary px-2">
        Page {currentPage} of {totalPages}
      </span>
      
      {currentPage < totalPages ? (
        <Link 
          href={`${baseUrl}?page=${currentPage + 1}`} 
          className="px-4 py-2 border border-border rounded-md hover:border-accent hover:text-accent transition-colors text-sm font-semibold"
        >
          Next →
        </Link>
      ) : (
        <span className="px-4 py-2 border border-border rounded-md text-muted text-sm font-semibold opacity-50 cursor-not-allowed">
          Next →
        </span>
      )}
    </div>
  );
}
