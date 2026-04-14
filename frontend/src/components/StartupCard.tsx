import React from 'react';
import { MapPin, ExternalLink, TrendingUp, Calendar, ShieldCheck } from 'lucide-react';
import { Startup } from '../types';

interface StartupCardProps {
  startup: Startup;
  onClick: (startup: Startup) => void;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup, onClick }) => {
  return (
    <div 
      className="group relative flex flex-col h-full bg-[#111827]/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_40px_80px_-20px_rgba(139,92,246,0.25)] cursor-pointer overflow-hidden"
      onClick={() => onClick && onClick(startup)}
    >
      {/* Background Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top Section: Branding & Stage */}
      <div className="flex justify-between items-start mb-6 relative z-10 w-full">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-110 group-hover:text-orange-400 transition-all duration-300 shadow-inner overflow-hidden">
            {startup.logoUrl ? (
              <img src={startup.logoUrl} alt={startup.name} className="w-full h-full object-cover" />
            ) : (
              <TrendingUp size={28} />
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-black text-white group-hover:text-purple-300 transition-colors leading-tight tracking-tight">
              {startup.name}
            </h3>
            <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-bold uppercase tracking-wider mt-1">
              <Calendar size={10} />
              <span>Est. {startup.foundedYear}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg shadow-sm">
            {startup.fundingStage}
          </span>
          {startup.status === 'approved' && (
            <div className="flex items-center gap-1 text-[8px] font-bold text-emerald-400 uppercase tracking-tighter">
              <ShieldCheck size={10} /> Verified
            </div>
          )}
        </div>
      </div>

      {/* Middle Section: Founders & Mission */}
      <div className="flex-grow space-y-6 relative z-10 w-full mb-8">
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] block mb-2">Founders</label>
          <p className="text-sm text-gray-200 font-semibold line-clamp-1 group-hover:text-white transition-colors">
            {startup.founderName || "Hyderabad Innovator"}
          </p>
        </div>

        <div>
           <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] block mb-2">Mission & Vision</label>
           <div className="relative">
              <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed min-h-[4.5rem] group-hover:text-gray-300 transition-colors">
                {startup.about || "Building the future of the Hyderabad startup ecosystem with cutting edge technology and local talent."}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-[#111827]/0 to-transparent" />
           </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="px-4 py-1.5 text-[10px] font-bold bg-white/5 text-gray-400 rounded-xl border border-white/5 flex items-center gap-2 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-all">
            <MapPin size={12} className="text-purple-500" /> {startup.industry}
          </span>
        </div>
      </div>

      {/* Bottom Section: CTA Pinned */}
      <div className="mt-auto relative z-10 w-full">
        <button 
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 text-white rounded-[1.5rem] text-sm font-black transition-all duration-500 shadow-xl shadow-purple-900/20 active:scale-95 flex items-center justify-center gap-3 group/btn relative overflow-hidden"
          onClick={(e) => {
            e.stopPropagation();
            window.open(startup.websiteUrl, '_blank');
          }}
        >
          <span className="relative z-10">Visit Website</span>
          <ExternalLink size={16} className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500" />
        </button>
      </div>
    </div>
  );
};

export default StartupCard;
