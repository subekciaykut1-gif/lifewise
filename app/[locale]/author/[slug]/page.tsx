import { getAllAuthors, getAuthorBySlug, getAuthorCategories } from "@/lib/authors";
import { getPublishedArticles } from "@/lib/articles";
import { getCategoryBySlug } from "@/lib/categories";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ArticleCard from "@/components/articles/ArticleCard";
import { SITE_URL } from "@/lib/site";
import { BookOpen, Tag } from "lucide-react";

interface AuthorPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

const LOCALES = ["en", "es", "fr", "de", "pt"] as const;

export async function generateStaticParams() {
  return getAllAuthors().flatMap((a) =>
    LOCALES.map((locale) => ({ slug: a.slug, locale }))
  );
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};
  const canonical = `${SITE_URL}/${locale}/author/${slug}`;
  return {
    title: `${author.name} — ${author.role}`,
    description: author.bio,
    alternates: { canonical },
    openGraph: {
      title: `${author.name} | LifeWise`,
      description: author.bio,
      url: canonical,
      images: [{ url: author.image, width: 400, height: 400, alt: author.name }],
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug, locale } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const allArticles = await getPublishedArticles(locale);
  const authorCategories = getAuthorCategories(slug);

  // Articles where frontmatter author matches OR category mapping matches
  const authorArticles = allArticles.filter(
    (a) =>
      (a.author && a.author.toLowerCase().replace(/\s+/g, "-") === slug) ||
      authorCategories.includes(a.category)
  );

  const totalViews = authorArticles.reduce((sum, a) => sum + (a.views || 0), 0);
  const recentArticles = authorArticles.slice(0, 6);

  // JSON-LD Person schema — this is what Google uses for E-E-A-T
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    image: `${SITE_URL}${author.image}`,
    url: `${SITE_URL}/author/${slug}`,
    worksFor: { "@type": "Organization", name: "LifeWise", url: SITE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 mt-8 md:mt-14 mb-16 md:mb-24">

        {/* ── Hero Card ── */}
        <div className="relative overflow-hidden rounded-3xl bg-surface border border-border shadow-xl mb-14">
          {/* Gradient accent bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent via-secondary to-accent" />
          {/* Background glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 md:p-12">
            {/* Avatar */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl shadow-accent/10 shrink-0">
              <Image
                src={author.image}
                alt={author.name}
                fill
                className="object-cover"
                sizes="160px"
                priority
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block bg-accent/10 text-accent text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
                {author.role}
              </span>
              <h1 className="font-display text-[2.2rem] md:text-[2.8rem] font-extrabold text-primary tracking-tight leading-tight mb-4">
                {author.name}
              </h1>
              <p className="font-body text-muted text-[1rem] md:text-[1.05rem] leading-relaxed max-w-[560px] mx-auto md:mx-0 mb-6">
                {author.bio}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                <div className="flex items-center gap-2 text-muted font-ui text-sm">
                  <BookOpen size={16} className="text-accent" />
                  <span><strong className="text-primary">{authorArticles.length}</strong> articles</span>
                </div>
                <div className="flex items-center gap-2 text-muted font-ui text-sm">
                  <Tag size={16} className="text-accent" />
                  <span>
                    {authorCategories.map((catSlug) => {
                      const cat = getCategoryBySlug(catSlug);
                      return cat ? (
                        <Link
                          key={catSlug}
                          href={`/category/${catSlug}`}
                          className="hover:text-accent transition-colors mr-1.5"
                        >
                          {cat.icon} {cat.name}
                        </Link>
                      ) : null;
                    })}
                  </span>
                </div>
                {totalViews > 0 && (
                  <div className="font-ui text-sm text-muted">
                    <strong className="text-primary">{totalViews.toLocaleString()}</strong> total views
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Latest Articles ── */}
        <div>
          <h2 className="font-display text-[1.6rem] font-extrabold text-primary mb-8 tracking-tight">
            Latest by {author.name.split(" ")[0]}
          </h2>

          {recentArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface border border-border rounded-2xl">
              <p className="text-muted font-ui">No articles found yet.</p>
            </div>
          )}

          {authorArticles.length > 6 && (
            <div className="text-center mt-10">
              <Link
                href={`/category/${authorCategories[0]}`}
                className="inline-flex items-center gap-2 bg-accent text-white font-ui font-bold px-8 py-3.5 rounded-xl hover:bg-accent/90 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
              >
                See All {authorArticles.length} Articles
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
