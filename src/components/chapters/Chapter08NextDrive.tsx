"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Gauge, Car } from "lucide-react";
import Image from "next/image";

interface Chapter08NextDriveProps {
  onContinue: () => void;
}

export const Chapter08NextDrive: React.FC<Chapter08NextDriveProps> = ({ onContinue }) => {
  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between py-5 px-3 sm:px-6 overflow-hidden bg-[#0A0710]">
      {/* Responsive Haval H6 Cinematic Background (Mobile Portrait 9:16 + Desktop 16:9) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Mobile Portrait (9:16 aspect ratio - perfectly fits phone screens with zero side crop) */}
        <div className="relative w-full h-full block sm:hidden">
          <Image
            src="/images/cars/haval-h6-mobile.jpg"
            alt="Haval H6 1.5T Mobile Wallpaper"
            fill
            priority
            className="object-cover object-center opacity-65"
          />
          {/* Mobile soft gradient overlay so car and text are both distinct and readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0710]/50 via-transparent to-[#0A0710]/95" />
        </div>

        {/* Desktop / Tablet Landscape Version */}
        <div className="relative w-full h-full hidden sm:block">
          <Image
            src="/images/cars/haval-h6-bg.jpg"
            alt="Haval H6 1.5T on Mountain Highway"
            fill
            priority
            className="object-cover object-center opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-radial from-transparent via-[#080810]/35 to-[#080810]/90" />
        </div>
      </div>

      {/* Atmospheric Amber & Violet Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] sm:w-[650px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-amber-600/15 via-[#8B5CF6]/15 to-transparent rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-xl mx-auto pt-1 sm:pt-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-black/65 backdrop-blur-md border border-[#E8C88A]/40 text-[11px] sm:text-xs font-mono tracking-widest text-[#E8C88A] uppercase mb-1 shadow-sm"
        >
          <Car className="w-3.5 h-3.5 text-[#E8C88A]" />
          <span>SUGGESTIONS // CHAPTER 08</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl sm:text-3xl md:text-4xl font-serif font-black tracking-tight text-[#F7F2EA] flex items-center justify-center gap-2"
        >
          <span>Suggestion #2: Vroom Vroom</span>
          <span className="text-lg sm:text-2xl">🏎️💨</span>
        </motion.h2>
      </div>

      {/* Main Luxury Glassmorphic Note Card (Optimized padding for mobile zero-scroll) */}
      <div className="relative z-10 w-full max-w-xl mx-auto my-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full p-4 sm:p-7 rounded-2xl sm:rounded-3xl glass-panel border border-[#E8C88A]/35 bg-[#090812]/75 shadow-[0_0_50px_rgba(232,200,138,0.18)] backdrop-blur-xl flex flex-col gap-3 sm:gap-4 text-left"
        >
          {/* Comparison Intro */}
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 leading-relaxed">
            <p className="text-[11.5px] sm:text-[13px] text-[#E2E8F0] font-light leading-relaxed">
              I actually compared the <span className="font-semibold text-[#E8C88A]">Haval H6 1.5T</span> with{" "}
              <span className="text-[#94A3B8]">Hyundai Tucson, Chery Tiggo 7 PHEV, MG HS Hybrid+, Jaecoo J5 SHS, MG ZS Hybrid+, Honda HR-V e:HEV, Haval Jolion HEV, BYD Atto 3, Jetour Dashing, Jetour X70 Plus, and Changan Oshan X7.</span>{" "}
              <span className="inline-block">😂</span>
            </p>
          </div>

          {/* Haval Match */}
          <div className="border-l-2 border-[#E8C88A] pl-3 sm:pl-3.5">
            <p className="text-[12px] sm:text-[13px] text-[#F7F2EA] leading-relaxed">
              And after going through all these options, I personally feel the{" "}
              <strong className="text-[#E8C88A] font-semibold">Haval H6 1.5T</strong> suits your personality the best —{" "}
              <span className="text-[#67E8F9] font-medium">bold, classy, intelligent, and a little adventurous.</span>
            </p>
          </div>

          {/* Range Rover Sport Dream */}
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#8B5CF6]/20 via-black/40 to-[#E8C88A]/15 border border-[#8B5CF6]/35">
            <p className="text-[12px] sm:text-[13px] text-[#F7F2EA] leading-relaxed">
              But someday, I&apos;d genuinely love to see you driving a{" "}
              <strong className="text-[#C084FC] font-semibold">Range Rover Sport</strong>. I feel that car would match your personality even better. 🤍
            </p>
            <p className="text-[11.5px] sm:text-[13px] text-[#E8C88A] mt-1.5 sm:mt-2 italic font-serif">
              &ldquo;And knowing how ambitious and capable you are, I have a feeling you&apos;ll get there sooner than you think. 😉✨&rdquo;
            </p>
          </div>

          {/* Interactive Car Specs Toggle */}
          <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[11px] sm:text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[#94A3B8]">
              <Gauge className="w-3.5 h-3.5 text-[#67E8F9]" />
              <span className="hidden sm:inline">CURRENT CRUSH:</span>
              <span className="text-[#67E8F9] font-semibold">HAVAL H6 1.5T</span>
            </div>
            <div className="flex items-center gap-1 text-[#C084FC]">
              <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
              <span className="hidden sm:inline">NEXT DESTINATION:</span>
              <span className="font-semibold">RANGE ROVER SPORT</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Continue Action */}
      <div className="relative z-10 flex items-center justify-center pb-1 sm:pb-2">
        <button
          onClick={onContinue}
          className="px-8 py-3 sm:py-3.5 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#E8C88A] via-[#F7F2EA] to-[#67E8F9] shadow-[0_0_25px_rgba(232,200,138,0.35)] hover:shadow-[0_0_40px_rgba(232,200,138,0.6)] active:scale-95 transition-all flex items-center gap-3"
        >
          <span>STEP INTO KASZSOFT</span>
          <ArrowRight className="w-4 h-4 text-[#080810]" />
        </button>
      </div>
    </div>
  );
};
