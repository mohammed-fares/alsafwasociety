import React from 'react';
import { Heart, ShoppingBag, Download, Phone, Menu, X } from 'lucide-react';
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

      {/* Main Header adhering to Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-stone-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-20">
            
            {/* Zone 1: Single element brand wordmark */}
            <a 
              href="#" 
              className="flex items-center gap-3 shrink-0 whitespace-nowrap text-inherit no-underline group"
            >
              <img 
                src={info.logoUrl} 
                alt="شعار جمعية الصفوة الإسلامية" 
                className="w-12 h-12 object-contain rounded-full border border-emerald-100 p-0.5 shadow-xs transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold text-[#0F5132] tracking-tight leading-tight">
                  جمعية الصفوة الإسلامية
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#8C6A28] tracking-widest font-mono">
                  ALSAFWA ISLAMIC SOCIETY
                </span>
              </div>
            </a>

            {/* Zone 2: 4-5 concise single-line text navigation links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-stone-700">
              <a href="#about" className="hover:text-[#0F5132] transition-colors whitespace-nowrap shrink-0">
                عن الجمعية والإشهار
              </a>
              <a href="#activities" className="hover:text-[#0F5132] transition-colors whitespace-nowrap shrink-0">
                الأنشطة والخدمات
              </a>
              <a href="#hearse-project" className="hover:text-[#0F5132] transition-colors whitespace-nowrap shrink-0 text-[#0F5132]">
                سيارة إكرام الموتى
              </a>
              <a href="#bylaws" className="hover:text-[#0F5132] transition-colors whitespace-nowrap shrink-0">
                اللائحة والمستندات
              </a>
              <a href="#contact" className="hover:text-[#0F5132] transition-colors whitespace-nowrap shrink-0">
                تواصل معنا
              </a>
            </nav>

            {/* Zone 3: 1 primary action + WP Export and Cart icons */}
            <div className="flex items-center gap-2 shrink-0">
              {/* WordPress Theme & Plugin Exporter Button */}
              <button
                onClick={onOpenWpExport}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                title="تصدير قالب ووردبريس كامل وجاهز للتركيب"
              >
                <Download className="w-3.5 h-3.5 text-amber-700" />
                <span>قالب ووردبريس</span>
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={onOpenCart}
                className="relative p-2.5 text-stone-700 hover:text-[#0F5132] hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
                aria-label="سلة التبرعات"
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
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#0F5132] hover:bg-[#0A3622] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>تبرع الآن</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg"
                aria-label="القائمة"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-3">
            <div className="flex flex-col space-y-2 text-sm font-bold text-stone-700 pt-2">
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-stone-100"
              >
                عن الجمعية والإشهار
              </a>
              <a 
                href="#activities" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-stone-100"
              >
                الأنشطة والخدمات
              </a>
              <a 
                href="#hearse-project" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-stone-100 text-[#0F5132]"
              >
                مشروع سيارة الموتى (المادة 4)
              </a>
              <a 
                href="#bylaws" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-stone-100"
              >
                اللائحة والمستندات
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-stone-100"
              >
                تواصل معنا
              </a>
            </div>

            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWpExport();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 rounded-lg"
              >
                <Download className="w-4 h-4 text-amber-700" />
                <span>تحميل وتصدير قالب ووردبريس كامل</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
