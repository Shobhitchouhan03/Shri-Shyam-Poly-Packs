import { company } from "../data/company.js";

/**
 * Generates a formatted WhatsApp click-to-chat URL for smart enquiries and quick messages.
 * Includes lead source tracking and excludes empty or undefined fields.
 *
 * @param {Object} enquiry Enquiry data object
 * @returns {string} Encoded WhatsApp URL
 */
export function buildWhatsAppEnquiryUrl(enquiry = {}) {
  const cleanPhone = company.whatsapp.replace(/[^0-9]/g, "") || "919999999999";

  const textLines = [
    `Hello ${company.name},`,
    ``,
    `I would like to submit an enquiry.`,
    ``,
    enquiry.queryCategory ? `*Query Type:* ${enquiry.queryCategory}` : null,
    enquiry.product || enquiry.productName ? `*Product:* ${enquiry.product || enquiry.productName}` : null,
    enquiry.industry || enquiry.application ? `*Industry:* ${enquiry.industry || enquiry.application}` : null,
    enquiry.quantity ? `*Quantity:* ${enquiry.quantity}` : null,
    enquiry.printing ? `*Printing Requirement:* ${enquiry.printing}` : null,
    enquiry.size ? `*Preferred Size:* ${enquiry.size}` : null,
    enquiry.city ? `*Delivery City:* ${enquiry.city}` : null,
    ``,
    enquiry.fullName || enquiry.name ? `*Name:* ${enquiry.fullName || enquiry.name}` : null,
    enquiry.companyName ? `*Company:* ${enquiry.companyName}` : null,
    enquiry.phone ? `*Phone:* ${enquiry.phone}` : null,
    enquiry.email ? `*Email:* ${enquiry.email}` : null,
    enquiry.preferredContact ? `*Preferred Contact Method:* ${enquiry.preferredContact}` : null,
    ``,
    enquiry.additionalNotes || enquiry.message || enquiry.customNotes
      ? `*Message:* ${enquiry.additionalNotes || enquiry.message || enquiry.customNotes}`
      : null,
    ``,
    enquiry.source ? `*Source:* ${enquiry.source}` : null,
    ``,
    `Thank you.`,
  ].filter((line) => line !== null);

  const message = encodeURIComponent(textLines.join("\n"));
  return `https://wa.me/${cleanPhone}?text=${message}`;
}

/**
 * Generates clean, professional plain text for email enquiries.
 *
 * @param {Object} enquiry Enquiry data object
 * @returns {string} Plain text formatted email body
 */
export function buildEmailEnquiryText(enquiry = {}) {
  const lines = [
    `${company.name.toUpperCase()} - INDUSTRIAL PACKAGING ENQUIRY`,
    `====================================================`,
    `Date: ${new Date().toLocaleDateString("en-IN")}`,
    enquiry.source ? `Lead Source: ${enquiry.source}` : null,
    ``,
    `SPECIFICATION DETAILS:`,
    `----------------------`,
    enquiry.queryCategory ? `Query Category   : ${enquiry.queryCategory}` : null,
    `Product Category : ${enquiry.product || enquiry.productName || "Not Specified"}`,
    `Industry Sector  : ${enquiry.industry || enquiry.application || "Not Specified"}`,
    `Approx Quantity  : ${enquiry.quantity || "Not Specified"}`,
    `Printing Option  : ${enquiry.printing || "Not Specified"}`,
    `Bag Size         : ${enquiry.size || "Not Specified"}`,
    `Additional Notes : ${enquiry.additionalNotes || enquiry.message || enquiry.customNotes || "None provided"}`,
    ``,
    `CUSTOMER CONTACT DETAILS:`,
    `-------------------------`,
    `Full Name        : ${enquiry.fullName || enquiry.name || "Not Specified"}`,
    `Company Name     : ${enquiry.companyName || "Not Specified"}`,
    `Phone Number     : ${enquiry.phone || "Not Specified"}`,
    `Email Address    : ${enquiry.email || "Not Specified"}`,
    `Preferred Method : ${enquiry.preferredContact || "Not Specified"}`,
    `Location / City  : ${enquiry.city || "Not Specified"}`,
    `====================================================`,
  ].filter((l) => l !== null);

  return lines.join("\n");
}

/**
 * Builds a mailto link with preformatted subject and body.
 *
 * @param {Object} enquiry Enquiry data object
 * @returns {string} Encoded mailto URL
 */
export function buildMailtoUrl(enquiry = {}) {
  const queryType = enquiry.queryCategory || enquiry.product || enquiry.productName || "Packaging Requirement";
  const customerName = enquiry.companyName || enquiry.fullName || enquiry.name || "Customer";
  const subject = encodeURIComponent(`Packaging Enquiry — ${queryType} — ${customerName}`);
  const body = encodeURIComponent(buildEmailEnquiryText(enquiry));
  
  const recipient = company.email && !company.email.includes("[") ? company.email : "sales@shrishyampolypack.com";
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

// Local Storage Draft Keys
const DRAFT_KEY = "sspp_enquiry_draft";

/**
 * Saves local draft to localStorage with updated timestamp
 */
export function saveLocalEnquiryDraft(data) {
  try {
    const payload = {
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
  } catch (e) {
    // Ignore storage quota errors
  }
}

/**
 * Retrieves saved draft from localStorage
 */
export function getLocalEnquiryDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Clears saved draft from localStorage
 */
export function clearLocalEnquiryDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (e) {
    // Ignore
  }
}
