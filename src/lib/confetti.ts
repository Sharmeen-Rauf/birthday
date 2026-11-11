"use client";

import confetti from "canvas-confetti";

export const triggerCelebrationBurst = () => {
  // Gold, violet, pink, and cyan particles
  const colors = ["#E8C88A", "#8B5CF6", "#F3A6C8", "#67E8F9", "#FFFFFF"];

  // Center primary blast
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors: colors,
    ticks: 250,
    gravity: 0.8,
    scalar: 1.1,
    shapes: ["circle", "square"],
  });

  // Left side upward flare
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 70,
      origin: { x: 0.1, y: 0.75 },
      colors: colors,
      ticks: 220,
      gravity: 0.85,
    });
  }, 180);

  // Right side upward flare
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 70,
      origin: { x: 0.9, y: 0.75 },
      colors: colors,
      ticks: 220,
      gravity: 0.85,
    });
  }, 320);
};

export const triggerWishSparkles = () => {
  // Delicate golden & cyan upward drift
  const colors = ["#E8C88A", "#F7F2EA", "#67E8F9", "#F3A6C8"];

  const duration = 2.5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 90,
      spread: 45,
      origin: { x: 0.5, y: 0.7 },
      colors: colors,
      ticks: 150,
      gravity: 0.4,
      drift: (Math.random() - 0.5) * 1.5,
      scalar: 0.8,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

export const triggerUnoBurst = () => {
  // Classic UNO color explosion: Red, Blue, Green, Yellow
  const unoColors = ["#EF4444", "#3B82F6", "#22C55E", "#EAB308"];
  confetti({
    particleCount: 70,
    spread: 90,
    origin: { y: 0.5 },
    colors: unoColors,
    ticks: 200,
    scalar: 1.2,
  });
};
