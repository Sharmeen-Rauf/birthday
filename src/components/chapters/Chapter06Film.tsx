"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Maximize, Sparkles, ArrowRight, Heart, Volume2, VolumeX } from "lucide-react";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { soundManager } from "@/lib/sound";

interface Chapter06FilmProps {
  onContinue: () => void;
}

export const Chapter06Film: React.FC<Chapter06FilmProps> = ({ onContinue }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);
  const [isMutedState, setIsMutedState] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Autoplay after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasEnded(false);
            setIsMutedState(videoRef.current?.muted || false);
          })
          .catch(() => {
            // If autoplay with sound is blocked by browser policy, fallback to muted autoplay
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMutedState(true);
              videoRef.current
                .play()
                .then(() => {
                  setIsPlaying(true);
                  setHasEnded(false);
                })
                .catch(() => {});
            }
          });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleTogglePlay = () => {
    soundManager.playTap();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.muted = false;
      setIsMutedState(false);
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasEnded(false);
        })
        .catch(() => {
          setHasVideoError(true);
          setIsPlaying(true);
        });
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMutedState(nextMuted);
    }
  };

  const handleReplay = () => {
    soundManager.playTap();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
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
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-8 px-4 sm:px-6 overflow-hidden">
      {/* Background ambient cinema glow */}
      <div className="absolute w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-gradient-to-tr from-[#8B5CF6]/20 via-[#67E8F9]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Responsive Video Theatre Container (Mobile-First 9:16 / Universal) */}
      <div
        ref={containerRef}
        className="relative z-10 my-auto w-full max-w-[320px] sm:max-w-[360px] aspect-[9/16] max-h-[72vh] rounded-3xl overflow-hidden glass-panel border border-[#8B5CF6]/40 shadow-[0_0_50px_rgba(139,92,246,0.3)] flex flex-col justify-between p-3 group"
      >
        {/* Actual Video */}
        {!hasVideoError ? (
          <video
            ref={videoRef}
            src="/videos/complete-video-googleflow.mp4"
            poster="/videos/birthday-film-poster.jpg"
            playsInline
            controls={isPlaying}
            onClick={handleTogglePlay}
            onEnded={() => {
              setIsPlaying(false);
              setHasEnded(true);
            }}
            onError={() => setHasVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover rounded-3xl cursor-pointer"
          />
        ) : (
          /* Fallback Poster */
          <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col items-center justify-center p-6 text-center">
            <ImageWithFallback
              src="/videos/birthday-film-poster.jpg"
              alt="Film Poster"
              fill
              priority
              className="object-cover object-center opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-black/50 to-[#080810]/70" />

            <div className="relative z-10 p-5 rounded-2xl glass-panel border border-[#E8C88A]/30">
              <Sparkles className="w-8 h-8 text-[#E8C88A] mx-auto mb-2 animate-pulse" />
              <h4 className="text-lg font-serif font-bold text-[#F7F2EA]">
                Birthday Film
              </h4>
              <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                Playing <code className="text-[#67E8F9]">complete-video-googleflow.mp4</code>
              </p>
            </div>
          </div>
        )}

        {/* Top Controls Overlay - Mute Toggle + Fullscreen */}
        <div className="relative z-20 flex items-center justify-between p-1 pointer-events-none">
          {isPlaying && isMutedState ? (
            <button
              onClick={handleToggleMute}
              className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#E8C88A]/50 text-[10px] font-mono tracking-wider text-[#E8C88A] hover:bg-[#E8C88A]/20 transition-all animate-pulse"
              aria-label="Unmute Video"
            >
              <VolumeX className="w-3.5 h-3.5 text-[#E8C88A]" />
              <span>TAP FOR SOUND</span>
            </button>
          ) : isPlaying ? (
            <button
              onClick={handleToggleMute}
              className="pointer-events-auto w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              aria-label="Mute Video"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleFullscreen}
            className="pointer-events-auto w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-[#67E8F9] transition-colors"
            aria-label="Toggle Fullscreen"
          >
            <Maximize className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center Play Button Overlay (Visible only when not playing) */}
        <div className="relative z-20 flex items-center justify-center pointer-events-none">
          {!isPlaying && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleTogglePlay}
              className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#8B5CF6] via-[#67E8F9] to-[#E8C88A] p-[2px] shadow-[0_0_40px_rgba(103,232,249,0.5)] flex items-center justify-center"
              aria-label="Play birthday film"
            >
              <div className="w-full h-full rounded-full bg-[#080810]/85 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 text-[#F7F2EA] fill-[#F7F2EA] ml-1" />
              </div>
            </motion.button>
          )}
        </div>

        {/* Bottom Playback Bar (Visible when paused or ended) */}
        {!isPlaying && (
          <div className="relative z-20 p-2.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between">
            <button
              onClick={handleTogglePlay}
              className="flex items-center gap-2 text-xs font-mono text-[#F7F2EA] hover:text-[#E8C88A] transition-colors"
            >
              <Play className="w-4 h-4 text-[#E8C88A]" />
              <span>TAP TO PLAY WITH SOUND</span>
            </button>

            {hasEnded && (
              <button
                onClick={handleReplay}
                className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>REPLAY</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Phrasing Below Video & Continue Button */}
      <div className="relative z-10 text-center flex flex-col items-center max-w-md mx-auto mt-3">
        <p className="text-base sm:text-xl font-serif italic text-[#E8C88A] glow-gold flex items-center justify-center gap-1.5">
          <span>&ldquo;...with a genuinely beautiful heart.&rdquo;</span>
          <Heart className="w-4 h-4 fill-[#E8C88A] text-[#E8C88A] inline-block" />
        </p>
        <p className="text-xs text-[#94A3B8] font-light mt-1">
          A sharp mind, a playful spirit, and a soul that inspires everyone around him.
        </p>

        <button
          onClick={onContinue}
          className="mt-4 px-8 py-3.5 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#67E8F9] via-[#F7F2EA] to-[#E8C88A] shadow-[0_0_25px_rgba(103,232,249,0.35)] hover:shadow-[0_0_40px_rgba(103,232,249,0.6)] active:scale-95 transition-all flex items-center gap-3"
        >
          <span>EXPLORE YOUR UNIVERSE</span>
          <ArrowRight className="w-4 h-4 text-[#080810]" />
        </button>
      </div>
    </div>
  );
};
