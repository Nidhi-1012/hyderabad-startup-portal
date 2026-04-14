import React from 'react';
import { ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CategoryCardProps {
  id: string;
  title: string;
  icon: any;
  onClick: (id: string) => void;
  color?: string; // Kept for backwards compatibility but not used
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, title, icon: Icon, onClick }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className="group relative flex flex-col items-start p-5 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)] hover:border-purple-500/50 hover:scale-105 text-left overflow-hidden"
    >
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-3 bg-black/40 border border-white/10 text-purple-400 rounded-lg mb-4 transition-all group-hover:bg-purple-500/20 group-hover:text-orange-400 duration-300 relative z-10">
        <Icon size={24} />
      </div>

      <div className="flex-1 flex flex-col relative z-10">
        <h3 className="text-sm font-black text-white leading-tight mb-2 tracking-tight group-hover:text-purple-300 transition-colors">
          {title}
        </h3>
        <div className="mt-auto flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-orange-400 transition-colors">
          Explore Section <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </button>
  );
};

export default CategoryCard;
