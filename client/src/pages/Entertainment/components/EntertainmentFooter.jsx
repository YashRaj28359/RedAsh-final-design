import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FooterSocials, { useFooterData } from '../../../components/Footer/FooterSocials';
import { fetchContent, getCachedContent } from '../../../utils/api';

const isLandscapeMobile = "[@media(max-height:600px)_and_(orientation:landscape)]";

const defaultEntertainmentLinks = [
  { key: 'home', name: 'HOME', path: '/entertainment' },
  { key: 'about', name: 'ABOUT', path: '/entertainment/about' },
  { key: 'films', name: 'ENTERTAINMENT FILMS', path: '/entertainment/films' },
  { key: 'blog', name: 'BLOG', path: '/entertainment/blog' },
  { key: 'media', name: 'MEDIA', path: '/entertainment/media' },
  { key: 'contact', name: 'CONTACT', path: '/entertainment/contact' }
];

const EntertainmentFooter = () => {
  const footerData = useFooterData();
  const cached = getCachedContent();
  const [navLinks, setNavLinks] = useState(() => {
    const apiNav = cached?.entertainment?.navigation;
    if (apiNav) {
      return defaultEntertainmentLinks.map(l => ({
        ...l,
        name: apiNav[l.key] || l.name
      }));
    }
    return defaultEntertainmentLinks;
  });

  useEffect(() => {
    fetchContent().then(data => {
      if (data?.entertainment?.navigation) {
        const apiNav = data.entertainment.navigation;
        setNavLinks(defaultEntertainmentLinks.map(l => ({
          ...l,
          name: apiNav[l.key] || l.name
        })));
      }
    }).catch(console.error);
  }, []);

  return (
    <footer className="bg-brand-gray text-white py-12 px-6 md:px-12 w-full mt-auto relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col justify-between h-full min-h-[90px]">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 lg:gap-0 mb-8 lg:mb-12">
          {/* Social Icons */}
          <FooterSocials />

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm md:text-base font-semibold tracking-wider">
            {navLinks.map(link => (
              <Link key={link.key} to={link.path} className="hover:text-brand-black transition-colors">
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

export default EntertainmentFooter;
