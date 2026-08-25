import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaStar, FaPlay, FaTimes } from 'react-icons/fa';
import YouTube from 'react-youtube';

const VideoTestimonial = ({ name, title, company, videoId, rotationClass = "", onPlay }) => {
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className={`w-full bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col group h-full transition-all duration-300 hover:rotate-0 hover:scale-[1.02] z-10 hover:z-20 ${rotationClass} [@media(max-height:600px)_and_(orientation:landscape)]:rounded-xl`}>
      {/* Thumbnail / Video Section */}
      <div className="relative w-full h-48 md:h-52 bg-gray-200 overflow-hidden [@media(max-height:600px)_and_(orientation:landscape)]:h-24">
        <div className="w-full h-full relative cursor-pointer" onClick={() => onPlay(videoId)}>
          <img src={thumbUrl} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
              <FaPlay className="text-gray-900 ml-1 text-xl" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Content Section */}
      <div className="p-5 md:p-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2 flex-grow bg-white [@media(max-height:600px)_and_(orientation:landscape)]:p-2 [@media(max-height:600px)_and_(orientation:landscape)]:gap-1">
        <div>
          <h4 className="text-gray-900 font-bold text-lg [@media(max-height:600px)_and_(orientation:landscape)]:text-[11px]">{name}</h4>
          <p className="text-gray-500 text-xs md:text-sm mt-0.5 [@media(max-height:600px)_and_(orientation:landscape)]:text-[9px] [@media(max-height:600px)_and_(orientation:landscape)]:mt-0">{title}</p>
          <p className="text-brand-blue text-sm font-semibold mt-0.5 [@media(max-height:600px)_and_(orientation:landscape)]:text-[9px] [@media(max-height:600px)_and_(orientation:landscape)]:mt-0">{company}</p>
        </div>
      </div>
    </div>
  );
};

const TextTestimonial = ({ text, name, title, company, avatar, rotationClass = "" }) => (
  <div className={`w-full bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col justify-between h-full transition-all duration-300 hover:rotate-0 hover:scale-[1.02] z-10 hover:z-20 ${rotationClass} group overflow-hidden relative [@media(max-height:600px)_and_(orientation:landscape)]:p-3 [@media(max-height:600px)_and_(orientation:landscape)]:rounded-xl`}>
    
    {/* Blue background sliding up from bottom */}
    <div className="absolute inset-0 bg-brand-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0"></div>

    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6 [@media(max-height:600px)_and_(orientation:landscape)]:mb-1">
        <span className="text-6xl text-blue-400/40 group-hover:text-white/40 transition-colors duration-300 font-serif leading-none h-10 block [@media(max-height:600px)_and_(orientation:landscape)]:text-2xl [@media(max-height:600px)_and_(orientation:landscape)]:h-4">“</span>
      </div>
      <p className="text-gray-700 group-hover:text-white transition-colors duration-300 font-medium text-sm md:text-base leading-relaxed mb-8 [@media(max-height:600px)_and_(orientation:landscape)]:text-[9px] [@media(max-height:600px)_and_(orientation:landscape)]:leading-tight [@media(max-height:600px)_and_(orientation:landscape)]:mb-2">
        {text}
      </p>
    </div>
    
    <div className="flex items-center gap-4 mt-auto relative z-10 [@media(max-height:600px)_and_(orientation:landscape)]:gap-2">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover shadow-sm group-hover:shadow-md transition-all duration-300 [@media(max-height:600px)_and_(orientation:landscape)]:w-6 [@media(max-height:600px)_and_(orientation:landscape)]:h-6" />
      <div>
        <h4 className="font-bold text-gray-900 group-hover:text-white transition-colors duration-300 text-sm md:text-base [@media(max-height:600px)_and_(orientation:landscape)]:text-[10px]">{name}</h4>
        <p className="text-gray-500 group-hover:text-white/80 transition-colors duration-300 text-xs mt-0.5 [@media(max-height:600px)_and_(orientation:landscape)]:text-[8px] [@media(max-height:600px)_and_(orientation:landscape)]:mt-0">{title}</p>
        <p className="text-brand-blue group-hover:text-white transition-colors duration-300 text-xs font-semibold mt-0.5 [@media(max-height:600px)_and_(orientation:landscape)]:text-[9px] [@media(max-height:600px)_and_(orientation:landscape)]:mt-0">{company}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [player, setPlayer] = useState(null);

  const handlePlay = (videoId) => {
    setActiveVideo(videoId);
    if (player) {
      player.loadVideoById(videoId);
    }
  };

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeVideo]);

  return (
    <>
      <section className="w-full pt-12 pb-24 bg-[#F4F9FF] relative z-30 font-main shadow-[0_0_50px_rgba(0,0,0,0.15)] border-y border-gray-100">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8">
          
          {/* Header Section */}
          <div className="flex flex-col items-center mb-16 w-full overflow-hidden mt-4">
            <div className="flex items-center justify-center w-full">
              
              {/* Left Dots */}
              <div className="hidden sm:flex gap-1.5 md:gap-2 mx-4 md:mx-8 items-center">
                {[...Array(6)].map((_, i) => (
                  <div key={`left-dot-${i}`} className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-blue" />
                ))}
              </div>

              {/* Design 12 Heading */}
              <div className="relative mx-2 md:mx-4">
                {/* Offset Outline Parallelogram */}
                <div className="absolute inset-0 border-[1.5px] border-brand-blue skew-x-[-15deg] -translate-x-1.5 -translate-y-1.5 md:-translate-x-2 md:-translate-y-2 pointer-events-none z-0"></div>
                
                {/* Solid Filled Parallelogram */}
                <div className="relative bg-brand-blue skew-x-[-15deg] px-8 py-2 md:px-12 md:py-3 z-10">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-hero font-bold tracking-widest text-white text-center uppercase whitespace-nowrap skew-x-[15deg] pt-1">
                    Testimonials
                  </h2>
                </div>
              </div>

              {/* Right Dots */}
              <div className="hidden sm:flex gap-1.5 md:gap-2 mx-4 md:mx-8 items-center">
                {[...Array(6)].map((_, i) => (
                  <div key={`right-dot-${i}`} className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-blue" />
                ))}
              </div>
              
            </div>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 [@media(max-height:600px)_and_(orientation:landscape)]:grid-cols-3 [@media(max-height:600px)_and_(orientation:landscape)]:gap-4">
            
            {/* Row 1 */}
            <VideoTestimonial 
              name="Kuljit Chadha" 
              title="Co-Founder & COO" 
              company="Disprz" 
              videoId="1AUDTOK84ns" 
              rotationClass="-rotate-2"
              onPlay={handlePlay}
            />
            <VideoTestimonial 
              name="Sudeep Rao" 
              title="Associate Director, Marketing" 
              company="Sigmoid" 
              videoId="27Fip-3VgSU" 
              rotationClass="rotate-1"
              onPlay={handlePlay}
            />
            <TextTestimonial 
              text="More video testimonials coming soon…"
              name="XYZ"
              title="XYZ"
              company="XYZ"
              avatar="https://placehold.co/150x150/1672ef/1672ef.png"
              rotationClass="-rotate-1"
            />
          </div>
        </div>
      </section>

      {/* Video Modal - ALWAYS MOUNTED, VISIBILITY TOGGLED */}
      {createPortal(
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${activeVideo ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          style={{ visibility: activeVideo ? 'visible' : 'hidden' }}
          onClick={() => {
            setActiveVideo(null);
            if (player) player.pauseVideo();
          }}
          data-lenis-prevent="true"
        >
          <div 
            className="relative w-[90%] max-w-5xl aspect-video rounded-2xl shadow-2xl bg-black mt-16 md:mt-24" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute -top-12 md:-top-16 right-0 z-20 w-10 h-10 bg-black/50 hover:bg-brand-blue text-white rounded-full flex items-center justify-center transition-colors duration-300 font-bold"
              onClick={() => {
                setActiveVideo(null);
                if (player) player.pauseVideo();
              }}
            >
              ✕
            </button>
            <YouTube
              videoId="1AUDTOK84ns"
              opts={{
                width: '100%',
                height: '100%',
                playerVars: {
                  autoplay: 0,
                  rel: 0,
                  modestbranding: 1,
                  playsinline: 1
                }
              }}
              className="w-full h-full relative z-10 rounded-2xl overflow-hidden bg-black"
              iframeClassName="w-full h-full border-0 absolute inset-0"
              onReady={(e) => setPlayer(e.target)}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Testimonials;
