import React, { useState, useEffect } from 'react';
import HeroColumn from '../HeroColumn/HeroColumn';

const SectionDivider = ({ colorClass = "bg-black/20" }) => (
  <div className={`hidden md:block w-[0.5px] h-[100px] mx-4 ${colorClass}`}></div>
);

const HeroSection = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/content')
      .then(res => res.json())
      .then(data => {
        if (data && data.homepage && data.homepage.hero && data.homepage.hero.heading_blocks) {
          setBlocks(data.homepage.hero.heading_blocks);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch hero blocks:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <section className="w-full px-4 md:px-8 pt-2 pb-2 bg-white min-h-[200px] flex items-center justify-center">Loading...</section>;
  }

  // Fallback if no blocks from CMS
  if (blocks.length === 0) {
    return (
      <section className="w-full px-4 md:px-8 pt-2 pb-2 bg-white">
        <div className="w-full mx-auto flex flex-col md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] justify-items-center items-center relative gap-6 md:gap-0">
          <HeroColumn 
            bgWord="FILM" 
            fgWord="FILM" 
            subtitle="PRODUCTION HOUSE" 
            underlineClass="bg-brand-red"
            imageClass="bg-film bg-[length:200%_auto] bg-[position:40%_65%]"
            subtitleClass="text-brand-red"
            delay={0.1}
          />
        </div>
      </section>
    );
  }

  // Helper function to render a single block
  const renderBlock = (block, index) => {
    // Render ampersand differently
    if (block.text === '&') {
      return (
        <div key={block.id} className="flex items-center justify-center text-5xl sm:text-6xl md:text-7xl lg:text-[100px] font-main font-semibold bg-clip-text text-transparent bg-year bg-[length:400%_auto] bg-[position:0%_50%] my-0 md:-mt-4 lg:-mt-9 md:ml-4 lg:ml-10">
          &amp;
        </div>
      );
    }

    // Use default background classes if CMS bg_image is empty
    let defaultBgClass = '';
    if (!block.bg_image) {
      if (index === 0) defaultBgClass = 'bg-film bg-[length:200%_auto] bg-[position:40%_65%]';
      else if (index === 2) defaultBgClass = 'bg-ad bg-[length:150%_auto] bg-[position:60%_50%]';
      else defaultBgClass = 'bg-year bg-cover bg-center';
    }

    // Default colors based on original layout
    let defaultColor = '#ef4444'; // Red
    if (index === 2) defaultColor = '#3b82f6'; // Blue
    if (index >= 3) defaultColor = '#6b7280'; // Gray

    // Construct inline styles dynamically from CMS
    const imageStyle = block.bg_image ? { backgroundImage: `url(${block.bg_image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {};
    const subtitleStyle = { color: block.subtext_color || defaultColor };
    const underlineStyle = { 
      backgroundColor: block.subtext_color || defaultColor
    };

    return (
      <HeroColumn 
        key={block.id}
        bgWord={block.text} 
        fgWord={block.text} 
        subtitle={block.subtext} 
        imageClass={defaultBgClass}
        imageStyle={imageStyle}
        subtitleStyle={subtitleStyle}
        underlineStyle={underlineStyle}
        delay={0.1 + (index * 0.1)}
      />
    );
  };

  return (
    <section className="w-full px-4 md:px-8 pt-2 pb-2 bg-white">
      <div className="w-full mx-auto flex flex-col md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] justify-items-center items-center relative gap-6 md:gap-0">
        
        {/* Mobile Row 1 / Desktop Items 1-3 */}
        <div className="flex flex-row items-center justify-center w-full md:contents gap-2 sm:gap-4 md:gap-0">
          {blocks.slice(0, 3).map((block, index) => renderBlock(block, index))}
        </div>

        {/* Any remaining blocks */}
        {blocks.length > 3 && blocks.slice(3).map((block, index) => (
          <React.Fragment key={block.id}>
            <SectionDivider colorClass="bg-brand-gray/50" />
            {renderBlock(block, index + 3)}
          </React.Fragment>
        ))}

      </div>
    </section>
  );
};

export default HeroSection;
