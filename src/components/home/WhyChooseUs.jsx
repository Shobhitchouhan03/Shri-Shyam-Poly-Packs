import React from "react";
import SectionHeading from "../common/SectionHeading.jsx";
import { ShieldCheck, Sliders, Award, Factory, Printer, PackageCheck, Headphones, Layers } from "lucide-react";
import { FeatureCard } from "../common/Card.jsx";

const whyList = [
  { icon: ShieldCheck, title: "Strong Material", desc: "Virgin high-tenacity PP polymer providing superior bursting strength." },
  { icon: Sliders, title: "Customization", desc: "Tailored GSM, width, length, denier, gusseting, and liner choices." },
  { icon: Award, title: "Quality Inspection", desc: "Multi-point testing for seam strength, drop safety, and UV resistance." },
  { icon: Factory, title: "Reliable Manufacturing", desc: "Modern automated plant ensuring fast turnarounds and consistent output." },
  { icon: Printer, title: "Printing Support", desc: "High-definition flexo & BOPP lamination printing up to multi-color layouts." },
  { icon: PackageCheck, title: "Bulk Capability", desc: "Equipped to handle large industrial supply contracts without delay." },
  { icon: Headphones, title: "Customer Support", desc: "Dedicated technical team assisting with packaging selection." },
  { icon: Layers, title: "Industrial Expertise", desc: "Decades of manufacturing understanding across agro and chemical sectors." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SectionHeading
        align="center"
        eyebrow="Competitive Advantage"
        heading="Why Industry Leaders Rely On Us"
        description="We combine advanced weaving infrastructure with strict raw material quality control to protect your product in transit."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {whyList.map((item, idx) => (
          <FeatureCard
            key={idx}
            icon={item.icon}
            title={item.title}
            description={item.desc}
          />
        ))}
      </div>
    </section>
  );
}
