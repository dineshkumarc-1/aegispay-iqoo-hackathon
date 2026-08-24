import React from 'react';
import { 
  Search, Bell, FileText, Layers, ShieldCheck, 
  Cpu, Menu, User, CheckCircle2, ChevronRight
} from 'lucide-react';

export default function Header({ 
  currentView, 
  onOpenDeck, 
  onOpenArch,
  onOpenMobileMenu,
  riskAlertsCount = 4
}) {

  const viewTitles = {
    dashboard: { title: "Executive Dashboard", desc: "Overview of merchant revenue, UPI settlement activity, and on-device risk telemetry." },
    transactions: { title: "Transactions Ledger", desc: "Inspect and manage real-time retail commerce and UPI payments with on-device risk scores." },
    payments: { title: "Payments & Settlements", desc: "Settlement timelines, payment gateway volume, and merchant bank account payouts." },
    orders: { title: "Retail Orders", desc: "Manage in-store and digital customer orders across all payment channels." },
    products: { title: "Product Catalog", desc: "Manage inventory SKUs, price points, and retail stock availability." },
    customers: { title: "Customer Profiles", desc: "Verified customer transaction histories, lifetime value, and trust ratings." },
    inventory: { title: "Inventory Management", desc: "Track stock levels, reorder thresholds, and low-stock alerts." },
    "risk-hub": { title: "Risk & Security Intelligence", desc: "Unified on-device threat terminal monitoring quishing, deepfake voice clones, and fraud attempts." },
    "qr-shield": { title: "3D AR QR & Ingress Shield", desc: "60 FPS optical parallax depth inspection & NPCI UPI URI parameter parser." },
    "deepfake-voice": { title: "AI Deepfake Voice Detector", desc: "On-device Mel-Spectrogram acoustic analyzer detecting synthetic voice clones during calls." },
    "social-eng": { title: "Inbound Intent Interceptor", desc: "MobileBERT quantized NLP model scanning urgency manipulation and remote-access traps." },
    "scambait": { title: "ScamBait AI Honeypot & 1930 Hub", desc: "Autonomous AI persona that stalls fraudsters, extracts mule VPAs, and auto-files 1930 FIRs." },
    "receipt-guard": { title: "Kirana Settlement Verifier", desc: "Computer vision font kerning, Luhn mod-10 UTR checksum, and acoustic soundbox validator." },
    reports: { title: "Compliance & Audit Reports", desc: "Exportable 1930 Cybercrime evidence files, DPDP Act zero-knowledge audits, and transaction summaries." }
  };

  const currentMeta = viewTitles[currentView] || viewTitles.dashboard;

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 sticky top-0 z-30 flex items-center justify-between gap-3">
      
      {/* Left: Mobile Menu Trigger + Dynamic Page Title */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer shrink-0"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight m-0 truncate">
              {currentMeta.title}
            </h1>
            <span className="hidden sm:inline-block text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
              Live
            </span>
          </div>
          <p className="hidden md:block text-xs text-slate-500 font-normal m-0 mt-0.5 truncate max-w-xl">
            {currentMeta.desc}
          </p>
        </div>
      </div>

      {/* Right: Actions, NPU Badge & Modals */}
      <div className="flex items-center gap-2 shrink-0">
        
        {/* Global Search Input (Desktop) */}
        <div className="relative hidden xl:block">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search transactions, customers..."
            className="w-56 pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition"
          />
        </div>

        {/* NPU Edge AI Indicator (Tablet / Desktop) */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="truncate">NPU: <strong className="font-mono">11.4ms</strong></span>
        </div>

        {/* Pitch Deck Button */}
        <button
          onClick={onOpenDeck}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition cursor-pointer shadow-xs"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Pitch Deck</span>
        </button>

        {/* Architecture Modal Button */}
        <button
          onClick={onOpenArch}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Architecture</span>
        </button>

        {/* User Profile Avatar */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">
          SK
        </div>

      </div>

    </header>
  );
}
