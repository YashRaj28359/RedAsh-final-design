import React, { useState, useEffect } from 'react';
import { 
  FaLinkedin, 
  FaYoutube, 
  FaInstagram, 
  FaFacebook, 
  FaFacebookF, 
  FaTwitter, 
  FaWhatsapp, 
  FaVimeoV, 
  FaPinterest, 
  FaTiktok, 
  FaGithub, 
  FaGlobe, 
  FaEnvelope 
} from 'react-icons/fa';
import { FaXTwitter, FaThreads } from 'react-icons/fa6';
import { fetchContent, getCachedContent } from '../../utils/api';

const ICON_MAP = {
  // Exact Fa names
  FaLinkedin: FaLinkedin,
  FaLinkedinIn: FaLinkedin,
  FaYoutube: FaYoutube,
  FaInstagram: FaInstagram,
  FaFacebook: FaFacebook,
  FaFacebookF: FaFacebookF,
  FaTwitter: FaTwitter,
  FaXTwitter: FaXTwitter,
  FaThreads: FaThreads,
  FaWhatsapp: FaWhatsapp,
  FaVimeo: FaVimeoV,
  FaVimeoV: FaVimeoV,
  FaPinterest: FaPinterest,
  FaTiktok: FaTiktok,
  FaGithub: FaGithub,
  FaGlobe: FaGlobe,
  FaEnvelope: FaEnvelope,

  // Lowercase keys & platform aliases
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  twitter: FaTwitter,
  x: FaXTwitter,
  xtwitter: FaXTwitter,
  threads: FaThreads,
  whatsapp: FaWhatsapp,
  vimeo: FaVimeoV,
  pinterest: FaPinterest,
  tiktok: FaTiktok,
  github: FaGithub,
  globe: FaGlobe,
  website: FaGlobe,
  email: FaEnvelope,
  mail: FaEnvelope
};

const getIconComponent = (iconName, platformName) => {
  if (iconName && ICON_MAP[iconName]) return ICON_MAP[iconName];
  if (iconName && ICON_MAP[iconName.toLowerCase()]) return ICON_MAP[iconName.toLowerCase()];
  if (platformName && ICON_MAP[platformName.toLowerCase()]) return ICON_MAP[platformName.toLowerCase()];
  return FaGlobe;
};

export const defaultSocialIcons = [
  { platform: 'LinkedIn', icon: 'FaLinkedin', url: 'https://www.linkedin.com/company/redashfilms/', enabled: true },
  { platform: 'YouTube', icon: 'FaYoutube', url: 'https://www.youtube.com/@RedAshFilms', enabled: true },
  { platform: 'Instagram', icon: 'FaInstagram', url: 'https://www.instagram.com/redashfilms/', enabled: true },
  { platform: 'Facebook', icon: 'FaFacebookF', url: 'https://www.facebook.com/redashfilms', enabled: true }
];

export const useFooterData = () => {
  const cached = getCachedContent();
  const [footerData, setFooterData] = useState(() => {
    return cached?.global?.footer || {
      socialIcons: defaultSocialIcons,
      copyrightText: 'Copyright © 2026 - RedAsh Films (since 2007)'
    };
  });

  useEffect(() => {
    fetchContent().then(data => {
      if (data?.global?.footer) {
        setFooterData(data.global.footer);
      }
    }).catch(console.error);
  }, []);

  return footerData;
};

export const NavbarSocials = ({ className = "flex items-center gap-4 text-black text-sm", hoverClass = "hover:text-red-600 transition-colors" }) => {
  const footerData = useFooterData();
  const rawList = footerData.socialIcons && footerData.socialIcons.length > 0 
    ? footerData.socialIcons 
    : defaultSocialIcons;

  const activeIcons = rawList.filter(item => item.enabled !== false);

  return (
    <div className={className}>
      {activeIcons.map((item, index) => {
        const IconComponent = getIconComponent(item.icon, item.platform);
        return (
          <a 
            key={item.id || item.platform || index}
            href={item.url || '#'} 
            target="_blank" 
            rel="noreferrer" 
            aria-label={item.platform || 'Social link'}
            className={hoverClass}
          >
            <IconComponent />
          </a>
        );
      })}
    </div>
  );
};

const FooterSocials = () => {
  const footerData = useFooterData();
  const rawList = footerData.socialIcons && footerData.socialIcons.length > 0 
    ? footerData.socialIcons 
    : defaultSocialIcons;

  const activeIcons = rawList.filter(item => item.enabled !== false);

  return (
    <div className="flex items-center gap-6 text-xl">
      {activeIcons.map((item, index) => {
        const IconComponent = getIconComponent(item.icon, item.platform);
        return (
          <a 
            key={item.id || item.platform || index}
            href={item.url || '#'} 
            target="_blank" 
            rel="noreferrer" 
            aria-label={item.platform || 'Social link'}
            className="hover:text-brand-black transition-colors"
          >
            <IconComponent />
          </a>
        );
      })}
    </div>
  );
};

export default FooterSocials;
