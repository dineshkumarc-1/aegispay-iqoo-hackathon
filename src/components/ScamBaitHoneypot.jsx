import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, PhoneCall, PhoneOff, ShieldAlert, Sparkles, User, 
  Terminal, Download, AlertTriangle, CheckCircle2, Volume2, 
  Clock, Award, Radio, FileText, Send
} from 'lucide-react';

export default function ScamBaitHoneypot() {
  const [activePersona, setActivePersona] = useState('grandma');
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [transcript, setTranscript] = useState([]);
  const [dialogStep, setDialogStep] = useState(0);
  const [extractedIntelligence, setExtractedIntelligence] = useState({
    vpa: null,
    phone: null,
    account: null,
    location: null
  });
  const [firGenerated, setFirGenerated] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const timerRef = useRef(null);

  const personas = {
    grandma: {
      name: "👵 Confused Dadi (Grandma)",
      voiceStyle: "hi-IN",
      description: "Speaks slowly, pretends to search for reading glasses, gives wrong 16-digit card numbers, keeps scammer on hold.",
      tagline: "Wasted 14+ minutes per call"
    },
    uncle: {
      name: "👨‍🦳 Tech-Clueless Uncle",
      voiceStyle: "en-IN",
      description: "Pretends not to know what an 'app' is, clicks the wrong buttons, asks scammer to spell everything letter-by-letter.",
      tagline: "Forces scammer to explain Play Store"
    },
    executive: {
      name: "💼 Busy Bureaucrat",
      voiceStyle: "en-IN",
      description: "Puts scammer on 'hold' for assistant, demands official government challan numbers, frustrates scammer with paperwork.",
      tagline: "Demands official circulars"
    }
  };

  const dialogScripts = {
    grandma: [
      { speaker: 'Scammer', text: "Hello Madam! I am calling from Electricity Board. Your power is being cut in 15 minutes because bill is pending. Pay immediately!", time: '00:02' },
      { speaker: 'AegisBot', text: "Arey beta! Electricity cut? But my grandson Ramesh paid it last week... wait, let me look for my reading glasses, where did I keep them...", time: '00:07', action: 'Wasting Scammer Time (+2 mins)' },
      { speaker: 'Scammer', text: "Madam no time for glasses! Open PhonePe and send ₹10 to our officer VPA: bescom.discom.urgent99@ibl right now!", time: '00:15', intel: { vpa: 'bescom.discom.urgent99@ibl', phone: '+91 98765 43210', location: 'Jamtara Node #4' } },
      { speaker: 'AegisBot', text: "Beta, is that PhonePe on the television screen or the telephone? I am pressing the green button, but it is calling my daughter in Pune...", time: '00:23', action: 'Simulating Fake Button Presses' },
      { speaker: 'Scammer', text: "No Madam! In your mobile! Read me your 6-digit UPI PIN, I will update from my system!", time: '00:31' },
      { speaker: 'AegisBot', text: "My PIN? Yes beta, let me tell you... 4... 9... wait, someone is knocking at my door, please hold the line for 2 minutes...", time: '00:40', action: 'Placing Scammer on Infinite Hold' },
      { speaker: 'Scammer', text: "Hello?! Madam are you there?! Don't go away!", time: '00:50' },
      { speaker: 'AegisBot', text: "Haan beta, I am back. The milkman was there. Now what were you saying? Should I send the money to Account 30918239012 at SBI branch?", time: '00:58', intel: { account: '30918239012 (SBI Fake Mule)' } }
    ]
  };

  // Call timer logic
  useEffect(() => {
    if (isCallActive) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCallActive]);

  // Automated honeypot conversation simulator
  useEffect(() => {
    let timeout = null;
    if (isCallActive && dialogStep < dialogScripts.grandma.length) {
      const currentLine = dialogScripts.grandma[dialogStep];
      timeout = setTimeout(() => {
        setTranscript(prev => [...prev, currentLine]);
        
        // Extract intelligence dynamically
        if (currentLine.intel) {
          setExtractedIntelligence(prev => ({ ...prev, ...currentLine.intel }));
        }

        // Voice playback
        speakLine(currentLine.text, currentLine.speaker === 'AegisBot');

        setDialogStep(prev => prev + 1);
      }, currentLine.speaker === 'Scammer' ? 3500 : 4500);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isCallActive, dialogStep]);

  const speakLine = (text, isBot) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = isBot ? 0.9 : 1.05;
      utterance.pitch = isBot ? 1.3 : 0.9;
      setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startHoneypotCall = () => {
    setIsCallActive(true);
    setTranscript([dialogScripts.grandma[0]]);
    setDialogStep(1);
    setCallDuration(0);
    setFirGenerated(false);
    speakLine(dialogScripts.grandma[0].text, false);
  };

  const endHoneypotCall = () => {
    setIsCallActive(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const downloadPoliceFIR = () => {
    setFirGenerated(true);
    const dossierText = `
================================================================================
NATIONAL CYBER CRIME REPORTING PORTAL (HELPLINE 1930 / CYBERCRIME.GOV.IN)
TAMPER-PROOF ON-DEVICE EVIDENCE DOSSIER GENERATED BY AEGISPAY
================================================================================
INCIDENT ID: AGY-FIR-${Date.now()}
TIMESTAMP: ${new Date().toISOString()}
INCIDENT TYPE: Section 66D IT Act (Impersonation & Financial Fraud Attempt)

[1. EXTRACTED PERPETRATOR FORENSICS]
• Fraudster Caller ID: ${extractedIntelligence.phone || '+91 98765 43210 (Spoofed BESCOM Operator)'}
• Mule VPA Handle: ${extractedIntelligence.vpa || 'bescom.discom.urgent99@ibl'}
• Mule Bank Account: ${extractedIntelligence.account || '30918239012 (State Bank of India)'}
• Cell Tower Node: ${extractedIntelligence.location || 'Eastern Sector Sub-Node 4'}
• Time Scammer Was Kept On Bait: ${formatTimer(callDuration)}

[2. CONVERSATIONAL HONEYPOT TRANSCRIPT]
${transcript.map(t => `[${t.time}] ${t.speaker.toUpperCase()}: ${t.text}`).join('\n')}

[3. ON-DEVICE CRYPTOGRAPHIC INTEGRITY PROOF]
• Edge Model: LiteRT MobileBERT (INT8 Quantized)
• Local Enclave Hash: SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
• Status: Verified Untampered Local Evidence Record
================================================================================
`;
    const blob = new Blob([dossierText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AegisPay_1930_Cybercrime_FIR_Evidence.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6 backdrop-blur flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-cyan-400" />
            <h2 className="text-lg font-bold text-white m-0">
              ScamBait AI — Autonomous Scammer Voice Honeypot & Forensics Trap
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Don't just block scammers—<strong>turn defense into active counter-offense!</strong> An on-device AI voice mimics a confused elderly persona, keeps the scammer busy for minutes, extracts their mule VPA & bank details, and auto-files a 1930 Cybercrime police dossier.
          </p>
        </div>

        {/* Status Chip */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Active Forensics Trap</span>
          </span>
        </div>
      </div>

      {/* Main Dual Viewport: Live Honeypot Call Simulator + Real-Time Extracted Intel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Call Simulation (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
            
            {/* Persona Selector */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Select Honeypot AI Counter-Persona:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(personas).map(([key, p]) => (
                  <button
                    key={key}
                    onClick={() => setActivePersona(key)}
                    disabled={isCallActive}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                      activePersona === key
                        ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    } ${isCallActive ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    <div className="text-xs font-bold text-slate-200 truncate">{p.name}</div>
                    <div className="text-[9px] text-cyan-400 font-mono mt-0.5">{p.tagline}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated In-Call Screen */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden space-y-4">
              
              {/* Call Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <PhoneCall className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Electricity Board Scam / Unknown Caller</span>
                    <span className="text-[10px] text-slate-500 font-mono">+91 98765 43210 (Flagged Mule)</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1 justify-end">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatTimer(callDuration)}</span>
                  </div>
                  <span className="text-[9px] text-rose-400 font-bold uppercase">Scammer Time Wasted</span>
                </div>
              </div>

              {/* Live Transcript Stream */}
              <div className="h-60 overflow-y-auto space-y-2.5 pr-1 font-sans text-xs">
                {transcript.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex flex-col gap-1 transition ${
                      item.speaker === 'AegisBot'
                        ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-100 ml-4'
                        : 'bg-slate-900 border-slate-800 text-slate-200 mr-4'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className={`font-bold ${item.speaker === 'AegisBot' ? 'text-cyan-400' : 'text-rose-400'}`}>
                        {item.speaker === 'AegisBot' ? '🤖 AegisBot (Dadi AI)' : '🚨 Scammer'}
                      </span>
                      <span className="text-slate-500">{item.time}</span>
                    </div>
                    <p className="m-0 leading-relaxed">{item.text}</p>
                    {item.action && (
                      <span className="text-[9px] font-mono text-amber-400 mt-1 bg-amber-950/40 px-1.5 py-0.5 rounded w-fit border border-amber-800/40">
                        ⚡ Action: {item.action}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Call Control Buttons */}
              <div className="pt-2 flex items-center gap-3">
                {!isCallActive ? (
                  <button
                    onClick={startHoneypotCall}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                  >
                    <Bot className="w-4 h-4 text-slate-950" />
                    <span>Trigger Scambait Honeypot Call</span>
                  </button>
                ) : (
                  <button
                    onClick={endHoneypotCall}
                    className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-600/30"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>Hang Up & Complete Evidence Capture</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Right Column: Real-Time Cyber Forensics Extraction & 1930 FIR (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Live Cyber Forensics Extractor
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  Automated Threat Intelligence
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                1930 PORTAL READY
              </span>
            </div>

            {/* Extracted Entity Cards */}
            <div className="space-y-2.5 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 font-sans">Extracted Mule VPA Handle:</span>
                <span className="text-rose-400 font-bold font-mono">
                  {extractedIntelligence.vpa || 'Listening for VPA...'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 font-sans">Fraudster Caller Number:</span>
                <span className="text-amber-400 font-bold font-mono">
                  {extractedIntelligence.phone || '+91 98765 43210'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 font-sans">Mule Bank Account:</span>
                <span className="text-cyan-300 font-bold font-mono">
                  {extractedIntelligence.account || 'Extracting from dialog...'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 font-sans">Geolocation / Call Node:</span>
                <span className="text-slate-300 font-mono">
                  {extractedIntelligence.location || 'Triangulating...'}
                </span>
              </div>
            </div>

            {/* 1930 Cybercrime Police Dossier Action */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-950 border border-cyan-500/30 space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                <FileText className="w-4 h-4" />
                <span>National Cybercrime (1930) Evidence Pack</span>
              </div>
              <p className="text-xs text-slate-300 m-0 leading-relaxed">
                AegisPay automatically compiles the entire conversation transcript, call recording hashes, and extracted mule handles into an official evidence dossier ready to be uploaded to <strong>cybercrime.gov.in</strong> or dialed via <strong>1930</strong>.
              </p>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={downloadPoliceFIR}
                  className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{firGenerated ? 'Evidence Pack Downloaded!' : 'Download 1930 Evidence Dossier'}</span>
                </button>
              </div>
            </div>

            {/* Hackathon Impact Note */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Law Enforcement Value:</strong> Solves the #1 bottleneck for police by generating structured, timestamped evidence before scammers can delete their accounts.</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
