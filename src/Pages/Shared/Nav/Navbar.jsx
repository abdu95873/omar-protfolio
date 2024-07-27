import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './styles.css';
import logo from '../../../assets/logo.png';
import omar from '../../../assets/omar.png';

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('HOMEPAGE');

  useEffect(() => {
    const currentPath = location.pathname;
    const currentLink = links.find(link => link.to === currentPath);
    if (currentLink) {
      setActiveLink(currentLink.name);
    }
  }, [location]);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const links = [
    { name: 'HOME', to: '/', style: { fontFamily: '"Times New Roman", Times, serif' } },
    { name: 'ABOUT', to: '/AllAbout', style: { fontFamily: '"Times New Roman", Times, serif' } },
    { name: 'BLOGS', to: '/allBlogs', style: { fontFamily: '"Times New Roman", Times, serif' } },
    { name: 'STORY', to: '/allStory', style: { fontFamily: '"Times New Roman", Times, serif' } },
    { name: 'REVIEWS', to: '/allReviews', style: { fontFamily: '"Times New Roman", Times, serif' } },
    { name: 'CONTACT', to: '/contact', style: { fontFamily: '"Times New Roman", Times, serif' } }
  ];
  return (
    <nav className="navbar">
      <div className="ps-10">
        <img className="logo text-orange-400" src={logo} alt="Logo" />
        <img className="w-40" src={omar} alt="Omar" />
      </div>
      <div className={`pr-10 nav-links ${isNavOpen ? 'open' : ''}`} id="nav-links">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className={`nav-link ${activeLink === link.name ? 'active' : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="menu-icon" id="menu-icon" onClick={handleNavToggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-10 w-10 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </div>
    </nav>
  );
}

export default Navbar;
