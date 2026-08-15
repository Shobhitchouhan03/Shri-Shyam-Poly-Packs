import React from "react";
import { Environment as DreiEnvironment } from "@react-three/drei";

/**
 * Dark Industrial Studio Environment & Soft Fog
 */
export default function Environment() {
  return (
    <>
      {/* Soft Fog to blend background */}
      <fog attach="fog" args={["#103D2D", 6, 22]} />

      {/* Lightweight Drei Studio Environment Map */}
      <DreiEnvironment preset="studio" environmentIntensity={0.6} />
    </>
  );
}
