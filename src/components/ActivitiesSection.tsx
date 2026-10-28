import React, { useState } from 'react';
import { 
  Heart, 
  Plus, 
  Check, 
  HeartHandshake, 
  Truck, 
  Landmark, 
  Activity, 
  BookOpen, 
  Users, 
  GraduationCap, 
  Home, 
  Package, 
  Baby, 
  Plane 
} from 'lucide-react';
import { ACTIVITIES_DATA } from '../data/societyData';
import { ActivityProgram } from '../types';

interface ActivitiesSectionProps {
  onDonateToProgram: (programId: string, amount?: number) => void;
  onAddToCart: (programId: string, amount: number, isMonthly: boolean) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  HeartHandshake,
  Truck,
  Landmark,
  Activity,
  BookOpen,
  Users,
  GraduationCap,
  Home,
  Package,
  Baby,
  Plane,
};

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  onDonateToProgram,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  const categories = ['الكل', 'كفالات', 'عمارة ومشاريع', 'صحة', 'مساعدات', 'تعليم وقرآن', 'مواسم'];

  const filteredPrograms = selectedCategory === 'الكل'
    ? ACTIVITIES_DATA
    : ACTIVITIES_DATA.filter((p) => p.category === selectedCategory);

  const handleCardAddToCart = (p: ActivityProgram, amt: number) => {
    onAddToCart(p.id, amt, false);
    setAddedMap((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [p.id]: false }));
    }, 1800);
  };

  return (
    <section id="activities" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Curatorial Subheading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#0F5132] tracking-widest uppercase mb-2">
            <span>أنشطة ومجالات التكافل الاجتماعي</span>
            <span aria-hidden="true">·</span>
            <span>11 مساراً للخير</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 leading-tight">
            مشاريع وبرامج جمعية الصفوة الإسلامية
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed mt-3">
            جميع الأنشطة مرخصة ومعتمدة وفقاً للائحة النظام الأساسي المقيدة برقم 3794 لسنة 1991. تبرعك يصل مباشرة للأسر المستحقة والأيتام.
          </p>
        </div>

        {/* Interactive Category Filter Tabs (Zero-Pill Discipline: Segmented control style with functional buttons) */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-white text-[#0F5132] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPrograms.map((program) => {
            const IconComponent = ICON_MAP[program.iconName] || Heart;
            const percent = Math.min(100, Math.round((program.raisedAmount / program.targetAmount) * 100));
            const defaultAmt = program.defaultAmounts[2] || program.defaultAmounts[0] || 250;

            return (
              <div
                key={program.id}
                className="bg-white rounded-2xl border border-stone-200/90 p-6 flex flex-col justify-between hover:border-emerald-700/40 hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  {/* Card Header: Metadata unboxed with separator */}
                  <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-4">
                    <div className="flex items-center gap-1.5 font-semibold text-[#0F5132]">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F5132] flex items-center justify-center">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span>{program.category}</span>
                    </div>
                    <span className="text-[11px] font-mono text-stone-400">
                      {program.donorCount} متبرع
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 group-hover:text-[#0F5132] transition-colors mb-1">
                    {program.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#8C6A28] mb-3">
                    {program.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {program.description}
                  </p>

                  {/* Unit description kicker */}
                  {program.unitDescription && (
                    <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-stone-200/80 text-[11px] font-medium text-stone-700 mb-4">
                      {program.unitDescription}
                    </div>
                  )}

                  {/* Progress bar and metrics */}
                  <div className="space-y-1.5 mb-5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-stone-700 font-mono">
                        تم جمع: {program.raisedAmount.toLocaleString('ar-EG')} ج.م
                      </span>
                      <span className="text-[#0F5132] font-mono">
                        {percent}%
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200">
                      <div
                        className="bg-[#0F5132] h-full rounded-full transition-all duration-700"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <div className="text-[11px] text-stone-400 text-left font-mono">
                      الهدف: {program.targetAmount.toLocaleString('ar-EG')} ج.م
                    </div>
                  </div>
                </div>

                {/* Card Actions: Quick donation amounts & buttons */}
                <div className="pt-4 border-t border-stone-100 space-y-3">
                  {/* Default Amount Chips */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {program.defaultAmounts.slice(0, 4).map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => onDonateToProgram(program.id, amt)}
                        className="px-2.5 py-1 text-[11px] font-bold text-stone-700 bg-stone-100 hover:bg-emerald-50 hover:text-[#0F5132] rounded-md transition-colors cursor-pointer tabular-nums"
                      >
                        {amt.toLocaleString('ar-EG')} ج
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onDonateToProgram(program.id, defaultAmt)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-[#0F5132] hover:bg-[#0A3622] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                      <span>تبرع الآن</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCardAddToCart(program, defaultAmt)}
                      className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors cursor-pointer"
                      title="إضافة لسلة التبرعات"
                    >
                      {addedMap[program.id] ? (
                        <Check className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
