import { Metadata } from "next";
import SubscribeForm from "@/components/forms/SubscribeForm";

export const metadata: Metadata = {
  title: "Subscribe to LifeWise",
  description: "Join 50,000+ smart readers. Get the best life hacks, health tips, and viral stories delivered weekly.",
};

export default function SubscribePage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12 md:py-20 flex flex-col items-center">
      <div className="text-center mb-10 w-full">
        <div className="text-[4rem] mb-4 animate-bounce">📬</div>
        <h1 className="font-display text-[2.5rem] md:text-[3.5rem] font-extrabold text-primary mb-4 leading-tight">
          Join 50,000+ <br /><span className="text-accent">Smart Readers</span>
        </h1>
        <p className="font-body text-xl text-muted leading-relaxed max-w-xl mx-auto">
          Get our best life hacks, health tips, and viral stories delivered to your inbox every week. No spam, just value.
        </p>
      </div>

      <div className="w-full max-w-md bg-surface border border-border rounded-xl p-8 shadow-lg">
        <SubscribeForm />
        
        <p className="text-center text-xs text-muted mt-4 font-ui">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center w-full">
        <div>
          <div className="text-3xl mb-2">🧠</div>
          <h3 className="font-display font-bold text-lg mb-1">Smarter Living</h3>
          <p className="text-sm text-muted">Practical tips you can use instantly.</p>
        </div>
        <div>
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-display font-bold text-lg mb-1">Weekly Digest</h3>
          <p className="text-sm text-muted">One email per week. Zero clutter.</p>
        </div>
        <div>
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="font-display font-bold text-lg mb-1">100% Free</h3>
          <p className="text-sm text-muted">Always free. No hidden costs.</p>
        </div>
      </div>
    </div>
  );
}
