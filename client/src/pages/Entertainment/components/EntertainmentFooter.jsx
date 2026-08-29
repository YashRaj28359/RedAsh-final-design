import React from 'react';
import { FaLinkedin, FaYoutube, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const isLandscapeMobile = "[@media(max-height:600px)_and_(orientation:landscape)]";

const EntertainmentFooter = () => {
  return (
    <footer className="bg-brand-gray text-white py-12 px-6 md:px-12 w-full mt-auto relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col justify-between h-full min-h-[90px]">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 lg:gap-0 mb-8 lg:mb-12">
          {/* Social Icons */}
          <div className="flex items-center gap-6 text-xl">
            <a href="https://www.linkedin.com/company/redashfilms/" target="_blank" rel="noreferrer" className="hover:text-brand-black transition-colors">
              <FaLinkedin />
            </a>
            <a href="https://www.youtube.com/@RedAshFilms" target="_blank" rel="noreferrer" className="hover:text-brand-black transition-colors">
              <FaYoutube />
            </a>
            <a href="https://www.instagram.com/redashfilms/" target="_blank" rel="noreferrer" className="hover:text-brand-black transition-colors">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/redashfilms" target="_blank" rel="noreferrer" className="hover:text-brand-black transition-colors">
              <FaFacebookF />
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm md:text-base font-semibold tracking-wider">
            <Link to="/entertainment" className="hover:text-brand-black transition-colors">HOME</Link>
            <Link to="/entertainment/about" className="hover:text-brand-black transition-colors">ABOUT</Link>
            <Link to="/entertainment/films" className="hover:text-brand-black transition-colors">ENTERTAINMENT FILMS</Link>
            <Link to="/entertainment/blog" className="hover:text-brand-black transition-colors">BLOG</Link>
            <Link to="/entertainment/media" className="hover:text-brand-black transition-colors">MEDIA</Link>
            <Link to="/entertainment/contact" className="hover:text-brand-black transition-colors">CONTACT</Link>
          </nav>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="text-center text-xs md:text-sm text-gray-200 mt-auto">
          Copyright © 2026 - RedAsh Films (since 2007)
        </div>
      </div>
    </footer>
  );
};

export default EntertainmentFooter;
