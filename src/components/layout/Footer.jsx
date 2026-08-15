import React from "react";
import { Link } from "react-router-dom";
import { company } from "../../data/company.js";
import { navLinks } from "../../data/navigation.js";
import { products } from "../../data/products.js";
import { industries } from "../../data/industries.js";
import Logo from "../common/Logo.jsx";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowUp,
  Map,
  CheckCircle2,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";

/**
 * Premium Multi-Column Industrial Footer
 */
export default function Footer({ onOpenModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#171A18] text-gray-300 border-t-2 border-[#103D2D] relative z-10 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Grid Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Company Profile & ISO Quality */}
          <div className="space-y-4 lg:col-span-2">
            <Logo variant="dark" />
            
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md pt-2">
              {company.description}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#103D2D] text-[#C59A4A] border border-[#C59A4A]/30 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>ISO Grade Woven Packaging Standards</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white border-b border-[#C59A4A]/30 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-[#C59A4A] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products Portfolio */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white border-b border-[#C59A4A]/30 pb-2">
              Packaging Products
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {products.slice(0, 6).map((prod) => (
                <li key={prod.id}>
                  <Link
                    to={`/products/${prod.slug}`}
                    className="text-gray-300 hover:text-[#C59A4A] transition-colors truncate block"
                  >
                    {prod.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Factory Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white border-b border-[#C59A4A]/30 pb-2">
              Factory & Sales
            </h3>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#C59A4A] shrink-0 mt-0.5" />
                <span>{company.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#C59A4A] shrink-0 mt-0.5" />
                <span className="break-all">{company.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C59A4A] shrink-0 mt-0.5" />
                <span>{company.officeAddress}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#C59A4A] shrink-0 mt-0.5" />
                <span>{company.businessHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenModal && onOpenModal({ source: "Footer CTA" })}
                className="w-full text-xs font-semibold py-2 px-3 rounded bg-[#103D2D] text-[#C59A4A] border border-[#C59A4A]/40 hover:bg-[#1D6448] hover:text-white transition-colors"
              >
                Send Direct Specification Enquiry
              </button>
            </div>
          </div>
        </div>

        {/* Industrial Terms & Google Maps Link Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#103D2D]/40 p-6 rounded-lg border border-white/5">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#C59A4A] uppercase tracking-wider">
              B2B Custom Manufacturing Guarantee
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              We supply technical grade PP & HDPE woven sacks directly to bulk agricultural buyers, chemical plants, fertilizer distributors, and construction manufacturers nationwide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-white">Factory Location</span>
              <p className="text-xs text-gray-400">{company.factoryAddress}</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1D6448] text-white text-xs font-semibold hover:bg-[#103D2D] transition-colors shrink-0"
            >
              <Map className="w-3.5 h-3.5 text-[#C59A4A]" />
              <span>Location Details</span>
            </Link>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {company.name}. All Rights Reserved.</p>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {company.socialLinks.instagram && (
              <a
                href={company.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Shri Shyam Poly Packs on Instagram"
                className="inline-flex items-center gap-1.5 text-gray-300 hover:text-[#C59A4A] font-semibold transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#C59A4A]" />
                <span>Instagram</span>
              </a>
            )}
            {company.socialLinks.facebook && (
              <a
                href={company.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Shri Shyam Poly Packs on Facebook"
                className="inline-flex items-center gap-1.5 text-gray-300 hover:text-[#C59A4A] font-semibold transition-colors"
              >
                <Facebook className="w-4 h-4 text-[#C59A4A]" />
                <span>Facebook</span>
              </a>
            )}
            {company.socialLinks.youtube && (
              <a
                href={company.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to Shri Shyam Poly Packs on YouTube"
                className="inline-flex items-center gap-1.5 text-gray-300 hover:text-[#C59A4A] font-semibold transition-colors"
              >
                <Youtube className="w-4 h-4 text-[#C59A4A]" />
                <span>YouTube</span>
              </a>
            )}
            <span className="hover:text-gray-200 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-200 cursor-pointer">Terms of Supply</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#C59A4A] hover:text-white font-semibold transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
