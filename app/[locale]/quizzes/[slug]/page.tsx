import Sidebar from "@/components/layout/Sidebar";
import QuizPlayer from "@/components/ui/QuizPlayer";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import AdSlot from "@/components/monetization/AdSlot";
import { sql } from "@/lib/db";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = await sql`SELECT title, description FROM quizzes WHERE slug = ${slug} LIMIT 1`;
  
  if (!quiz.length) return { title: "Quiz Not Found" };

  return {
    title: `${quiz[0].title} - Interactive Quiz`,
    description: quiz[0].description,
  };
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Verify quiz exists and is published
  const quizCheck = await sql`SELECT id, title FROM quizzes WHERE slug = ${slug} AND is_active = true AND publish_at <= NOW()`;
  if (!quizCheck.length) notFound();

  const t = await getTranslations("Nav");
  const breadcrumbs = [
    { label: t("home"), href: "/" },
    { label: t("quizzes"), href: "/quizzes" },
    { label: quizCheck[0].title, href: `/quizzes/${slug}` },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-6 mt-6 md:mt-10 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <main>
          <Breadcrumbs 
            items={breadcrumbs} 
          />

          <div className="mt-8">
            <QuizPlayer quizSlug={slug} />
          </div>

          <AdSlot slot="quiz-below" format="auto" height={250} className="mt-12" />
        </main>

        <Sidebar />
      </div>
    </div>
  );
}
