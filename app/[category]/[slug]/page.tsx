import { getArticleBySlug, getAllArticles, getPublishedArticles, getRelatedArticles } from "@/lib/articles";

export const revalidate = 3600; // Revalidate every hour

import { getCategoryBySlug } from "@/lib/categories";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { Clock, Eye } from "lucide-react";
import { formatViewCount } from "@/lib/article-views";
import Image from "next/image";
import Sidebar from "@/components/layout/Sidebar";
import AdSlot from "@/components/monetization/AdSlot";
import RelatedArticles from "@/components/articles/RelatedArticles";
import ReadingProgress from "@/components/ui/ReadingProgress";
import NewsletterBanner from "@/components/ui/NewsletterBanner";
import { MDXRemote } from "next-mdx-remote/rsc";
import AffiliateLink from "@/components/monetization/AffiliateLink";
import ArticleAnalytics from "@/components/analytics/ArticleAnalytics";
import DisqusComments from "@/components/ui/DisqusComments";
import PinterestSaveButton from "@/components/social/PinterestSaveButton";
import ShareBar from "@/components/social/ShareBar";
import { addAmazonTag } from "@/lib/affiliate";
import { getPinterestImageUrl } from "@/lib/pinterestImage";
import { SITE_URL } from "@/lib/site";
import ViewTracker from "@/components/analytics/ViewTracker";
import TableOfContents from "@/components/article/TableOfContents";
import ReadNext from "@/components/article/ReadNext";
import AutoInjectedAds from "@/components/article/AutoInjectedAds";
import LiveViewCounter from "@/components/analytics/LiveViewCounter";
import SmartAffiliateBox from "@/components/monetization/SmartAffiliateBox";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import AuthorBio from "@/components/article/AuthorBio";
import { getAuthorPersona, getAuthorSlug } from "@/lib/authors";
import ArticleReactions from "@/components/article/ArticleReactions";
import CustomSurvey from "@/components/ui/CustomSurvey";

interface ArticlePageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug, category } = await params;
  const article = await getArticleBySlug(slug, category);
  if (!article) return {};
  const canonical = `${SITE_URL}/${category}/${slug}`;
  const pinterestImage = getPinterestImageUrl(article, SITE_URL);
  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.keywords || article.tags?.join(", "),
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      images: [pinterestImage, article.image || "/images/placeholder.jpg"].filter(Boolean).map(url => ({ url })),
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image || "/images/placeholder.jpg"].filter(Boolean),
    },
    alternates: { canonical },
    robots: "index, follow, max-snippet:-1, max-image-preview:large",
  };
}

const components = {
  AffiliateLink,
  AdSlot,
  a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} href={href ? addAmazonTag(href) : href} />
  ),
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category: categorySlug, slug } = await params;
  const article = await getArticleBySlug(slug, categorySlug);
  const category = getCategoryBySlug(categorySlug);
  
  if (!article) notFound();

  const publishedAt = article.publishedAt || article.date;
  if (new Date(publishedAt) > new Date()) notFound();

  const relatedArticles = await getRelatedArticles(article, 6);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: [article.image || "/images/placeholder.jpg"].filter(Boolean),
    datePublished: publishedAt,
    dateModified: article.dateModified || publishedAt,
    author: { "@type": "Person", name: getAuthorPersona(article.author || article.category).name },
    publisher: { 
      "@type": "Organization", 
      name: "LifeWise", 
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png` 
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${categorySlug}/${slug}`
    },
    keywords: article.keywords?.join(", ") || article.tags?.join(", ")
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: category?.name || categorySlug, item: `${SITE_URL}/category/${categorySlug}` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}/${categorySlug}/${slug}` },
    ],
  };

  const persona = getAuthorPersona(article.author || article.category);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ViewTracker slug={slug} category={categorySlug} />
      <ReadingProgress />
      <ArticleAnalytics articleTitle={article.title} category={categorySlug} author={persona.name} />
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 mt-6 md:mt-10 mb-16 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[260px_1fr_320px] gap-8 md:gap-10">
          {/* Left Column: TOC (Desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-36">
              <TableOfContents />
            </div>
          </aside>

          {/* Center Column: Article Content */}
          <article className="min-w-0 prose-article">
            <Breadcrumbs 
              items={[
                { label: category?.name || categorySlug, href: `/category/${categorySlug}` },
                { label: article.title, href: "#" }
              ]} 
            />

            <span className="inline-block bg-accent-soft text-accent font-ui text-[0.68rem] font-bold uppercase tracking-widest px-3 py-1.5 rounded mb-4">
              {category?.icon} {category?.name}
            </span>

            <h1 className="font-display text-[1.75rem] sm:text-[2.2rem] md:text-[2.8rem] font-extrabold text-primary leading-tight mb-5 tracking-tight break-words">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pb-6 border-b border-border mb-8">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-accent/20 shadow-sm bg-muted flex-shrink-0">
                  <Image 
                    src={persona.image} 
                    alt={persona.name} 
                    fill 
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <Link href={`/author/${getAuthorSlug(article.author || categorySlug)}`} className="font-ui text-sm font-bold text-primary group-hover:text-accent transition-colors">
                    {persona.name}
                  </Link>
                  <div className="font-ui text-xs text-muted">
                    {format(new Date(article.date), "MMMM d, yyyy")}
                    {article.dateModified && (
                      <span className="ml-1"> · Updated {format(new Date(article.dateModified), "MMM d, yyyy")}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="h-8 w-px bg-border hidden sm:block"></div>

              <div className="flex flex-wrap items-center gap-4 text-muted font-ui text-xs">
                <span className="flex items-center gap-1.5"><Clock size={14} /> {article.readTime} min read</span>
                {typeof article.views === "number" && (
                  <LiveViewCounter 
                    slug={slug} 
                    category={categorySlug} 
                    initialViews={article.views} 
                  />
                )}
                <PinterestSaveButton
                  url={`${SITE_URL}/${categorySlug}/${slug}`}
                  imageUrl={getPinterestImageUrl(article, SITE_URL)}
                  description={article.title}
                />
                <ShareBar url={`${SITE_URL}/${categorySlug}/${slug}`} title={article.title} description={article.excerpt} />
              </div>
            </div>

            <AdSlot slot="article-top" format="leaderboard" height={90} className="mb-8" />

            {/* Hero Image */}
            <div className="aspect-video rounded-xl overflow-hidden mb-8 shadow-lg relative bg-primary">
              <Image
                src={article.image || `https://picsum.photos/seed/${article.slug}/1200/630`}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1280px"
                priority
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none font-body text-primary leading-loose prose-headings:font-display prose-headings:font-bold prose-headings:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl overflow-hidden">
              <MDXRemote source={article.content} components={components} />
            </div>

            <SmartAffiliateBox category={article.category} keywords={article.keywords || article.tags} />

            {(() => {
              const persona = getAuthorPersona(article.author || article.category);
              return <AuthorBio persona={persona} />;
            })()}
            
            <CustomSurvey type="inline" />

            <ArticleReactions category={categorySlug} slug={slug} />

            <p className="my-8 py-4 px-4 rounded-lg bg-surface border border-border text-center font-body text-muted text-sm">
              Get more tips in your inbox —{" "}
              <Link href="/subscribe" className="text-accent font-semibold hover:underline">
                Subscribe free
              </Link>
              .
            </p>

            <div className="my-10 pt-8 border-t border-border">
              <h3 className="font-display text-xl font-bold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags?.map(tag => (
                  <span key={tag} className="bg-bg border border-border px-3 py-1 rounded-full text-xs font-ui text-muted uppercase tracking-wide">#{tag}</span>
                ))}
              </div>
            </div>

            <AdSlot slot="article-bottom" format="auto" height={250} className="my-10" />

            <RelatedArticles articles={relatedArticles} />

            <DisqusComments
              identifier={`${categorySlug}/${slug}`}
              url={`${SITE_URL}/${categorySlug}/${slug}`}
              title={article.title}
            />
          </article>

          {/* Right Column: Sidebar */}
          <aside className="space-y-8 min-w-0">
            <AdSlot slot="sidebar-top" format="rectangle" height={300} />
            <NewsletterBanner sidebar />
            <div className="sticky top-36">
              <AdSlot slot="sidebar-sticky" format="vertical" height={600} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
