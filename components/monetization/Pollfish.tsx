"use client";

import { useEffect } from "react";
import Script from "next/script";

interface PollfishProps {
  apiKey: string;
}

export default function Pollfish({ apiKey }: PollfishProps) {
  useEffect(() => {
    if (!apiKey) return;

    // Type definition for Pollfish global variable
    const windowAny = window as any;
    
    // Pollfish Configuration
    windowAny.pollfishConfig = {
      api_key: apiKey,
      indicator_position: "BOTTOM_RIGHT", // Can be TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT
      debug: process.env.NODE_ENV === "development",
      offerwall: true, // Show as an offerwall
      onPollfishReady: () => {
        console.log("Pollfish is ready!");
      },
    };

    // If Pollfish is already loaded (e.g., from earlier navigation)
    if (windowAny.Pollfish && typeof windowAny.Pollfish.initWithConfig === "function") {
      windowAny.Pollfish.initWithConfig(windowAny.pollfishConfig);
    }
  }, [apiKey]);

  if (!apiKey) return null;

  return (
    <>
      <Script
        id="pollfish-sdk"
        src="https://www.pollfish.com/api/javascript/v3/pollfish.min.js"
        onLoad={() => {
          const windowAny = window as any;
          if (windowAny.Pollfish && typeof windowAny.Pollfish.initWithConfig === "function") {
            windowAny.Pollfish.initWithConfig(windowAny.pollfishConfig);
          }
        }}
      />
    </>
  );
}
