/* ====================================================================
    👨‍🏫 ملف الجلوبل الأسطوري - Lost & Found System (النسخة الكاملة)
    يحتوي على كافة ترجمات المشروع (مسافر، إدارة، موظف) مع التقسيمات
==================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const langToggles = document.querySelectorAll(".lang-toggle, #langToggle");
    const themeToggles = document.querySelectorAll(".theme-toggle, #themeToggle");

    let currentLang = localStorage.getItem("appLang") || "ar";
    let currentTheme = localStorage.getItem("appTheme") || "light";

    applyLanguage(currentLang);
    if (currentTheme === "dark") body.classList.add("dark-mode");

    langToggles.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            currentLang = currentLang === "en" ? "ar" : "en";
            localStorage.setItem("appLang", currentLang);
            applyLanguage(currentLang);
        });
    });

    themeToggles.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            body.classList.toggle("dark-mode");
            localStorage.setItem("appTheme", body.classList.contains("dark-mode") ? "dark" : "light");
            applyLanguage(currentLang);
        });
    });

    function applyLanguage(lang) {
        body.setAttribute("data-lang", lang);
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = lang;

        langToggles.forEach(btn => {
            if (btn.classList.contains('text-only')) btn.innerHTML = lang === "ar" ? 'EN' : 'AR';
            else btn.innerHTML = lang === "ar" ? '<i class="fa-solid fa-globe"></i> English' : '<i class="fa-solid fa-globe"></i> العربية';
        });

        themeToggles.forEach(btn => {
            const isDark = body.classList.contains("dark-mode");
            if (lang === "ar") btn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i> الوضع النهاري' : '<i class="fa-solid fa-moon"></i> الوضع الليلي';
            else btn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i> Light Mode' : '<i class="fa-solid fa-moon"></i> Dark Mode';
        });

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                    el.placeholder = translations[lang][key];
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });

        document.querySelectorAll("[data-i18n-title]").forEach(el => {
            const key = el.getAttribute("data-i18n-title");
            if (translations[lang] && translations[lang][key]) {
                el.title = translations[lang][key];
            }
        });
    }

    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function () {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
});

const translations = {
    "en": {
        // --- القائمة الجانبية والتنقل (للأدمن والموظف) ---
        "nav_dash": '<i class="fa-solid fa-chart-pie"></i> Dashboard',
        "nav_lost": '<i class="fa-solid fa-box-open"></i> Lost Reports',
        "nav_found": '<i class="fa-solid fa-warehouse"></i> Found Reports',
        "nav_matches": '<i class="fa-solid fa-robot"></i> Matches',
        "nav_staff": '<i class="fa-solid fa-users-gear"></i> Staff Mgmt',
        "nav_staff_map": '<i class="fa-solid fa-tower-broadcast"></i> Field Radar',
        "nav_staff_reports": '<i class="fa-solid fa-clipboard-list"></i> Operations Log',
        "nav_brand": "Lost & Found System",
        "nav_home": "Home",
        "my_profile": "My Profile",
        "btn_logout": "Logout",
        "theme_dark": "Dark Mode",

        // --- الصفحة الرئيسية للمسافر (User Home) ---
        "home_title": "Did you lose something at the airport?",
        "home_desc": "Integrated and secure electronic system to manage lost & found items.",
        "ph_search": "Describe what you lost...",
        "btn_search": "General Search",
        "btn_report_lost": "Report Lost Item",
        "btn_report_found": "Report Found Item",
        "cat_bags": "Bags & Luggage",
        "cat_elec": "Electronics",
        "cat_docs": "Official Documents",
        "cat_personal": "Personal Belongings",

        // --- شاشات الدخول والتسجيل (Authentication) ---
        "auth_login_title": "Passenger Login",
        "auth_emp_title": "Staff Portal",
        "auth_admin_title": "Admin Access",
        "auth_reg_title": "Create New Account",
        "auth_otp_title": "Verify Your Email",
        "auth_reset_title": "Recover Password",
        "auth_email": "Email Address",
        "auth_pass": "Password",
        "auth_name": "Full Name",
        "auth_pass_conf": "Confirm Password",
        "auth_emp_id": "Employee ID",
        "auth_email_ph": "example@airport.com",
        "auth_pass_ph": "••••••••",
        "auth_name_ph": "John Doe",
        "auth_emp_id_ph": "e.g. EMP-101",
        "auth_btn_login": "Login to System",
        "auth_btn_emp_login": "Access My Tasks",
        "auth_btn_reg": "Register Account",
        "auth_btn_otp": "Verify & Proceed",
        "auth_btn_reset": "Update Password",
        "auth_forgot": "Forgot Password?",
        "auth_create": "Don't have an account? Sign Up",
        "auth_have_acc": "Already have an account? Login",
        "auth_remember": "Remembered your password? Login",
        "auth_otp_desc": "Enter the 4-digit code sent to your email.",
        "auth_reset_desc": "Enter your new password below.",
        "auth_otp_timer": "Resend in:",
        "auth_otp_seconds": "seconds",
        "auth_otp_resend": "Resend Code",

        // --- نماذج البلاغات (Forms) ---
        "rep_lost_title": "Report Lost Item",
        "rep_found_title": "Report Found Item",
        "rep_lost_desc": "Provide details to help us match your item.",
        "sec_personal": "Contact Information",
        "sec_lost_item": "Lost Item Details",
        "sec_item": "Item Details",
        "lbl_fullname": "Full Name",
        "lbl_phone": "Phone Number",
        "lbl_item_name": "Item Name",
        "lbl_category": "Category",
        "lbl_color": "Item Color",
        "lbl_location": "Location",
        "lbl_location_lost": "Where did you lose it?",
        "lbl_location_found": "Where did you find it?",
        "lbl_date": "Date",
        "lbl_date_lost": "Date of Loss",
        "lbl_date_found": "Date Found",
        "lbl_time": "Approximate Time",
        "lbl_desc": "Additional Description",
        "lbl_upload": "Upload Image (Optional)",
        "ph_item_name": "e.g. Black Leather Wallet",
        "ph_desc": "Any marks, brand, or content...",
        "ph_fullname": "Ahmad Mohammad",
        "ph_phone": "079XXXXXXX",
        "opt_select_ph": "--- Select ---",
        "btn_submit_report": "Submit Report",
        "btn_submit_found": "Submit Found Item",
        "btn_export_pdf": "Export as PDF",

        // --- لوحة تحكم الأدمن والجداول (Admin Panel) ---
        "welcome": "Welcome Back",
        "welcome_desc": "System statistics for today",
        "stat_lost": "Total Lost",
        "stat_found": "Total Found",
        "stat_matches": "Active Matches",
        "lost_admin_title": "Lost Reports Management",
        "lost_admin_desc": "Track search operations and delivery status.",
        "found_admin_title": "Storage & Found Items",
        "found_admin_desc": "Manage items currently in the warehouse.",
        "lost_table_title": "Current Lost Records",
        "found_table_title": "Storage Inventory",
        "staff_title": "Staff & Permissions",
        "staff_desc": "Add, suspend, or manage employee accounts.",
        "matches_admin_title": "AI Smart Matches",
        "matches_admin_desc": "System suggestions for matching reports.",
        "matches_table_title": "Proposed Matches",

        // --- عناوين الجداول (Table Headers) ---
        "th_report_id": "Report ID",
        "th_name": "Name",
        "th_contact": "Contact",
        "th_lost_item": "Lost Item",
        "th_found_item": "Found Item",
        "th_location_date": "Location & Date",
        "th_status": "Search Status",
        "th_delivery": "Delivery",
        "th_actions": "Actions",
        "th_match_id": "Match ID",
        "th_match_score": "Score",
        "th_review_status": "Review",
        "th_decision": "Decision",
        "th_staff_name": "Employee Name",
        "th_credentials": "Login (ID/Pass)",
        "th_role": "Position",
        "th_zone": "Assigned Area",
        "th_duty_status": "Status",

        // --- الحالات والخيارات (Status & Roles) ---
        "status_searching": "Searching",
        "status_in_storage": "Stored",
        "status_not_found_yet": "Not Found",
        "status_not_delivered": "Pending Delivery",
        "status_delivered": "Delivered",
        "status_on_duty": "On Duty",
        "status_suspended": "Suspended",
        "status_under_review": "Under Review",
        "role_security": "Security",
        "role_luggage": "Baggage Staff",
        "role_warehouse": "Storekeeper",
        "btn_add_staff": "Add Employee",
        "btn_export_excel": "Export to Excel",
        "btn_reset": "Reset Filters",

        // --- رادار الموظفين والعمليات الميدانية (Staff Radar) ---
        "staff_portal_title": "Staff Portal",
        "staff_welcome_field": "Field Operations",
        "staff_map_desc": "Live tracking - respond to alarms immediately.",
        "staff_idle": "Waiting for tasks...",
        "alarm_title": "🚨 NEW ALARM!",
        "alarm_body": "Item detected at:",
        "alarm_action": "Head to location now.",
        "btn_on_my_way": "Respond Now",
        "btn_heading": "Heading to Site",
        "btn_picked": "Item Picked Up",
        "btn_stored": "Deposited",
        "staff_rep_header": "Staff Activity Log",
        "staff_rep_desc": "Update status as you process items.",
        "staff_assigned_items": "My Assigned Tasks",
        "label_lost_rep": "Lost (Passenger)",
        "status_waiting_pickup": "Waiting Pickup",
        "opt_select_new_status": "--- Select Status ---",
        "opt_received_way": "Received & En-route",
        "opt_deposited_success": "Deposited",
        "opt_delivered_to_person": "Handed to Owner",
        "btn_save_update": "Save Changes",

        // --- المواقع والخرائط (Locations) ---
        "zone_security": "Security Checkpoint",
        "zone_gates": "Boarding Gates",
        "zone_warehouse": "Main Storage",
        "zone_dutyfree": "Duty Free",
        "map_pin_runway": "Runways",
        "map_pin_gates": "Gates",
        "legend_storage": "Warehouse",
        "map_pin_parking": "Parking",
        "pin_security_alert": "ALERT: SECURITY",

        // --- تذييل الصفحة (Footer) ---
        "footer_desc": "A secure system for airport item management.",
        "footer_rights": "© 2026 Lost & Found Management.",
        "footer_copy": "© 2026 All Rights Reserved."
    },
    "ar": {
        // --- القائمة الجانبية والتنقل ---
        "nav_dash": '<i class="fa-solid fa-chart-pie"></i> لوحة التحكم',
        "nav_lost": '<i class="fa-solid fa-box-open"></i> المفقودات',
        "nav_found": '<i class="fa-solid fa-warehouse"></i> المعثورات',
        "nav_matches": '<i class="fa-solid fa-robot"></i> المطابقات',
        "nav_staff": '<i class="fa-solid fa-users-gear"></i> إدارة الموظفين',
        "nav_staff_map": '<i class="fa-solid fa-tower-broadcast"></i> الرادار الميداني',
        "nav_staff_reports": '<i class="fa-solid fa-clipboard-list"></i> سجل العمليات',
        "nav_brand": "نظام المفقودات والمعثورات",
        "nav_home": "الرئيسية",
        "my_profile": "حسابي",
        "btn_logout": "تسجيل خروج",
        "theme_dark": "الوضع الليلي",

        // --- الصفحة الرئيسية للمسافر ---
        "home_title": "هل فقدت شيئاً في المطار؟",
        "home_desc": "نظام إلكتروني متكامل وآمن لإدارة المفقودات والمعثورات في المطار.",
        "ph_search": "اكتب وصف ما فقدته...",
        "btn_search": "بحث عام",
        "btn_report_lost": "الإبلاغ عن مفقود",
        "btn_report_found": "الإبلاغ عن معثور عليه",
        "cat_bags": "الحقائب والأمتعة",
        "cat_elec": "الإلكترونيات",
        "cat_docs": "الوثائق الرسمية",
        "cat_personal": "متعلقات شخصية",

        // --- شاشات الدخول والتسجيل ---
        "auth_login_title": "دخول المسافرين",
        "auth_emp_title": "بوابة الموظفين",
        "auth_admin_title": "بوابة الإدارة",
        "auth_reg_title": "إنشاء حساب جديد",
        "auth_otp_title": "التحقق من البريد",
        "auth_reset_title": "استعادة كلمة المرور",
        "auth_email": "البريد الإلكتروني",
        "auth_pass": "كلمة المرور",
        "auth_name": "الاسم الكامل",
        "auth_pass_conf": "تأكيد المرور",
        "auth_emp_id": "الرقم الوظيفي",
        "auth_email_ph": "example@airport.com",
        "auth_pass_ph": "••••••••",
        "auth_name_ph": "أحمد محمد",
        "auth_emp_id_ph": "مثال: EMP-101",
        "auth_btn_login": "دخول النظام",
        "auth_btn_emp_login": "دخول لمهامي",
        "auth_btn_reg": "تسجيل الحساب",
        "auth_btn_otp": "التحقق والمتابعة",
        "auth_btn_reset": "تحديث كلمة المرور",
        "auth_forgot": "نسيت كلمة المرور؟",
        "auth_create": "ليس لديك حساب؟ سجل الآن",
        "auth_have_acc": "لديك حساب؟ تسجيل الدخول",
        "auth_remember": "تذكرت كلمة المرور؟ دخول",
        "auth_otp_desc": "أدخل الرمز المرسل إلى بريدك الإلكتروني.",
        "auth_reset_desc": "أدخل كلمة المرور الجديدة أدناه.",
        "auth_otp_timer": "إعادة الإرسال خلال:",
        "auth_otp_seconds": "ثانية",
        "auth_otp_resend": "إعادة إرسال الرمز",

        // --- نماذج البلاغات ---
        "rep_lost_title": "الإبلاغ عن مفقود",
        "rep_found_title": "الإبلاغ عن معثور عليه",
        "rep_lost_desc": "يرجى تعبئة التفاصيل بدقة لمساعدتنا في العثور عليه.",
        "sec_personal": "معلومات التواصل",
        "sec_lost_item": "تفاصيل الغرض المفقود",
        "sec_item": "تفاصيل الغرض",
        "lbl_fullname": "الاسم الكامل",
        "lbl_phone": "رقم الهاتف",
        "lbl_item_name": "اسم الغرض",
        "lbl_category": "الفئة",
        "lbl_color": "اللون",
        "lbl_location": "الموقع",
        "lbl_location_lost": "أين فقدته تقريباً؟",
        "lbl_location_found": "أين وجدته؟",
        "lbl_date": "التاريخ",
        "lbl_date_lost": "تاريخ الفقدان",
        "lbl_date_found": "تاريخ العثور",
        "lbl_time": "الوقت التقريبي",
        "lbl_desc": "وصف إضافي",
        "lbl_upload": "إرفاق صورة (اختياري)",
        "ph_item_name": "مثال: محفظة جلد سوداء",
        "ph_desc": "علامات مميزة أو محتويات...",
        "ph_fullname": "أحمد محمد",
        "ph_phone": "079XXXXXXX",
        "opt_select_ph": "--- اختر ---",
        "btn_submit_report": "إرسال البلاغ",
        "btn_submit_found": "تسليم المعثورات",
        "btn_export_pdf": "تصدير كـ PDF",

        // --- لوحة تحكم الأدمن والجداول ---
        "welcome": "مرحباً بك",
        "welcome_desc": "إليك إحصائيات النظام اليوم",
        "stat_lost": "إجمالي المفقودات",
        "stat_found": "إجمالي المعثورات",
        "stat_matches": "المطابقات النشطة",
        "lost_admin_title": "إدارة بلاغات المفقودات",
        "lost_admin_desc": "متابعة عمليات البحث وتسليم الأغراض.",
        "found_admin_title": "إدارة المعثورات والمستودع",
        "found_admin_desc": "سجل الأغراض الموجودة في المستودع حالياً.",
        "lost_table_title": "سجل البلاغات الحالي",
        "found_table_title": "المعثورات في المستودع",
        "staff_title": "إدارة الموظفين والصلاحيات",
        "staff_desc": "إضافة وتجميد وإدارة حسابات الموظفين.",
        "matches_admin_title": "المطابقات الذكية",
        "matches_admin_desc": "اقتراحات النظام لربط المفقودات بالمعثورات.",
        "matches_table_title": "المطابقات المقترحة",

        // --- عناوين الجداول ---
        "th_report_id": "رقم البلاغ",
        "th_name": "الاسم",
        "th_contact": "التواصل",
        "th_lost_item": "الغرض المفقود",
        "th_found_item": "الغرض المعثور",
        "th_location_date": "المكان / التاريخ",
        "th_status": "حالة البحث",
        "th_delivery": "التسليم",
        "th_actions": "الإجراءات",
        "th_match_id": "رقم المطابقة",
        "th_match_score": "النسبة",
        "th_review_status": "المراجعة",
        "th_decision": "القرار",
        "th_staff_name": "اسم الموظف",
        "th_credentials": "بيانات الدخول",
        "th_role": "المنصب",
        "th_zone": "موقع التعيين",
        "th_duty_status": "الحالة",

        // --- الحالات والخيارات ---
        "status_searching": "جاري البحث",
        "status_in_storage": "في المستودع",
        "status_not_found_yet": "لم يتم العثور",
        "status_not_delivered": "لم يتم التسليم",
        "status_delivered": "تم التسليم",
        "status_on_duty": "على رأس عمله",
        "status_suspended": "حساب مجمد",
        "status_under_review": "قيد المراجعة",
        "role_security": "موظف أمن",
        "role_luggage": "موظف أمتعة",
        "role_warehouse": "أمين مستودع",
        "btn_add_staff": "إضافة موظف",
        "btn_export_excel": "تصدير إلى Excel",
        "btn_reset": "إعادة ضبط",

        // --- رادار الموظفين والعمليات الميدانية ---
        "staff_portal_title": "بوابة الموظف",
        "staff_welcome_field": "مرحباً بك في الميدان",
        "staff_map_desc": "الرادار الميداني المباشر - استجب للإنذارات فوراً.",
        "staff_idle": "بانتظار بلاغات جديدة...",
        "alarm_title": "🚨 إنذار استلام جديد!",
        "alarm_body": "غرض مكتشف في:",
        "alarm_action": "توجه للموقع الآن.",
        "btn_on_my_way": "تأكيد الاستجابة",
        "btn_heading": "توجه للموقع",
        "btn_picked": "تم الاستلام",
        "btn_stored": "تم الإيداع",
        "staff_rep_header": "سجل العمليات والتقارير",
        "staff_rep_desc": "تحديث الحالات أثناء العمل الميداني.",
        "staff_assigned_items": "المهام المسندة إليك",
        "label_lost_rep": "مفقود (راكب)",
        "status_waiting_pickup": "بانتظار الاستلام",
        "opt_select_new_status": "--- اختر الحالة ---",
        "opt_received_way": "مستلم (في الطريق)",
        "opt_deposited_success": "تم الإيداع",
        "opt_delivered_to_person": "سلم للمالك",
        "btn_save_update": "حفظ التحديث",

        // --- المواقع والخرائط ---
        "zone_security": "نقطة التفتيش",
        "zone_gates": "بوابات الصعود",
        "zone_warehouse": "المستودع",
        "zone_dutyfree": "السوق الحرة",
        "map_pin_runway": "المدارج",
        "map_pin_gates": "البوابات",
        "legend_storage": "المستودع",
        "map_pin_parking": "المواقف",
        "pin_security_alert": "إنذار: التفتيش",

        // --- تذييل الصفحة ---
        "footer_desc": "نظام آمن ومنظم لإدارة المفقودات بكفاءة.",
        "footer_rights": "© 2026 جميع الحقوق محفوظة.",
        "footer_copy": "© 2026 جميع الحقوق محفوظة."
    }
};