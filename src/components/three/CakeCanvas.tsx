"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
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
    return <div className="w-full h-72 sm:h-96" />;
  }

  // Graceful 2.5D Fallback for devices without WebGL
  if (!hasWebGL) {
    return (
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto flex flex-col items-center justify-center">
        <div className="relative w-48 h-48 rounded-2xl bg-gradient-to-br from-[#10101C] to-[#1E1E2E] border border-[#E8C88A]/30 shadow-2xl flex flex-col items-center justify-end p-4">
          {/* Candle Flames */}
          <div className="flex gap-4 mb-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                {!isExtinguished ? (
                  <div className="w-3.5 h-6 bg-gradient-to-t from-orange-500 to-amber-200 rounded-full animate-flame blur-[1px] shadow-[0_0_12px_#FFAA00]" />
                ) : (
                  <div className="w-1.5 h-6 bg-slate-500/30 rounded-full animate-pulse" />
                )}
                <div className="w-2 h-7 bg-amber-100/90 rounded-sm mt-0.5" />
              </div>
            ))}
          </div>
          {/* Cake Tiers */}
          <div className="w-32 h-10 rounded-t-lg bg-[#14142B] border-b-2 border-[#E8C88A]" />
          <div className="w-40 h-14 rounded-b-lg bg-[#0E1224] border-t-2 border-[#E8C88A]" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-72 sm:h-96 max-w-lg mx-auto">
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#94A3B8]">Sculpting your midnight cake...</div>}>
        <Canvas
          camera={{ position: [0, 1.2, 3.8], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 6, 4]} intensity={1.2} color="#F7F2EA" />
          <pointLight position={[-4, 3, -2]} intensity={0.8} color="#8B5CF6" />
          <pointLight position={[0, -2, 2]} intensity={0.4} color="#67E8F9" />

          <Cake3D isExtinguished={isExtinguished} />
        </Canvas>
      </Suspense>
    </div>
  );
};

