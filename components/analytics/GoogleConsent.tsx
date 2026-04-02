"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

/**
 * Google Consent Mode v2 Initialization (Hydration-Safe)
 * This component sets the default consent state for Google tags.
 * We use 'afterInteractive' and a 'mounted' check to prevent Next.js hydration errors.
 */
export default function GoogleConsent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Script id="google-consent" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        
        // Consent mode is initialized as 'denied' by default (EEA/UK requirement)
        gtag('consent', 'default', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'denied',
          'wait_for_update': 500
        });

        // Safely check for existing consent in localStorage (Client-only)
        const hasConsent = localStorage.getItem('google_consent_granted') === 'true';
        
        if (hasConsent) {
          gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted'
          });
        }

        // Inform Google about default settings
        gtag('set', 'ads_data_redaction', true);
        gtag('set', 'developer_id.dZTlZYM', true);
      `}
    </Script>
  );
}
