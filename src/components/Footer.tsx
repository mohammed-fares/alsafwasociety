import React from 'react';
import { Phone, Mail, MapPin, Download, Heart, ShieldCheck, Lock } from 'lucide-react';
import { SiteContentData } from '../types';
import { SOCIETY_INFO } from '../data/societyData';

interface FooterProps {
  content?: SiteContentData;
  onOpenDonate: () => void;
  onOpenWpExport: () => void;
  onOpenAdminLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  content,
  onOpenDonate,
  onOpenWpExport,
  onOpenAdminLogin,
}) => {
  const info = content || (SOCIETY_INFO as unknown as SiteContentData);
  return (
    <footer className="bg-[#052316] text-stone-300 pt-16 pb-10 border-t-4 border-[#C5A059]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-right">
          
          {/* Col 1: About Society */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={info.logoUrl}
                alt="جمعية الصفوة الإسلامية"
                className="w-12 h-12 object-contain bg-white rounded-full p-1"
              />
              <div>
                <h4 className="text-base font-black text-white">
                  جمعية الصفوة الإسلامية
                </h4>
                <p className="text-xs text-amber-400 font-serif">
                  معاً .. لبناء مجتمع أكثر تكافلاً
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              جمعية أهلية مصرية رائدة مشهرة برقم {info.registrationNumber} لسنة {info.registrationYear} بإدارة المطرية - القاهرة. نعمل منذ أكثر من 33 عاماً في رعاية الأيتام والفقراء وتسيير القوافل الطبية وعمارة بيوت الله وسيارة نقل الموتى.
            </p>

            <div className="pt-2 text-[11px] text-emerald-400 font-mono">
              تاريخ اعتماد اللائحة: {info.bylawApprovalDate}
            </div>

            {/* Social media links in footer */}
            <div className="pt-3 border-t border-emerald-900/60 flex items-center gap-2.5">
              <a
                href={info.socialLinks.facebookPage}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/80 hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors"
                title="صفحة الجمعية على فيسبوك"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a
                href={info.socialLinks.facebookGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 text-xs font-bold transition-colors"
                title="جروب الجمعية على فيسبوك"
              >
                جروب فيسبوك
              </a>

              <a
                href={info.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/80 hover:bg-[#FF0000] text-white flex items-center justify-center transition-colors"
                title="قناة الجمعية على يوتيوب"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Core Programs Links */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold text-amber-300 uppercase tracking-wider pb-2 border-b border-emerald-900">
              أهم مسارات الخير
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#activities" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400">·</span>
                  <span>كفالة الأيتام والرعاية الشاملة</span>
                </a>
              </li>
              <li>
                <a href="#hearse-project" className="hover:text-white transition-colors flex items-center gap-1.5 text-amber-200">
                  <span className="text-amber-400">·</span>
                  <span>سيارة نقل ودفن الموتى (المادة 4)</span>
                </a>
              </li>
              <li>
                <a href="#activities" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400">·</span>
                  <span>بناء وصيانة وعمارة المساجد</span>
                </a>
              </li>
              <li>
                <a href="#activities" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400">·</span>
                  <span>الخدمات الصحية والقوافل الطبية</span>
                </a>
              </li>
              <li>
                <a href="#activities" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400">·</span>
                  <span>تحفيظ القرآن الكريم والكتاتيب</span>
                </a>
              </li>
              <li>
                <a href="#activities" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400">·</span>
                  <span>إطعام ومساعدات الأسر المتعففة</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Bank Accounts & InstaPay */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold text-amber-300 uppercase tracking-wider pb-2 border-b border-emerald-900">
              حسابات التبرع المعتمدة
            </h5>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-900">
                <span className="text-stone-400 block text-[11px]">معرف إنستاباي (InstaPay IPA):</span>
                <span className="font-mono text-white font-bold block mt-0.5 select-all">
                  {info.paymentGateways?.instaPay?.id || 'alsafwasociety@instapay'}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-900">
                <span className="text-stone-400 block text-[11px]">فودافون كاش ومحافظ المحمول:</span>
                <span className="font-mono text-white font-bold block mt-0.5 select-all">
                  {info.phone}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-900">
                <span className="text-stone-400 block text-[11px]">البنك الأهلي المصري (NBE):</span>
                <span className="font-mono text-amber-300 font-bold block mt-0.5 select-all">
                  10912384758001
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Actions & WordPress Export */}
          <div className="space-y-4">
            <h5 className="text-sm font-bold text-amber-300 uppercase tracking-wider pb-2 border-b border-emerald-900">
              خدمات الموقع والقالب
            </h5>

            <div className="space-y-2.5">
              <button
                onClick={onOpenDonate}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-stone-950" />
                <span>تبرع فوري الآن</span>
              </button>

              <button
                onClick={onOpenWpExport}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-900/80 hover:bg-emerald-900 text-emerald-100 border border-emerald-700/60 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>تحميل وتصدير قالب ووردبريس كامل</span>
              </button>
            </div>

            <div className="pt-2 text-xs space-y-1.5 text-stone-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono text-stone-200">{info.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-[11px] leading-tight">18 ش ترعة التوفيقية - عزبة النخل - المطرية</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Hidden Admin Access & Quranic Quote */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            {/* Hidden entry for General Manager: Clicking the official badge/copyright opens the password-protected login */}
            <button
              onClick={onOpenAdminLogin}
              className="flex items-center gap-2 text-stone-400 hover:text-stone-300 transition-colors text-right cursor-pointer group focus:outline-none"
              title="البيانات القانونية المعتمدة"
              aria-label="البيانات القانونية"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500 group-hover:text-emerald-400 transition-colors shrink-0" />
              <span>
                © {new Date().getFullYear()} جمعية الصفوة الإسلامية - مشهرة برقم {info.registrationNumber} لسنة {info.registrationYear}. جميع الحقوق محفوظة.
              </span>
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <p className="font-serif text-sm text-amber-300 font-bold">
              "وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ"
            </p>
            {/* Ultra-discreet concealed lock: invisible to standard visitors, accessible to the General Manager */}
            {onOpenAdminLogin && (
              <button
                onClick={onOpenAdminLogin}
                className="opacity-10 hover:opacity-80 transition-opacity p-1 text-stone-500 hover:text-amber-400 cursor-pointer rounded focus:outline-none"
                title="إدارة النظام (المدير العام)"
                aria-label="المدير العام"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
