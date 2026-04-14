import React, { useEffect, useState } from 'react';
import { Rocket, ArrowRight, Plus, ChevronDown } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onAddStartupClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreClick, onAddStartupClick }) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="h-screen flex items-center justify-center relative w-full overflow-hidden bg-[#0B0F1A]">
      {/* Background Image Setup (Parallax) */}
      <div 
        className="absolute inset-0 z-0 scale-105"
        style={{
          transform: `scale(${1 + offsetY * 0.0002}) translateY(${offsetY * 0.2}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-[url('/hyderabad-main.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/60" /> {/* Dark overlay */}
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/20 to-orange-900/40 animate-gradient mix-blend-overlay" />
      </div>

      {/* Floating Light Glows */}
      <div className="absolute top-[20%] left-[15%] w-64 h-64 bg-purple-600/30 blur-[100px] rounded-full animate-float z-0" />
      <div className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-orange-500/20 blur-[120px] rounded-full animate-float-reverse z-0" />
      <div className="absolute top-[40%] right-[30%] w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full animate-pulse-slow z-0" />

      {/* Particles */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className="particle z-0"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100 + 100}vh`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
          }}
        />
      ))}

      {/* Content Box (Glassmorphism) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-20">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold tracking-widest uppercase mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Rocket size={14} className="animate-bounce-subtle" /> 
            Welcome to the Future
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 leading-[1.1] flex flex-wrap justify-center gap-x-4">
            {["Hyderabad", "Startup", "Ecosystem", "2026"].map((word, i) => (
              <span 
                key={i} 
                className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                style={{ animationDelay: `${i * 150 + 100}ms` }}
              >
                {word === "Ecosystem" ? (
                  <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent text-glow">
                    {word}
                  </span>
                ) : word}
              </span>
            ))}
          </h1>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-2xl font-medium leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            Discover innovation, startups, and opportunities in India’s fastest-growing tech city.
          </p>

        </div>
      </div>

    </section>
  );
};

export default Hero;
