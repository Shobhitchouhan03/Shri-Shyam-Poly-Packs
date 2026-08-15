import React from "react";
import BrandLogo from "./BrandLogo.jsx";

/**
 * Legacy Logo Alias Component
 * Maps variant props ("dark", "light", "default", etc.) to BrandLogo.
 */
export default function Logo({ variant = "default", className = "" }) {
  const theme = variant === "light" ? "light" : "dark";
  const logoVariant = variant === "compact" ? "compact" : variant === "short" ? "short" : "responsive";

  return <BrandLogo variant={logoVariant} theme={theme} className={className} />;
}
