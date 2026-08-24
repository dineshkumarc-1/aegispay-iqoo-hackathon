import React, { useState } from 'react';
import { 
  ShieldCheck, QrCode, FileCheck, Layers, FileText
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Clean Top Header */}
      <Header 
        onOpenDeck={() => setIsDeckModalOpen(true)}
        onOpenArch={() => setIsArchModalOpen(true)}
      />

      {/* Main Content Area (Full Screen on Mobile & Centered on Desktop) */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-3.5 py-3 pb-24">
        
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

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-6 flex items-center justify-around z-40 shadow-lg select-none">
        
        {/* Tab 1: 5 AI Scanners */}
        <button
          onClick={() => {
            setCurrentTab('scanners');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-xs font-bold transition-all cursor-pointer ${
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
          className={`flex flex-col items-center gap-0.5 text-xs font-bold transition-all cursor-pointer ${
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
  );
}
