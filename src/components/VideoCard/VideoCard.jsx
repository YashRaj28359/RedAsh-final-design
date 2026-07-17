import React from 'react';
import { motion } from 'framer-motion';

const PlayIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="white" 
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 opacity-90 drop-shadow-md"
  >
    
  </svg>
);

const VideoCard = ({ video, onClick }) => {
  const handleClick = () => {
    if (video.videoUrl.includes('youtu')) {
      onClick();
    } else {
      window.open(video.videoUrl, '_blank');
    }
  };

  return (
    <motion.div 
      className="flex flex-col cursor-pointer bg-transparent w-full group"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={handleClick}
    >
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-1">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover transition-transform duration-300" 
          loading="lazy"
        />
      </div>
      <div className="flex justify-center items-center p-0">
        <h4 
          className={`text-[10px] font-bold text-center m-0 ${video.categoryColor === 'red' ? 'text-brand-red' : 'text-brand-blue'}`}
        >
          {video.category}
        </h4>
      </div>
    </motion.div>
  );
};

export default VideoCard;
