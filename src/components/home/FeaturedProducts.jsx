import React from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading.jsx";
import { ProductCard } from "../common/Card.jsx";
import { products } from "../../data/products.js";
import Button from "../common/Button.jsx";
import { ArrowRight } from "lucide-react";

export default function FeaturedProducts({ onOpenModal }) {
  const featured = products.slice(0, 6);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#103D2D]/10 pb-6">
        <SectionHeading
          eyebrow="Industrial Portfolio"
          heading="Featured Packaging Solutions"
          description="High-strength woven bags, laminated sacks, and industrial roll wrapping designed for severe load requirements."
        />

        <Link to="/products" className="shrink-0">
          <Button variant="outline" size="md" icon={ArrowRight} iconPosition="right">
            View All Products
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            onEnquire={() => onOpenModal && onOpenModal(prod)}
          />
        ))}
      </div>
    </section>
  );
}
