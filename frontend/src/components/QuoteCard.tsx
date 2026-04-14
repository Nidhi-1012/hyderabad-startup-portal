import React from 'react';
import { Quote, Globe, MessageSquare } from 'lucide-react';
import SourceButton from './SourceButton';

interface QuoteCardProps {
  author: string;
  platform: 'twitter' | 'linkedin' | 'other';
  content: string;
  context: string;
  sourceUrl?: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ author, platform, content, context, sourceUrl }) => {
  const Icon = platform === 'linkedin' ? Globe : platform === 'twitter' ? MessageSquare : Quote;
  
  return (
    <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-800/40 to-slate-900 border border-slate-700/50 my-10 overflow-hidden group shadow-2xl">
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
        <Quote size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-400 border border-slate-700 shadow-xl group-hover:scale-110 transition-transform">
            <Icon size={24} />
          </div>
          <div>
            <h5 className="text-white font-bold text-base tracking-tight">{author}</h5>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">{context}</p>
          </div>
        </div>

        <p className="text-slate-200 text-xl font-bold leading-relaxed mb-8 italic tracking-tight">
          "{content}"
        </p>

        <div className="flex justify-end border-t border-slate-800/50 pt-6 mt-auto">
          {sourceUrl && <SourceButton url={sourceUrl} label="View Original Post" />}
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
