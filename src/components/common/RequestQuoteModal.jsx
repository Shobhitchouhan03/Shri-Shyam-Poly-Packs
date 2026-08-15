import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "../../utils/animation.js";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";
import {
  buildWhatsAppEnquiryUrl,
  buildEmailEnquiryText,
  buildMailtoUrl,
  saveLocalEnquiryDraft,
  getLocalEnquiryDraft,
  clearLocalEnquiryDraft
} from "../../utils/whatsapp.js";
import {
  X,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Package,
  MessageSquare,
  Mail,
  Send,
  Edit3,
  RotateCcw,
  Building2,
  Layers,
  Printer,
  Scale,
  Sparkles,
  Copy,
  Clock
} from "lucide-react";
import Button from "./Button.jsx";

// Wizard Step Definitions
const PRODUCT_OPTIONS = [
  "PP Woven Bags",
  "HDPE Woven Bags",
  "Blue PP Woven Sack Bag",
  "Green PP Woven Sack Bag",
  "Yellow PP Woven Sack Bag",
  "Laminated Bags",
  "Printed Bags",
  "Food Grain Bags",
  "Fertilizer Bags",
  "Cement Bags",
  "PP Woven Rolls",
  "Custom Packaging",
];

const INDUSTRY_OPTIONS = [
  "Agriculture",
  "Food",
  "Chemical",
  "Construction",
  "Animal Feed",
  "Seeds",
  "Export",
  "Retail",
  "Other",
];

const QUANTITY_OPTIONS = [
  "100–500",
  "500–1000",
  "1000–5000",
  "5000–10000",
  "10000+",
  "Not Sure",
];

const PRINTING_OPTIONS = [
  "Yes (Custom Printing)",
  "No (Plain / Unprinted)",
  "Need Suggestion",
];

const SIZE_OPTIONS = [
  "Small (5 kg - 10 kg)",
  "Medium (25 kg - 50 kg)",
  "Large (50 kg - 100 kg)",
  "Custom Specification",
];

export default function RequestQuoteModal({ isOpen, onClose, initialData = null }) {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);
  const stepContainerRef = useRef(null);
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  // Wizard state (1 to 8, plus 9 for Success)
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [draftPrompt, setDraftPrompt] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    product: "",
    industry: "",
    quantity: "",
    printing: "",
    size: "",
    additionalNotes: "",
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    city: "",
    source: "Header Request Quote",
  });

  // Check for local draft when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const savedDraft = getLocalEnquiryDraft();
    if (savedDraft && (savedDraft.product || savedDraft.fullName)) {
      setDraftPrompt(savedDraft);
    }
  }, [isOpen]);

  // Pre-fill initial product, application or source if passed from CTA
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        product: initialData.name || initialData.productName || prev.product,
        industry: initialData.category || initialData.application || prev.industry,
        source: initialData.source || prev.source,
      }));
    }
  }, [initialData]);

  // Auto-save draft on step/data changes
  useEffect(() => {
    if (isOpen && (formData.product || formData.fullName)) {
      saveLocalEnquiryDraft({ ...formData, currentStep });
    }
  }, [formData, currentStep, isOpen]);

  // Handle ESC key press & body scroll lock
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

  // GSAP Modal Entrance Animation
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    if (prefersReducedMotion) {
      gsap.set(backdropRef.current, { opacity: 1 });
      gsap.set(contentRef.current, { opacity: 1, scale: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.95, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.2)" }
      );
    }, modalRef);

    return () => ctx.revert();
  }, [isOpen, prefersReducedMotion]);

  // GSAP Step Transition
  useEffect(() => {
    if (!stepContainerRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stepContainerRef.current,
        { opacity: 0, x: 12 },
        { opacity: 1, x: 0, duration: 0.25, ease: "power2.out" }
      );
    }, stepContainerRef);

    return () => ctx.revert();
  }, [currentStep, prefersReducedMotion]);

  if (!isOpen) return null;

  // Restore draft handler
  const handleRestoreDraft = () => {
    if (draftPrompt) {
      setFormData(draftPrompt);
      if (draftPrompt.currentStep) setCurrentStep(draftPrompt.currentStep);
      setDraftPrompt(null);
    }
  };

  const handleDismissDraft = () => {
    clearLocalEnquiryDraft();
    setDraftPrompt(null);
  };

  // Option select handler
  const handleSelectOption = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    // Auto advance to next step for radio options
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Step 7 Contact Info Validation
  const validateStep7 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.replace(/[^0-9]/g, "").length < 10) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.city.trim()) newErrors.city = "City / Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Next Step handler
  const handleNext = () => {
    if (currentStep === 1 && !formData.product) {
      setErrors({ product: "Please select a product category" });
      return;
    }
    if (currentStep === 2 && !formData.industry) {
      setErrors({ industry: "Please select an industry sector" });
      return;
    }
    if (currentStep === 3 && !formData.quantity) {
      setErrors({ quantity: "Please select approximate quantity" });
      return;
    }
    if (currentStep === 4 && !formData.printing) {
      setErrors({ printing: "Please select a printing requirement" });
      return;
    }
    if (currentStep === 5 && !formData.size) {
      setErrors({ size: "Please select a bag size" });
      return;
    }
    if (currentStep === 7) {
      if (!validateStep7()) return;
    }

    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Back Step handler
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Submit via WhatsApp
  const handleWhatsAppSubmit = () => {
    const url = buildWhatsAppEnquiryUrl(formData);
    window.open(url, "_blank", "noopener,noreferrer");
    setIsSubmitted(true);
  };

  // Submit via Form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Copy Enquiry Text
  const handleCopySummary = () => {
    const text = buildEmailEnquiryText(formData);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Reset Enquiry
  const handleResetEnquiry = () => {
    clearLocalEnquiryDraft();
    setCurrentStep(1);
    setIsSubmitted(false);
    setErrors({});
    setFormData({
      product: "",
      industry: "",
      quantity: "",
      printing: "",
      size: "",
      additionalNotes: "",
      fullName: "",
      companyName: "",
      phone: "",
      email: "",
      city: "",
      source: "Header Request Quote",
    });
  };

  const mailtoUrl = buildMailtoUrl(formData);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="smart-enquiry-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 bg-[#171A18]/75 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div
        ref={contentRef}
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#103D2D]/20 overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]"
      >
        {/* Header Ribbon with Progress */}
        <div className="bg-[#103D2D] text-white px-6 py-4 border-b border-[#C59A4A]/30 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C59A4A]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#C59A4A]">
                Shri Shyam Poly Packs
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close enquiry modal"
              className="p-1 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C59A4A]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar (Only visible during steps 1-8) */}
          {!isSubmitted && (
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-200">
                <span>Smart Packaging Specification Wizard</span>
                <span className="text-[#C59A4A] font-bold">Step {currentStep} of 8</span>
              </div>
              <div className="w-full h-1.5 bg-[#171A18]/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#1D6448] to-[#C59A4A] transition-all duration-300"
                  style={{ width: `${(currentStep / 8) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Restore Draft Banner */}
        {draftPrompt && !isSubmitted && (
          <div className="bg-[#C59A4A]/15 border-b border-[#C59A4A]/30 px-4 py-2.5 flex items-center justify-between text-xs text-[#103D2D]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C59A4A] shrink-0" />
              <span>Unfinished enquiry draft found from this device.</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleRestoreDraft}
                className="font-bold underline hover:text-[#1D6448]"
              >
                Restore
              </button>
              <button
                type="button"
                onClick={handleDismissDraft}
                className="text-gray-500 hover:text-red-600"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {isSubmitted ? (
            /* SUCCESS SCREEN */
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#103D2D]/10 text-[#1D6448] flex items-center justify-center mx-auto border-2 border-[#1D6448]">
                <CheckCircle2 className="w-10 h-10 text-[#1D6448]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-[#103D2D]">
                  Thank You for Contacting Shri Shyam Poly Packs
                </h3>
                <p className="text-xs sm:text-sm text-[#66706B] max-w-md mx-auto leading-relaxed">
                  Your enquiry summary is ready. You can now send it through WhatsApp, email your requirement, copy the summary, or start another enquiry. Your draft is saved on this device.
                </p>
              </div>

              <div className="bg-[#F6F4EE] p-4 rounded-xl border border-[#103D2D]/10 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-[#103D2D]/10 pb-1.5">
                  <span className="text-[#66706B]">Product Category:</span>
                  <span className="font-bold text-[#103D2D]">{formData.product}</span>
                </div>
                <div className="flex justify-between border-b border-[#103D2D]/10 pb-1.5">
                  <span className="text-[#66706B]">Quantity:</span>
                  <span className="font-bold text-[#103D2D]">{formData.quantity}</span>
                </div>
                <div className="flex justify-between border-b border-[#103D2D]/10 pb-1.5">
                  <span className="text-[#66706B]">City:</span>
                  <span className="font-bold text-[#103D2D]">{formData.city}</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-[#66706B]">Lead Source:</span>
                  <span className="font-semibold text-[#1D6448]">{formData.source}</span>
                </div>
              </div>

              {/* Success Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-md mx-auto pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1D6448] text-white text-xs font-bold hover:bg-[#103D2D] transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>Continue on WhatsApp</span>
                </button>

                <a
                  href={mailtoUrl}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#103D2D] text-white text-xs font-bold hover:bg-[#171A18] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C59A4A]" />
                  <span>Email Requirement</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#103D2D]/20 bg-white text-[#103D2D] text-xs font-bold hover:bg-[#F6F4EE] transition-colors"
                >
                  <Copy className="w-4 h-4 text-[#1D6448]" />
                  <span>{copied ? "Copied to Clipboard!" : "Copy Enquiry Summary"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetEnquiry}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#103D2D]/20 bg-white text-[#103D2D] text-xs font-bold hover:bg-[#F6F4EE] transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-[#C59A4A]" />
                  <span>Start New Enquiry</span>
                </button>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onClose();
                    navigate("/");
                  }}
                >
                  Back to Home
                </Button>
              </div>
            </div>
          ) : (
            /* MULTI-STEP WIZARD CONTENT */
            <div ref={stepContainerRef} className="space-y-6">
              {/* STEP 1: Product Selection */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#C59A4A] tracking-wider uppercase">Step 1 of 8</span>
                    <h2 id="smart-enquiry-title" className="text-xl font-bold text-[#103D2D]">
                      What product category are you looking for?
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {PRODUCT_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption("product", opt)}
                        className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between gap-2 min-h-[48px] ${
                          formData.product === opt
                            ? "bg-[#103D2D] text-white border-[#C59A4A] shadow-md ring-2 ring-[#C59A4A]/50"
                            : "bg-[#F6F4EE]/60 text-[#171A18] border-[#103D2D]/15 hover:border-[#103D2D]/40 hover:bg-white"
                        }`}
                      >
                        <span>{opt}</span>
                        {formData.product === opt && <CheckCircle2 className="w-4 h-4 text-[#C59A4A] shrink-0" />}
                      </button>
                    ))}
                  </div>
                  {errors.product && <p className="text-xs text-red-600 font-medium">{errors.product}</p>}
                </div>
              )}

              {/* STEP 2: Industry Sector */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#C59A4A] tracking-wider uppercase">Step 2 of 8</span>
                    <h2 className="text-xl font-bold text-[#103D2D]">
                      Which industry sector is this for?
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {INDUSTRY_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption("industry", opt)}
                        className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between gap-2 min-h-[48px] ${
                          formData.industry === opt
                            ? "bg-[#103D2D] text-white border-[#C59A4A] shadow-md ring-2 ring-[#C59A4A]/50"
                            : "bg-[#F6F4EE]/60 text-[#171A18] border-[#103D2D]/15 hover:border-[#103D2D]/40 hover:bg-white"
                        }`}
                      >
                        <span>{opt}</span>
                        {formData.industry === opt && <CheckCircle2 className="w-4 h-4 text-[#C59A4A] shrink-0" />}
                      </button>
                    ))}
                  </div>
                  {errors.industry && <p className="text-xs text-red-600 font-medium">{errors.industry}</p>}
                </div>
              )}

              {/* STEP 3: Approximate Quantity */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#C59A4A] tracking-wider uppercase">Step 3 of 8</span>
                    <h2 className="text-xl font-bold text-[#103D2D]">
                      Approximate quantity requirement?
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {QUANTITY_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption("quantity", opt)}
                        className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between gap-2 min-h-[48px] ${
                          formData.quantity === opt
                            ? "bg-[#103D2D] text-white border-[#C59A4A] shadow-md ring-2 ring-[#C59A4A]/50"
                            : "bg-[#F6F4EE]/60 text-[#171A18] border-[#103D2D]/15 hover:border-[#103D2D]/40 hover:bg-white"
                        }`}
                      >
                        <span>{opt} Units</span>
                        {formData.quantity === opt && <CheckCircle2 className="w-4 h-4 text-[#C59A4A] shrink-0" />}
                      </button>
                    ))}
                  </div>
                  {errors.quantity && <p className="text-xs text-red-600 font-medium">{errors.quantity}</p>}
                </div>
              )}

              {/* STEP 4: Printing Requirement */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#C59A4A] tracking-wider uppercase">Step 4 of 8</span>
                    <h2 className="text-xl font-bold text-[#103D2D]">
                      Do you require custom logo / brand printing?
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {PRINTING_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption("printing", opt)}
                        className={`p-4 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between min-h-[48px] ${
                          formData.printing === opt
                            ? "bg-[#103D2D] text-white border-[#C59A4A] shadow-md ring-2 ring-[#C59A4A]/50"
                            : "bg-[#F6F4EE]/60 text-[#171A18] border-[#103D2D]/15 hover:border-[#103D2D]/40 hover:bg-white"
                        }`}
                      >
                        <span>{opt}</span>
                        {formData.printing === opt && <CheckCircle2 className="w-4 h-4 text-[#C59A4A] shrink-0" />}
                      </button>
                    ))}
                  </div>
                  {errors.printing && <p className="text-xs text-red-600 font-medium">{errors.printing}</p>}
                </div>
              )}

              {/* STEP 5: Bag Size / Specs */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#C59A4A] tracking-wider uppercase">Step 5 of 8</span>
                    <h2 className="text-xl font-bold text-[#103D2D]">
                      Preferred Bag Size / Load Capacity?
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SIZE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption("size", opt)}
                        className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between min-h-[48px] ${
                          formData.size === opt
                            ? "bg-[#103D2D] text-white border-[#C59A4A] shadow-md ring-2 ring-[#C59A4A]/50"
                            : "bg-[#F6F4EE]/60 text-[#171A18] border-[#103D2D]/15 hover:border-[#103D2D]/40 hover:bg-white"
                        }`}
                      >
                        <span>{opt}</span>
                        {formData.size === opt && <CheckCircle2 className="w-4 h-4 text-[#C59A4A] shrink-0" />}
                      </button>
                    ))}
                  </div>
                  {errors.size && <p className="text-xs text-red-600 font-medium">{errors.size}</p>}
                </div>
              )}

              {/* STEP 6: Additional Requirement */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#C59A4A] tracking-wider uppercase">Step 6 of 8</span>
                    <h2 className="text-xl font-bold text-[#103D2D]">
                      Additional Specifications / Notes (Optional)
                    </h2>
                  </div>

                  <textarea
                    rows="4"
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                    placeholder="Describe your packaging requirement, GSM preference, UV stabilization, liner thickness, or target crop load..."
                    className="w-full p-3.5 rounded-xl border border-[#103D2D]/20 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#103D2D] bg-[#F6F4EE]/50"
                  />
                </div>
              )}

              {/* STEP 7: Customer Details */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#C59A4A] tracking-wider uppercase">Step 7 of 8</span>
                    <h2 className="text-xl font-bold text-[#103D2D]">
                      Your Contact Details
                    </h2>
                    <p className="text-xs text-[#66706B]">Required for our technical desk to reach out.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-[#103D2D] mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full p-2.5 rounded-lg border border-[#103D2D]/20 bg-[#F6F4EE]/50 focus:outline-none focus:ring-2 focus:ring-[#103D2D]"
                      />
                      {errors.fullName && <p className="text-[10px] text-red-600 mt-0.5">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block font-bold text-[#103D2D] mb-1">Company Name</label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                        placeholder="e.g. Agro Mills Ltd"
                        className="w-full p-2.5 rounded-lg border border-[#103D2D]/20 bg-[#F6F4EE]/50 focus:outline-none focus:ring-2 focus:ring-[#103D2D]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#103D2D] mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="e.g. 9876543210"
                        className="w-full p-2.5 rounded-lg border border-[#103D2D]/20 bg-[#F6F4EE]/50 focus:outline-none focus:ring-2 focus:ring-[#103D2D]"
                      />
                      {errors.phone && <p className="text-[10px] text-red-600 mt-0.5">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block font-bold text-[#103D2D] mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="e.g. contact@company.com"
                        className="w-full p-2.5 rounded-lg border border-[#103D2D]/20 bg-[#F6F4EE]/50 focus:outline-none focus:ring-2 focus:ring-[#103D2D]"
                      />
                      {errors.email && <p className="text-[10px] text-red-600 mt-0.5">{errors.email}</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-[#103D2D] mb-1">City / Location *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                        placeholder="e.g. Jaipur, Rajasthan"
                        className="w-full p-2.5 rounded-lg border border-[#103D2D]/20 bg-[#F6F4EE]/50 focus:outline-none focus:ring-2 focus:ring-[#103D2D]"
                      />
                      {errors.city && <p className="text-[10px] text-red-600 mt-0.5">{errors.city}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 8: Confirmation & Summary */}
              {currentStep === 8 && (
                <div className="space-y-5">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#C59A4A] tracking-wider uppercase">Step 8 of 8 • Review</span>
                    <h2 className="text-xl font-bold text-[#103D2D]">
                      Confirm Packaging Specification Summary
                    </h2>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-[#F6F4EE] rounded-xl p-4 border border-[#103D2D]/15 space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#103D2D]/10">
                      <div>
                        <span className="text-[#66706B] block">Product Category:</span>
                        <strong className="text-[#103D2D]">{formData.product || "Not Selected"}</strong>
                      </div>
                      <div>
                        <span className="text-[#66706B] block">Industry Sector:</span>
                        <strong className="text-[#103D2D]">{formData.industry || "Not Selected"}</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pb-3 border-b border-[#103D2D]/10">
                      <div>
                        <span className="text-[#66706B] block">Quantity:</span>
                        <strong className="text-[#103D2D]">{formData.quantity || "Not Selected"}</strong>
                      </div>
                      <div>
                        <span className="text-[#66706B] block">Printing:</span>
                        <strong className="text-[#103D2D]">{formData.printing || "Not Selected"}</strong>
                      </div>
                      <div>
                        <span className="text-[#66706B] block">Bag Size:</span>
                        <strong className="text-[#103D2D]">{formData.size || "Not Selected"}</strong>
                      </div>
                    </div>

                    {formData.additionalNotes && (
                      <div className="pb-3 border-b border-[#103D2D]/10">
                        <span className="text-[#66706B] block">Additional Details:</span>
                        <p className="text-[#171A18] font-medium italic">{formData.additionalNotes}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <span className="text-[#66706B] block">Customer Name:</span>
                        <strong className="text-[#103D2D]">{formData.fullName} ({formData.companyName || "N/A"})</strong>
                      </div>
                      <div>
                        <span className="text-[#66706B] block">Contact & Source:</span>
                        <strong className="text-[#103D2D]">{formData.phone} • {formData.city}</strong>
                        <span className="text-[10px] text-[#1D6448] block mt-0.5 font-semibold">Source: {formData.source}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submission Choice Actions */}
                  <div className="space-y-2 pt-2">
                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1D6448] text-white text-xs sm:text-sm font-bold hover:bg-[#103D2D] transition-colors shadow-md"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-300" />
                      <span>Submit Specification via WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleFormSubmit}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#103D2D] text-white text-xs sm:text-sm font-bold hover:bg-[#171A18] transition-colors"
                    >
                      <Send className="w-4 h-4 text-[#C59A4A]" />
                      <span>Submit Specification via Direct Form</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="w-full text-center text-xs font-semibold text-[#66706B] hover:text-[#103D2D] py-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5 inline mr-1" />
                      Edit Selections
                    </button>
                  </div>
                </div>
              )}

              {/* Wizard Footer Navigation Controls */}
              {currentStep < 8 && (
                <div className="pt-4 border-t border-[#103D2D]/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${
                      currentStep === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-[#103D2D] hover:bg-[#F6F4EE]"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleNext}
                    icon={ArrowRight}
                    iconPosition="right"
                    className="font-bold"
                  >
                    {currentStep === 7 ? "Review Summary" : "Next Step"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
