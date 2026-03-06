import Image from "next/image";
import { Facebook, Twitter, Instagram, Globe } from "lucide-react";

interface AuthorBioProps {
  name: string;
  bio?: string;
  image?: string;
}

export default function AuthorBio({ name, bio, image }: AuthorBioProps) {
  // Default fallback bio if none provided
  const displayBio = bio || "LifeWise Editorial Team is dedicated to bringing you the most practical life hacks, health tips, and home improvement guides based on expert research and testing.";
  const displayImage = image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

  return (
    <div className="my-12 p-6 md:p-8 rounded-2xl bg-surface border border-border shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shrink-0 border-2 border-accent/10 shadow-md">
        <Image
          src={displayImage}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex-1 text-center md:text-left">
        <span className="text-accent text-[0.65rem] font-bold uppercase tracking-widest mb-1 block">Written By</span>
        <h4 className="font-display text-xl font-bold text-primary mb-2">{name}</h4>
        <p className="font-body text-[0.95rem] text-muted leading-relaxed mb-4">
          {displayBio}
        </p>
        
        <div className="flex justify-center md:justify-start gap-3">
          <a href="#" className="text-muted hover:text-accent transition-colors"><Twitter size={16} /></a>
          <a href="#" className="text-muted hover:text-accent transition-colors"><Facebook size={16} /></a>
          <a href="#" className="text-muted hover:text-accent transition-colors"><Globe size={16} /></a>
        </div>
      </div>
    </div>
  );
}
