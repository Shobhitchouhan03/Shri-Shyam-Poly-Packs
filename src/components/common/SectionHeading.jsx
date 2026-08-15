import React from "react";
import { useGSAPReveal } from "../../utils/animation.js";

/**
 * Reusable Section Heading Component
 */
export default function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "left",
  className = "",
}) {
  const headingRef = useGSAPReveal({ delay: 0.1, duration: 0.7, y: 16, stagger: 0.1 });

  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
  };

  return (
    <div
      ref={headingRef}
      className={`flex flex-col space-y-2.5 max-w-3xl ${alignStyles[align]} ${className}`}
    >
      {eyebrow && (
        <span className="text-xs font-bold tracking-widest uppercase text-[#C59A4A]">
          {eyebrow}
        </span>
      )}

      {heading && (
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#103D2D] tracking-tight leading-tight">
          {heading}
        </h2>
      )}

      {description && (
        <p className="text-sm sm:text-base text-[#66706B] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
