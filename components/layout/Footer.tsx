import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, PinIcon } from "lucide-react";
import { categories } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="bg-primary text-white/70 mt-16">
      <div className="max-w-[1280px] mx-auto px-6 py-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-white/10 mb-8">
          <div>
            <div className="font-display text-[1.8rem] font-extrabold text-white tracking-tighter mb-3">
              Life<span className="text-accent">Wise</span>
            </div>
            <p className="font-body text-[0.85rem] text-white/50 italic mb-5 leading-relaxed">
              Smarter living, every day. Tips, life hacks, health advice and viral stories for curious minds.
            </p>
            <div className="flex gap-2">
              <a href="https://www.facebook.com/wisetipsco/" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] bg-white/10 rounded-full flex items-center justify-center text-[0.8rem] hover:bg-accent hover:text-white transition-colors" aria-label="WiseTips on Facebook">
                <Facebook size={16} />
              </a>
              {[Twitter, PinIcon, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-[34px] h-[34px] bg-white/10 rounded-full flex items-center justify-center text-[0.8rem] hover:bg-accent hover:text-white transition-colors" aria-label={`Social link ${i + 2}`}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-col">
            <h4 className="font-ui text-[0.7rem] font-bold uppercase tracking-widest text-white/40 mb-4">Categories</h4>
            <ul className="list-none space-y-2">
              {categories.slice(0, 6).map(cat => (
                <li key={cat.slug}><Link href={`/category/${cat.slug}`} className="font-ui text-[0.82rem] text-white/60 hover:text-white transition-colors">{cat.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="font-ui text-[0.7rem] font-bold uppercase tracking-widest text-white/40 mb-4">Company</h4>
            <ul className="list-none space-y-2">
              <li><Link href="/about" className="font-ui text-[0.82rem] text-white/60 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="font-ui text-[0.82rem] text-white/60 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/advertise" className="font-ui text-[0.82rem] text-white/60 hover:text-white transition-colors">Advertise</Link></li>
              <li><Link href="/write-for-us" className="font-ui text-[0.82rem] text-white/60 hover:text-white transition-colors">Write for Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="font-ui text-[0.7rem] font-bold uppercase tracking-widest text-white/40 mb-4">Legal</h4>
            <ul className="list-none space-y-2">
              <li><Link href="/privacy-policy" className="font-ui text-[0.82rem] text-white/60 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookie-policy" className="font-ui text-[0.82rem] text-white/60 hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="/terms-of-use" className="font-ui text-[0.82rem] text-white/60 hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link href="/affiliate-disclosure" className="font-ui text-[0.82rem] text-white/60 hover:text-white transition-colors">Affiliate Disclosure</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-ui text-[0.75rem] text-white/35">© 2026 LifeWise. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="font-ui text-[0.72rem] text-white/35 hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/cookie-policy" className="font-ui text-[0.72rem] text-white/35 hover:text-white/60 transition-colors">Cookie Policy</Link>
            <Link href="/sitemap.xml" className="font-ui text-[0.72rem] text-white/35 hover:text-white/60 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
