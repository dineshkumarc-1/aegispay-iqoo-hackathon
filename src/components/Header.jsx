import React from 'react';
import { ShieldCheck, FileText, Layers, Sparkles } from 'lucide-react';

export default function Header({ onOpenDeck, onOpenArch }) {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between z-20 shrink-0 select-none">
      
      {/* Brand & Live Protection Status */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-extrabold text-slate-900 tracking-tight text-base">
              Aegis<span className="text-blue-600">Pay</span>
            </span>
            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>11.4ms NPU</span>
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono m-0 mt-0.5">On-Device iQOO Sentinel</p>
        </div>
      </div>

      {/* Header Quick Actions */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onOpenDeck}
          className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1 shadow-xs active:scale-95"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Deck</span>
        </button>

        <button
          onClick={onOpenArch}
          className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer active:scale-95"
          title="Technical Architecture"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

    </header>
  );
}
