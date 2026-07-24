import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Row 1
import logo1 from '../../../assets/Logo - Clients/Copy of Amazon Prime Video logo.png';
import logo2 from '../../../assets/Logo - Clients/Copy of LG logo.png';
import logo3 from '../../../assets/Logo - Clients/Copy of Samsung logo.png';
import logo4 from '../../../assets/Logo - Clients/Copy of GE logo.png';
import logo5 from '../../../assets/Logo - Clients/Copy of Mahindra.png';
import logo6 from '../../../assets/Logo - Clients/Copy of bajaj finserv logo.png';
import logo7 from '../../../assets/Logo - Clients/Copy of United Nations.png';
import logo8 from '../../../assets/Logo - Clients/Copy of Castrol logo.png';
import logo9 from '../../../assets/Logo - Clients/8206742b-baaa-43f8-b90f-11d438ff9de1.jpg';
import logo10 from '../../../assets/Logo - Clients/Copy of UK Govt.png';
import logo11 from '../../../assets/Logo - Clients/Copy of The Smart Cube.png';
import logo12 from '../../../assets/Logo - Clients/Copy of Schlumberger.png';

// Row 2
import logo13 from '../../../assets/Logo - Clients/Copy of Ek step.png';
import logo14 from '../../../assets/Logo - Clients/Copy of Wellness forever.png';
import logo15 from '../../../assets/Logo - Clients/Screenshot 2026-07-23 155630.png';
import logo16 from '../../../assets/Logo - Clients/Copy of FD Shots.png';
import logo17 from '../../../assets/Logo - Clients/Copy of Government of Gujrat logo.png';
import logo18 from '../../../assets/Logo - Clients/bihar-logo-red.png';
import logo19 from '../../../assets/Logo - Clients/cropped-agnisys-logo-1-2.png';
import logo20 from '../../../assets/Logo - Clients/cropped-Sigmoid_logo_3x.png';
import logo21 from '../../../assets/Logo - Clients/Screenshot 2026-07-23 160357.png';
import logo22 from '../../../assets/Logo - Clients/Screenshot 2026-07-23 160521.png';
import logo23 from '../../../assets/Logo - Clients/logo.png';
import logo24 from '../../../assets/Logo - Clients/Screenshot 2026-07-23 161202.png';

const logosRow1 = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11, logo12];
const logosRow2 = [logo13, logo14, logo15, logo16, logo17, logo18, logo19, logo20, logo21, logo22, logo23, logo24];

const TrustedBy = () => {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  
  const tween1 = useRef(null);
  const tween2 = useRef(null);

  useGSAP(() => {
    // Row 1 goes right (starts at -50% goes to 0%)
    tween1.current = gsap.fromTo(row1Ref.current, 
      { xPercent: -50 }, 
      { xPercent: 0, duration: 35, ease: "none", repeat: -1 }
    );

    // Row 2 goes left (starts at 0% goes to -50%)
    tween2.current = gsap.fromTo(row2Ref.current, 
      { xPercent: 0 }, 
      { xPercent: -50, duration: 35, ease: "none", repeat: -1 }
    );
  }, []);

  const handleMouseEnter = () => {
    gsap.to([tween1.current, tween2.current], { timeScale: 0, duration: 1, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to([tween1.current, tween2.current], { timeScale: 1, duration: 1, ease: "power2.in" });
  };

  return (
    <section className="w-full py-16 bg-white overflow-hidden relative z-20">
      <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8">
        
        {/* Title */}
        <div className="flex items-center justify-center mb-12 relative w-full px-4 overflow-hidden">
          <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-gray-300 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(22,114,239,0.5)]"></div>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-hero font-bold tracking-wider text-brand-gray mx-6 uppercase whitespace-nowrap">TRUSTED BY</h2>
          <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-l from-transparent via-gray-200 to-gray-300 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(22,114,239,0.5)]"></div>
          </div>
        </div>

        {/* Logos Grid */}
        <div 
          className="flex flex-col border-y border-gray-200/60 w-full overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          
          {/* Row 1 */}
          <div ref={row1Ref} className="flex w-max border-b border-gray-200/60">
            {[...logosRow1, ...logosRow1].map((logo, index) => (
              <div key={`row1-${index}`} className="flex-shrink-0 w-36 md:w-52 lg:w-64 flex items-center justify-center p-2 h-24 md:h-32 transition-transform duration-300 hover:scale-110">
                <img src={logo} alt={`Client Logo`} className="max-w-[95%] max-h-[95%] object-contain" />
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div ref={row2Ref} className="flex w-max">
            {[...logosRow2, ...logosRow2].map((logo, index) => (
              <div key={`row2-${index}`} className="flex-shrink-0 w-36 md:w-52 lg:w-64 flex items-center justify-center p-2 h-24 md:h-32 transition-transform duration-300 hover:scale-110">
                <img src={logo} alt={`Client Logo`} className="max-w-[95%] max-h-[95%] object-contain" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
