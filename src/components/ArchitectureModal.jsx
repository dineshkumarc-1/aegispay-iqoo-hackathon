import React from 'react';
import { X, Cpu, ShieldCheck, Zap, Lock, Database, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ArchitectureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 m-0">AegisPay Technical Architecture</h2>
              <p className="text-xs text-slate-500 m-0">On-Device Edge AI Pipeline & DPDP Act Zero-Knowledge Privacy</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Tier Layer Diagram */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            System Ingress & Defense Layers
          </span>

          {/* Layer 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-700 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-600" /> Layer 1: Hardware Stream & OS Interceptors
              </span>
              <span className="text-[10px] font-mono text-slate-400">Android Native / Flutter / PWA</span>
            </div>
            <p className="text-xs text-slate-600 m-0">
              Captures 60 FPS camera frames, intercepts incoming UPI intent links (<code className="text-blue-600 font-mono">upi://pay</code> & <code className="text-rose-600 font-mono">upi://collect</code>), and monitors notification text/audio streams via Android Accessibility APIs.
            </p>
          </div>

          {/* Layer 2 */}
          <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-900 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-600" /> Layer 2: On-Device LiteRT & Quantized SLM Engine (Core)
              </span>
              <span className="text-[10px] font-mono text-blue-700 font-bold">&lt; 12ms NPU Latency</span>
            </div>
            <p className="text-xs text-slate-700 m-0">
              Executes quantized MobileBERT (scam intent classifier), Mel-Spectrogram transformer (deepfake audio), and local high-entropy VPA heuristic scoring. Runs 100% offline with zero cloud server telemetry.
            </p>
          </div>

          {/* Layer 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Layer 3: Hardware Enclave & Haptic Lockdown
              </span>
              <span className="text-[10px] font-mono text-slate-400">Biometrics + Screen Shield</span>
            </div>
            <p className="text-xs text-slate-600 m-0">
              Draws emergency system-level overlay barrier over banking apps upon critical fraud detection, terminates screen-share permissions, and requires biometric confirmation to unblock.
            </p>
          </div>
        </div>

        {/* Latency & Privacy Benchmark Table */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Performance & Compliance Benchmarks
          </span>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold">
                  <th className="py-2.5 px-3">Metric</th>
                  <th className="py-2.5 px-3">Cloud-Based Fraud APIs</th>
                  <th className="py-2.5 px-3 text-blue-700 font-bold">AegisPay Edge AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr>
                  <td className="py-2.5 px-3 text-slate-700 font-sans">Detection Latency</td>
                  <td className="py-2.5 px-3 text-rose-600">850ms – 2,400ms</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">8.2ms – 11.4ms (Sub-frame)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-700 font-sans">Data Privacy</td>
                  <td className="py-2.5 px-3 text-rose-600">Transmits OTPs & VPAs to Cloud</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">100% Zero-Knowledge Local</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-700 font-sans">Offline Mode</td>
                  <td className="py-2.5 px-3 text-rose-600">Fails (Requires 4G/5G)</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">Fully Functional Offline</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-700 font-sans">Memory Footprint</td>
                  <td className="py-2.5 px-3 text-slate-500">120MB+</td>
                  <td className="py-2.5 px-3 text-blue-700 font-bold">~18MB (Quantized INT8)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs"
          >
            Close Architecture
          </button>
        </div>

      </div>
    </div>
  );
}
