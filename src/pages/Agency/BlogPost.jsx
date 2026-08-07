import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import Navbar from './components/Navbar';
import AgencyFooter from './components/AgencyFooter';
import blogsData from '../../data/blogs.json';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [prevBlog, setPrevBlog] = useState(null);
  const [nextBlog, setNextBlog] = useState(null);

  useEffect(() => {
    const currentIndex = blogsData.findIndex(b => b.slug === slug);
    if (currentIndex !== -1) {
      setBlog(blogsData[currentIndex]);
      setNextBlog(currentIndex > 0 ? blogsData[currentIndex - 1] : null);
      setPrevBlog(currentIndex < blogsData.length - 1 ? blogsData[currentIndex + 1] : null);
    } else {
      navigate('/ad-agency/blog');
    }
  }, [slug, navigate]);

  if (!blog) return null;

  // Get 4 suggested blogs (excluding the current one)
  const suggestedBlogs = blogsData.filter(b => b.id !== blog.id).slice(0, 4);

  const renderSuggestedBlogs = () => (
    <>
      <h3 className="text-2xl font-hero font-bold tracking-widest text-brand-black mb-8 uppercase flex items-center gap-3">
        <span className="w-8 h-[2px] bg-brand-blue block"></span>
        Suggested Reads
      </h3>
      <div className="flex flex-col gap-6">
        {suggestedBlogs.map((suggested) => (
          <Link key={suggested.id} to={`/ad-agency/blog/${suggested.slug}`} className="group flex gap-4 items-start bg-gray-50 p-3 rounded-xl hover:shadow-lg hover:bg-white border border-transparent transition-all duration-300">
            <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
              {suggested.imageUrl ? (
                <img src={suggested.imageUrl} alt={suggested.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[10px] text-gray-400 font-bold text-center">NO IMG</span>
                </div>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-[10px] font-bold tracking-widest uppercase text-brand-blue mb-1">
                {new Date(suggested.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <h4 className="font-bold text-brand-black text-sm leading-snug group-hover:text-brand-blue transition-colors line-clamp-3" dangerouslySetInnerHTML={{ __html: suggested.title }} />
            </div>
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col font-main">
      <Navbar />
      
      {/* Hero Title */}
      <section className="pt-24 md:pt-32 pb-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto w-full">
          <Link 
            to="/ad-agency/blog" 
            className="inline-flex items-center text-gray-500 hover:text-brand-blue mb-8 font-bold text-sm uppercase tracking-widest transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back to Blogs
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-brand-blue font-bold text-sm tracking-widest uppercase bg-blue-100/50 px-4 py-1.5 rounded-full">
                {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-hero font-black tracking-wide text-brand-black mb-4 leading-tight w-full"
              dangerouslySetInnerHTML={{ __html: blog.title }}
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.imageUrl && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10"
        >
          <img 
            src={blog.imageUrl} 
            alt={blog.title} 
            className="w-full object-cover aspect-video md:aspect-[21/9]"
          />
        </motion.div>
      )}

      {/* Content & Sidebar */}
      <section className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 w-full block">
        
        {/* Floated Sidebar for Desktop */}
        <aside className="hidden lg:block float-right w-[350px] xl:w-[400px] ml-12 mb-12">
          {renderSuggestedBlogs()}
        </aside>

        {/* Main Content Area */}
        <div className="w-full block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-lg prose-blue max-w-none font-main text-gray-800
                       prose-headings:font-main prose-headings:font-bold prose-headings:text-brand-black
                       prose-h2:text-4xl md:prose-h2:text-5xl prose-h2:mt-12 prose-h2:mb-6
                       prose-h3:text-3xl md:prose-h3:text-4xl prose-h3:mt-10 prose-h3:mb-5
                       prose-h4:text-2xl md:prose-h4:text-3xl prose-h4:mt-8 prose-h4:mb-4
                       prose-p:leading-relaxed
                       prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline
                       prose-img:rounded-xl prose-img:shadow-lg
                       prose-li:marker:text-brand-blue"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Clear fix to ensure buttons render below all text and sidebar */}
        <div className="clear-both"></div>

        {/* Next / Previous Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
          {prevBlog ? (
            <Link to={`/ad-agency/blog/${prevBlog.slug}`} className="flex-1 group flex flex-col items-start bg-gray-50 p-4 rounded-xl hover:bg-brand-blue hover:text-white transition-colors duration-300">
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 group-hover:text-blue-200 mb-2 flex items-center gap-1"><FiArrowLeft /> Previous Article</span>
              <span className="font-bold text-sm md:text-base leading-snug line-clamp-2" dangerouslySetInnerHTML={{ __html: prevBlog.title }} />
            </Link>
          ) : <div className="flex-1"></div>}

          {nextBlog ? (
            <Link to={`/ad-agency/blog/${nextBlog.slug}`} className="flex-1 group flex flex-col items-end text-right bg-gray-50 p-4 rounded-xl hover:bg-brand-blue hover:text-white transition-colors duration-300">
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 group-hover:text-blue-200 mb-2 flex items-center gap-1">Next Article <FiArrowRight /></span>
              <span className="font-bold text-sm md:text-base leading-snug line-clamp-2" dangerouslySetInnerHTML={{ __html: nextBlog.title }} />
            </Link>
          ) : <div className="flex-1"></div>}
        </div>

        {/* Sidebar for Mobile/Tablet (Renders below everything) */}
        <aside className="block lg:hidden w-full mt-16 pt-8 border-t border-gray-200">
          {renderSuggestedBlogs()}
        </aside>

      </section>

      <AgencyFooter />
    </div>
  );
};

export default BlogPost;
