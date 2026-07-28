import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import TopGlobalClients from './components/TopGlobalClients';
import ContactForm from '../../components/ContactForm/ContactForm';
import Footer from '../../components/Footer/Footer';

// Images for About section
import pic1 from '../../assets/About/Pictures/Pictures/Copy of 0D2A9269 copy.JPG';
import pic2 from '../../assets/About/Pictures/Pictures/Copy of 7K7A8144__01__01.jpg';

// Placeholder for images from Google Drive
const PlaceholderImage = ({ text, className }) => (
  <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-2xl shadow-xl overflow-hidden ${className}`}>
    <span className="text-gray-400 font-bold tracking-widest text-sm uppercase opacity-50 px-4 text-center">
      {text || 'Replace with image from Drive'}
    </span>
  </div>
);

const RevealWord = ({ children, scrollYProgress, start, end, className }) => {
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={className}>
      {children}
    </motion.span>
  );
};

const RevealText = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 75%", "end 60%"]
  });

  const words = [
    "Join", "us", "on", "this", "<br/>",
    "exciting", "journey", "of", "<br/>",
    "success", "at", "<br/>",
    "RedAsh", "Films,", "<br/>",
    "where", "innovation", "<br/>",
    "meets", "impact.", "<br/>",
    "Together,", "let's", "<br/>",
    "redefine", "<br/>",
    "possibilities."
  ];

  // We only count actual words for the progress calculation
  const totalWords = words.filter(w => w !== "<br/>").length;
  let wordCount = 0;
  let lineIndex = 0;
  let isFirstWordOfLine = true;

  // Pre-defined staggered left margins for each line to create the artistic random layout
  const lineOffsets = [
    "ml-0",               // Join us on this
    "ml-8 md:ml-16",      // exciting journey of
    "ml-4 md:ml-8",       // success at
    "ml-12 md:ml-24",     // RedAsh Films,
    "ml-2 md:ml-6",       // where innovation
    "ml-16 md:ml-32",     // meets impact.
    "ml-6 md:ml-12",      // Together, let's
    "ml-20 md:ml-40",     // redefine
    "ml-10 md:ml-20"      // possibilities.
  ];

  return (
    <h2 ref={targetRef} className="text-3xl md:text-5xl lg:text-6xl font-main font-bold text-brand-black leading-[1.1] tracking-tighter lowercase flex flex-wrap w-full">
      {words.map((word, i) => {
        if (word === "<br/>") {
          lineIndex++;
          isFirstWordOfLine = true;
          return <div key={i} className="w-full h-0 basis-full" />;
        }
        
        const start = wordCount / totalWords;
        const end = start + (1 / totalWords);
        wordCount++;
        
        let specialClasses = "";
        if (word === "innovation" || word === "impact.") {
          specialClasses = "text-brand-blue";
        }

        // Apply stagger offset to the first word of the line
        let offsetClass = "";
        if (isFirstWordOfLine) {
          offsetClass = lineOffsets[lineIndex % lineOffsets.length];
          isFirstWordOfLine = false;
        }
        
        return (
          <RevealWord 
            key={i} 
            scrollYProgress={scrollYProgress}
            start={start}
            end={end}
            className={`inline-block mr-[0.25em] mb-[0.1em] ${specialClasses} ${offsetClass}`}
          >
            {word}
          </RevealWord>
        );
      })}
    </h2>
  );
};

const ConnectorLines = () => {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 70%", "end 90%"]
  });

  // Horizontal line scales from center
  const horizontalScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  // Vertical line scales from top, starting after horizontal finishes
  const verticalScale = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <div ref={lineRef} className="mt-12 md:mt-16 flex flex-col items-center w-full relative z-10">
      {/* Horizontal Line */}
      <motion.div 
        style={{ scaleX: horizontalScale, transformOrigin: "center" }}
        className="h-[2px] bg-brand-black w-48 md:w-64"
      />
      {/* Vertical Line extending deep into the next section */}
      <motion.div 
        style={{ scaleY: verticalScale, transformOrigin: "top" }}
        className="w-[2px] bg-brand-black h-48 md:h-72 mb-0"
      />
    </div>
  );
};

const AboutAgency = () => {
  const containerRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const aboutImages = [pic1, pic2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full bg-white text-black font-main overflow-x-hidden font-smoothing-antialiased selection:bg-brand-blue selection:text-white"
    >
      <Navbar />
      
      <main className="relative z-10 w-full flex flex-col pt-24">
        
        {/* Hero Section */}
        <section className="relative w-full min-h-[70vh] flex items-center justify-center px-6 md:px-12 overflow-hidden py-20">
          <motion.div 
            className="absolute inset-0 z-0 opacity-10"
            style={{ y: backgroundY }}
          >
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
             <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-red rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
             <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
          </motion.div>
          
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-hero text-5xl md:text-7xl lg:text-8xl tracking-tighter text-brand-black mb-6">
                About <span className="relative whitespace-nowrap">
                  <span className="text-brand-red">Red</span>
                  <span className="text-gray-500">Ash</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 -z-10 rounded-sm"></span>
                </span>
              </h1>
              <div className="w-24 h-1 bg-brand-blue mx-auto mt-8 rounded-full" />
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.4, delayChildren: 0.4 }
                }
              }}
              initial="hidden"
              animate="visible"
              className="flex flex-col font-black uppercase leading-[0.85] tracking-tighter w-fit mx-auto mt-16"
            >
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                className="self-end text-brand-black text-[12vw] md:text-[8rem]"
              >
                WELCOME
              </motion.div>
              <div className="self-start text-[12vw] md:text-[8rem] -mt-2 md:-mt-4 ml-0 md:ml-12 whitespace-nowrap flex">
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                  className="text-brand-gray mr-4 md:mr-8"
                >
                  TO
                </motion.div>
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                >
                  <span className="text-brand-red">RED</span>
                  <span className="text-brand-gray">ASH</span>
                </motion.div>
              </div>
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                className="self-start text-brand-blue text-[13vw] md:text-[9rem] -mt-2 md:-mt-4 -ml-2 md:-ml-4"
              >
                AGENCY<span className="text-[10vw] md:text-[8.5rem]">!</span>
              </motion.div>
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                className="self-end text-brand-black text-[10vw] md:text-[7rem] -mt-2 md:-mt-4 mr-0 md:mr-8"
              >
                FOUNDED IN
              </motion.div>
              
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                className="flex flex-col md:flex-row items-end justify-end w-full mt-2 md:mt-0 gap-4 md:gap-8"
              >
                <div className="text-left text-sm md:text-lg lg:text-xl font-medium text-gray-500 normal-case leading-snug tracking-normal max-w-[280px] md:max-w-sm pb-2 md:pb-6 mt-6 md:mt-0 self-start md:self-end">
                  by <a href="https://www.linkedin.com/in/ashishlalreal/" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline transition-colors hover:text-blue-700">Ashish Lal</a>, an engineer from IIT Delhi, RedAsh has assembled a highly experienced and professional team of experts spanning filmmaking, advertising, strategy and data analytics.
                </div>
                <div className="self-end text-brand-gray text-[22vw] md:text-[13rem] leading-[0.75]">
                  2007
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Top Global Clients Marquee */}
        <TopGlobalClients 
          layout="wall"
          customTitle={
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-700 leading-relaxed font-main max-w-4xl mx-auto">
              Our portfolio proudly boasts collaborations with esteemed global government and corporate clients, such as
            </h2>
          }
        />

        {/* Content Section 1 - Image Left, Text Right */}
        <section className="py-24 px-6 md:px-12 bg-white relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] lg:h-[600px] w-full"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl z-10 bg-white">
                <AnimatePresence>
                  <motion.img 
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    src={aboutImages[currentImageIndex]} 
                    alt={`RedAsh Team ${currentImageIndex + 1}`} 
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:h-[600px] flex flex-col justify-center relative py-8 md:py-12"
            >
              {/* Decorative Accent */}
              <div className="absolute top-1/4 bottom-1/4 left-0 w-1.5 md:w-2  from-brand-red via-purple-500 to-brand-blue rounded-full" />
              
              <div className="space-y-8 pl-6 md:pl-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-hero tracking-tight text-brand-black leading-tight">
                  A Catalyst for <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-blue">
                    Exponential
                  </span> Growth
                </h2>
                
                <div className="w-20 h-1 bg-gray-200 rounded-full"></div>
                
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                  Throughout the years in the industry, RedAsh Films has been a catalyst for exponential growth, thanks to our <span className="font-semibold text-brand-black">bespoke and imaginative strategies</span>. 
                </p>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                  Our mission is to continue empowering organizations to reach their <span className="font-semibold text-brand-blue">full potential</span>.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Join Us CTA Section - Poster Typography Style */}
        <section className="pt-24 pb-0 px-6 md:px-12 bg-white relative flex flex-col items-center overflow-visible">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-start gap-4 md:gap-8 max-w-4xl mx-auto"
          >
            {/* Giant Quote Mark */}
            <div className="text-[6rem] md:text-[10rem] lg:text-[12rem] leading-none font-hero text-gray-200 select-none translate-y-2 md:translate-y-8">
              “
            </div>
            
            {/* Stacked Typographic Text with Scroll Reveal */}
            <div className="flex-1 mt-2 ml-8 md:ml-32 lg:ml-48">
              <RevealText />
            </div>
          </motion.div>
          
          <ConnectorLines />
        </section>

        {/* Bottom Quotation / Contact Form */}
        <div id="quotation-section" className="bg-gray-50">
          <ContactForm 
            linkColorClass="text-brand-blue hover:text-blue-700" 
            highlightColorClass="text-brand-blue"
            headingClass="font-hero tracking-wider text-brand-gray"
          />
        </div>

      </main>

      {/* Footer customized with Agency navigation links and exact social order requested */}
      <Footer />
    </div>
  );
};

export default AboutAgency;
