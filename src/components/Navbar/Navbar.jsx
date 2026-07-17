import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo/Redash Logo_PNG.png';

const Navbar = () => {
  return (
    <motion.nav 
      className="flex justify-between items-center px-4 md:px-8 py-2 bg-transparent w-full mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <Link to="/">
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
      </div>
      <div className="flex gap-10 items-center">
        <Link to="/" className="font-main font-semibold text-[15px] uppercase tracking-wide text-brand-gray transition-colors duration-300">HOME</Link>
        <Link to="/entertainment" className="font-main font-semibold text-[15px] uppercase tracking-wide text-brand-red transition-colors duration-300">ENTERTAINMENT FILMS</Link>
        <Link to="/agency" className="font-main font-semibold text-[15px] uppercase tracking-wide text-brand-blue transition-colors duration-300">AD AGENCY</Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
