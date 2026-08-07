import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { microdramaShows } from '../../../data/microdramaShows';

const VerticalCard = ({ project, cardRef }) => {
  return (
    <div ref={cardRef} className="relative w-full aspect-[2/3] rounded-md overflow-hidden group cursor-pointer bg-gray-900 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300">
      {/* Background Image Placeholder */}
      {project.image ? (
        <img src={project.image} alt={project.title} className={`absolute inset-0 w-full h-full object-cover ${project.objectPos || 'object-center'} opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500`} />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gray-800 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
           <span className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest font-bold text-center px-2">Poster Placeholder</span>
        </div>
      )}
      
      {/* Gradient Overlay for Text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

      {/* Bottom Title Only */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-5 sm:right-5">
        <h3 className="text-white font-hero font-bold text-sm sm:text-base md:text-lg xl:text-xl leading-[1.1] tracking-wide uppercase drop-shadow-lg whitespace-pre-line" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}>
          {project.title}
        </h3>
      </div>

      {/* Link Overlay */}
      {project.url && (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20">
          <span className="sr-only">View {project.title}</span>
        </a>
      )}
    </div>
  );
};

const AllMicrodramaShows = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, filter: 'blur(20px)', y: 50 },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-16 lg:py-24 bg-[#f9f9f9] relative flex flex-col items-center">
      
      {/* Section Header */}
      <div className="text-center mb-10 lg:mb-14 px-4">
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-hero font-black text-black uppercase tracking-wider flex flex-col md:flex-row items-center justify-center gap-2">
          <span>All Microdrama</span>
          <span className="text-brand-red">Shows</span>
        </h2>
        <div className="flex items-center justify-center mt-5">
           <div className="h-[1px] w-12 bg-gray-300"></div>
           <div className="h-[2px] w-8 bg-brand-red mx-3 rounded-full"></div>
           <div className="h-[1px] w-12 bg-gray-300"></div>
        </div>
      </div>

      {/* Grid of 26 Cards */}
      <div className="w-full px-1 sm:px-2 lg:px-4 max-w-[1920px]">
        {/* 6 columns layout as requested */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 lg:gap-4 w-full">
          {microdramaShows.map((project, idx) => (
            <VerticalCard key={project.id} project={project} cardRef={(el) => (cardsRef.current[idx] = el)} />
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default AllMicrodramaShows;
