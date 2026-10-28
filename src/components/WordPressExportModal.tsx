import React, { useState } from 'react';
import { X, Download, Copy, Check, FileCode, CheckCircle2, Server, HelpCircle, Layers } from 'lucide-react';
import { generateWordPressThemeFiles, downloadWordPressThemeZip, WPThemeFile } from '../utils/wordpressThemeGenerator';

interface WordPressExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WordPressExportModal: React.FC<WordPressExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [files] = useState<WPThemeFile[]>(generateWordPressThemeFiles());
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentFile = files[selectedFileIndex] || files[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      const zipBlob = await downloadWordPressThemeZip();
      
      // Create download link
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'alsafwa-islamic-society-theme.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Error generating zip:', err);
    } finally {
      setIsDownloading(false);
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
              <h3 className="text-lg font-black text-white">
                تصدير قالب ووردبريس كامل (WordPress Theme Exporter)
              </h3>
              <p className="text-xs text-emerald-300">
                جاهز للتركيب المباشر على أي موقع ووردبريس من لوحة التحكم بنقرة واحدة
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Main Download Banner */}
          <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-[#0F5132] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-amber-400/30">
            <div className="space-y-2 text-right">
              <span className="inline-block px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-full">
                حزمة ووردبريس رسمية كاملة ومجربة
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white">
                حمل القالب الآن: alsafwa-islamic-society-theme.zip
              </h4>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-xl">
                يحتوي الملف على جميع قوالب الصفحات (`front-page.php`, `header.php`, `footer.php`, `functions.php`, `style.css`) مع تسجيل الأنشطة الخيرية والشورت كود ودعم كامل للغة العربية (RTL).
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <button
                onClick={handleDownloadZip}
                disabled={isDownloading}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-5 h-5" />
                <span>{isDownloading ? 'جاري تجميع الملفات...' : 'تحميل حزمة القالب كاملة (.ZIP)'}</span>
              </button>
              {downloadSuccess && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 mt-2 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تم بدء تحميل ملف القالب بنجاح!</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Installation Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F5132]">
                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center font-mono">1</span>
                <span>تحميل ملف الـ ZIP</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                اضغط على زر التحميل بالأعلى لتنزيل ملف القالب المضغوط على جهازك.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F5132]">
                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center font-mono">2</span>
                <span>الرفع في ووردبريس</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                من لوحة تحكم ووردبريس: اذهب إلى <strong>المظهر (Appearance) ← قوالب (Themes) ← أضف قالباً جديداً ← رفع قالب</strong>.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F5132]">
                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center font-mono">3</span>
                <span>التنصيب والتفعيل</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                اختر الملف المضغوط واضغط <strong>التنصيب الآن</strong> ثم <strong>تفعيل</strong> ليعمل الموقع بكامل طاقته ومحتواه فوراً!
              </p>
            </div>
          </div>

          {/* In-App Theme File Browser & Code Inspector */}
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
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'تم النسخ!' : 'نسخ الكود'}</span>
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

            {/* Code Box */}
            <div className="p-4 overflow-x-auto max-h-80 font-mono text-xs text-stone-300 leading-relaxed dir-ltr text-left">
              <pre className="select-all">
                <code>{currentFile.content}</code>
              </pre>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-1.5">
            <Server className="w-4 h-4 text-emerald-700" />
            <span>متوافق مع WordPress 6.0 وحتى 6.7+، مع PHP 7.4 و 8.0 و 8.2+</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-lg cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
