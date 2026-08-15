import React from "react";

/**
 * Premium Optimized Studio Lighting Rig
 * Features single shadow light with low shadow map resolution (512x512 desktop / 256x256 mobile)
 */
export default function Lights({ isMobile = false }) {
  return (
    <group>
      {/* Soft Ambient Fill */}
      <ambientLight intensity={0.7} color="#F6F4EE" />

      {/* Main Single Directional Key Light with Optimized Shadows */}
      <directionalLight
        position={[6, 10, 6]}
        intensity={1.2}
        color="#FFFFFF"
        castShadow={!isMobile}
        shadow-mapSize-width={isMobile ? 256 : 512}
        shadow-mapSize-height={isMobile ? 256 : 512}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0005}
      />

      {/* Gold Rim Accent Light (No Shadow Casting) */}
      <directionalLight
        position={[-6, 4, -4]}
        intensity={0.8}
        color="#C59A4A"
      />

      {/* Industrial Forest Fill Light (No Shadow Casting) */}
      <directionalLight
        position={[0, -4, 4]}
        intensity={0.4}
        color="#1D6448"
      />

      {/* Soft Top Area Light Effect */}
      <rectAreaLight
        width={8}
        height={8}
        color="#FFFFFF"
        intensity={0.4}
        position={[0, 8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
