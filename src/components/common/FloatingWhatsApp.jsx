import React from "react";
import { MessageSquare } from "lucide-react";

/**
 * Floating WhatsApp Action Button
 * Triggers the global quote & specification modal with source: "Floating WhatsApp Button".
 */
export default function FloatingWhatsApp({ onOpenModal }) {
  const handleClick = () => {
    if (onOpenModal) {
      onOpenModal({ source: "Floating WhatsApp Button" });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40">
      <button
        onClick={handleClick}
        type="button"
        aria-label="Request Packaging Quote via WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 min-w-[44px] min-h-[44px] rounded-full bg-[#1D6448] text-white shadow-xl hover:bg-[#103D2D] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#C59A4A] focus:ring-offset-2 border border-[#C59A4A]/40"
      >
        {/* Animated Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-[#1D6448] opacity-75 animate-ping group-hover:animate-none pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageSquare className="w-6 h-6 text-emerald-300 relative z-10" />

        {/* Hover Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#171A18] text-white text-xs font-semibold rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md border border-[#103D2D]">
          Request Quote via WhatsApp
        </span>
      </button>
    </div>
  );
}
