import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO.jsx";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-16 px-4">
      <SEO
        title="404 — Page Not Found | Shri Shyam Poly Packs"
        description="The requested packaging page or product specification route does not exist."
        pathname="/404"
      />
      <div className="w-16 h-16 rounded-full bg-amber-100 text-[#C59A4A] flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h1 className="text-4xl font-extrabold text-[#103D2D]">404 — Page Not Found</h1>
      <p className="text-base text-[#66706B] mt-2 max-w-md">
        The requested packaging page or product specification route does not exist or has been relocated.
      </p>

      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#103D2D] text-white text-sm font-semibold hover:bg-[#1D6448] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#C59A4A]" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
