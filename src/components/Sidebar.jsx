import React from 'react';
import { 
  LayoutDashboard, CreditCard, ArrowLeftRight, ShoppingBag, 
  Package, Users, Warehouse, ShieldAlert, QrCode, Waves, 
  MessageSquareWarning, Bot, Receipt, FileCheck, ChevronDown, 
  Building2, Sparkles, ShieldCheck, CheckCircle2, AlertTriangle
} from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView, riskAlertsCount = 4 }) {
  
  const navSections = [
    {
      title: "Overview",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard }
      ]
    },
    {
      title: "Commerce",
      items: [
        { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
        { id: "payments", label: "Payments & Settlements", icon: CreditCard },
        { id: "orders", label: "Orders", icon: ShoppingBag, badge: "5 new" },
        { id: "products", label: "Products", icon: Package },
        { id: "customers", label: "Customers", icon: Users },
        { id: "inventory", label: "Inventory", icon: Warehouse, badgeColor: "amber", badge: "2 low" }
      ]
    },
    {
      title: "Risk & Security",
      items: [
        { id: "risk-hub", label: "Risk Overview", icon: ShieldAlert, badge: `${riskAlertsCount}`, badgeColor: "rose" },
        { id: "qr-shield", label: "QR & Ingress Shield", icon: QrCode },
        { id: "deepfake-voice", label: "Voice & Call Risk", icon: Waves },
        { id: "social-eng", label: "Intent Interceptor", icon: MessageSquareWarning },
        { id: "scambait", label: "ScamBait Forensics", icon: Bot },
        { id: "receipt-guard", label: "Kirana Settlement", icon: Receipt }
      ]
    },
    {
      title: "Management",
      items: [
        { id: "reports", label: "Reports & Compliance", icon: FileCheck }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none overflow-y-auto">
      
      {/* Top Header: Brand + Store Switcher */}
      <div className="p-4 border-b border-slate-200 space-y-3">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm ring-1 ring-blue-700/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 tracking-tight text-base">Aegis<span className="text-blue-600">Pay</span></span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Commerce
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">FinTech & Retail Suite</p>
          </div>
        </div>

        {/* Store Selector Pill */}
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-900 truncate max-w-[130px]">Sharma Retail Store</div>
              <div className="text-[10px] text-slate-500 font-mono">Terminal #BLR-04</div>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="p-3 space-y-6 flex-1 overflow-y-auto">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {section.title}
            </div>
            <div className="space-y-0.5 pt-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono ${
                        item.badgeColor === 'rose'
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : item.badgeColor === 'amber'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Status / NPU Sentinel Card */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/50">
        <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-800">LiteRT NPU Core</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">11.4ms</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-tight m-0">
            100% Offline Edge SLM Active. Zero cloud data leaks.
          </p>
        </div>
      </div>

    </aside>
  );
}
