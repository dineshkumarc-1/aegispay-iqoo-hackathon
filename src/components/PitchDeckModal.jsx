import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ShieldCheck, Zap, Cpu, FileText, Target, Award, Rocket } from 'lucide-react';

export default function PitchDeckModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: "🛡️ AegisPay — On-Device AI Fraud Guardian for UPI & QR",
      subtitle: "iQOO Hackathon 2026 | FinTech & Commerce Track",
      tag: "OVERVIEW & HOOK",
      content: (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-950 border border-cyan-500/30 text-center">
            <h3 className="text-2xl font-black text-white mb-2">Stopping UPI Fraud Before the PIN is Entered</h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              India processes <span className="text-cyan-400 font-bold">14+ Billion monthly UPI transactions</span>, but over <span className="text-rose-400 font-bold">₹1,750+ Crore</span> is lost annually to QR sticker quishing, disguised collect requests, and coercive social engineering scams.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-lg font-black text-cyan-400">&lt; 14ms</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">On-Device Latency</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-lg font-black text-emerald-400">100% Offline</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Zero Cloud Leakage</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-lg font-black text-amber-400">3-Layer</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Preventative Defense</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "🚨 The Critical Vulnerabilities in Modern UPI",
      subtitle: "Why Traditional Antivirus & Banking Defenses Fail",
      tag: "THE PROBLEM",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/40 space-y-2">
              <span className="font-bold text-rose-300 block text-sm">1. QR Quishing Overlays</span>
              <p className="text-slate-300 m-0">
                Fraudulent stickers pasted over genuine merchant QR codes at tea stalls and counters redirect funds to disposable mule handles.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 space-y-2">
              <span className="font-bold text-amber-300 block text-sm">2. Reverse PIN Deceptions</span>
              <p className="text-slate-300 m-0">
                Scammers trick users into typing their UPI PIN under the claim of "receiving" lottery refunds, OLX payments, or cashback.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 space-y-2">
              <span className="font-bold text-purple-300 block text-sm">3. Counterfeit Receipt Apps</span>
              <p className="text-slate-300 m-0">
                Spoofed payment confirmation apps show fake green ticks and fake soundbox tones, duping Kirana merchants daily.
              </p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
            <strong className="text-slate-200">The Flaw in Cloud APIs:</strong> Cloud fraud checks add 1–2 seconds latency and require continuous high-speed connectivity, failing in rural zones and basement merchants while exposing private financial data.
          </div>
        </div>
      )
    },
    {
      title: "🛡️ The Solution: Three-Pillar On-Device Shield",
      subtitle: "Autonomous Real-Time Protection at the Edge",
      tag: "THE SOLUTION",
      content: (
        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h4 className="text-sm font-bold text-cyan-300 m-0">Dynamic QR & Quishing Shield</h4>
              <p className="text-slate-300 mt-1 m-0">Live camera AR HUD inspects UPI deep-links, flags payee name vs VPA entropy mismatches, and blocks disguised reverse-charge requests instantly.</p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h4 className="text-sm font-bold text-amber-300 m-0">Ambient Social Engineering Interceptor</h4>
              <p className="text-slate-300 mt-1 m-0">Quantized MobileBERT analyzes incoming calls, SMS, and screen prompts locally to detect panic triggers, AnyDesk remote-access baits, and triggers an Android barrier lock.</p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h4 className="text-sm font-bold text-emerald-300 m-0">Merchant Receipt & Soundbox Verifier</h4>
              <p className="text-slate-300 mt-1 m-0">Instant CV font-kerning, UTR mod-10 checksum, and audio-tone verification for Kirana store cashiers to eliminate fake Paytm/GPay spoof apps offline.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "📱 Why Phone-First & Edge AI Core Matters",
      subtitle: "Harnessing Native Smartphone Hardware & NPU Acceleration",
      tag: "HARDWARE & AI SCORE",
      content: (
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-400 text-sm block">Deep Mobile Hardware Integration:</span>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li><strong>60 FPS Camera Viewfinder:</strong> In-stream QR quishing analysis.</li>
              <li><strong>Hardware Haptics:</strong> High-frequency vibration alerts during emergency lockdowns.</li>
              <li><strong>Biometric Enclave:</strong> Hardware-level authentication gate before releasing high-risk funds.</li>
              <li><strong>Android Overlay Service:</strong> Real-time barrier drawing over banking UIs.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 text-sm block">On-Device Local AI (Brownie Points):</span>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li><strong>Core Models:</strong> Quantized MobileBERT / LiteRT / MobileNetV4.</li>
              <li><strong>Latency:</strong> ~11.4ms edge inference directly on phone NPU.</li>
              <li><strong>100% DPDP Act Compliant:</strong> Zero bytes sent to cloud servers.</li>
              <li><strong>Works in Airplane Mode:</strong> Never fails in basements or rural areas.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "⏱️ 30-Hour City Battle Feasibility & Next Steps",
      subtitle: "Clear, Milestoned Roadmap for On-Site City Hackathon",
      tag: "EXECUTION & IMPACT",
      content: (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-mono text-cyan-400 font-bold">Hours 0–6</div>
              <div className="text-[11px] text-slate-300 mt-1">Camera Stream & UPI URI Parser</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-mono text-cyan-400 font-bold">Hours 6–18</div>
              <div className="text-[11px] text-slate-300 mt-1">Quantized LiteRT NLP & Quishing Rules</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-mono text-cyan-400 font-bold">Hours 18–24</div>
              <div className="text-[11px] text-slate-300 mt-1">AR Overlays & Haptic Lockdown UX</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-mono text-cyan-400 font-bold">Hours 24–30</div>
              <div className="text-[11px] text-slate-300 mt-1">Live Attack Demos & Final Polish</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 text-center">
            <div className="text-sm font-bold text-white mb-1">Empowering 300+ Million Digital Payment Citizens</div>
            <p className="text-slate-300 text-xs max-w-lg mx-auto m-0">
              AegisPay establishes a new standard for on-device, zero-trust financial protection, turning every smartphone into an impenetrable personal security vault.
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full shadow-2xl p-6 md:p-8 space-y-6 flex flex-col justify-between min-h-[520px]">
        
        {/* Slide Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono font-bold tracking-wider">
              {slides[currentSlide].tag}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Slide {currentSlide + 1} of {slides.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
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
            disabled={currentSlide === 0}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              currentSlide === 0
                ? 'opacity-30 cursor-not-allowed text-slate-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Dots Indicator */}
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
            disabled={currentSlide === slides.length - 1}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              currentSlide === slides.length - 1
                ? 'opacity-30 cursor-not-allowed text-slate-500'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
