import React from 'react';
import { motion } from 'framer-motion';

const ContactForm = ({ 
  linkColorClass = "text-brand-red hover:text-blue-700", 
  highlightColorClass = "text-brand-red",
  headingClass = "font-subtitle text-[#6A6A6A] tracking-[4px] md:tracking-[6px] [-webkit-text-stroke:1px_currentColor] md:[-webkit-text-stroke:1.5px_currentColor]",
  showFooter = true,
  titlePrefix = "GET A FREE",
  titleHighlight = "QUOTATION",
  input4Placeholder = "Your Requirement",
  clientText = "Potential clients"
}) => {
  return (
    <section className="w-full px-4 md:px-8 pt-4 md:pt-10 pb-2 md:pb-0 bg-white relative z-10">
      <div className="w-full md:w-[99%] xl:w-[97%] mx-auto py-8">
        
        {/* Form Container */}
        <div className="soft-container mx-auto">
          
          {/* Header */}
          <motion.div 
            className="flex items-center justify-center mb-8 md:mb-12 relative w-full overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-gray-300 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(22,114,239,0.5)]"></div>
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold uppercase mx-2 md:mx-6 whitespace-normal md:whitespace-nowrap text-center leading-tight ${headingClass}`}>
              {titlePrefix} <span className={highlightColorClass}>{titleHighlight}</span>
            </h2>
            <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-l from-transparent via-gray-200 to-gray-300 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(22,114,239,0.5)]"></div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form 
            className="w-full mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col xl:flex-row gap-4 w-full items-stretch">
              
              <div className="soft-input-wrapper">
                <svg className="soft-input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Name" 
                  required
                  className="soft-input"
                />
              </div>
              
              <div className="soft-input-wrapper">
                <svg className="soft-input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <input 
                  type="email" 
                  placeholder="Email" 
                  required
                  className="soft-input"
                />
              </div>
              
              <div className="soft-input-wrapper">
                <svg className="soft-input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  required
                  className="soft-input"
                />
              </div>
              
              <div className="soft-input-wrapper">
                <svg className="soft-input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.118l-12.75 1.02a2.25 2.25 0 01-2.428-2.244v-4.244m17.05-1.732a2.25 2.25 0 00-.124-1.954l-3.23-5.385a2.25 2.25 0 00-1.92-1.073H9.72c-.8 0-1.536.42-1.92 1.073L4.57 12.464a2.25 2.25 0 00-.124 1.954m15.804 0c-.246.31-.607.5-1.01.5H5.334c-.403 0-.764-.19-1.01-.5m15.804 0C21.144 13.91 21.75 13.33 21.75 12.5a2.25 2.25 0 00-2.25-2.25h-15a2.25 2.25 0 00-2.25 2.25c0 .83.606 1.41 1.254 1.65" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Company" 
                  required
                  className="soft-input"
                />
              </div>
              
              <div className="soft-input-wrapper">
                <svg className="soft-input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <input 
                  type="text" 
                  placeholder={input4Placeholder} 
                  required
                  className="soft-input"
                />
              </div>

              <div className="soft-input-wrapper !flex-none xl:!w-auto flex">
                <button 
                  type="submit"
                  className="soft-button w-full xl:w-auto"
                >
                  <span className="text-xs uppercase tracking-wider">SUBMIT REQUEST</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
              
            </div>
          </motion.form>

          {/* Footer Text */}
          {showFooter && (
            <motion.div 
              className="w-full mx-auto flex flex-col justify-center items-center gap-2 mt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-col xl:flex-row justify-center items-center gap-2 xl:gap-6">
                <p className="font-main text-xs md:text-sm text-gray-500 font-medium">
                  {clientText} can fill this form or email us at <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@redashfilms.com" target="_blank" rel="noopener noreferrer" className={`font-bold transition-colors ${linkColorClass}`}>info@redashfilms.com</a>
                </p>
                <p className="hidden xl:block font-main text-sm text-gray-300">|</p>
                <p className="font-main text-xs md:text-sm text-gray-500 font-medium">
                  Actors, Film Crew Members & Vendors can email their profiles only at <a href="https://mail.google.com/mail/?view=cm&fs=1&to=redash.films@gmail.com" target="_blank" rel="noopener noreferrer" className={`font-bold transition-colors ${linkColorClass}`}>redash.films@gmail.com</a>
                </p>
              </div>
              <p className="font-main text-xs md:text-sm text-gray-500 font-medium mt-2">
                <span className="font-bold text-gray-700">RedAsh Office:</span> 1101, Peninsula Park, Fun Republic Lane, Andheri West, Mumbai, 400053 <a href="https://share.google/Pxp4Tva4m3IyfrKAd" target="_blank" rel="noopener noreferrer" className={`font-bold transition-colors hover:underline ${linkColorClass}`}>(Google Location)</a>
              </p>
            </motion.div>
          )}
          
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
