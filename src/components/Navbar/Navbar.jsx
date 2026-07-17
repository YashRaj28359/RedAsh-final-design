import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo/Redash Logo_PNG.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav 
      className="flex justify-between items-center px-4 md:px-8 py-2 bg-transparent w-full mx-auto relative z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/" onClick={closeMenu}>
          <div>
            <img 
              src={logo} 
              alt="RedAsh Films" 
              className="h-14 w-auto object-contain" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerText = 'REDASH LOGO (Place in public/logo.png)';
              }}
            />
          </div>
        </Link>

        {/* Hamburger Icon */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 relative"
          onClick={toggleMenu}
        >
          <motion.span 
            className="w-6 h-0.5 bg-brand-gray block rounded-sm"
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="w-6 h-0.5 bg-brand-gray block rounded-sm"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="w-6 h-0.5 bg-brand-gray block rounded-sm"
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-10 items-center">
        <Link to="/" className="font-main font-semibold text-[15px] uppercase tracking-wide text-brand-gray transition-colors duration-300">HOME</Link>
        <Link to="/entertainment" className="font-main font-semibold text-[15px] uppercase tracking-wide text-brand-red transition-colors duration-300">ENTERTAINMENT FILMS</Link>
        <Link to="/agency" className="font-main font-semibold text-[15px] uppercase tracking-wide text-brand-blue transition-colors duration-300">AD AGENCY</Link>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute top-full left-0 w-full bg-white flex flex-col items-center py-8 gap-6 shadow-xl md:hidden overflow-hidden origin-top"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" onClick={closeMenu} className="font-main font-semibold text-lg uppercase tracking-wide text-brand-gray transition-colors duration-300">HOME</Link>
            <Link to="/entertainment" onClick={closeMenu} className="font-main font-semibold text-lg uppercase tracking-wide text-brand-red transition-colors duration-300">ENTERTAINMENT FILMS</Link>
            <Link to="/agency" onClick={closeMenu} className="font-main font-semibold text-lg uppercase tracking-wide text-brand-blue transition-colors duration-300">AD AGENCY</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
