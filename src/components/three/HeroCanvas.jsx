import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "./Loader.jsx";

const HeroScene = lazy(() => import("./HeroScene.jsx"));

// Cached WebGL capability check to avoid creating orphaned test contexts on every component mount
let cachedWebGLSupport = null;

function isWebGLAvailable() {
  if (cachedWebGLSupport !== null) return cachedWebGLSupport;
  if (typeof window === "undefined") return false;

  try {
    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
    const isSupported = !!gl;

    // Immediately clean up temporary test context
    if (gl) {
      const loseContext = gl.getExtension("WEBGL_lose_context");
      if (loseContext) loseContext.loseContext();
    }

    cachedWebGLSupport = isSupported;
    return isSupported;
  } catch (e) {
    cachedWebGLSupport = false;
    return false;
  }
}

/**
 * Premium 2D WebGL Fallback Graphic Component
 */
function FallbackVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl bg-gradient-to-br from-[#103D2D] to-[#1D6448] p-8 flex flex-col items-center justify-center text-center shadow-xl border border-[#C59A4A]/30">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-32 h-32 text-[#C59A4A] animate-pulse"
        >
          <rect width="100" height="100" rx="16" fill="#103D2D" />
          <path d="M15 30H85M15 50H85M15 70H85" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 15V85M50 15V85M70 15V85" stroke="#E8E0D1" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <span className="text-xs font-bold text-[#C59A4A] uppercase tracking-widest mt-4">
          Shri Shyam Poly Packs
        </span>
        <span className="text-[11px] text-gray-200 mt-1">Industrial Packaging Engineering</span>
      </div>
    </div>
  );
}

/**
 * Ultra-Stable Single Three.js Hero Canvas Component
 * Features:
 * - Cached WebGL check with immediate test-context disposal
 * - Cap DPR at 1.5 max desktop, 1.0 mobile
 * - Offscreen IntersectionObserver + document.hidden pausing
 * - Stable lifecycle with zero forced context-loss calls
 */
export default function HeroCanvas() {
  const containerRef = useRef(null);
  const [hasWebGl, setHasWebGl] = useState(isWebGLAvailable);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    // Window Resize Handler for Responsive Check
    let resizeTimer;
    const checkMobile = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };
    window.addEventListener("resize", checkMobile, { passive: true });

    // IntersectionObserver to pause rendering when hero is scrolled offscreen
    if (containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);
        },
        { threshold: 0.02 }
      );
      observer.observe(containerRef.current);

      // Visibility API listener to pause rendering when tab is hidden
      const handleVisibilityChange = () => {
        setIsTabVisible(document.visibilityState === "visible");
      };
      document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });

      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("resize", checkMobile);
        clearTimeout(resizeTimer);
      };
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!hasWebGl) {
    return <FallbackVisual />;
  }

  const isRenderingActive = isIntersecting && isTabVisible;
  const dpr = isMobile ? 1 : Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 1.5);

  return (
    <div ref={containerRef} className="w-full h-[320px] sm:h-[420px] lg:h-[500px] relative flex items-center justify-center">
      <Suspense fallback={<Loader text="Preparing Industrial Experience..." />}>
        <Canvas
          shadows={!isMobile}
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={dpr}
          frameloop={isRenderingActive ? "always" : "never"}
          gl={{
            antialias: !isMobile,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
          }}
          onCreated={({ gl }) => {
            const canvasElement = gl.domElement;
            if (!canvasElement) return;

            const handleContextLost = (event) => {
              event.preventDefault();
            };

            canvasElement.addEventListener("webglcontextlost", handleContextLost, false);
            return () => {
              canvasElement.removeEventListener("webglcontextlost", handleContextLost);
            };
          }}
          className="w-full h-full"
        >
          <HeroScene isMobile={isMobile} />
        </Canvas>
      </Suspense>
    </div>
  );
}
