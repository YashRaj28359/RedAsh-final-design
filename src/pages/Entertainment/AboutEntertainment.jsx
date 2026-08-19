import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FaVideo, FaTv, FaMobileAlt, FaDesktop, FaRobot, FaPlayCircle, FaMusic, FaLightbulb,
  FaPen, FaClipboardList, FaPaperPlane,
  FaMapMarkerAlt, FaEnvelope, FaPhoneAlt
} from 'react-icons/fa';
import EntertainmentNavbar from './components/EntertainmentNavbar';
import EntertainmentFooter from './components/EntertainmentFooter';
import ContactForm from '../../components/ContactForm/ContactForm';
import aboutPic from '../../assets/Films/About/Ashish-Lal_Yellow-Shirt.jpg';
const wordAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const ScrollWord = ({ children, progress, start, end, index }) => {
  const direction = index % 2 === 0 ? -40 : 40; 
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const x = useTransform(progress, [start, end], [direction, 0]);

  return (
    <motion.span style={{ opacity, x, display: "inline-block", willChange: "transform, opacity" }} className="mr-[0.25em]">
      {children}
    </motion.span>
  );
};

const ScrollText = ({ text }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "start 80%"] 
  });

  const words = text.split(" ");
  
  return (
    <span ref={containerRef} className="inline-flex flex-wrap">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(start + (2 / words.length), 1);
        return (
          <ScrollWord key={i} index={i} progress={scrollYProgress} start={start} end={end}>
            {word}
          </ScrollWord>
        );
      })}
    </span>
  );
};

const AboutEntertainment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      <EntertainmentNavbar />

      <main className="pt-24 lg:pt-32">
        {/* Hero Section */}
        <section className="px-6 lg:px-16 xl:px-24 py-12 lg:py-24 w-full flex flex-col items-center justify-center overflow-hidden min-h-[70vh]">
          <motion.div 
            className="space-y-4 z-10 w-fit flex flex-col items-center"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            <h3 className="text-brand-black font-black tracking-tighter uppercase mb-4 leading-none w-fit flex items-baseline justify-center gap-2 sm:gap-3 flex-wrap">
              <motion.span variants={wordAnim} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">WELCOME</motion.span>
              <motion.span variants={wordAnim} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">TO</motion.span>
              <motion.span variants={wordAnim} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="text-brand-red">RED</span><span className="text-brand-gray">ASH</span> <span className="text-brand-red">FILMS</span>
              </motion.span>
            </h3>
            <h1 className="flex flex-col text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-[0.85] tracking-tighter text-neutral-900 w-fit" aria-label="Where Substance Meets Mass Appeal">
              <motion.span variants={wordAnim} className="block text-left text-brand-black">WHERE</motion.span>
              <motion.span variants={wordAnim} className="block text-left text-brand-gray">SUBSTANCE</motion.span>
              <motion.span variants={wordAnim} className="block text-right text-brand-black">MEETS</motion.span>
              <motion.span variants={wordAnim} className="block text-right text-brand-gray">MASS</motion.span>
              <motion.span variants={wordAnim} className="block text-left text-brand-red">APPEAL</motion.span>
            </h1>
          </motion.div>
        </section>



        {/* Our Story Section */}
        <section className="w-full max-w-[1500px] mx-auto px-6 lg:px-12 py-12 md:py-24 flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-16">
          {/* Left Text */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="w-full md:w-1/2 flex flex-col justify-center"
          >
            
            {/* Stylized Header matching reference */}
            <div className="flex flex-col items-start mb-6 uppercase">
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
                }}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1"
              >
                <span className="text-xs md:text-sm lg:text-base font-medium tracking-[0.15em] text-neutral-600">FOUNDED IN 2007 BY</span>
                <a href="https://www.linkedin.com/in/ashishlalreal" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl lg:text-3xl text-red-600 hover:text-red-700 transition-colors font-hero tracking-widest cursor-pointer">
                  ASHISH LAL,
                </a>
              </motion.div>
              
              <motion.h2 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
                }}
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-medium text-neutral-700 leading-tight my-2"
              >
                AN IIT DELHI ENGINEER,
              </motion.h2>
              
              <motion.h3 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
                }}
                className="text-3xl md:text-4xl lg:text-5xl font-hero tracking-[0.1em] mt-1 flex gap-[0.3em]"
              >
                <div>
                  <span className="text-brand-red">RED</span>
                  <span className="text-brand-gray">ASH</span>
                </div>
                <span className="text-brand-red">FILMS</span>
              </motion.h3>
            </div>

            {/* Remaining Paragraph */}
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              className="text-xl landscape:text-base sm:text-2xl sm:landscape:text-lg md:text-3xl md:landscape:text-xl lg:text-4xl lg:landscape:text-4xl font-bold text-neutral-900 tracking-tight leading-[1.15] text-left mt-6 landscape:mt-4 lg:mt-8 max-w-3xl"
            >
              has evolved into a Mumbai-based production house focused on creating compelling entertainment across films, web series, microdrama shows, television serials, AI fiction films, short films, music videos, and <span className="text-brand-red">emerging formats.</span>
            </motion.p>

          </motion.div>
          
          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full md:w-1/2 flex flex-col"
          >
            <div className="relative w-full h-[350px] md:h-full md:flex-1 bg-neutral-100 shadow-xl overflow-hidden rounded-xl border border-gray-200">
              <img 
                src={aboutPic} 
                alt="Ashish Lal" 
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>
        </section>

        {/* Vision & Process Section */}
        <section className="w-full bg-white text-black py-24 lg:py-32 border-t border-gray-100">
          <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24"
            >
              {/* Paragraph 1 - Vision */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="group relative flex flex-col border-t border-gray-200 pt-8 pb-8 px-6 -mx-6 sm:px-10 sm:-mx-10 overflow-hidden transition-colors duration-500 hover:border-transparent rounded-xl"
              >
                {/* Bottom-to-Top Red Fill */}
                <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>

                <div className="relative z-10 flex items-center gap-4 mb-6">
                  <div className="w-10 h-1 bg-red-600 group-hover:bg-white transition-colors duration-500"></div>
                  <span className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-neutral-500 group-hover:text-red-100 transition-colors duration-500">The Vision</span>
                </div>
                <p className="relative z-10 text-xl md:text-2xl lg:text-[2rem] font-light leading-relaxed text-neutral-700 group-hover:text-white transition-colors duration-500">
                  Our Entertainment Films are built around <strong className="text-black group-hover:text-white font-bold transition-colors duration-500">strong stories</strong>, memorable characters, well-known actors, and ideas that can connect with wide audiences. From mainstream fiction and original IPs to commissioned entertainment projects, we aim to create content that combines <strong className="text-black group-hover:text-white font-bold transition-colors duration-500">creativity with commercial potential</strong>.
                </p>
              </motion.div>

              {/* Paragraph 2 - Process */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="group relative flex flex-col border-t border-gray-200 pt-8 pb-8 px-6 -mx-6 sm:px-10 sm:-mx-10 mt-8 md:mt-16 landscape:mt-24 md:landscape:mt-32 lg:mt-32 lg:landscape:mt-32 overflow-hidden transition-colors duration-500 hover:border-transparent rounded-xl"
              >
                {/* Bottom-to-Top Red Fill */}
                <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>

                <div className="relative z-10 flex items-center gap-4 mb-6">
                  <div className="w-10 h-1 bg-red-600 group-hover:bg-white transition-colors duration-500"></div>
                  <span className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-neutral-500 group-hover:text-red-100 transition-colors duration-500">The Process</span>
                </div>
                <p className="relative z-10 text-xl md:text-2xl lg:text-[2rem] font-light leading-relaxed text-neutral-700 group-hover:text-white transition-colors duration-500">
                  We work across the complete filmmaking journey — concept development, writing, pre-production, production, post-production, and delivery — bringing together <strong className="text-black group-hover:text-white font-bold transition-colors duration-500">experienced writers, directors, actors, technicians and creative professionals</strong> for every project.
                </p>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* CTA Typography Section (Re-ordered logical flow based on feedback) */}
        <section className="w-full bg-white py-32 landscape:py-12 lg:py-48 lg:landscape:py-48 flex flex-col items-center justify-center relative overflow-hidden">
          
          {/* Background Ghost Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
            <h1 className="text-[12rem] md:text-[25rem] lg:text-[35rem] font-serif font-black text-red-600 leading-none whitespace-nowrap select-none">
              
            </h1>
          </div>

          <div className="relative z-10 flex flex-col items-start max-w-5xl mx-auto px-6 w-full">
            
            {/* 1. As we expand... */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="mb-6 md:mb-8 max-w-5xl"
            >
              <p className="text-lg sm:text-xl landscape:text-base md:text-2xl md:landscape:text-lg lg:landscape:text-2xl font-bold text-neutral-800 uppercase tracking-widest leading-relaxed">
                <ScrollText text="As we expand our slate of films, web series, microdrama shows, television serials, and other new formats," />
              </p>
            </motion.div>

            {/* 2. WE WELCOME */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              className="flex items-end mb-2 md:mb-4"
            >
              <h4 className="text-red-600 font-bold uppercase tracking-[0.3em] text-xl landscape:text-lg md:text-3xl md:landscape:text-xl lg:text-4xl lg:landscape:text-4xl">
                WE WELCOME
              </h4>
            </motion.div>

            {/* 3. investors */}
            <h2 className="font-serif text-[3.5rem] sm:text-[5rem] landscape:text-[3rem] md:text-[7rem] md:landscape:text-[4.5rem] lg:text-[8rem] lg:landscape:text-[8rem] leading-[0.8] tracking-tighter text-black -ml-1 md:-ml-2">
              <ScrollText text="investors" />
            </h2>

            {/* 4. & sponsors */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6 pl-4 sm:pl-16 md:pl-24 lg:pl-32 mt-6 landscape:mt-2 md:mt-10 md:landscape:mt-4 lg:landscape:mt-10"
            >
              <h2 className="font-serif text-[3.5rem] sm:text-[4.5rem] landscape:text-[2.5rem] md:text-[6rem] md:landscape:text-[4rem] lg:text-[7rem] lg:landscape:text-[7rem] leading-[0.8] tracking-tighter text-black">
                <ScrollText text="& sponsors" />
              </h2>
            </motion.div>

            {/* 5. who want to be part... */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              className="mt-6 md:mt-8 pl-4 sm:pl-16 md:pl-24 lg:pl-32"
            >
              <p className="text-lg sm:text-xl landscape:text-base md:text-2xl md:landscape:text-lg lg:landscape:text-2xl font-medium text-neutral-800 max-w-4xl leading-relaxed">
                <ScrollText text="who want to be part of compelling entertainment with strong commercial potential." />
              </p>
            </motion.div>

          </div>
        </section>

        {/* Invest In Our Project Form */}
        <ContactForm 
          titlePrefix="INVEST IN OR SPONSOR OUR"
          titleHighlight="PROJECTS"
          input4Placeholder="Company"
          clientText="Potential investors/sponsors"
          buttonTheme="red"
        />

      </main>

      <EntertainmentFooter />
    </div>
  );
};

export default AboutEntertainment;
