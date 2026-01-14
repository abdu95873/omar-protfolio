import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";

const links = [
  { name: "HOME", to: "/" },
  { name: "VIDEOS", to: "/allVideos" },
  { name: "BLOGS", to: "/allBlogs" },
  { name: "STORY", to: "/allStory" },
  { name: "REVIEWS", to: "/allReviews" },
  { name: "CONTACT", to: "/contact" },
];

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const current = links.find((l) => l.to === location.pathname);
    if (current) setActiveLink(current.name);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsNavOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuRef]);

  return (
    <nav className="sticky top-0 z-50 bg-[#FBFBFB] border-b border-gray-200 shadow-sm">
      <div className="max-w-full mx-auto px-8 sm:px-12 lg:px-36">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img src={logo} alt="Logo" className="h-8 sm:h-10" />
            <h1 className="text-lg sm:text-xl font-bold">OMAR</h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`text-sm sm:text-base lg:text-xl font-normal transition ${
                  activeLink === link.name
                    ? "text-orange-400 border-b-2 border-orange-400 pb-1"
                    : "text-gray-700 hover:text-orange-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden flex items-center justify-center p-2"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-8 sm:w-8 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Collapsible Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isNavOpen ? "max-h-96 py-4" : "max-h-0 py-0"
        } bg-white border-t border-gray-200`}
      >
        <div className="flex flex-col px-4 sm:px-6 gap-3">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setIsNavOpen(false)}
              className={`text-sm sm:text-base font-normal ${
                activeLink === link.name ? "text-orange-400" : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
