import React from 'react';
import { 
  QrCode, Waves, MessageSquareWarning, Bot, 
  Receipt, Scale, ChevronRight, ShieldCheck, 
  Sparkles, FileText, Lock
} from 'lucide-react';

export default function SimpleHomeView({ onSelectTool, onOpenDeck }) {
  const tools = [
    {
      id: 'qr-shield',
      title: 'Scan QR Code',
      subtitle: '3D optical parallax & fake sticker check',
      icon: QrCode,
      gradient: 'from-cyan-500 to-blue-600',
      bgLight: 'bg-cyan-50',
      borderLight: 'border-cyan-200',
      iconColor: 'text-cyan-600',
      badge: 'Live Camera'
    },
    {
      id: 'deepfake-voice',
      title: 'Check Audio Call',
      subtitle: 'Detects AI deepfake cloned voices in real time',
      icon: Waves,
      gradient: 'from-purple-500 to-indigo-600',
      bgLight: 'bg-purple-50',
      borderLight: 'border-purple-200',
      iconColor: 'text-purple-600',
      badge: 'Spectrogram'
    },
    {
      id: 'social-eng',
      title: 'Scan SMS Message',
      subtitle: 'Scans electricity discom threats & PIN traps',
      icon: MessageSquareWarning,
      gradient: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50',
      borderLight: 'border-amber-200',
      iconColor: 'text-amber-600',
      badge: 'MobileBERT'
    },
    {
      id: 'scambait',
      title: 'ScamBait AI Trap',
      subtitle: 'Trolls scammers & extracts mule bank accounts',
      icon: Bot,
      gradient: 'from-pink-500 to-rose-600',
      bgLight: 'bg-pink-50',
      borderLight: 'border-pink-200',
      iconColor: 'text-pink-600',
      badge: 'AI Persona'
    },
    {
      id: 'receipt-guard',
      title: 'Verify Shop Receipt',
      subtitle: 'Catches spoofed Paytm green checkmark apps',
      icon: Receipt,
      gradient: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50',
      borderLight: 'border-emerald-200',
      iconColor: 'text-emerald-600',
      badge: 'Luhn Check'
    },
    {
      id: 'reports',
      title: '1930 Cyber Police FIR',
      subtitle: 'Official legal evidence file & DPDP audit',
      icon: Scale,
      gradient: 'from-blue-600 to-slate-900',
      bgLight: 'bg-blue-50',
      borderLight: 'border-blue-200',
      iconColor: 'text-blue-600',
      badge: 'Sec 65B Certified'
    }
  ];

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-8">
      
      {/* 1. Hero Sentinel Status Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 text-white shadow-md space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200 font-mono">
              On-Device Shield Active
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
            11.4ms NPU
          </span>
        </div>

        <div>
          <h2 className="text-xl font-black text-white tracking-tight m-0">
            AegisPay Autonomous Defense
          </h2>
          <p className="text-xs text-blue-100 mt-1 leading-snug">
            Real-time on-device protection for UPI payments, voice calls, and QR codes under DPDP Act 2023.
          </p>
        </div>

        <div className="pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] text-blue-100 font-medium">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span>0 Bytes Cloud Leaks</span>
          </span>
          <button
            onClick={onOpenDeck}
            className="px-2.5 py-1 rounded-lg bg-white text-blue-900 font-bold text-[11px] hover:bg-blue-50 transition cursor-pointer shadow-xs flex items-center gap-1"
          >
            <FileText className="w-3 h-3" />
            <span>10-Slide Deck</span>
          </button>
        </div>
      </div>

      {/* 2. Grid of 6 Clean 1-Tap Action Cards */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Tap a tool to scan & detect
          </span>
          <span className="text-[11px] text-slate-400">6 AI Tools</span>
        </div>

        <div className="space-y-2.5">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className="w-full p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition text-left cursor-pointer flex items-center justify-between gap-3 group active:scale-98"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-11 h-11 rounded-2xl ${tool.bgLight} border ${tool.borderLight} flex items-center justify-center ${tool.iconColor} shrink-0 group-hover:scale-110 transition shadow-2xs`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm truncate">{tool.title}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${tool.bgLight} ${tool.iconColor} border ${tool.borderLight}`}>
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 m-0 mt-0.5 leading-snug truncate">
                      {tool.subtitle}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
