import React from 'react';
import CategoryCard from './CategoryCard';
import { GUIDE_SECTIONS } from '../constants/sections';
import { LayoutGrid, Sparkles, Rocket, MapPin, Briefcase } from 'lucide-react';

interface CategoryGridProps {
  onSectionClick: (id: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onSectionClick }) => {
  const categories = [
    { name: 'Basics', icon: LayoutGrid, color: 'blue' },
    { name: 'Economy & Tech', icon: Rocket, color: 'emerald' },
    { name: 'Living', icon: MapPin, color: 'rose' },
    { name: 'Lifestyle', icon: Sparkles, color: 'violet' },
    { name: 'Practical', icon: Briefcase, color: 'amber' },
  ];

  return (
    <div className="w-full space-y-12 py-12">
      <div className="text-center w-full mx-auto mb-16 px-6">
        <h2 className="text-3xl font-black text-white tracking-tighter mb-4">
          Ultimate Guide <span className="text-purple-400">Directory</span>
        </h2>
        <p className="text-gray-400 font-medium">
          34 comprehensive sections covering everything you need to know about living, working, and building in Hyderabad 2026.
        </p>
      </div>

      {categories.map((cat) => {
        const sectionsInCat = GUIDE_SECTIONS.filter(s => s.category === cat.name);
        const Icon = cat.icon;

        return (
          <div key={cat.name} className="space-y-6">
            <div className="flex items-center gap-3 px-6 md:px-12 lg:px-20 max-w-screen-2xl mx-auto w-full">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400">
                <Icon size={18} />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight uppercase tracking-[0.2em] text-[12px] opacity-60">
                {cat.name}
              </h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 md:px-12 lg:px-20 max-w-screen-2xl mx-auto w-full pb-4">
              {sectionsInCat.map((section) => (
                <CategoryCard
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  icon={section.icon}
                  onClick={onSectionClick}
                  color={cat.color}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryGrid;
