import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoCollage from './components/VideoCollage';
import TrustedBy from './components/TrustedBy';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';

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
        
        <TrustedBy />
        <CaseStudies />
        <Testimonials />

      </main>
    </div>
  );
};

export default AgencyLanding;
