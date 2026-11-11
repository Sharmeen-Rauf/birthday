"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { triggerCelebrationBurst } from "@/lib/confetti";
import { soundManager } from "@/lib/sound";
import { birthdayData } from "@/data/birthday";

interface Chapter02CelebrationProps {
  onContinue: () => void;
}

export const Chapter02Celebration: React.FC<Chapter02CelebrationProps> = ({ onContinue }) => {
  const [exploded, setExploded] = useState(false);
  const { celebration } = birthdayData;

  useEffect(() => {
    // 0.5s dramatic darkness before the celebration burst
    const timer = setTimeout(() => {
      setExploded(true);
      triggerCelebrationBurst();
      soundManager.playCelebrationArpeggio();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    soundManager.playTap();
    onContinue();
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background glow burst */}
      {exploded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-gradient-to-tr from-[#8B5CF6]/30 via-[#F3A6C8]/20 to-[#E8C88A]/25 rounded-full blur-[120px] pointer-events-none"
        />
      )}

      {exploded && (
        <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
          {/* Top Tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-[#E8C88A]/30 text-xs font-mono tracking-widest text-[#E8C88A] uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E8C88A]" />
            <span>SPECIAL BROADCAST</span>
          </motion.div>

          {/* Primary Text: "IT'S YOUR DAY." */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-sans font-black tracking-tight text-[#F7F2EA] uppercase"
          >
            {celebration.primaryText}
          </motion.h2>

          {/* Secondary Text: "HAPPY BIRTHDAY, MURTAZA." */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E8C88A] via-[#F3A6C8] to-[#67E8F9] glow-gold tracking-tight"
          >
            {celebration.secondaryText}
          </motion.h1>

          {/* Supporting Text: "The world got a little more interesting when you arrived." */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.9 }}
            className="mt-6 text-base sm:text-xl text-[#94A3B8] font-light max-w-lg leading-relaxed"
          >
            &ldquo;{celebration.supportingText}&rdquo;
          </motion.p>

          {/* Call to action button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="mt-10"
          >
            <button
              onClick={handleNext}
              className="group relative px-8 py-3.5 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#F7F2EA] bg-[#10101C] border border-[#E8C88A]/40 hover:border-[#E8C88A] shadow-[0_0_25px_rgba(232,200,138,0.2)] hover:shadow-[0_0_40px_rgba(232,200,138,0.4)] active:scale-95 transition-all duration-300 flex items-center gap-3"
            >
              <span>SEE YOUR BIRTHDAY CAKE</span>
              <ArrowRight className="w-4 h-4 text-[#E8C88A] transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
