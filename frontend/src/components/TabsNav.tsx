import React, { useRef, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TabsNavProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  tabs: { id: string; label: string }[];
}

const TabsNav: React.FC<TabsNavProps> = ({ activeTab, onTabChange, tabs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeElement = scrollRef.current?.querySelector(`[data-tab-id="${activeTab}"]`);
    if (activeElement) {
      activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  return (
    <div className="sticky top-0 z-[40] bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar px-6 py-4 gap-2 scroll-smooth"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab-id={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "whitespace-nowrap px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 relative group",
                activeTab === tab.id 
                  ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-105" 
                  : "bg-slate-900/50 text-slate-500 hover:text-slate-300 hover:bg-slate-800 border border-transparent hover:border-slate-700"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-white rounded-full blur-[1px]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabsNav;
