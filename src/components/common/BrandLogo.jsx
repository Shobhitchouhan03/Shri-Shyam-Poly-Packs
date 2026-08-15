import React from "react";
import { Link } from "react-router-dom";

/**
 * Unified Responsive Brand Logo Component — Shri Shyam Poly Packs
 * Features icon-only SVG logo asset + responsive HTML brand typography.
 * 
 * Variants:
 * - "responsive" (default): 320-390px -> "Shri Shyam", 391-767px -> "Shri Shyam Poly Packs", >=768px -> Full + Subtitle
 * - "full": Full brand name + subtitle
 * - "compact": Full brand name without subtitle
 * - "short": Shortened brand name ("Shri Shyam") without subtitle
 * - "icon": Icon only
 */
export default function BrandLogo({
  variant = "responsive",
  theme = "dark",
  className = "",
}) {
  const isLight = theme === "light";

  // Standalone Icon-Only Logo Asset (NO text embedded inside the SVG asset)
  const IconSymbol = (
    <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-[#0F4A37] border border-[#D4A23C]/80 flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105 overflow-hidden">
      <img
        src="/shri-shyam-poly-packs-icon.svg"
        alt="Shri Shyam Poly Packs Icon"
        className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
      />
    </div>
  );

  if (variant === "icon") {
    return (
      <Link
        to="/"
        aria-label="Shri Shyam Poly Packs Home"
        className={`inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-[#D4A23C] focus:ring-offset-2 rounded-md ${className}`}
      >
        {IconSymbol}
      </Link>
    );
  }

  return (
    <Link
      to="/"
      aria-label="Shri Shyam Poly Packs Home"
      className={`inline-flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-[#D4A23C] focus:ring-offset-2 rounded-md p-1 ${className}`}
    >
      {IconSymbol}

      <div className="flex flex-col justify-center min-w-0">
        {/* Responsive Brand Title (HTML Text) */}
        {variant === "responsive" && (
          <>
            {/* 320px - 390px: Short Title */}
            <span
              className={`block sm:hidden font-extrabold text-sm tracking-tight leading-none font-heading transition-colors truncate ${
                isLight ? "text-[#0F4A37]" : "text-[#F7F5EE]"
              }`}
            >
              Shri Shyam
            </span>

            {/* 391px+: Full Title */}
            <span
              className={`hidden sm:block font-extrabold text-base sm:text-lg tracking-tight leading-none font-heading transition-colors whitespace-nowrap ${
                isLight ? "text-[#0F4A37]" : "text-[#F7F5EE]"
              }`}
            >
              Shri Shyam Poly Packs
            </span>

            {/* >= 768px (md): Industrial Subtitle */}
            <span
              className={`hidden md:block text-[10px] xl:text-[11px] font-bold tracking-wider uppercase mt-1 whitespace-nowrap ${
                isLight ? "text-[#0F4A37]" : "text-[#D4A23C]"
              }`}
            >
              INDUSTRIAL PACKAGING SOLUTIONS
            </span>
          </>
        )}

        {variant === "full" && (
          <>
            <span
              className={`font-extrabold text-base sm:text-lg tracking-tight leading-none font-heading transition-colors whitespace-nowrap ${
                isLight ? "text-[#0F4A37]" : "text-[#F7F5EE]"
              }`}
            >
              Shri Shyam Poly Packs
            </span>
            <span
              className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase mt-1 whitespace-nowrap ${
                isLight ? "text-[#0F4A37]" : "text-[#D4A23C]"
              }`}
            >
              INDUSTRIAL PACKAGING SOLUTIONS
            </span>
          </>
        )}

        {variant === "compact" && (
          <span
            className={`font-extrabold text-base sm:text-lg tracking-tight leading-none font-heading transition-colors whitespace-nowrap ${
              isLight ? "text-[#0F4A37]" : "text-[#F7F5EE]"
            }`}
          >
            Shri Shyam Poly Packs
          </span>
        )}

        {variant === "short" && (
          <span
            className={`font-extrabold text-sm sm:text-base tracking-tight leading-none font-heading transition-colors whitespace-nowrap ${
              isLight ? "text-[#0F4A37]" : "text-[#F7F5EE]"
            }`}
          >
            Shri Shyam
          </span>
        )}
      </div>
    </Link>
  );
}
