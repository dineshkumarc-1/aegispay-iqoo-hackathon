import React, { useState } from 'react';
import { 
  ShieldAlert, QrCode, Waves, MessageSquareWarning, 
  Bot, Receipt, ShieldCheck, Activity, ChevronLeft
} from 'lucide-react';
import QRScannerView from './QRScannerView';
import DeepfakeVoiceDetector from './DeepfakeVoiceDetector';
import SocialEngineeringInterceptor from './SocialEngineeringInterceptor';
import ScamBaitHoneypot from './ScamBaitHoneypot';
import ReceiptVerifier from './ReceiptVerifier';

export default function RiskSecurityView({ activeEngine = 'qr-shield', onSelectEngine }) {
  const [currentEngine, setCurrentEngine] = useState(activeEngine);

  const engines = [
    { id: 'qr-shield', label: '1. QR Quishing', icon: QrCode },
    { id: 'deepfake-voice', label: '2. Voice Clone', icon: Waves },
    { id: 'social-eng', label: '3. SMS Threat', icon: MessageSquareWarning },
    { id: 'scambait', label: '4. ScamBait AI', icon: Bot },
    { id: 'receipt-guard', label: '5. Kirana Receipt', icon: Receipt }
  ];

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-6">
      
      {/* Top Mobile Pill Switcher */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
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
                className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{eng.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Mobile Engine */}
      <div>
        {currentEngine === 'qr-shield' && <QRScannerView />}
        {currentEngine === 'deepfake-voice' && <DeepfakeVoiceDetector />}
        {currentEngine === 'social-eng' && <SocialEngineeringInterceptor />}
        {currentEngine === 'scambait' && <ScamBaitHoneypot />}
        {currentEngine === 'receipt-guard' && <ReceiptVerifier />}
      </div>

    </div>
  );
}
