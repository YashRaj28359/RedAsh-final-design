import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

const celebs = [
  { name: 'Ashish Lal', img: img1 },
  { name: 'Surbhi Jyoti', img: img2 },
  { name: 'Upendra Limaye', img: img3 },
  { name: 'Vidya Malavade', img: img4 },
  { name: 'Zakir Hussain', img: img5 },
  { name: 'Navni Parihar', img: img6 },
  { name: 'Durgesh Kumar', img: img7 },
  { name: 'Pariva Pranati', img: img8 },
  { name: 'Tom Alter', img: img9 },
  { name: 'Seema Biswas', img: img10 },
  { name: 'Kiran Kumar', img: img11 }
];

const CelebritiesSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

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
      <div className="w-full max-w-[1920px] mx-auto px-2 md:px-8 mb-8 md:mb-12">
        <div className="flex w-full h-[400px] md:h-[500px] lg:h-[600px] gap-1 md:gap-2">
          {celebs.map((celeb, index) => (
            <div 
              key={index} 
              className="celeb-card group relative flex-1 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:flex-[5] md:hover:flex-[6] cursor-pointer overflow-hidden rounded-md bg-[#1a1a1a]"
            >
              <img 
                src={celeb.img} 
                alt={celeb.name} 
                className="absolute inset-0 w-full h-full object-cover object-top grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
              />
              
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Red Accent Block like screenshot */}
              <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-brand-red opacity-0 transition-all duration-500 -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 z-10 flex items-start justify-start p-2 md:p-4">
                <div className="w-full h-full border-t-2 border-l-2 border-white/30"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-brand-red opacity-0 transition-all duration-500 translate-x-full group-hover:translate-x-0 group-hover:opacity-100 z-10 flex items-end justify-end p-2 md:p-4">
                <div className="w-full h-full border-b-2 border-r-2 border-white/30"></div>
              </div>

              {/* Text Overlay (Hovered) */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 opacity-0 transition-all duration-500 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 delay-100">
                <span className="font-hero text-lg md:text-2xl lg:text-4xl font-bold uppercase tracking-widest text-white drop-shadow-lg whitespace-nowrap block">
                  {celeb.name}
                </span>
              </div>

              {/* Text Overlay (Unhovered) - vertical text */}
              <div className="absolute bottom-6 left-0 w-full flex justify-center z-10 opacity-100 transition-all duration-300 group-hover:opacity-0 hidden md:flex pointer-events-none">
                <span 
                  className="font-main text-xs font-bold uppercase tracking-[0.3em] text-white/70 rotate-180"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  {celeb.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CelebritiesSection;
