import React, { useState } from 'react';
import { 
  ShieldAlert, QrCode, Waves, MessageSquareWarning, 
  Bot, Receipt, ShieldCheck, Zap
} from 'lucide-react';
import QRScannerView from './QRScannerView';
import DeepfakeVoiceDetector from './DeepfakeVoiceDetector';
import SocialEngineeringInterceptor from './SocialEngineeringInterceptor';
import ScamBaitHoneypot from './ScamBaitHoneypot';
import ReceiptVerifier from './ReceiptVerifier';

export default function RiskSecurityView({ activeEngine = 'qr-shield', onSelectEngine }) {
  const [currentEngine, setCurrentEngine] = useState(activeEngine);

  const engines = [
    { 
      id: 'qr-shield', 
      label: '3D QR Shield', 
      shortLabel: '3D QR',
      icon: QrCode, 
      activeClass: 'bg-cyan-500 text-white shadow-cyan-500/30 shadow-md',
      tagColor: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    },
    { 
      id: 'deepfake-voice', 
      label: 'Voice Clone', 
      shortLabel: 'Voice AI',
      icon: Waves, 
      activeClass: 'bg-purple-600 text-white shadow-purple-600/30 shadow-md',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    { 
      id: 'social-eng', 
      label: 'SMS Threat', 
      shortLabel: 'SMS Trap',
      icon: MessageSquareWarning, 
      activeClass: 'bg-amber-500 text-white shadow-amber-500/30 shadow-md',
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    { 
      id: 'scambait', 
      label: 'ScamBait AI', 
      shortLabel: 'ScamBait',
      icon: Bot, 
      activeClass: 'bg-pink-600 text-white shadow-pink-600/30 shadow-md',
      tagColor: 'bg-pink-50 text-pink-700 border-pink-200'
    },
    { 
      id: 'receipt-guard', 
      label: 'Kirana Receipt', 
      shortLabel: 'Receipt',
      icon: Receipt, 
      activeClass: 'bg-emerald-600 text-white shadow-emerald-600/30 shadow-md',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  ];

  return (
    <div className="space-y-3 pb-4">
      
      {/* Vibrant 5-Engine Color Pill Switcher */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-1.5 shadow-xs sticky top-0 z-20">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5">
          {engines.map((eng) => {
            const Icon = eng.icon;
            const isSelected = currentEngine === eng.id;
            return (
              <button
                key={eng.id}
                onClick={() => {
                  setCurrentEngine(eng.id);
                  if (onSelectEngine) onSelectEngine(eng.id);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isSelected
                    ? eng.activeClass
                    : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{eng.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Mobile Engine View */}
      <div className="animate-in fade-in-50 duration-150">
        {currentEngine === 'qr-shield' && <QRScannerView />}
        {currentEngine === 'deepfake-voice' && <DeepfakeVoiceDetector />}
        {currentEngine === 'social-eng' && <SocialEngineeringInterceptor />}
        {currentEngine === 'scambait' && <ScamBaitHoneypot />}
        {currentEngine === 'receipt-guard' && <ReceiptVerifier />}
      </div>

    </div>
  );
}
