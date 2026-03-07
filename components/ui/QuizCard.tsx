"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Clock, BarChart } from "lucide-react";

interface QuizCardProps {
  quiz: {
    title: string;
    slug: string;
    category: string;
    description: string;
    image_url: string;
  };
}

export default function QuizCard({ quiz }: QuizCardProps) {
  return (
    <div className="group bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image 
          src={quiz.image_url} 
          alt={quiz.title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        <div className="absolute top-4 left-4 bg-accent text-white text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
          {quiz.category.replace('-', ' ')}
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-50 group-hover:scale-100">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-2xl">
            <Play fill="white" className="text-white ml-1" size={32} />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-primary mb-3 leading-snug group-hover:text-accent transition-colors">
          {quiz.title}
        </h3>
        
        <p className="text-muted font-body text-sm line-clamp-2 mb-6 leading-relaxed">
          {quiz.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4 text-muted text-xs font-ui">
            <span className="flex items-center gap-1.5"><Clock size={14} /> 2 min</span>
            <span className="flex items-center gap-1.5"><BarChart size={14} /> 5 questions</span>
          </div>
          
          <Link 
            href={`/quizzes/${quiz.slug}`}
            className="text-accent font-bold text-sm hover:underline flex items-center gap-1"
          >
            Start Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
