import React from 'react';
import SourceButton from './SourceButton';

interface DataTableProps {
  headers: string[];
  data: (string | number | React.ReactNode)[][];
  title: string;
  sourceUrl?: string;
}

const DataTable: React.FC<DataTableProps> = ({ headers, data, title, sourceUrl }) => {
  return (
    <div className="my-8 overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/40 backdrop-blur-sm shadow-2xl">
      <div className="px-8 py-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
        <h4 className="font-bold text-slate-100 text-lg tracking-tight">{title}</h4>
        {sourceUrl && <SourceButton url={sourceUrl} label="View Data Source" />}
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-slate-800/20">
              {headers.map((header, i) => (
                <th key={i} className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-blue-500/5 transition-colors duration-150 group">
                {row.map((cell, j) => (
                  <td key={j} className="px-8 py-5 text-sm text-slate-300 group-hover:text-slate-100 font-medium">
                    {typeof cell === 'string' && cell.startsWith('http') ? (
                      <SourceButton url={cell} />
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
