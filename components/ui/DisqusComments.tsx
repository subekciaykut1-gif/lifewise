"use client";

import { useEffect } from "react";

interface DisqusCommentsProps {
  identifier: string;
  url: string;
  title: string;
}

const DISQUS_SHORTNAME = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME || "lifewise-1";

export default function DisqusComments({ identifier, url, title }: DisqusCommentsProps) {
  const shortname = DISQUS_SHORTNAME;

  useEffect(() => {
    if (!shortname) return;

    const win = window as unknown as { disqus_config?: () => void };
    win.disqus_config = function () {
      const ctx = this as { page: { identifier: string; url: string; title: string } };
      ctx.page.identifier = identifier;
      ctx.page.url = url;
      ctx.page.title = title;
    };

    const script = document.createElement("script");
    script.src = `https://${shortname}.disqus.com/embed.js`;
    script.setAttribute("data-timestamp", String(+new Date()));
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existing = document.querySelector(`script[src*="${shortname}.disqus.com/embed.js"]`);
      if (existing?.parentNode) existing.parentNode.removeChild(existing);
    };
  }, [shortname, identifier, url, title]);

  if (!shortname) return null;

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="font-display text-xl font-bold mb-6">Comments</h3>
      <div id="disqus_thread" />
      <noscript>Please enable JavaScript to view the comments.</noscript>
    </div>
  );
}
