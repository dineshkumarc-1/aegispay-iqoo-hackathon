import React, { useState } from 'react';
import { 
  ShieldCheck, QrCode, FileCheck, Layers, FileText, 
  ArrowLeft, Sparkles, Scale
} from 'lucide-react';
import Header from './components/Header';
import SimpleHomeView from './components/SimpleHomeView';
import QRScannerView from './components/QRScannerView';
import DeepfakeVoiceDetector from './components/DeepfakeVoiceDetector';
import SocialEngineeringInterceptor from './components/SocialEngineeringInterceptor';
import ScamBaitHoneypot from './components/ScamBaitHoneypot';
import ReceiptVerifier from './components/ReceiptVerifier';
import ReportsView from './components/ReportsView';
import ArchitectureModal from './components/ArchitectureModal';
import PitchDeckModal from './components/PitchDeckModal';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home'); // 'home' | 'qr-shield' | 'deepfake-voice' | 'social-eng' | 'scambait' | 'receipt-guard' | 'reports'
  
  // Modals
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);

  const toolTitles = {
    'qr-shield': '3D QR Quishing Shield',
    'deepfake-voice': 'AI Deepfake Voice Detector',
    'social-eng': 'SMS & Intent Interceptor',
    'scambait': 'ScamBait AI Honeypot',
    'receipt-guard': 'Kirana Receipt Verifier',
    'reports': '1930 Cyber Police & DPDP Vault'
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Clean Top Header */}
      <Header 
        onOpenDeck={() => setIsDeckModalOpen(true)}
        onOpenArch={() => setIsArchModalOpen(true)}
      />

      {/* Main Content View */}
      <main className="flex-1 w-full max-w-xl mx-auto px-3.5 py-3">
        
        {/* State 1: Simple Mobile Home Screen */}
        {activeScreen === 'home' && (
          <SimpleHomeView 
            onSelectTool={(toolId) => {
              setActiveScreen(toolId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenDeck={() => setIsDeckModalOpen(true)}
          />
        )}

        {/* State 2: Dedicated Interactive Tool View with Back Button */}
        {activeScreen !== 'home' && (
          <div className="space-y-3 pb-8 animate-in slide-in-from-right duration-150">
            
            {/* Top Navigation Bar with Back Button */}
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-2.5 shadow-2xs">
              <button
                onClick={() => {
                  setActiveScreen('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <span className="font-extrabold text-slate-900 text-xs truncate max-w-[200px]">
                {toolTitles[activeScreen] || 'AI Threat Detector'}
              </span>

              <button
                onClick={() => setIsDeckModalOpen(true)}
                className="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs transition cursor-pointer border border-blue-200"
              >
                Deck
              </button>
            </div>

            {/* Render Selected Interactive Tool */}
            <div>
              {activeScreen === 'qr-shield' && <QRScannerView />}
              {activeScreen === 'deepfake-voice' && <DeepfakeVoiceDetector />}
              {activeScreen === 'social-eng' && <SocialEngineeringInterceptor />}
              {activeScreen === 'scambait' && <ScamBaitHoneypot />}
              {activeScreen === 'receipt-guard' && <ReceiptVerifier />}
              {activeScreen === 'reports' && (
                <ReportsView 
                  onOpenDeck={() => setIsDeckModalOpen(true)}
                  onOpenArch={() => setIsArchModalOpen(true)}
                />
              )}
            </div>

          </div>
        )}

      </main>

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
