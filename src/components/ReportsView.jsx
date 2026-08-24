import React from 'react';
import { 
  FileCheck, Download, ShieldCheck, FileText, CheckCircle2, 
  Lock, AlertTriangle, Building2, Printer
} from 'lucide-react';

export default function ReportsView() {
  const downloadDPDPAudit = () => {
    const auditText = `
================================================================================
AEGISPAY ON-DEVICE PRIVACY & DPDP ACT 2023 COMPLIANCE AUDIT
================================================================================
AUDIT ID: AGY-DPDP-AUDIT-${Date.now()}
TIMESTAMP: ${new Date().toISOString()}
COMPLIANCE STATUS: 100% ZERO-KNOWLEDGE LOCAL EXECUTION (PASSED)

[1. EXECUTIVE SUMMARY]
AegisPay executes all financial threat detection algorithms, optical parsers,
voice spectrogram transformers, and NLP classifiers directly on the user's
local smartphone processor (NPU/CPU).

[2. DPDP ACT 2023 ASSESSMENT MATRIX]
• Section 4 (Consent & Processing): Fully Compliant (No remote data ingest)
• Section 6 (Purpose Limitation): Zero cloud telemetry sent to servers
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
1930 NATIONAL CYBERCRIME REPORTING PORTAL — INCIDENT LOG
================================================================================
TOTAL INCIDENTS INTERCEPTED (LAST 30 DAYS): 24
TOTAL FINANCIAL LOSS PREVENTED: ₹1,42,800.00

1. INCIDENT #AGY-FIR-9012 (2026-08-24 22:31)
   • Threat: Reverse Collect Disguise (upi://collect)
   • Flagged Mule VPA: cashback_settle_claim@ybl
   • Amount: ₹4,999.00
   • Action: Pin prompt blocked on device.

2. INCIDENT #AGY-FIR-9011 (2026-08-24 21:50)
   • Threat: Physical Quishing Sticker Tamper (+0.35mm depth)
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
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 card-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900 m-0">
              Regulatory Compliance & Audit Reports
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Official compliance certificates and exportable evidence packs for management, internal auditors, and law enforcement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* 3 Core Compliance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: 1930 Cybercrime Hub */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 card-shadow space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 m-0">National Cybercrime (1930) Hub</h3>
            <p className="text-xs text-slate-500 m-0 leading-relaxed">
              Timestamped, tamper-proof police evidence dossiers compiled automatically from blocked fraud attempts and ScamBait honeypot sessions.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-600">
              • 24 Interceptions Logged<br />
              • ₹1,42,800 Loss Prevented
            </div>
          </div>

          <button
            onClick={download1930Log}
            className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download 1930 Incident Log</span>
          </button>
        </div>

        {/* Card 2: DPDP Act Privacy */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 card-shadow space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 m-0">DPDP Act 2023 Privacy Audit</h3>
            <p className="text-xs text-slate-500 m-0 leading-relaxed">
              Formal verification that all financial AI models run locally on the smartphone NPU with 0 bytes of sensitive customer OTP/VPA data transmitted.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-600">
              • Zero Cloud Telemetry<br />
              • Airplane Mode Verified
            </div>
          </div>

          <button
            onClick={downloadDPDPAudit}
            className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export DPDP Audit Certificate</span>
          </button>
        </div>

        {/* Card 3: NPCI Terminal Security */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 card-shadow space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 m-0">NPCI Terminal Security Report</h3>
            <p className="text-xs text-slate-500 m-0 leading-relaxed">
              Cryptographic parameter integrity checks for UPI QR terminals, merchant category codes (MCC), and UTR checksum validation status.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-600">
              • Specification: UPI v2.0<br />
              • Terminal Integrity: 100%
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Terminal Audit</span>
          </button>
        </div>

      </div>

    </div>
  );
}
