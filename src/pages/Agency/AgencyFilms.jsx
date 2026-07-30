import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './components/Navbar';
import EnterpriseFilms from './components/EnterpriseFilms';
import ContactForm from '../../components/ContactForm/ContactForm';
import Footer from '../../components/Footer/Footer';

const AgencyFilms = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Fade in page smoothly
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );
  }, { scope: containerRef });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full bg-white text-black font-main overflow-x-hidden font-smoothing-antialiased"
    >
      <Navbar />
      
      <main className="relative z-10 w-full flex flex-col pt-24">
        
        <EnterpriseFilms />
        
        {/* Bottom Quotation / Contact Form */}
        <div id="quotation-section" className="bg-gray-50 mt-16">
          <ContactForm 
            linkColorClass="text-brand-blue hover:text-blue-700" 
            highlightColorClass="text-brand-blue"
            headingClass="font-hero tracking-wider text-brand-gray"
          />
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default AgencyFilms;
