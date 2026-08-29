import React from 'react';

const SidewaysText = ({ side, text }) => {
  return (
    <div 
      className={`fixed top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-6 xl:left-12' : 'right-6 xl:right-12'} hidden md:flex items-center justify-center z-20`}
    >
      <div 
        className="font-main text-[11px] font-bold tracking-widest uppercase text-black"
        style={{ writingMode: 'vertical-rl', transform: side === 'left' ? 'rotate(180deg)' : 'none' }}
      >
        {text}
      </div>
    </div>
  );
};

export default SidewaysText;
