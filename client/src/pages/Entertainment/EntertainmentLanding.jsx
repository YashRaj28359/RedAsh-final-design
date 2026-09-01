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
    {(text || '').split('').map((char, index) => (
      <span key={index} className="inline-block hero-char" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
        {char}
      </span>
    ))}
  </span>
);

import { fetchContent } from '../../utils/api';

const EntertainmentLanding = () => {
  const containerRef = useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [heroData, setHeroData] = useState({
    line1: 'SUBSTANCE', line2: 'MEETS', line3: 'MASS ', 
    line4_p1: 'APPEAL ', line4_p2: 'AT', 
    line5_p1: 'RED', line5_p2: 'ASH ', line5_p3: 'FILMS',
    btnText: 'Watch More Entertainment Films'
  });

  useEffect(() => {
    fetchContent().then(data => {
      if (data?.entertainment?.hero) {
        setHeroData(prev => {
          const apiData = data.entertainment.hero;
          return {
            line1: apiData.line1 || prev.line1,
            line2: apiData.line2 || prev.line2,
            line3: apiData.line3 || prev.line3,
            line4_p1: apiData.line4_p1 || prev.line4_p1,
            line4_p2: apiData.line4_p2 || prev.line4_p2,
            line5_p1: apiData.line5_p1 || prev.line5_p1,
            line5_p2: apiData.line5_p2 || prev.line5_p2,
            line5_p3: apiData.line5_p3 || prev.line5_p3,
            btnText: apiData.btnText || prev.btnText
          };
        });
      }
    }).catch(err => console.error("Error fetching entertainment hero data:", err));
  }, []);

  useGSAP(() => {
    // Fade in page smoothly
    gsap.to(containerRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    });

    // Reveal text elements
    gsap.fromTo('.hero-char',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.02,
        ease: 'power4.out',
        delay: 0.5
      }
    );

    gsap.fromTo('.hero-subtext',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
    );

    gsap.fromTo('.hero-btn',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.5 }
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
      className="relative min-h-screen w-full bg-white text-black font-main overflow-x-hidden font-smoothing-antialiased flex flex-col opacity-0"
    >

      <EntertainmentNavbar />
      
      <main className="relative z-10 w-full flex-grow flex flex-col lg:flex-row pt-[80px] lg:pt-[100px] landscape:pb-16 lg:landscape:pb-0">
        
        {/* Left Column: Typography & Info */}
        <div className={`w-full landscape:w-[50%] lg:w-[40%] lg:landscape:w-[40%] xl:w-[35%] xl:landscape:w-[35%] flex flex-col justify-start pt-0 landscape:pt-4 lg:pt-40 xl:pt-48 px-6 sm:px-8 lg:pl-10 xl:pl-12 pb-4 lg:py-0 relative z-20 transition-opacity duration-300 ${isVideoOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Main Headline */}
            <h1 className="text-center landscape:text-left md:text-left text-[50px] landscape:text-[40px] sm:text-[65px] sm:landscape:text-[50px] lg:text-[75px] lg:landscape:text-[75px] xl:text-[90px] xl:landscape:text-[90px] font-hero font-bold leading-[0.85] tracking-normal uppercase text-black landscape:-ml-2 sm:landscape:ml-0 md:landscape:-ml-5 lg:landscape:ml-0">
              <span className="block"><SplitText text={heroData.line1} className="text-brand-gray transition-all duration-300 cursor-default hover:text-transparent hover:[-webkit-text-stroke:1px_#6B7280]" /></span>
              <span className="block"><SplitText text={heroData.line2} /></span>
              <span className="block"><SplitText text={heroData.line3} className="text-brand-gray transition-all duration-300 cursor-default hover:text-transparent hover:[-webkit-text-stroke:1px_#6B7280]" /></span>
              <span className="block">
                <SplitText text={heroData.line4_p1} className="text-brand-gray transition-all duration-300 cursor-default hover:text-transparent hover:[-webkit-text-stroke:1px_#6B7280]" />
                <SplitText text={heroData.line4_p2} />
              </span>
              <span className="block mt-1 lg:mt-2">
                <SplitText text={heroData.line5_p1} className="text-brand-red transition-all duration-300 cursor-default hover:text-transparent hover:[-webkit-text-stroke:1px_#E20002]" />
                <SplitText text={heroData.line5_p2} className="text-brand-gray transition-all duration-300 cursor-default hover:text-transparent hover:[-webkit-text-stroke:1px_#6B7280]" />
                <SplitText text={heroData.line5_p3} className="text-brand-red transition-all duration-300 cursor-default hover:text-transparent hover:[-webkit-text-stroke:1px_#E20002]" />
              </span>
            </h1>
            
            {/* Subtext */}
           

            {/* CTA Link (Desktop) */}
            <Link 
              to="/entertainment/films" 
              className="hero-btn mt-10 relative group bg-transparent text-brand-red font-main text-xs md:text-sm uppercase tracking-[0.2em] font-bold py-4 px-10 rounded-full transition-all duration-500 overflow-hidden border border-brand-red/40 hover:border-brand-red shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-xl hover:shadow-brand-red/20 w-max hidden lg:inline-block"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white">{heroData.btnText}</span>
              <div className="absolute inset-0 bg-brand-red w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
            </Link>
          </div>
          
          {/* CTA Link (Mobile - Above Collage) */}
          <div className="w-full flex justify-center pb-2 landscape:hidden lg:hidden mt-8">
            <Link 
              to="/entertainment/films" 
              className="hero-btn relative group bg-transparent text-brand-red font-main text-xs uppercase tracking-[0.2em] font-bold py-4 px-8 sm:px-10 rounded-full transition-all duration-500 overflow-hidden border border-brand-red/40 hover:border-brand-red shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-xl hover:shadow-brand-red/20 w-max inline-block text-center"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white">{heroData.btnText}</span>
              <div className="absolute inset-0 bg-brand-red w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
            </Link>
          </div>
          
        </div>

        {/* Right Column: Film Collage */}
        <div className="w-full lg:w-[60%] xl:w-[65%] relative landscape:absolute lg:landscape:relative landscape:top-0 landscape:right-0 landscape:w-[50%] lg:landscape:w-[60%] flex items-start lg:items-center lg:justify-end xl:justify-end justify-center h-[320px] sm:h-[400px] md:h-[650px] lg:h-auto lg:min-h-[800px] z-10 -mt-2 lg:-mt-12 xl:-mt-16 pointer-events-none lg:pointer-events-auto lg:translate-x-4 xl:translate-x-12 lg:pr-8 xl:pr-12">
          <div className="pointer-events-auto w-full h-full flex justify-center lg:justify-end items-center">
            <FilmCollage onVideoToggle={setIsVideoOpen} />
          </div>
        </div>

      </main>

      {/* Contact Form Section */}
      <ContactForm 
        dataSource="entertainment"
        titlePrefix="INVEST IN OR SPONSOR OUR"
        titleHighlight="PROJECTS"
        input4Placeholder="Investment Queries"
        clientText="Potential investors/sponsors"
        buttonTheme="red"
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
        dataSource="entertainment"
        titlePrefix="INVEST IN OR SPONSOR OUR"
        titleHighlight="PROJECTS"
        input4Placeholder="Investment Queries"
        clientText="Potential investors/sponsors"
        headingClass="font-subtitle text-[#6A6A6A] tracking-[2px] md:tracking-[4px]"
        highlightColorClass="text-brand-red"
        buttonTheme="red"
      />

      {/* Footer Section */}
      <EntertainmentFooter />
    </div>
  );
};

export default EntertainmentLanding;
