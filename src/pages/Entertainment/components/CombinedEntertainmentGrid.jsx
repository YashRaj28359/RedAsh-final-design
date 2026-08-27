import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Import Data
import { microdramaShows } from '../../../data/microdramaShows';

// Import horizontal images directly
import p1 from '../../../assets/Films/Poster/1. Copy of Movie Poster_20x10.webp';
import p2 from '../../../assets/Films/Poster/2. Copy of Horizontal Poster_Main Tumhare Bachche.webp';
import p3 from '../../../assets/Films/Poster/3. Copy of Final Poster_No More MeToo.webp';
import p4 from '../../../assets/Films/Poster/4. Copy of IAYV_Horizontal Poster.webp';
import p5 from '../../../assets/Films/Poster/5. Corona is a Conspiracy.webp';
import p6 from '../../../assets/Films/Poster/6. Hum Azaad Hain.webp';
import p9 from '../../../assets/Films/Poster/9. 100 Short Films_Emerging Leaders.png';
import card2Img from '../../../assets/Films/Cards/Card2.jpg';
import card6Img from '../../../assets/Films/Cards/Card6.png';

// The 9 Horizontal Projects
const horizontalProjects = [
  { id: "h1", title: "WITH LOVE, DELHI!", image: p1, url: 'https://youtu.be/pIv7FFKm318?si=b_CUXqrAAxoaTjq0', isHorizontal: true },
  { id: "h2", title: "THE CODPASTER", image: card2Img, url: 'https://www.mid-day.com/buzzfeed/article/ashish-lal-the-iit-delhi-engineer-turned-actor-teams-up-with-surbhi-jyoti-and-upendra-limaye-9809', isHorizontal: true },
  { id: "h3", title: "MAIN TUMHARE BACHCHE...", image: p2, url: 'https://youtu.be/EhiWSgbQnQU?si=29Z1fEfaRTZqyo6G', isHorizontal: true },
  { id: "h4", title: "NO MORE #METOO", image: p3, url: 'https://youtu.be/5AGZjsdfOio?si=2CgTqSXIUs0_a-Ua', isHorizontal: true },
  { id: "h5", title: "I AM YOUR VOICE", image: p4, url: 'https://youtu.be/BqGm3m3jyhI?si=K2jGDdZAKaOPKXnl', isHorizontal: true },
  { id: "h6", title: "CORONA IS A CONSPIRACY", image: p5, url: 'https://youtu.be/6NusataOZyU?si=xoLP93n-qeuhEqK6', isHorizontal: true },
  { id: "h7", title: "HUM AZAAD HAIN", image: p6, url: 'https://youtu.be/-qHNIXVHT_4?si=rjrWz4zDIGye9Zhw', isHorizontal: true },
  { id: "h8", title: "MUSIC VIDEOS", image: card6Img, url: 'https://youtu.be/6Q0mdzO9A4A?si=w_dZFv_p8FszDoDL', isHorizontal: true, containImage: true },
  { id: "h9", title: "100 SHORT FILMS", image: p9, url: 'https://youtu.be/Rz0El0ooOwM?si=1TkAE07Ek8dbJm1w', isHorizontal: true },
];

// The 26 Vertical Posters
const verticalProjects = microdramaShows.map((item, index) => {
  let newUrl = item.url;
  
  // Update url for kukutv links, except the second video (index 1)
  if (newUrl && newUrl.includes('kukutv.app') && index !== 1) {
    // Replace '/show/' with '/watch/' as per the example format
    newUrl = newUrl.replace('/show/', '/watch/');
    
    // Append '?episode=trailer'
    if (!newUrl.includes('?')) {
      newUrl += '?episode=trailer';
    } else if (!newUrl.includes('episode=trailer')) {
      newUrl += '&episode=trailer';
    }
  }

  return { 
    ...item, 
    url: newUrl, 
    isHorizontal: false 
  };
});

const getEmbedUrl = (url) => {
  if (!url) return '';
  let videoId = '';
  if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  } else if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('watch?v=')[1].split('&')[0];
  } else if (url.includes('youtube.com/embed/')) {
    videoId = url.split('embed/')[1].split('?')[0];
  }
  
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&playsinline=1&rel=0`;
  }
  return url;
};

const CombinedEntertainmentGrid = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  useEffect(() => {
    if (selectedVideoUrl) {
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

      const handleBlur = () => {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
          if (iframe.src.includes('youtube.com')) {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          }
        });
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("pagehide", handleVisibilityChange);
      window.addEventListener("blur", handleBlur);

      return () => { 
        document.body.style.overflow = 'unset'; 
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("pagehide", handleVisibilityChange);
        window.removeEventListener("blur", handleBlur);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedVideoUrl]);

  // Generate the Combined Rows using the specific requested pattern
  // Row 1: V, H, V
  // Row 2: V, V, H
  // Row 3: H, V, V
  const rows = [];
  let vIdx = 0;
  let hIdx = 0;
  let patternIdx = 0;

  // Fill rows based on pattern until we run out of horizontal videos
  while (hIdx < horizontalProjects.length) {
    const rowType = patternIdx % 3;
    const rowItems = [];
    
    if (rowType === 0) { // V, H, V
      if (vIdx < verticalProjects.length) rowItems.push(verticalProjects[vIdx++]);
      rowItems.push(horizontalProjects[hIdx++]);
      if (vIdx < verticalProjects.length) rowItems.push(verticalProjects[vIdx++]);
    } else if (rowType === 1) { // V, V, H
      if (vIdx < verticalProjects.length) rowItems.push(verticalProjects[vIdx++]);
      if (vIdx < verticalProjects.length) rowItems.push(verticalProjects[vIdx++]);
      rowItems.push(horizontalProjects[hIdx++]);
    } else { // H, V, V
      rowItems.push(horizontalProjects[hIdx++]);
      if (vIdx < verticalProjects.length) rowItems.push(verticalProjects[vIdx++]);
      if (vIdx < verticalProjects.length) rowItems.push(verticalProjects[vIdx++]);
    }
    
    rows.push(rowItems);
    patternIdx++;
  }

  // Any remaining vertical posters go into rows of 4 at the bottom
  let leftoverRow = [];
  while (vIdx < verticalProjects.length) {
    leftoverRow.push(verticalProjects[vIdx++]);
    if (leftoverRow.length === 4 || vIdx === verticalProjects.length) {
      rows.push(leftoverRow);
      leftoverRow = [];
    }
  }

  // Flatten for GSAP animation references
  const allRenderedItems = rows.flat();

  useGSAP(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, filter: 'blur(10px)', y: 30 },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: containerRef });

  const handleItemClick = (url) => {
    if (!url) return;
    if (url.includes('youtu')) {
      setSelectedVideoUrl(url);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <section id="films" ref={containerRef} className="w-full pt-16 md:pt-24 pb-16 lg:pb-24 bg-white relative flex flex-col items-center">
      
      {/* Heading */}
      <div className="w-full flex flex-col items-center justify-center text-center mb-12 md:mb-20 px-4 mt-6 select-none">
        <div className="relative inline-flex flex-col items-center">
          
          {/* Text with Top-Left Accent */}
          <div className="relative">
            {/* Top Left Red Accent */}
            <div className="absolute -top-4 md:-top-6 left-0 w-10 md:w-16 h-1 md:h-1.5 bg-brand-red"></div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-hero text-neutral-950 leading-none tracking-[0.15em] md:tracking-[0.2em] uppercase scale-y-110 flex flex-wrap justify-center items-center gap-x-3 md:gap-x-5 gap-y-2">
              <span>SELECTED</span>
              <span className="text-brand-red">ENTERTAINMENT</span>
              <span>FILMS</span>
            </h2>
          </div>

          {/* Bottom Decorative Line */}
          <div className="flex items-center mt-8 md:mt-12 w-[200%] sm:w-[150%] md:w-[120%] lg:w-[100%] min-w-[300px] max-w-4xl justify-center opacity-80">
            <div className="flex-1 h-[1px] bg-neutral-300"></div>
            
            <div className="flex items-center mx-3 md:mx-6">
              {/* Left slanted marks */}
              <div className="flex gap-[2px] md:gap-1">
                <div className="w-1 md:w-1.5 h-1.5 md:h-2 bg-brand-red skew-x-[-30deg]"></div>
                <div className="w-1 md:w-1.5 h-1.5 md:h-2 bg-brand-red skew-x-[-30deg]"></div>
                <div className="w-1 md:w-1.5 h-1.5 md:h-2 bg-brand-red skew-x-[-30deg]"></div>
              </div>
              
              {/* Center line */}
              <div className="w-8 md:w-16 h-1.5 md:h-2 bg-brand-red mx-1.5 md:mx-3"></div>
              
              {/* Right slanted marks */}
              <div className="flex gap-[2px] md:gap-1">
                <div className="w-1 md:w-1.5 h-1.5 md:h-2 bg-brand-red skew-x-[-30deg]"></div>
                <div className="w-1 md:w-1.5 h-1.5 md:h-2 bg-brand-red skew-x-[-30deg]"></div>
                <div className="w-1 md:w-1.5 h-1.5 md:h-2 bg-brand-red skew-x-[-30deg]"></div>
              </div>
            </div>
            
            <div className="flex-1 h-[1px] bg-neutral-300"></div>
          </div>
          
        </div>
      </div>

      {/* Justified Row Layout Container */}
      <div className="w-full max-w-[1920px] px-0.5 flex flex-col gap-1 sm:gap-2">
        {rows.map((row, rowIdx) => (
          <div key={`row-${rowIdx}`} className="flex flex-row w-full gap-1 sm:gap-2">
            {row.map((item, colIdx) => (
              <div 
                key={`${item.id}-${colIdx}`}
                ref={(el) => {
                  // Find absolute index for GSAP stagger array
                  let absIdx = 0;
                  for (let i = 0; i < rowIdx; i++) absIdx += rows[i].length;
                  absIdx += colIdx;
                  cardsRef.current[absIdx] = el;
                }}
                onClick={() => handleItemClick(item.url)}
                className="relative rounded-md overflow-hidden group cursor-pointer bg-black shadow-lg hover:shadow-2xl transition-all duration-300 flex-shrink-0"
                style={{
                  flex: item.isHorizontal ? 1.777 : 0.666,
                  aspectRatio: item.isHorizontal ? '16/9' : '2/3'
                }}
              >
                {/* Image */}
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className={`absolute inset-0 w-full h-full transition-transform duration-500 
                      ${item.containImage ? 'object-contain' : 'object-cover'}
                      ${item.scaleClass || ''} 
                      ${item.hoverScaleClass || 'group-hover:scale-105'}
                      ${item.objectPos || 'object-center'}
                    `} 
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center group-hover:scale-105 transition-all duration-500">
                     <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold text-center px-2">Poster Placeholder</span>
                  </div>
                )}

                {/* Title Gradient Overlay for Horizontal Items */}
                {item.isHorizontal && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                )}

                {/* Play Button Icon for Video Links */}
                {item.url && item.url.includes('youtu') && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                      <FiPlay className="w-4 h-4 md:w-6 md:h-6 text-white ml-1 drop-shadow-md" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* YT Video Modal Pop-out */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedVideoUrl && (
            <motion.div 
              className="fixed top-0 left-0 w-screen h-[100dvh] z-[2147483647] flex items-center justify-center bg-black/95 p-4 md:p-12 pointer-events-auto"
              onClick={() => setSelectedVideoUrl(null)}
              style={{ touchAction: 'none' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="relative w-[90%] max-w-5xl aspect-video bg-black rounded-xl shadow-2xl mt-16 md:mt-24 pointer-events-auto" 
                onClick={e => e.stopPropagation()}
                style={{ touchAction: 'auto' }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <button 
                  onClick={() => setSelectedVideoUrl(null)} 
                  className="absolute -top-12 md:-top-16 right-0 z-20 w-10 h-10 bg-black/50 hover:bg-brand-red text-white rounded-full flex items-center justify-center transition-colors duration-300 font-bold pointer-events-auto"
                >
                  ✕
                </button>
                <iframe 
                  id="yt-iframe"
                  className="w-full h-full rounded-xl pointer-events-auto"
                  src={getEmbedUrl(selectedVideoUrl)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ pointerEvents: 'auto', touchAction: 'auto' }}
                ></iframe>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
      
    </section>
  );
};

export default CombinedEntertainmentGrid;
