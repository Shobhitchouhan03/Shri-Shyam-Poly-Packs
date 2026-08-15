import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

/**
 * BackToTop Component
 * Uses IntersectionObserver sentinel at top: 300px to toggle button visibility.
 * Zero scroll listeners, zero GSAP computed style reads, zero forced reflows.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Create an invisible sentinel element at top: 300px
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "300px";
    sentinel.style.left = "0";
    sentinel.style.width = "100%";
    sentinel.style.height = "1px";
    sentinel.style.pointerEvents = "none";
    sentinel.setAttribute("aria-hidden", "true");
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Visible when page is scrolled past sentinel
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (document.body.contains(sentinel)) {
        document.body.removeChild(sentinel);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      type="button"
      aria-label="Back to top"
      className={`fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-40 p-3 rounded-full bg-[#103D2D] text-white shadow-lg hover:bg-[#1D6448] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C59A4A] border border-[#C59A4A]/30 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <ChevronUp className="w-5 h-5 text-[#C59A4A]" />
    </button>
  );
}
