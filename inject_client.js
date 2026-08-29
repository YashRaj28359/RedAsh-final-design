const fs = require('fs');
let code = fs.readFileSync('d:\\\\Meraki Movies\\\\Redash.in\\\\Final RedAsh Project\\\\client\\\\src\\\\components\\\\ServicesInfo\\\\ServicesInfo.jsx', 'utf8');

const importReplacement = `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';`;

code = code.replace(/import React.*from 'react';\nimport { motion } from 'framer-motion';\nimport { Link } from 'react-router-dom';/, importReplacement);

const fetchCode = `const ServicesInfo = () => {
  const [expanded, setExpanded] = useState(null);
  const [divisionsData, setDivisionsData] = useState({
    entertainment: {
      title1: 'ENTERTAINMENT',
      title2: 'DIVISION',
      description: 'Contact us at info@redashfilms.com for end-to-end film production services and entertainment films, including',
      points: ['Theatrical Feature Films', 'Microdrama Shows', 'Music Videos', 'Web Shows', 'Short Films', 'AI Films'],
      buttonText: 'CLICK HERE',
      buttonLink: '/entertainment'
    },
    enterprise: {
      title1: 'ENTERPRISE',
      title2: 'DIVISION',
      description: 'Contact us at info@redashfilms.com for strategic ad agency services and enterprise films, including',
      points: ['Ad Films (TV, Digital & Social)', 'Corporate Films (Profile AVs)', 'Case Study Videos', 'Animated Explainers', 'AI Videos', 'Podcasts', 'Training Films', 'Testimonial Videos'],
      buttonText: 'CLICK HERE',
      buttonLink: '/ad-agency'
    }
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/content')
      .then(res => res.json())
      .then(data => {
        if (data && data.homepage && data.homepage.divisions) {
          setDivisionsData({
            entertainment: data.homepage.divisions.entertainment || divisionsData.entertainment,
            enterprise: data.homepage.divisions.enterprise || divisionsData.enterprise
          });
        }
      })
      .catch(err => console.error('Error fetching divisions data:', err));
  }, []);

  const handleCardClick = (id) => {`;

code = code.replace(/const ServicesInfo = \(\) => {\n  const \[expanded, setExpanded\] = useState\(null\);\n\n  const handleCardClick = \(id\) => {/, fetchCode);

// Replace hardcoded entertainment data
code = code.replace(
  /ENTERTAINMENT <span className="text-brand-gray">DIVISION<\/span>/, 
  `{divisionsData.entertainment.title1} <span className="text-brand-gray">{divisionsData.entertainment.title2}</span>`
);
code = code.replace(
  /Contact us at <a href="mailto:info@redashfilms\.com" className="text-brand-red hover:underline transition-colors" onClick={\(e\) => e\.stopPropagation\(\)}>info@redashfilms\.com<\/a> for end-to-end <span className="text-brand-red">film production<\/span> services and entertainment films, including/,
  `{divisionsData.entertainment.description}`
);

// We need to dynamically render the points list for entertainment
const entPointsRegex = /<div className="flex flex-col sm:flex-row gap-4 text-sm md:text-base font-main text-brand-black font-semibold mt-4 mb-4 lg:mb-auto">[\s\S]*?<\/div>\s*<\/div>/;
const entPointsReplacement = `<div className="flex flex-col sm:flex-row gap-4 text-sm md:text-base font-main text-brand-black font-semibold mt-4 mb-4 lg:mb-auto">
                  <div className="flex-1 flex flex-col gap-4 whitespace-nowrap lg:whitespace-normal">
                    {divisionsData.entertainment.points.slice(0, Math.ceil(divisionsData.entertainment.points.length / 2)).map((pt, i) => (
                      <div key={i} className="flex items-start"><span className="text-brand-red mr-3 text-xl leading-none mt-[2px]">•</span> <span>{pt}</span></div>
                    ))}
                  </div>
                  <div className="flex-1 flex flex-col gap-4 whitespace-nowrap lg:whitespace-normal">
                    {divisionsData.entertainment.points.slice(Math.ceil(divisionsData.entertainment.points.length / 2)).map((pt, i) => (
                      <div key={i} className="flex items-start"><span className="text-brand-red mr-3 text-xl leading-none mt-[2px]">•</span> <span>{pt}</span></div>
                    ))}
                  </div>
                </div>`;
code = code.replace(entPointsRegex, entPointsReplacement);

// Replace entertainment button
code = code.replace(
  /<button className="bg-\[#E20002\] hover:bg-\[#E20002\] transition-colors text-white font-bold py-3 px-8 rounded-md text-sm md:text-base uppercase flex items-center shadow-md">\s*Click Here\s*<svg/g,
  `<button className="bg-[#E20002] hover:bg-[#E20002] transition-colors text-white font-bold py-3 px-8 rounded-md text-sm md:text-base uppercase flex items-center shadow-md">
                      {divisionsData.entertainment.buttonText} 
                      <svg`
);
code = code.replace(
  /<Link \s*to="\/entertainment"\s*className="inline-block"/,
  `<Link \n                    to={divisionsData.entertainment.buttonLink} \n                    className="inline-block"`
);

// Replace hardcoded enterprise data
code = code.replace(
  /ENTERPRISE <span className="text-brand-gray">DIVISION<\/span>/, 
  `{divisionsData.enterprise.title1} <span className="text-brand-gray">{divisionsData.enterprise.title2}</span>`
);
code = code.replace(
  /Contact us at <a href="mailto:info@redashfilms\.com" className="text-brand-blue hover:underline transition-colors" onClick={\(e\) => e\.stopPropagation\(\)}>info@redashfilms\.com<\/a> for strategic <span className="text-brand-blue">ad agency<\/span> services and enterprise films, including/,
  `{divisionsData.enterprise.description}`
);

// Dynamically render the points list for enterprise
const empPointsRegex = /<div className="flex flex-col sm:flex-row gap-4 text-sm md:text-base font-main text-brand-black font-semibold mt-4 mb-4 lg:mb-auto pr-4 lg:pr-0">[\s\S]*?<\/div>\s*<\/div>/;
const empPointsReplacement = `<div className="flex flex-col sm:flex-row gap-4 text-sm md:text-base font-main text-brand-black font-semibold mt-4 mb-4 lg:mb-auto pr-4 lg:pr-0">
                  <div className="flex-1 flex flex-col gap-4 whitespace-nowrap lg:whitespace-normal">
                    {divisionsData.enterprise.points.slice(0, Math.ceil(divisionsData.enterprise.points.length / 2)).map((pt, i) => (
                      <div key={i} className="flex items-start"><span className="text-brand-blue mr-3 text-xl leading-none mt-[2px]">•</span> <span>{pt}</span></div>
                    ))}
                  </div>
                  <div className="flex-1 flex flex-col gap-4 whitespace-nowrap lg:whitespace-normal">
                    {divisionsData.enterprise.points.slice(Math.ceil(divisionsData.enterprise.points.length / 2)).map((pt, i) => (
                      <div key={i} className="flex items-start"><span className="text-brand-blue mr-3 text-xl leading-none mt-[2px]">•</span> <span>{pt}</span></div>
                    ))}
                  </div>
                </div>`;
code = code.replace(empPointsRegex, empPointsReplacement);

// Replace enterprise button
code = code.replace(
  /<button className="bg-brand-blue hover:bg-\[#115bbf\] transition-colors text-white font-bold py-3 px-8 rounded-md text-sm md:text-base uppercase flex items-center shadow-md">\s*Click Here\s*<svg/g,
  `<button className="bg-brand-blue hover:bg-[#115bbf] transition-colors text-white font-bold py-3 px-8 rounded-md text-sm md:text-base uppercase flex items-center shadow-md">
                      {divisionsData.enterprise.buttonText} 
                      <svg`
);
code = code.replace(
  /<Link \s*to="\/ad-agency"\s*className="inline-block"/,
  `<Link \n                    to={divisionsData.enterprise.buttonLink} \n                    className="inline-block"`
);

fs.writeFileSync('d:\\\\Meraki Movies\\\\Redash.in\\\\Final RedAsh Project\\\\client\\\\src\\\\components\\\\ServicesInfo\\\\ServicesInfo.jsx', code);
console.log('Successfully injected dynamic fetch into ServicesInfo.jsx');
