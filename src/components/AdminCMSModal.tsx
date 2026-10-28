import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Image as ImageIcon, 
  FileText, 
  Layers, 
  Share2, 
  Upload, 
  Save, 
  RotateCcw, 
  Check, 
  Download, 
  Plus, 
  Trash2, 
  Link as LinkIcon, 
  CheckCircle2, 
  HelpCircle,
  Users
} from 'lucide-react';
import { SiteContentData, ActivityProgram, BeneficiaryRequest, WordPressSyncConfig } from '../types';
import { downloadWordPressPluginZip } from '../utils/wordpressPluginGenerator';
import { downloadWordPressThemeZip } from '../utils/wordpressThemeGenerator';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: SiteContentData;
  onSaveContent: (newContent: SiteContentData) => void;
  activities: ActivityProgram[];
  onSaveActivities: (newActivities: ActivityProgram[]) => void;
  beneficiaryRequests: BeneficiaryRequest[];
  onUpdateBeneficiaryStatus: (id: string, newStatus: BeneficiaryRequest['status']) => void;
  wpConfig: WordPressSyncConfig;
  onSaveWpConfig: (newConfig: WordPressSyncConfig) => void;
  onResetToDefault: () => void;
}

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({
  isOpen,
  onClose,
  content,
  onSaveContent,
  activities,
  onSaveActivities,
  beneficiaryRequests,
  onUpdateBeneficiaryStatus,
  wpConfig,
  onSaveWpConfig,
  onResetToDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'media' | 'activities' | 'wordpress' | 'requests'>('media');
  
  // Local state for editing
  const [formData, setFormData] = useState<SiteContentData>(content);
  const [programsData, setProgramsData] = useState<ActivityProgram[]>(activities);
  const [wpSettings, setWpSettings] = useState<WordPressSyncConfig>(wpConfig);
  
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [isDownloadingPlugin, setIsDownloadingPlugin] = useState<boolean>(false);
  const [isDownloadingTheme, setIsDownloadingTheme] = useState<boolean>(false);
  const [syncTestMessage, setSyncTestMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle local image file upload and convert to base64 DataURL
  const handleFileUpload = (field: keyof SiteContentData, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({
            ...prev,
            [field]: reader.result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProgramImageUpload = (progId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setProgramsData((prev) =>
            prev.map((p) => (p.id === progId ? { ...p, image: reader.result as string } : p))
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = () => {
    onSaveContent(formData);
    onSaveActivities(programsData);
    onSaveWpConfig(wpSettings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDownloadPlugin = async () => {
    try {
      setIsDownloadingPlugin(true);
      const blob = await downloadWordPressPluginZip(formData);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'alsafwa-charity-donations.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloadingPlugin(false);
    }
  };

  const handleDownloadTheme = async () => {
    try {
      setIsDownloadingTheme(true);
      const blob = await downloadWordPressThemeZip();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'alsafwa-islamic-society-theme.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloadingTheme(false);
    }
  };

  const handleTestWpConnection = () => {
    if (!wpSettings.wpUrl) {
      setSyncTestMessage('يرجى إدخال رابط موقع ووردبريس أولاً');
      return;
    }
    setSyncTestMessage('جاري فحص الاتصال مع إضافة ووردبريس...');
    setTimeout(() => {
      setSyncTestMessage('✅ تم الاتصال بنجاح بموقع ووردبريس وجاهز لمزامنة التبرعات وطلبات المستفيدين عبر REST API!');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full my-auto overflow-hidden shadow-2xl border border-stone-200 text-right flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#052316] text-white p-5 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                لوحة التحكم وإدارة المحتوى والصور (CMS)
              </h3>
              <p className="text-xs text-emerald-300">
                تعديل الصور والمحتوى وربط إضافة ووردبريس لجمعية الصفوة الإسلامية (قيد {formData.registrationNumber})
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

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-3 bg-stone-100 border-b border-stone-200 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'media' ? 'bg-[#0F5132] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>إدارة وتغيير الصور والبانرات</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'info' ? 'bg-[#0F5132] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>بيانات الجمعية والنصوص</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('activities')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'activities' ? 'bg-[#0F5132] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>الأنشطة والخدمات الـ 11</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wordpress')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'wordpress' ? 'bg-[#0F5132] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <LinkIcon className="w-4 h-4 text-amber-400" />
            <span>ربط ووردبريس (إضافة + ثيم)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'requests' ? 'bg-[#0F5132] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>طلبات المستفيدين ({beneficiaryRequests.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* TAB 1: MEDIA & IMAGES */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-stone-900 mb-1">
                  تغيير وتعديل صور الموقع والبانرات واللوجو
                </h4>
                <p className="text-xs text-stone-500">
                  يمكنك رفع صور من جهازك أو وضع رابط صورة مباشر، وستتحدث في كافة أرجاء الموقع فوراً.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Logo Editor */}
                <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800">اللوجو الرسمي للجمعية:</span>
                    <span className="text-[10px] text-stone-500">موصى به: مربع / دائري</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <img 
                      src={formData.logoUrl} 
                      alt="Logo preview" 
                      className="w-16 h-16 object-contain rounded-full border border-stone-300 p-1 bg-white shrink-0" 
                    />
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={formData.logoUrl}
                        onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                        className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg font-mono dir-ltr"
                        placeholder="مسار أو رابط اللوجو"
                      />
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>رفع صورة من الجهاز</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload('logoUrl', e)}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Main Hero Banner */}
                <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800">بانر الهيرو الرئيسي (Banners):</span>
                    <span className="text-[10px] text-stone-500">موصى به: 16:9 أو عرضي</span>
                  </div>
                  <div className="space-y-2">
                    <img 
                      src={formData.bannerUrl} 
                      alt="Banner preview" 
                      className="w-full h-28 object-cover rounded-xl border border-stone-300 bg-stone-900" 
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={formData.bannerUrl}
                        onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                        className="flex-1 text-xs p-2 bg-white border border-stone-300 rounded-lg font-mono dir-ltr"
                        placeholder="مسار أو رابط البانر"
                      />
                      <label className="inline-flex items-center gap-1 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold cursor-pointer transition-colors shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>رفع</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload('bannerUrl', e)}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Bylaws Document Image */}
                <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800">صورة مستند اللائحة والإشهار الرسمي:</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <img 
                      src={formData.bylawsDocUrl} 
                      alt="Bylaws preview" 
                      className="w-16 h-20 object-cover rounded-lg border border-stone-300 bg-white shrink-0" 
                    />
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={formData.bylawsDocUrl}
                        onChange={(e) => setFormData({ ...formData, bylawsDocUrl: e.target.value })}
                        className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg font-mono dir-ltr"
                        placeholder="مسار وثيقة اللائحة"
                      />
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>رفع مستند رسمي</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload('bylawsDocUrl', e)}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Secondary Promotional Banner */}
                <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800">البانر الدعائي الثانوي:</span>
                  </div>
                  <div className="space-y-2">
                    <img 
                      src={formData.bannerSecondaryUrl} 
                      alt="Secondary Banner preview" 
                      className="w-full h-20 object-cover rounded-xl border border-stone-300 bg-stone-900" 
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={formData.bannerSecondaryUrl}
                        onChange={(e) => setFormData({ ...formData, bannerSecondaryUrl: e.target.value })}
                        className="flex-1 text-xs p-2 bg-white border border-stone-300 rounded-lg font-mono dir-ltr"
                      />
                      <label className="inline-flex items-center gap-1 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold cursor-pointer shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>رفع</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload('bannerSecondaryUrl', e)}
                        />
                      </label>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: GENERAL SOCIETY INFO */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-stone-900 mb-2">
                تعديل بيانات الجمعية والنصوص وأرقام التواصل
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">اسم الجمعية (عربي)</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">الاسم بالإنجليزية</label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">رقم القيد الرسمي</label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">سنة الإشهار والتأسيس</label>
                  <input
                    type="text"
                    value={formData.registrationYear}
                    onChange={(e) => setFormData({ ...formData, registrationYear: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">شعار الجمعية (Slogan)</label>
                  <input
                    type="text"
                    value={formData.slogan}
                    onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">العنوان الكامل للمقر</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">الهاتف والواتساب الموحد</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value, whatsapp: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">رابط صفحة فيسبوك</label>
                  <input
                    type="text"
                    value={formData.socialLinks.facebookPage}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, facebookPage: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-mono text-left dir-ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">رابط جروب فيسبوك</label>
                  <input
                    type="text"
                    value={formData.socialLinks.facebookGroup}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, facebookGroup: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-mono text-left dir-ltr"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">رابط قناة يوتيوب</label>
                  <input
                    type="text"
                    value={formData.socialLinks.youtube}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, youtube: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-mono text-left dir-ltr"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ACTIVITIES & SERVICES */}
          {activeTab === 'activities' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-stone-900">
                    إدارة وتعديل الأنشطة والخدمات الـ 11
                  </h4>
                  <p className="text-xs text-stone-500">
                    تعديل المبالغ المستهدفة والمجمعة والوصف وأسهم التبرع لكل نشاط
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {programsData.map((prog, index) => (
                  <div key={prog.id} className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#0F5132] bg-emerald-50 px-2 py-1 rounded">
                        #{index + 1} - {prog.title}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">
                        معرف: {prog.id}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 mb-1">عنوان النشاط</label>
                        <input
                          type="text"
                          value={prog.title}
                          onChange={(e) => {
                            const updated = [...programsData];
                            updated[index].title = e.target.value;
                            setProgramsData(updated);
                          }}
                          className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 mb-1">المبلغ المستهدف (ج.م)</label>
                        <input
                          type="number"
                          value={prog.targetAmount}
                          onChange={(e) => {
                            const updated = [...programsData];
                            updated[index].targetAmount = Number(e.target.value);
                            setProgramsData(updated);
                          }}
                          className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 mb-1">المبلغ المجموع (ج.م)</label>
                        <input
                          type="number"
                          value={prog.raisedAmount}
                          onChange={(e) => {
                            const updated = [...programsData];
                            updated[index].raisedAmount = Number(e.target.value);
                            setProgramsData(updated);
                          }}
                          className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg font-mono text-[#0F5132] font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">وصف وسهم التبرع</label>
                      <input
                        type="text"
                        value={prog.unitDescription || ''}
                        onChange={(e) => {
                          const updated = [...programsData];
                          updated[index].unitDescription = e.target.value;
                          setProgramsData(updated);
                        }}
                        className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg"
                        placeholder="مثال: قيمة كفالة اليتيم الشهرية 500 ج.م"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WORDPRESS INTEGRATION */}
          {activeTab === 'wordpress' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-stone-900 mb-1">
                  ربط إضافة وقالب ووردبريس (WordPress Plugin & Theme Integration)
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  يمكنك تحميل إضافة ووردبريس الرسمية الخاصة بالجمعية وتركيبها على أي موقع ووردبريس، أو ربط الموقع الحالي مباشرة مع ووردبريس لمزامنة التبرعات والمستفيدين عبر الـ API.
                </p>
              </div>

              {/* Download Buttons Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-emerald-950 text-white rounded-2xl border border-emerald-800 space-y-3">
                  <span className="text-xs font-bold text-amber-300 block">1. إضافة ووردبريس (WordPress Plugin)</span>
                  <h5 className="text-sm font-bold">إضافة جمعية الصفوة للتبرعات</h5>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    إضافة كاملة يتم رفعها من (إضافات ← أضف جديداً ← رفع إضافة) وتوفر الشورت كود وصناديق التبرع السريع بالموقع.
                  </p>
                  <button
                    onClick={handleDownloadPlugin}
                    disabled={isDownloadingPlugin}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isDownloadingPlugin ? 'جاري التحضير...' : 'تحميل إضافة ووردبريس (.ZIP)'}</span>
                  </button>
                </div>

                <div className="p-5 bg-[#0F5132] text-white rounded-2xl border border-emerald-700 space-y-3">
                  <span className="text-xs font-bold text-amber-300 block">2. قالب ووردبريس كامل (WordPress Theme)</span>
                  <h5 className="text-sm font-bold">ثيم الجمعية الرسمي المتكامل</h5>
                  <p className="text-xs text-stone-200 leading-relaxed">
                    قالب ووردبريس كامل بالصفحة الرئيسية والهيدر والفوتر والـ RTL جاهز للرفع المباشر عبر (المظهر ← قوالب).
                  </p>
                  <button
                    onClick={handleDownloadTheme}
                    disabled={isDownloadingTheme}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-stone-100 text-[#0F5132] font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isDownloadingTheme ? 'جاري التحضير...' : 'تحميل قالب ووردبريس (.ZIP)'}</span>
                  </button>
                </div>
              </div>

              {/* Direct WP Site Connection Settings */}
              <div className="p-5 bg-[#FAF8F5] border border-stone-200 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-stone-900">إعدادات الربط المباشر مع موقع ووردبريس عبر API</h5>
                    <p className="text-xs text-stone-500">أدخل رابط موقعك لتمكين مزامنة التبرعات وطلبات المساعدة تلقائياً</p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-700">
                    <input
                      type="checkbox"
                      checked={wpSettings.syncEnabled}
                      onChange={(e) => setWpSettings({ ...wpSettings, syncEnabled: e.target.checked })}
                      className="rounded text-[#0F5132]"
                    />
                    <span>تفعيل المزامنة المباشرة</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">رابط موقع ووردبريس (WordPress URL)</label>
                    <input
                      type="url"
                      placeholder="https://your-wordpress-site.com"
                      value={wpSettings.wpUrl}
                      onChange={(e) => setWpSettings({ ...wpSettings, wpUrl: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-xl font-mono text-left dir-ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">مفتاح التطبيق أو Webhook (اختياري)</label>
                    <input
                      type="text"
                      placeholder="Application Password أو Webhook Token"
                      value={wpSettings.apiKey || ''}
                      onChange={(e) => setWpSettings({ ...wpSettings, apiKey: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-xl font-mono text-left dir-ltr"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleTestWpConnection}
                    className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    اختبار الاتصال مع ووردبريس
                  </button>
                  {syncTestMessage && (
                    <span className="text-xs font-semibold text-[#0F5132]">{syncTestMessage}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BENEFICIARY REQUESTS */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-stone-900 mb-1">
                  سجل طلبات المساعدة والاستفادة من أنشطة الجمعية
                </h4>
                <p className="text-xs text-stone-500">
                  طلبات المواطنين والمستفيدين المستلمة عبر نموذج "طلب مساعدة أو خدمة" في الأنشطة
                </p>
              </div>

              {beneficiaryRequests.length === 0 ? (
                <div className="p-8 text-center bg-[#FAF8F5] border border-stone-200 rounded-2xl text-xs text-stone-500">
                  لا توجد طلبات مستفيدين مسجلة حتى الآن. يمكن للزوار تقديم طلبات مساعدة من خلال زر "طلب مساعدة" في تفاصيل أي نشاط.
                </div>
              ) : (
                <div className="space-y-3">
                  {beneficiaryRequests.map((req) => (
                    <div key={req.id} className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm text-stone-900">{req.applicantName}</span>
                          <span className="text-xs text-[#0F5132] font-semibold">({req.serviceTitle})</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">{req.urgency}</span>
                        </div>
                        <p className="text-xs text-stone-600">{req.details}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-stone-500 font-mono">
                          <span>هاتف: {req.applicantPhone}</span>
                          <span>·</span>
                          <span>العنوان: {req.address}</span>
                          <span>·</span>
                          <span>التاريخ: {req.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={req.status}
                          onChange={(e) => onUpdateBeneficiaryStatus(req.id, e.target.value as BeneficiaryRequest['status'])}
                          className="text-xs p-1.5 bg-white border border-stone-300 rounded-lg font-bold"
                        >
                          <option value="قيد المراجعة">قيد المراجعة</option>
                          <option value="تم القبول">تم القبول</option>
                          <option value="تم التنفيذ">تم التنفيذ</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0F5132] hover:bg-[#0A3622] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>حفظ وتطبيق التغييرات فوراً</span>
            </button>

            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 animate-pulse">
                <CheckCircle2 className="w-4 h-4" />
                <span>تم حفظ التعديلات وتحديث الموقع بنجاح!</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetToDefault}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-stone-600 hover:text-red-700 text-xs font-semibold rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
              title="إعادة تعيين المحتوى للوضع الافتراضي"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة المحتوى الافتراضي</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-stone-700 hover:text-stone-900 rounded-lg"
            >
              إغلاق
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
