import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/Section';
import StartupCard from '../components/StartupCard';
import DataTable from '../components/DataTable';
import QuoteCard from '../components/QuoteCard';
import SourceButton from '../components/SourceButton';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import AddStartupModal from '../components/AddStartupModal';
import StartupDetailModal from '../components/StartupDetailModal';
import axios from 'axios';
import { Startup } from '../types';
import { sampleStartups } from '../data/sampleData';
import { GUIDE_SECTIONS } from '../constants/sections';

const API_URL = '/api/startups';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [startups, setStartups] = useState<Startup[]>([]);
  const [isLoadingStartups, setIsLoadingStartups] = useState(true);

  useEffect(() => {
    const restoreTarget = sessionStorage.getItem('home_scroll_restore');
    if (restoreTarget === 'guide-grid') {
      sessionStorage.removeItem('home_scroll_restore');
      // Small delay to let the page render before scrolling
      setTimeout(() => {
        const element = document.getElementById('guide-grid');
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 350);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);


  const fetchStartups = async () => {
    setIsLoadingStartups(true);
    try {
      const response = await axios.get(API_URL);
      let data = Array.isArray(response.data) ? response.data : response.data.startups ?? [];
      
      const localDataStr = localStorage.getItem('hyd_startups');
      const localData = localDataStr ? JSON.parse(localDataStr) : [];
      
      // Merge backend and local fallback if backend is empty
      if (data.length === 0) {
         if (sampleStartups.length > localData.length) {
            data = [...sampleStartups];
            localStorage.setItem('hyd_startups', JSON.stringify(data));
         } else {
            data = localData.length > 0 ? localData : sampleStartups;
         }
      }
      setStartups(data);
    } catch {
      const localDataStr = localStorage.getItem('hyd_startups');
      const localData = localDataStr ? JSON.parse(localDataStr) : [];
      if (sampleStartups.length > localData.length) {
        setStartups(sampleStartups);
        localStorage.setItem('hyd_startups', JSON.stringify(sampleStartups));
      } else {
        setStartups(localData.length > 0 ? localData : sampleStartups);
      }
    } finally {
      setIsLoadingStartups(false);
    }
  };

  useEffect(() => { fetchStartups(); }, []);

  const handleGuideClick = (id: string) => {
    navigate(`/guide/${id}`);
  };

  const handleExploreClick = () => {
    const element = document.getElementById('guide-grid');
    if (element) {
       element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <Hero
        onExploreClick={handleExploreClick}
        onAddStartupClick={() => window.dispatchEvent(new Event('open-add-startup'))}
      />

      <div id="guide-grid" className="w-full">
        <CategoryGrid onSectionClick={handleGuideClick} />
      </div>

      
      {/* Sections have been moved to individual pages via GuideDetail */}

      <StartupDetailModal
        startup={selectedStartup}
        isOpen={!!selectedStartup}
        onClose={() => setSelectedStartup(null)}
      />
    </div>
  );
};

export default Home;
