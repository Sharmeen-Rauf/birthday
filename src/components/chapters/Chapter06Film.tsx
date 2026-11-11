"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Maximize, Sparkles, ArrowRight, Film } from "lucide-react";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { soundManager } from "@/lib/sound";
import { birthdayData } from "@/data/birthday";

interface Chapter06FilmProps {
  onContinue: () => void;
}

export const Chapter06Film: React.FC<Chapter06FilmProps> = ({ onContinue }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { cinematicFilm } = birthdayData;

  const handleTogglePlay = () => {
    soundManager.playTap();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasEnded(false);
        })
        .catch(() => {
          // If video file is not yet dropped in, show fallback interactive cinema sequence
          setHasVideoError(true);
          setIsPlaying(true);
        });
    }
  };

  const handleReplay = () => {
    soundManager.playTap();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      setHasEnded(false);
    }
  };

  const handleFullscreen = () => {
    soundManager.playTap();
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        containerRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between py-16 px-4 sm:px-6 overflow-hidden">
      {/* Background ambient cinema glow */}
      <div className="absolute w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-gradient-to-tr from-[#8B5CF6]/20 via-[#67E8F9]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-widest text-[#E8C88A] uppercase mb-2">
          <Film className="w-3.5 h-3.5 text-[#E8C88A]" />
          <span>CHAPTER 06 // CINEMATIC CHRONICLE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F7F2EA] tracking-tight">
          {cinematicFilm.headline}
        </h2>
        <p className="text-base sm:text-xl font-serif italic text-[#67E8F9] mt-1 glow-cyan">
          {cinematicFilm.subheadline}
        </p>
      </div>

      {/* Responsive 9:16 Mobile-Optimized Video Theatre Container */}
      <div
        ref={containerRef}
        className="relative z-10 my-6 w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-3xl overflow-hidden glass-panel border border-[#8B5CF6]/40 shadow-[0_0_50px_rgba(139,92,246,0.25)] flex flex-col justify-between p-3 group"
      >
        {/* Actual Video or Fallback Poster */}
        {!hasVideoError ? (
          <video
            ref={videoRef}
            src={cinematicFilm.videoPath}
            poster={cinematicFilm.fallbackPosterPath}
            playsInline
            controls={false}
            onEnded={() => {
              setIsPlaying(false);
              setHasEnded(true);
            }}
            onError={() => setHasVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
          />
        ) : (
          /* High-aesthetic Cinematic Simulator if MP4 not yet placed */
          <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col items-center justify-center p-6 text-center">
            <ImageWithFallback
              src={cinematicFilm.fallbackPosterPath}
              alt="Film Poster"
              fill
              priority
              className="object-cover object-center opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-black/50 to-[#080810]/70" />

            <div className="relative z-10 p-5 rounded-2xl glass-panel border border-[#E8C88A]/30">
              <Sparkles className="w-8 h-8 text-[#E8C88A] mx-auto mb-2 animate-pulse" />
              <h4 className="text-lg font-serif font-bold text-[#F7F2EA]">
                Cinematic Premiere
              </h4>
              <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                Ready for your Google Flow film! Drop <code className="text-[#67E8F9]">birthday-film.mp4</code> into <code className="text-[#67E8F9]">public/videos/</code> to stream the final cut.
              </p>
            </div>
          </div>
        )}

        {/* Top Controls Overlay */}
        <div className="relative z-20 flex items-center justify-between p-2">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-white uppercase">
            9:16 PREVIEW // 4K FLOW
          </span>
          <button
            onClick={handleFullscreen}
            className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-[#67E8F9] transition-colors"
            aria-label="Toggle Fullscreen"
          >
            <Maximize className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center Play Button Overlay */}
        <div className="relative z-20 flex items-center justify-center">
          {!isPlaying && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleTogglePlay}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#8B5CF6] via-[#67E8F9] to-[#E8C88A] p-[2px] shadow-[0_0_40px_rgba(103,232,249,0.5)] flex items-center justify-center"
              aria-label="Play birthday film"
            >
              <div className="w-full h-full rounded-full bg-[#080810]/80 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 text-[#F7F2EA] fill-[#F7F2EA] ml-1" />
              </div>
            </motion.button>
          )}
        </div>

        {/* Bottom Playback Bar */}
        <div className="relative z-20 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
          <button
            onClick={handleTogglePlay}
            className="flex items-center gap-2 text-xs font-mono text-[#F7F2EA] hover:text-[#E8C88A] transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 text-[#67E8F9]" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-[#E8C88A]" />
                <span>PLAY</span>
              </>
            )}
          </button>

          {(isPlaying || hasEnded) && (
            <button
              onClick={handleReplay}
              className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>REPLAY</span>
            </button>
          )}
        </div>
      </div>

      {/* Discovery Next Prompt */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <p className="text-xs font-mono tracking-widest text-[#94A3B8] uppercase mb-3">
          There&apos;s still one more thing...
        </p>
        <button
          onClick={onContinue}
          className="px-8 py-3.5 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#8B5CF6] via-[#F7F2EA] to-[#67E8F9] shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] active:scale-95 transition-all flex items-center gap-3"
        >
          <span>{cinematicFilm.buttonText}</span>
          <ArrowRight className="w-4 h-4 text-[#080810]" />
        </button>
      </div>
    </div>
  );
};

