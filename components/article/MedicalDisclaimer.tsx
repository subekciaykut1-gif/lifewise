import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function MedicalDisclaimer() {
  return (
    <div className="my-8 p-5 bg-blue-50/50 dark:bg-blue-900/10 border-l-4 border-blue-400 dark:border-blue-500 rounded-r-xl shadow-sm">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 text-blue-500 dark:text-blue-400 shrink-0">
          <ShieldAlert size={20} strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h4 className="font-display text-[0.9rem] font-bold text-blue-900 dark:text-blue-200 mb-1 leading-none uppercase tracking-wider">
            Medical Disclaimer
          </h4>
          <p className="font-ui text-[0.82rem] text-blue-800/80 dark:text-blue-300/80 leading-relaxed m-0">
            ⚕️ Disclaimer: This article is for informational purposes only and does not constitute medical advice. 
            Always consult a qualified healthcare professional before making changes to your diet, health routine, 
            or medical treatment.
          </p>
        </div>
      </div>
    </div>
  );
}
