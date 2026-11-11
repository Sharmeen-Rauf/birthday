"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Menu, Compass } from "lucide-react";
import { soundManager } from "@/lib/sound";
import { ChapterId } from "@/types/experience";
import { birthdayData } from "@/data/birthday";

interface NavbarProps {
  currentChapter: ChapterId;
  totalChapters: number;
  onOpenDrawer: () => void;
  onSelectChapter?: (id: ChapterId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentChapter,
  totalChapters,
  onOpenDrawer,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playTap();
    }
  };

  const currentChapterMeta = birthdayData.chapters.find((c) => c.id === currentChapter);
  const currentChapterFormatted = currentChapter < 10 ? `0${currentChapter}` : `${currentChapter}`;
  const totalChaptersFormatted = totalChapters < 10 ? `0${totalChapters}` : `${totalChapters}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 sm:px-8 sm:py-4 flex items-center justify-between pointer-events-none">
      {/* Brand title */}
      <div className="pointer-events-auto flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-white/10 hover:border-[#8B5CF6]/40 transition-colors">
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#F7F2EA]">
            MURTAZA<span className="text-[#8B5CF6]">.EXE</span>
          </span>
        </div>
      </div>

      {/* Center Chapter indicator (visible when chapter > 1) */}
      {currentChapter > 1 && (
        <div className="pointer-events-auto hidden sm:flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#E8C88A]/20">
          <span className="text-[11px] font-mono tracking-widest text-[#E8C88A]">
            CHAPTER {currentChapterFormatted} / {totalChaptersFormatted}
          </span>
          <span className="text-[11px] text-[#94A3B8]">•</span>
          <span className="text-[11px] font-mono text-[#94A3B8] max-w-[140px] truncate">
            {currentChapterMeta?.title}
          </span>
        </div>
      )}

      {/* Right controls */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Mobile current chapter pill */}
        <div className="sm:hidden px-2.5 py-1 rounded-full glass-panel border border-[#E8C88A]/20">
          <span className="text-[10px] font-mono tracking-widest text-[#E8C88A]">
            {currentChapterFormatted} / {totalChaptersFormatted}
          </span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={handleToggleSound}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          className="relative w-9 h-9 rounded-full glass-panel border border-white/10 hover:border-[#E8C88A]/40 flex items-center justify-center text-[#F7F2EA] transition-all hover:scale-105 active:scale-95"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-[#94A3B8]" />
          ) : (
            <div className="flex items-center gap-[2px]">
              <span className="w-[2px] h-3 bg-[#E8C88A] rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
              <span className="w-[2px] h-4 bg-[#67E8F9] rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
              <span className="w-[2px] h-2.5 bg-[#8B5CF6] rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
              <Volume2 className="w-3.5 h-3.5 ml-0.5 text-[#E8C88A]" />
            </div>
          )}
        </button>

        {/* Chapter navigation drawer button */}
        <button
          onClick={onOpenDrawer}
          aria-label="Open chapters index"
          className="w-9 h-9 rounded-full glass-panel border border-white/10 hover:border-[#8B5CF6]/40 flex items-center justify-center text-[#F7F2EA] transition-all hover:scale-105 active:scale-95"
        >
          <Compass className="w-4 h-4 text-[#67E8F9]" />
        </button>
      </div>
    </header>
  );
};

