"use client";

import Script from "next/script";

/**
 * Google Consent Mode v2 Initialization
 * This component sets the default consent state for Google tags (Ads and Analytics).
 * It must be loaded as early as possible, ideally before any other Google scripts.
 */
export default function GoogleConsent() {
  return (
    <Script id="google-consent" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        
        // Check for existing consent in localStorage (optional, but good for persistence)
        const hasConsent = localStorage.getItem('google_consent_granted') === 'true';
        
        if (hasConsent) {
          gtag('consent', 'default', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted',
            'wait_for_update': 500
          });
        } else {
          // Default to 'denied' for privacy compliance (EEA/UK requirements)
          // The Google CMP will trigger and update these once the user interacts.
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'wait_for_update': 500
          });
        }

        // Inform Google that the default consent has been set
        gtag('set', 'ads_data_redaction', true);
        gtag('set', 'developer_id.dZTlZYM', true);
      `}
    </Script>
  );
}
