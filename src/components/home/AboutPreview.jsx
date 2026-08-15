import React from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading.jsx";
import Button from "../common/Button.jsx";
import SafeImage from "../common/SafeImage.jsx";
import { companyImages } from "../../data/imageRegistry.js";
import { useGSAPReveal } from "../../utils/animation.js";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function AboutPreview() {
  const revealRef = useGSAPReveal({ y: 24 });

  return (
    <section className="py-16 sm:py-24 bg-[#F6F4EE] border-b border-[#103D2D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={revealRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Info Column */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              eyebrow="Company Overview"
              heading="Pioneering Excellence in Industrial Woven Packaging"
              description="Shri Shyam Poly Packs is a premier manufacturer of high-tensile polypropylene (PP) and high-density polyethylene (HDPE) packaging products."
            />

            <p className="text-xs sm:text-sm text-[#66706B] leading-relaxed">
              Equipped with modern extrusion tape plants and high-speed circular loom machinery, we produce heavy-duty woven sacks engineered to withstand rigorous transit handling, rough stacking, and extreme weather conditions.
            </p>

            <div className="space-y-2 pt-2 text-xs sm:text-sm font-semibold text-[#103D2D]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1D6448]" />
                <span>100% Virgin Polymer Raw Material Standard</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1D6448]" />
                <span>Custom GSM, Denier, Weave Mesh & Micron Liners</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1D6448]" />
                <span>Advanced Flexographic Brand Printing Capabilities</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1D6448]" />
                <span>Rigorous Quality Inspection & Load Drop Testing</span>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/about">
                <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Floor Image Column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#103D2D]/20 group">
              <SafeImage
                src={companyImages.factoryPlant}
                alt="Shri Shyam Poly Packs Factory Floor"
                loading="lazy"
                className="w-full h-[380px] sm:h-[420px] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#103D2D]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-bold text-[#C59A4A] uppercase tracking-wider">
                  State-of-the-Art Production Facility
                </span>
                <p className="text-sm font-extrabold text-white">
                  Advanced Circular Looms & High-Capacity Extrusion Lines
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
