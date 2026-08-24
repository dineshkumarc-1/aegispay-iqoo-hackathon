import React, { useState } from 'react';
import { 
  ShieldCheck, QrCode, FileCheck, Layers, FileText
} from 'lucide-react';
import Header from './components/Header';
import MobileHomeView from './components/MobileHomeView';
import RiskSecurityView from './components/RiskSecurityView';
import ReportsView from './components/ReportsView';
import ArchitectureModal from './components/ArchitectureModal';
import PitchDeckModal from './components/PitchDeckModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedScannerEngine, setSelectedScannerEngine] = useState('qr-shield');
  
  // Modals
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);

  const handleLaunchScanner = (engineId) => {
    setSelectedScannerEngine(engineId);
    setCurrentTab('scanners');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900/90 sm:py-4 flex justify-center items-center font-sans antialiased text-slate-900">
      
      {/* Mobile Device Canvas Frame */}
      <div className="w-full max-w-md bg-slate-50 min-h-screen sm:min-h-[850px] sm:max-h-[92vh] sm:rounded-3xl sm:shadow-2xl sm:border sm:border-slate-300 flex flex-col overflow-hidden relative">
        
        {/* Mobile App Header */}
        <Header 
          onOpenDeck={() => setIsDeckModalOpen(true)}
          onOpenArch={() => setIsArchModalOpen(true)}
        />

        {/* Scrollable Mobile Body */}
        <main className="flex-1 overflow-y-auto p-4 pb-24">
          
          {currentTab === 'home' && (
            <MobileHomeView onNavigateToScanner={handleLaunchScanner} />
          )}

          {currentTab === 'scanners' && (
            <RiskSecurityView 
              activeEngine={selectedScannerEngine}
              onSelectEngine={(id) => setSelectedScannerEngine(id)}
            />
          )}

          {currentTab === 'vault' && (
            <ReportsView 
              onOpenDeck={() => setIsDeckModalOpen(true)}
              onOpenArch={() => setIsArchModalOpen(true)}
            />
          )}

        </main>

        {/* Tactile Mobile Bottom Navigation Bar */}
        <nav className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-6 flex items-center justify-around z-40 shadow-lg">
          
          {/* Tab 1: Guard / Home */}
          <button
            onClick={() => {
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-1 text-[11px] font-bold transition cursor-pointer ${
              currentTab === 'home' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${currentTab === 'home' ? 'bg-blue-50' : ''}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span>Guard</span>
          </button>

          {/* Tab 2: AI Threat Scanners */}
          <button
            onClick={() => {
              setCurrentTab('scanners');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-1 text-[11px] font-bold transition cursor-pointer relative ${
              currentTab === 'scanners' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${currentTab === 'scanners' ? 'bg-blue-50' : ''}`}>
              <QrCode className="w-5 h-5" />
            </div>
            <span>5 Scanners</span>
            <span className="absolute 1 top-0 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
          </button>

          {/* Tab 3: 1930 Vault & Deck */}
          <button
            onClick={() => {
              setCurrentTab('vault');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-1 text-[11px] font-bold transition cursor-pointer ${
              currentTab === 'vault' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${currentTab === 'vault' ? 'bg-blue-50' : ''}`}>
              <FileCheck className="w-5 h-5" />
            </div>
            <span>1930 & Deck</span>
          </button>

        </nav>

        {/* Pitch Deck Presentation Modal */}
        <PitchDeckModal 
          isOpen={isDeckModalOpen} 
          onClose={() => setIsDeckModalOpen(false)} 
        />

        {/* Architecture Specs Modal */}
        <ArchitectureModal 
          isOpen={isArchModalOpen} 
          onClose={() => setIsArchModalOpen(false)} 
        />

      </div>

    </div>
  );
}
