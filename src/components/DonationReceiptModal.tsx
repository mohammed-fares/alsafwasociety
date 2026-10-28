import React from 'react';
import { X, Printer, Share2, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { DonationReceiptData, SiteContentData } from '../types';
import { SOCIETY_INFO } from '../data/societyData';

interface DonationReceiptModalProps {
  receipt: DonationReceiptData | null;
  onClose: () => void;
  content?: SiteContentData;
}

export const DonationReceiptModal: React.FC<DonationReceiptModalProps> = ({
  receipt,
  onClose,
  content,
}) => {
  const info = content || (SOCIETY_INFO as unknown as SiteContentData);
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const getWhatsAppShareUrl = () => {
    const text = `السلام عليكم ورحمة الله وبركاته،
أرغب في تأكيد تبرعي لجمعية الصفوة الإسلامية:
📋 إيصال رقم: ${receipt.receiptNumber}
👤 المتبرع: ${receipt.donorName}
📱 الهاتف: ${receipt.phone}
💰 المبلغ: ${receipt.amount.toLocaleString('ar-EG')} جنيه مصري
🎯 المشاريع: ${receipt.programs.map((p) => `${p.title} (${p.intention})`).join('، ')}
💳 طريقة الدفع: ${receipt.paymentMethod}
🔖 الرقم المرجعي: ${receipt.paymentReference || 'N/A'}
📅 التاريخ: ${receipt.date}
جزاكم الله خيراً وبارك في جهودكم.`;

    return `https://wa.me/201115947455?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-auto overflow-hidden shadow-2xl border border-stone-200 text-right flex flex-col max-h-[95vh]">
        
        {/* Top Actions Bar (Hidden on print) */}
        <div className="bg-[#052316] text-white p-4 flex items-center justify-between border-b border-emerald-900 print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">تم تأكيد التبرع وإصدار الإيصال بنجاح</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Receipt Area */}
        <div id="printable-receipt" className="p-6 sm:p-8 bg-[#FAF8F5] text-stone-900 space-y-6 overflow-y-auto">
          
          {/* Receipt Top Header */}
          <div className="border-b-2 border-[#0F5132] pb-6 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={info.logoUrl}
                alt="شعار جمعية الصفوة الإسلامية"
                className="w-16 h-16 object-contain rounded-full border border-emerald-200 p-1 bg-white"
              />
              <div>
                <h3 className="text-xl font-black text-[#0F5132]">
                  جمعية الصفوة الإسلامية
                </h3>
                <span className="block text-xs font-mono font-bold text-[#8C6A28]">
                  ALSAFWA ISLAMIC SOCIETY
                </span>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  مشهرة برقم {info.registrationNumber} لسنة {info.registrationYear} · إدارة المطرية - القاهرة
                </p>
              </div>
            </div>

            <div className="text-left font-mono">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-[#0F5132] font-black text-xs rounded-md">
                إيصال تبرع رسمي
              </span>
              <p className="text-xs text-stone-500 mt-1">
                رقم: <strong className="text-stone-900">{receipt.receiptNumber}</strong>
              </p>
              <p className="text-[11px] text-stone-400">
                {receipt.date}
              </p>
            </div>
          </div>

          {/* Quranic Verse */}
          <div className="text-center py-2 bg-emerald-50/70 border border-emerald-100 rounded-xl">
            <p className="font-serif text-lg text-[#0F5132] font-bold">
              "وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ هُوَ خَيْرًا وَأَعْظَمَ أَجْرًا"
            </p>
          </div>

          {/* Donor & Amount Details */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="text-stone-500 block mb-1">اسم المتبرع الكريم:</span>
              <span className="text-sm font-bold text-stone-900">{receipt.donorName}</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="text-stone-500 block mb-1">الهاتف المسجل:</span>
              <span className="text-sm font-mono font-bold text-stone-900">{receipt.phone}</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="text-stone-500 block mb-1">طريقة الدفع:</span>
              <span className="text-sm font-bold text-stone-900">{receipt.paymentMethod}</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="text-stone-500 block mb-1">الرقم المرجعي:</span>
              <span className="text-sm font-mono font-bold text-[#0F5132]">{receipt.paymentReference}</span>
            </div>
          </div>

          {/* Programs Table */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <table className="w-full text-right text-xs">
              <thead className="bg-stone-100 border-b border-stone-200 text-stone-700 font-bold">
                <tr>
                  <th className="p-3">م</th>
                  <th className="p-3">المشروع / النشاط الخيري</th>
                  <th className="p-3">النية</th>
                  <th className="p-3 text-left">المبلغ (ج.م)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium">
                {receipt.programs.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-mono">{idx + 1}</td>
                    <td className="p-3 font-bold text-stone-900">{item.title}</td>
                    <td className="p-3 text-stone-600">{item.intention}</td>
                    <td className="p-3 text-left font-mono font-bold text-[#0F5132]">
                      {item.amount.toLocaleString('ar-EG')} ج.م
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-emerald-50/50 border-t border-stone-200 font-black text-sm">
                <tr>
                  <td colSpan={3} className="p-3 text-stone-900">إجمالي مبلغ التبرع:</td>
                  <td className="p-3 text-left text-base font-black text-[#0F5132] font-mono">
                    {receipt.amount.toLocaleString('ar-EG')} ج.م
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Official Stamp Representation */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <div className="space-y-1 text-xs text-stone-600">
              <div className="flex items-center gap-1.5 font-bold text-[#0F5132]">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>إيصال معتمد صادر إلكترونياً</span>
              </div>
              <p className="text-[11px] text-stone-500">
                المقر: {SOCIETY_INFO.address}
              </p>
              <p className="text-[11px] text-stone-500 font-mono">
                هاتف واستفسارات: {SOCIETY_INFO.phone}
              </p>
            </div>

            {/* Circular Official Society Seal */}
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#0F5132] p-1 flex flex-col items-center justify-center text-center text-[#0F5132] rotate-6 bg-white/80 shadow-xs">
              <span className="text-[9px] font-bold">جمعية الصفوة الإسلامية</span>
              <span className="text-[11px] font-black font-mono my-0.5">قيد {SOCIETY_INFO.registrationNumber}</span>
              <span className="text-[8px] font-semibold">إدارة المطرية - القاهرة</span>
            </div>
          </div>

        </div>

        {/* Bottom Actions (Hidden on print) */}
        <div className="bg-white p-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <a
            href={getWhatsAppShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>إرسال تفاصيل الإيصال لواتساب الجمعية ({SOCIETY_INFO.phone})</span>
          </a>

          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-stone-600" />
            <span>طباعة / حفظ PDF</span>
          </button>

          <button
            onClick={onClose}
            className="py-2.5 px-4 text-stone-600 hover:text-stone-900 font-bold text-xs cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
