/**
 * 7X Library Manager — Shared Components (Sidebar + Navbar)
 * Injected into every page that needs the dashboard layout.
 */

const Components = (() => {

  function getSidebar() {
    return `
    <div class="sidebar-overlay" id="sidebarOverlay"></div>
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo"><i class="fa-solid fa-book-open"></i></div>
        <div class="sidebar-brand">
          <h1>7X Library</h1>
          <span>نظام إدارة المكتبة</span>
        </div>
      </div>

      <nav class="sidebar-nav" id="sidebarNav">
        <!-- Main -->
        <div class="nav-section-label">الرئيسية</div>
        <div class="nav-item">
          <a href="../index.html" class="nav-link">
            <i class="fa-solid fa-chart-pie"></i>
            <span class="nav-link-text">لوحة التحكم</span>
          </a>
        </div>

        <!-- POS -->
        <div class="nav-section-label">نقطة البيع</div>
        <div class="nav-item">
          <a href="pos.html" class="nav-link">
            <i class="fa-solid fa-cash-register"></i>
            <span class="nav-link-text">نقطة البيع</span>
            <span class="nav-badge">مباشر</span>
          </a>
        </div>
        <div class="nav-item">
          <a href="services.html" class="nav-link">
            <i class="fa-solid fa-concierge-bell"></i>
            <span class="nav-link-text">الخدمات</span>
          </a>
        </div>

        <!-- Products -->
        <div class="nav-section-label">المنتجات</div>
        <div class="nav-item has-submenu">
          <a href="#" class="nav-link">
            <i class="fa-solid fa-boxes-stacked"></i>
            <span class="nav-link-text">المنتجات</span>
          </a>
          <div class="sub-menu">
            <div class="nav-item"><a href="products.html" class="nav-link"><i class="fa-solid fa-list"></i><span class="nav-link-text">قائمة المنتجات</span></a></div>
            <div class="nav-item"><a href="product-add.html" class="nav-link"><i class="fa-solid fa-plus"></i><span class="nav-link-text">إضافة منتج</span></a></div>
            <div class="nav-item"><a href="categories.html" class="nav-link"><i class="fa-solid fa-tags"></i><span class="nav-link-text">الأصناف</span></a></div>
            <div class="nav-item"><a href="barcode.html" class="nav-link"><i class="fa-solid fa-barcode"></i><span class="nav-link-text">ماسح الباركود</span></a></div>
          </div>
        </div>

        <!-- Purchases -->
        <div class="nav-section-label">المشتريات</div>
        <div class="nav-item has-submenu">
          <a href="#" class="nav-link">
            <i class="fa-solid fa-truck-ramp-box"></i>
            <span class="nav-link-text">المشتريات</span>
          </a>
          <div class="sub-menu">
            <div class="nav-item"><a href="purchases.html" class="nav-link"><i class="fa-solid fa-receipt"></i><span class="nav-link-text">فواتير الشراء</span></a></div>
            <div class="nav-item"><a href="purchase-add.html" class="nav-link"><i class="fa-solid fa-file-invoice"></i><span class="nav-link-text">فاتورة جديدة</span></a></div>
          </div>
        </div>

        <!-- Expenses -->
        <div class="nav-section-label">المصاريف</div>
        <div class="nav-item has-submenu">
          <a href="#" class="nav-link">
            <i class="fa-solid fa-money-bill-transfer"></i>
            <span class="nav-link-text">المصاريف</span>
          </a>
          <div class="sub-menu">
            <div class="nav-item"><a href="expenses.html" class="nav-link"><i class="fa-solid fa-list-ul"></i><span class="nav-link-text">كل المصاريف</span></a></div>
            <div class="nav-item"><a href="expense-add.html" class="nav-link"><i class="fa-solid fa-circle-plus"></i><span class="nav-link-text">إضافة مصروف</span></a></div>
          </div>
        </div>

        <!-- CRM -->
        <div class="nav-section-label">العملاء والموردين</div>
        <div class="nav-item">
          <a href="customers.html" class="nav-link">
            <i class="fa-solid fa-users"></i>
            <span class="nav-link-text">العملاء</span>
          </a>
        </div>
        <div class="nav-item">
          <a href="suppliers.html" class="nav-link">
            <i class="fa-solid fa-industry"></i>
            <span class="nav-link-text">الموردون</span>
          </a>
        </div>

        <!-- Reports -->
        <div class="nav-section-label">التقارير</div>
        <div class="nav-item has-submenu">
          <a href="#" class="nav-link">
            <i class="fa-solid fa-chart-bar"></i>
            <span class="nav-link-text">التقارير</span>
          </a>
          <div class="sub-menu">
            <div class="nav-item"><a href="reports.html" class="nav-link"><i class="fa-solid fa-chart-pie"></i><span class="nav-link-text">لوحة التقارير</span></a></div>
            <div class="nav-item"><a href="report-sales.html" class="nav-link"><i class="fa-solid fa-trending-up"></i><span class="nav-link-text">تقرير المبيعات</span></a></div>
            <div class="nav-item"><a href="report-expenses.html" class="nav-link"><i class="fa-solid fa-file-invoice-dollar"></i><span class="nav-link-text">تقرير المصاريف</span></a></div>
            <div class="nav-item"><a href="report-profit.html" class="nav-link"><i class="fa-solid fa-sack-dollar"></i><span class="nav-link-text">تقرير الأرباح</span></a></div>
            <div class="nav-item"><a href="report-inventory.html" class="nav-link"><i class="fa-solid fa-warehouse"></i><span class="nav-link-text">تقرير المخزون</span></a></div>
          </div>
        </div>

        <!-- Settings -->
        <div class="nav-section-label">الإعدادات</div>
        <div class="nav-item">
          <a href="settings.html" class="nav-link">
            <i class="fa-solid fa-gear"></i>
            <span class="nav-link-text">الإعدادات</span>
          </a>
        </div>
        <div class="nav-item">
          <a href="profile.html" class="nav-link">
            <i class="fa-solid fa-user-circle"></i>
            <span class="nav-link-text">الملف الشخصي</span>
          </a>
        </div>
        <div class="nav-item">
          <a href="activity-logs.html" class="nav-link">
            <i class="fa-solid fa-clock-rotate-left"></i>
            <span class="nav-link-text">سجل النشاط</span>
          </a>
        </div>
        <div class="nav-item">
          <a href="help.html" class="nav-link">
            <i class="fa-solid fa-circle-question"></i>
            <span class="nav-link-text">المساعدة</span>
          </a>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="user-avatar">م</div>
          <div class="user-info">
            <strong>محمد المدير</strong>
            <small>مدير النظام</small>
          </div>
        </div>
      </div>
    </aside>`;
  }

  function getNavbar(title = 'لوحة التحكم', breadcrumb = '') {
    return `
    <header class="navbar" id="navbar">
      <button class="navbar-toggle" id="navbarToggle" aria-label="تبديل القائمة الجانبية">
        <i class="fa-solid fa-bars"></i>
      </button>

      <div class="navbar-breadcrumb">
        <h1 class="page-title">${title}</h1>
        ${breadcrumb ? `<span style="color:var(--gray-300)">›</span><span>${breadcrumb}</span>` : ''}
      </div>

      <div class="navbar-search">
        <i class="fa-solid fa-search"></i>
        <input type="search" placeholder="بحث سريع..." id="globalSearch" aria-label="بحث سريع">
      </div>

      <div class="navbar-actions">
        <!-- POS Quick -->
        <a href="pages/pos.html" class="nav-action-btn gold" data-tooltip="نقطة البيع">
          <i class="fa-solid fa-cash-register"></i>
        </a>

        <!-- Notifications -->
        <div class="dropdown">
          <button class="nav-action-btn" data-dropdown="notifDropdown" id="notifBtn" aria-label="الإشعارات">
            <i class="fa-solid fa-bell"></i>
            <span class="nav-badge-dot"></span>
          </button>
          <div class="dropdown-menu" id="notifDropdown">
            <div class="dropdown-header">الإشعارات <span class="badge badge-danger" style="margin-inline-start:auto">3</span></div>
            <div class="notif-item unread">
              <div class="notif-icon" style="background:var(--danger-light);color:var(--danger)"><i class="fa-solid fa-triangle-exclamation"></i></div>
              <div>
                <div style="font-size:.85rem;font-weight:600">مخزون منخفض</div>
                <div style="font-size:.78rem;color:var(--text-muted)">قلم بيك — 3 قطع فقط</div>
              </div>
            </div>
            <div class="notif-item unread">
              <div class="notif-icon" style="background:var(--success-light);color:var(--success)"><i class="fa-solid fa-circle-check"></i></div>
              <div>
                <div style="font-size:.85rem;font-weight:600">مبيعات اليوم</div>
                <div style="font-size:.78rem;color:var(--text-muted)">تم تسجيل 12 فاتورة اليوم</div>
              </div>
            </div>
            <div class="notif-item">
              <div class="notif-icon" style="background:var(--gold-100);color:var(--gold-600)"><i class="fa-solid fa-truck"></i></div>
              <div>
                <div style="font-size:.85rem;font-weight:600">طلبية جديدة</div>
                <div style="font-size:.78rem;color:var(--text-muted)">سوبرفيض — في الطريق</div>
              </div>
            </div>
            <div style="padding:12px 16px;border-top:1px solid var(--border-color)">
              <a href="pages/activity-logs.html" style="font-size:.82rem;color:var(--primary-600);font-weight:600">عرض الكل</a>
            </div>
          </div>
        </div>

        <!-- Theme -->
        <button class="nav-action-btn" id="theme-toggle" data-tooltip="تبديل الوضع" aria-label="وضع الألوان">
          <i class="fa-solid fa-moon"></i>
        </button>

        <!-- Language -->
        <button class="nav-action-btn" id="lang-toggle" data-tooltip="اللغة" aria-label="تغيير اللغة">
          <i class="fa-solid fa-globe"></i>
        </button>

        <!-- User -->
        <div class="dropdown">
          <button class="nav-action-btn" data-dropdown="userDropdown" style="width:auto;padding:4px;border-radius:var(--radius-full)">
            <div class="avatar avatar-sm">م</div>
          </button>
          <div class="dropdown-menu" id="userDropdown" style="min-width:220px">
            <div style="padding:16px;border-bottom:1px solid var(--border-color);display:flex;gap:10px;align-items:center">
              <div class="avatar avatar-md">م</div>
              <div>
                <div style="font-weight:700;color:var(--text-primary)">محمد المدير</div>
                <div style="font-size:.78rem;color:var(--text-muted)">admin@7xlibrary.ma</div>
              </div>
            </div>
            <a href="pages/profile.html" class="dropdown-item"><i class="fa-solid fa-user"></i> الملف الشخصي</a>
            <a href="pages/settings.html" class="dropdown-item"><i class="fa-solid fa-gear"></i> الإعدادات</a>
            <div class="divider" style="margin:4px 0"></div>
            <a href="pages/login.html" class="dropdown-item" style="color:var(--danger)"><i class="fa-solid fa-sign-out-alt" style="color:var(--danger)"></i> تسجيل الخروج</a>
          </div>
        </div>
      </div>
    </header>`;
  }

  function getHead(title, extraCss = '') {
    return `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="7X Library Manager — نظام إدارة المكتبة والقرطاسية">
  <title>${title} | 7X Library Manager</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="../assets/css/variables.css">
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/layout.css">
  <link rel="stylesheet" href="../assets/css/components.css">
  ${extraCss}
</head>`;
  }

  function getScripts(extra = '') {
    return `
  <div id="toast-container"></div>
  <script src="../assets/js/data.js"><\/script>
  <script src="../assets/js/app.js"><\/script>
  ${extra}`;
  }

  return { getSidebar, getNavbar, getHead, getScripts };
})();
