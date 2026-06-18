/**
 * 7X Library Manager — Core Application Module
 * Handles theme, sidebar, layout, global state, and utilities.
 */

const App = (() => {
  // ── State ──────────────────────────────────────
  let state = {
    theme: localStorage.getItem('7x_theme') || 'light',
    lang:  localStorage.getItem('7x_lang')  || 'ar',
    sidebarCollapsed: localStorage.getItem('7x_sidebar') === 'true',
    currency: 'MAD',
    currencySymbol: 'د.م'
  };

  // ── Init ───────────────────────────────────────
  function init() {
    applyTheme(state.theme);
    applyLang(state.lang);
    initSidebar();
    initNavbar();
    initDropdowns();
    initModals();
    markActiveNav();
    initTooltips();
    console.log('%c7X Library Manager%c v1.0', 'color:#1d4ed8;font-weight:800;font-size:14px', 'color:#9ca3af;font-size:12px');
  }

  // ── Theme ──────────────────────────────────────
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('7x_theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.querySelector('i').className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }

  function toggleTheme() {
    applyTheme(state.theme === 'light' ? 'dark' : 'light');
  }

  // ── Language / Direction ───────────────────────
  function applyLang(lang) {
    state.lang = lang;
    document.body.classList.toggle('ltr', lang !== 'ar');
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('7x_lang', lang);
  }

  function toggleLang() {
    applyLang(state.lang === 'ar' ? 'fr' : 'ar');
    location.reload();
  }

  // ── Sidebar ────────────────────────────────────
  function initSidebar() {
    const sidebar  = document.querySelector('.sidebar');
    const overlay  = document.querySelector('.sidebar-overlay');
    const toggleBtn = document.querySelector('.navbar-toggle');
    if (!sidebar) return;

    // Apply saved collapsed state (desktop only)
    if (window.innerWidth > 1024 && state.sidebarCollapsed) {
      sidebar.classList.add('collapsed');
    }

    // Sub-menus
    sidebar.querySelectorAll('.nav-item.has-submenu > .nav-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const item = link.closest('.nav-item');
        const wasOpen = item.classList.contains('open');
        sidebar.querySelectorAll('.nav-item.has-submenu').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });

    // Toggle (desktop: collapse, mobile: open)
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          sidebar.classList.toggle('mobile-open');
          overlay && overlay.classList.toggle('show');
        } else {
          sidebar.classList.toggle('collapsed');
          state.sidebarCollapsed = sidebar.classList.contains('collapsed');
          localStorage.setItem('7x_sidebar', state.sidebarCollapsed);
        }
      });
    }

    // Overlay close
    if (overlay) {
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('show');
      });
    }

    // Resize handler
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        sidebar.classList.remove('mobile-open');
        overlay && overlay.classList.remove('show');
      }
    });
  }

  // ── Navbar ─────────────────────────────────────
  function initNavbar() {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.addEventListener('click', toggleLang);
  }

  // ── Dropdowns ──────────────────────────────────
  function initDropdowns() {
    document.querySelectorAll('[data-dropdown]').forEach(trigger => {
      const menuId = trigger.getAttribute('data-dropdown');
      const menu   = document.getElementById(menuId);
      if (!menu) return;

      trigger.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = menu.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) menu.classList.add('open');
      });
    });

    document.addEventListener('click', closeAllDropdowns);
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
  }

  // ── Modals ─────────────────────────────────────
  function initModals() {
    // Open
    document.querySelectorAll('[data-modal]').forEach(btn => {
      btn.addEventListener('click', () => openModal(btn.getAttribute('data-modal')));
    });

    // Close
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const overlay = btn.closest('.modal-overlay');
        if (overlay) closeModal(overlay.id);
      });
    });

    // Click outside
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal(overlay.id);
      });
    });

    // Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
      }
    });
  }

  function openModal(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // ── Active Nav ─────────────────────────────────
  function markActiveNav() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[href]').forEach(link => {
      const href = link.getAttribute('href').split('/').pop();
      if (href === current) {
        link.classList.add('active');
        const submenu = link.closest('.nav-item');
        if (submenu) submenu.classList.add('open');
        const parentItem = submenu?.closest('.sub-menu')?.closest('.nav-item');
        if (parentItem) {
          parentItem.classList.add('open');
          parentItem.querySelector('.nav-link')?.classList.add('active');
        }
      }
    });
  }

  // ── Tooltips ───────────────────────────────────
  function initTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(el => {
      const text = el.getAttribute('data-tooltip');
      el.classList.add('tooltip-wrap');
      const tip = document.createElement('div');
      tip.className = 'tooltip';
      tip.textContent = text;
      el.appendChild(tip);
    });
  }

  // ── Tabs ───────────────────────────────────────
  function initTabs(containerSelector = '[data-tabs]') {
    document.querySelectorAll(containerSelector).forEach(container => {
      const btnId = container.getAttribute('data-tabs');
      container.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-tab');
          container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
          container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
          btn.classList.add('active');
          document.getElementById(target)?.classList.add('active');
        });
      });
    });
  }

  // ── Format Utilities ───────────────────────────
  function formatCurrency(amount, sym = state.currencySymbol) {
    return `${Number(amount).toLocaleString('fr-MA', { minimumFractionDigits: 2 })} ${sym}`;
  }

  function formatDate(date, locale = 'ar-MA') {
    return new Date(date).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function formatNumber(n) {
    return Number(n).toLocaleString('fr-MA');
  }

  // ── Animated Counter ───────────────────────────
  function animateCounter(el, target, duration = 1200) {
    const start = 0;
    const startTime = performance.now();
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(start + (target - start) * eased);
      el.textContent = prefix + formatNumber(value) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  function initCounters() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-count') || 0);
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
  }

  // ── Expose Public API ──────────────────────────
  return {
    init, state,
    openModal, closeModal,
    toggleTheme, toggleLang,
    initTabs, initCounters,
    formatCurrency, formatDate, formatNumber
  };
})();

// Auto-init on DOM ready
document.addEventListener('DOMContentLoaded', () => App.init());