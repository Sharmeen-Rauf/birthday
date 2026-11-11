"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  ArrowLeft,
  Terminal,
  Cpu,
  CheckCircle2,
  MessageSquare,
  HelpCircle,
  BarChart3,
  TrendingUp,
  Target,
  Heart,
} from "lucide-react";
import { soundManager } from "@/lib/sound";

// Lazy-load 3D Robot Scene with ssr: false for fast lightweight hydration
const RobotScene = dynamic(() => import("../robot/RobotScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#8B5CF6]/30 to-[#67E8F9]/20 border border-[#8B5CF6]/50 flex items-center justify-center animate-pulse mb-3">
        <Bot className="w-8 h-8 text-[#C084FC]" />
      </div>
      <p className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase">
        Initializing 3D Neural Mesh...
      </p>
    </div>
  ),
});

interface Chapter12MurtazaAIProps {
  onBackToLetter: () => void;
  onRestartAll: () => void;
}

interface ScriptLine {
  text: string;
  subtext?: string;
  smileMode?: number;
  lookAtCamera?: boolean;
  headTilt?: number;
}

const introScript: ScriptLine[] = [
  { text: "Hello. I am Murtaza Kazmi. Version 30.0.", smileMode: 1, subtext: "[ NEURAL CORE ONLINE ]" },
  { text: "Professionally: digital marketer. Mentally: full-time strategist. Emotionally: still processing.", smileMode: 2, headTilt: 0.05 },
  { text: "I analyze ideas, audiences, patterns, and possibilities.", smileMode: 1 },
  { text: "I also like gaming, anime, books, mountains, coffee, and creating the perfect dark-room atmosphere.", smileMode: 1, headTilt: -0.04 },
  { text: "I’m the mind behind Kaszsoft. Still building. Still learning. Still aiming higher.", smileMode: 0 },
  { text: "I apparently have three smile modes: 1. social smile, 2. mischievous smile, 3. and the rare genuine one where even the eyes smile.", smileMode: 2 },
  { text: "Special note: whoever made this website has clearly done too much research on me.", lookAtCamera: true, smileMode: 1, headTilt: 0.06 },
  { text: "Impressive.", lookAtCamera: true, smileMode: 2 },
  { text: "Birthday mode activated.", smileMode: 3, lookAtCamera: true },
];

const interactiveQuestions = [
  {
    id: "identity",
    label: "Who are you?",
    answer:
      "I am Murtaza Kazmi, Version 30.0. A limited edition combination of brains, ambition, sarcasm, and very selective emotional availability.",
    smileMode: 1,
    headTilt: 0.04,
  },
  {
    id: "profession",
    label: "What do you do?",
    answer:
      "I work in digital marketing. So yes, I understand reach, strategy, targeting, performance, and how to make things work. Apparently I’m also now the subject of a full emotional birthday campaign.",
    smileMode: 2,
    headTilt: -0.05,
  },
  {
    id: "kaszsoft",
    label: "Tell me about Kaszsoft",
    answer:
      "Kaszsoft is not just a name. It’s the result of vision, effort, consistency, and the refusal to stop building. Some dreams are spoken. Some are coded, built, and marketed into existence.",
    smileMode: 1,
    headTilt: 0,
  },
  {
    id: "personality",
    label: "What’s your personality?",
    answer:
      "Fast mind. Ready answers. Dark humor. Quiet depth. I like thoughtful things, meaningful effort, and environments that feel like my own world.",
    smileMode: 2,
    headTilt: 0.05,
  },
  {
    id: "birthday",
    label: "Birthday mode?",
    answer:
      "Birthday mode status: Cake accepted. Effort detected. Smile probability increased. Thank you response... very likely.",
    smileMode: 3,
    headTilt: 0,
  },
];

export const Chapter12MurtazaAI: React.FC<Chapter12MurtazaAIProps> = ({
  onBackToLetter,
  onRestartAll,
}) => {
  const [stage, setStage] = useState<"standby" | "booting" | "speaking" | "interactive">("standby");
  const [isPoweringOn, setIsPoweringOn] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechIntensity, setSpeechIntensity] = useState<number>(0);
  const [smileMode, setSmileMode] = useState<number>(0);
  const [lookAtCamera, setLookAtCamera] = useState<boolean>(false);
  const [headTilt, setHeadTilt] = useState<number>(0);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [bootLog, setBootLog] = useState<string[]>([]);
  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
      // Pre-fetch voices
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Speak a line using Web Speech API with robotic voice modulation & fallback
  const speakLine = (text: string, onComplete?: () => void) => {
    setCurrentSubtitle(text);
    setIsSpeaking(true);
    setSpeechIntensity(0.85);

    if (isAudioMuted || !synthRef.current) {
      // Audio muted or unsupported: simulate speech duration via text length
      const durationMs = Math.max(1800, text.length * 60);
      const intensityInterval = setInterval(() => {
        setSpeechIntensity(0.4 + Math.random() * 0.6);
      }, 120);

      setTimeout(() => {
        clearInterval(intensityInterval);
        setIsSpeaking(false);
        setSpeechIntensity(0);
        if (onComplete) onComplete();
      }, durationMs);
      return;
    }

    try {
      synthRef.current.cancel();
      const cleanText = text.replace(/[🤖🤍✨😂🎉]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);

      // Fictional robotic parameters: mature, calm, slightly robotic
      utterance.pitch = 0.85;
      utterance.rate = 0.96;

      // Select deep/mature voice if available
      const voices = synthRef.current.getVoices();
      const maleVoice = voices.find(
        (v) =>
          (v.name.includes("David") ||
            v.name.includes("Male") ||
            v.name.includes("George") ||
            v.name.includes("Natural")) &&
          v.lang.startsWith("en")
      );
      if (maleVoice) utterance.voice = maleVoice;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setSpeechIntensity(0.85);
      };

      utterance.onboundary = () => {
        setSpeechIntensity(0.6 + Math.random() * 0.4);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeechIntensity(0);
        if (onComplete) onComplete();
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setSpeechIntensity(0);
        if (onComplete) onComplete();
      };

      currentUtteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    } catch {
      setIsSpeaking(false);
      setSpeechIntensity(0);
      if (onComplete) onComplete();
    }
  };

  // Boot sequence
  const handleActivate = () => {
    soundManager.playTap();
    soundManager.playEasterEgg();

    // Prime & unlock Web Speech API audio during this direct user click (crucial for iOS Safari & Android)
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        const unlockUtterance = new SpeechSynthesisUtterance("");
        unlockUtterance.volume = 0;
        window.speechSynthesis.speak(unlockUtterance);
      } catch {}
    }

    setStage("booting");
    setBootLog(["Initializing..."]);

    setTimeout(() => {
      setBootLog((prev) => [...prev, "Identity scan complete"]);
    }, 700);

    setTimeout(() => {
      setBootLog((prev) => [...prev, "Personality module loaded"]);
      setIsPoweringOn(true);
    }, 1400);

    setTimeout(() => {
      setBootLog((prev) => [...prev, "Murtaza Kazmi detected"]);
      soundManager.playCelebrationArpeggio();
    }, 2100);

    setTimeout(() => {
      startIntroSequence();
    }, 3000);
  };

  // Play through the intro script sequentially
  const startIntroSequence = () => {
    setStage("speaking");
    let lineIdx = 0;

    const playNext = () => {
      if (lineIdx >= introScript.length) {
        // Intro complete! Unlock interactive questions
        setStage("interactive");
        setLookAtCamera(false);
        setSmileMode(1);
        setCurrentSubtitle("System fully operational. Select any query below to interact with Murtaza.AI.");
        return;
      }

      const item = introScript[lineIdx];
      setSmileMode(item.smileMode ?? 0);
      setLookAtCamera(item.lookAtCamera ?? false);
      setHeadTilt(item.headTilt ?? 0);

      speakLine(item.text, () => {
        lineIdx++;
        // Natural pause before next statement
        const pause = item.lookAtCamera ? 1200 : 700;
        setTimeout(playNext, pause);
      });
    };

    playNext();
  };

  const handleSkipIntro = () => {
    soundManager.playTap();
    if (synthRef.current) synthRef.current.cancel();
    setStage("interactive");
    setIsPoweringOn(true);
    setIsSpeaking(false);
    setSpeechIntensity(0);
    setSmileMode(1);
    setLookAtCamera(false);
    setCurrentSubtitle("Intro skipped. Neural matrix unlocked. Ask me anything.");
  };

  const handleAskQuestion = (q: typeof interactiveQuestions[0]) => {
    soundManager.playTap();
    setActiveQuestionId(q.id);
    setSmileMode(q.smileMode);
    setHeadTilt(q.headTilt);
    setLookAtCamera(false);

    speakLine(q.answer, () => {
      setActiveQuestionId(null);
    });
  };

  const handleToggleMute = () => {
    setIsAudioMuted((prev) => {
      const next = !prev;
      if (next && synthRef.current) synthRef.current.cancel();
      return next;
    });
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between py-5 px-3 sm:px-6 overflow-hidden bg-[#06050C]">
      {/* Background Matrix Grid & Cyber Violet Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[480px] sm:w-[700px] h-[480px] sm:h-[700px] bg-gradient-to-tr from-[#8B5CF6]/20 via-[#67E8F9]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-20 flex items-center justify-between w-full max-w-4xl mx-auto pt-1">
        <button
          onClick={onBackToLetter}
          className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#94A3B8] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO LETTER</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#8B5CF6]/40 text-[11px] font-mono tracking-widest text-[#C084FC]">
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
          <span>MURTAZA.AI // V30.0</span>
        </div>

        <button
          onClick={handleToggleMute}
          className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          title={isAudioMuted ? "Unmute Voice" : "Mute Voice"}
        >
          {isAudioMuted ? <VolumeX className="w-4 h-4 text-[#EC4899]" /> : <Volume2 className="w-4 h-4 text-[#67E8F9]" />}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-4xl mx-auto my-auto flex flex-col items-center">
        {stage === "standby" ? (
          /* ================= STANDBY INITIALIZATION SCREEN ================= */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg p-6 sm:p-10 rounded-3xl glass-panel border border-[#8B5CF6]/40 bg-[#0B0916]/85 text-center flex flex-col items-center shadow-[0_0_60px_rgba(139,92,246,0.25)]"
          >
            {/* Prominent Murtaza Headshot Cutout in Cyber Frame */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#8B5CF6] via-[#EC4899] to-[#67E8F9] shadow-[0_0_40px_rgba(139,92,246,0.6)] mb-5">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#0A0815] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/murtaza-cutout.png"
                  alt="Murtaza Kazmi"
                  className="w-full h-full object-cover object-top scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B5CF6]/20 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#080812] border border-[#67E8F9] flex items-center justify-center shadow-lg">
                <Bot className="w-4 h-4 text-[#67E8F9]" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#67E8F9]/30 text-[10px] font-mono tracking-widest text-[#67E8F9] uppercase mb-2">
              <Sparkles className="w-3 h-3 text-[#67E8F9]" />
              <span>FINAL BONUS SURPRISE UNLOCKED</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-[#F7F2EA] glow-gold">
              MURTAZA.AI
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#C084FC] tracking-widest uppercase mt-1">
              Version 30.0 // Humanoid Neural Engine
            </p>

            <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-4 leading-relaxed max-w-sm">
              An interactive 3D humanoid robot inspired by Murtaza&apos;s intellect, digital marketing mind, ambition, and gaming reflexes.
            </p>

            <button
              onClick={handleActivate}
              className="mt-8 px-9 py-4 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-white bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#67E8F9] shadow-[0_0_35px_rgba(139,92,246,0.6)] hover:shadow-[0_0_50px_rgba(139,92,246,0.9)] active:scale-95 transition-all flex items-center gap-3"
            >
              <Cpu className="w-4 h-4 text-white" />
              <span>ACTIVATE FINAL SURPRISE</span>
            </button>
          </motion.div>
        ) : stage === "booting" ? (
          /* ================= BOOTING SEQUENCE TERMINAL ================= */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-md p-6 rounded-2xl glass-panel border border-[#67E8F9]/40 bg-[#080812]/90 shadow-2xl font-mono text-xs"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-[11px] text-[#67E8F9]">
              <Terminal className="w-4 h-4 text-[#67E8F9]" />
              <span>BOOTLOADER // NEURAL_INIT</span>
            </div>
            <div className="py-4 space-y-2 text-[#E2E8F0]">
              {bootLog.map((log, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="leading-relaxed text-[#67E8F9]"
                >
                  {log}
                </motion.p>
              ))}
              <span className="inline-block w-2 h-4 bg-[#C084FC] animate-pulse align-middle" />
            </div>
          </motion.div>
        ) : (
          /* ================= ACTIVE 3D ROBOT STAGE ================= */
          <div className="w-full flex flex-col items-center">
            {/* 3D Humanoid Robot Viewport */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[42vh] sm:max-h-[48vh] rounded-3xl overflow-hidden glass-panel border border-[#8B5CF6]/35 shadow-[0_0_50px_rgba(139,92,246,0.25)] bg-[#080712] flex items-center justify-center">
              <RobotScene
                isPoweringOn={isPoweringOn}
                isSpeaking={isSpeaking}
                speechIntensity={speechIntensity}
                smileMode={smileMode}
                lookAtCamera={lookAtCamera}
                headTilt={headTilt}
                showFaceProjection={lookAtCamera || smileMode === 3}
              />

              {/* Top-Left Biometric Identity HUD Pill with Prominent Face */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#8B5CF6]/40 shadow-lg pointer-events-none">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-[#67E8F9] flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/murtaza-cutout.png"
                    alt="Murtaza Kazmi"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="text-left font-mono leading-none">
                  <p className="text-[10px] text-white font-semibold tracking-wide">MURTAZA KAZMI</p>
                  <p className="text-[8px] text-[#67E8F9] tracking-widest uppercase">BIO-SYNC: 100%</p>
                </div>
              </div>

              {/* Top-Right Skip / Quick Actions */}
              {stage === "speaking" && (
                <button
                  onClick={handleSkipIntro}
                  className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#94A3B8] hover:text-white transition-colors"
                >
                  SKIP INTRO →
                </button>
              )}

              {/* Active State Pill Overlay */}
              <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#8B5CF6]/40 text-[10px] font-mono text-[#C084FC] flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isSpeaking ? "bg-[#67E8F9] animate-ping" : "bg-[#8B5CF6]"}`} />
                  <span>
                    {isSpeaking
                      ? "SPEAKING..."
                      : smileMode === 3
                      ? "SMILE MODE: GENUINE 🤍"
                      : smileMode === 2
                      ? "SMILE MODE: MISCHIEVOUS 😏"
                      : "NEURAL ENGINE IDLE"}
                  </span>
                </span>
              </div>
            </div>

            {/* Synchronized Subtitles Speech Bubble */}
            <motion.div
              key={currentSubtitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-xl mt-3 p-3 sm:p-3.5 rounded-2xl glass-panel border border-[#8B5CF6]/30 bg-[#0C091A]/85 text-center shadow-lg"
            >
              <p className="text-xs sm:text-sm text-[#F7F2EA] font-light leading-relaxed">
                &ldquo;{currentSubtitle}&rdquo;
              </p>
            </motion.div>

            {/* Five Interactive Questions (Unlocked after Intro) */}
            {stage === "interactive" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl mt-3 flex flex-col items-center space-y-3"
              >
                <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase">
                  <HelpCircle className="w-3.5 h-3.5 text-[#67E8F9]" />
                  <span>Ask Murtaza.AI a Question:</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                  {interactiveQuestions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleAskQuestion(q)}
                      disabled={isSpeaking}
                      className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ${
                        activeQuestionId === q.id
                          ? "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-semibold shadow-[0_0_15px_#8B5CF6]"
                          : "bg-white/[0.04] border border-white/10 text-[#C084FC] hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/15 hover:text-white"
                      } disabled:opacity-50`}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>

                {/* Closing Recognition & Birthday Message Card */}
                <div className="w-full max-w-lg p-3.5 sm:p-4 rounded-2xl glass-panel border border-[#8B5CF6]/30 bg-[#0A0815]/90 text-center shadow-xl">
                  <p className="text-xs italic text-[#E2E8F0] font-light">
                    &ldquo;Even artificial intelligence can recognize genuine effort.&rdquo;
                  </p>
                  <div className="mt-2 space-y-0.5">
                    <p className="text-sm sm:text-base font-serif font-black tracking-wide text-[#F7F2EA] glow-gold">
                      HAPPY BIRTHDAY, MURTAZA 🤍
                    </p>
                    <p className="text-[10px] font-mono tracking-widest text-[#67E8F9] uppercase font-semibold">
                      THE MIND BEHIND KASZSOFT
                    </p>
                    <p className="text-[10px] font-mono tracking-widest text-[#C084FC] uppercase">
                      DIGITAL MARKETER. BUILDER. DREAMER.
                    </p>
                    <p className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase pt-0.5 font-bold">
                      VERSION 30.0 UNLOCKED.
                    </p>
                    <p className="text-[10px] font-mono text-[#94A3B8] italic pt-0.5">
                      Effort received. Smile generated.
                    </p>
                  </div>

                  {/* Digital Marketer Campaign Performance Easter Egg */}
                  <div className="mt-3 pt-2.5 border-t border-white/10">
                    <button
                      onClick={() => setShowAnalytics(!showAnalytics)}
                      className="px-3.5 py-1 rounded-full bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/30 border border-[#8B5CF6]/40 text-[10px] font-mono text-[#C084FC] hover:text-white transition-all inline-flex items-center gap-1.5"
                    >
                      <BarChart3 className="w-3 h-3 text-[#67E8F9]" />
                      <span>{showAnalytics ? "HIDE CAMPAIGN METRICS" : "CAMPAIGN PERFORMANCE METRICS (EASTER EGG) 📊"}</span>
                    </button>

                    <AnimatePresence>
                      {showAnalytics && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2.5 text-left overflow-hidden"
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#67E8F9] mb-1.5">
                            <span className="flex items-center gap-1">
                              <Target className="w-3 h-3 text-[#67E8F9]" />
                              CAMPAIGN: MURTAZA.EXE (30TH BD)
                            </span>
                            <span className="text-emerald-400 font-semibold">STATUS: OPTIMAL</span>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                              <span className="text-[#94A3B8] block text-[9px]">TARGET AUDIENCE</span>
                              <span className="text-[#F7F2EA] font-semibold">1 (Mr. Kazmi)</span>
                            </div>
                            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                              <span className="text-[#94A3B8] block text-[9px]">EFFORT INVESTED</span>
                              <span className="text-[#EC4899] font-semibold">100% (High Intensity)</span>
                            </div>
                            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                              <span className="text-[#94A3B8] block text-[9px]">CONVERSION GOAL</span>
                              <span className="text-[#E8C88A] font-semibold">1 Genuine Smile</span>
                            </div>
                            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                              <span className="text-[#94A3B8] block text-[9px]">CAMPAIGN RESULT</span>
                              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                Emotionally Successful <TrendingUp className="w-2.5 h-2.5 inline" />
                              </span>
                            </div>
                          </div>

                          <p className="mt-2 text-[9px] font-mono text-[#94A3B8] text-center italic">
                            &ldquo;Because it’s not just the touch, it’s the intensity that matters.&rdquo; 🤍
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Final Status Badge & Navigation */}
      <div className="relative z-20 flex flex-col items-center gap-2 pt-2">
        {stage === "interactive" && (
          <div className="w-full max-w-md p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-[#8B5CF6]/25 text-center font-mono text-[10px] tracking-widest text-[#94A3B8] space-y-0.5">
            <p className="text-[#C084FC] font-semibold">MURTAZA.EXE — VERSION 30.0</p>
            <p>STATUS: <span className="text-emerald-400 font-semibold">LEGENDARY</span> • KASZSOFT: <span className="text-[#67E8F9]">BUILDING THE FUTURE</span> • SMILE MODE: <span className="text-[#E8C88A]">ACTIVATED</span></p>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={onRestartAll}
            className="px-6 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase text-[#F7F2EA] glass-panel border border-white/10 hover:border-[#E8C88A] hover:text-[#E8C88A] transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>REPLAY THE UNIVERSE</span>
          </button>
        </div>
      </div>
    </div>
  );
};

