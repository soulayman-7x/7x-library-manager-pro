<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>لوحة التحكم | 7X Library Manager</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/variables.css">
  <link rel="stylesheet" href="assets/css/base.css">
  <link rel="stylesheet" href="assets/css/layout.css">
  <link rel="stylesheet" href="assets/css/components.css">
  <link rel="stylesheet" href="assets/css/print/reports.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>

<!-- Sidebar Overlay -->
<div class="sidebar-overlay" id="sidebarOverlay"></div>

<!-- Sidebar -->
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <div class="sidebar-logo"><img src="assets/images/7x-library-logo.png" alt="7X" style="width:100%;height:100%;object-fit:contain;"></div>
    <div class="sidebar-brand"><h1>7X Library</h1><span>نظام إدارة المكتبة</span></div>
  </div>
  <nav class="sidebar-nav">
    <div class="nav-section-label">الرئيسية</div>
    <div class="nav-item"><a href="index.html" class="nav-link active"><i class="fa-solid fa-house"></i><span class="nav-link-text">لوحة التحكم</span></a></div>
    <div class="nav-section-label">نقطة البيع</div>
    <div class="nav-item"><a href="pages/pos.html" class="nav-link"><i class="fa-solid fa-cash-register"></i><span class="nav-link-text">نقطة البيع</span><span class="nav-badge">مباشر</span></a></div>
    <div class="nav-item"><a href="pages/services.html" class="nav-link"><i class="fa-solid fa-hand-holding-dollar"></i><span class="nav-link-text">الخدمات</span></a></div>
    <div class="nav-section-label">المنتجات</div>
    <div class="nav-item has-submenu">
      <a href="#" class="nav-link"><i class="fa-solid fa-cubes"></i><span class="nav-link-text">المنتجات</span></a>
      <div class="sub-menu">
        <div class="nav-item"><a href="pages/products.html" class="nav-link"><i class="fa-solid fa-table-list"></i><span class="nav-link-text">قائمة المنتجات</span></a></div>
        <div class="nav-item"><a href="pages/product-add.html" class="nav-link"><i class="fa-solid fa-circle-plus"></i><span class="nav-link-text">إضافة منتج</span></a></div>
        <div class="nav-item"><a href="pages/categories.html" class="nav-link"><i class="fa-solid fa-layer-group"></i><span class="nav-link-text">الأصناف</span></a></div>
        <div class="nav-item"><a href="pages/barcode.html" class="nav-link"><i class="fa-solid fa-barcode"></i><span class="nav-link-text">ماسح الباركود</span></a></div>
      </div>
    </div>
    <div class="nav-section-label">المشتريات</div>
    <div class="nav-item has-submenu">
      <a href="#" class="nav-link"><i class="fa-solid fa-cart-flatbed"></i><span class="nav-link-text">المشتريات</span></a>
      <div class="sub-menu">
        <div class="nav-item"><a href="pages/purchases.html" class="nav-link"><i class="fa-solid fa-receipt"></i><span class="nav-link-text">فواتير الشراء</span></a></div>
        <div class="nav-item"><a href="pages/purchase-add.html" class="nav-link"><i class="fa-solid fa-file-invoice"></i><span class="nav-link-text">فاتورة جديدة</span></a></div>
      </div>
    </div>
    <div class="nav-section-label">المصاريف</div>
    <div class="nav-item has-submenu">
      <a href="#" class="nav-link"><i class="fa-solid fa-money-bill-trend-up"></i><span class="nav-link-text">المصاريف</span></a>
      <div class="sub-menu">
        <div class="nav-item"><a href="pages/expenses.html" class="nav-link"><i class="fa-solid fa-list-ul"></i><span class="nav-link-text">كل المصاريف</span></a></div>
        <div class="nav-item"><a href="pages/expense-add.html" class="nav-link"><i class="fa-solid fa-circle-plus"></i><span class="nav-link-text">إضافة مصروف</span></a></div>
      </div>
    </div>
    <div class="nav-section-label">العملاء والموردون</div>
    <div class="nav-item"><a href="pages/customers.html" class="nav-link"><i class="fa-solid fa-user-group"></i><span class="nav-link-text">العملاء</span></a></div>
    <div class="nav-item"><a href="pages/suppliers.html" class="nav-link"><i class="fa-solid fa-building-columns"></i><span class="nav-link-text">الموردون</span></a></div>
    <div class="nav-section-label">التقارير</div>
    <div class="nav-item has-submenu">
      <a href="#" class="nav-link"><i class="fa-solid fa-chart-mixed"></i><span class="nav-link-text">التقارير</span></a>
      <div class="sub-menu">
        <div class="nav-item"><a href="pages/reports.html" class="nav-link"><i class="fa-solid fa-chart-line"></i><span class="nav-link-text">لوحة التقارير</span></a></div>
        <div class="nav-item"><a href="pages/report-sales.html" class="nav-link"><i class="fa-solid fa-arrow-trend-up"></i><span class="nav-link-text">تقرير المبيعات</span></a></div>
        <div class="nav-item"><a href="pages/report-expenses.html" class="nav-link"><i class="fa-solid fa-file-invoice-dollar"></i><span class="nav-link-text">تقرير المصاريف</span></a></div>
        <div class="nav-item"><a href="pages/report-profit.html" class="nav-link"><i class="fa-solid fa-sack-dollar"></i><span class="nav-link-text">تقرير الأرباح</span></a></div>
        <div class="nav-item"><a href="pages/report-inventory.html" class="nav-link"><i class="fa-solid fa-shelves"></i><span class="nav-link-text">تقرير المخزون</span></a></div>
      </div>
    </div>
    <div class="nav-section-label">الإعدادات</div>
    <div class="nav-item"><a href="pages/settings.html" class="nav-link"><i class="fa-solid fa-sliders"></i><span class="nav-link-text">الإعدادات</span></a></div>
    <div class="nav-item"><a href="pages/profile.html" class="nav-link"><i class="fa-solid fa-circle-user"></i><span class="nav-link-text">الملف الشخصي</span></a></div>
    <div class="nav-item"><a href="pages/activity-logs.html" class="nav-link"><i class="fa-solid fa-timeline"></i><span class="nav-link-text">سجل النشاط</span></a></div>
    <div class="nav-item"><a href="pages/help.html" class="nav-link"><i class="fa-solid fa-circle-question"></i><span class="nav-link-text">المساعدة</span></a></div>
  </nav>
  <div class="sidebar-footer">
    <div class="sidebar-user">
      <div class="user-avatar">م</div>
      <div class="user-info"><strong>محمد المدير</strong><small>مدير النظام</small></div>
    </div>
  </div>
</aside>

<!-- Main Wrapper -->
<div class="main-wrapper">
  <!-- Navbar -->
  <header class="navbar" id="navbar">
    <button class="navbar-toggle" id="navbarToggle"><i class="fa-solid fa-bars"></i></button>
    <div class="navbar-breadcrumb"><h1 class="page-title">لوحة التحكم</h1></div>
    <div class="navbar-search">
      <i class="fa-solid fa-search"></i>
      <input type="search" placeholder="بحث سريع..." id="globalSearch">
    </div>
    <div class="navbar-actions">
      <a href="pages/pos.html" class="nav-action-btn" style="color:var(--gold-500)" title="نقطة البيع"><i class="fa-solid fa-cash-register"></i></a>
      <div class="dropdown">
        <button class="nav-action-btn" data-dropdown="notifDropdown"><i class="fa-solid fa-bell"></i><span class="nav-badge-dot"></span></button>
        <div class="dropdown-menu" id="notifDropdown">
          <div class="dropdown-header">الإشعارات</div>
          <div class="notif-item unread"><div class="notif-icon" style="background:var(--danger-light);color:var(--danger)"><i class="fa-solid fa-triangle-exclamation"></i></div><div><div style="font-size:.85rem;font-weight:600">مخزون منخفض</div><div style="font-size:.78rem;color:var(--text-muted)">قلم بيك — 3 قطع</div></div></div>
          <div class="notif-item unread"><div class="notif-icon" style="background:var(--gold-100);color:var(--gold-600)"><i class="fa-solid fa-truck"></i></div><div><div style="font-size:.85rem;font-weight:600">طلبية جديدة</div><div style="font-size:.78rem;color:var(--text-muted)">سوبرفيض — في الطريق</div></div></div>
          <div style="padding:12px 16px;border-top:1px solid var(--border-color)"><a href="javascript:void(0)" onclick="openNotifsModal()" style="font-size:.82rem;color:var(--primary-600);font-weight:600">عرض الكل</a></div>
        </div>
      </div>
      <button class="nav-action-btn" id="theme-toggle" title="تبديل الوضع"><i class="fa-solid fa-moon"></i></button>
      <button class="nav-action-btn" id="lang-toggle" title="اللغة"><i class="fa-solid fa-globe"></i></button>
      <div class="dropdown">
        <button class="nav-action-btn" data-dropdown="userDropdown" style="padding:4px;border-radius:99px;width:auto"><div class="avatar avatar-sm">م</div></button>
        <div class="dropdown-menu" id="userDropdown" style="min-width:200px">
          <div style="padding:16px;border-bottom:1px solid var(--border-color);display:flex;gap:10px;align-items:center">
            <div class="avatar avatar-md">م</div>
            <div><div style="font-weight:700">محمد المدير</div><div style="font-size:.78rem;color:var(--text-muted)">admin@7xlibrary.ma</div></div>
          </div>
          <a href="pages/profile.html" class="dropdown-item"><i class="fa-solid fa-user"></i> الملف الشخصي</a>
          <a href="pages/settings.html" class="dropdown-item"><i class="fa-solid fa-gear"></i> الإعدادات</a>
          <div class="divider" style="margin:4px 0"></div>
          <a href="pages/login.html" class="dropdown-item" style="color:var(--danger)"><i class="fa-solid fa-sign-out-alt" style="color:var(--danger)"></i> تسجيل الخروج</a>
        </div>
      </div>
    </div>
  </header>

  <!-- Content -->
  <main class="main-content">

    <!-- Welcome Banner -->
    <div style="background:linear-gradient(135deg,var(--primary-700),var(--primary-500),#0ea5e9);border-radius:var(--radius-xl);padding:28px 32px;margin-bottom:28px;color:#fff;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;position:relative;overflow:hidden">
      <div style="position:absolute;right:-40px;top:-40px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,.08)"></div>
      <div style="position:absolute;left:20px;bottom:-30px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.06)"></div>
      <div style="position:relative;z-index:1">
        <h2 style="font-size:1.4rem;font-weight:800;margin-bottom:4px">مساء الخير، محمد 👋</h2>
        <p style="opacity:.85;font-size:.9rem">إليك ملخص اليوم لمكتبتك — <span id="todayDate"></span></p>
      </div>
      <div style="display:flex;gap:12px;position:relative;z-index:1;flex-wrap:wrap">
        <a href="pages/pos.html" class="btn btn-gold"><i class="fa-solid fa-cash-register"></i> بدء البيع</a>
        <a href="pages/product-add.html" class="btn" style="background:rgba(255,255,255,.2);color:#fff;backdrop-filter:blur(8px)"><i class="fa-solid fa-plus"></i> إضافة منتج</a>
      </div>
    </div>

    <!-- Stats Row -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px;margin-bottom:28px">
      <div class="stat-card stat-card-primary">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div class="stat-icon"><i class="fa-solid fa-coins"></i></div>
          <span class="badge" style="background:rgba(255,255,255,.2);color:#fff;font-size:.7rem">اليوم</span>
        </div>
        <div class="stat-label">مبيعات اليوم</div>
        <div class="stat-value" data-count="1240" data-suffix=" د.م">0</div>
        <div class="stat-trend up">زيادة 12% عن أمس</div>
      </div>
      <div class="stat-card stat-card-gold">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div class="stat-icon"><i class="fa-solid fa-sack-dollar"></i></div>
          <span class="badge" style="background:rgba(255,255,255,.2);color:#fff;font-size:.7rem">الشهر</span>
        </div>
        <div class="stat-label">الأرباح الصافية</div>
        <div class="stat-value" data-count="8420" data-suffix=" د.م">0</div>
        <div class="stat-trend up">زيادة 8% عن الشهر الماضي</div>
      </div>
      <div class="stat-card stat-card-success">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div class="stat-icon"><i class="fa-solid fa-boxes-stacked"></i></div>
        </div>
        <div class="stat-label">إجمالي المنتجات</div>
        <div class="stat-value" data-count="487">0</div>
        <div class="stat-trend up">3 منتجات جديدة اليوم</div>
      </div>
      <div class="stat-card stat-card-danger">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div class="stat-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
        </div>
        <div class="stat-label">مخزون منخفض</div>
        <div class="stat-value" data-count="5">0</div>
        <div class="stat-trend down">تحتاج إعادة الطلب</div>
      </div>
      <div class="stat-card">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div class="stat-icon"><i class="fa-solid fa-users"></i></div>
        </div>
        <div class="stat-label">العملاء</div>
        <div class="stat-value" data-count="124">0</div>
        <div class="stat-trend up">+3 هذا الأسبوع</div>
      </div>
      <div class="stat-card">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div class="stat-icon" style="background:var(--danger-light);color:var(--danger)"><i class="fa-solid fa-money-bill-transfer"></i></div>
        </div>
        <div class="stat-label">مصاريف اليوم</div>
        <div class="stat-value" data-count="310" data-suffix=" د.م">0</div>
        <div class="stat-trend down">ارتفاع 5%</div>
      </div>
    </div>

    <!-- Charts + Quick Actions -->
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-bottom:24px">
      <!-- Revenue Chart -->
      <div class="card">
        <div class="card-header">
          <div><div class="card-title">مبيعات الأسبوع</div><div class="card-subtitle">إجمالي الإيرادات خلال 7 أيام</div></div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-sm btn-outline-primary" onclick="switchChart('week')" id="btnWeek">أسبوع</button>
            <button class="btn btn-sm btn-ghost" onclick="switchChart('month')" id="btnMonth">شهر</button>
          </div>
        </div>
        <div class="card-body">
          <div class="chart-container" style="height:260px"><canvas id="revenueChart"></canvas></div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card">
        <div class="card-header"><div class="card-title">إجراءات سريعة</div></div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:10px">
          <a href="pages/pos.html" class="btn btn-primary btn-full"><i class="fa-solid fa-cash-register"></i> نقطة البيع</a>
          <a href="pages/product-add.html" class="btn btn-outline-primary btn-full"><i class="fa-solid fa-plus"></i> إضافة منتج</a>
          <a href="pages/expense-add.html" class="btn btn-outline-primary btn-full"><i class="fa-solid fa-money-bill-wave"></i> تسجيل مصروف</a>
          <a href="pages/services.html" class="btn btn-gold btn-full"><i class="fa-solid fa-concierge-bell"></i> الخدمات</a>
          <a href="pages/purchase-add.html" class="btn btn-outline-primary btn-full"><i class="fa-solid fa-file-invoice"></i> فاتورة شراء</a>
          <a href="pages/reports.html" class="btn btn-ghost btn-full"><i class="fa-solid fa-chart-bar"></i> التقارير</a>
        </div>
      </div>
    </div>

    <!-- Category Distribution + Low Stock -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px">
      <!-- Category Doughnut -->
      <div class="card">
        <div class="card-header"><div class="card-title">توزيع الأصناف</div></div>
        <div class="card-body" style="display:flex;align-items:center;gap:24px;flex-wrap:wrap">
          <div style="width:160px;height:160px;flex-shrink:0"><canvas id="categoryChart"></canvas></div>
          <div style="flex:1;min-width:140px" id="catLegend"></div>
        </div>
      </div>

      <!-- Low Stock -->
      <div class="card">
        <div class="card-header">
          <div><div class="card-title">تنبيه المخزون</div></div>
          <a href="pages/report-inventory.html" class="btn btn-sm btn-outline-primary">عرض الكل</a>
        </div>
        <div class="card-body" style="padding:0">
          <div id="lowStockList"></div>
        </div>
      </div>
    </div>

    <!-- Recent Sales -->
    <div class="card">
      <div class="card-header">
        <div><div class="card-title">آخر المبيعات</div><div class="card-subtitle">أحدث 6 فواتير</div></div>
        <a href="pages/report-sales.html" class="btn btn-sm btn-outline-primary">عرض الكل</a>
      </div>
      <div class="table-wrapper" style="border:none;border-radius:0">
        <table class="table">
          <thead>
            <tr>
              <th>رقم الفاتورة</th><th>العميل</th><th>التاريخ</th>
              <th>المبلغ</th><th>الحالة</th><th>الإجراءات</th>
            </tr>
          </thead>
          <tbody id="recentSalesBody"></tbody>
        </table>
      </div>
    </div>

</main>
</div>

<!-- All Notifications Modal -->
<div class="modal-overlay" id="allNotifsModal" onclick="closeNotifsModal()">
  <div class="modal" onclick="event.stopPropagation()" style="background: var(--bg-card); max-width: 500px;">
    <div class="modal-header" style="border-bottom: 1px solid var(--border-color);">
      <div style="display:flex; align-items:center; gap: 12px;">
        <div class="stat-icon" style="background:var(--primary-light); color:var(--primary-600); width:40px; height:40px; font-size:1.1rem;"><i class="fa-solid fa-bell"></i></div>
        <h3 class="modal-title" style="font-size:1.2rem;">كل الإشعارات</h3>
      </div>
      <button class="modal-close" onclick="closeNotifsModal()"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="modal-body" style="padding: 0;">
      <div style="max-height: 400px; overflow-y: auto;">
        <div class="notif-item unread" style="padding:16px 20px; border-bottom:1px solid var(--border-color);">
          <div class="notif-icon" style="background:var(--danger-light);color:var(--danger);width:40px;height:40px;font-size:1rem;"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <div style="flex:1;">
            <div style="font-size:.95rem;font-weight:700;">مخزون منخفض</div>
            <div style="font-size:.85rem;color:var(--text-muted);margin-top:2px;">قلم بيك كريستال أزرق — متبقي 3 قطع فقط في المخزون.</div>
            <div style="font-size:.75rem;color:var(--text-secondary);margin-top:6px;"><i class="fa-regular fa-clock"></i> منذ 10 دقائق</div>
          </div>
        </div>
        <div class="notif-item unread" style="padding:16px 20px; border-bottom:1px solid var(--border-color);">
          <div class="notif-icon" style="background:var(--gold-100);color:var(--gold-600);width:40px;height:40px;font-size:1rem;"><i class="fa-solid fa-truck"></i></div>
          <div style="flex:1;">
            <div style="font-size:.95rem;font-weight:700;">طلبية جديدة في الطريق</div>
            <div style="font-size:.85rem;color:var(--text-muted);margin-top:2px;">طلبية المورد "سوبرفيض" رقم PO-2004 تم شحنها.</div>
            <div style="font-size:.75rem;color:var(--text-secondary);margin-top:6px;"><i class="fa-regular fa-clock"></i> منذ 1 ساعة</div>
          </div>
        </div>
        <div class="notif-item" style="padding:16px 20px; border-bottom:1px solid var(--border-color);">
          <div class="notif-icon" style="background:var(--success-light);color:var(--success);width:40px;height:40px;font-size:1rem;"><i class="fa-solid fa-check-double"></i></div>
          <div style="flex:1;">
            <div style="font-size:.95rem;font-weight:700;">تم اكتمال الدفع</div>
            <div style="font-size:.85rem;color:var(--text-muted);margin-top:2px;">تم سداد فاتورة المبيعات INV-1030 بنجاح.</div>
            <div style="font-size:.75rem;color:var(--text-secondary);margin-top:6px;"><i class="fa-regular fa-clock"></i> منذ 3 ساعات</div>
          </div>
        </div>
        <div class="notif-item" style="padding:16px 20px;">
          <div class="notif-icon" style="background:var(--primary-100);color:var(--primary-600);width:40px;height:40px;font-size:1rem;"><i class="fa-solid fa-user-plus"></i></div>
          <div style="flex:1;">
            <div style="font-size:.95rem;font-weight:700;">عميل جديد</div>
            <div style="font-size:.85rem;color:var(--text-muted);margin-top:2px;">تم تسجيل العميل "يوسف الإدريسي" في النظام.</div>
            <div style="font-size:.75rem;color:var(--text-secondary);margin-top:6px;"><i class="fa-regular fa-clock"></i> أمس</div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer" style="padding:12px 20px; justify-content:space-between;">
      <button class="btn btn-ghost btn-sm" onclick="Toast.success('تم تحديد الكل كمقروء')"><i class="fa-solid fa-check-double"></i> تحديد الكل كمقروء</button>
      <button class="btn btn-primary" onclick="closeNotifsModal()">إغلاق</button>
    </div>
  </div>
</div>

<!-- View Sale Invoice Modal -->
<div class="modal-overlay" id="viewSaleModal" onclick="closeSaleModal()">
  <div class="modal modal-lg" onclick="event.stopPropagation()" style="background: var(--bg-card);">
    <div class="modal-header" style="border-bottom: 1px solid var(--border-color); padding-bottom: 15px;">
      <div style="display:flex; align-items:center; gap: 12px;">
        <div class="stat-icon" style="background:var(--primary-light); color:var(--primary-600); width:40px; height:40px; font-size:1.1rem;"><i class="fa-solid fa-file-invoice"></i></div>
        <div>
          <h3 class="modal-title" id="vs-title" style="font-size:1.2rem; margin-bottom:2px;">تفاصيل الفاتورة</h3>
          <div style="font-size:0.8rem; color:var(--text-muted);" id="vs-date"></div>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap: 12px;">
        <span id="vs-status-badge"></span>
        <button class="btn btn-ghost btn-icon" onclick="printFromSaleView()"><i class="fa-solid fa-print"></i></button>
        <button class="modal-close" onclick="closeSaleModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
    
    <div class="modal-body" style="padding: 24px;">
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
        <div style="background: var(--bg-body); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:4px;">العميل</div>
          <div style="font-size:1.1rem; font-weight:700; color:var(--text-primary);" id="vs-customer"></div>
        </div>
        <div style="background: var(--bg-body); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:4px;">البائع</div>
          <div style="font-size:1.1rem; font-weight:700; color:var(--text-primary);">مكتبة 7X</div>
        </div>
      </div>
      
      <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow:hidden;">
        <table class="table" style="margin:0;">
          <thead style="background: var(--bg-body);">
            <tr>
              <th style="padding:12px 16px;">البيان</th>
              <th style="text-align:center; padding:12px 16px;">الكمية</th>
              <th style="text-align:left; padding:12px 16px;">الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:16px;">مشتريات العميل (مبيعات متنوعة)</td>
              <td style="text-align:center; padding:16px;">1</td>
              <td style="text-align:left; padding:16px; font-weight:700;" id="vs-row-total"></td>
            </tr>
          </tbody>
        </table>
        
        <div style="background: var(--bg-body); padding: 16px; border-top: 1px solid var(--border-color); display:flex; justify-content:flex-end;">
          <div style="width: 300px;">
            <div style="display:flex; justify-content:space-between; font-size:1.1rem;">
              <span>المبلغ الإجمالي</span>
              <span style="font-weight:800;" id="vs-total"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div id="toast-container"></div>
<script src="assets/js/data.js"></script>
<script src="assets/js/app.js"></script>
<script src="assets/js/print/print-manager.js"></script>
<script src="assets/js/print/report-generator.js"></script>
<script>
// Today date
document.getElementById('todayDate').textContent = new Date().toLocaleDateString('ar-MA',{weekday:'long',year:'numeric',month:'long',day:'numeric'});

// Init counters
let currentViewSale = null;

function openNotifsModal() {
  const dd = document.getElementById('notifDropdown');
  if(dd) dd.classList.remove('open');
  document.getElementById('allNotifsModal').classList.add('open');
}

function closeNotifsModal() {
  document.getElementById('allNotifsModal').classList.remove('open');
}

function openSaleModal(invoiceNo, customerName, date, total, status) {
  currentViewSale = {invoiceNo, customerName, date, total, status};
  document.getElementById('vs-title').innerText = `فاتورة ${invoiceNo}`;
  document.getElementById('vs-date').innerText = `تاريخ الإصدار: ${date}`;
  document.getElementById('vs-customer').innerText = customerName;
  
  const isPaid = status === 'paid';
  const badge = document.getElementById('vs-status-badge');
  badge.className = `badge ${isPaid ? 'badge-success' : 'badge-warning'}`;
  badge.innerHTML = `<i class="fa-solid ${isPaid ? 'fa-check-circle' : 'fa-clock'}"></i> ${isPaid ? 'مدفوعة' : 'جزئي'}`;
  
  const totalStr = parseFloat(total).toLocaleString('fr-MA') + ' د.م';
  document.getElementById('vs-row-total').innerText = totalStr;
  document.getElementById('vs-total').innerText = totalStr;
  
  document.getElementById('viewSaleModal').classList.add('open');
}

function closeSaleModal() {
  document.getElementById('viewSaleModal').classList.remove('open');
}

function printFromSaleView() {
  if(currentViewSale) {
    ReportGenerator.generateSaleInvoice(
      currentViewSale.invoiceNo, 
      currentViewSale.customerName, 
      currentViewSale.date, 
      currentViewSale.total, 
      currentViewSale.status
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  App.initCounters();

  // Professional area/line revenue chart
  Chart.defaults.font.family = "'Cairo','Inter',sans-serif";
  const ctx = document.getElementById('revenueChart').getContext('2d');
  const chartData = DataStore.getSalesChartData();
  const gradient = ctx.createLinearGradient(0, 0, 0, 260);
  gradient.addColorStop(0, 'rgba(99,102,241,.18)');
  gradient.addColorStop(1, 'rgba(99,102,241,.0)');
  const revenueChart = new Chart(ctx, {
    type:'line',
    data:{
      labels: chartData.map(d=>d.label),
      datasets:[{
        label:'الإيرادات',
        data: chartData.map(d=>d.revenue),
        borderColor:'#6366f1',
        borderWidth: 2.5,
        backgroundColor: gradient,
        fill: true,
        tension: 0.45,
        pointRadius: 3,
        pointBackgroundColor:'#6366f1',
        pointBorderColor:'#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 5
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      interaction:{ mode:'index', intersect:false },
      plugins:{
        legend:{display:false},
        tooltip:{ backgroundColor:'rgba(9,9,18,.92)', titleColor:'#fff', bodyColor:'rgba(255,255,255,.7)', padding:12, cornerRadius:8, borderColor:'rgba(255,255,255,.08)', borderWidth:1, callbacks:{label:c=>`${c.parsed.y.toLocaleString('fr-MA')} د.م`} }
      },
      scales:{
        x:{ grid:{display:false}, border:{display:false}, ticks:{color:'#9ca3af',font:{size:10}} },
        y:{ grid:{color:'rgba(0,0,0,.04)',drawBorder:false}, border:{display:false}, ticks:{color:'#9ca3af',font:{size:10},callback:v=>v+'د.م'} }
      }
    }
  });

  window.switchChart = function(mode) {
    document.getElementById('btnWeek').className = mode==='week'?'btn btn-sm btn-outline-primary':'btn btn-sm btn-ghost';
    document.getElementById('btnMonth').className = mode==='month'?'btn btn-sm btn-outline-primary':'btn btn-sm btn-ghost';
    const newData = mode==='week' ? chartData : chartData.map(d=>({...d,revenue:d.revenue*4.3}));
    revenueChart.data.datasets[0].data = newData.map(d=>d.revenue);
    revenueChart.update('active');
  };

  // Category Doughnut
  const cats = DataStore.categories;
  const catCtx = document.getElementById('categoryChart').getContext('2d');
  new Chart(catCtx,{
    type:'doughnut',
    data:{
      labels:cats.map(c=>c.name),
      datasets:[{data:cats.map(c=>c.count),backgroundColor:cats.map(c=>c.color),borderWidth:3,borderColor:'var(--bg-card)',hoverOffset:6}]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{rtl:true}}
    }
  });

  // Category Legend
  const legend = document.getElementById('catLegend');
  legend.innerHTML = cats.map(c=>`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
      <span style="width:12px;height:12px;border-radius:3px;background:${c.color};flex-shrink:0"></span>
      <span style="font-size:.82rem;color:var(--text-primary);flex:1">${c.name}</span>
      <span style="font-size:.82rem;font-weight:700;color:var(--text-secondary)">${c.count}</span>
    </div>`).join('');

  // Low Stock
  const lowStock = DataStore.products.filter(p=>p.stock<=10);
  document.getElementById('lowStockList').innerHTML = lowStock.map(p=>`
    <div style="display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border-color)">
      <div style="width:36px;height:36px;background:${p.stock===0?'var(--danger-light)':'var(--warning-light)'};border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;color:${p.stock===0?'var(--danger)':'var(--warning)'}">
        <i class="fa-solid fa-box"></i>
      </div>
      <div style="flex:1">
        <div style="font-size:.875rem;font-weight:600;color:var(--text-primary)">${p.name}</div>
        <div style="font-size:.78rem;color:var(--text-muted)">${p.category}</div>
      </div>
      <div>
        <span class="badge ${p.stock===0?'badge-danger':'badge-warning'}">${p.stock===0?'نفذ':'متبقي: '+p.stock}</span>
      </div>
    </div>`).join('');

  // Recent Sales
  const recent = DataStore.sales.slice(-6).reverse();
  document.getElementById('recentSalesBody').innerHTML = recent.map(s=>`
    <tr>
      <td><span style="font-weight:700;color:var(--primary-600);font-size:.8125rem">${s.invoiceNo}</span></td>
      <td style="font-size:.8125rem">${s.customerName}</td>
      <td style="color:var(--text-muted);font-size:.78rem">${s.date}</td>
      <td><strong>${s.total.toLocaleString('fr-MA')} د.م</strong></td>
      <td><span class="badge ${s.status==='paid'?'badge-success':'badge-warning'} badge-dot">${s.status==='paid'?'مدفوع':'جزئي'}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn btn-sm btn-outline-primary btn-icon" title="عرض" onclick="openSaleModal('${s.invoiceNo}', '${s.customerName}', '${s.date}', ${s.total}, '${s.status}')"><i class="fa-solid fa-eye"></i></button>
          <button class="btn btn-sm btn-ghost btn-icon" title="طباعة" onclick="ReportGenerator.generateSaleInvoice('${s.invoiceNo}', '${s.customerName}', '${s.date}', ${s.total}, '${s.status}')"><i class="fa-solid fa-print"></i></button>
        </div>
      </td>
    </tr>`).join('');
});
</script>
</body>
</html>

