import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

/**
 * Optimized Procedural 3D Woven Bag Component
 */
export default function IndustrialBag({ position = [0, 0, 0], scale = 1, rotationSpeed = 0.3 }) {
  const groupRef = useRef();
  const prefersReducedMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (!groupRef.current || prefersReducedMotion) return;
    groupRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main Bag Body (Polypropylene Sack) */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2.2, 0.4, 4, 4, 2]} />
        <meshStandardMaterial
          color="#F6F4EE"
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* Top Stitched Hem Band */}
      <mesh castShadow position={[0, 1.12, 0]}>
        <boxGeometry args={[1.54, 0.08, 0.44]} />
        <meshStandardMaterial color="#103D2D" roughness={0.3} />
      </mesh>

      {/* Bottom Seam Seal */}
      <mesh castShadow position={[0, -1.12, 0]}>
        <boxGeometry args={[1.54, 0.08, 0.44]} />
        <meshStandardMaterial color="#103D2D" roughness={0.3} />
      </mesh>

      {/* Brand Printed Gold Label Strip */}
      <mesh position={[0, 0.2, 0.21]}>
        <planeGeometry args={[1.3, 0.6]} />
        <meshStandardMaterial color="#103D2D" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Gold Brand Accent Bar */}
      <mesh position={[0, 0.4, 0.22]}>
        <planeGeometry args={[1.3, 0.06]} />
        <meshStandardMaterial color="#C59A4A" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Cross Weave Ribs */}
      <mesh position={[0, -0.4, 0.21]}>
        <planeGeometry args={[1.2, 0.04]} />
        <meshStandardMaterial color="#C59A4A" metalness={0.5} />
      </mesh>
    </group>
  );
}
