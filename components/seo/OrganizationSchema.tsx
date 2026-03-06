import { SITE_URL } from "@/lib/site";

export default function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "LifeWise",
          url: SITE_URL,
          logo: `${SITE_URL}/favicon.ico`,
        }),
      }}
    />
  );
}
