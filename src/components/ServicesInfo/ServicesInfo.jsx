import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServicesInfo = () => {
  const [expanded, setExpanded] = useState(null);

  const handleCardClick = (id) => {
    if (window.innerWidth < 1024) {
      setExpanded(prev => prev === id ? null : id);
    }
  };

  return (
    <section className="w-full px-4 md:px-8 pt-12 pb-4 md:pb-12 bg-white overflow-hidden">
      <div className="w-full md:w-[99%] xl:w-[97%] mx-auto flex flex-col lg:flex-row items-stretch lg:items-start gap-6 md:gap-8">
        
        {/* Red Card - Entertainment Films */}
        <motion.div 
          onClick={() => handleCardClick('films')}
          className={`w-full group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(226,0,2,0.1)] border border-[#fae6e6] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] min-h-[140px] md:min-h-[160px] lg:min-h-[220px] cursor-pointer lg:cursor-default ${expanded === 'films' ? 'flex-[1.5] lg:flex-[1.5]' : 'flex-1 lg:hover:flex-[1.5]'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle Hover Gradient Background */}
          <div 
            className={`absolute top-0 right-0 w-full lg:w-[60%] h-full transition-opacity duration-700 bg-gradient-to-bl from-[#fff0f0] to-transparent pointer-events-none ${expanded === 'films' ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`} 
            style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
          ></div>

          <div className="w-full p-6 md:p-8 lg:p-0 z-10 flex flex-col flex-1 relative h-full">
            
            {/* Title */}
            <div className={`flex flex-col relative lg:absolute transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] items-start z-20 ${expanded === 'films' ? 'lg:left-10 lg:top-10 lg:translate-x-0 lg:translate-y-0 lg:items-start' : 'lg:left-1/2 lg:top-[110px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:items-center lg:group-hover:left-10 lg:group-hover:top-10 lg:group-hover:translate-x-0 lg:group-hover:translate-y-0 lg:group-hover:items-start'}`}>
              <h2 className={`text-3xl md:text-[50px] xl:text-[60px] font-hero text-brand-red uppercase leading-[0.9] tracking-wide mb-2 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] text-left whitespace-normal sm:whitespace-nowrap ${expanded === 'films' ? 'lg:text-left' : 'lg:text-center lg:group-hover:text-left'}`}>
                ENTERTAINMENT <span className="text-brand-gray">DIVISION</span>
              </h2>
              <div className="w-12 h-[2px] bg-brand-red transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] mt-2"></div>
            </div>
            
            {/* Super Smooth Expandable Grid Wrapper */}
            <div className={`grid transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] w-full lg:px-10 ${expanded === 'films' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]'}`}>
              <div className={`overflow-hidden flex flex-col transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] lg:pt-[130px] lg:pb-10 ${expanded === 'films' ? 'opacity-100 translate-y-0 duration-700 delay-[300ms]' : 'opacity-0 translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:duration-700 lg:group-hover:delay-[300ms]'}`}>
                
                <p className="text-sm md:text-base font-main text-brand-gray mt-6 lg:mt-0">
                  Contact us at <a href="mailto:info@redashfilms.com" className="text-brand-red hover:underline transition-colors" onClick={(e) => e.stopPropagation()}>info@redashfilms.com</a> for end-to-end <span className="text-brand-red">film production</span> services and entertainment films, including
                </p>
                
                {/* Two Column List layout */}
                <div className="flex flex-col sm:flex-row gap-4 text-sm md:text-base font-main text-brand-black font-semibold mt-4 mb-4 lg:mb-auto">
                  {/* Column 1 */}
                  <div className="flex-1 flex flex-col gap-4 whitespace-nowrap lg:whitespace-normal">
                    <div className="flex items-start"><span className="text-brand-red mr-3 text-xl leading-none mt-[2px]">•</span> <span>Theatrical Feature Films</span></div>
                    <div className="flex items-start"><span className="text-brand-red mr-3 text-xl leading-none mt-[2px]">•</span> <span>Microdrama Shows</span></div>
                    <div className="flex items-start"><span className="text-brand-red mr-3 text-xl leading-none mt-[2px]">•</span> <span>Music Videos</span></div>
                  </div>
                  {/* Column 2 */}
                  <div className="flex-1 flex flex-col gap-4 whitespace-nowrap lg:whitespace-normal">
                    <div className="flex items-start"><span className="text-brand-red mr-3 text-xl leading-none mt-[2px]">•</span> <span>Web Shows</span></div>
                    <div className="flex items-start"><span className="text-brand-red mr-3 text-xl leading-none mt-[2px]">•</span> <span>Short Films</span></div>
                    <div className="flex items-start"><span className="text-brand-red mr-3 text-xl leading-none mt-[2px]">•</span> <span>AI Films</span></div>
                  </div>
                </div>

                {/* Bottom Anchored Button */}
                <div className="pt-6 pb-2 mt-auto w-full flex justify-start">
                  <a 
                    href="https://films.redash.in" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="bg-[#E20002] hover:bg-[#E20002] transition-colors text-white font-bold py-3 px-8 rounded-md text-sm md:text-base uppercase flex items-center shadow-md">
                      Click Here 
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                  </a>
                </div>

              </div>
            </div>
            
          </div>
        </motion.div>

        {/* Blue Card - Enterprise Films */}
        <motion.div 
          onClick={() => handleCardClick('agency')}
          className={`w-full group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(22,114,239,0.1)] border border-[#e6effc] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] min-h-[140px] md:min-h-[160px] lg:min-h-[220px] cursor-pointer lg:cursor-default ${expanded === 'agency' ? 'flex-[1.5] lg:flex-[1.5]' : 'flex-1 lg:hover:flex-[1.5]'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Subtle Hover Gradient Background */}
          <div 
            className={`absolute top-0 right-0 w-full lg:w-[60%] h-full transition-opacity duration-700 bg-gradient-to-bl from-[#f0f6ff] to-transparent pointer-events-none ${expanded === 'agency' ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`} 
            style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
          ></div>

          <div className="w-full p-6 md:p-8 lg:p-0 z-10 flex flex-col flex-1 relative h-full">
            
            {/* Title */}
            <div className={`flex flex-col relative lg:absolute transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] items-start z-20 ${expanded === 'agency' ? 'lg:left-10 lg:top-10 lg:translate-x-0 lg:translate-y-0 lg:items-start' : 'lg:left-1/2 lg:top-[110px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:items-center lg:group-hover:left-10 lg:group-hover:top-10 lg:group-hover:translate-x-0 lg:group-hover:translate-y-0 lg:group-hover:items-start'}`}>
              <h2 className={`text-3xl md:text-[50px] xl:text-[60px] font-hero text-brand-blue uppercase leading-[0.9] tracking-wide mb-2 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] text-left whitespace-normal sm:whitespace-nowrap ${expanded === 'agency' ? 'lg:text-left' : 'lg:text-center lg:group-hover:text-left'}`}>
                ENTERPRISE <span className="text-brand-gray">DIVISION</span>
              </h2>
              <div className="w-12 h-[2px] bg-brand-blue transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] mt-2"></div>
            </div>
            
            {/* Super Smooth Expandable Grid Wrapper */}
            <div className={`grid transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] w-full lg:px-10 ${expanded === 'agency' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]'}`}>
              <div className={`overflow-hidden flex flex-col transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] lg:pt-[130px] lg:pb-10 ${expanded === 'agency' ? 'opacity-100 translate-y-0 duration-700 delay-[300ms]' : 'opacity-0 translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:duration-700 lg:group-hover:delay-[300ms]'}`}>
                
                <p className="text-sm md:text-base font-main text-brand-gray mt-6 lg:mt-0 pr-4 lg:pr-0">
                  Contact us at <a href="mailto:info@redashfilms.com" className="text-brand-blue hover:underline transition-colors" onClick={(e) => e.stopPropagation()}>info@redashfilms.com</a> for strategic <span className="text-brand-blue">ad agency</span> services and enterprise films, including
                </p>
                
                {/* Two Column List layout */}
                <div className="flex flex-col sm:flex-row gap-4 text-sm md:text-base font-main text-brand-black font-semibold mt-4 mb-4 lg:mb-auto pr-4 lg:pr-0">
                  {/* Column 1 */}
                  <div className="flex-1 flex flex-col gap-4 whitespace-nowrap lg:whitespace-normal">
                    <div className="flex items-start"><span className="text-brand-blue mr-3 text-xl leading-none mt-[2px]">•</span> <span>Ad Films (TV, Digital & Social)</span></div>
                    <div className="flex items-start"><span className="text-brand-blue mr-3 text-xl leading-none mt-[2px]">•</span> <span>Corporate Films (Profile AVs)</span></div>
                    <div className="flex items-start"><span className="text-brand-blue mr-3 text-xl leading-none mt-[2px]">•</span> <span>Case Study Videos</span></div>
                    <div className="flex items-start"><span className="text-brand-blue mr-3 text-xl leading-none mt-[2px]">•</span> <span>Animated Explainers</span></div>
                  </div>
                  {/* Column 2 */}
                  <div className="flex-1 flex flex-col gap-4 whitespace-nowrap lg:whitespace-normal">
                    <div className="flex items-start"><span className="text-brand-blue mr-3 text-xl leading-none mt-[2px]">•</span> <span>AI Videos</span></div>
                    <div className="flex items-start"><span className="text-brand-blue mr-3 text-xl leading-none mt-[2px]">•</span> <span>Podcasts</span></div>
                    <div className="flex items-start"><span className="text-brand-blue mr-3 text-xl leading-none mt-[2px]">•</span> <span>Training Films</span></div>
                    <div className="flex items-start"><span className="text-brand-blue mr-3 text-xl leading-none mt-[2px]">•</span> <span>Testimonial Videos</span></div>
                  </div>
                </div>

                {/* Bottom Anchored Button */}
                <div className="pt-6 pb-2 mt-auto w-full flex justify-start">
                  <Link 
                    to="/ad-agency" 
                    className="inline-block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="bg-brand-blue hover:bg-[#115bbf] transition-colors text-white font-bold py-3 px-8 rounded-md text-sm md:text-base uppercase flex items-center shadow-md">
                      Click Here 
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                  </Link>
                </div>

              </div>
            </div>
            
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default ServicesInfo;
