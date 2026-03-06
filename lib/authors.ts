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

export function getAuthorSlug(nameOrCategory: string): string {
  // 1. If it's a known author key directly
  if (AUTHORS[nameOrCategory.toLowerCase()]) return nameOrCategory.toLowerCase();
  
  // 2. If it's a name that needs slugifying
  const slug = slugify(nameOrCategory);
  if (AUTHORS[slug]) return slug;

  // 3. If it's a category mapping
  const authorKeyFromCategory = CATEGORY_MAP[nameOrCategory];
  if (authorKeyFromCategory) return authorKeyFromCategory;

  // 4. Default
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

export function getAuthorPersona(nameOrCategory: string): AuthorPersona {
  // 1. Try to find by name/key directly
  const normalizedKey = nameOrCategory.toLowerCase().replace(/\s+/g, '-');
  if (AUTHORS[normalizedKey]) {
    return AUTHORS[normalizedKey];
  }

  // 2. Try to find by category mapping
  const authorKey = CATEGORY_MAP[nameOrCategory];
  if (authorKey && AUTHORS[authorKey]) {
    return AUTHORS[authorKey];
  }

  // 3. Fallback to a default persona (e.g., David Chen for general hacks)
  return AUTHORS["david-chen"];
}
