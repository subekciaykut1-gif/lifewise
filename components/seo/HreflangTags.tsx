import { SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

export default function HreflangTags({ locale }: { locale: string }) {
  return (
    <>
      {routing.locales.map((loc) => (
        <link
          key={loc}
          rel="alternate"
          hrefLang={loc}
          href={`${SITE_URL}/${loc}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en`} />
    </>
  );
}
