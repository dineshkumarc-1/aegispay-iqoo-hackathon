import React from 'react';
import { 
  QrCode, Waves, MessageSquareWarning, Bot, 
  Receipt, Scale, ChevronRight, ShieldCheck, 
  Sparkles, FileText, Lock, Zap
} from 'lucide-react';

export default function SimpleHomeView({ onSelectTool, onOpenDeck }) {
  const tools = [
    {
      id: 'qr-shield',
      title: 'Scan QR Code',
      subtitle: '3D optical parallax & fake sticker check',
      icon: QrCode,
      cardGradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
      cardBorder: 'border-cyan-200 hover:border-cyan-400',
      iconGradient: 'from-cyan-500 to-blue-600',
      iconShadow: 'shadow-cyan-500/25',
      badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      badge: 'Live 3D Camera'
    },
    {
      id: 'deepfake-voice',
      title: 'Check Audio Call',
      subtitle: 'Detects AI deepfake cloned voices in real time',
      icon: Waves,
      cardGradient: 'from-purple-500/10 via-indigo-500/5 to-transparent',
      cardBorder: 'border-purple-200 hover:border-purple-400',
      iconGradient: 'from-purple-500 to-indigo-600',
      iconShadow: 'shadow-purple-500/25',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
      badge: 'Voice AI NPU'
    },
    {
      id: 'social-eng',
      title: 'Scan SMS Message',
      subtitle: 'Scans electricity discom threats & PIN traps',
      icon: MessageSquareWarning,
      cardGradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
      cardBorder: 'border-amber-200 hover:border-amber-400',
      iconGradient: 'from-amber-500 to-orange-600',
      iconShadow: 'shadow-amber-500/25',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
      badge: 'MobileBERT'
    },
    {
      id: 'scambait',
      title: 'ScamBait AI Trap',
      subtitle: 'Trolls scammers & extracts mule bank accounts',
      icon: Bot,
      cardGradient: 'from-pink-500/10 via-rose-500/5 to-transparent',
      cardBorder: 'border-pink-200 hover:border-pink-400',
      iconGradient: 'from-pink-500 to-rose-600',
      iconShadow: 'shadow-pink-500/25',
      badgeBg: 'bg-pink-100 text-pink-800 border-pink-300',
      badge: 'Dadi Honeypot'
    },
    {
      id: 'receipt-guard',
      title: 'Verify Shop Receipt',
      subtitle: 'Catches spoofed Paytm green checkmark apps',
      icon: Receipt,
      cardGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      cardBorder: 'border-emerald-200 hover:border-emerald-400',
      iconGradient: 'from-emerald-500 to-teal-600',
      iconShadow: 'shadow-emerald-500/25',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      badge: 'Luhn Checksum'
    },
    {
      id: 'reports',
      title: '1930 Cyber Police FIR',
      subtitle: 'Official legal evidence file & DPDP audit',
      icon: Scale,
      cardGradient: 'from-blue-600/10 via-indigo-600/5 to-transparent',
      cardBorder: 'border-blue-200 hover:border-blue-400',
      iconGradient: 'from-blue-600 to-indigo-700',
      iconShadow: 'shadow-blue-500/25',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
      badge: 'Sec 65B PDF'
    }
  ];

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-8">
      
      {/* 1. Colorful Hero Sentinel Status Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-700 text-white shadow-lg shadow-indigo-500/20 space-y-3 relative overflow-hidden">
        
        {/* Ambient Glow Circles */}
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-pink-500/30 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-cyan-400/30 blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-200 font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>On-Device Shield Active</span>
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white border border-white/30">
            ⚡ 11.4ms NPU
          </span>
        </div>

        <div className="relative z-10">
          <h2 className="text-xl font-black text-white tracking-tight m-0 drop-shadow-xs">
            AegisPay Autonomous Defense
          </h2>
          <p className="text-xs text-blue-100 mt-1 leading-snug">
            Real-time on-device protection for UPI payments, voice calls, and QR codes under DPDP Act 2023.
          </p>
        </div>

        <div className="pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] text-blue-100 font-medium relative z-10">
          <span className="flex items-center gap-1 text-emerald-200 font-bold">
            <Lock className="w-3 h-3" />
            <span>0 Bytes Cloud Leaks</span>
          </span>
          <button
            onClick={onOpenDeck}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-[11px] transition cursor-pointer shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>10-Slide Deck</span>
          </button>
        </div>
      </div>

      {/* 2. Grid of 6 Colorful 1-Tap Action Cards */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Tap a tool to scan & detect</span>
          </span>
          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
            6 AI Tools
          </span>
        </div>

        <div className="space-y-2.5">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className={`w-full p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r ${tool.cardGradient} bg-white border ${tool.cardBorder} hover:shadow-lg transition-all duration-200 text-left cursor-pointer flex items-center justify-between gap-3 group active:scale-98`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.iconGradient} text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition shadow-md ${tool.iconShadow}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm truncate">{tool.title}</span>
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full border ${tool.badgeBg} font-mono shadow-2xs`}>
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 m-0 mt-0.5 leading-snug truncate font-medium">
                      {tool.subtitle}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/90 border border-slate-200 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white flex items-center justify-center text-slate-400 transition shrink-0 shadow-2xs">
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
