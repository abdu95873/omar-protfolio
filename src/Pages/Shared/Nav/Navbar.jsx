import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../../assets/logo.png";
import { getLenis } from "../../../hooks/useSmoothScroll";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Videos", to: "/allVideos" },
  { name: "Blogs", to: "/allBlogs" },
  { name: "Story", to: "/allStory" },
  { name: "Reviews", to: "/allReviews" },
];

const contactLink = { name: "Contact", to: "/contact" };

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setIsNavOpen(false);
    document.body.style.overflow = "";
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      if (isNavOpen) lenis.stop();
      else lenis.start();
    } else {
      document.body.style.overflow = isNavOpen ? "hidden" : "";
    }
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [isNavOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        const toggle = event.target.closest("[data-nav-toggle]");
        if (!toggle) setIsNavOpen(false);
      }
    }
    if (isNavOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNavOpen]);

  const linkClass = (active) =>
    `relative inline-flex items-center px-3.5 py-2 text-[0.9375rem] font-medium tracking-wide transition-colors duration-200 rounded-lg ${
      active
        ? "text-orange-500"
        : "text-neutral-600 hover:text-neutral-900"
    }`;

  const mobileLinkClass = (active) =>
    `flex items-center justify-between rounded-xl px-4 py-3.5 text-[0.9375rem] font-medium transition-colors ${
      active
        ? "bg-orange-50 text-orange-600"
        : "text-neutral-700 hover:bg-neutral-50"
    }`;

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-[box-shadow,background,border-color] duration-300 ${
        scrolled ? "glass-nav" : "bg-[#fafafa]/95 border-b border-neutral-200/60"
      }`}
    >
      <nav
        className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-16"
        aria-label="Main navigation"
      >
        <div className="flex h-16 lg:h-[4.25rem] items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 min-w-0 group"
            aria-label="Omar — home"
          >
            <img
              src={logo}
              alt=""
              className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div className="min-w-0 leading-none">
              <span className="block font-quick text-xl sm:text-2xl font-semibold tracking-[0.14em] text-neutral-900 group-hover:text-orange-500 transition-colors">
                OMAR
              </span>
              <span className="hidden sm:block mt-1 text-[10px] uppercase tracking-[0.22em] text-neutral-400 font-medium">
                Portfolio
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link key={link.to} to={link.to} className={linkClass(active)}>
                  {link.name}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-2.5 -bottom-px h-px bg-orange-400 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              to={contactLink.to}
              className={`ml-3 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                isActive(contactLink.to)
                  ? "bg-orange-500 text-white shadow-glow"
                  : "bg-neutral-900 text-white hover:bg-orange-500 hover:shadow-glow"
              }`}
            >
              {contactLink.name}
            </Link>
          </div>

          <button
            type="button"
            data-nav-toggle
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200/80 bg-white text-neutral-800 shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-50"
            onClick={() => setIsNavOpen((open) => !open)}
            aria-label={isNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={isNavOpen}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              {isNavOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isNavOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-neutral-900/25 backdrop-blur-[2px] lg:hidden"
              aria-label="Close menu"
              onClick={() => setIsNavOpen(false)}
            />
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden relative z-50 border-t border-neutral-200/80 bg-white/98 backdrop-blur-lg shadow-lg"
            >
              <div className="max-w-[1920px] mx-auto px-5 sm:px-8 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setIsNavOpen(false)}
                      className={mobileLinkClass(isActive(link.to))}
                    >
                      {link.name}
                      {isActive(link.to) && (
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-400" aria-hidden />
                      )}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.03 }}
                  className="pt-2"
                >
                  <Link
                    to={contactLink.to}
                    onClick={() => setIsNavOpen(false)}
                    className="btn-brand !w-full !py-3.5 !text-base"
                  >
                    {contactLink.name}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
