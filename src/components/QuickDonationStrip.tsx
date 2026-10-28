import React, { useState } from 'react';
import { Heart, Plus, Sparkles, Check } from 'lucide-react';
import { ACTIVITIES_DATA } from '../data/societyData';

import { ActivityProgram } from '../types';

interface QuickDonationStripProps {
  activities?: ActivityProgram[];
  onQuickDonate: (programId: string, amount: number, isMonthly: boolean) => void;
  onAddToCart: (programId: string, amount: number, isMonthly: boolean) => void;
}

export const QuickDonationStrip: React.FC<QuickDonationStripProps> = ({
  activities,
  onQuickDonate,
  onAddToCart,
}) => {
  const acts = activities && activities.length > 0 ? activities : ACTIVITIES_DATA;
  const [selectedProgramId, setSelectedProgramId] = useState<string>(acts[0].id);
  const [amount, setAmount] = useState<number>(250);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [addedFeedback, setAddedFeedback] = useState<boolean>(false);

  const selectedProgram = acts.find((p) => p.id === selectedProgramId) || acts[0];
  const quickAmounts = [50, 100, 250, 500, 1000];

  const handleAmountClick = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    if (val) {
      setAmount(Number(val));
    }
  };

  const handleAddToCart = () => {
    onAddToCart(selectedProgram.id, amount, isMonthly);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  return (
    <section className="bg-white border-b border-stone-200 py-6 sm:py-8 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-4 sm:p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Header info */}
            <div className="lg:max-w-xs space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span className="text-xs font-bold text-[#0F5132] tracking-wider">تبرع فوري سريع</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                اختر نشاط التبرع والمبلغ
              </h2>
              <p className="text-xs text-stone-500 leading-normal">
                {selectedProgram.unitDescription || selectedProgram.subtitle}
              </p>
            </div>

            {/* Controls */}
            <div className="flex-1 flex flex-col sm:flex-row flex-wrap items-center gap-3">
              
              {/* Program Selector */}
              <div className="w-full sm:w-auto flex-1 min-w-[200px]">
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  المشروع أو النشاط الخيري
                </label>
                <select
                  value={selectedProgramId}
                  onChange={(e) => setSelectedProgramId(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-bold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132] focus:border-transparent transition-all"
                >
                  {ACTIVITIES_DATA.map((prog) => (
                    <option key={prog.id} value={prog.id}>
                      {prog.title} ({prog.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Pills */}
              <div className="w-full sm:w-auto">
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  مبلغ التبرع (جنيه مصري)
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {quickAmounts.map((amt) => {
                    const isSelected = amount === amt && !customAmount;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleAmountClick(amt)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer tabular-nums ${
                          isSelected
                            ? 'bg-[#0F5132] text-white shadow-xs'
                            : 'bg-white border border-stone-200 text-stone-700 hover:border-emerald-600'
                        }`}
                      >
                        {amt.toLocaleString('ar-EG')} ج.م
                      </button>
                    );
                  })}

                  <div className="relative inline-block w-24">
                    <input
                      type="text"
                      placeholder="مبلغ آخر"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1.5 text-xs text-center font-bold text-stone-800 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                    />
                  </div>
                </div>
              </div>

              {/* Recurrence Toggle */}
              <div className="w-full sm:w-auto">
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  التكرار
                </label>
                <div className="flex items-center p-1 bg-white border border-stone-200 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setIsMonthly(false)}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      !isMonthly ? 'bg-[#0F5132] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    مرة واحدة
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMonthly(true)}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      isMonthly ? 'bg-[#0F5132] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    شهرياً (كفالة)
                  </button>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-200">
              <button
                type="button"
                onClick={() => onQuickDonate(selectedProgram.id, amount, isMonthly)}
                className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0F5132] hover:bg-[#0A3622] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>تبرع بـ {amount.toLocaleString('ar-EG')} ج.م</span>
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors cursor-pointer"
                title="إضافة لسلة التبرعات"
              >
                {addedFeedback ? (
                  <Check className="w-4 h-4 text-emerald-700" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
