import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Plus, Rocket, Loader2, RefreshCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import StartupCard from '../components/StartupCard';
import AddStartupModal from '../components/AddStartupModal';
import StartupDetailModal from '../components/StartupDetailModal';
import { Startup, Industry, FundingStage } from '../types';
import { sampleStartups } from '../data/sampleData';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_URL = '/api/startups';

const Startups: React.FC = () => {
  // State
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | 'All'>('All');
  const [selectedStage, setSelectedStage] = useState<FundingStage | 'All'>('All');
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');
  
  // Modals
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;



  // Search Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch Data
  const fetchStartups = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      let data = Array.isArray(response.data) ? response.data : response.data.startups ?? [];
      
      const localDataStr = localStorage.getItem('hyd_startups');
      const localData = localDataStr ? JSON.parse(localDataStr) : [];
      
      if (data.length === 0) {
         if (sampleStartups.length > localData.length) {
            data = [...sampleStartups];
            localStorage.setItem('hyd_startups', JSON.stringify(data));
         } else {
            data = localData.length > 0 ? localData : sampleStartups;
         }
      }

      setStartups(data);
      setError(null);
    } catch (err) {
      console.warn("API not reachable, using updated sample data", err);
      const localDataStr = localStorage.getItem('hyd_startups');
      const localData = localDataStr ? JSON.parse(localDataStr) : [];
      
      // If sample data has more startups than cached, use sample data
      if (sampleStartups.length > localData.length) {
        setStartups(sampleStartups);
        localStorage.setItem('hyd_startups', JSON.stringify(sampleStartups));
      } else {
        setStartups(localData.length > 0 ? localData : sampleStartups);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, []);

  // Filtering Logic (Client-side for better UX with sample/local data)
  const filteredStartups = useMemo(() => {
    return (startups ?? []).filter(s => {
      const matchesSearch = 
        (s.name?.toLowerCase() || '').includes(debouncedSearch.toLowerCase()) ||
        (s.founderName?.toLowerCase() || '').includes(debouncedSearch.toLowerCase()) ||
        (s.about?.toLowerCase() || '').includes(debouncedSearch.toLowerCase());
      
      const matchesIndustry = selectedIndustry === 'All' || s.industry === selectedIndustry;
      const matchesStage = selectedStage === 'All' || s.fundingStage === selectedStage;
      const matchesYear = selectedYear === 'All' || s.foundedYear === selectedYear;

      return matchesSearch && matchesIndustry && matchesStage && matchesYear;
    });
  }, [startups, debouncedSearch, selectedIndustry, selectedStage, selectedYear]);


  // Pagination Logic
  const totalPages = Math.ceil(filteredStartups.length / cardsPerPage);
  const currentCards = filteredStartups.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const industries: (Industry | 'All')[] = ['All', 'AI & Deep Tech', 'Fintech', 'Healthtech', 'SaaS', 'Pharma', 'Others'];
  const stages: (FundingStage | 'All')[] = ['All', 'Pre-seed', 'Seed', 'Series A+', 'Bootstrapped'];
  const years = ['All', ...Array.from({ length: 12 }, (_, i) => 2026 - i)];

  return (
    <div className="min-h-screen bg-[#0B0F1A] pb-20 w-full">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative px-6 md:px-12 lg:px-20 max-w-screen-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold tracking-widest uppercase mb-6 md:animate-bounce-subtle">
            <Rocket size={12} /> The Ecosystem Explorer
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
             Hyderabad Startups <br />
            <span className="bg-gradient-to-r from-purple-400 via-orange-400 to-purple-500 bg-clip-text text-transparent">
              Directory 2026
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
            Discover the innovators, creators, and disruptors building the future of India's Silicon City. Real data. Real founders. Verified ecosystem.
          </p>
        </div>
      </div>

      <div className="w-full px-6 md:px-12 lg:px-20 mx-auto">
        {/* Search & Filters */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 md:p-10 mb-12 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col gap-8">
            {/* Search Bar */}
            <div className="relative group max-w-2xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Search by name, founder or vision..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0B0F1A] border border-white/10 rounded-2xl pl-16 pr-6 py-5 text-gray-200 text-lg focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none placeholder:text-gray-600"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors">
                  <RefreshCcw size={16} />
                </button>
              )}
            </div>

            {/* Filter Blocks */}
            <div className="flex flex-col gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">
                  <Filter size={10} /> Industry Focus
                </div>
                <div className="flex flex-wrap gap-2">
                  {industries.map(industry => (
                    <button
                      key={industry}
                      onClick={() => setSelectedIndustry(industry)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                        selectedIndustry === industry 
                          ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20" 
                          : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300"
                      )}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                 <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 text-orange-400/70">
                    Funding Stage
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stages.map(stage => (
                      <button
                        key={stage}
                        onClick={() => setSelectedStage(stage)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                          selectedStage === stage 
                            ? "bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-500/20" 
                            : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300"
                        )}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-48 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">
                    Founded Year
                  </div>
                  <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                    className="w-full bg-[#0B0F1A] border border-white/10 rounded-xl px-4 py-2.5 text-gray-400 text-xs font-bold transition-all outline-none focus:border-purple-500/50"
                  >
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-8 px-2">
          <p className="text-slate-500 text-sm font-medium">
            Showing <span className="text-white font-bold">{currentCards.length}</span> of <span className="text-white font-bold">{filteredStartups.length}</span> startups
          </p>
          <div className="flex gap-4">
            {selectedIndustry !== 'All' || selectedStage !== 'All' || searchTerm ? (
              <button 
                onClick={() => {
                  setSelectedIndustry('All');
                  setSelectedStage('All');
                  setSearchTerm('');
                  setSelectedYear('All');
                }}
                className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors"
              >
                Clear all filters
              </button>
            ) : null}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-purple-500" size={40} />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Processing Ecosystem...</p>
          </div>
        ) : filteredStartups.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
              {currentCards.map(startup => (
                <div key={startup._id || startup.name} className="h-full">
                  <StartupCard 
                    startup={startup} 
                    onClick={setSelectedStartup} 
                  />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-16 gap-6">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white hover:border-white/20 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={cn(
                        "w-10 h-10 rounded-xl text-xs font-bold transition-all",
                        currentPage === i + 1 
                          ? "bg-purple-600 text-white" 
                          : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300"
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white hover:border-white/20 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-[2rem] py-20 text-center px-6 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white mb-2">No startups found in this sector.</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto mb-8">
              Try adjusting your filters or search terms. The Hyderabad ecosystem is growing, and your perfect match might be in another sector!
            </p>
            <button 
              onClick={() => {
                setSelectedIndustry('All');
                setSelectedStage('All');
                setSearchTerm('');
              }}
              className="px-6 py-3 bg-white/10 text-white border border-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all"
            >
              Reset Exploration
            </button>
          </div>
        )}

      </div>

      {/* Modals */}
      <StartupDetailModal 
        startup={selectedStartup} 
        isOpen={!!selectedStartup} 
        onClose={() => setSelectedStartup(null)} 
      />
    </div>
  );
};

export default Startups;
