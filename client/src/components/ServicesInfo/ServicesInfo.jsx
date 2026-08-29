import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ServicesInfo = () => {
  const [expanded, setExpanded] = useState(null);
  const [divisionsData, setDivisionsData] = useState({
    entertainment: {
      title1: "ENTERTAINMENT",
      title2: "DIVISION",
      description:
        "Contact us at info@redashfilms.com for end-to-end film production services and entertainment films, including",
      points: [
        "Theatrical Feature Films",
        "Microdrama Shows",
        "Music Videos",
        "Web Shows",
        "Short Films",
        "AI Films",
      ],
      buttonText: "CLICK HERE",
      buttonLink: "/entertainment",
    },
    enterprise: {
      title1: "ENTERPRISE",
      title2: "DIVISION",
      description:
        "Contact us at info@redashfilms.com for strategic ad agency services and enterprise films, including",
      points: [
        "Ad Films (TV, Digital & Social)",
        "Corporate Films (Profile AVs)",
        "Case Study Videos",
        "Animated Explainers",
        "AI Videos",
        "Podcasts",
        "Training Films",
        "Testimonial Videos",
      ],
      buttonText: "CLICK HERE",
      buttonLink: "/ad-agency",
    },
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.homepage && data.homepage.divisions) {
          setDivisionsData({
            entertainment:
              data.homepage.divisions.entertainment ||
              divisionsData.entertainment,
            enterprise:
              data.homepage.divisions.enterprise || divisionsData.enterprise,
          });
        }
      })
      .catch((err) => console.error("Error fetching divisions data:", err));
  }, []);

  const handleCardClick = (id) => {
    if (window.innerWidth < 1024) {
      setExpanded((prev) => (prev === id ? null : id));
    }
  };

  return (
    <section className="w-full px-4 md:px-8 pt-12 pb-4 md:pb-12 bg-white overflow-hidden">
      <style>
        {`
          .mobile-portrait-button { display: none !important; }
          @media (max-width: 1023px) and (orientation: portrait) {
            .mobile-portrait-button { display: flex !important; }
          }
        `}
      </style>
      <div className="w-full md:w-[99%] xl:w-[97%] mx-auto flex flex-col lg:flex-row items-stretch lg:items-start gap-6 md:gap-8">
        {/* Mobile Portrait Red Button */}
        <div className="w-full justify-center mobile-portrait-button">
          <Link to="/entertainment" className="w-full flex justify-center">
            <button className="bg-[#E20002] hover:bg-[#cc0000] transition-colors text-white font-bold py-3 px-8 rounded-md text-sm uppercase flex items-center justify-center shadow-md tracking-wider w-full sm:w-[380px]">
              GO TO REDASH ENTERTAINMENT FILMS
            </button>
          </Link>
        </div>

        {/* Red Card - Entertainment Films */}
        <motion.div
          onClick={() => handleCardClick("films")}
          className={`w-full group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(226,0,2,0.1)] border border-[#fae6e6] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] min-h-[140px] md:min-h-[160px] lg:min-h-[220px] cursor-pointer lg:cursor-default ${expanded === "films" ? "flex-[1.5] lg:flex-[1.5]" : "flex-1 lg:hover:flex-[1.5]"}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle Hover Gradient Background */}
          <div
            className={`absolute top-0 right-0 w-full lg:w-[60%] h-full transition-opacity duration-700 bg-gradient-to-bl from-[#fff0f0] to-transparent pointer-events-none ${expanded === "films" ? "opacity-100" : "opacity-0 lg:group-hover:opacity-100"}`}
            style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)" }}
          ></div>

          <div className="w-full p-6 md:p-8 lg:p-0 z-10 flex flex-col flex-1 relative h-full">
            {/* Title */}
            <div
              className={`flex flex-col relative lg:absolute transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] items-start z-20 ${expanded === "films" ? "lg:left-10 lg:top-10 lg:translate-x-0 lg:translate-y-0 lg:items-start" : "lg:left-1/2 lg:top-[110px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:items-center lg:group-hover:left-10 lg:group-hover:top-10 lg:group-hover:translate-x-0 lg:group-hover:translate-y-0 lg:group-hover:items-start"}`}
            >
              <h2
                className={`text-3xl md:text-[50px] xl:text-[60px] font-hero text-brand-red uppercase leading-[0.9] tracking-wide mb-2 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] text-left whitespace-normal sm:whitespace-nowrap ${expanded === "films" ? "lg:text-left" : "lg:text-center lg:group-hover:text-left"}`}
              >
                {divisionsData.entertainment.title1}{" "}
                <span className="text-brand-gray">
                  {divisionsData.entertainment.title2}
                </span>
              </h2>
              <div className="w-12 h-[2px] bg-brand-red transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] mt-2"></div>
            </div>

            {/* Super Smooth Expandable Grid Wrapper */}
            <div
              className={`grid transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] w-full lg:px-10 ${expanded === "films" ? "grid-rows-[1fr]" : "grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]"}`}
            >
              <div
                className={`overflow-hidden flex flex-col transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] lg:pt-[130px] lg:pb-10 ${expanded === "films" ? "opacity-100 translate-y-0 duration-700 delay-[300ms]" : "opacity-0 translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:duration-700 lg:group-hover:delay-[300ms]"}`}
              >


                {/* Two Column List layout */}
                <div className="flex flex-col sm:flex-row gap-4 text-sm md:text-base font-main text-brand-black font-semibold mt-4 mb-4 lg:mb-auto">
                  <div className="flex-1 flex flex-col gap-4 whitespace-nowrap lg:whitespace-normal">
                    {divisionsData.entertainment.points
                      .slice(
                        0,
                        Math.ceil(
                          divisionsData.entertainment.points.length / 2,
                        ),
                      )
                      .map((pt, i) => (
                        <div key={i} className="flex items-start">
                          <span className="text-brand-red mr-3 text-xl leading-none mt-[2px]">
                            •
                          </span>{" "}
                          <span>{pt}</span>
                        </div>
                      ))}
                  </div>
                  <div className="flex-1 flex flex-col gap-4 whitespace-nowrap lg:whitespace-normal">
                    {divisionsData.entertainment.points
                      .slice(
                        Math.ceil(
                          divisionsData.entertainment.points.length / 2,
                        ),
                      )
                      .map((pt, i) => (
                        <div key={i} className="flex items-start">
                          <span className="text-brand-red mr-3 text-xl leading-none mt-[2px]">
                            •
                          </span>{" "}
                          <span>{pt}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Bottom Anchored Button */}
                <div className="pt-6 pb-2 mt-auto w-full flex justify-start">
                  <Link
                    to={divisionsData.entertainment.buttonLink}
                    className="inline-block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="bg-[#E20002] hover:bg-[#E20002] transition-colors text-white font-bold py-3 px-8 rounded-md text-sm md:text-base uppercase flex items-center shadow-md">
                      {divisionsData.entertainment.buttonText}
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Portrait Blue Button */}
        <div className="w-full justify-center mobile-portrait-button mt-4">
          <Link to="/ad-agency" className="w-full flex justify-center">
            <button className="bg-brand-blue hover:bg-[#0f4a9b] transition-colors text-white font-bold py-3 px-8 rounded-md text-sm uppercase flex items-center justify-center shadow-md tracking-wider w-full sm:w-[380px]">
              GO TO REDASH AD AGENCY
            </button>
          </Link>
        </div>

        {/* Blue Card - Enterprise Films */}
        <motion.div
          onClick={() => handleCardClick("agency")}
          className={`w-full group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(22,114,239,0.1)] border border-[#e6effc] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] min-h-[140px] md:min-h-[160px] lg:min-h-[220px] cursor-pointer lg:cursor-default ${expanded === "agency" ? "flex-[1.5] lg:flex-[1.5]" : "flex-1 lg:hover:flex-[1.5]"}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Subtle Hover Gradient Background */}
          <div
            className={`absolute top-0 right-0 w-full lg:w-[60%] h-full transition-opacity duration-700 bg-gradient-to-bl from-[#f0f6ff] to-transparent pointer-events-none ${expanded === "agency" ? "opacity-100" : "opacity-0 lg:group-hover:opacity-100"}`}
            style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)" }}
          ></div>

          <div className="w-full p-6 md:p-8 lg:p-0 z-10 flex flex-col flex-1 relative h-full">
            {/* Title */}
            <div
              className={`flex flex-col relative lg:absolute transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] items-start z-20 ${expanded === "agency" ? "lg:left-10 lg:top-10 lg:translate-x-0 lg:translate-y-0 lg:items-start" : "lg:left-1/2 lg:top-[110px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:items-center lg:group-hover:left-10 lg:group-hover:top-10 lg:group-hover:translate-x-0 lg:group-hover:translate-y-0 lg:group-hover:items-start"}`}
            >
              <h2
                className={`text-3xl md:text-[50px] xl:text-[60px] font-hero text-brand-blue uppercase leading-[0.9] tracking-wide mb-2 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] text-left whitespace-normal sm:whitespace-nowrap ${expanded === "agency" ? "lg:text-left" : "lg:text-center lg:group-hover:text-left"}`}
              >
                {divisionsData.enterprise.title1}{" "}
                <span className="text-brand-gray">
                  {divisionsData.enterprise.title2}
                </span>
              </h2>
              <div className="w-12 h-[2px] bg-brand-blue transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] mt-2"></div>
            </div>

            {/* Super Smooth Expandable Grid Wrapper */}
            <div
              className={`grid transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] w-full lg:px-10 ${expanded === "agency" ? "grid-rows-[1fr]" : "grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]"}`}
            >
              <div
                className={`overflow-hidden flex flex-col transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] lg:pt-[130px] lg:pb-10 ${expanded === "agency" ? "opacity-100 translate-y-0 duration-700 delay-[300ms]" : "opacity-0 translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:duration-700 lg:group-hover:delay-[300ms]"}`}
              >


                {/* Two Column List layout */}
                <div className="flex flex-col sm:flex-row gap-4 text-sm md:text-base font-main text-brand-black font-semibold mt-4 mb-4 lg:mb-auto pr-4 lg:pr-0">
                  <div className="flex-1 flex flex-col gap-4 whitespace-nowrap lg:whitespace-normal">
                    {divisionsData.enterprise.points
                      .slice(
                        0,
                        Math.ceil(divisionsData.enterprise.points.length / 2),
                      )
                      .map((pt, i) => (
                        <div key={i} className="flex items-start">
                          <span className="text-brand-blue mr-3 text-xl leading-none mt-[2px]">
                            •
                          </span>{" "}
                          <span>{pt}</span>
                        </div>
                      ))}
                  </div>
                  <div className="flex-1 flex flex-col gap-4 whitespace-nowrap lg:whitespace-normal">
                    {divisionsData.enterprise.points
                      .slice(
                        Math.ceil(divisionsData.enterprise.points.length / 2),
                      )
                      .map((pt, i) => (
                        <div key={i} className="flex items-start">
                          <span className="text-brand-blue mr-3 text-xl leading-none mt-[2px]">
                            •
                          </span>{" "}
                          <span>{pt}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Bottom Anchored Button */}
                <div className="pt-6 pb-2 mt-auto w-full flex justify-start">
                  <Link
                    to={divisionsData.enterprise.buttonLink}
                    className="inline-block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="bg-brand-blue hover:bg-[#115bbf] transition-colors text-white font-bold py-3 px-8 rounded-md text-sm md:text-base uppercase flex items-center shadow-md">
                      {divisionsData.enterprise.buttonText}
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesInfo;
