import React from 'react';
import { Lightbulb } from 'lucide-react';

interface KeyTakeawaysProps {
  content: string;
  excerpt?: string;
  takeaways?: string[]; // Option B: Manually curated field
}

export default function KeyTakeaways({ content, excerpt, takeaways: explicitTakeaways }: KeyTakeawaysProps) {
  // --- LOGIC HIERARCHY ---
  
  // 1. OPTION B: Use explicit takeaways from frontmatter if they exist
  if (explicitTakeaways && explicitTakeaways.length > 0) {
    return <TakeawayUI points={explicitTakeaways} />;
  }

  // 2. OPTION A: Extract structural takeaways from H2/H3 tags
  const lines = (content || "").split('\n');
  const headings = lines
    .filter(l => {
      const t = l.trim();
      return t.startsWith('## ') || t.startsWith('### ');
    })
    .map(l => {
      // Clean headings of markdown formatting (hashtags, bold, italic)
      return l.trim()
        .replace(/^#+\s+/, '') // Remove # markers
        .replace(/[*_]/g, '')  // Remove bold/italics
        .trim();
    })
    .filter(h => {
      // Filter out meta-headings that aren't useful takeaways
      const lower = h.toLowerCase();
      const skip = [
        'faq', 'frequently asked questions', 'conclusion', 
        'summary', 'final thoughts', 'introduction',
        'table of contents', 'references', 'sources'
      ];
      return !skip.some(s => lower.includes(s));
    });

  // Use structural headings if we found enough variety
  if (headings.length >= 2) {
    return <TakeawayUI points={headings.slice(0, 4)} />;
  }

  // 3. FALLBACK: Use excerpt or previous paragraph-heuristic
  let fallbackPoints: string[] = [];
  
  if (excerpt && !excerpt.includes('EXCERPT WARNING')) {
    const cleanExcerpt = excerpt.replace(/[*#]/g, '').trim();
    if (cleanExcerpt.length > 50) fallbackPoints = [cleanExcerpt];
  }

  // If even excerpt fails, return null to hide the box
  if (fallbackPoints.length === 0) return null;
  return <TakeawayUI points={fallbackPoints} />;
}

/** 
 * Keep the UI consistent (Light background, lightbulb icon, numbered list)
 */
function TakeawayUI({ points }: { points: string[] }) {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Lightbulb size={120} className="rotate-12 text-accent" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-accent text-white rounded-lg">
            <Lightbulb size={18} />
          </div>
          <h2 className="font-display text-lg font-bold text-primary m-0 tracking-tight">
            Key Takeaways
          </h2>
        </div>
        
        <ul className="space-y-3 m-0 p-0 list-none">
          {points.map((point, i) => (
            <li key={i} className="flex gap-3 text-primary/80 font-body text-sm leading-relaxed m-0">
              <span className="flex-shrink-0 min-w-[20px] h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-[10px] mt-0.5 px-1">
                {i + 1}.
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
