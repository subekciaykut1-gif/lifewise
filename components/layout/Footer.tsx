import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, PinIcon } from "lucide-react";
import { categories } from "@/lib/categories";

const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL || "#";
const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL || "#";
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";

export default function Footer() {
  return (
    <footer className="bg-primary text-white/70 mt-12 md:mt-16">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-12 pb-6 md:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 md:gap-10 pb-8 md:pb-10 border-b border-white/10 mb-6 md:mb-8">
          <div>
            <div className="font-display text-[1.8rem] font-extrabold text-white tracking-tighter mb-3">
              Life<span className="text-accent">Wise</span>
            </div>
            <p className="font-body text-[0.85rem] text-white/50 italic mb-5 leading-relaxed">
              Smarter living, every day. Tips, life hacks, health advice and viral stories for curious minds.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/wisetipsco/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 min-w-[44px] min-h-[44px] bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors" aria-label="WiseTips on Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://www.pinterest.com/wisetipsco/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 min-w-[44px] min-h-[44px] bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors" aria-label="WiseTips on Pinterest">
                <PinIcon size={18} />
              </a>
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 min-w-[44px] min-h-[44px] bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors" aria-label="WiseTips on X (Twitter)">
                <Twitter size={18} />
              </a>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 min-w-[44px] min-h-[44px] bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors" aria-label="WiseTips on YouTube">
                <Youtube size={18} />
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 min-w-[44px] min-h-[44px] bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors" aria-label="WiseTips on Instagram">
                <Instagram size={18} />
              </a>
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

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <span className="font-ui text-[0.75rem] text-white/35">© 2026 LifeWise. All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy-policy" className="font-ui text-[0.72rem] text-white/35 hover:text-white/60 transition-colors min-h-[44px] flex items-center">Privacy Policy</Link>
            <Link href="/cookie-policy" className="font-ui text-[0.72rem] text-white/35 hover:text-white/60 transition-colors min-h-[44px] flex items-center">Cookie Policy</Link>
            <Link href="/sitemap.xml" className="font-ui text-[0.72rem] text-white/35 hover:text-white/60 transition-colors min-h-[44px] flex items-center">Sitemap</Link>
            <Link href="/feed" className="font-ui text-[0.72rem] text-white/35 hover:text-white/60 transition-colors min-h-[44px] flex items-center">RSS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
