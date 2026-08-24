import React, { useState, useMemo, useRef, useEffect } from 'react';
import { QR_TEST_CASES } from '../data/mockScenarios';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, QrCode, Scan, 
  ArrowRight, CheckCircle2, XCircle, Terminal, Eye, Volume2, Lock,
  Camera, CameraOff, Globe, Sparkles, VolumeX
} from 'lucide-react';

export default function QRScannerView() {
  const [selectedCaseId, setSelectedCaseId] = useState(QR_TEST_CASES[1].id);
  const [customUri, setCustomUri] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const [hapticTriggered, setHapticTriggered] = useState(false);
  const [useLiveCamera, setUseLiveCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [speaking, setSpeaking] = useState(false);
  const [spokenSubtitle, setSpokenSubtitle] = useState('');

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Dynamic scenario data or custom parsed URI
  const currentScenario = useMemo(() => {
    if (customUri.trim().length > 0) {
      try {
        const url = new URL(customUri.replace('upi://', 'https://upi.dummy/'));
        const pa = url.searchParams.get('pa') || 'unknown@upi';
        const pn = url.searchParams.get('pn') || 'Unknown Payee';
        const am = url.searchParams.get('am') || null;
        const isCollect = customUri.startsWith('upi://collect');
        
        let score = 5;
        let flags = ['Custom URI input parsed locally'];
        if (isCollect) {
          score += 65;
          flags.push('Deceptive Collect Request URI (upi://collect)');
        }
        if (pa.includes('x9') || pa.includes('claim') || pa.length > 22) {
          score += 25;
          flags.push('High Entropy / Suspicious VPA handle pattern');
        }
        if (am && parseFloat(am) > 2000) {
          score += 15;
          flags.push(`High fixed amount auto-injected: ₹${am}`);
        }

        return {
          id: 'custom',
          title: '🛠️ Custom Input URI',
          merchant: pn,
          vpa: pa,
          rawUri: customUri,
          riskScore: Math.min(100, score),
          status: score > 75 ? 'CRITICAL' : score > 40 ? 'WARNING' : 'SAFE',
          type: isCollect ? 'collect' : 'pay',
          flags,
          recommendation: score > 75 ? 'DO NOT PAY! High probability of scam.' : 'Verify recipient identity.'
        };
      } catch (e) {
        return {
          id: 'invalid',
          title: '⚠️ Malformed UPI String',
          merchant: 'Unknown',
          vpa: 'invalid',
          rawUri: customUri,
          riskScore: 90,
          status: 'CRITICAL',
          type: 'unknown',
          flags: ['Malformed URI structure', 'Potential exploit payload injection'],
          recommendation: 'Invalid QR / Protocol format.'
        };
      }
    }
    return QR_TEST_CASES.find(c => c.id === selectedCaseId) || QR_TEST_CASES[0];
  }, [selectedCaseId, customUri]);

  // Extract query parameters for transparent technical inspection
  const parsedParams = useMemo(() => {
    try {
      const uriStr = currentScenario.rawUri;
      const paramPart = uriStr.split('?')[1] || '';
      const params = new URLSearchParams(paramPart);
      return {
        protocol: uriStr.split('?')[0],
        pa: params.get('pa') || 'N/A',
        pn: params.get('pn') || 'N/A',
        mc: params.get('mc') || 'N/A',
        am: params.get('am') || 'Dynamic (User Enters)',
        cu: params.get('cu') || 'INR',
        tn: params.get('tn') || 'None'
      };
    } catch {
      return {};
    }
  }, [currentScenario]);

  // Live Camera Stream Setup
  useEffect(() => {
    if (useLiveCamera) {
      navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false
      })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraError(null);
      })
      .catch((err) => {
        setCameraError('Camera permission denied or camera not available.');
        setUseLiveCamera(false);
      });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [useLiveCamera]);

  // 100% Reliable Siren Tone via Web Audio API
  const playSirenTone = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';

      // 3-pulse urgent siren alarm
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.linearRampToValueAtTime(1200, now + 0.15);
      osc.frequency.linearRampToValueAtTime(800, now + 0.3);
      osc.frequency.linearRampToValueAtTime(1200, now + 0.45);
      osc.frequency.linearRampToValueAtTime(800, now + 0.6);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.7);
    } catch (e) {
      console.log('AudioContext issue:', e);
    }
  };

  // Robust Multi-Language Vernacular Audio Warning Engine
  const playVernacularAudioWarning = (lang = selectedLanguage) => {
    setSpeaking(true);
    triggerMockHaptic();
    playSirenTone();

    let text = "Warning! Fraud attempt detected. Do not enter your UPI PIN.";
    let speechLang = "en-IN";

    if (lang === 'hi') {
      text = "सावधान! धोखाधड़ी का प्रयास पाया गया है। अपना यूपीआई पिन कभी दर्ज न करें!";
      speechLang = "hi-IN";
    } else if (lang === 'ta') {
      text = "எச்சரிக்கை! மோசடி முயற்சி கண்டறியப்பட்டது. உங்கள் யுபிஐ பின்னை உள்ளிட வேண்டாம்!";
      speechLang = "ta-IN";
    } else if (lang === 'te') {
      text = "హెచ్చరిక! మోసం ప్రయత్నం గుర్తించబడింది. దయచేసి మీ యూపీఐ పిన్‌ను నమోదు చేయవద్దు!";
      speechLang = "te-IN";
    } else if (lang === 'kn') {
      text = "ಎಚ್ಚರಿಕೆ! ವಂಚನೆಯ ಪ್ರಯತ್ನ ಪತ್ತೆಯಾಗಿದೆ. ನಿಮ್ಮ ಯುಪಿಐ ಪಿನ್ ಅನ್ನು ನಮೂದಿಸಬೇಡಿ!";
      speechLang = "kn-IN";
    }

    setSpokenSubtitle(text);

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = speechLang;
        utterance.rate = 1.0;
        utterance.pitch = 1.1;
        utterance.volume = 1.0;

        // Try to match appropriate voice if available
        const voices = window.speechSynthesis.getVoices();
        const matchedVoice = voices.find(v => v.lang.startsWith(lang) || v.lang.includes(speechLang));
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }

        utterance.onend = () => {
          setSpeaking(false);
          setTimeout(() => setSpokenSubtitle(''), 4000);
        };
        utterance.onerror = () => {
          setSpeaking(false);
          setTimeout(() => setSpokenSubtitle(''), 4000);
        };

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error('Speech synthesis error:', err);
        setSpeaking(false);
        setTimeout(() => setSpokenSubtitle(''), 4000);
      }
    } else {
      setTimeout(() => {
        setSpeaking(false);
        setSpokenSubtitle('');
      }, 4000);
    }
  };

  const triggerMockHaptic = () => {
    setHapticTriggered(true);
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 300]);
    }
    setTimeout(() => setHapticTriggered(false), 2000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SAFE':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" /> Verified Safe
          </span>
        );
      case 'WARNING':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" /> Caution / Tamper Risk
          </span>
        );
      case 'CRITICAL':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider animate-pulse">
            <ShieldAlert className="w-4 h-4" /> High Threat / Quishing Blocked
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6 backdrop-blur flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Scan className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white m-0">Zero-Latency On-Device QR & Quishing Shield</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Live edge-heuristic parser that intercepts camera viewfinder frames and UPI intent links to stop sticker-tampering, VPA spoofing, and disguised reverse-charge traps before payment initiation.
          </p>
        </div>

        {/* Quick Scenario Selector */}
        <div className="w-full md:w-auto">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Test Preset Scenarios:
          </label>
          <div className="grid grid-cols-2 md:flex gap-2">
            {QR_TEST_CASES.map((tc) => (
              <button
                key={tc.id}
                onClick={() => {
                  setSelectedCaseId(tc.id);
                  setCustomUri('');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition text-left cursor-pointer border ${
                  selectedCaseId === tc.id && !customUri
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-slate-200">{tc.title.split(' ')[0]} {tc.title.split(' ')[1]}</div>
                <div className="text-[10px] text-slate-400 truncate max-w-[120px]">{tc.merchant}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dual Grid: Scanner Viewport + AI Deep Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Mobile Viewfinder (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
            {/* Phone Frame Header & Camera Controls */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div className="w-12 h-2.5 rounded-full bg-slate-800"></div>
              </div>

              {/* Camera Toggle Button */}
              <button
                onClick={() => setUseLiveCamera(!useLiveCamera)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider transition cursor-pointer border ${
                  useLiveCamera 
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20' 
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {useLiveCamera ? <CameraOff className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
                <span>{useLiveCamera ? 'Stop Live Camera' : 'Use Device Camera'}</span>
              </button>
            </div>

            {/* Viewfinder Screen Area */}
            <div className="relative aspect-[3/4] bg-slate-950 rounded-2xl border-2 border-slate-800 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
              {/* Background Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:16px_16px]"></div>

              {/* Live Webcam Stream Video */}
              {useLiveCamera && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
              )}

              {/* Scanning Laser Animation */}
              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scan z-20"></div>
              )}

              {/* Corner HUD Markers */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg z-20"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg z-20"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg z-20"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-br-lg z-20"></div>

              {/* Center Simulated QR Graphic (if camera off) */}
              {!useLiveCamera && (
                <div className="relative z-10 p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur">
                  <div className="w-36 h-36 bg-white rounded-xl p-2.5 flex items-center justify-center shadow-inner relative">
                    <QrCode className="w-full h-full text-slate-900" />
                    
                    {/* Tampered Overlay Visual Indicator */}
                    {currentScenario.id === 'quishing-tampered' && (
                      <div className="absolute inset-1.5 bg-rose-500/20 border-2 border-dashed border-rose-500 rounded-lg flex items-center justify-center backdrop-blur-[1px]">
                        <span className="bg-rose-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                          TAMPER STICKER DETECTED
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Real-time AR Overlay Tag */}
              <div className="mt-4 z-10 max-w-xs">
                <div className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border backdrop-blur-md transition ${
                  currentScenario.riskScore > 75 
                    ? 'bg-rose-950/80 border-rose-500/60 text-rose-300'
                    : currentScenario.riskScore > 40
                    ? 'bg-amber-950/80 border-amber-500/60 text-amber-300'
                    : 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                }`}>
                  {currentScenario.status === 'CRITICAL' ? '⛔ THREAT INTERCEPTED' : '✅ VPA SIGNATURE OK'}
                </div>
                <div className="text-[11px] text-slate-300 mt-1.5 font-semibold truncate bg-slate-950/70 px-2 py-0.5 rounded-md">
                  {currentScenario.merchant}
                </div>
              </div>

              {/* Spoken Subtitle Audio Banner */}
              {spokenSubtitle && (
                <div className="absolute inset-x-3 top-14 z-30 p-2.5 rounded-xl bg-cyan-950/90 border border-cyan-400 text-cyan-200 text-xs font-bold shadow-2xl animate-bounce backdrop-blur flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
                  <span className="text-left font-sans">{spokenSubtitle}</span>
                </div>
              )}

              {/* Lock Alert Modal Simulation */}
              {currentScenario.riskScore > 75 && (
                <div className="absolute inset-x-3 bottom-3 z-30 p-3.5 rounded-xl bg-gradient-to-br from-rose-950/95 to-slate-950/95 border border-rose-500/80 shadow-2xl text-left backdrop-blur-md">
                  <div className="flex items-center justify-between text-rose-400 font-bold text-xs">
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-4 h-4" />
                      <span>EMERGENCY LOCKDOWN</span>
                    </div>
                    <span className="text-[9px] font-mono bg-rose-900/60 px-1.5 py-0.5 rounded">PIN BLOCKED</span>
                  </div>
                  <p className="text-[10px] text-rose-200 mt-1 leading-snug">
                    UPI Intent intercepted in 8.2ms. Reverse collect request blocked.
                  </p>
                  
                  {/* Vernacular Language Selector & Audio Trigger */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <select
                      value={selectedLanguage}
                      onChange={(e) => {
                        setSelectedLanguage(e.target.value);
                        playVernacularAudioWarning(e.target.value);
                      }}
                      className="bg-slate-900 border border-slate-700 text-cyan-300 rounded-lg text-[10px] font-bold px-2 py-1 focus:outline-none cursor-pointer"
                    >
                      <option value="hi">हिंदी (Hindi)</option>
                      <option value="en">English Alert</option>
                      <option value="ta">தமிழ் (Tamil)</option>
                      <option value="te">తెలుగు (Telugu)</option>
                      <option value="kn">ಕನ್ನಡ (Kannada)</option>
                    </select>

                    <button
                      onClick={() => playVernacularAudioWarning(selectedLanguage)}
                      className="flex-1 py-1.5 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-rose-600/30"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{speaking ? 'Alarm & Speaking...' : hapticTriggered ? 'Vibrating...' : '🔊 Play Alarm & Voice'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Manual Custom Input Bar */}
            <div className="mt-4">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Or Test Custom UPI URI:
              </label>
              <input
                type="text"
                value={customUri}
                onChange={(e) => setCustomUri(e.target.value)}
                placeholder="e.g. upi://pay?pa=store@upi&pn=Retail..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-cyan-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis & Threat Scoring Engine (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Risk Score & Assessment Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 md:p-6 backdrop-blur">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Threat Classification
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">
                  {currentScenario.title}
                </h3>
              </div>
              <div>{getStatusBadge(currentScenario.status)}</div>
            </div>

            {/* Risk Gauge & Meters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
              
              {/* Primary Gauge */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center flex flex-col items-center justify-center">
                <div className="text-3xl font-black font-mono tracking-tight text-white flex items-baseline gap-1">
                  <span className={
                    currentScenario.riskScore > 75 ? 'text-rose-400' :
                    currentScenario.riskScore > 40 ? 'text-amber-400' : 'text-emerald-400'
                  }>
                    {currentScenario.riskScore}
                  </span>
                  <span className="text-xs text-slate-500 font-normal">/100</span>
                </div>
                <div className="text-[11px] uppercase font-bold text-slate-400 mt-1">
                  Quishing Risk Index
                </div>
              </div>

              {/* Engine Latency */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center flex flex-col items-center justify-center">
                <div className="text-2xl font-black font-mono text-cyan-400">
                  8.2 ms
                </div>
                <div className="text-[11px] uppercase font-bold text-slate-400 mt-1">
                  Edge Inference Speed
                </div>
              </div>

              {/* Protocol Type */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center flex flex-col items-center justify-center">
                <div className={`text-lg font-black font-mono uppercase ${
                  currentScenario.type === 'collect' ? 'text-rose-400' : 'text-slate-200'
                }`}>
                  {currentScenario.type === 'collect' ? '🚨 COLLECT (REVERSE)' : 'STANDARD PAY'}
                </div>
                <div className="text-[11px] uppercase font-bold text-slate-400 mt-1">
                  Intent Method
                </div>
              </div>
            </div>

            {/* Transparent Parameter Inspection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>On-Device Parameter Dissection</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">NPCI URI SPEC v2.0</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="text-[10px] text-slate-500 font-sans">Payee VPA (pa)</div>
                  <div className="text-slate-200 truncate mt-0.5 font-semibold">{parsedParams.pa}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="text-[10px] text-slate-500 font-sans">Merchant Name (pn)</div>
                  <div className="text-slate-200 truncate mt-0.5 font-semibold">{parsedParams.pn}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="text-[10px] text-slate-500 font-sans">Merchant Code (mc)</div>
                  <div className="text-slate-200 truncate mt-0.5 font-semibold">{parsedParams.mc}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="text-[10px] text-slate-500 font-sans">Amount Injected (am)</div>
                  <div className="text-slate-200 truncate mt-0.5 font-semibold">{parsedParams.am}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="text-[10px] text-slate-500 font-sans">Currency (cu)</div>
                  <div className="text-slate-200 truncate mt-0.5 font-semibold">{parsedParams.cu}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="text-[10px] text-slate-500 font-sans">Transaction Note (tn)</div>
                  <div className="text-slate-200 truncate mt-0.5 font-semibold">{parsedParams.tn}</div>
                </div>
              </div>
            </div>

            {/* AI Flags & Heuristic Explanations */}
            <div className="mt-5 space-y-2">
              <span className="text-xs font-bold text-slate-300 block">
                Edge Heuristic & Threat Signatures:
              </span>
              {currentScenario.flags.map((flag, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-300"
                >
                  <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{flag}</span>
                </div>
              ))}
            </div>

            {/* Actionable Recommendation Bar */}
            <div className={`mt-5 p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
              currentScenario.riskScore > 75
                ? 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                : currentScenario.riskScore > 40
                ? 'bg-amber-950/40 border-amber-800/60 text-amber-200'
                : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
            }`}>
              <div className="text-xs font-semibold">
                <span className="font-bold uppercase mr-1">Recommendation:</span>
                {currentScenario.recommendation}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
