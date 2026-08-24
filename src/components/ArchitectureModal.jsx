import React from 'react';
import { X, Cpu, ShieldCheck, Zap, Lock, Database, ArrowRight } from 'lucide-react';

export default function ArchitectureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white m-0">AegisPay Technical Architecture</h2>
              <p className="text-xs text-slate-400 m-0">On-Device Edge AI Pipeline & Zero-Knowledge Privacy</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Tier Layer Diagram */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            System Ingress & Defense Layers
          </span>

          {/* Layer 1 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Layer 1: Hardware Stream & OS Interceptors
              </span>
              <span className="text-[10px] font-mono text-slate-500">Android Native / Flutter / PWA</span>
            </div>
            <p className="text-xs text-slate-300 m-0">
              Captures 60 FPS camera frames, intercepts incoming UPI intent links (<code className="text-cyan-300">upi://pay</code> & <code className="text-rose-300">upi://collect</code>), and monitors notification text/audio streams via Android Accessibility APIs.
            </p>
          </div>

          {/* Layer 2 */}
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> Layer 2: On-Device LiteRT & Quantized SLM Engine (Core)
              </span>
              <span className="text-[10px] font-mono text-cyan-400 font-bold">&lt; 14ms NPU Latency</span>
            </div>
            <p className="text-xs text-slate-300 m-0">
              Executes quantized MobileBERT (scam intent classifier), MobileNetV4 (screen tampering detector), and local high-entropy VPA heuristic scoring. Runs 100% offline with zero cloud server telemetry.
            </p>
          </div>

          {/* Layer 3 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Layer 3: Hardware Enclave & Haptic Lockdown
              </span>
              <span className="text-[10px] font-mono text-slate-500">Biometrics + Screen Shield</span>
            </div>
            <p className="text-xs text-slate-300 m-0">
              Draws emergency system-level overlay barrier over banking apps upon critical fraud detection, terminates screen-share permissions, and requires biometric confirmation to unblock.
            </p>
          </div>
        </div>

        {/* Latency & Privacy Benchmark Table */}
        <div>
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
            Performance & Compliance Benchmarks
          </span>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 px-3">Metric</th>
                  <th className="py-2 px-3">Cloud-Based Fraud APIs</th>
                  <th className="py-2 px-3 text-cyan-400 font-bold">AegisPay Edge AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr>
                  <td className="py-2.5 px-3 text-slate-300 font-sans">Detection Latency</td>
                  <td className="py-2.5 px-3 text-rose-400">850ms – 2,400ms</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">8.2ms – 14.8ms (Sub-frame)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-300 font-sans">Data Privacy</td>
                  <td className="py-2.5 px-3 text-rose-400">Transmits OTPs & VPAs to Cloud</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">100% Zero-Knowledge Local</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-300 font-sans">Offline Mode</td>
                  <td className="py-2.5 px-3 text-rose-400">Fails (Requires 4G/5G)</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Fully Functional Offline</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-300 font-sans">Memory Footprint</td>
                  <td className="py-2.5 px-3 text-slate-400">120MB+</td>
                  <td className="py-2.5 px-3 text-cyan-400 font-bold">~28MB (Quantized INT8)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow"
          >
            Close Architecture
          </button>
        </div>

      </div>
    </div>
  );
}
