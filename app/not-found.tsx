import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-[3rem] md:text-[4rem] font-extrabold text-primary mb-4">
        404
      </h1>
      <p className="font-body text-xl text-muted mb-8 max-w-md">
        This page couldn’t be found. It may have been moved or the link might be broken.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-accent text-white font-ui font-semibold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center justify-center bg-surface border border-border text-primary font-ui font-semibold px-6 py-3 rounded-lg hover:border-accent hover:text-accent transition-colors"
        >
          Search Articles
        </Link>
      </div>
    </div>
  );
}
