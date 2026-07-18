import React from 'react';
import { motion } from 'framer-motion';
import dnaImage from '../../assets/ashish-lal-dna.jpg';

const MediaLinks = () => {
  const articles = [
    {
      id: 'toi',
      source: 'Times of India',
      title: 'Ashish Lal explores friendship and loss in The Codpaster',
      description: 'Actor, filmmaker and entrepreneur Ashish Lal has completed shooting for The Codpaster, a Hindi web series being positioned as the world\'s first fiction drama set in the world of podcasting.',
      url: 'https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/ashish-lal-explores-friendship-and-loss-in-the-codpaster/articleshow/131854264.cms',
      image: 'https://static.toiimg.com/thumb/msid-131854729,imgsize-212194,width-400,height-225,resizemode-4/ashishonline.jpg',
      
      // --- EASY IMAGE CONTROLS ---
      zoom: 7,        // Zoom percentage (e.g. 10 = 10% zoom)
      moveLeft: 0,     // Nudge image left
      moveRight: 50,   // Nudge image right
      moveUp: 0,       // Nudge image up
      moveDown: 10,    // Nudge image down
    },
    {
      id: 'dna',
      source: 'DNA',
      title: 'RedAsh Films led by IIT Delhi engineer Ashish Lal scales rapidly with 1600% growth over two years',
      description: 'Mumbai-based production company RedAsh Films, founded and led by Ashish Lal, has witnessed rapid growth over the last two financial years.',
      url: 'https://www.dnaindia.com/insights/report-redash-films-led-by-iit-delhi-engineer-ashish-lal-scales-rapidly-with-1600-growth-over-two-years-3211714',
      image: dnaImage,
      
      // --- EASY IMAGE CONTROLS ---
      zoom: 10,         
      moveLeft: 0,     
      moveRight: 100,   
      moveUp: 0,       
      moveDown: 50,    
    },
    {
      id: 'mid-day',
      source: 'Mid-day',
      title: 'Ashish Lal, the IIT Delhi engineer-turned-actor, teams up with Surbhi Jyoti and Upendra Limaye',
      description: 'Ashish Lal’s journey into acting has not followed the usual industry route. An engineer from the IIT Delhi, he could have chosen a more predictable professional path, but cinema and performance gradually became the stronger calling.',
      url: 'https://www.mid-day.com/buzzfeed/article/ashish-lal-the-iit-delhi-engineer-turned-actor-teams-up-with-surbhi-jyoti-and-upendra-limaye-9809',
      image: 'https://images.mid-day.com/images/images/2026/may/f336_d.jpg',

      // --- EASY IMAGE CONTROLS ---
      zoom: 5,         
      moveLeft: 0,     
      moveRight: 0,   
      moveUp: 0,       
      moveDown: 0,    
    }
  ];

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
    <section className="w-full px-4 md:px-8 pt-0 pb-16 bg-white">
      <style>
        {`
          @media (max-width: 1023px) and (orientation: landscape) {
            .mobile-landscape-center-dna {
              object-position: 50% 50% !important;
            }
          }
        `}
      </style>
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-subtitle font-bold text-brand-black tracking-[4px] md:tracking-[8px] uppercase mb-6">
            IN THE MEDIA
          </h2>
          <div className="h-[3px] w-20 bg-brand-red mx-auto rounded-full"></div>
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
                <span className="inline-block px-3 py-1 bg-gray-100 text-brand-black text-xs font-bold uppercase tracking-wider rounded-full self-start mb-4">
                  {article.source}
                </span>
                
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
