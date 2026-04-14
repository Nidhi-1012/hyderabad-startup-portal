import React from 'react';
import { Rocket, Share2, Briefcase, GitBranch, Mail, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Rocket size={20} />
              </div>
              <span className="text-xl font-black text-white tracking-tighter">HydPortal</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The definitive ecosystem portal for Hyderabad's tech and startup community. Mapping the future of India's fastest-growing tech city.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all">
                <Share2 size={18} />
              </button>
              <button className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all">
                <Briefcase size={18} />
              </button>
              <button className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all">
                <GitBranch size={18} />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 px-1 border-l-2 border-blue-500 pl-3">Ecosystem</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="/startups" className="hover:text-blue-400 transition-colors">Startup Directory</a></li>
              <li><a href="/explore" className="hover:text-blue-400 transition-colors">Investment Guide</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">T-Hub Network</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">IT Corridor Maps</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 px-1 border-l-2 border-emerald-500 pl-3">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Cost of Living 2026</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Real Estate Report</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">AI & Tech Clusters</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Musi Rejuvenation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 px-1 border-l-2 border-slate-500 pl-3">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-blue-500" />
                <span>hello@hydportal.tech</span>
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>Verified Data Portal</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-medium">
            © 2026 Hyderabad Startup Hub. Built for the entrepreneurs of tomorrow.
          </p>
          <div className="flex gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Data Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
