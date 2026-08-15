import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { gsap } from "./utils/animation.js";
import { useReducedMotion } from "./hooks/useReducedMotion.js";

// Layout Components
import Navbar from "./components/layout/Navbar.jsx";
import MobileMenu from "./components/layout/MobileMenu.jsx";
import Footer from "./components/layout/Footer.jsx";

// Global Common UI Components
import ScrollProgress from "./components/common/ScrollProgress.jsx";
import FloatingWhatsApp from "./components/common/FloatingWhatsApp.jsx";
import BackToTop from "./components/common/BackToTop.jsx";
import { ScrollToTop } from "./hooks/useScrollToTop.js";

// Pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Industries from "./pages/Industries.jsx";
import Quality from "./pages/Quality.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

// Lazy Loaded Smart Enquiry Multi-Step Wizard Modal
const RequestQuoteModal = lazy(() => import("./components/common/RequestQuoteModal.jsx"));

// Subtle Route Transition Wrapper
function AnimatedPageWrapper({ children }) {
  const location = useLocation();
  const mainRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!mainRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0.85, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", clearProps: "transform" }
      );
    }, mainRef);

    return () => ctx.revert();
  }, [location.pathname, prefersReducedMotion]);

  return (
    <main ref={mainRef} className="flex-1 w-full pt-16 sm:pt-20">
      {children}
    </main>
  );
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState(null);

  const handleOpenMobileMenu = () => setIsMobileMenuOpen(true);
  const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

  const handleOpenQuoteModal = (data = null) => {
    setModalInitialData(data);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setModalInitialData(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F4EE] text-[#171A18] font-sans antialiased selection:bg-[#C59A4A] selection:text-white">
      {/* Scroll to Top on route change */}
      <ScrollToTop />

      {/* Top Thin Scroll Progress Bar */}
      <ScrollProgress />

      {/* Sticky Global Navigation Header */}
      <Navbar
        onOpenMobileMenu={handleOpenMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
        onOpenModal={handleOpenQuoteModal}
      />

      {/* Mobile Slide Navigation Panel */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
        onOpenModal={handleOpenQuoteModal}
      />

      {/* Main Content Area with Animated Route Transition */}
      <AnimatedPageWrapper>
        <Routes>
          <Route path="/" element={<Home onOpenModal={handleOpenQuoteModal} />} />
          <Route path="/about" element={<About onOpenModal={handleOpenQuoteModal} />} />
          <Route path="/products" element={<Products onOpenModal={handleOpenQuoteModal} />} />
          <Route path="/products/:slug" element={<ProductDetails onOpenModal={handleOpenQuoteModal} />} />
          <Route path="/industries" element={<Industries onOpenModal={handleOpenQuoteModal} />} />
          <Route path="/quality" element={<Quality onOpenModal={handleOpenQuoteModal} />} />
          <Route path="/contact" element={<Contact onOpenModal={handleOpenQuoteModal} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatedPageWrapper>

      {/* Global Smart Enquiry Multi-Step Wizard Modal (Lazy Loaded) */}
      <Suspense fallback={null}>
        {isQuoteModalOpen && (
          <RequestQuoteModal
            isOpen={isQuoteModalOpen}
            onClose={handleCloseQuoteModal}
            initialData={modalInitialData}
          />
        )}
      </Suspense>

      {/* Floating Action WhatsApp Button */}
      <FloatingWhatsApp onOpenModal={handleOpenQuoteModal} />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Global Multi-Column Footer */}
      <Footer onOpenModal={handleOpenQuoteModal} />
    </div>
  );
}
