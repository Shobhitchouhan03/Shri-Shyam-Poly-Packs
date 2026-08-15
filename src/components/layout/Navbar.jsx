import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../../data/navigation.js";
import Logo from "../common/Logo.jsx";
import Button from "../common/Button.jsx";
import { Menu, X, FileText } from "lucide-react";

/**
 * Premium Sticky Navigation Header
 * Uses IntersectionObserver on a top-sentinel element to toggle scrolled state cleanly.
 * Zero scroll event listeners, zero JS layout reads, zero forced reflows.
 */
export default function Navbar({ onOpenMobileMenu, isMobileMenuOpen, onOpenModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Observer to detect when page has scrolled past 40px using a top sentinel
  useEffect(() => {
    // Create an invisible sentinel element at top: 40px
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "40px";
    sentinel.style.left = "0";
    sentinel.style.width = "100%";
    sentinel.style.height = "1px";
    sentinel.style.pointerEvents = "none";
    sentinel.setAttribute("aria-hidden", "true");
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the sentinel is at or above viewport top, we have scrolled past 40px
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (document.body.contains(sentinel)) {
        document.body.removeChild(sentinel);
      }
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b transition-all duration-300 ${
        isScrolled
          ? "bg-[#103D2D]/98 shadow-xl border-[#C59A4A]/30 py-2.5"
          : "bg-[#103D2D]/90 shadow-sm border-[#C59A4A]/20 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Logo variant="dark" />

        {/* Desktop Navigation Menu */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3.5 py-2 text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-200 group rounded-md focus:outline-none focus:ring-2 focus:ring-[#C59A4A] ${
                  isActive ? "text-[#C59A4A]" : "text-gray-100 hover:text-white"
                }`}
              >
                <span>{link.name}</span>

                {/* Hover Underline Accent */}
                <span
                  className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#C59A4A] transition-transform duration-300 origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Action Group */}
        <div className="flex items-center gap-3">
          {/* Request Quote Button */}
          <Button
            variant="cta"
            size="sm"
            onClick={() => onOpenModal && onOpenModal({ source: "Header Request Quote" })}
            icon={FileText}
            iconPosition="left"
            className="hidden sm:inline-flex shadow-sm text-xs font-bold uppercase tracking-wider"
          >
            Request Quote
          </Button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={onOpenMobileMenu}
            type="button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden p-2.5 rounded-md text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C59A4A] min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
}
