import React, { useState } from 'react';
import { 
  ShieldCheck, QrCode, FileCheck, Layers, FileText, 
  Wifi, Battery, Sparkles
} from 'lucide-react';
import Header from './components/Header';
import RiskSecurityView from './components/RiskSecurityView';
import ReportsView from './components/ReportsView';
import ArchitectureModal from './components/ArchitectureModal';
import PitchDeckModal from './components/PitchDeckModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState('scanners');
  const [selectedScannerEngine, setSelectedScannerEngine] = useState('qr-shield');
  
  // Modals
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 sm:py-5 flex flex-col justify-center items-center font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* Smartphone Hardware Frame (Laptop Showcase & Native Mobile) */}
      <div className="w-full max-w-[430px] bg-slate-50 min-h-screen sm:min-h-[860px] sm:max-h-[94vh] sm:rounded-[48px] sm:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.8)] sm:border-[8px] sm:border-slate-800 ring-1 ring-slate-700/60 flex flex-col overflow-hidden relative">
        
        {/* Smartphone Dynamic Island & Status Bar */}
        <div className="bg-white/95 px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-bold text-slate-800 z-30 shrink-0 select-none">
          <span className="font-mono">09:41</span>

          {/* Dynamic Island Pill Notch */}
          <div className="w-24 h-5 bg-slate-900 rounded-full flex items-center justify-end px-2 gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-700"></span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-700 font-mono text-[10px]">
            <span>5G</span>
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Smartphone App Header */}
        <Header 
          onOpenDeck={() => setIsDeckModalOpen(true)}
          onOpenArch={() => setIsArchModalOpen(true)}
        />

        {/* Scrollable Content Body */}
        <main className="flex-1 overflow-y-auto px-3.5 pt-2.5 pb-20 no-scrollbar">
          
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

        {/* Tactile Smartphone Bottom Navigation Bar */}
        <nav className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-8 flex items-center justify-around z-40 shadow-lg select-none">
          
          {/* Tab 1: 5 AI Scanners */}
          <button
            onClick={() => {
              setCurrentTab('scanners');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-extrabold transition-all cursor-pointer ${
              currentTab === 'scanners' 
                ? 'text-blue-600 scale-105' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`p-1.5 rounded-2xl transition ${
              currentTab === 'scanners' 
                ? 'bg-blue-50 text-blue-600 shadow-xs' 
                : ''
            }`}>
              <QrCode className="w-5 h-5" />
            </div>
            <span>5 AI Scanners</span>
          </button>

          {/* Tab 2: 1930 Vault & Pitch Deck */}
          <button
            onClick={() => {
              setCurrentTab('vault');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-extrabold transition-all cursor-pointer ${
              currentTab === 'vault' 
                ? 'text-blue-600 scale-105' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`p-1.5 rounded-2xl transition ${
              currentTab === 'vault' 
                ? 'bg-blue-50 text-blue-600 shadow-xs' 
                : ''
            }`}>
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
