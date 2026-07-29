import React from 'react';
import { motion } from 'framer-motion';
import { LuNewspaper } from "react-icons/lu";
import mediaData from '../../data/media.json';

const MediaLinks = () => {
  const articles = mediaData.slice(0, 3);
  // Helper to dynamically calculate CSS Object Position and Scale from user controls
  const getImageStyles = (article) => {
    const x = 50 + (article.moveLeft || 0) - (article.moveRight || 0);
    const y = 50 + (article.moveUp || 0) - (article.moveDown || 0);
    const baseScale = 1 + ((article.zoom || 0) / 100);
    const hoverScale = baseScale + 0.05; // 5% extra zoom on hover
    
    return {
      objectPosition: `${x}% ${y}%`,
      '--base-scale': baseScale,
      '--hover-scale': hoverScale
    };
  };

  return (
    <section className="w-full px-4 md:px-8 pt-4 md:pt-20 pb-16 bg-white">
      <style>
        {`
          @media (max-width: 1023px) and (orientation: landscape) {
            .mobile-landscape-center-dna {
              object-position: 50% 50% !important;
            }
          }
        `}
      </style>
      <div className="w-full md:w-[99%] xl:w-[97%] mx-auto flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16 flex flex-col items-center w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Top Line: EST - Icon - 2007 */}
          <div className="flex items-center w-full mb-1 md:mb-2">
            <div className="flex-1 h-[6px] border-t border-b border-[#000]"></div>
            <div className="flex items-center px-4 md:px-8 gap-3 md:gap-6">
              <span className="text-[#000] font-libre font-bold text-base md:text-xl tracking-[4px] md:tracking-[6px]">EST.</span>
              <LuNewspaper className="w-9 h-9 text-[#000]" strokeWidth={1.5} />
              <span className="text-[#000] font-libre font-bold text-base md:text-xl tracking-[4px] md:tracking-[6px]">2007</span>
            </div>
            <div className="flex-1 h-[6px] border-t border-b border-[#000]"></div>
          </div>

          {/* Main Heading */}
          <h2 className="text-6xl md:text-8xl lg:text-[100px] font-hero text-black uppercase tracking-[6px] md:tracking-[16px] leading-none mb-1 md:mb-2 ml-1 md:ml-4">
            MEDIA COVERAGE
          </h2>

          {/* Bottom Line: AS FEATURED IN LEADING PUBLICATIONS */}
          <div className="flex items-center w-full mb-4 md:mb-6">
            <div className="flex-1 border-t border-[#000]"></div>
            <span className="text-[#000] font-libre font-bold text-xs md:text-base tracking-[3px] md:tracking-[6px] uppercase px-3 md:px-6 whitespace-nowrap">
              Featured news articles on RedAsh
            </span>
            <div className="flex-1 border-t border-[#000]"></div>
          </div>

          <div className="h-[2px] w-24 bg-[#E20002] mx-auto"></div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
          {articles.map((article, index) => (
            <motion.a 
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-white border border-gray-100 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(226,0,2,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              
              {/* Image Header */}
              <div className="w-full h-48 bg-gray-50 overflow-hidden relative">
                <img 
                  src={article.image} 
                  alt={article.source} 
                  className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] scale-[var(--base-scale)] group-hover:scale-[var(--hover-scale)] ${article.id === 'dna' ? 'mobile-landscape-center-dna' : ''}`} 
                  style={getImageStyles(article)}
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">

                
                <h3 className="font-main font-bold text-lg md:text-xl text-brand-black leading-snug mb-3 group-hover:text-brand-red transition-colors">
                  {article.title}
                </h3>
                
                <p className="font-main text-sm text-brand-gray leading-relaxed mb-4 flex-1 line-clamp-3">
                  {article.description}
                </p>
                
                <div className="mt-auto flex items-center text-sm font-bold text-[#E20002] group-hover:text-[#E20002] transition-colors">
                  Read Article
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
              
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MediaLinks;
