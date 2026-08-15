import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/common/PageHero.jsx";
import Button from "../components/common/Button.jsx";
import SafeImage from "../components/common/SafeImage.jsx";
import SEO from "../components/common/SEO.jsx";
import { products } from "../data/products.js";
import { gsap } from "../utils/animation.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowRight,
  Package,
  Filter,
  RefreshCw,
} from "lucide-react";

export default function Products({ onOpenModal }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState("All");
  const [laminatedFilter, setLaminatedFilter] = useState("All");
  const [printedFilter, setPrintedFilter] = useState("All");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const gridRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Extract unique categories & applications
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const applications = useMemo(() => {
    const apps = new Set();
    products.forEach((p) => p.applications.forEach((a) => apps.add(a)));
    return ["All", ...Array.from(apps)];
  }, []);

  // Filter products dynamically
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Search matches name, category, shortDescription, applications
      const matchesSearch =
        !searchTerm.trim() ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.applications.some((app) => app.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category match
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      // Application match
      const matchesApp =
        selectedApplication === "All" || item.applications.includes(selectedApplication);

      // Laminated match
      const matchesLaminated =
        laminatedFilter === "All" ||
        (laminatedFilter === "Laminated" && item.laminated.toLowerCase().includes("laminated") && !item.laminated.toLowerCase().includes("unlaminated")) ||
        (laminatedFilter === "Unlaminated" && item.laminated.toLowerCase().includes("unlaminated"));

      // Printed match
      const matchesPrinted =
        printedFilter === "All" ||
        (printedFilter === "Printed" && !item.printed.toLowerCase().includes("unprinted")) ||
        (printedFilter === "Plain" && item.printed.toLowerCase().includes("unprinted"));

      return matchesSearch && matchesCategory && matchesApp && matchesLaminated && matchesPrinted;
    });
  }, [searchTerm, selectedCategory, selectedApplication, laminatedFilter, printedFilter]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedApplication("All");
    setLaminatedFilter("All");
    setPrintedFilter("All");
  };

  // GSAP animation when filtered grid updates
  useEffect(() => {
    if (!gridRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out" }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [filteredProducts, prefersReducedMotion]);

  return (
    <div className="space-y-10 pb-20">
      <SEO
        title="Product Catalogue | Polypropylene & HDPE Woven Sacks"
        description="Browse PP woven bags, HDPE sacks, laminated bags, printed bags, and fabric rolls manufactured by Shri Shyam Poly Packs."
        pathname="/products"
      />
      {/* Page Hero */}
      <PageHero
        eyebrow="Industrial Catalogue"
        title="Woven Packaging Portfolio"
        subtitle="Explore our comprehensive range of high-strength PP & HDPE woven sacks, laminated rolls, and custom packaging solutions."
        breadcrumbItems={[{ label: "Product Catalogue" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Filter & Search Bar Controls */}
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-[#103D2D]/10 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Real-time Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#66706B]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products by keyword, crop, or material..."
                className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-lg border border-[#103D2D]/20 focus:outline-none focus:ring-2 focus:ring-[#103D2D] bg-[#F6F4EE]/50"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Desktop Filters & Reset / Mobile Trigger */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#103D2D] text-white text-xs font-semibold"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#C59A4A]" />
                <span>Filter Products</span>
              </button>

              <span className="text-xs text-[#66706B] font-medium hidden sm:inline">
                Showing <strong className="text-[#103D2D]">{filteredProducts.length}</strong> of {products.length} Products
              </span>

              {(searchTerm || selectedCategory !== "All" || selectedApplication !== "All" || laminatedFilter !== "All" || printedFilter !== "All") && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-xs text-[#1D6448] hover:text-[#103D2D] font-semibold transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Desktop Filter Selects */}
          <div className="hidden lg:flex flex-wrap items-center gap-3 pt-2 border-t border-[#103D2D]/10">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-[#103D2D] shrink-0">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 rounded border border-[#103D2D]/20 text-xs focus:outline-none focus:ring-2 focus:ring-[#103D2D] bg-[#F6F4EE]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-[#103D2D] shrink-0">Application:</span>
              <select
                value={selectedApplication}
                onChange={(e) => setSelectedApplication(e.target.value)}
                className="px-3 py-1.5 rounded border border-[#103D2D]/20 text-xs focus:outline-none focus:ring-2 focus:ring-[#103D2D] bg-[#F6F4EE]"
              >
                {applications.map((app) => (
                  <option key={app} value={app}>
                    {app}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-[#103D2D] shrink-0">Lamination:</span>
              <select
                value={laminatedFilter}
                onChange={(e) => setLaminatedFilter(e.target.value)}
                className="px-3 py-1.5 rounded border border-[#103D2D]/20 text-xs focus:outline-none focus:ring-2 focus:ring-[#103D2D] bg-[#F6F4EE]"
              >
                <option value="All">All Lamination</option>
                <option value="Laminated">Laminated</option>
                <option value="Unlaminated">Unlaminated</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-[#103D2D] shrink-0">Printing:</span>
              <select
                value={printedFilter}
                onChange={(e) => setPrintedFilter(e.target.value)}
                className="px-3 py-1.5 rounded border border-[#103D2D]/20 text-xs focus:outline-none focus:ring-2 focus:ring-[#103D2D] bg-[#F6F4EE]"
              >
                <option value="All">All Printing</option>
                <option value="Printed">Printed</option>
                <option value="Plain">Plain / Unprinted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filter Slide Drawer */}
        {isFilterDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end" role="dialog" aria-modal="true">
            <div
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 bg-[#171A18]/70 backdrop-blur-xs"
              aria-hidden="true"
            />
            <div className="relative w-full max-w-xs bg-white h-full p-6 space-y-6 overflow-y-auto z-10 shadow-2xl border-l border-[#103D2D]/20">
              <div className="flex items-center justify-between border-b border-[#103D2D]/10 pb-4">
                <div className="flex items-center gap-2 text-[#103D2D] font-bold text-base">
                  <Filter className="w-5 h-5 text-[#C59A4A]" />
                  <span>Filter Products</span>
                </div>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-1 rounded text-gray-500 hover:text-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#103D2D] mb-1">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 rounded border border-[#103D2D]/20"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#103D2D] mb-1">Application</label>
                  <select
                    value={selectedApplication}
                    onChange={(e) => setSelectedApplication(e.target.value)}
                    className="w-full p-2 rounded border border-[#103D2D]/20"
                  >
                    {applications.map((app) => (
                      <option key={app} value={app}>
                        {app}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#103D2D] mb-1">Lamination</label>
                  <select
                    value={laminatedFilter}
                    onChange={(e) => setLaminatedFilter(e.target.value)}
                    className="w-full p-2 rounded border border-[#103D2D]/20"
                  >
                    <option value="All">All Lamination</option>
                    <option value="Laminated">Laminated</option>
                    <option value="Unlaminated">Unlaminated</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#103D2D] mb-1">Printing</label>
                  <select
                    value={printedFilter}
                    onChange={(e) => setPrintedFilter(e.target.value)}
                    className="w-full p-2 rounded border border-[#103D2D]/20"
                  >
                    <option value="All">All Printing</option>
                    <option value="Printed">Printed</option>
                    <option value="Plain">Plain / Unprinted</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#103D2D]/10 flex flex-col gap-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsFilterDrawerOpen(false)}
                >
                  Apply Filters ({filteredProducts.length})
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    handleResetFilters();
                    setIsFilterDrawerOpen(false);
                  }}
                >
                  Reset All
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Product Cards Grid using SafeImage */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-xl border border-[#103D2D]/10 space-y-4">
            <Package className="w-12 h-12 text-[#66706B] mx-auto opacity-50" />
            <h3 className="text-xl font-bold text-[#103D2D]">No Matching Products Found</h3>
            <p className="text-xs sm:text-sm text-[#66706B] max-w-md mx-auto">
              We couldn't find any products matching your selected search query or filters. Try resetting your criteria or contact us for custom packaging.
            </p>
            <Button variant="outline" size="sm" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl border border-[#103D2D]/10 hover:border-[#103D2D]/30 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Product Cover Image using SafeImage */}
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

                {/* Product Info Body */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#103D2D] leading-snug group-hover:text-[#1D6448] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#66706B] line-clamp-3 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Applications Tags */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {product.applications.slice(0, 3).map((app, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#F6F4EE] text-[#103D2D] font-medium border border-[#103D2D]/10"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="pt-4 border-t border-[#103D2D]/10 flex items-center justify-between gap-3">
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
                      onClick={() => onOpenModal && onOpenModal(product)}
                    >
                      Send Product Enquiry
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
