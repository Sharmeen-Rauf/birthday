"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Play, Pause, Heart } from "lucide-react";
import Image from "next/image";
import { soundManager } from "@/lib/sound";
import { triggerUnoBurst } from "@/lib/confetti";
import { EasterEggEvent } from "../common/EasterEggToast";

interface Chapter05UniverseProps {
  onContinue: () => void;
  onTriggerEasterEgg: (egg: EasterEggEvent) => void;
}

const loverImages = [
  { id: "uno", src: "/images/uno.png", title: "UNO", easterEgg: true },
  { id: "mountain-lover", src: "/images/mountain-lover.png", title: "Mountain Lover" },
  { id: "nature", src: "/images/nature.png", title: "Nature" },
  { id: "subway-suffer", src: "/images/subway-suffer.png", title: "Subway Surfers" },
  { id: "anime", src: "/images/anime.png", title: "Anime" },
  { id: "book", src: "/images/book.png", title: "Books" },
  { id: "colours", src: "/images/colours.png", title: "Colours" },
  { id: "gamer", src: "/images/gamer.png", title: "Gaming" },
  { id: "touch", src: "/images/touch.png", title: "Touch" },
  { id: "intelligent", src: "/images/intelligent.png", title: "Intelligence" },
  { id: "basketball", src: "/images/basketball.png", title: "Basketball" },
  { id: "swimming", src: "/images/swimming.png", title: "Swimming" },
  { id: "coffee", src: "/images/coffee.png", title: "Coffee" },
];

export const Chapter05Universe: React.FC<Chapter05UniverseProps> = ({
  onContinue,
  onTriggerEasterEgg,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [progressKey, setProgressKey] = useState<number>(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const total = loverImages.length;
  const currentItem = loverImages[currentIndex];

  const handleNext = () => {
    soundManager.playTap();
    setCurrentIndex((prev) => (prev + 1) % total);
    setProgressKey((prev) => prev + 1);
  };

  const handlePrev = () => {
    soundManager.playTap();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setProgressKey((prev) => prev + 1);
  };

  const handleSelectIndex = (idx: number) => {
    soundManager.playTap();
    setCurrentIndex(idx);
    setProgressKey((prev) => prev + 1);
  };

  const handleImageTap = () => {
    if (currentItem.id === "uno") {
      triggerUnoBurst();
      soundManager.playEasterEgg();
      onTriggerEasterEgg({
        type: "uno",
        title: "WILD DRAW +4 ACTIVATED!",
        subtitle: "Undefeated champion with the comeback cards. No one escapes the table banter.",
      });
    } else {
      // Toggle auto play on tap
      setIsAutoPlaying((prev) => !prev);
    }
  };

  // 5-second auto-slider interval
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
      setProgressKey((prev) => prev + 1);
    }, 5000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, total, progressKey]);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between py-10 px-3 sm:px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-gradient-to-tr from-[#8B5CF6]/15 via-[#E8C88A]/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

      {/* Header with "LOVER" */}
      <div className="relative z-10 text-center max-w-lg mx-auto mb-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-[#E8C88A]/30 text-xs font-mono tracking-widest text-[#E8C88A] uppercase mb-1 shadow-sm">
          <Heart className="w-3.5 h-3.5 text-[#E8C88A] fill-[#E8C88A]" />
          <span>CHAPTER 06 // WHAT HE LOVES</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-[#F7F2EA] glow-gold">
          THE LOVER
        </h2>
        <p className="text-xs sm:text-sm font-mono tracking-widest text-[#67E8F9] uppercase mt-0.5">
          A Universe Made of Little Things
        </p>
      </div>

      {/* Main Mobile-Friendly Image Slider Showcase */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-md mx-auto my-auto flex flex-col items-center">
        {/* Top Slider Bar: Counter & AutoPlay Toggle */}
        <div className="flex items-center justify-between w-full px-2 mb-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#E8C88A]">
            {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1} / {total}
          </span>

          <button
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#94A3B8] hover:text-white transition-colors"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3 h-3 text-[#67E8F9]" />
                <span>5s Auto</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#E8C88A]" />
                <span>Paused</span>
              </>
            )}
          </button>
        </div>

        {/* Image Card Container with Gesture Swipe (Card size preserved, 0 crop) */}
        <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-h-[64vh] rounded-3xl overflow-hidden glass-panel border border-[#E8C88A]/30 shadow-[0_0_45px_rgba(232,200,138,0.2)] p-2 flex items-center justify-center group bg-[#0A0B14]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset }) => {
                if (offset.x < -40) handleNext();
                else if (offset.x > 40) handlePrev();
              }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={handleImageTap}
              className="relative w-full h-full rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none flex items-center justify-center"
            >
              {/* Subtle ambient image glow to fill empty margins elegantly */}
              <Image
                src={currentItem.src}
                alt=""
                fill
                priority
                unoptimized
                className="object-cover object-center blur-2xl opacity-35 scale-110 pointer-events-none"
              />

              {/* Complete, fully visible uncropped photo */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-1">
                <Image
                  src={currentItem.src}
                  alt={currentItem.title}
                  fill
                  priority
                  unoptimized
                  className="object-contain object-center rounded-2xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Navigation Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:border-[#E8C88A] hover:scale-105 active:scale-95 transition-all shadow-lg z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-[#F7F2EA]" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:border-[#E8C88A] hover:scale-105 active:scale-95 transition-all shadow-lg z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-[#F7F2EA]" />
          </button>

          {/* 5s Auto-progress animation bar */}
          {isAutoPlaying && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
              <motion.div
                key={progressKey}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-gradient-to-r from-[#E8C88A] to-[#67E8F9]"
              />
            </div>
          )}
        </div>

        {/* Thumbnail Dots Bar */}
        <div className="flex items-center justify-center gap-1.5 mt-3 max-w-full overflow-x-auto no-scrollbar py-1 px-2">
          {loverImages.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => handleSelectIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-6 bg-[#E8C88A] shadow-[0_0_8px_#E8C88A]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Next Chapter Button */}
      <div className="relative z-10 flex items-center justify-center mt-3">
        <button
          onClick={onContinue}
          className="px-8 py-3.5 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#E8C88A] via-[#F7F2EA] to-[#67E8F9] shadow-[0_0_25px_rgba(232,200,138,0.35)] hover:shadow-[0_0_40px_rgba(232,200,138,0.6)] active:scale-95 transition-all flex items-center gap-3"
        >
          <span>PROCEED TO SUGGESTIONS 🎮💜</span>
          <ArrowRight className="w-4 h-4 text-[#080810]" />
        </button>
      </div>
    </div>
  );
};
