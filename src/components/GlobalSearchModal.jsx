import React, { useState, useEffect } from 'react';
import { 
  Search, X, ArrowLeftRight, ShoppingBag, 
  Users, Package, ShieldAlert, ArrowRight, CornerDownLeft
} from 'lucide-react';
import { 
  COMMERCE_TRANSACTIONS, 
  COMMERCE_ORDERS, 
  COMMERCE_CUSTOMERS, 
  COMMERCE_PRODUCTS, 
  REQUIRES_ATTENTION 
} from '../data/mockScenarios';

export default function GlobalSearchModal({ 
  isOpen, 
  onClose, 
  onSelectTransaction, 
  onSelectOrder, 
  onSelectCustomer, 
  onSelectProduct,
  onNavigateView
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingTransactions = q ? COMMERCE_TRANSACTIONS.filter(t => 
    t.id.toLowerCase().includes(q) || t.customer.toLowerCase().includes(q) || t.utr.includes(q)
  ) : COMMERCE_TRANSACTIONS.slice(0, 3);

  const matchingOrders = q ? COMMERCE_ORDERS.filter(o => 
    o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.channel.toLowerCase().includes(q)
  ) : COMMERCE_ORDERS.slice(0, 3);

  const matchingCustomers = q ? COMMERCE_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.id.toLowerCase().includes(q)
  ) : COMMERCE_CUSTOMERS.slice(0, 3);

  const matchingProducts = q ? COMMERCE_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  ) : COMMERCE_PRODUCTS.slice(0, 3);

  const matchingAlerts = q ? REQUIRES_ATTENTION.filter(a => 
    a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
  ) : REQUIRES_ATTENTION.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search transactions, customers, orders, products, risk alerts..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
          
          {/* Section: Transactions */}
          {matchingTransactions.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1.5">
                <ArrowLeftRight className="w-3 h-3 text-blue-600" />
                <span>Transactions</span>
              </div>
              <div className="space-y-1">
                {matchingTransactions.map(txn => (
                  <div
                    key={txn.id}
                    onClick={() => {
                      onSelectTransaction(txn);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 transition cursor-pointer flex items-center justify-between group border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-mono font-bold text-[10px]">
                        TXN
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{txn.customer} — ₹{txn.amount.toFixed(2)}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{txn.id} • {txn.method}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono ${
                      txn.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {txn.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Orders */}
          {matchingOrders.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1.5">
                <ShoppingBag className="w-3 h-3 text-indigo-600" />
                <span>Orders</span>
              </div>
              <div className="space-y-1">
                {matchingOrders.map(ord => (
                  <div
                    key={ord.id}
                    onClick={() => {
                      onSelectOrder(ord);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 transition cursor-pointer flex items-center justify-between group border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-mono font-bold text-[10px]">
                        ORD
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{ord.id} — {ord.customer}</div>
                        <div className="text-[10px] text-slate-400">{ord.itemsCount} items • {ord.channel}</div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-slate-900">₹{ord.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Customers */}
          {matchingCustomers.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1.5">
                <Users className="w-3 h-3 text-emerald-600" />
                <span>Customers</span>
              </div>
              <div className="space-y-1">
                {matchingCustomers.map(cust => (
                  <div
                    key={cust.id}
                    onClick={() => {
                      onSelectCustomer(cust);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 transition cursor-pointer flex items-center justify-between group border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-[10px]">
                        {cust.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{cust.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{cust.phone} • {cust.ordersCount} orders</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-blue-700 font-semibold">{cust.trustScore}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Products */}
          {matchingProducts.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1.5">
                <Package className="w-3 h-3 text-amber-600" />
                <span>Products & Inventory</span>
              </div>
              <div className="space-y-1">
                {matchingProducts.map(prd => (
                  <div
                    key={prd.id}
                    onClick={() => {
                      onSelectProduct(prd);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 transition cursor-pointer flex items-center justify-between group border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-mono font-bold text-[10px]">
                        SKU
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{prd.name}</div>
                        <div className="text-[10px] text-slate-400">{prd.sku} • {prd.inventory} units in stock</div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-slate-900">₹{prd.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Keybinds */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-600">Esc</kbd> to close</span>
          </div>
          <span>AegisPay Command Palette</span>
        </div>

      </div>
    </div>
  );
}
