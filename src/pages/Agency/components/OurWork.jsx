import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { FaLayerGroup, FaFlag, FaChartBar, FaRocket } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const processData = [
  {
    id: '01',
    icon: <FaFlag size={20} className="text-brand-blue" />,
    title: 'Understand',
    subtitle: ' BUSINESS CHALLENGE',
    desc: 'We dive deep into your business, audience and market to identify the real problem.'
  },
  {
    id: '02',
    icon: <FaChartBar size={20} className="text-brand-blue" />,
    title: 'Design',
    subtitle: 'GROWTH STRATEGY',
    desc: 'We craft a tailored strategy, creative plan and media approach that aligns with your goals.'
  },
  {
    id: '03',
    icon: <FaRocket size={20} className="text-brand-blue" />,
    title: 'Deliver ',
    subtitle: 'THE RESULTS',
    desc: 'From production to performance, we execute, optimize and scale for maximum impact.'
  }
];

const workData = [
  { id: '01', title: 'Creating videos and creatives', desc: 'Engaging videos, eye-catching creatives and scroll-stopping content that tells your brand story.', color: 'bg-purple-400' },
  { id: '02', title: 'Performance Marketing', desc: 'Data-driven campaigns across platforms that maximize ROI and business growth.', color: 'bg-blue-400' },
  { id: '03', title: 'Creating ad campaigns', desc: 'Strategic, targeted and result-oriented ad campaigns that generate leads, sales and ROI.', color: 'bg-purple-500' },
  { id: '04', title: 'Creating different types of corporate videos', desc: 'From brand films to product videos, we create corporate videos that build trust and impact.', color: 'bg-pink-400' },
  { id: '05', title: 'Creating viral content', desc: 'Trend-driven, engaging content that helps your brand go viral and stay ahead.', color: 'bg-orange-300' },
  { id: '06', title: 'Increasing brand awareness and value', desc: 'We build strong brand identities that increase recognition, trust and long-term value.', color: 'bg-blue-400' },
];

const OurWork = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="w-full pt-24 pb-24 bg-[#fcfcfc] relative z-20 font-main overflow-hidden flex flex-col items-center">
      
      {/* ==================== TOP SECTION: OUR PROCESS ==================== */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mb-32">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-col items-center mb-24 w-full overflow-hidden"
        >
          <div className="flex items-center justify-center w-full mb-4">
            <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-gray-300 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(22,114,239,0.5)]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-hero font-extrabold tracking-wider text-brand-gray mx-4 md:mx-6 text-center uppercase whitespace-nowrap">
              Our <span className="text-brand-blue">Work</span>
            </h2>
            <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-l from-transparent via-gray-200 to-gray-300 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(22,114,239,0.5)]"></div>
            </div>
          </div>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative w-full max-w-9xl mx-auto mt-12">
          
          {/* Connecting SVG Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[16px] left-0 w-full h-[150px] z-0">
            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1000 150">
              <path 
                d="M 50,120 C 90,120 126,80 166,80 C 226,80 273,110 333,110 C 393,110 440,40 500,40 C 560,40 607,110 667,110 C 727,110 773,80 833,80 C 873,80 910,120 950,120" 
                fill="none" 
                stroke="#1672EF" 
                strokeWidth="1.5" 
                className="path-animate"
              />
              <circle cx="50" cy="120" r="4" fill="#1672EF" />
              <circle cx="950" cy="120" r="4" fill="#1672EF" />
            </svg>
          </div>

          {/* Grid of Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0 relative z-10">
            {processData.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: false, amount: 0.2 }}
                className={`flex flex-col items-center text-center group ${index === 1 ? 'md:-mt-[40px]' : ''}`}
              >
                
                {/* Large Number Behind Icon */}
                <div className="text-7xl md:text-8xl font-hero font-thin text-[#e8eef5] leading-none -mb-8 relative z-0 transition-transform duration-300 group-hover:-translate-y-2">
                  {step.id}
                </div>
                
                {/* Icon in Circle (Overlaps Number) */}
                <div className="w-16 h-16 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-50 flex items-center justify-center mb-8 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-brand-blue/20">
                  {step.icon}
                </div>
                
                {/* Text Content */}
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h4>
                <div className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                  {step.subtitle}
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </div>


      {/* ==================== BOTTOM SECTION: SOCIAL MEDIA MANAGEMENT ==================== */}
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.2 }}
        className="w-full flex flex-col items-center text-center mb-16 px-4 relative z-20"
      >
        {/* Top small text with lines */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 md:w-24 h-[1px] bg-brand-black"></div>
          <span className="text-brand-black font-medium tracking-[0.4em] text-[10px] md:text-xs uppercase">
            Connect &bull; Engage &bull; Grow
          </span>
          <div className="w-12 md:w-24 h-[1px] bg-brand-black"></div>
        </div>

        {/* Main large heading */}
        <h2 className="font-hero flex flex-col items-center leading-[0.85] tracking-normal uppercase mt-2">
          <span className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-[#111111]">Social Media</span>
          <span className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-gray-400">Management</span>
        </h2>

        {/* Bottom line */}
        <div className="w-full max-w-[400px] md:max-w-[700px] h-[1px] bg-gray-300 mt-6 relative flex justify-center">
          <div className="w-24 md:w-32 h-[3px] bg-brand-black absolute top-1/2 -translate-y-1/2"></div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-6 relative">
        
        {/* Right Main Glass Container */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: false, amount: 0.1 }}
          className="flex-1 relative"
        >

          {/* Grid Container for Text Boxes */}
          <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {workData.map((item, index) => (
              <div 
                key={index} 
                className="w-full relative overflow-hidden bg-white/70 backdrop-blur-2xl rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group flex flex-col justify-center items-center text-center min-h-[100px] px-6 py-5 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(22,114,239,0.6)]"
              >
                {/* Blue background sliding up from bottom */}
                <div className="absolute inset-0 bg-brand-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0"></div>

                <h4 className="relative z-10 text-lg md:text-xl font-main font-bold text-gray-900 leading-snug group-hover:text-white transition-colors duration-300 capitalize">
                  {item.title}
                </h4>
              </div>
            ))}
            
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default OurWork;
