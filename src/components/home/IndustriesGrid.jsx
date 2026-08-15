import React from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading.jsx";
import SafeImage from "../common/SafeImage.jsx";
import { industries } from "../../data/industries.js";
import { useGSAPReveal } from "../../utils/animation.js";
import { ArrowRight } from "lucide-react";

export default function IndustriesGrid({ onOpenModal }) {
  const revealRef = useGSAPReveal({ y: 24, stagger: 0.1 });

  return (
    <section className="py-16 sm:py-24 bg-[#F6F4EE] border-b border-[#103D2D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Market Applications"
            heading="Serving Critical Industrial Sectors"
            description="Our woven packaging products are tailor-engineered to meet strict safety and handling compliance standards across diverse business sectors."
          />

          <Link to="/industries" className="shrink-0">
            <span className="text-xs sm:text-sm font-bold text-[#103D2D] hover:text-[#1D6448] inline-flex items-center gap-1.5 transition-colors">
              <span>View All Industries</span>
              <ArrowRight className="w-4 h-4 text-[#C59A4A]" />
            </span>
          </Link>
        </div>

        <div ref={revealRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.slice(0, 8).map((ind) => (
            <div
              key={ind.id}
              className="group bg-white rounded-xl border border-[#103D2D]/10 hover:border-[#103D2D]/30 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-44 bg-[#103D2D] overflow-hidden">
                <SafeImage
                  src={ind.image}
                  alt={ind.name}
                  loading="lazy"
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#103D2D] via-[#103D2D]/40 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-base font-bold text-white leading-tight">
                    {ind.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#66706B] leading-relaxed line-clamp-3">
                  {ind.description}
                </p>

                <button
                  type="button"
                  onClick={() => onOpenModal && onOpenModal({ name: `${ind.name} Packaging` })}
                  className="pt-3 text-xs font-bold text-[#103D2D] hover:text-[#1D6448] inline-flex items-center gap-1 transition-colors border-t border-[#103D2D]/10 w-full"
                >
                  <span>Request Sector Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C59A4A]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
