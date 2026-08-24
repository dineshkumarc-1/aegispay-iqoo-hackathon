import React, { useState, useEffect, useRef } from 'react';
import { 
  Waves, ShieldAlert, ShieldCheck, Play, Square, AlertTriangle, 
  Lock, Mic, Volume2, Sparkles, RefreshCw, Smartphone, CheckCircle2, ChevronRight
} from 'lucide-react';

export default function DeepfakeVoiceDetector() {
  const [selectedAudioCase, setSelectedAudioCase] = useState('scam-accident-clone');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showScreenBarrier, setShowScreenBarrier] = useState(false);
  const [liveMetrics, setLiveMetrics] = useState({
    vocoderArtifacts: 99.1,
    phaseJitter: 96.4,
    biologicalBreathing: 1.2,
    spectralEntropy: 0.94,
    deepfakeScore: 98.4
  });

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const audioContextRef = useRef(null);

  const audioCases = [
    {
      id: 'scam-accident-clone',
      title: '🚨 AI Voice Clone: "Dad, I had a bike accident in Bengaluru, send ₹25,000 to clinic UPI!"',
      category: 'Emergency Coercion / AI Clone',
      audioText: '"Papa... I am in Victoria Hospital right now, my bike was hit. Doctor is asking ₹25,000 for emergency surgery immediately! Please send to clinic UPI right now!"',
      isDeepfake: true,
      riskScore: 98.4,
      callerId: '+91 91204 88319 (Spoofed Family Member)',
      artifactsDetected: [
        'Neural vocoder pitch glottal pulse mismatch (120Hz synthetic resonance)',
        'Absence of micro-tremors and natural respiratory pauses (0.00s breathing silence)',
        'Phase discontinuity in acoustic high-frequency harmonics (> 7.5 kHz)',
        'Emergency financial coercion trigger: Demanding urgent ₹25,000 UPI PIN transfer'
      ]
    },
    {
      id: 'scam-police-digital-arrest',
      title: '🚨 AI Voice Clone: "CBI Officer Kaushik — Your Aadhaar is linked to money laundering!"',
      category: 'Digital Arrest / Coercion',
      audioText: '"This is Inspector Kaushik from Mumbai Cyber Cell. A courier package containing 5 fake passports and narcotics was seized under your name. Stay on video call and transfer verification deposit now!"',
      isDeepfake: true,
      riskScore: 97.1,
      callerId: '+91 22 2849 0192 (Spoofed Law Enforcement)',
      artifactsDetected: [
        'Text-to-speech synthetic concatenation boundaries detected',
        'Repetitive synthetic intonation contour',
        'Psychological coercion trigger: Illegal digital arrest ultimatum'
      ]
    },
    {
      id: 'legit-family-call',
      title: '✅ Genuine Voice Call: Family Member checking in',
      category: 'Authentic Biological Speech',
      audioText: '"Hey, just calling to see if you reached home safely. Don\'t forget to pick up milk and fruits from the market on your way back."',
      isDeepfake: false,
      riskScore: 4.2,
      callerId: '+91 98450 12384 (Mom)',
      artifactsDetected: [
        'Natural biological respiration cycles (0.42s inhale detected)',
        'Realistic human vocal tract resonance & pitch variance',
        'Zero financial coercion or urgent money transfer request'
      ]
    }
  ];

  const currentCase = audioCases.find(c => c.id === selectedAudioCase) || audioCases[0];

  // Visualizer Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const barCount = 48;
      const barWidth = width / barCount;

      for (let i = 0; i < barCount; i++) {
        let barHeight;
        if (isPlaying) {
          const freq = Math.sin(angle + i * 0.3) * 0.5 + 0.5;
          barHeight = (freq * (height - 30)) + Math.random() * 20;
        } else {
          barHeight = 6;
        }

        const x = i * barWidth;
        const y = height - barHeight;

        // Clean light visualizer colors
        if (currentCase.isDeepfake && isPlaying) {
          ctx.fillStyle = i % 2 === 0 ? '#e11d48' : '#fb7185';
        } else if (!currentCase.isDeepfake && isPlaying) {
          ctx.fillStyle = i % 2 === 0 ? '#10b981' : '#34d399';
        } else {
          ctx.fillStyle = '#cbd5e1';
        }

        ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
      }

      if (isPlaying) {
        angle += 0.15;
      }
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, currentCase]);

  // Audio Playback & Analysis Simulation
  const handlePlayAudio = () => {
    if (isPlaying) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsAnalyzing(false);
      return;
    }

    setIsPlaying(true);
    setIsAnalyzing(true);

    if (currentCase.isDeepfake) {
      setTimeout(() => {
        setShowScreenBarrier(true);
      }, 2500);
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentCase.audioText);
      utterance.rate = currentCase.isDeepfake ? 1.05 : 0.95;
      utterance.pitch = currentCase.isDeepfake ? 1.2 : 1.0;
      utterance.onend = () => {
        setIsPlaying(false);
        setIsAnalyzing(false);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        setIsAnalyzing(false);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setIsPlaying(false);
        setIsAnalyzing(false);
      }, 5000);
    }
  };

  return (
    <div className="space-y-5">
      
      {/* Preset Scenarios Strip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 card-shadow space-y-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Select Audio Forensic Simulation:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {audioCases.map((ac) => (
            <button
              key={ac.id}
              onClick={() => {
                if (isPlaying && 'speechSynthesis' in window) window.speechSynthesis.cancel();
                setIsPlaying(false);
                setIsAnalyzing(false);
                setShowScreenBarrier(false);
                setSelectedAudioCase(ac.id);
              }}
              className={`p-3 rounded-xl text-xs font-medium transition text-left cursor-pointer border ${
                selectedAudioCase === ac.id
                  ? 'bg-blue-50/80 border-blue-500 text-blue-900 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="font-bold text-slate-900 truncate">{ac.title}</div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">{ac.callerId}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Spectral Visualizer + Forensic Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Spectrogram & Audio Player (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 card-shadow space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Waves className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 m-0">Acoustic Mel-Spectrogram</h3>
                  <p className="text-[11px] text-slate-500 m-0">Real-time frequency phase jitter & vocoder inspection</p>
                </div>
              </div>

              <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                currentCase.isDeepfake ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {currentCase.isDeepfake ? 'AI CLONE' : 'BIOLOGICAL HUMAN'}
              </span>
            </div>

            {/* Spectrogram Canvas */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 relative overflow-hidden">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-2">
                <span>0 Hz</span>
                <span>4,000 Hz</span>
                <span>8,000 Hz (NPU Phase Cutoff)</span>
              </div>
              <canvas
                ref={canvasRef}
                width={500}
                height={120}
                className="w-full h-28 rounded-lg"
              />
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-2">
                <span>Sample Rate: 48.0 kHz</span>
                <span>Latency: 11.4ms (Mobile NPU)</span>
              </div>
            </div>

            {/* Transcript Card */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Inbound Audio Stream:
                </span>
                <span className="text-[10px] font-mono text-slate-500">{currentCase.callerId}</span>
              </div>
              <p className="text-xs text-slate-800 font-medium italic m-0 leading-relaxed">
                {currentCase.audioText}
              </p>
            </div>

            {/* Audio Controls Button */}
            <button
              onClick={handlePlayAudio}
              className={`w-full py-3 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                isPlaying 
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isPlaying ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlaying ? 'Stop Audio Analysis' : 'Play & Run Deepfake Spectral Analysis'}</span>
            </button>

          </div>
        </div>

        {/* Right: Forensic Indicators & Screen Barrier (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 card-shadow space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  NPU Forensic Telemetry
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Spectral Anomaly Signatures
                </h3>
              </div>
              <div className="text-right">
                <div className={`text-xl font-bold font-mono ${
                  currentCase.riskScore > 75 ? 'text-rose-600' : 'text-emerald-600'
                }`}>
                  {currentCase.riskScore}%
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Deepfake Probability</div>
              </div>
            </div>

            {/* 4 Diagnostic Gauges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">Vocoder Glottal Distortion</div>
                <div className="text-lg font-bold font-mono text-rose-600 mt-0.5">
                  {currentCase.isDeepfake ? '99.1%' : '1.8%'}
                </div>
                <div className="text-[10px] text-slate-400">Synthesized wave residue</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">Phase Jitter Variance</div>
                <div className="text-lg font-bold font-mono text-rose-600 mt-0.5">
                  {currentCase.isDeepfake ? '96.4%' : '2.1%'}
                </div>
                <div className="text-[10px] text-slate-400">Discontinuous harmonics</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">Biological Respiration</div>
                <div className={`text-lg font-bold font-mono mt-0.5 ${
                  currentCase.isDeepfake ? 'text-rose-600' : 'text-emerald-600'
                }`}>
                  {currentCase.isDeepfake ? 'ABSENT (0.0s)' : 'DETECTED (0.42s)'}
                </div>
                <div className="text-[10px] text-slate-400">Natural human lung intake</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">Coercion Intent Score</div>
                <div className="text-lg font-bold font-mono text-amber-600 mt-0.5">
                  {currentCase.isDeepfake ? 'HIGH (₹25k PIN)' : 'NONE (0)'}
                </div>
                <div className="text-[10px] text-slate-400">Psychological pressure</div>
              </div>
            </div>

            {/* List of Detected Anomalies */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 block">
                Evidence Diagnostics:
              </span>
              {currentCase.artifactsDetected.map((item, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Android Screen Barrier Simulation Card */}
            {currentCase.isDeepfake && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-rose-800">
                  <div className="flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-rose-600" />
                    <span>Android Screen Barrier Active</span>
                  </div>
                  <span className="text-[10px] font-mono bg-rose-200/80 px-2 py-0.5 rounded text-rose-900">SYSTEM OVERLAY</span>
                </div>
                <p className="text-[11px] text-rose-700 m-0 leading-relaxed">
                  AegisPay draws an emergency physical touch barrier over PhonePe/GPay to prevent victims from impulsively entering their 6-digit PIN during panic calls.
                </p>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
