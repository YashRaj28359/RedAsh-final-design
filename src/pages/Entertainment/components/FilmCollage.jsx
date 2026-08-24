import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import card1Img from "../../../assets/Films/Cards/Card1.jpg";
import card2Img from "../../../assets/Films/Cards/Card2.jpg";
import card3Img from "../../../assets/Films/Cards/Card3.png";
import card5Img from "../../../assets/Films/Cards/Card5.png";
import card6Img from "../../../assets/Films/Cards/Card6.png";
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const films = [
  {
    id: "01",
    title: "MOVIES",
    subtitle: "LARGER THAN LIFE.",
    link: "https://youtu.be/pIv7FFKm318",
    image: card1Img,
    style: { top: '5%', left: '6%', zIndex: 10, width: '250px', height: '350px', transform: 'rotate(0deg)' },
    // 📱 MOBILE CONTROLS: Tweak top and left values below to move this specific card on mobile view
    mobileStyle: { top: '5%', left: '-50%' },
    // 🌄 LANDSCAPE CONTROLS: Tweak these for mobile horizontal view specifically
    landscapeStyle: { top: '-80%', left: '-150%', width: '300px', height: '450px' },
    foldCorner: 'top-left',
    tape: { top: '-12px', left: '45%', rotation: '-15deg', width: '110px' }
  },
  {
    id: "02",
    title: "WEB SERIES",
    subtitle: "EPISODES THAT\nKEEP YOU HOOKED.",
    link: "https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/ashish-lal-explores-friendship-and-loss-in-the-codpaster/articleshow/131854264.cms",
    image: card2Img,
    style: { top: '6%', left: '36%', zIndex: 20, width: '500px', height: '300px', transform: 'rotate(0deg)' },
    // 📱 MOBILE CONTROLS: Tweak top and left values below to move this specific card on mobile view
    mobileStyle: { top: '6%', left: '10%' },
    // 🌄 LANDSCAPE CONTROLS: Tweak these for mobile horizontal view specifically
    landscapeStyle: { top: '-75%', left: '-65%', width: '600px', height: '400px' },
    foldCorner: 'bottom-right',
    tape: { top: '-12px', left: '75%', rotation: '18deg', width: '90px' }
  },
  {
    id: "03",
    title: "MICRO DRAMAS",
    subtitle: "SHORT STORIES.\nBIG IMPACT.",
    link: "https://kukutv.app/show/billionaire-on-plane",
    image: card3Img,
    style: { top: '4%', left: '94%', zIndex: 15, width: '280px', height: '380px', transform: 'rotate(0deg)' },
    // 📱 MOBILE CONTROLS: Tweak top and left values below to move this specific card on mobile view
    mobileStyle: { top: '4%', left: '125%' },
    // 🌄 LANDSCAPE CONTROLS: Tweak these for mobile horizontal view specifically
    landscapeStyle: { top: '-80%', left: '90%', width: '300px', height: '450px' },
    foldCorner: 'top-right',
    tape: { top: '-12px', left: '20%', rotation: '-38deg', width: '100px' }
  },
  {
    id: "04",
    title: "SHORT FILMS",
    subtitle: "MORE EXPERIMENTS.\nMORE PERSPECTIVES.",
    link: "https://www.youtube.com/watch?v=5AGZjsdfOio",
    image: "https://img.youtube.com/vi/5AGZjsdfOio/hqdefault.jpg",
    style: { top: '50%', left: '4%', zIndex: 25, width: '380px', height: '280px', transform: 'rotate(0deg)' },
    // 📱 MOBILE CONTROLS: Tweak top and left values below to move this specific card on mobile view
    mobileStyle: { top: '50%', left: '-52%' },
    // 🌄 LANDSCAPE CONTROLS: Tweak these for mobile horizontal view specifically
    landscapeStyle: { top: '-25%', left: '-150%', width: '450px', height: '330px' },
    foldCorner: 'bottom-left',
    tape: { top: '-12px', left: '25%', rotation: '2deg', width: '130px' }
  },
  {
    id: "05",
    title: "AI FILMS",
    subtitle: "THE FUTURE OF\nSTORYTELLING.",
    link: "https://youtube.com/shorts/AKAxDl0W9jU",
    image: card5Img,
    style: { top: '44%', left: '47%', zIndex: 40, width: '280px', height: '380px', transform: 'rotate(0deg)' },
    // 📱 MOBILE CONTROLS: Tweak top and left values below to move this specific card on mobile view
    mobileStyle: { top: '44%', left: '30%' },
    // 🌄 LANDSCAPE CONTROLS: Tweak these for mobile horizontal view specifically
    landscapeStyle: { top: '-24%', left: '-38%', width: '350px', height: '400px' },
    foldCorner: 'top-left',
    tape: { top: '-12px', left: '45%', rotation: '-15deg', width: '110px' }
  },
  {
    id: "06",
    title: "MUSIC VIDEOS",
    subtitle: "VISUALS THAT\nAMPLIFY SOUND.",
    link: "https://youtu.be/6Q0mdzO9A4A",
    image: card6Img,
    style: { top: '56%', left: '79%', zIndex: 30, width: '450px', height: '250px', transform: 'rotate(0deg)' },
    // 📱 MOBILE CONTROLS: Tweak top and left values below to move this specific card on mobile view
    mobileStyle: { top: '56%', left: '89%' },
    // 🌄 LANDSCAPE CONTROLS: Tweak these for mobile horizontal view specifically
    landscapeStyle: { top: '-20%', left: '57%', width: '550px', height: '350px' },
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
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';

      const handleVisibilityChange = () => {
        if (document.hidden || document.visibilityState === 'hidden') {
          const iframes = document.querySelectorAll('iframe');
          iframes.forEach(iframe => {
            if (iframe.src.includes('youtube.com')) {
              iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
          });
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("pagehide", handleVisibilityChange);

      return () => { 
        document.body.style.overflow = 'unset'; 
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("pagehide", handleVisibilityChange);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeVideo]);

  useGSAP(() => {
    // Initial entrance animations
    // 1st card from left edge
    gsap.fromTo('.film-card-0', { x: -1500, opacity: 0 }, { x: 0, opacity: 1, duration: 1.8, delay: 0.5, ease: 'expo.out' });
    // 2nd card from top edge
    gsap.fromTo('.film-card-1', { y: -1500, opacity: 0 }, { y: 0, opacity: 1, duration: 1.8, delay: 0.5, ease: 'expo.out' });
    // 3rd card from right edge
    gsap.fromTo('.film-card-2', { x: 1500, opacity: 0 }, { x: 0, opacity: 1, duration: 1.8, delay: 0.5, ease: 'expo.out' });
    // 4th, 5th, and 6th card from bottom edge
    gsap.fromTo('.film-card-3, .film-card-4, .film-card-5', { y: 1500, opacity: 0 }, { y: 0, opacity: 1, duration: 1.8, delay: 0.5, ease: 'expo.out' });

    // Scroll parallax scatter and blur effect (Desktop only)
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Animate them outwards (relative to their positions) and blur them
      tl.to('.film-card-0', { x: -800, y: -400, filter: 'blur(20px)', opacity: 0 }, 0)
        .to('.film-card-1', { x: -600, y: -600, filter: 'blur(20px)', opacity: 0 }, 0)
        .to('.film-card-2', { x: 800, y: -400, filter: 'blur(20px)', opacity: 0 }, 0)
        .to('.film-card-3', { x: -800, y: 400, filter: 'blur(20px)', opacity: 0 }, 0)
        .to('.film-card-4', { x: 0, y: 800, filter: 'blur(20px)', opacity: 0 }, 0)
        .to('.film-card-5', { x: 800, y: 400, filter: 'blur(20px)', opacity: 0 }, 0);
    });

    return () => mm.revert();
  }, { scope: containerRef });

  useEffect(() => {
    if (onVideoToggle) {
      onVideoToggle(!!activeVideo);
    }
  }, [activeVideo, onVideoToggle]);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/shorts/')) {
      videoId = url.split('youtube.com/shorts/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch')) {
      try {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get('v');
      } catch (e) { return url; }
    }
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&playsinline=1&rel=0`;
    }
    return url;
  };

  return (
    <div ref={containerRef} className="relative w-full h-full lg:min-h-[850px] overflow-hidden landscape:overflow-visible lg:overflow-visible flex items-start lg:items-center justify-center lg:justify-start z-50">
      <div className="relative w-[900px] h-[850px] scale-[0.35] sm:scale-[0.45] md:scale-75 lg:scale-[0.6] xl:scale-[0.75] 2xl:scale-[0.9] landscape:scale-[0.3] md:landscape:scale-[0.35] lg:landscape:scale-[0.6] xl:landscape:scale-[0.75] origin-top lg:origin-left landscape:origin-center lg:landscape:origin-left transition-transform duration-500 mt-4 lg:mt-0 -ml-12 lg:ml-0 landscape:ml-0 lg:landscape:ml-0">
        {films.map((film, index) => {
          const fold = getFoldConfig(film.foldCorner);
          
          let currentStyle = film.style;
          if (isMobile) {
            if (isLandscape && film.landscapeStyle) {
              currentStyle = { ...film.style, ...film.mobileStyle, ...film.landscapeStyle };
            } else if (film.mobileStyle) {
              currentStyle = { ...film.style, ...film.mobileStyle };
            }
          }
          
          return (
            <div 
              key={film.id}
              className={`film-card-${index} absolute`}
              style={{
                top: currentStyle.top,
                left: currentStyle.left,
                zIndex: currentStyle.zIndex,
                width: currentStyle.width,
                height: currentStyle.height
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

                  {/* Bottom Left Content Box (Number + Title) */}
                  <div className="absolute inset-[12px] sm:inset-[16px] p-4 sm:p-6 flex flex-row items-end justify-start z-20 pointer-events-none gap-3 sm:gap-4">
                    {/* Number */}
                    <span className="text-white/90 font-hero text-[70px] sm:text-[85px] lg:text-[50px] xl:text-[60px] leading-[0.8] font-bold tracking-normal drop-shadow-md group-hover:text-brand-red transition-colors duration-300">
                      {film.id}
                    </span>
                    
                    {/* Title */}
                    <div className="flex flex-col translate-y-1.5">
                      <h3 className="text-[46px] sm:text-[56px] lg:text-2xl xl:text-3xl font-bold font-hero tracking-wider uppercase leading-[0.85] text-white drop-shadow-sm">
                        {film.title.split(' ').map((word, i) => (
                          <React.Fragment key={i}>
                            <span className={i === 0 ? "text-white lg:text-brand-red lg:group-hover:text-white transition-colors duration-300" : "text-white lg:group-hover:text-brand-red transition-colors duration-300"}>
                              {word}
                            </span>
                            {i !== film.title.split(' ').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </h3>
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
      {typeof document !== 'undefined' && createPortal(
        <>
          {activeVideo && (
            <div 
              className="fixed top-0 left-0 w-screen h-[100dvh] z-[2147483647] flex items-center justify-center bg-black/95 pointer-events-auto"
              onClick={() => setActiveVideo(null)}
              style={{ touchAction: 'none' }}
            >
              <div 
                className="relative w-[90%] max-w-5xl aspect-video rounded-xl shadow-2xl bg-black mt-16 md:mt-24 pointer-events-auto" 
                onClick={e => e.stopPropagation()}
                style={{ touchAction: 'auto' }}
              >
                <button 
                  className="absolute -top-12 md:-top-16 right-0 z-20 w-10 h-10 bg-black/50 hover:bg-brand-red text-white rounded-full flex items-center justify-center transition-colors duration-300 font-bold pointer-events-auto"
                  onClick={() => setActiveVideo(null)}
                >
                  ✕
                </button>
                <iframe 
                  id="yt-iframe"
                  src={getEmbedUrl(activeVideo)}
                  title="Video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full relative z-10 bg-black rounded-xl pointer-events-auto"
                  style={{ pointerEvents: 'auto', touchAction: 'auto' }}
                ></iframe>
              </div>
            </div>
          )}
        </>,
        document.body
      )}
    </div>
  );
};

export default FilmCollage;
