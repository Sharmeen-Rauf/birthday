"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles, ArrowRight, Shield, Gauge, Cpu, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { soundManager } from "@/lib/sound";
import { birthdayData } from "@/data/birthday";

interface Chapter08NextDriveProps {
  onContinue: () => void;
}

export const Chapter08NextDrive: React.FC<Chapter08NextDriveProps> = ({ onContinue }) => {
  const [isSpecsOpen, setIsSpecsOpen] = useState<boolean>(false);
  const { car } = birthdayData;

  const handleToggleSpecs = () => {
    soundManager.playTap();
    setIsSpecsOpen(!isSpecsOpen);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between py-16 px-4 sm:px-6 overflow-hidden">
      {/* Sunset Mountain Highway Horizon Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#180C14] via-[#0E0E1A] to-[#080810] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-r from-amber-600/15 via-rose-500/10 to-indigo-600/15 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-widest text-[#E8C88A] uppercase mb-2">
          <Compass className="w-3.5 h-3.5 text-[#E8C88A]" />
          <span>CHAPTER 08 // AUTOMOTIVE HORIZONS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F7F2EA] tracking-tight">
          {car.title}
        </h2>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#E8C88A] glow-gold mt-1">
          {car.model}
        </h3>
        <p className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase mt-1">
          {car.subtitle}
        </p>
      </div>

      {/* Main Vehicle Showcase Card with Cinematic Light Sweep */}
      <div className="relative z-10 w-full max-w-2xl mx-auto my-6">
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#E8C88A]/30 shadow-2xl p-4 sm:p-6 group">
          {/* Light Sweep Highlight */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {/* Vehicle Visual */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#0A0A12]">
            <ImageWithFallback
              src={car.imagePath}
              alt={car.model}
              fill
              priority
              className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-transparent to-transparent opacity-70" />

            <div className="absolute bottom-3 left-4">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-[#67E8F9]">
                METALLIC CHARCOAL GREY
              </span>
            </div>
          </div>

          {/* Short Narrative Message */}
          <div className="mt-4 text-center sm:text-left">
            <p className="text-sm sm:text-base text-[#F7F2EA] font-light leading-relaxed">
              &ldquo;{car.description}&rdquo;
            </p>
            <p className="text-xs text-[#94A3B8] italic mt-2">
              *{car.note}
            </p>
          </div>

          {/* Explore Specs Button */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={handleToggleSpecs}
              className="text-xs font-mono uppercase tracking-wider text-[#E8C88A] hover:underline flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isSpecsOpen ? "Hide Specifications" : "Explore The Car & Why It Fits"}</span>
            </button>
            <span className="text-[11px] font-mono text-[#94A3B8]">1.5T TURBO</span>
          </div>

          {/* Expandable Specifications & Reasons */}
          <AnimatePresence>
            {isSpecsOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-white/10 space-y-4 overflow-hidden"
              >
                {/* 4 Specs */}
                <div className="grid grid-cols-2 gap-3">
                  {car.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      <span className="text-[10px] font-mono text-[#94A3B8] uppercase block">
                        {spec.label}
                      </span>
                      <strong className="text-xs sm:text-sm font-semibold text-[#F7F2EA] block mt-0.5">
                        {spec.value}
                      </strong>
                      <span className="text-[10px] text-[#94A3B8] line-clamp-1">
                        {spec.detail}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Why this match */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#67E8F9]">
                    Why It Resonates With You:
                  </h4>
                  {car.reasons.map((r, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#94A3B8]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#E8C88A] flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[#F7F2EA]">{r.title}:</strong> {r.description}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Ending Line & Continue Button */}
      <div className="relative z-10 text-center max-w-lg mx-auto flex flex-col items-center">
        <p className="text-sm sm:text-base font-serif italic text-[#E8C88A] glow-gold">
          &ldquo;{car.endingLine}&rdquo;
        </p>

        <button
          onClick={onContinue}
          className="mt-6 px-8 py-3.5 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#67E8F9] via-[#F7F2EA] to-[#8B5CF6] shadow-[0_0_25px_rgba(103,232,249,0.3)] hover:shadow-[0_0_40px_rgba(103,232,249,0.5)] active:scale-95 transition-all flex items-center gap-3"
        >
          <span>PROCEED TO CHAPTER 09 // KASZSOFT</span>
          <ArrowRight className="w-4 h-4 text-[#080810]" />
        </button>
      </div>
    </div>
  );
};

