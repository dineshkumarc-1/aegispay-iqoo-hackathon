import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Download, ArrowUpDown, ChevronDown, 
  CheckCircle2, AlertTriangle, ShieldAlert, ArrowRight, 
  CreditCard, Calendar, SlidersHorizontal
} from 'lucide-react';
import { COMMERCE_TRANSACTIONS } from '../data/mockScenarios';

export default function TransactionsView({ onSelectTransaction }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [methodFilter, setMethodFilter] = useState('ALL');

  const filteredTransactions = useMemo(() => {
    return COMMERCE_TRANSACTIONS.filter((txn) => {
      const matchesSearch = 
        txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.phone.includes(searchQuery) ||
        txn.utr.includes(searchQuery);

      const matchesStatus = statusFilter === 'ALL' || txn.status === statusFilter;
      const matchesRisk = riskFilter === 'ALL' || txn.riskLevel === riskFilter;
      const matchesMethod = methodFilter === 'ALL' || txn.method.toLowerCase().includes(methodFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesRisk && matchesMethod;
    });
  }, [searchQuery, statusFilter, riskFilter, methodFilter]);

  const totalVolume = useMemo(() => {
    return filteredTransactions.reduce((acc, t) => acc + t.amount, 0);
  }, [filteredTransactions]);

  return (
    <div className="space-y-5">
      
      {/* Top Toolbar & Metrics Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 card-shadow">
        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-medium block">Total Filtered Volume</span>
            <span className="text-lg font-bold font-mono text-slate-900">
              ₹{totalVolume.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200"></div>
          <div>
            <span className="text-slate-400 font-medium block">Transactions</span>
            <span className="text-lg font-bold font-mono text-slate-900">
              {filteredTransactions.length} items
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 card-shadow space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, customer, UTR..."
              className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer font-medium"
          >
            <option value="ALL">All Payment Statuses</option>
            <option value="COMPLETED">Completed</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="REFUNDED">Refunded</option>
            <option value="FAILED">Failed</option>
          </select>

          {/* Payment Method Filter */}
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer font-medium"
          >
            <option value="ALL">All Payment Methods</option>
            <option value="UPI QR">UPI QR Code</option>
            <option value="UPI Intent">UPI Intent</option>
            <option value="Card">Cards (POS)</option>
            <option value="NetBanking">NetBanking</option>
          </select>

          {/* Risk Level Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer font-medium"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="LOW">Low Risk (&lt; 25)</option>
            <option value="MEDIUM">Medium Risk (25–70)</option>
            <option value="HIGH">High Risk (70–90)</option>
            <option value="CRITICAL">Critical Threat (&gt; 90)</option>
          </select>

        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white border border-slate-200 rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 uppercase text-[10px] tracking-wider font-semibold">
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Risk Assessment</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <p className="font-semibold text-slate-700">No transactions match your search filters.</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting the filters or clearing the search query.</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('ALL');
                        setRiskFilter('ALL');
                        setMethodFilter('ALL');
                      }}
                      className="mt-3 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold text-xs cursor-pointer hover:bg-blue-100 transition"
                    >
                      Clear All Filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((txn) => (
                  <tr 
                    key={txn.id} 
                    onClick={() => onSelectTransaction(txn)}
                    className="hover:bg-slate-50 transition cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-900">
                      {txn.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{txn.customer}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{txn.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {txn.method}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      ₹{txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
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
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className={`font-mono font-bold text-xs ${
                          txn.riskScore > 70 ? 'text-rose-600' : txn.riskScore > 40 ? 'text-amber-600' : 'text-emerald-600'
                        }`}>
                          {txn.riskScore}/100
                        </span>
                        <span className="text-[10px] text-slate-400">({txn.riskLevel})</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {txn.timestamp}
                    </td>
                    <td className="py-3.5 px-4 text-right">
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
