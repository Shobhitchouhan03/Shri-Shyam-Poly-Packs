import React from "react";
import { Float, ContactShadows } from "@react-three/drei";
import Lights from "./Lights.jsx";
import Environment from "./Environment.jsx";
import CameraRig from "./CameraRig.jsx";
import IndustrialBag from "./IndustrialBag.jsx";
import IndustrialRoll from "./IndustrialRoll.jsx";

/**
 * Main Cinematic Hero 3D Industrial Scene
 */
export default function HeroScene({ isMobile = false }) {
  return (
    <>
      {/* Animated Camera Rig */}
      <CameraRig isMobile={isMobile} />

      {/* Industrial Lighting Rig */}
      <Lights isMobile={isMobile} />

      {/* Studio Environment & Soft Fog */}
      <Environment />

      {/* Primary Floating Models */}
      <group position={[0, 0, 0]}>
        {/* Main Floating Woven Fabric Roll */}
        <Float
          speed={isMobile ? 1 : 2}
          rotationIntensity={isMobile ? 0.2 : 0.4}
          floatIntensity={isMobile ? 0.3 : 0.6}
        >
          <IndustrialRoll position={isMobile ? [0, 0, 0] : [-0.9, 0.2, 0]} scale={isMobile ? 0.8 : 1.05} />
        </Float>

        {/* Secondary Floating Woven Sack (Desktop Only) */}
        {!isMobile && (
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <IndustrialBag position={[1.3, -0.2, -0.5]} scale={0.85} rotationSpeed={-0.2} />
          </Float>
        )}
      </group>

      {/* Ground Contact Shadows (Desktop Only) */}
      {!isMobile && (
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.45}
          scale={7}
          blur={2.5}
          far={5}
        />
      )}
    </>
  );
}
