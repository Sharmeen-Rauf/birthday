"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Cake3D } from "./Cake3D";

interface CakeCanvasProps {
  isExtinguished: boolean;
}

export const CakeCanvas: React.FC<CakeCanvasProps> = ({ isExtinguished }) => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted) {
    return <div className="w-full h-80 sm:h-[420px]" />;
  }

  // Graceful 2.5D Fallback for devices without WebGL
  if (!hasWebGL) {
    return (
      <div className="relative w-72 h-80 sm:w-96 sm:h-[400px] mx-auto flex flex-col items-center justify-center">
        <div className="relative w-64 h-72 sm:w-80 sm:h-80 rounded-3xl bg-gradient-to-br from-[#10101C] via-[#0E0F1E] to-[#080810] border border-[#E8C88A]/35 shadow-2xl flex flex-col items-center justify-end p-5">
          {/* Single Candle Flame */}
          <div className="flex flex-col items-center mb-3">
            {!isExtinguished ? (
              <div className="w-5 h-8 bg-gradient-to-t from-orange-500 via-amber-300 to-white rounded-full animate-flame blur-[1px] shadow-[0_0_20px_#FFAA00]" />
            ) : (
              <div className="w-1.5 h-7 bg-slate-400/40 rounded-full animate-pulse" />
            )}
            <div className="w-3 h-10 bg-gradient-to-b from-[#F7F2EA] to-[#E8C88A] rounded-sm mt-0.5 border border-[#E8C88A]/60 flex items-center justify-center">
              <div className="w-full h-1 bg-[#E8C88A]" />
            </div>
          </div>

          {/* 3 Tiers with "MURTAZA" */}
          <div className="w-28 h-10 rounded-t-lg bg-[#18153B] border-t-2 border-x-2 border-[#E8C88A] relative shadow-md">
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-[#E8C88A]" />
          </div>
          <div className="w-48 h-14 rounded-t-lg bg-[#13112E] border-t-2 border-x-2 border-[#E8C88A] relative shadow-lg flex items-center justify-center">
            <span className="text-xs font-serif font-black tracking-widest text-[#E8C88A] drop-shadow-[0_0_8px_rgba(232,200,138,0.8)]">
              ✦ MURTAZA ✦
            </span>
            <div className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#E8C88A]" />
          </div>
          <div className="w-64 h-16 rounded-b-xl bg-[#0B0F22] border-2 border-[#E8C88A] relative shadow-2xl">
            <div className="absolute bottom-2 left-0 right-0 flex justify-around px-4">
              {Array.from({ length: 9 }).map((_, idx) => (
                <div key={idx} className="w-1.5 h-1.5 rounded-full bg-[#E8C88A]" />
              ))}
            </div>
          </div>
          {/* Gold Pedestal */}
          <div className="w-48 h-3 rounded-full bg-[#E8C88A] mt-2 shadow-[0_0_15px_rgba(232,200,138,0.5)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-80 sm:h-[420px] max-w-xl mx-auto cursor-grab active:cursor-grabbing">
      {/* Interactive touch hint */}
      <div className="absolute top-2 right-4 z-10 pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest text-[#E8C88A]/80 uppercase px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-[#E8C88A]/20">
          360° Drag To Inspect
        </span>
      </div>

      <Suspense
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 border-2 border-[#E8C88A]/30 border-t-[#E8C88A] rounded-full animate-spin" />
            <span className="text-xs font-mono text-[#E8C88A] tracking-wider uppercase">
              Sculpting Midnight Cake...
            </span>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 1.4, 4.2], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          {/* Cinematic Studio Lights */}
          <ambientLight intensity={0.8} />
          {/* Key warm golden spotlight from top-right */}
          <spotLight
            position={[4, 6, 4]}
            angle={0.6}
            penumbra={0.8}
            intensity={2.2}
            color="#FFF2D6"
          />
          {/* Soft fill light from left */}
          <directionalLight position={[-4, 3, 2]} intensity={0.9} color="#8B5CF6" />
          {/* Rim light from behind for luxury edge specular highlight */}
          <pointLight position={[0, 4, -3]} intensity={1.5} color="#67E8F9" />
          {/* Subtle bottom ground bounce */}
          <pointLight position={[0, -2, 2]} intensity={0.4} color="#E8C88A" />

          {/* 3D Cake Object */}
          <Cake3D isExtinguished={isExtinguished} />

          {/* Touch & Mouse 360 Orbit Controls with damping */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            dampingFactor={0.06}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2 + 0.1}
            autoRotate={!isExtinguished}
            autoRotateSpeed={0.8}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};
