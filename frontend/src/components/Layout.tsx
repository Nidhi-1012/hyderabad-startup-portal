import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import CinematicOverlay from './CinematicOverlay';
import AddStartupModal from './AddStartupModal';

const Layout: React.FC = () => {
  const [contentRevealed, setContentRevealed] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    // The doors start opening at 1s in CinematicOverlay
    const timer = setTimeout(() => {
      setContentRevealed(true);
    }, 1000);

    const handleOpenModal = () => setIsAddModalOpen(true);
    window.addEventListener('open-add-startup', handleOpenModal);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-add-startup', handleOpenModal);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F1A] font-sans text-gray-200 flex flex-col overflow-x-hidden">
      <CinematicOverlay />
      <ScrollToTop />
      
      {/* Content wrapper with scale and fade animation */}
      <div 
        className={`flex-grow flex flex-col transition-all duration-[1200ms] ease-out transform origin-center
          ${contentRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <Navbar />
        <main className="w-full flex-grow relative flex flex-col">
          <div className="w-full h-full flex-grow">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
      
      {/* Modals placed outside transformed parent so `fixed` works against the viewport */}
      <AddStartupModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSubmit={() => {}}
      />
    </div>
  );
};

export default Layout;
