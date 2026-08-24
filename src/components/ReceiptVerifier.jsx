import React, { useState } from 'react';
import { RECEIPT_TEST_CASES } from '../data/mockScenarios';
import { 
  Receipt, ShieldCheck, ShieldAlert, CheckCircle2, 
  XCircle, AlertTriangle, Sparkles, Volume2, ArrowRight
} from 'lucide-react';

export default function ReceiptVerifier() {
  const [selectedReceiptId, setSelectedReceiptId] = useState(RECEIPT_TEST_CASES[0].id);
  const [soundboxChimePlaying, setSoundboxChimePlaying] = useState(false);

  const currentReceipt = RECEIPT_TEST_CASES.find(r => r.id === selectedReceiptId) || RECEIPT_TEST_CASES[0];

  const playSoundboxChime = () => {
    setSoundboxChimePlaying(true);
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      console.log('AudioContext error:', e);
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Paytm par Teen Sau Bees Rupaye Prapt Hue!");
      utterance.lang = 'hi-IN';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => setSoundboxChimePlaying(false), 2500);
  };

  return (
    <div className="space-y-5">
      
      {/* Preset Scenarios Strip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 card-shadow space-y-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Select Kirana Settlement Verification Case:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {RECEIPT_TEST_CASES.map((rc) => (
            <button
              key={rc.id}
              onClick={() => setSelectedReceiptId(rc.id)}
              className={`p-3 rounded-xl text-xs font-medium transition text-left cursor-pointer border ${
                selectedReceiptId === rc.id
                  ? 'bg-blue-50/80 border-blue-500 text-blue-900 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="font-bold text-slate-900 truncate">{rc.title}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Amount Claimed: {rc.amount}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual Grid: Simulated Screenshot + CV Font & Luhn Forensics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Receipt Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 card-shadow space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-900">Counter Payment Screen</span>
              <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                currentReceipt.status === 'AUTHENTIC' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {currentReceipt.status === 'AUTHENTIC' ? 'GENUINE PAYMENT' : 'SPOOF APP SCREENSHOT'}
              </span>
            </div>

            {/* Receipt Card Mockup */}
            <div className={`p-6 rounded-2xl border text-center space-y-3 shadow-xs ${
              currentReceipt.status === 'AUTHENTIC'
                ? 'bg-emerald-50/40 border-emerald-200'
                : 'bg-rose-50/40 border-rose-200'
            }`}>
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                currentReceipt.status === 'AUTHENTIC'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-600 text-white'
              }`}>
                {currentReceipt.status === 'AUTHENTIC' ? (
                  <CheckCircle2 className="w-7 h-7" />
                ) : (
                  <XCircle className="w-7 h-7" />
                )}
              </div>

              <div>
                <div className="text-2xl font-bold font-mono text-slate-900">{currentReceipt.amount}</div>
                <div className="text-xs text-slate-500 mt-0.5">Paid to Sharma Kirana Store</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-left font-mono text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">Claimed Time:</span>
                  <span className="text-slate-900">{currentReceipt.claimedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">UPI Ref / UTR:</span>
                  <span className="text-slate-900 font-bold">{currentReceipt.utrNumber}</span>
                </div>
              </div>
            </div>

            {/* Acoustic Soundbox Chime Trigger */}
            <button
              onClick={playSoundboxChime}
              className="w-full py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>{soundboxChimePlaying ? 'Chiming...' : 'Simulate Soundbox Audio Confirmation'}</span>
            </button>

          </div>
        </div>

        {/* Right: CV Font & Luhn Checksum Forensics (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 card-shadow space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Receipt Authenticity Engine
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Computer Vision & Cryptographic Validation
                </h3>
              </div>
              <div className="text-right">
                <div className={`text-xl font-bold font-mono ${
                  currentReceipt.status === 'AUTHENTIC' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {currentReceipt.confidence}%
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Confidence Score</div>
              </div>
            </div>

            {/* Anomaly Inspection List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                Detected Forensic Artifacts:
              </span>
              {currentReceipt.detectedAnomalies.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                    currentReceipt.status === 'AUTHENTIC'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}
                >
                  {currentReceipt.status === 'AUTHENTIC' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Technical Diagnostics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">Luhn Mod-10 UTR Validation</div>
                <div className={`text-sm font-bold font-mono mt-0.5 ${
                  currentReceipt.status === 'AUTHENTIC' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {currentReceipt.status === 'AUTHENTIC' ? 'VALID CHECKSUM' : 'CHECKSUM MISMATCH'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">Vector Font Kerning</div>
                <div className={`text-sm font-bold font-mono mt-0.5 ${
                  currentReceipt.status === 'AUTHENTIC' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {currentReceipt.status === 'AUTHENTIC' ? 'OFFICIAL GOOGLE FONT' : 'SPOOF OVERLAY TEXT'}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
