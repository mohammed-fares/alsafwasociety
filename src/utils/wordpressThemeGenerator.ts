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

  // Social Links
  const fbPage = info.socialLinks?.facebookPage || 'https://www.facebook.com/profile.php?id=61595649184302';
  const fbGroup = info.socialLinks?.facebookGroup || 'https://www.facebook.com/groups/1409456344509964/';
  const ytChannel = info.socialLinks?.youtube || 'https://www.youtube.com/channel/UCAoybAVU121z5BCChObZMQw';
  const waUrl = info.whatsappUrl || 'https://wa.me/201115947455';
  // Payment Gateways
  const instaPayId = info.paymentGateways?.instaPay?.id || 'alsafwasociety@instapay';
  const vodafoneNum = info.paymentGateways?.vodafoneCash?.numbers?.[0] || info.phone || '01115947455';

  // Hearse Project data
  const hearse = acts.find((a) => a.id === 'hearse-project') || acts[1] || ACTIVITIES_DATA[1];

  const styleCss = `/*
Theme Name: جمعية الصفوة الإسلامية - Alsafwa Islamic Society
Theme URI: ${info.website}
Author: جمعية الصفوة الإسلامية
Author URI: ${info.website}
Description: قالب ووردبريس رسمي متكامل لجمعية الصفوة الإسلامية المشهرة برقم 3794 لسنة 1991 بالقاهرة. يشمل مشروع سيارة نقل ودفن الموتى (المادة 4)، أنشطة ومجالات التكافل الاجتماعي الـ 11 مساراً للخير، قسم التواصل وطلب المندوب، روابط السوشيال ميديا (فيسبوك، يوتيوب، واتساب)، بوابات التبرع المباشر (إنستاباي، المحفظة الإلكترونية، البنك الأهلي، بنك مصر)، وتخصيص كامل للمحتوى من لوحة تحكم ووردبريس.
Version: 2.0.0
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: alsafwa-theme
Tags: charity, islamic, donation, rtl-language-support, custom-menu, featured-images, responsive-layout, translation-ready, custom-colors
*/

/* Base Styles & RTL Reset */
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

.font-amiri {
  font-family: 'Amiri', serif;
}

/* Modal and Interactive Animations */
.modal-backdrop {
  backdrop-filter: blur(6px);
  background: rgba(10, 54, 34, 0.75);
}

.tab-active {
  background-color: #0F5132 !important;
  color: #ffffff !important;
  border-color: #0F5132 !important;
}

.copy-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #0F5132;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 9999px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  font-weight: 700;
  font-size: 14px;
  z-index: 99999;
  display: none;
  animation: fadeInOut 2.5s ease-in-out forwards;
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translate(-50%, 20px); }
  15% { opacity: 1; transform: translate(-50%, 0); }
  85% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, -20px); }
}
`;

  const adminCmsPhp = `<?php
/**
 * Alsafwa Islamic Society - Comprehensive WordPress Admin CMS & Content Management
 * Theme Name: جمعية الصفوة الإسلامية
 * Registration No: 3794 لسنة 1991
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Get Site Data with defaults
function alsafwa_get_site_data() {
    $defaults = array(
        'name' => '${info.name}',
        'registrationNumber' => '${info.registrationNumber}',
        'registrationYear' => '${info.registrationYear}',
        'administration' => '${info.administration}',
        'bylawApprovalDate' => '${info.bylawApprovalDate}',
        'phone' => '${info.phone}',
        'whatsappUrl' => '${waUrl}',
        'address' => '${info.address}',
        'email' => '${info.email}',
        'workHours' => '${info.workHours}',
        'logoUrl' => '${info.logoUrl}',
        'website' => '${info.website}',
        // Social Links
        'facebookPage' => '${fbPage}',
        'facebookGroup' => '${fbGroup}',
        'youtube' => '${ytChannel}',
        // Hearse Project
        'hearseTarget' => ${hearse.targetAmount},
        'hearseRaised' => ${hearse.raisedAmount},
        'hearseDonors' => ${hearse.donorCount},
        // Payment Accounts
        'instaPayId' => '${instaPayId}',
        'vodafoneCash' => '${vodafoneNum}',
        'bankNbe' => '10912384758001',
        'bankMisr' => '34800010009841',
        // Legal Bylaws Articles
        'article1' => 'اتفق الموقعون على هذا النظام على تأسيس جمعية باسم: جمعية الصفوة الإسلامية. ويكون مقر مركز إدارتها: 18 ش ترعة التوفيقية - عزبة النخل الغربية - المطرية. نطاق عملها الجغرافي: جمعية محلية على مستوى المحافظة.',
        'article4' => 'وتعمل الجمعية على تنفيذ الأنشطة الآتية: شراء سيارة وتجهيزها لنقل ودفن الموتى (مشروع إكرام الموتى ونقلهم مجاناً للأسر غير القادرة).'
    );

    $saved = get_option('alsafwa_site_data', array());
    return wp_parse_args($saved, $defaults);
}

// 2. Get Activities Data with defaults
function alsafwa_get_activities_data() {
    $saved = get_option('alsafwa_activities_data', null);
    if (!empty($saved) && is_array($saved)) {
        return $saved;
    }

    return array(
        ${acts.map((act) => `array(
            'id' => '${act.id}',
            'title' => '${act.title.replace(/'/g, "\\'")}',
            'subtitle' => '${act.subtitle.replace(/'/g, "\\'")}',
            'category' => '${act.category.replace(/'/g, "\\'")}',
            'targetAmount' => ${act.targetAmount},
            'raisedAmount' => ${act.raisedAmount},
            'donorCount' => ${act.donorCount || 50},
            'unitDescription' => '${(act.unitDescription || '').replace(/'/g, "\\'")}',
            'description' => '${act.description.replace(/'/g, "\\'")}',
            'featured' => ${act.featured ? 'true' : 'false'},
            'iconName' => '${act.iconName || 'Heart'}'
        )`).join(',\n        ')}
    );
}

// 3. Register Top-Level Admin Menu in WordPress Sidebar
add_action('admin_menu', 'alsafwa_register_cms_menu');
function alsafwa_register_cms_menu() {
    add_menu_page(
        'لوحة تحكم جمعية الصفوة (CMS)',
        'لوحة تحكم الصفوة (CMS)',
        'manage_options',
        'alsafwa-cms',
        'alsafwa_render_cms_dashboard',
        'dashicons-heart',
        2
    );
}

// 4. Enqueue Admin Assets & Media Uploader
add_action('admin_enqueue_scripts', 'alsafwa_enqueue_cms_assets');
function alsafwa_enqueue_cms_assets($hook) {
    if (strpos($hook, 'alsafwa-cms') !== false) {
        wp_enqueue_media();
        wp_enqueue_style('alsafwa-cairo', 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap', array(), null);
    }
}

// 5. Render CMS Dashboard Page
function alsafwa_render_cms_dashboard() {
    if (!current_user_can('manage_options')) {
        wp_die(__('عفواً، ليس لديك صلاحية للوصول إلى هذه الصفحة.', 'alsafwa-theme'));
    }

    $site_data = alsafwa_get_site_data();
    $activities = alsafwa_get_activities_data();
    $active_tab = isset($_GET['tab']) ? sanitize_text_field($_GET['tab']) : 'identity';
    $message = '';

    // Handle Form Submissions
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['alsafwa_cms_nonce'])) {
        if (!check_admin_referer('alsafwa_cms_save_action', 'alsafwa_cms_nonce')) {
            wp_die('فشل التحقق الأمني.');
        }

        $tab_action = isset($_POST['tab_action']) ? sanitize_text_field($_POST['tab_action']) : '';

        if ($tab_action === 'save_identity') {
            $site_data['name'] = sanitize_text_field($_POST['name']);
            $site_data['registrationNumber'] = sanitize_text_field($_POST['registrationNumber']);
            $site_data['registrationYear'] = sanitize_text_field($_POST['registrationYear']);
            $site_data['administration'] = sanitize_text_field($_POST['administration']);
            $site_data['bylawApprovalDate'] = sanitize_text_field($_POST['bylawApprovalDate']);
            $site_data['phone'] = sanitize_text_field($_POST['phone']);
            $site_data['address'] = sanitize_textarea_field($_POST['address']);
            $site_data['email'] = sanitize_email($_POST['email']);
            $site_data['workHours'] = sanitize_text_field($_POST['workHours']);
            $site_data['logoUrl'] = esc_url_raw($_POST['logoUrl']);
            $site_data['article1'] = sanitize_textarea_field($_POST['article1']);
            $site_data['article4'] = sanitize_textarea_field($_POST['article4']);
            
            // Sync with Theme Mods
            set_theme_mod('alsafwa_reg_number', $site_data['registrationNumber']);
            set_theme_mod('alsafwa_reg_year', $site_data['registrationYear']);
            set_theme_mod('alsafwa_admin_area', $site_data['administration']);
            set_theme_mod('alsafwa_bylaw_date', $site_data['bylawApprovalDate']);
            set_theme_mod('alsafwa_phone', $site_data['phone']);
            set_theme_mod('alsafwa_address', $site_data['address']);
            set_theme_mod('alsafwa_email', $site_data['email']);
            set_theme_mod('alsafwa_work_hours', $site_data['workHours']);

            update_option('alsafwa_site_data', $site_data);
            $message = 'تم حفظ وتحديث البيانات الأساسية والإشهار بنجاح!';
        } elseif ($tab_action === 'save_hearse') {
            $site_data['hearseTarget'] = absint($_POST['hearseTarget']);
            $site_data['hearseRaised'] = absint($_POST['hearseRaised']);
            $site_data['hearseDonors'] = absint($_POST['hearseDonors']);
            
            set_theme_mod('alsafwa_hearse_target', $site_data['hearseTarget']);
            set_theme_mod('alsafwa_hearse_raised', $site_data['hearseRaised']);
            set_theme_mod('alsafwa_hearse_donors', $site_data['hearseDonors']);

            update_option('alsafwa_site_data', $site_data);
            $message = 'تم تحديث بيانات مشروع سيارة إكرام ودفن الموتى (المادة 4) بنجاح!';
        } elseif ($tab_action === 'save_payments') {
            $site_data['instaPayId'] = sanitize_text_field($_POST['instaPayId']);
            $site_data['vodafoneCash'] = sanitize_text_field($_POST['vodafoneCash']);
            $site_data['bankNbe'] = sanitize_text_field($_POST['bankNbe']);
            $site_data['bankMisr'] = sanitize_text_field($_POST['bankMisr']);

            set_theme_mod('alsafwa_instapay_id', $site_data['instaPayId']);
            set_theme_mod('alsafwa_vodafone_cash', $site_data['vodafoneCash']);
            set_theme_mod('alsafwa_bank_nbe', $site_data['bankNbe']);
            set_theme_mod('alsafwa_bank_misr', $site_data['bankMisr']);

            update_option('alsafwa_site_data', $site_data);
            $message = 'تم تحديث حسابات التبرع وبوابات الدفع المعتمدة بنجاح!';
        } elseif ($tab_action === 'save_social') {
            $site_data['facebookPage'] = esc_url_raw($_POST['facebookPage']);
            $site_data['facebookGroup'] = esc_url_raw($_POST['facebookGroup']);
            $site_data['youtube'] = esc_url_raw($_POST['youtube']);
            $site_data['whatsappUrl'] = esc_url_raw($_POST['whatsappUrl']);

            set_theme_mod('alsafwa_facebook_page', $site_data['facebookPage']);
            set_theme_mod('alsafwa_facebook_group', $site_data['facebookGroup']);
            set_theme_mod('alsafwa_youtube', $site_data['youtube']);
            set_theme_mod('alsafwa_whatsapp_url', $site_data['whatsappUrl']);

            update_option('alsafwa_site_data', $site_data);
            $message = 'تم تحديث روابط وسائل التواصل الاجتماعي بنجاح!';
        } elseif ($tab_action === 'save_activities') {
            if (isset($_POST['acts']) && is_array($_POST['acts'])) {
                $new_acts = array();
                foreach ($_POST['acts'] as $idx => $act_post) {
                    $new_acts[] = array(
                        'id' => sanitize_text_field($act_post['id']),
                        'title' => sanitize_text_field($act_post['title']),
                        'subtitle' => sanitize_text_field($act_post['subtitle']),
                        'category' => sanitize_text_field($act_post['category']),
                        'targetAmount' => absint($act_post['targetAmount']),
                        'raisedAmount' => absint($act_post['raisedAmount']),
                        'donorCount' => absint($act_post['donorCount']),
                        'beneficiaryCount' => absint($act_post['beneficiaryCount']),
                        'unitDescription' => sanitize_text_field($act_post['unitDescription']),
                        'description' => sanitize_textarea_field($act_post['description']),
                        'featured' => !empty($act_post['featured']),
                        'icon' => sanitize_text_field($act_post['icon'])
                    );
                }
                $activities = $new_acts;
                update_option('alsafwa_activities_data', $activities);
                $message = 'تم تحديث أنشطة ومشاريع الجمعية الـ 11 بنجاح!';
            }
        } elseif ($tab_action === 'add_activity') {
            $new_item = array(
                'id' => 'custom-' . time(),
                'title' => sanitize_text_field($_POST['new_title']),
                'subtitle' => sanitize_text_field($_POST['new_subtitle']),
                'category' => sanitize_text_field($_POST['new_category']),
                'targetAmount' => absint($_POST['new_target']),
                'raisedAmount' => 0,
                'donorCount' => 0,
                'beneficiaryCount' => 0,
                'unitDescription' => sanitize_text_field($_POST['new_unit']),
                'description' => sanitize_textarea_field($_POST['new_desc']),
                'featured' => false,
                'icon' => 'Heart'
            );
            $activities[] = $new_item;
            update_option('alsafwa_activities_data', $activities);
            $message = 'تم إضافة النشاط الخيري الجديد بنجاح!';
        }
    }
    ?>
    <style>
        .alsafwa-cms-wrap { font-family: 'Cairo', sans-serif; direction: rtl; text-align: right; max-width: 1200px; margin: 20px 20px 20px 0; }
        .alsafwa-cms-header { background: linear-gradient(135deg, #0F5132 0%, #052316 100%); color: #fff; padding: 24px; border-radius: 16px; border: 2px solid #C5A059; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .alsafwa-cms-header h1 { color: #fff; margin: 0 0 8px 0; font-size: 24px; font-weight: 900; }
        .alsafwa-badge { background: #C5A059; color: #052316; padding: 4px 12px; border-radius: 9999px; font-weight: 800; font-size: 12px; display: inline-block; }
        .alsafwa-nav-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
        .alsafwa-nav-tabs a { padding: 10px 18px; border-radius: 10px; font-weight: 700; font-size: 13px; text-decoration: none; color: #475569; background: #f8fafc; border: 1px solid #cbd5e1; transition: all 0.2s; }
        .alsafwa-nav-tabs a:hover { background: #e2e8f0; color: #0F5132; }
        .alsafwa-nav-tabs a.active { background: #0F5132; color: #fff; border-color: #0F5132; }
        .alsafwa-card { background: #fff; border: 1px solid #cbd5e1; border-radius: 14px; padding: 24px; margin-bottom: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .alsafwa-card h2 { margin-top: 0; font-size: 18px; font-weight: 800; color: #0F5132; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 20px; }
        .alsafwa-form-row { margin-bottom: 18px; }
        .alsafwa-form-row label { display: block; font-weight: 700; margin-bottom: 6px; font-size: 13px; color: #1e293b; }
        .alsafwa-form-row input[type="text"], .alsafwa-form-row input[type="number"], .alsafwa-form-row input[type="email"], .alsafwa-form-row input[type="url"], .alsafwa-form-row textarea, .alsafwa-form-row select { width: 100%; max-width: 650px; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-family: inherit; font-size: 13px; box-sizing: border-box; }
        .alsafwa-form-row input:focus, .alsafwa-form-row textarea:focus { border-color: #0F5132; outline: none; box-shadow: 0 0 0 2px rgba(15, 81, 50, 0.2); }
        .alsafwa-btn-primary { background: #0F5132; color: #fff; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 800; font-size: 14px; cursor: pointer; transition: background 0.2s; }
        .alsafwa-btn-primary:hover { background: #0A3622; }
        .alsafwa-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        .alsafwa-table th { background: #f8fafc; padding: 10px; font-weight: 800; border: 1px solid #e2e8f0; font-size: 12px; }
        .alsafwa-table td { padding: 10px; border: 1px solid #e2e8f0; font-size: 12px; vertical-align: top; }
    </style>

    <div class="wrap alsafwa-cms-wrap">
        <!-- Header -->
        <div class="alsafwa-cms-header">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                <div>
                    <h1>لوحة تحكم وإدارة محتوى جمعية الصفوة الإسلامية</h1>
                    <p style="margin:0; opacity: 0.9; font-size: 13px;">
                        إشهار رقم <strong><?php echo esc_html($site_data['registrationNumber']); ?> لسنة <?php echo esc_html($site_data['registrationYear']); ?></strong> - إدارة المطرية بالقاهرة
                    </p>
                </div>
                <div>
                    <span class="alsafwa-badge">المدير العام · نظام CMS المتكامل</span>
                    <a href="<?php echo home_url('/'); ?>" target="_blank" style="margin-right: 10px; color: #fff; text-decoration: underline; font-weight: 700; font-size: 12px;">معاينة الموقع ↗</a>
                </div>
            </div>
        </div>

        <?php if (!empty($message)): ?>
            <div class="notice notice-success is-dismissible" style="padding: 12px 16px; margin-bottom: 20px; border-right: 4px solid #0F5132; font-weight: bold; font-size: 14px;">
                <?php echo esc_html($message); ?>
            </div>
        <?php endif; ?>

        <!-- Tabs Navigation -->
        <div class="alsafwa-nav-tabs">
            <a href="?page=alsafwa-cms&tab=identity" class="<?php echo $active_tab === 'identity' ? 'active' : ''; ?>">🏛️ البيانات الأساسية والإشهار</a>
            <a href="?page=alsafwa-cms&tab=hearse" class="<?php echo $active_tab === 'hearse' ? 'active' : ''; ?>">🚐 سيارة إكرام الموتى (المادة 4)</a>
            <a href="?page=alsafwa-cms&tab=activities" class="<?php echo $active_tab === 'activities' ? 'active' : ''; ?>">🤲 أنشطة التكافل الـ 11</a>
            <a href="?page=alsafwa-cms&tab=payments" class="<?php echo $active_tab === 'payments' ? 'active' : ''; ?>">💳 حسابات التبرع وبوابات الدفع</a>
            <a href="?page=alsafwa-cms&tab=social" class="<?php echo $active_tab === 'social' ? 'active' : ''; ?>">🌐 السوشيال ميديا والتواصل</a>
        </div>

        <!-- TAB 1: IDENTITY -->
        <?php if ($active_tab === 'identity'): ?>
            <div class="alsafwa-card">
                <h2>تعديل بيانات الجمعية والإشهار الرسمي</h2>
                <form method="post">
                    <?php wp_nonce_field('alsafwa_cms_save_action', 'alsafwa_cms_nonce'); ?>
                    <input type="hidden" name="tab_action" value="save_identity" />

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
                        <div class="alsafwa-form-row">
                            <label>اسم الجمعية الرسمي:</label>
                            <input type="text" name="name" value="<?php echo esc_attr($site_data['name']); ?>" required />
                        </div>
                        <div class="alsafwa-form-row">
                            <label>رقم القيد الرسمي:</label>
                            <input type="text" name="registrationNumber" value="<?php echo esc_attr($site_data['registrationNumber']); ?>" required />
                        </div>
                        <div class="alsafwa-form-row">
                            <label>سنة التأسيس والإشهار:</label>
                            <input type="text" name="registrationYear" value="<?php echo esc_attr($site_data['registrationYear']); ?>" required />
                        </div>
                        <div class="alsafwa-form-row">
                            <label>جهة القيد والإشراف:</label>
                            <input type="text" name="administration" value="<?php echo esc_attr($site_data['administration']); ?>" required />
                        </div>
                        <div class="alsafwa-form-row">
                            <label>تاريخ اعتماد اللائحة:</label>
                            <input type="text" name="bylawApprovalDate" value="<?php echo esc_attr($site_data['bylawApprovalDate']); ?>" required />
                        </div>
                        <div class="alsafwa-form-row">
                            <label>الهاتف الموحد والواتساب:</label>
                            <input type="text" name="phone" value="<?php echo esc_attr($site_data['phone']); ?>" required />
                        </div>
                        <div class="alsafwa-form-row">
                            <label>البريد الإلكتروني:</label>
                            <input type="email" name="email" value="<?php echo esc_attr($site_data['email']); ?>" />
                        </div>
                        <div class="alsafwa-form-row">
                            <label>مواعيد العمل:</label>
                            <input type="text" name="workHours" value="<?php echo esc_attr($site_data['workHours']); ?>" />
                        </div>
                    </div>

                    <div class="alsafwa-form-row">
                        <label>عنوان المقر الرئيسي:</label>
                        <textarea name="address" rows="2"><?php echo esc_textarea($site_data['address']); ?></textarea>
                    </div>

                    <div class="alsafwa-form-row">
                        <label>رابط الشعار (اللوجو):</label>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <input type="text" id="alsafwa-logo-input" name="logoUrl" value="<?php echo esc_attr($site_data['logoUrl']); ?>" style="flex:1;" />
                            <button type="button" class="button alsafwa-upload-btn" data-target="#alsafwa-logo-input">رفع من مكتبة الوسائط</button>
                        </div>
                    </div>

                    <div class="alsafwa-form-row">
                        <label>المادة (1) - المقر والنطاق الجغرافي:</label>
                        <textarea name="article1" rows="3"><?php echo esc_textarea($site_data['article1']); ?></textarea>
                    </div>

                    <div class="alsafwa-form-row">
                        <label>المادة (4) - المشروعات النوعية وسيارة إكرام الموتى:</label>
                        <textarea name="article4" rows="3"><?php echo esc_textarea($site_data['article4']); ?></textarea>
                    </div>

                    <button type="submit" class="alsafwa-btn-primary">حفظ وتحديث بيانات الإشهار</button>
                </form>
            </div>
        <?php endif; ?>

        <!-- TAB 2: HEARSE PROJECT -->
        <?php if ($active_tab === 'hearse'): ?>
            <div class="alsafwa-card">
                <h2>مشروع شراء وتجهيز سيارة نقل ودفن الموتى (المادة 4 من اللائحة)</h2>
                <form method="post">
                    <?php wp_nonce_field('alsafwa_cms_save_action', 'alsafwa_cms_nonce'); ?>
                    <input type="hidden" name="tab_action" value="save_hearse" />

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
                        <div class="alsafwa-form-row">
                            <label>المبلغ الإجمالي المستهدف (ج.م):</label>
                            <input type="number" name="hearseTarget" value="<?php echo esc_attr($site_data['hearseTarget']); ?>" required />
                        </div>
                        <div class="alsafwa-form-row">
                            <label>المبلغ المجموع حتى الآن (ج.م):</label>
                            <input type="number" name="hearseRaised" value="<?php echo esc_attr($site_data['hearseRaised']); ?>" required />
                        </div>
                        <div class="alsafwa-form-row">
                            <label>عدد المساهمين والمتبرعين:</label>
                            <input type="number" name="hearseDonors" value="<?php echo esc_attr($site_data['hearseDonors']); ?>" required />
                        </div>
                    </div>

                    <p style="font-size: 12px; color: #64748b; margin-top: 5px;">
                        * سيتم حساب النسبة المئوية للإنجاز وشريط التقدم في واجهة الموقع تلقائياً بناءً على المبلغ المجموع والمستهدف.
                    </p>

                    <button type="submit" class="alsafwa-btn-primary">حفظ إحصائيات مشروع السيارة</button>
                </form>
            </div>
        <?php endif; ?>

        <!-- TAB 3: ACTIVITIES -->
        <?php if ($active_tab === 'activities'): ?>
            <div class="alsafwa-card">
                <h2>إدارة وتعديل أنشطة ومجالات التكافل الاجتماعي (11 مساراً للخير)</h2>
                <form method="post">
                    <?php wp_nonce_field('alsafwa_cms_save_action', 'alsafwa_cms_nonce'); ?>
                    <input type="hidden" name="tab_action" value="save_activities" />

                    <table class="alsafwa-table">
                        <thead>
                            <tr>
                                <th style="width: 25%;">اسم النشاط والوصف الفرعي</th>
                                <th style="width: 15%;">الفئة</th>
                                <th style="width: 15%;">الهدف (ج.م)</th>
                                <th style="width: 15%;">المجموع (ج.م)</th>
                                <th style="width: 30%;">تفاصيل النشاط ومقدار السهم</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($activities as $idx => $act): ?>
                                <tr>
                                    <td>
                                        <input type="hidden" name="acts[<?php echo $idx; ?>][id]" value="<?php echo esc_attr($act['id']); ?>" />
                                        <input type="hidden" name="acts[<?php echo $idx; ?>][icon]" value="<?php echo esc_attr(isset($act['icon']) ? $act['icon'] : 'Heart'); ?>" />
                                        <input type="hidden" name="acts[<?php echo $idx; ?>][donorCount]" value="<?php echo esc_attr(isset($act['donorCount']) ? $act['donorCount'] : 50); ?>" />
                                        <input type="hidden" name="acts[<?php echo $idx; ?>][beneficiaryCount]" value="<?php echo esc_attr(isset($act['beneficiaryCount']) ? $act['beneficiaryCount'] : 100); ?>" />
                                        <input type="text" name="acts[<?php echo $idx; ?>][title]" value="<?php echo esc_attr($act['title']); ?>" style="font-weight: bold; margin-bottom: 4px;" />
                                        <input type="text" name="acts[<?php echo $idx; ?>][subtitle]" value="<?php echo esc_attr($act['subtitle']); ?>" style="font-size: 11px;" />
                                    </td>
                                    <td>
                                        <select name="acts[<?php echo $idx; ?>][category]">
                                            <option value="كفالات" <?php selected($act['category'], 'كفالات'); ?>>كفالات</option>
                                            <option value="صحة" <?php selected($act['category'], 'صحة'); ?>>صحة</option>
                                            <option value="تعليم وقرآن" <?php selected($act['category'], 'تعليم وقرآن'); ?>>تعليم وقرآن</option>
                                            <option value="مساعدات" <?php selected($act['category'], 'مساعدات'); ?>>مساعدات</option>
                                            <option value="عمارة ومشاريع" <?php selected($act['category'], 'عمارة ومشاريع'); ?>>عمارة ومشاريع</option>
                                            <option value="مواسم" <?php selected($act['category'], 'مواسم'); ?>>مواسم</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" name="acts[<?php echo $idx; ?>][targetAmount]" value="<?php echo esc_attr($act['targetAmount']); ?>" />
                                    </td>
                                    <td>
                                        <input type="number" name="acts[<?php echo $idx; ?>][raisedAmount]" value="<?php echo esc_attr($act['raisedAmount']); ?>" />
                                    </td>
                                    <td>
                                        <input type="text" name="acts[<?php echo $idx; ?>][unitDescription]" value="<?php echo esc_attr(isset($act['unitDescription']) ? $act['unitDescription'] : ''); ?>" placeholder="سهم 500 ج.م أو مساهمة مفتوحة" style="margin-bottom: 4px;" />
                                        <textarea name="acts[<?php echo $idx; ?>][description]" rows="2"><?php echo esc_textarea($act['description']); ?></textarea>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>

                    <div style="margin-top: 20px;">
                        <button type="submit" class="alsafwa-btn-primary">حفظ وتحديث جميع الأنشطة الـ 11</button>
                    </div>
                </form>

                <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;" />

                <h3>إضافة نشاط أو مشروع خيري جديد</h3>
                <form method="post" style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                    <?php wp_nonce_field('alsafwa_cms_save_action', 'alsafwa_cms_nonce'); ?>
                    <input type="hidden" name="tab_action" value="add_activity" />

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;">
                        <div>
                            <label>اسم النشاط:</label>
                            <input type="text" name="new_title" required placeholder="مثال: إفطار صائم وتوزيع تمور" />
                        </div>
                        <div>
                            <label>العنوان الفرعي:</label>
                            <input type="text" name="new_subtitle" required placeholder="مثال: وجبات ساخنة يومية" />
                        </div>
                        <div>
                            <label>الفئة:</label>
                            <select name="new_category">
                                <option value="مواسم">مواسم</option>
                                <option value="مساعدات">مساعدات</option>
                                <option value="كفالات">كفالات</option>
                                <option value="صحة">صحة</option>
                                <option value="تعليم وقرآن">تعليم وقرآن</option>
                                <option value="عمارة ومشاريع">عمارة ومشاريع</option>
                            </select>
                        </div>
                        <div>
                            <label>المبلغ المستهدف (ج.م):</label>
                            <input type="number" name="new_target" value="100000" />
                        </div>
                    </div>

                    <div style="margin-top: 12px;">
                        <label>مقدار السهم المقترح:</label>
                        <input type="text" name="new_unit" placeholder="مثال: سهم الوجبة 100 ج.م أو كرتونة 350 ج.م" />
                    </div>

                    <div style="margin-top: 12px;">
                        <label>وصف النشاط:</label>
                        <textarea name="new_desc" rows="2" placeholder="اكتب نبذة مختصرة عن هذا النشاط وأثره الخيري..."></textarea>
                    </div>

                    <div style="margin-top: 15px;">
                        <button type="submit" class="button button-primary">إضافة هذا النشاط للموقع</button>
                    </div>
                </form>
            </div>
        <?php endif; ?>

        <!-- TAB 4: PAYMENTS -->
        <?php if ($active_tab === 'payments'): ?>
            <div class="alsafwa-card">
                <h2>حسابات التبرع المعتمدة وبوابات الدفع الإلكتروني</h2>
                <form method="post">
                    <?php wp_nonce_field('alsafwa_cms_save_action', 'alsafwa_cms_nonce'); ?>
                    <input type="hidden" name="tab_action" value="save_payments" />

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
                        <div class="alsafwa-form-row">
                            <label>معرف إنستاباي (InstaPay ID):</label>
                            <input type="text" name="instaPayId" value="<?php echo esc_attr($site_data['instaPayId']); ?>" required />
                        </div>
                        <div class="alsafwa-form-row">
                            <label>رقم المحفظة الإلكترونية:</label>
                            <input type="text" name="vodafoneCash" value="<?php echo esc_attr($site_data['vodafoneCash']); ?>" required />
                        </div>
                        <div class="alsafwa-form-row">
                            <label>رقم حساب البنك الأهلي المصري (NBE):</label>
                            <input type="text" name="bankNbe" value="<?php echo esc_attr($site_data['bankNbe']); ?>" required />
                        </div>
                        <div class="alsafwa-form-row">
                            <label>رقم حساب بنك مصر (Banque Misr):</label>
                            <input type="text" name="bankMisr" value="<?php echo esc_attr($site_data['bankMisr']); ?>" required />
                        </div>
                    </div>

                    <button type="submit" class="alsafwa-btn-primary">حفظ حسابات وبوابات الدفع</button>
                </form>
            </div>
        <?php endif; ?>

        <!-- TAB 5: SOCIAL -->
        <?php if ($active_tab === 'social'): ?>
            <div class="alsafwa-card">
                <h2>روابط وسائل التواصل الاجتماعي وقنوات الاتصال</h2>
                <form method="post">
                    <?php wp_nonce_field('alsafwa_cms_save_action', 'alsafwa_cms_nonce'); ?>
                    <input type="hidden" name="tab_action" value="save_social" />

                    <div class="alsafwa-form-row">
                        <label>رابط صفحة الفيسبوك الرسمية:</label>
                        <input type="url" name="facebookPage" value="<?php echo esc_attr($site_data['facebookPage']); ?>" required />
                    </div>

                    <div class="alsafwa-form-row">
                        <label>رابط جروب الفيسبوك (جروب الخير):</label>
                        <input type="url" name="facebookGroup" value="<?php echo esc_attr($site_data['facebookGroup']); ?>" required />
                    </div>

                    <div class="alsafwa-form-row">
                        <label>رابط قناة اليوتيوب الرسمية:</label>
                        <input type="url" name="youtube" value="<?php echo esc_attr($site_data['youtube']); ?>" required />
                    </div>

                    <div class="alsafwa-form-row">
                        <label>رابط محادثة واتساب المباشرة:</label>
                        <input type="url" name="whatsappUrl" value="<?php echo esc_attr($site_data['whatsappUrl']); ?>" required />
                    </div>

                    <button type="submit" class="alsafwa-btn-primary">حفظ وتحديث روابط التواصل</button>
                </form>
            </div>
        <?php endif; ?>
    </div>

    <!-- Media Uploader Script -->
    <script>
    jQuery(document).ready(function($) {
        $('.alsafwa-upload-btn').click(function(e) {
            e.preventDefault();
            var targetSelector = $(this).data('target');
            var customUploader = wp.media({
                title: 'اختيار صورة لجمعية الصفوة الإسلامية',
                button: { text: 'استخدام هذه الصورة' },
                multiple: false
            });
            customUploader.on('select', function() {
                var attachment = customUploader.state().get('selection').first().toJSON();
                $(targetSelector).val(attachment.url);
            });
            customUploader.open();
        });
    });
    </script>
    <?php
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

// 1. Load Full WordPress Admin CMS Dashboard & Content Management Engine
if (file_exists(get_template_directory() . '/inc/admin-cms.php')) {
    require_once get_template_directory() . '/inc/admin-cms.php';
}

function alsafwa_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', array(
        'height'      => 120,
        'width'       => 350,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));

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
    wp_enqueue_style('alsafwa-style', get_stylesheet_uri(), array('alsafwa-fonts'), '2.0.0');
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

/**
 * Register WordPress Customizer Options for Direct Content Management
 * Appearance > Customize (المظهر -> تخصيص)
 */
function alsafwa_customize_register($wp_customize) {
    // 1. Panel: إدارة محتوى جمعية الصفوة
    $wp_customize->add_panel('alsafwa_panel', array(
        'title'       => 'إدارة محتوى جمعية الصفوة الإسلامية',
        'description' => 'تعديل بيانات الجمعية، أرقام القيد، روابط السوشيال ميديا، مشروع سيارة الموتى، وحسابات التبرع مباشرة من هنا.',
        'priority'    => 20,
    ));

    // Section A: بيانات الجمعية والإشهار الرسمي
    $wp_customize->add_section('alsafwa_identity_section', array(
        'title'    => 'بيانات الجمعية والإشهار الرسمي',
        'panel'    => 'alsafwa_panel',
        'priority' => 10,
    ));

    $wp_customize->add_setting('alsafwa_reg_number', array('default' => '${info.registrationNumber}', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('alsafwa_reg_number', array(
        'label'    => 'رقم القيد الرسمي المشهر',
        'section'  => 'alsafwa_identity_section',
        'type'     => 'text',
    ));

    $wp_customize->add_setting('alsafwa_reg_year', array('default' => '${info.registrationYear}', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('alsafwa_reg_year', array(
        'label'    => 'سنة التأسيس والإشهار',
        'section'  => 'alsafwa_identity_section',
        'type'     => 'text',
    ));

    $wp_customize->add_setting('alsafwa_admin_area', array('default' => '${info.administration}', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('alsafwa_admin_area', array(
        'label'    => 'جهة القيد والإشراف',
        'section'  => 'alsafwa_identity_section',
        'type'     => 'text',
    ));

    $wp_customize->add_setting('alsafwa_bylaw_date', array('default' => '${info.bylawApprovalDate}', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('alsafwa_bylaw_date', array(
        'label'    => 'تاريخ اعتماد اللائحة الرسمية',
        'section'  => 'alsafwa_identity_section',
        'type'     => 'text',
    ));

    $wp_customize->add_setting('alsafwa_phone', array('default' => '${info.phone}', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('alsafwa_phone', array(
        'label'    => 'الهاتف الموحد والواتساب',
        'section'  => 'alsafwa_identity_section',
        'type'     => 'text',
    ));

    $wp_customize->add_setting('alsafwa_address', array('default' => '${info.address}', 'sanitize_callback' => 'sanitize_textarea_field'));
    $wp_customize->add_control('alsafwa_address', array(
        'label'    => 'عنوان المقر الرئيسي',
        'section'  => 'alsafwa_identity_section',
        'type'     => 'textarea',
    ));

    $wp_customize->add_setting('alsafwa_work_hours', array('default' => '${info.workHours}', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('alsafwa_work_hours', array(
        'label'    => 'مواعيد العمل',
        'section'  => 'alsafwa_identity_section',
        'type'     => 'text',
    ));

    $wp_customize->add_setting('alsafwa_email', array('default' => '${info.email}', 'sanitize_callback' => 'sanitize_email'));
    $wp_customize->add_control('alsafwa_email', array(
        'label'    => 'البريد الإلكتروني',
        'section'  => 'alsafwa_identity_section',
        'type'     => 'email',
    ));

    // Section B: روابط السوشيال ميديا
    $wp_customize->add_section('alsafwa_social_section', array(
        'title'    => 'روابط وسائل التواصل الاجتماعي',
        'panel'    => 'alsafwa_panel',
        'priority' => 20,
    ));

    $wp_customize->add_setting('alsafwa_facebook_page', array('default' => '${fbPage}', 'sanitize_callback' => 'esc_url_raw'));
    $wp_customize->add_control('alsafwa_facebook_page', array(
        'label'    => 'رابط صفحة الفيسبوك الرسمية',
        'section'  => 'alsafwa_social_section',
        'type'     => 'url',
    ));

    $wp_customize->add_setting('alsafwa_facebook_group', array('default' => '${fbGroup}', 'sanitize_callback' => 'esc_url_raw'));
    $wp_customize->add_control('alsafwa_facebook_group', array(
        'label'    => 'رابط جروب الفيسبوك (جروب الخير)',
        'section'  => 'alsafwa_social_section',
        'type'     => 'url',
    ));

    $wp_customize->add_setting('alsafwa_youtube', array('default' => '${ytChannel}', 'sanitize_callback' => 'esc_url_raw'));
    $wp_customize->add_control('alsafwa_youtube', array(
        'label'    => 'رابط قناة اليوتيوب الرسمية',
        'section'  => 'alsafwa_social_section',
        'type'     => 'url',
    ));

    $wp_customize->add_setting('alsafwa_whatsapp_url', array('default' => '${waUrl}', 'sanitize_callback' => 'esc_url_raw'));
    $wp_customize->add_control('alsafwa_whatsapp_url', array(
        'label'    => 'رابط محادثة واتساب المباشرة',
        'section'  => 'alsafwa_social_section',
        'type'     => 'url',
    ));

    // Section C: مشروع سيارة نقل ودفن الموتى (المادة 4)
    $wp_customize->add_section('alsafwa_hearse_section', array(
        'title'    => 'مشروع سيارة إكرام ودفن الموتى (المادة 4)',
        'panel'    => 'alsafwa_panel',
        'priority' => 30,
    ));

    $wp_customize->add_setting('alsafwa_hearse_target', array('default' => '${hearse.targetAmount}', 'sanitize_callback' => 'absint'));
    $wp_customize->add_control('alsafwa_hearse_target', array(
        'label'    => 'المبلغ الإجمالي المستهدف (ج.م)',
        'section'  => 'alsafwa_hearse_section',
        'type'     => 'number',
    ));

    $wp_customize->add_setting('alsafwa_hearse_raised', array('default' => '${hearse.raisedAmount}', 'sanitize_callback' => 'absint'));
    $wp_customize->add_control('alsafwa_hearse_raised', array(
        'label'    => 'المبلغ الذي تم جمعه حتى الآن (ج.م)',
        'section'  => 'alsafwa_hearse_section',
        'type'     => 'number',
    ));

    $wp_customize->add_setting('alsafwa_hearse_donors', array('default' => '${hearse.donorCount}', 'sanitize_callback' => 'absint'));
    $wp_customize->add_control('alsafwa_hearse_donors', array(
        'label'    => 'عدد المساهمين',
        'section'  => 'alsafwa_hearse_section',
        'type'     => 'number',
    ));

    // Section D: حسابات الدفع والتبرع
    $wp_customize->add_section('alsafwa_payment_section', array(
        'title'    => 'حسابات التبرع وبوابات الدفع',
        'panel'    => 'alsafwa_panel',
        'priority' => 40,
    ));

    $wp_customize->add_setting('alsafwa_instapay_id', array('default' => '${instaPayId}', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('alsafwa_instapay_id', array(
        'label'    => 'عنوان إنستاباي InstaPay',
        'section'  => 'alsafwa_payment_section',
        'type'     => 'text',
    ));

    $wp_customize->add_setting('alsafwa_vodafone_cash', array('default' => '${vodafoneNum}', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('alsafwa_vodafone_cash', array(
        'label'    => 'رقم المحفظة الإلكترونية',
        'section'  => 'alsafwa_payment_section',
        'type'     => 'text',
    ));

    $wp_customize->add_setting('alsafwa_bank_nbe', array('default' => '10912384758001', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('alsafwa_bank_nbe', array(
        'label'    => 'رقم حساب البنك الأهلي المصري (NBE)',
        'section'  => 'alsafwa_payment_section',
        'type'     => 'text',
    ));

    $wp_customize->add_setting('alsafwa_bank_misr', array('default' => '34800010009841', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('alsafwa_bank_misr', array(
        'label'    => 'رقم حساب بنك مصر (Banque Misr)',
        'section'  => 'alsafwa_payment_section',
        'type'     => 'text',
    ));
}
add_action('customize_register', 'alsafwa_customize_register');

// Shortcode: [alsafwa_donate_box]
function alsafwa_donate_box_shortcode($atts) {
    $instapay = get_theme_mod('alsafwa_instapay_id', '${instaPayId}');
    $voda = get_theme_mod('alsafwa_vodafone_cash', '${vodafoneNum}');
    $phone = get_theme_mod('alsafwa_phone', '${info.phone}');
    $reg = get_theme_mod('alsafwa_reg_number', '${info.registrationNumber}');
    
    ob_start();
    ?>
    <div class="bg-white border-2 border-amber-400/50 rounded-2xl p-6 shadow-md my-6 text-right" dir="rtl">
        <div class="text-center pb-4 border-b border-gray-100">
            <span class="text-xs font-bold text-emerald-800 tracking-wider block mb-1">بوابة التبرع المباشر المعتمدة</span>
            <h3 class="text-xl font-black text-gray-900">جمعية الصفوة الإسلامية</h3>
            <p class="text-xs text-gray-500 mt-1">مشهرة برقم <?php echo esc_html($reg); ?> لسنة 1991 - القاهرة</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm my-4">
            <div class="p-3 bg-emerald-50/80 rounded-xl border border-emerald-100">
                <span class="font-bold text-emerald-800 block text-xs">إنستاباي InstaPay:</span>
                <span class="font-mono text-gray-900 text-sm font-bold block mt-1 select-all"><?php echo esc_html($instapay); ?></span>
            </div>
            <div class="p-3 bg-emerald-50/80 rounded-xl border border-emerald-100">
                <span class="font-bold text-emerald-800 block text-xs">المحفظة الإلكترونية:</span>
                <span class="font-mono text-gray-900 text-sm font-bold block mt-1 select-all"><?php echo esc_html($voda); ?></span>
            </div>
        </div>
        <div class="text-center pt-2">
            <a href="https://wa.me/20<?php echo ltrim($phone, '0'); ?>?text=<?php echo rawurlencode('السلام عليكم، أرغب في تأكيد تبرع لجمعية الصفوة الإسلامية'); ?>" target="_blank" class="w-full inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-sm">
                <span>تأكيد التبرع عبر واتساب الجمعية</span>
                <span class="font-mono text-xs text-emerald-200">(<?php echo esc_html($phone); ?>)</span>
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

<?php
$site_data = function_exists('alsafwa_get_site_data') ? alsafwa_get_site_data() : array();
$reg_no = !empty($site_data['registrationNumber']) ? $site_data['registrationNumber'] : get_theme_mod('alsafwa_reg_number', '${info.registrationNumber}');
$phone = !empty($site_data['phone']) ? $site_data['phone'] : get_theme_mod('alsafwa_phone', '${info.phone}');
$fb_page = !empty($site_data['facebookPage']) ? $site_data['facebookPage'] : get_theme_mod('alsafwa_facebook_page', '${fbPage}');
$fb_group = !empty($site_data['facebookGroup']) ? $site_data['facebookGroup'] : get_theme_mod('alsafwa_facebook_group', '${fbGroup}');
$yt_chan = !empty($site_data['youtube']) ? $site_data['youtube'] : get_theme_mod('alsafwa_youtube', '${ytChannel}');
$wa_link = !empty($site_data['whatsappUrl']) ? $site_data['whatsappUrl'] : get_theme_mod('alsafwa_whatsapp_url', '${waUrl}');
$logo_url = !empty($site_data['logoUrl']) ? $site_data['logoUrl'] : '${info.logoUrl}';
?>

<!-- Top Legal Notification & Social Channels Bar -->
<div class="bg-emerald-950 text-emerald-100 text-xs py-2.5 px-4 border-b border-emerald-900">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <!-- Official Society Credentials -->
        <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span class="font-bold text-white">جمعية الصفوة الإسلامية</span>
            <span class="text-emerald-500">·</span>
            <span class="bg-emerald-900/80 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-400/30">مشهرة برقم <?php echo esc_html($reg_no); ?> لسنة 1991</span>
            <span class="text-emerald-500 hidden sm:inline">·</span>
            <span class="text-stone-300 hidden sm:inline">إدارة المطرية - القاهرة</span>
            <span class="text-emerald-500 hidden md:inline">·</span>
            <span class="text-stone-300 hidden md:inline">منذ 1991 في خدمة المجتمع</span>
        </div>

        <!-- Social Media Links & Direct Contact -->
        <div class="flex items-center gap-3 sm:gap-4 flex-wrap">
            <!-- Social Icons Group -->
            <div class="flex items-center gap-1.5 bg-emerald-900/70 px-2 py-1 rounded-lg border border-emerald-800">
                <span class="text-[11px] text-emerald-300 font-semibold ml-1">تابعنا:</span>
                
                <!-- Facebook Page -->
                <a href="<?php echo esc_url($fb_page); ?>" target="_blank" rel="noopener noreferrer" class="text-white hover:text-amber-300 transition-colors p-1" title="صفحة الفيسبوك الرسمية" aria-label="Facebook Page">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>

                <!-- Facebook Group -->
                <a href="<?php echo esc_url($fb_group); ?>" target="_blank" rel="noopener noreferrer" class="text-white hover:text-amber-300 transition-colors p-1" title="جروب الخير على فيسبوك" aria-label="Facebook Group">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 3s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                </a>

                <!-- YouTube Channel -->
                <a href="<?php echo esc_url($yt_chan); ?>" target="_blank" rel="noopener noreferrer" class="text-white hover:text-red-400 transition-colors p-1" title="قناة اليوتيوب الرسمية" aria-label="YouTube Channel">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>

                <!-- WhatsApp Direct -->
                <a href="<?php echo esc_url($wa_link); ?>" target="_blank" rel="noopener noreferrer" class="text-white hover:text-green-400 transition-colors p-1" title="واتساب الجمعية المباشر" aria-label="WhatsApp">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                </a>
            </div>

            <!-- Direct Hotline Link -->
            <a href="tel:<?php echo esc_attr($phone); ?>" class="hover:text-white flex items-center gap-1.5 font-mono text-xs">
                <span>هاتف / واتساب:</span>
                <span class="font-bold text-amber-300"><?php echo esc_html($phone); ?></span>
            </a>
        </div>
    </div>
</div>

<!-- Main Header Navbar -->
<header class="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20 gap-4 sm:gap-8">
            <!-- Brand Zone: Logo + Name -->
            <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-3 shrink-0">
                <?php if (has_custom_logo()) : ?>
                    <?php the_custom_logo(); ?>
                <?php elseif (!empty($logo_url)) : ?>
                    <img src="<?php echo esc_url($logo_url); ?>" alt="جمعية الصفوة الإسلامية" class="h-14 w-14 object-contain rounded-full shadow-sm border border-emerald-100" />
                <?php else : ?>
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/logo.jpg" alt="جمعية الصفوة الإسلامية" class="h-14 w-14 object-contain rounded-full shadow-sm border border-emerald-100" onerror="this.src='https://api.iconify.design/lucide:shield-check.svg?color=%230F5132&width=48'" />
                <?php endif; ?>
                <div class="text-right">
                    <span class="block text-xl font-black text-emerald-950 leading-tight">جمعية الصفوة الإسلامية</span>
                    <span class="block text-xs font-semibold text-amber-700 tracking-wider">ALSAFWA ISLAMIC SOCIETY</span>
                </div>
            </a>

            <!-- Nav Links Zone -->
            <nav class="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-bold text-gray-700">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-emerald-800 transition-colors whitespace-nowrap">الرئيسية</a>
                <a href="#about" class="hover:text-emerald-800 transition-colors whitespace-nowrap">عن الجمعية والإشهار</a>
                <a href="#hearse-project" class="text-emerald-800 hover:text-emerald-950 font-black transition-colors whitespace-nowrap flex items-center gap-1">
                    <span>سيارة إكرام الموتى</span>
                    <span class="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">المادة 4</span>
                </a>
                <a href="#activities" class="hover:text-emerald-800 transition-colors whitespace-nowrap">الأنشطة الـ 11</a>
                <a href="#quick-donate" class="hover:text-emerald-800 transition-colors whitespace-nowrap">بوابة التبرع</a>
                <a href="#contact" class="hover:text-emerald-800 transition-colors whitespace-nowrap">تواصل معنا</a>
            </nav>

            <!-- Primary Action Zone -->
            <div class="flex items-center gap-2 sm:gap-3 shrink-0">
                <button type="button" class="js-open-donate bg-emerald-800 hover:bg-emerald-900 text-white font-black text-sm px-5 py-2.5 rounded-xl shadow-md transition-all hover:scale-[1.02] flex items-center gap-2">
                    <svg class="w-4 h-4 fill-current text-amber-300" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    <span>تبرع الآن</span>
                </button>
            </div>
        </div>
    </div>
</header>
`;

  const frontPagePhp = `<?php
/**
 * Template Name: الصفحة الرئيسية لجمعية الصفوة
 * Main Landing Page with Hearse Project Spotlight, 11 Activities, and Contact Form
 */
get_header();

$site_data = function_exists('alsafwa_get_site_data') ? alsafwa_get_site_data() : array();
$reg_no = !empty($site_data['registrationNumber']) ? $site_data['registrationNumber'] : get_theme_mod('alsafwa_reg_number', '${info.registrationNumber}');
$reg_yr = !empty($site_data['registrationYear']) ? $site_data['registrationYear'] : get_theme_mod('alsafwa_reg_year', '${info.registrationYear}');
$admin_area = !empty($site_data['administration']) ? $site_data['administration'] : get_theme_mod('alsafwa_admin_area', '${info.administration}');
$bylaw_date = !empty($site_data['bylawApprovalDate']) ? $site_data['bylawApprovalDate'] : get_theme_mod('alsafwa_bylaw_date', '${info.bylawApprovalDate}');
$phone = !empty($site_data['phone']) ? $site_data['phone'] : get_theme_mod('alsafwa_phone', '${info.phone}');
$address = !empty($site_data['address']) ? $site_data['address'] : get_theme_mod('alsafwa_address', '${info.address}');
$email = !empty($site_data['email']) ? $site_data['email'] : get_theme_mod('alsafwa_email', '${info.email}');
$hours = !empty($site_data['workHours']) ? $site_data['workHours'] : get_theme_mod('alsafwa_work_hours', '${info.workHours}');
$art1 = !empty($site_data['article1']) ? $site_data['article1'] : 'اتفق الموقعون على هذا النظام على تأسيس جمعية باسم: جمعية الصفوة الإسلامية. ويكون مقر مركز إدارتها: 18 ش ترعة التوفيقية - عزبة النخل الغربية - المطرية. نطاق عملها الجغرافي: جمعية محلية على مستوى المحافظة.';
$art4 = !empty($site_data['article4']) ? $site_data['article4'] : 'وتعمل الجمعية على تنفيذ الأنشطة الآتية: شراء سيارة وتجهيزها لنقل ودفن الموتى (مشروع إكرام الموتى ونقلهم مجاناً للأسر غير القادرة).';

// Social Links
$fb_page = !empty($site_data['facebookPage']) ? $site_data['facebookPage'] : get_theme_mod('alsafwa_facebook_page', '${fbPage}');
$fb_group = !empty($site_data['facebookGroup']) ? $site_data['facebookGroup'] : get_theme_mod('alsafwa_facebook_group', '${fbGroup}');
$yt_chan = !empty($site_data['youtube']) ? $site_data['youtube'] : get_theme_mod('alsafwa_youtube', '${ytChannel}');
$wa_link = !empty($site_data['whatsappUrl']) ? $site_data['whatsappUrl'] : get_theme_mod('alsafwa_whatsapp_url', '${waUrl}');

// Hearse Project data
$hearse_target = !empty($site_data['hearseTarget']) ? (int)$site_data['hearseTarget'] : get_theme_mod('alsafwa_hearse_target', ${hearse.targetAmount});
$hearse_raised = !empty($site_data['hearseRaised']) ? (int)$site_data['hearseRaised'] : get_theme_mod('alsafwa_hearse_raised', ${hearse.raisedAmount});
$hearse_donors = !empty($site_data['hearseDonors']) ? (int)$site_data['hearseDonors'] : get_theme_mod('alsafwa_hearse_donors', ${hearse.donorCount});
$hearse_percent = $hearse_target > 0 ? min(100, round(($hearse_raised / $hearse_target) * 100)) : 0;

// Payments (المحفظة الإلكترونية)
$instapay = !empty($site_data['instaPayId']) ? $site_data['instaPayId'] : get_theme_mod('alsafwa_instapay_id', '${instaPayId}');
$vodafone = !empty($site_data['vodafoneCash']) ? $site_data['vodafoneCash'] : get_theme_mod('alsafwa_vodafone_cash', '${vodafoneNum}');
$bank_nbe = !empty($site_data['bankNbe']) ? $site_data['bankNbe'] : get_theme_mod('alsafwa_bank_nbe', '10912384758001');
$bank_misr = !empty($site_data['bankMisr']) ? $site_data['bankMisr'] : get_theme_mod('alsafwa_bank_misr', '34800010009841');
?>

<!-- 1. HERO BANNER SECTION -->
<section class="relative bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 text-white overflow-hidden py-16 lg:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div class="lg:col-span-7 space-y-6 text-right">
                <div class="inline-flex items-center gap-2 bg-emerald-950/80 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs text-amber-300 font-bold">
                    <span>مشهرة برقم <?php echo esc_html($reg_no); ?> لسنة <?php echo esc_html($reg_yr); ?></span>
                    <span class="text-amber-500">·</span>
                    <span><?php echo esc_html($admin_area); ?> - القاهرة</span>
                </div>

                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
                    جمعية الصفوة الإسلامية
                    <span class="block text-amber-300 text-xl sm:text-2xl font-bold mt-2 font-serif">
                        معاً .. لبناء مجتمع أكثر تكافلاً
                    </span>
                </h1>

                <div class="p-4 bg-emerald-950/70 border border-emerald-700/60 rounded-2xl shadow-inner">
                    <p class="font-serif text-2xl sm:text-3xl text-amber-200 leading-relaxed text-center">
                        "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَى"
                    </p>
                    <span class="block text-center text-xs text-emerald-300 mt-1 font-sans">سورة المائدة - الآية 2</span>
                </div>

                <p class="text-sm sm:text-base text-gray-200 leading-relaxed max-w-2xl">
                    منذ عام 1991 نحمل أمانة العطاء في خدمة الأيتام، إعانة الأسر المتعففة، علاج المرضى، وعمارة بيوت الله وتوفير سيارة مجهزة لإكرام ودفن الموتى مجاناً لوجه الله تعالى.
                </p>

                <!-- Social media chips inside Hero -->
                <div class="flex items-center gap-3 pt-1 flex-wrap">
                    <span class="text-xs text-amber-300 font-bold">روابط الجمعية الرسمية:</span>
                    <a href="<?php echo esc_url($fb_page); ?>" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900/80 hover:bg-emerald-800 rounded-full text-xs text-white border border-emerald-700">
                        <span>صفحة الفيسبوك</span>
                    </a>
                    <a href="<?php echo esc_url($fb_group); ?>" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900/80 hover:bg-emerald-800 rounded-full text-xs text-white border border-emerald-700">
                        <span>جروب الخير</span>
                    </a>
                    <a href="<?php echo esc_url($yt_chan); ?>" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900/80 hover:bg-emerald-800 rounded-full text-xs text-white border border-emerald-700">
                        <span>قناة اليوتيوب</span>
                    </a>
                </div>

                <div class="flex flex-wrap items-center gap-3 pt-3">
                    <button type="button" class="js-open-donate bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black text-base px-8 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105">
                        تبرع الآن لأي مشروع
                    </button>
                    <a href="#hearse-project" class="bg-emerald-700/80 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl border border-amber-400/40 transition-colors">
                        مشروع سيارة الموتى (المادة 4)
                    </a>
                    <a href="#activities" class="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3.5 rounded-xl border border-white/20 transition-colors">
                        استعراض الـ 11 نشاطاً
                    </a>
                </div>
            </div>

            <!-- Hero Fast Donate Box Widget -->
            <div class="lg:col-span-5" id="quick-donate">
                <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-gray-800 border-2 border-amber-400/60">
                    <div class="text-center mb-6">
                        <span class="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">بوابة العطاء السريع المعتمدة</span>
                        <h2 class="text-2xl font-black text-gray-900">تبرع مباشر بنقرة واحدة</h2>
                        <p class="text-xs text-gray-500 mt-1">صدقتك تصل لمستحقيها فوراً وبإشراف رسمي موثق</p>
                    </div>

                    <!-- Fast Payment Channels -->
                    <div class="space-y-3 mb-6">
                        <div class="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                            <div>
                                <span class="text-xs font-bold text-emerald-900 block">إنستاباي (InstaPay):</span>
                                <span class="font-mono text-sm font-bold text-gray-900 select-all block mt-0.5"><?php echo esc_html($instapay); ?></span>
                            </div>
                            <button type="button" onclick="copyToClipboard('<?php echo esc_js($instapay); ?>', 'تم نسخ معرف إنستاباي بنجاح')" class="px-3 py-1 bg-white hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 transition-colors">
                                نسخ المعرف
                            </button>
                        </div>

                        <div class="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                            <div>
                                <span class="text-xs font-bold text-emerald-900 block">المحفظة الإلكترونية:</span>
                                <span class="font-mono text-sm font-bold text-gray-900 select-all block mt-0.5"><?php echo esc_html($vodafone); ?></span>
                            </div>
                            <button type="button" onclick="copyToClipboard('<?php echo esc_js($vodafone); ?>', 'تم نسخ رقم المحفظة الإلكترونية بنجاح')" class="px-3 py-1 bg-white hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 transition-colors">
                                نسخ الرقم
                            </button>
                        </div>
                    </div>

                    <!-- Quick Amount Selector -->
                    <div class="mb-6">
                        <span class="text-xs font-bold text-gray-700 block mb-2">اختر مبلغ التبرع السريع:</span>
                        <div class="grid grid-cols-4 gap-2">
                            <button type="button" class="js-open-donate py-2.5 bg-gray-50 hover:bg-emerald-800 hover:text-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800 transition-colors" data-amount="50">50 ج.م</button>
                            <button type="button" class="js-open-donate py-2.5 bg-gray-50 hover:bg-emerald-800 hover:text-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800 transition-colors" data-amount="100">100 ج.م</button>
                            <button type="button" class="js-open-donate py-2.5 bg-emerald-50 text-emerald-900 border-2 border-emerald-600 rounded-lg text-xs font-bold transition-colors" data-amount="250">250 ج.م</button>
                            <button type="button" class="js-open-donate py-2.5 bg-gray-50 hover:bg-emerald-800 hover:text-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800 transition-colors" data-amount="500">500 ج.م</button>
                        </div>
                    </div>

                    <a href="https://wa.me/20<?php echo ltrim($phone, '0'); ?>?text=<?php echo rawurlencode('السلام عليكم، أود التبرع لجمعية الصفوة الإسلامية المشهرة برقم 3794 لسنة 1991'); ?>" target="_blank" class="w-full inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md">
                        <span>تأكيد التبرع عبر واتساب الجمعية</span>
                    </a>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- 2. LEGAL & OFFICIAL BYLAWS SECTION -->
<section class="py-16 bg-white border-b border-gray-200" id="about">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
            <span class="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-2">الشفافية والمصداقية القانونية</span>
            <h2 class="text-3xl font-black text-gray-900">البيانات الأساسية ولائحة النظام الأساسي</h2>
            <p class="text-sm text-gray-600 mt-2">جمعية مسجلة وموثقة رسميًا لدى وزارة التضامن الاجتماعي ومديرية التضامن الاجتماعي بالقاهرة</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 text-center">
            <div class="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span class="block text-3xl font-black text-emerald-900 font-mono"><?php echo esc_html($reg_no); ?></span>
                <span class="text-xs text-gray-600 font-bold mt-1 block">رقم القيد الرسمي</span>
            </div>
            <div class="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span class="block text-3xl font-black text-emerald-900 font-mono"><?php echo esc_html($reg_yr); ?></span>
                <span class="text-xs text-gray-600 font-bold mt-1 block">سنة التأسيس والإشهار</span>
            </div>
            <div class="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span class="block text-2xl font-black text-emerald-900 mt-1"><?php echo esc_html($admin_area); ?></span>
                <span class="text-xs text-gray-600 font-bold mt-1 block">جهة القيد والإشراف</span>
            </div>
            <div class="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span class="block text-2xl font-black text-emerald-900 font-mono mt-1"><?php echo esc_html($bylaw_date); ?></span>
                <span class="text-xs text-gray-600 font-bold mt-1 block">تاريخ اعتماد اللائحة</span>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                <span class="text-xs font-bold text-amber-700 block mb-2">المادة (1) - المقر والنطاق الجغرافي</span>
                <p class="text-sm text-gray-700 leading-relaxed">
                    <?php echo nl2br(esc_html($art1)); ?>
                </p>
            </div>
            <div class="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                <span class="text-xs font-bold text-amber-700 block mb-2">المادة (4) - المشروعات النوعية المعتمدة</span>
                <p class="text-sm text-gray-700 leading-relaxed">
                    <?php echo nl2br(esc_html($art4)); ?>
                </p>
            </div>
        </div>
    </div>
</section>

<!-- 3. DEDICATED HEARSE PROJECT SPOTLIGHT SECTION (المادة 4 من اللائحة) -->
<section id="hearse-project" class="py-16 sm:py-24 bg-emerald-950 text-white relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Header -->
        <div class="max-w-3xl mb-12 text-right">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 border border-amber-400/40 rounded-full text-xs text-amber-300 font-bold mb-3">
                <span>المادة (4) من لائحة النظام الأساسي المعتمدة بتاريخ <?php echo esc_html($bylaw_date); ?></span>
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                مشروع شراء وتجهيز سيارة نقل ودفن الموتى
                <span class="block text-amber-300 text-lg sm:text-xl font-serif font-bold mt-2">
                    "إكرام الميت دفنه" · صدقة جارية لا ينقطع أجرها
                </span>
            </h2>
            <p class="text-stone-300 text-sm sm:text-base leading-relaxed mt-4">
                انطلاقاً من نص المادة الرابعة من لائحة جمعية الصفوة الإسلامية المشهرة برقم <?php echo esc_html($reg_no); ?> لسنة <?php echo esc_html($reg_yr); ?>، تطلق الجمعية هذا المشروع الإنساني لتوفير سيارة مجهزة بأحدث وسائل الحفظ والنقل المجاني على مدار 24 ساعة للأسر المتعففة وغير القادرة بمحافظة القاهرة والمطرية وعزبة النخل.
            </p>
        </div>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <!-- Left Column: Specs & Progress -->
            <div class="lg:col-span-7 bg-emerald-900/60 border border-emerald-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
                <div class="border-b border-emerald-800/80 pb-4">
                    <h3 class="text-xl font-bold text-white">مواصفات وتجهيزات السيارة المعتمدة</h3>
                    <p class="text-xs text-amber-300 font-semibold mt-1">خدمة مجانية 100% لوجه الله تعالى للأسر غير القادرة</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-200">
                    <div class="flex items-center gap-2 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/50">
                        <span class="text-amber-400 font-bold">✓</span>
                        <span>وحدة تبريد متطورة لحفظ ونقل الجثامين بأمان وكرامة</span>
                    </div>
                    <div class="flex items-center gap-2 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/50">
                        <span class="text-amber-400 font-bold">✓</span>
                        <span>نقالات هيدروليكية حديثة وسهلة التحميل</span>
                    </div>
                    <div class="flex items-center gap-2 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/50">
                        <span class="text-amber-400 font-bold">✓</span>
                        <span>توفير أكفان ومستلزمات التغسيل الشرعي مجاناً</span>
                    </div>
                    <div class="flex items-center gap-2 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/50">
                        <span class="text-amber-400 font-bold">✓</span>
                        <span>جاهزية كاملة على مدار 24 ساعة عبر خط ساخن</span>
                    </div>
                </div>

                <!-- Progress Bar -->
                <div class="pt-2 space-y-2">
                    <div class="flex justify-between items-center text-xs font-bold">
                        <span class="text-emerald-200">
                            تم جمع: <strong class="text-white font-mono"><?php echo number_format($hearse_raised); ?> ج.م</strong>
                        </span>
                        <span class="text-amber-300">
                            المستهدف: <strong class="font-mono"><?php echo number_format($hearse_target); ?> ج.م</strong> (<?php echo esc_html($hearse_percent); ?>%)
                        </span>
                    </div>
                    <div class="w-full bg-emerald-950 rounded-full h-3.5 overflow-hidden border border-emerald-800">
                        <div class="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-1000" style="width: <?php echo esc_attr($hearse_percent); ?>%"></div>
                    </div>
                    <p class="text-xs text-stone-300 font-mono text-left">
                        عدد المساهمين في السيارة حتى الآن: <?php echo number_format($hearse_donors); ?> مساهماً
                    </p>
                </div>
            </div>

            <!-- Right Column: Donation Shares -->
            <div class="lg:col-span-5 bg-white text-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-400/50">
                <div class="text-center mb-6">
                    <span class="text-xs font-bold text-emerald-800 tracking-wider block mb-1">صدقة جارية مستمرة لك أو لوالديك</span>
                    <h4 class="text-xl font-black text-gray-900">اختر سهم المساهمة في السيارة</h4>
                </div>

                <div class="grid grid-cols-2 gap-3 mb-6">
                    <button type="button" class="js-open-donate p-3 text-right rounded-xl border-2 border-emerald-100 hover:border-emerald-600 hover:bg-emerald-50 transition-all" data-project="مشروع سيارة إكرام الموتى" data-amount="250">
                        <span class="block text-xs font-bold text-emerald-900">سهم إكرام الموتى</span>
                        <span class="block font-mono text-base font-black text-amber-700">250 ج.م</span>
                        <span class="block text-[11px] text-gray-500 mt-1">مساهمة في الصيانة والمستلزمات</span>
                    </button>

                    <button type="button" class="js-open-donate p-3 text-right rounded-xl border-2 border-emerald-600 bg-emerald-50/50 hover:bg-emerald-100 transition-all" data-project="مشروع سيارة إكرام الموتى" data-amount="500">
                        <span class="block text-xs font-bold text-emerald-900">سهم الصدقة الجارية</span>
                        <span class="block font-mono text-base font-black text-emerald-800">500 ج.م</span>
                        <span class="block text-[11px] text-gray-500 mt-1">سهم معتمد في قيمة السيارة</span>
                    </button>

                    <button type="button" class="js-open-donate p-3 text-right rounded-xl border-2 border-emerald-100 hover:border-emerald-600 hover:bg-emerald-50 transition-all" data-project="مشروع سيارة إكرام الموتى" data-amount="1000">
                        <span class="block text-xs font-bold text-emerald-900">سهم التجهيز الطبي</span>
                        <span class="block font-mono text-base font-black text-amber-700">1,000 ج.م</span>
                        <span class="block text-[11px] text-gray-500 mt-1">تجهيزات التبريد والسرير</span>
                    </button>

                    <button type="button" class="js-open-donate p-3 text-right rounded-xl border-2 border-emerald-100 hover:border-emerald-600 hover:bg-emerald-50 transition-all" data-project="مشروع سيارة إكرام الموتى" data-amount="5000">
                        <span class="block text-xs font-bold text-emerald-900">سهم الوفاء عن المتوفى</span>
                        <span class="block font-mono text-base font-black text-amber-700">5,000 ج.م</span>
                        <span class="block text-[11px] text-gray-500 mt-1">صدقة جارية كبرى عن متوفى</span>
                    </button>
                </div>

                <a href="https://wa.me/20<?php echo ltrim($phone, '0'); ?>?text=<?php echo rawurlencode('السلام عليكم، أرغب في المساهمة في مشروع شراء سيارة نقل ودفن الموتى (المادة 4) لجمعية الصفوة الإسلامية'); ?>" target="_blank" class="w-full inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md">
                    <span>تبرع لمشروع السيارة عبر واتساب</span>
                </a>
            </div>

        </div>
    </div>
</section>

<!-- 4. ALL 11 SOLIDARITY ACTIVITIES SECTION (11 مساراً للخير) -->
<section class="py-16 sm:py-24 bg-[#FAF8F5]" id="activities">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-10">
            <span class="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-2">عطاء مستمر في 11 مجالاً</span>
            <h2 class="text-3xl sm:text-4xl font-black text-gray-900">أنشطة ومجالات التكافل الاجتماعي · 11 مساراً للخير</h2>
            <p class="text-sm text-gray-600 mt-3">اختر النشاط الذي تود التبرع له لدعم المستفيدين والأسر الأولى بالرعاية</p>
        </div>

        <!-- Category Filter Tabs -->
        <div class="flex items-center justify-center gap-2 flex-wrap mb-10" id="activity-filters">
            <button type="button" onclick="filterActivities('all')" class="activity-filter-btn tab-active px-4 py-2 rounded-xl text-xs font-bold transition-all border border-gray-200">الكل (11)</button>
            <button type="button" onclick="filterActivities('كفالات')" class="activity-filter-btn px-4 py-2 bg-white text-gray-700 rounded-xl text-xs font-bold transition-all border border-gray-200 hover:border-emerald-600">كفالات</button>
            <button type="button" onclick="filterActivities('صحة')" class="activity-filter-btn px-4 py-2 bg-white text-gray-700 rounded-xl text-xs font-bold transition-all border border-gray-200 hover:border-emerald-600">صحة</button>
            <button type="button" onclick="filterActivities('تعليم وقرآن')" class="activity-filter-btn px-4 py-2 bg-white text-gray-700 rounded-xl text-xs font-bold transition-all border border-gray-200 hover:border-emerald-600">تعليم وقرآن</button>
            <button type="button" onclick="filterActivities('مساعدات')" class="activity-filter-btn px-4 py-2 bg-white text-gray-700 rounded-xl text-xs font-bold transition-all border border-gray-200 hover:border-emerald-600">مساعدات</button>
            <button type="button" onclick="filterActivities('عمارة ومشاريع')" class="activity-filter-btn px-4 py-2 bg-white text-gray-700 rounded-xl text-xs font-bold transition-all border border-gray-200 hover:border-emerald-600">عمارة ومشاريع</button>
            <button type="button" onclick="filterActivities('مواسم')" class="activity-filter-btn px-4 py-2 bg-white text-gray-700 rounded-xl text-xs font-bold transition-all border border-gray-200 hover:border-emerald-600">مواسم</button>
        </div>

        <!-- 11 Activities Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="activities-container">
            <?php
            $activities_list = function_exists('alsafwa_get_activities_data') ? alsafwa_get_activities_data() : array();
            foreach ($activities_list as $act):
                $target = isset($act['targetAmount']) ? (float)$act['targetAmount'] : 0;
                $raised = isset($act['raisedAmount']) ? (float)$act['raisedAmount'] : 0;
                $percent = $target > 0 ? min(100, round(($raised / $target) * 100)) : 0;
                $category = isset($act['category']) ? $act['category'] : 'كفالات';
                $title = isset($act['title']) ? $act['title'] : '';
                $subtitle = isset($act['subtitle']) ? $act['subtitle'] : '';
                $desc = isset($act['description']) ? $act['description'] : '';
                $unit = !empty($act['unitDescription']) ? $act['unitDescription'] : 'مساهمة عامة مفتوحة بأي مبلغ';
            ?>
            <div class="activity-card bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between" data-category="<?php echo esc_attr($category); ?>">
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100"><?php echo esc_html($category); ?></span>
                        <span class="text-xs font-bold text-amber-700 font-mono"><?php echo $percent; ?>% مكتمل</span>
                    </div>
                    
                    <h3 class="text-lg font-black text-gray-900 mb-1"><?php echo esc_html($title); ?></h3>
                    <p class="text-xs text-amber-800 font-semibold mb-3"><?php echo esc_html($subtitle); ?></p>
                    <p class="text-xs text-gray-600 leading-relaxed mb-4"><?php echo esc_html($desc); ?></p>

                    <!-- Mini Progress -->
                    <div class="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
                        <div class="bg-emerald-600 h-full rounded-full" style="width: <?php echo $percent; ?>%"></div>
                    </div>
                    <div class="flex justify-between items-center text-[11px] text-gray-500 mb-4 font-mono">
                        <span>تم جمع: <?php echo number_format($raised, 0, '.', ','); ?> ج.م</span>
                        <span>الهدف: <?php echo number_format($target, 0, '.', ','); ?> ج.م</span>
                    </div>
                </div>

                <div class="pt-4 border-t border-gray-100">
                    <p class="text-xs text-emerald-900 mb-3 font-bold"><?php echo esc_html($unit); ?></p>
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" class="js-open-donate w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-2.5 rounded-xl transition-colors" data-project="<?php echo esc_attr($title); ?>">
                            تبرع للمشروع
                        </button>
                        <a href="https://wa.me/20<?php echo esc_attr(ltrim(preg_replace('/[^0-9]/', '', $phone), '0')); ?>?text=<?php echo urlencode('السلام عليكم، أرغب في التبرع لمشروع: ' . $title); ?>" target="_blank" class="w-full text-center bg-gray-50 hover:bg-emerald-50 text-emerald-900 border border-gray-200 font-bold text-xs py-2.5 rounded-xl transition-colors">
                            واتساب
                        </a>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- 5. CONTACT & INQUIRY SECTION (نسعد دائماً بالتواصل معكم) -->
<section id="contact" class="py-16 sm:py-24 bg-white border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
            <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-widest uppercase mb-2">
                <span>نسعد دائماً بالتواصل معكم</span>
                <span>·</span>
                <span>في خدمتكم يومياً</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                تواصل مع جمعية الصفوة الإسلامية
            </h2>
            <p class="text-sm sm:text-base text-gray-600 leading-relaxed mt-3">
                لزيارة مقر الجمعية أو طلب مندوب تحصيل التبرعات أو الاستفسار عن كفالة الأيتام والمشاريع الخيرية
            </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Contact Cards & Info -->
            <div class="lg:col-span-5 space-y-4">
                <div class="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-5">
                    <h3 class="text-lg font-black text-gray-900 pb-3 border-b border-gray-200">
                        بيانات المقر الرسمي والقيد
                    </h3>

                    <div>
                        <span class="block text-xs font-bold text-gray-800">عنوان المقر الرئيسي:</span>
                        <p class="text-xs text-gray-600 leading-relaxed mt-1"><?php echo esc_html($address); ?></p>
                        <span class="inline-block mt-1 text-[11px] text-emerald-700 font-semibold">(المادة 1 من لائحة النظام الأساسي)</span>
                    </div>

                    <div>
                        <span class="block text-xs font-bold text-gray-800">الهاتف والواتساب الموحد:</span>
                        <a href="tel:<?php echo esc_attr($phone); ?>" class="font-mono text-sm font-bold text-emerald-800 hover:underline block mt-1"><?php echo esc_html($phone); ?></a>
                    </div>

                    <div>
                        <span class="block text-xs font-bold text-gray-800">مواعيد العمل واستقبال الزوار:</span>
                        <p class="text-xs text-gray-600 mt-1"><?php echo esc_html($hours); ?></p>
                    </div>

                    <div>
                        <span class="block text-xs font-bold text-gray-800">البريد الإلكتروني:</span>
                        <span class="font-mono text-xs text-gray-600 mt-1 block"><?php echo esc_html($email); ?></span>
                    </div>

                    <!-- Social Channels inside Contact -->
                    <div class="pt-4 border-t border-gray-200">
                        <span class="block text-xs font-bold text-gray-800 mb-3">قنوات التواصل الاجتماعي المعتمدة:</span>
                        <div class="grid grid-cols-2 gap-2 text-xs">
                            <a href="<?php echo esc_url($fb_page); ?>" target="_blank" class="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-emerald-600 font-semibold text-emerald-950 flex items-center gap-2">
                                <span class="text-blue-600 font-bold">f</span>
                                <span>صفحة الفيسبوك</span>
                            </a>
                            <a href="<?php echo esc_url($fb_group); ?>" target="_blank" class="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-emerald-600 font-semibold text-emerald-950 flex items-center gap-2">
                                <span class="text-blue-500 font-bold">👥</span>
                                <span>جروب الخير</span>
                            </a>
                            <a href="<?php echo esc_url($yt_chan); ?>" target="_blank" class="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-emerald-600 font-semibold text-emerald-950 flex items-center gap-2">
                                <span class="text-red-600 font-bold">▶</span>
                                <span>قناة اليوتيوب</span>
                            </a>
                            <a href="<?php echo esc_url($wa_link); ?>" target="_blank" class="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-emerald-600 font-semibold text-emerald-950 flex items-center gap-2">
                                <span class="text-green-600 font-bold">💬</span>
                                <span>محادثة واتساب</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Interactive Inquiry & Representative Form -->
            <div class="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-gray-200">
                <h3 class="text-lg font-black text-gray-900 mb-2">إرسال استفسار أو طلب مندوب تحصيل</h3>
                <p class="text-xs text-gray-500 mb-6">سيتم تجهيز رسالتك وإرسالها مباشرة عبر تطبيق واتساب إلى إدارة الجمعية</p>

                <form onsubmit="handleContactFormSubmit(event)" class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">الاسم الكريم:</label>
                            <input type="text" id="contact_name" required placeholder="فاعل خير" class="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600" />
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">رقم الهاتف:</label>
                            <input type="tel" id="contact_phone" required placeholder="01xxxxxxxxx" class="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-emerald-600" />
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">موضوع الرسالة:</label>
                        <select id="contact_subject" class="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600">
                            <option value="استفسار عن التبرعات">استفسار عن التبرعات وطرق الدفع</option>
                            <option value="طلب مندوب لتحصيل التبرعات">طلب مندوب لتحصيل التبرعات من المنزل</option>
                            <option value="مشروع سيارة الموتى (المادة 4)">المساهمة في مشروع سيارة الموتى (المادة 4)</option>
                            <option value="كفالة أيتام">كفالة أيتام ورعاية شهرية</option>
                            <option value="مساعدة حالة إنسانية عاجلة">تقديم طلب مساعدة لحالة إنسانية متعففة</option>
                            <option value="أخرى">استفسار عام آخر</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">تفاصيل الرسالة أو العنوان للمندوب:</label>
                        <textarea id="contact_message" rows="4" placeholder="اكتب تفاصيل استفسارك أو العنوان بالتفصيل إذا كنت تطلب مندوباً..." class="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"></textarea>
                    </div>

                    <button type="submit" class="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
                        <span>إرسال الرسالة عبر واتساب الجمعية</span>
                        <span class="font-mono text-xs text-emerald-200">(<?php echo esc_html($phone); ?>)</span>
                    </button>
                </form>
            </div>

        </div>
    </div>
</section>

<?php
get_footer();
`;

  const footerPhp = `<?php
/**
 * Alsafwa Islamic Society Footer Template
 */
$reg_no = get_theme_mod('alsafwa_reg_number', '${info.registrationNumber}');
$phone = get_theme_mod('alsafwa_phone', '${info.phone}');
$address = get_theme_mod('alsafwa_address', '${info.address}');
$email = get_theme_mod('alsafwa_email', '${info.email}');
$bylaw_date = get_theme_mod('alsafwa_bylaw_date', '${info.bylawApprovalDate}');

$fb_page = get_theme_mod('alsafwa_facebook_page', '${fbPage}');
$fb_group = get_theme_mod('alsafwa_facebook_group', '${fbGroup}');
$yt_chan = get_theme_mod('alsafwa_youtube', '${ytChannel}');
$wa_link = get_theme_mod('alsafwa_whatsapp_url', '${waUrl}');

$instapay = get_theme_mod('alsafwa_instapay_id', '${instaPayId}');
$vodafone = get_theme_mod('alsafwa_vodafone_cash', '${vodafoneNum}');
$bank_nbe = get_theme_mod('alsafwa_bank_nbe', '10912384758001');
$bank_misr = get_theme_mod('alsafwa_bank_misr', '34800010009841');
?>

<!-- Site Footer -->
<footer class="bg-emerald-950 text-gray-200 pt-16 pb-8 border-t-4 border-amber-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            <!-- Col 1: About Society -->
            <div>
                <div class="flex items-center gap-3 mb-4">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/logo.jpg" alt="جمعية الصفوة الإسلامية" class="h-12 w-12 object-contain bg-white rounded-full p-1" onerror="this.src='https://api.iconify.design/lucide:shield-check.svg?color=%230F5132&width=48'" />
                    <div>
                        <h4 class="text-lg font-bold text-white">جمعية الصفوة الإسلامية</h4>
                        <p class="text-xs text-amber-400">معاً .. لبناء مجتمع أكثر تكافلاً</p>
                    </div>
                </div>
                <p class="text-xs text-gray-300 leading-relaxed mb-4">
                    جمعية أهلية مصرية مشهرة برقم <?php echo esc_html($reg_no); ?> لسنة 1991 بإدارة المطرية - القاهرة. تعمل منذ أكثر من 33 عاماً في رعاية الأيتام، الخدمات الصحية، تحفيظ القرآن، ومساعدة الأسر المتعففة.
                </p>
                <div class="text-xs text-emerald-300 font-mono mb-4">
                    تاريخ اعتماد اللائحة: <?php echo esc_html($bylaw_date); ?>
                </div>

                <!-- Footer Social Links -->
                <div class="flex items-center gap-2">
                    <a href="<?php echo esc_url($fb_page); ?>" target="_blank" class="w-8 h-8 rounded-lg bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-white" title="صفحة الفيسبوك">f</a>
                    <a href="<?php echo esc_url($fb_group); ?>" target="_blank" class="w-8 h-8 rounded-lg bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-white" title="جروب الخير">👥</a>
                    <a href="<?php echo esc_url($yt_chan); ?>" target="_blank" class="w-8 h-8 rounded-lg bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-white" title="يوتيوب">▶</a>
                    <a href="<?php echo esc_url($wa_link); ?>" target="_blank" class="w-8 h-8 rounded-lg bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-white" title="واتساب">💬</a>
                </div>
            </div>

            <!-- Col 2: Key Activities Links -->
            <div>
                <h5 class="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">أنشطة الجمعية الرئيسية</h5>
                <ul class="space-y-2.5 text-xs text-gray-300">
                    <li><a href="#hearse-project" class="hover:text-amber-300 transition-colors font-bold text-white">· سيارة نقل ودفن الموتى (المادة 4)</a></li>
                    <li><a href="#activities" class="hover:text-white transition-colors">· كفالة الأيتام والرعاية الشاملة</a></li>
                    <li><a href="#activities" class="hover:text-white transition-colors">· بناء وعمارة المساجد</a></li>
                    <li><a href="#activities" class="hover:text-white transition-colors">· القوافل الطبية والعلاج المجاني</a></li>
                    <li><a href="#activities" class="hover:text-white transition-colors">· حلقات تحفيظ القرآن الكريم</a></li>
                    <li><a href="#activities" class="hover:text-white transition-colors">· إطعام ومساعدات الأسر المتعففة</a></li>
                    <li><a href="#activities" class="hover:text-white transition-colors">· رعاية الطفولة والأمومة وتجهيز العرائس</a></li>
                </ul>
            </div>

            <!-- Col 3: Legal Bank Accounts -->
            <div>
                <h5 class="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">حسابات التبرع المعتمدة</h5>
                <div class="space-y-2.5 text-xs">
                    <div class="bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-800 flex items-center justify-between">
                        <div>
                            <span class="text-gray-400 block text-[11px]">إنستاباي (InstaPay):</span>
                            <span class="font-mono text-white font-bold select-all"><?php echo esc_html($instapay); ?></span>
                        </div>
                        <button type="button" onclick="copyToClipboard('<?php echo esc_js($instapay); ?>', 'تم نسخ معرف إنستاباي')" class="text-amber-300 hover:text-white text-[11px] font-bold">نسخ</button>
                    </div>

                    <div class="bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-800 flex items-center justify-between">
                        <div>
                            <span class="text-gray-400 block text-[11px]">المحفظة الإلكترونية:</span>
                            <span class="font-mono text-white font-bold select-all"><?php echo esc_html($vodafone); ?></span>
                        </div>
                        <button type="button" onclick="copyToClipboard('<?php echo esc_js($vodafone); ?>', 'تم نسخ رقم المحفظة الإلكترونية')" class="text-amber-300 hover:text-white text-[11px] font-bold">نسخ</button>
                    </div>

                    <div class="bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-800 flex items-center justify-between">
                        <div>
                            <span class="text-gray-400 block text-[11px]">البنك الأهلي المصري (NBE):</span>
                            <span class="font-mono text-amber-300 font-bold select-all"><?php echo esc_html($bank_nbe); ?></span>
                        </div>
                        <button type="button" onclick="copyToClipboard('<?php echo esc_js($bank_nbe); ?>', 'تم نسخ حساب البنك الأهلي')" class="text-amber-300 hover:text-white text-[11px] font-bold">نسخ</button>
                    </div>

                    <div class="bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-800 flex items-center justify-between">
                        <div>
                            <span class="text-gray-400 block text-[11px]">بنك مصر (Banque Misr):</span>
                            <span class="font-mono text-amber-300 font-bold select-all"><?php echo esc_html($bank_misr); ?></span>
                        </div>
                        <button type="button" onclick="copyToClipboard('<?php echo esc_js($bank_misr); ?>', 'تم نسخ حساب بنك مصر')" class="text-amber-300 hover:text-white text-[11px] font-bold">نسخ</button>
                    </div>
                </div>
            </div>

            <!-- Col 4: Contact & Office -->
            <div>
                <h5 class="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">المقر والتواصل</h5>
                <p class="text-xs text-gray-300 leading-relaxed mb-3">
                    <?php echo esc_html($address); ?>
                </p>
                <div class="space-y-2 text-xs">
                    <p class="text-gray-300">
                        <span class="text-amber-400 font-semibold">الهاتف الموحد:</span>
                        <a href="tel:<?php echo esc_attr($phone); ?>" class="font-mono text-white mr-1 hover:underline"><?php echo esc_html($phone); ?></a>
                    </p>
                    <p class="text-gray-300">
                        <span class="text-amber-400 font-semibold">واتساب التبرعات:</span>
                        <a href="<?php echo esc_url($wa_link); ?>" target="_blank" class="font-mono text-white mr-1 hover:underline"><?php echo esc_html($phone); ?></a>
                    </p>
                    <p class="text-gray-300">
                        <span class="text-amber-400 font-semibold">البريد:</span>
                        <span class="font-mono text-white mr-1"><?php echo esc_html($email); ?></span>
                    </p>
                </div>
            </div>

        </div>

        <div class="pt-8 border-t border-emerald-900/80 text-center text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© <?php echo date('Y'); ?> جمعية الصفوة الإسلامية - قيد <?php echo esc_html($reg_no); ?> لسنة 1991. جميع الحقوق محفوظة.
            <?php if (current_user_can('manage_options')): ?>
                · <a href="<?php echo admin_url('admin.php?page=alsafwa-cms'); ?>" class="text-amber-400/80 hover:text-amber-300 font-bold underline transition-colors" title="إدارة المحتوى والصور وبيانات الجمعية">⚙️ لوحة تحكم الصفوة (CMS)</a>
            <?php endif; ?>
            </p>
            <p class="text-amber-400/90 font-serif text-sm">"وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ"</p>
        </div>
    </div>
</footer>

<!-- Interactive Donation Modal Structure (Native Pure Vanilla JS) -->
<div id="alsafwa-donation-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4 modal-backdrop" dir="rtl">
    <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-amber-400/40 relative text-right text-gray-900">
        <button type="button" onclick="closeDonationModal()" class="absolute top-4 left-4 text-gray-400 hover:text-gray-700 text-xl font-bold p-2 leading-none">✕</button>

        <div class="text-center mb-6">
            <span class="text-xs font-bold text-emerald-800 tracking-wider block mb-1">بوابة العطاء الإلكتروني المعتمدة</span>
            <h3 class="text-2xl font-black text-gray-900" id="modal-project-title">تبرع لجمعية الصفوة الإسلامية</h3>
            <p class="text-xs text-gray-500 mt-1">مشهرة برقم <?php echo esc_html($reg_no); ?> لسنة 1991 - المطرية</p>
        </div>

        <!-- Amount selector -->
        <div class="mb-5">
            <label class="block text-xs font-bold text-gray-700 mb-2">اختر مبلغ التبرع:</label>
            <div class="grid grid-cols-4 gap-2 mb-2">
                <button type="button" onclick="setModalAmount(100)" class="modal-amt-btn py-2 bg-gray-50 hover:bg-emerald-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800">100 ج.م</button>
                <button type="button" onclick="setModalAmount(250)" class="modal-amt-btn py-2 bg-emerald-50 border-2 border-emerald-600 rounded-xl text-xs font-bold text-emerald-900">250 ج.م</button>
                <button type="button" onclick="setModalAmount(500)" class="modal-amt-btn py-2 bg-gray-50 hover:bg-emerald-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800">500 ج.م</button>
                <button type="button" onclick="setModalAmount(1000)" class="modal-amt-btn py-2 bg-gray-50 hover:bg-emerald-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800">1000 ج.م</button>
            </div>
            <input type="number" id="modal-custom-amount" value="250" placeholder="أو أدخل مبلغاً آخر..." class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-center focus:outline-none focus:border-emerald-600" />
        </div>

        <!-- Payment Channels Tabs -->
        <div class="mb-6 space-y-3">
            <div class="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                <div>
                    <span class="text-xs font-bold text-emerald-900 block">إنستاباي (InstaPay):</span>
                    <span class="font-mono text-sm font-bold text-gray-900 select-all block mt-0.5"><?php echo esc_html($instapay); ?></span>
                </div>
                <button type="button" onclick="copyToClipboard('<?php echo esc_js($instapay); ?>', 'تم نسخ معرف إنستاباي')" class="px-3 py-1 bg-white hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
                    نسخ المعرف
                </button>
            </div>

            <div class="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                <div>
                    <span class="text-xs font-bold text-emerald-900 block">المحفظة الإلكترونية:</span>
                    <span class="font-mono text-sm font-bold text-gray-900 select-all block mt-0.5"><?php echo esc_html($vodafone); ?></span>
                </div>
                <button type="button" onclick="copyToClipboard('<?php echo esc_js($vodafone); ?>', 'تم نسخ رقم المحفظة الإلكترونية')" class="px-3 py-1 bg-white hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
                    نسخ الرقم
                </button>
            </div>
        </div>

        <!-- WhatsApp Confirmation Button -->
        <button type="button" onclick="confirmModalDonationWhatsApp()" class="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
            <span>تأكيد التبرع عبر واتساب الجمعية</span>
        </button>
    </div>
</div>

<!-- Copy Toast Notification -->
<div id="copy-toast" class="copy-toast">تم النسخ بنجاح</div>

<!-- Embedded Vanilla JavaScript for Interaction -->
<script>
let currentDonationProject = 'تبرع عام لجمعية الصفوة الإسلامية';
let currentDonationAmount = 250;

function copyToClipboard(text, message) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
    showToast(message || 'تم النسخ بنجاح');
}

function showToast(msg) {
    const toast = document.getElementById('copy-toast');
    if (toast) {
        toast.textContent = msg;
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 2500);
    }
}

function openDonationModal(project, amount) {
    currentDonationProject = project || 'تبرع عام لجمعية الصفوة الإسلامية';
    currentDonationAmount = amount || 250;
    
    const titleEl = document.getElementById('modal-project-title');
    if (titleEl) titleEl.textContent = currentDonationProject;
    
    const amtInput = document.getElementById('modal-custom-amount');
    if (amtInput) amtInput.value = currentDonationAmount;

    const modal = document.getElementById('alsafwa-donation-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeDonationModal() {
    const modal = document.getElementById('alsafwa-donation-modal');
    if (modal) modal.classList.add('hidden');
}

function setModalAmount(amt) {
    currentDonationAmount = amt;
    const amtInput = document.getElementById('modal-custom-amount');
    if (amtInput) amtInput.value = amt;
}

function confirmModalDonationWhatsApp() {
    const amtInput = document.getElementById('modal-custom-amount');
    const amt = amtInput ? amtInput.value : currentDonationAmount;
    const text = "السلام عليكم ورحمة الله،\\nأرغب في التبرع لجمعية الصفوة الإسلامية (قيد 3794):\\n📌 المشروع: " + currentDonationProject + "\\n💰 المبلغ: " + amt + " ج.م\\nبرجاء موافاتي بتأكيد الاستلام.";
    const url = "https://wa.me/20<?php echo ltrim($phone, '0'); ?>?text=" + encodeURIComponent(text);
    window.open(url, '_blank');
    closeDonationModal();
}

function filterActivities(category) {
    const cards = document.querySelectorAll('.activity-card');
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });

    const buttons = document.querySelectorAll('.activity-filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('tab-active');
        btn.classList.add('bg-white', 'text-gray-700');
    });

    if (event && event.currentTarget) {
        event.currentTarget.classList.add('tab-active');
        event.currentTarget.classList.remove('bg-white', 'text-gray-700');
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('contact_name').value || 'فاعل خير';
    const phone = document.getElementById('contact_phone').value || '';
    const subject = document.getElementById('contact_subject').value;
    const msg = document.getElementById('contact_message').value;

    const text = "السلام عليكم ورحمة الله،\\nرسالة تواصل مع جمعية الصفوة الإسلامية:\\n👤 الاسم: " + name + "\\n📱 الهاتف: " + phone + "\\n📌 الموضوع: " + subject + "\\n💬 التفاصيل: " + msg;
    const url = "https://wa.me/20<?php echo ltrim($phone, '0'); ?>?text=" + encodeURIComponent(text);
    window.open(url, '_blank');
}

// Bind all .js-open-donate buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.js-open-donate').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const project = this.getAttribute('data-project');
            const amount = this.getAttribute('data-amount');
            openDonationModal(project, amount);
        });
    });
});
</script>

<?php wp_footer(); ?>
</body>
</html>
`;

  const indexPhp = `<?php
/**
 * Main Fallback Template
 */
get_header();
?>
<main class="max-w-7xl mx-auto px-4 py-12">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <article class="bg-white p-8 rounded-2xl border border-gray-200 mb-6 shadow-sm">
            <h2 class="text-2xl font-bold mb-4 text-emerald-950"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
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
        <article class="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm">
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
Tags: charity, donation, islamic, rtl-language-support, customizer
Requires at least: 6.0
Tested up to: 6.7
Stable tag: 2.0.0
License: GPLv2 or later

قالب ووردبريس متكامل ورسمي لجمعية الصفوة الإسلامية المشهرة برقم 3794 لسنة 1991.
يحتوي القالب على كافة أقسام الموقع:
1. شريط الإشهار الرسمي مع روابط السوشيال ميديا (فيسبوك، يوتيوب، واتساب).
2. البانر الرئيسي مع الآية الكريمة وصندوق التبرع السريع.
3. قسم لائحة النظام الأساسي والمصداقية القانونية (المادة 1 والمادة 4).
4. قسم مشروع سيارة إكرام ودفن الموتى المعتمد في المادة 4 (المستهدف والأسهم الأربعة).
5. قسم أنشطة ومجالات التكافل الاجتماعي الـ 11 مساراً للخير مع تصفية الأقسام.
6. قسم التواصل الكامل وطلب المندوب مع حسابات البنك الأهلي وبنك مصر وإنستاباي والمحفظة الإلكترونية.
7. إمكانية إدارة وتعديل كامل المحتوى من لوحة تحكم ووردبريس (المظهر -> تخصيص).
8. لوحة تحكم وإدارة المحتوى الشاملة (CMS Panel) المدمجة تلقائياً في القائمة الجانبية: لوحة تحكم جمعية الصفوة (CMS).

== طريقة التركيب على ووردبريس ==
1. ادخل إلى لوحة تحكم ووردبريس (wp-admin).
2. اذهب إلى: المظهر (Appearance) -> قوالب (Themes).
3. اضغط على "أضف قالباً جديداً" ثم "رفع قالب".
4. اختر ملف zip واضغط "التنصيب الآن".
5. اضغط على "تفعيل" (Activate).
6. لإدارة وتعديل المحتوى والأنشطة والصور مباشرة: اذهب إلى "لوحة تحكم جمعية الصفوة (CMS)" في القائمة الجانبية، أو المظهر -> تخصيص.
`;

  return [
    { filename: 'style.css', description: 'ملف التعريف والتنسيقات الرئيسي للقالب (WordPress Theme Stylesheet)', content: styleCss },
    { filename: 'functions.php', description: 'ملف دوال القالب، تسجيل القوائم، وتخصيص المحتوى من لوحة التحكم (WP Customizer)', content: functionsPhp },
    { filename: 'inc/admin-cms.php', description: 'لوحة التحكم وإدارة المحتوى الشاملة في ووردبريس (WordPress Admin CMS Panel)', content: adminCmsPhp },
    { filename: 'header.php', description: 'الهيدر العربي مع اللوجو وشريط الإشهار الرسمي وروابط السوشيال ميديا (فيسبوك، يوتيوب، واتساب)', content: headerPhp },
    { filename: 'front-page.php', description: 'قالب الصفحة الرئيسية بكامل الأقسام (مشروع سيارة الموتى، الـ 11 نشاطاً، وقسم التواصل)', content: frontPagePhp },
    { filename: 'footer.php', description: 'الفوتر مع بوابات الدفع، الحسابات البنكية، والمودال التفاعلي للتبرع والتواصل', content: footerPhp },
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
    if (f.filename.includes('/')) {
      const parts = f.filename.split('/');
      const dir = parts.slice(0, -1).join('/');
      const fname = parts[parts.length - 1];
      const sub = folder?.folder(dir);
      sub?.file(fname, f.content);
    } else {
      folder?.file(f.filename, f.content);
    }
  });

  // Also include the demo content XML inside the zip for instant access
  const demoXml = generateWordPressDemoXml(content, activities);
  folder?.file('alsafwa-demo-content.xml', demoXml);

  // Try to load and include the real logo and screenshot inside the zip
  try {
    const logoResp = await fetch('/assets/aistudio/WhatsApp_Image_2026-10-21_at_9.07.13_PM_236a8cc1.jpeg');
    if (logoResp.ok) {
      const logoBlob = await logoResp.blob();
      const assetsFolder = folder?.folder('assets');
      assetsFolder?.file('logo.jpg', logoBlob);
      // Also provide screenshot.png in the theme root so WP Admin Themes page shows the logo
      folder?.file('screenshot.png', logoBlob);
    }
  } catch (e) {
    console.warn('Could not bundle local logo asset in theme zip:', e);
  }

  return await zip.generateAsync({ type: 'blob' });
}
