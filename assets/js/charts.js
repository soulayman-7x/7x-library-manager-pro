/**
 * 7X Library Manager - Charts Module
 * Uses Chart.js loaded from CDN
 */

// Chart.js default styles aligned with app palette
function applyChartDefaults() {
  if (!window.Chart) return;

  Chart.defaults.font.family = "'Cairo', 'Tajawal', sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim() || '#4a5080';
  Chart.defaults.plugins.legend.rtl = true;
  Chart.defaults.plugins.tooltip.rtl = true;
  Chart.defaults.plugins.tooltip.bodyFont = { family: "'Cairo', 'Tajawal', sans-serif" };
  Chart.defaults.plugins.tooltip.titleFont = { family: "'Cairo', 'Tajawal', sans-serif", weight: '700' };
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 10;
  Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(13,31,78,0.90)';
  Chart.defaults.plugins.tooltip.borderColor = 'rgba(255,255,255,0.10)';
  Chart.defaults.plugins.tooltip.borderWidth = 1;
}

// ============================================================
// REVENUE CHART (Dashboard)
// ============================================================
function initRevenueChart(canvasId = 'revenueChart') {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return null;

  applyChartDefaults();

  const labels = ['يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو'];
  const salesData = [4200, 5800, 4900, 7200, 6100, 8400];
  const expensesData = [1800, 2100, 1900, 2400, 2000, 2700];

  const primary = '#1e48b3';
  const gold = '#e0aa00';

  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'المبيعات',
          data: salesData,
          borderColor: primary,
          backgroundColor: `${primary}18`,
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: primary,
          pointRadius: 4,
          pointHoverRadius: 7,
        },
        {
          label: 'المصاريف',
          data: expensesData,
          borderColor: gold,
          backgroundColor: `${gold}15`,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: gold,
          pointRadius: 4,
          pointHoverRadius: 7,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'top',
          align: 'end',
          labels: { usePointStyle: true, pointStyleWidth: 8, padding: 16, font: { size: 12, weight: '600' } }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 11 } },
          border: { display: false }
        },
        y: {
          grid: { color: '#e0e3f018', lineWidth: 1 },
          ticks: {
            callback: val => val.toLocaleString('ar-MA') + ' د',
            font: { size: 11 }
          },
          border: { display: false }
        }
      }
    }
  });

  return chart;
}

// ============================================================
// CATEGORY PIE CHART
// ============================================================
function initCategoryChart(canvasId = 'categoryChart') {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return null;

  applyChartDefaults();

  const chart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['أدوات مكتبية', 'كتب مدرسية', 'روايات', 'قواميس', 'حقائب', 'ورق'],
      datasets: [{
        data: [35, 25, 18, 10, 7, 5],
        backgroundColor: ['#1e48b3', '#e0aa00', '#1a9c6e', '#d63b3b', '#8855cc', '#1a7fb0'],
        borderWidth: 3,
        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-card').trim() || '#fff',
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { usePointStyle: true, padding: 14, font: { size: 11 } }
        }
      }
    }
  });

  return chart;
}

// ============================================================
// DAILY SALES BAR CHART
// ============================================================
function initDailySalesChart(canvasId = 'dailySalesChart') {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return null;

  applyChartDefaults();

  const days = ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'];
  const data = [520, 780, 450, 690, 830, 1200, 380];

  const chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [{
        label: 'مبيعات اليوم',
        data,
        backgroundColor: data.map((_, i) => i === 5 ? '#e0aa00' : '#1e48b318'),
        borderColor: data.map((_, i) => i === 5 ? '#c99500' : '#1e48b3'),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } }, border: { display: false } },
        y: {
          grid: { color: '#e0e3f020' },
          ticks: { callback: val => val + ' د', font: { size: 11 } },
          border: { display: false }
        }
      }
    }
  });

  return chart;
}

// ============================================================
// PROFIT LINE CHART (Reports)
// ============================================================
function initProfitChart(canvasId = 'profitChart') {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return null;

  applyChartDefaults();

  const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو'];
  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'الأرباح',
        data: [2400, 3700, 3000, 4800, 4100, 5700],
        borderColor: '#1a9c6e',
        backgroundColor: '#1a9c6e18',
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointBackgroundColor: '#1a9c6e',
        pointRadius: 5,
        pointHoverRadius: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, border: { display: false } },
        y: {
          grid: { color: '#e0e3f018' },
          ticks: { callback: val => val + ' د' },
          border: { display: false }
        }
      }
    }
  });

  return chart;
}

// ============================================================
// EXPENSES BREAKDOWN (Reports)
// ============================================================
function initExpensesChart(canvasId = 'expensesChart') {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return null;

  applyChartDefaults();

  const chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['كهرباء', 'حبر', 'إنترنت', 'ورق', 'تنظيف', 'أخرى'],
      datasets: [{
        data: [380, 250, 99, 200, 80, 150],
        backgroundColor: ['#1e48b3', '#e0aa00', '#1a9c6e', '#d63b3b', '#8855cc', '#1a7fb0'],
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: '#e0e3f018' },
          ticks: { callback: val => val + ' د', font: { size: 11 } },
          border: { display: false }
        },
        y: { grid: { display: false }, border: { display: false } }
      }
    }
  });

  return chart;
}

window.initRevenueChart = initRevenueChart;
window.initCategoryChart = initCategoryChart;
window.initDailySalesChart = initDailySalesChart;
window.initProfitChart = initProfitChart;
window.initExpensesChart = initExpensesChart;