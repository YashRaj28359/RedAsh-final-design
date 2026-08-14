import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import EntertainmentNavbar from './components/EntertainmentNavbar';
import EntertainmentFooter from './components/EntertainmentFooter';
import ProcessTimeline from './components/ProcessTimeline';
import TalentShowcase from './components/TalentShowcase';
import CombinedEntertainmentGrid from './components/CombinedEntertainmentGrid';
import ContactForm from '../../components/ContactForm/ContactForm';

const EntertainmentFilms = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.08, // Slightly faster physics to feel less sluggish
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
    <div className="relative min-h-screen w-full bg-white text-black font-main overflow-x-hidden">
      <EntertainmentNavbar />
      
      <main className="relative z-10 w-full flex flex-col pt-24 md:pt-28 px-6 md:px-12 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[1000px] mx-auto text-center flex flex-col gap-4 md:gap-5"
        >
          {/* Eyebrow Heading */}
          <div className="inline-flex items-center justify-center gap-4">
             <div className="h-[2px] w-8 md:w-12 bg-brand-red hidden sm:block"></div>
             <p className="text-[10px] md:text-xs font-bold text-neutral-500 tracking-[0.15em] uppercase">
               <span className="text-brand-red">Red</span><span className="text-brand-gray">Ash</span> began as an IIT Delhi engineer’s venture in 2007
             </p>
             <div className="h-[2px] w-8 md:w-12 bg-brand-red hidden sm:block"></div>
          </div>

          {/* Main Statement */}
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-neutral-800 leading-tight md:leading-snug tracking-tight">
            Its entertainment division, <Link to="/entertainment" className="hover:opacity-75 transition-opacity duration-300"><strong className="font-bold cursor-pointer"><span className="text-brand-red">Red</span><span className="text-brand-gray">Ash</span> <span className="text-black">Films</span></strong></Link>, creates movies, web series, microdramas, television shows, AI films, music videos, and emerging formats.
          </p>
          
          {/* Sub Statement */}
          <p className="text-sm md:text-base text-neutral-500 font-medium">
            Its enterprise division is <Link to="/ad-agency" className="hover:opacity-75 transition-opacity duration-300"><strong className="font-bold cursor-pointer"><span className="text-brand-red">Red</span><span className="text-brand-gray">Ash</span> <span className="text-brand-blue">Ad Agency</span></strong></Link>.
          </p>
        </motion.div>

        <ProcessTimeline />
      </main>

      <TalentShowcase />
      <CombinedEntertainmentGrid />

      {/* Invest In Or Sponsor Our Projects Form */}
      <ContactForm 
        titlePrefix="INVEST IN OR SPONSOR OUR"
        titleHighlight="PROJECTS"
        input4Placeholder="Investment Queries"
        clientText="Potential investors/sponsors"
        buttonTheme="red"
      />

      <EntertainmentFooter />
    </div>
  );
};

export default EntertainmentFilms;
