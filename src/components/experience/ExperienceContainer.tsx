"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChapterId } from "@/types/experience";
import { birthdayData } from "@/data/birthday";
import { soundManager } from "@/lib/sound";

import { Navbar } from "../common/Navbar";
import { BackgroundParticles } from "../common/BackgroundParticles";
import { EasterEggToast, EasterEggEvent } from "../common/EasterEggToast";
import { ChapterDrawer } from "./ChapterDrawer";

import { Chapter01Invitation } from "../chapters/Chapter01Invitation";
import { Chapter02Celebration } from "../chapters/Chapter02Celebration";
import { Chapter03Cake } from "../chapters/Chapter03Cake";
import { Chapter04ThreeSmiles } from "../chapters/Chapter04ThreeSmiles";
import { Chapter05Universe } from "../chapters/Chapter05Universe";
import { Chapter06Film } from "../chapters/Chapter06Film";
import { Chapter07GamingSetup } from "../chapters/Chapter07GamingSetup";
import { Chapter08NextDrive } from "../chapters/Chapter08NextDrive";
import { Chapter09Kaszsoft } from "../chapters/Chapter09Kaszsoft";
import { Chapter10FinalLetter } from "../chapters/Chapter10FinalLetter";

export const ExperienceContainer: React.FC = () => {
  const [currentChapter, setCurrentChapter] = useState<ChapterId>(1);
  const [maxUnlockedChapter, setMaxUnlockedChapter] = useState<ChapterId>(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activeEasterEgg, setActiveEasterEgg] = useState<EasterEggEvent | null>(null);

  const goToChapter = (id: ChapterId) => {
    setCurrentChapter(id);
    if (id > maxUnlockedChapter) {
      setMaxUnlockedChapter(id);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextChapter = () => {
    if (currentChapter < 10) {
      goToChapter((currentChapter + 1) as ChapterId);
    }
  };

  const handleReplay = () => {
    goToChapter(1);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDrawerOpen(false);
        setActiveEasterEgg(null);
      } else if (e.key === "m" || e.key === "M") {
        soundManager.toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const particleIntensity =
    currentChapter === 2
      ? "celebration"
      : currentChapter === 5 || currentChapter === 7
      ? "medium"
      : "subtle";

  const particleColor =
    currentChapter === 4
      ? "#F3A6C8"
      : currentChapter === 9
      ? "#67E8F9"
      : currentChapter === 7
      ? "#8B5CF6"
      : "#E8C88A";

  return (
    <main className="relative min-h-[100dvh] w-full bg-[#080810] text-[#F7F2EA] flex flex-col justify-between overflow-x-hidden selection:bg-[#8B5CF6]/40 selection:text-[#E8C88A]">
      {/* Background stars & celestial particles */}
      <BackgroundParticles intensity={particleIntensity} accentColor={particleColor} />

      {/* Top Navigation Bar */}
      <Navbar
        currentChapter={currentChapter}
        totalChapters={birthdayData.chapters.length}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onSelectChapter={goToChapter}
      />

      {/* Chapter View Transition Container */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex-1 flex flex-col justify-center"
          >
            {currentChapter === 1 && (
              <Chapter01Invitation onUnlock={() => goToChapter(2)} />
            )}
            {currentChapter === 2 && (
              <Chapter02Celebration onContinue={() => goToChapter(3)} />
            )}
            {currentChapter === 3 && (
              <Chapter03Cake onContinue={() => goToChapter(4)} />
            )}
            {currentChapter === 4 && (
              <Chapter04ThreeSmiles onContinue={() => goToChapter(5)} />
            )}
            {currentChapter === 5 && (
              <Chapter05Universe
                onContinue={() => goToChapter(6)}
                onTriggerEasterEgg={(egg) => setActiveEasterEgg(egg)}
              />
            )}
            {currentChapter === 6 && (
              <Chapter06Film onContinue={() => goToChapter(7)} />
            )}
            {currentChapter === 7 && (
              <Chapter07GamingSetup
                onContinue={() => goToChapter(8)}
                onTriggerEasterEgg={(egg) => setActiveEasterEgg(egg)}
              />
            )}
            {currentChapter === 8 && (
              <Chapter08NextDrive onContinue={() => goToChapter(9)} />
            )}
            {currentChapter === 9 && (
              <Chapter09Kaszsoft
                onContinue={() => goToChapter(10)}
                onTriggerEasterEgg={(egg) => setActiveEasterEgg(egg)}
              />
            )}
            {currentChapter === 10 && (
              <Chapter10FinalLetter onReplay={handleReplay} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Chapter Drawer for Direct Navigation */}
      <ChapterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentChapter={currentChapter}
        maxUnlockedChapter={maxUnlockedChapter}
        onSelectChapter={goToChapter}
      />

      {/* Easter Egg Floating Overlay */}
      <EasterEggToast
        egg={activeEasterEgg}
        onClose={() => setActiveEasterEgg(null)}
      />
    </main>
  );
};
