import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import AgencyFooter from './components/AgencyFooter';
import ContactForm from '../../components/ContactForm/ContactForm';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
              transition={{ duration: 0.6, delay: 0.1 }}
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
                href="https://www.google.com/maps/place/RedAsh+Films/@19.1366832,72.8329931,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7b752374bccbf:0xe74df382b4d4195e!8m2!3d19.1366832!4d72.835568!16s%2Fg%2F11s0jgskcs?entry=tts&g_ep=EgoyMDI0MDUyMi4wKgBIAVAD"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-8 h-full flex flex-col items-center justify-center text-center shadow-sm border border-gray-50 hover:shadow-md transition-shadow group cursor-pointer"
              >
                <FaMapMarkerAlt className="text-brand-blue text-4xl mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-[#0a2540] font-semibold text-lg mb-3 group-hover:text-brand-blue transition-colors">
                  RedAsh, 1101, Peninsula Park
                </p>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                  Fun Republic Lane, Near Yash Raj Studios, Andheri West, Mumbai 400053
                </p>
              </a>

              {/* Contact Groups - Clients */}
              <div className="bg-white p-8 h-full flex flex-col items-center justify-center text-center shadow-sm border border-gray-50">
                <FaEnvelope className="text-brand-blue text-4xl mb-4" />
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@redashfilms.com" target="_blank" rel="noopener noreferrer" className="text-[#0a2540] font-semibold text-lg mb-3 hover:text-brand-blue transition-colors">
                  info@redashfilms.com
                </a>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                  For Potential Clients - email or fill the form below
                </p>
              </div>

              {/* Contact Groups - Actors */}
              <div className="bg-white p-8 h-full flex flex-col items-center justify-center text-center shadow-sm border border-gray-50">
                <FaEnvelope className="text-brand-blue text-4xl mb-4" />
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=redash.films@gmail.com" target="_blank" rel="noopener noreferrer" className="text-[#0a2540] font-semibold text-lg mb-3 hover:text-brand-blue transition-colors">
                  redash.films@gmail.com
                </a>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                  For Actors, Film Crew Members & Vendors - only email
                </p>
              </div>
            </motion.div>

            {/* Contact Form Section */}
            <div className="w-full relative z-10 overflow-hidden">
              <ContactForm highlightColorClass="text-brand-blue" showFooter={false} />
            </div>

            {/* Google Map Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full h-[450px] shadow-sm border border-gray-100 mt-12 bg-gray-100"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15079.294689408078!2d72.835568!3d19.1366832!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b752374bccbf%3A0xe74df382b4d4195e!2sRedAsh%20Films!5e0!3m2!1sen!2sin!4v1716382000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="RedAsh Films Location"
              ></iframe>
            </motion.div>
          </div>

        </div>
      </main>

      <AgencyFooter />
    </div>
  );
};

export default Contact;
