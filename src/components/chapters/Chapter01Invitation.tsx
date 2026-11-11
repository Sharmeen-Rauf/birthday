"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, KeyRound } from "lucide-react";
import { soundManager } from "@/lib/sound";
import { birthdayData } from "@/data/birthday";

interface Chapter01InvitationProps {
  onUnlock: () => void;
}

export const Chapter01Invitation: React.FC<Chapter01InvitationProps> = ({ onUnlock }) => {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const { invitation } = birthdayData;

  const handleUnlockClick = () => {
    if (isUnlocking) return;
    setIsUnlocking(true);

    // Audio starts upon this very user interaction!
    soundManager.startAmbient();
    soundManager.playChime();

    // Trigger visual camera push & transition to Chapter 2
    setTimeout(() => {
      onUnlock();
    }, 1100);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background Star Nebulae Glow */}
      <div className="absolute w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-gradient-to-tr from-[#8B5CF6]/20 via-[#67E8F9]/15 to-[#E8C88A]/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#080810]/60 to-[#080810] pointer-events-none" />

      {/* Main Glass Card */}
      <AnimatePresence>
        {!isUnlocking ? (
          <motion.div
            key="invitation-card"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md sm:max-w-lg p-8 sm:p-12 rounded-3xl glass-panel border border-[#E8C88A]/25 shadow-2xl text-center flex flex-col items-center overflow-hidden"
          >
            {/* Top delicate label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-[#E8C88A] uppercase mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E8C88A]" />
              <span>CONFIDENTIAL // FOR MURTAZA ONLY</span>
            </motion.div>

            {/* Step 1: "Hey, Murtaza." */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.9 }}
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#F7F2EA] tracking-tight glow-gold"
            >
              {invitation.greeting}
            </motion.h1>

            {/* Step 2: "I made a little something for you." */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.9 }}
              className="mt-4 text-base sm:text-lg text-[#94A3B8] font-light max-w-sm"
            >
              {invitation.pauseNote}
            </motion.p>

            {/* Step 3: "Ready to enter your universe?" */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.3, duration: 0.9 }}
              className="mt-6 text-xs sm:text-sm font-mono tracking-wider text-[#67E8F9] uppercase"
            >
              {invitation.question}
            </motion.p>

            {/* Interactive Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.0, duration: 0.8 }}
              className="mt-8 w-full sm:w-auto"
            >
              <button
                onClick={handleUnlockClick}
                className="group relative w-full sm:w-auto px-8 py-4 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#E8C88A] via-[#F7F2EA] to-[#E8C88A] shadow-[0_0_30px_rgba(232,200,138,0.4)] hover:shadow-[0_0_50px_rgba(232,200,138,0.7)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
              >
                {/* Button shimmer hover overlay */}
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <KeyRound className="w-4 h-4 text-[#080810] transition-transform group-hover:rotate-45" />
                <span>{invitation.buttonText}</span>
              </button>
            </motion.div>

            {/* Subtle disclaimer */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 3.4, duration: 0.8 }}
              className="mt-6 text-[10px] text-[#94A3B8] font-mono tracking-widest uppercase"
            >
              ♫ Turn sound on for the full cinematic experience
            </motion.span>
          </motion.div>
        ) : (
          /* Dissolve Portal Effect */
          <motion.div
            key="portal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 2.5, 6], opacity: [0.8, 1, 0] }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-[#E8C88A] via-[#8B5CF6] to-[#67E8F9] blur-2xl pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

