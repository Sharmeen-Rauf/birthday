"use client";

import React, { useEffect, useRef } from "react";

interface BackgroundParticlesProps {
  intensity?: "subtle" | "medium" | "celebration";
  accentColor?: string;
}

export const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({
  intensity = "subtle",
  accentColor = "#E8C88A",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const count = intensity === "celebration" ? 65 : intensity === "medium" ? 45 : 30;

    interface Particle {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      alpha: number;
      baseAlpha: number;
      pulseSpeed: number;
      color: string;
    }

    const palette = [
      accentColor,
      "#8B5CF6", // electric violet
      "#67E8F9", // soft cyan
      "#F7F2EA", // warm ivory
    ];

    const particles: Particle[] = Array.from({ length: count }, () => {
      const baseAlpha = Math.random() * 0.5 + 0.15;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        speedY: -(Math.random() * 0.35 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        alpha: baseAlpha,
        baseAlpha: baseAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        color: palette[Math.floor(Math.random() * palette.length)],
      };
    });

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha = p.baseAlpha + Math.sin(time + p.x) * 0.15;

        // Wrap around smoothly
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.85, p.alpha));
        ctx.shadowBlur = p.radius * 3;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, accentColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: 0.8 }}
    />
  );
};
