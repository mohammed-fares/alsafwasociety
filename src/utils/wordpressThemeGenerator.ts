import JSZip from 'jszip';
import { SOCIETY_INFO, ACTIVITIES_DATA } from '../data/societyData';
import { SiteContentData, ActivityProgram } from '../types';

export interface WPThemeFile {
  filename: string;
  description: string;
  content: string;
}

export function generateWordPressThemeFiles(
  content?: SiteContentData,
  activities?: ActivityProgram[]
): WPThemeFile[] {
  const info = content || (SOCIETY_INFO as unknown as SiteContentData);
  const acts = activities || ACTIVITIES_DATA;
  const styleCss = `/*
Theme Name: جمعية الصفوة الإسلامية - Alsafwa Islamic Society
Theme URI: ${SOCIETY_INFO.website}
Author: جمعية الصفوة الإسلامية
Author URI: ${SOCIETY_INFO.website}
Description: قالب ووردبريس رسمي متكامل لجمعية الصفوة الإسلامية المشهرة برقم 3794 لسنة 1991 بالقاهرة. يدعم نظام التبرعات الإلكتروني، كفالة الأيتام، مشروع سيارة إكرام الموتى، دعم كامل للغة العربية (RTL)، وتصميم متجاوب مع جميع الأجهزة والشاشات.
Version: 1.0.0
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: alsafwa-theme
Tags: charity, islamic, donation, rtl-language-support, custom-menu, featured-images, responsive-layout, translation-ready
*/

/* Reset & Base Fonts */
body {
  font-family: 'Cairo', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  direction: rtl;
  text-align: right;
  background-color: #FAF8F5;
  color: #1F2937;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

/* Islamic Brand Colors */
:root {
  --color-primary: #0F5132;
  --color-primary-dark: #0A3622;
  --color-gold: #C5A059;
  --color-gold-hover: #B38E44;
  --color-cream: #FAF8F5;
}

.site-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header Styles */
.site-header {
  background: #ffffff;
  border-bottom: 1px solid #E5E7EB;
  position: sticky;
  top: 0;
  z-index: 50;
}

.nav-link {
  color: #374151;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--color-primary);
}

/* Buttons */
.btn-primary {
  background: var(--color-primary);
  color: #ffffff;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 700;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.2s ease;
}

.btn-primary:hover {
  background: var(--color-primary-dark);
}

.btn-gold {
  background: var(--color-gold);
  color: #ffffff;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 700;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.2s ease;
}

.btn-gold:hover {
  background: var(--color-gold-hover);
}

/* Quranic verse block */
.quran-verse {
  font-family: 'Amiri', serif;
  font-size: 1.75rem;
  color: var(--color-primary-dark);
  text-align: center;
}

/* Grid & Cards */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: #ffffff;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
}
`;

  const functionsPhp = `<?php
/**
 * Alsafwa Islamic Society Theme Functions
 * Theme Name: جمعية الصفوة الإسلامية
 * Registration No: 3794 لسنة 1991
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function alsafwa_theme_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 300,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));

    // Register Nav Menus
    register_nav_menus(array(
        'primary-menu' => __('القائمة الرئيسية', 'alsafwa-theme'),
        'footer-menu'  => __('قائمة الفوتر', 'alsafwa-theme'),
    ));
}
add_action('after_setup_theme', 'alsafwa_theme_setup');

// Enqueue styles and scripts
function alsafwa_enqueue_scripts() {
    // Google Fonts: Cairo & Amiri
    wp_enqueue_style('alsafwa-fonts', 'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cairo:wght@400;500;600;700;800;900&display=swap', array(), null);
    
    // Tailwind CSS CDN for instant styling
    wp_enqueue_script('tailwindcss', 'https://cdn.tailwindcss.com', array(), null, false);
    
    // Main stylesheet
    wp_enqueue_style('alsafwa-style', get_stylesheet_uri(), array('alsafwa-fonts'), '1.0.0');
}
add_action('wp_enqueue_scripts', 'alsafwa_enqueue_scripts');

// Register Custom Post Type: الأنشطة ومشاريع التبرع (Charity Projects)
function alsafwa_register_projects_cpt() {
    $labels = array(
        'name'               => 'المشاريع الخيرية',
        'singular_name'      => 'مشروع خيري',
        'menu_name'          => 'مشاريع الصفوة',
        'add_new'            => 'إضافة مشروع جديد',
        'add_new_item'       => 'إضافة مشروع خيري جديد',
        'edit_item'          => 'تعديل المشروع',
        'new_item'           => 'مشروع جديد',
        'view_item'          => 'عرض المشروع',
        'search_items'       => 'بحث في المشاريع',
        'not_found'          => 'لم يتم العثور على مشاريع',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => true,
        'menu_icon'          => 'dashicons-heart',
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt'),
        'rewrite'            => array('slug' => 'projects'),
        'show_in_rest'       => true,
    );

    register_post_type('charity_project', $args);
}
add_action('init', 'alsafwa_register_projects_cpt');

// Shortcode for quick donation block: [alsafwa_donate_box]
function alsafwa_donate_box_shortcode($atts) {
    ob_start();
    ?>
    <div class="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm my-6" dir="rtl">
        <h3 class="text-xl font-bold text-emerald-900 mb-2">تبرع مباشر لجمعية الصفوة الإسلامية</h3>
        <p class="text-sm text-gray-600 mb-4">مشهرة برقم 3794 لسنة 1991 - القاهرة</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div class="p-3 bg-emerald-50 rounded-lg">
                <span class="font-bold text-emerald-800">إنستاباي InstaPay:</span>
                <p class="font-mono text-gray-800 mt-1">${SOCIETY_INFO.paymentGateways.instaPay.id}</p>
            </div>
            <div class="p-3 bg-emerald-50 rounded-lg">
                <span class="font-bold text-emerald-800">فودافون كاش:</span>
                <p class="font-mono text-gray-800 mt-1">${SOCIETY_INFO.phone}</p>
            </div>
        </div>
        <div class="mt-4 text-center">
            <a href="https://wa.me/201115947455?text=أرغب%20في%20التبرع%20لجمعية%20الصفوة%20الإسلامية" class="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 px-6 rounded-lg transition-colors">
                تأكيد التبرع عبر واتساب: ${SOCIETY_INFO.phone}
            </a>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('alsafwa_donate_box', 'alsafwa_donate_box_shortcode');
`;

  const headerPhp = `<!doctype html>
<html <?php language_attributes(); ?> dir="rtl">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-[#FAF8F5] text-gray-800 antialiased'); ?>>
<?php wp_body_open(); ?>

<!-- Top Legal Notification Bar -->
<div class="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-3">
            <span>جمعية الصفوة الإسلامية</span>
            <span class="text-emerald-400">·</span>
            <span>مشهرة برقم 3794 لسنة 1991 - القاهرة - المطرية</span>
            <span class="text-emerald-400">·</span>
            <span>منذ 1991 في خدمة المجتمع</span>
        </div>
        <div class="flex items-center gap-4">
            <a href="tel:${SOCIETY_INFO.phone}" class="hover:text-white flex items-center gap-1 font-mono">
                <span>هاتف / واتساب:</span>
                <span>${SOCIETY_INFO.phone}</span>
            </a>
            <span class="text-emerald-600">|</span>
            <span class="text-amber-300 font-semibold">عطاء · تنمية · رعاية</span>
        </div>
    </div>
</div>

<!-- Main Header Navbar -->
<header class="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20 gap-8">
            <!-- Brand Zone: Logo + Name -->
            <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-3 shrink-0">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/logo.jpg" alt="جمعية الصفوة الإسلامية" class="h-14 w-14 object-contain rounded-full shadow-sm" />
                <div class="text-right">
                    <span class="block text-xl font-black text-emerald-900 leading-tight">جمعية الصفوة الإسلامية</span>
                    <span class="block text-xs font-semibold text-amber-700 tracking-wider">ALSAFWA ISLAMIC SOCIETY</span>
                </div>
            </a>

            <!-- Nav Links Zone -->
            <nav class="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-700">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-emerald-800 transition-colors whitespace-nowrap">الرئيسية</a>
                <a href="#about" class="hover:text-emerald-800 transition-colors whitespace-nowrap">عن الجمعية والإشهار</a>
                <a href="#activities" class="hover:text-emerald-800 transition-colors whitespace-nowrap">الأنشطة والخدمات</a>
                <a href="#hearse-project" class="hover:text-emerald-800 transition-colors whitespace-nowrap">سيارة إكرام الموتى</a>
                <a href="#donate" class="hover:text-emerald-800 transition-colors whitespace-nowrap">بوابة التبرعات</a>
                <a href="#contact" class="hover:text-emerald-800 transition-colors whitespace-nowrap">تواصل معنا</a>
            </nav>

            <!-- Primary Action Zone -->
            <div class="flex items-center gap-3 shrink-0">
                <a href="#donate" class="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all hover:scale-[1.02] whitespace-nowrap">
                    تبرع الآن
                </a>
            </div>
        </div>
    </div>
</header>
`;

  const footerPhp = `<!-- Site Footer -->
<footer class="bg-emerald-950 text-gray-200 pt-16 pb-8 border-t-4 border-amber-500" id="contact">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <!-- Col 1: About Society -->
            <div>
                <div class="flex items-center gap-3 mb-4">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/logo.jpg" alt="جمعية الصفوة الإسلامية" class="h-12 w-12 object-contain bg-white rounded-full p-1" />
                    <div>
                        <h4 class="text-lg font-bold text-white">جمعية الصفوة الإسلامية</h4>
                        <p class="text-xs text-amber-400">معاً .. لبناء مجتمع أكثر تكافلاً</p>
                    </div>
                </div>
                <p class="text-xs text-gray-300 leading-relaxed mb-4">
                    جمعية أهلية مصرية مشهرة برقم 3794 لسنة 1991 بإدارة المطرية - القاهرة. تعمل منذ أكثر من 33 عاماً في رعاية الأيتام، الخدمات الصحية، تحفيظ القرآن، ومساعدة الأسر المتعففة.
                </p>
                <div class="text-xs text-emerald-300 font-mono">
                    تاريخ اعتماد اللائحة: ${SOCIETY_INFO.bylawApprovalDate}
                </div>
            </div>

            <!-- Col 2: Quick Links -->
            <div>
                <h5 class="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">أنشطة الجمعية الرئيسية</h5>
                <ul class="space-y-2 text-xs text-gray-300">
                    <li><a href="#activities" class="hover:text-white transition-colors">· كفالة الأيتام والرعاية الشاملة</a></li>
                    <li><a href="#hearse-project" class="hover:text-white transition-colors">· سيارة نقل ودفن الموتى (المادة 4)</a></li>
                    <li><a href="#activities" class="hover:text-white transition-colors">· بناء وعمارة المساجد</a></li>
                    <li><a href="#activities" class="hover:text-white transition-colors">· القوافل الطبية والعلاج المجاني</a></li>
                    <li><a href="#activities" class="hover:text-white transition-colors">· حلقات تحفيظ القرآن الكريم</a></li>
                    <li><a href="#activities" class="hover:text-white transition-colors">· إطعام ومساعدات الأسر المتعففة</a></li>
                </ul>
            </div>

            <!-- Col 3: Legal & Accounts -->
            <div>
                <h5 class="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">حسابات التبرع المعتمدة</h5>
                <div class="space-y-3 text-xs">
                    <div class="bg-emerald-900/60 p-2.5 rounded border border-emerald-800">
                        <span class="text-gray-400 block">إنستاباي (InstaPay):</span>
                        <span class="font-mono text-white font-bold select-all">${SOCIETY_INFO.paymentGateways.instaPay.id}</span>
                    </div>
                    <div class="bg-emerald-900/60 p-2.5 rounded border border-emerald-800">
                        <span class="text-gray-400 block">فودافون كاش:</span>
                        <span class="font-mono text-white font-bold select-all">${SOCIETY_INFO.phone}</span>
                    </div>
                    <div class="bg-emerald-900/60 p-2.5 rounded border border-emerald-800">
                        <span class="text-gray-400 block">البنك الأهلي المصري (NBE):</span>
                        <span class="font-mono text-amber-300 font-bold select-all">10912384758001</span>
                    </div>
                </div>
            </div>

            <!-- Col 4: Contact & Location -->
            <div>
                <h5 class="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">المقر والتواصل</h5>
                <p class="text-xs text-gray-300 leading-relaxed mb-3">
                    ${SOCIETY_INFO.address}
                </p>
                <div class="space-y-2 text-xs">
                    <p class="text-gray-300">
                        <span class="text-amber-400 font-semibold">الهاتف الموحد:</span>
                        <a href="tel:${SOCIETY_INFO.phone}" class="font-mono text-white mr-1 hover:underline">${SOCIETY_INFO.phone}</a>
                    </p>
                    <p class="text-gray-300">
                        <span class="text-amber-400 font-semibold">واتساب التبرعات:</span>
                        <a href="https://wa.me/201115947455" target="_blank" class="font-mono text-white mr-1 hover:underline">${SOCIETY_INFO.whatsapp}</a>
                    </p>
                    <p class="text-gray-300">
                        <span class="text-amber-400 font-semibold">البريد:</span>
                        <span class="font-mono text-white mr-1">${SOCIETY_INFO.email}</span>
                    </p>
                </div>
            </div>
        </div>

        <div class="pt-8 border-t border-emerald-900/80 text-center text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© <?php echo date('Y'); ?> جمعية الصفوة الإسلامية - قيد 3794 لسنة 1991. جميع الحقوق محفوظة.</p>
            <p class="text-amber-400/90 font-serif text-sm">"وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ"</p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
`;

  const frontPagePhp = `<?php
/**
 * Template Name: الصفحة الرئيسية لجمعية الصفوة
 * Template for displaying the main landing page with donations
 */
get_header();
?>

<!-- Hero Banner Section -->
<section class="relative bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 text-white overflow-hidden py-16 lg:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div class="lg:col-span-7 space-y-6 text-right">
                <div class="inline-block bg-emerald-950/70 border border-amber-400/30 px-4 py-1.5 rounded-full text-xs text-amber-300 font-semibold">
                    مشهرة برقم 3794 لسنة 1991 - إدارة المطرية - القاهرة
                </div>

                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
                    جمعية الصفوة الإسلامية
                    <span class="block text-amber-300 text-xl sm:text-2xl font-bold mt-2 font-serif">
                        معاً .. لبناء مجتمع أكثر تكافلاً
                    </span>
                </h1>

                <div class="p-4 bg-emerald-950/60 border border-emerald-700/50 rounded-xl">
                    <p class="font-serif text-xl sm:text-2xl text-amber-200 leading-relaxed text-center">
                        "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَى"
                    </p>
                    <span class="block text-center text-xs text-emerald-300 mt-1">سورة المائدة - الآية 2</span>
                </div>

                <p class="text-sm sm:text-base text-gray-200 leading-relaxed max-w-2xl">
                    منذ عام 1991 نحمل أمانة العطاء في خدمة الأيتام، إعانة الأسر المتعففة، علاج المرضى، وعمارة بيوت الله وتوفير سيارة مجهزة لإكرام ودفن الموتى مجاناً.
                </p>

                <div class="flex flex-wrap items-center gap-4 pt-2">
                    <a href="#donate" class="bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black text-base px-8 py-3 rounded-lg shadow-lg transition-transform hover:scale-105">
                        تبرع الآن لأي مشروع
                    </a>
                    <a href="#activities" class="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-3 rounded-lg border border-white/20 transition-colors">
                        استعراض أنشطة الجمعية
                    </a>
                    <a href="#hearse-project" class="bg-emerald-700/60 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-3 rounded-lg border border-emerald-500/40 transition-colors">
                        مشروع سيارة الموتى (المادة 4)
                    </a>
                </div>
            </div>

            <div class="lg:col-span-5">
                <div class="bg-white rounded-2xl p-6 shadow-2xl text-gray-800 border-2 border-amber-400/40">
                    <div class="text-center mb-6">
                        <span class="text-xs font-bold text-emerald-800 tracking-wider block mb-1">بوابة العطاء السريع</span>
                        <h2 class="text-2xl font-black text-gray-900">تبرع بنقرة واحدة</h2>
                        <p class="text-xs text-gray-500 mt-1">صدقتك تصنع فارقاً حقيقياً وتصل لمستحقيها فوراً</p>
                    </div>

                    <?php echo do_shortcode('[alsafwa_donate_box]'); ?>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- Legal & Bylaws Summary Section -->
<section class="py-16 bg-white border-b border-gray-200" id="about">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
            <span class="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-2">الشفافية والمصداقية القانونية</span>
            <h2 class="text-3xl font-black text-gray-900">البيانات الأساسية ولائحة النظام الأساسي</h2>
            <p class="text-sm text-gray-600 mt-2">جمعية مسجلة وموثقة رسميًا لدى وزارة التضامن الاجتماعي ومديرية التضامن الاجتماعي بالقاهرة</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 text-center">
            <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <span class="block text-2xl font-black text-emerald-800 font-mono">3794</span>
                <span class="text-xs text-gray-600 font-medium">رقم القيد الرسمي</span>
            </div>
            <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <span class="block text-2xl font-black text-emerald-800 font-mono">1991</span>
                <span class="text-xs text-gray-600 font-medium">سنة التأسيس والإشهار</span>
            </div>
            <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <span class="block text-2xl font-black text-emerald-800">إدارة المطرية</span>
                <span class="text-xs text-gray-600 font-medium">جهة القيد والإشراف</span>
            </div>
            <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <span class="block text-2xl font-black text-emerald-800 font-mono">03 / 07 / 2023</span>
                <span class="text-xs text-gray-600 font-medium">تاريخ اعتماد اللائحة</span>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <span class="text-xs font-bold text-amber-700 block mb-1">المادة (1) - المقر والنطاق</span>
                <p class="text-sm text-gray-700 leading-relaxed">
                    ${SOCIETY_INFO.articles[0].content}
                </p>
            </div>
            <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <span class="text-xs font-bold text-amber-700 block mb-1">المادة (4) - المشروعات النوعية</span>
                <p class="text-sm text-gray-700 leading-relaxed">
                    ${SOCIETY_INFO.articles[3].content}
                </p>
            </div>
        </div>
    </div>
</section>

<!-- 11 Programs & Activities Grid -->
<section class="py-16 bg-[#FAF8F5]" id="activities">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
            <span class="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-2">عطاء مستمر في 11 مجالاً</span>
            <h2 class="text-3xl font-black text-gray-900">أنشطة ومشاريع جمعية الصفوة الإسلامية</h2>
            <p class="text-sm text-gray-600 mt-2">اختر النشاط الذي تود التبرع له لدعم المستفيدين والأسر الأولى بالرعاية</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${ACTIVITIES_DATA.map((act) => `
            <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                    <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block mb-3">${act.category}</span>
                    <h3 class="text-lg font-bold text-gray-900 mb-1">${act.title}</h3>
                    <p class="text-xs text-amber-700 font-medium mb-3">${act.subtitle}</p>
                    <p class="text-xs text-gray-600 leading-relaxed mb-4">${act.description}</p>
                </div>
                <div class="pt-4 border-t border-gray-100">
                    <p class="text-xs text-gray-500 mb-3 font-medium">${act.unitDescription || ''}</p>
                    <a href="https://wa.me/201115947455?text=أرغب%20في%20التبرع%20لمشروع%20${encodeURIComponent(act.title)}" target="_blank" class="block w-full text-center bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-2.5 rounded-lg transition-colors">
                        تبرع لهذا النشاط عبر واتساب
                    </a>
                </div>
            </div>
            `).join('')}
        </div>
    </div>
</section>

<?php
get_footer();
`;

  const indexPhp = `<?php
/**
 * Main Index Fallback Template
 */
get_header();
?>
<main class="max-w-7xl mx-auto px-4 py-12">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <article class="bg-white p-8 rounded-xl border border-gray-200 mb-6">
            <h2 class="text-2xl font-bold mb-4"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <div class="text-gray-700 leading-relaxed"><?php the_content(); ?></div>
        </article>
    <?php endwhile; else : ?>
        <p class="text-gray-500 text-center py-12">لا توجد مقالات حالياً.</p>
    <?php endif; ?>
</main>
<?php
get_footer();
`;

  const pagePhp = `<?php
/**
 * Single Page Template
 */
get_header();
?>
<main class="max-w-5xl mx-auto px-4 py-12">
    <?php while (have_posts()) : the_post(); ?>
        <article class="bg-white p-8 sm:p-12 rounded-2xl border border-gray-200 shadow-sm">
            <h1 class="text-3xl font-black text-emerald-950 mb-6 pb-4 border-b border-gray-100"><?php the_title(); ?></h1>
            <div class="prose max-w-none text-gray-800 leading-relaxed">
                <?php the_content(); ?>
            </div>
        </article>
    <?php endwhile; ?>
</main>
<?php
get_footer();
`;

  const readmeTxt = `=== Alsafwa Islamic Society Theme ===
Contributors: Alsafwa Islamic Society
Tags: charity, donation, islamic, rtl-language-support
Requires at least: 6.0
Tested up to: 6.7
Stable tag: 1.0.0
License: GPLv2 or later

قالب ووردبريس متكامل ورسمي لجمعية الصفوة الإسلامية المشهرة برقم 3794 لسنة 1991.

== طريقة التركيب على موقع ووردبريس (WordPress Installation) ==

الطريقة الأولى: من لوحة تحكم ووردبريس (الأسهل):
1. قم بتسجيل الدخول إلى لوحة تحكم موقعك (WP Admin: https://yourdomain.com/wp-admin).
2. من القائمة الجانبية اختر: المظهر (Appearance) -> قوالب (Themes).
3. اضغط على زر "أضف قالباً جديداً" (Add New Theme) في الأعلى.
4. اضغط على "رفع قالب" (Upload Theme).
5. اختر ملف الـ ZIP المحمل (alsafwa-islamic-society-theme.zip).
6. اضغط "التنصيب الآن" (Install Now).
7. بعد اكتمال التنصيب اضغط "تفعيل" (Activate).

الطريقة الثانية: عبر مدير الملفات cPanel أو FTP:
1. اذهب إلى مجلد القوالب: /wp-content/themes/
2. أنشئ مجلداً باسم alsafwa-theme
3. فك ضغط ملفات القالب داخل المجلد.
4. ادخل لوحة تحكم ووردبريس -> المظهر -> قوالب، وقم بتفعيل القالب.

== الشورت كود المتاح في القالب ==
[alsafwa_donate_box] : لإظهار صندوق التبرع المباشر في أي صفحة أو مقال.
`;

  return [
    { filename: 'style.css', description: 'ملف التعريف والتنسيقات الرئيسي للقالب (WordPress Theme Stylesheet)', content: styleCss },
    { filename: 'functions.php', description: 'ملف دوال القالب، تسجيل القوائم والمشاريع والشورت كود', content: functionsPhp },
    { filename: 'header.php', description: 'الهيدر العربي مع اللوجو وشريط الإشهار الرسمي والقائمة', content: headerPhp },
    { filename: 'footer.php', description: 'الفوتر مع بيانات الحسابات، العنوان، وأرقام التواصل والقيد', content: footerPhp },
    { filename: 'front-page.php', description: 'قالب الصفحة الرئيسية بكامل الأنشطة الـ 11 وبوابة التبرع', content: frontPagePhp },
    { filename: 'index.php', description: 'القالب الافتراضي لووردبريس لعرض المقالات', content: indexPhp },
    { filename: 'page.php', description: 'قالب الصفحات المنفصلة', content: pagePhp },
    { filename: 'readme.txt', description: 'دليل تعليمات التركيب والتفعيل خطوة بخطوة', content: readmeTxt },
  ];
}

export function generateWordPressDemoXml(
  content?: SiteContentData,
  activities?: ActivityProgram[]
): string {
  const info = content || (SOCIETY_INFO as unknown as SiteContentData);
  const acts = activities || ACTIVITIES_DATA;

  const itemsXml = acts.map((act, index) => `
    <item>
      <title>${act.title}</title>
      <link>${info.website}/projects/${act.id}/</link>
      <pubDate>Wed, 28 Oct 2026 12:00:00 +0000</pubDate>
      <dc:creator><![CDATA[admin]]></dc:creator>
      <guid isPermaLink="false">${info.website}/?p=${100 + index}</guid>
      <description></description>
      <content:encoded><![CDATA[${act.description}]]></content:encoded>
      <excerpt:encoded><![CDATA[${act.subtitle}]]></excerpt:encoded>
      <wp:post_id>${100 + index}</wp:post_id>
      <wp:post_date>2026-10-28 12:00:00</wp:post_date>
      <wp:post_type>charity_project</wp:post_type>
      <wp:status>publish</wp:status>
      <wp:postmeta>
        <wp:meta_key>alsafwa_target_amount</wp:meta_key>
        <wp:meta_value><![CDATA[${act.targetAmount}]]></wp:meta_value>
      </wp:postmeta>
      <wp:postmeta>
        <wp:meta_key>alsafwa_raised_amount</wp:meta_key>
        <wp:meta_value><![CDATA[${act.raisedAmount}]]></wp:meta_value>
      </wp:postmeta>
      <wp:postmeta>
        <wp:meta_key>alsafwa_unit_desc</wp:meta_key>
        <wp:meta_value><![CDATA[${act.unitDescription || ''}]]></wp:meta_value>
      </wp:postmeta>
    </item>
  `).join('\n');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/"
>
<channel>
  <title>${info.name}</title>
  <link>${info.website}</link>
  <description>${info.slogan} - مشهرة برقم ${info.registrationNumber} لسنة ${info.registrationYear}</description>
  <pubDate>Wed, 28 Oct 2026 12:00:00 +0000</pubDate>
  <language>ar</language>
  <wp:wxr_version>1.2</wp:wxr_version>
  <wp:base_site_url>${info.website}</wp:base_site_url>
  <wp:base_blog_url>${info.website}</wp:base_blog_url>

  <item>
    <title>الرئيسية</title>
    <link>${info.website}/</link>
    <pubDate>Wed, 28 Oct 2026 12:00:00 +0000</pubDate>
    <dc:creator><![CDATA[admin]]></dc:creator>
    <guid isPermaLink="false">${info.website}/?page_id=2</guid>
    <content:encoded><![CDATA[الصفحة الرئيسية لجمعية الصفوة الإسلامية المشهرة برقم ${info.registrationNumber}]]></content:encoded>
    <wp:post_id>2</wp:post_id>
    <wp:post_date>2026-10-28 12:00:00</wp:post_date>
    <wp:post_type>page</wp:post_type>
    <wp:status>publish</wp:status>
  </item>

  ${itemsXml}
</channel>
</rss>`;
}

export async function downloadWordPressThemeZip(
  content?: SiteContentData,
  activities?: ActivityProgram[]
): Promise<Blob> {
  const zip = new JSZip();
  const folder = zip.folder('alsafwa-islamic-society-theme');
  const files = generateWordPressThemeFiles(content, activities);

  files.forEach(f => {
    folder?.file(f.filename, f.content);
  });

  // Also include the demo content XML inside the zip for instant access
  const demoXml = generateWordPressDemoXml(content, activities);
  folder?.file('alsafwa-demo-content.xml', demoXml);

  return await zip.generateAsync({ type: 'blob' });
}

