import React from 'react';
import { Truck, Heart, FileText, Check, ShieldCheck } from 'lucide-react';
import { ACTIVITIES_DATA, SOCIETY_INFO } from '../data/societyData';

interface HearseProjectSpotlightProps {
  onDonate: (programId: string, customAmount?: number) => void;
}

export const HearseProjectSpotlight: React.FC<HearseProjectSpotlightProps> = ({ onDonate }) => {
  const hearseProject = ACTIVITIES_DATA.find((p) => p.id === 'hearse-project') || ACTIVITIES_DATA[1];
  const percentRaised = Math.min(100, Math.round((hearseProject.raisedAmount / hearseProject.targetAmount) * 100));

  const shares = [
    { label: 'سهم إكرام الموتى', amount: 250, desc: 'مساهمة في الصيانة والمستلزمات' },
    { label: 'سهم الصدقة الجارية', amount: 500, desc: 'سهم معتمد في قيمة السيارة' },
    { label: 'سهم التجهيز الطبي والتبريد', amount: 1000, desc: 'تجهيزات التبريد والسرير المتطور' },
    { label: 'سهم الوفاء عن المتوفى', amount: 5000, desc: 'صدقة جارية كبرى عن روح متوفى' },
  ];

  return (
    <section id="hearse-project" className="py-16 sm:py-20 bg-emerald-950 text-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-5 mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 border border-amber-400/40 rounded-full text-xs text-amber-300 font-bold mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>المادة (4) من لائحة النظام الأساسي المعتمدة بتاريخ {SOCIETY_INFO.bylawApprovalDate}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
            مشروع شراء وتجهيز سيارة نقل ودفن الموتى
            <span className="block text-amber-300 text-lg sm:text-xl font-serif font-bold mt-1">
              "إكرام الميت دفنه" · صدقة جارية تبقى أجرها
            </span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mt-4">
            انطلاقاً من نص المادة الرابعة من لائحة جمعية الصفوة الإسلامية المشهرة برقم 3744 لسنة 1991، تطلق الجمعية هذا المشروع الإنساني لتوفير سيارة مجهزة بأحدث وسائل الحفظ والنقل المجاني على مدار 24 ساعة للأسر المتعففة وغير القادرة بمحافظة القاهرة والمطرية وعزبة النخل.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Details & Equipment Card */}
          <div className="lg:col-span-7 bg-emerald-900/60 border border-emerald-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center gap-3 pb-4 border-b border-emerald-800/80">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">مواصفات وتجهيزات السيارة المعتمدة</h3>
                <p className="text-xs text-emerald-300 font-mono">خدمة مجانية 100% لوجه الله تعالى</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2 text-stone-200">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>وحدة تبريد متطورة لحفظ ونقل الجثامين بأمان وكرامة</span>
              </div>
              <div className="flex items-start gap-2 text-stone-200">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>نقالات هيدروليكية حديثة وسهلة التحميل</span>
              </div>
              <div className="flex items-start gap-2 text-stone-200">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>توفير أكفان ومستلزمات التغسيل الشرعي مجاناً للمتعففين</span>
              </div>
              <div className="flex items-start gap-2 text-stone-200">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>جاهزية كاملة على مدار 24 ساعة عبر خط ساخن</span>
              </div>
            </div>

            {/* Target and Raised Progress */}
            <div className="pt-2 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-emerald-200">
                  تم جمع: <strong className="text-white font-mono">{hearseProject.raisedAmount.toLocaleString('ar-EG')} ج.م</strong>
                </span>
                <span className="text-amber-300">
                  المستهدف: <strong className="font-mono">{hearseProject.targetAmount.toLocaleString('ar-EG')} ج.م</strong> ({percentRaised}%)
                </span>
              </div>
              <div className="w-full bg-emerald-950 rounded-full h-3 overflow-hidden border border-emerald-800">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${percentRaised}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-stone-400 text-left font-mono">
                عدد المساهمين حتى الآن: {hearseProject.donorCount.toLocaleString('ar-EG')} مساهماً
              </p>
            </div>

          </div>

          {/* Donation Shares Card */}
          <div className="lg:col-span-5 bg-white text-stone-900 rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-amber-400/40">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-[#0F5132] tracking-wider block mb-1">
                صدقة جارية مستمرة لك أو لوالديك
              </span>
              <h4 className="text-xl font-black text-stone-900">
                اختر سهم المساهمة في السيارة
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                تُودع التبرعات في حساب الجمعية الرسمي بإشراف وزارة التضامن
              </p>
            </div>

            <div className="space-y-2.5 mb-6">
              {shares.map((share) => (
                <button
                  key={share.amount}
                  onClick={() => onDonate(hearseProject.id, share.amount)}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:border-[#0F5132] hover:bg-emerald-50/50 transition-all text-right group cursor-pointer"
                >
                  <div>
                    <span className="block text-xs font-bold text-stone-900 group-hover:text-[#0F5132]">
                      {share.label}
                    </span>
                    <span className="block text-[11px] text-stone-500">
                      {share.desc}
                    </span>
                  </div>
                  <span className="text-sm font-black text-[#0F5132] font-mono group-hover:scale-105 transition-transform">
                    {share.amount.toLocaleString('ar-EG')} ج.م
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => onDonate(hearseProject.id)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0F5132] hover:bg-[#0A3622] text-white font-bold text-sm rounded-xl shadow-md transition-colors cursor-pointer"
            >
              <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>تبرع بأي مبلغ مخصص للسيارة</span>
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>إيصال تبرع فوري وموثق بالرقم القومي والقيد 3744</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
