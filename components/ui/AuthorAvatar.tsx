"use client";

import Image from "next/image";
import { useState } from "react";

interface AuthorAvatarProps {
  name: string;
  image?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  xs: "w-6 h-6 text-[0.6rem]",
  sm: "w-8 h-8 text-[0.7rem]",
  md: "w-10 h-10 text-[0.85rem]",
  lg: "w-20 h-20 text-[1.5rem] md:w-24 md:h-24 md:text-[1.8rem]",
  xl: "w-32 h-32 text-[2.5rem] md:w-40 md:h-40 md:text-[3rem]",
};

const authorColors: Record<string, string> = {
  "Elena Vance": "#7C3AED",
  "Mike Ross": "#059669",
  "David Chen": "#2563EB",
  "Sarah Jenkins": "#DC2626",
};

export default function AuthorAvatar({ name, image, size = "md", className = "" }: AuthorAvatarProps) {
  const [hasError, setHasError] = useState(false);

  // Generate initials (e.g. "Elena Vance" -> "EV")
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  // Get consistent color for author
  const getBackgroundColor = (name: string) => {
    return authorColors[name] || "#6B7280"; // Default grey
  };

  const initials = getInitials(name);
  const bgColor = getBackgroundColor(name);
  const sizeClasses = sizeMap[size];

  return (
    <div className={`relative ${sizeClasses} rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center font-ui font-black text-white shadow-sm border border-black/5 ${className}`} style={{ backgroundColor: bgColor }}>
      {!hasError && image && (
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover !m-0 !rounded-none"
          onError={() => setHasError(true)}
          unoptimized
          sizes={size === "xl" ? "160px" : size === "lg" ? "96px" : "40px"}
        />
      )}
      {(hasError || !image) && (
        <span className="relative z-10 drop-shadow-sm">{initials}</span>
      )}
    </div>
  );
}
