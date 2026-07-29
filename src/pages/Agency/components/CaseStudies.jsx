import React from 'react';
import { 
  FaBriefcase, 
  FaMoneyBillWave, 
  FaBrain, 
  FaChartLine, 
  FaRocket, 
  FaBullseye,
  FaBuilding,
  FaArrowRight
} from 'react-icons/fa';

const caseStudiesData = [
  {
    id: 1,
    category: "UI UX",
    year: "2023",
    tag: "Acquisition",
    tagColor: "bg-blue-600",
    stat: "$120 Million",
    title: "Procurement & Business Consulting",
    clientType: "MNC",
    customers: "B2B",
    domain: "Procurement & Consulting",
    type: "MNC",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop", // Buildings
    Icon: FaBriefcase
  },
  {
    id: 2,
    category: "UI UX",
    year: "2023",
    tag: "Funding",
    tagColor: "bg-purple-500",
    stat: "$30 Million",
    title: "Learning Solutions",
    clientType: "Start-Up",
    customers: "B2B",
    domain: "Learning Solutions",
    type: "Start-Up",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop", // Books/Learning
    Icon: FaMoneyBillWave
  },
  {
    id: 3,
    category: "UI UX",
    year: "2023",
    tag: "Funding",
    tagColor: "bg-blue-600",
    stat: "$12 Million",
    title: "ML & AI Data Solutions",
    clientType: "Start-Up",
    customers: "B2B",
    domain: "ML & AI Data Solutions",
    type: "Start-Up",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop", // AI Chip
    Icon: FaBrain
  },
  {
    id: 4,
    category: "UI UX",
    year: "2023",
    tag: "Wellness",
    tagColor: "bg-teal-500",
    stat: "+3.2x Website Visits (6M)",
    title: "Holistic Wellness Programs",
    clientType: "Trust",
    customers: "B2C",
    domain: "Wellness",
    type: "Trust",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop", // Hospital
    Icon: FaChartLine
  },
  {
    id: 5,
    category: "UI UX",
    year: "2023",
    tag: "Retail Pharmacy",
    tagColor: "bg-orange-500",
    stat: "+350% retention",
    title: "L&D Training Growth",
    clientType: "Franchise Brand",
    customers: "B2C",
    domain: "Medicines",
    type: "Brand",
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop", // Cosmetics
    Icon: FaRocket
  },
  {
    id: 6,
    category: "UI UX",
    year: "2023",
    tag: "Mobile App",
    tagColor: "bg-blue-600",
    stat: "400M+ Total Views",
    title: "Mobile OTT Platform",
    clientType: "Start-up",
    customers: "B2C",
    domain: "Entertainment",
    type: "Start-up",
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=800&auto=format&fit=crop", // Entertainment/Streaming
    Icon: FaBullseye
  }
];

const CaseStudies = () => {
  return (
    <section className="w-full pt-24 md:pt-32 pb-20 bg-gray-50 relative z-20 font-main">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 w-full overflow-hidden">
          
          {/* Main Title with Lines */}
          <div className="flex items-center justify-center mb-4 relative w-full px-4 overflow-hidden">
            <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-gray-300 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(22,114,239,0.5)]"></div>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-hero font-bold tracking-wider text-brand-gray mx-6 uppercase whitespace-nowrap">
              Some of our <span className="text-brand-blue">Case Studies.</span>
            </h2>
            <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-l from-transparent via-gray-200 to-gray-300 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(22,114,239,0.5)]"></div>
            </div>
          </div>

          {/* Subtitle */}
         
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 w-full mb-12">
          {caseStudiesData.map((study) => (
            <div key={study.id} className="bg-white rounded-[2rem] p-4 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col group relative border border-gray-100">
              
              {/* Image Area */}
              <div className="relative w-full h-48 md:h-56 rounded-3xl overflow-hidden mb-6 bg-gray-100">
                
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Top Tag pill (overlapping top edge slightly) */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 px-8 py-1.5 rounded-b-2xl ${study.tagColor} text-white font-bold text-xs shadow-md z-10 whitespace-nowrap`}>
                  {study.tag}
                </div>

                {/* Right Icon Badge */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-3 md:p-3.5 rounded-l-2xl shadow-lg z-10 text-brand-blue flex items-center justify-center">
                  <study.Icon size={20} className={`${study.tagColor.replace('bg-', 'text-')}`} />
                </div>

                {/* Bottom Stat pill */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full font-bold text-gray-900 text-xs shadow-lg whitespace-nowrap z-10">
                  {study.stat}
                </div>
                
                {/* Subtle Image Overlay Effect */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>

              {/* Content Area */}
              <div className="flex flex-col items-center justify-center flex-grow px-2 text-center mt-2">
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                  {study.title}
                </h3>
                
                <div className="flex items-center justify-center gap-2 text-xs text-gray-900 font-bold mb-6">
                  <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px]">
                    <FaBuilding size={10} />
                  </div>
                  {study.clientType}
                </div>

                {/* Metrics/Details Footer */}
                <div className="grid grid-cols-3 gap-1 md:gap-2 mt-auto pt-4 border-t border-gray-100 w-full text-center">
                  
                  {/* Customers */}
                  <div className="flex flex-col items-center justify-start">
                    <span className="text-[9px] font-black tracking-wider text-gray-400 uppercase mb-1">
                      CUSTOMERS
                    </span>
                    <span className="text-xs font-bold text-gray-900">
                      {study.customers}
                    </span>
                  </div>

                  {/* Domain */}
                  <div className="flex flex-col items-center justify-start border-l border-gray-100 px-1">
                    <span className="text-[9px] font-black tracking-wider text-gray-400 uppercase mb-1">
                      WORK DOMAIN
                    </span>
                    <span className="text-xs font-bold text-gray-900 leading-tight line-clamp-2">
                      {study.domain}
                    </span>
                  </div>

                  {/* Type */}
                  <div className="flex flex-col items-center justify-start border-l border-gray-100 px-1">
                    <span className="text-[9px] font-black tracking-wider text-gray-400 uppercase mb-1">
                      TYPE
                    </span>
                    <span className="text-xs font-bold text-gray-900">
                      {study.type}
                    </span>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Explore Button */}
      </div>
    </section>
  );
};

export default CaseStudies;
