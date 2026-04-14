import React, { useState, useEffect } from 'react';

const CinematicOverlay: React.FC = () => {
  const [stage, setStage] = useState(0); 

  useEffect(() => {
    // 0: Initial state (visible overlay)
    // 1: Show center glow
    const t1 = setTimeout(() => setStage(1), 500);
    // 2: Trigger doors to open and scale back content
    const t2 = setTimeout(() => setStage(2), 1000);
    // 3: Animation complete, unmount
    const t3 = setTimeout(() => setStage(3), 2200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (stage === 3) return null;

  const bgImage = "url('/hyderabad-main.jpg')";

  return (
    <div className={`fixed inset-0 z-[100] flex flex-row pointer-events-none transition-opacity duration-[1200ms] ${stage === 2 ? 'opacity-90' : 'opacity-100'}`}>
      
      {/* Center Glow */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full blur-[100px] z-50 transition-all duration-[800ms] ease-out
        ${stage >= 1 ? 'opacity-100 scale-150' : 'opacity-0 scale-50'}`} 
      />

      {/* Light particles in center */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full blur-[20px] transition-all duration-700 z-50
        ${stage >= 1 ? 'opacity-100 scale-110' : 'opacity-0 scale-50'}`} />

      {/* Left Panel */}
      <div 
        className={`w-1/2 h-full relative overflow-hidden bg-black transition-all duration-[1200ms] ease-in-out origin-left
          ${stage >= 2 ? '-translate-x-full' : 'translate-x-0'} 
          ${stage === 0 ? 'scale-100' : 'scale-105'}`}
      >
         <div 
           className="absolute inset-0 w-[100vw] h-full bg-cover bg-center" 
           style={{ backgroundImage: bgImage, filter: 'brightness(0.6)' }}
         />
         <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Right Panel */}
      <div 
        className={`w-1/2 h-full relative overflow-hidden bg-black transition-all duration-[1200ms] ease-in-out origin-right
          ${stage >= 2 ? 'translate-x-full' : 'translate-x-0'} 
          ${stage === 0 ? 'scale-100' : 'scale-105'}`}
      >
         <div 
           className="absolute inset-0 w-[100vw] h-full bg-cover bg-center -translate-x-[50vw]" 
           style={{ backgroundImage: bgImage, filter: 'brightness(0.6)' }}
         />
         <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

    </div>
  );
};

export default CinematicOverlay;
