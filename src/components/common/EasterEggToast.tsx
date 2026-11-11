"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, Terminal } from "lucide-react";

export interface EasterEggEvent {
  type: "uno" | "gaming" | "kaszsoft";
  title: string;
  subtitle: string;
}

interface EasterEggToastProps {
  egg: EasterEggEvent | null;
  onClose: () => void;
}

export const EasterEggToast: React.FC<EasterEggToastProps> = ({ egg, onClose }) => {
  return (
    <AnimatePresence>
      {egg && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
          {/* Backdrop flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 18, stiffness: 260 }}
            className="relative pointer-events-auto max-w-sm w-full mx-auto p-5 rounded-2xl glass-panel border border-[#E8C88A]/30 shadow-2xl text-center overflow-hidden"
          >
            {/* Top glowing ambient highlight */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-24 bg-[#8B5CF6]/30 blur-2xl rounded-full" />

            {egg.type === "uno" && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-red-600 via-amber-500 to-blue-600 flex items-center justify-center shadow-lg transform -rotate-6 mb-3 border-2 border-white">
                  <span className="text-white font-black text-2xl tracking-tighter drop-shadow">+4</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px] font-mono tracking-wider uppercase mb-1">
                  <Sparkles className="w-3 h-3 text-rose-400" />
                  EASTER EGG UNLOCKED
                </div>
                <h3 className="text-xl font-bold text-[#F7F2EA] mt-1">{egg.title}</h3>
                <p className="text-xs text-[#94A3B8] mt-1">{egg.subtitle}</p>
              </div>
            )}

            {egg.type === "gaming" && (
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#67E8F9] flex items-center justify-center shadow-lg mb-3">
                  <Trophy className="w-7 h-7 text-black" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-mono tracking-wider uppercase mb-1">
                  <Trophy className="w-3 h-3 text-purple-400" />
                  ACHIEVEMENT UNLOCKED
                </div>
                <h3 className="text-xl font-bold text-[#F7F2EA] mt-1">{egg.title}</h3>
                <p className="text-xs text-[#94A3B8] mt-1">{egg.subtitle}</p>
              </div>
            )}

            {egg.type === "kaszsoft" && (
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#10101C] to-[#1E1E2E] border border-[#67E8F9]/40 flex items-center justify-center shadow-lg mb-3">
                  <Terminal className="w-7 h-7 text-[#67E8F9]" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono tracking-wider uppercase mb-1">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  FOUNDER TELEMETRY
                </div>
                <h3 className="text-xl font-bold text-[#67E8F9] mt-1 font-mono">{egg.title}</h3>
                <p className="text-xs text-[#94A3B8] mt-1">{egg.subtitle}</p>
              </div>
            )}

            <button
              onClick={onClose}
              className="mt-4 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[#E8C88A] hover:text-white transition-colors"
            >
              [ Tap to close ]
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
