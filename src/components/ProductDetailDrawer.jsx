import React, { useState } from 'react';
import { 
  X, Package, Plus, Minus, Warehouse, CheckCircle2, 
  AlertTriangle, XCircle, ArrowRight, History, Tag, DollarSign
} from 'lucide-react';

export default function ProductDetailDrawer({ product, onClose }) {
  if (!product) return null;

  const [currentStock, setCurrentStock] = useState(product.inventory);
  const [restockAmount, setRestockAmount] = useState(25);
  const [restockedSuccess, setRestockedSuccess] = useState(false);

  const maxCapacity = product.maxStock || 150;
  const stockPercentage = Math.min(100, Math.round((currentStock / maxCapacity) * 100));

  const handleApplyRestock = () => {
    setCurrentStock(prev => prev + restockAmount);
    setRestockedSuccess(true);
    setTimeout(() => setRestockedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 space-y-3 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500">
                {product.sku}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                currentStock > (product.reorderThreshold || 20)
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : currentStock > 0
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {currentStock > 20 ? 'IN STOCK' : currentStock > 0 ? 'LOW STOCK' : 'OUT OF STOCK'}
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
            <h3 className="text-xl font-bold text-slate-900 m-0">{product.name}</h3>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>Category: <strong className="text-slate-700">{product.category}</strong></span>
              <span>•</span>
              <span>Rating: <strong className="text-blue-600">★ {product.rating || '4.8'}</strong></span>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-2">
              ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              <span className="text-xs text-slate-400 font-normal ml-1">/ unit</span>
            </div>
          </div>
        </div>

        {/* Drawer Body Content */}
        <div className="p-4 sm:p-6 space-y-6 flex-1 overflow-y-auto text-xs">
          
          {/* Section 1: Visual Stock Health Meter */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">
                Inventory Level Meter
              </span>
              <span className="font-mono font-bold text-xs text-slate-700">
                {currentStock} / {maxCapacity} units ({stockPercentage}%)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              {/* Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    stockPercentage > 30 ? 'bg-emerald-600' : stockPercentage > 10 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${stockPercentage}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Reorder Threshold: <strong className="text-slate-800">{product.reorderThreshold || 20} units</strong></span>
                <span>30D Sales: <strong className="text-slate-800 font-mono">{product.sales30d || 140} units</strong></span>
              </div>
            </div>
          </div>

          {/* Section 2: Interactive Restock Action Box */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 text-xs">Inward Stock Replenishment</span>
              {restockedSuccess && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Updated!
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-200 bg-white rounded-lg overflow-hidden">
                <button 
                  onClick={() => setRestockAmount(prev => Math.max(5, prev - 5))}
                  className="px-2.5 py-1.5 hover:bg-slate-100 text-slate-600 cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <input 
                  type="number"
                  value={restockAmount}
                  onChange={(e) => setRestockAmount(parseInt(e.target.value) || 0)}
                  className="w-14 text-center font-mono font-bold text-slate-900 text-xs py-1 focus:outline-none"
                />
                <button 
                  onClick={() => setRestockAmount(prev => prev + 5)}
                  className="px-2.5 py-1.5 hover:bg-slate-100 text-slate-600 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={handleApplyRestock}
                className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition cursor-pointer shadow-xs"
              >
                + Add {restockAmount} Units to Inventory
              </button>
            </div>
          </div>

          {/* Section 3: Stock Movement Log */}
          <div className="space-y-2">
            <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">
              Recent 30-Day Stock Movement Log
            </span>
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
              {product.movementHistory?.map((mov, idx) => (
                <div key={idx} className="p-3 bg-white flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">{mov.note}</div>
                    <div className="text-[10px] text-slate-400">{mov.date}</div>
                  </div>
                  <span className={`font-mono font-bold ${
                    mov.qty > 0 ? 'text-emerald-600' : 'text-slate-700'
                  }`}>
                    {mov.qty > 0 ? `+${mov.qty}` : mov.qty} units
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center gap-2">
          <button 
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
