import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Wifi, WifiOff, Zap, FileText, Layers } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenDeck, onOpenArch }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold text-lg ring-2 ring-cyan-400/30">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white m-0">
                Aegis<span className="text-cyan-400">Pay</span>
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                iQOO 2026 Edge AI
              </span>
            </div>
            <p className="text-xs text-slate-400 m-0">Autonomous On-Device UPI & QR Fraud Shield</p>
          </div>
        </div>

        {/* Telemetry Chips */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>LiteRT SLM Core:</span>
            <span className="font-mono text-cyan-300 font-semibold">11.4ms NPU</span>
          </div>

          {/* Dynamic Network Status Badge */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold ${
            isOnline 
              ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300'
              : 'bg-amber-950/70 border-amber-500/80 text-amber-300 animate-pulse'
          }`}>
            {isOnline ? <WifiOff className="w-3.5 h-3.5 text-emerald-400" /> : <WifiOff className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isOnline ? '100% Offline Capable' : '⚡ Airplane Mode (Local AI Active)'}</span>
          </div>

          {/* Quick Buttons for Presentation / Architecture */}
          <button
            onClick={onOpenDeck}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Hackathon Pitch</span>
          </button>

          <button
            onClick={onOpenArch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-semibold text-xs transition cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 flex gap-1 border-t border-slate-800/60 overflow-x-auto">
        <button
          onClick={() => setActiveTab('qr-shield')}
          className={`px-4 py-2.5 text-xs font-semibold tracking-wide border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'qr-shield'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>1. QR & Quishing Shield</span>
        </button>

        <button
          onClick={() => setActiveTab('social-eng')}
          className={`px-4 py-2.5 text-xs font-semibold tracking-wide border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'social-eng'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>2. Social Engineering Interceptor</span>
        </button>

        <button
          onClick={() => setActiveTab('receipt-guard')}
          className={`px-4 py-2.5 text-xs font-semibold tracking-wide border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'receipt-guard'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>3. Spoofed Receipt & Soundbox Verifier</span>
        </button>
      </div>
    </header>
  );
}
