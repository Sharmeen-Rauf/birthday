"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowRight,
  Maximize,
  Gamepad2,
} from "lucide-react";
import { soundManager } from "@/lib/sound";

interface Chapter07GamingSetupProps {
  onContinue: () => void;
  onTriggerEasterEgg?: (egg: any) => void;
}

export const Chapter07GamingSetup: React.FC<Chapter07GamingSetupProps> = ({
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
          // If browser policy blocks unmuted autoplay, ensure muted and play
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
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between py-6 px-3 sm:px-6 overflow-hidden bg-[#07050E]">
      {/* Black & Purple Dark Neon Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[420px] sm:w-[650px] h-[420px] sm:h-[650px] bg-gradient-to-tr from-[#8B5CF6]/25 via-[#9333EA]/20 to-[#67E8F9]/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Header: Suggestions */}
      <div className="relative z-10 text-center max-w-lg mx-auto pt-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-[#8B5CF6]/40 text-xs font-mono tracking-widest text-[#C084FC] uppercase mb-1 shadow-sm"
        >
          <Gamepad2 className="w-3.5 h-3.5 text-[#C084FC]" />
          <span>SUGGESTIONS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl sm:text-3xl font-serif font-black tracking-tight text-[#F7F2EA] flex items-center justify-center gap-2"
        >
          <span>Birthday Suggestion #1</span>
          <span className="text-lg sm:text-2xl">🎮💜</span>
        </motion.h2>
      </div>

      {/* Center Layout: Video Theatre + Thoughtful Suggestion Note */}
      <div className="relative z-10 w-full max-w-xl mx-auto my-auto flex flex-col items-center gap-3">
        {/* Compact Auto-playing Video Container (Zero scroll fitted) */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onClick={handleTogglePlay}
          className="relative w-full aspect-video max-h-[34vh] sm:max-h-[42vh] rounded-2xl sm:rounded-3xl overflow-hidden glass-panel border border-[#8B5CF6]/50 shadow-[0_0_40px_rgba(139,92,246,0.35)] cursor-pointer group bg-black/80 flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src="/videos/gaming-suggestion.mp4"
            autoPlay
            loop
            playsInline
            muted={isMuted}
            className="w-full h-full object-contain sm:object-cover"
          />

          {/* Top Video Overlay: Unmute Button + Fullscreen */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-20">
            {isMuted ? (
              <button
                onClick={handleToggleMute}
                className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#8B5CF6]/60 text-[11px] font-mono tracking-wider text-[#C084FC] hover:bg-[#8B5CF6]/20 transition-all animate-pulse"
                aria-label="Unmute Video"
              >
                <VolumeX className="w-3.5 h-3.5 text-[#C084FC]" />
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
              className="pointer-events-auto w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-[#67E8F9] transition-colors"
              aria-label="Toggle Fullscreen"
            >
              <Maximize className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center Play Indicator when Paused */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-20">
              <div className="w-14 h-14 rounded-full bg-[#8B5CF6]/90 flex items-center justify-center text-white shadow-[0_0_25px_#8B5CF6]">
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </div>
            </div>
          )}
        </motion.div>

        {/* Suggestion Note Card - High Contrast & Mobile-Friendly */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full p-4 sm:p-5 rounded-2xl glass-panel border border-[#8B5CF6]/35 bg-[#0D091A]/80 shadow-xl text-center space-y-2.5"
        >
          <p className="text-xs sm:text-sm text-[#F7F2EA] leading-relaxed font-light">
            Mere khayal se apko <span className="text-[#C084FC] font-semibold">black &amp; purple theme</span> ka gaming setup banana chahiye, anime decor aur RGB lights ke sath, bilkul apki pasand ka dark environment.
          </p>
          <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed font-light">
            Isse apka mind bhi divert hoga, Anime k colours, <span className="text-[#67E8F9] font-medium">streaming se earning bhi</span>, or sound mai tou kaam bhi acha hota apse. 🎧✨
          </p>
        </motion.div>
      </div>

      {/* Bottom Continue Action */}
      <div className="relative z-10 flex items-center justify-center pb-2">
        <button
          onClick={onContinue}
          className="px-8 py-3 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#C084FC] via-[#F7F2EA] to-[#67E8F9] shadow-[0_0_25px_rgba(192,132,252,0.4)] hover:shadow-[0_0_40px_rgba(192,132,252,0.65)] active:scale-95 transition-all flex items-center gap-3"
        >
          <span>SEE SUGGESTION #2 🏎️💨</span>
          <ArrowRight className="w-4 h-4 text-[#080810]" />
        </button>
      </div>
    </div>
  );
};
