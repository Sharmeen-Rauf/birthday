"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  ArrowRight,
  Maximize,
  PartyPopper,
  Flame,
} from "lucide-react";
import { soundManager } from "@/lib/sound";

interface Chapter10FunnyVideoProps {
  onContinue: () => void;
}

export const Chapter10FunnyVideo: React.FC<Chapter10FunnyVideoProps> = ({
  onContinue,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play video immediately upon entering this chapter
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Fallback to muted autoplay if browser blocks audio
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
    }
  }, []);

  const handleTogglePlay = () => {
    soundManager.playTap();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleToggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundManager.playTap();
    if (!videoRef.current) return;

    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between py-6 px-3 sm:px-6 overflow-hidden bg-[#080612]">
      {/* Festive Vibrant Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-gradient-to-tr from-[#EC4899]/20 via-[#8B5CF6]/20 to-[#67E8F9]/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 text-center max-w-lg mx-auto pt-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-[#EC4899]/40 text-xs font-mono tracking-widest text-[#F472B6] uppercase mb-1 shadow-sm"
        >
          <PartyPopper className="w-3.5 h-3.5 text-[#F472B6]" />
          <span>CHAPTER 10 // UNFILTERED CELEBRATION</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-[#F7F2EA] flex items-center justify-center gap-2"
        >
          <span>It&apos;s My Birthday Boyyy!</span>
          <span className="text-xl sm:text-3xl">🎉🤍</span>
        </motion.h2>
      </div>

      {/* Center Layout: Video Theatre + Fun Dedication Card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto my-auto flex flex-col items-center gap-3">
        {/* Compact Auto-playing Video Container (Mobile-First Zero-Scroll) */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onClick={handleTogglePlay}
          className="relative w-full aspect-[9/16] sm:aspect-square max-h-[46vh] sm:max-h-[50vh] rounded-3xl overflow-hidden glass-panel border border-[#EC4899]/40 shadow-[0_0_45px_rgba(236,72,153,0.3)] cursor-pointer group bg-black/85 flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src="/videos/funny-video-celebrate.mp4"
            autoPlay
            loop
            playsInline
            muted={isMuted}
            className="w-full h-full object-contain"
          />

          {/* Top Video Controls: Unmute Button + Fullscreen */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-20">
            {isMuted ? (
              <button
                onClick={handleToggleMute}
                className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#F472B6]/60 text-[11px] font-mono tracking-wider text-[#F472B6] hover:bg-[#EC4899]/20 transition-all animate-pulse"
                aria-label="Unmute Video"
              >
                <VolumeX className="w-3.5 h-3.5 text-[#F472B6]" />
                <span>TAP FOR SOUND</span>
              </button>
            ) : (
              <button
                onClick={handleToggleMute}
                className="pointer-events-auto w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 hover:text-white transition-colors"
                aria-label="Mute Video"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#67E8F9]" />
              </button>
            )}

            <button
              onClick={handleFullscreen}
              className="pointer-events-auto w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-[#F472B6] transition-colors"
              aria-label="Toggle Fullscreen"
            >
              <Maximize className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center Play Button Overlay when Paused */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-20">
              <div className="w-14 h-14 rounded-full bg-[#EC4899]/90 flex items-center justify-center text-white shadow-[0_0_25px_#EC4899]">
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </div>
            </div>
          )}
        </motion.div>

        {/* Fun Note Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full p-4 rounded-2xl glass-panel border border-[#EC4899]/30 bg-[#120A1A]/85 shadow-lg text-center space-y-1.5"
        >
          <p className="text-xs sm:text-sm text-[#F7F2EA] leading-relaxed font-light">
            Ye video dekhne k baad u can&apos;t say k mai chill act krti... <span className="inline-block">😂💃</span>
          </p>
          <p className="text-sm sm:text-base font-serif font-bold text-[#E8C88A] glow-gold flex items-center justify-center gap-1.5">
            <span>Its my Birthday Boyyy!</span>
            <span className="text-sm">✨🤍</span>
          </p>
        </motion.div>
      </div>

      {/* Bottom Continue Action */}
      <div className="relative z-10 flex items-center justify-center pb-2">
        <button
          onClick={onContinue}
          className="px-8 py-3.5 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#F472B6] via-[#F7F2EA] to-[#E8C88A] shadow-[0_0_25px_rgba(244,114,182,0.4)] hover:shadow-[0_0_40px_rgba(244,114,182,0.7)] active:scale-95 transition-all flex items-center gap-3"
        >
          <span>READ YOUR FINAL LETTER</span>
          <ArrowRight className="w-4 h-4 text-[#080810]" />
        </button>
      </div>
    </div>
  );
};

