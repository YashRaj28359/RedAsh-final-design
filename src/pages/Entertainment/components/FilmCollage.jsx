import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import card1Img from "../../../assets/Films/Cards/Card1.jpg";
import card2Img from "../../../assets/Films/Cards/Card2.jpg";
import card3Img from "../../../assets/Films/Cards/Card3.png";
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const films = [
  {
    id: "01",
    title: "MOVIES",
    subtitle: "LARGER THAN LIFE.",
    link: "https://youtu.be/pIv7FFKm318",
    image: card1Img,
    style: { top: '5%', left: '0%', zIndex: 10, width: '300px', height: '420px', transform: 'rotate(-4deg)' },
    foldCorner: 'top-left',
    tape: { top: '-12px', left: '45%', rotation: '-15deg', width: '110px' }
  },
  {
    id: "02",
    title: "WEB SERIES",
    subtitle: "EPISODES THAT\nKEEP YOU HOOKED.",
    link: "https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/ashish-lal-explores-friendship-and-loss-in-the-codpaster/articleshow/131854264.cms",
    image: card2Img,
    style: { top: '6%', left: '36%', zIndex: 20, width: '390px', height: '300px', transform: 'rotate(7deg)' },
    foldCorner: 'bottom-right',
    tape: { top: '-12px', left: '75%', rotation: '18deg', width: '90px' }
  },
  {
    id: "03",
    title: "MICRODRAMA SHOWS",
    subtitle: "SHORT STORIES.\nBIG IMPACT.",
    link: "https://kukutv.app/show/billionaire-on-plane",
    image: card3Img,
    style: { top: '5%', left: '80%', zIndex: 15, width: '310px', height: '430px', transform: 'rotate(-5deg)' },
    foldCorner: 'top-right',
    tape: { top: '-12px', left: '20%', rotation: '-38deg', width: '100px' }
  },
  {
    id: "04",
    title: "SHORT FILMS",
    subtitle: "MORE EXPERIMENTS.\nMORE PERSPECTIVES.",
    link: "https://www.youtube.com/watch?v=5AGZjsdfOio",
    image: "https://img.youtube.com/vi/5AGZjsdfOio/hqdefault.jpg",
    style: { top: '59%', left: '8%', zIndex: 25, width: '380px', height: '240px', transform: 'rotate(8deg)' },
    foldCorner: 'bottom-left',
    tape: { top: '-12px', left: '25%', rotation: '2deg', width: '130px' }
  },
  {
    id: "05",
    title: "MUSIC VIDEOS",
    subtitle: "VISUALS THAT\nAMPLIFY SOUND.",
    link: "https://youtu.be/6Q0mdzO9A4A",
    image: "https://img.youtube.com/vi/6Q0mdzO9A4A/hqdefault.jpg",
    style: { top: '60%', left: '60%', zIndex: 30, width: '450px', height: '250px', transform: 'rotate(-3deg)' },
    foldCorner: 'top-right',
    tape: { top: '-12px', left: '80%', rotation: '42deg', width: '110px' }
  }
];

// Clean, subtle noise pattern for paper matte feel (not muddy)
const subtleNoise = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const getFoldConfig = (corner) => {
  switch (corner) {
    case 'top-left':
      return {
        wrapperClass: "absolute top-0 left-0 w-[35px] h-[35px] z-40 pointer-events-none",
        wrapperFilter: "drop-shadow(3px 3px 4px rgba(0,0,0,0.25))",
        foldClipPath: "polygon(100% 0, 100% 100%, 0 100%)",
        mainClipPath: "polygon(35px 0%, 100% 0.5%, 99.5% 30%, 100% 70%, 99.2% 99.2%, 60% 100%, 20% 99.5%, 1% 99.2%, 0% 35px)"
      };
    case 'top-right':
      return {
        wrapperClass: "absolute top-0 right-0 w-[35px] h-[35px] z-40 pointer-events-none",
        wrapperFilter: "drop-shadow(-3px 3px 4px rgba(0,0,0,0.25))",
        foldClipPath: "polygon(0 100%, 100% 100%, 0 0)",
        mainClipPath: "polygon(0.5% 0.5%, calc(100% - 35px) 0%, 100% 35px, 99.5% 30%, 100% 70%, 99.2% 99.2%, 60% 100%, 20% 99.5%, 1% 99.2%, 0% 60%, 0.8% 20%)"
      };
    case 'bottom-right':
      return {
        wrapperClass: "absolute bottom-0 right-0 w-[35px] h-[35px] z-40 pointer-events-none",
        wrapperFilter: "drop-shadow(-3px -3px 4px rgba(0,0,0,0.25))",
        foldClipPath: "polygon(0 0, 100% 0, 0 100%)",
        mainClipPath: "polygon(0.5% 0.5%, 99.5% 0.8%, 100% 40%, 99.2% calc(100% - 35px), calc(100% - 35px) 100%, 60% 99.5%, 20% 100%, 1% 99.2%, 0% 60%, 0.8% 20%)"
      };
    case 'bottom-left':
      return {
        wrapperClass: "absolute bottom-0 left-0 w-[35px] h-[35px] z-40 pointer-events-none",
        wrapperFilter: "drop-shadow(3px -3px 4px rgba(0,0,0,0.25))",
        foldClipPath: "polygon(0 0, 100% 0, 100% 100%)",
        mainClipPath: "polygon(0.5% 0.5%, 99.5% 0.8%, 100% 40%, 99.2% 99.2%, 60% 100%, 35px 100%, 0% calc(100% - 35px), 0.8% 20%)"
      };
    default:
      return null;
  }
};

const FilmCollage = ({ onVideoToggle }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    // Initial entrance animations
    // 1st card from left edge
    gsap.fromTo('.film-card-0', { x: -1500, opacity: 0 }, { x: 0, opacity: 1, duration: 1.8, delay: 0.5, ease: 'expo.out' });
    // 2nd card from top edge
    gsap.fromTo('.film-card-1', { y: -1500, opacity: 0 }, { y: 0, opacity: 1, duration: 1.8, delay: 0.5, ease: 'expo.out' });
    // 3rd card from right edge
    gsap.fromTo('.film-card-2', { x: 1500, opacity: 0 }, { x: 0, opacity: 1, duration: 1.8, delay: 0.5, ease: 'expo.out' });
    // 4th and 5th card from bottom edge
    gsap.fromTo('.film-card-3, .film-card-4', { y: 1500, opacity: 0 }, { y: 0, opacity: 1, duration: 1.8, delay: 0.5, ease: 'expo.out' });

    // Scroll parallax scatter and blur effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // Animate them outwards (relative to their positions) and blur them
    tl.to('.film-card-0', { x: -800, y: -400, rotation: -25, filter: 'blur(20px)', opacity: 0 }, 0)
      .to('.film-card-1', { y: -800, rotation: 15, filter: 'blur(20px)', opacity: 0 }, 0)
      .to('.film-card-2', { x: 800, y: -200, rotation: 35, filter: 'blur(20px)', opacity: 0 }, 0)
      .to('.film-card-3', { x: -600, y: 800, rotation: -20, filter: 'blur(20px)', opacity: 0 }, 0)
      .to('.film-card-4', { x: 800, y: 800, rotation: 40, filter: 'blur(20px)', opacity: 0 }, 0);

  }, { scope: containerRef });

  useEffect(() => {
    if (onVideoToggle) {
      onVideoToggle(!!activeVideo);
    }
  }, [activeVideo, onVideoToggle]);

  const getEmbedUrl = (url) => {
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    } else if (url.includes('youtube.com/watch')) {
      try {
        const urlObj = new URL(url);
        const id = urlObj.searchParams.get('v');
        return `https://www.youtube.com/embed/${id}?autoplay=1`;
      } catch (e) { return url; }
    }
    return url;
  };

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[500px] md:min-h-[700px] lg:min-h-[850px] overflow-hidden lg:overflow-visible flex items-center justify-center lg:justify-start">
      <div className="relative w-[900px] h-[850px] scale-[0.4] sm:scale-50 md:scale-75 lg:scale-[0.6] xl:scale-[0.75] 2xl:scale-[0.9] origin-center lg:origin-left transition-transform duration-500">
        {films.map((film, index) => {
          const fold = getFoldConfig(film.foldCorner);
          
          return (
            <div 
              key={film.id}
              className={`film-card-${index} absolute`}
              style={{
                top: film.style.top,
                left: film.style.left,
                zIndex: film.style.zIndex,
                width: film.style.width,
                height: film.style.height
              }}
            >
              <a 
                href={film.link}
                onClick={(e) => {
                  e.preventDefault();
                  if (film.link && film.link.includes('youtu')) {
                    setActiveVideo(film.link);
                    if (typeof onVideoToggle === 'function') onVideoToggle(true);
                  } else if (film.link) {
                    window.open(film.link, '_blank');
                  }
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer transition-transform duration-300 hover:z-50 hover:scale-105 block w-full h-full will-change-transform transform-gpu"
                style={{
                  transform: film.style.transform,
                  // Use boxShadow instead of filter: drop-shadow for massive performance gains during scroll
                  boxShadow: '0 25px 40px -10px rgba(0,0,0,0.3)'
                }}
              >
              {/* Realistic Tape */}
              <div className="absolute z-30 pointer-events-none origin-center h-10"
                   style={{ 
                     top: film.tape?.top || '-20px',
                     left: film.tape?.left || '50%',
                     transform: `translateX(-50%) rotate(${film.tape?.rotation || '0deg'})`,
                     width: film.tape?.width || '110px'
                   }}>
                {/* Tape contact shadow on paper */}
                <div className="absolute top-1 left-0 w-full h-full bg-black/15 blur-[2px] rounded-sm" />
                {/* Tape material */}
                <div 
                  className="absolute top-0 left-0 w-full h-full bg-[#f4ebd0] opacity-[0.9]" 
                  style={{
                    boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.4), inset 0 -1px 3px rgba(0,0,0,0.1)',
                    clipPath: 'polygon(0% 10%, 2% 0%, 5% 15%, 8% 0%, 12% 10%, 15% 5%, 18% 15%, 22% 0%, 25% 10%, 28% 5%, 32% 12%, 35% 0%, 38% 10%, 42% 5%, 45% 15%, 48% 0%, 52% 10%, 55% 5%, 58% 15%, 62% 0%, 65% 10%, 68% 5%, 72% 12%, 75% 0%, 78% 10%, 82% 5%, 85% 15%, 88% 0%, 92% 10%, 95% 5%, 98% 12%, 100% 5%, 100% 95%, 98% 88%, 95% 100%, 92% 90%, 88% 100%, 85% 85%, 82% 100%, 78% 90%, 75% 100%, 72% 88%, 68% 100%, 65% 90%, 62% 100%, 58% 85%, 55% 100%, 52% 90%, 48% 100%, 45% 85%, 42% 100%, 38% 90%, 35% 100%, 32% 88%, 28% 100%, 25% 90%, 22% 100%, 18% 85%, 15% 100%, 12% 90%, 8% 100%, 5% 85%, 2% 100%, 0% 90%)'
                  }}
                />
                <div className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none" style={{ backgroundImage: subtleNoise }} />
              </div>

              {/* Dynamic Folded Corner */}
              {fold && (
                <div className={fold.wrapperClass} style={{ filter: fold.wrapperFilter }}>
                  <div 
                    className="w-full h-full bg-[#eae5d8]" 
                    style={{ 
                      clipPath: fold.foldClipPath,
                      boxShadow: 'inset 2px -2px 4px rgba(255,255,255,0.4)'
                    }} 
                  />
                </div>
              )}

              {/* Simulated Lifted Corner Shadows */}
              <div className="absolute -bottom-2 left-3 w-[40%] h-[20px] bg-black/25 blur-[10px] rounded-full origin-bottom-left -rotate-3 opacity-80 z-0 pointer-events-none" />
              <div className="absolute -bottom-2 right-3 w-[40%] h-[20px] bg-black/25 blur-[10px] rounded-full origin-bottom-right rotate-3 opacity-80 z-0 pointer-events-none" />
              
              {/* Main Paper Frame (with irregular edges and dynamic corner cut) */}
              <div 
                className="relative w-full h-full bg-[#fbfaf8] overflow-hidden rounded-[1px] z-10"
                style={{
                  clipPath: fold ? fold.mainClipPath : 'polygon(0.5% 0.5%, 99.5% 0.5%, 99.5% 99.5%, 0.5% 99.5%)',
                }}
              >
                {/* Inner container to hold edge shadows and content */}
                <div className="absolute inset-0 w-full h-full"
                     style={{
                       // Stronger dirt, aging, and vignette around the paper borders
                       boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.6), inset 0 0 40px rgba(0,0,0,0.15), inset 0 0 25px rgba(120,100,80,0.25)'
                     }}
                >
                  {/* Printed Image (Inset to create a paper border) */}
                  <div className="absolute inset-[12px] sm:inset-[16px] shadow-[0_2px_4px_rgba(0,0,0,0.1)] overflow-hidden z-10">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 will-change-transform transform-gpu"
                      style={{ 
                        backgroundImage: `url(${film.image})`
                      }}
                    />
                    
                    {/* Dark Overlay gradients restricted to the image area */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
                  </div>

                  {/* Slight corner crease bottom-left */}
                  <div className="absolute bottom-4 left-0 w-[40px] h-[1px] bg-white/20 rotate-45 mix-blend-overlay z-20 pointer-events-none" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />

                  {/* Edge highlights */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-black/10 mix-blend-overlay z-0" />

                  {/* Content Box (Aligned inside the image border) */}
                  <div className="absolute inset-[12px] sm:inset-[16px] p-4 flex flex-col justify-end z-20">
                    <div className="flex gap-4 items-baseline">
                      <div className="flex flex-col">
                        <h3 className="text-3xl md:text-4xl font-bold font-hero tracking-wider uppercase leading-tight text-white group-hover:text-brand-red transition-colors duration-300 drop-shadow-sm">
                          {film.title.split(' ').map((word, i) => (
                            <React.Fragment key={i}>
                              {i === 0 ? <span className="text-brand-red">{word}</span> : word}
                              {i !== film.title.split(' ').length - 1 && ' '}
                            </React.Fragment>
                          ))}
                        </h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 text-[10px] text-[#cfcec8] font-main tracking-widest vertical-rl rotate-180 opacity-60">
                    REDASH FILMS
                  </div>
                </div>
              </div>
              </a>
            </div>
          );
        })}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm pointer-events-auto"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative w-[90%] max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl bg-black" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-brand-red text-white rounded-full flex items-center justify-center transition-colors duration-300 font-bold"
              onClick={() => setActiveVideo(null)}
            >
              ✕
            </button>
            <iframe 
              src={getEmbedUrl(activeVideo)}
              title="Video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full relative z-10 bg-black"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmCollage;
