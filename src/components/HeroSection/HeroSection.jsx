import React from 'react';
import HeroColumn from '../HeroColumn/HeroColumn';

const SectionDivider = ({ colorClass = "bg-black/20" }) => (
  <div className={`hidden md:block w-[0.5px] h-[100px] mx-4 ${colorClass}`}></div>
);

const HeroSection = () => {
  return (
    <section className="w-full px-4 md:px-8 pt-2 pb-2 bg-white">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center relative gap-12 md:gap-0">
        <HeroColumn 
          bgWord="FILM" 
          fgWord="FILM" 
          subtitle="PRODUCTION HOUSE" 
          underlineClass="bg-brand-red"
          imageClass="bg-film"
          subtitleClass="text-brand-red"
          delay={0.1}
        />
        
        <SectionDivider colorClass="bg-brand-red" />
        
        <HeroColumn 
          bgWord="AGENCY" 
          fgWord="AD" 
          subtitle="AGENCY" 
          underlineClass="bg-brand-blue"
          imageClass="bg-ad"
          subtitleClass="text-brand-blue"
          delay={0.2}
        />
        
        <SectionDivider colorClass="bg-brand-blue/70" />
        
        <HeroColumn 
          bgWord="2007" 
          fgWord="2007" 
          subtitle="FOUNDED BY AN IIT DELHI ENGINEER" 
          underlineClass="bg-brand-gray"
          imageClass="bg-year"
          subtitleClass="text-brand-gray"
          delay={0.3}
        />
      </div>
    </section>
  );
};

export default HeroSection;
