import React from "react";
import PageHero from "../components/common/PageHero.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import Button from "../components/common/Button.jsx";
import SafeImage from "../components/common/SafeImage.jsx";
import SEO from "../components/common/SEO.jsx";
import { industries } from "../data/industries.js";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function Industries({ onOpenModal }) {
  return (
    <div className="space-y-16 pb-20">
      <SEO
        title="Industrial Solutions & Sectors | Shri Shyam Poly Packs"
        description="Sector-specific woven packaging engineered for agriculture, food grains, fertilizers, construction, chemicals, and industrial exports."
        pathname="/industries"
      />
      <PageHero
        eyebrow="Market Coverage"
        title="Industries We Serve"
        subtitle="Custom woven packaging solutions engineered for agriculture, chemical powders, food grains, construction, and export shipping."
        breadcrumbItems={[{ label: "Industries" }]}
      >
        <div className="pt-2">
          <Button variant="cta" size="md" onClick={onOpenModal}>
            Discuss Sector Requirement
          </Button>
        </div>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeading
          eyebrow="Target Applications"
          heading="Sector-Specific Packaging Engineered for Heavy Loads"
          description="Different industries demand unique bag specifications—ranging from breathable unlaminated mesh for fresh agricultural produce to moisture-proof BOPP laminated valve sacks for cement."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className="bg-white rounded-xl border border-[#103D2D]/10 hover:border-[#103D2D]/30 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-48 bg-[#103D2D] overflow-hidden">
                <SafeImage
                  src={ind.image}
                  alt={ind.name}
                  loading="lazy"
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#103D2D] via-[#103D2D]/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {ind.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-[#66706B] leading-relaxed">
                  {ind.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#103D2D]/10">
                  <div className="flex items-center gap-2 text-xs text-[#103D2D] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#1D6448]" />
                    <span>Custom Denier & GSM</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#103D2D] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#1D6448]" />
                    <span>Moisture & Dust Barrier</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onOpenModal && onOpenModal({ name: `${ind.name} Packaging` })}
                    className="w-full justify-between"
                  >
                    <span>Request Sector Recommendation</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C59A4A]" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
