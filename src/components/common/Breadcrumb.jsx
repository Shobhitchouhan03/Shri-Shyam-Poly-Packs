import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

/**
 * Reusable Breadcrumb Component
 * @param {Array<{ label: string, path?: string }>} items Breadcrumb items
 */
export default function Breadcrumb({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-2">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#66706B]">
        <li>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-[#103D2D] hover:text-[#1D6448] font-medium transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[#C59A4A]" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-[#66706B]/50 shrink-0" />
              {isLast || !item.path ? (
                <span className="font-semibold text-[#103D2D] truncate max-w-[200px] sm:max-w-none">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-[#103D2D] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
