import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  CreditCard, 
  Smartphone, 
  Building, 
  UserCheck, 
  Check, 
  Copy, 
  ShieldCheck, 
  AlertCircle,
  Truck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ACTIVITIES_DATA, SOCIETY_INFO } from '../data/societyData';
import { PaymentMethodType, DonationReceiptData } from '../types';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProgramId?: string;
  initialAmount?: number;
  initialIsMonthly?: boolean;
  onDonationComplete: (receipt: DonationReceiptData) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  initialProgramId,
  initialAmount = 250,
  initialIsMonthly = false,
  onDonationComplete,
}) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(
    initialProgramId || ACTIVITIES_DATA[0].id
  );
  const [amount, setAmount] = useState<number>(initialAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isMonthly, setIsMonthly] = useState<boolean>(initialIsMonthly);
  const [intention, setIntention] = useState<string>('صدقة عامة');
  
  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('instapay');
  
  // Donor Details
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!isOpen) return null;

  const currentProgram = ACTIVITIES_DATA.find((p) => p.id === selectedProgramId) || ACTIVITIES_DATA[0];
  const quickAmounts = currentProgram.defaultAmounts || [50, 100, 250, 500, 1000];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleAmountClick = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    if (val) {
      setAmount(Number(val));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      setErrorMessage('يرجى تحديد مبلغ التبرع');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('يرجى إدخال رقم الهاتف أو الواتساب لتأكيد وإرسال الإيصال');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0F5132', '#C5A059', '#15803D', '#D4AF37'],
        });
      } catch (err) {
        console.error(err);
      }

      const receiptNumber = `ALSAFWA-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const receipt: DonationReceiptData = {
        receiptNumber,
        date: new Date().toLocaleDateString('ar-EG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        donorName: isAnonymous ? 'فاعل خير (متبرع كريم)' : (fullName.trim() || 'فاعل خير'),
        phone: phone.trim(),
        amount: amount,
        currency: 'جنيه مصري (EGP)',
        programs: [
          {
            title: currentProgram.title,
            amount: amount,
            intention: intention,
          },
        ],
        paymentMethod: paymentMethod,
        paymentReference: `TX-${Math.floor(10000000 + Math.random() * 90000000)}`,
        status: 'confirmed',
        bylawReference: 'جمعية الصفوة الإسلامية - قيد رقم 3794 لسنة 1991',
      };

      setIsSubmitting(false);
      onClose();
      onDonationComplete(receipt);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-auto overflow-hidden shadow-2xl border border-stone-200 text-right flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="bg-[#052316] text-white p-5 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">بوابة التبرع المباشر</h3>
              <p className="text-xs text-emerald-300">
                جمعية الصفوة الإسلامية · قيد 3794 لسنة 1991
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-300 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body / Scrollable Content */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Program Select */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              حدد النشاط أو المشروع المراد التبرع له
            </label>
            <select
              value={selectedProgramId}
              onChange={(e) => setSelectedProgramId(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
            >
              {ACTIVITIES_DATA.map((prog) => (
                <option key={prog.id} value={prog.id}>
                  {prog.title} - ({prog.category})
                </option>
              ))}
            </select>
            {currentProgram.unitDescription && (
              <p className="text-[11px] text-[#0F5132] mt-1 font-semibold">
                {currentProgram.unitDescription}
              </p>
            )}
          </div>

          {/* Amount Selection */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              مبلغ التبرع (جنيه مصري)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
              {quickAmounts.map((amt) => {
                const isSelected = amount === amt && !customAmount;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleAmountClick(amt)}
                    className={`py-2 px-1 text-xs font-black rounded-xl transition-all cursor-pointer font-mono ${
                      isSelected
                        ? 'bg-[#0F5132] text-white shadow-xs'
                        : 'bg-[#FAF8F5] border border-stone-200 text-stone-700 hover:border-emerald-600'
                    }`}
                  >
                    {amt.toLocaleString('ar-EG')} ج
                  </button>
                );
              })}
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="أو اكتب مبلغاً آخر هنا"
                value={customAmount}
                onChange={handleCustomChange}
                className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
              />
              <span className="absolute left-3.5 top-2.5 text-xs font-bold text-stone-400">
                جنيه مصري
              </span>
            </div>
          </div>

          {/* Intention & Recurrence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                نية التبرع المباركة
              </label>
              <select
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
              >
                <option value="صدقة عامة">صدقة عامة مطلقة</option>
                <option value="زكاة مال">زكاة مال مفروضة</option>
                <option value="كفالة يتيم">كفالة يتيم</option>
                <option value="صدقة جارية (سيارة الموتى / مساجد)">صدقة جارية (سيارة موتى / عمارة مساجد)</option>
                <option value="إطعام طعام وكرتونة رمضان">إطعام طعام وكراتين مواد غذائية</option>
                <option value="كفارة أو نذر">كفارة أو نذر</option>
                <option value="علاج مريض وقوافل طبية">علاج مريض وقوافل طبية</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                نوع المساهمة
              </label>
              <div className="flex items-center p-1 bg-[#FAF8F5] border border-stone-200 rounded-xl">
                <button
                  type="button"
                  onClick={() => setIsMonthly(false)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    !isMonthly ? 'bg-[#0F5132] text-white shadow-xs' : 'text-stone-600'
                  }`}
                >
                  مرة واحدة
                </button>
                <button
                  type="button"
                  onClick={() => setIsMonthly(true)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    isMonthly ? 'bg-[#0F5132] text-white shadow-xs' : 'text-stone-600'
                  }`}
                >
                  كفالة شهرية
                </button>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2">
              طريقة الدفع المعتمدة
            </label>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('instapay')}
                className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                  paymentMethod === 'instapay'
                    ? 'border-[#0F5132] bg-emerald-50 text-[#0F5132] font-black ring-1 ring-[#0F5132]'
                    : 'border-stone-200 bg-[#FAF8F5] text-stone-700'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-xs">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>إنستاباي (InstaPay)</span>
                </div>
                <span className="text-[10px] text-stone-500 block">فوري بدون رسوم</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('vodafone_cash')}
                className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                  paymentMethod === 'vodafone_cash'
                    ? 'border-[#0F5132] bg-emerald-50 text-[#0F5132] font-black ring-1 ring-[#0F5132]'
                    : 'border-stone-200 bg-[#FAF8F5] text-stone-700'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-xs">
                  <Smartphone className="w-3.5 h-3.5 text-red-600" />
                  <span>فودافون كاش</span>
                </div>
                <span className="text-[10px] text-stone-500 block">وكافة محافظ المحمول</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-[#0F5132] bg-emerald-50 text-[#0F5132] font-black ring-1 ring-[#0F5132]'
                    : 'border-stone-200 bg-[#FAF8F5] text-stone-700'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-xs">
                  <CreditCard className="w-3.5 h-3.5 text-blue-700" />
                  <span>فيزا / ميزة</span>
                </div>
                <span className="text-[10px] text-stone-500 block">بطاقات بنكية مباشرة</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-[#0F5132] bg-emerald-50 text-[#0F5132] font-black ring-1 ring-[#0F5132]'
                    : 'border-stone-200 bg-[#FAF8F5] text-stone-700'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-xs">
                  <Building className="w-3.5 h-3.5 text-amber-700" />
                  <span>تحويل بنكي</span>
                </div>
                <span className="text-[10px] text-stone-500 block">الأهلي ومصر</span>
              </button>
            </div>

            {/* Payment Details Drawer based on selection */}
            {paymentMethod === 'instapay' && (
              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl text-xs space-y-2">
                <span className="font-bold text-[#0F5132] block">
                  معرف إنستاباي المعتمد (InstaPay IPA):
                </span>
                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-emerald-300">
                  <span className="font-mono font-bold text-stone-800 text-sm">
                    {SOCIETY_INFO.paymentGateways.instaPay.id}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(SOCIETY_INFO.paymentGateways.instaPay.id, 'ipa')}
                    className="flex items-center gap-1 px-3 py-1 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedKey === 'ipa' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'ipa' ? 'تم النسخ' : 'نسخ المعرف'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-stone-600">
                  أو يمكنك التحويل على رقم الهاتف: <strong className="font-mono text-stone-900">{SOCIETY_INFO.phone}</strong> عبر تطبيق InstaPay.
                </p>
              </div>
            )}

            {paymentMethod === 'vodafone_cash' && (
              <div className="p-4 bg-red-50/80 border border-red-200 rounded-2xl text-xs space-y-2">
                <span className="font-bold text-red-900 block">
                  رقم محفظة فودافون كاش الرسمية للجمعية:
                </span>
                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-red-300">
                  <span className="font-mono font-bold text-stone-800 text-sm">
                    {SOCIETY_INFO.phone}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(SOCIETY_INFO.phone, 'voda')}
                    className="flex items-center gap-1 px-3 py-1 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedKey === 'voda' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'voda' ? 'تم النسخ' : 'نسخ الرقم'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-stone-600">
                  حول المبلغ المطلوب من محفظتك إلى الرقم أعلاه، وسيصلك إيصال التبرع الرسمي فوراً.
                </p>
              </div>
            )}

            {paymentMethod === 'bank_transfer' && (
              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs space-y-3">
                <span className="font-bold text-amber-900 block">
                  حسابات جمعية الصفوة الإسلامية بالبنوك المصرية:
                </span>
                <div className="space-y-2">
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-800 block">البنك الأهلي المصري (NBE)</span>
                      <span className="font-mono text-stone-600 text-xs">رقم الحساب: 10912384758001</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('10912384758001', 'nbe')}
                      className="px-2.5 py-1 bg-amber-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      {copiedKey === 'nbe' ? 'تم النسخ' : 'نسخ'}
                    </button>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-800 block">بنك مصر (Banque Misr)</span>
                      <span className="font-mono text-stone-600 text-xs">رقم الحساب: 34800010009841</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('34800010009841', 'misr')}
                      className="px-2.5 py-1 bg-amber-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      {copiedKey === 'misr' ? 'تم النسخ' : 'نسخ'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl text-xs space-y-2">
                <span className="font-bold text-blue-900 block">
                  الدفع الآمن بالبطاقات الائتمانية وبطاقات ميزة الوطنية
                </span>
                <p className="text-[11px] text-stone-600">
                  بوابة مشفرة بمعايير PCI-DSS لخصم مبلغ التبرع لحساب جمعية الصفوة الإسلامية وإصدار إيصال إلكتروني فوري.
                </p>
              </div>
            )}
          </div>

          {/* Donor Information */}
          <div className="space-y-3 pt-2 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700">
                بيانات المتبرع الكريم (لإصدار الإيصال)
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-600">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-[#0F5132] focus:ring-[#0F5132]"
                />
                <span>التبرع كـ (فاعل خير / سر)</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder={isAnonymous ? 'فاعل خير (مخفي)' : 'الاسم الثلاثي أو المستعار'}
                  disabled={isAnonymous}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-900 disabled:opacity-50"
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="رقم الهاتف أو الواتساب (مطلوب للإيصال) *"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-900"
                />
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="دعاء أو رسالة أو توصية خاصة (اختياري)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-900"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-[#0F5132] hover:bg-[#0A3622] text-white font-black text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>جاري معالجة التبرع وتوليد الإيصال...</span>
              ) : (
                <>
                  <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>تأكيد التبرع بمبلغ {amount.toLocaleString('ar-EG')} ج.م وإصدار الإيصال</span>
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>إيصالك الرقمي موثق رسمياً برقم قيد الجمعية 3794 لسنة 1991</span>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
