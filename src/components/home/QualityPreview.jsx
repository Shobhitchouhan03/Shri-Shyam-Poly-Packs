import React from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading.jsx";
import Button from "../common/Button.jsx";
import SafeImage from "../common/SafeImage.jsx";
import { qualityImages } from "../../data/imageRegistry.js";
import { useGSAPReveal } from "../../utils/animation.js";
import { ShieldCheck, Check, ArrowRight } from "lucide-react";

export default function QualityPreview() {
  const revealRef = useGSAPReveal({ y: 24 });

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#103D2D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={revealRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Quality Visual Column */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#103D2D]/20 group">
              <SafeImage
                src={qualityImages.inspection}
                alt="Quality Inspection & Tensile Testing Laboratory"
                loading="lazy"
                className="w-full h-[360px] sm:h-[400px] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#103D2D]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-bold text-[#C59A4A] uppercase tracking-wider">
                  Testing Protocol Laboratory
                </span>
                <p className="text-sm font-extrabold text-white">
                  Tensile Tensometer & Drop Impact Testing Bench
                </p>
              </div>
            </div>
          </div>

          {/* Quality Content Column */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <SectionHeading
              eyebrow="Zero Defect Commitment"
              heading="Strict Quality Standards for Zero Seepage & Rupture"
              description="Quality is the core pillar of Shri Shyam Poly Packs. Every batch of fabric and stitched sack undergoes rigorous laboratory testing before dispatch."
            />

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#171A18]">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#F6F4EE] border border-[#103D2D]/10">
                <Check className="w-4 h-4 text-[#1D6448] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#103D2D]">Tensile Strength & Elongation Test</strong>
                  <span className="text-[#66706B]">Verifies warp and weft breaking tenacity under heavy stress.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#F6F4EE] border border-[#103D2D]/10">
                <Check className="w-4 h-4 text-[#1D6448] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#103D2D]">Seam Bursting & Stitching Lock Test</strong>
                  <span className="text-[#66706B]">Ensures bottom seams do not split under 3-meter drop impacts.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#F6F4EE] border border-[#103D2D]/10">
                <Check className="w-4 h-4 text-[#1D6448] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#103D2D]">UV Accelerated Weatherometer Test</strong>
                  <span className="text-[#66706B]">Tests fabric endurance under prolonged tropical sunlight exposure.</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/quality">
                <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                  Explore Quality Assurance Standards
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
