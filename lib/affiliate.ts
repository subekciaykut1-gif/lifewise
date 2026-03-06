/**
 * Amazon Associates affiliate tag. Set NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG in env to override.
 */
export const AMAZON_ASSOCIATE_TAG =
  process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || "wisetips-20";

/**
 * Appends the Amazon Associate tag to an Amazon URL so commissions are attributed.
 * Handles both amazon.com and amazon.* (e.g. amazon.co.uk) URLs.
 */
export function addAmazonTag(url: string): string {
  if (!url || typeof url !== "string") return url;
  const trimmed = url.trim();
  if (
    !/^https?:\/\/(www\.)?amazon\./i.test(trimmed) &&
    !/^https?:\/\/(www\.)?amzn\./i.test(trimmed)
  ) {
    return url;
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.searchParams.has("tag")) return url;
    parsed.searchParams.set("tag", AMAZON_ASSOCIATE_TAG);
    return parsed.toString();
  } catch {
    return url;
  }
}
