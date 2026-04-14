import React, { useState } from 'react';
import { Menu, X, ChevronRight, LayoutDashboard, Rocket, Map, AlertCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Section {
  id: string;
  title: string;
}

interface SidebarProps {
  sections?: Section[];
  activeSection?: string;
  onSectionClick?: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sections = [], activeSection, onSectionClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const menuItems = [
    { name: 'Home', path: '/', icon: LayoutDashboard },
    { name: 'Startups', path: '/startups', icon: Rocket },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-slate-800 rounded-md text-white border border-slate-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed top-0 left-0 bottom-0 z-[55] w-72 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 lg:translate-x-0",
        !isOpen && "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent italic">
              HydPortal
            </h1>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="space-y-1 mb-10">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={handleNavClick}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                      isActive 
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]" 
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    )}
                  >
                    <Icon size={18} className={cn("transition-transform group-hover:scale-110", isActive ? "text-blue-400" : "text-slate-500")} />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {isHomePage && sections.length > 0 && (
              <div className="space-y-4">
                <div className="px-4">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 flex items-center gap-2">
                    <AlertCircle size={10} /> Table of Contents
                  </span>
                </div>
                <div className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        onSectionClick?.(section.id);
                        handleNavClick();
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-2 text-left text-xs font-medium rounded-md transition-all group",
                        activeSection === section.id 
                          ? "text-emerald-400 font-bold" 
                          : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                      )}
                    >
                      <span className="truncate pr-2">{section.title}</span>
                      <ChevronRight 
                        size={12} 
                        className={cn(
                          "transition-transform", 
                          activeSection === section.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-40"
                        )} 
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </nav>

          <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <p className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-widest">Hyd-City Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-[10px] text-slate-300 font-bold tracking-tight uppercase">Active Growth Phase</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
