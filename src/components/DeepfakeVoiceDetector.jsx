import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, ShieldAlert, Mic, MicOff, Volume2, Sparkles, 
  AlertTriangle, CheckCircle2, Lock, Radio, Cpu, RefreshCw, 
  Layers, ChevronRight, Waves
} from 'lucide-react';

export default function DeepfakeVoiceDetector() {
  const [selectedCase, setSelectedCase] = useState('son_accident');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [showScreenLock, setShowScreenLock] = useState(false);
  const [spectrogramData, setSpectrogramData] = useState([]);
  const canvasRef = useRef(null);

  const testCases = {
    son_accident: {
      id: 'son_accident',
      name: "🚨 AI-Cloned Family Voice (Emergency Hospital Scam)",
      caller: "+91 94821 00291 (Spoofed Family Number)",
      claim: "Accident Emergency in Bengaluru",
      audioTranscript: "Dad! Please don't panic... I had a serious bike accident near Koramangala. The doctor is asking for ₹25,000 immediately before taking me into surgery. Send to hospital UPI right now!",
      isDeepfake: true,
      probability: 98.4,
      vocoderAnomaly: "99.1% (ElevenLabs Neural Vocoder Artifacts)",
      phaseJitter: "96.4% (Inconsistent Glottal Waveform)",
      breathAcoustics: "1.2% (Absence of biological lung inhalation)",
      verdict: "CRITICAL: Generative AI Voice Clone Impersonation"
    },
    cbi_officer: {
      id: 'cbi_officer',
      name: "🚨 AI-Cloned Police / Cyber Officer (Digital Arrest Scam)",
      caller: "+91 80234 11099 (Spoofed CBI Cyber Cell)",
      claim: "Digital Arrest Warrant & Money Laundering",
      audioTranscript: "This is Special Officer Verma from National Crime Branch. A narcotics parcel was registered under your Aadhaar. You are under live digital arrest. Transfer verification funds to security escrow now!",
      isDeepfake: true,
      probability: 96.8,
      vocoderAnomaly: "97.5% (VALL-E Synthetic Prosody)",
      phaseJitter: "94.8% (Frequency Phase Clipping)",
      breathAcoustics: "2.4% (Flat breathing baseline)",
      verdict: "CRITICAL: Synthesized Law Enforcement Voice"
    },
    real_friend: {
      id: 'real_friend',
      name: "✅ Authentic Natural Human Voice (Genuine Call)",
      caller: "+91 98840 55123 (Verified Contact)",
      claim: "Dinner Plans & Weekend Trip",
      audioTranscript: "Hey bro! Are we still meeting for dinner tonight at Indiranagar? Let me know if you want me to pick you up on the way.",
      isDeepfake: false,
      probability: 2.1,
      vocoderAnomaly: "0.4% (Clean Natural Harmonics)",
      phaseJitter: "1.8% (Organic Glottal Pulse Dynamic)",
      breathAcoustics: "97.6% (Natural Inhalation & Micro-Pauses)",
      verdict: "SAFE: Verified Biological Human Acoustics"
    }
  };

  const activeData = testCases[selectedCase];

  // Draw animated spectrogram on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const numBars = 48;
      const barWidth = canvas.width / numBars;

      for (let i = 0; i < numBars; i++) {
        let height = 0;
        if (isAnalyzing) {
          if (activeData.isDeepfake) {
            // Unnatural rigid spikes typical of vocoder artifact
            height = Math.sin(Date.now() * 0.015 + i * 0.4) * 35 + (i % 2 === 0 ? 55 : 20) + Math.random() * 20;
          } else {
            // Smooth organic acoustic curves
            height = Math.sin(Date.now() * 0.008 + i * 0.2) * 45 + 35 + Math.random() * 10;
          }
        } else {
          height = 10 + Math.sin(i * 0.3) * 6;
        }

        const x = i * barWidth;
        const y = canvas.height - height;

        // Gradient coloring
        const grad = ctx.createLinearGradient(0, y, 0, canvas.height);
        if (isAnalyzing && activeData.isDeepfake) {
          grad.addColorStop(0, '#f43f5e'); // Rose
          grad.addColorStop(1, '#881337');
        } else if (isAnalyzing && !activeData.isDeepfake) {
          grad.addColorStop(0, '#10b981'); // Emerald
          grad.addColorStop(1, '#064e3b');
        } else {
          grad.addColorStop(0, '#06b6d4'); // Cyan
          grad.addColorStop(1, '#083344');
        }

        ctx.fillStyle = grad;
        ctx.fillRect(x + 1, y, barWidth - 2, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAnalyzing, activeData]);

  const runDeepfakeAnalysis = () => {
    setIsAnalyzing(true);
    setShowScreenLock(false);

    // Speak audio transcript using speech synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
      const utterance = new SpeechSynthesisUtterance(activeData.audioTranscript);
      utterance.rate = activeData.isDeepfake ? 1.05 : 0.95;
      utterance.pitch = activeData.isDeepfake ? 1.15 : 1.0;
      utterance.onend = () => {
        setIsAnalyzing(false);
        if (activeData.isDeepfake) {
          setShowScreenLock(true);
        }
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setIsAnalyzing(false);
        if (activeData.isDeepfake) {
          setShowScreenLock(true);
        }
      }, 4000);
    }
  };

  const stopAnalysis = () => {
    setIsAnalyzing(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6 backdrop-blur flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-rose-400" />
            <h2 className="text-lg font-bold text-white m-0">
              Edge AI Deepfake Voice Clone & Acoustic Spectrogram Analyzer
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            In 2026, fraudsters use 3-second audio clips to clone children's voices for emergency hospital/accident scams. AegisPay runs an on-device <strong>Mel-Spectrogram Transformer (LiteRT INT8)</strong> on the NPU to detect vocoder phase discontinuities in &lt;15ms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>NPU Audio Transformer (18MB)</span>
          </span>
        </div>
      </div>

      {/* Main Dual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Test Case Selection & Live Audio Simulator (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
            
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Select Incoming Call Audio Scenario:
            </label>

            <div className="space-y-2">
              {Object.values(testCases).map((tc) => (
                <button
                  key={tc.id}
                  onClick={() => {
                    setSelectedCase(tc.id);
                    stopAnalysis();
                    setShowScreenLock(false);
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between gap-3 ${
                    selectedCase === tc.id
                      ? tc.isDeepfake
                        ? 'bg-rose-950/40 border-rose-500/60 shadow-lg shadow-rose-950/20'
                        : 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/20'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-slate-200">{tc.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{tc.caller} • {tc.claim}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                    tc.isDeepfake ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {tc.isDeepfake ? 'CLONE THREAT' : 'NATURAL'}
                  </span>
                </button>
              ))}
            </div>

            {/* Audio Playback & Live Spectrogram Canvas */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Waves className="w-4 h-4 text-cyan-400" />
                  <span>Real-Time Mel-Spectrogram Waveform</span>
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                  {isAnalyzing ? '🔴 LISTENING & CLASSIFYING...' : 'IDLE (TAP TEST)'}
                </span>
              </div>

              {/* Canvas Waveform */}
              <canvas
                ref={canvasRef}
                width={480}
                height={120}
                className="w-full h-28 rounded-xl bg-slate-950 border border-slate-800/80"
              />

              {/* Transcript Box */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                <div className="text-[10px] font-mono font-bold text-slate-400">Incoming Audio Stream:</div>
                <p className="text-slate-200 m-0 italic text-xs leading-relaxed">
                  "{activeData.audioTranscript}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                {!isAnalyzing ? (
                  <button
                    onClick={runDeepfakeAnalysis}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-500/20"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Play & Run Deepfake Spectral Analysis</span>
                  </button>
                ) : (
                  <button
                    onClick={stopAnalysis}
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MicOff className="w-4 h-4 text-rose-400" />
                    <span>Stop Audio Analysis</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Right Column: AI Spectral Analysis Breakdown & Emergency Lockdown (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  NPU Acoustic AI Forensics
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  Deepfake Probability Score
                </h3>
              </div>

              <div className={`text-2xl font-black font-mono px-3 py-1 rounded-xl border ${
                activeData.isDeepfake
                  ? 'bg-rose-950/60 border-rose-500 text-rose-400 shadow-md shadow-rose-500/20'
                  : 'bg-emerald-950/60 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/20'
              }`}>
                {activeData.probability}%
              </div>
            </div>

            {/* Metric Gauges */}
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-300 font-sans font-bold">
                  <span>1. Neural Vocoder Artifact Discontinuity:</span>
                  <span className={activeData.isDeepfake ? 'text-rose-400' : 'text-emerald-400'}>{activeData.vocoderAnomaly}</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full ${activeData.isDeepfake ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    style={{ width: activeData.vocoderAnomaly.split('%')[0] + '%' }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-300 font-sans font-bold">
                  <span>2. Frequency Phase Jitter (Glottal Wave):</span>
                  <span className={activeData.isDeepfake ? 'text-rose-400' : 'text-emerald-400'}>{activeData.phaseJitter}</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full ${activeData.isDeepfake ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    style={{ width: activeData.phaseJitter.split('%')[0] + '%' }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-300 font-sans font-bold">
                  <span>3. Biological Breath & Room Acoustics:</span>
                  <span className={activeData.isDeepfake ? 'text-rose-400' : 'text-emerald-400'}>{activeData.breathAcoustics}</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full ${activeData.isDeepfake ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    style={{ width: activeData.breathAcoustics.split('%')[0] + '%' }}
                  />
                </div>
              </div>
            </div>

            {/* Final Verdict Banner */}
            <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
              activeData.isDeepfake 
                ? 'bg-rose-950/30 border-rose-500/50 text-rose-200' 
                : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
            }`}>
              {activeData.isDeepfake ? <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" /> : <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />}
              <div className="text-xs">
                <div className="font-bold">{activeData.verdict}</div>
                <p className="m-0 text-[11px] opacity-80 mt-0.5">
                  {activeData.isDeepfake 
                    ? "Emergency Android screen barrier drawn over PhonePe/GPay to prevent panic money transfers." 
                    : "Audio waveform exhibits natural human biological glottal dynamics."}
                </p>
              </div>
            </div>

            {/* Emergency Screen Barrier Modal Simulator */}
            {showScreenLock && (
              <div className="p-4 rounded-2xl bg-red-950/80 border-2 border-red-500 text-center space-y-2 animate-bounce">
                <div className="flex items-center justify-center gap-2 text-white font-black text-sm uppercase">
                  <Lock className="w-4 h-4 text-white" />
                  <span>Android Screen Barrier Overlay Activated!</span>
                </div>
                <p className="text-[11px] text-red-200 m-0">
                  Touch input frozen over all UPI apps. 500Hz Gyroscope panic tremor lock active for 15 seconds.
                </p>
                <button
                  onClick={() => setShowScreenLock(false)}
                  className="px-3 py-1 bg-white text-red-950 font-bold text-xs rounded-lg cursor-pointer hover:bg-slate-200 transition"
                >
                  Dismiss Overlay Barrier (Biometric Override)
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
