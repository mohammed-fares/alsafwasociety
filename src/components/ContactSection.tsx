import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { SOCIETY_INFO } from '../data/societyData';

export const ContactSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [subject, setSubject] = useState('استفسار عن التبرعات');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `السلام عليكم ورحمة الله،
أود الاستفسار من جمعية الصفوة الإسلامية:
👤 الاسم: ${senderName || 'فاعل خير'}
📱 الهاتف: ${senderPhone || 'غير محدد'}
📌 الموضوع: ${subject}
💬 الرسالة: ${message}`;

    window.open(`https://wa.me/201115947455?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#0F5132] tracking-widest uppercase mb-2">
            <span>نسعد دائماً بالتواصل معكم</span>
            <span aria-hidden="true">·</span>
            <span>في خدمتكم يومياً</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 leading-tight">
            تواصل مع جمعية الصفوة الإسلامية
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed mt-3">
            لزيارة مقر الجمعية أو طلب مندوب تحصيل التبرعات أو الاستفسار عن كفالة الأيتام والمشاريع الخيرية.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Information & Channels */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200 space-y-5">
              <h3 className="text-lg font-bold text-stone-900 pb-3 border-b border-stone-200">
                بيانات المقر الرسمي والقيد
              </h3>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0F5132] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold text-stone-800">عنوان المقر الرئيسي:</span>
                  <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                    {SOCIETY_INFO.address}
                  </p>
                  <span className="inline-block mt-1 text-[11px] text-[#0F5132] font-semibold">
                    (المادة 1 من لائحة النظام الأساسي)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0F5132] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold text-stone-800">الهاتف والواتساب الموحد:</span>
                  <a href={`tel:${SOCIETY_INFO.phone}`} className="font-mono text-sm font-bold text-[#0F5132] hover:underline block mt-0.5">
                    {SOCIETY_INFO.phone}
                  </a>
                  <a 
                    href={SOCIETY_INFO.whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] text-emerald-700 font-bold hover:underline mt-1"
                  >
                    محادثة واتساب مباشرة ←
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0F5132] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold text-stone-800">البريد الإلكتروني:</span>
                  <span className="font-mono text-xs text-stone-600 block mt-0.5">
                    {SOCIETY_INFO.email}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0F5132] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold text-stone-800">مواعيد العمل واستقبال الزوار:</span>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {SOCIETY_INFO.workHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Trust Box */}
            <div className="p-4 rounded-xl bg-emerald-950 text-white border border-emerald-900 text-xs flex items-center justify-between">
              <div>
                <span className="block text-amber-300 font-bold">قيد رقم 3744 لسنة 1991</span>
                <span className="text-stone-300 text-[11px]">وزارة التضامن الاجتماعي - مديرية القاهرة</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-300">منذ 1991</span>
            </div>

          </div>

          {/* Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-stone-200">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-stone-900">
                أرسل استفسارك أو طلب مندوب التحصيل
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                سيتم توجيه رسالتك مباشرة لفريق خدمة المتبرعين والرعاية الاجتماعية بالجمعية
              </p>
            </div>

            <form onSubmit={handleSendWhatsApp} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">الاسم الكريم</label>
                  <input
                    type="text"
                    required
                    placeholder="اسمك الكريم"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">رقم الهاتف أو الواتساب</label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">موضوع الرسالة</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                >
                  <option value="استفسار عن التبرعات وطرق الدفع">استفسار عن التبرعات وطرق الدفع</option>
                  <option value="طلب مندوب تحصيل للمنزل">طلب زيارة مندوب تحصيل للمنزل (القاهرة والجيزة)</option>
                  <option value="كفالة يتيم شهرياً">كفالة يتيم والتواصل مع الأيتام</option>
                  <option value="المساهمة في سيارة نقل الموتى">المساهمة في سيارة نقل ودفن الموتى (المادة 4)</option>
                  <option value="قوافل طبية وعلاج مريض">القوافل الطبية وعلاج المرضى</option>
                  <option value="طلب مساعدة لحالة مستحقة">تسجيل حالة مستحقة وبحث اجتماعي</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">تفاصيل الرسالة أو العنوان</label>
                <textarea
                  rows={4}
                  required
                  placeholder="اكتب رسالتك أو استفسارك هنا..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                ></textarea>
              </div>

              {submitted && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-[#0F5132] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>تم تجهيز وإرسال رسالتك لواتساب الجمعية بنجاح!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#0F5132] hover:bg-[#0A3622] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>إرسال مباشرة عبر واتساب الجمعية ({SOCIETY_INFO.phone})</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
