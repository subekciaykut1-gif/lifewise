export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

// https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag && GA_TRACKING_ID) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/ga4/events?client_type=gtag
export const event = ({ action, category, label, value, ...rest }: GTagEvent) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    });
  }
};

// Specific event helpers based on user requirements

export const trackNewsletterSignup = (location: string, buttonText: string) => {
  event({
    action: "newsletter_signup",
    category: "engagement",
    label: location,
    email_form_location: location,
    button_text: buttonText,
  });
};

export const trackSocialShare = (platform: string, articleTitle: string) => {
  event({
    action: "social_share",
    category: "engagement",
    label: platform,
    platform: platform,
    article_title: articleTitle,
  });
};

export const trackScrollDepth = (percent: number, articleTitle: string, category?: string, author?: string) => {
  event({
    action: "scroll_depth",
    category: "engagement",
    label: `${percent}%`,
    value: percent,
    percent: percent,
    article_title: articleTitle,
    article_category: category,
    author_name: author,
  });
};

export const trackOutboundClick = (url: string, articleTitle?: string, category?: string) => {
  event({
    action: "outbound_click",
    category: "engagement",
    label: url,
    url: url,
    article_title: articleTitle,
    article_category: category,
  });
};

export const trackAffiliateClick = (url: string, articleTitle?: string, category?: string) => {
  event({
    action: "affiliate_click",
    category: "monetization",
    label: url,
    link_url: url,
    article_title: articleTitle,
    article_category: category,
  });
};

export const trackContactFormSubmit = (location: string) => {
  event({
    action: "contact_form_submit",
    category: "engagement",
    label: location,
    form_location: location,
  });
};

export const trackError = (message: string, type: "page_error" | "form_error" = "page_error") => {
  event({
    action: type,
    category: "error",
    label: message,
    error_message: message,
    page_url: typeof window !== "undefined" ? window.location?.href ?? "" : "",
  });
};
