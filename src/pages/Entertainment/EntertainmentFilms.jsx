import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import EntertainmentNavbar from './components/EntertainmentNavbar';
import EntertainmentFilmsList from './components/EntertainmentFilmsList';
import ContactForm from '../../components/ContactForm/ContactForm';
import EntertainmentFooter from './components/EntertainmentFooter';

const EntertainmentFilms = () => {
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
      <EntertainmentNavbar />
      
      <main className="relative z-10 w-full flex flex-col pt-24">
        
        <EntertainmentFilmsList />
        
        {/* Bottom Quotation / Contact Form */}
        <div id="quotation-section" className="bg-gray-50 mt-16">
          <ContactForm 
            titlePrefix="INVEST IN OUR"
            titleHighlight="PROJECTS"
            input4Placeholder="Investment Queries"
            clientText="Potential Investors"
            headingClass="font-subtitle text-[#6A6A6A] tracking-[2px] md:tracking-[4px]"
            highlightColorClass="text-brand-red"
            linkColorClass="text-brand-red hover:text-red-700"
          />
        </div>

      </main>

      <EntertainmentFooter />
    </div>
  );
};

export default EntertainmentFilms;
