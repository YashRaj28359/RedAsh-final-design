import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoCollage from './components/VideoCollage';

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
      <Navbar />
      
      <main className="relative z-10 w-full min-h-screen flex items-center justify-center pt-20">
        
        {/* Central container holding the Hero and the Absolute Collage */}
        <div className="relative w-full max-w-[1600px] mx-auto h-[80vh] flex items-center justify-center">
          <Hero />
          <VideoCollage />
        </div>

      </main>
    </div>
  );
};

export default AgencyLanding;
