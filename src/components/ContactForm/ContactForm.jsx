import React from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  return (
    <section className="w-full px-4 md:px-8 pt-4 md:pt-10 pb-2 md:pb-0 bg-white">
      <div className="w-full md:w-[99%] xl:w-[97%] mx-auto">
        
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
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-subtitle font-bold text-brand-black tracking-[4px] md:tracking-[8px] uppercase mb-6">
              GET A FREE QUOTATION
            </h2>
            <div className="h-[3px] w-20 bg-brand-red mx-auto rounded-full"></div>
          </motion.div>

          {/* Form */}
          <motion.form 
            className="w-full mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col xl:flex-row gap-4 w-full items-stretch">
              
              <input 
                type="text" 
                placeholder="Name" 
                required
                className="flex-1 bg-[#FAFAFA] hover:bg-gray-50 border border-gray-200 rounded-sm px-4 py-3 text-sm font-main text-brand-black focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-1 focus:ring-brand-blue/10 transition-all duration-300 placeholder:text-gray-500"
              />
              
              <input 
                type="email" 
                placeholder="Email" 
                required
                className="flex-1 bg-[#FAFAFA] hover:bg-gray-50 border border-gray-200 rounded-sm px-4 py-3 text-sm font-main text-brand-black focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-1 focus:ring-brand-blue/10 transition-all duration-300 placeholder:text-gray-500"
              />
              
              <input 
                type="tel" 
                placeholder="Phone Number" 
                required
                className="flex-1 bg-[#FAFAFA] hover:bg-gray-50 border border-gray-200 rounded-sm px-4 py-3 text-sm font-main text-brand-black focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-1 focus:ring-brand-blue/10 transition-all duration-300 placeholder:text-gray-500"
              />
              
              <input 
                type="text" 
                placeholder="Company" 
                required
                className="flex-1 bg-[#FAFAFA] hover:bg-gray-50 border border-gray-200 rounded-sm px-4 py-3 text-sm font-main text-brand-black focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-1 focus:ring-brand-blue/10 transition-all duration-300 placeholder:text-gray-500"
              />
              
              <input 
                type="text" 
                placeholder="Your Requirement" 
                required
                className="flex-1 bg-[#FAFAFA] hover:bg-gray-50 border border-gray-200 rounded-sm px-4 py-3 text-sm font-main text-brand-black focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-1 focus:ring-brand-blue/10 transition-all duration-300 placeholder:text-gray-500"
              />

              <button 
                type="submit"
                className="bg-[#E20002] hover:bg-[#c80002] text-white font-main font-bold py-3 px-6 rounded-sm text-sm uppercase transition-all duration-300 flex-1 whitespace-pre-wrap leading-tight shadow-sm hover:shadow-md"
              >
                Get a FREE{"\n"}Quotation
              </button>
              
            </div>
          </motion.form>

          {/* Footer Text */}
          <motion.div 
            className="w-full mx-auto flex flex-col justify-center items-center gap-3 mt-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col xl:flex-row justify-center items-center gap-2 xl:gap-6">
              <p className="font-main text-sm text-gray-700 font-medium">
                Potential clients can fill this form or email us at <a href="mailto:info@redashfilms.com" className="font-bold text-[#E20002] hover:text-[#c80002] transition-colors">info@redashfilms.com</a>
              </p>
              <p className="font-main text-sm text-gray-700 font-medium">
                Actors, Film Crew Members & Vendors can email their profiles only at <a href="mailto:redash.films@gmail.com" className="font-bold text-[#E20002] hover:text-[#c80002] transition-colors">redash.films@gmail.com</a>
              </p>
            </div>
            <p className="font-main text-sm text-gray-700 font-medium">
              <span className="font-bold">RedAsh Office:</span> 1101, Peninsula Park, Fun Republic Lane, Andheri West, Mumbai, 400053 <a href="https://share.google/Pxp4Tva4m3IyfrKAd" target="_blank" rel="noopener noreferrer" className="font-bold text-[#E20002] hover:text-[#c80002] transition-colors hover:underline">(Google Location)</a>
            </p>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
