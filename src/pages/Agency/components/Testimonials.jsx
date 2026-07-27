import React, { useState } from 'react';
import { FaStar, FaPlay, FaTimes } from 'react-icons/fa';

const VideoTestimonial = ({ name, title, company, videoId, rotationClass = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className={`w-full bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col group h-full transition-all duration-300 hover:rotate-0 hover:scale-[1.02] z-10 hover:z-20 ${rotationClass}`}>
      {/* Thumbnail / Video Section */}
      <div className="relative w-full h-48 md:h-52 bg-gray-200 overflow-hidden">
        {isPlaying ? (
          <>
            <iframe 
              className="w-full h-full absolute inset-0"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
            
            {/* Close Video Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(false);
              }}
              className="absolute top-3 right-3 w-8 h-8 md:w-10 md:h-10 bg-brand-blue hover:bg-blue-700 backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-lg z-20"
              title="Close Video"
            >
              <FaTimes className="text-white text-sm md:text-base" />
            </button>
          </>
        ) : (
          <div className="w-full h-full relative cursor-pointer" onClick={() => setIsPlaying(true)}>
            <img src={thumbUrl} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />


            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
                <FaPlay className="text-gray-900 ml-1 text-xl" />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom Content Section */}
      <div className="p-5 md:p-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2 flex-grow bg-white">
        <div>
          <h4 className="text-gray-900 font-bold text-lg">{name}</h4>
          <p className="text-gray-500 text-xs md:text-sm mt-0.5">{title}</p>
          <p className="text-brand-blue text-sm font-semibold mt-0.5">{company}</p>
        </div>
      </div>
    </div>
  );
};

const TextTestimonial = ({ text, name, title, company, avatar, rotationClass = "" }) => (
  <div className={`w-full bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col justify-between h-full transition-all duration-300 hover:rotate-0 hover:scale-[1.02] z-10 hover:z-20 ${rotationClass} group overflow-hidden relative`}>
    
    {/* Blue background sliding up from bottom */}
    <div className="absolute inset-0 bg-brand-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0"></div>

    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <span className="text-6xl text-blue-400/40 group-hover:text-white/40 transition-colors duration-300 font-serif leading-none h-10 block">“</span>
      </div>
      <p className="text-gray-700 group-hover:text-white transition-colors duration-300 font-medium text-sm md:text-base leading-relaxed mb-8">
        {text}
      </p>
    </div>
    
    <div className="flex items-center gap-4 mt-auto relative z-10">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover shadow-sm group-hover:shadow-md transition-all duration-300" />
      <div>
        <h4 className="font-bold text-gray-900 group-hover:text-white transition-colors duration-300 text-sm md:text-base">{name}</h4>
        <p className="text-gray-500 group-hover:text-white/80 transition-colors duration-300 text-xs mt-0.5">{title}</p>
        <p className="text-brand-blue group-hover:text-white transition-colors duration-300 text-xs font-semibold mt-0.5">{company}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="w-full pt-12 pb-24 bg-[#FAFAFA] relative z-20 font-main">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 w-full overflow-hidden">
          <div className="flex items-center justify-center w-full mb-4">
            <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-gray-300 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(22,114,239,0.5)]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-hero font-extrabold tracking-wider text-brand-gray mx-4 md:mx-6 text-center uppercase whitespace-nowrap">
              Testimonials
            </h2>
            <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-l from-transparent via-gray-200 to-gray-300 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(22,114,239,0.5)]"></div>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          
          {/* Row 1 */}
          <VideoTestimonial 
            name="Kuljit Chadha" 
            title="Co-Founder & COO" 
            company="Disprz" 
            videoId="1AUDTOK84ns" 
            rotationClass="-rotate-2"
          />
          <VideoTestimonial 
            name="Sudeep Rao" 
            title="Associate Director, Marketing" 
            company="Sigmoid" 
            videoId="27Fip-3VgSU" 
            rotationClass="rotate-1"
          />
          <TextTestimonial 
            text="This is a random text testimonial. The service was absolutely fantastic and exceeded our expectations in every way! We could not have asked for a better partner."
            name="Isabella Rodriguez"
            title="CEO & Co-founder"
            company="ABC Company"
            avatar="https://i.pravatar.cc/150?img=47"
            rotationClass="-rotate-1"
          />

          {/* Row 2 */}
          <TextTestimonial 
            text="Creative geniuses who listen, understand, and craft captivating visuals – an agency that truly understands our needs."
            name="Gabrielle Williams"
            title="CEO & Co-founder"
            company="ABC Company"
            avatar="https://i.pravatar.cc/150?img=5"
            rotationClass="rotate-2"
          />
          <TextTestimonial 
            text="Exceeded our expectations with innovative designs that brought our vision to life – a truly remarkable creative agency."
            name="Samantha Johnson"
            title="CEO & Co-founder"
            company="ABC Company"
            avatar="https://i.pravatar.cc/150?img=44"
            rotationClass="-rotate-2"
          />
          <TextTestimonial 
            text="From concept to execution, their creativity knows no bounds – a game-changer for our brand's success."
            name="Natalie Martinez"
            title="CEO & Co-founder"
            company="ABC Company"
            avatar="https://i.pravatar.cc/150?img=33"
            rotationClass="rotate-1"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
