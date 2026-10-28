import React, { useState, useEffect } from 'react';
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
import { AdminCMSModal } from './components/AdminCMSModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { 
  DonationCartItem, 
  DonationReceiptData, 
  SiteContentData, 
  ActivityProgram, 
  BeneficiaryRequest, 
  WordPressSyncConfig 
} from './types';
import { SOCIETY_INFO, ACTIVITIES_DATA } from './data/societyData';

export default function App() {
  // Site Content State (Persistent)
  const [siteContent, setSiteContent] = useState<SiteContentData>(() => {
    try {
      const saved = localStorage.getItem('alsafwa_site_content');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return SOCIETY_INFO as unknown as SiteContentData;
  });

  // Activities State (Persistent)
  const [activitiesList, setActivitiesList] = useState<ActivityProgram[]>(() => {
    try {
      const saved = localStorage.getItem('alsafwa_activities');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ACTIVITIES_DATA;
  });

  // Beneficiary Requests State (Persistent)
  const [beneficiaryRequests, setBeneficiaryRequests] = useState<BeneficiaryRequest[]>(() => {
    try {
      const saved = localStorage.getItem('alsafwa_beneficiary_requests');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'REQ-910241',
        serviceId: 'orphan-sponsorship',
        serviceTitle: 'كفالة الأيتام',
        applicantName: 'أم عبد الرحمن (أرملة)',
        applicantPhone: '01123456789',
        nationalId: '28905140102941',
        address: 'عزبة النخل الغربية - شارع ترعة التوفيقية',
        details: 'طلب كفالة تعليمية ومصروفات مدرسية لطفلين يتيمين بالمرحلة الابتدائية',
        urgency: 'متوسط',
        status: 'قيد المراجعة',
        createdAt: '2026/10/24',
      },
      {
        id: 'REQ-910242',
        serviceId: 'hearse-project',
        serviceTitle: 'شراء وتجهيز سيارة نقل ودفن الموتى (المادة 4)',
        applicantName: 'أحمد محمود إبراهيم',
        applicantPhone: '01098765432',
        address: 'المطرية - ميدان المطرية',
        details: 'طلب تجهيز ونقل جثمان متوفى غير قادر إلى مدافن الأسرة',
        urgency: 'عاجل جداً (خلال 24 ساعة)',
        status: 'تم التنفيذ',
        createdAt: '2026/10/27',
      },
    ];
  });

  // WordPress Sync Configuration
  const [wpConfig, setWpConfig] = useState<WordPressSyncConfig>(() => {
    try {
      const saved = localStorage.getItem('alsafwa_wp_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      wpUrl: 'https://alsafwasociety.org',
      syncEnabled: true,
      lastSyncedAt: new Date().toLocaleDateString('ar-EG'),
    };
  });

  // Modal States
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string | undefined>(undefined);
  const [selectedAmount, setSelectedAmount] = useState<number | undefined>(undefined);
  const [selectedIsMonthly, setSelectedIsMonthly] = useState<boolean>(false);
  
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [wpExportModalOpen, setWpExportModalOpen] = useState(false);
  const [cmsModalOpen, setCmsModalOpen] = useState(false);
  
  // Selected Program for Service Detail & Beneficiary Request Modal
  const [detailProgram, setDetailProgram] = useState<ActivityProgram | null>(null);

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

  // Save changes to localStorage
  const handleSaveContent = (newContent: SiteContentData) => {
    setSiteContent(newContent);
    try {
      localStorage.setItem('alsafwa_site_content', JSON.stringify(newContent));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveActivities = (newActivities: ActivityProgram[]) => {
    setActivitiesList(newActivities);
    try {
      localStorage.setItem('alsafwa_activities', JSON.stringify(newActivities));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveWpConfig = (newConfig: WordPressSyncConfig) => {
    setWpConfig(newConfig);
    try {
      localStorage.setItem('alsafwa_wp_config', JSON.stringify(newConfig));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في استعادة المحتوى والصور الافتراضية؟')) {
      localStorage.removeItem('alsafwa_site_content');
      localStorage.removeItem('alsafwa_activities');
      setSiteContent(SOCIETY_INFO as unknown as SiteContentData);
      setActivitiesList(ACTIVITIES_DATA);
    }
  };

  const handleBeneficiarySubmit = (request: BeneficiaryRequest) => {
    setBeneficiaryRequests((prev) => {
      const updated = [request, ...prev];
      try {
        localStorage.setItem('alsafwa_beneficiary_requests', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleUpdateBeneficiaryStatus = (id: string, newStatus: BeneficiaryRequest['status']) => {
    setBeneficiaryRequests((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
      try {
        localStorage.setItem('alsafwa_beneficiary_requests', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Donation Handlers
  const handleOpenDonate = (programId?: string, amount?: number, isMonthly = false) => {
    setSelectedProgramId(programId || activitiesList[0].id);
    setSelectedAmount(amount || 250);
    setSelectedIsMonthly(isMonthly);
    setDonateModalOpen(true);
  };

  const handleAddToCart = (programId: string, amount: number, isMonthly: boolean) => {
    const prog = activitiesList.find((p) => p.id === programId) || activitiesList[0];
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
    const primaryId = cartItems[0]?.programId || activitiesList[0].id;
    handleOpenDonate(primaryId, totalAmount, false);
  };

  const handleDonationComplete = (receipt: DonationReceiptData) => {
    setActiveReceipt(receipt);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-[#0F5132]/20 selection:text-[#0F5132]">
      {/* Header with Top Bar Contract & CMS trigger */}
      <Header
        content={siteContent}
        onOpenDonate={() => handleOpenDonate()}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenWpExport={() => setWpExportModalOpen(true)}
        onOpenCMS={() => setCmsModalOpen(true)}
        cartCount={cartItems.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          content={siteContent}
          onOpenDonate={() => handleOpenDonate()}
          onSelectProgram={(id) => handleOpenDonate(id)}
        />

        {/* Quick Donation Strip & Amount Selector */}
        <QuickDonationStrip
          activities={activitiesList}
          onQuickDonate={(pId, amt, monthly) => handleOpenDonate(pId, amt, monthly)}
          onAddToCart={(pId, amt, monthly) => handleAddToCart(pId, amt, monthly)}
        />

        {/* Legal Bylaws & Registration Section (Articles 1-4) */}
        <LegalBylawsSection content={siteContent} />

        {/* Dedicated Spotlight: Article 4 Hearse & Burial Vehicle */}
        <HearseProjectSpotlight
          content={siteContent}
          activities={activitiesList}
          onDonate={(pId, amt) => handleOpenDonate(pId, amt)}
        />

        {/* All 11 Activities & Programs Grid with Service Detail & Help Request Trigger */}
        <ActivitiesSection
          programs={activitiesList}
          onDonateToProgram={(pId, amt) => handleOpenDonate(pId, amt)}
          onAddToCart={(pId, amt, monthly) => handleAddToCart(pId, amt, monthly)}
          onViewServiceDetail={(program) => setDetailProgram(program)}
        />

        {/* Contact and Office Location */}
        <ContactSection content={siteContent} />
      </main>

      {/* Footer */}
      <Footer
        content={siteContent}
        onOpenDonate={() => handleOpenDonate()}
        onOpenWpExport={() => setWpExportModalOpen(true)}
      />

      {/* Donation Checkout Modal */}
      <DonationModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        content={siteContent}
        activities={activitiesList}
        initialProgramId={selectedProgramId}
        initialAmount={selectedAmount}
        initialIsMonthly={selectedIsMonthly}
        onDonationComplete={handleDonationComplete}
      />

      {/* Donation Receipt Modal */}
      <DonationReceiptModal
        receipt={activeReceipt}
        content={siteContent}
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
        content={siteContent}
        activities={activitiesList}
      />

      {/* Interactive Service Details & Beneficiary Request Modal */}
      <ServiceDetailModal
        program={detailProgram}
        isOpen={Boolean(detailProgram)}
        onClose={() => setDetailProgram(null)}
        onDonate={(pId, amt) => handleOpenDonate(pId, amt)}
        onSubmitBeneficiaryRequest={handleBeneficiarySubmit}
      />

      {/* Content & Media Management CMS Panel */}
      <AdminCMSModal
        isOpen={cmsModalOpen}
        onClose={() => setCmsModalOpen(false)}
        content={siteContent}
        onSaveContent={handleSaveContent}
        activities={activitiesList}
        onSaveActivities={handleSaveActivities}
        beneficiaryRequests={beneficiaryRequests}
        onUpdateBeneficiaryStatus={handleUpdateBeneficiaryStatus}
        wpConfig={wpConfig}
        onSaveWpConfig={handleSaveWpConfig}
        onResetToDefault={handleResetToDefault}
      />
    </div>
  );
}
