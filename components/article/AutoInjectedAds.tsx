import React from "react";
import AdSlot from "@/components/monetization/AdSlot";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";

interface AutoInjectedAdsProps {
  content: string;
  components?: MDXRemoteProps["components"];
}

export default function AutoInjectedAds({ content, components }: AutoInjectedAdsProps) {
  // Count paragraphs (rudimentary check by double newlines)
  const paragraphs = content.split(/\n\s*\n/);
  const wordCount = content.split(/\s+/).length;

  // Only inject if article is long enough (> 600 words or > 6 paragraphs)
  const shouldInject = wordCount > 600 || paragraphs.length > 6;

  if (!shouldInject) {
    return <MDXRemote source={content} components={components} />;
  }

  // Inject after the 3rd paragraph
  const topHalf = paragraphs.slice(0, 3).join("\n\n");
  const bottomHalf = paragraphs.slice(3).join("\n\n");

  return (
    <>
      <MDXRemote source={topHalf} components={components} />
      <div className="my-10">
        <AdSlot slot="in-content-1" format="rectangle" height={250} />
      </div>
      <MDXRemote source={bottomHalf} components={components} />
    </>
  );
}
