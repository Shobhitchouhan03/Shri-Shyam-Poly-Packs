import React, { useEffect, useRef } from "react";
import { gsap } from "../../utils/animation.js";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

/**
 * Reusable Reveal Animation Container Component
 * ScrollTrigger-driven reveal for optimal render frame distribution.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0.05,
  duration = 0.5,
  y = 20,
  x = 0,
  stagger = 0.06,
  as: Component = "div",
  ...props
}) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (prefersReducedMotion) {
      gsap.set(el.children.length > 0 ? el.children : el, { opacity: 1, y: 0, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const targets = el.children.length > 0 ? el.children : el;

      gsap.fromTo(
        targets,
        { opacity: 0, y, x },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          stagger,
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

  return (
    <Component ref={containerRef} className={className} {...props}>
      {children}
    </Component>
  );
}
