import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF } from 'react-icons/fa';
import logo from "../../../assets/Agency/Logo/RedAsh Ad Agency_Logo.png";

const navLinks = [
  { name: 'HOME', path: '/ad-agency' },
  { name: 'ABOUT', path: '/ad-agency/about' },
  { name: 'FILMS', path: '/ad-agency#enterprise-films' },
  { name: 'BLOG', path: '/ad-agency/blog' },
  { name: 'MEDIA', path: '/ad-agency/media' },
  { name: 'CONTACT', path: '/ad-agency/contact' },
];

const Navbar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(() => {
    if (location.pathname.includes('/about')) return 'ABOUT';
    if (location.pathname.includes('/blog')) return 'BLOG';
    if (location.pathname.includes('/media')) return 'MEDIA';
    if (location.pathname.includes('/contact')) return 'CONTACT';
    if (location.hash === '#enterprise-films') return 'FILMS';
    return 'HOME';
  });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('/about')) {
      setActiveMenu('ABOUT');
    } else if (location.pathname.includes('/blog')) {
      setActiveMenu('BLOG');
    } else if (location.hash === '#enterprise-films') {
      setActiveMenu('FILMS');
    } else {
      setActiveMenu('HOME');
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-4 py-2 flex items-center justify-between transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      {/* Logo */}
      <div className="flex-shrink-0 z-20">
        <Link to="/ad-agency" className="block -ml-8 md:-ml-0">
          <img 
            src={logo} 
            alt="RedAsh Agency" 
            className="h-16 md:h-[88px] w-auto object-contain transition-transform hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<span class="text-2xl font-bold font-hero tracking-widest text-brand-red">R<br/>REDASH</span>';
            }}
          />
        </Link>
      </div>

      {/* Center Links */}
      <div className="hidden lg:flex items-center gap-8 xl:gap-10 absolute left-1/2 -translate-x-1/2 z-10">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setActiveMenu(link.name)}
            className={`relative font-main font-bold text-[12px] xl:text-[13px] tracking-[0.15em] transition-colors duration-300 ${
              activeMenu === link.name ? 'text-brand-blue' : 'text-black hover:text-brand-blue'
            }`}
          >
            {link.name}
            {activeMenu === link.name && (
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-blue rounded-full" />
            )}
          </Link>
        ))}
      </div>

      {/* Right Side (Socials) */}
      <div className="flex-shrink-0 z-20 flex items-center gap-6 xl:gap-8">
        <div className="hidden md:flex items-center gap-4 text-black text-sm">
          <a href="https://www.linkedin.com/company/redashfilms/" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors"><FaLinkedinIn /></a>
          <a href="https://www.youtube.com/@RedAshFilms" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors"><FaYoutube /></a>
          <a href="https://www.instagram.com/redashfilms/" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors"><FaInstagram /></a>
          <a href="https://www.facebook.com/redashfilms" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors"><FaFacebookF /></a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
