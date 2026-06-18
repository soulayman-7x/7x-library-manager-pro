/**
 * 7X Library Manager — Toast Notification System
 */
const Toast = (() => {
  let container;

  function getContainer() {
    if (!container) {
      container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
      }
    }
    return container;
  }

  const icons = {
    success: 'fa-solid fa-circle-check',
    error:   'fa-solid fa-circle-xmark',
    warning: 'fa-solid fa-triangle-exclamation',
    info:    'fa-solid fa-circle-info'
  };

  function show({ type = 'info', title = '', message = '', duration = 4000 }) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="${icons[type]} toast-icon"></i>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="Toast.remove(this.closest('.toast'))">
        <i class="fa-solid fa-xmark"></i>
      </button>`;

    getContainer().appendChild(toast);

    if (duration > 0) {
      setTimeout(() => remove(toast), duration);
    }
    return toast;
  }

  function remove(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.add('removing');
    setTimeout(() => toast.parentNode && toast.parentNode.removeChild(toast), 300);
  }

  return {
    show,
    remove,
    success: (msg, title = 'تمت العملية بنجاح')  => show({ type: 'success', title, message: msg }),
    error:   (msg, title = 'حدث خطأ')            => show({ type: 'error',   title, message: msg }),
    warning: (msg, title = 'تنبيه')               => show({ type: 'warning', title, message: msg }),
    info:    (msg, title = 'معلومة')               => show({ type: 'info',    title, message: msg })
  };
})();

/**
 * 7X Library Manager — Sample Data Store
 * Simulates a backend database for demo purposes.
 * Replace with PHP/MySQL API calls in production.
 */
const DataStore = (() => {

  // ── Products ───────────────────────────────────
  const products = [
    { id:1, name:'كراسة مسطرة 96 ورقة', barcode:'6111000001', category:'كراسات', buyPrice:4.5, sellPrice:7, stock:150, unit:'قطعة', supplier:'سوبرفيض', image:'', status:'active' },
    { id:2, name:'قلم بيك كريستال أزرق', barcode:'6111000002', category:'أقلام', buyPrice:1.2, sellPrice:2, stock:8, unit:'قطعة', supplier:'بيك المغرب', image:'', status:'active' },
    { id:3, name:'ورق تصوير A4 (رزمة 500)', barcode:'6111000003', category:'ورق', buyPrice:28, sellPrice:40, stock:32, unit:'رزمة', supplier:'سوبرفيض', image:'', status:'active' },
    { id:4, name:'محبرة بيلوت G2', barcode:'6111000004', category:'أقلام', buyPrice:5, sellPrice:9, stock:3, unit:'قطعة', supplier:'بيك المغرب', image:'', status:'active' },
    { id:5, name:'مجلد A4 بلاستيك', barcode:'6111000005', category:'تجليد', buyPrice:2.5, sellPrice:5, stock:60, unit:'قطعة', supplier:'سوبرفيض', image:'', status:'active' },
    { id:6, name:'مقص مكتبي 21سم', barcode:'6111000006', category:'أدوات', buyPrice:8, sellPrice:15, stock:0, unit:'قطعة', supplier:'عام', image:'', status:'active' },
    { id:7, name:'شريط لاصق شفاف', barcode:'6111000007', category:'أدوات', buyPrice:1.5, sellPrice:3, stock:120, unit:'قطعة', supplier:'عام', image:'', status:'active' },
    { id:8, name:'حاسبة كاسيو FX-82', barcode:'6111000008', category:'إلكترونيات', buyPrice:55, sellPrice:95, stock:12, unit:'قطعة', supplier:'كاسيو المغرب', image:'', status:'active' },
    { id:9, name:'مسطرة 30سم بلاستيك', barcode:'6111000009', category:'أدوات', buyPrice:0.8, sellPrice:2, stock:200, unit:'قطعة', supplier:'عام', image:'', status:'active' },
    { id:10, name:'دفتر رسم A3', barcode:'6111000010', category:'كراسات', buyPrice:12, sellPrice:20, stock:5, unit:'قطعة', supplier:'سوبرفيض', image:'', status:'active' },
  ];

  const categories = [
    { id:1, name:'كراسات', icon:'fa-book', count:45, color:'#3b82f6' },
    { id:2, name:'أقلام', icon:'fa-pen', count:38, color:'#10b981' },
    { id:3, name:'ورق', icon:'fa-file', count:12, color:'#f59e0b' },
    { id:4, name:'تجليد', icon:'fa-folder', count:21, color:'#8b5cf6' },
    { id:5, name:'أدوات', icon:'fa-scissors', count:60, color:'#ef4444' },
    { id:6, name:'إلكترونيات', icon:'fa-calculator', count:8, color:'#06b6d4' },
  ];

  const customers = [
    { id:1, name:'محمد الصبار', phone:'0612345678', email:'m.sabbar@gmail.com', totalPurchases:1240, debt:0, createdAt:'2024-01-15' },
    { id:2, name:'فاطمة الزهراء', phone:'0623456789', email:'fz@gmail.com', totalPurchases:580, debt:50, createdAt:'2024-02-20' },
    { id:3, name:'أحمد بنعلي', phone:'0634567890', email:'a.benali@gmail.com', totalPurchases:3200, debt:0, createdAt:'2023-11-05' },
    { id:4, name:'سعاد المنصوري', phone:'0645678901', email:'s.mansouri@gmail.com', totalPurchases:750, debt:120, createdAt:'2024-03-12' },
    { id:5, name:'يوسف الإدريسي', phone:'0656789012', email:'y.idrissi@gmail.com', totalPurchases:1850, debt:0, createdAt:'2024-01-08' },
  ];

  const suppliers = [
    { id:1, name:'سوبرفيض', contact:'0522334455', city:'الدار البيضاء', balance:-1200, lastOrder:'2024-06-10' },
    { id:2, name:'بيك المغرب', contact:'0537889900', city:'الرباط', balance:-340, lastOrder:'2024-06-15' },
    { id:3, name:'كاسيو المغرب', contact:'0528776655', city:'الدار البيضاء', balance:0, lastOrder:'2024-05-22' },
  ];

  const expenses = [
    { id:1, type:'حبر الطابعة', amount:150, date:'2024-06-18', notes:'طابعة HP' },
    { id:2, type:'كهرباء', amount:280, date:'2024-06-01', notes:'فاتورة شهر يونيو' },
    { id:3, type:'إنترنت', amount:200, date:'2024-06-01', notes:'Maroc Telecom' },
    { id:4, type:'ورق تصوير', amount:560, date:'2024-06-15', notes:'10 رزم A4' },
    { id:5, type:'تنظيف', amount:80, date:'2024-06-10', notes:'يومية التنظيف' },
  ];

  const services = [
    { id:1, name:'تصوير أبيض وأسود', price:0.5, unit:'صفحة', icon:'fa-clone', color:'#6b7280' },
    { id:2, name:'طباعة ألوان', price:3, unit:'صفحة', icon:'fa-print', color:'#6366f1' },
    { id:3, name:'طباعة أبيض وأسود', price:1, unit:'صفحة', icon:'fa-file-arrow-down', color:'#4b5563' },
    { id:4, name:'تغليف بلاستيك', price:5, unit:'قطعة', icon:'fa-layer-group', color:'#8b5cf6' },
    { id:5, name:'إنترنت', price:3, unit:'ساعة', icon:'fa-wifi', color:'#10b981' },
    { id:6, name:'وثائق رسمية', price:2, unit:'صفحة', icon:'fa-file-shield', color:'#f59e0b' },
    { id:7, name:'ربط سبيرال', price:8, unit:'قطعة', icon:'fa-rings-wedding', color:'#ef4444' },
    { id:8, name:'لامينيشن', price:10, unit:'قطعة', icon:'fa-credit-card', color:'#06b6d4' },
  ];

  // Generated sales data
  function generateSales() {
    const items = [];
    for (let i = 1; i <= 30; i++) {
      const d = new Date(); d.setDate(d.getDate() - (30 - i));
      const cust = customers[i % customers.length];
      items.push({
        id: i,
        invoiceNo: `INV-${1000 + i}`,
        customer: cust.id,
        customerName: cust.name,
        total: Math.round(50 + Math.random() * 300),
        paid: 0,
        discount: Math.round(Math.random() * 10),
        date: d.toISOString().split('T')[0],
        items: products.slice(0, Math.ceil(Math.random() * 3) + 1),
        status: Math.random() > 0.1 ? 'paid' : 'partial'
      });
    }
    return items.map(s => ({ ...s, paid: s.status === 'paid' ? s.total : Math.round(s.total * 0.5) }));
  }

  const sales = generateSales();

  function getDashboardStats() {
    const today = new Date().toISOString().split('T')[0];
    const todaySales = sales.filter(s => s.date === today);
    const totalRevenue = sales.reduce((a, s) => a + s.total, 0);
    const totalExpenses = expenses.reduce((a, e) => a + e.amount, 0);
    return {
      todaySales: todaySales.reduce((a, s) => a + s.total, 0),
      todayTransactions: todaySales.length,
      totalProducts: products.length,
      lowStock: products.filter(p => p.stock < 10).length,
      totalRevenue,
      totalExpenses,
      profit: totalRevenue - totalExpenses,
      totalCustomers: customers.length
    };
  }

  function getSalesChartData() {
    const last7 = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      const daySales = sales.filter(s => s.date === ds);
      last7.push({
        label: d.toLocaleDateString('ar-MA', { weekday: 'short' }),
        revenue: daySales.reduce((a, s) => a + s.total, 0),
        count: daySales.length
      });
    }
    return last7;
  }

  function getTopProducts() {
    return products.slice(0, 5).map(p => ({
      ...p,
      sold: Math.ceil(Math.random() * 100 + 20),
      revenue: Math.ceil(Math.random() * 2000 + 500)
    }));
  }

  return {
    products, categories, customers, suppliers, expenses, services, sales,
    getDashboardStats, getSalesChartData, getTopProducts
  };
})();
