import React from 'react';
import { Lightbulb } from 'lucide-react';

interface KeyTakeawaysProps {
  content: string;
}

export default function KeyTakeaways({ content }: KeyTakeawaysProps) {
  // Simple heuristic: Take the first 3 bullet points if they exist, 
  // or the first 2-3 sentences of the first paragraph.
  const lines = (content || "").split('\n');
  const bullets = lines
    .filter(l => l.trim().startsWith('- ') || l.trim().startsWith('* '))
    .map(l => l.trim().substring(2))
    .slice(0, 4);

  let takeaways = bullets;
  
  if (bullets.length < 2) {
    // Fallback to first paragraph sentences
    const firstPara = content.split('\n\n').find(p => p.length > 100 && !p.startsWith('#')) || "";
    takeaways = firstPara
      .split(/[.!?]/)
      .map(s => s.trim())
      .filter(s => s.length > 20)
      .slice(0, 3);
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
