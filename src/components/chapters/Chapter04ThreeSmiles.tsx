"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { soundManager } from "@/lib/sound";
import { birthdayData } from "@/data/birthday";

interface Chapter04ThreeSmilesProps {
  onContinue: () => void;
}

export const Chapter04ThreeSmiles: React.FC<Chapter04ThreeSmilesProps> = ({ onContinue }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { threeSmiles } = birthdayData;

  const handleNextStep = () => {
    soundManager.playTap();
    if (activeStep < 1) {
      setActiveStep(1);
    } else {
      onContinue();
    }
  };

  const handlePrevStep = () => {
    soundManager.playTap();
    setActiveStep(0);
  };

  // Floating balloons configuration
  const balloons = [
    { color: "#E8C88A", left: "8%", size: 44, delay: 0, duration: 16 },
    { color: "#F3A6C8", left: "22%", size: 36, delay: 4, duration: 18 },
    { color: "#8B5CF6", left: "82%", size: 48, delay: 2, duration: 15 },
    { color: "#67E8F9", left: "92%", size: 38, delay: 6, duration: 19 },
    { color: "#E8C88A", left: "50%", size: 32, delay: 8, duration: 20 },
  ];

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between py-12 px-4 sm:px-6 overflow-hidden">
      {/* ──────────────── FLOATING METALLIC BALLOONS ──────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {balloons.map((b, idx) => (
          <motion.div
            key={idx}
            initial={{ y: "115vh", x: 0 }}
            animate={{
              y: "-25vh",
              x: [0, 15, -15, 0],
            }}
            transition={{
              y: { repeat: Infinity, duration: b.duration, delay: b.delay, ease: "linear" },
              x: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            }}
            style={{ left: b.left }}
            className="absolute flex flex-col items-center"
          >
            {/* Balloon Body */}
            <div
              className="rounded-full shadow-lg relative flex items-center justify-center"
              style={{
                width: b.size,
                height: b.size * 1.25,
                background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${b.color} 50%, #000000 100%)`,
                boxShadow: `0 0 20px ${b.color}60`,
              }}
            >
              {/* Highlight Glare */}
              <div className="absolute top-2 left-2 w-2 h-3.5 bg-white/70 rounded-full rotate-[-25deg]" />
            </div>
            {/* Balloon Knot */}
            <div
              className="w-1.5 h-1.5 mt-[-1px] rounded-xs"
              style={{ backgroundColor: b.color }}
            />
            {/* Balloon String */}
            <svg width="2" height="40" className="opacity-40">
              <line x1="1" y1="0" x2="1" y2="40" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2,2" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[380px] sm:w-[600px] h-[380px] sm:h-[600px] bg-gradient-to-tr from-[#E8C88A]/15 via-[#F3A6C8]/10 to-[#8B5CF6]/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 text-center max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#E8C88A]/30 text-xs font-mono tracking-widest text-[#E8C88A] uppercase mb-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E8C88A]" />
          <span>CHAPTER 04 // THE HEARTFELT TRIBUTE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl font-serif font-bold text-[#F7F2EA] tracking-tight"
        >
          {threeSmiles.openingLine}
        </motion.h2>
      </div>

      {/* Part Switcher Pills */}
      <div className="relative z-10 flex items-center justify-center gap-2 my-2">
        <button
          onClick={() => {
            soundManager.playTap();
            setActiveStep(0);
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
            activeStep === 0
              ? "bg-[#E8C88A] text-black font-bold shadow-[0_0_15px_rgba(232,200,138,0.5)] scale-105"
              : "glass-pill text-[#94A3B8] hover:text-white"
          }`}
        >
          ✦ 01: Three Smiles
        </button>
        <button
          onClick={() => {
            soundManager.playTap();
            setActiveStep(1);
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
            activeStep === 1
              ? "bg-[#67E8F9] text-black font-bold shadow-[0_0_15px_rgba(103,232,249,0.5)] scale-105"
              : "glass-pill text-[#94A3B8] hover:text-white"
          }`}
        >
          ✦ 02: Mind &amp; Heart
        </button>
      </div>

      {/* Main Narrative Card (Optimized for Mobile - Zero Uncomfortable Scrolling) */}
      <div className="relative z-10 w-full max-w-xl mx-auto my-auto py-2">
        <AnimatePresence mode="wait">
          {activeStep === 0 ? (
            /* PART 01: The Three Smiles */
            <motion.div
              key="part-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="p-5 sm:p-7 rounded-3xl glass-panel border border-[#E8C88A]/35 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <span className="text-[11px] font-mono tracking-widest text-[#E8C88A] uppercase">
                  PART 01 // THREE KINDS OF SMILES
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8]">PAGE 1 OF 2</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
                <p className="text-[#94A3B8] font-light italic">
                  &ldquo;You know, I&apos;ve noticed you have three different kinds of smiles...&rdquo;
                </p>

                {/* Smile 1 */}
                <div className="p-2.5 rounded-xl bg-white/[0.03] border-l-2 border-[#67E8F9]">
                  <p className="text-[#F7F2EA]">
                    The one where you show your teeth, even when you&apos;re just pretending to laugh.
                  </p>
                </div>

                {/* Smile 2 */}
                <div className="p-2.5 rounded-xl bg-white/[0.03] border-l-2 border-[#8B5CF6]">
                  <p className="text-[#F7F2EA]">
                    The little smirk that appears when something mischievous, flirty, or ridiculously dark crosses your mind. 😂
                  </p>
                </div>

                {/* Smile 3 */}
                <div className="p-3 rounded-xl bg-[#E8C88A]/10 border-l-2 border-[#E8C88A] shadow-inner">
                  <p className="text-[#F7F2EA] font-medium leading-relaxed">
                    And then there&apos;s my favourite one — the rare, genuine smile that comes straight from your heart. The one where you don&apos;t just smile with your lips, but your eyes smile too. <span className="text-[#E8C88A] font-serif italic block mt-1 glow-gold">And trust me, that&apos;s the most beautiful one of all. 🥹🤍</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#94A3B8]">Tap next for his mind &amp; heart</span>
                <button
                  onClick={handleNextStep}
                  className="px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase font-semibold text-[#080810] bg-[#E8C88A] hover:bg-white shadow-[0_0_15px_rgba(232,200,138,0.4)] active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>NEXT PART</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* PART 02: Mind, Beautiful Heart & Closing Wish */
            <motion.div
              key="part-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="p-5 sm:p-7 rounded-3xl glass-panel border border-[#67E8F9]/35 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <span className="text-[11px] font-mono tracking-widest text-[#67E8F9] uppercase">
                  PART 02 // MIND, HEART &amp; WISH
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8]">PAGE 2 OF 2</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
                <p className="text-[#F7F2EA] font-light">
                  And it&apos;s not just your smiles. There&apos;s something fascinating about the way your mind works. You&apos;re effortlessly intelligent, ridiculously spontaneous, and somehow always have an answer ready for everything. Sometimes I genuinely wonder how your brain comes up with things so quickly! 😂
                </p>

                <p className="text-[#F7F2EA] font-light">
                  But behind all that wit, mischief, and cleverness, there&apos;s a genuinely beautiful heart. A softer side of you that perhaps not everyone gets to see.
                </p>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <p className="text-xs sm:text-sm font-serif italic text-[#E8C88A]">
                    &ldquo;I hope you never lose that perfect combination of a sharp mind, a playful personality, and a soft heart. Because that&apos;s what makes you, you.&rdquo;
                  </p>
                </div>

                <div className="text-center pt-1 space-y-1">
                  <p className="text-xs sm:text-sm font-serif text-[#F7F2EA] font-medium">
                    On your birthday, I wish you countless reasons to wear that third smile. The real one. The happiest one.
                  </p>
                  <p className="text-xs sm:text-sm text-[#67E8F9] font-serif italic">
                    May life always give you reasons to smile with your eyes, not just your lips.
                  </p>
                  <h4 className="text-base sm:text-lg font-serif font-black text-[#F7F2EA] glow-gold mt-2">
                    {threeSmiles.signature}
                  </h4>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={handlePrevStep}
                  className="px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono text-[#94A3B8] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>BACK</span>
                </button>

                <button
                  onClick={onContinue}
                  className="px-5 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#67E8F9] via-[#F7F2EA] to-[#E8C88A] shadow-[0_0_20px_rgba(103,232,249,0.4)] active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>CONTINUE TO CHAPTER 05</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#080810]" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Progress Indicator */}
      <div className="relative z-10 flex items-center justify-center pt-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full transition-all ${
              activeStep === 0 ? "w-6 bg-[#E8C88A]" : "bg-white/30"
            }`}
          />
          <span
            className={`w-2 h-2 rounded-full transition-all ${
              activeStep === 1 ? "w-6 bg-[#67E8F9]" : "bg-white/30"
            }`}
          />
        </div>
      </div>
    </div>
  );
};
