import React from "react";
import PageHero from "../components/common/PageHero.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import Button from "../components/common/Button.jsx";
import SafeImage from "../components/common/SafeImage.jsx";
import SEO from "../components/common/SEO.jsx";
import { company } from "../data/company.js";
import { companyImages, manufacturingImages } from "../data/imageRegistry.js";
import { ShieldCheck, Factory, Award, CheckCircle2 } from "lucide-react";

export default function About({ onOpenModal }) {
  return (
    <div className="space-y-16 pb-20">
      <SEO
        title="About Shri Shyam Poly Packs | Industrial Packaging Engineering"
        description="Learn about Shri Shyam Poly Packs' manufacturing infrastructure, polypropylene extrusion, circular weaving looms, and rigid quality assurance standards."
        pathname="/about"
      />
      <PageHero
        eyebrow="Company Profile"
        title={`About ${company.name}`}
        subtitle="Leading industrial packaging manufacturer dedicated to extreme strength, durability, and B2B excellence."
        breadcrumbItems={[{ label: "About Us" }]}
      >
        <div className="pt-2">
          <Button variant="cta" size="md" onClick={onOpenModal}>
            Discuss Your Requirement
          </Button>
        </div>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Main Editorial Image & Text Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              eyebrow="Engineering Standards"
              heading="Built for Heavy Loads & Harsh Transport"
              description="We specialize in engineering woven polypropylene and high-density polyethylene packaging solutions designed for severe load-bearing conditions across agriculture, construction, chemical processing, and food grain sectors."
            />

            <p className="text-xs sm:text-sm text-[#66706B] leading-relaxed">
              From tape extrusion denier control to high-speed circular weaving and extrusion lamination, our manufacturing facility operates under rigid quality benchmarks to ensure zero material seepage and zero bag rupture in transit.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-[#171A18]">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-[#103D2D]/10">
                <CheckCircle2 className="w-4 h-4 text-[#1D6448]" />
                <span>100% Virgin Polymer</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-[#103D2D]/10">
                <CheckCircle2 className="w-4 h-4 text-[#1D6448]" />
                <span>Custom GSM & Denier</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-[#103D2D]/10">
                <CheckCircle2 className="w-4 h-4 text-[#1D6448]" />
                <span>Multi-Color Printing</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-[#103D2D]/10">
                <CheckCircle2 className="w-4 h-4 text-[#1D6448]" />
                <span>Pan-India Supply</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#103D2D]/20 group">
              <SafeImage
                src={companyImages.factoryPlant}
                alt="Shri Shyam Poly Packs Manufacturing Plant"
                loading="lazy"
                className="w-full h-[400px] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#103D2D]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-bold text-[#C59A4A] uppercase tracking-wider">
                  Factory Floor Infrastructure
                </span>
                <p className="text-sm font-extrabold text-white">
                  State-of-the-Art Extrusion & Circular Weaving Looms
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure & Quality Section with SafeImage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-[#103D2D]/10 overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="h-48 overflow-hidden relative">
              <SafeImage
                src={manufacturingImages.weaving}
                alt="Circular Weaving Machinery"
                loading="lazy"
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-[#103D2D]/10 pointer-events-none" />
            </div>
            <div className="p-6 space-y-3">
              <div className="w-10 h-10 rounded bg-[#103D2D]/10 flex items-center justify-center text-[#1D6448]">
                <Factory className="w-5 h-5 text-[#1D6448]" />
              </div>
              <h3 className="text-xl font-bold text-[#103D2D]">Extrusion & Weaving Machinery</h3>
              <p className="text-xs sm:text-sm text-[#66706B] leading-relaxed">
                Our plant houses high-output flat yarn extrusion lines and 6-shuttle circular looms capable of producing tight weave mesh densities from 8x8 to 14x14.
              </p>
            </div>
          </div>

          <div className="bg-[#103D2D] text-white rounded-2xl border border-[#C59A4A]/30 overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="h-48 overflow-hidden relative">
              <SafeImage
                src={manufacturingImages.extrusion}
                alt="Tape Extrusion Plant"
                loading="lazy"
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-[#103D2D]/30 mix-blend-multiply pointer-events-none" />
            </div>
            <div className="p-6 space-y-3">
              <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center text-[#C59A4A]">
                <Award className="w-5 h-5 text-[#C59A4A]" />
              </div>
              <h3 className="text-xl font-bold text-[#C59A4A]">Quality Assurance Framework</h3>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                Every production lot is subjected to rigorous drop tests, seam bursting measurements, and UV weatherometer exposure to guarantee reliable load containment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
