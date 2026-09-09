import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './components/Navbar';
import EnterpriseFilms from './components/EnterpriseFilms';
import ContactForm from '../../components/ContactForm/ContactForm';
import AgencyFooter from './components/AgencyFooter';
import { getCachedContent, fetchContent } from '../../utils/api';

const AgencyFilms = () => {
  const containerRef = useRef(null);
  const [heroData, setHeroData] = useState({});
  const [catsData, setCatsData] = useState({});
  const [videosData, setVideosData] = useState({});

  useGSAP(() => {
    // Fade in page smoothly
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );
  }, { scope: containerRef });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      const applyContent = (data) => {
        if (data?.['agency-films']?.hero) {
          setHeroData(data['agency-films'].hero);
        }
        if (data?.['agency-films']?.categories) {
          setCatsData(data['agency-films'].categories);
        }
        const af = data?.['agency-films'] || {};
        const vids = af.videos || af['agency-films']?.videos;
        if (vids) {
          setVideosData(vids);
        }
      };

      const cached = getCachedContent();
      if (cached) applyContent(cached);

      const fresh = await fetchContent();
      if (fresh) applyContent(fresh);
    };
    loadContent();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full bg-white text-black font-main overflow-x-hidden font-smoothing-antialiased"
    >
      <Navbar />
      
      <main className="relative z-10 w-full flex flex-col pt-24">
        
        <EnterpriseFilms heroData={heroData} catsData={catsData} videosData={videosData} />
        
        {/* Bottom Quotation / Contact Form */}
        <div id="quotation-section" className="bg-gray-50 mt-16">
          <ContactForm 
            dataSource="agency"
            linkColorClass="text-brand-blue hover:text-blue-700" 
            highlightColorClass="text-brand-blue"
            headingClass="font-hero tracking-wider text-brand-gray"
          />
        </div>

      </main>

      <AgencyFooter />
    </div>
  );
};

export default AgencyFilms;
