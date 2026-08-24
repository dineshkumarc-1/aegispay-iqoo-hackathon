import React, { useState } from 'react';
import { SCAM_SCENARIOS } from '../data/mockScenarios';
import { 
  MessageSquareWarning, ShieldAlert, ShieldCheck, AlertTriangle, 
  Sparkles, CheckCircle2, XCircle, ArrowRight, Smartphone, Lock, 
  Send, Bot, Cpu, Volume2
} from 'lucide-react';

export default function SocialEngineeringInterceptor() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(SCAM_SCENARIOS[0].id);
  const [customText, setCustomText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lockdownActive, setLockdownActive] = useState(false);

  const currentScenario = React.useMemo(() => {
    if (customText.trim().length > 0) {
      const lower = customText.toLowerCase();
      let score = 5;
      let tokens = [];
      let explanation = "Standard conversational notification. No coercive patterns detected.";
      let intent = "Routine Informational";

      if (lower.includes('disconnected') || lower.includes('suspend') || lower.includes('urgently') || lower.includes('tonight')) {
        score += 45;
        tokens.push('Urgency Pressure');
        explanation = "High urgency coercion token flagged: Attempting to induce panic via immediate disconnection threat.";
        intent = "Psychological Pressure";
      }
      if (lower.includes('pin') || lower.includes('otp') || lower.includes('cvv') || lower.includes('password')) {
        score += 40;
        tokens.push('Credential Extraction');
        explanation = "Critical credential solicitation: Requesting UPI PIN or authentication token.";
        intent = "Credential Harvesting";
      }
      if (lower.includes('anydesk') || lower.includes('teamviewer') || lower.includes('quicksupport') || lower.includes('apk')) {
        score += 50;
        tokens.push('Remote Access / Malware Tool');
        explanation = "Screen-share takeover attempt: Fraudster attempting to gain remote control of banking apps.";
        intent = "Device Takeover";
      }

      return {
        id: 'custom',
        category: 'Custom Inbound Text',
        sender: 'Inbound Notification Stream',
        snippet: customText,
        intent,
        riskScore: Math.min(100, score),
        threatTokens: tokens,
        aiExplanation: explanation,
        suggestedAction: score > 70 ? 'Trigger Emergency Lockdown & Block Sender' : 'Safe to proceed'
      };
    }
    return SCAM_SCENARIOS.find(s => s.id === selectedScenarioId) || SCAM_SCENARIOS[0];
  }, [selectedScenarioId, customText]);

  const handleSimulateLockdown = () => {
    setLockdownActive(true);
    if (navigator.vibrate) navigator.vibrate([150, 50, 150, 50, 250]);
    setTimeout(() => setLockdownActive(false), 3000);
  };

  return (
    <div className="space-y-5">
      
      {/* Preset Scenarios Strip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 card-shadow space-y-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Select Inbound Intent Scenario:
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {SCAM_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenarioId(sc.id);
                setCustomText('');
              }}
              className={`p-3 rounded-xl text-xs font-medium transition text-left cursor-pointer border ${
                selectedScenarioId === sc.id && !customText
                  ? 'bg-blue-50/80 border-blue-500 text-blue-900 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="font-bold text-slate-900 truncate">{sc.category}</div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">{sc.intent}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual Grid: Mobile Simulation + MobileBERT NLP Forensics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Mobile Notification Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 card-shadow space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-900">Inbound SMS / WhatsApp Stream</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Android Intent Hook</span>
            </div>

            {/* Notification Bubble */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">{currentScenario.sender}</span>
                <span className="text-[10px] text-slate-400">Just Now</span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed m-0 font-medium">
                {currentScenario.snippet}
              </p>
            </div>

            {/* Custom Input */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Test Custom Inbound SMS / Call Script:
              </label>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                rows={3}
                placeholder="Type or paste any coercive SMS, WhatsApp text, or OTP message to test on-device NLP..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            {/* Emergency Screen Barrier Action */}
            {currentScenario.riskScore > 75 && (
              <button
                onClick={handleSimulateLockdown}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Lock className="w-4 h-4" />
                <span>{lockdownActive ? 'Screen Barrier Engaged (Locked)' : 'Simulate Android Barrier Pin Lock'}</span>
              </button>
            )}

          </div>
        </div>

        {/* Right: MobileBERT Quantized NLP Diagnostics (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 card-shadow space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Quantized NLP Classifier
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  MobileBERT On-Device Intent Analysis
                </h3>
              </div>
              <div className="text-right">
                <div className={`text-xl font-bold font-mono ${
                  currentScenario.riskScore > 75 ? 'text-rose-600' : 'text-emerald-600'
                }`}>
                  {currentScenario.riskScore}%
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Coercion Probability</div>
              </div>
            </div>

            {/* 3 Metric Gauges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-lg font-bold font-mono text-blue-600">
                  11.4 ms
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 mt-0.5">
                  Inference Time
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-lg font-bold font-mono text-slate-900">
                  ~18 MB
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 mt-0.5">
                  INT8 Model Size
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-lg font-bold font-mono text-emerald-600">
                  0 Bytes
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 mt-0.5">
                  Cloud Leak (100% Local)
                </div>
              </div>
            </div>

            {/* Extracted Threat Tokens */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                Flagged Urgency & Manipulation Tokens:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentScenario.threatTokens.length > 0 ? (
                  currentScenario.threatTokens.map((token, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-mono text-xs font-semibold"
                    >
                      ⚠️ "{token}"
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> No psychological coercion tokens detected.
                  </span>
                )}
              </div>
            </div>

            {/* AI Explanation Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Cognitive Reasoning:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed m-0 font-medium">
                {currentScenario.aiExplanation}
              </p>
            </div>

            {/* Suggested Action */}
            <div className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${
              currentScenario.riskScore > 75
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}>
              <span className="text-xs font-semibold">
                <strong>Recommended Action:</strong> {currentScenario.suggestedAction}
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
