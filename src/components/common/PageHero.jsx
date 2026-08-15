import React from "react";
import Breadcrumb from "./Breadcrumb.jsx";
import { useGSAPReveal } from "../../utils/animation.js";

/**
 * Reusable Page Hero Component
 * Apple × Caterpillar industrial style page header banner
 */
export default function PageHero({
  title,
  subtitle,
  eyebrow,
  breadcrumbItems = [],
  children,
  className = "",
}) {
  const heroRef = useGSAPReveal({ delay: 0.05, duration: 0.7, y: 20, stagger: 0.1 });

  return (
    <section className={`relative bg-[#103D2D] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#C59A4A]/20 overflow-hidden ${className}`}>
      {/* Industrial Grid Background Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#C59A4A 1px, transparent 1px), linear-gradient(to right, #C59A4A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto space-y-4">
        {breadcrumbItems.length > 0 && (
          <div className="bg-[#171A18]/40 backdrop-blur-xs inline-block px-3 py-1 rounded border border-[#C59A4A]/20">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        )}

        <div ref={heroRef} className="space-y-3 max-w-3xl">
          {eyebrow && (
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#C59A4A]">
              {eyebrow}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal">
              {subtitle}
            </p>
          )}

          {children && <div className="pt-2">{children}</div>}
        </div>
      </div>
    </section>
  );
}
