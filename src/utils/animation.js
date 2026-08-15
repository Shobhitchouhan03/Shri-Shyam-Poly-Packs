import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion.js";

// Register plugins once globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Standard Animation Defaults
 */
export const ANIMATION_DEFAULTS = {
  duration: 0.5,
  ease: "power2.out",
  distance: 20,
  delay: 0.05,
  stagger: 0.06,
};

/**
 * Reusable Central GSAP Helpers
 */
export const animHelpers = {
  fadeUp: (target, opts = {}) => {
    if (!target) return;
    return gsap.fromTo(
      target,
      { opacity: 0, y: opts.distance || ANIMATION_DEFAULTS.distance },
      {
        opacity: 1,
        y: 0,
        duration: opts.duration || ANIMATION_DEFAULTS.duration,
        delay: opts.delay || 0,
        ease: opts.ease || ANIMATION_DEFAULTS.ease,
        clearProps: "transform",
      }
    );
  },

  fadeIn: (target, opts = {}) => {
    if (!target) return;
    return gsap.fromTo(
      target,
      { opacity: 0 },
      {
        opacity: 1,
        duration: opts.duration || ANIMATION_DEFAULTS.duration,
        delay: opts.delay || 0,
        ease: opts.ease || ANIMATION_DEFAULTS.ease,
      }
    );
  },

  staggerReveal: (targets, opts = {}) => {
    if (!targets || targets.length === 0) return;
    return gsap.fromTo(
      targets,
      { opacity: 0, y: opts.distance || ANIMATION_DEFAULTS.distance },
      {
        opacity: 1,
        y: 0,
        duration: opts.duration || ANIMATION_DEFAULTS.duration,
        delay: opts.delay || 0,
        stagger: opts.stagger || ANIMATION_DEFAULTS.stagger,
        ease: opts.ease || ANIMATION_DEFAULTS.ease,
        clearProps: "transform",
      }
    );
  },

  imageReveal: (target, opts = {}) => {
    if (!target) return;
    return gsap.fromTo(
      target,
      { opacity: 0.2, scale: 1.04 },
      {
        opacity: 1,
        scale: 1,
        duration: opts.duration || 0.6,
        delay: opts.delay || 0,
        ease: "power2.out",
      }
    );
  },

  scaleIn: (target, opts = {}) => {
    if (!target) return;
    return gsap.fromTo(
      target,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: opts.duration || ANIMATION_DEFAULTS.duration,
        delay: opts.delay || 0,
        ease: "back.out(1.2)",
      }
    );
  },

  slideInLeft: (target, opts = {}) => {
    if (!target) return;
    return gsap.fromTo(
      target,
      { opacity: 0, x: -(opts.distance || 30) },
      {
        opacity: 1,
        x: 0,
        duration: opts.duration || ANIMATION_DEFAULTS.duration,
        delay: opts.delay || 0,
        ease: opts.ease || ANIMATION_DEFAULTS.ease,
        clearProps: "transform",
      }
    );
  },

  slideInRight: (target, opts = {}) => {
    if (!target) return;
    return gsap.fromTo(
      target,
      { opacity: 0, x: opts.distance || 30 },
      {
        opacity: 1,
        x: 0,
        duration: opts.duration || ANIMATION_DEFAULTS.duration,
        delay: opts.delay || 0,
        ease: opts.ease || ANIMATION_DEFAULTS.ease,
        clearProps: "transform",
      }
    );
  },

  sectionHeadingReveal: (target, opts = {}) => {
    if (!target) return;
    const children = target.children.length > 0 ? target.children : target;
    return gsap.fromTo(
      children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: opts.duration || 0.5,
        stagger: 0.06,
        delay: opts.delay || 0,
        ease: "power2.out",
        clearProps: "transform",
      }
    );
  },

  cardStagger: (targets, opts = {}) => {
    if (!targets || targets.length === 0) return;
    return gsap.fromTo(
      targets,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: opts.duration || 0.5,
        stagger: opts.stagger || 0.06,
        delay: opts.delay || 0,
        ease: "power2.out",
        clearProps: "transform",
      }
    );
  },

  modalOpen: (modalRef, backdropRef, opts = {}) => {
    if (backdropRef) {
      gsap.fromTo(backdropRef, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" });
    }
    if (modalRef) {
      gsap.fromTo(
        modalRef,
        { opacity: 0, scale: 0.95, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: "back.out(1.2)" }
      );
    }
  },
};

/**
 * Reusable hook for subtle entrance reveal animations.
 * ScrollTrigger-driven for optimal render frame distribution.
 *
 * @param {Object} options Configuration options
 * @returns {React.RefObject} Ref to attach to container element
 */
export function useGSAPReveal(options = {}) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const {
    delay = 0.05,
    duration = 0.5,
    y = 20,
    x = 0,
    stagger = 0.06,
  } = options;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // If user prefers reduced motion, bypass movement and instantly show
    if (prefersReducedMotion) {
      gsap.set(el.children.length > 0 ? el.children : el, { opacity: 1, y: 0, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const targets = el.children.length > 0 ? el.children : el;

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: y,
          x: x,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: duration,
          delay: delay,
          stagger: stagger,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [prefersReducedMotion, delay, duration, y, x, stagger]);

  return containerRef;
}
