import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaPlay } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const leftVideos = [
  { id: 'b5hZr-8rSI4', label: 'TV ADS', rotation: '1deg', offsetX: '60px', scale: 1 }, 
  { id: 'IUwZoT_-gt4', label: 'BRAND FILMS', rotation: '-9deg', offsetX: '160px', scale: 0.85 },
  { id: 'RvciiZb-k1U', label: 'PODCASTS', rotation: '7deg', offsetX: '80px', scale: 1.05 },
];

const rightVideos = [
  { id: 'rqfTN_Fj1SA', label: 'DIGITAL ADS', rotation: '-7deg', offsetX: '-60px', scale: 0.9 },
  { id: 'R_EAcTv-59o', label: 'EXPLAINERS', rotation: '-2deg', offsetX: '-150px', scale: 1.10 },
  { id: 'l4XYMZzh7Tc', label: 'AI VIDEOS', rotation: '8deg', offsetX: '-30px', scale: 0.90 },
];

const isLandscapeMobile = "[@media(max-height:600px)_and_(orientation:landscape)]";

const VideoCard = ({ video, className, onPlay, isMobile }) => {
  const fadeClasses = isMobile 
    ? "bottom-0 h-[50%] from-white/95 via-white/40 to-transparent" 
    : "inset-0 from-black/80 via-black/30 to-transparent";

  const textClasses = `text-brand-blue font-hero font-bold tracking-[2px] md:tracking-[3px] text-[16px] sm:text-[18px] md:text-2xl lg:text-3xl xl:text-4xl ${isLandscapeMobile}:!text-lg uppercase text-center px-1 ` + 
    (isMobile 
      ? "drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]" 
      : "[-webkit-text-stroke:0.5px_white] drop-shadow-md");

  return (
    <div className={className} style={isMobile ? {} : { transform: `translateX(${video.offsetX || '0px'}) rotate(${video.rotation || '0deg'}) scale(${video.scale || 1})` }}>
      <div 
        onClick={onPlay}
        className={`relative block w-full aspect-video rounded-lg overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 hover:z-50 pointer-events-auto cursor-pointer group`}
        style={isMobile ? {} : { WebkitTransform: 'translateZ(0)', outline: '1px solid transparent' }}
      >
        <img 
          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
          alt={video.label} 
          className="w-full h-full object-cover scale-[1.02]"
        />
        
        {/* Permanent Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end pointer-events-none">
          
          <div className={`absolute w-full bg-gradient-to-t ${fadeClasses}`} />

          <div className={`absolute bottom-0 w-full flex justify-center pb-1 md:pb-4 ${isLandscapeMobile}:!pb-[1px] z-20`}>
            <span className={textClasses}>
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
};

const VideoCollage = () => {
  const containerRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeVideo]);


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
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block [@media(max-height:600px)_and_(orientation:landscape)]:block">
        
        {/* Left Column */}
        <div className="absolute top-0 bottom-0 left-[5%] [@media(max-height:600px)_and_(orientation:landscape)]:left-[1%] w-[20%] [@media(max-height:600px)_and_(orientation:landscape)]:w-[22%] flex flex-col justify-center gap-8 [@media(max-height:600px)_and_(orientation:landscape)]:gap-4 collage-column-left">
          {leftVideos.map((video, index) => (
            <div key={`left-${index}`} className="collage-card-left">
              <VideoCard video={video} onPlay={() => setActiveVideo(video.id)} />
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="absolute top-0 bottom-0 right-[5%] [@media(max-height:600px)_and_(orientation:landscape)]:right-[1%] w-[20%] [@media(max-height:600px)_and_(orientation:landscape)]:w-[22%] flex flex-col justify-center gap-8 [@media(max-height:600px)_and_(orientation:landscape)]:gap-4 collage-column-right">
          {rightVideos.map((video, index) => (
            <div key={`right-${index}`} className="collage-card-right">
              <VideoCard video={video} onPlay={() => setActiveVideo(video.id)} />
            </div>
          ))}
        </div>

      </div>

      {/* Mobile Layout */}
      <div className="w-full px-4 pt-4 pb-8 md:hidden [@media(max-height:600px)_and_(orientation:landscape)]:hidden z-20 flex flex-col items-center justify-center gap-5 mt-0 relative pointer-events-auto">
        <h1 className="font-hero text-[34px] xs:text-[38px] sm:text-[44px] leading-[1] text-black uppercase font-bold text-center">
          <div className="flex flex-wrap justify-center gap-x-2"><span className="text-brand-red">Red<span className="text-brand-gray">Ash</span></span> <span className="text-brand-blue">AD Agency.</span></div>
        </h1>
        
        <div className="flex w-full justify-center gap-3">
          <div className="w-1/2 max-w-[200px] relative aspect-video">
            <VideoCard video={leftVideos[0]} onPlay={() => setActiveVideo(leftVideos[0].id)} isMobile />
          </div>
          <div className="w-1/2 max-w-[200px] relative aspect-video">
            <VideoCard video={rightVideos[0]} onPlay={() => setActiveVideo(rightVideos[0].id)} isMobile />
          </div>
        </div>

        <h2 className="font-hero text-[34px] leading-[1] opacity-80 uppercase text-center font-bold">
          Marketing Campaigns.
        </h2>

        <div className="flex w-full justify-center gap-3">
          <div className="w-1/2 max-w-[200px] relative aspect-video">
            <VideoCard video={leftVideos[1]} onPlay={() => setActiveVideo(leftVideos[1].id)} isMobile />
          </div>
          <div className="w-1/2 max-w-[200px] relative aspect-video">
            <VideoCard video={rightVideos[1]} onPlay={() => setActiveVideo(rightVideos[1].id)} isMobile />
          </div>
        </div>

        <h2 className="font-hero text-[44px] leading-[0.9] text-brand-blue uppercase font-bold text-center flex flex-col">
          <span>Design.</span>
          <span>Create.</span>
          <span>Execute.</span>
        </h2>

        <div className="flex w-full justify-center gap-3">
          <div className="w-1/2 max-w-[200px] relative aspect-video">
            <VideoCard video={leftVideos[2]} onPlay={() => setActiveVideo(leftVideos[2].id)} isMobile />
          </div>
          <div className="w-1/2 max-w-[200px] relative aspect-video">
            <VideoCard video={rightVideos[2]} onPlay={() => setActiveVideo(rightVideos[2].id)} isMobile />
          </div>
        </div>

        <h3 className="font-hero text-[44px] leading-[0.9] opacity-80 text-black uppercase font-bold text-center">
          Since 2007.
        </h3>

        <button 
          onClick={() => navigate('/ad-agency/films')}
          className="mt-6 relative group bg-transparent text-brand-blue font-main text-xs uppercase tracking-[0.2em] font-bold py-4 px-8 rounded-full pointer-events-auto transition-all duration-500 overflow-hidden border border-brand-blue/40 hover:border-brand-blue"
        >
          <span className="relative z-10 transition-colors duration-500 group-hover:text-white">Watch More Enterprise Films</span>
          <div className="absolute inset-0 bg-brand-blue w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
        </button>
      </div>

      {/* Video Modal */}
      {activeVideo && createPortal(
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-auto"
          onClick={() => setActiveVideo(null)}
          data-lenis-prevent="true"
        >
          <div 
            className="relative w-[90%] max-w-5xl aspect-video rounded-2xl shadow-2xl bg-black mt-16 md:mt-24" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute -top-12 md:-top-16 right-0 z-20 w-10 h-10 bg-black/50 hover:bg-brand-blue text-white rounded-full flex items-center justify-center transition-colors duration-300 font-bold"
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
              className="w-full h-full relative z-10 rounded-2xl"
            ></iframe>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default VideoCollage;
