import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FiTv, FiMic, FiBriefcase, FiMonitor, 
  FiBookOpen, FiCpu, FiFilm,  
  FiArrowRight, FiFileText, FiVideo 
} from 'react-icons/fi';
import { FaLightbulb } from 'react-icons/fa';
import VideoPlaylist from './VideoPlaylist';
import { enterpriseVideos } from '../../../data/enterpriseVideos';

const enterpriseCategories = [
  { name: "TV/Digital Ads", icon: <FiTv className="text-3xl text-brand-blue" /> },
  { name: "Podcast", icon: <FiMic className="text-3xl text-brand-blue" /> },
  { name: "Corporate AVs", icon: <FiBriefcase className="text-3xl text-brand-blue" /> },
  { name: "Animated Explainers", icon: <FiMonitor className="text-3xl text-brand-blue" /> },
  { name: "L&D Training Films", icon: <FiBookOpen className="text-3xl text-brand-blue" /> },
  { name: "AI Videos", icon: <FiCpu className="text-3xl text-brand-blue" /> },
  { name: "Short Films", icon: <FiFilm className="text-3xl text-brand-blue" /> },
  { name: "Any Creative Films", icon: <FaLightbulb className="text-3xl text-brand-blue" /> }
];

const EnterpriseFilms = () => {
  const sectionRefs = useRef({});

  const scrollToSection = (category) => {
    const element = sectionRefs.current[category];
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="enterprise-films" className="w-full pt-10 pb-16 bg-white relative z-20 overflow-hidden flex flex-col items-center font-main">
      
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
            <div className="w-16 md:w-32 h-[1px] bg-brand-blue relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
            </div>
            <span className="text-brand-blue font-bold tracking-[0.2em] text-xs md:text-sm uppercase whitespace-nowrap">
              What We Create
            </span>
            <div className="w-16 md:w-32 h-[1px] bg-brand-blue relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-hero font-black tracking-widest mb-4 leading-none">
            <span className="text-gray-800 uppercase">Enterprise</span>{' '}
            <span className="text-[#1672ef] uppercase">Films</span>
          </h2>

          {/* Camera Icon Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-24 md:w-48 h-[1px] bg-gray-300 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm text-brand-blue text-lg md:text-xl">
              <FiVideo />
            </div>
            <div className="w-24 md:w-48 h-[1px] bg-gray-300 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            </div>
          </div>

          {/* Description Text */}
          <div className="max-w-4xl mx-auto px-4">
            <p className="font-subtitle text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed mb-3">
              <strong className="text-brand-blue">RedAsh Films</strong>, an 18-year-old Mumbai-based Ad Agency cum Film Production House, was founded in 2007 by <a href="https://www.linkedin.com/in/ashishlalreal/" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-semibold hover:underline">Ashish Lal</a>, an <strong>IIT Delhi engineer</strong>.
            </p>
            <p className="font-subtitle text-gray-600 text-base md:text-xl lg:text-2xl leading-relaxed mb-6 flex flex-wrap justify-center items-center gap-2">
              We have produced <span className="font-cursive text-brand-blue text-3xl md:text-4xl lg:text-5xl px-2 -rotate-2 transform translate-y-1">thousands</span> of <strong>Enterprise Films</strong> across a wide range of categories.
            </p>
          </div>

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
            className="flex items-center gap-2 bg-white text-brand-blue border-2 border-brand-blue font-bold text-xs md:text-sm py-2 px-6 rounded-full shadow-[0_4px_14px_rgba(22,114,239,0.15)] hover:bg-brand-blue hover:text-white transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <FiFileText className="text-lg" />
            <span>Get your free quotation today</span>
          </button>
        </div>

        {/* Categories Grid (8 Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-3 mb-10 w-full px-2">
          {enterpriseCategories.map((cat, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToSection(cat.name)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              className="flex flex-col items-center bg-white border border-gray-100 rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(22,114,239,0.12)] hover:border-brand-blue/30 transition-all duration-300 group"
            >
              <div className="w-full flex justify-start mb-1">
                <span className="text-brand-blue/40 font-bold text-base leading-none">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
              <div className="w-5 h-0.5 bg-brand-blue mb-2"></div>
              <span className="text-gray-800 font-bold text-[10px] md:text-xs text-center leading-tight min-h-[28px] mb-2">
                {cat.name}
              </span>
              <div className="mt-auto w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center text-gray-300 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                <FiArrowRight size={10} />
              </div>
            </motion.button>
          ))}
        </div>

      </div> {/* Close the constrained max-w wrapper */}

      {/* Dynamic Video Sections (Edge to Edge) */}
      <div className="flex flex-col w-full bg-white relative z-10">
        {enterpriseCategories.map((cat) => {
          const categoryVideos = enterpriseVideos.filter(v => v.category === cat.name);
          if (categoryVideos.length === 0) return null;

          return (
            <motion.div 
              key={cat.name}
              ref={(el) => (sectionRefs.current[cat.name] = el)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full"
            >
              {/* Video Playlist Component */}
              <VideoPlaylist videos={categoryVideos} category={cat.name} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default EnterpriseFilms;
