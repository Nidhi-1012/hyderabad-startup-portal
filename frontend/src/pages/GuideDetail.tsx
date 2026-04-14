import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { getGuideSections } from '../data/guideSectionsJSX';
import { Startup } from '../types';
import { sampleStartups } from '../data/sampleData';
import StartupDetailModal from '../components/StartupDetailModal';

const API_URL = 'http://localhost:5000/api/startups';

const GuideDetail: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [startups, setStartups] = useState<Startup[]>([]);
  const [isLoadingStartups, setIsLoadingStartups] = useState(true);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  // Fetch startups because some guide sections (like "startup-ecosystem") use them
  useEffect(() => {
    const fetchStartups = async () => {
      setIsLoadingStartups(true);
      try {
        const response = await axios.get(API_URL);
        setStartups(response.data);
      } catch (err) {
        const localData = localStorage.getItem('hyd_startups');
        if (localData) {
          setStartups(JSON.parse(localData));
        } else {
          setStartups(sampleStartups);
        }
      } finally {
        setIsLoadingStartups(false);
      }
    };
    fetchStartups();
  }, []);

  // Render the specific section — must be before any early returns (Rules of Hooks)
  const sections = useMemo(() => 
    getGuideSections(startups, isLoadingStartups, setSelectedStartup),
    [startups, isLoadingStartups]
  );
  const sectionContent = sectionId ? sections[sectionId] : null;

  const handleBack = useCallback(() => {
    // Save scroll position so Home.tsx can restore it — no hash URL tricks
    sessionStorage.setItem('home_scroll_restore', 'guide-grid');
    navigate('/');
  }, [navigate]);

  if (!sectionId) return null;

  if (!sectionContent) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Section Not Found</h2>
        <button onClick={() => navigate('/')} className="text-purple-400 hover:text-white">Return to Guide</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Directory
        </button>
        
        {/* Render the extracted JSX content here */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          {sectionContent}
        </div>
      </div>
      
      {/* Detail Modal in case a StartupCard is clicked inside the content */}
      <StartupDetailModal 
        startup={selectedStartup} 
        isOpen={!!selectedStartup} 
        onClose={() => setSelectedStartup(null)} 
      />
    </div>
  );
};

export default GuideDetail;
