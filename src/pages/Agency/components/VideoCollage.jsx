import React, { useRef, useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const leftVideos = [
  { id: 'b5hZr-8rSI4', label: 'TV ADS', rotation: '1deg', offsetX: '60px', scale: 1 }, 
  { id: 'IUwZoT_-gt4', label: 'BRAND FILMS', rotation: '-9deg', offsetX: '160px', scale: 0.85 },
  { id: 'RvciiZb-k1U', label: 'PODCASTS', rotation: '7deg', offsetX: '80px', scale: 1.05 },
];

const rightVideos = [
  { id: 'rqfTN_Fj1SA', label: 'DIGITAL ADS', rotation: '-7deg', offsetX: '-60px', scale: 0.9 },
  { id: 'R_EAcTv-59o', label: 'ANIMATED EXPLAINERS', rotation: '-2deg', offsetX: '-150px', scale: 1.10 },
  { id: 'l4XYMZzh7Tc', label: 'AI VIDEOS', rotation: '8deg', offsetX: '-30px', scale: 0.90 },
];

const VideoCard = ({ video, className, onPlay, isMobile }) => (
  <div className={className} style={isMobile ? {} : { transform: `translateX(${video.offsetX || '0px'}) rotate(${video.rotation || '0deg'}) scale(${video.scale || 1})` }}>
    <div 
      onClick={onPlay}
      className={`relative block w-full aspect-video rounded-lg overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 hover:z-50 pointer-events-auto cursor-pointer group ${isMobile ? 'border border-white/20' : ''}`}
    >
      <img 
        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
        alt={video.label} 
        className="w-full h-full object-cover"
      />
      
      {/* Permanent Overlay: Black Fade + Text */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pointer-events-none">
        
        {/* Black fade from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Category Text (Bottom) */}
        <div className="relative w-full flex justify-center pb-2 md:pb-4 z-20">
          <span className="text-brand-blue font-hero font-bold tracking-normal text-[10px] sm:text-xs md:text-3xl lg:text-4xl uppercase drop-shadow-md text-center px-1">
            {video.label}
          </span>
        </div>

      </div>

      {/* Hover Overlay: Play Button */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
        <div className="w-8 h-8 md:w-16 md:h-16 rounded-full border-[1.5px] border-white/90 flex items-center justify-center transition-transform hover:scale-110 shadow-lg">
          <FaPlay className="text-white text-[10px] md:text-base ml-1" />
        </div>
      </div>
    </div>
  </div>
);

const VideoCollage = () => {
  const containerRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  // Cycle mobile videos every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // Left side slides in from left
    gsap.fromTo('.collage-card-left', 
      { x: -150, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        stagger: { amount: 0.6, from: 'random' }
      }
    );

    // Right side slides in from right
    gsap.fromTo('.collage-card-right', 
      { x: 150, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        stagger: { amount: 0.6, from: 'random' }
      }
    );

    // Scroll-based exit effect
    gsap.to('.collage-column-left', {
      x: -400,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });

    gsap.to('.collage-column-right', {
      x: 400,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });
  }, { scope: containerRef });

  return (
    <>
      {/* Desktop Layout */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block">
        
        {/* Left Column */}
        <div className="absolute top-0 bottom-0 left-[5%] [@media(max-height:600px)_and_(orientation:landscape)]:left-[2%] w-[20%] [@media(max-height:600px)_and_(orientation:landscape)]:w-[14%] flex flex-col justify-center gap-8 [@media(max-height:600px)_and_(orientation:landscape)]:gap-4 collage-column-left">
          {leftVideos.map((video, index) => (
            <div key={`left-${index}`} className="collage-card-left">
              <VideoCard video={video} onPlay={() => setActiveVideo(video.id)} />
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="absolute top-0 bottom-0 right-[5%] [@media(max-height:600px)_and_(orientation:landscape)]:right-[2%] w-[20%] [@media(max-height:600px)_and_(orientation:landscape)]:w-[14%] flex flex-col justify-center gap-8 [@media(max-height:600px)_and_(orientation:landscape)]:gap-4 collage-column-right">
          {rightVideos.map((video, index) => (
            <div key={`right-${index}`} className="collage-card-right">
              <VideoCard video={video} onPlay={() => setActiveVideo(video.id)} />
            </div>
          ))}
        </div>

      </div>

      {/* Mobile Layout */}
      <div className="absolute top-[18%] sm:top-[20%] left-0 w-full px-4 md:hidden z-20 pointer-events-none flex justify-center gap-3">
        <div className="w-1/2 max-w-[200px] relative aspect-video">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`mobile-left-${mobileIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <VideoCard video={leftVideos[mobileIndex]} onPlay={() => setActiveVideo(leftVideos[mobileIndex].id)} isMobile />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-1/2 max-w-[200px] relative aspect-video">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`mobile-right-${mobileIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <VideoCard video={rightVideos[mobileIndex]} onPlay={() => setActiveVideo(rightVideos[mobileIndex].id)} isMobile />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-auto"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative w-[90%] max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-brand-blue text-white rounded-full flex items-center justify-center transition-colors duration-300"
              onClick={() => setActiveVideo(null)}
            >
              ✕
            </button>
            <iframe 
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full relative z-10"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCollage;
