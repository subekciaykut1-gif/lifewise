import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function MedicalDisclaimer() {
  return (
    <div className="my-8 p-5 bg-blue-100/30 dark:bg-blue-950/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-r-xl shadow-sm">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 text-blue-600 dark:text-blue-400 shrink-0">
          <ShieldAlert size={22} strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h4 className="font-display text-[0.95rem] font-bold text-blue-950 dark:text-blue-100 mb-2 leading-none uppercase tracking-wider">
            Important Medical Disclaimer
          </h4>
          <p className="font-body text-[0.9rem] text-blue-950 dark:text-blue-50 leading-relaxed m-0">
            ⚕️ <strong>Notice:</strong> This article is for informational purposes only and does not constitute professional medical advice, diagnosis, or treatment. 
            Always consult a <strong>qualified healthcare professional</strong> before making any changes to your diet, health routine, 
            or medical treatment.
          </p>
        </div>
      </div>
    </div>
  );
}
