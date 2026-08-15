import React from "react";
import PageHero from "../components/common/PageHero.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import Button from "../components/common/Button.jsx";
import SafeImage from "../components/common/SafeImage.jsx";
import SEO from "../components/common/SEO.jsx";
import { qualityImages } from "../data/imageRegistry.js";
import { ShieldCheck, CheckCircle2, Award, FileCheck } from "lucide-react";

export default function Quality({ onOpenModal }) {
  return (
    <div className="space-y-16 pb-20">
      <SEO
        title="Quality Control & Testing Standards | Shri Shyam Poly Packs"
        description="Learn about Shri Shyam Poly Packs' tensile load testing, drop impact towers, UV stabilization, and zero-defect quality assurance."
        pathname="/quality"
      />
      <PageHero
        eyebrow="Quality Management"
        title="Quality Assurance & Testing Standards"
        subtitle="Zero-defect manufacturing protocols ensuring zero material seepage, high drop resistance, and certified load capacity."
        breadcrumbItems={[{ label: "Quality Assurance" }]}
      >
        <div className="pt-2">
          <Button variant="cta" size="md" onClick={onOpenModal}>
            Request Quality Audit Report
          </Button>
        </div>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Main Quality Editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              eyebrow="Laboratory Benchmarks"
              heading="Comprehensive In-House Inspection Lab"
              description="Our manufacturing unit features an in-house laboratory equipped with digital tensometers, burst pressure testers, drop towers, and UV accelerated weatherometers."
            />

            <p className="text-xs sm:text-sm text-[#66706B] leading-relaxed">
              Every production shift conducts mandatory sampling across raw polymer melt index, tape denier uniform variance, circular loom weave density, stitch tensile breaking load, and lamination peel strength.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-[#171A18]">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-[#103D2D]/10">
                <CheckCircle2 className="w-4 h-4 text-[#1D6448]" />
                <span>3-Meter Drop Test Pass</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-[#103D2D]/10">
                <CheckCircle2 className="w-4 h-4 text-[#1D6448]" />
                <span>Zero Seepage Seam Stitch</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-[#103D2D]/10">
                <CheckCircle2 className="w-4 h-4 text-[#1D6448]" />
                <span>UV Weatherization Test</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-[#103D2D]/10">
                <CheckCircle2 className="w-4 h-4 text-[#1D6448]" />
                <span>Virgin Polymer Certificate</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#103D2D]/20 group">
              <SafeImage
                src={qualityImages.inspection}
                alt="Tensile Testing & Quality Control Laboratory"
                loading="lazy"
                className="w-full h-[400px] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#103D2D]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-bold text-[#C59A4A] uppercase tracking-wider">
                  Testing Facility
                </span>
                <p className="text-sm font-extrabold text-white">
                  Tensile Load & Seam Bursting Tensometer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quality Testing Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#103D2D]/10 space-y-3">
            <div className="w-10 h-10 rounded bg-[#103D2D]/10 flex items-center justify-center text-[#1D6448]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#103D2D]">Tensile Testing</h3>
            <p className="text-xs text-[#66706B] leading-relaxed">
              Verifies warp and weft yarn tensile strength to guarantee load stability under heavy industrial stacking.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#103D2D]/10 space-y-3">
            <div className="w-10 h-10 rounded bg-[#103D2D]/10 flex items-center justify-center text-[#1D6448]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#103D2D]">Drop & Impact Test</h3>
            <p className="text-xs text-[#66706B] leading-relaxed">
              Full 50 kg loaded sacks are dropped repeatedly from 3-meter heights to verify seam integrity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#103D2D]/10 space-y-3">
            <div className="w-10 h-10 rounded bg-[#103D2D]/10 flex items-center justify-center text-[#1D6448]">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#103D2D]">Peel Adhesion Test</h3>
            <p className="text-xs text-[#66706B] leading-relaxed">
              Measures BOPP and poly extrusion coating bond strength to eliminate delamination risks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#103D2D]/10 space-y-3">
            <div className="w-10 h-10 rounded bg-[#103D2D]/10 flex items-center justify-center text-[#1D6448]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#103D2D]">UV Stabilization</h3>
            <p className="text-xs text-[#66706B] leading-relaxed">
              Ensures sacks withstand 500+ hours of outdoor tropical sunlight exposure without degrading.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
