import React from 'react';
import { motion } from 'framer-motion';

const HeroColumn = ({ 
  bgWord, 
  fgWord, 
  subtitle, 
  underlineClass, 
  imageClass,
  wordClass = "", 
  subtitleClass,
  delay 
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center w-full flex-1 min-w-0 pt-0 pb-4 px-2 md:px-4 relative text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      <div className="relative flex justify-center items-center mb-0 w-full h-[80px] lg:h-[100px]">
        {/* Removed Background light gray text as requested */}
        
        {/* Foreground image-fill text */}
        <div className={`relative px-2 md:px-4 py-1 font-hero text-[65px] md:text-[70px] lg:text-[100px] font-bold z-[2] uppercase tracking-[6px] md:tracking-[8px] lg:tracking-[12px] ml-[6px] md:ml-[8px] lg:ml-[12px] leading-none bg-clip-text text-transparent whitespace-nowrap ${imageClass} ${wordClass}`}>
          {fgWord}
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-1.5 -mt-3 max-w-full">
        <h3 className={`text-[10px] md:text-[10px] lg:text-[12px] font-subtitle font-bold tracking-[3px] md:tracking-[4px] lg:tracking-[8px] uppercase ml-[3px] md:ml-[4px] lg:ml-[8px] whitespace-normal lg:whitespace-nowrap leading-tight px-1 text-center ${subtitleClass || 'text-brand-black'}`}>{subtitle}</h3>
        <div className={`h-[3px] w-[40px] rounded-sm ${underlineClass} mt-1 md:mt-0`} />
      </div>
    </motion.div>
  );
};

export default HeroColumn;
