"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Cake3DProps {
  isExtinguished: boolean;
}

export const Cake3D: React.FC<Cake3DProps> = ({ isExtinguished }) => {
  const groupRef = useRef<THREE.Group>(null);
  const flameLightRef = useRef<THREE.PointLight>(null);
  const smokeParticlesRef = useRef<THREE.Points>(null);
  const starsRef = useRef<THREE.Group>(null);

  // Generate a high-resolution gold "MURTAZA" label texture
  const murtazaTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Background transparent
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle metallic ribbon outline
    ctx.strokeStyle = "rgba(232, 200, 138, 0.4)";
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 25, 944, 206);

    // Gold typography
    ctx.font = "bold 92px 'Playfair Display', Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Glow
    ctx.shadowColor = "#E8C88A";
    ctx.shadowBlur = 25;

    // Gold gradient text fill
    const grad = ctx.createLinearGradient(100, 0, 924, 0);
    grad.addColorStop(0, "#F7F2EA");
    grad.addColorStop(0.3, "#E8C88A");
    grad.addColorStop(0.7, "#FFE099");
    grad.addColorStop(1, "#F7F2EA");
    ctx.fillStyle = grad;

    ctx.fillText("✦  MURTAZA  ✦", 512, 128);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Generate smoke particles for when the single candle is blown
  const smokeCount = 35;
  const smokePositions = useMemo(() => {
    const pos = new Float32Array(smokeCount * 3);
    for (let i = 0; i < smokeCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.15;
      pos[i * 3 + 1] = 1.9 + Math.random() * 0.6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
    }
    return pos;
  }, []);

  // Floating golden stardust around the cake
  const stardustCount = 40;
  const stardustPositions = useMemo(() => {
    const pos = new Float32Array(stardustCount * 3);
    for (let i = 0; i < stardustCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.4 + Math.random() * 1.1;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = -0.5 + Math.random() * 2.2;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // Gentle auto-rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.22;
    }

    // Orbiting decorative stardust
    if (starsRef.current) {
      starsRef.current.rotation.y = -elapsed * 0.15;
    }

    // Single candle flame flicker & light intensity
    if (!isExtinguished) {
      if (flameLightRef.current) {
        const noise =
          Math.sin(elapsed * 12) * 0.2 +
          Math.cos(elapsed * 17) * 0.15 +
          0.9;
        flameLightRef.current.intensity = 1.8 * noise;
      }
    } else {
      if (flameLightRef.current) {
        flameLightRef.current.intensity = 0;
      }

      // Animate single candle smoke trail rising
      if (smokeParticlesRef.current) {
        const positions = smokeParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < smokeCount; i++) {
          positions[i * 3 + 1] += 0.009; // Rise up
          positions[i * 3] += Math.sin(elapsed * 3 + i) * 0.003; // Drift
          if (positions[i * 3 + 1] > 2.8) {
            positions[i * 3 + 1] = 1.9;
          }
        }
        smokeParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.7, 0]}>
      {/* ──────────────── CATERING PLATTER / GOLD PEDESTAL ──────────────── */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[1.75, 2.0, 0.14, 64]} />
        <meshStandardMaterial
          color="#E8C88A"
          metalness={0.92}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[0.35, 0.55, 0.18, 36]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.88} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[1.9, 1.9, 0.08, 64]} />
        <meshStandardMaterial color="#0A0B14" metalness={0.8} roughness={0.15} />
      </mesh>
      <mesh position={[0, -0.56, 0]}>
        <torusGeometry args={[1.9, 0.04, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* ──────────────── TIER 1 (BOTTOM TIER) ──────────────── */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.72, 64]} />
        <meshStandardMaterial
          color="#0B0F22"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <torusGeometry args={[1.51, 0.045, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.18} />
      </mesh>
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

      {/* ──────────────── TIER 2 (MIDDLE TIER) WITH "MURTAZA" ──────────────── */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.65, 64]} />
        <meshStandardMaterial
          color="#13112E"
          roughness={0.28}
          metalness={0.25}
        />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <torusGeometry args={[1.06, 0.04, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.18} />
      </mesh>
      <mesh position={[0, 0.82, 0]}>
        <torusGeometry args={[1.06, 0.04, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.18} />
      </mesh>

      {/* ✦ EMBOSSED GOLD "MURTAZA" NAME PLAQUE ON THE FRONT OF TIER 2 ✦ */}
      {murtazaTexture && (
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry
            args={[1.062, 1.062, 0.35, 64, 1, true, -Math.PI / 3, (2 * Math.PI) / 3]}
          />
          <meshStandardMaterial
            map={murtazaTexture}
            transparent
            metalness={0.85}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Back side "MURTAZA" so it's visible as the cake rotates */}
      {murtazaTexture && (
        <mesh position={[0, 0.5, 0]} rotation={[0, Math.PI, 0]}>
          <cylinderGeometry
            args={[1.062, 1.062, 0.35, 64, 1, true, -Math.PI / 3, (2 * Math.PI) / 3]}
          />
          <meshStandardMaterial
            map={murtazaTexture}
            transparent
            metalness={0.85}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Champagne Gold Drip Glaze Layer on Tier 2 */}
      <mesh position={[0, 0.83, 0]}>
        <cylinderGeometry args={[1.07, 1.07, 0.035, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.92} roughness={0.2} />
      </mesh>
      {/* Hanging Gold Drip Droplets */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const dripLength = 0.12 + (i % 3) * 0.06;
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
      <mesh position={[0, 1.08, 0]}>
        <cylinderGeometry args={[0.68, 0.68, 0.5, 64]} />
        <meshStandardMaterial
          color="#18153B"
          roughness={0.25}
          metalness={0.3}
        />
      </mesh>
      <mesh position={[0, 0.84, 0]}>
        <torusGeometry args={[0.69, 0.035, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.18} />
      </mesh>
      <mesh position={[0, 1.33, 0]}>
        <torusGeometry args={[0.69, 0.035, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.18} />
      </mesh>
      <mesh position={[0, 1.335, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.03, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.88} roughness={0.22} />
      </mesh>

      {/* ──────────────── EXACTLY ONE MAJESTIC BIRTHDAY CANDLE ──────────────── */}
      <group position={[0, 1.35, 0]}>
        {/* Candle Golden Base Socket */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 0.04, 24]} />
          <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Tall Elegant Candle Body (Champagne Ivory with gold fluting) */}
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.54, 32]} />
          <meshStandardMaterial
            color="#F7F2EA"
            metalness={0.35}
            roughness={0.25}
          />
        </mesh>

        {/* Spiral Gold Bands around the single candle */}
        <mesh position={[0, 0.18, 0]}>
          <torusGeometry args={[0.052, 0.009, 12, 32]} />
          <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.38, 0]}>
          <torusGeometry args={[0.052, 0.009, 12, 32]} />
          <meshStandardMaterial color="#E8C88A" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Candle Black Wick */}
        <mesh position={[0, 0.57, 0]}>
          <cylinderGeometry args={[0.009, 0.009, 0.07, 12]} />
          <meshStandardMaterial color="#111111" />
        </mesh>

        {/* Candle Flame (Dual-layer realistic fire) */}
        {!isExtinguished ? (
          <group position={[0, 0.67, 0]}>
            {/* Outer Warm Golden-Amber Flame */}
            <mesh>
              <coneGeometry args={[0.065, 0.19, 24]} />
              <meshBasicMaterial color="#FF9E00" transparent opacity={0.88} />
            </mesh>
            {/* Inner White-Hot Core */}
            <mesh position={[0, -0.025, 0]}>
              <coneGeometry args={[0.035, 0.12, 20]} />
              <meshBasicMaterial color="#FFFBEA" />
            </mesh>
            {/* Dynamic Candle Light with Warm Glow */}
            <pointLight
              ref={flameLightRef}
              color="#FFA500"
              intensity={2.0}
              distance={4.0}
              decay={2}
            />
          </group>
        ) : null}
      </group>

      {/* ──────────────── RISING SMOKE PARTICLES (WHEN EXTINGUISHED) ──────────────── */}
      {isExtinguished && (
        <points ref={smokeParticlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[smokePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.065}
            color="#D1D5DB"
            transparent
            opacity={0.4}
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
