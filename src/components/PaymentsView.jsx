import React from 'react';
import { 
  CreditCard, ArrowUpRight, CheckCircle2, Clock, 
  Building2, ShieldCheck, AlertTriangle, ArrowRight, Download
} from 'lucide-react';

export default function PaymentsView() {
  const settlementBatches = [
    {
      batchId: "SETTLE_20260824_03",
      account: "HDFC Bank Current A/c ...4012",
      amount: 1485200.00,
      utrBatch: "HDFCN260824901",
      cycle: "T+0 Instant UPI Settlement",
      status: "SETTLED",
      time: "Today, 21:00 PM",
      txnsCount: 1420
    },
    {
      batchId: "SETTLE_20260824_02",
      account: "State Bank of India A/c ...8810",
      amount: 360000.00,
      utrBatch: "SBIN260824419",
      cycle: "T+0 Instant UPI Settlement",
      status: "SETTLED",
      time: "Today, 17:00 PM",
      txnsCount: 412
    },
    {
      batchId: "SETTLE_20260824_01",
      account: "HDFC Bank Current A/c ...4012",
      amount: 637250.00,
      utrBatch: "PENDING_CLEARING",
      cycle: "T+1 Card & POS Batch",
      status: "PROCESSING",
      time: "Clearing tonight at 23:59",
      txnsCount: 284
    }
  ];

  const gatewayNodes = [
    { name: "NPCI UPI Core Switch", latency: "14ms", uptime: "99.99%", status: "HEALTHY" },
    { name: "HDFC Payment Gateway Node", latency: "22ms", uptime: "99.95%", status: "HEALTHY" },
    { name: "SBI YONO Settlement API", latency: "48ms", uptime: "99.82%", status: "HEALTHY" },
    { name: "Razorpay POS Terminal Hub", latency: "19ms", uptime: "99.98%", status: "HEALTHY" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Level 1: Settlement Overview KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 card-shadow">
          <div className="text-xs font-medium text-slate-500">Settled to Bank (Today)</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tracking-tight">
            ₹18,45,200.00
          </div>
          <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Successfully credited</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 card-shadow">
          <div className="text-xs font-medium text-slate-500">Pending Settlement Payout</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tracking-tight">
            ₹6,37,250.00
          </div>
          <div className="text-xs text-blue-600 font-semibold mt-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Clearing tonight (T+1 batch)</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 card-shadow">
          <div className="text-xs font-medium text-slate-500">Average Settlement Speed</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tracking-tight">
            Instant (T+0)
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            Direct UPI to Current Account
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 card-shadow">
          <div className="text-xs font-medium text-slate-500">Disputed / Quishing Blocked</div>
          <div className="text-2xl font-bold text-rose-600 mt-1 font-mono tracking-tight">
            ₹4,999.00
          </div>
          <div className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Saved by AegisPay Interceptor</span>
          </div>
        </div>
      </div>

      {/* Level 2: Settlement Batches Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 card-shadow space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 m-0">Merchant Bank Settlement Batches</h2>
            <p className="text-xs text-slate-500 m-0">Automatic UPI and POS payouts to verified merchant current accounts.</p>
          </div>
          <button 
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Bank Statement</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 uppercase text-[10px] tracking-wider font-semibold">
                <th className="py-3 px-4">Batch Reference ID</th>
                <th className="py-3 px-4">Destination Account</th>
                <th className="py-3 px-4">Settlement Model</th>
                <th className="py-3 px-4 text-right">Settled Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {settlementBatches.map((batch) => (
                <tr key={batch.batchId} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-900">
                    <div>{batch.batchId}</div>
                    <div className="text-[10px] text-slate-400 font-mono">UTR: {batch.utrBatch}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{batch.account}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{batch.txnsCount} transactions included</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {batch.cycle}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                    ₹{batch.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                      batch.status === 'SETTLED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                    {batch.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Level 3: Bank & Payment Gateway Node Health */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 card-shadow space-y-3">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 m-0">Payment Network & Gateway Infrastructure Health</h2>
          <p className="text-xs text-slate-500 m-0">Live status of banking switches and NPCI clearing endpoints.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {gatewayNodes.map((node, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{node.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-mono">
                <span>Latency: {node.latency}</span>
                <span>Uptime: {node.uptime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
