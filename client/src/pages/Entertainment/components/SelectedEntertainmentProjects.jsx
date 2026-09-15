import React, { useState, useEffect } from 'react';
import { fetchContent, resolveClientImage } from '../../../utils/api';

// Static fallback images for horizontal project cards
import fp1 from '../../../assets/Films/Poster/1. Copy of Movie Poster_20x10.webp';
import fp2 from '../../../assets/Films/Poster/2. Copy of Horizontal Poster_Main Tumhare Bachche.webp';
import fp3 from '../../../assets/Films/Poster/3. Copy of Final Poster_No More MeToo.webp';
import fp4 from '../../../assets/Films/Poster/4. Copy of IAYV_Horizontal Poster.webp';
import fp5 from '../../../assets/Films/Poster/5. Corona is a Conspiracy.webp';
import fp6 from '../../../assets/Films/Poster/6. Hum Azaad Hain.webp';
import fp7 from '../../../assets/Films/Cards/Card6.png';
import fp8 from '../../../assets/Films/Cards/Card2.jpg';
import fp9 from '../../../assets/Films/Poster/9. 100 Short Films_Emerging Leaders.png';

const FALLBACK_POSTERS = [fp1, fp2, fp3, fp4, fp5, fp6, fp7, fp8, fp9];


const HorizontalCard = ({ project }) => {
  return (
    <div className="relative w-full aspect-video rounded-md overflow-hidden group cursor-pointer bg-black">
      {/* Background Image */}
      {project.image ? (
        <img src={project.image} alt={project.title} className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ${project.scaleImage ? 'scale-[1.35] group-hover:scale-[1.45]' : 'group-hover:scale-105'}`} />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center group-hover:scale-105 transition-all duration-500">
           <span className="text-gray-500 text-xs uppercase tracking-widest font-bold text-center px-2">Placeholder</span>
        </div>
      )}
      
      {/* Link Overlay */}
      {project.url && project.url !== '#' && (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20">
          <span className="sr-only">View {project.title}</span>
        </a>
      )}
    </div>
  );
};

const SelectedEntertainmentProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchContent().then(data => {
      const horizontalCards = data?.entertainment?.projects?.horizontalCards;
      if (horizontalCards && horizontalCards.length > 0) {
        setProjects(horizontalCards.map((item, idx) => {
          const finalUrl = (item.linkHome !== undefined && item.linkHome !== null && item.linkHome !== '') 
            ? item.linkHome 
            : (item.link || item.url);
          return {
            ...item,
            url: finalUrl,
            image: resolveClientImage(item.image, FALLBACK_POSTERS[idx % FALLBACK_POSTERS.length])
          };
        }));
      }
    }).catch(err => console.error("Error fetching horizontal projects:", err));
  }, []);



  if (!projects || projects.length === 0) return null;

  return (
    <section className="w-full pt-16 lg:pt-24 pb-4 lg:pb-8 bg-[#f9f9f9] relative flex flex-col items-center">
      
      {/* Section Header */}
      <div className="text-center mb-10 lg:mb-14 px-4">
        <div className="text-brand-red text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase mb-3">
         
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-hero font-black text-black uppercase tracking-wider flex flex-col md:flex-row items-center justify-center gap-2">
          <span>Selected</span>
          <span className="text-brand-red">Entertainment Projects</span>
        </h2>
        <div className="flex items-center justify-center mt-5">
           <div className="h-[1px] w-12 bg-gray-300"></div>
           <div className="h-[2px] w-8 bg-brand-red mx-3 rounded-full"></div>
           <div className="h-[1px] w-12 bg-gray-300"></div>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="w-full px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 landscape:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 w-full">
          {projects.map((project) => (
            <HorizontalCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default SelectedEntertainmentProjects;
