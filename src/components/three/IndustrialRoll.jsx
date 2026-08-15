import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

/**
 * Optimized Procedural 3D Woven Roll Component
 */
export default function IndustrialRoll({ position = [0, 0, 0], scale = 1, rotationSpeed = 0.3 }) {
  const groupRef = useRef();
  const prefersReducedMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (!groupRef.current || prefersReducedMotion) return;
    groupRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Outer Woven Polypropylene Roll Cylinder */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 2.2, 24, 8]} />
        <meshStandardMaterial
          color="#103D2D"
          roughness={0.4}
          metalness={0.15}
        />
      </mesh>

      {/* Gold End Cap Ring Top */}
      <mesh position={[0, 1.11, 0]}>
        <cylinderGeometry args={[1.12, 1.12, 0.05, 24]} />
        <meshStandardMaterial color="#C59A4A" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Gold End Cap Ring Bottom */}
      <mesh position={[0, -1.11, 0]}>
        <cylinderGeometry args={[1.12, 1.12, 0.05, 24]} />
        <meshStandardMaterial color="#C59A4A" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Central Core Tube (Reel Core) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 2.26, 16]} />
        <meshStandardMaterial color="#171A18" roughness={0.8} />
      </mesh>

      {/* Woven Cross-Band Ring 1 */}
      <mesh position={[0, 0.45, 0]}>
        <torusGeometry args={[1.11, 0.025, 8, 24]} />
        <meshStandardMaterial color="#E8E0D1" roughness={0.4} />
      </mesh>

      {/* Woven Cross-Band Ring 2 */}
      <mesh position={[0, -0.45, 0]}>
        <torusGeometry args={[1.11, 0.025, 8, 24]} />
        <meshStandardMaterial color="#E8E0D1" roughness={0.4} />
      </mesh>
    </group>
  );
}
