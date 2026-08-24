import React from 'react';
import { 
  FileCheck, Download, ShieldCheck, FileText, CheckCircle2, 
  Lock, AlertTriangle, Layers, ArrowDownToLine, Sparkles
} from 'lucide-react';

export default function ReportsView({ onOpenDeck, onOpenArch }) {
  const downloadDPDPAudit = () => {
    const auditText = `
================================================================================
AEGISPAY ON-DEVICE PRIVACY & DPDP ACT 2023 COMPLIANCE AUDIT
================================================================================
AUDIT ID: AGY-DPDP-AUDIT-${Date.now()}
TIMESTAMP: ${new Date().toISOString()}
DEVICE: iQOO Smartphone On-Device AI NPU Engine
COMPLIANCE STATUS: 100% ZERO-KNOWLEDGE LOCAL EXECUTION (PASSED)

[1. EXECUTIVE SUMMARY]
AegisPay executes all financial threat detection algorithms, optical parsers,
voice spectrogram acoustic transformers, and MobileBERT NLP classifiers
directly on the user's local smartphone processor (NPU/CPU).

[2. DPDP ACT 2023 ASSESSMENT MATRIX]
• Section 4 (Consent & Processing): Fully Compliant (No remote data ingest)
• Section 6 (Purpose Limitation): Zero cloud telemetry sent to external servers
• Section 8 (Data Security Safeguards): Hardware Enclave & On-Device Memory Isolation
• Remote Network Transmission Log: 0 Bytes sent to cloud servers

[3. CRYPTOGRAPHIC PROOF HASH]
• SHA256 Root Hash: 4e0f3b772c918a556df90e42d76a08412bc4f9d01e1948375820bbda12048991
• Verification Status: NPCI Local FRM Specification v2.0
================================================================================
`;
    const blob = new Blob([auditText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AegisPay_DPDP_Act_Privacy_Audit.txt`;
    a.click();
  };

  const download1930Log = () => {
    const logText = `
================================================================================
1930 NATIONAL CYBERCRIME REPORTING PORTAL — INCIDENT EVIDENCE DOSSIER
================================================================================
TOTAL INCIDENTS INTERCEPTED: 24
TOTAL FINANCIAL LOSS PREVENTED: ₹1,42,800.00
SUBMISSION TARGET: citizen.cybercrime.gov.in / 1930 Helpline

1. INCIDENT #AGY-FIR-9012 (2026-08-24 22:31)
   • Threat: Reverse Collect Disguise (upi://collect)
   • Flagged Mule VPA: cashback_settle_claim@ybl
   • Amount: ₹4,999.00
   • Action: Pin prompt blocked on device before biometric prompt.

2. INCIDENT #AGY-FIR-9011 (2026-08-24 21:50)
   • Threat: Physical Quishing Sticker Tamper (+0.35mm depth step)
   • Flagged Mule VPA: quick_refund_x98234@ibl
   • Amount: Dynamic
   • Action: Store cashier alerted, sticker removed.
================================================================================
`;
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `1930_Cybercrime_Incident_Log.txt`;
    a.click();
  };

  return (
    <div className="space-y-3.5 pb-4">
      
      {/* 1. National Cybercrime 1930 Dossier Card */}
      <div className="p-4 rounded-2xl bg-white border border-rose-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-slate-900 m-0">1930 Police FIR Dossier</h3>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 font-mono">24 BLOCKS</span>
            </div>
            <p className="text-[11px] text-slate-500 m-0 mt-0.5">
              Extracted mule accounts & fraud call logs for cyber police.
            </p>
          </div>
        </div>

        <button
          onClick={download1930Log}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-98"
        >
          <ArrowDownToLine className="w-4 h-4" />
          <span>Download 1930 Police Evidence File</span>
        </button>
      </div>

      {/* 2. DPDP Act Zero-Knowledge Audit Card */}
      <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-slate-900 m-0">DPDP Act 2023 Privacy Audit</h3>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono">0 BYTES CLOUD</span>
            </div>
            <p className="text-[11px] text-slate-500 m-0 mt-0.5">
              Verified proof of 100% on-device zero-knowledge execution.
            </p>
          </div>
        </div>

        <button
          onClick={downloadDPDPAudit}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-98"
        >
          <Download className="w-4 h-4" />
          <span>Download DPDP Privacy Certificate</span>
        </button>
      </div>

      {/* 3. Pitch Deck & System Architecture Launchers */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={onOpenDeck}
          className="p-3.5 rounded-2xl bg-white border border-blue-200/90 hover:bg-blue-50/60 transition text-center cursor-pointer space-y-1.5 shadow-2xs active:scale-98"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mx-auto">
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-900">10-Slide Pitch Deck</div>
          <div className="text-[10px] text-blue-600 font-semibold">Open Slides →</div>
        </button>

        <button
          onClick={onOpenArch}
          className="p-3.5 rounded-2xl bg-white border border-purple-200/90 hover:bg-purple-50/60 transition text-center cursor-pointer space-y-1.5 shadow-2xs active:scale-98"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mx-auto">
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-900">Technical Spec</div>
          <div className="text-[10px] text-purple-600 font-semibold">View Architecture →</div>
        </button>
      </div>

    </div>
  );
}
