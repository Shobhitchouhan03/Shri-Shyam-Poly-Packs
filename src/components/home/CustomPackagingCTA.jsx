import React from "react";
import Button from "../common/Button.jsx";
import { Sliders, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function CustomPackagingCTA({ onOpenModal }) {
  return (
    <section className="bg-[#103D2D] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-[#C59A4A]/30 relative overflow-hidden">
      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#C59A4A 1px, transparent 1px), linear-gradient(to right, #C59A4A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="space-y-4 max-w-2xl text-center lg:text-left">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D6448] text-[#C59A4A] text-xs font-semibold border border-[#C59A4A]/30">
            <Sliders className="w-3.5 h-3.5" />
            <span>Tailored Packaging Engineering</span>
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Need Packaging Designed Specifically For Your Product?
          </h2>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
            Specify your required bag dimensions, fabric GSM, lamination layer, inner liner thickness, and printing artwork. Our technical team will recommend the exact packaging specification.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-gray-300 pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C59A4A]" />
              <span>Custom Width & Length</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C59A4A]" />
              <span>BOPP & Poly Lamination</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C59A4A]" />
              <span>HM-HDPE Liner Insertion</span>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <Button
            variant="cta"
            size="lg"
            onClick={() => onOpenModal && onOpenModal({ source: "Custom Packaging Section" })}
            icon={ArrowRight}
            iconPosition="right"
            className="shadow-xl text-sm font-bold uppercase tracking-wider px-8"
          >
            Configure Requirement
          </Button>
        </div>
      </div>
    </section>
  );
}
