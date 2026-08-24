import React, { useState, useMemo, useRef, useEffect } from 'react';
import { QR_TEST_CASES } from '../data/mockScenarios';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, QrCode, Scan, 
  ArrowRight, CheckCircle2, XCircle, Terminal, Eye, Volume2, Lock,
  Camera, CameraOff, Globe, Sparkles, VolumeX, Layers, Activity
} from 'lucide-react';

export default function QRScannerView() {
  const [selectedCaseId, setSelectedCaseId] = useState(QR_TEST_CASES[1].id);
  const [customUri, setCustomUri] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const [hapticTriggered, setHapticTriggered] = useState(false);
  const [useLiveCamera, setUseLiveCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('ta');
  const [speaking, setSpeaking] = useState(false);
  const [spokenSubtitle, setSpokenSubtitle] = useState('');
  const [enable3DParallax, setEnable3DParallax] = useState(true);

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
          title: 'Custom Ingress Input',
          merchant: pn,
          vpa: pa,
          rawUri: customUri,
          riskScore: Math.min(100, score),
          status: score > 75 ? 'CRITICAL' : score > 40 ? 'WARNING' : 'SAFE',
          type: isCollect ? 'collect' : 'pay',
          flags,
          recommendation: score > 75 ? 'DO NOT PAY! High probability of quishing fraud.' : 'Verify recipient identity before paying.'
        };
      } catch (e) {
        return {
          id: 'invalid',
          title: 'Malformed UPI String',
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

  // Siren Alarm Tone via Web Audio API
  const playSirenTone = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';

      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.linearRampToValueAtTime(1000, now + 0.15);
      osc.frequency.linearRampToValueAtTime(600, now + 0.3);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {
      console.log('AudioContext error:', e);
    }
  };

  // Robust Dual-Layer Vernacular Voice Alert Engine
  const playVernacularAudioWarning = (lang = selectedLanguage) => {
    setSpeaking(true);
    triggerMockHaptic();
    playSirenTone();

    const audioCatalog = {
      ta: {
        nativeScript: "எச்சரிக்கை! மோசடி முயற்சி கண்டறியப்பட்டது. உங்கள் UPI பின்னை உள்ளிட வேண்டாம்!",
        phoneticSpeech: "Echarikkai! Mosadi muyarchi kandupidikkappattadhu. Ungal UPI pin-ai ullida vendam!",
        langCode: "ta-IN"
      },
      hi: {
        nativeScript: "सावधान! धोखाधड़ी का प्रयास पाया गया है। अपना यूपीआई पिन कभी दर्ज न करें!",
        phoneticSpeech: "Saavdhaan! Dhokhadhadi ka prayaas hai. Apna UPI PIN enter na karein!",
        langCode: "hi-IN"
      },
      te: {
        nativeScript: "హెచ్చరిక! మోసం ప్రయత్నం గుర్తించబడింది. దయచేసి మీ UPI పిన్‌ను నమోదు చేయవద్దు!",
        phoneticSpeech: "Hechcharika! Mosam prayatnam gurtincha badindi. Mee UPI PIN enter cheyavaddhu!",
        langCode: "te-IN"
      },
      kn: {
        nativeScript: "ಎಚ್ಚರಿಕೆ! ವಂಚನೆಯ ಪ್ರಯತ್ನ ಪತ್ತೆಯಾಗಿದೆ. ನಿಮ್ಮ UPI ಪಿನ್ ಅನ್ನು ನಮೂದಿಸಬೇಡಿ!",
        phoneticSpeech: "Echcharike! Vanchane prayatna pattidhe. Nimma UPI PIN enter maadbedi!",
        langCode: "kn-IN"
      },
      en: {
        nativeScript: "Warning! Fraud attempt detected. Do not enter your UPI PIN!",
        phoneticSpeech: "Warning! Fraud attempt detected. Do not enter your UPI PIN!",
        langCode: "en-IN"
      }
    };

    const target = audioCatalog[lang] || audioCatalog.en;
    setSpokenSubtitle(target.nativeScript);

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();

        const voices = window.speechSynthesis.getVoices();
        const nativeVoice = voices.find(v => v.lang.startsWith(lang) || v.lang.includes(target.langCode));

        const speechText = (nativeVoice && lang !== 'en') ? target.nativeScript : target.phoneticSpeech;
        const utterance = new SpeechSynthesisUtterance(speechText);
        
        if (nativeVoice) {
          utterance.voice = nativeVoice;
          utterance.lang = target.langCode;
        } else {
          utterance.lang = 'en-IN';
        }

        utterance.rate = 0.95;
        utterance.pitch = 1.05;
        utterance.volume = 1.0;

        utterance.onend = () => {
          setSpeaking(false);
          setTimeout(() => setSpokenSubtitle(''), 5000);
        };
        utterance.onerror = () => {
          setSpeaking(false);
          setTimeout(() => setSpokenSubtitle(''), 5000);
        };

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error('Speech error:', err);
        setSpeaking(false);
      }
    } else {
      setTimeout(() => {
        setSpeaking(false);
        setSpokenSubtitle('');
      }, 5000);
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
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified Clean
          </span>
        );
      case 'WARNING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" /> Price Surcharge Warning
          </span>
        );
      case 'CRITICAL':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" /> Quishing Threat Blocked
          </span>
        );
    }
  };

  return (
    <div className="space-y-5">
      
      {/* Preset Scenarios Strip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 card-shadow space-y-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Select Terminal Simulation Scenario:
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {QR_TEST_CASES.map((tc) => (
            <button
              key={tc.id}
              onClick={() => {
                setSelectedCaseId(tc.id);
                setCustomUri('');
              }}
              className={`p-3 rounded-xl text-xs font-medium transition text-left cursor-pointer border ${
                selectedCaseId === tc.id && !customUri
                  ? 'bg-blue-50/80 border-blue-500 text-blue-900 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="font-bold text-slate-900 truncate">{tc.title}</div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">{tc.merchant}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual Grid: Terminal Viewfinder + Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Viewfinder (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 card-shadow space-y-4">
            
            <div className="flex items-center justify-between">
              <button
                onClick={() => setEnable3DParallax(!enable3DParallax)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer border ${
                  enable3DParallax
                    ? 'bg-blue-50 text-blue-700 border-blue-300'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>{enable3DParallax ? '3D Parallax: Active' : '3D Depth: Off'}</span>
              </button>

              <button
                onClick={() => setUseLiveCamera(!useLiveCamera)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer border ${
                  useLiveCamera 
                    ? 'bg-blue-600 text-white border-blue-700 shadow-xs' 
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {useLiveCamera ? <CameraOff className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
                <span>{useLiveCamera ? 'Stop Camera' : 'Use Device Camera'}</span>
              </button>
            </div>

            {/* Viewfinder Frame */}
            <div className="relative aspect-[3/4] bg-slate-900 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 text-center border border-slate-800">
              
              {useLiveCamera && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
              )}

              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scan z-20"></div>
              )}

              {/* Corner HUD */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg z-20"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg z-20"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg z-20"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-br-lg z-20"></div>

              {!useLiveCamera && (
                <div className="relative z-10 p-4 rounded-2xl bg-white/95 border border-slate-200 shadow-xl backdrop-blur">
                  <div className="w-36 h-36 bg-white rounded-xl p-2 flex items-center justify-center relative">
                    <QrCode className="w-full h-full text-slate-900" />
                    
                    {currentScenario.id === 'quishing-tampered' && (
                      <div className="absolute inset-1.5 bg-rose-500/20 border-2 border-dashed border-rose-500 rounded-lg flex items-center justify-center">
                        <span className="bg-rose-600 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded shadow">
                          STICKER DETECTED
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 3D Optical Parallax Depth HUD Overlay */}
              {enable3DParallax && currentScenario.id === 'quishing-tampered' && (
                <div className="absolute top-3 inset-x-3 z-30 p-2.5 rounded-xl bg-rose-950/90 border border-rose-500/80 text-[10px] font-mono text-rose-200 text-left backdrop-blur-md shadow-xl flex items-center justify-between">
                  <div>
                    <span className="text-rose-400 font-bold block">🔬 3D OPTICAL PARALLAX DEPTH:</span>
                    <span>Paper Step: <strong>+0.35mm elevation</strong> on Acrylic</span>
                  </div>
                  <span className="px-1.5 py-0.5 bg-rose-600 text-white font-bold rounded text-[9px]">
                    99.1% TAMPER
                  </span>
                </div>
              )}

              {/* AR Result Tag */}
              <div className="mt-4 z-10 max-w-xs">
                <div className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border backdrop-blur-md ${
                  currentScenario.riskScore > 75 
                    ? 'bg-rose-950/90 border-rose-500 text-rose-200'
                    : currentScenario.riskScore > 40
                    ? 'bg-amber-950/90 border-amber-500 text-amber-200'
                    : 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                }`}>
                  {currentScenario.status === 'CRITICAL' ? '⛔ THREAT BLOCKED' : '✅ CLEAN VPA SIGNATURE'}
                </div>
                <div className="text-[11px] text-white mt-1.5 font-semibold truncate bg-slate-950/80 px-2.5 py-0.5 rounded-md">
                  {currentScenario.merchant}
                </div>
              </div>

              {/* Voice Subtitles Banner */}
              {spokenSubtitle && (
                <div className="absolute inset-x-3 top-14 z-30 p-2.5 rounded-xl bg-blue-950/95 border border-blue-400 text-blue-100 text-xs font-bold shadow-2xl animate-bounce backdrop-blur flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-blue-300 shrink-0" />
                  <span className="text-left font-sans">{spokenSubtitle}</span>
                </div>
              )}

              {/* Emergency Lockdown Action Bar */}
              {currentScenario.riskScore > 75 && (
                <div className="absolute inset-x-3 bottom-3 z-30 p-3 rounded-xl bg-rose-950/95 border border-rose-500/80 text-left backdrop-blur-md shadow-2xl space-y-2">
                  <div className="flex items-center justify-between text-rose-300 font-bold text-xs">
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>PIN Prompt Intercepted</span>
                    </div>
                    <span className="text-[9px] font-mono bg-rose-900/60 px-1.5 py-0.5 rounded">8.2ms NPU</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <select
                      value={selectedLanguage}
                      onChange={(e) => {
                        setSelectedLanguage(e.target.value);
                        playVernacularAudioWarning(e.target.value);
                      }}
                      className="bg-slate-900 border border-slate-700 text-cyan-300 rounded-lg text-[10px] font-bold px-2 py-1 focus:outline-none cursor-pointer"
                    >
                      <option value="ta">தமிழ் (Tamil)</option>
                      <option value="hi">हिंदी (Hindi)</option>
                      <option value="en">English</option>
                      <option value="te">తెలుగు (Telugu)</option>
                      <option value="kn">ಕನ್ನಡ (Kannada)</option>
                    </select>

                    <button
                      onClick={() => playVernacularAudioWarning(selectedLanguage)}
                      className="flex-1 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{speaking ? 'Speaking...' : '🔊 Play Alert'}</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Custom Input */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Custom UPI URI Inspector:
              </label>
              <input
                type="text"
                value={customUri}
                onChange={(e) => setCustomUri(e.target.value)}
                placeholder="e.g. upi://pay?pa=store@upi&pn=Retail..."
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

          </div>
        </div>

        {/* Right Column: AI Heuristics & NPCI URI Inspection (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 card-shadow space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Threat Classification Engine
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {currentScenario.title}
                </h3>
              </div>
              <div>{getStatusBadge(currentScenario.status)}</div>
            </div>

            {/* Metric Gauges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className={`text-2xl font-bold font-mono ${
                  currentScenario.riskScore > 75 ? 'text-rose-600' :
                  currentScenario.riskScore > 40 ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  {currentScenario.riskScore}
                  <span className="text-xs text-slate-400 font-normal">/100</span>
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 mt-0.5">
                  Quishing Score
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-2xl font-bold font-mono text-blue-600">
                  8.2 ms
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 mt-0.5">
                  Edge NPU Speed
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className={`text-base font-bold font-mono uppercase truncate ${
                  currentScenario.type === 'collect' ? 'text-rose-600' : 'text-slate-800'
                }`}>
                  {currentScenario.type === 'collect' ? 'COLLECT REVERSE' : 'STANDARD PAY'}
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 mt-0.5">
                  Protocol Method
                </div>
              </div>
            </div>

            {/* NPCI Parameter Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-600" />
                  <span>NPCI UPI Spec Parameter Dissection</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">v2.0 Protocol</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-sans">Payee VPA (pa)</div>
                  <div className="text-slate-900 truncate mt-0.5 font-semibold">{parsedParams.pa}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-sans">Merchant Name (pn)</div>
                  <div className="text-slate-900 truncate mt-0.5 font-semibold">{parsedParams.pn}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-sans">MCC Code (mc)</div>
                  <div className="text-slate-900 truncate mt-0.5 font-semibold">{parsedParams.mc}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-sans">Amount (am)</div>
                  <div className="text-slate-900 truncate mt-0.5 font-semibold">{parsedParams.am}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-sans">Currency (cu)</div>
                  <div className="text-slate-900 truncate mt-0.5 font-semibold">{parsedParams.cu}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-sans">Note (tn)</div>
                  <div className="text-slate-900 truncate mt-0.5 font-semibold">{parsedParams.tn}</div>
                </div>
              </div>
            </div>

            {/* Heuristic Flags */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 block">
                Edge Heuristic & Threat Signatures:
              </span>
              {currentScenario.flags.map((flag, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{flag}</span>
                </div>
              ))}
            </div>

            {/* Recommendation Box */}
            <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
              currentScenario.riskScore > 75
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : currentScenario.riskScore > 40
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}>
              <div className="text-xs font-medium">
                <strong className="uppercase mr-1">Recommendation:</strong>
                {currentScenario.recommendation}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
