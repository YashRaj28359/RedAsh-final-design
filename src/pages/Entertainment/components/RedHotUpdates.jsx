import React, { useRef } from 'react';
import { FiArrowUpRight as ArrowUpRight } from 'react-icons/fi';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import p1 from '../../../assets/Films/Poster/1. Copy of Movie Poster_20x10.webp';
import p2 from '../../../assets/Films/Poster/2. Copy of Horizontal Poster_Main Tumhare Bachche.webp';
import p3 from '../../../assets/Films/Poster/3. Copy of Final Poster_No More MeToo.webp';
import p4 from '../../../assets/Films/Poster/4. Copy of IAYV_Horizontal Poster.webp';
import p5 from '../../../assets/Films/Poster/5. Corona is a Conspiracy.webp';
import p6 from '../../../assets/Films/Poster/6. Hum Azaad Hain.webp';
const codpasterImg = 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=800&auto=format&fit=crop';
const aiShowImg = 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop';
const castingOuchImg = 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=800&auto=format&fit=crop';
const dailySoapImg = 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop';

gsap.registerPlugin(ScrollTrigger);

const updates = [
  {
    id: "01",
    title: "THE CODPASTER",
    subtitle: "Produced the world's first fiction web series set in the world of podcasting, featuring a well-known star cast.",
    image: codpasterImg,
    style: { zIndex: 20, width: '340px', height: '480px', transform: 'rotate(-4deg)' },
    foldCorner: 'top-left',
    tape: { top: '-15px', left: '45%', rotation: '-15deg', width: '110px' },
    links: [
      { text: 'Mid-Day', url: 'https://www.mid-day.com/buzzfeed/article/ashish-lal-the-iit-delhi-engineer-turned-actor-teams-up-with-surbhi-jyoti-and-upendra-limaye-9809' },
      { text: 'TOI', url: 'https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/ashish-lal-explores-friendship-and-loss-in-the-codpaster/articleshow/131854264.cms' }
    ]
  },
  {
    id: "02",
    title: "AI SHOW",
    subtitle: "Producing an AI show for a premium entertainment company.",
    image: aiShowImg,
    style: { zIndex: 15, width: '340px', height: '420px', transform: 'rotate(2deg)' },
    foldCorner: 'top-right',
    tape: { top: '-12px', left: '60%', rotation: '18deg', width: '90px' },
    links: [{ text: 'Coming Soon', url: '#' }]
  },
  {
    id: "03",
    title: "DAILY SOAP",
    subtitle: "Developing an approved concept into a daily soap for one of India's leading television channels.",
    image: dailySoapImg,
    style: { zIndex: 25, width: '340px', height: '450px', transform: 'rotate(-2deg)' },
    foldCorner: 'bottom-left',
    tape: { top: '-14px', left: '30%', rotation: '8deg', width: '120px' },
    links: [{ text: 'In Development', url: '#' }]
  },
  {
    id: "04",
    title: "CASTING OUCH",
    subtitle: "Shooting our 8-episode sitcom web series Casting Ouch in September 2026.",
    image: castingOuchImg,
    style: { zIndex: 30, width: '340px', height: '420px', transform: 'rotate(4deg)' },
    foldCorner: 'bottom-right',
    tape: { top: '-12px', left: '70%', rotation: '-22deg', width: '100px' },
    links: [{ text: 'Pre-Production', url: '#' }]
  }
];

// Clean, subtle noise pattern for paper matte feel (not muddy)
const subtleNoise = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const getFoldConfig = (corner) => {
  switch (corner) {
    case 'top-left':
      return {
        wrapperClass: "absolute top-0 left-0 w-[35px] h-[35px] z-40 pointer-events-none",
        wrapperFilter: "drop-shadow(3px 3px 4px rgba(0,0,0,0.25))",
        foldClipPath: "polygon(100% 0, 100% 100%, 0 100%)",
        mainClipPath: "polygon(35px 0%, 100% 0.5%, 99.5% 30%, 100% 70%, 99.2% 99.2%, 60% 100%, 20% 99.5%, 1% 99.2%, 0% 35px)"
      };
    case 'top-right':
      return {
        wrapperClass: "absolute top-0 right-0 w-[35px] h-[35px] z-40 pointer-events-none",
        wrapperFilter: "drop-shadow(-3px 3px 4px rgba(0,0,0,0.25))",
        foldClipPath: "polygon(0 100%, 100% 100%, 0 0)",
        mainClipPath: "polygon(0.5% 0.5%, calc(100% - 35px) 0%, 100% 35px, 99.5% 30%, 100% 70%, 99.2% 99.2%, 60% 100%, 20% 99.5%, 1% 99.2%, 0% 60%, 0.8% 20%)"
      };
    case 'bottom-right':
      return {
        wrapperClass: "absolute bottom-0 right-0 w-[35px] h-[35px] z-40 pointer-events-none",
        wrapperFilter: "drop-shadow(-3px -3px 4px rgba(0,0,0,0.25))",
        foldClipPath: "polygon(0 0, 100% 0, 0 100%)",
        mainClipPath: "polygon(0.5% 0.5%, 99.5% 0.8%, 100% 40%, 99.2% calc(100% - 35px), calc(100% - 35px) 100%, 60% 99.5%, 20% 100%, 1% 99.2%, 0% 60%, 0.8% 20%)"
      };
    case 'bottom-left':
      return {
        wrapperClass: "absolute bottom-0 left-0 w-[35px] h-[35px] z-40 pointer-events-none",
        wrapperFilter: "drop-shadow(3px -3px 4px rgba(0,0,0,0.25))",
        foldClipPath: "polygon(0 0, 100% 0, 100% 100%)",
        mainClipPath: "polygon(0.5% 0.5%, 99.5% 0.8%, 100% 40%, 99.2% 99.2%, 60% 100%, 35px 100%, 0% calc(100% - 35px), 0.8% 20%)"
      };
    default:
      return null;
  }
};

const RedHotUpdates = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Reveal animation for the cards sliding in from the left like a train on parallax scroll
    gsap.fromTo('.update-card', 
      { x: -1500, opacity: 0, filter: 'blur(20px)' }, 
      { 
        x: 0, 
        opacity: 1, 
        filter: 'blur(0px)', 
        stagger: 0.5,
        ease: 'power1.out',
        scrollTrigger: { 
          trigger: containerRef.current, 
          start: 'top 90%',
          end: 'top 20%',
          scrub: 1 // Ties the animation to the scroll position
        } 
      }
    );
  }, { scope: containerRef });

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-transparent relative overflow-hidden flex flex-col items-center">
      {/* Section Header (Graffiti Style) */}
      <div className="mb-16 w-full max-w-[1920px] mx-auto z-50 text-center relative pointer-events-none flex flex-col items-center">
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mt-10 scale-75 sm:scale-100">
          
          {/* RED-HOT */}
          <div className="relative inline-block transform -rotate-2">
            {/* Crown Doodle */}
            <svg className="absolute -top-10 left-4 w-14 h-14 text-black transform -rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10,60 L25,15 L45,45 L65,15 L85,60" />
              <line x1="10" y1="70" x2="85" y2="70" />
            </svg>
            {/* Text with Flame Icon replacing O */}
            <h2 className="relative z-10 text-6xl md:text-8xl font-hero font-bold text-brand-red px-2 pt-4 pb-2 tracking-[0.05em] md:tracking-[0.1em] flex items-center justify-center" style={{ textShadow: '2px 2px 0px rgba(226,0,2,0.2)' }}>
              RED-H
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="w-[0.8em] h-[0.9em] mx-1 inline-block -translate-y-1">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
              T
            </h2>
            {/* Black Scribble Underline */}
            <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-black transform rotate-1 rounded-full opacity-80" />
            <div className="absolute -bottom-2 left-4 w-5/6 h-[2px] bg-black transform -rotate-1 rounded-full opacity-60" />
          </div>

          {/* AT */}
          <div className="relative inline-block transform rotate-3 mt-4 md:mt-0">
             {/* Text */}
             <span className="relative z-10 text-3xl md:text-5xl font-hero font-bold text-black px-2 pt-2 pb-1 tracking-[0.05em] md:tracking-[0.1em]">
               AT
             </span>
             {/* Red Scribble Underline */}
             <div className="absolute bottom-1 left-0 w-full h-[3px] bg-brand-red transform -rotate-2 rounded-full opacity-90" />
          </div>

          {/* REDASH FILMS */}
          <div className="relative inline-block mt-4 md:mt-0 ml-0 md:ml-4">
             <h2 className="relative z-10 text-6xl md:text-8xl font-hero font-bold tracking-[0.05em] md:tracking-[0.1em] flex items-center">
               <span className="text-brand-red" style={{ textShadow: '2px 2px 0px rgba(226,0,2,0.2)' }}>RED</span>
               <span className="text-brand-gray mx-1">ASH</span>
               <span className="text-black ml-4">FILMS</span>
             </h2>
             {/* Long Red Scribble Underline */}
             <div className="absolute -bottom-2 -left-4 w-[110%] h-[4px] bg-brand-red transform -rotate-1 rounded-full opacity-90" />
             <div className="absolute -bottom-3 left-0 w-[90%] h-[2px] bg-brand-red transform rotate-1 rounded-full opacity-70" />
             {/* Black X Doodle */}
             <svg className="absolute -bottom-6 -right-6 w-12 h-12 text-black transform rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
                <line x1="20" y1="20" x2="80" y2="80" />
                <line x1="80" y1="20" x2="20" y2="80" />
             </svg>
          </div>
        </div>

        <p className="mt-12 text-gray-600 font-main text-lg md:text-xl max-w-2xl mx-auto font-medium">
          Catch up on the latest updates, shoots, and productions happening right now at the studio.
        </p>
      </div>

      {/* Wall Container */}
      <div ref={containerRef} className="relative w-full py-16 overflow-hidden lg:overflow-visible flex items-center justify-center">
        
        {/* Row Container */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-16 lg:gap-8 xl:gap-12 w-full max-w-[1920px]">
          
          {updates.map((update, index) => {
            const fold = getFoldConfig(update.foldCorner);
            
            return (
              <div 
                key={update.id}
                className={`update-card update-card-${index} relative shrink-0`}
                style={{
                  zIndex: update.style.zIndex,
                  width: update.style.width,
                  height: update.style.height
                }}
              >
                <div 
                  className="group relative block w-full h-full transition-transform duration-300 hover:z-50 hover:scale-[1.03]"
                  style={{
                    transform: update.style.transform,
                    boxShadow: '0 25px 40px -10px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Red Push Pin */}
                  <div className="absolute z-40 pointer-events-none origin-center"
                       style={{ 
                         top: '-10px',
                         left: '50%',
                         transform: 'translateX(-50%)'
                       }}>
                    {/* Pin drop shadow on the paper */}
                    <div className="absolute top-4 left-1.5 w-1.5 h-3 bg-black/40 blur-[1px] rounded-full transform -rotate-12" />
                    {/* Metal needle */}
                    <div className="absolute top-2 left-[9px] w-[2px] h-[15px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 rounded-b-full shadow-sm" />
                    {/* Red plastic head */}
                    <div className="relative w-5 h-5 bg-[radial-gradient(circle_at_30%_30%,_#ff4d4d,_#b30000)] rounded-full shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4),_0_3px_5px_rgba(0,0,0,0.5)] border border-red-800/20">
                      {/* Highlight reflection */}
                      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/60 rounded-full blur-[0.5px]" />
                    </div>
                  </div>

                  {/* Folded Corner Element */}
                  {fold && (
                    <div className={fold.wrapperClass} style={{ filter: fold.wrapperFilter }}>
                      <div 
                        className="w-full h-full bg-[#fdfdfd]"
                        style={{
                          clipPath: fold.foldClipPath,
                          backgroundImage: subtleNoise,
                          boxShadow: 'inset 2px 2px 5px rgba(255,255,255,0.8), inset -1px -1px 3px rgba(0,0,0,0.1)'
                        }}
                      />
                    </div>
                  )}

                  {/* Main Polaroid Body */}
                  <div 
                    className="absolute inset-0 bg-[#fdfdfd] p-3 md:p-4 flex flex-col pointer-events-auto"
                    style={{ 
                      clipPath: fold ? fold.mainClipPath : 'none',
                      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.02)'
                    }}
                  >
                    {/* Noise texture overlay for paper feel */}
                    <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply" style={{ backgroundImage: subtleNoise }} />
                    
                    {/* Image Area */}
                    <div className="w-full h-[60%] md:h-[65%] relative bg-gray-200 overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]">
                      <img 
                        src={update.image} 
                        alt={update.title} 
                        className="w-full h-full object-cover grayscale-[20%] contrast-110 sepia-[10%] brightness-95"
                      />
                      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none" />
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 w-full flex flex-col pt-4">
                      <h3 className="font-hero text-xl md:text-2xl font-bold text-gray-900 leading-none">
                        {update.title}
                      </h3>
                      <p className="font-main text-xs md:text-sm text-gray-700 mt-2 leading-snug flex-1">
                        {update.subtitle}
                      </p>
                      
                      {/* Links Area */}
                      <div className="flex flex-wrap gap-3 mt-2">
                        {update.links.map((link, i) => (
                          <a 
                            key={i} 
                            href={link.url} 
                            target={link.url !== '#' ? "_blank" : undefined}
                            rel={link.url !== '#' ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-1 text-[10px] md:text-xs font-bold uppercase tracking-wider text-brand-red border-b border-brand-red/30 hover:border-brand-red transition-colors pb-0.5"
                          >
                            {link.text} {link.url !== '#' && <ArrowUpRight className="w-3 h-3" />}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RedHotUpdates;

