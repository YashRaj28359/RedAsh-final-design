import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF, FaBars, FaTimes } from 'react-icons/fa';
import logo from "../../../assets/Agency/Logo/RedAsh Ad Agency_Logo.png";
import { AnimatePresence, motion } from 'framer-motion';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInVideoSection, setIsInVideoSection] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('/about')) {
      setActiveMenu('ABOUT');
    } else if (location.pathname.includes('/blog')) {
      setActiveMenu('BLOG');
    } else if (location.pathname.includes('/media')) {
      setActiveMenu('MEDIA');
    } else if (location.pathname.includes('/contact')) {
      setActiveMenu('CONTACT');
    } else if (location.hash === '#enterprise-films') {
      setActiveMenu('FILMS');
    } else {
      setActiveMenu('HOME');
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const videoSection = document.getElementById('enterprise-films');
      const quotationSection = document.getElementById('quotation-section');
      
      let inVideo = false;
      if (videoSection) {
        const rect = videoSection.getBoundingClientRect();
        // Check if the video section is currently occupying the top part of the viewport
        if (rect.top <= 100 && rect.bottom >= 50) {
          inVideo = true;
        }
      }
      
      if (quotationSection) {
        const quoteRect = quotationSection.getBoundingClientRect();
        // If the quotation section scrolls into the top half of the viewport, revert navbar size
        if (quoteRect.top <= window.innerHeight / 2) {
          inVideo = false;
        }
      }
      
      setIsInVideoSection(inVideo);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 px-4 py-2 flex items-center justify-between transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        {/* Logo */}
        <div className="flex-shrink-0 z-20">
          <Link to="/ad-agency" className="block">
            <img 
              src={logo} 
              alt="RedAsh Agency" 
              className={`w-auto object-contain transition-all duration-300 hover:scale-105 ${
                isInVideoSection ? 'h-8 sm:h-10 md:h-12' : 'h-12 sm:h-16 md:h-[88px]'
              }`}
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

        {/* Right Side (Socials & Hamburger) */}
      <div className="flex-shrink-0 z-20 flex items-center gap-4 xl:gap-8">
        <div className="hidden md:flex items-center gap-4 text-black text-sm">
          <a href="https://www.linkedin.com/company/redashfilms/" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors"><FaLinkedinIn /></a>
          <a href="https://www.youtube.com/@RedAshFilms" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors"><FaYoutube /></a>
          <a href="https://www.instagram.com/redashfilms/" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors"><FaInstagram /></a>
          <a href="https://www.facebook.com/redashfilms" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors"><FaFacebookF /></a>
        </div>
        
        {/* Hamburger Icon */}
        <button 
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 relative ml-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <motion.span 
            className="w-6 h-0.5 bg-black block rounded-sm"
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="w-6 h-0.5 bg-black block rounded-sm"
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="w-6 h-0.5 bg-black block rounded-sm"
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>
    </nav>

    {/* Mobile Menu */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          className="fixed top-[64px] sm:top-[80px] left-0 w-full bg-white flex flex-col items-center py-8 gap-6 shadow-xl lg:hidden overflow-hidden origin-top z-40"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => {
                setActiveMenu(link.name);
                setIsMobileMenuOpen(false);
              }}
              className={`font-main font-semibold text-lg uppercase tracking-wide transition-colors duration-300 ${
                activeMenu === link.name ? 'text-brand-blue' : 'text-gray-800 hover:text-brand-blue'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-6 mt-4 text-gray-800 text-xl">
            <a href="https://www.linkedin.com/company/redashfilms/" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors"><FaLinkedinIn /></a>
            <a href="https://www.youtube.com/@RedAshFilms" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors"><FaYoutube /></a>
            <a href="https://www.instagram.com/redashfilms/" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors"><FaInstagram /></a>
            <a href="https://www.facebook.com/redashfilms" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors"><FaFacebookF /></a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
  );
};

export default Navbar;
