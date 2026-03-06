import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wisetips.co";

export const metadata: Metadata = {
  title: "Write for Us",
  description: "Contribute to LifeWise! We're looking for expert writers in health, home, and lifestyle topics.",
  alternates: { canonical: `${baseUrl}/write-for-us` },
  openGraph: {
    url: `${baseUrl}/write-for-us`,
    title: "Write for Us | LifeWise",
    description: "Contribute to LifeWise! We're looking for expert writers in health, home, and lifestyle topics.",
  },
};

export default function WriteForUsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12 md:py-20">
      <div className="text-center mb-16">
        <h1 className="font-display text-[2.5rem] md:text-[3.5rem] font-extrabold text-primary mb-6">
          Write for Life<span className="text-accent">Wise</span>
        </h1>
        <p className="font-body text-xl text-muted leading-relaxed max-w-2xl mx-auto">
          Share your expertise, life hacks, and stories with our growing community of 50,000+ monthly readers.
        </p>
      </div>

      <div className="prose prose-lg max-w-none font-body text-primary leading-loose prose-headings:font-display prose-headings:font-bold prose-headings:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline mb-12">
        <p>
          We are always looking for fresh voices and unique perspectives. If you have a clever cleaning hack, a transformative health tip, or an inspiring story, we want to hear it!
        </p>

        <h2>What We Look For</h2>
        <ul className="list-disc pl-6 space-y-2 marker:text-accent">
          <li><strong>Original Content:</strong> We do not accept articles that have been published elsewhere.</li>
          <li><strong>Actionable Advice:</strong> Our readers love practical tips they can use immediately.</li>
          <li><strong>Well-Researched:</strong> Back up your claims with credible sources and data.</li>
          <li><strong>Engaging Tone:</strong> Write in a friendly, conversational, and authoritative voice.</li>
          <li><strong>Word Count:</strong> Aim for 800–1,500 words depending on the topic depth.</li>
        </ul>

        <h2>Topics We Cover</h2>
        <div className="grid grid-cols-2 gap-4 not-prose mb-8">
          <div className="bg-surface border border-border rounded-lg p-4 font-ui text-sm font-bold text-primary">Health & Wellness</div>
          <div className="bg-surface border border-border rounded-lg p-4 font-ui text-sm font-bold text-primary">Home & Garden</div>
          <div className="bg-surface border border-border rounded-lg p-4 font-ui text-sm font-bold text-primary">Food & Recipes</div>
          <div className="bg-surface border border-border rounded-lg p-4 font-ui text-sm font-bold text-primary">DIY Projects</div>
          <div className="bg-surface border border-border rounded-lg p-4 font-ui text-sm font-bold text-primary">Cleaning Hacks</div>
          <div className="bg-surface border border-border rounded-lg p-4 font-ui text-sm font-bold text-primary">Money Saving Tips</div>
        </div>

        <h2>How to Submit</h2>
        <p>
          Please send your article pitch or a complete draft to our editorial team. Include a brief bio and links to your previous work.
        </p>
        
        <div className="bg-accent-soft border-l-4 border-accent p-6 my-8 rounded-r-lg">
          <p className="font-bold text-lg mb-2 text-primary">Submission Email:</p>
          <a href="mailto:hello@wisetips.co" className="text-accent font-bold text-xl hover:underline">hello@wisetips.co</a>
          <p className="text-sm text-muted mt-2">Please use the subject line: "Guest Post Pitch: [Your Topic]"</p>
        </div>

        <p className="text-sm text-muted italic">
          *Note: Due to the volume of submissions, we may not be able to respond to every pitch. If you don't hear from us within 2 weeks, please feel free to submit your work elsewhere.
        </p>
      </div>
    </div>
  );
}
