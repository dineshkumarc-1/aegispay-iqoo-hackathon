import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, CreditCard, 
  ShoppingBag, ShieldCheck, Download, Calendar, ArrowRight
} from 'lucide-react';
import { REVENUE_TIMELINE } from '../data/mockScenarios';

export default function AnalyticsView() {
  const [activeTab, setActiveTab] = useState('revenue');
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="space-y-6">
      
      {/* Top Header & Range Switcher */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 card-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 m-0">Financial & Commerce Analytics</h2>
          <p className="text-xs text-slate-500 mt-0.5">Explore real-time revenue velocity, payment method efficiency, and fraud prevention savings.</p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            {['7d', '30d', '3m', '12m'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 rounded-md font-medium uppercase text-[11px] transition cursor-pointer ${
                  timeRange === range
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button 
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Analytics Category Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'revenue', label: 'Revenue Trends', icon: DollarSign },
          { id: 'payments', label: 'Payment Channels', icon: CreditCard },
          { id: 'orders', label: 'Order Performance & AOV', icon: ShoppingBag },
          { id: 'risk', label: 'Risk Shield ROI', icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-blue-50 text-blue-700 shadow-xs border border-blue-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: REVENUE TRENDS */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 card-shadow">
              <div className="text-xs text-slate-500 font-medium">Gross Transaction Volume</div>
              <div className="text-2xl font-bold text-slate-900 font-mono mt-1">₹24,82,450.00</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +12.4% vs last period
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 card-shadow">
              <div className="text-xs text-slate-500 font-medium">Net Settled to Bank</div>
              <div className="text-2xl font-bold text-blue-600 font-mono mt-1">₹24,77,451.00</div>
              <div className="text-xs text-slate-500 mt-1">0.02% processing fees</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 card-shadow">
              <div className="text-xs text-slate-500 font-medium">Disputed / Quishing Saved</div>
              <div className="text-2xl font-bold text-emerald-600 font-mono mt-1">₹1,42,800.00</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1">100% saved on device</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 card-shadow space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0">Revenue Velocity Chart</h3>
            <div className="h-48 flex items-end justify-between gap-3 px-2">
              {REVENUE_TIMELINE.map((item, i) => {
                const heightPct = Math.round((item.revenue / 500000) * 100);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition truncate">
                      ₹{(item.revenue / 1000).toFixed(0)}k
                    </span>
                    <div className="w-full bg-slate-100 rounded-t-md relative overflow-hidden h-36 flex items-end">
                      <div 
                        className="w-full bg-blue-600 group-hover:bg-blue-700 transition rounded-t-md"
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PAYMENT CHANNELS */}
      {activeTab === 'payments' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 card-shadow space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 m-0">Payment Method Breakdown</h3>
            <p className="text-xs text-slate-500 m-0">Volume split and settlement latency by channel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 text-xs">UPI Dynamic QR (Counter Stand)</span>
                <span className="font-mono font-bold text-blue-600">62.4% (₹15.48L)</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '62.4%' }} />
              </div>
              <div className="text-[11px] text-slate-500 flex justify-between">
                <span>Avg Latency: <strong>8.2ms</strong></span>
                <span>Success Rate: <strong className="text-emerald-600">99.1%</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 text-xs">UPI Intent (GPay / PhonePe App)</span>
                <span className="font-mono font-bold text-indigo-600">23.8% (₹5.90L)</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: '23.8%' }} />
              </div>
              <div className="text-[11px] text-slate-500 flex justify-between">
                <span>Avg Latency: <strong>11.4ms</strong></span>
                <span>Success Rate: <strong className="text-emerald-600">97.4%</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ORDER PERFORMANCE */}
      {activeTab === 'orders' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 card-shadow space-y-4">
          <h3 className="text-sm font-bold text-slate-900 m-0">Basket Size & Average Order Value (AOV)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Average Order Value</div>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">₹362.80</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1">+8.4% growth</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Avg Items per Basket</div>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">3.2 units</div>
              <div className="text-xs text-slate-500 mt-1">Across 6,842 orders</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Peak Checkout Window</div>
              <div className="text-2xl font-bold font-mono text-blue-600 mt-1">18:00 – 21:30</div>
              <div className="text-xs text-slate-500 mt-1">Evening Kirana rush</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: RISK SHIELD ROI */}
      {activeTab === 'risk' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 card-shadow space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 m-0">AegisPay On-Device Fraud Protection ROI</h3>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs text-emerald-900">
            <p className="m-0 leading-relaxed font-medium">
              Over the last 30 days, AegisPay intercepted <strong>24 malicious attacks</strong> (including 8 physical QR sticker quishing attempts, 4 deepfake voice emergency calls, and 12 spoofed payment screens), protecting a total of <strong className="text-emerald-700 font-mono text-sm">₹1,42,800.00</strong> with zero cloud latency and 0 bytes transmitted externally.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
