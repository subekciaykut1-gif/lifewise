"use client";

export interface PinterestSaveButtonProps {
  /** Canonical article URL (absolute). */
  url: string;
  /** Pinterest-optimized image URL (1000×1500). */
  imageUrl: string;
  /** Pin description (article title or excerpt). */
  description: string;
  /** Optional class name for the button container. */
  className?: string;
}

/**
 * Opens Pinterest's "Save" flow so users can pin the article to a board.
 * Uses Pinterest's pin-create URL with pre-filled url, media, and description.
 */
export default function PinterestSaveButton({
  url,
  imageUrl,
  description,
  className = "",
}: PinterestSaveButtonProps) {
  const params = new URLSearchParams({
    url,
    media: imageUrl,
    description: description.slice(0, 500),
  });
  const href = `https://pinterest.com/pin/create/button/?${params.toString()}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`no-print inline-flex items-center justify-center gap-2 rounded-lg bg-[#E60023] px-4 py-2.5 min-h-[44px] text-sm font-semibold text-white shadow-sm transition hover:bg-[#AD081B] focus:outline-none focus:ring-2 focus:ring-[#E60023] focus:ring-offset-2 ${className}`}
      aria-label="Save to Pinterest"
    >
      <svg
        className="h-5 w-5 shrink-0"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.064-4.869-5.012-4.869-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.214 0-2.354-.632-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
      Save to Pinterest
    </a>
  );
}
