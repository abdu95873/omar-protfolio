import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import omar from "../../../assets/omar.png";

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

  useEffect(() => {
    const current = links.find((l) => l.to === location.pathname);
    if (current) setActiveLink(current.name);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-[#FBFBFB] border-b border-gray-200">
      <div className="max-w-full mx-auto px-64">
        <div className="flex items-center justify-between h-16">

          {/* Logo Section */}
        
<div className="flex items-center gap-3">
  <Link to="/" className="flex items-center gap-3" id="nav-brand">
    <img src={logo} alt="Logo" className="h-10" />
    <h1 className="text-xl font-bold ">OMAR</h1>
  </Link>
</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`text-xl font-normal transition ${
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
            className="md:hidden"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-800"
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

      {/* Mobile Menu */}
      {isNavOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col px-6 py-4 gap-4">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setIsNavOpen(false)}
                className={`text-sm font-normal ${
                  activeLink === link.name
                    ? "text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
