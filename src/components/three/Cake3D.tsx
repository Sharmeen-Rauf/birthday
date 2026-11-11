"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Cake3DProps {
  isExtinguished: boolean;
}

export const Cake3D: React.FC<Cake3DProps> = ({ isExtinguished }) => {
  const groupRef = useRef<THREE.Group>(null);
  const flameLightsRef = useRef<THREE.PointLight[]>([]);
  const smokeParticlesRef = useRef<THREE.Points>(null);
  const starsRef = useRef<THREE.Group>(null);

  // Generate smoke particles for when candles are blown
  const smokeCount = 35;
  const smokePositions = useMemo(() => {
    const pos = new Float32Array(smokeCount * 3);
    for (let i = 0; i < smokeCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 1] = 1.3 + Math.random() * 0.8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    return pos;
  }, []);

  // Floating golden stardust around the cake
  const stardustCount = 45;
  const stardustPositions = useMemo(() => {
    const pos = new Float32Array(stardustCount * 3);
    for (let i = 0; i < stardustCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.4 + Math.random() * 1.2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = -0.5 + Math.random() * 2.2;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // Subtle gentle auto-rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.2;
    }

    // Orbiting decorative stardust
    if (starsRef.current) {
      starsRef.current.rotation.y = -elapsed * 0.15;
    }

    // Flicker candle lights & animate flame shapes
    if (!isExtinguished) {
      flameLightsRef.current.forEach((light, idx) => {
        if (light) {
          const noise =
            Math.sin(elapsed * 10 + idx * 2) * 0.18 +
            Math.cos(elapsed * 18 + idx) * 0.12 +
            0.9;
          light.intensity = 1.5 * noise;
        }
      });
    } else {
      flameLightsRef.current.forEach((light) => {
        if (light) light.intensity = 0;
      });

      // Animate smoke rising when extinguished
      if (smokeParticlesRef.current) {
        const positions = smokeParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < smokeCount; i++) {
          positions[i * 3 + 1] += 0.008; // Rise upward
          positions[i * 3] += Math.sin(elapsed * 3 + i) * 0.002; // Drift left-right
          if (positions[i * 3 + 1] > 2.6) {
            positions[i * 3 + 1] = 1.3;
          }
        }
        smokeParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  // Candle positions (3 tall elegant candles)
  const candleConfigs = [
    { pos: [0, 1.25, 0] as [number, number, number], height: 0.52 },
    { pos: [-0.35, 1.22, 0.15] as [number, number, number], height: 0.46 },
    { pos: [0.35, 1.22, -0.15] as [number, number, number], height: 0.46 },
  ];

  return (
    <group ref={groupRef} position={[0, -0.7, 0]}>
      {/* ──────────────── CATERING PLATTER / GOLD PEDESTAL ──────────────── */}
      {/* Heavy Platter Base */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[1.75, 2.0, 0.14, 64]} />
        <meshStandardMaterial
          color="#E8C88A"
          metalness={0.92}
          roughness={0.2}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* Pedestal Stem */}
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[0.35, 0.55, 0.18, 36]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.88} roughness={0.25} />
      </mesh>
      {/* Platter Top Mirror Surface */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[1.9, 1.9, 0.08, 64]} />
        <meshStandardMaterial color="#0A0B14" metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Platter Beaded Outer Rim */}
      <mesh position={[0, -0.56, 0]}>
        <torusGeometry args={[1.9, 0.04, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* ──────────────── TIER 1 (BOTTOM TIER) ──────────────── */}
      {/* Deep Royal Midnight Blue Velvet Body */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.72, 64]} />
        <meshStandardMaterial
          color="#0B0F22"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      {/* Bottom Tier Gold Base Rim */}
      <mesh position={[0, -0.55, 0]}>
        <torusGeometry args={[1.51, 0.045, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.18} />
      </mesh>
      {/* Bottom Tier Gold Top Rim */}
      <mesh position={[0, 0.16, 0]}>
        <torusGeometry args={[1.51, 0.045, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.18} />
      </mesh>
      {/* Bottom Tier Pearl Beads Ring */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        return (
          <mesh
            key={`b-pearl-${i}`}
            position={[Math.cos(angle) * 1.52, -0.19, Math.sin(angle) * 1.52]}
          >
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color="#F7F2EA" metalness={0.3} roughness={0.2} />
          </mesh>
        );
      })}

      {/* ──────────────── TIER 2 (MIDDLE TIER) ──────────────── */}
      {/* Midnight Indigo-Violet Tier Body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.65, 64]} />
        <meshStandardMaterial
          color="#13112E"
          roughness={0.28}
          metalness={0.25}
        />
      </mesh>
      {/* Middle Tier Gold Base Rim */}
      <mesh position={[0, 0.18, 0]}>
        <torusGeometry args={[1.06, 0.04, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.18} />
      </mesh>
      {/* Middle Tier Gold Top Rim */}
      <mesh position={[0, 0.82, 0]}>
        <torusGeometry args={[1.06, 0.04, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.18} />
      </mesh>
      {/* Champagne Gold Drip Glaze Layer on Tier 2 */}
      <mesh position={[0, 0.83, 0]}>
        <cylinderGeometry args={[1.07, 1.07, 0.035, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.92} roughness={0.2} />
      </mesh>
      {/* Hanging Gold Drip Droplets */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const dripLength = 0.14 + (i % 3) * 0.08;
        return (
          <group
            key={`drip-${i}`}
            position={[Math.cos(angle) * 1.06, 0.83 - dripLength / 2, Math.sin(angle) * 1.06]}
          >
            <mesh>
              <cylinderGeometry args={[0.025, 0.015, dripLength, 12]} />
              <meshStandardMaterial color="#E8C88A" metalness={0.92} roughness={0.2} />
            </mesh>
            <mesh position={[0, -dripLength / 2, 0]}>
              <sphereGeometry args={[0.032, 12, 12]} />
              <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.15} />
            </mesh>
          </group>
        );
      })}

      {/* ──────────────── TIER 3 (TOP TIER) ──────────────── */}
      {/* Deep Obsidian Royal Navy Tier Body */}
      <mesh position={[0, 1.08, 0]}>
        <cylinderGeometry args={[0.68, 0.68, 0.5, 64]} />
        <meshStandardMaterial
          color="#18153B"
          roughness={0.25}
          metalness={0.3}
        />
      </mesh>
      {/* Top Tier Gold Base Rim */}
      <mesh position={[0, 0.84, 0]}>
        <torusGeometry args={[0.69, 0.035, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.18} />
      </mesh>
      {/* Top Tier Gold Crown Rim */}
      <mesh position={[0, 1.33, 0]}>
        <torusGeometry args={[0.69, 0.035, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.18} />
      </mesh>
      {/* Top Frosting Glaze Disc */}
      <mesh position={[0, 1.335, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.03, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.88} roughness={0.22} />
      </mesh>

      {/* ──────────────── LUXURY GOLD MONOGRAM TOPPER ──────────────── */}
      {/* Elevated Gold Crown / Star Emblem for Murtaza */}
      <group position={[0, 1.55, 0]}>
        {/* Slender golden pillar */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.22, 12]} />
          <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Golden Diamond Star */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.18, 0.18, 0.03]} />
          <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.12} />
        </mesh>
        <mesh rotation={[0, 0, 0]}>
          <boxGeometry args={[0.14, 0.14, 0.035]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.2} roughness={0.1} />
        </mesh>
        <pointLight color="#E8C88A" intensity={0.4} distance={1.2} />
      </group>

      {/* ──────────────── 3 ARTISANAL CANDLES ──────────────── */}
      {candleConfigs.map((cfg, idx) => (
        <group key={`candle-${idx}`} position={cfg.pos}>
          {/* Candle Body: Champagne Gold / Ivory Ribbed Fluting */}
          <mesh position={[0, cfg.height / 2, 0]}>
            <cylinderGeometry args={[0.045, 0.045, cfg.height, 24]} />
            <meshStandardMaterial
              color="#F7F2EA"
              metalness={0.4}
              roughness={0.3}
            />
          </mesh>
          {/* Candle Spiral Gold Band */}
          <mesh position={[0, cfg.height * 0.45, 0]}>
            <torusGeometry args={[0.047, 0.008, 12, 24]} />
            <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.15} />
          </mesh>
          <mesh position={[0, cfg.height * 0.75, 0]}>
            <torusGeometry args={[0.047, 0.008, 12, 24]} />
            <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.15} />
          </mesh>

          {/* Candle Wick */}
          <mesh position={[0, cfg.height + 0.03, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.06, 12]} />
            <meshStandardMaterial color="#111111" />
          </mesh>

          {/* Candle Flame (Dual-layer realistic fire) */}
          {!isExtinguished ? (
            <group position={[0, cfg.height + 0.12, 0]}>
              {/* Outer Warm Golden-Amber Flame */}
              <mesh>
                <coneGeometry args={[0.05, 0.16, 20]} />
                <meshBasicMaterial color="#FF9E00" transparent opacity={0.88} />
              </mesh>
              {/* Inner White-Hot Core */}
              <mesh position={[0, -0.02, 0]}>
                <coneGeometry args={[0.028, 0.1, 16]} />
                <meshBasicMaterial color="#FFFBEA" />
              </mesh>
              {/* Dynamic Candle Point Light with Warm Radius */}
              <pointLight
                ref={(el) => {
                  if (el) flameLightsRef.current[idx] = el;
                }}
                color="#FFA500"
                intensity={1.6}
                distance={3.5}
                decay={2}
              />
            </group>
          ) : null}
        </group>
      ))}

      {/* ──────────────── RISING SMOKE TRAILS (AFTER BLOWING) ──────────────── */}
      {isExtinguished && (
        <points ref={smokeParticlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[smokePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.06}
            color="#D1D5DB"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      )}

      {/* ──────────────── CELESTIAL ORBITING STARDUST ──────────────── */}
      <group ref={starsRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[stardustPositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.045}
            color="#E8C88A"
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>
    </group>
  );
};
