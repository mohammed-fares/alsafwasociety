import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle2, Eye, X, Building2, MapPin, Calendar, Award } from 'lucide-react';
import { SOCIETY_INFO } from '../data/societyData';

export const LegalBylawsSection: React.FC = () => {
  const [showDocModal, setShowDocModal] = useState(false);

  return (
    <section id="bylaws" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#0F5132] tracking-widest uppercase mb-2">
            <ShieldCheck className="w-4 h-4 text-[#8C6A28]" />
            <span>الشفافية والتوثيق القانوني الرسمي</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 leading-tight">
            البيانات الأساسية ولائحة النظام الأساسي
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed mt-3">
            جمعية مشهرة بمديرية التضامن الاجتماعي بالقاهرة برقم 3744 لسنة 1991 وتخضع لإشراف إدارة المطرية الاجتماعية، وتلتزم بأعلى معايير الحوكمة والنزاهة المالية.
          </p>
        </div>

        {/* Core Institutional Fact Sheet Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          
          <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-5 text-center shadow-xs">
            <Award className="w-6 h-6 text-[#0F5132] mx-auto mb-2" />
            <span className="block text-2xl sm:text-3xl font-black text-[#0F5132] font-mono">
              3744
            </span>
            <span className="block text-xs font-bold text-stone-700 mt-1">
              رقم القيد الرسمي
            </span>
            <span className="block text-[11px] text-stone-500 font-mono">
              لسنة 1991
            </span>
          </div>

          <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-5 text-center shadow-xs">
            <Building2 className="w-6 h-6 text-[#0F5132] mx-auto mb-2" />
            <span className="block text-xl sm:text-2xl font-black text-stone-900">
              إدارة المطرية
            </span>
            <span className="block text-xs font-bold text-stone-700 mt-1">
              جهة القيد والإشراف
            </span>
            <span className="block text-[11px] text-stone-500">
              مديرية القاهرة
            </span>
          </div>

          <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-5 text-center shadow-xs">
            <Calendar className="w-6 h-6 text-[#0F5132] mx-auto mb-2" />
            <span className="block text-lg sm:text-xl font-black text-[#0F5132] font-mono">
              03 / 07 / 2023
            </span>
            <span className="block text-xs font-bold text-stone-700 mt-1">
              اعتماد اللائحة الحديثة
            </span>
            <span className="block text-[11px] text-stone-500">
              وفقاً للقانون
            </span>
          </div>

          <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-5 text-center shadow-xs">
            <MapPin className="w-6 h-6 text-[#0F5132] mx-auto mb-2" />
            <span className="block text-xl sm:text-2xl font-black text-stone-900">
              المحافظة
            </span>
            <span className="block text-xs font-bold text-stone-700 mt-1">
              النطاق الجغرافي
            </span>
            <span className="block text-[11px] text-stone-500">
              جمعية محلية معتمدة
            </span>
          </div>

        </div>

        {/* Bylaws Articles (الفصل الأول من اللائحة) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0F5132]" />
                <span>مواد الفصل الأول من لائحة النظام الأساسي</span>
              </h3>
              <span className="text-xs text-stone-500 font-mono">موثقة ومختومة رسمياً</span>
            </div>

            <div className="space-y-4">
              {SOCIETY_INFO.articles.map((art) => (
                <div 
                  key={art.number} 
                  className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 text-right hover:border-emerald-700/30 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-extrabold text-[#0F5132] bg-emerald-50 px-2.5 py-1 rounded-md">
                      {art.number}
                    </span>
                    <h4 className="text-sm font-bold text-stone-900">
                      {art.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                    {art.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Document Preview Card */}
          <div className="lg:col-span-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 text-right space-y-5">
            <div>
              <span className="text-xs font-bold text-[#0F5132] tracking-wider block mb-1">
                صورة المستند الأصلي
              </span>
              <h4 className="text-base font-bold text-stone-900">
                وثيقة لائحة النظام الأساسي المعتمدة
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                تحمل أختام مديرية التضامن الاجتماعي بالقاهرة وإدارة المطرية.
              </p>
            </div>

            <div 
              onClick={() => setShowDocModal(true)}
              className="relative rounded-xl overflow-hidden border border-stone-300 group cursor-pointer shadow-xs"
            >
              <img 
                src={SOCIETY_INFO.bylawsDocUrl} 
                alt="وثيقة لائحة النظام الأساسي لجمعية الصفوة الإسلامية" 
                className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2">
                <Eye className="w-4 h-4" />
                <span>تكبير واستعراض الوثيقة الأصلية</span>
              </div>
            </div>

            <button
              onClick={() => setShowDocModal(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#0F5132]" />
              <span>استعراض وثيقة الإشهار كاملة</span>
            </button>

            <div className="pt-2 border-t border-stone-200 text-xs text-stone-500 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>عنوان المقر: 18 ش ترعة التوفيقية - عزبة النخل الغربية</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>حسابات بنكية ورقمية تخضع لرقابة الأجهزة المعنية</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Document Fullscreen Modal */}
      {showDocModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-stone-200">
              <div className="text-right">
                <h4 className="text-base font-bold text-stone-900">
                  وثيقة النظام الأساسي الرسمية - جمعية الصفوة الإسلامية (قيد 3744 لسنة 1991)
                </h4>
                <p className="text-xs text-stone-500">
                  إدارة المطرية الاجتماعية - تاريخ الاعتماد 03/07/2023
                </p>
              </div>
              <button
                onClick={() => setShowDocModal(false)}
                className="p-2 text-stone-500 hover:text-stone-800 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-stone-100 text-center">
              <img 
                src={SOCIETY_INFO.bylawsDocUrl} 
                alt="لائحة النظام الأساسي لجمعية الصفوة الإسلامية كاملة" 
                className="max-w-full h-auto mx-auto rounded-lg shadow-md"
              />
            </div>
            <div className="p-3 bg-stone-50 border-t border-stone-200 text-center text-xs text-stone-600">
              لأي استفسار قانوني أو التحقق من القيد يمكن التواصل المباشر مع الجمعية على {SOCIETY_INFO.phone}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
