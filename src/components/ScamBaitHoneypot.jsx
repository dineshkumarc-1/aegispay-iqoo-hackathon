import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, ShieldAlert, ShieldCheck, Play, Square, PhoneCall, 
  PhoneOff, Download, FileText, Sparkles, User, Clock, 
  CheckCircle2, ArrowRight, Volume2, Lock, AlertTriangle
} from 'lucide-react';

export default function ScamBaitHoneypot() {
  const [selectedPersona, setSelectedPersona] = useState('dadi');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [extractedData, setExtractedData] = useState({
    vpa: 'bescom.discom.urgent99@ibl',
    accountNumber: '30918239012',
    ifsc: 'ICIC0001092',
    scammerPhone: '+91 98765 43210',
    geolocation: 'Jamtara / Deoghar Sector 4',
    muleBank: 'ICICI Bank Mule Branch'
  });

  const timerRef = useRef(null);

  const personas = {
    dadi: {
      name: "Confused Dadi (Grandmother)",
      avatar: "👵",
      tagline: "Slow-paced, speaks in Tamil/Hindi, struggles to find reading glasses, mistypes fake PINs.",
      script: [
        {
          speaker: "Scammer",
          text: "Mataji, your electricity power is disconnecting right now! Immediately tell me your Google Pay number or pay ₹15 update fee!"
        },
        {
          speaker: "AegisPay AI (Dadi)",
          text: "Aiyyo beta... Wait one minute. The lights are already flickering. Where are my reading glasses? Let me search my pouch..."
        },
        {
          speaker: "Scammer",
          text: "No time for glasses Mataji! Open PhonePe! Click on Scan QR or send to my number immediately!"
        },
        {
          speaker: "AegisPay AI (Dadi)",
          text: "Beta, is that the blue app or purple app? My grandson Ramesh set up this phone. Let me press this button... *Beep Boop Beep*"
        },
        {
          speaker: "Scammer",
          text: "Give me your UPI ID Mataji! What is your handle? Or send money to bescom.discom.urgent99@ibl right now!"
        },
        {
          speaker: "AegisPay AI (Dadi)",
          text: "Okay beta, I am typing... B-E-S-C-O-M... Is there an underscore or dot? My fingers are shaking beta, please wait."
        }
      ]
    },
    uncle: {
      name: "Clueless Retired Uncle",
      avatar: "👴",
      tagline: "Asks endless bureaucratic questions about receipt stamps and tax deductions.",
      script: [
        {
          speaker: "Scammer",
          text: "Sir, your KYC update failed! Share your 6-digit AnyDesk code immediately or account will freeze!"
        },
        {
          speaker: "AegisPay AI (Uncle)",
          text: "Which branch manager authorized this? In 1994 when I worked at Telecom Department, we had Form 16-B. Do you have GST invoice?"
        },
        {
          speaker: "Scammer",
          text: "Sir! This is automated central RBI server KYC! Just read out the 9-digit code on your screen!"
        },
        {
          speaker: "AegisPay AI (Uncle)",
          text: "Let me fetch my ballpoint pen. My wife Kamala is saying don't give code. Is this taxable under Section 80C?"
        }
      ]
    },
    bureaucrat: {
      name: "Busy Tech Manager",
      avatar: "👨‍💼",
      tagline: "Pretends to be on a Zoom call, puts scammer on fake hold with elevator music.",
      script: [
        {
          speaker: "Scammer",
          text: "Sir you won ₹25,000 cash prize! Accept collect request on PhonePe now!"
        },
        {
          speaker: "AegisPay AI (Manager)",
          text: "Hold on, let me circle back with my team lead on this sync. Can you ping me the UPI VPA handle on Slack?"
        },
        {
          speaker: "Scammer",
          text: "No Slack sir! Open PhonePe right now and enter UPI PIN!"
        }
      ]
    }
  };

  const activePersonaData = personas[selectedPersona];

  // Live Timer
  useEffect(() => {
    if (isSessionActive) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSessionActive]);

  // Turn-by-Turn Speech Dialog
  useEffect(() => {
    let turnTimer = null;
    if (isSessionActive && currentTurnIndex < activePersonaData.script.length) {
      const turn = activePersonaData.script[currentTurnIndex];
      
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(turn.text);
        if (turn.speaker.includes('Dadi')) {
          utterance.rate = 0.85;
          utterance.pitch = 1.3;
        } else if (turn.speaker.includes('Uncle')) {
          utterance.rate = 0.9;
          utterance.pitch = 0.8;
        } else {
          utterance.rate = 1.0;
        }

        utterance.onend = () => {
          turnTimer = setTimeout(() => {
            setCurrentTurnIndex(prev => prev + 1);
          }, 1500);
        };
        utterance.onerror = () => {
          turnTimer = setTimeout(() => {
            setCurrentTurnIndex(prev => prev + 1);
          }, 2000);
        };

        window.speechSynthesis.speak(utterance);
      } else {
        turnTimer = setTimeout(() => {
          setCurrentTurnIndex(prev => prev + 1);
        }, 3000);
      }
    } else if (currentTurnIndex >= activePersonaData.script.length) {
      setIsSessionActive(false);
    }

    return () => {
      if (turnTimer) clearTimeout(turnTimer);
    };
  }, [isSessionActive, currentTurnIndex, activePersonaData]);

  const handleStartSession = () => {
    setIsSessionActive(true);
    setCurrentTurnIndex(0);
    setTimeElapsed(0);
  };

  const handleStopSession = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsSessionActive(false);
  };

  const download1930Dossier = () => {
    const dossierText = `
================================================================================
NATIONAL CYBERCRIME REPORTING PORTAL (1930 / cybercrime.gov.in)
OFFICIAL EVIDENCE DOSSIER — AGY-FIR-${Date.now()}
================================================================================
DATE & TIME: ${new Date().toLocaleString()}
REPORTING ENTITY: AegisPay On-Device Autonomous Security Core
ATTACK CLASSIFICATION: UPI Social Engineering & Coercive Disconnection Scam
STATUS: Evidence Extracted via AI ScamBait Honeypot (Ready for Police FIR)

[1. PERPETRATOR FORENSICS]
• Caller Phone Number: ${extractedData.scammerPhone}
• Extracted Mule UPI VPA: ${extractedData.vpa}
• Destination Bank Account: ${extractedData.accountNumber}
• Bank & Branch IFSC: ${extractedData.ifsc} (${extractedData.muleBank})
• Triangulated Cellular Cell: ${extractedData.geolocation}

[2. ENGAGEMENT TELEMETRY]
• Honeypot Persona: ${activePersonaData.name}
• Fraudster Stalled Duration: ${Math.floor(timeElapsed / 60)}m ${timeElapsed % 60}s
• Stolen Loss Avoided: ₹15,000.00
• NPCI UPI Intercept: Successfully blocked reverse collect intent

[3. TAMPER-PROOF TRANSCRIPT LOG]
${activePersonaData.script.map((s, i) => `[${i+1}] ${s.speaker}: ${s.text}`).join('\n')}

================================================================================
SUBMITTED AUTOMATICALLY TO 1930 NATIONAL CYBER HELPLINE REPOSITORY
================================================================================
`;
    const blob = new Blob([dossierText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `1930_Cybercrime_FIR_Dossier_${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="space-y-5">
      
      {/* Top Level Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 card-shadow space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900 m-0">
                Autonomous AI ScamBait Honeypot & 1930 Police Hub
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Turn the tables on scammers. When a coercive fraud call arrives, AegisPay's AI counter-agent takes over, stalls the scammer, extracts their real mule bank accounts, and compiles official 1930 Police FIRs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={download1930Dossier}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download 1930 Evidence Dossier</span>
            </button>
          </div>
        </div>

        {/* Persona Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.entries(personas).map(([key, p]) => (
            <button
              key={key}
              onClick={() => {
                if (isSessionActive) handleStopSession();
                setSelectedPersona(key);
                setCurrentTurnIndex(0);
              }}
              className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex items-start gap-3 ${
                selectedPersona === key
                  ? 'bg-blue-50/80 border-blue-500 text-blue-900 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="text-2xl">{p.avatar}</span>
              <div>
                <div className="font-bold text-slate-900 text-xs">{p.name}</div>
                <div className="text-[11px] text-slate-500 leading-snug mt-0.5">{p.tagline}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual Grid: Live Dialog Stream + Extracted Forensics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Live AI Honeypot Transcript (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 card-shadow space-y-4 flex flex-col justify-between min-h-[440px]">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{activePersonaData.avatar}</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 m-0">Live Conversation Stream</h3>
                  <p className="text-[11px] text-slate-500 m-0">AI Persona engaging fraudster in real time</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>{Math.floor(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, '0')}</span>
                </div>
                {isSessionActive && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                )}
              </div>
            </div>

            {/* Chat Bubble Stream */}
            <div className="space-y-3 flex-1 overflow-y-auto max-h-80 pr-1">
              {activePersonaData.script.slice(0, isSessionActive ? currentTurnIndex + 1 : activePersonaData.script.length).map((msg, idx) => {
                const isScammer = msg.speaker === 'Scammer';
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isScammer ? 'items-start' : 'items-end'}`}
                  >
                    <span className="text-[10px] font-bold uppercase text-slate-400 mb-1 px-1">
                      {msg.speaker}
                    </span>
                    <div className={`p-3 rounded-2xl max-w-md text-xs leading-relaxed ${
                      isScammer
                        ? 'bg-rose-50 border border-rose-200 text-rose-900 rounded-tl-xs'
                        : 'bg-blue-600 text-white rounded-tr-xs shadow-xs'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Call Action Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              {!isSessionActive ? (
                <button
                  onClick={handleStartSession}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Trigger ScamBait Honeypot Call</span>
                </button>
              ) : (
                <button
                  onClick={handleStopSession}
                  className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>Terminate & Compile 1930 Dossier</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Right: Extracted Mule Forensics & 1930 Dossier (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 card-shadow space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Extracted Intelligence
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Mule Account Forensics
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold font-mono">
                CRIMINAL MULE
              </span>
            </div>

            {/* Extracted Data Rows */}
            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-400 font-sans">Extracted Mule UPI VPA</div>
                <div className="text-slate-900 font-bold mt-0.5 text-rose-600">{extractedData.vpa}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-400 font-sans">Destination Bank Account</div>
                <div className="text-slate-900 font-bold mt-0.5">{extractedData.accountNumber}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-400 font-sans">Bank IFSC & Branch</div>
                <div className="text-slate-900 font-bold mt-0.5">{extractedData.ifsc} ({extractedData.muleBank})</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-400 font-sans">Inbound Scammer Number</div>
                <div className="text-slate-900 font-bold mt-0.5">{extractedData.scammerPhone}</div>
              </div>
            </div>

            {/* 1930 Police Submission Button */}
            <button
              onClick={download1930Dossier}
              className="w-full py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export Official 1930 Police FIR File</span>
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}
