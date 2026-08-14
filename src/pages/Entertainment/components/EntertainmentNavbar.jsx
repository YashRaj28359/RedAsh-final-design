import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF, FaBars } from 'react-icons/fa';
import logo from "../../../assets/Films/Logo/RedAsh Films Horizontal Logo_wo bg.png";
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { name: 'HOME', path: '/entertainment' },
  { name: 'ABOUT', path: '/entertainment/about' },
  { name: 'ENTERTAINMENT FILMS', path: '/entertainment/films' },
  { name: 'BLOG', path: '/entertainment/blog' },
  { name: 'MEDIA', path: '/entertainment/media' },
  { name: 'CONTACT', path: '/entertainment/contact' },
];

const EntertainmentNavbar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('HOME');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('/about')) setActiveMenu('ABOUT');
    else if (location.pathname.includes('/films')) setActiveMenu('ENTERTAINMENT FILMS');
    else if (location.pathname.includes('/blog')) setActiveMenu('BLOG');
    else if (location.pathname.includes('/media')) setActiveMenu('MEDIA');
    else if (location.pathname.includes('/contact')) setActiveMenu('CONTACT');
    else setActiveMenu('HOME');
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
        <nav className={`w-full px-8 py-4 flex items-center justify-between transition-all duration-500 relative ${isScrolled ? 'bg-[#f4f4f4] shadow-md' : 'bg-transparent'} pointer-events-auto`}>
          {/* Logo */}
          <div className="flex-shrink-0 z-20">
            <Link to="/entertainment" className="block">
              <img 
                src={logo} 
                alt="RedAsh Films" 
                className="h-12 sm:h-16 md:h-[60px] w-auto object-contain transition-all duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span class="text-2xl font-bold font-hero tracking-widest text-red-600">R<br/>REDASH<br/>FILMS</span>';
                }}
              />
            </Link>
          </div>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12 absolute left-1/2 -translate-x-1/2 z-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setActiveMenu(link.name)}
                className={`relative font-main font-bold text-[12px] xl:text-[13px] tracking-[0.15em] transition-colors duration-300 ${
                  activeMenu === link.name ? 'text-red-600' : 'text-black hover:text-red-600'
                }`}
              >
                {link.name}
                {activeMenu === link.name && (
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-600" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side (Social Icons & Hamburger) */}
          <div className="flex-shrink-0 z-20 flex items-center gap-4 xl:gap-8">
            <div className="hidden md:flex items-center gap-4 text-black text-sm">
              <a href="https://www.linkedin.com/company/redashfilms/" target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors"><FaLinkedinIn /></a>
              <a href="https://www.youtube.com/@RedAshFilms" target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors"><FaYoutube /></a>
              <a href="https://www.instagram.com/redashfilms/" target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors"><FaInstagram /></a>
              <a href="https://www.facebook.com/redashfilms" target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors"><FaFacebookF /></a>
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
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed top-[80px] left-0 w-full bg-[#f4f4f4] flex flex-col items-center py-8 shadow-xl lg:hidden overflow-hidden origin-top z-40 pointer-events-auto"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-y-6 w-full px-4 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => {
                    setActiveMenu(link.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`font-main font-bold text-lg uppercase tracking-wider transition-colors duration-300 ${
                    activeMenu === link.name ? 'text-red-600' : 'text-black hover:text-red-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center justify-center gap-6 mt-4 text-gray-800 text-xl">
                <a href="https://www.linkedin.com/company/redashfilms/" target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors"><FaLinkedinIn /></a>
                <a href="https://www.youtube.com/@RedAshFilms" target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors"><FaYoutube /></a>
                <a href="https://www.instagram.com/redashfilms/" target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors"><FaInstagram /></a>
                <a href="https://www.facebook.com/redashfilms" target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors"><FaFacebookF /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EntertainmentNavbar;
