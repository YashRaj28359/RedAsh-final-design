import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VideoCard from '../VideoCard/VideoCard';
import { videos } from '../../data/videoData';
import { motion } from 'framer-motion';
import YouTube from 'react-youtube';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

import { flushSync } from 'react-dom';

const VideoGrid = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [player, setPlayer] = useState(null);
  const [dynamicVideos, setDynamicVideos] = useState(null);

  const extractYouTubeId = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/content')
      .then(res => res.json())
      .then(data => {
        if (data && data.homepage && data.homepage.video_tile && data.homepage.video_tile.videos) {
          setDynamicVideos(data.homepage.video_tile.videos);
        } else {
          setDynamicVideos([]); // empty
        }
      })
      .catch(err => {
        console.error('Failed to fetch videos:', err);
        setDynamicVideos([]);
      });
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null);
        if (player) player.pauseVideo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';

      const handleVisibilityChange = () => {
        if (document.hidden || document.visibilityState === 'hidden') {
          if (player && typeof player.pauseVideo === 'function') {
            player.pauseVideo();
          }
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("pagehide", handleVisibilityChange);

      return () => { 
        document.body.style.overflow = 'unset'; 
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("pagehide", handleVisibilityChange);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedVideo, player]);

  const displayVideos = (dynamicVideos || []).map(v => ({ ...v, uniqueId: v.uniqueId || v.id }));

  if (dynamicVideos === null) {
    return <div className="w-full h-[200px] flex items-center justify-center">Loading Videos...</div>;
  }
  
  if (dynamicVideos.length === 0) {
    return <div className="w-full h-[200px] flex items-center justify-center text-gray-500">No videos added yet.</div>;
  }

  return (
    <>
    <section className="w-full px-4 md:px-8 pb-10 bg-white">
      <style>
        {`
          @media (max-width: 1023px) and (orientation: landscape) {
            .mobile-landscape-item {
              width: 22.75% !important;
            }
            .mobile-landscape-buttons {
              flex-direction: row !important;
              gap: 12px !important;
              width: 100% !important;
            }
            .mobile-landscape-wrapper {
              flex: 1 1 0% !important;
              min-width: 0 !important;
            }
            .mobile-landscape-btn {
              white-space: normal !important;
              text-align: center !important;
              padding-left: 0.5rem !important;
              padding-right: 0.5rem !important;
              font-size: 0.8rem !important;
              line-height: 1.2 !important;
              width: 100% !important;
            }
          }
          @media (max-width: 1023px) and (orientation: portrait) {
            .hide-on-mobile-portrait {
              display: none !important;
            }
          }
        `}
      </style>
      <div className="w-full mx-auto">
        <motion.div 
          className="flex flex-wrap justify-start gap-x-[8%] md:gap-x-[3%] xl:gap-x-[5%] gap-y-4 w-full md:pl-[1.5%]"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {displayVideos.map((video) => (
            <motion.div 
              key={video.uniqueId} 
              variants={itemVariants}
              className="w-[46%] md:w-[14%] xl:w-[12%] mobile-landscape-item"
            >
              <VideoCard video={video} onClick={() => {
                const url = video.url || video.videoUrl;
                if (!url || !url.includes('youtu')) return;
                
                setSelectedVideo(video);
                if (player) {
                  const videoId = video.id || (video.videoUrl ? extractYouTubeId(video.videoUrl) : null);
                  if (videoId) {
                    player.loadVideoById(videoId);
                    player.playVideo();
                  }
                }
              }} />
            </motion.div>
          ))}
        </motion.div>

        {/* Division Navigation Buttons */}
        <div className="w-full md:w-[99%] xl:w-[97%] mx-auto mt-12 md:mt-16 flex flex-col lg:flex-row gap-6 md:gap-8 mobile-landscape-buttons hide-on-mobile-portrait">
          <div className="flex-1 flex justify-center lg:justify-center mobile-landscape-wrapper">
            <Link to="/entertainment" className="w-full flex justify-center">
              <button className="bg-[#E20002] hover:bg-[#cc0000] transition-colors text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-md text-sm md:text-lg uppercase flex items-center justify-center shadow-md tracking-wider w-full sm:w-[380px] md:w-[450px] lg:w-[480px] whitespace-nowrap mobile-landscape-btn">
                GO TO REDASH ENTERTAINMENT FILMS
              </button>
            </Link>
          </div>
          <div className="flex-1 flex justify-center lg:justify-center mobile-landscape-wrapper">
            <Link to="/ad-agency" className="w-full flex justify-center">
              <button className="bg-brand-blue hover:bg-[#0f4a9b] transition-colors text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-md text-sm md:text-lg uppercase flex items-center justify-center shadow-md tracking-wider w-full sm:w-[380px] md:w-[450px] lg:w-[480px] whitespace-nowrap mobile-landscape-btn">
                GO TO REDASH AD AGENCY
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>

    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12 transition-opacity duration-300 ${selectedVideo ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      style={{ visibility: selectedVideo ? 'visible' : 'hidden' }}
      onClick={() => {
        setSelectedVideo(null);
        if (player) player.pauseVideo();
      }}
      data-lenis-prevent="true"
    >
      <div 
        className="relative w-full max-w-6xl aspect-video bg-black rounded-xl shadow-2xl mt-16 md:mt-24"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => {
            setSelectedVideo(null);
            if (player) player.pauseVideo();
          }}
          className="absolute -top-12 md:-top-16 right-0 z-20 w-10 h-10 bg-black/50 hover:bg-brand-red rounded-full text-white flex items-center justify-center transition-colors font-bold"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        {selectedVideo && (
          <YouTube
            videoId={selectedVideo.id}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 1,
                rel: 0,
                modestbranding: 1,
                playsinline: 1
              }
            }}
            className="w-full h-full relative z-10 rounded-xl overflow-hidden"
            iframeClassName="w-full h-full border-0 absolute inset-0"
            onReady={(e) => setPlayer(e.target)}
          />
        )}
      </div>
    </div>
    </>
  );
};

export default VideoGrid;
