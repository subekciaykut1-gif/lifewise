"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { X, Mail, Lock, User, Loader2, AlertCircle } from "lucide-react";
import { clsx } from "clsx";
import { FcGoogle } from "react-icons/fc";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: "login" | "register";
}

export default function AuthModal({ isOpen, onClose, initialView = "login" }: AuthModalProps) {
  const [view, setView] = useState<"login" | "register">(initialView);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (view === "register") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to register");
        
        // Auto login after registration
        await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        onClose();
      } else {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        if (result?.error) throw new Error("Invalid email or password");
        onClose();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-surface/90 backdrop-blur-xl border border-border rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted hover:text-primary transition-colors hover:bg-muted/50 rounded-full"
        >
          <X size={20} />
        </button>

        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-extrabold text-primary tracking-tight">
              {view === "login" ? "Welcome Back" : "Join LifeWise"}
            </h2>
            <p className="text-muted font-body mt-2">
              {view === "login" ? "Sign in to keep track of your life hacks." : "Start your journey to a smarter home today."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50/10 border border-red-500/50 text-red-500 text-sm rounded-xl animate-in shake duration-500">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            {view === "register" && (
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full bg-bg/50 border border-border focus:border-accent rounded-xl py-3.5 pl-12 pr-4 outline-none transition-all font-body text-primary focus:bg-surface"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full bg-bg/50 border border-border focus:border-accent rounded-xl py-3.5 pl-12 pr-4 outline-none transition-all font-body text-primary focus:bg-surface"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={20} />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full bg-bg/50 border border-border focus:border-accent rounded-xl py-3.5 pl-12 pr-4 outline-none transition-all font-body text-primary focus:bg-surface"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-accent text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg mt-6"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : view === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
              <span className="relative bg-surface/90 px-4 text-xs font-bold text-muted uppercase tracking-widest">Or continue with</span>
            </div>

            <button 
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center gap-3 py-3.5 bg-surface border border-border text-primary font-bold rounded-xl hover:bg-muted/50 transition-colors"
            >
              <FcGoogle size={24} /> Google
            </button>
          </div>

          <p className="text-center mt-10 text-muted font-ui text-sm">
            {view === "login" ? "New to LifeWise?" : "Already have an account?"}{" "}
            <button 
              onClick={() => setView(view === "login" ? "register" : "login")}
              className="text-accent font-bold hover:underline"
            >
              {view === "login" ? "Join now" : "Sign in here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
