import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { sql } from "@/lib/db";
import { 
  User, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  Bookmark, 
  Settings, 
  LogOut,
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | LifeWise",
  description: "View and manage your personal account settings and saved content on LifeWise.",
  robots: "noindex, nofollow",
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/signin"); // Standard redirect
  }

  // Fetch some basic stats
  const bookmarkResult = await sql`
    SELECT COUNT(*) as count FROM user_bookmarks WHERE user_id = ${session.user.id}
  `;
  const savedCount = parseInt(bookmarkResult[0]?.count || "0");

  const stats = [
    { label: "Saved Hacks", value: savedCount, icon: <Bookmark size={20} />, href: "/saved-hacks", color: "text-accent" },
    { label: "Quizzes Taken", value: "0", icon: <Award size={20} />, href: "/quizzes", color: "text-gold" },
    { label: "Daily Streak", value: "1", icon: <TrendingUp size={20} />, href: "/", color: "text-green-500" },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-20 min-h-[85vh]">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header Card */}
        <section className="bg-surface border border-border rounded-3xl shadow-xl overflow-hidden relative mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="h-32 bg-gradient-hero opacity-10 absolute top-0 left-0 right-0 pointer-events-none" />
          
          <div className="pt-16 pb-10 px-8 flex flex-col items-center text-center relative">
            <div className="w-24 h-24 rounded-full border-4 border-surface shadow-2xl overflow-hidden mb-6 group transition-transform hover:scale-105">
              {session.user.image ? (
                <img 
                  src={session.user.image} 
                  alt={session.user.name || "User"} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full bg-accent text-white flex items-center justify-center text-3xl font-black">
                  {session.user.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-2 tracking-tight">
              {session.user.name}
            </h1>
            <p className="font-body text-muted flex items-center gap-2 mb-8">
              <Mail size={16} className="text-accent" /> {session.user.email}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
              {stats.map((stat, i) => (
                <Link 
                  key={i}
                  href={stat.href}
                  className="bg-bg/50 hover:bg-muted/20 border border-border/50 rounded-2xl p-4 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className={`p-2 rounded-xl bg-surface shadow-sm ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-[0.7rem] font-bold uppercase tracking-widest text-muted/60">{stat.label}</p>
                      <p className="text-xl font-black text-primary group-hover:text-accent transition-colors">{stat.value}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-muted/30 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Account Details */}
          <section className="bg-surface border border-border rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
            <h2 className="font-display text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <ShieldCheck size={24} className="text-accent" /> Account Details
            </h2>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center py-1">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">ID</p>
                  <p className="font-mono text-[0.75rem] text-muted overflow-hidden text-ellipsis max-w-[200px]">{session.user.id.slice(0, 16)}...</p>
                </div>
                <div className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-[0.65rem] font-bold uppercase tracking-widest">
                  Active
                </div>
              </div>

              <div className="flex items-center gap-4 py-1">
                <div className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center text-accent">
                  <User size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">Public Name</p>
                  <p className="text-primary font-bold">{session.user.name}</p>
                </div>
                <button className="text-xs font-bold text-accent hover:underline">Edit</button>
              </div>

              <div className="flex items-center gap-4 py-1">
                <div className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center text-accent">
                  <ShieldCheck size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">Security</p>
                  <p className="text-primary font-bold">Standard Account</p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions / Navigation */}
          <section className="bg-surface border border-border rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both flex flex-col">
            <h2 className="font-display text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <Settings size={24} className="text-accent" /> Quick Actions
            </h2>

            <div className="space-y-3 flex-1">
              <Link 
                href="/saved-hacks"
                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-muted/50 group transition-all border border-transparent hover:border-border"
              >
                <div className="flex items-center gap-4">
                  <Bookmark size={20} className="text-muted group-hover:text-accent transition-colors" />
                  <span className="text-sm font-bold text-primary">Manage My Bookmarks</span>
                </div>
                <ChevronRight size={18} className="text-muted" />
              </Link>

              <Link 
                href="/"
                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-muted/50 group transition-all border border-transparent hover:border-border"
              >
                <div className="flex items-center gap-4">
                  <TrendingUp size={20} className="text-muted group-hover:text-accent transition-colors" />
                  <span className="text-sm font-bold text-primary">Discover New Hacks</span>
                </div>
                <ChevronRight size={18} className="text-muted" />
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}>
                <button className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-bold">
                  <LogOut size={20} />
                  <span>Sign Out of Account</span>
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
