"use client";

import { useState } from "react";
import { trackContactFormSubmit, event, trackError } from "@/lib/analytics";

export default function ContactForm() {
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      name: (formData.get("name") as string)?.trim() || "",
      email: (formData.get("email") as string)?.trim() || "",
      subject: (formData.get("subject") as string) || "",
      message: (formData.get("message") as string)?.trim() || "",
    };

    setStatus("sending");
    setErrorMessage("");

    if (payload.subject === "feedback") {
      event({
        action: "feedback_form_submit",
        category: "engagement",
        label: "contact_page",
      });
    } else {
      trackContactFormSubmit("contact_page");
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage((data.error as string) || "Something went wrong. Please try again.");
        setStatus("error");
        trackError(data.error || "Contact form error", "form_error");
        return;
      }

      setStatus("success");
      form.reset();
      setSubject("");
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
      trackError("Contact form network error", "form_error");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {status === "success" && (
        <div className="bg-accent-soft border border-accent/30 text-primary font-ui text-sm p-4 rounded-lg">
          Thank you for your message! We&apos;ll get back to you shortly.
        </div>
      )}
      {status === "error" && errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-800 font-ui text-sm p-4 rounded-lg">
          {errorMessage}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-primary mb-2 font-ui uppercase tracking-wide">
            Your Name
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            className="w-full bg-bg border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-primary mb-2 font-ui uppercase tracking-wide">
            Email Address
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="w-full bg-bg border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            placeholder="john@example.com"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-bold text-primary mb-2 font-ui uppercase tracking-wide">
          Subject
        </label>
        <select 
          id="subject" 
          name="subject" 
          className="w-full bg-bg border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors appearance-none"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="" disabled>Select a topic</option>
          <option value="general">General Inquiry</option>
          <option value="feedback">Website Feedback</option>
          <option value="editorial">Editorial / Content Correction</option>
          <option value="partnership">Partnership / Advertising</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold text-primary mb-2 font-ui uppercase tracking-wide">
          Message
        </label>
        <textarea 
          id="message" 
          name="message" 
          rows={6}
          className="w-full bg-bg border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-y"
          placeholder="How can we help you?"
          required
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={status === "sending"}
        className="w-full bg-accent text-white font-ui font-bold text-sm uppercase tracking-widest py-4 rounded-lg hover:bg-accent/90 transition-colors shadow-cta-hover hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
