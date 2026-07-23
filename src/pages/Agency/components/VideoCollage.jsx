import React, { useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const leftVideos = [
  { id: 'b5hZr-8rSI4', label: 'Ad Films', rotation: '-3deg' }, 
  { id: 'R_EAcTv-59o', label: 'Explainers', rotation: '2deg' },
  { id: 'l4XYMZzh7Tc', label: 'AI', rotation: '-1deg' },
];

const rightVideos = [
  { id: 'IUwZoT_-gt4', label: 'Brand Films', rotation: '3deg' },
  { id: 'R7TQBIHyR9Y', label: 'L&D', rotation: '-2deg' },
  { id: 'iuIaAuh4LCQ', label: 'Case Study', rotation: '1deg' },
];

const VideoCard = ({ video, className, onPlay }) => (
  <div className={className} style={{ transform: `rotate(${video.rotation || '0deg'})` }}>
    <div 
      onClick={onPlay}
      className="relative block w-full aspect-video rounded-lg overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 hover:z-50 pointer-events-auto cursor-pointer group"
    >
      <img 
        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
        alt={video.label} 
        className="w-full h-full object-cover"
      />
      
      {/* Hover Overlay: White Fade + Text + Play Button */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end">
        
        {/* White fade from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />
        
        {/* Play Button (Centered) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-[1.5px] border-white/90 flex items-center justify-center transition-transform hover:scale-110 shadow-lg">
            <FaPlay className="text-white text-sm md:text-base ml-1" />
          </div>
        </div>

        {/* Category Text (Bottom) */}
        <div className="relative w-full flex justify-center pb-4 z-20">
          <span className="text-brand-blue font-hero font-bold tracking-normal text-xl md:text-2xl uppercase">
            {video.label}
          </span>
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
  }, { scope: containerRef });

  return (
    <>
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block">
        
        {/* Left Column */}
        <div className="absolute top-0 bottom-0 left-[5%] w-[18%] flex flex-col justify-center gap-10">
          {leftVideos.map((video, index) => (
            <VideoCard key={`left-${index}`} video={video} className="collage-card-left" onPlay={() => setActiveVideo(video.id)} />
          ))}
        </div>

        {/* Right Column */}
        <div className="absolute top-0 bottom-0 right-[5%] w-[18%] flex flex-col justify-center gap-10">
          {rightVideos.map((video, index) => (
            <VideoCard key={`right-${index}`} video={video} className="collage-card-right" onPlay={() => setActiveVideo(video.id)} />
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
