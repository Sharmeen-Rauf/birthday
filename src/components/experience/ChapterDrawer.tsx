"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2 } from "lucide-react";
import { ChapterId } from "@/types/experience";
import { birthdayData } from "@/data/birthday";
import { soundManager } from "@/lib/sound";

interface ChapterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentChapter: ChapterId;
  maxUnlockedChapter: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
}

export const ChapterDrawer: React.FC<ChapterDrawerProps> = ({
  isOpen,
  onClose,
  currentChapter,
  onSelectChapter,
}) => {
  const handleSelect = (id: ChapterId) => {
    soundManager.playTap();
    onSelectChapter(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-sm sm:max-w-md h-full bg-[#10101C]/95 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col z-10 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#8B5CF6] uppercase block">
                  Interactive Universe Index
                </span>
                <h2 className="text-xl font-bold text-[#F7F2EA] font-serif">
                  Murtaza&apos;s Chapters
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-9 h-9 rounded-full glass-panel border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chapter List */}
            <div className="py-6 space-y-2 flex-1">
              {birthdayData.chapters.map((ch) => {
                const isActive = ch.id === currentChapter;
                return (
                  <button
                    key={ch.id}
                    onClick={() => handleSelect(ch.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                      isActive
                        ? "bg-[#8B5CF6]/15 border-[#8B5CF6]/50 shadow-lg shadow-[#8B5CF6]/10"
                        : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-1 rounded-md border ${
                          isActive
                            ? "bg-[#8B5CF6] text-black border-[#8B5CF6]"
                            : "bg-white/5 text-[#94A3B8] border-white/10 group-hover:text-white"
                        }`}
                      >
                        {ch.code}
                      </span>
                      <div>
                        <h4
                          className={`text-sm font-semibold transition-colors ${
                            isActive
                              ? "text-[#E8C88A]"
                              : "text-[#F7F2EA] group-hover:text-[#67E8F9]"
                          }`}
                        >
                          {ch.title}
                        </h4>
                        <p className="text-xs text-[#94A3B8] line-clamp-1">
                          {ch.subtitle}
                        </p>
                      </div>
                    </div>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[#E8C88A] animate-pulse" />
                    ) : (
                      <span className="text-xs text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity">
                        Go →
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/10 text-center">
              <p className="text-xs text-[#94A3B8] font-mono">
                MURTAZA.EXE • 2026 SPECIAL EDITION
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
