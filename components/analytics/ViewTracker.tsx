"use client";

import { useEffect } from "react";

export default function ViewTracker({ slug, category }: { slug: string; category: string }) {
  useEffect(() => {
    // We purposefully ignore errors so as not to block UI tracking if the network hiccups
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, category }),
    }).catch(console.error);
  }, [slug, category]);

  return null;
}
