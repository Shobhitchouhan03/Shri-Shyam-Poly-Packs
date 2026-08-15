import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Button from "./Button.jsx";
import SafeImage from "./SafeImage.jsx";

/**
 * Base Industrial Card Container
 */
export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white rounded-lg border border-[#103D2D]/10 p-6 flex flex-col justify-between hover:border-[#103D2D]/30 hover:shadow-md transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Product Card Component (Uses SafeImage, No Prices, Strict Enquiry CTAs)
 */
export function ProductCard({ product, onEnquire }) {
  if (!product) return null;

  return (
    <Card className="h-full group overflow-hidden !p-0">
      {/* Product Image Cover using SafeImage */}
      <div className="relative h-52 sm:h-56 bg-[#F6F4EE] overflow-hidden">
        <SafeImage
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-bold text-[#C59A4A] tracking-wider uppercase px-2.5 py-1 rounded bg-[#171A18]/85 backdrop-blur-xs border border-[#C59A4A]/30">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Name & Description */}
          <h3 className="text-xl font-bold text-[#103D2D] leading-snug group-hover:text-[#1D6448] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs sm:text-sm text-[#66706B] line-clamp-3 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Technical Highlights */}
          {product.features && product.features.length > 0 && (
            <ul className="space-y-1.5 pt-2 border-t border-[#103D2D]/10">
              {product.features.slice(0, 3).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#171A18]">
                  <Check className="w-3.5 h-3.5 text-[#1D6448] shrink-0 mt-0.5" />
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Footer */}
        <div className="mt-6 pt-4 border-t border-[#103D2D]/10 flex items-center justify-between gap-3">
          <Link
            to={`/products/${product.slug}`}
            className="text-xs font-semibold text-[#103D2D] hover:text-[#1D6448] inline-flex items-center gap-1 transition-colors"
          >
            <span>Specifications</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C59A4A]" />
          </Link>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onEnquire && onEnquire({ source: `Featured Product Card — ${product.name}`, name: product.name, productName: product.name })}
          >
            Send Product Enquiry
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * Feature / Highlight Card Component
 */
export function FeatureCard({ icon: Icon, title, description, className = "" }) {
  return (
    <Card className={className}>
      <div className="space-y-3">
        {Icon && (
          <div className="w-10 h-10 rounded-md bg-[#103D2D]/10 flex items-center justify-center text-[#1D6448]">
            <Icon className="w-5 h-5 text-[#1D6448]" />
          </div>
        )}
        <h3 className="text-lg font-bold text-[#103D2D]">{title}</h3>
        <p className="text-xs sm:text-sm text-[#66706B] leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}

export default Card;
