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
  { img: jioImg, alt: 'Jio Star', rotate: 'rotate-[-12deg]', pos: 'md:-top-[10%] md:-left-[5%]', size: 'w-24 h-24 lg:w-32 lg:h-32', shape: 'rounded-full' },
  { img: starPlusImg, alt: 'Star Plus', rotate: 'rotate-[-5deg]', pos: 'md:top-[20%] md:left-[0%]', size: 'w-24 h-24 lg:w-32 lg:h-32', shape: 'rounded-full' },
  { img: redChilliesImg, alt: 'Red Chillies', rotate: 'rotate-[5deg]', pos: 'md:top-[50%] md:left-[10%]', size: 'w-24 h-24 lg:w-32 lg:h-32', shape: 'rounded-full' },
  { img: kukuTvImg, alt: 'Kuku TV', rotate: 'rotate-[12deg]', pos: 'md:top-[75%] md:left-[25%]', size: 'w-24 h-24 lg:w-32 lg:h-32', shape: 'rounded-full' },
  { img: amazonImg, alt: 'Amazon Prime Video', rotate: 'rotate-[-10deg]', pos: 'md:top-[85%] md:left-[43%]', size: 'w-24 h-24 lg:w-32 lg:h-32', shape: 'rounded-full' },
  { img: tangyTvImg, alt: 'Tangy TV', rotate: 'rotate-[5deg]', pos: 'md:top-[75%] md:right-[25%]', size: 'w-24 h-24 lg:w-32 lg:h-32', shape: 'rounded-full' },
  { img: pocketImg, alt: 'Pocket Films', rotate: 'rotate-[-8deg]', pos: 'md:top-[50%] md:right-[10%]', size: 'w-24 h-24 lg:w-32 lg:h-32', shape: 'rounded-full' },
  { img: secondLastImg, alt: 'Vertical TV', rotate: 'rotate-[10deg]', pos: 'md:top-[20%] md:right-[0%]', size: 'w-24 h-24 lg:w-32 lg:h-32', shape: 'rounded-full' },
  { img: lastImg, alt: 'Alright TV', rotate: 'rotate-[-15deg]', pos: 'md:-top-[10%] md:-right-[5%]', size: 'w-24 h-24 lg:w-32 lg:h-32', shape: 'rounded-full' },
];

import { fetchContent } from '../../../utils/api';

const TopGlobalClients = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const desktopLogosRef = useRef([]);
  const mobileLogosRef = useRef([]);
  const [dbClients, setDbClients] = React.useState(null);

  React.useEffect(() => {
    fetchContent()
      .then(data => {
        if (data?.entertainment?.clients && data.entertainment.clients.length > 0) {
          const valid = data.entertainment.clients.filter(c => c && c.img && !c.img.includes('/@fs/') && !c.img.includes('localhost:5173'));
          if (valid.length > 0) setDbClients(valid);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const activeClients = dbClients || clients;

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Desktop Animation
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'bottom 95%',
          scrub: 1,
        }
      });

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
    });

    // Mobile Animation (Much faster, unblurs instantly)
    mm.add("(max-width: 1023px)", () => {
      const tlMobile = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'top 40%', // Finishes much earlier on scroll
          scrub: 1,
        }
      });

      tlMobile.fromTo(textRef.current,
        { opacity: 0, filter: 'blur(10px)', scale: 0.9 },
        { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.5, ease: 'power2.out' },
        0 
      );

      tlMobile.fromTo(mobileLogosRef.current,
        { opacity: 0, filter: 'blur(5px)', y: 30, scale: 0.9 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
        },
        0.2 // slight delay after text
      );
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full pt-18 md:pt-20 pb-8 landscape:pb-0 lg:landscape:pb-32 lg:pb-32 bg-white relative z-20 flex flex-col items-center justify-center">
      
      {/* Central Container */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 flex flex-col items-center justify-center w-full">
        
        {/* Central Heading */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wider font-hero leading-none relative z-20 pointer-events-none drop-shadow-[0_10px_20px_rgba(255,255,255,0.9)] bg-white/40 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-6 md:p-0 rounded-3xl mb-4">
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

      {/* Desktop Hanging Lanyard Logo Marquee (Moving Right to Left Edge to Edge) */}
      <div className="w-full hidden lg:block overflow-hidden relative pointer-events-auto py-6 mt-4">
        
        {/* Top Suspension Cable Line */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#E20002]/50 to-transparent absolute top-0 left-0"></div>

        {/* Marquee Track - Continuous 100% Seamless Infinite Loop */}
        <div className="animate-marquee-left flex items-center">
          {/* Set 1 */}
          <div className="flex gap-12 items-center pr-12">
            {activeClients.map((client, idx) => (
              <div key={`s1-${idx}`} className="flex items-center justify-center group flex-none py-4">
                {/* Circular White Floating Logo Badge with Soft Drop Shadow */}
                <div className="bg-white p-4 shadow-[0px_20px_45px_rgba(0,0,0,0.12)] border-2 border-gray-100 flex items-center justify-center overflow-hidden rounded-full w-28 h-28 lg:w-32 lg:h-32 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0px_25px_50px_rgba(226,0,2,0.25)] group-hover:border-[#E20002]/30">
                  <img 
                    src={(client.img && !client.img.includes('/@fs/') && !client.img.includes('localhost:5173')) ? client.img : clients[idx % clients.length]?.img} 
                    alt={client.name || client.alt} 
                    className="w-full h-full object-contain transition-all duration-300 scale-90 group-hover:scale-105" 
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Set 2 (Identical Duplicate for Seamless -50% Loop) */}
          <div className="flex gap-12 items-center pr-12">
            {activeClients.map((client, idx) => (
              <div key={`s2-${idx}`} className="flex items-center justify-center group flex-none py-4">
                {/* Circular White Floating Logo Badge with Soft Drop Shadow */}
                <div className="bg-white p-4 shadow-[0px_20px_45px_rgba(0,0,0,0.12)] border-2 border-gray-100 flex items-center justify-center overflow-hidden rounded-full w-28 h-28 lg:w-32 lg:h-32 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0px_25px_50px_rgba(226,0,2,0.25)] group-hover:border-[#E20002]/30">
                  <img 
                    src={(client.img && !client.img.includes('/@fs/') && !client.img.includes('localhost:5173')) ? client.img : clients[idx % clients.length]?.img} 
                    alt={client.name || client.alt} 
                    className="w-full h-full object-contain transition-all duration-300 scale-90 group-hover:scale-105" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Grid Layout (visible only on small screens) */}
      <div className="lg:hidden mt-2 px-6 w-full relative z-10 overflow-x-auto pb-6 landscape:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex flex-col gap-4 w-max mx-auto">
          {/* Row 1 */}
          <div className="flex gap-4">
            {activeClients.slice(0, Math.ceil(activeClients.length / 2)).map((client, idx) => (
              <div 
                key={`r1-${idx}`}
                className="bg-white p-3 shadow-lg border border-gray-100 flex items-center justify-center aspect-square w-28 sm:w-32 overflow-hidden flex-none rounded-full"
              >
                <img src={(client.img && !client.img.includes('/@fs/') && !client.img.includes('localhost:5173')) ? client.img : clients[idx % clients.length]?.img} alt={client.name || client.alt} className="w-full h-full object-contain transition-transform duration-300 hover:scale-110" />
              </div>
            ))}
          </div>
          {/* Row 2 */}
          <div className="flex gap-4 justify-center">
            {activeClients.slice(Math.ceil(activeClients.length / 2)).map((client, idx) => (
              <div 
                key={`r2-${idx}`}
                className="bg-white p-3 shadow-lg border border-gray-100 flex items-center justify-center aspect-square w-28 sm:w-32 overflow-hidden flex-none rounded-full"
              >
                <img src={(client.img && !client.img.includes('/@fs/') && !client.img.includes('localhost:5173')) ? client.img : clients[idx % clients.length]?.img} alt={client.name || client.alt} className="w-full h-full object-contain transition-transform duration-300 hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default TopGlobalClients;
