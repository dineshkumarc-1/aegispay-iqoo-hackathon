import React, { useState, useMemo } from 'react';
import { SCAM_SCENARIOS } from '../data/mockScenarios';
import { 
  ShieldAlert, ShieldCheck, MessageSquare, AlertOctagon, 
  PhoneCall, Zap, Cpu, Lock, Sparkles, CheckCircle2, Copy
} from 'lucide-react';

export default function SocialEngineeringInterceptor() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(SCAM_SCENARIOS[1].id);
  const [customText, setCustomText] = useState('');
  const [simulatingInference, setSimulatingInference] = useState(false);

  // Dynamic analysis for custom text or selected scenario
  const currentItem = useMemo(() => {
    if (customText.trim().length > 0) {
      const lower = customText.toLowerCase();
      let score = 5;
      let tokens = [];
      let explanation = "Message appears routine without urgent financial coercion flags.";
      let intent = "Routine Text / Notification";

      // NLP Heuristic keywords for on-device simulation
      const scamTriggers = [
        { phrase: "pin", risk: 35, token: "PIN entry request" },
        { phrase: "disconnect", risk: 40, token: "Utility Disconnection Panic" },
        { phrase: "anydesk", risk: 45, token: "Remote Access (AnyDesk)" },
        { phrase: "quicksupport", risk: 45, token: "Remote Access (QuickSupport)" },
        { phrase: "teamviewer", risk: 45, token: "Remote Access (TeamViewer)" },
        { phrase: "kyc", risk: 25, token: "Urgent KYC Expiry" },
        { phrase: "lottery", risk: 40, token: "Lottery / Prize Bait" },
        { phrase: "reward", risk: 20, token: "Reward / Cashback Trap" },
        { phrase: "credit refund", risk: 30, token: "Reverse-Charge Deception" },
        { phrase: "bit.ly", risk: 30, token: "Obfuscated Shortlink" },
        { phrase: "immediately", risk: 20, token: "High Psychological Urgency" },
      ];

      scamTriggers.forEach(t => {
        if (lower.includes(t.phrase)) {
          score += t.risk;
          tokens.push(t.token);
        }
      });

      const finalScore = Math.min(99, score);
      if (finalScore > 65) {
        intent = "High-Risk Financial Social Engineering";
        explanation = "Detected aggressive psychological coercion, urgent deadline, or deceptive credential harvest triggers.";
      }

      return {
        id: "custom",
        category: finalScore > 65 ? "Dynamic Coercion Detection" : "Standard Message",
        sender: "Active Input / Notification Stream",
        snippet: customText,
        intent,
        riskScore: finalScore,
        threatTokens: tokens,
        aiExplanation: explanation,
        suggestedAction: finalScore > 65 ? "Immediate Interception: Blocked UPI Intent Screen" : "Safe: Normal Processing"
      };
    }
    return SCAM_SCENARIOS.find(s => s.id === selectedScenarioId) || SCAM_SCENARIOS[0];
  }, [selectedScenarioId, customText]);

  const handleTestScenario = (id) => {
    setSimulatingInference(true);
    setSelectedScenarioId(id);
    setCustomText('');
    setTimeout(() => setSimulatingInference(false), 200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6 backdrop-blur flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white m-0">
              Ambient Social Engineering & Voice/SMS Interceptor
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Lightweight quantized MobileBERT model running continuously on the phone's NPU to detect panic manipulation, reverse-charge deceptions, and remote-access fraud in real time.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="w-full md:w-auto">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Test Attack Scenarios:
          </label>
          <div className="grid grid-cols-2 md:flex gap-2">
            {SCAM_SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => handleTestScenario(sc.id)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition text-left cursor-pointer border ${
                  selectedScenarioId === sc.id && !customText
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-slate-200 truncate">{sc.category}</div>
                <div className="text-[10px] text-slate-400 truncate max-w-[130px]">{sc.sender.split('(')[0]}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Input Simulator & Live Message Feed (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Simulated Incoming Stream (SMS / Call / Push)</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                PRIVACY SANDBOX ACTIVE
              </span>
            </div>

            {/* Simulated Notification / Chat Bubble */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                  <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sender: {currentItem.sender}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Live Ingress</span>
              </div>

              <div className="text-sm text-slate-200 leading-relaxed font-sans mt-2">
                {currentItem.snippet}
              </div>

              {/* Threat Token Badges */}
              {currentItem.threatTokens.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1.5">
                    Extracted Threat Signatures:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentItem.threatTokens.map((tok, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/30"
                      >
                        ⚠️ {tok}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Custom Input Tester */}
            <div className="mt-4">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Type or Paste Any Custom Suspicious Message:
              </label>
              <textarea
                rows={3}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="e.g. Dear user, enter your PIN to claim ₹2000 cashback immediately..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 resize-none font-sans"
              />
            </div>
          </div>

          {/* Privacy & Zero Knowledge Assurance Card */}
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-3">
            <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-cyan-300 block mb-0.5">100% Zero-Knowledge Edge Inference</span>
              This NLP classification runs strictly inside the phone’s isolated hardware enclave. Text, OTPs, and audio logs are NEVER transmitted over the internet, satisfying DPDP Act & GDPR compliance.
            </div>
          </div>
        </div>

        {/* Right Column: AI Threat Engine & Automated Defensive Response (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Edge NLP Classifier Result
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  {currentItem.intent}
                </h3>
              </div>

              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                currentItem.riskScore > 75
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              }`}>
                {currentItem.riskScore > 75 ? '🚨 High Fraud Risk' : '✅ Verified Safe'}
              </div>
            </div>

            {/* Score Meters */}
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className={`text-3xl font-black font-mono ${
                  currentItem.riskScore > 75 ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {currentItem.riskScore}%
                </div>
                <div className="text-[11px] font-bold text-slate-400 uppercase mt-1">
                  Social Eng. Confidence
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-2xl font-black font-mono text-cyan-400">
                  12.1 ms
                </div>
                <div className="text-[11px] font-bold text-slate-400 uppercase mt-1">
                  Quantized Model Speed
                </div>
              </div>
            </div>

            {/* AI Explanation & Pedagogical Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>On-Device AI Context Analysis:</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed m-0">
                {currentItem.aiExplanation}
              </p>
            </div>

            {/* Automated System Intervention Simulation */}
            <div className="mt-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Automated Phone-First Defensive Action:
              </span>

              {currentItem.riskScore > 75 ? (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/80 to-slate-950 border border-rose-500/60 text-white space-y-2 shadow-lg">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                    <Lock className="w-4 h-4" />
                    <span>SYSTEM LOCKDOWN TRIGGERED</span>
                  </div>
                  <p className="text-xs text-rose-200 m-0">
                    AegisPay draws a high-contrast Android overlay barrier over any active UPI / Banking app, disabling touch input to prevent inadvertent PIN entry while vibrating continuously.
                  </p>
                  <div className="text-[11px] font-mono bg-rose-950/90 text-rose-300 p-2 rounded-lg border border-rose-800/60">
                    Action: {currentItem.suggestedAction}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold block text-emerald-300">Clean Transaction Signature</span>
                    Standard OTP detected. Safe for automated system autofill.
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
