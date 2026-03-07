import { sql } from "@/lib/db";
import Sidebar from "@/components/layout/Sidebar";
import QuizCard from "@/components/ui/QuizCard";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import AdSlot from "@/components/monetization/AdSlot";

export const metadata = {
  title: "Interactive Quizzes - LifeWise",
  description: "Test your knowledge with our premium interactive quizzes on life hacks, cleaning, and wellness.",
};

export default async function QuizHub() {
  const quizzes = await sql`
    SELECT title, slug, category, description, image_url 
    FROM quizzes 
    WHERE is_active = true AND publish_at <= NOW()
    ORDER BY publish_at DESC
  `;

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-6 mt-6 md:mt-10 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <main>
          <Breadcrumbs 
            items={[
              { label: "Home", href: "/" },
              { label: "Quizzes", href: "/quizzes" }
            ]} 
          />

          <div className="mb-12 mt-4 text-center sm:text-left">
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-primary mb-6 tracking-tight">
              LifeWise <span className="text-accent">Quiz Hub</span>
            </h1>
            <p className="text-muted font-body text-lg sm:text-xl max-w-2xl leading-relaxed">
              Challenge yourself and learn something new! Our interactive quizzes are designed to test your "LifeWise IQ" across every category.
            </p>
          </div>

          <AdSlot slot="quizzes-top" format="leaderboard" height={90} className="mb-12" />

          {quizzes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {quizzes.map((quiz: any) => (
                <QuizCard key={quiz.slug} quiz={quiz} />
              ))}
            </div>
          ) : (
            <div className="p-20 text-center bg-surface rounded-3xl border border-dashed border-border">
              <p className="font-display text-2xl font-bold text-muted mb-4">Coming Soon!</p>
              <p className="text-muted">We are currently crafting some amazing quizzes for you. Stay tuned!</p>
            </div>
          )}

          <AdSlot slot="quizzes-bottom" format="auto" height={250} className="mt-16" />
        </main>

        <Sidebar />
      </div>
    </div>
  );
}
