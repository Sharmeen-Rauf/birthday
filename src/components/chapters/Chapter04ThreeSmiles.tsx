"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, ArrowRight, Heart } from "lucide-react";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { soundManager } from "@/lib/sound";
import { birthdayData } from "@/data/birthday";
import { SmileCard } from "@/types/experience";

interface Chapter04ThreeSmilesProps {
  onContinue: () => void;
}

export const Chapter04ThreeSmiles: React.FC<Chapter04ThreeSmilesProps> = ({ onContinue }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isSpecialGlow, setIsSpecialGlow] = useState<boolean>(false);
  const { threeSmiles } = birthdayData;

  const currentCard: SmileCard = threeSmiles.cards[selectedIndex];
  const isThirdCard = selectedIndex === 2;

  const handleSelectCard = (index: number) => {
    soundManager.playTap();
    setSelectedIndex(index);
    if (index === 2) {
      setIsSpecialGlow(true);
      soundManager.playChime();
    } else {
      setIsSpecialGlow(false);
    }
  };

  const handleNext = () => {
    if (selectedIndex < threeSmiles.cards.length - 1) {
      handleSelectCard(selectedIndex + 1);
    } else {
      onContinue();
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      handleSelectCard(selectedIndex - 1);
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between py-16 px-4 sm:px-6 overflow-hidden">
      {/* Background Golden Glow when Card 3 is selected */}
      <motion.div
        animate={{
          opacity: isSpecialGlow ? 0.35 : 0.05,
          scale: isSpecialGlow ? 1.2 : 0.8,
        }}
        transition={{ duration: 1.2 }}
        className="absolute w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-gradient-to-tr from-[#E8C88A] via-[#F3A6C8] to-[#8B5CF6] rounded-full blur-[140px] pointer-events-none"
      />

      {/* Header */}
      <div className="relative z-10 text-center max-w-xl">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-mono tracking-widest text-[#E8C88A] uppercase block mb-1"
        >
          CHAPTER 04 // HONEST PORTRAITS
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#F7F2EA]"
        >
          {threeSmiles.headline}
        </motion.h2>
      </div>

      {/* Tab Switcher for Quick Access */}
      <div className="relative z-10 flex items-center justify-center gap-2 mt-4 mb-2">
        {threeSmiles.cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => handleSelectCard(idx)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
              selectedIndex === idx
                ? idx === 2
                  ? "bg-[#E8C88A] text-black font-bold shadow-[0_0_15px_rgba(232,200,138,0.5)] scale-105"
                  : "bg-[#8B5CF6] text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.5)] scale-105"
                : "glass-pill text-[#94A3B8] hover:text-white"
            }`}
          >
            {idx === 2 && <Sparkles className="w-3 h-3 text-black" />}
            <span>0{idx + 1}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Card Showcase */}
      <div className="relative z-10 w-full max-w-md sm:max-w-xl my-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset }) => {
              if (offset.x < -45) {
                handleNext();
              } else if (offset.x > 45) {
                handlePrev();
              }
            }}
            initial={{ opacity: 0, x: 25, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -25, scale: 0.96 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`relative rounded-3xl overflow-hidden glass-panel border transition-all duration-700 p-4 sm:p-6 shadow-2xl cursor-grab active:cursor-grabbing select-none ${
              isThirdCard
                ? "border-[#E8C88A]/50 shadow-[0_0_40px_rgba(232,200,138,0.25)] ring-1 ring-[#E8C88A]/30"
                : "border-white/10"
            }`}
          >
            {/* Aspect Ratio Photo Container */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden group">
              <ImageWithFallback
                src={currentCard.imagePath}
                alt={currentCard.title}
                fill
                priority
                className={`object-cover object-center transition-transform duration-1000 ${
                  isThirdCard ? "scale-105" : "scale-100 group-hover:scale-105"
                }`}
              />

              {/* Gradient Bottom Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-transparent to-transparent opacity-80" />

              {/* Tag pill */}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase border ${
                    isThirdCard
                      ? "bg-[#E8C88A]/20 border-[#E8C88A] text-[#E8C88A]"
                      : "bg-black/40 border-white/20 text-[#67E8F9]"
                  }`}
                >
                  {currentCard.tag}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="mt-4 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#E8C88A] uppercase tracking-wider block">
                  {currentCard.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F7F2EA] mt-0.5">
                  {currentCard.title}
                </h3>
                <p className="text-sm text-[#94A3B8] mt-2 font-light leading-relaxed max-w-md">
                  {currentCard.description}
                </p>
              </div>
            </div>

            {/* Special Climax message on Card 3 */}
            {isThirdCard && currentCard.climaxMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 pt-4 border-t border-[#E8C88A]/20 text-center"
              >
                <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-serif italic text-[#E8C88A] glow-gold">
                  <Heart className="w-3.5 h-3.5 fill-[#E8C88A] text-[#E8C88A]" />
                  <span>&ldquo;{currentCard.climaxMessage}&rdquo;</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-md sm:max-w-xl pt-2">
        <button
          onClick={handlePrev}
          disabled={selectedIndex === 0}
          className="p-3 rounded-full glass-panel border border-white/10 text-white disabled:opacity-30 disabled:pointer-events-none hover:border-[#67E8F9]/40 transition-all active:scale-95"
          aria-label="Previous smile"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase">
          0{selectedIndex + 1} / 0{threeSmiles.cards.length}
        </span>

        {selectedIndex < threeSmiles.cards.length - 1 ? (
          <button
            onClick={handleNext}
            className="p-3 rounded-full glass-panel border border-white/10 text-white hover:border-[#E8C88A]/40 transition-all active:scale-95"
            aria-label="Next smile"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onContinue}
            className="px-5 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase font-semibold text-[#080810] bg-[#E8C88A] hover:bg-[#F7F2EA] shadow-[0_0_20px_rgba(232,200,138,0.4)] active:scale-95 transition-all flex items-center gap-2"
          >
            <span>NEXT CHAPTER</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

