import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from '../../components/Footer/Footer';
import ContactForm from '../../components/ContactForm/ContactForm';
import mediaData from '../../data/media.json';
import { LuNewspaper } from "react-icons/lu";

const MediaPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-main selection:bg-brand-red selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 relative z-10">
        
        {/* Background Glow */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-brand-blue/20 blur-[150px] -z-10 rounded-full scale-150 opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-20">

            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-hero font-black uppercase tracking-wide mb-8"
            >
              <span className="text-brand-blue">MEDIA</span> <span className="text-brand-black">COVERAGE</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              Here are some of the chosen news articles on RedAsh Films
            </motion.p>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {mediaData.map((article, index) => (
              <motion.a 
                key={article.id || index}
                href={article.url !== '#' ? article.url : undefined}
                target={article.url !== '#' ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-white border border-gray-100 hover:border-brand-blue/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden shadow-lg"
              >
                
                {/* Image Header */}
                <div className="w-full aspect-video bg-gray-50 overflow-hidden relative">
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

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-main font-bold text-xl text-brand-black leading-snug mb-3 group-hover:text-brand-blue transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                    {article.description}
                  </p>
                  
                  {/* Read Article Link */}
                  <div className="inline-flex items-center text-brand-blue font-bold text-sm tracking-widest uppercase mt-auto self-start">
                    Read Article
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

        </div>
      </main>

      <ContactForm 
        headingClass="font-subtitle text-brand-blue tracking-[4px] md:tracking-[6px] [-webkit-text-stroke:1px_#1672EF] md:[-webkit-text-stroke:1.5px_#1672EF]"
        highlightColorClass="text-brand-blue"
        linkColorClass="text-brand-blue hover:text-blue-700"
      />
      <Footer />
    </div>
  );
};

export default MediaPage;
