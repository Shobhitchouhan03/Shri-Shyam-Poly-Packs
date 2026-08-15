import React from "react";
import { Loader2 } from "lucide-react";

/**
 * Reusable Global Button System
 * Variants: primary, secondary, outline, ghost, icon, cta, gold
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  isDisabled = false,
  type = "button",
  onClick,
  className = "",
  ariaLabel,
  icon: Icon,
  iconPosition = "left",
  ...props
}) {
  const baseStyles =
    "group inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C59A4A] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-2 min-h-[38px] rounded-md gap-1.5",
    md: "text-sm px-5 py-2.5 min-h-[44px] rounded-md gap-2",
    lg: "text-base px-6 py-3.5 min-h-[50px] rounded-lg gap-2.5",
    icon: "p-2.5 min-h-[44px] min-w-[44px] rounded-md",
  };

  const variantStyles = {
    primary:
      "bg-[#103D2D] text-white hover:bg-[#1D6448] shadow-xs border border-[#103D2D]",
    secondary:
      "bg-[#1D6448] text-white hover:bg-[#103D2D] shadow-xs border border-[#1D6448]",
    cta:
      "bg-[#C59A4A] text-[#171A18] font-bold hover:bg-[#b0883e] shadow-sm border border-[#C59A4A]",
    gold:
      "bg-gradient-to-r from-[#C59A4A] to-[#d4aa58] text-[#103D2D] font-bold hover:brightness-105 shadow-md border border-[#C59A4A]",
    outline:
      "bg-transparent text-[#103D2D] border border-[#103D2D]/30 hover:bg-[#103D2D]/5 hover:border-[#103D2D]",
    ghost:
      "bg-transparent text-[#103D2D] hover:bg-[#103D2D]/10 border border-transparent",
    icon:
      "bg-transparent text-[#103D2D] hover:bg-[#103D2D]/10 hover:text-[#1D6448] rounded-full",
  };

  const currentSize = variant === "icon" ? "icon" : size;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      aria-label={ariaLabel}
      className={`${baseStyles} ${sizeStyles[currentSize]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {Icon && iconPosition === "left" && (
            <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
          )}
          {children && <span>{children}</span>}
          {Icon && iconPosition === "right" && (
            <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          )}
        </>
      )}
    </button>
  );
}
