import React from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Globe, MapPin, Calendar, Users, Award, AlertCircle } from 'lucide-react';
import { Startup } from '../types';

interface StartupDetailModalProps {
  startup: Startup | null;
  isOpen: boolean;
  onClose: () => void;
}

const StartupDetailModal: React.FC<StartupDetailModalProps> = ({ startup, isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !startup) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-3xl" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500">
        <div className="absolute top-6 right-6">
          <button 
            onClick={onClose}
            className="p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-2xl transition-all shadow-lg active:scale-90"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-full">
          {/* Header/Featured Area */}
          <div className="lg:w-[40%] bg-slate-800/30 p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
            <div className="space-y-8">
              <div className="w-24 h-24 rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 shadow-2xl overflow-hidden">
                {startup.logoUrl ? (
                  <img src={startup.logoUrl} alt={startup.name} className="w-full h-full object-cover" />
                ) : (
                  <Award size={48} />
                )}
              </div>
              
              <div>
                <h1 className="text-4xl font-bold text-white tracking-tight leading-tight">
                  {startup.name}
                </h1>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                    {startup.industry}
                  </span>
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                    {startup.fundingStage}
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <Globe size={18} className="text-blue-500" />
                  <a href={startup.websiteUrl} target="_blank" rel="noreferrer" className="text-sm font-medium hover:text-blue-400 transition-colors underline decoration-slate-700 underline-offset-4">
                    {startup.websiteUrl.replace('https://', '')}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <MapPin size={18} className="text-red-500" />
                  <span className="text-sm font-medium">Headquartered in Hyderabad</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Calendar size={18} className="text-emerald-500" />
                  <span className="text-sm font-medium">Founded in {startup.foundedYear}</span>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <button 
                className="w-full py-4 bg-white text-slate-900 rounded-2xl text-base font-bold transition-all shadow-xl hover:bg-slate-100 flex items-center justify-center gap-3"
                onClick={() => window.open(startup.websiteUrl, '_blank')}
              >
                Launch Website <ExternalLink size={20} />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:w-[60%] p-10 flex flex-col justify-between bg-slate-900/50 overflow-y-auto">
            <div className="space-y-10">
              <section className="space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <AlertCircle size={14} /> Comprehensive About
                </h3>
                <p className="text-lg text-slate-300 leading-relaxed font-medium capitalize">
                  {startup.about}
                </p>
              </section>

              <section className="space-y-4 p-6 bg-slate-800/30 rounded-3xl border border-slate-800">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Users size={14} /> Founder Vision
                </h3>
                <p className="text-xl font-bold text-white tracking-tight leading-snug">
                  {startup.founderName}
                </p>
                <p className="text-sm text-slate-400 leading-relaxed italic">
                  "Leading the innovation wave in the IT Hub of Hyderabad. We are dedicated to building solutions that scale globally from the heart of TG."
                </p>
              </section>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Status</p>
                  <p className="text-emerald-400 font-bold text-sm tracking-tight capitalize">✓ Verified Approved</p>
                </div>
                <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Growth Indicator</p>
                  <p className="text-blue-400 font-bold text-sm tracking-tight capitalize">High Momentum</p>
                </div>
              </div>
            </div>

            <div className="pt-10 flex justify-between items-center px-2">
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white text-sm font-bold transition-all px-4 py-2 hover:bg-slate-800 rounded-xl"
              >
                ← Back to Ecosystem
              </button>
              <p className="text-[10px] text-slate-600 font-medium">Ref HydPortal-ID: {startup._id?.slice(-8) || 'LOCAL-DEV'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StartupDetailModal;
