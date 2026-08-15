import React, { useEffect } from "react";
import { company } from "../../data/company.js";

/**
 * Dynamic SEO & Metadata Manager Component — Shri Shyam Poly Packs
 * Sets title, meta description, Open Graph, Twitter Cards, and JSON-LD structured data.
 */
export default function SEO({
  title = "Shri Shyam Poly Packs | Industrial Woven Packaging Solutions",
  description = "Explore PP woven bags, HDPE woven bags, laminated sacks, printed packaging, fabric rolls and custom industrial packaging solutions from Shri Shyam Poly Packs.",
  pathname = "",
  image = "/og-image.png",
  type = "website",
  jsonLd = null,
}) {
  const siteUrl = "https://www.shrishyampolypack.com"; // Editable production domain placeholder
  const canonicalUrl = `${siteUrl}${pathname}`;
  const ogImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  useEffect(() => {
    // 1. Document Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMetaTag = (selector, attributeName, attributeValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Meta Description & Theme Color
    setMetaTag("meta[name='description']", "name", "description", description);
    setMetaTag("meta[name='theme-color']", "name", "theme-color", "#103D2D");
    setMetaTag("meta[name='robots']", "name", "robots", "index, follow");

    // Open Graph
    setMetaTag("meta[property='og:title']", "property", "og:title", title);
    setMetaTag("meta[property='og:description']", "property", "og:description", description);
    setMetaTag("meta[property='og:type']", "property", "og:type", type);
    setMetaTag("meta[property='og:url']", "property", "og:url", canonicalUrl);
    setMetaTag("meta[property='og:image']", "property", "og:image", ogImageUrl);
    setMetaTag("meta[property='og:site_name']", "property", "og:site_name", "Shri Shyam Poly Packs");

    // Twitter Card
    setMetaTag("meta[name='twitter:card']", "name", "twitter:card", "summary_large_image");
    setMetaTag("meta[name='twitter:title']", "name", "twitter:title", title);
    setMetaTag("meta[name='twitter:description']", "name", "twitter:description", description);
    setMetaTag("meta[name='twitter:image']", "name", "twitter:image", ogImageUrl);

    // Canonical link
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 3. Inject JSON-LD Structured Data
    let scriptTag = document.getElementById("json-ld-script");
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "json-ld-script";
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Cleanup on unmount if needed
    };
  }, [title, description, pathname, image, type, jsonLd]);

  return null;
}
