import React from 'react';

import p1 from '../../../assets/Films/Poster/1. Copy of Movie Poster_20x10.webp';
import p2 from '../../../assets/Films/Poster/2. Copy of Horizontal Poster_Main Tumhare Bachche.webp';
import p3 from '../../../assets/Films/Poster/3. Copy of Final Poster_No More MeToo.webp';
import p4 from '../../../assets/Films/Poster/4. Copy of IAYV_Horizontal Poster.webp';
import p5 from '../../../assets/Films/Poster/5. Corona is a Conspiracy.webp';
import p6 from '../../../assets/Films/Poster/6. Hum Azaad Hain.webp';

const projects = [
  {
    id: "01",
    title: "WITH LOVE, DELHI!",
    image: p1,
    url: 'https://www.imdb.com/title/tt7460834/'
  },
  {
    id: "02",
    title: "MAIN TUMHARE\nBACHCHE...",
    image: p2,
    url: 'https://www.amazon.com/Main-Tumhare-Bachche-Baanne-Waali/dp/B07Y2BG8Z2/ref=sr_1_1?keywords=Main+Tumhare+Bachche+Ki+Maa+Baanne+Waali+Hoon&qid=1569482686&s=instant-video&sr=1-1'
  },
  {
    id: "03",
    title: "NO MORE\n#METOO",
    image: p3,
    url: 'https://www.imdb.com/title/tt9384614/'
  },
  {
    id: "04",
    title: "CASTING\nOUCH",
    image: p4,
    url: null
  },
  {
    id: "05",
    title: "CORONA IS A\nCONSPIRACY",
    image: p5,
    url: null
  },
  {
    id: "06",
    title: "HUM AZAAD\nHAIN",
    image: p6,
    url: 'https://www.imdb.com/title/tt13124440/'
  }
];

const HorizontalCard = ({ project }) => {
  return (
    <div className="relative w-full aspect-video rounded-md overflow-hidden group cursor-pointer bg-black">
      {/* Background Image */}
      <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500" />
      
      {/* Number top left */}
      <div className="absolute top-3 left-4 text-white font-bold text-xs sm:text-sm drop-shadow-md">
        {project.id}
      </div>

      {/* Title removed per user request */}
      {/* Link Overlay */}
      {project.url && (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20">
          <span className="sr-only">View {project.title}</span>
        </a>
      )}
    </div>
  );
};

const SelectedEntertainmentProjects = () => {
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

      {/* 2 Rows of 3 Cards */}
      <div className="w-full px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 w-full">
          {projects.map((project) => (
            <HorizontalCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default SelectedEntertainmentProjects;
