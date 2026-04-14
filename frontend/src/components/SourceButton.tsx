import React from 'react';
import { ExternalLink } from 'lucide-react';

interface SourceButtonProps {
  url: string;
  label?: string;
}

const SourceButton: React.FC<SourceButtonProps> = ({ url, label = 'Source' }) => {
  if (!url) return null;
  
  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-full transition-all duration-300 group shadow-lg active:scale-95"
    >
      <span>{label}</span>
      <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </a>
  );
};

export default SourceButton;
