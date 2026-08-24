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

  const toolMeta = {
    'qr-shield': { title: '3D QR Quishing Shield', color: 'text-cyan-600', badge: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    'deepfake-voice': { title: 'AI Deepfake Voice Detector', color: 'text-purple-600', badge: 'bg-purple-50 text-purple-700 border-purple-200' },
    'social-eng': { title: 'SMS & Intent Interceptor', color: 'text-amber-600', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
    'scambait': { title: 'ScamBait AI Honeypot', color: 'text-pink-600', badge: 'bg-pink-50 text-pink-700 border-pink-200' },
    'receipt-guard': { title: 'Kirana Receipt Verifier', color: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    'reports': { title: '1930 Cyber Police & DPDP Vault', color: 'text-blue-600', badge: 'bg-blue-50 text-blue-700 border-blue-200' }
  };

  const currentMeta = toolMeta[activeScreen] || { title: 'AI Threat Detector', color: 'text-slate-900', badge: 'bg-slate-100 text-slate-700' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100/50 via-slate-50 via-purple-50/40 to-pink-50/40 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      
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
            
            {/* Top Navigation Bar with Colorful Accent */}
            <div className="flex items-center justify-between bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-2.5 shadow-xs">
              <button
                onClick={() => {
                  setActiveScreen('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition cursor-pointer active:scale-95 border border-slate-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Home</span>
              </button>

              <span className={`font-black text-xs truncate max-w-[200px] ${currentMeta.color}`}>
                {currentMeta.title}
              </span>

              <button
                onClick={() => setIsDeckModalOpen(true)}
                className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs transition cursor-pointer shadow-xs active:scale-95"
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
