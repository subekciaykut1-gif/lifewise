"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, BarChart3, Loader2 } from "lucide-react";
import { clsx } from "clsx";

interface SurveyOption {
  id: number;
  label: string;
  votes: number;
}

interface Survey {
  id: number;
  question: string;
  options: SurveyOption[];
}

interface CustomSurveyProps {
  type?: "sidebar" | "inline";
  className?: string;
}

export default function CustomSurvey({ type = "sidebar", className }: CustomSurveyProps) {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [results, setResults] = useState<SurveyOption[]>([]);

  useEffect(() => {
    // Check if user has already voted for this survey in this session
    const fetchSurvey = async () => {
      try {
        const res = await fetch(`/api/surveys?type=${type}`);
        const data = await res.json();
        
        if (data.survey) {
          setSurvey(data.survey);
          const votedKey = `voted_${data.survey.id}`;
          if (localStorage.getItem(votedKey)) {
            setHasVoted(true);
            setResults(data.survey.options);
          }
        }
      } catch (err) {
        console.error("Failed to load survey:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [type]);

  const handleVote = async (optionId: number) => {
    if (!survey || voting || hasVoted) return;

    setVoting(true);
    try {
      const res = await fetch("/api/surveys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surveyId: survey.id, optionId })
      });

      const data = await res.json();
      if (data.success) {
        setHasVoted(true);
        setResults(data.options);
        localStorage.setItem(`voted_${survey.id}`, "true");
      }
    } catch (err) {
      console.error("Failed to vote:", err);
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className={clsx("bg-surface border border-border rounded-xl p-6 flex flex-col items-center justify-center min-h-[150px]", className)}>
        <Loader2 className="animate-spin text-accent mb-2" size={24} />
        <span className="text-xs text-muted font-ui">Loading community poll...</span>
      </div>
    );
  }

  if (!survey) return null;

  const totalVotes = results.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <div className={clsx(
      "bg-surface border border-border rounded-xl overflow-hidden shadow-sm transition-all duration-300",
      type === "sidebar" ? "p-5" : "p-6 sm:p-8 my-10",
      className
    )}>
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-accent/10 p-1.5 rounded-lg text-accent">
          <BarChart3 size={18} />
        </div>
        <span className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.15em] text-accent">Community Poll</span>
      </div>

      <h3 className={clsx(
        "font-display text-primary leading-tight font-bold mb-5",
        type === "sidebar" ? "text-base" : "text-xl sm:text-2xl"
      )}>
        {survey.question}
      </h3>

      <div className="space-y-3">
        {(hasVoted 
          ? [...results].sort((a, b) => b.votes - a.votes) 
          : survey.options
        ).map((option) => {
          const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
          
          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={hasVoted || voting}
              className={clsx(
                "w-full text-left relative group rounded-lg transition-all duration-300 overflow-hidden",
                hasVoted ? "cursor-default" : "hover:scale-[1.02] active:scale-[0.98] border border-border hover:border-accent/40 bg-bg/50",
                !hasVoted && "p-3.5"
              )}
            >
              {hasVoted ? (
                <div className="p-3">
                  <div className="flex justify-between items-center mb-1.5 relative z-10">
                    <span className="font-ui text-sm font-semibold text-primary">{option.label}</span>
                    <span className="font-ui text-xs font-bold text-accent">{percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-border/30 rounded-full relative overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-accent transition-all duration-1000 ease-out rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <span className="font-ui text-sm font-medium text-primary group-hover:text-accent transition-colors">
                    {option.label}
                  </span>
                  <div className="w-5 h-5 rounded-full border border-border group-hover:border-accent transition-colors flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {hasVoted && (
        <div className="mt-5 pt-4 border-t border-border flex items-center gap-2 text-[0.7rem] text-muted font-ui animate-in fade-in slide-in-from-bottom-2 duration-700">
          <CheckCircle2 size={12} className="text-green-500" />
          <span>Thanks for participating! {totalVotes} members voted.</span>
        </div>
      )}
    </div>
  );
}
