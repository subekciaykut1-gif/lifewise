/**
 * Shared article view utilities that are safe for both client and server.
 * Do NOT use Node.js modules (fs, path) here.
 */

export function formatViewCount(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(views);
}
