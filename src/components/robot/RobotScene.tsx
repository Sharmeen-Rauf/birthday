"use client";

import React, { useRef, useState, useEffect } from "react";
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
}

function RobotModel({
  isPoweringOn,
  isSpeaking,
  speechIntensity,
  smileMode,
  lookAtCamera,
  headTilt,
}: RobotModelProps) {
  const headGroupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouthGroupRef = useRef<THREE.Group>(null);
  const chestCoreRef = useRef<THREE.Mesh>(null);

  const [isBlinking, setIsBlinking] = useState(false);

  // Random natural blink sequence
  useEffect(() => {
    let blinkTimer: NodeJS.Timeout;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        blinkTimer = setTimeout(triggerBlink, 2800 + Math.random() * 3200);
      }, 130);
    };
    blinkTimer = setTimeout(triggerBlink, 2500);
    return () => clearTimeout(blinkTimer);
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Head subtle tracking & breathing motion
    if (headGroupRef.current) {
      if (lookAtCamera) {
        // Look directly into lens
        headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          headGroupRef.current.rotation.x,
          0.05 + Math.sin(time * 2) * 0.02,
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
        // Track mouse cursor gently with soft breathing
        const targetRotY = state.pointer.x * 0.45;
        const targetRotX = -state.pointer.y * 0.3 + Math.sin(time * 1.5) * 0.03;
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
          headTilt + (smileMode === 2 ? 0.06 : 0),
          0.08
        );
      }
    }

    // Eye blinking and speech pulse
    const eyeScaleY = isBlinking ? 0.08 : isSpeaking ? 1 + Math.sin(time * 25) * 0.15 : 1;
    if (leftEyeRef.current) leftEyeRef.current.scale.y = eyeScaleY;
    if (rightEyeRef.current) {
      // If smirk (smileMode 2), right eye slightly winks/narrows
      rightEyeRef.current.scale.y = smileMode === 2 ? eyeScaleY * 0.75 : eyeScaleY;
    }

    // Mouth audio spectrum animation
    if (mouthGroupRef.current) {
      mouthGroupRef.current.children.forEach((bar, idx) => {
        const mesh = bar as THREE.Mesh;
        if (isSpeaking) {
          const wave = Math.abs(Math.sin(time * 20 + idx * 0.8)) * speechIntensity;
          mesh.scale.y = THREE.MathUtils.lerp(mesh.scale.y, 0.4 + wave * 2.2, 0.3);
        } else if (smileMode === 3) {
          // Genuine curved wide smile
          const curve = Math.sin((idx / 6) * Math.PI) * 0.6;
          mesh.scale.y = 0.5 + curve;
          mesh.position.y = -0.32 + curve * 0.06;
        } else if (smileMode === 2) {
          // Sarcastic lopsided smirk
          const smirk = (idx / 6) * 0.5;
          mesh.scale.y = 0.3 + smirk;
          mesh.position.y = -0.32 + smirk * 0.05;
        } else if (smileMode === 1) {
          // Polite social smile
          mesh.scale.y = 0.4;
          mesh.position.y = -0.32;
        } else {
          mesh.scale.y = 0.25;
          mesh.position.y = -0.32;
        }
      });
    }

    // Chest Kaszsoft reactor core pulse
    if (chestCoreRef.current) {
      const coreIntensity = isPoweringOn
        ? 1.2 + Math.sin(time * 4) * 0.4
        : 0.4;
      chestCoreRef.current.scale.setScalar(
        1 + (isSpeaking ? speechIntensity * 0.08 : 0)
      );
    }
  });

  // Metallic Material Constants
  const obsidianBody = (
    <meshStandardMaterial
      color="#0D0E15"
      metalness={0.92}
      roughness={0.18}
      envMapIntensity={1.2}
    />
  );

  const gunmetalAccent = (
    <meshStandardMaterial
      color="#1A1B28"
      metalness={0.88}
      roughness={0.25}
    />
  );

  const purpleNeonGlow = (
    <meshStandardMaterial
      color="#A855F7"
      emissive="#9333EA"
      emissiveIntensity={isPoweringOn ? (isSpeaking ? 3.5 : 2.6) : 0.2}
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
          {obsidianBody}
        </mesh>

        {/* Chamfered Collar Plate */}
        <mesh position={[0, 0.98, 0.06]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[1.15, 0.35, 0.65]} />
          {gunmetalAccent}
        </mesh>

        {/* Central Hexagonal Kaszsoft Arc Reactor */}
        <group position={[0, 0.52, 0.4]}>
          {/* Reactor Outer Ring */}
          <mesh rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.24, 0.24, 0.08, 6]} />
            {gunmetalAccent}
          </mesh>
          {/* Reactor Glowing Core */}
          <mesh ref={chestCoreRef} position={[0, 0, 0.02]}>
            <cylinderGeometry args={[0.16, 0.16, 0.09, 16]} />
            {cyanAccentGlow}
          </mesh>
          {/* Point light emitted by the reactor */}
          {isPoweringOn && (
            <pointLight
              color="#67E8F9"
              intensity={isSpeaking ? 2.5 : 1.5}
              distance={2.5}
            />
          )}
        </group>

        {/* Left & Right Shoulder Pods */}
        <mesh position={[-0.82, 0.85, 0]}>
          <sphereGeometry args={[0.28, 16, 16]} />
          {obsidianBody}
        </mesh>
        <mesh position={[0.82, 0.85, 0]}>
          <sphereGeometry args={[0.28, 16, 16]} />
          {obsidianBody}
        </mesh>

        {/* Violet Shoulder Accent Strips */}
        <mesh position={[-0.82, 0.98, 0.08]}>
          <boxGeometry args={[0.25, 0.04, 0.3]} />
          {purpleNeonGlow}
        </mesh>
        <mesh position={[0.82, 0.98, 0.08]}>
          <boxGeometry args={[0.25, 0.04, 0.3]} />
          {purpleNeonGlow}
        </mesh>
      </group>

      {/* ================= NECK ARTICULATION ================= */}
      <group position={[0, 1.1, 0]}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.26, 0.28, 16]} />
          {gunmetalAccent}
        </mesh>
        {/* Glowing conduit ring around neck */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.24, 0.02, 8, 24]} />
          {purpleNeonGlow}
        </mesh>
      </group>

      {/* ================= HEAD & FACE ================= */}
      <group ref={headGroupRef} position={[0, 1.48, 0.04]}>
        {/* Cranial Helmet Shell */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.88, 0.95, 0.88]} />
          {obsidianBody}
        </mesh>

        {/* Tapered Crown Top */}
        <mesh position={[0, 0.48, -0.05]} rotation={[-0.08, 0, 0]}>
          <boxGeometry args={[0.76, 0.18, 0.76]} />
          {gunmetalAccent}
        </mesh>

        {/* Dark Visor / Faceplate (Inspired by Murtaza's sharp jaw & brow line) */}
        <mesh position={[0, -0.02, 0.38]}>
          <boxGeometry args={[0.78, 0.72, 0.22]} />
          <meshStandardMaterial
            color="#08070F"
            metalness={0.95}
            roughness={0.08}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* Angular Jaw / Chin Plate */}
        <mesh position={[0, -0.42, 0.32]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.54, 0.26, 0.32]} />
          {gunmetalAccent}
        </mesh>

        {/* Dual Glowing Purple Eyes */}
        <group position={[0, 0.08, 0.49]}>
          {/* Left Eye */}
          <mesh ref={leftEyeRef} position={[-0.2, 0, 0]}>
            <boxGeometry args={[0.18, 0.07, 0.04]} />
            {purpleNeonGlow}
          </mesh>
          {/* Right Eye */}
          <mesh ref={rightEyeRef} position={[0.2, 0, 0]}>
            <boxGeometry args={[0.18, 0.07, 0.04]} />
            {purpleNeonGlow}
          </mesh>

          {/* Point lights from eyes when powered on */}
          {isPoweringOn && (
            <>
              <pointLight
                position={[-0.2, 0, 0.2]}
                color="#C084FC"
                intensity={isSpeaking ? 3.0 : 1.8}
                distance={2.2}
              />
              <pointLight
                position={[0.2, 0, 0.2]}
                color="#C084FC"
                intensity={isSpeaking ? 3.0 : 1.8}
                distance={2.2}
              />
            </>
          )}
        </group>

        {/* Cyber Ear Pods with Neon Rings */}
        <group position={[-0.48, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 0.1, 16]} />
            {gunmetalAccent}
          </mesh>
          <mesh position={[-0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.12, 0.015, 8, 16]} />
            {cyanAccentGlow}
          </mesh>
        </group>
        <group position={[0.48, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 0.1, 16]} />
            {gunmetalAccent}
          </mesh>
          <mesh position={[0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.12, 0.015, 8, 16]} />
            {cyanAccentGlow}
          </mesh>
        </group>

        {/* Animated Digital Mouth Audio Spectrum / Smile Waveform */}
        <group ref={mouthGroupRef} position={[0, 0, 0.49]}>
          {[-0.15, -0.1, -0.05, 0, 0.05, 0.1, 0.15].map((x, idx) => (
            <mesh key={idx} position={[x, -0.32, 0]}>
              <boxGeometry args={[0.03, 0.1, 0.03]} />
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
}

export default function RobotScene({
  isPoweringOn,
  isSpeaking,
  speechIntensity,
  smileMode,
  lookAtCamera,
  headTilt = 0,
}: RobotSceneProps) {
  return (
    <div className="relative w-full h-full">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0.6, 3.4]} fov={42} />

        {/* Ambient Dark Room Lighting with Violet Rim Accent */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 3, 2]} intensity={1.2} color="#FFFFFF" />
        <directionalLight position={[-2, 1, 1]} intensity={0.8} color="#C084FC" />
        <directionalLight position={[0, -2, -1]} intensity={0.5} color="#8B5CF6" />

        {/* Gentle floating motion */}
        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
          <RobotModel
            isPoweringOn={isPoweringOn}
            isSpeaking={isSpeaking}
            speechIntensity={speechIntensity}
            smileMode={smileMode}
            lookAtCamera={lookAtCamera}
            headTilt={headTilt}
          />
        </Float>
      </Canvas>
    </div>
  );
}

