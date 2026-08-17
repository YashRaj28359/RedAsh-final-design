import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';
import { videos } from '../../../data/videoData';

// Import posters from Selected Entertainment Projects
import p1 from '../../../assets/Films/Poster/1. Copy of Movie Poster_20x10.webp';
import p2 from '../../../assets/Films/Poster/2. Copy of Horizontal Poster_Main Tumhare Bachche.webp';
import p3 from '../../../assets/Films/Poster/3. Copy of Final Poster_No More MeToo.webp';
import p4 from '../../../assets/Films/Poster/4. Copy of IAYV_Horizontal Poster.webp';
import p5 from '../../../assets/Films/Poster/5. Corona is a Conspiracy.webp';
import p6 from '../../../assets/Films/Poster/6. Hum Azaad Hain.webp';
import p9 from '../../../assets/Films/Poster/9. 100 Short Films_Emerging Leaders.png';
import card2Img from '../../../assets/Films/Cards/Card2.jpg';
import card6Img from '../../../assets/Films/Cards/Card6.png';

const projects = [
  { id: "01", title: "WITH LOVE, DELHI!", image: p1, url: 'https://youtu.be/pIv7FFKm318?si=b_CUXqrAAxoaTjq0' },
  { id: "02", title: "THE CODPASTER", image: card2Img, url: 'https://www.mid-day.com/buzzfeed/article/ashish-lal-the-iit-delhi-engineer-turned-actor-teams-up-with-surbhi-jyoti-and-upendra-limaye-9809' },
  { id: "03", title: "MAIN TUMHARE BACHCHE...", image: p2, url: 'https://youtu.be/EhiWSgbQnQU?si=29Z1fEfaRTZqyo6G' },
  { id: "04", title: "NO MORE #METOO", image: p3, url: 'https://youtu.be/5AGZjsdfOio?si=2CgTqSXIUs0_a-Ua' },
  { id: "05", title: "I AM YOUR VOICE", image: p4, url: 'https://youtu.be/BqGm3m3jyhI?si=K2jGDdZAKaOPKXnl' },
  { id: "06", title: "CORONA IS A CONSPIRACY", image: p5, url: 'https://youtu.be/6NusataOZyU?si=xoLP93n-qeuhEqK6' },
  { id: "07", title: "HUM AZAAD HAIN", image: p6, url: 'https://youtu.be/-qHNIXVHT_4?si=rjrWz4zDIGye9Zhw' },
  { id: "08", title: "MUSIC VIDEOS", image: card6Img, url: 'https://youtu.be/6Q0mdzO9A4A?si=w_dZFv_p8FszDoDL', containImage: true },
  { id: "09", title: "100 SHORT FILMS EMERGING LEADERS", image: p9, url: 'https://youtu.be/Rz0El0ooOwM?si=1TkAE07Ek8dbJm1w', customStyle: { objectPosition: '50% 10%' } }
];

const EntertainmentFilmsShowcase = () => {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedVideoUrl(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleVideoClick = (url) => {
    if (!url) return;
    if (url.includes('youtu')) {
      setSelectedVideoUrl(url);
    } else {
      window.open(url, '_blank');
    }
  };

  // Home page cards order for vertical posters (first 10 from videoData.js)
  const moreVideos = videos.slice(0, 10);

  return (
    <section className="w-full py-16 md:py-24 bg-white font-main">
      <div className="w-full flex flex-col gap-20">
        
        {/* WATCH OUR STORIES */}
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col items-center justify-center text-center mb-10 md:mb-16 px-4">
            <h2 className="text-3xl md:text-5xl font-hero font-bold text-neutral-900 tracking-widest uppercase text-center">
              SELECTED <span className="text-brand-red">ENTERTAINMENT FILMS</span>
            </h2>
            <div className="w-16 h-[2px] bg-brand-red mt-6"></div>
          </div>

          <div className="flex flex-col gap-1 sm:gap-2 w-full px-0.5">
            {/* Row 1: 1 large horizontal video (centered, smaller width) */}
            <div className="flex justify-center w-full px-4 sm:px-0">
              <div className="w-full sm:w-2/3 lg:w-1/2">
                <ProjectThumbnail project={projects[0]} onClick={() => handleVideoClick(projects[0].url)} isHorizontal />
              </div>
            </div>
            
            {/* Row 2: 2 horizontal videos (50% each) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
              {projects.slice(1, 3).map(project => (
                 <ProjectThumbnail key={project.id} project={project} onClick={() => handleVideoClick(project.url)} isHorizontal />
              ))}
            </div>
            
            {/* Row 3: 3 horizontal videos (33.3% each) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
              {projects.slice(3, 6).map(project => (
                 <ProjectThumbnail key={project.id} project={project} onClick={() => handleVideoClick(project.url)} isHorizontal />
              ))}
            </div>
            
            {/* Row 4: 3 horizontal videos (33.3% each) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 w-full">
              {projects.slice(6, 9).map(project => (
                 <ProjectThumbnail key={project.id} project={project} onClick={() => handleVideoClick(project.url)} isHorizontal />
              ))}
            </div>
          </div>
        </div>



      </div>

      {/* YT Video Modal Pop-out */}
      <AnimatePresence>
        {selectedVideoUrl && (
          <motion.div 
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 md:p-12 backdrop-blur-sm"
            onClick={() => setSelectedVideoUrl(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="relative w-[90%] max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl mt-16 md:mt-24" 
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button 
                onClick={() => setSelectedVideoUrl(null)} 
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-brand-red text-white rounded-full flex items-center justify-center transition-colors duration-300 font-bold"
              >
                ✕
              </button>
              <iframe 
                className="w-full h-full"
                src={selectedVideoUrl.includes('youtu.be') ? `https://www.youtube.com/embed/${selectedVideoUrl.split('youtu.be/')[1].split('?')[0]}?autoplay=1` : selectedVideoUrl.includes('youtube.com') ? selectedVideoUrl.replace('watch?v=', 'embed/').split('&')[0] + '?autoplay=1' : selectedVideoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Thumbnail component for the 9 Selected Projects
const ProjectThumbnail = ({ project, onClick, isHorizontal }) => (
  <motion.div 
    onClick={onClick}
    className={`w-full ${isHorizontal ? 'aspect-video rounded-none' : 'aspect-[3/4] rounded-none'} overflow-hidden relative group cursor-pointer shadow-sm bg-black`}
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    <img 
      src={project.image} 
      alt={project.title} 
      className={`w-full h-full ${project.containImage ? 'object-contain' : 'object-cover'} transition-transform duration-700 ${project.scaleImage ? 'scale-[1.35] group-hover:scale-[1.45]' : 'group-hover:scale-110'}`} 
      loading="lazy"
    />
    
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
      {project.url && project.url.includes('youtu') && (
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-xl">
          <FiPlay className="w-4 h-4 md:w-6 md:h-6 text-white ml-1 drop-shadow-md" />
        </div>
      )}
    </div>
  </motion.div>
);

// Thumbnail component for the 10 Home Page Vertical Posters
const VideoThumbnail = ({ video, onClick }) => (
  <motion.div 
    onClick={onClick}
    className="w-full aspect-[3/4] rounded-none overflow-hidden relative group cursor-pointer shadow-sm"
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    <img 
      src={video.thumbnail} 
      alt={video.title} 
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      loading="lazy"
    />
    
    <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8 flex justify-center`}>
      <h4 className={`text-[10px] md:text-xs font-bold text-center m-0 uppercase tracking-wider ${video.categoryColor === 'red' ? 'text-brand-red' : 'text-brand-blue'}`}>
        {video.category}
      </h4>
    </div>
  </motion.div>
);

export default EntertainmentFilmsShowcase;
