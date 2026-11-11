"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  Cpu,
  Monitor,
  Keyboard,
  Headphones,
  Coffee,
  ArrowRight,
  Flame,
} from "lucide-react";
import { soundManager } from "@/lib/sound";
import { birthdayData } from "@/data/birthday";
import { EasterEggEvent } from "../common/EasterEggToast";
import { GamingHotspot } from "@/types/experience";

interface Chapter07GamingSetupProps {
  onContinue: () => void;
  onTriggerEasterEgg: (egg: EasterEggEvent) => void;
}

export const Chapter07GamingSetup: React.FC<Chapter07GamingSetupProps> = ({
  onContinue,
  onTriggerEasterEgg,
}) => {
  const [isIlluminated, setIsIlluminated] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<GamingHotspot | null>(null);
  const [keyboardMode, setKeyboardMode] = useState<number>(0);
  const [fansBoosting, setFansBoosting] = useState<boolean>(false);
  const [wallpaperIndex, setWallpaperIndex] = useState<number>(0);
  const [projectorActive, setProjectorActive] = useState<boolean>(false);
  const [coffeeSteaming, setCoffeeSteaming] = useState<boolean>(false);

  const { gamingSetup } = birthdayData;

  const handleLightUp = () => {
    setIsIlluminated(true);
    soundManager.playCelebrationArpeggio();
  };

  const handleHotspotClick = (spot: GamingHotspot) => {
    soundManager.playTap();
    setActiveItem(spot);

    if (spot.id === "pc") {
      setFansBoosting(true);
      setTimeout(() => setFansBoosting(false), 3000);
    } else if (spot.id === "monitor") {
      setWallpaperIndex((prev) => (prev + 1) % 3);
      // Easter Egg 2
      soundManager.playEasterEgg();
      onTriggerEasterEgg({
        type: "gaming",
        title: "ACHIEVEMENT UNLOCKED",
        subtitle: "Birthday Boy: Max stats in ambition, gaming reflexes, and late-night coding.",
      });
    } else if (spot.id === "keyboard") {
      setKeyboardMode((prev) => (prev + 1) % 4);
    } else if (spot.id === "projector") {
      setProjectorActive((prev) => !prev);
    } else if (spot.id === "coffee") {
      setCoffeeSteaming(true);
      setTimeout(() => setCoffeeSteaming(false), 3500);
    }
  };

  const rgbGradients = [
    "from-violet-600 via-fuchsia-500 to-indigo-600",
    "from-cyan-400 via-blue-500 to-teal-400",
    "from-amber-400 via-yellow-500 to-orange-500",
    "from-rose-500 via-purple-500 to-cyan-500",
  ];

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between py-16 px-4 sm:px-6 overflow-hidden">
      {/* Dynamic Ceiling Galaxy Projector Effect */}
      {projectorActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-radial from-[#8B5CF6]/30 via-[#67E8F9]/20 to-transparent pointer-events-none blur-3xl animate-pulse-glow"
        />
      )}

      {/* Header */}
      <div className="relative z-10 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-widest text-[#8B5CF6] uppercase mb-2">
          <Zap className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>CHAPTER 07 // BATTLESTATION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F7F2EA]">
          {gamingSetup.headline}
        </h2>
        <p className="text-sm sm:text-base font-mono text-[#94A3B8] mt-1 uppercase tracking-wider">
          {gamingSetup.subheadline}
        </p>
      </div>

      {/* Main Interactive Room Visual */}
      <div className="relative z-10 w-full max-w-4xl mx-auto my-6">
        {!isIlluminated ? (
          /* Dark Room State */
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl bg-[#06060C] border border-white/5 flex flex-col items-center justify-center p-6 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-[#94A3B8]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F7F2EA]">
              The Room Is Dark.
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 max-w-xs font-light">
              Your dream setup is dormant. Ready to bring the atmosphere to life?
            </p>
            <button
              onClick={handleLightUp}
              className="mt-6 px-7 py-3.5 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#8B5CF6] via-[#67E8F9] to-[#E8C88A] shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#080810]" />
              <span>{gamingSetup.initialButtonText}</span>
            </button>
          </div>
        ) : (
          /* Illuminated Room State */
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl bg-[#0B0C16] border border-[#8B5CF6]/30 overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.2)] p-4 sm:p-6 flex flex-col justify-between">
            {/* Ambient Wall RGB Strip */}
            <div
              className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${rgbGradients[keyboardMode]} blur-sm transition-all duration-700`}
            />

            {/* Ceiling Projector Nebula */}
            {projectorActive && (
              <div className="absolute top-4 right-10 w-48 h-32 bg-gradient-to-br from-indigo-500/20 via-purple-500/25 to-pink-500/20 blur-2xl rounded-full" />
            )}

            {/* Interactive Room Visual Layout */}
            <div className="relative w-full h-full flex flex-col justify-between">
              {/* Top row: Wall elements */}
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-[10px] font-mono text-[#94A3B8]">
                  <span>BOOKSHELF &amp; MANGA</span>
                  <div className="w-16 h-1 bg-amber-600/40 rounded mt-1" />
                </div>

                {/* Projector Hotspot */}
                <button
                  onClick={() =>
                    handleHotspotClick(gamingSetup.hotspots.find((h) => h.id === "projector")!)
                  }
                  className={`p-2 rounded-xl border transition-all ${
                    projectorActive
                      ? "bg-[#8B5CF6]/30 border-[#8B5CF6] text-white shadow-[0_0_15px_#8B5CF6]"
                      : "bg-black/40 border-white/10 text-[#94A3B8]"
                  }`}
                  title="Galaxy Projector"
                >
                  <Sparkles className="w-5 h-5 text-[#67E8F9]" />
                </button>
              </div>

              {/* Center: Monitors & PC setup */}
              <div className="flex items-center justify-around w-full my-auto px-2">
                {/* Headphones on Stand */}
                <button
                  onClick={() =>
                    handleHotspotClick(gamingSetup.hotspots.find((h) => h.id === "headphones")!)
                  }
                  className="flex flex-col items-center group"
                >
                  <div className="w-10 h-10 rounded-full bg-black/50 border border-white/10 group-hover:border-[#67E8F9] flex items-center justify-center transition-all">
                    <Headphones className="w-5 h-5 text-[#67E8F9]" />
                  </div>
                  <span className="text-[9px] font-mono text-[#94A3B8] mt-1">Audio</span>
                </button>

                {/* Dual Monitors */}
                <button
                  onClick={() =>
                    handleHotspotClick(gamingSetup.hotspots.find((h) => h.id === "monitor")!)
                  }
                  className="flex flex-col items-center group relative cursor-pointer"
                >
                  <div className="w-40 sm:w-60 h-24 sm:h-32 rounded-xl bg-gradient-to-br from-[#101026] to-[#0A0A14] border-2 border-[#8B5CF6]/50 shadow-[0_0_20px_rgba(139,92,246,0.3)] flex flex-col items-center justify-center p-2 relative overflow-hidden group-hover:border-[#67E8F9] transition-all">
                    {/* Screen Content */}
                    <div className="absolute inset-0 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />
                    <Monitor className="w-7 h-7 sm:w-9 sm:h-9 text-[#67E8F9] mb-1" />
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-[#F7F2EA]">
                      WALLPAPER #{wallpaperIndex + 1}
                    </span>
                    <span className="text-[9px] font-mono text-[#E8C88A]">
                      Tap to switch scene
                    </span>
                  </div>
                  {/* Stand */}
                  <div className="w-8 h-4 bg-zinc-800 border-x border-zinc-700" />
                  <div className="w-16 h-1 bg-zinc-700 rounded-full" />
                </button>

                {/* PC Tower */}
                <button
                  onClick={() =>
                    handleHotspotClick(gamingSetup.hotspots.find((h) => h.id === "pc")!)
                  }
                  className="flex flex-col items-center group"
                >
                  <div
                    className={`w-14 sm:w-20 h-24 sm:h-32 rounded-xl bg-black/80 border transition-all flex flex-col items-center justify-around p-2 ${
                      fansBoosting
                        ? "border-[#67E8F9] shadow-[0_0_25px_rgba(103,232,249,0.7)]"
                        : "border-[#8B5CF6]/40 group-hover:border-[#8B5CF6]"
                    }`}
                  >
                    <Cpu className={`w-5 h-5 ${fansBoosting ? "text-[#67E8F9] animate-spin" : "text-[#8B5CF6]"}`} />
                    <div className="w-full h-1 bg-[#8B5CF6] rounded-full animate-pulse" />
                    <div className="w-full h-1 bg-[#67E8F9] rounded-full animate-pulse" />
                    <span className="text-[8px] font-mono text-[#94A3B8]">RTX RIG</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#94A3B8] mt-1">PC Tower</span>
                </button>
              </div>

              {/* Bottom: Desk, Keyboard & Coffee */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                {/* Coffee Mug */}
                <button
                  onClick={() =>
                    handleHotspotClick(gamingSetup.hotspots.find((h) => h.id === "coffee")!)
                  }
                  className="flex items-center gap-1.5 p-1.5 rounded-lg bg-black/40 border border-white/5 hover:border-amber-500/40 transition-colors"
                >
                  <Coffee className="w-4 h-4 text-amber-500" />
                  <span className="text-[10px] font-mono text-[#94A3B8]">
                    {coffeeSteaming ? "Brewing steam..." : "Espresso"}
                  </span>
                </button>

                {/* Keyboard RGB Switcher */}
                <button
                  onClick={() =>
                    handleHotspotClick(gamingSetup.hotspots.find((h) => h.id === "keyboard")!)
                  }
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 hover:border-[#E8C88A] transition-all"
                >
                  <Keyboard className="w-4 h-4 text-[#E8C88A]" />
                  <span className="text-[10px] font-mono text-[#F7F2EA]">
                    KEYBOARD RGB: MODE 0{keyboardMode + 1}
                  </span>
                </button>

                {/* Anime Figurine */}
                <div className="flex items-center gap-1 text-[10px] font-mono text-[#8B5CF6]">
                  <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
                  <span>COLLECTIBLES</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hotspot feedback modal banner */}
        {activeItem && isIlluminated && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 rounded-2xl glass-panel border border-[#67E8F9]/30 flex items-center justify-between text-xs font-mono"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#67E8F9] animate-pulse" />
              <span className="text-[#F7F2EA] font-bold">{activeItem.name}:</span>
              <span className="text-[#94A3B8]">{activeItem.resultMessage}</span>
            </div>
            <button
              onClick={() => setActiveItem(null)}
              className="text-[#94A3B8] hover:text-white uppercase tracking-wider ml-2"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </div>

      {/* Main Caption & Supporting Line */}
      <div className="relative z-10 text-center max-w-lg mx-auto flex flex-col items-center">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#E8C88A] glow-gold">
          &ldquo;{gamingSetup.mainCaption}&rdquo;
        </h3>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 font-light">
          {gamingSetup.supportingLine}
        </p>

        <button
          onClick={onContinue}
          className="mt-6 px-8 py-3.5 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#E8C88A] via-[#F7F2EA] to-[#67E8F9] shadow-[0_0_25px_rgba(232,200,138,0.3)] hover:shadow-[0_0_40px_rgba(232,200,138,0.5)] active:scale-95 transition-all flex items-center gap-3"
        >
          <span>PROCEED TO CHAPTER 08 // THE ROAD</span>
          <ArrowRight className="w-4 h-4 text-[#080810]" />
        </button>
      </div>
    </div>
  );
};
