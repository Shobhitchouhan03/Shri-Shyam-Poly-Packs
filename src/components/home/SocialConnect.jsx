import React, { useRef } from "react";
import { company } from "../../data/company.js";
import { Instagram, Facebook, Youtube, ExternalLink, Sparkles } from "lucide-react";
import { useGSAPReveal } from "../../utils/animation.js";

/**
 * Premium Homepage Social Media Connect Section
 * Prominently showcases Instagram, Facebook, and YouTube channels.
 */
export default function SocialConnect() {
  const containerRef = useGSAPReveal({
    y: 30,
    duration: 0.6,
    stagger: 0.1,
  });

  const socialPlatforms = [
    {
      name: "Instagram",
      handle: "@shri_shyam_polypack",
      actionText: "Follow on Instagram",
      subtitle: "Product reels, weave close-ups & factory dispatches",
      url: company.socialLinks.instagram,
      icon: Instagram,
      accentColor: "group-hover:text-[#E1306C]",
      bgColor: "group-hover:border-[#E1306C]/40",
      ariaLabel: "Follow Shri Shyam Poly Packs on Instagram",
    },
    {
      name: "Facebook",
      handle: "Shri Shyam Poly Pack",
      actionText: "Connect on Facebook",
      subtitle: "Official company updates, catalog photos & news",
      url: company.socialLinks.facebook,
      icon: Facebook,
      accentColor: "group-hover:text-[#1877F2]",
      bgColor: "group-hover:border-[#1877F2]/40",
      ariaLabel: "Follow Shri Shyam Poly Packs on Facebook",
    },
    {
      name: "YouTube",
      handle: "Shyam Industries",
      actionText: "Subscribe on YouTube",
      subtitle: "Circular weaving loom & manufacturing video tours",
      url: company.socialLinks.youtube,
      icon: Youtube,
      accentColor: "group-hover:text-[#FF0000]",
      bgColor: "group-hover:border-[#FF0000]/40",
      ariaLabel: "Subscribe to Shri Shyam Poly Packs on YouTube",
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#F6F4EE]">
      <div className="max-w-7xl mx-auto">
        <div
          ref={containerRef}
          className="relative bg-[#103D2D] text-white p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#C59A4A]/30 shadow-2xl overflow-hidden space-y-8"
        >
          {/* Subtle Background Pattern */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#C59A4A 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Section Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D6448] text-[#C59A4A] text-xs font-bold uppercase tracking-wider border border-[#C59A4A]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#C59A4A]" />
                <span>Stay Connected</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight">
                Connect With Us
              </h2>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                Follow <strong className="text-white">Shri Shyam Poly Packs</strong> across our official social channels for raw polymer updates, high-definition product reels, circular loom video tours, and dispatch notifications.
              </p>
            </div>

            <div className="hidden lg:block text-right shrink-0">
              <span className="text-xs font-semibold text-[#C59A4A] uppercase tracking-widest block">
                Official Media Channels
              </span>
              <span className="text-xs text-gray-400">Direct Factory Reach</span>
            </div>
          </div>

          {/* Social Cards 3-Column Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {socialPlatforms.map((platform) => {
              const IconComponent = platform.icon;

              return (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform.ariaLabel}
                  className={`group relative bg-[#171A18]/80 p-6 rounded-2xl border border-[#C59A4A]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#171A18] hover:shadow-xl hover:border-[#C59A4A] ${platform.bgColor} flex flex-col justify-between space-y-5 focus:outline-none focus:ring-2 focus:ring-[#C59A4A] focus:ring-offset-2 focus:ring-offset-[#103D2D]`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + External Link Arrow */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl bg-[#103D2D] text-[#C59A4A] flex items-center justify-center border border-[#C59A4A]/30 transition-transform duration-300 group-hover:scale-110 ${platform.accentColor}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-[#C59A4A]/20 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Channel Info */}
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#C59A4A] transition-colors flex items-center gap-2">
                        <span>{platform.name}</span>
                      </h3>
                      <p className="text-xs font-semibold text-[#C59A4A] tracking-wide">
                        {platform.handle}
                      </p>
                      <p className="text-xs text-gray-300 leading-relaxed pt-1">
                        {platform.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Action Button Label */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-gray-200 group-hover:text-white transition-colors">
                    <span>{platform.actionText}</span>
                    <span className="text-[#C59A4A] group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
