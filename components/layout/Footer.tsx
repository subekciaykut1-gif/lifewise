import { Link } from "@/i18n/routing";
import { Facebook, Twitter, Instagram, Youtube, PinIcon } from "lucide-react";
import { getPublishedArticles } from "@/lib/articles";
import { getTranslations, getLocale } from "next-intl/server";

const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL || "#";
const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL || "#";
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";

export default async function Footer() {
  const locale = await getLocale();
  const latestArticles = (await getPublishedArticles(locale)).slice(0, 5);
  const t = await getTranslations("Footer");
  
  return (
    <footer className="no-print bg-primary dark:bg-surface text-bg/70 dark:text-primary/70 mt-12 md:mt-16">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-12 pb-6 md:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 md:gap-10 pb-8 md:pb-10 border-b border-bg/10 dark:border-primary/10 mb-6 md:mb-8">
          <div>
            <div className="font-display text-[1.8rem] font-extrabold text-bg dark:text-primary tracking-tighter mb-3">
              Life<span className="text-accent">Wise</span>
            </div>
            <p className="font-body text-[0.85rem] text-bg/50 dark:text-primary/70 italic mb-5 leading-relaxed">
              {t("tagline")}. Tips, life hacks, health advice and viral stories for curious minds.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/wisetipsco/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 min-w-[44px] min-h-[44px] bg-bg/10 dark:bg-primary/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors" aria-label="WiseTips on Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://www.pinterest.com/wisetipsco/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 min-w-[44px] min-h-[44px] bg-bg/10 dark:bg-primary/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors" aria-label="WiseTips on Pinterest">
                <PinIcon size={18} />
              </a>
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 min-w-[44px] min-h-[44px] bg-bg/10 dark:bg-primary/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors" aria-label="WiseTips on X (Twitter)">
                <Twitter size={18} />
              </a>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 min-w-[44px] min-h-[44px] bg-bg/10 dark:bg-primary/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors" aria-label="WiseTips on YouTube">
                <Youtube size={18} />
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 min-w-[44px] min-h-[44px] bg-bg/10 dark:bg-primary/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors" aria-label="WiseTips on Instagram">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4 className="font-ui text-[0.7rem] font-bold uppercase tracking-widest text-bg/40 dark:text-primary/50 mb-4">{t("latestArticles")}</h4>
            <ul className="list-none space-y-2.5">
              {latestArticles.map(article => (
                <li key={article.slug}>
                  <Link href={`/${article.category}/${article.slug}`} className="font-ui text-[0.8rem] text-bg/60 dark:text-primary/70 hover:text-bg dark:hover:text-primary transition-colors line-clamp-1">
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
  
          <div className="footer-col">
            <h4 className="font-ui text-[0.7rem] font-bold uppercase tracking-widest text-bg/40 dark:text-primary/50 mb-4">{t("company")}</h4>
            <ul className="list-none space-y-2">
              <li><Link href="/about" className="font-ui text-[0.82rem] text-bg/60 dark:text-primary/70 hover:text-bg dark:hover:text-primary transition-colors">{t("about")}</Link></li>
              <li><Link href="/contact" className="font-ui text-[0.82rem] text-bg/60 dark:text-primary/70 hover:text-bg dark:hover:text-primary transition-colors">{t("contact")}</Link></li>
              <li><Link href="/advertise" className="font-ui text-[0.82rem] text-bg/60 dark:text-primary/70 hover:text-bg dark:hover:text-primary transition-colors">{t("advertise")}</Link></li>
              <li><Link href="/write-for-us" className="font-ui text-[0.82rem] text-bg/60 dark:text-primary/70 hover:text-bg dark:hover:text-primary transition-colors">{t("writeForUs")}</Link></li>
            </ul>
          </div>
  
          <div className="footer-col">
            <h4 className="font-ui text-[0.7rem] font-bold uppercase tracking-widest text-bg/40 dark:text-primary/50 mb-4">{t("legal")}</h4>
            <ul className="list-none space-y-2">
              <li><Link href="/privacy-policy" className="font-ui text-[0.82rem] text-bg/60 dark:text-primary/70 hover:text-bg dark:hover:text-primary transition-colors">{t("privacy")}</Link></li>
              <li><Link href="/cookie-policy" className="font-ui text-[0.82rem] text-bg/60 dark:text-primary/70 hover:text-bg dark:hover:text-primary transition-colors">{t("terms")}</Link></li>
              <li><Link href="/terms-of-use" className="font-ui text-[0.82rem] text-bg/60 dark:text-primary/70 hover:text-bg dark:hover:text-primary transition-colors">{t("terms")}</Link></li>
              <li><Link href="/affiliate-disclosure" className="font-ui text-[0.82rem] text-bg/60 dark:text-primary/70 hover:text-bg dark:hover:text-primary transition-colors">{t("advertise")}</Link></li>
            </ul>
          </div>
        </div>
  
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <span className="font-ui text-[0.75rem] text-bg/35 dark:text-primary/50">© 2026 LifeWise. {t("allRightsReserved")}</span>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy-policy" className="font-ui text-[0.72rem] text-bg/35 dark:text-primary/50 hover:text-bg/60 dark:hover:text-primary/80 transition-colors min-h-[44px] flex items-center">{t("privacy")}</Link>
            <Link href="/cookie-policy" className="font-ui text-[0.72rem] text-bg/35 dark:text-primary/50 hover:text-bg/60 dark:hover:text-primary/80 transition-colors min-h-[44px] flex items-center">{t("terms")}</Link>
            <Link href="/sitemap.xml" className="font-ui text-[0.72rem] text-bg/35 dark:text-primary/50 hover:text-bg/60 dark:hover:text-primary/80 transition-colors min-h-[44px] flex items-center">{t("sitemap")}</Link>
            <Link href="/feed" className="font-ui text-[0.72rem] text-bg/35 dark:text-primary/50 hover:text-bg/60 dark:hover:text-primary/80 transition-colors min-h-[44px] flex items-center">RSS</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
