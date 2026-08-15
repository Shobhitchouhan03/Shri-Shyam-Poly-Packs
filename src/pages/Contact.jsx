import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "../components/common/PageHero.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import Button from "../components/common/Button.jsx";
import SafeImage from "../components/common/SafeImage.jsx";
import SEO from "../components/common/SEO.jsx";
import { getFAQSchema } from "../utils/seoSchema.js";
import { company } from "../data/company.js";
import { companyImages } from "../data/imageRegistry.js";
import { gsap } from "../utils/animation.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import { buildWhatsAppEnquiryUrl, buildEmailEnquiryText, buildMailtoUrl } from "../utils/whatsapp.js";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  HelpCircle,
  ShieldCheck,
  Building2,
  RotateCcw,
  Sparkles,
  Instagram,
  Facebook,
  Youtube
} from "lucide-react";

const QUERY_CATEGORIES = [
  "Product Information",
  "Custom Packaging",
  "Bulk Order",
  "Printing and Branding",
  "Material or Specification",
  "Sample Request",
  "Delivery or Supply",
  "Existing Order Support",
  "Business Partnership",
  "General Enquiry",
];

const PREFERRED_CONTACT_METHODS = ["Phone Call", "WhatsApp", "Email"];

const FAQ_ITEMS = [
  {
    q: "What packaging products do you provide?",
    a: "We manufacture high-tensile PP woven sacks, HDPE bags, BOPP laminated sacks, breathable mesh agricultural bags, PP woven fabric rolls, block-bottom valve cement sacks, and customized industrial packaging.",
  },
  {
    q: "Can bag sizes be customized?",
    a: "Yes. All bag dimensions, GSM fabric weight, denier count, and load capacities (5 kg to 100 kg+) can be custom-engineered to meet your product and transportation requirements.",
  },
  {
    q: "Is custom printing available?",
    a: "We offer high-definition flexo printing up to 6 colors and high-gloss BOPP reverse lamination for precise brand logos, barcodes, and regulatory information.",
  },
  {
    q: "Can I request laminated or unlaminated bags?",
    a: "Yes. We offer plain breathable unlaminated woven sacks for crops, as well as extrusion laminated moisture-barrier sacks with optional HM-HDPE inner liners for fertilizers and chemicals.",
  },
  {
    q: "What details should I share for an enquiry?",
    a: "Providing product type, industry sector, target quantity, printing choice, bag size, and delivery city allows our engineering team to provide precise specifications.",
  },
  {
    q: "Do you support bulk requirements?",
    a: "Yes. Our high-speed circular loom manufacturing plant handles large bulk production orders with continuous quality control and dispatch timelines.",
  },
  {
    q: "Can I request product samples?",
    a: "Technical samples can be provided for quality evaluation, tensile testing, and drop test verification prior to bulk production.",
  },
  {
    q: "How can I send my requirement?",
    a: "You can use our interactive 8-step Smart Enquiry Wizard on this website, send a quick message form, or connect directly via WhatsApp and phone.",
  },
  {
    q: "Do you show product rates online?",
    a: "Product rates are not displayed online because specifications, quantity, dimensions, material grade, printing, and delivery locations vary. Customers should submit their requirement for a suitable discussion.",
  },
  {
    q: "Which industries do you serve?",
    a: "We supply woven packaging to Agriculture, Food Grains & Rice, Fertilizer & Chemicals, Cement & Construction, Animal Feed, Seeds, Exports, and Retail sectors.",
  },
];

export default function Contact({ onOpenModal }) {
  const [searchParams] = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  // Quick Message Form State
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    queryCategory: "Product Information",
    message: "",
    preferredContact: "Phone Call",
    consent: true,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Focus invalid field ref
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  // Pre-fill query category or product if passed in URL params
  useEffect(() => {
    const productParam = searchParams.get("product");
    if (productParam) {
      setFormData((prev) => ({
        ...prev,
        message: `Enquiry regarding ${productParam}. `,
      }));
    }
  }, [searchParams]);

  // GSAP Reveal Animations
  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );

      gsap.fromTo(
        ".contact-section",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Form input handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Quick Message Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }
    if (!formData.phone.trim() && !formData.email.trim()) {
      newErrors.phone = "Phone or Email is required";
      newErrors.email = "Phone or Email is required";
    } else {
      if (formData.phone.trim() && formData.phone.replace(/[^0-9]/g, "").length < 10) {
        newErrors.phone = "Enter a valid 10-digit phone number";
      }
      if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Enter a valid email address";
      }
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Please describe your requirement (at least 10 characters)";
    }
    if (!formData.consent) {
      newErrors.consent = "Please check consent to proceed";
    }

    setErrors(newErrors);

    // Focus first invalid field
    if (newErrors.fullName && nameInputRef.current) {
      nameInputRef.current.focus();
    } else if (newErrors.phone && phoneInputRef.current) {
      phoneInputRef.current.focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  // Quick Message Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  // Reset Quick Message
  const handleReset = () => {
    setSubmitted(false);
    setErrors({});
    setFormData({
      fullName: "",
      companyName: "",
      phone: "",
      email: "",
      queryCategory: "Product Information",
      message: "",
      preferredContact: "Phone Call",
      consent: true,
    });
  };

  // Open Smart Enquiry with source
  const handleOpenSmartEnquiry = () => {
    if (onOpenModal) {
      onOpenModal({ source: "Contact Page — Smart Enquiry CTA" });
    }
  };

  // Open WhatsApp with source
  const handleWhatsAppClick = () => {
    if (onOpenModal) {
      onOpenModal({ source: "Contact Page — WhatsApp CTA" });
    }
  };

  const isPhonePlaceholder = company.phone.includes("[");
  const isEmailPlaceholder = company.email.includes("[");
  const isMapPlaceholder = company.googleMapsUrl.includes("[");

  return (
    <div ref={containerRef} className="space-y-12 pb-16">
      <SEO
        title="Contact Sales & Factory | Shri Shyam Poly Packs"
        description="Get in touch with Shri Shyam Poly Packs for custom PP woven bags, HDPE sacks, bulk orders, technical specifications, and factory direct dispatches."
        pathname="/contact"
        jsonLd={getFAQSchema(FAQ_ITEMS)}
      />
      {/* Contact Hero */}
      <PageHero
        eyebrow="Let’s Discuss Your Packaging Requirement"
        title="Start a Conversation With Our Packaging Team"
        subtitle="Share your product, quantity, dimensions, printing requirements and delivery location so our team can understand your requirement clearly."
        breadcrumbItems={[{ label: "Contact Us" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Contact Hero Action Buttons */}
        <div className="bg-[#103D2D] text-white p-6 sm:p-8 rounded-2xl border border-[#C59A4A]/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-xs font-bold text-[#C59A4A] tracking-wider uppercase">Direct Technical Desk</span>
            <h2 className="text-xl sm:text-2xl font-extrabold">Have a Custom Packaging Specification?</h2>
            <p className="text-xs sm:text-sm text-gray-200">Our engineers review target loads, GSM, denier, and UV requirements.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Button
              variant="gold"
              size="md"
              onClick={handleOpenSmartEnquiry}
              icon={Sparkles}
              iconPosition="left"
              className="font-bold shadow-md"
            >
              Start 8-Step Enquiry
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={handleWhatsAppClick}
              icon={MessageSquare}
              iconPosition="left"
              className="text-white border-white/40 hover:bg-white/10"
            >
              WhatsApp Support
            </Button>
          </div>
        </div>

        {/* Contact Information Cards Grid */}
        <div className="contact-section space-y-4">
          <SectionHeading
            eyebrow="Factory Contact Touchpoints"
            heading="Direct Reach & Location Info"
            description="All verified contact channels for Shri Shyam Poly Packs."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Phone Card */}
            <div className="contact-card bg-white p-5 rounded-xl border border-[#103D2D]/15 shadow-sm space-y-3 hover:border-[#103D2D]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#103D2D]/10 text-[#103D2D] flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#C59A4A] uppercase tracking-wider">Phone Desk</h3>
                <p className="text-sm font-bold text-[#103D2D] mt-0.5">{company.phone}</p>
                <p className="text-[11px] text-[#66706B] mt-1">Direct sales line for bulk enquiries.</p>
              </div>
              {!isPhonePlaceholder ? (
                <a
                  href={`tel:${company.phone.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D6448] hover:text-[#103D2D]"
                >
                  <span>Click to Call</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-[10px] text-gray-600 block italic">Edit phone number in company.js</span>
              )}
            </div>

            {/* WhatsApp Card */}
            <div className="contact-card bg-white p-5 rounded-xl border border-[#103D2D]/15 shadow-sm space-y-3 hover:border-[#103D2D]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-[#1D6448] flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#C59A4A] uppercase tracking-wider">WhatsApp Support</h3>
                <p className="text-sm font-bold text-[#103D2D] mt-0.5">{company.whatsapp}</p>
                <p className="text-[11px] text-[#66706B] mt-1">Instant specification summary sharing.</p>
              </div>
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D6448] hover:text-[#103D2D]"
              >
                <span>Launch Smart Enquiry</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Email Card */}
            <div className="contact-card bg-white p-5 rounded-xl border border-[#103D2D]/15 shadow-sm space-y-3 hover:border-[#103D2D]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#103D2D]/10 text-[#103D2D] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#C59A4A] uppercase tracking-wider">Email Technical Desk</h3>
                <p className="text-sm font-bold text-[#103D2D] mt-0.5 break-all">{company.email}</p>
                <p className="text-[11px] text-[#66706B] mt-1">Official RFP & tender documentation.</p>
              </div>
              {!isEmailPlaceholder ? (
                <a
                  href={buildMailtoUrl({ source: "Contact Page Card" })}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D6448] hover:text-[#103D2D]"
                >
                  <span>Click to Email</span>
                  <Mail className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-[10px] text-gray-600 block italic">Edit email address in company.js</span>
              )}
            </div>

            {/* Office Address Card */}
            <div className="contact-card bg-white p-5 rounded-xl border border-[#103D2D]/15 shadow-sm space-y-3 hover:border-[#103D2D]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#103D2D]/10 text-[#103D2D] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#C59A4A] uppercase tracking-wider">Registered Office</h3>
                <p className="text-xs font-semibold text-[#103D2D] mt-0.5 leading-relaxed">{company.officeAddress}</p>
              </div>
            </div>

            {/* Factory Address Card */}
            <div className="contact-card bg-white p-5 rounded-xl border border-[#103D2D]/15 shadow-sm space-y-3 hover:border-[#103D2D]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#103D2D]/10 text-[#103D2D] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#C59A4A] uppercase tracking-wider">Manufacturing Plant</h3>
                <p className="text-xs font-semibold text-[#103D2D] mt-0.5 leading-relaxed">{company.factoryAddress}</p>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="contact-card bg-white p-5 rounded-xl border border-[#103D2D]/15 shadow-sm space-y-3 hover:border-[#103D2D]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#103D2D]/10 text-[#103D2D] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#C59A4A] uppercase tracking-wider">Business Operating Hours</h3>
                <p className="text-xs font-semibold text-[#103D2D] mt-0.5">{company.businessHours}</p>
                <p className="text-[10px] text-[#66706B] mt-1 italic">Response times may vary outside business operating hours.</p>
              </div>
            </div>

            {/* Official Instagram Card */}
            {company.socialLinks.instagram && (
              <a
                href={company.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Shri Shyam Poly Packs on Instagram"
                className="contact-card bg-white p-5 rounded-xl border border-[#103D2D]/15 shadow-sm space-y-3 hover:border-[#C59A4A] transition-colors group block"
              >
                <div className="w-10 h-10 rounded-lg bg-[#103D2D]/10 text-[#C59A4A] flex items-center justify-center group-hover:bg-[#103D2D] transition-colors">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#C59A4A] uppercase tracking-wider flex items-center gap-1">
                    <span>Instagram Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </h3>
                  <p className="text-xs font-semibold text-[#103D2D] mt-0.5 leading-relaxed">
                    @shri_shyam_polypack
                  </p>
                  <span className="text-[10px] text-[#66706B] block mt-1">View product reels & dispatches</span>
                </div>
              </a>
            )}

            {/* Official Facebook Card */}
            {company.socialLinks.facebook && (
              <a
                href={company.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Shri Shyam Poly Packs on Facebook"
                className="contact-card bg-white p-5 rounded-xl border border-[#103D2D]/15 shadow-sm space-y-3 hover:border-[#C59A4A] transition-colors group block"
              >
                <div className="w-10 h-10 rounded-lg bg-[#103D2D]/10 text-[#C59A4A] flex items-center justify-center group-hover:bg-[#103D2D] transition-colors">
                  <Facebook className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#C59A4A] uppercase tracking-wider flex items-center gap-1">
                    <span>Facebook Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </h3>
                  <p className="text-xs font-semibold text-[#103D2D] mt-0.5 leading-relaxed">
                    Shri Shyam Poly Pack
                  </p>
                  <span className="text-[10px] text-[#66706B] block mt-1">Official Facebook profile</span>
                </div>
              </a>
            )}

            {/* Official YouTube Card */}
            {company.socialLinks.youtube && (
              <a
                href={company.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to Shri Shyam Poly Packs on YouTube"
                className="contact-card bg-white p-5 rounded-xl border border-[#103D2D]/15 shadow-sm space-y-3 hover:border-[#C59A4A] transition-colors group block"
              >
                <div className="w-10 h-10 rounded-lg bg-[#103D2D]/10 text-[#C59A4A] flex items-center justify-center group-hover:bg-[#103D2D] transition-colors">
                  <Youtube className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#C59A4A] uppercase tracking-wider flex items-center gap-1">
                    <span>YouTube Channel</span>
                    <ExternalLink className="w-3 h-3" />
                  </h3>
                  <p className="text-xs font-semibold text-[#103D2D] mt-0.5 leading-relaxed">
                    Shyam Industries
                  </p>
                  <span className="text-[10px] text-[#66706B] block mt-1">Watch manufacturing videos</span>
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Main Two-Column Section: Quick Message Form & Smart Enquiry Entry Card */}
        <div className="contact-section grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick Message Form (Column 7) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#103D2D]/15 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-[#C59A4A] tracking-wider uppercase">Direct Enquiry Form</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#103D2D]">Quick Requirement Message</h2>
              <p className="text-xs sm:text-sm text-[#66706B] mt-1">Leave a short message and our packaging desk will contact you.</p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-4 bg-[#F6F4EE] p-6 rounded-xl border border-[#103D2D]/10">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#1D6448] flex items-center justify-center mx-auto border border-[#1D6448]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#103D2D]">Quick Message Summary Prepared</h3>
                <p className="text-xs sm:text-sm text-[#66706B] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#103D2D]">{formData.fullName}</strong>. Your enquiry details are ready to be sent via WhatsApp or email. Your draft is saved on this device.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      const url = buildWhatsAppEnquiryUrl({ ...formData, source: "Contact Page Quick Form" });
                      window.open(url, "_blank", "noopener,noreferrer");
                    }}
                    icon={MessageSquare}
                    iconPosition="left"
                  >
                    Send on WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    icon={RotateCcw}
                    iconPosition="left"
                  >
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#103D2D] mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3 py-2.5 rounded-lg border border-[#103D2D]/20 focus:outline-none focus:ring-2 focus:ring-[#103D2D] bg-[#F6F4EE]/40"
                    />
                    {errors.fullName && <p className="text-[11px] text-red-600 font-medium mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block font-bold text-[#103D2D] mb-1">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Agro Mills Ltd"
                      className="w-full px-3 py-2.5 rounded-lg border border-[#103D2D]/20 focus:outline-none focus:ring-2 focus:ring-[#103D2D] bg-[#F6F4EE]/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#103D2D] mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={phoneInputRef}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2.5 rounded-lg border border-[#103D2D]/20 focus:outline-none focus:ring-2 focus:ring-[#103D2D] bg-[#F6F4EE]/40"
                    />
                    {errors.phone && <p className="text-[11px] text-red-600 font-medium mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block font-bold text-[#103D2D] mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. name@company.com"
                      className="w-full px-3 py-2.5 rounded-lg border border-[#103D2D]/20 focus:outline-none focus:ring-2 focus:ring-[#103D2D] bg-[#F6F4EE]/40"
                    />
                    {errors.email && <p className="text-[11px] text-red-600 font-medium mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#103D2D] mb-1">Query Category</label>
                    <select
                      name="queryCategory"
                      value={formData.queryCategory}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#103D2D]/20 focus:outline-none focus:ring-2 focus:ring-[#103D2D] bg-[#F6F4EE]/40"
                    >
                      {QUERY_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#103D2D] mb-1">Preferred Contact Method</label>
                    <select
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#103D2D]/20 focus:outline-none focus:ring-2 focus:ring-[#103D2D] bg-[#F6F4EE]/40"
                    >
                      {PREFERRED_CONTACT_METHODS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#103D2D] mb-1">
                    Message / Specifications <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your packaging requirement, bag size, GSM, target crop load, or quantity..."
                    className="w-full px-3 py-2.5 rounded-lg border border-[#103D2D]/20 focus:outline-none focus:ring-2 focus:ring-[#103D2D] bg-[#F6F4EE]/40"
                  />
                  {errors.message && <p className="text-[11px] text-red-600 font-medium mt-1">{errors.message}</p>}
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 rounded text-[#103D2D] focus:ring-[#103D2D]"
                  />
                  <label htmlFor="consent" className="text-xs text-[#66706B]">
                    I agree to be contacted by Shri Shyam Poly Packs technical representatives regarding this packaging enquiry.
                  </label>
                </div>
                {errors.consent && <p className="text-[11px] text-red-600 font-medium">{errors.consent}</p>}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={Send}
                  iconPosition="left"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto font-bold"
                >
                  {isSubmitting ? "Processing..." : "Prepare Message Summary"}
                </Button>
              </form>
            )}
          </div>

          {/* Smart Enquiry Entry Card (Column 5) */}
          <div className="lg:col-span-5 bg-[#103D2D] text-white p-6 sm:p-8 rounded-2xl border border-[#C59A4A]/30 space-y-6 shadow-lg">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#C59A4A] tracking-wider uppercase">Recommended Action</span>
              <h3 className="text-xl font-extrabold">Complete 8-Step Smart Enquiry</h3>
              <p className="text-xs text-gray-200 leading-relaxed">
                For detailed industrial orders requiring GSM specification, denier selection, BOPP lamination, or custom flexo printing, use our guided wizard.
              </p>
            </div>

            <div className="bg-[#171A18]/60 rounded-xl p-4 space-y-2.5 border border-[#C59A4A]/20">
              <div className="flex items-start gap-2.5 text-xs text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#C59A4A] shrink-0 mt-0.5" />
                <span>Pre-fills bag size, quantity, and print options</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#C59A4A] shrink-0 mt-0.5" />
                <span>Generates instant WhatsApp click-to-chat text</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#C59A4A] shrink-0 mt-0.5" />
                <span>Saves draft automatically on this browser</span>
              </div>
            </div>

            <Button
              variant="gold"
              size="md"
              onClick={handleOpenSmartEnquiry}
              icon={Sparkles}
              iconPosition="left"
              className="w-full font-bold shadow-md"
            >
              Launch Smart Enquiry Wizard
            </Button>
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="contact-section space-y-4">
          <SectionHeading
            eyebrow="Factory Location"
            heading="Manufacturing Plant & Registered Office"
            description="Visit our manufacturing unit or navigate via Google Maps."
          />

          <div className="bg-white rounded-2xl border border-[#103D2D]/15 overflow-hidden shadow-sm p-4 sm:p-6 space-y-4">
            {!isMapPlaceholder && company.googleMapsEmbedUrl ? (
              <div className="w-full h-80 rounded-xl overflow-hidden border border-[#103D2D]/10">
                <iframe
                  title="Shri Shyam Poly Packs Location Map"
                  src={company.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="relative w-full h-72 rounded-xl bg-[#103D2D] p-6 flex flex-col items-center justify-center text-center space-y-3 text-white overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-[#1D6448] text-[#C59A4A] flex items-center justify-center border border-[#C59A4A]/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#C59A4A] uppercase tracking-wider">
                  Shri Shyam Poly Packs Location
                </h3>
                <p className="text-xs text-gray-200 max-w-md">
                  {company.factoryAddress !== "[FACTORY ADDRESS]" ? company.factoryAddress : "Jaipur, Rajasthan, India"}
                </p>
                <span className="text-[10px] text-gray-600 block italic bg-[#171A18]/60 px-3 py-1 rounded-full border border-white/10">
                  Dev Note: Update googleMapsEmbedUrl in company.js to display live interactive map iframe.
                </span>
                {!isMapPlaceholder && (
                  <a
                    href={company.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C59A4A] text-[#103D2D] font-bold text-xs hover:bg-white transition-colors"
                  >
                    <span>Open Directions in Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="contact-section space-y-6">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            heading="Common Queries & Packaging Guidance"
            description="Clear answers regarding customization, minimum quantities, sample dispatches, and online pricing."
          />

          <div className="bg-white rounded-2xl border border-[#103D2D]/15 p-4 sm:p-8 space-y-3 shadow-sm">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="border-b border-[#103D2D]/10 last:border-0 pb-3 last:pb-0"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full flex items-center justify-between text-left py-3 text-sm sm:text-base font-bold text-[#103D2D] hover:text-[#1D6448] focus:outline-none focus:ring-2 focus:ring-[#C59A4A] rounded-lg px-2 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-[#C59A4A] shrink-0" />
                      <span>{item.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#103D2D] transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-[#C59A4A]" : ""
                      }`}
                    />
                  </button>

                  <div
                    id={`faq-answer-${idx}`}
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 py-1" : "grid-rows-[0fr] opacity-0 py-0"
                    }`}
                  >
                    <div className="overflow-hidden text-xs sm:text-sm text-[#66706B] leading-relaxed px-9">
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
