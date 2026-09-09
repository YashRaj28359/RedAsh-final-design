import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchContent } from '../../../utils/api';

gsap.registerPlugin(ScrollTrigger);
import img1 from '../../../assets/Films/celebs/Ashish - IMG_9131.jpg';
import img2 from '../../../assets/Films/celebs/Surbhi jyoti.png';
import img3 from '../../../assets/Films/celebs/Updendra limaye.png';
import img4 from '../../../assets/Films/celebs/Vidya Malavade.png';
import img5 from '../../../assets/Films/celebs/Zakir_New.jpg';
import img6 from '../../../assets/Films/celebs/Navni Parihar.png';
import img7 from '../../../assets/Films/celebs/durgesh kumar.jpg';
import img8 from '../../../assets/Films/celebs/Pariva Pranati.png';
import img9 from '../../../assets/Films/celebs/Tom Alter.png';
import img10 from '../../../assets/Films/celebs/Seema Biswas.png';
import img11 from '../../../assets/Films/celebs/kiran kumar.jpg';
import img12 from '../../../assets/Films/celebs/Nibeditaa Paal.png';
import img13 from '../../../assets/Films/celebs/Piyush Sahdev.png';

const defaultRow1 = [
  { name: 'Ashish Lal', img: img1 },
  { name: 'Surbhi Jyoti', img: img2 },
  { name: 'Upendra Limaye', img: img3 },
  { name: 'Vidya Malavade', img: img4 },
  { name: 'Zakir Hussain', img: img5 },
  { name: 'Navni Parihar', img: img6 },
  { name: 'Durgesh Kumar', img: img7 },
  { name: 'Pariva Pranati', img: img8 },
  { name: 'Tom Alter', img: img9 }
];

const defaultRow2 = [
  { name: 'Seema Biswas', img: img10 },
  { name: 'Kiran Kumar', img: img11 },
  { name: 'Nibeditaa Paal', img: img12 },
  { name: 'Piyush Sahdev', img: img13 }
];

const CelebritiesSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [row1, setRow1] = useState(defaultRow1);
  const [row2, setRow2] = useState(defaultRow2);

  useEffect(() => {
    fetchContent()
      .then(data => {
        if (data?.entertainment?.featuredCelebs) {
          if (data.entertainment.featuredCelebs.row1 && data.entertainment.featuredCelebs.row1.length > 0) {
            setRow1(data.entertainment.featuredCelebs.row1);
          }
          if (data.entertainment.featuredCelebs.row2 && data.entertainment.featuredCelebs.row2.length > 0) {
            setRow2(data.entertainment.featuredCelebs.row2);
          }
        }
      })
      .catch(err => console.error("Error fetching featured celebs:", err));
  }, []);

  useGSAP(() => {
    gsap.fromTo(textRef.current,
      { opacity: 0, filter: 'blur(20px)', scale: 0.8 },
      { 
        opacity: 1, 
        filter: 'blur(0px)', 
        scale: 1, 
        duration: 1.5, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 1
        }
      }
    );

    // Stagger animation for the celebrity cards
    gsap.fromTo('.celeb-card',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: containerRef });

  const handleCardClick = (index) => {
    // If clicking the currently active card, close it. Otherwise open the new one.
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <section ref={containerRef} className="w-full py-10 md:py-14 bg-white relative overflow-hidden flex flex-col items-center">
      
      <div className="mb-12 md:mb-30 text-center z-10 px-4 relative mt-4">
        <h2 ref={textRef} className="relative text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-widest font-hero mx-auto w-fit cursor-default">
          {/* Invisible Spacer to give the h2 its natural height */}
          <span className="relative opacity-0 pointer-events-none select-none block" aria-hidden="true">
            FEATURED CELEBRITIES
          </span>

          {/* Echo 2 */}
          <span className="absolute top-2 left-2 md:top-4 md:left-4 text-transparent [-webkit-text-stroke:1px_#6A6A6A] md:[-webkit-text-stroke:2px_#6A6A6A] z-0 opacity-40 select-none pointer-events-none" aria-hidden="true">
            FEATURED <span className="[-webkit-text-stroke:1px_#E20002] md:[-webkit-text-stroke:2px_#E20002]">CELEBRITIES</span>
          </span>
          
          {/* Echo 1 */}
          <span className="absolute top-1 left-1 md:top-2 md:left-2 text-transparent [-webkit-text-stroke:1px_#6A6A6A] md:[-webkit-text-stroke:2px_#6A6A6A] z-10 opacity-70 select-none pointer-events-none" aria-hidden="true">
            FEATURED <span className="[-webkit-text-stroke:1px_#E20002] md:[-webkit-text-stroke:2px_#E20002]">CELEBRITIES</span>
          </span>
        </h2>
        
        
      </div>

      {/* Accordion Gallery Container */}
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-12 lg:px-8 flex flex-row lg:flex-col gap-2 lg:gap-3 h-[350px] landscape:h-[280px] lg:landscape:h-auto lg:h-auto overflow-x-auto lg:overflow-visible snap-x lg:snap-none snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Row 1: Celebrities */}
        <div className="contents lg:flex lg:w-full lg:h-[600px] lg:landscape:h-[600px] lg:gap-2">
          {row1.map((celeb, index) => {
            const isActive = activeCard === index;
            return (
              <div 
                key={index}
                onClick={() => handleCardClick(index)}
                className={`celeb-card group relative flex-none h-full w-[75vw] sm:w-[50vw] md:w-[40vw] lg:w-auto lg:flex-1 snap-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] lg:hover:flex-[6] cursor-pointer overflow-hidden rounded-md bg-[#1a1a1a] ${isActive ? 'is-active lg:!flex-[6]' : ''}`}
              >
                <img 
                  src={(celeb.img && !celeb.img.includes('/@fs/') && !celeb.img.includes('localhost:5173')) ? celeb.img : defaultRow1[index % defaultRow1.length]?.img} 
                  alt={celeb.name} 
                  className={`absolute inset-0 w-full h-full object-cover object-top grayscale-0 opacity-100 transition-all duration-700 lg:group-hover:grayscale-0 lg:group-hover:opacity-100 lg:group-hover:scale-105 ${isActive ? 'lg:grayscale-0 lg:opacity-100 lg:scale-105' : 'lg:grayscale lg:opacity-60'}`}
                />
                
                {/* Gradient Overlay for text readability */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 lg:bg-gradient-to-b lg:from-black/80 lg:via-transparent to-black/80 transition-opacity duration-700 lg:group-hover:opacity-100 ${isActive ? 'opacity-100 lg:opacity-100' : 'opacity-100 lg:opacity-0'}`}></div>
                
                {/* Red Accent Block like screenshot (Desktop only) */}
                <div className={`hidden lg:flex absolute top-0 left-0 w-16 h-16 lg:w-24 lg:h-24 bg-brand-red transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 z-10 items-start justify-start p-2 lg:p-4 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                  <div className="w-full h-full border-t-2 border-l-2 border-white/30"></div>
                </div>
                <div className={`hidden lg:flex absolute bottom-0 right-0 w-16 h-16 lg:w-24 lg:h-24 bg-brand-red transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 z-10 items-end justify-end p-2 lg:p-4 ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                  <div className="w-full h-full border-b-2 border-r-2 border-white/30"></div>
                </div>

                {/* Text Overlay (Always visible on mobile at bottom, hover on top for desktop) */}
                <div className={`absolute bottom-4 left-4 lg:top-6 lg:left-6 lg:bottom-auto z-20 transition-all duration-500 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 delay-100 ${isActive ? 'opacity-100 lg:opacity-100 lg:translate-y-0' : 'opacity-100 lg:opacity-0 lg:translate-y-4'}`}>
                  <span className="font-hero text-2xl lg:text-4xl font-bold uppercase tracking-widest text-white drop-shadow-lg whitespace-nowrap block">
                    {celeb.name}
                  </span>
                </div>

                {/* Text Overlay (Unhovered) - vertical text (Desktop only) */}
                <div className={`absolute bottom-6 left-0 w-full justify-center z-10 transition-all duration-300 group-hover:opacity-0 hidden lg:flex pointer-events-none ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                  <span 
                    className="font-main text-xs font-bold uppercase tracking-[0.3em] text-white/70 rotate-180"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    {celeb.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 2: Celebrities - Centered */}
        <div className="contents lg:flex lg:justify-center lg:w-full lg:h-[600px] lg:landscape:h-[600px] lg:gap-2">
          {row2.map((celeb, idx) => {
            const index = idx + row1.length;
            const isActive = activeCard === index;
            return (
              <div 
                key={index}
                onClick={() => handleCardClick(index)}
                className={`celeb-card group relative flex-none h-full w-[75vw] sm:w-[50vw] md:w-[40vw] lg:w-[11.11%] snap-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] lg:hover:w-[42.85%] cursor-pointer overflow-hidden rounded-md bg-[#1a1a1a] ${isActive ? 'is-active lg:!w-[42.85%]' : ''}`}
              >
                <img 
                  src={(celeb.img && !celeb.img.includes('/@fs/') && !celeb.img.includes('localhost:5173')) ? celeb.img : defaultRow2[index % defaultRow2.length]?.img} 
                  alt={celeb.name} 
                  className={`absolute inset-0 w-full h-full object-cover object-top grayscale-0 opacity-100 transition-all duration-700 lg:group-hover:grayscale-0 lg:group-hover:opacity-100 lg:group-hover:scale-105 ${isActive ? 'lg:grayscale-0 lg:opacity-100 lg:scale-105' : 'lg:grayscale lg:opacity-60'}`}
                />
                
                {/* Gradient Overlay for text readability */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 lg:bg-gradient-to-b lg:from-black/80 lg:via-transparent to-black/80 transition-opacity duration-700 lg:group-hover:opacity-100 ${isActive ? 'opacity-100 lg:opacity-100' : 'opacity-100 lg:opacity-0'}`}></div>
                
                {/* Red Accent Block like screenshot (Desktop only) */}
                <div className={`hidden lg:flex absolute top-0 left-0 w-16 h-16 lg:w-24 lg:h-24 bg-brand-red transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 z-10 items-start justify-start p-2 lg:p-4 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                  <div className="w-full h-full border-t-2 border-l-2 border-white/30"></div>
                </div>
                <div className={`hidden lg:flex absolute bottom-0 right-0 w-16 h-16 lg:w-24 lg:h-24 bg-brand-red transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 z-10 items-end justify-end p-2 lg:p-4 ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                  <div className="w-full h-full border-b-2 border-r-2 border-white/30"></div>
                </div>

                {/* Text Overlay (Always visible on mobile at bottom, hover on top for desktop) */}
                <div className={`absolute bottom-4 left-4 lg:top-6 lg:left-6 lg:bottom-auto z-20 transition-all duration-500 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 delay-100 ${isActive ? 'opacity-100 lg:opacity-100 lg:translate-y-0' : 'opacity-100 lg:opacity-0 lg:translate-y-4'}`}>
                  <span className="font-hero text-2xl lg:text-4xl font-bold uppercase tracking-widest text-white drop-shadow-lg whitespace-nowrap block">
                    {celeb.name}
                  </span>
                </div>

                {/* Text Overlay (Unhovered) - vertical text (Desktop only) */}
                <div className={`absolute bottom-6 left-0 w-full justify-center z-10 transition-all duration-300 group-hover:opacity-0 hidden lg:flex pointer-events-none ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                  <span 
                    className="font-main text-xs font-bold uppercase tracking-[0.3em] text-white/70 rotate-180"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    {celeb.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CelebritiesSection;
