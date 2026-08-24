import React, { useState, useEffect } from 'react';
import { 
  X, ChevronLeft, ChevronRight, ShieldCheck, Zap, Cpu, 
  FileText, Target, Award, Rocket, Repeat, Play, Pause, Download, Waves
} from 'lucide-react';

export default function PitchDeckModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isAutoPlaying && isOpen) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev < 9 ? prev + 1 : 0));
      }, 5000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoPlaying, isOpen]);

  if (!isOpen) return null;

  const slides = [
    {
      title: "🛡️ AegisPay — Autonomous On-Device AI Guardian for UPI & Commerce",
      subtitle: "iQOO Hackathon 2026 | FinTech & Commerce Track",
      tag: "01. OVERVIEW & FINTECH HOOK",
      content: (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-950 border border-cyan-500/30 text-center">
            <h3 className="text-2xl font-black text-white mb-2">Protecting India's 14+ Billion Monthly UPI Payments</h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              India processes <span className="text-cyan-400 font-bold">14+ Billion monthly UPI transactions</span>, but over <span className="text-rose-400 font-bold">₹1,750+ Crore</span> is lost annually to QR quishing, deepfake emergency calls, and counterfeit Kirana payment screens.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-lg font-black text-cyan-400 font-mono">11.4 ms</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">On-Device NPU</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-lg font-black text-emerald-400 font-mono">100%</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">DPDP Act (0 Cloud Leak)</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-lg font-black text-amber-400 font-mono">5 Native</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Voice Alarms</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-lg font-black text-rose-400 font-mono">ScamBait</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Mule VPA Sting & 1930 FIR</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "🚨 The FinTech Problem: The ₹1,750+ Cr Payment Epidemic",
      subtitle: "Why 98% of Fraud Happens at the Consumer-Merchant Interface",
      tag: "02. FINTECH PROBLEM",
      content: (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/40 space-y-2">
              <span className="font-bold text-rose-300 block text-sm">1. Retail QR Quishing</span>
              <p className="text-slate-300 m-0">Fraudulent paper stickers pasted over authentic Kirana merchant QRs divert payments to mule accounts.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 space-y-2">
              <span className="font-bold text-amber-300 block text-sm">2. Reverse Collect & Mandates</span>
              <p className="text-slate-300 m-0">Scammers trick users into entering PIN to "receive" refund credits, or approve deceptive ₹9,999/mo e-Mandates.</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 space-y-2">
              <span className="font-bold text-purple-300 block text-sm">3. Kirana Merchant Fraud</span>
              <p className="text-slate-300 m-0">Spoofed payment confirmation apps display fake green checkmarks and soundbox chimes to steal retail goods.</p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400">
            <strong className="text-slate-200">The Market Vulnerability:</strong> 68% of victims are first-time digital citizens, elderly users, and vernacular speakers in Tier-2/3 retail markets.
          </div>
        </div>
      )
    },
    {
      title: "🛑 The FinTech Gap: Why Cloud Banking APIs Fail",
      subtitle: "The Inherent Bottlenecks in Traditional Cloud Fraud Prevention",
      tag: "03. THE FINTECH GAP",
      content: (
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-rose-400 text-sm block">Cloud Latency (1,200ms – 3,000ms)</span>
            <p className="text-slate-300 m-0">UPI transactions happen in split-seconds. Cloud roundtrips cannot stop an impulsive user tap before money leaves the bank.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-rose-400 text-sm block">DPDP Act Privacy Violations</span>
            <p className="text-slate-300 m-0">Transmitting user SMS messages, OTPs, and personal VPA history to remote cloud servers creates severe breach liabilities.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-rose-400 text-sm block">Offline & Rural Blindspots</span>
            <p className="text-slate-300 m-0">Cloud verification fails completely in basements, rural markets, and poor connectivity zones.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-rose-400 text-sm block">Passive Warning Text</span>
            <p className="text-slate-300 m-0">Static text banners are systematically ignored by victims under active psychological manipulation.</p>
          </div>
        </div>
      )
    },
    {
      title: "🛡️ The Solution: 4-Pillar On-Device FinTech Guardian",
      subtitle: "Autonomous Real-Time Protection Across the Entire Payment Lifecycle",
      tag: "04. 4-PILLAR SOLUTION",
      content: (
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-1">
            <span className="font-bold text-cyan-300 block">1. 3D QR Parallax Shield</span>
            <p className="text-slate-300 m-0">Optical depth measuring +0.35mm sticker elevation & NPCI URI deep parser (pa, pn, am).</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/40 space-y-1">
            <span className="font-bold text-rose-300 block">2. Deepfake & Coercion</span>
            <p className="text-slate-300 m-0">Mel-spectrogram acoustic transformer on NPU catching AI voice clones demanding urgent transfers.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/40 space-y-1">
            <span className="font-bold text-amber-300 block">3. ScamBait Honeypot</span>
            <p className="text-slate-300 m-0">Autonomous AI voice persona that stalls fraudsters, extracts real mule VPAs, and auto-compiles 1930 FIRs.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-1">
            <span className="font-bold text-emerald-300 block">4. Kirana & Mandate Guard</span>
            <p className="text-slate-300 m-0">Luhn Mod-10 UTR checksum, CV font kerning, and unmasking hidden ₹9,999/mo UPI AutoPay traps.</p>
          </div>
        </div>
      )
    },
    {
      title: "📱 Why Phone-First? Why Hardware Matters",
      subtitle: "Harnessing Native Smartphone Hardware & Sensor Streams",
      tag: "05. HARDWARE INTEGRATION",
      content: (
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-400 text-sm block">Optical Stream & Screen Overlay:</span>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li><strong>60 FPS Camera Viewfinder:</strong> In-stream frame dissection of UPI parameters.</li>
              <li><strong>Android Overlay Barrier:</strong> System-level barrier drawn over UPI apps to physically lock touch input during attacks.</li>
            </ul>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 text-sm block">Sensory & Enclave Protection:</span>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li><strong>Hardware Haptics:</strong> High-frequency vibration pulses snap victims out of emotional panic.</li>
              <li><strong>Biometric Enclave:</strong> Hardware Face/Fingerprint verification before allowing overrides.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "🧠 On-Device Edge AI Core (Brownie Points)",
      subtitle: "Zero-Latency, Zero-Knowledge Privacy Architecture",
      tag: "06. CORE AI ENGINE",
      content: (
        <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3 text-xs">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-slate-950 rounded-xl">
              <span className="text-slate-400 block text-[10px]">Runtime Engine</span>
              <span className="text-cyan-300 font-mono font-bold">Google LiteRT / ONNX</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl">
              <span className="text-slate-400 block text-[10px]">Quantized Models</span>
              <span className="text-cyan-300 font-mono font-bold">MobileBERT + Mel-Audio</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl">
              <span className="text-slate-400 block text-[10px]">Edge Latency</span>
              <span className="text-emerald-400 font-mono font-bold">11.4 ms NPU</span>
            </div>
          </div>
          <p className="text-slate-300 m-0">100% Zero Cloud Telemetry — Personal financial logs, OTPs, and contact data NEVER leave the phone, ensuring strict compliance with India's DPDP Act.</p>
        </div>
      )
    },
    {
      title: "⚙️ System Workflow & Threat Interception Flow",
      subtitle: "Real-Time End-to-End Threat Handling",
      tag: "07. SYSTEM FLOW",
      content: (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-center space-y-2.5">
          <div className="p-2.5 bg-slate-900 rounded-xl text-slate-200 font-semibold">[ 📱 Phone Sensor Ingress: Camera / SMS / Audio / Deep Link ]</div>
          <div className="text-cyan-400 font-bold">↓ (&lt; 2ms Extraction)</div>
          <div className="p-2.5 bg-cyan-950/40 rounded-xl border border-cyan-500/50 text-cyan-300 font-bold">[ 🧠 On-Device LiteRT Quantized SLM Inference Core (11.4ms) ]</div>
          <div className="text-cyan-400 font-bold">↓ Real-Time Risk Score Evaluation</div>
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="p-2.5 bg-emerald-950/40 rounded-lg text-emerald-300">[ ✅ Safe: Fast-Track UPI ]</div>
            <div className="p-2.5 bg-rose-950/40 rounded-lg text-rose-300">[ 🚨 Threat: Overlay Lock + Voice Alert ]</div>
          </div>
        </div>
      )
    },
    {
      title: "⏱️ 30-Hour City Battle Roadmap",
      subtitle: "Clear, Milestoned Roadmap for the On-Site Hackathon",
      tag: "08. FEASIBILITY",
      content: (
        <div className="grid grid-cols-4 gap-2 text-xs text-center">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="font-mono text-cyan-400 font-bold">Hours 0–6</div>
            <div className="text-slate-300 mt-1 font-semibold">Camera Pipeline & UPI URI Parser</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="font-mono text-cyan-400 font-bold">Hours 6–18</div>
            <div className="text-slate-300 mt-1 font-semibold">Quantized LiteRT NLP & Quishing Rules</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="font-mono text-cyan-400 font-bold">Hours 18–24</div>
            <div className="text-slate-300 mt-1 font-semibold">Android Barrier & ScamBait Honeypot</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="font-mono text-cyan-400 font-bold">Hours 24–30</div>
            <div className="text-slate-300 mt-1 font-semibold">Live Attack Injection & 1930 FIR Polish</div>
          </div>
        </div>
      )
    },
    {
      title: "🏆 FinTech Benchmark & Competitive Edge",
      subtitle: "Why AegisPay Outperforms Existing Solutions",
      tag: "09. COMPETITIVE ADVANTAGE",
      content: (
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 px-2">Metric</th>
                <th className="py-2 px-2">Traditional Banking Apps</th>
                <th className="py-2 px-2 text-cyan-400 font-bold">AegisPay Edge AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr>
                <td className="py-2 px-2 text-slate-300 font-sans">Interception Point</td>
                <td className="py-2 px-2 text-rose-400">Post-fraud complaint</td>
                <td className="py-2 px-2 text-emerald-400 font-bold">Pre-transaction lock</td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-slate-300 font-sans">Speed</td>
                <td className="py-2 px-2 text-rose-400">1200ms – 3000ms</td>
                <td className="py-2 px-2 text-emerald-400 font-bold">11.4ms (On-Device NPU)</td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-slate-300 font-sans">Counter-Offense</td>
                <td className="py-2 px-2 text-rose-400">None (Passive)</td>
                <td className="py-2 px-2 text-emerald-400 font-bold">ScamBait AI + 1930 FIR</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      title: "🚀 Securing India's 14+ Billion Monthly UPI Economy",
      subtitle: "Autonomous Financial Defense in the Palm of Every Citizen",
      tag: "10. CONCLUSION & VISION",
      content: (
        <div className="space-y-4 text-center">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30">
            <h3 className="text-xl font-bold text-white mb-1">Empowering Bharat with Zero-Trust Financial Security</h3>
            <p className="text-slate-300 text-xs max-w-lg mx-auto m-0 leading-relaxed">
              Protecting 300+ Million consumers and 50+ Million retail merchants with autonomous, on-device zero-trust payment security.
            </p>
          </div>
          <div className="text-xs font-mono text-cyan-400">
            Live Prototype: aegispay-iqoo-hackathon.vercel.app
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full shadow-2xl p-6 md:p-8 space-y-6 flex flex-col justify-between min-h-[540px]">
        
        {/* Slide Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono font-bold tracking-wider">
              {slides[currentSlide].tag}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Slide {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer border transition ${
                isAutoPlaying 
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Repeat className={`w-3.5 h-3.5 ${isAutoPlaying ? 'animate-spin' : ''}`} />
              <span>{isAutoPlaying ? 'Loop: ON' : 'Auto Loop'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Body */}
        <div className="my-auto py-2">
          <h2 className="text-2xl font-black text-white tracking-tight mb-1">
            {slides[currentSlide].title}
          </h2>
          <p className="text-xs md:text-sm text-cyan-400 font-medium mb-5">
            {slides[currentSlide].subtitle}
          </p>

          <div>{slides[currentSlide].content}</div>
        </div>

        {/* Slide Navigation Controls */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <button
            onClick={prevSlide}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition cursor-pointer ${
                  currentSlide === i ? 'bg-cyan-400 w-6' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer bg-cyan-500 hover:bg-cyan-400 text-slate-950"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
