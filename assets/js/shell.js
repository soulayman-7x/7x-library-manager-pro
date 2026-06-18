/**
 * 7X Library Manager — Reusable Page Shell Generator
 * Generates sidebar + navbar HTML for subpages (pages/ directory)
 */

function buildPageShell(title, pageId) {
  return `
<div class="sidebar-overlay" id="sidebarOverlay"></div>
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <div class="sidebar-logo"><i class="fa-solid fa-book-open"></i></div>
    <div class="sidebar-brand"><h1>7X Library</h1><span>نظام إدارة المكتبة</span></div>
  </div>
  <nav class="sidebar-nav">
    <div class="nav-section-label">الرئيسية</div>
    <div class="nav-item"><a href="../index.html" class="nav-link" data-page="dashboard"><i class="fa-solid fa-chart-pie"></i><span class="nav-link-text">لوحة التحكم</span></a></div>
    <div class="nav-section-label">نقطة البيع</div>
    <div class="nav-item"><a href="pos.html" class="nav-link" data-page="pos"><i class="fa-solid fa-cash-register"></i><span class="nav-link-text">نقطة البيع</span><span class="nav-badge">مباشر</span></a></div>
    <div class="nav-item"><a href="services.html" class="nav-link" data-page="services"><i class="fa-solid fa-concierge-bell"></i><span class="nav-link-text">الخدمات</span></a></div>
    <div class="nav-section-label">المنتجات</div>
    <div class="nav-item has-submenu ${['products','product-add','product-edit','product-details','categories','barcode'].includes(pageId)?'open':''}">
      <a href="#" class="nav-link ${['products','product-add','product-edit','product-details','categories','barcode'].includes(pageId)?'active':''}">
        <i class="fa-solid fa-boxes-stacked"></i><span class="nav-link-text">المنتجات</span>
      </a>
      <div class="sub-menu">
        <div class="nav-item"><a href="products.html" class="nav-link" data-page="products"><i class="fa-solid fa-list"></i><span class="nav-link-text">قائمة المنتجات</span></a></div>
        <div class="nav-item"><a href="product-add.html" class="nav-link" data-page="product-add"><i class="fa-solid fa-plus"></i><span class="nav-link-text">إضافة منتج</span></a></div>
        <div class="nav-item"><a href="categories.html" class="nav-link" data-page="categories"><i class="fa-solid fa-tags"></i><span class="nav-link-text">الأصناف</span></a></div>
        <div class="nav-item"><a href="barcode.html" class="nav-link" data-page="barcode"><i class="fa-solid fa-barcode"></i><span class="nav-link-text">ماسح الباركود</span></a></div>
      </div>
    </div>
    <div class="nav-section-label">المشتريات</div>
    <div class="nav-item has-submenu ${['purchases','purchase-add'].includes(pageId)?'open':''}">
      <a href="#" class="nav-link"><i class="fa-solid fa-truck-ramp-box"></i><span class="nav-link-text">المشتريات</span></a>
      <div class="sub-menu">
        <div class="nav-item"><a href="purchases.html" class="nav-link" data-page="purchases"><i class="fa-solid fa-receipt"></i><span class="nav-link-text">فواتير الشراء</span></a></div>
        <div class="nav-item"><a href="purchase-add.html" class="nav-link" data-page="purchase-add"><i class="fa-solid fa-file-invoice"></i><span class="nav-link-text">فاتورة جديدة</span></a></div>
      </div>
    </div>
    <div class="nav-section-label">المصاريف</div>
    <div class="nav-item has-submenu ${['expenses','expense-add'].includes(pageId)?'open':''}">
      <a href="#" class="nav-link"><i class="fa-solid fa-money-bill-transfer"></i><span class="nav-link-text">المصاريف</span></a>
      <div class="sub-menu">
        <div class="nav-item"><a href="expenses.html" class="nav-link" data-page="expenses"><i class="fa-solid fa-list-ul"></i><span class="nav-link-text">كل المصاريف</span></a></div>
        <div class="nav-item"><a href="expense-add.html" class="nav-link" data-page="expense-add"><i class="fa-solid fa-circle-plus"></i><span class="nav-link-text">إضافة مصروف</span></a></div>
      </div>
    </div>
    <div class="nav-section-label">العملاء والموردون</div>
    <div class="nav-item"><a href="customers.html" class="nav-link" data-page="customers"><i class="fa-solid fa-users"></i><span class="nav-link-text">العملاء</span></a></div>
    <div class="nav-item"><a href="suppliers.html" class="nav-link" data-page="suppliers"><i class="fa-solid fa-industry"></i><span class="nav-link-text">الموردون</span></a></div>
    <div class="nav-section-label">التقارير</div>
    <div class="nav-item has-submenu ${['reports','report-sales','report-expenses','report-profit','report-inventory'].includes(pageId)?'open':''}">
      <a href="#" class="nav-link"><i class="fa-solid fa-chart-bar"></i><span class="nav-link-text">التقارير</span></a>
      <div class="sub-menu">
        <div class="nav-item"><a href="reports.html" class="nav-link" data-page="reports"><i class="fa-solid fa-chart-pie"></i><span class="nav-link-text">لوحة التقارير</span></a></div>
        <div class="nav-item"><a href="report-sales.html" class="nav-link" data-page="report-sales"><i class="fa-solid fa-arrow-trend-up"></i><span class="nav-link-text">تقرير المبيعات</span></a></div>
        <div class="nav-item"><a href="report-expenses.html" class="nav-link" data-page="report-expenses"><i class="fa-solid fa-file-invoice-dollar"></i><span class="nav-link-text">تقرير المصاريف</span></a></div>
        <div class="nav-item"><a href="report-profit.html" class="nav-link" data-page="report-profit"><i class="fa-solid fa-sack-dollar"></i><span class="nav-link-text">تقرير الأرباح</span></a></div>
        <div class="nav-item"><a href="report-inventory.html" class="nav-link" data-page="report-inventory"><i class="fa-solid fa-warehouse"></i><span class="nav-link-text">تقرير المخزون</span></a></div>
      </div>
    </div>
    <div class="nav-section-label">الإعدادات</div>
    <div class="nav-item"><a href="settings.html" class="nav-link" data-page="settings"><i class="fa-solid fa-gear"></i><span class="nav-link-text">الإعدادات</span></a></div>
    <div class="nav-item"><a href="profile.html" class="nav-link" data-page="profile"><i class="fa-solid fa-user-circle"></i><span class="nav-link-text">الملف الشخصي</span></a></div>
    <div class="nav-item"><a href="activity-logs.html" class="nav-link" data-page="activity-logs"><i class="fa-solid fa-clock-rotate-left"></i><span class="nav-link-text">سجل النشاط</span></a></div>
    <div class="nav-item"><a href="help.html" class="nav-link" data-page="help"><i class="fa-solid fa-circle-question"></i><span class="nav-link-text">المساعدة</span></a></div>
  </nav>
  <div class="sidebar-footer">
    <div class="sidebar-user">
      <div class="user-avatar">م</div>
      <div class="user-info"><strong>محمد المدير</strong><small>مدير النظام</small></div>
    </div>
  </div>
</aside>

<div class="main-wrapper">
  <header class="navbar" id="navbar">
    <button class="navbar-toggle" id="navbarToggle"><i class="fa-solid fa-bars"></i></button>
    <div class="navbar-breadcrumb">
      <a href="../index.html" style="color:var(--text-muted);font-size:.85rem">الرئيسية</a>
      <span style="color:var(--gray-300);margin:0 4px">›</span>
      <h1 class="page-title">${title}</h1>
    </div>
    <div class="navbar-search">
      <i class="fa-solid fa-search"></i>
      <input type="search" placeholder="بحث سريع..." id="globalSearch">
    </div>
    <div class="navbar-actions">
      <a href="pos.html" class="nav-action-btn" style="color:var(--gold-500)" title="نقطة البيع"><i class="fa-solid fa-cash-register"></i></a>
      <div class="dropdown">
        <button class="nav-action-btn" data-dropdown="notifDropdown"><i class="fa-solid fa-bell"></i><span class="nav-badge-dot"></span></button>
        <div class="dropdown-menu" id="notifDropdown">
          <div class="dropdown-header">الإشعارات</div>
          <div class="notif-item unread"><div class="notif-icon" style="background:var(--danger-light);color:var(--danger)"><i class="fa-solid fa-triangle-exclamation"></i></div><div><div style="font-size:.85rem;font-weight:600">مخزون منخفض</div><div style="font-size:.78rem;color:var(--text-muted)">قلم بيك — 3 قطع</div></div></div>
          <div style="padding:12px 16px;border-top:1px solid var(--border-color)"><a href="activity-logs.html" style="font-size:.82rem;color:var(--primary-600);font-weight:600">عرض الكل</a></div>
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
          <a href="profile.html" class="dropdown-item"><i class="fa-solid fa-user"></i> الملف الشخصي</a>
          <a href="settings.html" class="dropdown-item"><i class="fa-solid fa-gear"></i> الإعدادات</a>
          <div class="divider" style="margin:4px 0"></div>
          <a href="login.html" class="dropdown-item" style="color:var(--danger)"><i class="fa-solid fa-sign-out-alt" style="color:var(--danger)"></i> تسجيل الخروج</a>
        </div>
      </div>
    </div>
  </header>
  <main class="main-content" id="pageContent">`;
}

function buildPageFooter(extraScript = '') {
  return `
  </main>
</div>
<div id="toast-container"></div>
<script src="../assets/js/data.js"><\/script>
<script src="../assets/js/app.js"><\/script>
${extraScript}`;
}

// Mark active nav after load
document.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname.split('/').pop().replace('.html','');
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.getAttribute('data-page') === page) {
      link.classList.add('active');
      link.closest('.has-submenu')?.classList.add('open');
    }
  });
});
