import React, { useState, useEffect } from 'react';
import VideoCard from '../VideoCard/VideoCard';
import { videos } from '../../data/videoData';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const VideoGrid = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedVideo(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
    <section className="w-full px-4 md:px-8 pb-0 bg-white">
      <div className="w-full mx-auto">
        <motion.div 
          className="grid grid-cols-[repeat(2,48%)] md:grid-cols-[repeat(4,14%)] xl:grid-cols-[repeat(4,12%)] justify-center gap-x-[8%] xl:gap-x-[11%] gap-y-4 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {videos.map((video) => (
            <motion.div key={video.id} variants={itemVariants}>
              <VideoCard video={video} onClick={() => setSelectedVideo(video)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {selectedVideo && (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12"
        onClick={() => setSelectedVideo(null)}
      >
        <div 
          className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-brand-red rounded-full text-white transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <iframe 
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
            title={selectedVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    )}
    </>
  );
};

export default VideoGrid;
