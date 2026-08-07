import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiTv, FiMic, FiBriefcase, FiMonitor, 
  FiBookOpen, FiCpu, FiFilm,  
  FiArrowRight, FiFileText, FiVideo, FiArrowDown
} from 'react-icons/fi';
import { FaLightbulb } from 'react-icons/fa';
import VideoPlaylist from '../../Agency/components/VideoPlaylist';
import HangingCardsCarousel from './HangingCardsCarousel';
import { entertainmentVideos } from '../../../data/entertainmentVideos';

const entertainmentCategories = [
  { name: "MICRODRAMA SHOWS", icon: <FiTv className="w-8 h-8 text-brand-red" /> },
  { name: "FEATURE FILMS", icon: <FiFilm className="w-8 h-8 text-brand-red" /> },
  { name: "SHORT FILMS", icon: <FiVideo className="w-8 h-8 text-brand-red" /> },
  { name: "WEB/TV SERIES", icon: <FiMonitor className="w-8 h-8 text-brand-red" /> },
  { name: "MUSIC VIDEOS", icon: <FiBriefcase className="w-8 h-8 text-brand-red" /> }
];

const EntertainmentFilmsList = () => {
  const sectionRefs = useRef({});

  const scrollToSection = (category) => {
    const element = sectionRefs.current[category];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="entertainment-films" className="w-full pt-10 pb-16 bg-white relative z-20 overflow-hidden flex flex-col items-center font-main">
      
      {/* Import Caveat font for handwriting effect */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');
        .font-cursive { font-family: 'Caveat', cursive; }
      `}</style>

      {/* Decorative Background Elements */}
      <div className="absolute left-[-5%] top-[5%] text-[20vw] font-black text-gray-50 opacity-40 select-none pointer-events-none tracking-tighter leading-none z-0">
        FILMS
      </div>

      <div className="max-w-[1400px] w-full px-4 md:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8 text-center w-full">
          
          {/* Top small title */}
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 md:w-32 h-[1px] bg-brand-red relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-red"></div>
            </div>
            <span className="text-brand-red font-bold tracking-[0.2em] text-xs md:text-sm uppercase whitespace-nowrap">
              What We Create
            </span>
            <div className="w-16 md:w-32 h-[1px] bg-brand-red relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-red"></div>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-hero font-black tracking-widest mb-4 leading-none">
            <span className="text-gray-800 uppercase">watch our</span>{' '}
            <span className="text-brand-red uppercase">Entertainment Films</span>
          </h2>

          {/* Camera Icon Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-24 md:w-48 h-[1px] bg-gray-300 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm text-brand-red text-lg md:text-xl">
              <FiVideo />
            </div>
            <div className="w-24 md:w-48 h-[1px] bg-gray-300 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            </div>
          </div>

          {/* Description Text removed for now */}

          {/* Quotation Button */}
          <button 
            onClick={() => {
              const quotationSection = document.getElementById('quotation-section');
              if (quotationSection) {
                const y = quotationSection.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
              } else {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 bg-white text-brand-red border-2 border-brand-red font-bold text-xs md:text-sm py-2 px-6 rounded-full shadow-[0_4px_14px_rgba(226,0,2,0.15)] hover:bg-brand-red hover:text-white transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <FiFileText className="text-lg" />
            <span>Invest In Our Projects</span>
          </button>
        </div>

        {/* Category Navigation Cards */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16 w-full max-w-6xl mx-auto px-4">
          {entertainmentCategories.map((cat, index) => (
            <motion.button
              key={cat.name}
              onClick={() => scrollToSection(cat.name)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              className="relative bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(230,0,0,0.1)] hover:border-red-100 transition-all duration-300 group flex flex-col items-center justify-between p-6 w-[150px] sm:w-[170px] h-[200px]"
            >
              {/* Top Left Number */}
              <div className="absolute top-4 left-4 text-brand-red/40 font-bold text-xs sm:text-sm">
                {String(index + 1).padStart(2, '0')}
              </div>
              
              {/* Icon Container */}
              <div className="mt-2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>

              {/* Tiny horizontal line */}
              <div className="w-6 h-[2px] bg-brand-red mt-3 mb-2 rounded-full transition-all group-hover:w-10"></div>

              {/* Category Name */}
              <div className="text-[10px] sm:text-xs font-bold text-gray-800 tracking-wider uppercase text-center leading-tight">
                {cat.name}
              </div>

              {/* Bottom Arrow */}
              <div className="mt-auto w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-brand-red group-hover:bg-brand-red group-hover:text-white transition-all">
                <FiArrowDown className="w-3 h-3 group-hover:animate-bounce" />
              </div>
            </motion.button>
          ))}
        </div>

      </div> {/* Close the constrained max-w wrapper */}

      {/* Dynamic Video Sections (Edge to Edge) */}
      <div id="entertainment-video-playlists" className="flex flex-col w-full bg-white relative z-10 gap-0 snap-y snap-mandatory">
        {entertainmentCategories.map((cat) => {
          if (cat.name.toUpperCase() === "MICRODRAMA SHOWS") {
            return (
              <motion.div 
                key={cat.name}
                ref={(el) => (sectionRefs.current[cat.name] = el)}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full snap-start scroll-mt-[100px] md:scroll-mt-[30px] relative z-50"
              >
                <div className="w-full mb-6 px-4 md:px-8 max-w-[1400px] mx-auto mt-10">
                  <div className="flex flex-col items-center justify-center w-full mb-4 text-center">
                    <div className="flex flex-col items-center gap-2 mb-2">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FEF2F2] text-brand-red">
                        <FiTv className="w-6 h-6" />
                      </div>
                      <h2 className="text-3xl md:text-5xl font-hero font-extrabold tracking-widest uppercase text-brand-red text-center">{cat.name}</h2>
                    </div>
                  </div>
                </div>
                <HangingCardsCarousel />
              </motion.div>
            );
          }

          const categoryVideos = entertainmentVideos.filter(v => v.category.toUpperCase() === cat.name.toUpperCase());
          if (categoryVideos.length === 0) return null;

          return (
            <motion.div 
              key={cat.name}
              ref={(el) => (sectionRefs.current[cat.name] = el)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full snap-start scroll-mt-[100px] md:scroll-mt-[30px]"
            >
              {/* Video Playlist Component with Red Theme */}
              <VideoPlaylist videos={categoryVideos} category={cat.name} theme="red" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default EntertainmentFilmsList;
