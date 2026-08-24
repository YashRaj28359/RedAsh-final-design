import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hidden md:flex flex-col items-center justify-center text-center z-30 pointer-events-none w-full relative mt-[35vh] md:mt-0 [@media(max-height:600px)_and_(orientation:landscape)]:flex [@media(max-height:600px)_and_(orientation:landscape)]:mt-4">
      
      <h1 className="font-hero text-[44px] sm:text-5xl md:text-7xl xl:text-[75px] leading-[0.9] tracking-normal text-black uppercase flex flex-col items-center overflow-visible font-bold mb-0 [@media(max-height:600px)_and_(orientation:landscape)]:text-5xl [@media(max-height:600px)_and_(orientation:landscape)]:!leading-[1]">
        <div className="overflow-visible whitespace-nowrap"><span className="block text-black pointer-events-auto"><span className="text-brand-red">Red</span><span className="text-brand-gray">Ash</span> <span className="text-brand-blue transition-all duration-300 cursor-default hover:text-transparent hover:[-webkit-text-stroke:2px_#1672EF]">AD Agency.</span></span></div>
        <div className="overflow-visible whitespace-nowrap text-[34px] sm:text-4xl md:text-5xl xl:text-[55px] opacity-80 mt-1 mb-2 [@media(max-height:600px)_and_(orientation:landscape)]:text-3xl [@media(max-height:600px)_and_(orientation:landscape)]:mb-0"><span className="block text-black">Marketing Campaigns.</span></div>
        <div className="overflow-visible whitespace-nowrap"><span className="block text-brand-blue transition-all duration-300 pointer-events-auto cursor-default hover:text-transparent hover:[-webkit-text-stroke:2px_#1672EF]">Design.</span></div>
        <div className="overflow-visible whitespace-nowrap"><span className="block text-brand-blue transition-all duration-300 pointer-events-auto cursor-default hover:text-transparent hover:[-webkit-text-stroke:2px_#1672EF]">Create.</span></div>
        <div className="overflow-visible whitespace-nowrap"><span className="block text-brand-blue transition-all duration-300 pointer-events-auto cursor-default hover:text-transparent hover:[-webkit-text-stroke:2px_#1672EF]">Execute.</span></div>
        <div className="overflow-visible whitespace-nowrap opacity-80"><span className="block text-black">Since 2007.</span></div>
      </h1>

      <button 
        onClick={() => {
          navigate('/ad-agency/films');
        }}
        className="mt-12 md:mt-6 relative group bg-transparent text-brand-blue font-main text-xs md:text-sm uppercase tracking-[0.2em] font-bold py-4 px-10 rounded-full pointer-events-auto transition-all duration-500 overflow-hidden border border-brand-blue/40 hover:border-brand-blue shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-xl hover:shadow-brand-blue/20 [@media(max-height:600px)_and_(orientation:landscape)]:mt-2 [@media(max-height:600px)_and_(orientation:landscape)]:py-2 [@media(max-height:600px)_and_(orientation:landscape)]:px-6"
      >
        <span className="relative z-10 transition-colors duration-500 group-hover:text-white">Watch More Enterprise Films</span>
        <div className="absolute inset-0 bg-brand-blue w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
      </button>
    </div>
  );
};

export default Hero;
