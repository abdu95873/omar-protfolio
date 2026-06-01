import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

/** Scroll to top on route change (works with Lenis + native scroll). */
export function scrollToTop(immediate = true) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: immediate ? "instant" : "smooth" });
  }
}

export function useScrollToTop(pathname) {
  useEffect(() => {
    scrollToTop(true);
  }, [pathname]);
}

/**
 * Lightweight smooth scroll (no pinned sections / GSAP).
 */
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.15,
      anchors: true,
    });

    lenisInstance = lenis;

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [enabled]);
}
