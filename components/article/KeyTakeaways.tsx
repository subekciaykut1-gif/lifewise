import React from 'react';
import { Lightbulb } from 'lucide-react';

interface KeyTakeawaysProps {
  content: string;
  excerpt?: string;
}

export default function KeyTakeaways({ content, excerpt }: KeyTakeawaysProps) {
  const lines = (content || "").split('\n');
  
  // 1. Broaden detection to include •, *, -, and numbered lists (e.g. "1. ")
  const bullets = lines
    .filter(l => {
      const trimmed = l.trim();
      return (
        trimmed.startsWith('- ') || 
        trimmed.startsWith('* ') || 
        trimmed.startsWith('• ') || 
        /^\d+\.\s+/.test(trimmed)
      );
    })
    .map(l => {
      const trimmed = l.trim();
      // Remove markers
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
        return trimmed.substring(2);
      }
      return trimmed.replace(/^\d+\.\s+/, '');
    })
    .slice(0, 4);

  let takeaways = bullets;
  
  if (bullets.length < 2) {
    // 2. High-quality fallback: Use the excerpt if available (stripping markdown bold/italic)
    if (excerpt && !excerpt.includes('EXCERPT WARNING')) {
      const cleanExcerpt = excerpt.replace(/[*#]/g, '').trim();
      if (cleanExcerpt.length > 50) {
        takeaways = [cleanExcerpt];
      }
    }
    
    // 3. Last resort: Find first non-question paragraph that looks informative
    if (takeaways.length === 0) {
      const paragraphs = content.split('\n\n');
      const informativePara = paragraphs.find(p => 
        p.length > 100 && 
        !p.startsWith('#') && 
        !p.trim().endsWith('?') // Skip intros that are just hook questions
      );
      
      if (informativePara) {
        takeaways = informativePara
          .split(/[.!?]/)
          .map(s => s.trim())
          .filter(s => s.length > 30 && !s.endsWith('?'))
          .slice(0, 3);
      }
    }
  }

  if (takeaways.length === 0) return null;

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
          {takeaways.map((point, i) => (
            <li key={i} className="flex gap-3 text-primary/80 font-body text-sm leading-relaxed m-0">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-[10px] mt-0.5">
                {i + 1}
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
