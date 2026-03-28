import { getArticlesByCategory } from "@/lib/articles";
import { getCategoryBySlug, categories } from "@/lib/categories";
import ArticleGridWithLoadMore from "@/components/articles/ArticleGridWithLoadMore";
import Sidebar from "@/components/layout/Sidebar";
import AdSlot from "@/components/monetization/AdSlot";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";

interface CategoryPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

const LOCALES = ["en", "es", "fr", "de", "pt"] as const;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  const tCat = await getTranslations("Categories");
  const catName = tCat(`${slug}.name`);
  const canonical = `${SITE_URL}/${locale}/category/${slug}`;

  const languages: Record<string, string> = {};
  LOCALES.forEach(loc => {
    languages[loc] = `${SITE_URL}/${loc}/category/${slug}`;
  });
  languages["x-default"] = `${SITE_URL}/en/category/${slug}`;

  return {
    title: `${catName} Tips & Articles`,
    description: `Explore the best ${catName.toLowerCase()} tips, tricks, and guides on LifeWise. Practical advice and ideas for smarter living.`,
    alternates: { 
      canonical,
      languages,
    },
    openGraph: {
      title: `${catName} Tips & Articles | LifeWise`,
      description: `Explore the best ${catName.toLowerCase()} tips, tricks, and guides.`,
      url: canonical,
    },
  };
}

export async function generateStaticParams() {
  return categories.flatMap((cat) =>
    LOCALES.map((locale) => ({ slug: cat.slug, locale }))
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug, locale } = await params;
  const category = getCategoryBySlug(slug);
  const t = await getTranslations("Category");
  const tCat = await getTranslations("Categories");

  if (!category) notFound();

  const allArticles = await getArticlesByCategory(slug, locale);

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 mt-6 md:mt-10 mb-16 md:mb-20">
      <div className="bg-surface border border-border rounded-xl p-6 md:p-8 mb-8 md:mb-10 text-center relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-accent" aria-hidden />
        <div className="text-[2.5rem] md:text-[3.5rem] mb-4 animate-bounce">{category.icon}</div>
        <h1 className="font-display text-[1.75rem] sm:text-[2.25rem] md:text-[2.5rem] font-extrabold text-primary mb-3 tracking-tight">
          {tCat(`${slug}.name`)}
        </h1>
        <p className="font-body text-muted max-w-[600px] w-full mx-auto text-base md:text-lg leading-relaxed text-center px-1">
          {tCat(`${slug}.desc`) || `${t("latestIn")} ${tCat(`${slug}.name`).toLowerCase()}.`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 md:gap-10">
        <main className="min-w-0">
          {allArticles.length > 0 ? (
            <ArticleGridWithLoadMore articles={allArticles} initialCount={12} perPage={12} />
          ) : (
            <div className="text-center py-20 bg-surface border border-border rounded-xl">
              <p className="text-muted font-ui text-sm">{t("noArticles")}</p>
            </div>
          )}
          
          <AdSlot slot="category-mid" format="auto" height={100} className="my-10" />
        </main>
        
        <Sidebar />
      </div>
    </div>
  );
}

