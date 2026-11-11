"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wind, ArrowRight, Mic } from "lucide-react";
import { CakeCanvas } from "../three/CakeCanvas";
import { triggerWishSparkles } from "@/lib/confetti";
import { soundManager } from "@/lib/sound";
import { birthdayData } from "@/data/birthday";

interface Chapter03CakeProps {
  onContinue: () => void;
}

export const Chapter03Cake: React.FC<Chapter03CakeProps> = ({ onContinue }) => {
  const [isExtinguished, setIsExtinguished] = useState<boolean>(false);
  const [isListeningMic, setIsListeningMic] = useState<boolean>(false);
  const { cake } = birthdayData;

  const handleBlowCandles = () => {
    if (isExtinguished) return;
    setIsExtinguished(true);
    soundManager.playBlowCandle();
    triggerWishSparkles();
  };

  const handleMicToggle = async () => {
    if (isExtinguished) return;
    try {
      if (!isListeningMic) {
        setIsListeningMic(true);
        // Optional browser mic blowing detection
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
          const analyser = audioCtx.createAnalyser();
          const microphone = audioCtx.createMediaStreamSource(stream);
          microphone.connect(analyser);
          analyser.fftSize = 256;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const checkVolume = () => {
            if (isExtinguished) {
              stream.getTracks().forEach((track) => track.stop());
              return;
            }
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              sum += dataArray[i];
            }
            const average = sum / bufferLength;

            // If blowing volume detected
            if (average > 55) {
              handleBlowCandles();
              stream.getTracks().forEach((track) => track.stop());
              setIsListeningMic(false);
              return;
            }
            requestAnimationFrame(checkVolume);
          };
          checkVolume();
        } else {
          // Fallback simulation
          setTimeout(() => {
            handleBlowCandles();
            setIsListeningMic(false);
          }, 1200);
        }
      }
    } catch {
      // In case mic is denied, safely fall back to manual blow
      setIsListeningMic(false);
      handleBlowCandles();
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background illumination warmth after wish is made */}
      <motion.div
        animate={{
          backgroundColor: isExtinguished ? "rgba(232, 200, 138, 0.08)" : "transparent",
        }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Top Heading */}
      <div className="relative z-10 text-center max-w-lg mb-2">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs sm:text-sm font-mono tracking-widest text-[#E8C88A] uppercase"
        >
          {cake.preface}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-4xl font-serif font-bold text-[#F7F2EA] mt-1"
        >
          {isExtinguished ? "The Wish Has Been Made" : cake.instruction}
        </motion.h2>
      </div>

      {/* 3D Cake Canvas */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <CakeCanvas isExtinguished={isExtinguished} />
      </div>

      {/* Action / Wish Reveal Area */}
      <div className="relative z-10 text-center max-w-md w-full mt-2 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isExtinguished ? (
            <motion.div
              key="blow-controls"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center"
            >
              {/* Primary Blow Button */}
              <button
                onClick={handleBlowCandles}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#E8C88A] via-[#F7F2EA] to-[#E8C88A] shadow-[0_0_25px_rgba(232,200,138,0.35)] hover:shadow-[0_0_40px_rgba(232,200,138,0.6)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5"
              >
                <Wind className="w-4 h-4 text-[#080810]" />
                <span>{cake.buttonText}</span>
              </button>

              {/* Optional Mic Enhancement Button */}
              <button
                onClick={handleMicToggle}
                className={`px-4 py-3 rounded-full text-xs font-mono uppercase tracking-wider border transition-colors flex items-center justify-center gap-2 ${
                  isListeningMic
                    ? "bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse"
                    : "glass-pill text-[#94A3B8] hover:text-white"
                }`}
                title="Blow into your microphone or tap button"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{isListeningMic ? "Blow now..." : "Blow via Mic"}</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="wish-revealed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-6 rounded-2xl glass-panel border border-[#E8C88A]/30 text-center flex flex-col items-center shadow-2xl"
            >
              <div className="w-8 h-8 rounded-full bg-[#E8C88A]/20 flex items-center justify-center mb-2">
                <Sparkles className="w-4 h-4 text-[#E8C88A]" />
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#E8C88A] glow-gold">
                &ldquo;{cake.blownWish}&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 font-light">
                {cake.blownSubtext}
              </p>

              <button
                onClick={onContinue}
                className="mt-5 px-6 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase font-semibold text-[#F7F2EA] bg-[#8B5CF6] hover:bg-[#7C3AED] shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-95 transition-all flex items-center gap-2"
              >
                <span>CONTINUE TO CHAPTER 04</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
