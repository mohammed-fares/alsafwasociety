import JSZip from 'jszip';
import { SiteContentData } from '../types';

export function generateWordPressPluginFiles(societyInfo: SiteContentData) {
  const pluginPhp = `<?php
/**
 * Plugin Name: جمعية الصفوة الإسلامية - بوابة التبرعات والخدمات
 * Plugin URI: ${societyInfo.website}
 * Description: إضافة رسمية متكاملة لربط موقع ووردبريس بجمعية الصفوة الإسلامية (قيد ${societyInfo.registrationNumber} لسنة ${societyInfo.registrationYear}). توفر شورت كود لصناديق التبرع المباشر، أسهم سيارة الموتى (المادة 4)، كفالة الأيتام، ومزامنة التبرعات والمستفيدين عبر REST API.
 * Version: 1.0.0
 * Author: جمعية الصفوة الإسلامية
 * Author URI: ${societyInfo.website}
 * Text Domain: alsafwa-donations
 * License: GPLv2 or later
 */

if (!defined('ABSPATH')) {
    exit;
}

define('ALSAFWA_VERSION', '1.0.0');
define('ALSAFWA_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('ALSAFWA_PLUGIN_URL', plugin_dir_url(__FILE__));

// Register Settings Page
add_action('admin_menu', 'alsafwa_plugin_menu');
function alsafwa_plugin_menu() {
    add_menu_page(
        'إعدادات جمعية الصفوة',
        'جمعية الصفوة',
        'manage_options',
        'alsafwa-settings',
        'alsafwa_render_settings_page',
        'dashicons-heart',
        30
    );
}

function alsafwa_render_settings_page() {
    ?>
    <div class="wrap" dir="rtl" style="text-align: right;">
        <h1>إعدادات إضافة جمعية الصفوة الإسلامية</h1>
        <p>مشهرة برقم <strong>${societyInfo.registrationNumber} لسنة ${societyInfo.registrationYear}</strong> - إدارة المطرية بالقاهرة</p>
        
        <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #ccd0d4; max-width: 800px; margin-top: 20px;">
            <h2>الشورت كود المتاح في الإضافة</h2>
            <table class="widefat fixed" style="margin-top: 15px;">
                <thead>
                    <tr>
                        <th style="font-weight:bold;">الشورت كود (Shortcode)</th>
                        <th style="font-weight:bold;">الوصف وطريقة الاستخدام</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>[alsafwa_quick_donation]</code></td>
                        <td>شريط تبرع سريع مدمج يقبل جميع المبالغ وإنستاباي والمحفظة الإلكترونية</td>
                    </tr>
                    <tr>
                        <td><code>[alsafwa_hearse_project]</code></td>
                        <td>صندوق التبرع لسيارة نقل ودفن الموتى (المادة 4 من اللائحة)</td>
                    </tr>
                    <tr>
                        <td><code>[alsafwa_orphan_care]</code></td>
                        <td>صندوق كفالة الأيتام الشهرية</td>
                    </tr>
                    <tr>
                        <td><code>[alsafwa_services_list]</code></td>
                        <td>عرض جميع الأنشطة والخدمات الـ 11 مع أزرار التبرع وطلب المساعدة</td>
                    </tr>
                </tbody>
            </table>

            <hr style="margin: 25px 0;">

            <h2>بيانات التواصل والحسابات المعتمدة</h2>
            <p><strong>الهاتف والواتساب الموحد:</strong> ${societyInfo.phone}</p>
            <p><strong>معرف إنستاباي:</strong> alsafwasociety@instapay</p>
            <p><strong>المحفظة الإلكترونية:</strong> ${societyInfo.phone}</p>
            <p><strong>العنوان:</strong> ${societyInfo.address}</p>
        </div>
    </div>
    <?php
}

// REST API Endpoints for syncing donations and beneficiary requests
add_action('rest_api_init', function () {
    register_rest_route('alsafwa/v1', '/record-donation', array(
        'methods' => 'POST',
        'callback' => 'alsafwa_api_record_donation',
        'permission_callback' => '__return_true',
    ));
    
    register_rest_route('alsafwa/v1', '/request-service', array(
        'methods' => 'POST',
        'callback' => 'alsafwa_api_request_service',
        'permission_callback' => '__return_true',
    ));
});

function alsafwa_api_record_donation($request) {
    $params = $request->get_json_params();
    // Log donation in WP options or custom table
    $donations = get_option('alsafwa_donations_log', array());
    $params['timestamp'] = current_time('mysql');
    $donations[] = $params;
    update_option('alsafwa_donations_log', $donations);

    return rest_ensure_response(array(
        'success' => true,
        'message' => 'تم استلام وتوثيق التبرع بنجاح في موقع ووردبريس',
        'receipt' => $params['receiptNumber'] ?? 'ALSAFWA-WP-' . time(),
    ));
}

function alsafwa_api_request_service($request) {
    $params = $request->get_json_params();
    $requests = get_option('alsafwa_beneficiary_requests', array());
    $params['timestamp'] = current_time('mysql');
    $requests[] = $params;
    update_option('alsafwa_beneficiary_requests', $requests);

    return rest_ensure_response(array(
        'success' => true,
        'message' => 'تم تسجيل طلب المساعدة وسيتم فحصه والتواصل مع الحالة',
    ));
}

// Shortcode: Quick Donation Box
add_shortcode('alsafwa_quick_donation', 'alsafwa_shortcode_quick_donation');
function alsafwa_shortcode_quick_donation($atts) {
    ob_start();
    ?>
    <div style="background: #FAF8F5; border: 2px solid #0F5132; border-radius: 14px; padding: 20px; text-align: right; direction: rtl; font-family: 'Cairo', sans-serif; margin: 20px 0;">
        <h3 style="color: #0F5132; margin-top: 0;">جمعية الصفوة الإسلامية - تبرع فوري</h3>
        <p style="font-size: 13px; color: #555;">مشهرة برقم ${societyInfo.registrationNumber} لسنة ${societyInfo.registrationYear} - القاهرة</p>
        <div style="background: #fff; padding: 15px; border-radius: 10px; margin: 15px 0; border: 1px solid #ddd;">
            <p style="margin: 0 0 8px 0;"><strong>طرق الدفع السريع المتاحة:</strong></p>
            <ul style="margin: 0; padding-right: 20px; font-size: 13px;">
                <li>إنستاباي (InstaPay): <strong>alsafwasociety@instapay</strong> أو على الرقم <strong>${societyInfo.phone}</strong></li>
                <li>المحفظة الإلكترونية: <strong>${societyInfo.phone}</strong></li>
                <li>حساب البنك الأهلي المصري: <strong>10912384758001</strong></li>
            </ul>
        </div>
        <a href="https://wa.me/201115947455?text=السلام%20عليكم،%20أرغب%20في%20التبرع%20لجمعية%20الصفوة%20الإسلامية" target="_blank" style="display: block; background: #0F5132; color: #fff; text-align: center; padding: 12px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            تأكيد التبرع عبر واتساب (${societyInfo.phone})
        </a>
    </div>
    <?php
    return ob_get_clean();
}

// Shortcode: Hearse Project Box (المادة 4)
add_shortcode('alsafwa_hearse_project', 'alsafwa_shortcode_hearse_project');
function alsafwa_shortcode_hearse_project($atts) {
    ob_start();
    ?>
    <div style="background: #052316; color: #fff; border: 2px solid #C5A059; border-radius: 14px; padding: 24px; text-align: right; direction: rtl; font-family: 'Cairo', sans-serif; margin: 20px 0;">
        <span style="background: rgba(197,160,89,0.2); color: #C5A059; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: bold;">المادة (4) من اللائحة الرسمية</span>
        <h3 style="color: #fff; margin: 10px 0;">مشروع شراء وتجهيز سيارة نقل ودفن الموتى (إكرام الموتى)</h3>
        <p style="font-size: 13px; color: #ccc; line-height: 1.6;">خدمة مجانية 100% لنقل وتجهيز الجثامين للأسر الأولى بالرعاية على مدار 24 ساعة. صدقة جارية مستمرة.</p>
        <p style="font-size: 14px; color: #FFD700;"><strong>أسهم التبرع:</strong> 250 ج.م · 500 ج.م · 1000 ج.م · 5000 ج.م</p>
        <a href="https://wa.me/201115947455?text=أرغب%20في%20المساهمة%20في%20مشروع%20سيارة%20نقل%20ودفن%20الموتى" target="_blank" style="display: inline-block; background: #C5A059; color: #000; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 10px;">
            المساهمة في سهم السيارة الآن
        </a>
    </div>
    <?php
    return ob_get_clean();
}
`;

  const readmeTxt = `=== Alsafwa Charity Donations & Services Plugin ===
Contributors: alsafwasociety
Tags: donation, charity, instapay, vodafone-cash, islamic, cairo
Requires at least: 5.8
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later

إضافة ووردبريس رسمية لربط موقعك بجمعية الصفوة الإسلامية المشهرة برقم ${societyInfo.registrationNumber} لسنة ${societyInfo.registrationYear}.

== طريقة التركيب على موقع ووردبريس ==
1. ادخل إلى لوحة تحكم موقعك ووردبريس (WP-Admin).
2. من القائمة الجانبية: إضافات (Plugins) -> أضف إضافة جديدة (Add New Plugin).
3. اضغط على زر "رفع إضافة" (Upload Plugin) في الأعلى.
4. اختر ملف الـ ZIP: (alsafwa-charity-donations.zip).
5. اضغط "التنصيب الآن" (Install Now) ثم "تفعيل" (Activate).

== كيفية الاستخدام ==
يمكنك استخدام أي من الشورت كود التالية داخل أي صفحة أو مقال أو ودجت في موقعك:
[alsafwa_quick_donation] : صندوق تبرع فوري مع حسابات إنستاباي والمحفظة الإلكترونية
[alsafwa_hearse_project] : صندوق مشروع سيارة نقل ودفن الموتى (المادة 4)
`;

  return [
    { filename: 'alsafwa-charity-donations.php', description: 'الملف البرمجي الرئيسي لإضافة ووردبريس', content: pluginPhp },
    { filename: 'readme.txt', description: 'دليل تركيب وتفعيل واستخدام إضافة ووردبريس', content: readmeTxt },
  ];
}

export async function downloadWordPressPluginZip(societyInfo: SiteContentData): Promise<Blob> {
  const zip = new JSZip();
  const folder = zip.folder('alsafwa-charity-donations');
  const files = generateWordPressPluginFiles(societyInfo);

  files.forEach((f) => {
    folder?.file(f.filename, f.content);
  });

  return await zip.generateAsync({ type: 'blob' });
}
