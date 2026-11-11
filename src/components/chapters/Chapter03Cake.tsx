"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wind, ArrowRight, Mic, Heart } from "lucide-react";
import Image from "next/image";
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
          setTimeout(() => {
            handleBlowCandles();
            setIsListeningMic(false);
          }, 1200);
        }
      }
    } catch {
      setIsListeningMic(false);
      handleBlowCandles();
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background illumination warmth after wish is made */}
      <motion.div
        animate={{
          backgroundColor: isExtinguished ? "rgba(232, 200, 138, 0.12)" : "transparent",
        }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Atmospheric Candle Radial Aura */}
      <motion.div
        animate={{
          scale: isExtinguished ? [1, 1.3, 0.9] : [1, 1.08, 0.96, 1],
          opacity: isExtinguished ? 0.15 : 0.45,
        }}
        transition={{
          repeat: isExtinguished ? 0 : Infinity,
          duration: 3.5,
          ease: "easeInOut",
        }}
        className="absolute w-[360px] sm:w-[540px] h-[360px] sm:h-[540px] bg-gradient-to-tr from-[#FFA500]/25 via-[#E8C88A]/20 to-transparent rounded-full blur-[110px] pointer-events-none"
      />

      {/* Top Heading */}
      <div className="relative z-10 text-center max-w-lg mb-3">
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

      {/* Luxury Cake GIF Showcase Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xs sm:max-w-md my-4 flex flex-col items-center"
      >
        <div className="relative w-full aspect-square sm:w-[380px] sm:h-[380px] rounded-3xl overflow-hidden glass-panel border border-[#E8C88A]/35 shadow-[0_0_50px_rgba(232,200,138,0.2)] p-3 flex flex-col items-center justify-between group">
          {/* Subtle top banner */}
          <div className="relative z-10 flex items-center justify-between w-full px-3 py-1">
            <span className="text-[10px] font-mono tracking-widest text-[#E8C88A] uppercase">
              BIRTHDAY CELEBRATION
            </span>
            <span className="w-2 h-2 rounded-full bg-[#E8C88A] animate-pulse" />
          </div>

          {/* Actual Cake Animated GIF */}
          <div className="relative w-full flex-1 rounded-2xl overflow-hidden flex items-center justify-center bg-black/40">
            <Image
              src="/videos/cake.gif"
              alt="Birthday Cake for Murtaza"
              fill
              unoptimized
              priority
              className="object-contain p-2"
            />

            {/* Extinguished celebratory overlay */}
            {isExtinguished && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-4"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8C88A]/20 backdrop-blur-md border border-[#E8C88A]/50 text-xs font-serif text-[#E8C88A]">
                  <Sparkles className="w-3.5 h-3.5 text-[#E8C88A]" />
                  <span>Wish Released to the Universe ✨</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Gold Name Plate: MURTAZA */}
          <div className="relative z-10 w-full pt-2 flex items-center justify-center">
            <div className="px-5 py-1.5 rounded-full bg-gradient-to-r from-[#E8C88A]/20 via-[#E8C88A]/30 to-[#E8C88A]/20 border border-[#E8C88A]/40 shadow-sm flex items-center gap-2">
              <span className="text-xs sm:text-sm font-serif font-bold tracking-widest text-[#E8C88A] glow-gold">
                ✦ MURTAZA ✦
              </span>
            </div>
          </div>
        </div>
      </motion.div>

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
              className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#E8C88A]/40 text-center flex flex-col items-center shadow-2xl max-w-lg w-full"
            >
              <div className="w-9 h-9 rounded-full bg-[#E8C88A]/20 flex items-center justify-center mb-3">
                <Sparkles className="w-4 h-4 text-[#E8C88A]" />
              </div>

              {/* Headline */}
              <h3 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-[#F7F2EA] glow-gold">
                {cake.note.headline}
              </h3>

              {/* Subtitle Lines */}
              <div className="mt-2 text-xs sm:text-sm text-[#94A3B8] font-mono space-y-0.5">
                {cake.note.subtitle.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              {/* Blessing */}
              <p className="mt-4 text-sm sm:text-base text-[#F7F2EA] font-light leading-relaxed">
                {cake.note.blessing}
              </p>

              {/* Motto */}
              <div className="mt-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#E8C88A]/30">
                <p className="text-xs sm:text-sm font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E8C88A] via-[#F7F2EA] to-[#67E8F9] tracking-wide">
                  {cake.note.motto}
                </p>
              </div>

              {/* Future Line */}
              <p className="mt-3 text-xs sm:text-sm text-[#67E8F9] font-mono">
                {cake.note.futureLine}
              </p>

              {/* Salutation */}
              <p className="mt-4 text-sm sm:text-base font-serif italic text-[#E8C88A]">
                {cake.note.salutation}
              </p>

              <button
                onClick={onContinue}
                className="mt-6 px-7 py-3 rounded-full font-mono text-xs tracking-widest uppercase font-semibold text-[#080810] bg-gradient-to-r from-[#E8C88A] via-[#F7F2EA] to-[#E8C88A] shadow-[0_0_20px_rgba(232,200,138,0.4)] active:scale-95 transition-all flex items-center gap-2"
              >
                <span>CONTINUE TO CHAPTER 04</span>
                <ArrowRight className="w-4 h-4 text-[#080810]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
