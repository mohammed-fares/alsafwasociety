import React, { useState, useMemo } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  CheckCircle2, 
  Server, 
  Layers, 
  Settings2, 
  Puzzle, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Code2,
  FileSpreadsheet,
  HeartHandshake,
  Sliders,
  Database
} from 'lucide-react';
import { 
  generateWordPressThemeFiles, 
  downloadWordPressThemeZip, 
  generateWordPressDemoXml, 
  WPThemeFile 
} from '../utils/wordpressThemeGenerator';
import { downloadWordPressPluginZip } from '../utils/wordpressPluginGenerator';
import { SiteContentData, ActivityProgram } from '../types';
import { SOCIETY_INFO } from '../data/societyData';

interface WordPressExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  content?: SiteContentData;
  activities?: ActivityProgram[];
}

type TabType = 'packages' | 'capabilities' | 'plugins' | 'code';

export const WordPressExportModal: React.FC<WordPressExportModalProps> = ({
  isOpen,
  onClose,
  content,
  activities,
}) => {
  const info = content || (SOCIETY_INFO as unknown as SiteContentData);
  const [activeTab, setActiveTab] = useState<TabType>('packages');
  const files = useMemo(() => generateWordPressThemeFiles(content, activities), [content, activities]);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedShortcode, setCopiedShortcode] = useState<string | null>(null);
  
  // Download states
  const [isDownloadingTheme, setIsDownloadingTheme] = useState<boolean>(false);
  const [themeSuccess, setThemeSuccess] = useState<boolean>(false);
  const [isDownloadingPlugin, setIsDownloadingPlugin] = useState<boolean>(false);
  const [pluginSuccess, setPluginSuccess] = useState<boolean>(false);
  const [xmlSuccess, setXmlSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentFile = files[selectedFileIndex] || files[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyShortcode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedShortcode(code);
    setTimeout(() => setCopiedShortcode(null), 2000);
  };

  // Download Theme ZIP
  const handleDownloadThemeZip = async () => {
    try {
      setIsDownloadingTheme(true);
      const zipBlob = await downloadWordPressThemeZip(info, activities);
      
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'alsafwa-islamic-society-theme.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setThemeSuccess(true);
      setTimeout(() => setThemeSuccess(false), 4000);
    } catch (err) {
      console.error('Error downloading theme:', err);
    } finally {
      setIsDownloadingTheme(false);
    }
  };

  // Download Plugin ZIP
  const handleDownloadPluginZip = async () => {
    try {
      setIsDownloadingPlugin(true);
      const zipBlob = await downloadWordPressPluginZip(info);
      
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'alsafwa-charity-donations.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setPluginSuccess(true);
      setTimeout(() => setPluginSuccess(false), 4000);
    } catch (err) {
      console.error('Error downloading plugin:', err);
    } finally {
      setIsDownloadingPlugin(false);
    }
  };

  // Download Demo Content XML
  const handleDownloadDemoXml = () => {
    try {
      const xml = generateWordPressDemoXml(info, activities);
      const blob = new Blob([xml], { type: 'text/xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'alsafwa-demo-content.xml';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setXmlSuccess(true);
      setTimeout(() => setXmlSuccess(false), 4000);
    } catch (err) {
      console.error('Error downloading demo XML:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full my-auto overflow-hidden shadow-2xl border border-stone-200 text-right flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-[#052316] text-white p-5 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>مركز تكامل وتحميل ووردبريس (WordPress Integration Hub)</span>
                <span className="text-[11px] bg-amber-400 text-stone-950 font-bold px-2 py-0.5 rounded-full">
                  جاهز للتركيب
                </span>
              </h3>
              <p className="text-xs text-emerald-300">
                حزم القالب والإضافة والبيانات الكاملة مع دليل أدوات التحكم والتحرير عبر ووردبريس
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="bg-stone-100 border-b border-stone-200 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('packages')}
            className={`py-3 px-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'packages'
                ? 'border-[#0F5132] text-[#0F5132] font-black'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>حزم التنزيل الفوري (القالب والإضافة والبيانات)</span>
          </button>

          <button
            onClick={() => setActiveTab('capabilities')}
            className={`py-3 px-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'capabilities'
                ? 'border-[#0F5132] text-[#0F5132] font-black'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Settings2 className="w-4 h-4" />
            <span>إمكانيات التحكم من لوحة ووردبريس</span>
          </button>

          <button
            onClick={() => setActiveTab('plugins')}
            className={`py-3 px-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'plugins'
                ? 'border-[#0F5132] text-[#0F5132] font-black'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Puzzle className="w-4 h-4" />
            <span>أفضل الإضافات المقترحة وطريقة الربط</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 px-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'code'
                ? 'border-[#0F5132] text-[#0F5132] font-black'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>الشورت كود ومستعرض الأكواد</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* TAB 1: DOWNLOAD PACKAGES */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              {/* Highlight Package: WordPress Theme */}
              <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-[#0F5132] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-amber-400/30">
                <div className="space-y-2 text-right">
                  <span className="inline-block px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-full">
                    الحزمة الأساسية 1: قالب ووردبريس المتكامل
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-white">
                    قالب جمعية الصفوة: alsafwa-islamic-society-theme.zip
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-xl">
                    يحتوي على كافة ملفات القالب متضمناً <strong>لوحة التحكم وإدارة المحتوى الشاملة المدمجة (WordPress Admin CMS Panel)</strong> في `inc/admin-cms.php` وكافة الأنشطة الـ 11 ومشروع سيارة إكرام الموتى (المادة 4) والحسابات البنكية والمحفظة الإلكترونية.
                  </p>
                </div>

                <div className="shrink-0 w-full md:w-auto text-center">
                  <button
                    onClick={handleDownloadThemeZip}
                    disabled={isDownloadingTheme}
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-5 h-5" />
                    <span>{isDownloadingTheme ? 'جاري التجميع...' : 'تحميل قالب ووردبريس كامل (.ZIP)'}</span>
                  </button>
                  {themeSuccess && (
                    <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 mt-2 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تم تنزيل حزمة القالب بنجاح!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Secondary Packages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Companion Plugin Card */}
                <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-5 space-y-4 text-right flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-lg bg-emerald-100 text-[#0F5132]">
                        <Puzzle className="w-5 h-5" />
                      </span>
                      <div>
                        <span className="text-[11px] font-bold text-amber-700 block">الحزمة 2: الإضافة الرسمية المستقلة</span>
                        <h5 className="text-base font-bold text-stone-900">إضافة بوابة التبرعات والخدمات</h5>
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      ملف إضافة ووردبريس مستقل (`alsafwa-charity-donations.zip`) يمكن تركيبه مع <strong>أي قالب ووردبريس آخر</strong> لإتاحة الشورت كود وصناديق التبرع ونقاط REST API.
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={handleDownloadPluginZip}
                      disabled={isDownloadingPlugin}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#0F5132] hover:bg-[#0A3622] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isDownloadingPlugin ? 'جاري التنزيل...' : 'تحميل إضافة ووردبريس (.ZIP)'}</span>
                    </button>
                    {pluginSuccess && (
                      <span className="block text-center text-xs text-emerald-700 font-bold mt-1.5">
                        تم تنزيل الإضافة بنجاح!
                      </span>
                    )}
                  </div>
                </div>

                {/* Demo Content XML Card */}
                <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-5 space-y-4 text-right flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-lg bg-amber-100 text-amber-800">
                        <FileSpreadsheet className="w-5 h-5" />
                      </span>
                      <div>
                        <span className="text-[11px] font-bold text-amber-700 block">الحزمة 3: ملف استيراد البيانات التجريبية</span>
                        <h5 className="text-base font-bold text-stone-900">ملف المحتوى الكامل (WXR XML)</h5>
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      ملف XML قياسي تستورده من <strong>أدوات ← استيراد ← WordPress</strong> ليتم تلقائياً إنشاء كافة الصفحات، والمشاريع الخيرية الـ 11 ومحتواها على موقعك بضغطة زر.
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={handleDownloadDemoXml}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-stone-50 border border-stone-300 text-stone-900 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-amber-600" />
                      <span>تحميل ملف البيانات (alsafwa-demo-content.xml)</span>
                    </button>
                    {xmlSuccess && (
                      <span className="block text-center text-xs text-emerald-700 font-bold mt-1.5">
                        تم تنزيل ملف XML بنجاح!
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* 3 Step Installation Flow */}
              <div className="pt-2">
                <h5 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0F5132]" />
                  <span>طريقة تركيب وتشغيل القالب على ووردبريس في 3 خطوات بسيطة:</span>
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#0F5132] flex items-center justify-center font-mono font-bold text-xs">1</span>
                    <h6 className="text-xs font-bold text-stone-900">رفع القالب</h6>
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      من لوحة تحكم ووردبريس اذهب إلى: <strong>المظهر (Appearance) ← قوالب (Themes) ← أضف قالباً جديداً ← رفع قالب</strong>، واختر ملف `alsafwa-islamic-society-theme.zip`.
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#0F5132] flex items-center justify-center font-mono font-bold text-xs">2</span>
                    <h6 className="text-xs font-bold text-stone-900">التفعيل الفوري</h6>
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      اضغط على <strong>التنصيب الآن</strong> ثم اضغط <strong>تفعيل (Activate)</strong>. ستجد الموقع يعمل مباشرة بكامل نصوصه وتصميمه العربي الرسمي.
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#0F5132] flex items-center justify-center font-mono font-bold text-xs">3</span>
                    <h6 className="text-xs font-bold text-stone-900">استيراد أو تعديل البيانات</h6>
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      يمكنك تخصيص الأرقام والصور من <strong>المظهر ← تخصيص</strong>، أو استيراد ملف `alsafwa-demo-content.xml` لإنشاء المشاريع تلقائياً في ثوانٍ.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: WORDPRESS CAPABILITIES & CONTROLS */}
          {activeTab === 'capabilities' && (
            <div className="space-y-6 text-right">
              <div>
                <span className="text-xs font-bold text-[#0F5132] tracking-wider block mb-1">
                  إمكانيات التحكم الأصلية المدمجة في القالب
                </span>
                <h4 className="text-xl font-black text-stone-900">
                  ماذا يمكنك التحكم فيه وإدارته من داخل لوحة تحكم ووردبريس مباشرة؟
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  تمت برمجة القالب وفق أحدث معايير WordPress Codex ليمنح مسؤول الجمعية تحكماً كاملاً وسهلاً دون الحاجة لأي خبرة برمجية.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Control 0: Full WordPress Admin CMS Panel */}
                <div className="p-5 bg-white border-2 border-emerald-600 rounded-2xl shadow-sm space-y-2 col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-emerald-100 text-[#0F5132] rounded-lg">
                      <Settings2 className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mb-1">جديد ومدمج داخل القالب تلقائياً</span>
                      <h5 className="text-base font-black text-stone-900">
                        لوحة تحكم وإدارة المحتوى والصور (WordPress Admin CMS Panel)
                      </h5>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    ملف مدمج أصلي (`inc/admin-cms.php`) يضيف قائمة رئيسية في لوحة تحكم ووردبريس باسم <strong>"لوحة تحكم جمعية الصفوة (CMS)"</strong> تمكن الإدارة من:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs text-stone-700">
                    <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                      <strong>🏛️ البيانات الأساسية واللائحة:</strong> تعديل اسم الجمعية، رقم القيد 3794، نص المادة 1، ونص المادة 4، ورفع وتغيير اللوجو مباشرة من مكتبة وسائط ووردبريس.
                    </div>
                    <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                      <strong>🚐 سيارة الموتى والـ 11 نشاطاً:</strong> تعديل مستهدفات التبرع، المبالغ المجمعة، العناوين، وإضافة أنشطة ومشاريع خيرية جديدة تظهر فوراً بالصفحة الرئيسية.
                    </div>
                    <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                      <strong>💳 الحسابات والسوشيال:</strong> تعديل معرف إنستاباي، رقم المحفظة الإلكترونية، حسابات البنك الأهلي وبنك مصر، وروابط الفيسبوك واليوتيوب والواتساب.
                    </div>
                  </div>
                </div>

                {/* Control 1: Customizer */}
                <div className="p-5 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-emerald-50 text-[#0F5132] rounded-lg">
                      <Sliders className="w-5 h-5" />
                    </span>
                    <h5 className="text-sm font-bold text-stone-900">
                      1. مخصص القالب المباشر (Theme Customizer)
                    </h5>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    من خلال <strong>المظهر ← تخصيص</strong>، يمكنك تعديل كافة عناصر الهوية مع معاينة مرئية حية وفورية:
                  </p>
                  <ul className="text-xs text-stone-700 space-y-1 pt-1 list-disc list-inside">
                    <li>تغيير شعار الجمعية (اللوجو) والصور والبانرات الترويجية.</li>
                    <li>تعديل رقم القيد الرسمي (<strong>3794</strong>) وسنة الإشهار (1991).</li>
                    <li>تعديل الهاتف الموحد والواتساب (<strong>01115947455</strong>) ومقر الجمعية.</li>
                    <li>تحديث معرف إنستاباي ورقم المحفظة الإلكترونية والحسابات البنكية.</li>
                    <li>روابط السوشيال ميديا (صفحة وجروب الفيسبوك، وقناة اليوتيوب).</li>
                  </ul>
                </div>

                {/* Control 2: Custom Post Type Projects */}
                <div className="p-5 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-emerald-50 text-[#0F5132] rounded-lg">
                      <HeartHandshake className="w-5 h-5" />
                    </span>
                    <h5 className="text-sm font-bold text-stone-900">
                      2. لوحة إدارة المشاريع الخيرية (Projects CPT)
                    </h5>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    يضيف القالب قسماً خاصاً في القائمة الجانبية باسم <strong>"مشاريع الصفوة"</strong>:
                  </p>
                  <ul className="text-xs text-stone-700 space-y-1 pt-1 list-disc list-inside">
                    <li>إضافة مشاريع وأنشطة جديدة بنقرة زر (عنوان، وصف، صورة بارزة).</li>
                    <li>تحديد المبلغ المستهدف لكل نشاط وتحديث المبالغ المجمعة تلقائياً.</li>
                    <li>تخصيص قيمة الأسهم ومبالغ التبرع المقترحة لكل مشروع.</li>
                    <li>تصنيف المشاريع (كفالات، صدقات، صحة، عمارة مساجد، مواسم).</li>
                  </ul>
                </div>

                {/* Control 3: Beneficiary Requests */}
                <div className="p-5 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-emerald-50 text-[#0F5132] rounded-lg">
                      <Database className="w-5 h-5" />
                    </span>
                    <h5 className="text-sm font-bold text-stone-900">
                      3. استقبال وإدارة طلبات المساعدة والاستفادة
                    </h5>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    منظومة متكاملة لخدمة أهالي المنطقة والمستحقين:
                  </p>
                  <ul className="text-xs text-stone-700 space-y-1 pt-1 list-disc list-inside">
                    <li>استقبال طلبات كفالة الأيتام، مساعدات الزواج، والقوافل الطبية.</li>
                    <li>استقبال بلاغات وطلبات سيارة نقل ودفن الموتى العاجلة على مدار 24 ساعة.</li>
                    <li>تغيير حالة الطلب من لوحة التحكم (قيد المراجعة، معتمد، تم الصرف).</li>
                    <li>تصدير بيانات الحالات والأسر المستفيدة بصيغة Excel/CSV لدراسة الحالة.</li>
                  </ul>
                </div>

                {/* Control 4: Donation Receipts & Audit */}
                <div className="p-5 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-emerald-50 text-[#0F5132] rounded-lg">
                      <ShieldCheck className="w-5 h-5" />
                    </span>
                    <h5 className="text-sm font-bold text-stone-900">
                      4. سجل التبرعات والإيصالات الرسمية
                    </h5>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    توثيق كامل للعمليات المالية وفق متطلبات الشفافية:
                  </p>
                  <ul className="text-xs text-stone-700 space-y-1 pt-1 list-disc list-inside">
                    <li>توليد أرقام إيصالات رسمية متسلسلة تحمل خاتم الجمعية ورقم القيد 3794.</li>
                    <li>إمكانية إعادة طباعة أي إيصال أو إرساله للمتبرع كـ PDF أو عبر واتساب.</li>
                    <li>فلترة التبرعات بحسب المشروع أو وسيلة الدفع (إنستاباي / المحفظة الإلكترونية / بنك).</li>
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: RECOMMENDED WORDPRESS PLUGINS */}
          {activeTab === 'plugins' && (
            <div className="space-y-6 text-right">
              <div>
                <span className="text-xs font-bold text-[#0F5132] tracking-wider block mb-1">
                  الإضافات المقترحة والمتوافقة 100% مع القالب
                </span>
                <h4 className="text-xl font-black text-stone-900">
                  أفضل إضافات ووردبريس لتعزيز التحكم والتحرير والدفع الإلكتروني
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  تم اختبار القالب ليتوافق بسلاسة تامة مع أشهر إضافات منظومة ووردبريس العالمية والمحلية:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Plugin 1: Elementor */}
                <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      التحرير البصري
                    </span>
                    <span className="text-xs font-black text-stone-900">Elementor Page Builder</span>
                  </div>
                  <h5 className="text-sm font-bold text-stone-900">إليمينتور / Elementor Pro</h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    يتيح لك تحرير وتعديل كل جزء في الصفحة الرئيسية وصفحات الأنشطة بنظام السحب والإفلات (Drag & Drop) دون لمس كود، مع إمكانية تصميم صفحات هبوط مخصصة لحملات رمضان والأضاحي.
                  </p>
                </div>

                {/* Plugin 2: GiveWP */}
                <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      منصة التبرعات
                    </span>
                    <span className="text-xs font-black text-stone-900">GiveWP Donation Platform</span>
                  </div>
                  <h5 className="text-sm font-bold text-stone-900">إضافة GiveWP المتخصصة</h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    أقوى منصة تبرعات لووردبريس في العالم، تتيح إنشاء حملات تبرع بأهداف مادية دقيقة، ونسب إنجاز تفاعلية، وتبرعات دورية متكررة (شهرية وسنوية)، وحسابات للمتبرعين.
                  </p>
                </div>

                {/* Plugin 3: WooCommerce + Paymob / Fawry */}
                <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                      الدفع الإلكتروني بمصر
                    </span>
                    <span className="text-xs font-black text-stone-900">WooCommerce + Paymob</span>
                  </div>
                  <h5 className="text-sm font-bold text-stone-900">بوابات الدفع التلقائي المصرية (Paymob / Fawry)</h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    إذا رغبت في تحصيل التبرعات التلقائي عبر بطاقات فيزا وماستركارد وميزة ومحافظ الهاتف الذكي (كاش) فورياً على حساب الجمعية البنكي الرسمي مع تأكيد مالي آلي.
                  </p>
                </div>

                {/* Plugin 4: ACF Pro */}
                <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      الحقول المخصصة
                    </span>
                    <span className="text-xs font-black text-stone-900">Advanced Custom Fields (ACF)</span>
                  </div>
                  <h5 className="text-sm font-bold text-stone-900">إضافة الحقول المتقدمة (ACF Pro)</h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    لتخصيص حقول إضافية لكل مشروع خيري بسهولة (مثل: رقم محرك سيارة الموتى، تاريخ تقرير القافلة الطبية القادمة، صور الحالات الإنسانية المعتمدة).
                  </p>
                </div>

                {/* Plugin 5: WPForms */}
                <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      الاستمارات الذكية
                    </span>
                    <span className="text-xs font-black text-stone-900">WPForms / Contact Form 7</span>
                  </div>
                  <h5 className="text-sm font-bold text-stone-900">نماذج الاستفادة والتطوع (WPForms)</h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    لإنشاء استمارات طلبات المساعدة وكفالة الأيتام وتجهيز العرائس وتسجيل المتطوعين مع رفع المستندات وبطاقات الرقم القومي وإرسال تنبيهات بريد وإشعار واتساب فوري للجمعية.
                  </p>
                </div>

                {/* Plugin 6: Loco Translate */}
                <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      التعريب والتحرير
                    </span>
                    <span className="text-xs font-black text-stone-900">Loco Translate</span>
                  </div>
                  <h5 className="text-sm font-bold text-stone-900">لوكو ترانسليت (Loco Translate)</h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    يتيح لك تعديل أي عبارة أو نص أو تسمية زر داخل القالب أو الإضافة بنقرة زر من داخل لوحة تحكم ووردبريس دون الحاجة لتعديل ملفات PHP نهائياً.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: SHORTCODES & CODE INSPECTOR */}
          {activeTab === 'code' && (
            <div className="space-y-6 text-right">
              
              {/* Shortcodes quick reference */}
              <div>
                <span className="text-xs font-bold text-[#0F5132] tracking-wider block mb-1">
                  أكواد الشورت كود الجاهزة للاستخدام في أي صفحة
                </span>
                <h4 className="text-base font-black text-stone-900 mb-3">
                  انسخ أي كود وضعه في أي مقال أو صفحة في ووردبريس:
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { code: '[alsafwa_donate_box]', desc: 'صندوق التبرع المباشر السريع مع حسابات إنستاباي والمحفظة الإلكترونية' },
                    { code: '[alsafwa_hearse_project]', desc: 'صندوق أسهم مشروع سيارة نقل ودفن الموتى (المادة 4 من اللائحة)' },
                    { code: '[alsafwa_quick_donation]', desc: 'شريط تبرع فوري مدمج مع اختيار المبلغ والنشاط' },
                    { code: '[alsafwa_services_list]', desc: 'عرض شبكة الأنشطة والخدمات الـ 11 كاملة' },
                  ].map((item) => (
                    <div key={item.code} className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <code className="text-xs font-mono font-bold text-[#0F5132] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {item.code}
                        </code>
                        <p className="text-[11px] text-stone-600">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => handleCopyShortcode(item.code)}
                        className="px-2.5 py-1.5 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg text-xs font-bold text-stone-700 transition-colors shrink-0 cursor-pointer"
                      >
                        {copiedShortcode === item.code ? (
                          <span className="flex items-center gap-1 text-emerald-700">
                            <Check className="w-3.5 h-3.5" /> تم!
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Copy className="w-3.5 h-3.5" /> نسخ
                          </span>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Inspector Box */}
              <div className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-900 text-stone-200">
                <div className="bg-stone-950 px-4 py-3 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <FileCode className="w-4 h-4" />
                    <span>مستعرض ملفات القالب: {currentFile.filename}</span>
                    <span className="text-stone-500 text-[11px] font-normal">({currentFile.description})</span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'تم النسخ!' : 'نسخ الكود'}</span>
                  </button>
                </div>

                {/* File Tabs */}
                <div className="flex items-center gap-1 bg-stone-900 px-3 py-2 border-b border-stone-800 overflow-x-auto">
                  {files.map((file, idx) => (
                    <button
                      key={file.filename}
                      onClick={() => setSelectedFileIndex(idx)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                        selectedFileIndex === idx
                          ? 'bg-[#0F5132] text-white font-bold'
                          : 'text-stone-400 hover:text-white hover:bg-stone-800'
                      }`}
                    >
                      {file.filename}
                    </button>
                  ))}
                </div>

                {/* Code Pre Area */}
                <div className="p-4 overflow-x-auto max-h-80 font-mono text-xs text-stone-300 leading-relaxed dir-ltr text-left">
                  <pre className="select-all">
                    <code>{currentFile.content}</code>
                  </pre>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-700" />
            <span>متوافق مع WordPress 6.0 وحتى 6.7+، مع بيئة PHP 7.4 و 8.0 و 8.2+ ومكتبات Tailwind و Gutenberg</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadThemeZip}
              className="px-3.5 py-1.5 bg-[#0F5132] hover:bg-[#0A3622] text-white font-bold rounded-lg cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل القالب (.ZIP)</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-lg cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
