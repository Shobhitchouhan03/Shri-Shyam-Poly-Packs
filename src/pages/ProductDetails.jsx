import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import PageHero from "../components/common/PageHero.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import Button from "../components/common/Button.jsx";
import { ProductCard } from "../components/common/Card.jsx";
import SafeImage from "../components/common/SafeImage.jsx";
import SEO from "../components/common/SEO.jsx";
import { getProductSchema } from "../utils/seoSchema.js";
import { products } from "../data/products.js";
import { buildWhatsAppEnquiryUrl } from "../utils/whatsapp.js";
import { gsap } from "../utils/animation.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import {
  ShieldCheck,
  MessageSquare,
  Mail,
  CheckCircle2,
  ZoomIn,
} from "lucide-react";

export default function ProductDetails({ onOpenModal }) {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const galleryRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  // Related products in same category or fallback
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.applications.some(a => product.applications.includes(a))))
    .slice(0, 3);

  const whatsappUrl = buildWhatsAppEnquiryUrl({
    productName: product.name,
    application: product.category,
  });

  // GSAP animation when active image changes
  useEffect(() => {
    if (!galleryRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        galleryRef.current,
        { opacity: 0.8, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }, galleryRef);

    return () => ctx.revert();
  }, [activeImageIndex, prefersReducedMotion]);

  return (
    <div className="space-y-12 pb-24">
      <SEO
        title={`${product.name} Specifications | Shri Shyam Poly Packs`}
        description={product.shortDescription}
        pathname={`/products/${product.slug}`}
        jsonLd={getProductSchema(product)}
      />
      {/* Page Hero */}
      <PageHero
        eyebrow={`Specification Guide • ${product.category}`}
        title={product.name}
        subtitle={product.shortDescription}
        breadcrumbItems={[
          { label: "Products", path: "/products" },
          { label: product.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Split Section: Gallery + Technical Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Interactive Product Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Active Image Container using SafeImage */}
            <div className="relative rounded-2xl bg-white border border-[#103D2D]/10 overflow-hidden shadow-sm aspect-4/3 group">
              <div ref={galleryRef} className="w-full h-full">
                <SafeImage
                  src={galleryImages[activeImageIndex]}
                  alt={`${product.name} - View ${activeImageIndex + 1}`}
                  className={`w-full h-full object-cover object-center transition-transform duration-500 ${
                    isZoomed ? "scale-125 cursor-zoom-out" : "group-hover:scale-105 cursor-zoom-in"
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
              </div>

              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#171A18]/80 text-white text-xs font-semibold backdrop-blur-xs hover:bg-[#103D2D] transition-colors flex items-center gap-1 z-10"
              >
                <ZoomIn className="w-4 h-4 text-[#C59A4A]" />
                <span>{isZoomed ? "Zoom Out" : "Click to Zoom"}</span>
              </button>

              <div className="absolute top-3 left-3 z-10">
                <span className="text-xs font-bold text-[#C59A4A] tracking-wider uppercase px-3 py-1 rounded bg-[#103D2D]/90 border border-[#C59A4A]/30 backdrop-blur-xs">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Thumbnail Selectors with Gold Brand Border & Mobile Swipe */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none snap-x touch-pan-x">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setIsZoomed(false);
                    }}
                    aria-label={`View product image ${idx + 1}`}
                    className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden border-2 transition-all shrink-0 snap-start ${
                      activeImageIndex === idx
                        ? "border-[#C59A4A] ring-2 ring-[#C59A4A]/60 opacity-100 scale-95 shadow-md"
                        : "border-[#103D2D]/20 opacity-70 hover:opacity-100 hover:border-[#103D2D]"
                    }`}
                  >
                    <SafeImage
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                    {activeImageIndex === idx && (
                      <span className="absolute inset-0 border-2 border-[#C59A4A] rounded-xl pointer-events-none" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Overview & Customization Sidebar */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1D6448] tracking-widest uppercase">
                <ShieldCheck className="w-4 h-4 text-[#C59A4A]" />
                <span>Heavy-Duty Industrial Specification</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#103D2D] leading-tight">
                {product.name}
              </h2>

              <p className="text-xs sm:text-sm text-[#66706B] leading-relaxed">
                {product.fullDescription || product.shortDescription}
              </p>

              {/* Key Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-[#F6F4EE] p-3 rounded-lg border border-[#103D2D]/10 text-xs space-y-1">
                  <span className="text-[#66706B] font-medium">Material Polymer</span>
                  <p className="font-bold text-[#103D2D]">{product.material}</p>
                </div>
                <div className="bg-[#F6F4EE] p-3 rounded-lg border border-[#103D2D]/10 text-xs space-y-1">
                  <span className="text-[#66706B] font-medium">Lamination Finish</span>
                  <p className="font-bold text-[#103D2D]">{product.laminated}</p>
                </div>
                <div className="bg-[#F6F4EE] p-3 rounded-lg border border-[#103D2D]/10 text-xs space-y-1">
                  <span className="text-[#66706B] font-medium">Printing Options</span>
                  <p className="font-bold text-[#103D2D]">{product.printed}</p>
                </div>
                <div className="bg-[#F6F4EE] p-3 rounded-lg border border-[#103D2D]/10 text-xs space-y-1">
                  <span className="text-[#66706B] font-medium">Order Status</span>
                  <p className="font-bold text-[#C59A4A]">{product.customizationOptions}</p>
                </div>
              </div>

              {/* Applications Tags */}
              <div className="pt-2">
                <span className="block text-xs font-bold text-[#103D2D] uppercase mb-2">Suitable Industry Sectors:</span>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white border border-[#103D2D]/20 text-[#103D2D] text-xs rounded-full font-semibold"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-6 border-t border-[#103D2D]/10 space-y-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onOpenModal && onOpenModal({ source: `Product Detail — ${product.name}`, productName: product.name, name: product.name })}
                icon={Mail}
                iconPosition="left"
                className="w-full font-bold shadow-md"
              >
                Discuss Your Requirement
              </Button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#1D6448] text-white text-sm font-semibold hover:bg-[#103D2D] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                <span>WhatsApp Specification Enquiry</span>
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Performance Features & Specifications Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-[#103D2D]/10 pt-12">
          {/* Features Column */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              eyebrow="Technical Advantages"
              heading="Engineering Features & Performance"
            />

            <ul className="space-y-3 text-xs sm:text-sm text-[#171A18]">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#103D2D]/10 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#1D6448] shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications Table Column */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              eyebrow="Technical Standards"
              heading="Technical Specifications Matrix"
            />

            {product.specifications ? (
              <div className="bg-white rounded-xl border border-[#103D2D]/10 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <tbody className="divide-y divide-[#103D2D]/10">
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? "bg-white" : "bg-[#F6F4EE]/50"}>
                        <td className="py-3 px-4 font-bold text-[#103D2D] w-1/2">{key}</td>
                        <td className="py-3 px-4 text-[#171A18] font-medium w-1/2">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6 bg-white rounded-xl border border-[#103D2D]/10 text-xs text-[#66706B]">
                Full technical data sheet available upon request. Contact our sales desk.
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#103D2D]/10 pt-12 space-y-8">
            <SectionHeading
              eyebrow="Related Solutions"
              heading="Explore Similar Packaging Products"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onEnquire={() => onOpenModal && onOpenModal(rel)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#103D2D] text-white p-3.5 pb-safe border-t border-[#C59A4A]/30 shadow-2xl flex items-center justify-between gap-3">
        <div className="truncate">
          <p className="text-[11px] text-[#C59A4A] font-bold uppercase tracking-wider">Custom Packaging</p>
          <p className="text-xs font-bold text-white truncate">{product.name}</p>
        </div>
        <Button
          variant="cta"
          size="sm"
          onClick={() => onOpenModal && onOpenModal(product)}
          className="shrink-0 font-bold uppercase tracking-wider"
        >
          Enquire Now
        </Button>
      </div>
    </div>
  );
}
