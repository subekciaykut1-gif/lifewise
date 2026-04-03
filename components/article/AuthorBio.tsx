import { Facebook, Twitter, Globe, Instagram } from "lucide-react";
import { AuthorPersona, getAuthorSlug } from "@/lib/authors";
import Link from "next/link";
import AuthorAvatar from "@/components/ui/AuthorAvatar";

interface AuthorBioProps {
  persona: AuthorPersona;
}

export default function AuthorBio({ persona }: AuthorBioProps) {
  const { name, bio, image, role } = persona;

  return (
    <div className="my-12 p-6 md:p-8 rounded-2xl bg-surface border border-border shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
      <AuthorAvatar 
        name={name} 
        image={image} 
        size="lg" 
        className="border-2 border-accent/10 shadow-md"
      />
      
      <div className="flex-1 text-center md:text-left">
        <span className="text-secondary text-[0.65rem] font-bold uppercase tracking-widest mb-1 block">{role}</span>
        <h4 className="font-display text-2xl font-black text-primary mb-2">{name}</h4>
        <p className="font-body text-[0.95rem] text-muted leading-relaxed mb-4">
          {bio}
        </p>

        <Link 
          href={`/author/${getAuthorSlug(name)}`}
          className="inline-block text-accent font-ui text-[0.8rem] font-bold hover:underline mb-4"
        >
          View Full Profile & All Articles →
        </Link>
        
        <div className="flex justify-center md:justify-start gap-3">
          <a href="https://x.com/wisetipsco" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors"><Twitter size={16} /></a>
          <a href="https://www.facebook.com/wisetipsco/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors"><Facebook size={16} /></a>
          <a href="https://instagram.com/wisetipsco" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors"><Instagram size={16} /></a>
          <a href="https://www.wisetips.co" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors"><Globe size={16} /></a>
        </div>
      </div>
    </div>
  );
}
