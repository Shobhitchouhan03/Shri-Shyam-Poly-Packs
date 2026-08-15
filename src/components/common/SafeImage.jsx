import React, { useState } from "react";
import { fallbackImage } from "../../data/imageRegistry.js";
import { Package } from "lucide-react";

/**
 * SafeImage Component
 * Robust Vite-compatible image component featuring:
 * - Defined source validation
 * - Skeleton loading state
 * - Branded fallback UI on error
 * - Zero broken icons or raw browser alt text
 * - decoding="async" and fetchpriority support
 */
export default function SafeImage({
  src,
  alt = "Shri Shyam Poly Packs Industrial Woven Packaging",
  className = "",
  loading = "lazy",
  decoding = "async",
  fetchPriority = "low",
  onClick,
  fallback = fallbackImage,
  aspectRatio = "aspect-4/3",
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Validate imported src
  const validSrc = (!src || typeof src !== "string" || hasError) ? fallback : src;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton Loading State */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#103D2D]/10 via-[#103D2D]/20 to-[#103D2D]/10 animate-pulse z-10" />
      )}

      {/* Render Image or Fallback */}
      {!hasError ? (
        <img
          src={validSrc}
          alt={alt}
          loading={loading}
          decoding={decoding}
          fetchpriority={fetchPriority}
          onLoad={handleLoad}
          onError={handleError}
          onClick={onClick}
          className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          {...props}
        />
      ) : (
        /* Branded Fallback Visual Component */
        <div className="w-full h-full bg-[#103D2D] p-6 flex flex-col items-center justify-center text-center space-y-2 text-white">
          <div className="w-10 h-10 rounded-full bg-[#1D6448] text-[#C59A4A] flex items-center justify-center border border-[#C59A4A]/30">
            <Package className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-[#C59A4A] tracking-wider uppercase">
            Shri Shyam Poly Packs
          </span>
          <span className="text-[10px] text-gray-200">Industrial Woven Packaging</span>
        </div>
      )}
    </div>
  );
}
