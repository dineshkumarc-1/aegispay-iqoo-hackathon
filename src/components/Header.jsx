import React from 'react';
import { ShieldCheck, FileText, Layers, Sparkles } from 'lucide-react';

export default function Header({ onOpenDeck, onOpenArch }) {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/90 px-4 py-2.5 flex items-center justify-between z-20 shrink-0 select-none shadow-2xs sticky top-0">
      
      {/* Brand & Live Protection Status */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-black text-slate-900 tracking-tight text-base">
              Aegis<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pay</span>
            </span>
            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border border-emerald-300 flex items-center gap-1 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>11.4ms NPU</span>
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-semibold m-0 mt-0.5">On-Device Sentinel</p>
        </div>
      </div>

      {/* Header Quick Actions */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onOpenDeck}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-xs transition cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Deck</span>
        </button>

        <button
          onClick={onOpenArch}
          className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer active:scale-95 border border-slate-200"
          title="Technical Architecture"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

    </header>
  );
}
