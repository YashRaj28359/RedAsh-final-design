import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../components/HeroSection/HeroSection';
import VideoGrid from '../components/VideoGrid/VideoGrid';
import ServicesInfo from '../components/ServicesInfo/ServicesInfo';
import ContactForm from '../components/ContactForm/ContactForm';
import MediaLinks from '../components/MediaLinks/MediaLinks';
import Footer from '../components/Footer/Footer';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <main>
        <HeroSection />
        <VideoGrid />
        <ServicesInfo />
        <ContactForm />
        <MediaLinks />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Home;
