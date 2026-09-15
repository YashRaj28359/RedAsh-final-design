import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FooterSocials, { useFooterData } from './FooterSocials';
import { fetchContent, getCachedContent } from '../../utils/api';

const defaultLinks = [
  { key: 'home', name: 'HOME', path: '/ad-agency' },
  { key: 'about', name: 'ABOUT', path: '/ad-agency/about' },
  { key: 'films', name: 'ENTERPRISE FILMS', path: '/ad-agency/films' },
  { key: 'blog', name: 'BLOG', path: '/ad-agency/blog' },
  { key: 'media', name: 'MEDIA', path: '/ad-agency/media' },
  { key: 'contact', name: 'CONTACT', path: '/ad-agency/contact' }
];

const Footer = ({ links }) => {
  const footerData = useFooterData();
  const cached = getCachedContent();
  const [navLinks, setNavLinks] = useState(() => {
    if (links) return links;
    const apiNav = cached?.agency?.navigation;
    if (apiNav) {
      return defaultLinks.map(l => ({
        ...l,
        name: apiNav[l.key] || l.name
      }));
    }
    return defaultLinks;
  });

  useEffect(() => {
    if (!links) {
      fetchContent().then(data => {
        if (data?.agency?.navigation) {
          const apiNav = data.agency.navigation;
          setNavLinks(defaultLinks.map(l => ({
            ...l,
            name: apiNav[l.key] || l.name
          })));
        }
      }).catch(console.error);
    }
  }, [links]);

  const displayLinks = links || navLinks;

  return (
    <footer className="bg-brand-gray text-white py-12 px-6 md:px-12 w-full mt-auto relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col justify-between h-full min-h-[90px]">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 lg:gap-0 mb-8 lg:mb-12">
          {/* Social Icons */}
          <FooterSocials />

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm md:text-base font-semibold tracking-wider">
            {displayLinks.map(link => (
              <Link 
                key={link.name || link.key} 
                to={link.path} 
                onClick={link.onClick} 
                className="hover:text-brand-black transition-colors"
              >
                {link.name}
              </Link>
            ))}
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

export default Footer;
