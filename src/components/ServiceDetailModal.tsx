import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  HandHelping, 
  CheckCircle2, 
  Clock, 
  Phone, 
  MapPin, 
  AlertCircle,
  Share2
} from 'lucide-react';
import { ActivityProgram, BeneficiaryRequest } from '../types';
import { SOCIETY_INFO } from '../data/societyData';

interface ServiceDetailModalProps {
  program: ActivityProgram | null;
  isOpen: boolean;
  onClose: () => void;
  onDonate: (programId: string, amount?: number) => void;
  onSubmitBeneficiaryRequest: (request: BeneficiaryRequest) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  program,
  isOpen,
  onClose,
  onDonate,
  onSubmitBeneficiaryRequest,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'request_help'>('details');
  
  // Request Help Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState('');
  const [urgency, setUrgency] = useState<BeneficiaryRequest['urgency']>('عادي');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !program) return null;

  const percentRaised = Math.min(100, Math.round((program.raisedAmount / program.targetAmount) * 100));

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) return;

    const newRequest: BeneficiaryRequest = {
      id: `REQ-${Date.now().toString().slice(-6)}`,
      serviceId: program.id,
      serviceTitle: program.title,
      applicantName,
      applicantPhone,
      nationalId,
      address,
      details,
      urgency,
      status: 'قيد المراجعة',
      createdAt: new Date().toLocaleDateString('ar-EG'),
    };

    onSubmitBeneficiaryRequest(newRequest);
    setSubmitted(true);

    // Also offer direct WhatsApp notification
    const waText = `طلب مساعدة / استفادة جديد:
🎯 الخدمة المطلوبة: ${program.title}
👤 اسم مقدم الطلب: ${applicantName}
📱 هاتف: ${applicantPhone}
📍 العنوان: ${address}
⚠️ درجة الاستعجال: ${urgency}
📝 تفاصيل الحالة: ${details}`;

    window.open(`https://wa.me/201115947455?text=${encodeURIComponent(waText)}`, '_blank');

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-auto overflow-hidden shadow-2xl border border-stone-200 text-right flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#052316] text-white p-5 flex items-center justify-between border-b border-emerald-900">
          <div>
            <span className="text-[11px] text-amber-300 font-bold block mb-1">
              {program.category} · جمعية الصفوة الإسلامية (قيد 3794)
            </span>
            <h3 className="text-xl font-black text-white">{program.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Action Choice Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'details'
                ? 'border-[#0F5132] text-[#0F5132] bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            تفاصيل النشاط والتبرع
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('request_help')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'request_help'
                ? 'border-[#0F5132] text-[#0F5132] bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            تقديم طلب مساعدة أو استفادة في هذه الخدمة
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl">
                <span className="text-xs font-bold text-[#8C6A28] block mb-1">{program.subtitle}</span>
                <p className="text-sm text-stone-700 leading-relaxed font-sans">
                  {program.description}
                </p>
                {program.unitDescription && (
                  <div className="mt-3 p-2.5 bg-emerald-50 text-[#0F5132] text-xs font-bold rounded-lg border border-emerald-100">
                    💡 {program.unitDescription}
                  </div>
                )}
              </div>

              {/* Progress & Statistics */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-stone-700">
                    تم جمع: <strong className="text-[#0F5132] font-mono">{program.raisedAmount.toLocaleString('ar-EG')} ج.م</strong>
                  </span>
                  <span className="text-[#0F5132] font-mono">{percentRaised}%</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden border border-stone-200">
                  <div
                    className="bg-[#0F5132] h-full rounded-full transition-all duration-700"
                    style={{ width: `${percentRaised}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-stone-500 font-mono">
                  <span>الهدف الكلي: {program.targetAmount.toLocaleString('ar-EG')} ج.م</span>
                  <span>عدد المساهمين: {program.donorCount} متبرع</span>
                </div>
              </div>

              {/* Quick Donation Buttons */}
              <div className="space-y-3 pt-2 border-t border-stone-200">
                <span className="text-xs font-bold text-stone-700 block">
                  اختر سهم التبرع لهذا النشاط:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {program.defaultAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        onClose();
                        onDonate(program.id, amt);
                      }}
                      className="py-2.5 px-2 bg-stone-100 hover:bg-[#0F5132] hover:text-white rounded-xl text-xs font-bold text-stone-800 transition-colors font-mono cursor-pointer"
                    >
                      {amt.toLocaleString('ar-EG')} ج.م
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onDonate(program.id);
                    }}
                    className="flex-1 py-3 px-4 bg-[#0F5132] hover:bg-[#0A3622] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>تبرع بمبلغ مخصص لهذا النشاط</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('request_help')}
                    className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    طلب مساعدة
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'request_help' && (
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  تستقبل جمعية الصفوة الإسلامية طلبات المساعدة للأسر المستحقة والأيتام والحالات العاجلة بمحافظة القاهرة وعزبة النخل والمطرية. يتم فحص كل طلب بسرية تامة بمعرفة لجنة البحث الاجتماعي.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">اسم صاحب الطلب أو الحالة *</label>
                  <input
                    type="text"
                    required
                    placeholder="الاسم الثلاثي"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">رقم الهاتف / الواتساب للتواصل *</label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">الرقم القومي (اختياري للتحقق)</label>
                  <input
                    type="text"
                    maxLength={14}
                    placeholder="14 رقم"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">درجة الاستعجال</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as BeneficiaryRequest['urgency'])}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-bold text-stone-800"
                  >
                    <option value="عادي">عادي (بحث اجتماعي دوري)</option>
                    <option value="متوسط">متوسط (خلال أيام قليلة)</option>
                    <option value="عاجل جداً (خلال 24 ساعة)">عاجل جداً (خلال 24 ساعة - كسيارة الموتى أو جراحة)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">عنوان السكن بالتفصيل</label>
                <input
                  type="text"
                  placeholder="المحافظة - الحي - الشارع - علامة مميزة"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">شرح تفاصيل الحالة والاحتياج المطلوب</label>
                <textarea
                  rows={3}
                  required
                  placeholder="اشرح ظروف الحالة وما تحتاجه بالتفصيل..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl"
                ></textarea>
              </div>

              {submitted && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-[#0F5132] font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>تم تسجيل طلبك بنجاح، وجاري تحويل البيانات لواتساب الجمعية فوراً!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#0F5132] hover:bg-[#0A3622] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <HandHelping className="w-4 h-4 text-amber-300" />
                <span>إرسال طلب المساعدة مباشرة للجمعية</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
