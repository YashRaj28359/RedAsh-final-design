import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import amazonImg from '../../../assets/Films/ClientLogos/Copy of Amazon Prime Video logo.png';

gsap.registerPlugin(ScrollTrigger);
import jioImg from '../../../assets/Films/ClientLogos/JioStar.png';
import pocketImg from '../../../assets/Films/ClientLogos/Pocket films.png';
import redChilliesImg from '../../../assets/Films/ClientLogos/Red_Chillies_Entertainment_logo_1.jpg';
import starPlusImg from '../../../assets/Films/ClientLogos/Star_plus_29.webp';
import kukuTvImg from '../../../assets/Films/ClientLogos/kuku-tv-logo-1763732193670.webp';
import tangyTvImg from '../../../assets/Films/ClientLogos/tangy tv.jpg';
import secondLastImg from '../../../assets/Films/ClientLogos/2ndlast.png';
import lastImg from '../../../assets/Films/ClientLogos/Last.png';

const clients = [
  { img: jioImg, alt: 'Jio Star', rotate: 'rotate-[-12deg]', pos: 'md:-top-[10%] md:-left-[18%]', size: 'w-32 h-32 md:w-40 md:h-40', shape: 'rounded-full' },
  { img: starPlusImg, alt: 'Star Plus', rotate: 'rotate-[-5deg]', pos: 'md:top-[20%] md:-left-[7%]', size: 'w-32 h-32 md:w-40 md:h-40', shape: 'rounded-full' },
  { img: redChilliesImg, alt: 'Red Chillies', rotate: 'rotate-[5deg]', pos: 'md:top-[50%] md:left-[8%]', size: 'w-32 h-32 md:w-40 md:h-40', shape: 'rounded-full' },
  { img: kukuTvImg, alt: 'Kuku TV', rotate: 'rotate-[12deg]', pos: 'md:top-[75%] md:left-[23%]', size: 'w-32 h-32 md:w-40 md:h-40', shape: 'rounded-full' },
  { img: amazonImg, alt: 'Amazon Prime Video', rotate: 'rotate-[-10deg]', pos: 'md:top-[85%] md:left-[43%]', size: 'w-32 h-32 md:w-40 md:h-40', shape: 'rounded-full' },
  { img: tangyTvImg, alt: 'Tangy TV', rotate: 'rotate-[5deg]', pos: 'md:top-[75%] md:right-[23%]', size: 'w-32 h-32 md:w-40 md:h-40', shape: 'rounded-full' },
  { img: pocketImg, alt: 'Pocket Films', rotate: 'rotate-[-8deg]', pos: 'md:top-[50%] md:right-[8%]', size: 'w-32 h-32 md:w-40 md:h-40', shape: 'rounded-full' },
  { img: secondLastImg, alt: 'Vertical TV', rotate: 'rotate-[10deg]', pos: 'md:top-[20%] md:-right-[7%]', size: 'w-32 h-32 md:w-40 md:h-40', shape: 'rounded-full' },
  { img: lastImg, alt: 'Alright TV', rotate: 'rotate-[-15deg]', pos: 'md:-top-[10%] md:-right-[18%]', size: 'w-32 h-32 md:w-40 md:h-40', shape: 'rounded-full' },
];

const TopGlobalClients = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const desktopLogosRef = useRef([]);
  const mobileLogosRef = useRef([]);

  useGSAP(() => {
    // Desktop Timeline tied to scroll position (scrub)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'bottom 95%',
        scrub: 1, // Smooth scrubbing taking 1 second to catch up
      }
    });

    // 1. Text fades in fast, then unblurs slowly across the entire scroll
    tl.fromTo(textRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
      0 
    );
    tl.fromTo(textRef.current,
      { filter: 'blur(20px)' },
      { filter: 'blur(0px)', duration: 4, ease: 'power2.out' },
      0 
    );

    // 2. Logos fly in as you continue scrolling down
    desktopLogosRef.current.forEach((logo, i) => {
      if (!logo) return;

      let startX = 0;
      let startY = 800; // all fly up from bottom
      
      if (i < 4) startX = -600; 
      else if (i > 4) startX = 600; 

      const startTime = 0.5 + (i * 0.05); // slight stagger
      
      // Fade in quickly
      tl.fromTo(logo,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        startTime
      );
      
      // Fly in and unblur slowly
      tl.fromTo(logo,
        { filter: 'blur(20px)', x: startX, y: startY, scale: 0.2 },
        { filter: 'blur(0px)', x: 0, y: 0, scale: 1, duration: 3, ease: 'power3.out' },
        "<" // start exactly with the fade in
      );
    });

    // Mobile Timeline (scrubbed)
    const tlMobile = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'bottom 95%',
        scrub: 1,
      }
    });

    tlMobile.fromTo(mobileLogosRef.current,
      { opacity: 0, filter: 'blur(20px)', y: 100, scale: 0.5 },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        scale: 1,
        duration: 2,
        stagger: 0.5,
        ease: 'power2.out',
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-20 md:py-32 bg-white relative z-20 flex flex-col items-center justify-center">
      
      {/* Central Container */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 flex flex-col items-center justify-center min-h-[40vh] md:min-h-[60vh] w-full">
        
        {/* Desktop Scattered Sticker Layout */}
        <div className="absolute inset-0 w-full h-full hidden md:block pointer-events-none z-0">
          {clients.map((client, idx) => (
            <div 
              key={idx}
              ref={(el) => (desktopLogosRef.current[idx] = el)}
              className={`absolute ${client.pos} pointer-events-auto z-10 hover:z-30`}
            >
              {/* Inner wrapper handles hover states independent of GSAP */}
              <div className={`transition-transform duration-500 hover:scale-110 hover:-rotate-0 ${client.rotate}`}>
                <div className={`bg-white p-4 shadow-[0px_15px_40px_rgba(0,0,0,0.12)] border-2 border-gray-100 flex items-center justify-center overflow-hidden group ${client.size} ${client.shape}`}>
                  <img src={client.img} alt={client.alt} className="w-full h-full object-contain transition-all duration-500 scale-90 group-hover:scale-105" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Central Heading */}
        <h2 className="-mt-12 md:-mt-[250px] text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-wider font-hero leading-none relative z-20 pointer-events-none drop-shadow-[0_10px_20px_rgba(255,255,255,0.9)] bg-white/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 md:p-0 rounded-3xl">
          <div ref={textRef} className="relative text-center mx-auto w-fit">
            
            {/* Invisible Spacer to preserve perfect center alignment */}
            <div className="relative opacity-0 pointer-events-none select-none" aria-hidden="true">
              ENTERTAINMENT <br />
              PARTNERS
            </div>

            {/* Echo 1 */}
            <div className="absolute inset-0 top-1 left-1 md:top-2 md:left-2 text-transparent [-webkit-text-stroke:1px_#6A6A6A] md:[-webkit-text-stroke:2px_#6A6A6A] z-10 opacity-70 select-none pointer-events-none" aria-hidden="true">
              <span className="[-webkit-text-stroke:1px_#E20002] md:[-webkit-text-stroke:2px_#E20002]">ENTERTAINMENT</span> <br />
              PARTNERS
            </div>

            {/* Echo 2 */}
            <div className="absolute inset-0 top-2 left-2 md:top-4 md:left-4 text-transparent [-webkit-text-stroke:1px_#6A6A6A] md:[-webkit-text-stroke:2px_#6A6A6A] z-0 opacity-40 select-none pointer-events-none" aria-hidden="true">
              <span className="[-webkit-text-stroke:1px_#E20002] md:[-webkit-text-stroke:2px_#E20002]">ENTERTAINMENT</span> <br />
              PARTNERS
            </div>

          </div>
        </h2>

      </div>

      {/* Mobile Grid Layout (visible only on small screens) */}
      <div className="md:hidden mt-12 grid grid-cols-2 gap-4 px-6 w-full relative z-10">
        {clients.map((client, idx) => (
          <div 
            key={idx}
            ref={(el) => (mobileLogosRef.current[idx] = el)}
            className={`bg-white p-4 shadow-lg border border-gray-100 flex items-center justify-center aspect-square ${client.shape} ${idx === clients.length - 1 && clients.length % 2 !== 0 ? 'col-span-2 mx-auto w-2/3' : ''}`}
          >
            <img src={client.img} alt={client.alt} className="w-full h-full object-contain transition-transform duration-300 hover:scale-110" />
          </div>
        ))}
      </div>

    </section>
  );
};

export default TopGlobalClients;
