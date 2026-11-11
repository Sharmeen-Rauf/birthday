"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface RobotModelProps {
  isPoweringOn: boolean;
  isSpeaking: boolean;
  speechIntensity: number; // 0 to 1
  smileMode: number; // 0: neutral, 1: social, 2: smirk, 3: genuine
  lookAtCamera: boolean;
  headTilt: number; // custom tilt angle
  showFaceProjection?: boolean;
}

function RobotModel({
  isPoweringOn,
  isSpeaking,
  speechIntensity,
  smileMode,
  lookAtCamera,
  headTilt,
  showFaceProjection = false,
}: RobotModelProps) {
  const headGroupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouthGroupRef = useRef<THREE.Group>(null);
  const chestCoreRef = useRef<THREE.Mesh>(null);
  const holoPlaneRef = useRef<THREE.Mesh>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);

  const [isBlinking, setIsBlinking] = useState(false);

  // Load Murtaza's reference portrait as a holographic visor projection texture
  const murtazaTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load("/images/background image-start.png");
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

  // Natural blink sequence
  useEffect(() => {
    let blinkTimer: NodeJS.Timeout;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        blinkTimer = setTimeout(triggerBlink, 3000 + Math.random() * 3000);
      }, 120);
    };
    blinkTimer = setTimeout(triggerBlink, 2600);
    return () => clearTimeout(blinkTimer);
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Head tracking & natural micro-movements
    if (headGroupRef.current) {
      if (lookAtCamera) {
        // Leans in slightly and looks straight into the screen
        headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          headGroupRef.current.rotation.x,
          0.08 + Math.sin(time * 2.2) * 0.015,
          0.1
        );
        headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          headGroupRef.current.rotation.y,
          0,
          0.1
        );
        headGroupRef.current.rotation.z = THREE.MathUtils.lerp(
          headGroupRef.current.rotation.z,
          headTilt,
          0.1
        );
      } else {
        // Smoothly tracks cursor or touch with natural breathing rhythm
        const targetRotY = state.pointer.x * 0.4;
        const targetRotX = -state.pointer.y * 0.25 + Math.sin(time * 1.5) * 0.025;
        headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          headGroupRef.current.rotation.y,
          targetRotY,
          0.06
        );
        headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          headGroupRef.current.rotation.x,
          targetRotX,
          0.06
        );
        headGroupRef.current.rotation.z = THREE.MathUtils.lerp(
          headGroupRef.current.rotation.z,
          headTilt + (smileMode === 2 ? 0.05 : 0),
          0.08
        );
      }
    }

    // Eye blinking and speech resonance
    const eyeScaleY = isBlinking ? 0.08 : isSpeaking ? 1 + Math.sin(time * 24) * 0.12 : 1;
    if (leftEyeRef.current) leftEyeRef.current.scale.y = eyeScaleY;
    if (rightEyeRef.current) {
      // Smirk (smileMode 2) narrows the right eye playfully
      rightEyeRef.current.scale.y = smileMode === 2 ? eyeScaleY * 0.72 : eyeScaleY;
    }

    // Mouth audio spectrum animation
    if (mouthGroupRef.current) {
      mouthGroupRef.current.children.forEach((bar, idx) => {
        const mesh = bar as THREE.Mesh;
        if (isSpeaking) {
          const wave = Math.abs(Math.sin(time * 22 + idx * 0.9)) * speechIntensity;
          mesh.scale.y = THREE.MathUtils.lerp(mesh.scale.y, 0.35 + wave * 2.2, 0.3);
        } else if (smileMode === 3) {
          // Mode 3: Genuine warm smile curvature
          const curve = Math.sin((idx / 6) * Math.PI) * 0.65;
          mesh.scale.y = 0.45 + curve;
          mesh.position.y = -0.32 + curve * 0.07;
        } else if (smileMode === 2) {
          // Mode 2: Mischievous lopsided smirk
          const smirk = (idx / 6) * 0.55;
          mesh.scale.y = 0.3 + smirk;
          mesh.position.y = -0.32 + smirk * 0.06;
        } else if (smileMode === 1) {
          // Mode 1: Social smile
          mesh.scale.y = 0.38;
          mesh.position.y = -0.32;
        } else {
          mesh.scale.y = 0.22;
          mesh.position.y = -0.32;
        }
      });
    }

    // Holographic face projection & biometric scan line
    if (holoPlaneRef.current) {
      const targetOpacity =
        (showFaceProjection || lookAtCamera || smileMode === 3) && isPoweringOn
          ? 0.45 + Math.sin(time * 3) * 0.08
          : isPoweringOn
          ? 0.18
          : 0;
      const mat = holoPlaneRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.1);
    }

    if (scanLineRef.current) {
      // Moving laser scan line
      scanLineRef.current.position.y = Math.sin(time * 2.5) * 0.3;
    }

    // Chest Kaszsoft arc core pulse
    if (chestCoreRef.current) {
      const corePulse = isPoweringOn ? 1 + Math.sin(time * 3.5) * 0.1 : 0.8;
      chestCoreRef.current.scale.setScalar(corePulse);
    }
  });

  // Metallic & Lighting Materials
  const obsidianArmor = (
    <meshStandardMaterial
      color="#0D0E16"
      metalness={0.92}
      roughness={0.2}
      envMapIntensity={1.2}
    />
  );

  const sweptHairMaterial = (
    <meshStandardMaterial
      color="#12101B"
      metalness={0.78}
      roughness={0.35}
    />
  );

  const titaniumAccent = (
    <meshStandardMaterial
      color="#1C1D2A"
      metalness={0.88}
      roughness={0.25}
    />
  );

  const purpleNeonGlow = (
    <meshStandardMaterial
      color="#C084FC"
      emissive="#9333EA"
      emissiveIntensity={isPoweringOn ? (isSpeaking ? 3.4 : 2.5) : 0.2}
      toneMapped={false}
    />
  );

  const cyanAccentGlow = (
    <meshStandardMaterial
      color="#67E8F9"
      emissive="#06B6D4"
      emissiveIntensity={isPoweringOn ? 2.2 : 0.1}
      toneMapped={false}
    />
  );

  return (
    <group position={[0, -0.6, 0]}>
      {/* ================= TORSO & CHEST ================= */}
      <group position={[0, 0, 0]}>
        {/* Main Chest Armor Plate */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.35, 1.1, 0.75]} />
          {obsidianArmor}
        </mesh>

        {/* Sculpted Collar Plate */}
        <mesh position={[0, 0.98, 0.06]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[1.15, 0.35, 0.65]} />
          {titaniumAccent}
        </mesh>

        {/* Central Hexagonal Kaszsoft Arc Reactor */}
        <group position={[0, 0.52, 0.4]}>
          <mesh rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.24, 0.24, 0.08, 6]} />
            {titaniumAccent}
          </mesh>
          <mesh ref={chestCoreRef} position={[0, 0, 0.02]}>
            <cylinderGeometry args={[0.16, 0.16, 0.09, 16]} />
            {cyanAccentGlow}
          </mesh>
          {isPoweringOn && (
            <pointLight
              color="#67E8F9"
              intensity={isSpeaking ? 2.5 : 1.5}
              distance={2.5}
            />
          )}
        </group>

        {/* Left & Right Shoulder Pods with Violet Trim */}
        <mesh position={[-0.82, 0.85, 0]}>
          <sphereGeometry args={[0.28, 16, 16]} />
          {obsidianArmor}
        </mesh>
        <mesh position={[0.82, 0.85, 0]}>
          <sphereGeometry args={[0.28, 16, 16]} />
          {obsidianArmor}
        </mesh>
        <mesh position={[-0.82, 0.98, 0.08]}>
          <boxGeometry args={[0.25, 0.04, 0.3]} />
          {purpleNeonGlow}
        </mesh>
        <mesh position={[0.82, 0.98, 0.08]}>
          <boxGeometry args={[0.25, 0.04, 0.3]} />
          {purpleNeonGlow}
        </mesh>
      </group>

      {/* ================= NECK WITH NEON RING ================= */}
      <group position={[0, 1.1, 0]}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.26, 0.28, 16]} />
          {titaniumAccent}
        </mesh>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.24, 0.02, 8, 24]} />
          {purpleNeonGlow}
        </mesh>
      </group>

      {/* ================= HEAD & FACE (INSPIRED BY MURTAZA) ================= */}
      <group ref={headGroupRef} position={[0, 1.48, 0.04]}>
        {/* Cranial Helmet Base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.88, 0.92, 0.88]} />
          {obsidianArmor}
        </mesh>

        {/* SIGNATURE SWEPT-UP HAIRSTYLE (Contoured layered crests matching Murtaza's look) */}
        <group position={[0, 0.42, 0]}>
          {/* Main textured hair crown */}
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[0.84, 0.22, 0.84]} />
            {sweptHairMaterial}
          </mesh>

          {/* Front upward/back swept quiff */}
          <mesh position={[0.06, 0.16, 0.22]} rotation={[0.22, 0.08, -0.1]}>
            <boxGeometry args={[0.68, 0.18, 0.45]} />
            {sweptHairMaterial}
          </mesh>

          {/* Side volume sweep */}
          <mesh position={[-0.18, 0.14, 0.1]} rotation={[0.16, -0.12, 0.18]}>
            <boxGeometry args={[0.42, 0.16, 0.55]} />
            {sweptHairMaterial}
          </mesh>

          {/* Back taper contour */}
          <mesh position={[0, 0.04, -0.34]} rotation={[-0.25, 0, 0]}>
            <boxGeometry args={[0.76, 0.16, 0.32]} />
            {sweptHairMaterial}
          </mesh>
        </group>

        {/* Sharp Jawline & Chin Contours (Murtaza's structured jaw) */}
        <mesh position={[0, -0.42, 0.28]} rotation={[0.18, 0, 0]}>
          <boxGeometry args={[0.52, 0.26, 0.34]} />
          {titaniumAccent}
        </mesh>
        {/* Subtle goatee titanium chin plate */}
        <mesh position={[0, -0.46, 0.45]}>
          <boxGeometry args={[0.14, 0.08, 0.04]} />
          {obsidianArmor}
        </mesh>

        {/* TINTED GLASS VISOR / FACE DISPLAY */}
        <mesh position={[0, -0.04, 0.42]}>
          <boxGeometry args={[0.74, 0.68, 0.12]} />
          <meshStandardMaterial
            color="#08070F"
            metalness={0.96}
            roughness={0.06}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* HOLOGRAPHIC SCAN DISPLAY (Murtaza's actual face projection on visor) */}
        {murtazaTexture && (
          <mesh ref={holoPlaneRef} position={[0, -0.04, 0.49]}>
            <planeGeometry args={[0.66, 0.64]} />
            <meshStandardMaterial
              map={murtazaTexture}
              transparent
              opacity={0.2}
              color="#C084FC"
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Animated Cybernetic Scan Line */}
        <mesh ref={scanLineRef} position={[0, 0, 0.5]}>
          <planeGeometry args={[0.66, 0.02]} />
          <meshBasicMaterial
            color="#67E8F9"
            transparent
            opacity={isPoweringOn ? 0.6 : 0}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* DUAL GLOWING PURPLE EYES */}
        <group position={[0, 0.07, 0.51]}>
          <mesh ref={leftEyeRef} position={[-0.19, 0, 0]}>
            <boxGeometry args={[0.17, 0.065, 0.03]} />
            {purpleNeonGlow}
          </mesh>
          <mesh ref={rightEyeRef} position={[0.19, 0, 0]}>
            <boxGeometry args={[0.17, 0.065, 0.03]} />
            {purpleNeonGlow}
          </mesh>

          {isPoweringOn && (
            <>
              <pointLight
                position={[-0.19, 0, 0.18]}
                color="#C084FC"
                intensity={isSpeaking ? 3.0 : 1.8}
                distance={2.2}
              />
              <pointLight
                position={[0.19, 0, 0.18]}
                color="#C084FC"
                intensity={isSpeaking ? 3.0 : 1.8}
                distance={2.2}
              />
            </>
          )}
        </group>

        {/* CYBER EAR PODS WITH NEON RINGS */}
        <group position={[-0.48, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 0.1, 16]} />
            {titaniumAccent}
          </mesh>
          <mesh position={[-0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.12, 0.015, 8, 16]} />
            {cyanAccentGlow}
          </mesh>
        </group>
        <group position={[0.48, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 0.1, 16]} />
            {titaniumAccent}
          </mesh>
          <mesh position={[0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.12, 0.015, 8, 16]} />
            {cyanAccentGlow}
          </mesh>
        </group>

        {/* DIGITAL MOUTH AUDIO SPECTRUM & SMILE WAVEFORM */}
        <group ref={mouthGroupRef} position={[0, 0, 0.51]}>
          {[-0.15, -0.1, -0.05, 0, 0.05, 0.1, 0.15].map((x, idx) => (
            <mesh key={idx} position={[x, -0.32, 0]}>
              <boxGeometry args={[0.03, 0.09, 0.02]} />
              {idx === 3 || idx === 2 || idx === 4 ? cyanAccentGlow : purpleNeonGlow}
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

export interface RobotSceneProps {
  isPoweringOn: boolean;
  isSpeaking: boolean;
  speechIntensity: number;
  smileMode: number;
  lookAtCamera: boolean;
  headTilt?: number;
  showFaceProjection?: boolean;
}

export default function RobotScene({
  isPoweringOn,
  isSpeaking,
  speechIntensity,
  smileMode,
  lookAtCamera,
  headTilt = 0,
  showFaceProjection = false,
}: RobotSceneProps) {
  return (
    <div className="relative w-full h-full">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0.6, 3.4]} fov={42} />

        {/* Lighting setup: Dark studio with violet rim, warm key, and subtle neon red accents */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 3, 2]} intensity={1.2} color="#FFFFFF" />
        <directionalLight position={[-2, 1, 1]} intensity={0.9} color="#C084FC" />
        <directionalLight position={[0, -2, -1]} intensity={0.6} color="#8B5CF6" />
        <directionalLight position={[2.5, -1, -2]} intensity={0.45} color="#F43F5E" />

        {/* Subtle floating motion */}
        <Float speed={1.8} rotationIntensity={0.18} floatIntensity={0.35}>
          <RobotModel
            isPoweringOn={isPoweringOn}
            isSpeaking={isSpeaking}
            speechIntensity={speechIntensity}
            smileMode={smileMode}
            lookAtCamera={lookAtCamera}
            headTilt={headTilt}
            showFaceProjection={showFaceProjection}
          />
        </Float>
      </Canvas>
    </div>
  );
}
