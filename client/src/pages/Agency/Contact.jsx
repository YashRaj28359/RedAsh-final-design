import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import AgencyFooter from './components/AgencyFooter';
import ContactForm from '../../components/ContactForm/ContactForm';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { fetchContent, getCachedContent } from '../../utils/api';
import Lenis from 'lenis';

const Contact = () => {
  const cached = getCachedContent();
  const initialContact = cached?.global?.contact || {
    addressTitle: 'RedAsh, 1302-1305, Peninsula Park',
    addressDesc: 'Fun Republic Lane, Near Yash Raj Studios, Andheri West, Mumbai 400053',
    mapLinkUrl: 'https://share.google/Pxp4Tva4m3IyfrKAd',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.754702008323!2d72.83299317593922!3d19.118432350639912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9d90e067ba9%3A0x16268e5d6bbc70d9!2sPeninsula%20Park!5e0!3m2!1sen!2sin!4v1716388437021!5m2!1sen!2sin',
    email1: 'info@redashfilms.com',
    email1Subtitle: 'For Potential Clients - email or fill the form below',
    email2: 'redash.films@gmail.com',
    email2Subtitle: 'For Actors, Film Crew Members & Vendors - only email'
  };
  const [contactData, setContactData] = useState(initialContact);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchContent().then(data => {
      if (data?.global?.contact) {
        setContactData(prev => ({ ...prev, ...data.global.contact }));
      }
    }).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-main selection:bg-brand-blue selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 relative z-10">
        
        {/* Background Glow */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-brand-blue/10 blur-[150px] -z-10 rounded-full scale-150 opacity-50 pointer-events-none"></div>

        <div className="w-full px-4 md:px-8 lg:px-12">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-hero font-black uppercase tracking-wide mb-8"
            >
              <span className="text-brand-black">CONTACT</span> <span className="text-brand-blue">US</span>
            </motion.h1>
          </div>

          <div className="flex flex-col space-y-16">
            
            {/* Contact Information Cards (3 in a row) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            >
              {/* Office Details */}
              <a 
                href={contactData.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-8 h-full flex flex-col items-center justify-center text-center shadow-sm border border-gray-50 hover:shadow-md transition-shadow group cursor-pointer"
              >
                <FaMapMarkerAlt className="text-brand-blue text-4xl mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-[#0a2540] font-semibold text-lg mb-3 group-hover:text-brand-blue transition-colors">
                  {contactData.addressTitle}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                  {contactData.addressDesc}
                </p>
              </a>

              {/* Contact Groups - Clients */}
              <div className="bg-white p-8 h-full flex flex-col items-center justify-center text-center shadow-sm border border-gray-50">
                <FaEnvelope className="text-brand-blue text-4xl mb-4" />
                <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactData.email1}`} target="_blank" rel="noopener noreferrer" className="text-[#0a2540] font-semibold text-lg mb-3 hover:text-brand-blue transition-colors break-all">
                  {contactData.email1}
                </a>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                  {contactData.email1Subtitle}
                </p>
              </div>

              {/* Contact Groups - Actors */}
              <div className="bg-white p-8 h-full flex flex-col items-center justify-center text-center shadow-sm border border-gray-50">
                <FaEnvelope className="text-brand-blue text-4xl mb-4" />
                <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactData.email2}`} target="_blank" rel="noopener noreferrer" className="text-[#0a2540] font-semibold text-lg mb-3 hover:text-brand-blue transition-colors break-all">
                  {contactData.email2}
                </a>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                  {contactData.email2Subtitle}
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Contact Form Section */}
        <div className="w-full bg-white mt-10 relative z-10 overflow-hidden">
          <ContactForm 
            dataSource="agency"
            titlePrefix="READY TO START"
            titleHighlight="A PROJECT?"
            input4Placeholder="Project Details"
            clientText="Tell us about your project"
            headingClass="font-hero font-black text-brand-black tracking-widest text-4xl md:text-6xl"
            highlightColorClass="text-brand-blue"
            buttonTheme="blue"
          />
        </div>
      </main>

      <AgencyFooter />
    </div>
  );
};

export default Contact;
