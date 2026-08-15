import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

// Cached WebGL check
let cachedMiniWebGLSupport = null;

function isWebGLAvailable() {
  if (cachedMiniWebGLSupport !== null) return cachedMiniWebGLSupport;
  if (typeof window === "undefined") return false;

  try {
    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
    const isSupported = !!gl;

    if (gl) {
      const loseContext = gl.getExtension("WEBGL_lose_context");
      if (loseContext) loseContext.loseContext();
    }

    cachedMiniWebGLSupport = isSupported;
    return isSupported;
  } catch (e) {
    cachedMiniWebGLSupport = false;
    return false;
  }
}

/**
 * Miniature 3D Model Renderer for Cards & Headers
 */
function MiniModel({ type = "bag" }) {
  const meshRef = useRef();
  const prefersReducedMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (!meshRef.current || prefersReducedMotion) return;
    meshRef.current.rotation.y += delta * 0.4;
  });

  if (type === "roll") {
    return (
      <group ref={meshRef}>
        <mesh castShadow>
          <cylinderGeometry args={[0.7, 0.7, 1.4, 24]} />
          <meshStandardMaterial color="#103D2D" roughness={0.4} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.71, 0]}>
          <cylinderGeometry args={[0.71, 0.71, 0.04, 24]} />
          <meshStandardMaterial color="#C59A4A" metalness={0.7} />
        </mesh>
      </group>
    );
  }

  // Default: Woven Sack Bag Model
  return (
    <group ref={meshRef}>
      <mesh castShadow>
        <boxGeometry args={[1.0, 1.4, 0.25, 8, 8, 4]} />
        <meshStandardMaterial color="#F6F4EE" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.71, 0]}>
        <boxGeometry args={[1.02, 0.05, 0.27]} />
        <meshStandardMaterial color="#103D2D" />
      </mesh>
      <mesh position={[0, 0.1, 0.13]}>
        <planeGeometry args={[0.8, 0.4]} />
        <meshStandardMaterial color="#103D2D" />
      </mesh>
      <mesh position={[0, 0.25, 0.14]}>
        <planeGeometry args={[0.8, 0.04]} />
        <meshStandardMaterial color="#C59A4A" metalness={0.6} />
      </mesh>
    </group>
  );
}

/**
 * Lightweight Mini Product 3D Canvas
 * Pauses rendering automatically when offscreen or tab is hidden.
 */
export default function Product3DVisual({ type = "bag", className = "w-full h-32" }) {
  const containerRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [hasWebGl] = useState(isWebGLAvailable);

  useEffect(() => {
    // IntersectionObserver to pause offscreen rendering
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);

    // Tab Visibility API listener
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (!hasWebGl) return null;

  const isRenderingActive = isIntersecting && isTabVisible;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 40 }}
        dpr={1}
        frameloop={isRenderingActive ? "always" : "never"}
        gl={{ antialias: false, powerPreference: "low-power" }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 3]} intensity={1.2} />
        <directionalLight position={[-3, -2, -3]} intensity={0.4} color="#C59A4A" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <MiniModel type={type} />
        </Float>
      </Canvas>
    </div>
  );
}
