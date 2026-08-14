import React from 'react';
import { motion } from 'framer-motion';
import { LuLightbulb, LuPenLine, LuVideo, LuMonitorPlay, LuClapperboard, LuArrowRight } from 'react-icons/lu';

const steps = [
  { id: '01', title: 'CONCEPT', icon: LuLightbulb },
  { id: '02', title: 'WRITING', icon: LuPenLine },
  { id: '03', title: 'PRODUCTION', icon: LuVideo },
  { id: '04', title: 'POST-PRODUCTION', icon: LuMonitorPlay },
  { id: '05', title: 'DELIVERY', icon: LuClapperboard },
];

const ProcessTimeline = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto pt-8 pb-16 md:pt-12 md:pb-24 px-4 overflow-hidden mt-4 md:mt-6">
      {/* Top Left Text */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full text-left mb-12 md:mb-16 pl-5 md:pl-8 relative"
      >
        {/* Red Snake Line (Top Left) */}
        <div className="hidden md:block absolute left-0 top-2 bottom-[-4rem] w-[2px] bg-brand-red rounded-full"></div>
        <p className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-800 tracking-tight max-w-lg">
          <span className="text-brand-red">Red</span><span className="text-brand-gray">Ash</span> Films handles the entire filmmaking journey
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Node */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col items-center relative z-10 w-full md:w-auto my-6 md:my-0"
            >
              <div className="flex items-center gap-1 md:gap-3 mb-4">
                <span className="text-[3.5rem] md:text-[4.5rem] font-hero text-brand-red leading-none">{step.id}</span>
                <div className="w-[4.5rem] h-[4.5rem] md:w-24 md:h-24 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center shadow-sm">
                   <step.icon className="w-8 h-8 md:w-10 md:h-10 text-neutral-800" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-sm md:text-base font-bold tracking-wider text-neutral-900 mt-2">{step.title}</h3>
              <div className="w-8 h-[2px] bg-brand-red mt-2"></div>
            </motion.div>

            {/* Connector - Desktop */}
            {index < steps.length - 1 && (
              <div className="hidden md:flex flex-1 items-center px-1 lg:px-2 relative -mt-8">
                {/* Horizontal line */}
                <div className="w-full h-[1px] bg-brand-red/40 absolute left-0 right-0 top-1/2 -translate-y-1/2 z-0"></div>
                {/* Circle with arrow */}
                <div className="w-6 h-6 rounded-full bg-brand-red mx-auto flex items-center justify-center z-10 shadow-sm">
                  <LuArrowRight className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
            
            {/* Connector - Mobile */}
            {index < steps.length - 1 && (
               <div className="md:hidden flex flex-col items-center my-1 relative">
                 <div className="h-10 w-[1px] bg-brand-red/40 absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-0"></div>
                 <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center z-10 shadow-sm relative top-[8px]">
                  <LuArrowRight className="w-3 h-3 text-white rotate-90" />
                 </div>
               </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="w-full mt-16 md:mt-20 flex flex-col-reverse md:flex-row justify-between items-end relative pl-5 md:pl-8 pr-5 md:pr-8">
        {/* Red Snake Line (Bottom Right) */}
        <div className="hidden md:block absolute right-0 top-[-5rem] bottom-2 w-[2px] bg-brand-red rounded-full"></div>

        {/* Bottom Left Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="pb-2 w-full md:w-auto mt-12 md:mt-0 flex justify-center md:justify-start"
        >
          {/* 
            BUTTON ALIGNMENT CONTROLS: 
            Adjust the 'marginLeft' value below to move the button left or right. 
            Negative values (e.g., '-20px') move it left, positive values move it right. 
          */}
          <div style={{ marginLeft: '-48px' }}>
            <a 
              href="#films" 
              className="relative group bg-transparent text-brand-red font-main text-xs md:text-sm uppercase tracking-[0.2em] font-bold py-4 px-10 rounded-full transition-all duration-500 overflow-hidden border border-brand-red/40 hover:border-brand-red shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-xl hover:shadow-brand-red/20 w-max inline-block cursor-pointer"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white">WATCH ENTERTAINMENT FILMS</span>
              <div className="absolute inset-0 bg-brand-red w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
            </a>
          </div>
        </motion.div>

        {/* Bottom Right Text */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-right flex justify-center md:justify-end w-full md:w-auto"
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-800 tracking-tight max-w-lg leading-relaxed text-center md:text-right">
            working with experienced creative and technical talent to bring every project to screen.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
