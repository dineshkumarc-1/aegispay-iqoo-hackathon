import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ArrowLeftRight, ShieldAlert, 
  ShoppingBag, Menu, FileCheck, Layers, FileText, 
  BarChart3, CreditCard
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import TransactionsView from './components/TransactionsView';
import PaymentsView from './components/PaymentsView';
import CommerceView from './components/CommerceView';
import RiskSecurityView from './components/RiskSecurityView';
import AnalyticsView from './components/AnalyticsView';
import ReportsView from './components/ReportsView';
import TransactionDetailDrawer from './components/TransactionDetailDrawer';
import OrderDetailDrawer from './components/OrderDetailDrawer';
import CustomerDetailDrawer from './components/CustomerDetailDrawer';
import ProductDetailDrawer from './components/ProductDetailDrawer';
import GlobalSearchModal from './components/GlobalSearchModal';
import NotificationsDropdown from './components/NotificationsDropdown';
import ArchitectureModal from './components/ArchitectureModal';
import PitchDeckModal from './components/PitchDeckModal';
import { COMMERCE_CUSTOMERS, COMMERCE_TRANSACTIONS, COMMERCE_ORDERS, COMMERCE_PRODUCTS } from './data/mockScenarios';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  
  // Drawer states for interactive drill-downs
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Modals & Panels
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Global Keyboard Shortcut (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle direct navigation routing
  const handleNavigateView = (viewId) => {
    setCurrentView(viewId);
    setIsMobileMenuOpen(false);
    setIsNotificationsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cross-entity drill down helpers
  const handleInspectCustomerById = (custId) => {
    const cust = COMMERCE_CUSTOMERS.find(c => c.id === custId || c.name.toLowerCase() === custId?.toLowerCase());
    if (cust) setSelectedCustomer(cust);
  };

  const handleInspectTransactionById = (txnId) => {
    const txn = COMMERCE_TRANSACTIONS.find(t => t.id === txnId);
    if (txn) setSelectedTransaction(txn);
  };

  const handleInspectOrderById = (ord) => {
    setSelectedOrder(ord);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans antialiased">
      
      {/* 1. Grouped Enterprise Sidebar (Desktop fixed + Mobile drawer) */}
      <Sidebar 
        currentView={currentView} 
        setCurrentView={handleNavigateView} 
        riskAlertsCount={4}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative">
        
        {/* Top Header */}
        <Header 
          currentView={currentView}
          onOpenDeck={() => setIsDeckModalOpen(true)}
          onOpenArch={() => setIsArchModalOpen(true)}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onToggleNotifications={() => setIsNotificationsOpen(prev => !prev)}
          unreadNotificationsCount={2}
          riskAlertsCount={4}
        />

        {/* Dynamic Notifications Dropdown */}
        <NotificationsDropdown 
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onNavigateView={handleNavigateView}
          onSelectTransaction={(txn) => setSelectedTransaction(txn)}
          onSelectProduct={(prd) => setSelectedProduct(prd)}
        />

        {/* Dynamic Page Body with mobile padding */}
        <main className="flex-1 p-3.5 sm:p-6 md:p-8 pb-24 lg:pb-8 max-w-7xl w-full mx-auto space-y-6">
          
          {/* View Routing */}
          {currentView === 'dashboard' && (
            <DashboardView 
              onSelectTransaction={(txn) => setSelectedTransaction(txn)}
              onNavigateView={handleNavigateView}
              onSelectProduct={(prd) => setSelectedProduct(prd)}
            />
          )}

          {(currentView === 'transactions' || currentView === 'refunds') && (
            <TransactionsView 
              onSelectTransaction={(txn) => setSelectedTransaction(txn)}
            />
          )}

          {currentView === 'payments' && (
            <PaymentsView />
          )}

          {['orders', 'products', 'customers', 'inventory'].includes(currentView) && (
            <CommerceView 
              initialSubTab={currentView} 
              onSelectOrder={(ord) => setSelectedOrder(ord)}
              onSelectProduct={(prd) => setSelectedProduct(prd)}
              onSelectCustomer={(cust) => setSelectedCustomer(cust)}
            />
          )}

          {currentView === 'analytics' && (
            <AnalyticsView />
          )}

          {['risk-hub', 'qr-shield', 'deepfake-voice', 'social-eng', 'scambait', 'receipt-guard'].includes(currentView) && (
            <RiskSecurityView 
              activeEngine={currentView === 'risk-hub' ? 'qr-shield' : currentView}
              onSelectEngine={(engineId) => setCurrentView(engineId)}
            />
          )}

          {currentView === 'reports' && (
            <ReportsView />
          )}

        </main>

        {/* Global Enterprise Footer (Desktop) */}
        <footer className="hidden lg:flex border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500 items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">AegisPay Commerce v2.4</span>
            <span>•</span>
            <span>FinTech & Retail Operating Platform</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
            <span>LiteRT SLM: 11.4ms NPU</span>
            <span>•</span>
            <span>DPDP Act 2023 Compliant</span>
            <span>•</span>
            <span>iQOO Hackathon 2026</span>
          </div>
        </footer>

        {/* Mobile Bottom Navigation Bar (Mobile / Tablet Only) */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 flex items-center justify-around py-2 px-1 shadow-lg">
          
          <button
            onClick={() => handleNavigateView('dashboard')}
            className={`flex flex-col items-center gap-1 p-1 rounded-lg text-[10px] font-semibold transition ${
              currentView === 'dashboard' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => handleNavigateView('transactions')}
            className={`flex flex-col items-center gap-1 p-1 rounded-lg text-[10px] font-semibold transition ${
              ['transactions', 'payments', 'refunds'].includes(currentView) ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Ledger</span>
          </button>

          <button
            onClick={() => handleNavigateView('risk-hub')}
            className={`flex flex-col items-center gap-1 p-1 rounded-lg text-[10px] font-semibold transition relative ${
              ['risk-hub', 'qr-shield', 'deepfake-voice', 'social-eng', 'scambait', 'receipt-guard'].includes(currentView) 
                ? 'text-blue-600' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Risk Shield</span>
            <span className="absolute -top-0.5 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
          </button>

          <button
            onClick={() => handleNavigateView('orders')}
            className={`flex flex-col items-center gap-1 p-1 rounded-lg text-[10px] font-semibold transition ${
              ['orders', 'products', 'customers', 'inventory'].includes(currentView) 
                ? 'text-blue-600' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Commerce</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center gap-1 p-1 rounded-lg text-[10px] font-semibold text-slate-500 hover:text-slate-900 transition"
          >
            <Menu className="w-4 h-4" />
            <span>All Menu</span>
          </button>

        </div>

      </div>

      {/* 3. Interactive Detail Drawers */}
      <TransactionDetailDrawer 
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />

      <OrderDetailDrawer 
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onInspectCustomer={handleInspectCustomerById}
        onInspectTransaction={handleInspectTransactionById}
      />

      <CustomerDetailDrawer 
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        onInspectOrder={handleInspectOrderById}
      />

      <ProductDetailDrawer 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* 4. Global Command Palette Search Modal (⌘K) */}
      <GlobalSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTransaction={(txn) => setSelectedTransaction(txn)}
        onSelectOrder={(ord) => setSelectedOrder(ord)}
        onSelectCustomer={(cust) => setSelectedCustomer(cust)}
        onSelectProduct={(prd) => setSelectedProduct(prd)}
        onNavigateView={handleNavigateView}
      />

      {/* 5. Information Modals */}
      <ArchitectureModal 
        isOpen={isArchModalOpen} 
        onClose={() => setIsArchModalOpen(false)} 
      />

      <PitchDeckModal 
        isOpen={isDeckModalOpen} 
        onClose={() => setIsDeckModalOpen(false)} 
      />

    </div>
  );
}
