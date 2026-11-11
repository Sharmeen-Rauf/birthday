"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Cake3DProps {
  isExtinguished: boolean;
}

export const Cake3D: React.FC<Cake3DProps> = ({ isExtinguished }) => {
  const groupRef = useRef<THREE.Group>(null);
  const flame1Ref = useRef<THREE.PointLight>(null);
  const flame2Ref = useRef<THREE.PointLight>(null);
  const flame3Ref = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // Gentle slow rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.25;
    }

    // Flicker candle lights
    if (!isExtinguished) {
      const flicker = Math.sin(elapsed * 12) * 0.15 + Math.cos(elapsed * 17) * 0.1 + 0.85;
      if (flame1Ref.current) flame1Ref.current.intensity = 1.6 * flicker;
      if (flame2Ref.current) flame2Ref.current.intensity = 1.4 * flicker;
      if (flame3Ref.current) flame3Ref.current.intensity = 1.5 * flicker;
    } else {
      if (flame1Ref.current) flame1Ref.current.intensity = 0;
      if (flame2Ref.current) flame2Ref.current.intensity = 0;
      if (flame3Ref.current) flame3Ref.current.intensity = 0;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Cake Stand Base - Metallic Gold */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[1.5, 1.8, 0.12, 48]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.3, 0.45, 0.2, 32]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.58, 0]}>
        <cylinderGeometry args={[1.7, 1.7, 0.08, 48]} />
        <meshStandardMaterial color="#F7F2EA" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Bottom Tier: Midnight Blue */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.35, 1.35, 0.7, 48]} />
        <meshStandardMaterial color="#0E1224" roughness={0.35} metalness={0.15} />
      </mesh>

      {/* Gold Trim Beads - Bottom Tier */}
      <mesh position={[0, 0.16, 0]}>
        <torusGeometry args={[1.36, 0.04, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.54, 0]}>
        <torusGeometry args={[1.36, 0.04, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Top Tier: Deep Royal Midnight Violet */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.6, 48]} />
        <meshStandardMaterial color="#14142B" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Gold Trim Beads - Top Tier */}
      <mesh position={[0, 0.76, 0]}>
        <torusGeometry args={[0.91, 0.035, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <torusGeometry args={[0.91, 0.035, 16, 64]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Champagne Gold Drip/Frosting details */}
      <mesh position={[0, 0.76, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.03, 48]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* 3 Birthday Candles - Slim Gold/Ivory */}
      {/* Candle 1 (Center) */}
      <group position={[0, 1.0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.045, 0.045, 0.45, 24]} />
          <meshStandardMaterial color="#F7F2EA" roughness={0.4} />
        </mesh>
        {/* Candle wick */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.06, 12]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        {/* Candle flame */}
        {!isExtinguished && (
          <group position={[0, 0.32, 0]}>
            <mesh>
              <coneGeometry args={[0.04, 0.12, 16]} />
              <meshBasicMaterial color="#FFB703" />
            </mesh>
            <pointLight ref={flame1Ref} color="#FFAA00" intensity={1.5} distance={3.5} />
          </group>
        )}
      </group>

      {/* Candle 2 (Left) */}
      <group position={[-0.38, 0.98, 0.15]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 24]} />
          <meshStandardMaterial color="#E8C88A" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.23, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.06, 12]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        {!isExtinguished && (
          <group position={[0, 0.3, 0]}>
            <mesh>
              <coneGeometry args={[0.035, 0.1, 16]} />
              <meshBasicMaterial color="#FFB703" />
            </mesh>
            <pointLight ref={flame2Ref} color="#FFAA00" intensity={1.4} distance={3.0} />
          </group>
        )}
      </group>

      {/* Candle 3 (Right) */}
      <group position={[0.38, 0.98, -0.15]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 24]} />
          <meshStandardMaterial color="#E8C88A" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.23, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.06, 12]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        {!isExtinguished && (
          <group position={[0, 0.3, 0]}>
            <mesh>
              <coneGeometry args={[0.035, 0.1, 16]} />
              <meshBasicMaterial color="#FFB703" />
            </mesh>
            <pointLight ref={flame3Ref} color="#FFAA00" intensity={1.4} distance={3.0} />
          </group>
        )}
      </group>

      {/* Ambient decorative stars around the cake base */}
      <mesh position={[0.6, -0.15, 1.1]} rotation={[0, 0.4, 0]}>
        <tetrahedronGeometry args={[0.07]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-0.8, -0.15, 0.9]} rotation={[0.3, 0, 0]}>
        <tetrahedronGeometry args={[0.06]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-0.4, 0.5, 0.7]} rotation={[0.2, 0.5, 0]}>
        <tetrahedronGeometry args={[0.05]} />
        <meshStandardMaterial color="#E8C88A" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
};
