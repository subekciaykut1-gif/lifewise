import { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the LifeWise team. We respond to all inquiries within 48 hours.",
};

export default function ContactPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="font-display text-[2.5rem] md:text-[3.5rem] font-extrabold text-primary mb-6">
          Contact Us
        </h1>
        <p className="font-body text-xl text-muted leading-relaxed max-w-2xl mx-auto">
          Have a question or feedback? We'd love to hear from you! Our team typically responds within 48 hours.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-8 md:p-10 shadow-sm">
        <ContactForm />
      </div>

      <div className="mt-12 text-center font-body text-muted">
        <p>
          Prefer email? You can reach us directly at: <br />
          <a href="mailto:hello@lifewise.com" className="text-accent font-bold hover:underline">hello@lifewise.com</a>
        </p>
      </div>
    </div>
  );
}
