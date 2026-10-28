import React from 'react';
import { Heart, Sparkles, ShieldCheck, ArrowDown, CheckCircle2 } from 'lucide-react';
import { SOCIETY_INFO } from '../data/societyData';

interface HeroProps {
  onOpenDonate: (programId?: string) => void;
  onSelectProgram: (programId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDonate }) => {
  return (
    <section className="relative overflow-hidden bg-dark-emerald text-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-emerald-900">
      {/* Decorative Islamic Geometric subtle background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-islamic-pattern mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Column: Hero Typography & Curatorial Content (RTL) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-xs text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>مشهرة برقم {SOCIETY_INFO.registrationNumber} لسنة {SOCIETY_INFO.registrationYear} · مديرية التضامن الاجتماعي بالقاهرة</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.25] [text-wrap:balance]">
                جمعية الصفوة الإسلامية
                <span className="block text-amber-300 text-xl sm:text-2xl lg:text-3xl font-serif font-bold mt-2">
                  معاً .. لبناء مجتمع أكثر تكافلاً
                </span>
              </h1>
            </div>

            {/* Noble Quranic Verse in Amiri Calligraphic Serif */}
            <div className="bg-emerald-950/70 border border-amber-500/30 rounded-2xl p-5 sm:p-6 backdrop-blur-xs shadow-inner">
              <p className="font-serif text-2xl sm:text-3xl text-amber-200 text-center leading-relaxed font-bold">
                "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَى"
              </p>
              <div className="flex items-center justify-center gap-2 mt-2 text-xs text-emerald-300">
                <span>سورة المائدة - الآية (2)</span>
                <span aria-hidden="true">·</span>
                <span className="font-serif italic text-amber-300">عطاء .. تنمية .. مستقبل أفضل</span>
              </div>
            </div>

            {/* Body Prose */}
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl">
              منذ عام 1991 وبإشراف رسمي، نعمل يداً بيد لخدمة ورعاية الأيتام، تسيير القوافل الطبية المجانية، تحفيظ القرآن الكريم، مساعدة الأسر المتعففة وتجهيز الفتيات، بالإضافة إلى مشروعنا النوعي المعتمد باللائحة: <strong className="text-amber-300">سيارة إكرام ودفن الموتى المجهزة مجاناً</strong>.
            </p>

            {/* Core Values / Features Strip */}
            <div className="grid grid-cols-3 gap-3 pt-1 text-center">
              <div className="p-3 rounded-xl bg-emerald-900/50 border border-emerald-800/80">
                <span className="block text-lg font-black text-amber-400 font-mono">33+</span>
                <span className="text-[11px] text-emerald-200">عاماً من العطاء المستمر</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-900/50 border border-emerald-800/80">
                <span className="block text-lg font-black text-amber-400 font-mono">11</span>
                <span className="text-[11px] text-emerald-200">برنامجاً ونشاطاً خيرياً معتمداً</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-900/50 border border-emerald-800/80">
                <span className="block text-lg font-black text-amber-400 font-mono">100%</span>
                <span className="text-[11px] text-emerald-200">إشراف وتوثيق رسمي</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenDonate()}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer font-sans"
              >
                <Heart className="w-5 h-5 text-emerald-900 fill-emerald-900" />
                <span>تبرع الآن للمشاريع</span>
              </button>

              <a
                href="#activities"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-emerald-800/70 hover:bg-emerald-800 border border-emerald-600/60 rounded-xl transition-colors"
              >
                <span>استكشف كافة الأنشطة</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#hearse-project"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-semibold text-emerald-100 hover:text-white bg-emerald-950/60 border border-amber-400/40 rounded-xl transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>مشروع سيارة الموتى (المادة 4)</span>
              </a>
            </div>

          </div>

          {/* Left Column: Official Banner & Visual Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/30 bg-stone-900 group">
              <img 
                src={SOCIETY_INFO.bannerUrl} 
                alt="بانر جمعية الصفوة الإسلامية - أنشطة ومجالات التكافل" 
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                loading="eager"
              />
              
              {/* Bottom Scrim with Society Core Info */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 text-right">
                <div className="flex items-center justify-between text-xs text-amber-300 font-bold mb-1">
                  <span>مصر الخير .. من هنا يبدأ</span>
                  <span className="font-mono text-emerald-300">{SOCIETY_INFO.phone}</span>
                </div>
                <p className="text-[11px] text-stone-300 line-clamp-2">
                  {SOCIETY_INFO.address}
                </p>
              </div>
            </div>

            {/* Quick Trust Highlights under the image */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 p-3 bg-emerald-950/70 border border-emerald-800/60 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-stone-200">إيصال تبرع فوري موثق</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-emerald-950/70 border border-emerald-800/60 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-stone-200">تبرع عبر إنستاباي وفودافون</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
