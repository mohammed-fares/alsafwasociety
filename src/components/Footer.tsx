import React from 'react';
import { Phone, Mail, MapPin, Download, Heart, ShieldCheck } from 'lucide-react';
import { SOCIETY_INFO } from '../data/societyData';

interface FooterProps {
  onOpenDonate: () => void;
  onOpenWpExport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDonate, onOpenWpExport }) => {
  return (
    <footer className="bg-[#052316] text-stone-300 pt-16 pb-10 border-t-4 border-[#C5A059]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-right">
          
          {/* Col 1: About Society */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={SOCIETY_INFO.logoUrl}
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
              جمعية أهلية مصرية رائدة مشهرة برقم 3744 لسنة 1991 بإدارة المطرية - القاهرة. نعمل منذ أكثر من 33 عاماً في رعاية الأيتام والفقراء وتسيير القوافل الطبية وعمارة بيوت الله وسيارة نقل الموتى.
            </p>

            <div className="pt-2 text-[11px] text-emerald-400 font-mono">
              تاريخ اعتماد اللائحة: {SOCIETY_INFO.bylawApprovalDate}
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
                  {SOCIETY_INFO.paymentGateways.instaPay.id}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-900">
                <span className="text-stone-400 block text-[11px]">فودافون كاش ومحافظ المحمول:</span>
                <span className="font-mono text-white font-bold block mt-0.5 select-all">
                  {SOCIETY_INFO.phone}
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
                <span className="font-mono text-stone-200">{SOCIETY_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-[11px] leading-tight">18 ش ترعة التوفيقية - عزبة النخل - المطرية</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Quranic Quote */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <p>
              © {new Date().getFullYear()} جمعية الصفوة الإسلامية - مشهرة برقم 3744 لسنة 1991. جميع الحقوق محفوظة.
            </p>
          </div>
          
          <p className="font-serif text-sm text-amber-300 font-bold">
            "وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ"
          </p>
        </div>

      </div>
    </footer>
  );
};
