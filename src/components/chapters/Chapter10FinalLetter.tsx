"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Sparkles, RotateCcw, Heart } from "lucide-react";
import { soundManager } from "@/lib/sound";
import { triggerWishSparkles } from "@/lib/confetti";
import { birthdayData } from "@/data/birthday";

interface Chapter10FinalLetterProps {
  onReplay: () => void;
}

export const Chapter10FinalLetter: React.FC<Chapter10FinalLetterProps> = ({ onReplay }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { finalLetter, recipient } = birthdayData;

  const handleOpenLetter = () => {
    setIsOpen(true);
    soundManager.playChime();
    triggerWishSparkles();
  };

  const handleRestart = () => {
    soundManager.playTap();
    onReplay();
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Soft Moonlight & Warm Ambient Particles Glow */}
      <div className="absolute w-[360px] sm:w-[600px] h-[360px] sm:h-[600px] bg-gradient-to-tr from-[#E8C88A]/15 via-[#67E8F9]/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Sealed Envelope / Glowing Letter State */
          <motion.div
            key="sealed"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-md w-full text-center flex flex-col items-center p-8 rounded-3xl glass-panel border border-[#E8C88A]/30 shadow-2xl"
          >
            {/* Glowing Envelope Icon */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#E8C88A]/20 to-white/10 border border-[#E8C88A]/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(232,200,138,0.25)]"
            >
              <Mail className="w-9 h-9 text-[#E8C88A]" />
            </motion.div>

            <span className="text-xs font-mono tracking-widest text-[#E8C88A] uppercase mb-2">
              CHAPTER 10 // THE CLIMAX
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F7F2EA] glow-gold">
              {finalLetter.preface}
            </h2>

            <p className="text-xs sm:text-sm text-[#94A3B8] mt-3 font-light max-w-xs leading-relaxed">
              When the lights go down and the noise fades away, only what truly matters remains.
            </p>

            <button
              onClick={handleOpenLetter}
              className="mt-8 px-8 py-4 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#E8C88A] via-[#F7F2EA] to-[#E8C88A] shadow-[0_0_30px_rgba(232,200,138,0.4)] hover:shadow-[0_0_45px_rgba(232,200,138,0.7)] active:scale-95 transition-all duration-300 flex items-center gap-3"
            >
              <Sparkles className="w-4 h-4 text-[#080810]" />
              <span>{finalLetter.buttonLabel}</span>
            </button>
          </motion.div>
        ) : (
          /* Unfolded Interactive Letter State */
          <motion.div
            key="unfolded"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-xl w-full my-8 p-6 sm:p-10 rounded-3xl glass-panel border border-[#E8C88A]/35 shadow-[0_0_60px_rgba(232,200,138,0.15)] flex flex-col overflow-hidden"
          >
            {/* Subtle top stamp */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <span className="text-[10px] font-mono tracking-widest text-[#E8C88A] uppercase">
                A LETTER TO MURTAZA
              </span>
              <span className="text-[10px] font-mono text-[#94A3B8]">
                NOVEMBER 2026
              </span>
            </div>

            {/* Letter Body - Line by Line */}
            <div className="py-6 space-y-4">
              {finalLetter.paragraphs.map((p, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.45, duration: 0.8 }}
                  className={`text-sm sm:text-base leading-relaxed ${
                    idx === 2
                      ? "text-[#E8C88A] font-serif italic text-base sm:text-lg glow-gold font-medium py-1"
                      : "text-[#F7F2EA] font-light"
                  }`}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Climax Hero Message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.2, duration: 1 }}
              className="mt-6 pt-6 border-t border-[#E8C88A]/20 text-center flex flex-col items-center"
            >
              <h3 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-[#F7F2EA] glow-gold">
                {finalLetter.heroMessage}
              </h3>
              <p className="text-xs sm:text-sm font-mono tracking-widest text-[#67E8F9] uppercase mt-1">
                {finalLetter.recipientTitle}
              </p>
              <p className="text-sm sm:text-base font-serif italic text-[#E8C88A] mt-2">
                &ldquo;{finalLetter.hopeMessage}&rdquo;
              </p>

              {/* Tiny Signature */}
              <p className="mt-6 text-xs text-[#94A3B8] font-mono italic">
                {finalLetter.signature}
              </p>

              {/* Replay The Magic Button */}
              <div className="mt-8">
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase text-[#F7F2EA] glass-panel border border-white/20 hover:border-[#E8C88A] hover:text-[#E8C88A] shadow-lg active:scale-95 transition-all flex items-center gap-2.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>REPLAY THE MAGIC</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
