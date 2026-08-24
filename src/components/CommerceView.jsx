import React, { useState } from 'react';
import { 
  ShoppingBag, Package, Users, Warehouse, Search, 
  Filter, Plus, CheckCircle2, AlertTriangle, XCircle, 
  ArrowRight, Download, Tag, DollarSign
} from 'lucide-react';
import { 
  COMMERCE_PRODUCTS, 
  COMMERCE_ORDERS, 
  COMMERCE_CUSTOMERS 
} from '../data/mockScenarios';

export default function CommerceView({ initialSubTab = 'orders' }) {
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-5">
      
      {/* Sub-Navigation Header Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2 card-shadow flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'orders', label: 'Retail Orders', icon: ShoppingBag, count: COMMERCE_ORDERS.length },
            { id: 'products', label: 'Product Catalog', icon: Package, count: COMMERCE_PRODUCTS.length },
            { id: 'customers', label: 'Customer Directory', icon: Users, count: COMMERCE_CUSTOMERS.length },
            { id: 'inventory', label: 'Inventory & Stock', icon: Warehouse, badge: '2 low' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-mono">
                    {tab.count}
                  </span>
                )}
                {tab.badge && (
                  <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-full font-mono font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog & orders..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {/* SUB-VIEW 1: ORDERS */}
      {activeSubTab === 'orders' && (
        <div className="bg-white border border-slate-200 rounded-2xl card-shadow overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 m-0">Recent Customer Orders</h2>
              <p className="text-xs text-slate-500 m-0">Live retail checkout and digital orders across all store terminals.</p>
            </div>
            <button 
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Orders</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Channel / Terminal</th>
                  <th className="py-3 px-4 text-center">Items</th>
                  <th className="py-3 px-4 text-right">Total Amount</th>
                  <th className="py-3 px-4 text-center">Payment Status</th>
                  <th className="py-3 px-4 text-center">Fulfillment</th>
                  <th className="py-3 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {COMMERCE_ORDERS.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-900">{ord.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{ord.customer}</td>
                    <td className="py-3.5 px-4 text-slate-500">{ord.channel}</td>
                    <td className="py-3.5 px-4 text-center font-mono">{ord.itemsCount}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      ₹{ord.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                        ord.paymentStatus === 'PAID'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {ord.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                        ord.fulfillmentStatus === 'FULFILLED'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : ord.fulfillmentStatus === 'DISPATCHED'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : ord.fulfillmentStatus === 'PROCESSING'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {ord.fulfillmentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">{ord.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: PRODUCTS */}
      {activeSubTab === 'products' && (
        <div className="bg-white border border-slate-200 rounded-2xl card-shadow overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 m-0">Store Product Catalog</h2>
              <p className="text-xs text-slate-500 m-0">Retail inventory items, SKU codes, and unit prices.</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-right">Unit Price</th>
                  <th className="py-3 px-4 text-center">Available Stock</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">30D Sales</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {COMMERCE_PRODUCTS.map((prd) => (
                  <tr key={prd.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{prd.name}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">{prd.sku}</td>
                    <td className="py-3.5 px-4 text-slate-600">{prd.category}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      ₹{prd.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold">{prd.inventory} units</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                        prd.status === 'IN_STOCK'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : prd.status === 'LOW_STOCK'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {prd.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-600">{prd.sales30d} orders</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: CUSTOMERS */}
      {activeSubTab === 'customers' && (
        <div className="bg-white border border-slate-200 rounded-2xl card-shadow overflow-hidden space-y-4 p-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 m-0">Verified Customer Profiles</h2>
            <p className="text-xs text-slate-500 m-0">Customer transaction frequency, lifetime spend, and trust scores.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Phone Number</th>
                  <th className="py-3 px-4 text-center">Total Orders</th>
                  <th className="py-3 px-4 text-right">Lifetime Spend</th>
                  <th className="py-3 px-4 text-center">Trust Rating</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {COMMERCE_CUSTOMERS.map((cust) => (
                  <tr key={cust.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{cust.name}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">{cust.phone}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold">{cust.ordersCount}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      ₹{cust.totalSpent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-semibold text-blue-700 text-xs font-mono">{cust.trustScore}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                        cust.status === 'ACTIVE'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {cust.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: INVENTORY */}
      {activeSubTab === 'inventory' && (
        <div className="bg-white border border-slate-200 rounded-2xl card-shadow overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 m-0">Inventory & Stock Alerts</h2>
              <p className="text-xs text-slate-500 m-0">Real-time shelf replenishment tracking and automated low-stock warnings.</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-xs transition cursor-pointer border border-blue-200">
              Bulk Stock Update
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="text-xs font-semibold text-emerald-800">Healthy Stock Level</div>
              <div className="text-2xl font-bold font-mono text-emerald-950 mt-1">4 SKUs</div>
              <p className="text-[11px] text-emerald-700 mt-1 m-0">Above 50 units in stock</p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div className="text-xs font-semibold text-amber-800">Low Stock Warning</div>
              <div className="text-2xl font-bold font-mono text-amber-950 mt-1">2 SKUs</div>
              <p className="text-[11px] text-amber-700 mt-1 m-0">Replenishment recommended</p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
              <div className="text-xs font-semibold text-rose-800">Out of Stock</div>
              <div className="text-2xl font-bold font-mono text-rose-950 mt-1">1 SKU</div>
              <p className="text-[11px] text-rose-700 mt-1 m-0">Commercial Frother (Reorder Placed)</p>
            </div>
          </div>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="py-3 px-4">Item Name</th>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4 text-center">In Stock</th>
                  <th className="py-3 px-4 text-center">Safety Threshold</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {COMMERCE_PRODUCTS.map((prd) => (
                  <tr key={prd.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{prd.name}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">{prd.sku}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold">{prd.inventory} units</td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-500">20 units</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                        prd.status === 'IN_STOCK'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : prd.status === 'LOW_STOCK'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {prd.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold cursor-pointer transition">
                        Restock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
