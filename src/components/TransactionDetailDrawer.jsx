import React from 'react';
import { 
  X, CheckCircle2, AlertTriangle, ShieldAlert, ShieldCheck, 
  CreditCard, ArrowRight, Printer, Download, Clock, User, 
  Building2, Hash, Terminal, FileText
} from 'lucide-react';

export default function TransactionDetailDrawer({ transaction, onClose }) {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/30 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-200 space-y-3 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500">
                {transaction.id}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                transaction.status === 'COMPLETED'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : transaction.status === 'UNDER_REVIEW'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : transaction.status === 'REFUNDED'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {transaction.status}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <div className="text-3xl font-bold text-slate-900 font-mono tracking-tight">
              ₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>{transaction.date}</span>
              <span>•</span>
              <span>UTR: <strong className="font-mono text-slate-700">{transaction.utr}</strong></span>
            </div>
          </div>
        </div>

        {/* Drawer Body Content */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto text-xs">
          
          {/* Section 1: Customer & Payment Details */}
          <div className="space-y-2.5">
            <div className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">
              Payment & Customer Details
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 font-medium">
              <div className="flex justify-between">
                <span className="text-slate-500">Customer Name:</span>
                <span className="text-slate-900 font-semibold">{transaction.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Phone:</span>
                <span className="text-slate-900 font-mono">{transaction.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Instrument:</span>
                <span className="text-slate-900 font-semibold">{transaction.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Terminal Location:</span>
                <span className="text-slate-900 font-mono">{transaction.terminalId}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Items Purchased */}
          <div className="space-y-2.5">
            <div className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">
              Items Purchased
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
              {transaction.items?.map((item, idx) => (
                <div key={idx} className="p-3 bg-white flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-slate-900">{item.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Qty: {item.qty}</div>
                  </div>
                  <div className="font-mono font-bold text-slate-900">
                    ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: On-Device AI Risk Assessment */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">
                On-Device Risk Diagnostics
              </div>
              <span className={`font-mono font-bold text-xs ${
                transaction.riskScore > 70 ? 'text-rose-600' : transaction.riskScore > 40 ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                Risk Score: {transaction.riskScore}/100
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Quishing Verification:</span>
                <span className="font-mono font-semibold text-slate-800">{transaction.riskDetails?.quishingCheck}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">VPA Entropy Status:</span>
                <span className="font-mono font-semibold text-slate-800">{transaction.riskDetails?.vpaEntropy}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Bank Settlement:</span>
                <span className="font-semibold text-emerald-700">{transaction.riskDetails?.settlementStatus}</span>
              </div>
            </div>
          </div>

          {/* Section 4: Transaction Lifecycle Timeline */}
          <div className="space-y-2.5">
            <div className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">
              Activity Lifecycle
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 font-medium text-slate-700">
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0"></div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">Payment Intent Initiated</div>
                  <div className="text-[10px] text-slate-500">{transaction.date}</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0"></div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">LiteRT On-Device Risk Scan Passed (8.2ms)</div>
                  <div className="text-[10px] text-slate-500">Verified zero entropy spoofing</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0"></div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">NPCI Clearing & Settlement Confirmation</div>
                  <div className="text-[10px] text-slate-500">UTR: {transaction.utr}</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center gap-2">
          <button 
            onClick={() => window.print()}
            className="flex-1 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition cursor-pointer"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
}
