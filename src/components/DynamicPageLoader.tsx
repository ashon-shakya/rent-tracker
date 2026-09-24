"use client";

import React, { useEffect, useState } from "react";
import { Home, KeyRound, Wallet, Sparkles, ShieldCheck } from "lucide-react";


interface DynamicPageLoaderProps {
  /** If true, renders a fixed full-screen overlay (e.g. for root loading). Otherwise renders flexible layout for dashboard */
  fullScreen?: boolean;
  title?: string;
}

const LOADING_STEPS = [
  {
    title: "Opening your space...",
    detail: "Fetching your lease agreements & roommate splits",
    badge: "Lease Sync",
    icon: Home,
    color: "from-violet-500 to-indigo-500",
    badgeColor: "bg-violet-100 text-violet-700 border-violet-200",
  },
  {
    title: "Reconciling payment logs...",
    detail: "Tracking rent dues, bonds, and verified transactions",
    badge: "Financial Ledger",
    icon: Wallet,
    color: "from-fuchsia-500 to-pink-500",
    badgeColor: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
  },
  {
    title: "Checking utilities & shares...",
    detail: "Balancing electricity, water, and internet shares",
    badge: "Utility Engine",
    icon: Sparkles,
    color: "from-sky-500 to-teal-500",
    badgeColor: "bg-sky-100 text-sky-700 border-sky-200",
  },
  {
    title: "Securing your dashboard...",
    detail: "Finalizing updates & polishing your personalized view",
    badge: "Almost Ready",
    icon: ShieldCheck,
    color: "from-emerald-500 to-teal-600",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
];

export function DynamicPageLoader({ fullScreen = false, title }: DynamicPageLoaderProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(18);

  // Cycle engaging status text
  useEffect(() => {
    const textInterval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 1800);

    return () => clearInterval(textInterval);
  }, []);

  // Smooth realistic dynamic progress animation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) return 94; // wait at 94% until page loads
        const increment = Math.max(1, Math.floor((95 - prev) * 0.15));
        return Math.min(prev + increment, 94);
      });
    }, 220);

    return () => clearInterval(progressInterval);
  }, []);

  const currentStep = LOADING_STEPS[stepIndex];
  const StepIcon = currentStep.icon;

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ${
        fullScreen
          ? "fixed inset-0 z-50 bg-[#f8f7fc]/95 backdrop-blur-xl"
          : "min-h-[60vh] w-full py-12 px-4"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
    >
      {/* Dynamic ambient floating gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="absolute -top-12 -left-12 w-72 h-72 rounded-full bg-violet-400/20 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-pink-400/20 blur-3xl animate-pulse-glow [animation-delay:1.5s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-sky-300/15 blur-3xl" />
      </div>

      {/* Main glassmorphism card */}
      <div className="relative z-10 w-full max-w-md mx-auto p-6 md:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-violet-100/80 shadow-[0_20px_50px_rgba(124,58,237,0.08)] flex flex-col items-center text-center">
        {/* Animated Central Emblem */}
        <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
          {/* Outer rotating dashed gradient ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-violet-300/70 animate-spin [animation-duration:9s]" />

          {/* Glowing orbital ring with reverse spin */}
          <div className="absolute inset-1 rounded-full border-2 border-violet-400/30 animate-spin [animation-duration:5s] [animation-direction:reverse]">
            {/* Orbiting glowing comet point */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-sm shadow-violet-500/80" />
          </div>

          {/* Floating mini satellite badges */}
          <div className="absolute -top-2 -right-2 z-20 w-8 h-8 rounded-xl bg-white/90 border border-violet-100 shadow-md flex items-center justify-center text-amber-500 animate-float-gentle">
            <Sparkles size={16} className="animate-spin [animation-duration:6s]" />
          </div>

          <div className="absolute -bottom-1 -left-2 z-20 w-8 h-8 rounded-xl bg-white/90 border border-violet-100 shadow-md flex items-center justify-center text-violet-600 animate-float-gentle [animation-delay:2s]">
            <KeyRound size={15} />
          </div>

          {/* Central Hero Icon with dynamic pulse */}
          <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30 flex items-center justify-center text-white transition-transform duration-500 transform hover:scale-105">
            <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse duration-1000" />
            <StepIcon size={30} className="relative z-10 transition-all duration-300 animate-in zoom-in-75" />
          </div>
        </div>

        {/* Dynamic status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-3 transition-all duration-300 shadow-xs bg-slate-50 border-slate-200">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping inline-block" />
          <span className="text-slate-700">{title || currentStep.badge}</span>
        </div>

        {/* Animated dynamic cycling title */}
        <h2 className="text-xl font-bold text-slate-800 mb-1 transition-all duration-300 h-7 flex items-center justify-center">
          {currentStep.title}
        </h2>

        {/* Dynamic description */}
        <p className="text-sm text-slate-500 font-medium mb-6 max-w-xs h-10 flex items-center justify-center">
          {currentStep.detail}
        </p>

        {/* Dynamic fluid progress bar */}
        <div className="w-full bg-slate-100/90 rounded-full h-2.5 overflow-hidden p-0.5 relative mb-3 border border-slate-200/50">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-400 transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Progress glow shimmer beam */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-white/60 blur-xs rounded-full animate-pulse" />
          </div>
        </div>

        {/* Progress % and quick feedback */}
        <div className="w-full flex items-center justify-between text-xs text-slate-400 font-medium px-1">
          <span className="flex items-center gap-1.5 text-violet-600 font-semibold">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
            Loading
          </span>
          <span className="tabular-nums font-mono text-slate-600 font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
