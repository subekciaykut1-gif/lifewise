import Image from "next/image";
import { Facebook, Twitter, Instagram, Globe } from "lucide-react";
import { AuthorPersona } from "@/lib/authors";

interface AuthorBioProps {
  persona: AuthorPersona;
}

export default function AuthorBio({ persona }: AuthorBioProps) {
  const { name, bio, image, role } = persona;

  return (
    <div className="my-12 p-6 md:p-8 rounded-2xl bg-surface border border-border shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shrink-0 border-2 border-accent/10 shadow-md">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex-1 text-center md:text-left">
        <span className="text-secondary text-[0.65rem] font-bold uppercase tracking-widest mb-1 block">{role}</span>
        <h4 className="font-display text-2xl font-black text-primary mb-2">{name}</h4>
        <p className="font-body text-[0.95rem] text-muted leading-relaxed mb-4">
          {bio}
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
