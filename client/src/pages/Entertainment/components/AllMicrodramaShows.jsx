import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { microdramaShows } from '../../../data/microdramaShows';

const VerticalCard = ({ project, cardRef }) => {
  return (
    <div ref={cardRef} className="relative w-full aspect-[2/3] rounded-md overflow-hidden group cursor-pointer bg-black shadow-lg border border-gray-800 hover:shadow-2xl transition-all duration-300">
      {/* Background Image Placeholder */}
      {project.image ? (
        <img src={project.image} alt={project.title} className={`absolute inset-0 w-full h-full object-cover ${project.objectPos || 'object-center'} ${project.scaleClass || 'scale-100'} ${project.hoverScaleClass || 'group-hover:scale-105'} transition-transform duration-500`} />
      ) : (
        <div className="w-full aspect-[3/4] bg-gray-800 flex items-center justify-center group-hover:scale-105 transition-all duration-500">
           <span className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest font-bold text-center px-2">Poster Placeholder</span>
        </div>
      )}
      
      
      {/* Titles removed per user request */}

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
    <section ref={containerRef} className="w-full pt-2 pb-16 lg:pb-24 bg-white relative flex flex-col items-center">
      
      {/* Section Header removed per user request */}

      {/* Grid of 26 Cards */}
      <div className="w-full px-8 max-w-[1920px]">
        {/* 6 columns layout as requested */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 lg:gap-4 w-full">
          {microdramaShows.map((project, idx) => (
            <div 
              key={project.id} 
              className={idx === 24 ? "col-start-1 md:col-start-2 lg:col-start-3" : ""}
            >
              <VerticalCard project={project} cardRef={(el) => (cardsRef.current[idx] = el)} />
            </div>
          ))}
        </div>

        {/* Watch Entertainment Films Button */}
        <div className="w-full flex justify-center mt-12 md:mt-16">
          <Link to="/entertainment/films" className="inline-block">
            <button className="bg-[#E20002] hover:bg-[#cc0000] transition-colors text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-md text-sm md:text-lg uppercase flex items-center shadow-md tracking-wider">
              WATCH ENTERTAINMENT FILMS
            </button>
          </Link>
        </div>
      </div>
      
    </section>
  );
};

export default AllMicrodramaShows;
