import React from 'react';
import { FaFire, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

import image1 from '../../../assets/RedHot section/Image 1.png';
import image2 from '../../../assets/RedHot section/image2.png';
import image3 from '../../../assets/RedHot section/image3.png';
import image4 from '../../../assets/RedHot section/image4.png';
import image5 from '../../../assets/RedHot section/image5.png';
import image6 from '../../../assets/RedHot section/image6.png';
import imgFunding from '../../../assets/RedHot section/Funding.png';
import imgInsight from '../../../assets/RedHot section/Insight.png';

const updatesData = [
  {
    id: 1,
    pill: "MEDIA FEATURED",
    title: <>REDASH GROWS <span className="text-blue-600">EXPONENTIALLY</span></>,
    desc: "RedAsh has emerged as one of India's fastest-growing production houses and ad agencies",
    sourceLabel: "FEATURED IN",
    links: [  
      { text: "DNA", url: "https://www.dnaindia.com/insights/report-redash-films-led-by-iit-delhi-engineer-ashish-lal-scales-rapidly-with-1600-growth-over-two-years-3211714" }
      
    ],
    image: image2,
    imageLeft: true
  },
  {
    id: 2,
    pill: "FUNDING",
    title: <>Driving <span className="text-blue-600">$12M – $125M</span><br/>In Client Funding</>,
    desc: "Our ad and video campaigns have played a significant role in helping our clients secure major investment rounds and fuel their growth.",
    sourceLabel: "Mention",
    links: [
      { text: "LINKEDIN", url: "https://www.linkedin.com/posts/ashishlalreal_redashfilms-fy2023abr24-gratitude-activity-7180844012902248449-Pusz/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAADZgaUBjOsNCJyT8TTYQTmZbp30gD5h4DA" }
    ],
    image: imgFunding,
    imageLeft: false
  },
  {
    id: 3,
    pill: "MEDIA COVERAGE",
    title: <>RedAsh Teams Up With Top Talent – <span className="text-blue-600">Mid-day</span> Feature</>,
    desc: "Featured in Mid-day for our creative collaborations with top talent and innovative storytelling that connects with millions.",
    sourceLabel: "FEATURED IN",
    links: [
      { text: "MID-DAY", url: "https://www.mid-day.com/buzzfeed/article/ashish-lal-the-iit-delhi-engineer-turned-actor-teams-up-with-surbhi-jyoti-and-upendra-limaye-9809" }
    ],
    image: image4,
    imageLeft: true
  },
  {
    id: 4,
    pill: "INSIGHTS",
    title: <>REDASH BRINGS DISRUPTIVE <span className="text-blue-600">INSIGHTS</span></>,
    desc: "Delve deep into understanding the science behind ad campaigns, digital marketing, brand-based microdrama shows, and more.",
    sourceLabel: "",
    links: [
      { text: "READ MORE", url: "/ad-agency/blog" }
    ],
    image: imgInsight,
    imageLeft: false
  }
];

const WhatsRedHot = () => {
  return (
    <section className="w-full py-20 bg-white relative z-20 font-main overflow-x-hidden [@media(max-height:600px)_and_(orientation:landscape)]:py-4">
      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-8">
        
        {/* Header Section (Unchanged heading as requested) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-col items-center mb-16 w-full [@media(max-height:600px)_and_(orientation:landscape)]:mb-4"
        >
          <div className="flex items-center justify-center mb-4 relative w-full px-4">
            <div className="hidden md:block flex-1 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-gray-300 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-hero font-extrabold tracking-wider text-gray-900 mx-4 md:mx-6 uppercase text-center flex flex-wrap justify-center items-center gap-x-3 gap-y-2 [@media(max-height:600px)_and_(orientation:landscape)]:text-2xl">
              WHAT'S <span className="text-brand-red flex items-center">RED-HOT <FaFire className="ml-2 text-brand-red mt-[-4px] w-9 h-9 [@media(max-height:600px)_and_(orientation:landscape)]:w-5 [@media(max-height:600px)_and_(orientation:landscape)]:h-5" /></span> ABOUT <span className="flex items-center"><span className="text-brand-red">RED</span><span className="text-brand-gray">ASH</span>?</span>
            </h2>
            <div className="hidden md:block flex-1 h-[1px] bg-gradient-to-l from-transparent via-gray-200 to-gray-300 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
            </div>
          </div>
        </motion.div>

        {/* Content Section: Alternating Rows */}
        <div className="flex flex-col gap-8 md:gap-10">
          {updatesData.map((update, index) => (
            <motion.div 
              key={update.id} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? 100 : -100 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    duration: 0.4, 
                    ease: "easeOut",
                    staggerChildren: 0.15,
                    delayChildren: 0.2
                  }
                }
              }}
              className={`py-8 md:py-12 flex flex-col ${update.imageLeft ? 'md:flex-row [@media(max-height:600px)_and_(orientation:landscape)]:flex-row' : 'md:flex-row-reverse [@media(max-height:600px)_and_(orientation:landscape)]:flex-row-reverse'} items-center gap-10 md:gap-16 group transition-all duration-500 [@media(max-height:600px)_and_(orientation:landscape)]:py-2 [@media(max-height:600px)_and_(orientation:landscape)]:gap-4`}
            >
              
              {/* Image Side */}
              <div className="w-full md:w-[60%] flex justify-center items-center relative [@media(max-height:600px)_and_(orientation:landscape)]:w-[40%]">
                <div className="w-full max-w-[320px] md:max-w-[500px] aspect-[4/3] group-hover:scale-[1.05] transition-transform duration-500 flex justify-center items-center [@media(max-height:600px)_and_(orientation:landscape)]:max-w-[150px]">
                  <img src={update.image} alt="Visual" className="max-w-full max-h-full object-contain" />
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-[40%] flex flex-col justify-center relative [@media(max-height:600px)_and_(orientation:landscape)]:w-[60%]">
                {/* Feather Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-blue-50/50 blur-[80px] rounded-[100%] -z-10 pointer-events-none"></div>
                
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                  className="border border-blue-600 text-blue-600 text-xs md:text-sm font-bold px-5 py-2 rounded-full w-max mb-6 uppercase tracking-wider bg-blue-50/50 [@media(max-height:600px)_and_(orientation:landscape)]:text-[9px] [@media(max-height:600px)_and_(orientation:landscape)]:px-3 [@media(max-height:600px)_and_(orientation:landscape)]:py-1 [@media(max-height:600px)_and_(orientation:landscape)]:mb-2"
                >
                  {update.pill}
                </motion.div>
                
                <motion.h3 
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                  className="text-4xl md:text-5xl font-hero font-bold text-gray-900 mb-6 leading-tight [@media(max-height:600px)_and_(orientation:landscape)]:text-xl [@media(max-height:600px)_and_(orientation:landscape)]:mb-1"
                >
                  {update.title}
                </motion.h3>
                
                <motion.p 
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                  className="text-gray-500 text-base md:text-lg lg:text-xl mb-10 leading-relaxed max-w-lg [@media(max-height:600px)_and_(orientation:landscape)]:text-[10px] [@media(max-height:600px)_and_(orientation:landscape)]:mb-2 [@media(max-height:600px)_and_(orientation:landscape)]:leading-snug"
                >
                  {update.desc}
                </motion.p>
                
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                  className="w-full h-px bg-gray-100 mb-8 relative z-10 [@media(max-height:600px)_and_(orientation:landscape)]:mb-2"
                ></motion.div>
                
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                  className="relative z-10"
                >
                  <div className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 [@media(max-height:600px)_and_(orientation:landscape)]:text-[8px] [@media(max-height:600px)_and_(orientation:landscape)]:mb-1">
                    {update.sourceLabel}
                  </div>
                  <div className="flex flex-wrap items-center gap-6 md:gap-8 text-sm md:text-base font-bold text-gray-900 uppercase tracking-wider [@media(max-height:600px)_and_(orientation:landscape)]:text-[10px] [@media(max-height:600px)_and_(orientation:landscape)]:gap-4">
                    {update.links.map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                        {link.text} <FaArrowRight className="text-blue-600" />
                      </a>
                    ))}
                  </div>
                </motion.div>

              </div>

            </motion.div>
          ))}
        </div>

      

      </div>
    </section>
  );
};

export default WhatsRedHot;
