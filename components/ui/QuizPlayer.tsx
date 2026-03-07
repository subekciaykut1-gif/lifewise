"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Loader2, Share2 } from "lucide-react";
import { clsx } from "clsx";
import Image from "next/image";
import AdSlot from "@/components/monetization/AdSlot";

interface Option {
  id: number;
  text: string;
  is_correct: boolean;
  explanation: string;
}

interface Question {
  id: number;
  text: string;
  image_url?: string;
  options: Option[];
}

interface Outcome {
  min_score: number;
  max_score: number;
  title: string;
  description: string;
  image_url?: string;
}

interface Quiz {
  id: number;
  title: string;
  questions: Question[];
  outcomes: Outcome[];
}

export default function QuizPlayer({ quizSlug }: { quizSlug: string }) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`/api/quizzes/${quizSlug}`);
        const data = await res.json();
        if (data.quiz) {
          setQuiz(data.quiz);
        } else {
          setError(data.error || "Quiz not found");
        }
      } catch (err) {
        console.error("Failed to load quiz:", err);
        setError("Failed to load quiz. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizSlug]);

  const handleOptionSelect = (option: Option) => {
    if (isAnswered) return;
    setSelectedOptionId(option.id);
    setIsAnswered(true);
    if (option.is_correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-surface rounded-2xl border border-border shadow-soft">
        <Loader2 className="animate-spin text-accent mb-4" size={40} />
        <p className="font-ui text-muted">Preparing your quiz experience...</p>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="p-10 text-center bg-surface rounded-2xl border border-border">
        <p className="text-red-500 font-bold mb-4">{error || "Something went wrong"}</p>
        <button onClick={() => window.location.reload()} className="bg-accent text-white px-6 py-2 rounded-lg font-bold">Retry</button>
      </div>
    );
  }

  if (isFinished) {
    const outcome = quiz.outcomes.find(o => score >= o.min_score && score <= o.max_score) || quiz.outcomes[0];

    return (
      <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-xl animate-in fade-in zoom-in duration-500">
        <div className="relative h-64 bg-primary flex items-center justify-center overflow-hidden">
          {outcome.image_url ? (
            <Image src={outcome.image_url} alt={outcome.title} fill className="object-cover opacity-60" />
          ) : (
            <Award size={120} className="text-accent/40" />
          )}
          <div className="relative z-10 text-center px-6">
            <h2 className="text-white font-display text-4xl font-extrabold mb-2">{outcome.title}</h2>
            <div className="inline-block bg-accent text-white px-4 py-1 rounded-full text-sm font-bold">
              Your Score: {score} / {quiz.questions.length}
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10 text-center">
          <p className="text-muted font-body text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            {outcome.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={resetQuiz}
              className="px-8 py-3 bg-accent text-white rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <RotateCcw size={20} /> Retake Quiz
            </button>
            <button 
              className="px-8 py-3 bg-surface border border-border text-primary rounded-xl font-bold flex items-center gap-2 hover:bg-muted/50 transition-colors"
            >
              <Share2 size={20} /> Share Results
            </button>
          </div>

          <div className="mt-12">
            <p className="text-xs text-muted uppercase tracking-widest font-bold mb-4">Advertisement</p>
            <AdSlot slot="quiz-result" format="rectangle" height={250} />
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-xl">
      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-border">
        <div 
          className="h-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-6 sm:p-10">
        <div className="flex justify-between items-center mb-6">
          <span className="font-ui text-xs font-bold text-accent uppercase tracking-widest">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <span className="font-ui text-xs font-bold text-muted uppercase tracking-widest">Score: {score}</span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary mb-8 leading-tight">
          {currentQuestion.text}
        </h3>

        {currentQuestion.image_url && (
          <div className="mb-8 relative aspect-video rounded-xl overflow-hidden shadow-md">
            <Image src={currentQuestion.image_url} alt="Question image" fill className="object-cover" />
          </div>
        )}

        <div className="space-y-4 mb-10">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const showCorrect = isAnswered && option.is_correct;
            const showWrong = isAnswered && isSelected && !option.is_correct;

            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                disabled={isAnswered}
                className={clsx(
                  "w-full text-left p-5 rounded-xl border-2 transition-all duration-300 relative overflow-hidden group",
                  !isAnswered && "border-border hover:border-accent/40 bg-bg/50 hover:bg-bg hover:translate-x-1",
                  showCorrect && "border-green-500 bg-green-50/10",
                  showWrong && "border-red-500 bg-red-50/10",
                  isAnswered && !isSelected && !option.is_correct && "opacity-60 border-border grayscale-[0.5]"
                )}
              >
                <div className="flex items-center justify-between relative z-10">
                  <span className={clsx(
                    "font-body text-lg font-medium",
                    showCorrect ? "text-green-500" : showWrong ? "text-red-500" : "text-primary"
                  )}>
                    {option.text}
                  </span>
                  {showCorrect && <CheckCircle2 className="text-green-500" size={24} />}
                  {showWrong && <XCircle className="text-red-500" size={24} />}
                </div>

                {isAnswered && isSelected && option.explanation && (
                  <div className="mt-4 pt-4 border-t border-border/50 text-sm font-ui animate-in fade-in slide-in-from-top-1 duration-300">
                    {option.explanation}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-border">
          <div className="hidden sm:block">
            {/* Contextual ad every few questions */}
            {(currentQuestionIndex + 1) % 2 === 0 && (
              <div className="bg-muted px-4 py-2 rounded text-[0.6rem] text-muted-foreground uppercase font-bold tracking-tighter">Support LifeWise with Ads below</div>
            )}
          </div>
          
          <button
            onClick={nextQuestion}
            disabled={!isAnswered}
            className={clsx(
              "px-10 py-4 rounded-xl font-bold flex items-center gap-2 transition-all transform",
              isAnswered ? "bg-accent text-white translate-y-0 opacity-100 shadow-lg hover:scale-105 active:scale-95" : "bg-muted text-muted opacity-0 translate-y-4 pointer-events-none"
            )}
          >
            {currentQuestionIndex === quiz.questions.length - 1 ? "See Results" : "Next Question"} <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Ad Injected mid-quiz */}
      {(currentQuestionIndex + 1) % 3 === 0 && !isAnswered && (
        <div className="bg-bg/80 border-t border-border p-4 text-center">
          <AdSlot slot="quiz-mid" format="auto" height={100} />
        </div>
      )}
    </div>
  );
}
