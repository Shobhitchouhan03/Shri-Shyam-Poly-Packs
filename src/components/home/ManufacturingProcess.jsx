import React, { useEffect, useRef } from "react";
import SectionHeading from "../common/SectionHeading.jsx";
import { gsap } from "../../utils/animation.js";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

const processSteps = [
  { step: "01", title: "Raw Material", desc: "Virgin PP & HDPE resin selection and quality verification." },
  { step: "02", title: "Extrusion", desc: "High-speed tape plant producing high-tenacity flat yarn." },
  { step: "03", title: "Weaving", desc: "Circular looms weaving high-density tabular and flat fabric." },
  { step: "04", title: "Lamination", desc: "Extrusion coating of protective poly or BOPP layer." },
  { step: "05", title: "Printing", desc: "Corona-treated multi-color flexographic brand printing." },
  { step: "06", title: "Cutting", desc: "Heat & cold precision cutting according to bag dimensions." },
  { step: "07", title: "Stitching", desc: "Reinforced bottom hem stitching and liner insertion." },
  { step: "08", title: "Inspection", desc: "Bursting, tensile, and drop resistance testing per batch." },
  { step: "09", title: "Packing", desc: "Hydraulic bale pressing and protective wrap bundling." },
  { step: "10", title: "Dispatch", desc: "Timely nationwide logistics dispatch to client facility." },
];

export default function ManufacturingProcess() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Progress Line Growth animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              end: "bottom 85%",
              scrub: 0.5,
            },
          }
        );
      }

      // Step Cards Stagger
      gsap.fromTo(
        ".process-step-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SectionHeading
        align="center"
        eyebrow="Precision Engineering"
        heading="Our 10-Step Manufacturing Process"
        description="Every stage of production is controlled to ensure optimal load strength, zero seepage, and precise branding."
      />

      <div ref={containerRef} className="relative pt-4">
        {/* Central Progress Line for Desktop */}
        <div
          ref={lineRef}
          className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#1D6448] via-[#C59A4A] to-[#103D2D] -translate-x-1/2 origin-top"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {processSteps.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={item.step}
                className={`process-step-card relative flex items-start gap-4 p-5 rounded-xl bg-white border border-[#103D2D]/10 hover:border-[#103D2D]/30 hover:shadow-md transition-all duration-300 ${
                  isEven ? "lg:text-right lg:flex-row-reverse" : "lg:text-left"
                }`}
              >
                {/* Step Number Badge */}
                <div className="w-10 h-10 rounded-lg bg-[#103D2D] text-[#C59A4A] font-extrabold text-sm flex items-center justify-center shrink-0 border border-[#C59A4A]/30 shadow-xs">
                  {item.step}
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#103D2D]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#66706B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
