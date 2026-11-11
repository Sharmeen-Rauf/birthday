"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Sparkles, ArrowRight, Code2, ShieldAlert } from "lucide-react";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { soundManager } from "@/lib/sound";
import { birthdayData } from "@/data/birthday";
import { EasterEggEvent } from "../common/EasterEggToast";

interface Chapter09KaszsoftProps {
  onContinue: () => void;
  onTriggerEasterEgg: (egg: EasterEggEvent) => void;
}

export const Chapter09Kaszsoft: React.FC<Chapter09KaszsoftProps> = ({
  onContinue,
  onTriggerEasterEgg,
}) => {
  const [typedIndex, setTypedIndex] = useState<number>(0);
  const { kaszsoft } = birthdayData;

  const handleLogoTap = () => {
    soundManager.playEasterEgg();
    onTriggerEasterEgg({
      type: "kaszsoft",
      title: "FUTURE FOUNDER DETECTED",
      subtitle: "Murtaza • Founder & Architect at Kaszsoft. High-conviction engineering in progress.",
    });
  };

  useEffect(() => {
    const fullCode = kaszsoft.codeSnippet;
    if (typedIndex < fullCode.length) {
      const timeout = setTimeout(() => {
        setTypedIndex((prev) => prev + 1);
      }, 25);
      return () => clearTimeout(timeout);
    }
  }, [typedIndex, kaszsoft.codeSnippet]);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between py-16 px-4 sm:px-6 overflow-hidden">
      {/* Background Matrix/Cyber glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-gradient-to-tr from-[#8B5CF6]/20 via-[#67E8F9]/15 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-widest text-[#67E8F9] uppercase mb-2">
          <Terminal className="w-3.5 h-3.5 text-[#67E8F9]" />
          <span>CHAPTER 09 // FOUNDER VISION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F7F2EA] tracking-tight">
          {kaszsoft.headline}
        </h2>
        <h3 className="text-xl sm:text-2xl font-serif italic text-[#8B5CF6] glow-violet mt-1">
          {kaszsoft.subheadline}
        </h3>
      </div>

      {/* Main Developer Laptop Showcase & Code Editor */}
      <div className="relative z-10 w-full max-w-2xl mx-auto my-6">
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#67E8F9]/30 shadow-2xl p-5 sm:p-8">
          {/* Kaszsoft Brand Header (Tap for Easter Egg) */}
          <div
            onClick={handleLogoTap}
            className="flex flex-col sm:flex-row items-center justify-between pb-5 border-b border-white/10 gap-4 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#8B5CF6]/30 to-[#67E8F9]/20 border border-[#67E8F9]/40 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <ImageWithFallback
                  src={kaszsoft.officialLogoPath}
                  alt="Kaszsoft Monogram"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold font-sans tracking-wider text-[#F7F2EA] group-hover:text-[#67E8F9] transition-colors flex items-center gap-2">
                  <span>KASZSOFT</span>
                  <Sparkles className="w-4 h-4 text-[#E8C88A] animate-pulse" />
                </h4>
                <p className="text-xs font-mono text-[#94A3B8]">
                  Founder: <strong className="text-[#E8C88A]">Murtaza</strong> • Tap for telemetry
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>BUILDING STATUS: ACTIVE</span>
            </div>
          </div>

          {/* Emotional Founder Tribute Paragraphs */}
          <div className="my-5 space-y-3">
            {kaszsoft.narrativeParagraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-sm sm:text-base text-[#F7F2EA] font-light leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Animated Interactive Code Terminal */}
          <div className="mt-5 rounded-2xl bg-[#090A12] border border-white/10 p-4 font-mono text-xs overflow-hidden shadow-inner">
            {/* Terminal Top Window Buttons */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3 text-[10px] text-[#94A3B8]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2">kaszsoft.future.ts</span>
              </div>
              <span>TypeScript // ESNext</span>
            </div>

            {/* Code Body */}
            <pre className="text-[#67E8F9] leading-relaxed whitespace-pre-wrap font-mono">
              <code>{kaszsoft.codeSnippet.slice(0, typedIndex)}</code>
              <span className="inline-block w-2 h-4 bg-[#E8C88A] animate-pulse ml-0.5 align-middle" />
            </pre>
          </div>
        </div>
      </div>

      {/* Motivational Closing Line & Continue Button */}
      <div className="relative z-10 text-center max-w-lg mx-auto flex flex-col items-center">
        <h4 className="text-lg sm:text-2xl font-serif font-bold text-[#E8C88A] glow-gold">
          &ldquo;{kaszsoft.closingWords}&rdquo;
        </h4>

        <button
          onClick={onContinue}
          className="mt-6 px-8 py-3.5 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#8B5CF6] via-[#F7F2EA] to-[#E8C88A] shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] active:scale-95 transition-all flex items-center gap-3"
        >
          <span>PROCEED TO FINAL CHAPTER // LETTER</span>
          <ArrowRight className="w-4 h-4 text-[#080810]" />
        </button>
      </div>
    </div>
  );
};
