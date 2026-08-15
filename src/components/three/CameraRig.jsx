import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

/**
 * Animated Camera Breathing & Parallax Rig
 * Bypass on mobile devices for maximum frame performance
 */
export default function CameraRig({ isMobile = false }) {
  const groupRef = useRef();
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion || isMobile) return;

    // Slow desktop breathing motion
    const t = state.clock.getElapsedTime();
    groupRef.current.position.x = Math.sin(t * 0.3) * 0.12;
    groupRef.current.position.y = Math.cos(t * 0.25) * 0.08;
    groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.015;
  });

  return <group ref={groupRef} />;
}
