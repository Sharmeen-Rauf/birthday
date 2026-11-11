"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Award } from "lucide-react";
import Image from "next/image";
import { soundManager } from "@/lib/sound";
import { EasterEggEvent } from "../common/EasterEggToast";

interface Chapter09KaszsoftProps {
  onContinue: () => void;
  onTriggerEasterEgg: (egg: EasterEggEvent) => void;
}

export const Chapter09Kaszsoft: React.FC<Chapter09KaszsoftProps> = ({
  onContinue,
  onTriggerEasterEgg,
}) => {
  const handleImageTap = () => {
    soundManager.playEasterEgg();
    onTriggerEasterEgg({
      type: "kaszsoft",
      title: "VISIONARY FOUNDER DETECTED",
      subtitle: "Murtaza • Founder & Visionary behind Kaszsoft. The empire is being built.",
    });
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between py-6 px-3 sm:px-6 overflow-hidden bg-[#06060E]">
      {/* Background Cyber/Matrix Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[480px] sm:w-[650px] h-[480px] sm:h-[650px] bg-gradient-to-tr from-[#8B5CF6]/20 via-[#67E8F9]/15 to-[#E8C88A]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-lg mx-auto pt-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-[#67E8F9]/40 text-xs font-mono tracking-widest text-[#67E8F9] uppercase mb-1 shadow-sm"
        >
          <Award className="w-3.5 h-3.5 text-[#67E8F9]" />
          <span>CHAPTER 09 // KASZSOFT</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-[#F7F2EA] glow-gold"
        >
          KASZSOFT
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-xs sm:text-sm font-mono tracking-widest text-[#E8C88A] uppercase mt-0.5"
        >
          Celebrates Its Visionary Founder ✨
        </motion.p>
      </div>

      {/* Main Showcase: Kaszsoft Founder Graphic (Zero Crop, Mobile-First) */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-md mx-auto my-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onClick={handleImageTap}
          className="relative w-full aspect-square max-h-[58vh] sm:max-h-[62vh] rounded-3xl overflow-hidden glass-panel border border-[#67E8F9]/35 shadow-[0_0_50px_rgba(103,232,249,0.22)] p-2.5 flex items-center justify-center cursor-pointer group bg-[#0A0914]"
        >
          {/* Subtle ambient image glow */}
          <Image
            src="/images/kaszsoft-celebration.png"
            alt=""
            fill
            priority
            unoptimized
            className="object-cover object-center blur-2xl opacity-35 scale-110 pointer-events-none"
          />

          {/* Complete Uncropped Founder Image */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Image
              src="/images/kaszsoft-celebration.png"
              alt="Kaszsoft Celebrates Its Visionary Founder"
              fill
              priority
              unoptimized
              className="object-contain object-center rounded-2xl drop-shadow-[0_4px_25px_rgba(0,0,0,0.6)] group-hover:scale-101 transition-transform duration-500"
            />
          </div>

          {/* Top-Right Badge: Tap to celebrate */}
          <div className="absolute top-4 right-4 z-20 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
            <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#E8C88A]/40 text-[10px] font-mono text-[#E8C88A] flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3 text-[#E8C88A] animate-pulse" />
              <span>FOUNDER</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Continue Action */}
      <div className="relative z-10 flex items-center justify-center pb-2">
        <button
          onClick={onContinue}
          className="px-8 py-3.5 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#67E8F9] via-[#F7F2EA] to-[#E8C88A] shadow-[0_0_25px_rgba(103,232,249,0.35)] hover:shadow-[0_0_40px_rgba(103,232,249,0.6)] active:scale-95 transition-all flex items-center gap-3"
        >
          <span>NEXT // BIRTHDAY BOYYY 🎉</span>
          <ArrowRight className="w-4 h-4 text-[#080810]" />
        </button>
      </div>
    </div>
  );
};
