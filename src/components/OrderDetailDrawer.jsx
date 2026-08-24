import React, { useState } from 'react';
import { 
  X, CheckCircle2, Package, Truck, Clock, 
  User, CreditCard, ArrowRight, Printer, MapPin, 
  ShoppingBag, ExternalLink, ShieldCheck, ChevronRight
} from 'lucide-react';

export default function OrderDetailDrawer({ 
  order, 
  onClose, 
  onInspectCustomer, 
  onInspectTransaction 
}) {
  if (!order) return null;

  const [currentStep, setCurrentStep] = useState(order.fulfillmentStep || 3);

  const steps = [
    { label: "Order Placed", desc: "Digital/POS cart submitted" },
    { label: "Payment Confirmed", desc: "UPI/Card settled successfully" },
    { label: "Items Packed", desc: "Store counter batch ready" },
    { label: "Dispatched", desc: "Local rider or counter ready" },
    { label: "Delivered", desc: "Completed handover" }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 space-y-2.5 sm:space-y-3 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500">
                {order.id}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                order.paymentStatus === 'PAID'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {order.paymentStatus}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                order.fulfillmentStatus === 'FULFILLED'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : order.fulfillmentStatus === 'DISPATCHED'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : order.fulfillmentStatus === 'PROCESSING'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {order.fulfillmentStatus}
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
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tracking-tight">
              ₹{order.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
              <span>{order.date}</span>
              <span>•</span>
              <span>Channel: <strong className="text-slate-700 font-medium">{order.channel}</strong></span>
            </div>
          </div>
        </div>

        {/* Drawer Body Content */}
        <div className="p-4 sm:p-6 space-y-6 flex-1 overflow-y-auto text-xs">
          
          {/* Section 1: Interactive Fulfillment Progress Timeline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">
                Fulfillment Progress
              </span>
              <span className="text-[11px] font-mono text-blue-600 font-bold">
                Step {currentStep} of 5
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              {steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isDone = stepNum <= currentStep;
                const isCurrent = stepNum === currentStep;

                return (
                  <div key={idx} className="flex items-start gap-3 relative">
                    {idx < steps.length - 1 && (
                      <div className={`absolute left-3 top-6 bottom-0 w-0.5 -mb-2 ${
                        isDone && stepNum < currentStep ? 'bg-blue-600' : 'bg-slate-200'
                      }`} />
                    )}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 z-10 transition ${
                      isDone 
                        ? 'bg-blue-600 text-white shadow-xs' 
                        : 'bg-white border border-slate-300 text-slate-400'
                    }`}>
                      {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : stepNum}
                    </div>

                    <div className="flex-1 pb-2">
                      <div className={`font-semibold ${isCurrent ? 'text-blue-700 font-bold' : isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.label}
                      </div>
                      <div className="text-[11px] text-slate-500">{step.desc}</div>
                    </div>
                  </div>
                );
              })}

              {currentStep < 5 && (
                <button
                  onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
                  className="w-full mt-2 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Advance to Next Stage</span>
                </button>
              )}
            </div>
          </div>

          {/* Section 2: Itemized Products in Order */}
          <div className="space-y-2">
            <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">
              Ordered Line Items ({order.items?.length || 0})
            </span>
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
              {order.items?.map((item, idx) => (
                <div key={idx} className="p-3 bg-white flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-slate-900">{item.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      SKU: {item.sku} • Qty: {item.qty} × ₹{item.price?.toFixed(2)}
                    </div>
                  </div>
                  <div className="font-mono font-bold text-slate-900">
                    ₹{item.subtotal?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Customer & Payment Reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Customer Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Customer
                </span>
                {onInspectCustomer && (
                  <button 
                    onClick={() => onInspectCustomer(order.customerId)}
                    className="text-blue-600 hover:text-blue-700 text-[10px] font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>View CRM</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
              <div className="font-semibold text-slate-900">{order.customer}</div>
              <div className="text-[11px] text-slate-500 font-mono">{order.phone}</div>
              <div className="text-[11px] text-slate-500">{order.email}</div>
            </div>

            {/* Payment Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Payment Ref
                </span>
                {order.transactionId && onInspectTransaction && (
                  <button 
                    onClick={() => onInspectTransaction(order.transactionId)}
                    className="text-blue-600 hover:text-blue-700 text-[10px] font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
              <div className="font-semibold text-slate-900">{order.paymentMethod}</div>
              <div className="text-[11px] text-slate-500 font-mono">{order.transactionId || 'Cash/Manual'}</div>
              <div className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Zero Risk Chargeback</span>
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
            <span>Print Invoice</span>
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition cursor-pointer"
          >
            Close Order
          </button>
        </div>

      </div>
    </div>
  );
}
