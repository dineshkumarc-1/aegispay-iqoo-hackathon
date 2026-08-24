import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import TransactionsView from './components/TransactionsView';
import PaymentsView from './components/PaymentsView';
import CommerceView from './components/CommerceView';
import RiskSecurityView from './components/RiskSecurityView';
import ReportsView from './components/ReportsView';
import TransactionDetailDrawer from './components/TransactionDetailDrawer';
import ArchitectureModal from './components/ArchitectureModal';
import PitchDeckModal from './components/PitchDeckModal';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);

  // Handle direct navigation routing
  const handleNavigateView = (viewId) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans antialiased">
      
      {/* 1. Left Enterprise Sidebar */}
      <Sidebar 
        currentView={currentView} 
        setCurrentView={handleNavigateView} 
        riskAlertsCount={4}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Top Header */}
        <Header 
          currentView={currentView}
          onOpenDeck={() => setIsDeckModalOpen(true)}
          onOpenArch={() => setIsArchModalOpen(true)}
          riskAlertsCount={4}
        />

        {/* Dynamic Page Body */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          
          {/* View Routing */}
          {currentView === 'dashboard' && (
            <DashboardView 
              onSelectTransaction={(txn) => setSelectedTransaction(txn)}
              onNavigateView={handleNavigateView}
            />
          )}

          {currentView === 'transactions' && (
            <TransactionsView 
              onSelectTransaction={(txn) => setSelectedTransaction(txn)}
            />
          )}

          {currentView === 'payments' && (
            <PaymentsView />
          )}

          {['orders', 'products', 'customers', 'inventory'].includes(currentView) && (
            <CommerceView 
              initialSubTab={currentView === 'orders' ? 'orders' : currentView} 
            />
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

        {/* Global Enterprise Footer */}
        <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
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

      </div>

      {/* 3. Slide-Over Transaction Detail Drawer */}
      <TransactionDetailDrawer 
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />

      {/* 4. Modals */}
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
