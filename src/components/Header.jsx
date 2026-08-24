import React from 'react';
import { ShieldCheck, FileText, Layers, Sparkles } from 'lucide-react';

export default function Header({ onOpenDeck, onOpenArch }) {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
      
      {/* Brand & Live Protection Status */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 tracking-tight text-base">
              Aegis<span className="text-blue-600">Pay</span>
            </span>
            <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Protected</span>
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono m-0">LiteRT NPU • 100% Offline</p>
        </div>
      </div>

      {/* Header Quick Actions */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onOpenDeck}
          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1 shadow-xs"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Deck</span>
        </button>

        <button
          onClick={onOpenArch}
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
          title="Architecture"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

    </header>
  );
}
