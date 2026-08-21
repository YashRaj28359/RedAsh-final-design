import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from './components/Navbar';

gsap.registerPlugin(ScrollTrigger);
import Hero from './components/Hero';
import ContactForm from '../../components/ContactForm/ContactForm';
import VideoCollage from './components/VideoCollage';
import TopGlobalClients from './components/TopGlobalClients';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import WhatsRedHot from './components/WhatsRedHot';
import OurWork from './components/OurWork';

import AgencyFooter from './components/AgencyFooter';

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

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

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
        <div className="relative w-full max-w-[1600px] mx-auto min-h-0 md:min-h-screen flex items-start md:items-center justify-center pt-24 pb-8 md:pt-20 md:pb-10">
          <Hero />
          <VideoCollage />
        </div>
        
        <div className="-mt-13 md:mt-0">
          <ContactForm 
            linkColorClass="text-brand-blue hover:text-blue-700" 
            highlightColorClass="text-brand-blue"
            headingClass="font-hero tracking-wider text-brand-gray"
          />
        </div>
        
        <TopGlobalClients />
        <CaseStudies />
        <Testimonials />
        <WhatsRedHot />
        <OurWork />

        
        {/* Bottom Quotation / Contact Form */}
        <div id="quotation-section">
          <ContactForm 
            linkColorClass="text-brand-blue hover:text-blue-700" 
            highlightColorClass="text-brand-blue"
            headingClass="font-hero tracking-wider text-brand-gray"
          />
        </div>

      </main>

      <AgencyFooter />
    </div>
  );
};

export default AgencyLanding;
