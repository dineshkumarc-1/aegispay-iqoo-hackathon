import React, { useState } from 'react';
import Header from './components/Header';
import QRScannerView from './components/QRScannerView';
import SocialEngineeringInterceptor from './components/SocialEngineeringInterceptor';
import ReceiptVerifier from './components/ReceiptVerifier';
import ArchitectureModal from './components/ArchitectureModal';
import PitchDeckModal from './components/PitchDeckModal';
import { ShieldCheck, Cpu, WifiOff, Sparkles, HelpCircle, FileText, CheckCircle2, ChevronRight, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('qr-shield');
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const [isArchOpen, setIsArchOpen] = useState(false);
  const [showJudgeBanner, setShowJudgeBanner] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* App Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDeck={() => setIsDeckOpen(true)}
        onOpenArch={() => setIsArchOpen(true)}
      />

      {/* Interactive Judge Quick Tour Banner */}
      {showJudgeBanner && (
        <div className="bg-gradient-to-r from-cyan-950/70 via-slate-900 to-blue-950/70 border-b border-cyan-500/30 px-4 py-2.5">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-black text-[10px] uppercase">
                Judge Quick Tour
              </span>
              <span className="text-slate-300">
                1. Test <strong>Quishing QR & Voice Alert</strong> ➔ 2. Try <strong>Scam Call Interceptor</strong> ➔ 3. Inspect <strong>Receipt Guard</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDeckOpen(true)}
                className="text-cyan-400 hover:text-cyan-300 font-bold underline flex items-center gap-1 cursor-pointer"
              >
                <span>Open 10-Slide Deck</span>
                <ChevronRight className="w-3 h-3" />
              </button>
              <button
                onClick={() => setShowJudgeBanner(false)}
                className="text-slate-400 hover:text-white transition cursor-pointer p-0.5"
                title="Dismiss banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-8">
        {activeTab === 'qr-shield' && <QRScannerView />}
        {activeTab === 'social-eng' && <SocialEngineeringInterceptor />}
        {activeTab === 'receipt-guard' && <ReceiptVerifier />}
      </main>

      {/* Edge AI Telemetry Footer Bar */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-4 px-4 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-400 font-medium">AegisPay Edge AI Sandbox v1.0</span>
            <span className="text-slate-600">|</span>
            <span>iQOO Hackathon 2026 Submission</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span>Model: LiteRT MobileBERT (INT8)</span>
            <span>Zero Cloud I/O</span>
            <button
              onClick={() => setIsDeckOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 font-sans font-bold underline cursor-pointer"
            >
              View Pitch Deck
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ArchitectureModal isOpen={isArchOpen} onClose={() => setIsArchOpen(false)} />
      <PitchDeckModal isOpen={isDeckOpen} onClose={() => setIsDeckOpen(false)} />
    </div>
  );
}
