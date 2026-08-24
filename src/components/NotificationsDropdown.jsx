import React, { useState } from 'react';
import { 
  Bell, X, ShieldAlert, AlertTriangle, CheckCircle2, 
  Package, CreditCard, ArrowRight, Check
} from 'lucide-react';
import { NOTIFICATIONS_DATA } from '../data/mockScenarios';

export default function NotificationsDropdown({ 
  isOpen, 
  onClose,
  onNavigateView,
  onSelectTransaction,
  onSelectProduct
}) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => n.isUnread).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const handleItemAction = (notif) => {
    // Mark as read
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, isUnread: false } : n));
    onClose();

    if (notif.targetType === 'transaction' && onSelectTransaction) {
      onSelectTransaction({ id: notif.targetId, amount: 4999.00, customer: "Rajesh Patel", method: "UPI Intent", status: "UNDER_REVIEW", riskScore: 94 });
    } else if (notif.targetType === 'product' && onSelectProduct) {
      onSelectProduct({ id: notif.targetId, name: "Coorg Single Origin Arabica Beans", sku: "COF-CRG-02", price: 650.00, inventory: 18, maxStock: 100, reorderThreshold: 25, category: "Beverages & Pantry" });
    } else if (notif.targetType === 'payments' && onNavigateView) {
      onNavigateView('payments');
    } else if (notif.targetType === 'reports' && onNavigateView) {
      onNavigateView('reports');
    }
  };

  const todayNotifs = notifications.filter(n => n.group === 'Today');
  const earlierNotifs = notifications.filter(n => n.group === 'Earlier');

  return (
    <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in-50 zoom-in-95 duration-150">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-slate-900 m-0">Activity Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold font-mono">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Mark read
            </button>
          )}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-3 space-y-4 overflow-y-auto flex-1 text-xs">
        
        {/* Today Group */}
        {todayNotifs.length > 0 && (
          <div className="space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
              Today
            </div>
            <div className="space-y-1.5">
              {todayNotifs.map(n => (
                <div
                  key={n.id}
                  onClick={() => handleItemAction(n)}
                  className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                    n.isUnread 
                      ? 'bg-blue-50/40 border-blue-200 shadow-xs' 
                      : 'bg-white border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {n.type === 'CRITICAL' && <ShieldAlert className="w-4 h-4 text-rose-600" />}
                    {n.type === 'WARNING' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                    {n.type === 'SUCCESS' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {n.type === 'INFO' && <CreditCard className="w-4 h-4 text-blue-600" />}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 m-0 leading-relaxed">{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Earlier Group */}
        {earlierNotifs.length > 0 && (
          <div className="space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
              Earlier
            </div>
            <div className="space-y-1.5">
              {earlierNotifs.map(n => (
                <div
                  key={n.id}
                  onClick={() => handleItemAction(n)}
                  className="p-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition cursor-pointer flex items-start gap-3"
                >
                  <div className="mt-0.5 shrink-0">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 m-0 leading-relaxed">{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50 text-center text-[11px] text-slate-500">
        All alerts verified locally by on-device LiteRT SLM
      </div>

    </div>
  );
}
