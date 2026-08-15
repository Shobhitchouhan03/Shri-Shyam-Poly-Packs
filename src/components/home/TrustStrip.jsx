import React from "react";
import { ShieldCheck, Layers, Printer, PackageCheck, Award, Truck } from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, title: "Premium Material", desc: "100% Virgin PP Polymer" },
  { icon: Layers, title: "Custom Sizes", desc: "Tailored GSM & Dimensions" },
  { icon: Printer, title: "Printing Support", desc: "Multi-Color Flexo Printing" },
  { icon: PackageCheck, title: "Bulk Orders", desc: "High-Capacity Delivery" },
  { icon: Award, title: "Quality Checked", desc: "Tensile & Drop Tested" },
  { icon: Truck, title: "Reliable Dispatch", desc: "Pan-India Supply Network" },
];

/**
 * Trust Strip Component
 */
export default function TrustStrip() {
  return (
    <section className="bg-[#103D2D] text-white border-y border-[#C59A4A]/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-4">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#C59A4A]/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-md bg-[#1D6448] text-[#C59A4A] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-300 mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
