import React from 'react';
import HeroColumn from '../HeroColumn/HeroColumn';

const SectionDivider = ({ colorClass = "bg-black/20" }) => (
  <div className={`hidden md:block w-[0.5px] h-[100px] mx-4 ${colorClass}`}></div>
);

const HeroSection = () => {
  return (
    <section className="w-full px-4 md:px-8 pt-2 pb-2 bg-white">
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] justify-items-center items-center relative gap-6 md:gap-0">
        <HeroColumn 
          bgWord="FILM" 
          fgWord="FILM" 
          subtitle="PRODUCTION HOUSE" 
          underlineClass="bg-brand-red"
          imageClass="bg-film bg-[length:200%_auto] bg-[position:40%_65%]"
          subtitleClass="text-brand-red"
          delay={0.1}
        />
        
        <div className="flex items-center justify-center text-6xl md:text-7xl lg:text-[100px] font-main font-semibold bg-clip-text text-transparent bg-year bg-[length:400%_auto] bg-[position:0%_50%] my-0 md:-mt-4 lg:-mt-9 md:ml-4 lg:ml-10">&amp;</div>
        
        <HeroColumn 
          bgWord="AGENCY" 
          fgWord="AD" 
          subtitle="AGENCY" 
          underlineClass="bg-brand-blue"
          imageClass="bg-ad bg-[length:150%_auto] bg-[position:60%_50%]"
          subtitleClass="text-brand-blue"
          delay={0.2}
        />
        
        <SectionDivider colorClass="bg-brand-gray/50" />
        
        <HeroColumn 
          bgWord="2007" 
          fgWord="2007" 
          subtitle="IIT ENGINEER'S VENTURE" 
          underlineClass="bg-brand-gray"
          imageClass="bg-year bg-cover bg-center"
          subtitleClass="text-brand-gray"
          delay={0.3}
        />
      </div>
    </section>
  );
};

export default HeroSection;
