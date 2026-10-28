import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QuickDonationStrip } from './components/QuickDonationStrip';
import { LegalBylawsSection } from './components/LegalBylawsSection';
import { HearseProjectSpotlight } from './components/HearseProjectSpotlight';
import { ActivitiesSection } from './components/ActivitiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DonationModal } from './components/DonationModal';
import { DonationReceiptModal } from './components/DonationReceiptModal';
import { DonationCartDrawer } from './components/DonationCartDrawer';
import { WordPressExportModal } from './components/WordPressExportModal';
import { DonationCartItem, DonationReceiptData } from './types';
import { ACTIVITIES_DATA } from './data/societyData';

export default function App() {
  // Modal states
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string | undefined>(undefined);
  const [selectedAmount, setSelectedAmount] = useState<number | undefined>(undefined);
  const [selectedIsMonthly, setSelectedIsMonthly] = useState<boolean>(false);
  
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [wpExportModalOpen, setWpExportModalOpen] = useState(false);
  
  // Cart state
  const [cartItems, setCartItems] = useState<DonationCartItem[]>([
    {
      programId: 'orphan-sponsorship',
      programTitle: 'كفالة الأيتام',
      amount: 500,
      isMonthly: true,
      intention: 'كفالة يتيم شهرياً',
    },
    {
      programId: 'hearse-project',
      programTitle: 'شراء وتجهيز سيارة نقل ودفن الموتى (المادة 4)',
      amount: 250,
      isMonthly: false,
      intention: 'صدقة جارية',
    },
  ]);

  // Completed Receipt state
  const [activeReceipt, setActiveReceipt] = useState<DonationReceiptData | null>(null);

  // Handlers
  const handleOpenDonate = (programId?: string, amount?: number, isMonthly = false) => {
    setSelectedProgramId(programId || ACTIVITIES_DATA[0].id);
    setSelectedAmount(amount || 250);
    setSelectedIsMonthly(isMonthly);
    setDonateModalOpen(true);
  };

  const handleAddToCart = (programId: string, amount: number, isMonthly: boolean) => {
    const prog = ACTIVITIES_DATA.find((p) => p.id === programId) || ACTIVITIES_DATA[0];
    setCartItems((prev) => [
      ...prev,
      {
        programId: prog.id,
        programTitle: prog.title,
        amount: amount,
        isMonthly: isMonthly,
        intention: isMonthly ? 'كفالة شهرية' : 'صدقة عامة',
      },
    ]);
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleUpdateCartAmount = (index: number, newAmount: number) => {
    setCartItems((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, amount: newAmount } : item))
    );
  };

  const handleCheckoutCart = () => {
    setCartDrawerOpen(false);
    const totalAmount = cartItems.reduce((acc, it) => acc + it.amount, 0);
    const primaryId = cartItems[0]?.programId || ACTIVITIES_DATA[0].id;
    handleOpenDonate(primaryId, totalAmount, false);
  };

  const handleDonationComplete = (receipt: DonationReceiptData) => {
    setActiveReceipt(receipt);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-[#0F5132]/20 selection:text-[#0F5132]">
      {/* Header with Top Bar Contract */}
      <Header
        onOpenDonate={() => handleOpenDonate()}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenWpExport={() => setWpExportModalOpen(true)}
        cartCount={cartItems.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenDonate={() => handleOpenDonate()}
          onSelectProgram={(id) => handleOpenDonate(id)}
        />

        {/* Quick Donation Strip & Amount Selector */}
        <QuickDonationStrip
          onQuickDonate={(pId, amt, monthly) => handleOpenDonate(pId, amt, monthly)}
          onAddToCart={(pId, amt, monthly) => handleAddToCart(pId, amt, monthly)}
        />

        {/* Legal Bylaws & Registration Section (Articles 1-4) */}
        <LegalBylawsSection />

        {/* Dedicated Spotlight: Article 4 Hearse & Burial Vehicle */}
        <HearseProjectSpotlight
          onDonate={(pId, amt) => handleOpenDonate(pId, amt)}
        />

        {/* All 11 Activities & Programs Grid */}
        <ActivitiesSection
          onDonateToProgram={(pId, amt) => handleOpenDonate(pId, amt)}
          onAddToCart={(pId, amt, monthly) => handleAddToCart(pId, amt, monthly)}
        />

        {/* Contact and Office Location */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenDonate={() => handleOpenDonate()}
        onOpenWpExport={() => setWpExportModalOpen(true)}
      />

      {/* Donation Checkout Modal */}
      <DonationModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        initialProgramId={selectedProgramId}
        initialAmount={selectedAmount}
        initialIsMonthly={selectedIsMonthly}
        onDonationComplete={handleDonationComplete}
      />

      {/* Donation Receipt Modal */}
      <DonationReceiptModal
        receipt={activeReceipt}
        onClose={() => setActiveReceipt(null)}
      />

      {/* Donation Cart Drawer */}
      <DonationCartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateAmount={handleUpdateCartAmount}
        onCheckoutCart={handleCheckoutCart}
      />

      {/* WordPress Theme Export & Code Inspector Modal */}
      <WordPressExportModal
        isOpen={wpExportModalOpen}
        onClose={() => setWpExportModalOpen(false)}
      />
    </div>
  );
}
