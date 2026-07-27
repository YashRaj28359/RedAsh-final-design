import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContactForm from '../../components/ContactForm/ContactForm';
import VideoCollage from './components/VideoCollage';
import TopGlobalClients from './components/TopGlobalClients';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import WhatsRedHot from './components/WhatsRedHot';
import OurWork from './components/OurWork';
import EnterpriseFilms from './components/EnterpriseFilms';
import Footer from '../../components/Footer/Footer';

const AgencyLanding = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Fade in page smoothly
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full bg-white text-black font-main overflow-hidden font-smoothing-antialiased"
    >
      {/* Subtle Grid Background Effect */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      />

      <Navbar />
      
      <main className="relative z-10 w-full flex flex-col">
        
        {/* Central container holding the Hero and the Absolute Collage */}
        <div className="relative w-full max-w-[1600px] mx-auto min-h-screen flex items-center justify-center pt-20 pb-10">
          <Hero />
          <VideoCollage />
        </div>
        
        <ContactForm 
          linkColorClass="text-brand-blue hover:text-blue-700" 
          highlightColorClass="text-brand-blue"
          headingClass="font-hero tracking-wider text-brand-gray"
        />
        
        <TopGlobalClients />
        <CaseStudies />
        <Testimonials />
        <WhatsRedHot />
        <OurWork />
        <EnterpriseFilms />
        
        {/* Bottom Quotation / Contact Form */}
        <div id="quotation-section">
          <ContactForm 
            linkColorClass="text-brand-blue hover:text-blue-700" 
            highlightColorClass="text-brand-blue"
            headingClass="font-hero tracking-wider text-brand-gray"
          />
        </div>

      </main>

      {/* Footer customized with Agency navigation links */}
      <Footer 
        links={[
          { name: 'HOME', path: '/ad-agency', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
          { name: 'ABOUT', path: '/ad-agency' },
          { name: 'FILMS', path: '/ad-agency' },
          { name: 'BLOG', path: '/ad-agency' },
          { name: 'MEDIA', path: '/ad-agency' },
          { name: 'CONTACT', path: '/ad-agency' },
        ]}
      />
    </div>
  );
};

export default AgencyLanding;
