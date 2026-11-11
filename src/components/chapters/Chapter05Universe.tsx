"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Maximize2, X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { soundManager } from "@/lib/sound";
import { triggerUnoBurst } from "@/lib/confetti";
import { birthdayData } from "@/data/birthday";
import { UniverseCategory } from "@/types/experience";
import { EasterEggEvent } from "../common/EasterEggToast";

interface Chapter05UniverseProps {
  onContinue: () => void;
  onTriggerEasterEgg: (egg: EasterEggEvent) => void;
}

export const Chapter05Universe: React.FC<Chapter05UniverseProps> = ({
  onContinue,
  onTriggerEasterEgg,
}) => {
  const [activeModalItem, setActiveModalItem] = useState<UniverseCategory | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { universe } = birthdayData;

  const handleCardClick = (item: UniverseCategory) => {
    soundManager.playTap();
    // Easter Egg 1: Tapping UNO card
    if (item.id === "uno") {
      triggerUnoBurst();
      soundManager.playEasterEgg();
      onTriggerEasterEgg({
        type: "uno",
        title: "WILD DRAW +4 ACTIVATED!",
        subtitle: "Undefeated champion with the comeback cards. No one escapes the table banter.",
      });
    }
    setActiveModalItem(item);
  };

  const handleScroll = (direction: "left" | "right") => {
    soundManager.playTap();
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between py-16 px-4 sm:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#8B5CF6]/15 via-[#67E8F9]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-widest text-[#67E8F9] uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#67E8F9]" />
          <span>CHAPTER 05 // THE 14 ESSENTIALS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F7F2EA] tracking-tight">
          {universe.headline}
        </h2>
        <p className="text-lg sm:text-2xl font-serif italic text-[#E8C88A] mt-1 glow-gold">
          {universe.subheadline}
        </p>
      </div>

      {/* Scroll Navigation Arrows on Desktop */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto px-2 mb-2">
        <span className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase">
          Swipe or scroll horizontal →
        </span>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => handleScroll("left")}
            className="w-8 h-8 rounded-full glass-panel border border-white/10 flex items-center justify-center text-white hover:border-[#67E8F9]/40 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="w-8 h-8 rounded-full glass-panel border border-white/10 flex items-center justify-center text-white hover:border-[#67E8F9]/40 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Swipeable Card Carousel */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 w-full overflow-x-auto no-scrollbar py-4 flex gap-4 sm:gap-6 snap-x snap-mandatory px-4 max-w-7xl mx-auto"
      >
        {universe.items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCardClick(item)}
            className="relative flex-shrink-0 w-[260px] sm:w-[300px] h-[400px] sm:h-[450px] rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-[#E8C88A]/50 shadow-xl cursor-pointer snap-center group transition-all duration-300 flex flex-col justify-between p-4"
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
              <ImageWithFallback
                src={item.imagePath}
                alt={item.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-[#080810]/40 to-black/30" />
            </div>

            {/* Top Bar with Number & Accent Pill */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white">
                {item.number}
              </span>
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.accent, boxShadow: `0 0 10px ${item.accent}` }}
              />
            </div>

            {/* Bottom Content */}
            <div className="relative z-10">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {item.tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-white/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F7F2EA] group-hover:text-[#E8C88A] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#94A3B8] mt-1 font-light line-clamp-2 leading-relaxed">
                {item.caption}
              </p>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-[11px] font-mono text-[#E8C88A] group-hover:underline">
                  Explore detail
                </span>
                <Maximize2 className="w-3.5 h-3.5 text-[#E8C88A] opacity-70 group-hover:opacity-100" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Continue Section */}
      <div className="relative z-10 flex items-center justify-center mt-6">
        <button
          onClick={onContinue}
          className="px-8 py-3.5 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#67E8F9] via-[#F7F2EA] to-[#E8C88A] shadow-[0_0_25px_rgba(103,232,249,0.3)] hover:shadow-[0_0_40px_rgba(103,232,249,0.5)] active:scale-95 transition-all flex items-center gap-3"
        >
          <span>PROCEED TO CHAPTER 06 // FILM</span>
          <ArrowRight className="w-4 h-4 text-[#080810]" />
        </button>
      </div>

      {/* Fullscreen Immersive Modal View */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl glass-panel border border-[#E8C88A]/30 p-6 sm:p-8 z-10 shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:border-[#E8C88A] transition-colors z-20"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Large Image Showcase */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5">
                <ImageWithFallback
                  src={activeModalItem.imagePath}
                  alt={activeModalItem.title}
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10101C] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                    style={{
                      backgroundColor: `${activeModalItem.accent}25`,
                      color: activeModalItem.accent,
                      border: `1px solid ${activeModalItem.accent}`,
                    }}
                  >
                    ITEM {activeModalItem.number}
                  </span>
                </div>
              </div>

              {/* Modal Details */}
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F7F2EA]">
                {activeModalItem.title}
              </h3>
              <p className="text-sm sm:text-base text-[#E8C88A] font-serif italic mt-1">
                &ldquo;{activeModalItem.caption}&rdquo;
              </p>
              <p className="text-sm text-[#94A3B8] mt-3 leading-relaxed">
                {activeModalItem.quote}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                {activeModalItem.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white/90"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
