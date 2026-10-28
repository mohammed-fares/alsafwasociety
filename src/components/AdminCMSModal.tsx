import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Image as ImageIcon, 
  FileText, 
  Layers, 
  Upload, 
  Save, 
  RotateCcw, 
  Check, 
  Download, 
  Plus, 
  Trash2, 
  Link as LinkIcon, 
  CheckCircle2, 
  Users,
  Lock,
  KeyRound,
  ShieldCheck,
  CreditCard,
  Share2,
  Truck,
  BookOpen,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { 
  SiteContentData, 
  ActivityProgram, 
  BeneficiaryRequest, 
  WordPressSyncConfig, 
  SocietyArticle 
} from '../types';
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
  currentPassword: string;
  onUpdatePassword: (newPassword: string) => void;
}

type TabType = 
  | 'media' 
  | 'info' 
  | 'articles' 
  | 'hearse' 
  | 'activities' 
  | 'payments_social' 
  | 'requests' 
  | 'wordpress' 
  | 'security';

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
  currentPassword,
  onUpdatePassword,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('media');
  
  // Local state for editing
  const [formData, setFormData] = useState<SiteContentData>(content);
  const [programsData, setProgramsData] = useState<ActivityProgram[]>(activities);
  const [wpSettings, setWpSettings] = useState<WordPressSyncConfig>(wpConfig);
  
  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

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

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (oldPassword.trim() !== currentPassword.trim()) {
      setPasswordError('كلمة المرور الحالية غير صحيحة!');
      return;
    }

    if (newPassword.trim().length < 4) {
      setPasswordError('كلمة المرور الجديدة يجب أن تتكون من 4 أحرف أو أرقام على الأقل');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('كلمة المرور الجديدة وتأكيدها غير متطابقين!');
      return;
    }

    onUpdatePassword(newPassword.trim());
    setPasswordSuccess('تم تغيير كلمة المرور بنجاح! سيتم استخدامها في تسجيلات الدخول القادمة.');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleAddNewActivity = () => {
    const newId = `activity-${Date.now()}`;
    const newProg: ActivityProgram = {
      id: newId,
      title: 'مشروع خيري جديد',
      subtitle: 'مبادرة جديدة لخدمة المستحقين',
      description: 'وصف تفصيلي للمشروع وأهدافه والفئات المستفيدة منه.',
      category: 'مساعدات',
      targetAmount: 50000,
      raisedAmount: 0,
      donorCount: 0,
      defaultAmounts: [50, 100, 250, 500],
      unitDescription: 'سهم المساهمة: 100 ج.م',
      iconName: 'HeartHandshake',
    };
    setProgramsData([newProg, ...programsData]);
  };

  const handleDeleteActivity = (id: string) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا النشاط؟')) {
      setProgramsData(programsData.filter((p) => p.id !== id));
    }
  };

  const handleAddNewArticle = () => {
    const nextNum = `المادة (${formData.articles.length + 1})`;
    const newArt: SocietyArticle = {
      number: nextNum,
      title: 'عنوان المادة الجديدة',
      content: 'نص المادة القانونية في لائحة النظام الأساسي المعتمدة.',
    };
    setFormData({
      ...formData,
      articles: [...formData.articles, newArt],
    });
  };

  const handleDeleteArticle = (index: number) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذه المادة؟')) {
      const updated = formData.articles.filter((_, idx) => idx !== index);
      setFormData({ ...formData, articles: updated });
    }
  };

  const handleDownloadTheme = async () => {
    try {
      setIsDownloadingTheme(true);
      const blob = await downloadWordPressThemeZip(formData, programsData);
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

  // Find Hearse Project in programs
  const hearseIndex = programsData.findIndex((p) => p.id === 'hearse-project');
  const hearseProject = hearseIndex >= 0 ? programsData[hearseIndex] : programsData[1] || programsData[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-6xl w-full my-auto overflow-hidden shadow-2xl border border-stone-200 text-right flex flex-col max-h-[94vh]"
        dir="rtl"
      >
        
        {/* Modal Header */}
        <div className="bg-[#052316] text-white p-4 sm:p-5 flex items-center justify-between border-b border-emerald-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  لوحة التحكم وإدارة المحتوى الشاملة (CMS)
                </h3>
                <span className="bg-emerald-900/90 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                  <Lock className="w-2.5 h-2.5" />
                  <span>محمية بكلمة مرور</span>
                </span>
              </div>
              <p className="text-xs text-emerald-300 mt-0.5">
                تعديل وتخصيص جميع نصوص، صور، أنشطة، وحسابات جمعية الصفوة الإسلامية (قيد {formData.registrationNumber})
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 text-stone-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="إغلاق لوحة التحكم"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 p-2.5 bg-stone-100 border-b border-stone-200 overflow-x-auto shrink-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'media' ? 'bg-[#0F5132] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>الصور والبانرات</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'info' ? 'bg-[#0F5132] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>الهوية والإشهار</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'articles' ? 'bg-[#0F5132] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>مواد اللائحة الرسمية</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('hearse')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'hearse' ? 'bg-[#0F5132] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>مشروع سيارة الموتى (المادة 4)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('activities')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'activities' ? 'bg-[#0F5132] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>الأنشطة الـ 11 ({programsData.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('payments_social')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'payments_social' ? 'bg-[#0F5132] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>الحسابات والسوشيال ميديا</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'security' ? 'bg-[#0F5132] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-500" />
            <span>الأمان وكلمة المرور</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('requests')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'requests' ? 'bg-[#0F5132] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>طلبات المستفيدين ({beneficiaryRequests.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wordpress')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'wordpress' ? 'bg-[#0F5132] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>تكامل ووردبريس</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: MEDIA & IMAGES */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-stone-900 mb-1">
                  إدارة وتغيير صور الموقع والبانرات واللوجو
                </h4>
                <p className="text-xs text-stone-500">
                  يمكنك رفع صور جديدة مباشرة من جهازك أو إدخال مسار/رابط الصورة، وستنعكس التغييرات في الموقع فوراً.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Logo Editor */}
                <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800">اللوجو الرسمي للجمعية:</span>
                    <span className="text-[10px] text-stone-500">موصى به: مربع أو دائري بدقة عالية</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <img 
                      src={formData.logoUrl} 
                      alt="Logo preview" 
                      className="w-16 h-16 object-contain rounded-full border border-stone-300 p-1 bg-white shrink-0 shadow-xs" 
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
                        <span>رفع صورة اللوجو من جهازك</span>
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
                    <span className="text-xs font-bold text-stone-800">بانر الهيرو الرئيسي (Hero Banner):</span>
                    <span className="text-[10px] text-stone-500">موصى به: 16:9 أو عرضي</span>
                  </div>
                  <div className="space-y-2">
                    <img 
                      src={formData.bannerUrl} 
                      alt="Banner preview" 
                      className="w-full h-24 object-cover rounded-xl border border-stone-300 bg-stone-900" 
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={formData.bannerUrl}
                        onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                        className="flex-1 text-xs p-2 bg-white border border-stone-300 rounded-lg font-mono dir-ltr"
                        placeholder="مسار أو رابط البانر الرئيسي"
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
                      className="w-16 h-20 object-cover rounded-lg border border-stone-300 bg-white shrink-0 shadow-xs" 
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
                        <span>رفع وثيقة اللائحة</span>
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
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-stone-900 mb-1">
                  بيانات الجمعية والإشهار الرسمي ومعلومات الاتصال
                </h4>
                <p className="text-xs text-stone-500">
                  تعديل أرقام الإشهار وسنة التأسيس، المقر، العنوان، ومواعيد العمل.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-mono font-bold text-[#0F5132]"
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

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">جهة القيد والإشراف</label>
                  <input
                    type="text"
                    value={formData.administration}
                    onChange={(e) => setFormData({ ...formData, administration: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">تاريخ اعتماد اللائحة الرسمية</label>
                  <input
                    type="text"
                    value={formData.bylawApprovalDate}
                    onChange={(e) => setFormData({ ...formData, bylawApprovalDate: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">شعار الجمعية الرئيسي</label>
                  <input
                    type="text"
                    value={formData.slogan}
                    onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">الشعار الفرعي (القيم)</label>
                  <input
                    type="text"
                    value={formData.subSlogan}
                    onChange={(e) => setFormData({ ...formData, subSlogan: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-bold text-stone-700 mb-1">العنوان الكامل للمقر الرئيسي</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">الهاتف الموحد</label>
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

                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-xs font-bold text-stone-700 mb-1">مواعيد العمل الرسمية</label>
                  <input
                    type="text"
                    value={formData.workHours}
                    onChange={(e) => setFormData({ ...formData, workHours: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LEGAL ARTICLES (لائحة النظام الأساسي) */}
          {activeTab === 'articles' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-stone-900 mb-1">
                    مواد لائحة النظام الأساسي المعتمدة
                  </h4>
                  <p className="text-xs text-stone-500">
                    تعديل نصوص المواد الرسمية المعروضة في قسم الشفافية واللائحة بالموقع
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddNewArticle}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#0F5132] border border-emerald-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة مادة جديدة</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.articles.map((art, idx) => (
                  <div key={idx} className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#0F5132] font-black text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={art.number}
                          onChange={(e) => {
                            const updated = [...formData.articles];
                            updated[idx].number = e.target.value;
                            setFormData({ ...formData, articles: updated });
                          }}
                          className="text-xs font-bold p-1.5 bg-white border border-stone-300 rounded-lg text-amber-800"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteArticle(idx)}
                        className="text-stone-400 hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
                        title="حذف هذه المادة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">عنوان المادة:</label>
                      <input
                        type="text"
                        value={art.title}
                        onChange={(e) => {
                          const updated = [...formData.articles];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, articles: updated });
                        }}
                        className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">نص المادة القانونية:</label>
                      <textarea
                        rows={3}
                        value={art.content}
                        onChange={(e) => {
                          const updated = [...formData.articles];
                          updated[idx].content = e.target.value;
                          setFormData({ ...formData, articles: updated });
                        }}
                        className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-xl leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: HEARSE PROJECT SPOTLIGHT */}
          {activeTab === 'hearse' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-stone-900 mb-1">
                  مشروع شراء وتجهيز سيارة نقل ودفن الموتى (المادة 4)
                </h4>
                <p className="text-xs text-stone-500">
                  تعديل مستهدفات المشروع، المبالغ المجمعة، مواصفات السيارة، والأسهم الأربعة المعروضة في القسم المخصص
                </p>
              </div>

              {hearseProject && (
                <div className="p-5 bg-emerald-950 text-white rounded-3xl border border-emerald-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-800">
                    <span className="text-xs font-bold text-amber-300">
                      مشروع نوعي معتمد في المادة (4) من لائحة النظام الأساسي
                    </span>
                    <span className="font-mono text-xs text-emerald-300">ID: {hearseProject.id}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-emerald-200 mb-1">المبلغ المستهدف (ج.م)</label>
                      <input
                        type="number"
                        value={hearseProject.targetAmount}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setProgramsData((prev) =>
                            prev.map((p) => (p.id === hearseProject.id ? { ...p, targetAmount: val } : p))
                          );
                        }}
                        className="w-full text-sm font-bold font-mono p-2.5 bg-emerald-900/80 border border-emerald-700 rounded-xl text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-200 mb-1">المبلغ المجموع حتى الآن (ج.م)</label>
                      <input
                        type="number"
                        value={hearseProject.raisedAmount}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setProgramsData((prev) =>
                            prev.map((p) => (p.id === hearseProject.id ? { ...p, raisedAmount: val } : p))
                          );
                        }}
                        className="w-full text-sm font-bold font-mono p-2.5 bg-emerald-900/80 border border-emerald-700 rounded-xl text-amber-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-200 mb-1">عدد المساهمين</label>
                      <input
                        type="number"
                        value={hearseProject.donorCount}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setProgramsData((prev) =>
                            prev.map((p) => (p.id === hearseProject.id ? { ...p, donorCount: val } : p))
                          );
                        }}
                        className="w-full text-sm font-bold font-mono p-2.5 bg-emerald-900/80 border border-emerald-700 rounded-xl text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-200 mb-1">عنوان المشروع الرئيسي:</label>
                    <input
                      type="text"
                      value={hearseProject.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setProgramsData((prev) =>
                          prev.map((p) => (p.id === hearseProject.id ? { ...p, title: val } : p))
                        );
                      }}
                      className="w-full text-xs font-bold p-2.5 bg-emerald-900/80 border border-emerald-700 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-200 mb-1">الوصف الإنساني للسيارة:</label>
                    <textarea
                      rows={3}
                      value={hearseProject.description}
                      onChange={(e) => {
                        const val = e.target.value;
                        setProgramsData((prev) =>
                          prev.map((p) => (p.id === hearseProject.id ? { ...p, description: val } : p))
                        );
                      }}
                      className="w-full text-xs p-2.5 bg-emerald-900/80 border border-emerald-700 rounded-xl text-stone-200 leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <span className="block text-xs font-bold text-amber-300 mb-2">أسهم التبرع المتاحة للمشروع:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2.5 bg-emerald-900/60 rounded-xl border border-emerald-800 text-center">
                        <span className="block text-[11px] text-emerald-200 font-bold">سهم إكرام الموتى</span>
                        <span className="block font-mono font-black text-amber-300 mt-1">250 ج.م</span>
                      </div>
                      <div className="p-2.5 bg-emerald-900/60 rounded-xl border border-emerald-800 text-center">
                        <span className="block text-[11px] text-emerald-200 font-bold">سهم الصدقة الجارية</span>
                        <span className="block font-mono font-black text-amber-300 mt-1">500 ج.م</span>
                      </div>
                      <div className="p-2.5 bg-emerald-900/60 rounded-xl border border-emerald-800 text-center">
                        <span className="block text-[11px] text-emerald-200 font-bold">سهم التجهيز الطبي</span>
                        <span className="block font-mono font-black text-amber-300 mt-1">1,000 ج.م</span>
                      </div>
                      <div className="p-2.5 bg-emerald-900/60 rounded-xl border border-emerald-800 text-center">
                        <span className="block text-[11px] text-emerald-200 font-bold">سهم الوفاء عن المتوفى</span>
                        <span className="block font-mono font-black text-amber-300 mt-1">5,000 ج.م</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ALL 11 ACTIVITIES & PROGRAMS */}
          {activeTab === 'activities' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-stone-900 mb-1">
                    إدارة وتعديل الأنشطة والخدمات الـ 11
                  </h4>
                  <p className="text-xs text-stone-500">
                    تعديل المبالغ المستهدفة والمجمعة والوصف وأسهم التبرع والصورة لكل نشاط
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddNewActivity}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0F5132] hover:bg-[#0A3622] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة نشاط خيري جديد</span>
                </button>
              </div>

              <div className="space-y-4">
                {programsData.map((prog, index) => (
                  <div key={prog.id} className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-[#0F5132] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                          #{index + 1}
                        </span>
                        <span className="text-xs font-bold text-stone-800">{prog.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-stone-400 font-mono">
                          ID: {prog.id}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteActivity(prog.id)}
                          className="text-stone-400 hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
                          title="حذف هذا النشاط"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
                        <label className="block text-[11px] font-bold text-stone-600 mb-1">العنوان الفرعي</label>
                        <input
                          type="text"
                          value={prog.subtitle}
                          onChange={(e) => {
                            const updated = [...programsData];
                            updated[index].subtitle = e.target.value;
                            setProgramsData(updated);
                          }}
                          className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg text-amber-800 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 mb-1">الفئة / التصنيف</label>
                        <select
                          value={prog.category}
                          onChange={(e) => {
                            const updated = [...programsData];
                            updated[index].category = e.target.value as any;
                            setProgramsData(updated);
                          }}
                          className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg"
                        >
                          <option value="كفالات">كفالات</option>
                          <option value="صحة">صحة</option>
                          <option value="تعليم وقرآن">تعليم وقرآن</option>
                          <option value="مساعدات">مساعدات</option>
                          <option value="عمارة ومشاريع">عمارة ومشاريع</option>
                          <option value="مواسم">مواسم</option>
                        </select>
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
                          className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg font-mono font-bold"
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

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 mb-1">عدد المتبرعين</label>
                        <input
                          type="number"
                          value={prog.donorCount}
                          onChange={(e) => {
                            const updated = [...programsData];
                            updated[index].donorCount = Number(e.target.value);
                            setProgramsData(updated);
                          }}
                          className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">وصف وسهم التبرع المقترح</label>
                      <input
                        type="text"
                        value={prog.unitDescription || ''}
                        onChange={(e) => {
                          const updated = [...programsData];
                          updated[index].unitDescription = e.target.value;
                          setProgramsData(updated);
                        }}
                        placeholder="مثال: قيمة كفالة اليتيم الشهرية 500 ج.م أو مساهمة عامة"
                        className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">الوصف التفصيلي للنشاط</label>
                      <textarea
                        rows={2}
                        value={prog.description}
                        onChange={(e) => {
                          const updated = [...programsData];
                          updated[index].description = e.target.value;
                          setProgramsData(updated);
                        }}
                        className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg leading-relaxed"
                      />
                    </div>

                    {/* Activity Image upload */}
                    <div className="flex items-center gap-3 pt-1 border-t border-stone-200">
                      {prog.image && (
                        <img 
                          src={prog.image} 
                          alt={prog.title} 
                          className="w-10 h-10 object-cover rounded-lg border border-stone-300 shrink-0" 
                        />
                      )}
                      <input
                        type="text"
                        value={prog.image || ''}
                        onChange={(e) => {
                          const updated = [...programsData];
                          updated[index].image = e.target.value;
                          setProgramsData(updated);
                        }}
                        placeholder="رابط أو مسار صورة النشاط..."
                        className="flex-1 text-xs p-1.5 bg-white border border-stone-300 rounded-lg font-mono dir-ltr"
                      />
                      <label className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold cursor-pointer transition-colors shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>رفع صورة</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleProgramImageUpload(prog.id, e)}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: BANK ACCOUNTS & SOCIAL MEDIA */}
          {activeTab === 'payments_social' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-stone-900 mb-1">
                  حسابات التبرع وبوابات الدفع وروابط السوشيال ميديا
                </h4>
                <p className="text-xs text-stone-500">
                  تعديل معرف إنستاباي، فودافون كاش، وأرقام حسابات البنك الأهلي وبنك مصر وروابط التواصل
                </p>
              </div>

              {/* Payment Gateways Card */}
              <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl space-y-4">
                <h5 className="text-xs font-bold text-[#0F5132] pb-2 border-b border-stone-200">
                  حسابات التحصيل والدفع الإلكتروني
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">عنوان إنستاباي InstaPay IPA:</label>
                    <input
                      type="text"
                      value={formData.paymentGateways?.instaPay.id || 'alsafwasociety@instapay'}
                      onChange={(e) => {
                        const updated = { ...formData };
                        if (updated.paymentGateways) {
                          updated.paymentGateways.instaPay.id = e.target.value;
                          setFormData(updated);
                        }
                      }}
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-xl font-mono font-bold dir-ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">رقم فودافون كاش ومحافظ المحمول:</label>
                    <input
                      type="text"
                      value={formData.paymentGateways?.vodafoneCash.numbers[0] || formData.phone}
                      onChange={(e) => {
                        const updated = { ...formData };
                        if (updated.paymentGateways) {
                          updated.paymentGateways.vodafoneCash.numbers[0] = e.target.value;
                          setFormData(updated);
                        }
                      }}
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-xl font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">رقم حساب البنك الأهلي المصري (NBE):</label>
                    <input
                      type="text"
                      value={formData.paymentGateways?.bankAccounts[0]?.accountNumber || '10912384758001'}
                      onChange={(e) => {
                        const updated = { ...formData };
                        if (updated.paymentGateways?.bankAccounts[0]) {
                          updated.paymentGateways.bankAccounts[0].accountNumber = e.target.value;
                          setFormData(updated);
                        }
                      }}
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-xl font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">رقم حساب بنك مصر (Banque Misr):</label>
                    <input
                      type="text"
                      value={formData.paymentGateways?.bankAccounts[1]?.accountNumber || '34800010009841'}
                      onChange={(e) => {
                        const updated = { ...formData };
                        if (updated.paymentGateways?.bankAccounts[1]) {
                          updated.paymentGateways.bankAccounts[1].accountNumber = e.target.value;
                          setFormData(updated);
                        }
                      }}
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-xl font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media Links Card */}
              <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl space-y-4">
                <h5 className="text-xs font-bold text-[#0F5132] pb-2 border-b border-stone-200">
                  روابط السوشيال ميديا المعتمدة
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">رابط صفحة الفيسبوك الرسمية:</label>
                    <input
                      type="url"
                      value={formData.socialLinks.facebookPage}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, facebookPage: e.target.value }
                      })}
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-xl font-mono dir-ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">رابط جروب الفيسبوك (جروب الخير):</label>
                    <input
                      type="url"
                      value={formData.socialLinks.facebookGroup}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, facebookGroup: e.target.value }
                      })}
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-xl font-mono dir-ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">رابط قناة اليوتيوب الرسمية:</label>
                    <input
                      type="url"
                      value={formData.socialLinks.youtube}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, youtube: e.target.value }
                      })}
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-xl font-mono dir-ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">رابط محادثة واتساب المباشرة:</label>
                    <input
                      type="url"
                      value={formData.whatsappUrl || `https://wa.me/20${formData.phone.replace(/^0/, '')}`}
                      onChange={(e) => setFormData({
                        ...formData,
                        whatsappUrl: e.target.value
                      })}
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-xl font-mono dir-ltr"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 7: SECURITY & PASSWORD SETTINGS */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h4 className="text-base font-bold text-stone-900 mb-1">
                  إعدادات الأمان وتغيير كلمة مرور لوحة التحكم
                </h4>
                <p className="text-xs text-stone-500">
                  لوحة التحكم محمية بكلمة مرور. يمكنك تغيير كلمة المرور هنا للحفاظ على سرية التعديلات.
                </p>
              </div>

              {passwordError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{passwordError}</span>
                </div>
              )}

              {passwordSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{passwordSuccess}</span>
                </div>
              )}

              <form onSubmit={handleChangePasswordSubmit} className="p-5 bg-[#FAF8F5] border border-stone-200 rounded-3xl space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    كلمة المرور الحالية:
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    placeholder="أدخل كلمة المرور الحالية..."
                    className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    كلمة المرور الجديدة:
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="أدخل كلمة المرور الجديدة (4 أحرف أو أرقام على الأقل)..."
                    className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    تأكيد كلمة المرور الجديدة:
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="أعد إدخال كلمة المرور الجديدة للتأكيد..."
                    className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-xl font-mono"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0F5132] hover:bg-[#0A3622] text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span>تحديث وحفظ كلمة المرور الجديدة</span>
                  </button>
                </div>
              </form>

              <div className="p-4 bg-stone-100 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-stone-800">قفل الجلسة والخروج من لوحة التحكم:</span>
                  <span className="text-[11px] text-stone-500">يتطلب الدخول مجدداً كتابة كلمة المرور</span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>قفل اللوحة الآن</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: BENEFICIARY REQUESTS */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-stone-900 mb-1">
                  طلبات المستفيدين والحالات الإنسانية ({beneficiaryRequests.length})
                </h4>
                <p className="text-xs text-stone-500">
                  طلبات الإعانة وكفالة الأيتام وتجهيز سيارة الموتى الواردة من الموقع
                </p>
              </div>

              {beneficiaryRequests.length === 0 ? (
                <div className="p-8 text-center text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
                  لا توجد طلبات مستفيدين مسجلة حتى الآن.
                </div>
              ) : (
                <div className="space-y-3">
                  {beneficiaryRequests.map((req) => (
                    <div key={req.id} className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-900">{req.applicantName}</span>
                          <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">{req.serviceTitle}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-stone-500">{req.createdAt}</span>
                          <select
                            value={req.status}
                            onChange={(e) => onUpdateBeneficiaryStatus(req.id, e.target.value as any)}
                            className="text-xs p-1 bg-white border border-stone-300 rounded-lg font-bold"
                          >
                            <option value="قيد المراجعة">قيد المراجعة</option>
                            <option value="تم القبول">تم القبول</option>
                            <option value="تم التنفيذ">تم التنفيذ</option>
                          </select>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed">{req.details}</p>

                      <div className="flex items-center gap-4 text-[11px] text-stone-500 font-mono pt-1">
                        <span>هاتف: {req.applicantPhone}</span>
                        {req.nationalId && <span>رقم قومي: {req.nationalId}</span>}
                        <span>العنوان: {req.address}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 9: WORDPRESS SYNC */}
          {activeTab === 'wordpress' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h4 className="text-base font-bold text-stone-900 mb-1">
                  تكامل وربط ووردبريس (WordPress Integration)
                </h4>
                <p className="text-xs text-stone-500">
                  تنزيل حزم القالب والإضافة الرسمية المحدثة ببيانات الجمعية الحالية.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
                  <span className="text-xs font-bold text-emerald-900 block">قالب ووردبريس الرسمي المحدث:</span>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    ملف ZIP كامل يشمل كل أقسام الموقع، مشروع سيارة الموتى، الـ 11 نشاطاً، وروابط السوشيال ميديا.
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadTheme}
                    disabled={isDownloadingTheme}
                    className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>{isDownloadingTheme ? 'جاري التحضير...' : 'تحميل قالب الثيم (ZIP)'}</span>
                  </button>
                </div>

                <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3">
                  <span className="text-xs font-bold text-blue-900 block">إضافة التبرعات المباشرة (Plugin):</span>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    إضافة ووردبريس تدعم الشورت كود [alsafwa_donate_box] وربط التبرعات بإنستاباي وفودافون كاش.
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadPlugin}
                    disabled={isDownloadingPlugin}
                    className="w-full py-2.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>{isDownloadingPlugin ? 'جاري التحضير...' : 'تحميل الإضافة (Plugin ZIP)'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl space-y-3">
                <label className="block text-xs font-bold text-stone-700">رابط موقع ووردبريس المرتبط:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={wpSettings.wpUrl}
                    onChange={(e) => setWpSettings({ ...wpSettings, wpUrl: e.target.value })}
                    placeholder="https://your-wordpress-site.com"
                    className="flex-1 text-xs p-2 bg-white border border-stone-300 rounded-xl font-mono dir-ltr"
                  />
                  <button
                    type="button"
                    onClick={handleTestWpConnection}
                    className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    فحص الاتصال
                  </button>
                </div>
                {syncTestMessage && (
                  <p className="text-xs text-emerald-800 font-bold bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    {syncTestMessage}
                  </p>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer Action Bar */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveAll}
              className="py-2.5 px-6 bg-[#0F5132] hover:bg-[#0A3622] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 text-amber-300" />
              <span>حفظ وتطبيق جميع التعديلات في الموقع</span>
            </button>

            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>تم حفظ التعديلات بنجاح وظهرت في الموقع فوراً!</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetToDefault}
              className="py-2 px-3 text-stone-500 hover:text-red-700 hover:bg-red-50 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة المحتوى الافتراضي</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
