import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, ArrowRight, ShieldCheck, 
  ShieldAlert, AlertTriangle, CheckCircle2, QrCode, CreditCard, 
  ShoppingBag, Users, ArrowUpRight, Clock, ChevronRight, Eye
} from 'lucide-react';
import { 
  COMMERCE_TRANSACTIONS, 
  REVENUE_TIMELINE, 
  REQUIRES_ATTENTION 
} from '../data/mockScenarios';

export default function DashboardView({ onSelectTransaction, onNavigateView }) {
  const [timeRange, setTimeRange] = useState('7d');

  const kpiMetrics = [
    {
      label: "Total Revenue",
      value: "₹24,82,450.00",
      change: "+12.4%",
      isPositive: true,
      subtext: "vs. previous 30 days"
    },
    {
      label: "Total Transactions",
      value: "18,429",
      change: "+8.2%",
      isPositive: true,
      subtext: "UPI & POS volume"
    },
    {
      label: "Payment Success Rate",
      value: "97.8%",
      change: "+0.4%",
      isPositive: true,
      subtext: "Industry benchmark: 94.2%"
    },
    {
      label: "Retail Orders",
      value: "6,842",
      change: "+15.1%",
      isPositive: true,
      subtext: "Avg order: ₹362.00"
    },
    {
      label: "Risk Interceptions",
      value: "24 Blocks",
      change: "₹1,42,800 saved",
      isPositive: true,
      highlight: true,
      subtext: "100% on-device defense"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* LEVEL 1: Business Health KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiMetrics.map((kpi, idx) => (
          <div 
            key={idx}
            className={`p-4 rounded-xl bg-white border card-shadow transition ${
              kpi.highlight 
                ? 'border-blue-200 bg-gradient-to-b from-blue-50/40 to-white' 
                : 'border-slate-200'
            }`}
          >
            <div className="text-xs font-medium text-slate-500">{kpi.label}</div>
            <div className="text-xl font-bold text-slate-900 mt-1 font-mono tracking-tight">
              {kpi.value}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <span className={`font-semibold flex items-center gap-0.5 ${
                kpi.isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {kpi.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.change}
              </span>
              <span className="text-slate-400 text-[11px] truncate">{kpi.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      {/* LEVEL 2: Two-Column Analytics Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Revenue Overview Line/Bar Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 card-shadow space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 m-0">Revenue & Settlement Volume</h2>
              <p className="text-xs text-slate-500 m-0">Daily gross transaction volume settled across UPI QR & POS terminals.</p>
            </div>

            {/* Time Controls */}
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
          </div>

          {/* Revenue Bar Visualizer */}
          <div className="pt-2">
            <div className="h-44 flex items-end justify-between gap-3 px-2">
              {REVENUE_TIMELINE.map((item, i) => {
                const heightPct = Math.round((item.revenue / 500000) * 100);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition truncate">
                      ₹{(item.revenue / 1000).toFixed(0)}k
                    </div>
                    <div className="w-full bg-slate-100 rounded-t-md relative overflow-hidden h-36 flex items-end">
                      <div 
                        className="w-full bg-blue-600 group-hover:bg-blue-700 transition rounded-t-md"
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-slate-600">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Weekly Average: <strong className="text-slate-900 font-mono">₹3,54,635 / day</strong></span>
            <button 
              onClick={() => onNavigateView('payments')}
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View Settlement Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Payment Channels & Risk Distribution (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 card-shadow space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 m-0">Payment Method Mix</h2>
            <p className="text-xs text-slate-500 m-0">Volume distribution by channel.</p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-medium mb-1 text-slate-700">
                <span>UPI Dynamic QR (Terminal)</span>
                <span className="font-mono font-bold text-slate-900">62.4% (₹15.4L)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '62.4%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1 text-slate-700">
                <span>UPI Intent / Collect</span>
                <span className="font-mono font-bold text-slate-900">23.8% (₹5.9L)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: '23.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1 text-slate-700">
                <span>Debit / Credit Cards (POS)</span>
                <span className="font-mono font-bold text-slate-900">9.8% (₹2.4L)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '9.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1 text-slate-700">
                <span>NetBanking / Corporate</span>
                <span className="font-mono font-bold text-slate-900">4.0% (₹1.0L)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full" style={{ width: '4.0%' }} />
              </div>
            </div>
          </div>

          {/* On-Device Security Summary Callout */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero-Chargeback Guarantee</span>
            </div>
            <p className="text-[11px] text-slate-500 m-0 leading-snug">
              Every UPI QR transaction is verified in &lt;12ms with on-device LiteRT SLM before settlement.
            </p>
          </div>
        </div>

      </div>

      {/* LEVEL 3: Action / Requires Attention Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 card-shadow space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-slate-900 m-0">Requires Attention</h2>
            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold font-mono">
              {REQUIRES_ATTENTION.length} items
            </span>
          </div>
          <span className="text-xs text-slate-400">Prioritized by business risk</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {REQUIRES_ATTENTION.map((item) => (
            <div 
              key={item.id}
              className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 transition flex flex-col justify-between gap-2.5"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md font-mono ${
                    item.severity === 'HIGH'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : item.severity === 'MEDIUM'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {item.severity} PRIORITY
                  </span>
                  <span className="text-[11px] text-slate-400">{item.time}</span>
                </div>
                <div className="text-xs font-bold text-slate-900">{item.title}</div>
                <p className="text-[11px] text-slate-600 m-0 leading-relaxed">{item.description}</p>
              </div>

              <button
                onClick={() => onNavigateView(item.tab)}
                className="w-fit text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>{item.action}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* LEVEL 4: Recent Transactions Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 card-shadow space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 m-0">Recent Payment Activity</h2>
            <p className="text-xs text-slate-500 m-0">Live transaction stream with on-device risk assessment.</p>
          </div>
          <button
            onClick={() => onNavigateView('transactions')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Transactions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3 font-semibold">Transaction ID</th>
                <th className="py-2.5 px-3 font-semibold">Customer</th>
                <th className="py-2.5 px-3 font-semibold">Payment Method</th>
                <th className="py-2.5 px-3 font-semibold text-right">Amount</th>
                <th className="py-2.5 px-3 font-semibold text-center">Status</th>
                <th className="py-2.5 px-3 font-semibold text-center">Risk Score</th>
                <th className="py-2.5 px-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {COMMERCE_TRANSACTIONS.slice(0, 5).map((txn) => (
                <tr 
                  key={txn.id} 
                  onClick={() => onSelectTransaction(txn)}
                  className="hover:bg-slate-50/80 transition cursor-pointer group"
                >
                  <td className="py-3 px-3 font-mono font-medium text-slate-900">
                    {txn.id}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{txn.customer}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{txn.phone}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-slate-600">{txn.method}</span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    ₹{txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                      txn.status === 'COMPLETED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : txn.status === 'UNDER_REVIEW'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : txn.status === 'REFUNDED'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`font-mono font-bold text-xs ${
                      txn.riskScore > 70 ? 'text-rose-600' : txn.riskScore > 40 ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {txn.riskScore}/100
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTransaction(txn);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 text-[11px] font-semibold transition cursor-pointer"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
