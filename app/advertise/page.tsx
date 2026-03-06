import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise with Us",
  description: "Reach 50,000+ monthly readers with LifeWise advertising. Display ads, sponsored content, and newsletter sponsorships.",
};

export default function AdvertisePage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12 md:py-20">
      <div className="text-center mb-16">
        <h1 className="font-display text-[2.5rem] md:text-[3.5rem] font-extrabold text-primary mb-6">
          Advertise on Life<span className="text-accent">Wise</span>
        </h1>
        <p className="font-body text-xl text-muted leading-relaxed max-w-2xl mx-auto">
          Reach a highly engaged audience of smart, curious readers looking to improve their daily lives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-surface border border-border rounded-xl p-8 text-center shadow-sm">
          <div className="text-accent font-display text-[2.5rem] font-extrabold mb-2">50K+</div>
          <div className="text-muted font-ui text-sm uppercase tracking-widest font-bold">Monthly Readers</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-8 text-center shadow-sm">
          <div className="text-accent font-display text-[2.5rem] font-extrabold mb-2">8+</div>
          <div className="text-muted font-ui text-sm uppercase tracking-widest font-bold">Content Categories</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-8 text-center shadow-sm">
          <div className="text-accent font-display text-[2.5rem] font-extrabold mb-2">12K+</div>
          <div className="text-muted font-ui text-sm uppercase tracking-widest font-bold">Email Subscribers</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none font-body text-primary leading-loose prose-headings:font-display prose-headings:font-bold prose-headings:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline mb-16 w-full">
        <h2>Available Ad Formats</h2>
        <p className="text-base leading-relaxed">
          We offer a variety of advertising options to suit your brand's goals and budget.
        </p>
        
        <div className="space-y-8 mt-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-soft text-accent flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Display Advertising</h3>
              <p className="text-muted text-base leading-relaxed">Standard IAB banner sizes (728x90, 300x250, 300x600) placed strategically throughout our content for maximum visibility.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-soft text-accent flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Sponsored Articles</h3>
              <p className="text-muted text-base leading-relaxed">High-quality, editorial-style content written by our team or yours, seamlessly integrated into our feed with "Sponsored" labeling.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-soft text-accent flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Newsletter Sponsorship</h3>
              <p className="text-muted text-base leading-relaxed">Exclusive placement in our weekly "Smarter Living" newsletter sent to over 12,000 active subscribers.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary text-white rounded-xl p-8 md:p-12 text-center w-full">
        <h2 className="font-display text-[2rem] font-bold mb-4">Ready to Grow Your Brand?</h2>
        <p className="font-body text-white/80 text-lg mb-8 max-w-xl w-full mx-auto leading-relaxed">
          Contact our advertising team to request a media kit and discuss custom packages.
        </p>
        <a 
          href="mailto:hello@wisetips.co" 
          className="inline-block bg-accent text-white font-ui font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-white hover:text-primary transition-all shadow-lg hover:-translate-y-1"
        >
          Email Us: hello@wisetips.co
        </a>
      </div>
    </div>
  );
}
