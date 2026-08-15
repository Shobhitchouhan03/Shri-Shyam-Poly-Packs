import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { company } from "../data/company.js";
import { heroImages } from "../data/imageRegistry.js";
import { useGSAPReveal } from "../utils/animation.js";
import Button from "../components/common/Button.jsx";
import SafeImage from "../components/common/SafeImage.jsx";
import SEO from "../components/common/SEO.jsx";
import { getOrganizationSchema } from "../utils/seoSchema.js";
import { ShieldCheck, ArrowRight, FileText, CheckCircle2 } from "lucide-react";

// Home Components
import TrustStrip from "../components/home/TrustStrip.jsx";
import FeaturedProducts from "../components/home/FeaturedProducts.jsx";
import AboutPreview from "../components/home/AboutPreview.jsx";
import ManufacturingProcess from "../components/home/ManufacturingProcess.jsx";
import IndustriesGrid from "../components/home/IndustriesGrid.jsx";
import WhyChooseUs from "../components/home/WhyChooseUs.jsx";
import CustomPackagingCTA from "../components/home/CustomPackagingCTA.jsx";
import QualityPreview from "../components/home/QualityPreview.jsx";
import SocialConnect from "../components/home/SocialConnect.jsx";
import FinalCTA from "../components/home/FinalCTA.jsx";

// Lazy Load Three.js Hero Canvas
const HeroCanvas = lazy(() => import("../components/three/HeroCanvas.jsx"));

export default function Home({ onOpenModal }) {
  // GSAP Entrance reveal for Hero elements
  const heroRevealRef = useGSAPReveal({ delay: 0.05, duration: 0.8, y: 24, stagger: 0.12 });

  return (
    <div className="space-y-0 overflow-x-hidden">
      <SEO
        title="Shri Shyam Poly Packs | Industrial Woven Packaging Solutions"
        description="Explore PP woven bags, HDPE woven bags, laminated sacks, printed packaging, fabric rolls and custom industrial packaging solutions from Shri Shyam Poly Packs."
        pathname="/"
        jsonLd={getOrganizationSchema()}
      />
      {/* HERO SECTION WITH VITE-SAFE HERO IMAGE IMPORT & 3D CANVAS */}
      <section className="relative bg-[#103D2D] text-white pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#C59A4A]/30 overflow-hidden">
        {/* Background Image using SafeImage */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <SafeImage
            src={heroImages.factoryHero}
            alt="Packaging Factory Infrastructure"
            loading="eager"
            className="w-full h-full filter brightness-40 contrast-125 blur-xs scale-105"
          />
          {/* Dark Forest Color Grading Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#103D2D]/95 via-[#103D2D]/85 to-[#103D2D]/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#103D2D] via-transparent to-[#103D2D]/80" />
        </div>

        {/* Background Grid Pattern Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#C59A4A 1px, transparent 1px), linear-gradient(to right, #C59A4A 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Hero Left Content */}
          <div ref={heroRevealRef} className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D6448]/90 text-[#C59A4A] text-xs font-semibold tracking-wider uppercase border border-[#C59A4A]/40 backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-[#C59A4A]" />
              <span>Industrial Woven Packaging Solutions</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-heading drop-shadow-md">
              Packaging Strength That Moves Industries Forward
            </h1>

            <p className="text-base sm:text-xl text-gray-100 leading-relaxed font-sans max-w-2xl mx-auto lg:mx-0 drop-shadow-xs">
              Premium woven packaging solutions engineered for agriculture, food grains, fertilizers, construction and industrial applications.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
              <Link to="/products">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="bg-[#1D6448] hover:bg-[#103D2D] border-white/20 font-bold shadow-lg"
                >
                  Explore Products
                </Button>
              </Link>

              <Button
                variant="cta"
                size="lg"
                onClick={() => onOpenModal && onOpenModal({ source: "Homepage Hero" })}
                icon={FileText}
                iconPosition="left"
                className="font-bold uppercase tracking-wider shadow-xl"
              >
                Request Quote
              </Button>
            </div>

            {/* Small Trust Row */}
            <div className="pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-200">
              <div className="flex items-center justify-center lg:justify-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C59A4A]" />
                <span>Custom Manufacturing</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C59A4A]" />
                <span>Bulk Supply</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C59A4A]" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C59A4A]" />
                <span>Printing Available</span>
              </div>
            </div>
          </div>

          {/* Hero Right: 3D Procedural Visual */}
          <div className="lg:col-span-5 flex items-center justify-center relative z-20">
            <Suspense
              fallback={
                <div className="w-full h-80 flex items-center justify-center text-xs text-gray-200">
                  Loading 3D Visual...
                </div>
              }
            >
              <HeroCanvas />
            </Suspense>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* FEATURED PRODUCTS */}
      <FeaturedProducts onOpenModal={onOpenModal} />

      {/* ABOUT PREVIEW */}
      <AboutPreview />

      {/* MANUFACTURING PROCESS */}
      <ManufacturingProcess />

      {/* INDUSTRIES */}
      <IndustriesGrid onOpenModal={onOpenModal} />

      {/* WHY CHOOSE US */}
      <WhyChooseUs />

      {/* CUSTOM PACKAGING CTA */}
      <CustomPackagingCTA onOpenModal={onOpenModal} />

      {/* QUALITY PREVIEW */}
      <QualityPreview />

      {/* CONNECT WITH US — SOCIAL MEDIA SECTION */}
      <SocialConnect />

      {/* FINAL CTA */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
}
