import React, { useState } from 'react';
import { Lock, KeyRound, ShieldAlert, X, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentPassword: string;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentPassword,
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setErrorMessage('يرجى إدخال كلمة المرور للمتابعة');
      return;
    }

    if (passwordInput.trim() === currentPassword.trim()) {
      setIsSuccess(true);
      setErrorMessage('');
      setTimeout(() => {
        setIsSuccess(false);
        setPasswordInput('');
        onSuccess();
      }, 400);
    } else {
      setErrorMessage('كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى');
      setIsSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-emerald-800/30 text-right relative animate-in fade-in zoom-in-95 duration-200"
        dir="rtl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-stone-400 hover:text-stone-700 rounded-full transition-colors cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-emerald-50 text-[#0F5132] border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black text-stone-900">
            تسجيل دخول لوحة التحكم (CMS)
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            منطقة محمية لإدارة وتعديل محتوى وصور جمعية الصفوة الإسلامية
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isSuccess && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>تم التحقق بنجاح! جاري فتح لوحة التحكم...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              كلمة مرور لوحة التحكم:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="أدخل كلمة المرور..."
                autoFocus
                className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-stone-300 rounded-xl text-sm font-mono focus:outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
                aria-label="إظهار أو إخفاء كلمة المرور"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold mb-0.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-700" />
              <span>معلومة أمان:</span>
            </div>
            <span>كلمة المرور الافتراضية للنظام هي: </span>
            <code className="bg-amber-100/90 text-amber-950 px-1.5 py-0.5 rounded font-mono font-bold select-all">safwa2026</code>
            <span className="block mt-0.5 text-amber-800">
              (يمكنك تغييرها في أي وقت من تبويب "الأمان وكلمة المرور" داخل لوحة التحكم).
            </span>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-[#0F5132] hover:bg-[#0A3622] text-white font-bold text-sm rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-amber-300" />
              <span>دخول لوحة التحكم</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm rounded-xl transition-colors cursor-pointer"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
