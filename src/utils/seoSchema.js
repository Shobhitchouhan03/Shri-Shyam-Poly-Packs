import { company } from "../data/company.js";

const siteUrl = "https://www.shrishyampolypack.com";

/**
 * Organization & LocalBusiness JSON-LD Schema
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Shri Shyam Poly Packs",
    "description": "Manufacturer and supplier of PP woven bags, HDPE sacks, laminated bags, fabric rolls and custom industrial packaging solutions.",
    "url": siteUrl,
    "logo": `${siteUrl}/shri-shyam-poly-packs-icon.svg`,
    "telephone": company.phone !== "[PHONE NUMBER]" ? company.phone : "+91-9876543210",
    "email": company.email !== "[EMAIL ADDRESS]" ? company.email : "info@shrishyampolypack.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": company.factoryAddress !== "[FACTORY ADDRESS]" ? company.factoryAddress : "Industrial Area",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:30"
    }
  };
}

/**
 * Product JSON-LD Schema (No Prices, No Rates, No Fake Ratings)
 */
export function getProductSchema(product) {
  if (!product) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.shortDescription || product.fullDescription,
    "category": product.category,
    "material": product.material,
    "brand": {
      "@type": "Brand",
      "name": "Shri Shyam Poly Packs"
    }
  };
}

/**
 * FAQPage JSON-LD Schema
 */
export function getFAQSchema(faqItems = []) {
  if (!faqItems || faqItems.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question || item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer || item.a
      }
    }))
  };
}
