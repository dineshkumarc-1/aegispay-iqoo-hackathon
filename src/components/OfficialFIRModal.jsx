import React, { useState } from 'react';
import { 
  X, Printer, Download, Copy, Check, ShieldAlert, 
  FileText, Building2, CheckCircle2, Lock, ShieldCheck, Scale, 
  Hash, ExternalLink, Calendar, MapPin
} from 'lucide-react';

export default function OfficialFIRModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const firDetails = {
    acknowledgementNo: "NCRP-CFCFRMS-2026-IND-894210",
    state: "Karnataka",
    district: "Bengaluru City Police - Cyber Crime Division",
    psLimit: "Cyber Economic & Narcotics Crimes (CEN) Police Station, Bengaluru South",
    dateTime: "24-Aug-2026 22:45:12 IST",
    incidentDate: "24-Aug-2026 22:31:00 IST",
    complainant: {
      name: "Dinesh Kumar (Merchant)",
      store: "Sharma Kirana & Retail Store (Terminal #BLR-04)",
      phone: "+91 98450 12384",
      vpa: "sharmachai@okhdfcbank",
      location: "Shop #14, 100ft Ring Road, Indiranagar, Bengaluru - 560038",
      geoCoords: "12.9716° N, 77.5946° E"
    },
    suspects: [
      {
        id: "SUSPECT_01",
        category: "Physical Quishing & Counter QR Replacement",
        vpa: "quick_refund_x98234@ibl",
        linkedAccount: "30918239012 (State Bank of India - Jamtara Branch)",
        ifsc: "SBIN0001248",
        muleName: "Rohan Mondal (Mule Account Holder)",
        phone: "+91 98765 43210",
        attemptedAmount: "₹14,500.00 (Aggregated Volume)",
        forensicProof: "3D Parallax Optical Depth Sensor detected +0.35mm physical paper elevation overlaid upon merchant acrylic stand."
      },
      {
        id: "SUSPECT_02",
        category: "Deceptive Reverse Collect Disguise (upi://collect)",
        vpa: "cashback_settle_claim@ybl",
        linkedAccount: "5010048192301 (HDFC Bank - Bharatpur Branch)",
        ifsc: "HDFC0000492",
        muleName: "Deepak Saini (Mule Account Holder)",
        phone: "+91 88771 99201",
        attemptedAmount: "₹4,999.00",
        forensicProof: "Injected 'upi://collect' URI disguised as reward voucher with note 'Enter PIN To Credit Refund' — blocked before biometric prompt."
      },
      {
        id: "SUSPECT_03",
        category: "AI Deepfake Voice Clone & Coercive Extortion",
        callerId: "+91 97401 22819",
        spoofedEntity: "BESCOM Discom Senior Engineer / Police Sub-Inspector",
        attemptedAmount: "₹25,000.00",
        forensicProof: "Mel-Spectrogram Acoustic Transformer detected 120Hz vocoder synthesis artifact with 98.4% synthetic clone confidence."
      }
    ],
    legalSections: [
      { code: "Section 66D, IT Act 2000", desc: "Cheating by personation by using computer resource (Punishment: Imprisonment up to 3 years & fine up to ₹1 Lakh)" },
      { code: "Section 66C, IT Act 2000", desc: "Identity theft & fraudulent use of electronic signature / UPI credentials" },
      { code: "Section 43, IT Act 2000", desc: "Unauthorized extraction and tampering of merchant point-of-sale data" },
      { code: "Section 318(4), BNS 2023", desc: "Cheating and dishonestly inducing delivery of property (formerly IPC 420)" },
      { code: "Section 316(2), BNS 2023", desc: "Criminal breach of trust (formerly IPC 406)" }
    ],
    sha256EvidenceHash: "4e0f3b772c918a556df90e42d76a08412bc4f9d01e1948375820bbda12048991"
  };

  const fullFIRText = `
====================================================================================================
GOVERNMENT OF INDIA • MINISTRY OF HOME AFFAIRS (MHA)
NATIONAL CYBER CRIME REPORTING PORTAL (NCRP) • 1930 CYBERCRIME HELPLINE
OFFICIAL FIRST INFORMATION REPORT (FIR) EVIDENCE DOSSIER
====================================================================================================
ACKNOWLEDGEMENT NO    : ${firDetails.acknowledgementNo}
PORTAL REF            : citizen.cybercrime.gov.in / CFCFRMS-1930
DATE & TIME FILED     : ${firDetails.dateTime}
INCIDENT TIMESTAMP    : ${firDetails.incidentDate}
JURISDICTION POLICE   : ${firDetails.district}
POLICE STATION LIMIT  : ${firDetails.psLimit}

----------------------------------------------------------------------------------------------------
1. COMPLAINANT / VICTIM INFORMATION (REGISTERED MERCHANT)
----------------------------------------------------------------------------------------------------
• Full Legal Name       : ${firDetails.complainant.name}
• Commercial Enterprise : ${firDetails.complainant.store}
• Contact Mobile Number : ${firDetails.complainant.phone}
• Official UPI VPA      : ${firDetails.complainant.vpa}
• Physical Location     : ${firDetails.complainant.location}
• GPS Geo-Coordinates   : ${firDetails.complainant.geoCoords}

----------------------------------------------------------------------------------------------------
2. RELEVANT LEGAL STATUTES & CHARGES APPLIED
----------------------------------------------------------------------------------------------------
1. Section 66D, Information Technology Act 2000 — Cheating by personation using computer resource.
2. Section 66C, Information Technology Act 2000 — Identity theft and fraudulent UPI manipulation.
3. Section 43, Information Technology Act 2000 — Unauthorized physical & electronic terminal alteration.
4. Section 318(4), Bharatiya Nyaya Sanhita 2023 (formerly IPC Section 420) — Cheating & fraud.
5. Section 316(2), Bharatiya Nyaya Sanhita 2023 (formerly IPC Section 406) — Criminal breach of trust.

----------------------------------------------------------------------------------------------------
3. FORENSIC EVIDENCE & SUSPECT MULE ACCOUNT DETAILS
----------------------------------------------------------------------------------------------------
[INCIDENT 01 - PHYSICAL QR QUISHING & STICKER TAMPERING]
• Suspect Payee VPA       : ${firDetails.suspects[0].vpa}
• Beneficiary Bank Account : ${firDetails.suspects[0].linkedAccount}
• Bank Branch & IFSC Code  : ${firDetails.suspects[0].ifsc}
• Identified Mule Name    : ${firDetails.suspects[0].muleName}
• Suspect Contact Phone   : ${firDetails.suspects[0].phone}
• Attempted Siphoning Amt : ${firDetails.suspects[0].attemptedAmount}
• Physical Forensic Proof : ${firDetails.suspects[0].forensicProof}

[INCIDENT 02 - REVERSE COLLECT DISGUISE & PIN FRAUD]
• Suspect Payee VPA       : ${firDetails.suspects[1].vpa}
• Beneficiary Bank Account : ${firDetails.suspects[1].linkedAccount}
• Bank Branch & IFSC Code  : ${firDetails.suspects[1].ifsc}
• Identified Mule Name    : ${firDetails.suspects[1].muleName}
• Suspect Contact Phone   : ${firDetails.suspects[1].phone}
• Attempted Debit Amount  : ${firDetails.suspects[1].attemptedAmount}
• Technical Protocol Flag : ${firDetails.suspects[1].forensicProof}

[INCIDENT 03 - AI DEEPFAKE VOICE CLONE EXTORTION]
• Suspect Originating Call: ${firDetails.suspects[2].callerId}
• Spoofed Persona Display : ${firDetails.suspects[2].spoofedEntity}
• Coercive Extortion Amt  : ${firDetails.suspects[2].attemptedAmount}
• Acoustic NPU Forensics  : ${firDetails.suspects[2].forensicProof}

----------------------------------------------------------------------------------------------------
4. MANDATORY FREEZE & LIEN DIRECTIVE REQUEST (RULE 3, CFCFRMS)
----------------------------------------------------------------------------------------------------
It is urgently requested to the Cyber Crime Police Station and NPCI / Bank Nodal Officers to:
1. Immediately place an urgent debit freeze / lien on SBI A/c ${firDetails.suspects[0].linkedAccount} (IFSC: ${firDetails.suspects[0].ifsc})
2. Immediately place an urgent debit freeze / lien on HDFC A/c ${firDetails.suspects[1].linkedAccount} (IFSC: ${firDetails.suspects[1].ifsc})
3. Blacklist and decommission UPI Handles: quick_refund_x98234@ibl and cashback_settle_claim@ybl across all banking switch nodes.

----------------------------------------------------------------------------------------------------
5. CERTIFICATE UNDER SECTION 65B(4) INDIAN EVIDENCE ACT / SECTION 63 BSA 2023
----------------------------------------------------------------------------------------------------
I hereby certify that the electronic records contained in this dossier are authentic, tamper-evident
logs captured in real time by the AegisPay On-Device LiteRT NPU Security Engine running on device
operating system without cloud transmission, and the SHA-256 hash verified below guarantees data integrity.

• SHA-256 Cryptographic Digest: ${firDetails.sha256EvidenceHash}
• Verification Authority       : AegisPay On-Device Forensic Daemon v2.4 (NPCI FRM Compliant)
====================================================================================================
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullFIRText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([fullFIRText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Official_1930_Cybercrime_FIR_${firDetails.acknowledgementNo}.txt`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      
      {/* Modal Container */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between border-b border-slate-700 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center text-white font-bold shadow-md shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight m-0">
                  Official 1930 Cybercrime Police FIR Evidence Dossier
                </h2>
                <span className="text-[10px] font-mono bg-rose-500/30 text-rose-300 border border-rose-400/40 px-2 py-0.5 rounded-full font-bold">
                  LEGAL ADMISSIBLE
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-mono m-0 mt-0.5">
                Ack No: <strong className="text-amber-400">{firDetails.acknowledgementNo}</strong> • Section 65B Certified
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Document Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs text-slate-800 font-sans leading-relaxed bg-slate-50/40">
          
          {/* Official Government NCRP Header Badge */}
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-800 shadow-xs space-y-3 text-center">
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-mono">
                Government of India • Ministry of Home Affairs (MHA)
              </div>
              <div className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                NATIONAL CYBER CRIME REPORTING PORTAL (NCRP) • 1930 HELPLINE
              </div>
              <div className="text-xs font-bold text-rose-700 font-mono">
                CITIZEN FINANCIAL CYBER FRAUD REPORTING & MANAGEMENT SYSTEM (CFCFRMS)
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-left font-mono">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Acknowledgement</span>
                <strong className="text-slate-900 truncate block text-[10px]">{firDetails.acknowledgementNo}</strong>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Jurisdiction</span>
                <strong className="text-slate-900 truncate block text-[10px]">Bengaluru City Police</strong>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Timestamp (IST)</span>
                <strong className="text-slate-900 truncate block text-[10px]">{firDetails.dateTime}</strong>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Evidence Status</span>
                <strong className="text-emerald-700 truncate block text-[10px]">Sec 65B Certified ✓</strong>
              </div>
            </div>
          </div>

          {/* Section 1: Complainant Information */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 uppercase text-[11px] tracking-wider text-blue-700 border-b border-slate-100 pb-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>1. Complainant & Commercial Enterprise Record</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
              <div>
                <span className="text-slate-400 block text-[10px]">Victim / Merchant Name:</span>
                <strong className="text-slate-900 font-semibold">{firDetails.complainant.name}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Store Enterprise:</span>
                <strong className="text-slate-900 font-semibold">{firDetails.complainant.store}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Contact Mobile:</span>
                <strong className="text-slate-900 font-mono">{firDetails.complainant.phone}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Official Merchant VPA:</span>
                <strong className="text-blue-700 font-mono">{firDetails.complainant.vpa}</strong>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 block text-[10px]">Physical Store Location & Coordinates:</span>
                <span className="text-slate-800">{firDetails.complainant.location} (GPS: <strong className="font-mono">{firDetails.complainant.geoCoords}</strong>)</span>
              </div>
            </div>
          </div>

          {/* Section 2: Legal Statutes & Criminal Charges */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 uppercase text-[11px] tracking-wider text-rose-700 border-b border-slate-100 pb-2">
              <Scale className="w-4 h-4 text-rose-600" />
              <span>2. Applicable Legal Charges & Offense Sections</span>
            </div>
            <div className="space-y-2">
              {firDetails.legalSections.map((sec, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-slate-900 text-xs font-mono">{sec.code}</div>
                    <div className="text-[11px] text-slate-600">{sec.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Extracted Forensic Evidence & Mule Accounts */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 uppercase text-[11px] tracking-wider text-amber-700 border-b border-slate-100 pb-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>3. Suspect Profiles & Forensic Evidence Log</span>
            </div>
            
            <div className="space-y-3">
              {firDetails.suspects.map((suspect, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900 text-xs font-mono">
                      [THREAT {idx + 1}] {suspect.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                      Loss Prevented: {suspect.attemptedAmount}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                    {suspect.vpa && (
                      <div>
                        <span className="text-slate-500 block text-[10px]">Flagged Mule VPA:</span>
                        <strong className="text-rose-700 font-mono font-bold">{suspect.vpa}</strong>
                      </div>
                    )}
                    {suspect.linkedAccount && (
                      <div>
                        <span className="text-slate-500 block text-[10px]">Mule Bank Account & IFSC:</span>
                        <strong className="text-slate-900 font-mono">{suspect.linkedAccount} ({suspect.ifsc})</strong>
                      </div>
                    )}
                    {suspect.muleName && (
                      <div>
                        <span className="text-slate-500 block text-[10px]">Identified Mule Name:</span>
                        <strong className="text-slate-900">{suspect.muleName}</strong>
                      </div>
                    )}
                    {suspect.phone && (
                      <div>
                        <span className="text-slate-500 block text-[10px]">Suspect Originating Phone:</span>
                        <strong className="text-slate-900 font-mono">{suspect.phone}</strong>
                      </div>
                    )}
                  </div>

                  <div className="p-2 rounded-lg bg-white border border-amber-200 text-[11px] text-amber-900">
                    <span className="font-bold text-slate-800">🔬 Technical Forensic Proof: </span>
                    <span>{suspect.forensicProof}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Urgent Account Debit Freeze Directive Request */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 text-rose-950">
            <div className="font-bold text-rose-900 uppercase text-[11px] tracking-wider flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-rose-700" />
              <span>4. Mandatory Urgent Debit Freeze / Lien Request (Rule 3 CFCFRMS)</span>
            </div>
            <p className="text-[11px] leading-relaxed m-0">
              Immediate debit lien and account freeze is hereby requested to the <strong>State Bank of India (IFSC: SBIN0001248)</strong> and <strong>HDFC Bank (IFSC: HDFC0000492)</strong> Nodal Cyber Officers for suspect mule accounts <strong>30918239012</strong> and <strong>5010048192301</strong> under Section 91 CrPC / Section 94 BNSS 2023.
            </p>
          </div>

          {/* Section 5: Section 65B Electronic Evidence Admissibility Certificate */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-emerald-950">
            <div className="font-bold text-emerald-900 uppercase text-[11px] tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>5. Certificate under Section 65B(4) Evidence Act / Section 63 BSA 2023</span>
            </div>
            <p className="text-[11px] leading-relaxed m-0 text-emerald-900">
              This is to certify that the digital evidence in this dossier was collected in real time by the AegisPay On-Device LiteRT NPU engine running in secure memory with zero remote transmission. The cryptographic SHA-256 integrity hash guarantees uncompromised digital evidence chain of custody.
            </p>
            <div className="p-2 rounded-lg bg-white border border-emerald-300 font-mono text-[10px] text-emerald-950 break-all">
              <span className="font-bold text-slate-700 block text-[9px] uppercase">SHA-256 Digital Signature:</span>
              {firDetails.sha256EvidenceHash}
            </div>
          </div>

        </div>

        {/* Modal Action Buttons Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-slate-600 font-medium hidden sm:inline">
              Ready for submission at <strong className="text-slate-900">cybercrime.gov.in</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy FIR Text'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-xs active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official .TXT Dossier</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-xs active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official PDF</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
