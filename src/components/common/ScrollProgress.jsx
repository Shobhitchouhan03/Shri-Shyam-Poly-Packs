import React, { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

/**
 * ScrollProgress Component
 * Hardware-accelerated (transform: scaleX) thin gold accent bar.
 * Uses cached maxScroll height updated via ResizeObserver so scroll listener does NOT trigger forced reflows.
 */
export default function ScrollProgress() {
  const [progressRatio, setProgressRatio] = useState(0);
  const maxScrollRef = useRef(1);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Cache total scrollable height once and update on resize
    const updateMaxScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      maxScrollRef.current = Math.max(1, scrollHeight - innerHeight);
    };

    updateMaxScroll();

    // Use ResizeObserver to monitor document height changes cleanly without scroll layout reads
    const resizeObserver = new ResizeObserver(() => {
      updateMaxScroll();
    });
    resizeObserver.observe(document.documentElement);

    let ticking = false;
    let rafId = null;

    const handleScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          // Zero scrollHeight layout reads here; use cached maxScrollRef
          const currentRatio = Math.min(1, Math.max(0, window.scrollY / maxScrollRef.current));
          setProgressRatio(currentRatio);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#103D2D]/20 z-50 pointer-events-none"
    >
      <div
        className="h-full bg-[#C59A4A] transition-transform duration-75 ease-out shadow-xs origin-left"
        style={{ transform: `scaleX(${progressRatio})` }}
      />
    </div>
  );
}
