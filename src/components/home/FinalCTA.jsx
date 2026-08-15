import React from "react";
import Button from "../common/Button.jsx";
import { company } from "../../data/company.js";
import { buildWhatsAppEnquiryUrl } from "../../utils/whatsapp.js";
import { Phone, MessageSquare, FileText } from "lucide-react";

export default function FinalCTA({ onOpenModal }) {
  const whatsappUrl = buildWhatsAppEnquiryUrl({
    productName: "General Industrial Packaging",
  });

  return (
    <section className="bg-[#171A18] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <span className="text-xs font-bold tracking-widest uppercase text-[#C59A4A]">
          Direct Factory Contact
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
          Tell Us What You Need To Pack
        </h2>

        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Our packaging specialists are available to discuss bag sizes, fabric GSM, inner liners, print branding, and bulk dispatch schedules.
        </p>

        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button
            variant="cta"
            size="lg"
            onClick={() => onOpenModal && onOpenModal({ source: "Homepage Final CTA" })}
            icon={FileText}
            iconPosition="left"
            className="font-bold uppercase tracking-wider"
          >
            Request Quote
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => onOpenModal && onOpenModal({ source: "Homepage Final CTA" })}
            icon={MessageSquare}
            iconPosition="left"
          >
            WhatsApp Enquiry
          </Button>

          <a href={`tel:${company.phone}`}>
            <Button
              variant="outline"
              size="lg"
              icon={Phone}
              iconPosition="left"
              className="text-white border-white/30 hover:bg-white/10 hover:border-white"
            >
              Call Factory
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
