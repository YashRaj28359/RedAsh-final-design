import React from 'react';
import { Link } from 'react-router-dom';
import FooterSocials, { useFooterData } from './FooterSocials';

const isLandscapeMobile = "[@media(max-height:600px)_and_(orientation:landscape)]";

const HomeFooter = () => {
  const footerData = useFooterData();

  return (
    <footer className="bg-brand-gray text-white py-12 px-6 md:px-12 w-full mt-auto relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col justify-between h-full min-h-[90px]">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 lg:gap-0 mb-8 lg:mb-12">
          {/* Social Icons */}
          <FooterSocials />

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm md:text-base font-semibold tracking-wider">
            <Link to="/" className="hover:text-brand-black transition-colors">HOME</Link>
            <Link to="/entertainment" className="hover:text-brand-black transition-colors">ENTERTAINMENT FILMS</Link>
            <Link to="/ad-agency" className="hover:text-brand-black transition-colors">AD AGENCY</Link>
          </nav>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="text-center text-xs md:text-sm text-gray-200 mt-auto">
          {footerData.copyrightText || 'Copyright © 2026 - RedAsh Films (since 2007)'}
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
