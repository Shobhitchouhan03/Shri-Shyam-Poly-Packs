import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../../data/navigation.js";
import { company } from "../../data/company.js";
import { gsap } from "../../utils/animation.js";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";
import Logo from "../common/Logo.jsx";
import Button from "../common/Button.jsx";
import { X, ChevronRight, Phone, Mail, FileText, Instagram, Facebook, Youtube } from "lucide-react";

/**
 * Mobile Navigation Slide Panel Component
 */
export default function MobileMenu({ isOpen, onClose, onOpenModal }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const linksRef = useRef([]);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  // Body Scroll Lock & ESC listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // GSAP Slide & Stagger Animation
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    if (prefersReducedMotion) {
      gsap.set(panelRef.current, { x: "0%" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" }
      );

      const items = linksRef.current.filter(Boolean);
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, x: 24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.06,
            delay: 0.15,
            ease: "power2.out",
          }
        );
      }
    }, panelRef);

    return () => ctx.revert();
  }, [isOpen, prefersReducedMotion]);

  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose();
  };

  const handleModalClick = () => {
    onClose();
    if (onOpenModal) onOpenModal({ source: "Mobile Sticky CTA" });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 lg:hidden flex justify-end"
    >
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-[#171A18]/80 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Slide Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-sm bg-[#103D2D] text-white h-full flex flex-col justify-between shadow-2xl border-l border-[#C59A4A]/30 z-10 pt-safe pb-safe overflow-y-auto"
      >
        {/* Panel Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Logo variant="dark" />
          <button
            onClick={onClose}
            type="button"
            aria-label="Close menu"
            className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C59A4A] min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Mobile Menu Links" className="px-4 py-6 space-y-1.5 flex-1">
          {navLinks.map((link, idx) => {
            const isActive = location.pathname === link.path;

            return (
              <div
                key={link.path}
                ref={(el) => (linksRef.current[idx] = el)}
              >
                <Link
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-lg text-base font-semibold transition-all min-h-[48px] ${
                    isActive
                      ? "bg-[#1D6448] text-[#C59A4A] border-l-4 border-[#C59A4A]"
                      : "text-gray-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight
                    className={`w-5 h-5 ${
                      isActive ? "text-[#C59A4A]" : "text-gray-400"
                    }`}
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Panel Footer & Actions */}
        <div className="p-5 border-t border-white/10 bg-[#171A18]/50 space-y-4">
          <Button
            variant="cta"
            size="lg"
            onClick={handleModalClick}
            icon={FileText}
            iconPosition="left"
            className="w-full font-bold uppercase tracking-wider"
          >
            Request Quote
          </Button>

          <div className="space-y-2 text-xs text-gray-300 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#C59A4A]" />
              <span>{company.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#C59A4A]" />
              <span className="break-all">{company.email}</span>
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-white/10 text-xs">
              {company.socialLinks.instagram && (
                <a
                  href={company.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Shri Shyam Poly Packs on Instagram"
                  className="inline-flex items-center gap-1 text-[#C59A4A] hover:underline font-semibold"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              )}
              {company.socialLinks.facebook && (
                <a
                  href={company.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Shri Shyam Poly Packs on Facebook"
                  className="inline-flex items-center gap-1 text-[#C59A4A] hover:underline font-semibold"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
              )}
              {company.socialLinks.youtube && (
                <a
                  href={company.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe to Shri Shyam Poly Packs on YouTube"
                  className="inline-flex items-center gap-1 text-[#C59A4A] hover:underline font-semibold"
                >
                  <Youtube className="w-4 h-4" />
                  <span>YouTube</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
