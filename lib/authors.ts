import authorsData from "@/data/authors.json";

export interface AuthorPersona {
  name: string;
  bio: string;
  image: string;
  role: string;
}

const AUTHORS = authorsData.authors as Record<string, AuthorPersona>;
const CATEGORY_MAP = authorsData.categoryMapping as Record<string, string>;

/** Robust slugify for author names */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word chars except spaces/hyphens
    .replace(/\s+/g, '-')      // replace spaces with hyphens
    .replace(/-+/g, '-');      // remove consecutive hyphens
}

export function getAuthorSlug(name: string, category?: string): string {
  // 1. If it's a known author key directly
  const normalizedKey = name.toLowerCase().replace(/\s+/g, '-');
  if (AUTHORS[normalizedKey]) return normalizedKey;
  
  // 2. Try to find by category mapping (if name was unrecognized or generic)
  const categoryKey = (category || name).toLowerCase();
  const authorKey = CATEGORY_MAP[categoryKey];
  if (authorKey && AUTHORS[authorKey]) return authorKey;

  // 3. Default to david-chen
  return "david-chen";
}

export function getAllAuthors(): Array<AuthorPersona & { slug: string }> {
  return Object.entries(AUTHORS).map(([slug, persona]) => ({ slug, ...persona }));
}

export function getAuthorBySlug(slug: string): (AuthorPersona & { slug: string }) | undefined {
  const persona = AUTHORS[slug];
  if (!persona) return undefined;
  return { slug, ...persona };
}

/** Returns the category slugs this author is mapped to */
export function getAuthorCategories(authorSlug: string): string[] {
  return Object.entries(CATEGORY_MAP)
    .filter(([, v]) => v === authorSlug)
    .map(([k]) => k);
}

export function getAuthorPersona(name: string, category?: string): AuthorPersona {
  // 1. Try to find by name/key directly
  const normalizedKey = name.toLowerCase().replace(/\s+/g, '-');
  if (AUTHORS[normalizedKey]) {
    return AUTHORS[normalizedKey];
  }

  // 2. Try to find by category mapping (if name was unrecognized or generic)
  const categoryKey = (category || name).toLowerCase();
  const authorKey = CATEGORY_MAP[categoryKey];
  if (authorKey && AUTHORS[authorKey]) {
    return AUTHORS[authorKey];
  }

  // 3. Last resort: default to David Chen
  return AUTHORS["david-chen"];
}
