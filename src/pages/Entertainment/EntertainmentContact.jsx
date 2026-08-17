import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import EntertainmentNavbar from './components/EntertainmentNavbar';
import EntertainmentFooter from './components/EntertainmentFooter';
import ContactForm from '../../components/ContactForm/ContactForm';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import contactData from '../../data/contact.json';
import Lenis from 'lenis';

const EntertainmentContact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-main selection:bg-brand-red selection:text-white overflow-x-hidden">
      <EntertainmentNavbar />

      <main className="flex-grow pt-32 pb-0 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-16 md:mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-hero font-black uppercase tracking-[8px] md:tracking-[12px] text-neutral-950 mb-6 leading-none"
          >
            GET IN <span className="text-brand-red block md:inline">TOUCH</span>
          </motion.h1>
        </div>

        {/* Contact Info Bento Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Main Office Card - Spans 7 cols */}
            <motion.a 
              href={contactData.office.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 bg-white p-8 md:p-12 flex flex-col justify-between group border border-neutral-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer relative"
            >
              <div className="relative z-10 mb-16">
                <FaMapMarkerAlt className="text-brand-red text-4xl mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h4 className="text-xl md:text-2xl font-bold mb-2 text-neutral-900 group-hover:text-brand-red transition-colors duration-300">{contactData.office.title}</h4>
                <p className="text-neutral-500 text-lg md:text-xl leading-relaxed max-w-md">
                  {contactData.office.description}
                </p>
              </div>

              <div className="relative z-10 inline-flex items-center text-sm font-bold tracking-widest uppercase text-brand-red group-hover:text-red-700 transition-colors duration-300">
                Get Directions
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.a>

            {/* Emails Column - Spans 5 cols */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
              {contactData.emails.map((emailData, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                  className="flex-1 bg-white p-8 md:p-10 border border-neutral-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-center group relative"
                >
                  <FaEnvelope className="text-neutral-300 text-3xl mb-4 group-hover:text-brand-red transition-colors duration-500" />
                  <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${emailData.email}`} target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-bold text-neutral-900 mb-2 hover:text-brand-red transition-colors duration-300 break-all">
                    {emailData.email}
                  </a>
                  <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
                    {emailData.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        {/* Contact Form Section */}
        <div className="w-full bg-white py-20 relative z-10 overflow-hidden border-t border-neutral-200">
          <ContactForm 
            titlePrefix="INVEST IN OR SPONSOR OUR"
            titleHighlight="PROJECTS"
            input4Placeholder="Investment Queries"
            clientText="Potential investors/sponsors"
            headingClass="font-subtitle text-[#6A6A6A] tracking-[2px] md:tracking-[4px]"
            highlightColorClass="text-brand-red"
            buttonTheme="red"
            customFooterText="Potential Clients, Investors, and Sponsors can email or fill the form below"
          />
        </div>

        {/* Google Map Edge-to-Edge */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full h-[50vh] min-h-[400px] bg-neutral-200 relative z-0"
        >
          <iframe 
            src={contactData.mapEmbedUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="RedAsh Films Location"
            className="filter grayscale hover:grayscale-0 transition-all duration-1000"
          ></iframe>
        </motion.div>

      </main>

      <EntertainmentFooter />
    </div>
  );
};

export default EntertainmentContact;
