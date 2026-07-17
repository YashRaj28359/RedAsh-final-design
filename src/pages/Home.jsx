import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../components/HeroSection/HeroSection';
import VideoGrid from '../components/VideoGrid/VideoGrid';
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
      </main>
    </motion.div>
  );
};

export default Home;
