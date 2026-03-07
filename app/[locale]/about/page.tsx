import { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about LifeWise, our mission to help you live smarter every day, and our editorial standards.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    url: `${SITE_URL}/about`,
    title: "About Us | LifeWise",
    description: "Learn about LifeWise, our mission to help you live smarter every day, and our editorial standards.",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="font-display text-[2.5rem] md:text-[3.5rem] font-extrabold text-primary mb-6">
          About Life<span className="text-accent">Wise</span>
        </h1>
        <p className="font-body text-xl text-muted leading-relaxed">
          Smarter living, every day.
        </p>
      </div>

      <div className="prose prose-lg max-w-none font-body text-primary leading-loose prose-headings:font-display prose-headings:font-bold prose-headings:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
        <p>
          Welcome to LifeWise, your go-to destination for practical advice, life hacks, and inspiration to improve your daily life. 
          Founded in 2026, our mission is simple: <strong>to help people live smarter, healthier, and happier lives.</strong>
        </p>

        <h2>Our Mission</h2>
        <p>
          In a world overflowing with information, it can be hard to find trustworthy, actionable advice. 
          At LifeWise, we cut through the noise. We believe that small changes can lead to big results. 
          Whether it's a simple cleaning hack that saves you hours, a health tip that boosts your energy, 
          or a heartwarming story that restores your faith in humanity, we are here to deliver value in every article.
        </p>

        <h2>What We Cover</h2>
        <p>
          Our team of editors and writers researches and curates content across a wide range of topics essential to modern living:
        </p>
        <ul>
          <li><strong>Health & Wellness:</strong> Evidence-based tips for physical and mental well-being.</li>
          <li><strong>Home & Garden:</strong> DIY projects, cleaning secrets, and organization hacks.</li>
          <li><strong>Food & Kitchen:</strong> Recipes, cooking tricks, and nutritional guides.</li>
          <li><strong>Life Hacks:</strong> Clever shortcuts to solve everyday problems.</li>
          <li><strong>Viral Stories:</strong> Inspiring and entertaining stories from around the globe.</li>
        </ul>

        <h2>Our Editorial Standards</h2>
        <p>
          Integrity is at the core of what we do. Our editorial team rigorously researches every tip and fact-checks every story. 
          While we provide helpful information, we always recommend consulting with professionals for specific medical, legal, or financial advice.
        </p>

        <h2>Contact Us</h2>
        <p>
          We love hearing from our readers! Whether you have a question, a suggestion, or just want to say hello, feel free to reach out.
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:hello@lifewise.com">hello@lifewise.com</a>
        </p>
      </div>
    </div>
  );
}
