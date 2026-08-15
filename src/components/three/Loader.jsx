import React from "react";
import { Package } from "lucide-react";

/**
 * Industrial 3D Loading Fallback Placeholder
 */
export default function Loader({ text = "Preparing Industrial Experience..." }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#103D2D]/60 rounded-2xl border border-[#C59A4A]/20 backdrop-blur-xs">
      <div className="w-12 h-12 rounded-full bg-[#1D6448] text-[#C59A4A] flex items-center justify-center shadow-lg border border-[#C59A4A]/40 animate-pulse">
        <Package className="w-6 h-6" />
      </div>
      <span className="text-xs font-bold text-[#C59A4A] uppercase tracking-widest">
        {text}
      </span>
      <span className="text-[10px] text-gray-200">Shri Shyam Poly Packs Industrial 3D</span>
    </div>
  );
}
