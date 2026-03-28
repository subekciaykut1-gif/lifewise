"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { ShieldAlert, Info } from 'lucide-react';

interface CategoryDisclaimerProps {
  category: string;
}

export default function CategoryDisclaimer({ category }: CategoryDisclaimerProps) {
  const t = useTranslations('Disclaimers');

  // Define which categories trigger which disclaimer
  const seriousCategories = ['health', 'finance', 'careers', 'estate'];
  
  if (!seriousCategories.includes(category)) {
    return null;
  }

  // Get the specific disclaimer or fallback to general
  let disclaimerText = "";
  try {
    disclaimerText = t(category);
  } catch {
    disclaimerText = t('general');
  }

  return (
    <div className="my-6 p-4 bg-muted/30 border-l-4 border-accent/40 rounded-r-lg flex gap-4 items-start shadow-sm">
      <div className="flex-shrink-0 text-accent mt-0.5">
        <ShieldAlert size={20} />
      </div>
      <div>
        <p className="font-body text-[0.8rem] leading-relaxed text-muted-foreground italic">
          {disclaimerText}
        </p>
      </div>
    </div>
  );
}
