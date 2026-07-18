import React from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  return (
    <section className="w-full px-4 md:px-8 pt-4 md:pt-20 pb-4 md:pb-8 bg-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Form Container */}
        <div className="w-full flex flex-col items-center">
          
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-subtitle font-bold text-brand-black tracking-[4px] md:tracking-[8px] uppercase mb-6">
              GET A FREE QUOTATION
            </h2>
            <div className="h-[3px] w-20 bg-brand-red mx-auto rounded-full"></div>
          </motion.div>

          {/* Form */}
          <motion.form 
            className="w-full max-w-4xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              
              <input 
                type="text" 
                placeholder="Name *" 
                required
                className="w-full bg-[#FAFAFA] hover:bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 text-sm md:text-base font-main text-brand-black focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/10 transition-all duration-300 placeholder:text-gray-400"
              />
              
              <input 
                type="email" 
                placeholder="Email *" 
                required
                className="w-full bg-[#FAFAFA] hover:bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 text-sm md:text-base font-main text-brand-black focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/10 transition-all duration-300 placeholder:text-gray-400"
              />
              
              <input 
                type="tel" 
                placeholder="Phone Number *" 
                required
                className="w-full bg-[#FAFAFA] hover:bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 text-sm md:text-base font-main text-brand-black focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/10 transition-all duration-300 placeholder:text-gray-400"
              />
              
              <input 
                type="text" 
                placeholder="Company *" 
                required
                className="w-full bg-[#FAFAFA] hover:bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 text-sm md:text-base font-main text-brand-black focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/10 transition-all duration-300 placeholder:text-gray-400"
              />
              
              <div className="md:col-span-2">
                <input 
                  type="text" 
                  placeholder="Your Requirement *" 
                  required
                  className="w-full bg-[#FAFAFA] hover:bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 text-sm md:text-base font-main text-brand-black focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/10 transition-all duration-300 placeholder:text-gray-400"
                />
              </div>

              <div className="md:col-span-2 flex justify-center mt-6">
                <button 
                  type="submit"
                  className="bg-[#E20002] hover:bg-[#E20002] text-white font-main font-bold py-4 px-12 rounded-lg text-sm md:text-base uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-[0_8px_20px_rgba(226,0,2,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3 group"
                >
                  Submit Request
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>
              
            </div>
          </motion.form>

          {/* Footer Text */}
          <motion.div 
            className="w-full max-w-3xl mx-auto text-center space-y-2 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="font-main text-sm md:text-base text-gray-500">
              Potential clients can fill this form or email us at <a href="mailto:info@redashfilms.com" className="font-bold text-[#E20002] hover:text-[#E20002] transition-colors">info@redashfilms.com</a>
            </p>
            <p className="font-main text-sm md:text-base text-gray-500">
              Actors, Film Crew Members & Vendors can email their profiles only at <a href="mailto:redash.films@gmail.com" className="font-bold text-[#E20002] hover:text-[#E20002] transition-colors">redash.films@gmail.com</a>
            </p>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
