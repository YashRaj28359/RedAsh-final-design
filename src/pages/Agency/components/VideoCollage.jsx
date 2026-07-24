import React, { useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

const VideoCard = ({ video, className, onPlay }) => (
  <div className={className} style={{ transform: `translateX(${video.offsetX || '0px'}) rotate(${video.rotation || '0deg'}) scale(${video.scale || 1})` }}>
    <div 
      onClick={onPlay}
      className="relative block w-full aspect-video rounded-lg overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 hover:z-50 pointer-events-auto cursor-pointer group"
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
        <div className="relative w-full flex justify-center pb-4 z-20">
          <span className="text-brand-blue font-hero font-bold tracking-normal text-2xl md:text-3xl lg:text-4xl uppercase drop-shadow-md text-center px-2">
            {video.label}
          </span>
        </div>

      </div>

      {/* Hover Overlay: Play Button */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-[1.5px] border-white/90 flex items-center justify-center transition-transform hover:scale-110 shadow-lg">
          <FaPlay className="text-white text-sm md:text-base ml-1" />
        </div>
      </div>
    </div>
  </div>
);

const VideoCollage = () => {
  const containerRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

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
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block">
        
        {/* Left Column */}
        <div className="absolute top-0 bottom-0 left-[5%] w-[20%] flex flex-col justify-center gap-8 collage-column-left">
          {leftVideos.map((video, index) => (
            <div key={`left-${index}`} className="collage-card-left">
              <VideoCard video={video} onPlay={() => setActiveVideo(video.id)} />
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="absolute top-0 bottom-0 right-[5%] w-[20%] flex flex-col justify-center gap-8 collage-column-right">
          {rightVideos.map((video, index) => (
            <div key={`right-${index}`} className="collage-card-right">
              <VideoCard video={video} onPlay={() => setActiveVideo(video.id)} />
            </div>
          ))}
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
