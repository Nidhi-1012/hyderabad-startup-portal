import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="pt-24 pb-16 min-h-[40vh] border-b border-slate-800/50 scroll-mt-20 group animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-forwards">
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-6">
          <div className="relative h-10 w-1.5 overflow-hidden rounded-full bg-slate-800">
            <div className="absolute inset-0 bg-blue-500 transition-transform duration-500 group-hover:scale-y-150 origin-top" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase sm:text-4xl lg:text-5xl">
            {title}
          </h2>
        </div>
        <div className="text-slate-300 leading-relaxed font-medium text-lg">
          {children}
        </div>
      </div>
    </section>
  );
};


export default Section;
