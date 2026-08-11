import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import EntertainmentNavbar from './components/EntertainmentNavbar';
import FilmCollage from './components/FilmCollage';
import ContactForm from '../../components/ContactForm/ContactForm';
import CelebritiesSection from './components/CelebritiesSection';
import TopGlobalClients from './components/TopGlobalClients';
import RedHotUpdates from './components/RedHotUpdates';
import SelectedEntertainmentProjects from './components/SelectedEntertainmentProjects';
import AllMicrodramaShows from './components/AllMicrodramaShows';
import EntertainmentFooter from './components/EntertainmentFooter';

const SplitText = ({ text, className }) => (
  <span className={`inline-block ${className || ''}`}>
    {text.split('').map((char, index) => (
      <span key={index} className="inline-block hero-char" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
        {char}
      </span>
    ))}
  </span>
);

const EntertainmentLanding = () => {
  const containerRef = useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useGSAP(() => {
    // Fade in page smoothly
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );

    // Stagger letters and button from the left
    gsap.fromTo('.hero-char, .hero-btn',
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.03, delay: 0.5, ease: 'power3.out' }
    );
  }, { scope: containerRef });

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06, // Physics-based smooth inertia
      smoothWheel: true,
      wheelMultiplier: 0.7, // Slightly softer wheel steps
      touchMultiplier: 1.5,
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
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full bg-white text-black font-main overflow-x-hidden font-smoothing-antialiased flex flex-col"
    >

      <EntertainmentNavbar />
      
      <main className="relative z-10 w-full flex-grow flex flex-col lg:flex-row pt-[80px] lg:pt-[100px]">
        
        {/* Left Column: Typography & Info */}
        <div className={`w-full lg:w-[40%] xl:w-[35%] flex flex-col justify-start pt-8 lg:pt-12 px-6 sm:px-8 lg:pl-10 xl:pl-12 py-12 lg:py-0 relative z-20 transition-opacity duration-300 ${isVideoOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Main Headline */}
            <h1 className="text-[50px] sm:text-[65px] lg:text-[75px] xl:text-[90px] font-hero font-bold leading-[0.85] tracking-normal uppercase text-black">
              <SplitText text="SUBSTANCE" className="text-brand-gray transition-all duration-300 cursor-default hover:text-transparent hover:[-webkit-text-stroke:1px_#6B7280]" /><br/>
              <SplitText text="MEETS" /><br/>
              <SplitText text="MASS " className="text-brand-gray transition-all duration-300 cursor-default hover:text-transparent hover:[-webkit-text-stroke:1px_#6B7280]" /><br />
              <SplitText text="APPEAL" className="text-brand-gray transition-all duration-300 cursor-default hover:text-transparent hover:[-webkit-text-stroke:1px_#6B7280]" /> <SplitText text=" AT " /><br />
              <span className="block">
                <SplitText text="RED" className="text-brand-red transition-all duration-300 cursor-default hover:text-transparent hover:[-webkit-text-stroke:1px_#E20002]" />
                <SplitText text="ASH " className="text-brand-gray transition-all duration-300 cursor-default hover:text-transparent hover:[-webkit-text-stroke:1px_#6B7280]" />
                <SplitText text="FILMS" className="text-brand-red transition-all duration-300 cursor-default hover:text-transparent hover:[-webkit-text-stroke:1px_#E20002]" />
              </span>
            </h1>
            
            {/* Subtext */}
           

            {/* CTA Link */}
            <Link 
              to="/entertainment/films" 
              className="hero-btn mt-4 relative group bg-transparent text-brand-red font-main text-xs md:text-sm uppercase tracking-[0.2em] font-bold py-4 px-10 rounded-full transition-all duration-500 overflow-hidden border border-brand-red/40 hover:border-brand-red shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-xl hover:shadow-brand-red/20 w-max inline-block"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white">Watch More Entertainment Films</span>
              <div className="absolute inset-0 bg-brand-red w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
            </Link>
          </div>


          
        </div>

        {/* Right Column: Film Collage */}
        <div className="w-full lg:w-[60%] xl:w-[65%] relative flex items-center justify-center min-h-[600px] lg:min-h-[800px] z-10 lg:-ml-12 xl:-ml-20 lg:-mt-12 xl:-mt-16">
          <FilmCollage onVideoToggle={setIsVideoOpen} />
        </div>

      </main>

      {/* Contact Form Section */}
      <ContactForm 
        titlePrefix="INVEST IN OR SPONSOR OUR"
        titleHighlight="PROJECTS"
        input4Placeholder="Investment Queries"
        clientText="Potential investors/sponsors"
      />

      {/* Celebrities Section */}
      <CelebritiesSection />

      {/* Top Global Clients Section */}
      <TopGlobalClients />

      {/* Red-Hot Updates Section */}
      <RedHotUpdates />

      {/* Selected Entertainment Projects Section */}
      <SelectedEntertainmentProjects />

      {/* All Microdrama Shows Section */}
      <AllMicrodramaShows />

      {/* Invest In Or Sponsor Our Projects Form */}
      <ContactForm 
        titlePrefix="INVEST IN OR SPONSOR OUR"
        titleHighlight="PROJECTS"
        input4Placeholder="Investment Queries"
        clientText="Potential investors/sponsors"
        headingClass="font-subtitle text-[#6A6A6A] tracking-[2px] md:tracking-[4px]"
        highlightColorClass="text-brand-red"
      />

      {/* Footer Section */}
      <EntertainmentFooter />
    </div>
  );
};

export default EntertainmentLanding;
