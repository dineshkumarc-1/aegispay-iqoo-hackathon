import React from 'react';
import { 
  X, User, Phone, Mail, MapPin, Calendar, 
  ShoppingBag, ShieldCheck, CreditCard, ChevronRight, 
  TrendingUp, CheckCircle2, ArrowRight
} from 'lucide-react';
import { COMMERCE_ORDERS } from '../data/mockScenarios';

export default function CustomerDetailDrawer({ 
  customer, 
  onClose, 
  onInspectOrder 
}) {
  if (!customer) return null;

  // Filter orders by this customer
  const customerOrders = COMMERCE_ORDERS.filter(o => 
    o.customerId === customer.id || o.customer.toLowerCase() === customer.name.toLowerCase()
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 space-y-4 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-500">
              {customer.id}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-xs shrink-0">
              {customer.name?.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 m-0">{customer.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                  customer.status === 'ACTIVE'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {customer.status}
                </span>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                <span>{customer.city || 'India'}</span>
                <span>•</span>
                <span>Member since {customer.memberSince || '2024'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Body Content */}
        <div className="p-4 sm:p-6 space-y-6 flex-1 overflow-y-auto text-xs">
          
          {/* Section 1: Financial & Purchase KPI Strip */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Lifetime Spend</div>
              <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                ₹{customer.totalSpent?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Total Orders</div>
              <div className="text-base font-bold font-mono text-blue-600 mt-0.5">
                {customer.ordersCount}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Avg Order Value</div>
              <div className="text-base font-bold font-mono text-emerald-600 mt-0.5">
                ₹{customer.avgOrderValue ? customer.avgOrderValue.toFixed(0) : '380'}
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Payment Profile */}
          <div className="space-y-2">
            <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">
              Contact & Payment Profile
            </span>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 font-medium">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Mobile:</span>
                <span className="text-slate-900 font-mono">{customer.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email:</span>
                <span className="text-slate-900">{customer.email || 'aditi.sharma@gmail.com'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> Preferred Method:</span>
                <span className="text-slate-900 font-semibold">{customer.preferredMethod || 'UPI QR'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Trust Score:</span>
                <span className="text-blue-700 font-mono font-bold">{customer.trustScore}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Recent Order History */}
          <div className="space-y-2">
            <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">
              Recent Order History ({customerOrders.length})
            </span>

            {customerOrders.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-slate-400">
                No active orders recorded for this customer in current session.
              </div>
            ) : (
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                {customerOrders.map((ord) => (
                  <div 
                    key={ord.id}
                    onClick={() => onInspectOrder && onInspectOrder(ord)}
                    className="p-3 bg-white hover:bg-slate-50 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">{ord.id}</span>
                        <span className="text-[10px] text-slate-400">{ord.date}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {ord.itemsCount} items • {ord.channel}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-900">
                        ₹{ord.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center gap-2">
          <button 
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition cursor-pointer"
          >
            Close Customer Profile
          </button>
        </div>

      </div>
    </div>
  );
}
