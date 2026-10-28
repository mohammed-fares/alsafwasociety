import React from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Download, 
  Phone, 
  Menu, 
  X, 
  Home, 
  Info, 
  Car, 
  Sparkles, 
  FileText, 
  CreditCard, 
  MessageSquare, 
  ChevronLeft,
  ShieldCheck,
  Send
} from 'lucide-react';
import { SOCIETY_INFO } from '../data/societyData';
import { SiteContentData } from '../types';

interface HeaderProps {
  content?: SiteContentData;
  onOpenDonate: (programId?: string) => void;
  onOpenCart: () => void;
  onOpenWpExport: () => void;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  content,
  onOpenDonate,
  onOpenCart,
  onOpenWpExport,
  cartCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const info = content || (SOCIETY_INFO as unknown as SiteContentData);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'الرئيسية', href: '#', icon: Home },
    { label: 'عن الجمعية والإشهار', href: '#about', icon: Info },
    { 
      label: 'مشروع سيارة إكرام الموتى', 
      href: '#hearse-project', 
      icon: Car, 
      badge: 'المادة 4',
      highlight: true 
    },
    { label: 'أنشطة ومجالات التكافل الـ 11', href: '#activities', icon: Sparkles },
    { label: 'اللائحة والمستندات الرسمية', href: '#bylaws', icon: FileText },
    { label: 'بوابة التبرع السريع والحسابات', href: '#quick-donate', icon: CreditCard },
    { label: 'تواصل معنا وطلب مندوب', href: '#contact', icon: MessageSquare },
  ];

  return (
    <>
      {/* Top Legal Trust Strip */}
      <div className="bg-[#052316] text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="font-semibold text-white">جمعية الصفوة الإسلامية</span>
            <span className="text-emerald-500 font-bold" aria-hidden="true">·</span>
            <span className="text-emerald-200">مشهرة برقم {info.registrationNumber} لسنة {info.registrationYear} - القاهرة</span>
            <span className="text-emerald-500 font-bold" aria-hidden="true">·</span>
            <span className="text-amber-300 font-medium">أكثر من 33 عاماً في خدمة المجتمع</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            {/* Social media links */}
            <div className="flex items-center gap-2">
              <a
                href={info.socialLinks.facebookPage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-200 hover:text-white transition-colors"
                title="صفحة الجمعية الرسمية على فيسبوك"
                aria-label="Facebook Page"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={info.socialLinks.facebookGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-200 hover:text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-900/80 hover:bg-emerald-800 transition-colors"
                title="جروب الجمعية على فيسبوك"
              >
                جروب فيسبوك
              </a>
              <a
                href={info.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-200 hover:text-red-400 transition-colors"
                title="قناة الجمعية على يوتيوب"
                aria-label="YouTube Channel"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            <span className="text-emerald-700" aria-hidden="true">|</span>

            <a 
              href={`tel:${info.phone}`} 
              className="flex items-center gap-1.5 font-mono text-emerald-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{info.phone}</span>
            </a>
            <span className="text-emerald-700" aria-hidden="true">|</span>
            <span className="text-amber-300 font-serif font-bold">عطاء · تنمية · رعاية</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-stone-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 sm:gap-8 h-20">
            
            {/* Zone 1: Brand wordmark & logo */}
            <a 
              href="#" 
              className="flex items-center gap-2.5 sm:gap-3 shrink-0 whitespace-nowrap text-inherit no-underline group"
            >
              <img 
                src={info.logoUrl} 
                alt="شعار جمعية الصفوة الإسلامية" 
                className="w-11 h-11 sm:w-12 sm:h-12 object-contain rounded-full border border-emerald-100 p-0.5 shadow-xs transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-extrabold text-[#0F5132] tracking-tight leading-tight">
                  جمعية الصفوة الإسلامية
                </span>
                <span className="text-[9px] sm:text-xs font-semibold text-[#8C6A28] tracking-widest font-mono">
                  ALSAFWA ISLAMIC SOCIETY
                </span>
              </div>
            </a>

            {/* Zone 2: Desktop navigation links (hidden on mobile and tablet) */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-stone-700">
              <a href="#about" className="hover:text-[#0F5132] transition-colors whitespace-nowrap shrink-0">
                عن الجمعية والإشهار
              </a>
              <a href="#activities" className="hover:text-[#0F5132] transition-colors whitespace-nowrap shrink-0">
                الأنشطة والخدمات
              </a>
              <a href="#hearse-project" className="hover:text-[#0F5132] transition-colors whitespace-nowrap shrink-0 text-[#0F5132] font-bold flex items-center gap-1">
                <span>سيارة إكرام الموتى</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold">المادة 4</span>
              </a>
              <a href="#bylaws" className="hover:text-[#0F5132] transition-colors whitespace-nowrap shrink-0">
                اللائحة والمستندات
              </a>
              <a href="#contact" className="hover:text-[#0F5132] transition-colors whitespace-nowrap shrink-0">
                تواصل معنا
              </a>
            </nav>

            {/* Zone 3: Actions + Mobile/Tablet Menu Button */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* WordPress Theme Export Button (visible on tablet and desktop) */}
              <button
                onClick={onOpenWpExport}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                title="تصدير قالب ووردبريس كامل وجاهز للتركيب"
              >
                <Download className="w-3.5 h-3.5 text-amber-700" />
                <span>قالب ووردبريس</span>
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={onOpenCart}
                className="relative p-2 sm:p-2.5 text-stone-700 hover:text-[#0F5132] hover:bg-stone-50 rounded-xl transition-colors cursor-pointer"
                aria-label="سلة التبرعات"
                title="سلة التبرعات"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Primary Action Button */}
              <button
                onClick={() => onOpenDonate()}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-[#0F5132] hover:bg-[#0A3622] rounded-xl shadow-xs hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 fill-amber-300" />
                <span>تبرع الآن</span>
              </button>

              {/* Responsive Hamburger Button (Mobile & Tablet: active below lg breakpoint) */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-stone-700 hover:text-[#0F5132] hover:bg-emerald-50 rounded-xl border border-stone-200 transition-colors cursor-pointer"
                aria-label="فتح القائمة الرئيسية"
                title="القائمة"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>

        {/* Responsive Mobile and Tablet Off-Canvas Drawer Navigation System */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="قائمة الهاتف والتابلت">
            {/* Backdrop Overlay */}
            <div 
              className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sliding Drawer Container */}
            <div className="fixed inset-y-0 right-0 w-full max-w-sm sm:max-w-md bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto border-l border-stone-200">
              
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={info.logoUrl} 
                    alt="شعار جمعية الصفوة الإسلامية" 
                    className="w-10 h-10 object-contain rounded-full border border-emerald-200 p-0.5 bg-white shadow-xs"
                  />
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-[#0F5132] leading-tight">
                      جمعية الصفوة الإسلامية
                    </h3>
                    <p className="text-[11px] text-amber-800 font-semibold font-mono">
                      مشهرة برقم {info.registrationNumber} لسنة {info.registrationYear}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-xl transition-colors cursor-pointer"
                  aria-label="إغلاق القائمة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Trust Badge Bar */}
              <div className="bg-[#052316] text-white px-4 py-2.5 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>إدارة المطرية · القاهرة</span>
                </span>
                <span className="font-mono text-amber-300 font-bold">تأسست 1991</span>
              </div>

              {/* Scrollable Navigation Links List */}
              <div className="p-4 space-y-1.5 flex-1">
                <span className="text-[11px] font-bold text-stone-400 block px-3 mb-1">
                  أقسام ومحتويات الموقع
                </span>
                
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-right transition-all cursor-pointer ${
                        item.highlight
                          ? 'bg-emerald-50 text-[#0F5132] font-black border border-emerald-200'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-[#0F5132] font-bold border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`p-2 rounded-lg ${item.highlight ? 'bg-emerald-100 text-[#0F5132]' : 'bg-stone-100 text-stone-600'}`}>
                          <IconComponent className="w-4 h-4" />
                        </span>
                        <span className="text-sm">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="text-[10px] font-black bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        <ChevronLeft className="w-4 h-4 text-stone-400" />
                      </div>
                    </button>
                  );
                })}

                {/* Quick Action Buttons within Drawer */}
                <div className="pt-4 mt-3 border-t border-stone-200 space-y-2.5">
                  <span className="text-[11px] font-bold text-stone-400 block px-3 mb-1">
                    الخدمات والتبرع السريع
                  </span>

                  {/* Primary Donate Now */}
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenDonate();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0F5132] hover:bg-[#0A3622] text-white rounded-xl font-black text-sm shadow-sm transition-all cursor-pointer"
                  >
                    <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>تبرع فوري لبرامج الجمعية</span>
                  </button>

                  {/* Cart Drawer */}
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenCart();
                    }}
                    className="w-full flex items-center justify-between py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-[#0F5132]" />
                      <span>عرض سلة التبرعات</span>
                    </div>
                    {cartCount > 0 ? (
                      <span className="bg-amber-400 text-stone-950 text-xs font-black px-2 py-0.5 rounded-full">
                        {cartCount} عناصر
                      </span>
                    ) : (
                      <span className="text-stone-400 text-[11px]">فارغة</span>
                    )}
                  </button>

                  {/* WordPress Theme Exporter */}
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenWpExport();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-700" />
                    <span>تحميل قالب وإضافات ووردبريس كاملة</span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer: Hotline & Social Links */}
              <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`tel:${info.phone}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white hover:bg-emerald-50 border border-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#0F5132]" />
                    <span className="font-mono">{info.phone}</span>
                  </a>

                  <a
                    href={info.whatsappUrl || `https://wa.me/20${info.phone.replace(/^0/, '')}?text=${encodeURIComponent('السلام عليكم، أرغب في التواصل مع جمعية الصفوة الإسلامية')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-200" />
                    <span>واتساب</span>
                  </a>
                </div>

                {/* Social media icons */}
                <div className="flex items-center justify-center gap-3 pt-1 border-t border-stone-200/80">
                  <a
                    href={info.socialLinks.facebookPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-stone-600 hover:text-[#0F5132] hover:bg-white rounded-lg transition-colors"
                    title="صفحة الفيسبوك"
                    aria-label="Facebook Page"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href={info.socialLinks.facebookGroup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 text-[11px] font-bold text-stone-700 hover:text-[#0F5132] hover:bg-white rounded-lg border border-stone-200 transition-colors"
                    title="جروب فيسبوك"
                  >
                    جروب فيسبوك
                  </a>
                  <a
                    href={info.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-stone-600 hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                    title="قناة اليوتيوب"
                    aria-label="YouTube Channel"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}
      </header>
    </>
  );
};
