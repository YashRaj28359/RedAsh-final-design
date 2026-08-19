import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import EntertainmentNavbar from './components/EntertainmentNavbar';
import EntertainmentFooter from './components/EntertainmentFooter';
import blogsData from '../../data/entertainmentBlogs.json';

const EntertainmentBlogs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // Format date helper
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="relative min-h-screen w-full bg-white text-black font-main overflow-x-hidden font-smoothing-antialiased flex flex-col">
      <EntertainmentNavbar />
      
      <main className="relative z-10 w-full flex-grow flex flex-col pt-[80px] lg:pt-[100px]">
        {/* Header Section */}
        <div className="w-full bg-white py-16 md:py-24 border-b border-neutral-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-hero text-neutral-950 tracking-wider uppercase mb-6 scale-y-110"
            >
              BLOG - <span className="text-brand-red">RED</span><span className="text-neutral-500">ASH</span> <span className="text-brand-red">FILMS</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-600 font-medium max-w-3xl mx-auto"
            >
              Creative and industry insights from the world of movies, web series, TV serials, microdramas, AI filmmaking, music videos and new-age entertainment.

            </motion.p>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
            <div className="grid grid-cols-1 md:grid-cols-2 landscape:grid-cols-3 md:landscape:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:landscape:grid-cols-4 gap-6 lg:gap-8">
              {blogsData.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                  className="group relative flex flex-col h-[400px] landscape:h-[300px] md:h-[450px] md:landscape:h-[350px] lg:landscape:h-[450px] xl:landscape:h-[450px] overflow-hidden rounded-xl bg-neutral-950 cursor-pointer shadow-lg hover:shadow-brand-red/20 transition-all duration-500"
                >
                  <Link to={`/entertainment/blog/${blog.slug}`} className="absolute inset-0 z-0">
                    {blog.imageUrl ? (
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-40"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-900" />
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-300"></div>
                  </Link>

                  <div className="relative z-10 flex flex-col flex-grow p-6 pointer-events-none">
                    {/* Top Section: Date Badge */}
                    <div className="flex justify-end">
                      <span className="bg-brand-red text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm shadow-md">
                        {formatDate(blog.date)}
                      </span>
                    </div>

                    <div className="mt-auto flex flex-col">
                      <Link to={`/entertainment/blog/${blog.slug}`} className="pointer-events-auto">
                        <h3 
                          className="text-2xl font-bold text-white mb-3 leading-snug line-clamp-3 group-hover:text-brand-red transition-colors duration-300"
                          dangerouslySetInnerHTML={{ __html: blog.title }}
                        />
                      </Link>
                      
                      <div 
                        className="text-neutral-300 text-sm mb-6 line-clamp-2 prose-sm prose-p:my-0"
                        dangerouslySetInnerHTML={{ __html: blog.excerpt }}
                      />
                      
                      <div className="pt-4 border-t border-white/20">
                        <Link 
                          to={`/entertainment/blog/${blog.slug}`}
                          className="inline-flex items-center text-xs font-bold text-white group-hover:text-brand-red transition-colors duration-300 uppercase tracking-widest pointer-events-auto"
                        >
                          Read Article
                          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <EntertainmentFooter />
    </div>
  );
};

export default EntertainmentBlogs;
