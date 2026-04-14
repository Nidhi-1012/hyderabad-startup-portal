import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, Rocket } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 z-[40] w-full bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-white/5 transition-all">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex justify-between items-center h-20">
          
          {/* LEFT: Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-orange-500/20 border border-purple-500/30 text-purple-400 group-hover:scale-105 transition-transform">
              <Rocket size={20} />
            </div>
            <span className="text-xl font-black tracking-tight text-white group-hover:text-purple-400 transition-colors">
              HydPortal
            </span>
          </div>

          {/* CENTER: Navigation */}
          <div className="hidden md:flex items-center gap-10 bg-white/5 px-8 py-3 rounded-full border border-white/10">
            <NavLink to="/" className={({ isActive }) => cn("text-sm font-bold transition-all tracking-wide uppercase", isActive ? "text-purple-400" : "text-gray-400 hover:text-white")}>
              Guide
            </NavLink>
            <div className="w-px h-4 bg-white/20"></div>
            <NavLink to="/startups" className={({ isActive }) => cn("text-sm font-bold transition-all tracking-wide uppercase", isActive ? "text-purple-400" : "text-gray-400 hover:text-white")}>
              Startup
            </NavLink>
          </div>

          {/* RIGHT: Add Startup */}
          <div className="flex items-center">
            <button 
              onClick={() => window.dispatchEvent(new Event('open-add-startup'))}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 border border-white/10 hover:border-purple-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg active:scale-95 glow-blue hover:glow-emerald group"
            >
              <Rocket size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Add Startup
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
