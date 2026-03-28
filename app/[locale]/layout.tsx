import type { Metadata, Viewport } from "next";
import { Playfair_Display, Source_Serif_4, Inter } from "next/font/google";
import Script from "next/script";
import { SITE_URL } from "@/lib/site";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import BackToTop from "@/components/ui/BackToTop";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ExitIntentModal from "@/components/ui/ExitIntentModal";
import SessionWrapper from "@/components/auth/SessionWrapper";
import dynamic from "next/dynamic";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const TrendingTicker = dynamic(() => import("@/components/layout/TrendingTicker"));

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: {
      template: "%s | LifeWise",
      default: "LifeWise — Smarter Living, Every Day",
    },
    description: "Smarter Living, Every Day. Discover life hacks, health tips, cleaning tricks, and viral stories.",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        es: `${SITE_URL}/es`,
        fr: `${SITE_URL}/fr`,
        de: `${SITE_URL}/de`,
        pt: `${SITE_URL}/pt`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      siteName: "LifeWise",
      type: "website",
    },
    other: {
      "pinterest-rich-pin": "true",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "GT-NGK4TVRS";
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-2207377176181836";

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${sourceSerif.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://pagead2.googlesyndication.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="anonymous"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="LifeWise RSS"
          href={`${SITE_URL}/${locale}/feed`}
        />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="msvalidate.01" content="88CBBC0B67A708362E1731A6060ED5B1" />
        <meta name="monetag" content="2898a8637fbe978ca600fc4967ba04e7" />
        <meta name="p:domain_verify" content="f953a2206b94ac2b1c8eda09eb16381c" />
        <GoogleAnalytics gaId={gaId} />
        {adsenseId && (
          <Script
            id="adsense"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
        <Script
          id="monetag-tag"
          src="https://quge5.com/88/tag.min.js"
          data-zone="224282"
          strategy="afterInteractive"
        />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "w2w704aqls");`}
        </Script>
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-bg text-primary font-body transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <SessionWrapper>
              <OrganizationSchema />
              <a href="#main" className="skip-link">
                Skip to main content
              </a>
              <Header>
                <TrendingTicker />
              </Header>
              <main id="main" className="flex-1">
                {children}
              </main>
              <Footer />
              <CookieBanner />
              <BackToTop />
              <ExitIntentModal />
              <Analytics />
              <SpeedInsights />
            </SessionWrapper>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
