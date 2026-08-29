import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import EntertainmentNavbar from './components/EntertainmentNavbar';
import EntertainmentFooter from './components/EntertainmentFooter';
import mediaData from '../../data/media.json';
import Lenis from 'lenis';

const EntertainmentMedia = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
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
    <div className="min-h-screen bg-white flex flex-col font-main selection:bg-brand-red selection:text-white">
      <EntertainmentNavbar />

      <main className="flex-grow pt-24 pb-20 relative z-10">
        
        {/* Background Glow */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-brand-red/10 blur-[150px] -z-10 rounded-full scale-150 opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-20 mt-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-hero font-black uppercase tracking-wide mb-8"
            >
              <span className="text-brand-red">MEDIA</span> <span className="text-neutral-900">COVERAGE</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              Featured news articles on RedAsh Films
            </motion.p>
          </div>

          {/* Media List */}
          <div className="flex flex-col gap-6 md:gap-8">
            {mediaData.map((article, index) => {
              // Dummy data for design purposes to match screenshot
              const date = new Date(2026, 4 + index, 15 + index).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();

              return (
                <motion.a 
                  key={article.id || index}
                  href={article.url !== '#' ? article.url : undefined}
                  target={article.url !== '#' ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex flex-col md:flex-row bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-100"
                >
                  
                  {/* Image Left */}
                  <div className="w-full md:w-[40%] xl:w-[35%] h-[250px] md:h-[300px] overflow-hidden relative flex-shrink-0">
                    {article.image && (
                      <img 
                        src={article.image} 
                        alt={article.source} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105" 
                        style={article.zoom !== undefined ? {
                          objectPosition: `${50 + (article.moveLeft || 0) - (article.moveRight || 0)}% ${50 + (article.moveUp || 0) - (article.moveDown || 0)}%`,
                          transform: `scale(${1 + (article.zoom / 100)})`
                        } : {}}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>

                  {/* Content Right */}
                  <div className="p-6 md:p-8 flex flex-col flex-1 justify-center">
                    
                    {/* Top Meta Info */}
                    <div className="flex flex-wrap items-center mb-4 gap-4 text-[10px] font-bold tracking-widest uppercase">
                      <div className="flex items-center text-neutral-500 gap-4">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {date}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-hero font-bold text-2xl md:text-3xl text-neutral-900 leading-tight mb-3 group-hover:text-brand-red transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-neutral-600 text-sm md:text-base line-clamp-3 md:line-clamp-2 mb-6">
                      {article.description}
                    </p>
                    
                    {/* Read Article Link */}
                    <div className="inline-flex items-center text-brand-red font-bold text-sm tracking-widest uppercase mt-auto self-start group-hover:text-red-700 transition-colors">
                      Read Article
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

        </div>
      </main>

      <EntertainmentFooter />
    </div>
  );
};

export default EntertainmentMedia;
