import React, { useState } from 'react';
import { 
  ShieldAlert, QrCode, Waves, MessageSquareWarning, 
  Bot, Receipt, ShieldCheck, Activity, AlertTriangle, 
  CheckCircle2, Cpu, ArrowRight
} from 'lucide-react';
import QRScannerView from './QRScannerView';
import DeepfakeVoiceDetector from './DeepfakeVoiceDetector';
import SocialEngineeringInterceptor from './SocialEngineeringInterceptor';
import ScamBaitHoneypot from './ScamBaitHoneypot';
import ReceiptVerifier from './ReceiptVerifier';

export default function RiskSecurityView({ activeEngine = 'qr-shield', onSelectEngine }) {
  const [currentEngine, setCurrentEngine] = useState(activeEngine);

  const engines = [
    { id: 'qr-shield', label: '1. QR & Ingress Shield', icon: QrCode, desc: '3D optical parallax & NPCI parser', badge: 'Active' },
    { id: 'deepfake-voice', label: '2. Voice & Call Risk', icon: Waves, desc: 'Mel-spectrogram deepfake AI', badge: 'Active' },
    { id: 'social-eng', label: '3. Intent Interceptor', icon: MessageSquareWarning, desc: 'MobileBERT scam NLP model', badge: 'Active' },
    { id: 'scambait', label: '4. ScamBait Forensics', icon: Bot, desc: 'Autonomous AI honeypot trap', badge: '1930 Ready' },
    { id: 'receipt-guard', label: '5. Kirana Settlement', icon: Receipt, desc: 'CV font & Luhn UTR check', badge: 'POS Ready' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Level Risk Health Summary Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 card-shadow space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900 m-0">
                Enterprise Risk & Threat Intelligence Center
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Unified on-device threat terminal protecting the entire UPI transaction lifecycle against optical sticker quishing, AI voice clones, and social engineering coercion.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Risk Index</span>
              <span className="text-xl font-bold font-mono text-emerald-600">18 / 100</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Edge NPU Latency</span>
              <span className="text-xl font-bold font-mono text-blue-600">11.4 ms</span>
            </div>
          </div>
        </div>

        {/* Engine Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
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
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-500 text-blue-900 shadow-xs'
                    : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {eng.badge}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-900 truncate">{eng.label}</div>
                  <div className="text-[10px] text-slate-500 truncate">{eng.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Selected Engine Component */}
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
