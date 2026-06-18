/**
 * 7X Library Manager — Print Manager
 * Central print orchestration engine
 * Handles preview modals, print commands, and PDF-ready export
 */
const PrintManager = (() => {

  const savedStoreName = localStorage.getItem('inv_storeName');
  const savedLogo = localStorage.getItem('inv_logo');

  // ── Config ──
  const config = {
    storeName: savedStoreName || '7X LIBRARY',
    storeNameAr: savedStoreName || 'مكتبة 7X',
    invoiceLogo: savedLogo || null,
    storeSubtitle: 'نظام إدارة المكتبة',
    storeAddress: 'شارع محمد الخامس، رقم 45',
    storeCity: 'الدار البيضاء',
    storePhone: '0522 00 00 00',
    storeFax: '0522 00 00 01',
    storeEmail: 'info@7xlibrary.ma',
    storeWebsite: 'www.7xlibrary.ma',
    storeRC: '12345',
    storeIF: '14678900',
    storeICE: '000123456789000',
    storeCNSS: '8765432',
    currency: 'د.م',
    currencyCode: 'MAD',
    taxRate: 20,
    managerName: 'محمد المدير',
  };

  // ── Utility: Format number ──
  function formatMoney(num) {
    return parseFloat(num || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // ── Utility: Current date/time ──
  function nowFormatted() {
    const d = new Date();
    return {
      date: d.toLocaleDateString('en-GB'),
      time: d.toLocaleTimeString('en-US', { hour12: false }),
      dateAr: d.toLocaleDateString('ar-MA', { year: 'numeric', month: 'long', day: 'numeric' }),
      fullAr: d.toLocaleDateString('ar-MA', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }),
      iso: d.toISOString().split('T')[0]
    };
  }

  // ── Utility: Generate invoice number ──
  function generateInvoiceNo(prefix = 'INV') {
    const ts = Date.now().toString().slice(-6);
    return `${prefix}-${ts}`;
  }

  // ── Create Preview Modal ──
  function createPreviewModal() {
    let modal = document.getElementById('print-preview-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'print-preview-modal';
    modal.innerHTML = `
      <div class="ppm-overlay"></div>
      <div class="ppm-container">
        <div class="ppm-toolbar">
          <div class="ppm-toolbar-title">
            <i class="fa-solid fa-eye"></i>
            <span>معاينة المستند</span>
          </div>
          <div class="ppm-toolbar-actions">
            <button class="ppm-btn ppm-btn-print" onclick="PrintManager.printCurrent()">
              <i class="fa-solid fa-print"></i> طباعة
            </button>
            <button class="ppm-btn ppm-btn-pdf" onclick="PrintManager.exportPDF()">
              <i class="fa-solid fa-file-pdf"></i> تصدير PDF
            </button>
            <button class="ppm-btn ppm-btn-close" onclick="PrintManager.closePreview()">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <div class="ppm-body" id="ppm-body"></div>
      </div>`;

    const style = document.createElement('style');
    style.textContent = `
      #print-preview-modal { display:none; position:fixed; inset:0; z-index:99999; }
      #print-preview-modal.open { display:flex; }
      .ppm-overlay { position:absolute; inset:0; background:rgba(0,0,0,.7); backdrop-filter:blur(6px); }
      .ppm-container {
        position:relative; z-index:1; width:100%; height:100%;
        display:flex; flex-direction:column;
      }
      .ppm-toolbar {
        display:flex; align-items:center; justify-content:space-between;
        padding:10px 20px; background:#0f2044;
        border-bottom:2px solid #d4af37; flex-shrink:0;
      }
      .ppm-toolbar-title {
        display:flex; align-items:center; gap:8px;
        color:#fff; font-family:'Cairo',sans-serif; font-size:.9rem; font-weight:700;
      }
      .ppm-toolbar-title i { color:#d4af37; }
      .ppm-toolbar-actions { display:flex; gap:8px; }
      .ppm-btn {
        padding:8px 16px; border:none; border-radius:6px; cursor:pointer;
        font-family:'Cairo',sans-serif; font-size:.8rem; font-weight:700;
        display:flex; align-items:center; gap:6px; transition:all .2s;
      }
      .ppm-btn-print { background:linear-gradient(135deg,#d4af37,#b8960c); color:#fff; }
      .ppm-btn-print:hover { filter:brightness(1.1); transform:translateY(-1px); }
      .ppm-btn-pdf { background:rgba(255,255,255,.1); color:#fff; border:1px solid rgba(255,255,255,.2); }
      .ppm-btn-pdf:hover { background:rgba(255,255,255,.15); }
      .ppm-btn-close { background:rgba(255,255,255,.08); color:rgba(255,255,255,.6); width:36px; height:36px; padding:0; justify-content:center; border-radius:8px; }
      .ppm-btn-close:hover { background:rgba(255,255,255,.15); color:#fff; }
      .ppm-body {
        flex:1; overflow-y:auto; padding:30px;
        display:flex; justify-content:center;
        background:#1e293b;
      }
      .ppm-body > * { flex-shrink:0; }
      @media print {
        body > *:not(#print-preview-modal) { display: none !important; }
        #print-preview-modal { display:block !important; position:static !important; height:auto !important; min-height:0 !important; background:#fff !important; }
        .ppm-overlay, .ppm-toolbar { display:none !important; opacity:0 !important; height:0 !important; overflow:hidden !important; }
        .ppm-container { display:block !important; height:auto !important; min-height:0 !important; background:#fff !important; }
        .ppm-body { padding:0 !important; background:#fff !important; overflow:visible !important; display:block !important; height:auto !important; min-height:0 !important; }
        body { overflow: visible !important; height:auto !important; min-height:0 !important; background:#fff !important; margin:0 !important; padding:0 !important; }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Close on overlay click
    modal.querySelector('.ppm-overlay').onclick = () => closePreview();

    return modal;
  }

  // ── Show Preview ──
  function showPreview(htmlContent) {
    const modal = createPreviewModal();
    document.getElementById('ppm-body').innerHTML = htmlContent;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // ── Close Preview ──
  function closePreview() {
    const modal = document.getElementById('print-preview-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // ── Print Current Preview ──
  function printCurrent() {
    window.print();
  }

  // ── Export PDF (browser print-to-PDF) ──
  function exportPDF() {
    window.print();
  }

  // ── Print Direct (without preview) ──
  function printDirect(htmlContent) {
    const win = window.open('', '_blank');
    win.document.write(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Cairo','Tajawal',sans-serif; direction: rtl; background: #fff; }
        </style>
      </head>
      <body>${htmlContent}</body>
      </html>
    `);
    win.document.close();
    setTimeout(() => { win.print(); }, 600);
  }

  // ── Public API ──
  return {
    config,
    formatMoney,
    nowFormatted,
    generateInvoiceNo,
    showPreview,
    closePreview,
    printCurrent,
    exportPDF,
    printDirect
  };

})();
