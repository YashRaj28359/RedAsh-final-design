import React, { useRef, useEffect, useState } from 'react';
import { microdramaShows } from '../../../data/microdramaShows';
import gsap from 'gsap';

const HangingCardsCarousel = () => {
  const trackRef = useRef(null);
  const totalItems = microdramaShows.length;
  const currentIndexRef = useRef(totalItems);
  const [activeIndex, setActiveIndex] = useState(totalItems);

  // We triple the array to provide buffer on both left and right for seamless infinite scrolling
  const duplicatedShows = [...microdramaShows, ...microdramaShows, ...microdramaShows];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = track.children;
    if (items.length < 2) return;

    // Set initial position to the start of the middle set
    const setInitialPosition = () => {
      if (!trackRef.current) return;
      const currentItems = trackRef.current.children;
      const stepWidth = currentItems[1].offsetLeft - currentItems[0].offsetLeft;
      if (stepWidth > 0) {
        gsap.set(trackRef.current, { x: -(totalItems * stepWidth) });
      }
    };
    setInitialPosition();
    setTimeout(setInitialPosition, 100); // Failsafe for layout shifts

    const interval = setInterval(() => {
      if (!trackRef.current || !trackRef.current.children[1]) return;
      
      // Calculate dynamically each tick to avoid layout timing issues
      const currentItems = trackRef.current.children;
      const stepWidth = currentItems[1].offsetLeft - currentItems[0].offsetLeft;
      
      currentIndexRef.current++;
      setActiveIndex(currentIndexRef.current);
      
      gsap.to(track, {
        x: -(currentIndexRef.current * stepWidth),
        duration: 1, // Move for 1 second
        ease: "power2.inOut",
        onComplete: () => {
          // If we reached the end of the middle set, snap back to the start of the middle set
          if (currentIndexRef.current >= totalItems * 2) {
            currentIndexRef.current = totalItems;
            setActiveIndex(totalItems);
            gsap.set(track, { x: -(totalItems * stepWidth) });
          }
        }
      });
    }, 3000); // Wait 2 seconds, then move for 1 second

    // Handle resize to snap to current index
    const handleResize = () => {
      if (!trackRef.current || !trackRef.current.children[1]) return;
      const items = trackRef.current.children;
      const stepWidth = items[1].offsetLeft - items[0].offsetLeft;
      gsap.set(track, { x: -(currentIndexRef.current * stepWidth) });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      gsap.killTweensOf(track);
    };
  }, [totalItems]);

  return (
    <div className="w-full relative py-20 bg-[#F8F9FA] z-40">

      
      {/* Curved SVG string in the background */}
      <div className="absolute top-0 left-0 w-full h-[300px] pointer-events-none overflow-hidden hidden md:block">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full stroke-gray-300 stroke-[0.2] fill-none opacity-50">
          <path d="M 0 30 Q 50 100 100 30" />
        </svg>
      </div>
      
      {/* The scrolling track */}
      <div className="w-full relative z-10 flex pt-10">
        <div 
          ref={trackRef} 
          className="flex flex-nowrap gap-8 md:gap-16 items-start w-max pl-[calc(50vw-90px)] sm:pl-[calc(50vw-110px)] md:pl-[calc(50vw-130px)]"
        >
          
          {duplicatedShows.map((show, index) => {
            // Apply slight random alternating rotations mimicking hanging
            const rotation = (index % 2 === 0 ? 3 : -2) + (index % 3 === 0 ? 1 : -1);
            // Apply staggered vertical offsets for the curved look
            const yOffset = index % 3 === 1 ? 20 : (index % 3 === 2 ? 40 : 0);
            
            // By using modulo, the duplicated item scales perfectly in sync with the original, hiding the infinite reset snap.
            const isActive = (index % microdramaShows.length) === (activeIndex % microdramaShows.length);

            return (
              <div 
                key={`${show.id}-${index}`}
                className="relative flex-shrink-0"
                style={{
                  transform: `translateY(${yOffset}px) rotate(${rotation}deg)`
                }}
              >
                <a 
                  href={show.url || "#"} 
                  target={show.url ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`group relative flex flex-col items-center cursor-pointer transition-all duration-[1000ms] ease-in-out ${isActive ? 'scale-110 md:scale-125 z-40' : 'scale-100 hover:scale-105 z-10'}`}
                  onPointerDown={(e) => {
                    if (e.button !== 0 && e.pointerType === 'mouse') return;
                    e.currentTarget.setPointerCapture(e.pointerId);
                    e.currentTarget.dataset.downX = e.clientX;
                    e.currentTarget.dataset.downY = e.clientY;
                  }}
                  onPointerUp={(e) => {
                    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                      e.currentTarget.releasePointerCapture(e.pointerId);
                    }
                    if (!e.currentTarget.dataset.downX) return;
                    const downX = parseFloat(e.currentTarget.dataset.downX);
                    const downY = parseFloat(e.currentTarget.dataset.downY);
                    const dist = Math.sqrt(Math.pow(e.clientX - downX, 2) + Math.pow(e.clientY - downY, 2));
                    
                    if (dist < 10) {
                      if (show.url) {
                        window.open(show.url, "_blank");
                      }
                    }
                    e.currentTarget.dataset.downX = '';
                    e.currentTarget.dataset.downY = '';
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  {/* The "Clip" holding the card */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-brand-red rounded-t-sm shadow-sm z-20 flex flex-col items-center">
                     <div className="w-1.5 h-1.5 rounded-full bg-white mt-1 shadow-inner"></div>
                  </div>
                  
                  {/* The String connecting the clip (visual only) */}
                  <div className="absolute -top-10 left-1/2 w-[1px] h-8 bg-gray-300 z-0"></div>

                  {/* The Card */}
                  <div className={`w-[180px] sm:w-[220px] md:w-[260px] rounded-xl sm:rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden transition-shadow duration-[1000ms] ${isActive ? 'shadow-2xl' : ''}`}>
                    
                    {/* Image container */}
                    <div className="w-full aspect-[2/3] bg-gray-100 overflow-hidden relative shadow-inner">
                      {show.image ? (
                        <img 
                          src={show.image} 
                          alt={show.title} 
                          className={`w-full h-full object-cover ${show.objectPos || 'object-center'} ${show.scaleClass || 'scale-100'} ${show.hoverScaleClass || 'group-hover:scale-110'} transition-transform duration-700`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white text-xs text-center p-2">
                          {show.title}
                        </div>
                      )}
                    </div>
                    


                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HangingCardsCarousel;
