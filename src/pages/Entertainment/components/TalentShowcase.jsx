import React from 'react';
import { motion } from 'framer-motion';

import imgAshish from '../../../assets/Films/celebs/Ashish - IMG_9131.jpg';
import imgSurbhi from '../../../assets/Films/celebs/Surbhi jyoti.png';
import imgUpendra from '../../../assets/Films/celebs/Updendra limaye.png';
import imgVidya from '../../../assets/Films/celebs/Vidya Malavade.png';
import imgZakir from '../../../assets/Films/celebs/Zakir_New.jpg';
import imgNavni from '../../../assets/Films/celebs/Navni Parihar.png';
import imgDurgesh from '../../../assets/Films/celebs/durgesh kumar.jpg';
import imgPariva from '../../../assets/Films/celebs/Pariva Pranati.png';
import imgTom from '../../../assets/Films/celebs/Tom Alter.png';
import imgSeema from '../../../assets/Films/celebs/Seema Biswas.png';
import imgKiran from '../../../assets/Films/celebs/kiran kumar.jpg';
import imgNibedita from '../../../assets/Films/celebs/Nibeditaa Paal.png';
import imgPiyush from '../../../assets/Films/celebs/Piyush Sahdev.png';

const artists = [
  { id: 1, name: 'Ashish Lal', image: imgAshish, imdb: 'https://www.imdb.com/name/nm9318858/' },
  { id: 2, name: 'Surbhi Jyoti', image: imgSurbhi, imdb: 'https://www.imdb.com/name/nm5123651/' },
  { id: 3, name: 'Upendra Limaye', image: imgUpendra, imdb: 'https://www.imdb.com/name/nm1822342/?utm_source=chatgpt.com&ref_=ext_shr_lnk' },
  { id: 4, name: 'Vidya Malavade', image: imgVidya, imdb: 'https://www.imdb.com/name/nm1540244/' },
  { id: 5, name: 'Zakir Hussain', image: imgZakir, imdb: 'https://www.imdb.com/name/nm1664541/' },
  { id: 6, name: 'Navni Parihar', image: imgNavni, imdb: 'https://www.imdb.com/name/nm1106067/' },
  { id: 7, name: 'Durgesh Kumar', image: imgDurgesh, imdb: 'https://www.imdb.com/name/nm6294201/' },
  { id: 8, name: 'Pariva Pranati', image: imgPariva, imdb: 'https://www.imdb.com/name/nm3198154/' },
  { id: 9, name: 'Tom Alter', image: imgTom, imdb: 'https://www.imdb.com/name/nm0022758/?utm_source=chatgpt.com&ref_=ext_shr_lnk' },
  { id: 10, name: 'Seema Biswas', image: imgSeema, imdb: 'https://www.imdb.com/name/nm0084443/?utm_source=chatgpt.com&ref_=ext_shr_lnk' },
  { id: 11, name: 'Kiran Kumar', image: imgKiran, imdb: 'https://www.imdb.com/name/nm0474820/?utm_source=chatgpt.com&ref_=ext_shr_lnk' },
  { id: 12, name: 'Nibedita Paal', image: imgNibedita, imdb: 'https://www.imdb.com/name/nm11163593/' },
  { id: 13, name: 'Piyush Sahdev', image: imgPiyush, imdb: 'https://www.imdb.com/name/nm9824657/?ref_=ext_shr_lnk' },
];

const ArtistCard = ({ artist }) => {
  // Generate a pseudo-random tilt between -3deg and 3deg based on the artist's ID
  const tiltClass = artist.id % 4 === 0 ? 'hover:rotate-3' : 
                    artist.id % 3 === 0 ? 'hover:-rotate-2' : 
                    artist.id % 2 === 0 ? 'hover:rotate-2' : 'hover:-rotate-3';

  return (
    <motion.a 
      href={artist.imdb}
      target="_blank"
      rel="noreferrer"
      className={`block w-full aspect-[3/4] rounded-lg md:rounded-xl overflow-hidden shadow-sm relative group cursor-pointer transition-all duration-500 hover:scale-[1.15] hover:-translate-y-2 hover:z-50 hover:shadow-2xl ${tiltClass}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <img 
        src={artist.image} 
        alt={artist.name} 
        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105" 
        loading="lazy"
      />
      
      {/* Hover Overlay - Fade black from bottom only, name bottom left */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-5">
        <h3 className="text-white font-hero text-[10px] md:text-sm tracking-[0.1em] uppercase font-bold text-left translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {artist.name}
        </h3>
      </div>
    </motion.a>
  );
};

const TalentShowcase = () => {
  return (
    <section id="talent" className="w-full py-16 md:py-24 bg-white font-main relative overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col gap-4">
        
        {/* Section Heading Lockup */}
        <div className="w-full flex flex-col items-center justify-center text-center mb-6 md:mb-12 mt-2 md:mt-4 select-none">
          
          {/* WE HAVE */}
          <div className="flex items-center gap-2 md:gap-4 mb-1">
            <div className="w-8 md:w-16 h-[1px] bg-neutral-800"></div>
            <span className="text-brand-red font-bold text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase whitespace-nowrap">We Have</span>
            <div className="w-8 md:w-16 h-[1px] bg-neutral-800"></div>
          </div>

          {/* COLLABORATED */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-hero text-neutral-950 leading-[0.85] tracking-tight md:tracking-normal mb-1 md:mb-1.5 scale-y-110">
            COLLABORATED
          </h2>

          {/* with ACCLAIMED */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 w-full -mt-1 md:-mt-1.5">
            <span className="text-brand-red text-2xl md:text-4xl -rotate-[15deg] mb-1 md:mb-0 mr-2" style={{ fontFamily: '"Brush Script MT", "Caveat", cursive', fontWeight: 600 }}>with</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-hero text-neutral-950 leading-[0.85] tracking-tight scale-y-110">
              ACCLAIMED
            </h2>
          </div>

          {/* ARTISTS */}
          <div className="relative mt-3 md:mt-5 mb-4 md:mb-8">
            <div className="absolute inset-0 bg-brand-red transform -skew-x-[6deg] scale-110 md:scale-x-110 md:scale-y-125 rounded-sm"></div>
            <h2 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-hero text-white leading-none px-4 md:px-6 py-1 tracking-wide scale-y-110">
              ARTISTS
            </h2>
          </div>

          {/* INCLUDING */}
          <div className="flex items-center gap-3 md:gap-5 mt-2">
            <div className="flex items-center">
               <div className="w-8 md:w-16 h-[1px] bg-neutral-800"></div>
               <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-brand-red -ml-1 md:-ml-1.5 z-10"></div>
            </div>
            <span className="text-neutral-900 font-bold text-[9px] md:text-sm tracking-[0.5em] md:tracking-[0.7em] uppercase mx-1 md:mx-2 whitespace-nowrap">Including</span>
            <div className="flex items-center">
               <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-brand-red -mr-1 md:-mr-1.5 z-10"></div>
               <div className="w-8 md:w-16 h-[1px] bg-neutral-800"></div>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT (md and up) */}
        <div className="hidden md:flex flex-col gap-2 lg:gap-4">
          
          {/* Top Row: 6 images */}
          <div className="grid grid-cols-6 gap-2 lg:gap-4">
            {artists.slice(0, 6).map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>

          {/* Bottom Row: 7 images */}
          <div className="grid grid-cols-7 gap-2 lg:gap-4">
            {artists.slice(6, 13).map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
          
        </div>

        {/* MOBILE LAYOUT (hidden on md) - Simple uniform grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:hidden">
          {artists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TalentShowcase;
