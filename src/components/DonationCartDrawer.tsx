import React from 'react';
import { X, Trash2, Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { DonationCartItem } from '../types';

interface DonationCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: DonationCartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateAmount: (index: number, newAmount: number) => void;
  onCheckoutCart: () => void;
}

export const DonationCartDrawer: React.FC<DonationCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateAmount,
  onCheckoutCart,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-start">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl text-right animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 bg-[#052316] text-white flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">سلة التبرعات الخيرية</h3>
              <p className="text-xs text-emerald-300 font-mono">
                {items.length} {items.length === 1 ? 'مشروع مضاف' : 'مشاريع مضافة'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-stone-800">
                سلة التبرعات فارغة حالياً
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                يمكنك إضافة أكثر من نشاط أو مشروع خيري للسلة والتبرع لهم جميعاً في خطوة واحدة.
              </p>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.programId}-${index}`}
                className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">
                      {item.programTitle}
                    </h4>
                    <span className="text-[11px] text-[#0F5132] font-semibold block">
                      {item.isMonthly ? 'كفالة شهرية دورية' : 'تبرع لمرة واحدة'}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="p-1 text-stone-400 hover:text-red-600 rounded-md transition-colors cursor-pointer"
                    title="حذف من السلة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                  <span className="text-xs text-stone-500">المبلغ المحدد:</span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min={10}
                      step={50}
                      value={item.amount}
                      onChange={(e) => onUpdateAmount(index, Math.max(10, Number(e.target.value)))}
                      className="w-24 bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs font-bold text-stone-900 text-center font-mono"
                    />
                    <span className="text-xs font-bold text-stone-700">ج.م</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Total & Checkout */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-stone-200 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-600 font-bold">إجمالي سلة التبرعات:</span>
              <span className="text-xl font-black text-[#0F5132] font-mono">
                {totalAmount.toLocaleString('ar-EG')} ج.م
              </span>
            </div>

            <button
              onClick={onCheckoutCart}
              className="w-full py-3.5 px-4 bg-[#0F5132] hover:bg-[#0A3622] text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>إتمام التبرع وإصدار الإيصال</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
