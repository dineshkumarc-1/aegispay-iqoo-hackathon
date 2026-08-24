import React from 'react';
import { 
  Search, Bell, FileText, Layers, ShieldCheck, 
  Cpu, Menu, User, CheckCircle2, ChevronRight, Sparkles
} from 'lucide-react';

export default function Header({ 
  currentView, 
  onOpenDeck, 
  onOpenArch,
  onOpenMobileMenu,
  onOpenSearch,
  onToggleNotifications,
  unreadNotificationsCount = 2,
  riskAlertsCount = 4
}) {

  const viewTitles = {
    dashboard: { title: "Executive Dashboard", desc: "Overview of merchant revenue, UPI settlement activity, and on-device risk telemetry." },
    transactions: { title: "Transactions Ledger", desc: "Inspect and manage real-time retail commerce and UPI payments with on-device risk scores." },
    payments: { title: "Settlements & Payouts", desc: "Settlement timelines, payment gateway volume, and merchant bank account payouts." },
    refunds: { title: "Refunds & Claims", desc: "Manage transaction reversals, dispute resolution, and surcharge adjustments." },
    orders: { title: "Retail Orders", desc: "Manage in-store and digital customer orders across all payment channels." },
    products: { title: "Product Catalog", desc: "Manage inventory SKUs, price points, and retail stock availability." },
    customers: { title: "Customer Profiles", desc: "Verified customer transaction histories, lifetime value, and trust ratings." },
    inventory: { title: "Inventory Management", desc: "Track stock levels, reorder thresholds, and low-stock alerts." },
    analytics: { title: "Financial & Commerce Analytics", desc: "Deep dive into gross volume velocity, payment channel performance, and risk protection ROI." },
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
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 sm:py-3 sticky top-0 z-30 flex items-center justify-between gap-3">
      
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
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight m-0 truncate">
              {currentMeta.title}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live • 8s ago</span>
            </span>
          </div>
          <p className="hidden md:block text-xs text-slate-500 font-normal m-0 mt-0.5 truncate max-w-xl">
            {currentMeta.desc}
          </p>
        </div>
      </div>

      {/* Right: Actions, Global Search Trigger, Notifications & Modals */}
      <div className="flex items-center gap-2 shrink-0">
        
        {/* Global Command Palette Search Trigger Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-500 hover:text-slate-900 transition cursor-pointer shadow-xs"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Search everything...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-400">
            ⌘K
          </kbd>
        </button>

        {/* Notifications Bell Trigger */}
        <button
          onClick={onToggleNotifications}
          className="relative p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition cursor-pointer shadow-xs"
          aria-label="View Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white rounded-full text-[9px] font-mono font-bold flex items-center justify-center">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* NPU Edge AI Indicator (Desktop) */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>NPU: <strong className="font-mono">11.4ms</strong></span>
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

      </div>

    </header>
  );
}
