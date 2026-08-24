import React, { useState } from 'react';
import { RECEIPT_TEST_CASES } from '../data/mockScenarios';
import { 
  FileCheck, ShieldAlert, CheckCircle2, AlertTriangle, 
  Camera, Volume2, Search, Sliders, Check, X
} from 'lucide-react';

export default function ReceiptVerifier() {
  const [selectedCaseId, setSelectedCaseId] = useState(RECEIPT_TEST_CASES[0].id);
  const [soundboxPlaying, setSoundboxPlaying] = useState(false);

  const currentCase = RECEIPT_TEST_CASES.find(c => c.id === selectedCaseId) || RECEIPT_TEST_CASES[0];

  const playSimulatedSoundbox = (isLegit) => {
    setSoundboxPlaying(true);
    // Web Audio synthesizer tone simulation
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (isLegit) {
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime); // A3 low alert
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      }
    } catch (e) {
      console.log('AudioContext not supported');
    }
    setTimeout(() => setSoundboxPlaying(false), 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6 backdrop-blur flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white m-0">
              Merchant Receipt & Soundbox Forgery Verifier
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Computer-vision screen authentication engine tailored for merchants to instantly verify customer payment screens, detecting counterfeit Paytm/PhonePe spoofing apps without requiring internet.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="w-full md:w-auto">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Test Case:
          </label>
          <div className="flex gap-2">
            {RECEIPT_TEST_CASES.map((rc) => (
              <button
                key={rc.id}
                onClick={() => setSelectedCaseId(rc.id)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer border ${
                  selectedCaseId === rc.id
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-slate-200">{rc.title.split(' ')[0]} {rc.title.split(' ')[1]}</div>
                <div className="text-[10px] text-slate-400">{rc.amount}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Screen Mockup + CV Vision Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Simulated Customer Phone Screen (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>Camera Pointing at Customer Screen</span>
              </span>
              <span className="font-mono text-[10px] text-cyan-400">CV Vision Engine</span>
            </div>

            {/* Mockup Payment Receipt Card */}
            <div className={`p-6 rounded-2xl border relative overflow-hidden text-center transition ${
              currentCase.status === 'SPOOFED_FAKE'
                ? 'bg-gradient-to-b from-slate-950 to-rose-950/40 border-rose-500/40'
                : 'bg-gradient-to-b from-slate-950 to-emerald-950/40 border-emerald-500/40'
            }`}>
              
              {/* Fake overlay stamp */}
              {currentCase.status === 'SPOOFED_FAKE' && (
                <div className="absolute top-3 right-3 rotate-12 bg-rose-600/90 text-white text-[10px] font-black uppercase px-2 py-1 rounded shadow-lg border border-rose-400">
                  ⚠️ COUNTERFEIT UI
                </div>
              )}

              <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-3">
                {currentCase.status === 'AUTHENTIC' ? (
                  <Check className="w-6 h-6 text-emerald-400" />
                ) : (
                  <X className="w-6 h-6 text-rose-400" />
                )}
              </div>

              <div className="text-2xl font-black font-mono text-white mb-1">
                {currentCase.amount}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Paid to Sharma Kirana & General Store
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-left text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block font-sans">Timestamp</span>
                  <span className="text-slate-300">{currentCase.claimedTime}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-sans">UPI Ref / UTR</span>
                  <span className="text-slate-300">{currentCase.utrNumber}</span>
                </div>
              </div>

              {/* Soundbox Test Trigger */}
              <button
                onClick={() => playSimulatedSoundbox(currentCase.status === 'AUTHENTIC')}
                className="mt-5 w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <Volume2 className="w-4 h-4" />
                <span>{soundboxPlaying ? 'Verifying Audio...' : 'Test Soundbox Voice Tone'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: CV Analysis & Anomaly Diagnostics (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Computer Vision Diagnostics
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  {currentCase.title}
                </h3>
              </div>

              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                currentCase.status === 'SPOOFED_FAKE'
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              }`}>
                {currentCase.status === 'SPOOFED_FAKE' ? '❌ Forgery Detected' : '✅ Verified Authentic'}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className={`text-3xl font-black font-mono ${
                  currentCase.status === 'SPOOFED_FAKE' ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {currentCase.confidence}%
                </div>
                <div className="text-[11px] font-bold text-slate-400 uppercase mt-1">
                  Model Confidence
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-2xl font-black font-mono text-cyan-400">
                  14.8 ms
                </div>
                <div className="text-[11px] font-bold text-slate-400 uppercase mt-1">
                  On-Device Frame Processing
                </div>
              </div>
            </div>

            {/* Anomaly Inspection List */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-300 block">
                Visual Artifacts & Cryptographic Checks:
              </span>
              {currentCase.detectedAnomalies.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                    currentCase.status === 'SPOOFED_FAKE'
                      ? 'bg-rose-950/30 border-rose-800/40 text-rose-200'
                      : 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200'
                  }`}
                >
                  {currentCase.status === 'SPOOFED_FAKE' ? (
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Retailer Guidance */}
            <div className="mt-5 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-slate-100 block mb-1">Kirana Merchant Advisory:</span>
              Never accept payments solely based on a customer showing a static screenshot. AegisPay validates dynamic animation vectors and performs a zero-roundtrip UTR checksum check locally to eliminate fake spoofing apps entirely.
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
