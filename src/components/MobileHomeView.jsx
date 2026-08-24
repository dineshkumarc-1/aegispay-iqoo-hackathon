import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, QrCode, Waves, MessageSquareWarning, 
  Bot, Receipt, ArrowRight, CheckCircle2, Lock, Zap, 
  AlertTriangle, PhoneCall, Sparkles, Volume2, ChevronRight
} from 'lucide-react';
import QRScannerView from './QRScannerView';

export default function MobileHomeView({ onNavigateToScanner }) {
  return (
    <div className="space-y-4 max-w-lg mx-auto pb-6">
      
      {/* 1. Live Sentinel Status Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
              System Protected
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
            11.4ms NPU
          </span>
        </div>

        <div>
          <h2 className="text-lg font-black text-white tracking-tight m-0">
            AegisPay Autonomous Defense
          </h2>
          <p className="text-xs text-blue-100 mt-0.5 leading-snug">
            Real-time on-device protection for UPI payments, voice calls, and retail QR codes.
          </p>
        </div>

        <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-blue-100 font-medium">
          <span>🔒 100% Zero-Knowledge Privacy</span>
          <span>✈️ Works Offline</span>
        </div>
      </div>

      {/* 2. Hero Action: Embedded Live 3D QR Camera Scanner */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <QrCode className="w-4 h-4 text-blue-600" />
            <span>Live 3D QR & Quishing Scanner</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
            60 FPS AR
          </span>
        </div>

        {/* Embedded Scanner Viewfinder Component */}
        <QRScannerView />
      </div>

      {/* 3. Quick AI Threat Detection Engines Grid */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            All AI Threat Detectors
          </span>
          <span className="text-[11px] text-slate-500">Tap to test</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          
          {/* Card 1: Deepfake Voice */}
          <button
            onClick={() => onNavigateToScanner('deepfake-voice')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition text-left cursor-pointer space-y-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 group-hover:scale-110 transition">
              <Waves className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                <span>Voice Clones</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition" />
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 m-0 leading-tight">
                Catches emergency accident voice scam calls
              </p>
            </div>
          </button>

          {/* Card 2: SMS Coercion */}
          <button
            onClick={() => onNavigateToScanner('social-eng')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition text-left cursor-pointer space-y-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-110 transition">
              <MessageSquareWarning className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                <span>SMS & PIN Traps</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition" />
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 m-0 leading-tight">
                MobileBERT scans fake electricity discom threats
              </p>
            </div>
          </button>

          {/* Card 3: ScamBait Honeypot */}
          <button
            onClick={() => onNavigateToScanner('scambait')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition text-left cursor-pointer space-y-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                <span>ScamBait AI</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition" />
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 m-0 leading-tight">
                Trolls scammers & extracts mule bank accounts
              </p>
            </div>
          </button>

          {/* Card 4: Kirana Receipt Guard */}
          <button
            onClick={() => onNavigateToScanner('receipt-guard')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition text-left cursor-pointer space-y-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                <span>Shop Receipts</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition" />
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 m-0 leading-tight">
                Catches spoofed Paytm green checkmark screens
              </p>
            </div>
          </button>

        </div>
      </div>

      {/* 4. Recent Threat Interception Feed */}
      <div className="space-y-2 pt-2">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider px-1 block">
          Recent Threat Blocks (Last 24 Hours)
        </span>

        <div className="space-y-2">
          
          <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0 mt-0.5">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Quishing Sticker Tamper Blocked</span>
                <span className="text-[10px] text-slate-400 font-mono">26m ago</span>
              </div>
              <p className="text-[11px] text-slate-600 m-0 mt-0.5 leading-snug">
                Physical +0.35mm sticker over Tea Stall QR stand detected. Payment blocked before PIN prompt.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0 mt-0.5">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">AI Voice Clone Call Flagged</span>
                <span className="text-[10px] text-slate-400 font-mono">1h ago</span>
              </div>
              <p className="text-[11px] text-slate-600 m-0 mt-0.5 leading-snug">
                Synthesized 120Hz vocoder artifact detected on emergency hospital call. Android PIN barrier locked.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
