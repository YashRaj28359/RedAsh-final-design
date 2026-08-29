import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import AgencyFooter from './components/AgencyFooter';
import blogsData from '../../data/blogs.json';

const BlogList = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-main text-brand-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 md:pt-48 pb-12 px-4 md:px-8 text-center relative overflow-hidden">
        
        {/* Glowing Background Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[400px] bg-gradient-to-r from-transparent via-[#1672EF]/15 to-transparent blur-[120px] pointer-events-none rounded-[100%] scale-y-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1672EF]/15 blur-[150px] pointer-events-none rounded-[100%]"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-hero font-black tracking-wide mb-8 uppercase">
            <span className="text-brand-black">BLOG</span>
            <span className="ext-brand-gray mx-2">-</span>
            <span className="text-brand-red">RED</span>
            <span className="text-brand-gray">ASH </span>
            <span className='text-brand-blue'>AD AGENCY</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl font-main mb-12">
           Read our blogs full of useful insights on the creative and strategic aspects of marketing and film production.
          </p>
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section className="flex-1 max-w-[1400px] mx-auto w-full px-4 md:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogsData.map((blog, index) => {
            const date = new Date(blog.date);
            const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            // Calculate a fake read time based on content length or default to 5
            const readTime = Math.max(3, Math.floor((blog.content?.length || 1000) / 1500));

            return (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index % 4 * 0.1 }}
                className="group h-full"
              >
                <Link 
                  to={`/ad-agency/blog/${blog.slug}`} 
                  className="flex flex-col h-full bg-white p-3 rounded-none border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-blue/5"
                >
                  <div className="relative overflow-hidden rounded-none aspect-[1.5] w-full bg-gray-100">
                    {blog.imageUrl ? (
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[10px] text-gray-400 font-bold tracking-widest">REDASH FILMS</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="px-2 pt-5 pb-3 flex flex-col flex-1">
                    <div className="text-gray-500 font-main text-xs mb-3 font-medium flex items-center gap-2">
                      <span>{formattedDate}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span>{readTime} minute read</span>
                    </div>
                    
                    <h3 
                      className="text-lg md:text-xl font-main font-bold tracking-tight text-brand-black group-hover:text-brand-blue transition-colors duration-300 line-clamp-3 leading-snug"
                      dangerouslySetInnerHTML={{ __html: blog.title }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <AgencyFooter />
    </div>
  );
};

export default BlogList;
