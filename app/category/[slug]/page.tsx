import { getPublishedArticles } from "@/lib/articles";
import { getCategoryBySlug, categories } from "@/lib/categories";
import ArticleGrid from "@/components/articles/ArticleGrid";
import Sidebar from "@/components/layout/Sidebar";
import AdSlot from "@/components/monetization/AdSlot";
import Pagination from "@/components/ui/Pagination";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  const canonical = `${SITE_URL}/category/${slug}`;
  return {
    title: `${category.name} Tips & Articles`,
    description: `Explore the best ${category.name.toLowerCase()} tips, tricks, and guides on LifeWise. Practical advice and ideas for smarter living.`,
    alternates: { canonical },
    openGraph: {
      title: `${category.name} Tips & Articles | LifeWise`,
      description: `Explore the best ${category.name.toLowerCase()} tips, tricks, and guides.`,
      url: canonical,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const category = getCategoryBySlug(slug);
  
  if (!category) notFound();

  const allArticles = getPublishedArticles().filter((a) => a.category === slug);
  const currentPage = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page, 10) : 1;
  const limit = 10;
  const totalPages = Math.ceil(allArticles.length / limit);
  const articles = allArticles.slice((currentPage - 1) * limit, currentPage * limit);

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 mt-6 md:mt-10 mb-16 md:mb-20">
      <div className="bg-surface border border-border rounded-xl p-6 md:p-8 mb-8 md:mb-10 text-center relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-accent" aria-hidden />
        <div className="text-[2.5rem] md:text-[3.5rem] mb-4 animate-bounce">{category.icon}</div>
        <h1 className="font-display text-[1.75rem] sm:text-[2.25rem] md:text-[2.5rem] font-extrabold text-primary mb-3 tracking-tight">
          {category.name}
        </h1>
        <p className="font-body text-muted max-w-[600px] w-full mx-auto text-base md:text-lg leading-relaxed text-center px-1">
          {category.description || `Explore our latest articles, guides, and tips about ${category.name.toLowerCase()}.`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 md:gap-10">
        <main className="min-w-0">
          {articles.length > 0 ? (
            <>
              <ArticleGrid articles={articles} />
              <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={`/category/${slug}`} />
            </>
          ) : (
            <div className="text-center py-20 bg-surface border border-border rounded-xl">
              <p className="text-muted font-ui text-sm">No articles found on this page.</p>
            </div>
          )}
          
          <AdSlot slot="category-mid" format="auto" height={100} className="my-10" />
        </main>
        
        <Sidebar />
      </div>
    </div>
  );
}
