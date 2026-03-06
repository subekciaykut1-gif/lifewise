import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "LifeWise Affiliate Disclosure. We believe in transparency about how we earn money.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12 md:py-20">
      <h1 className="font-display text-[2.5rem] md:text-[3.5rem] font-extrabold text-primary mb-6 text-center">
        Affiliate Disclosure
      </h1>
      <p className="font-ui text-sm text-muted text-center mb-12 uppercase tracking-wide">
        Last Updated: March 2026
      </p>

      <div className="prose prose-lg max-w-none font-body text-primary leading-loose prose-headings:font-display prose-headings:font-bold prose-headings:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
        <p>
          At LifeWise, we believe in transparency and honesty with our readers. To help cover the costs of running this website and to allow us to continue providing free, high-quality content, we participate in various affiliate marketing programs.
        </p>

        <h2>What is an Affiliate Link?</h2>
        <p>
          Many of our articles contain affiliate links. If you click on an affiliate link and make a purchase, we may earn a small commission at no extra cost to you. This commission helps support our editorial team and allows us to keep researching and writing the articles you love.
        </p>
        <p>
          For example, if we link to a kitchen gadget on Amazon and you buy it, we might earn a small percentage of that sale.
        </p>

        <h2>Amazon Associates Disclosure</h2>
        <div className="bg-accent-soft border-l-4 border-accent p-6 my-8 rounded-r-lg">
          <p className="font-bold text-lg mb-0 text-primary">
            LifeWise is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
          </p>
        </div>

        <h2>Our Editorial Promise</h2>
        <p>
          We want to be clear: <strong>Our editorial content is not influenced by affiliate partnerships.</strong>
        </p>
        <ul>
          <li>We only recommend products and services that we truly believe will add value to your life.</li>
          <li>We research, test, and vet products independently whenever possible.</li>
          <li>If a product is bad, we will tell you, regardless of any potential commission.</li>
        </ul>
        <p>
          Our goal is to be your trusted source for advice. If we recommend something, it's because we think it's worth your time and money.
        </p>

        <h2>Sponsored Content</h2>
        <p>
          Occasionally, we may publish sponsored content. This means a brand has paid us to write about their product or service. Whenever this happens, we will clearly label the article as "Sponsored" at the very top of the page so you know exactly what you are reading.
        </p>

        <h2>Questions?</h2>
        <p>
          If you have any questions about our affiliate relationships or how we make money, please don't hesitate to contact us at <a href="mailto:hello@wisetips.co">hello@wisetips.co</a>.
        </p>
      </div>
    </div>
  );
}
