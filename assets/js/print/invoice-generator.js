/**
 * 7X Library Manager — Invoice Generator
 * Generates premium HTML invoices and thermal receipts
 */
const InvoiceGenerator = (() => {

  const C = PrintManager.config;
  const fmt = PrintManager.formatMoney;

  // ── Build Full Invoice HTML ──
  function buildInvoice(saleData) {
    const now = PrintManager.nowFormatted();
    const invoiceNo = saleData.invoiceNo || PrintManager.generateInvoiceNo('INV');
    const items = saleData.items || [];
    const subtotal = items.reduce((s, i) => s + (i.price * i.qty), 0);
    const discountPct = saleData.discount || 0;
    const discountAmt = subtotal * (discountPct / 100);
    const afterDiscount = subtotal - discountAmt;
    const taxRate = saleData.taxRate !== undefined ? saleData.taxRate : 0;
    const taxAmt = afterDiscount * (taxRate / 100);
    const grandTotal = afterDiscount + taxAmt;
    const paidAmount = saleData.paid !== undefined ? saleData.paid : grandTotal;
    const remaining = Math.max(0, grandTotal - paidAmount);
    const status = remaining <= 0 ? 'paid' : 'partial';
    const customerName = saleData.customerName || 'عميل عام';
    const customerPhone = saleData.customerPhone || '—';
    const cashier = saleData.cashier || C.managerName;

    return `
    <div class="invoice-wrapper">
      <!-- Header -->
      <div class="inv-header">
        <div class="inv-logo-block">
          ${C.invoiceLogo 
            ? `<img src="${C.invoiceLogo}" alt="Logo" style="width:64px;height:64px;border-radius:14px;object-fit:cover;box-shadow:0 4px 20px rgba(0,0,0,0.1)">` 
            : `<div class="inv-logo-icon"><i class="fa-solid fa-book-open"></i></div>`
          }
          <div class="inv-logo-text">
            <h1>${C.storeName}</h1>
            <span class="tagline">${C.storeSubtitle}</span>
          </div>
        </div>
        <div class="inv-title-block">
          <div class="inv-badge">فاتورة بيع</div>
          <h2>FACTURE</h2>
          <div class="inv-number">رقم الفاتورة: <strong>${invoiceNo}</strong></div>
        </div>
      </div>

      <div class="inv-gold-line"></div>

      <!-- Info Row -->
      <div class="inv-info-row">
        <div class="inv-info-cell">
          <div class="label">تاريخ الإصدار</div>
          <div class="value">${now.date}</div>
        </div>
        <div class="inv-info-cell">
          <div class="label">الوقت</div>
          <div class="value">${now.time}</div>
        </div>
        <div class="inv-info-cell">
          <div class="label">طريقة الدفع</div>
          <div class="value gold"><i class="fa-solid fa-money-bill-wave"></i> نقداً</div>
        </div>
      </div>

      <!-- Party Grid -->
      <div class="inv-party-grid">
        <div class="inv-party">
          <div class="party-label"><i class="fa-solid fa-building"></i> المرسل</div>
          <div class="party-name">${C.storeNameAr}</div>
          <div class="party-detail">
            ${C.storeAddress}<br>
            ${C.storeCity}<br>
            هاتف: ${C.storePhone}<br>
            RC: ${C.storeRC} | IF: ${C.storeIF}<br>
            ICE: ${C.storeICE}
          </div>
        </div>
        <div class="inv-party">
          <div class="party-label"><i class="fa-solid fa-user"></i> العميل</div>
          <div class="party-name">${customerName}</div>
          <div class="party-detail">
            هاتف: ${customerPhone}<br>
            الكاشير: ${cashier}
          </div>
        </div>
      </div>

      <!-- Products Table -->
      <div class="inv-table-wrap">
        <div class="inv-table-title"><i class="fa-solid fa-clipboard-list"></i> تفاصيل المنتجات</div>
        <table class="inv-table">
          <thead>
            <tr>
              <th class="center">#</th>
              <th>المنتج</th>
              <th class="center">الكمية</th>
              <th class="center">سعر الوحدة</th>
              <th class="center">الخصم</th>
              <th style="text-align:left">المجموع</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((item, idx) => `
              <tr>
                <td class="row-num center">${idx + 1}</td>
                <td>
                  <div class="prod-name">${item.name}</div>
                  ${item.barcode ? `<div class="prod-desc">${item.barcode}</div>` : ''}
                </td>
                <td class="center qty-val">${item.qty}</td>
                <td class="center unit-price">${fmt(item.price)}</td>
                <td class="center discount-val">${discountPct > 0 ? discountPct + '%' : '—'}</td>
                <td class="left line-total">${fmt(item.price * item.qty)} ${C.currency}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Totals -->
      <div class="inv-totals-grid">
        <div>
          <div class="inv-notes-label">ملاحظات</div>
          <div class="inv-notes-box">${saleData.notes || 'شكراً لتعاملكم معنا. نتمنى لكم يوماً سعيداً.'}</div>
        </div>
        <div class="inv-totals-table">
          <div class="inv-totals-row">
            <span class="t-label">المجموع الفرعي</span>
            <span class="t-value">${fmt(subtotal)} ${C.currency}</span>
          </div>
          ${discountPct > 0 ? `
          <div class="inv-totals-row">
            <span class="t-label">الخصم (${discountPct}%)</span>
            <span class="t-value" style="color:#d97706">- ${fmt(discountAmt)} ${C.currency}</span>
          </div>` : ''}
          ${taxRate > 0 ? `
          <div class="inv-totals-row">
            <span class="t-label">الضريبة (${taxRate}%)</span>
            <span class="t-value">${fmt(taxAmt)} ${C.currency}</span>
          </div>` : ''}
          <div class="inv-totals-grand">
            <span class="gt-label">الإجمالي المستحق</span>
            <span class="gt-amount">${fmt(grandTotal)} ${C.currency}</span>
          </div>
          <div class="inv-totals-row">
            <span class="t-label">المبلغ المدفوع</span>
            <span class="t-value green">${fmt(paidAmount)} ${C.currency}</span>
          </div>
          ${remaining > 0 ? `
          <div class="inv-totals-row">
            <span class="t-label">المتبقي</span>
            <span class="t-value orange">${fmt(remaining)} ${C.currency}</span>
          </div>` : ''}
        </div>
      </div>

      <!-- Payment Badge -->
      <div class="inv-payment-row">
        <div class="inv-payment-badge ${status}">
          <i class="fa-solid ${status === 'paid' ? 'fa-circle-check' : 'fa-clock'}"></i>
          ${status === 'paid' ? 'تم الدفع بالكامل' : 'دفع جزئي'}
        </div>
      </div>

      <!-- Footer Grid: QR + Legal + Signature -->
      <div class="inv-footer-grid">
        <div class="inv-qr-block">
          <div class="inv-qr-placeholder"><i class="fa-solid fa-qrcode"></i></div>
          <small>رمز التحقق</small>
        </div>
        <div class="inv-legal-text">
          هذه الفاتورة صادرة وفقاً للقوانين التجارية المغربية المعمول بها.<br>
          يرجى الاحتفاظ بها كإثبات للمعاملة التجارية.<br>
          RC: ${C.storeRC} | IF: ${C.storeIF} | ICE: ${C.storeICE}
        </div>
        <div class="inv-sig-block">
          <div class="inv-sig-line"></div>
          <small>توقيع المسؤول</small>
        </div>
      </div>

      <!-- Footer Bar -->
      <div class="inv-footer-bar">
        <div class="f-brand"><i class="fa-solid fa-book-open"></i> <strong>${C.storeName}</strong> — ${C.storeCity}</div>
        <div class="f-page">${C.storePhone} | ${C.storeEmail}</div>
      </div>
    </div>`;
  }

  // ── Build Thermal Receipt HTML ──
  function buildReceipt(saleData) {
    const now = PrintManager.nowFormatted();
    const invoiceNo = saleData.invoiceNo || PrintManager.generateInvoiceNo('TKT');
    const items = saleData.items || [];
    const subtotal = items.reduce((s, i) => s + (i.price * i.qty), 0);
    const discountPct = saleData.discount || 0;
    const discountAmt = subtotal * (discountPct / 100);
    const grandTotal = subtotal - discountAmt;
    const paidAmount = saleData.paid || grandTotal;
    const change = Math.max(0, paidAmount - grandTotal);
    const totalItems = items.reduce((s, i) => s + i.qty, 0);

    return `
    <div class="receipt-wrapper" dir="ltr">
      <!-- Header -->
      <div class="rcpt-header">
        ${C.invoiceLogo 
          ? `<img src="${C.invoiceLogo}" alt="Logo" style="width:48px;height:48px;object-fit:cover;margin:0 auto 10px;display:block;border-radius:8px">`
          : `<div class="rcpt-logo-icon"><i class="fa-solid fa-book-open"></i></div>`
        }
        <div class="rcpt-store-name">${C.storeName}</div>
        <div class="rcpt-store-sub">Succursale ${C.storeCity}</div>
        <div class="rcpt-store-info">
          ${C.storeAddress}<br>
          Tel: ${C.storePhone}<br>
          RC: ${C.storeRC} | ICE: ${C.storeICE}
        </div>
      </div>

      <!-- Meta -->
      <div class="rcpt-meta">
        <div class="rcpt-meta-row">
          <span>TICKET: <strong>${invoiceNo.replace(/\w+-/, '')}</strong></span>
          <span>CAISSE: <strong>01</strong></span>
        </div>
        <div class="rcpt-meta-row">
          <span>DATE: <strong>${now.date}</strong></span>
          <span>HEURE: <strong>${now.time}</strong></span>
        </div>
        <div class="rcpt-meta-row">
          <span>CAISSIER: <strong>${saleData.cashier || 'ADMIN'}</strong></span>
        </div>
      </div>

      <!-- Items -->
      <table class="rcpt-items">
        <thead>
          <tr>
            <th>DESIGNATION</th>
            <th class="col-qty">QTE</th>
            <th class="col-price">P.U</th>
            <th class="col-total">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(i => `
            <tr>
              <td>${i.name}<span class="rcpt-item-unit">${fmt(i.price)} / u</span></td>
              <td class="col-qty">${i.qty}</td>
              <td class="col-price">${fmt(i.price)}</td>
              <td class="col-total">${fmt(i.price * i.qty)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="rcpt-divider"></div>

      <!-- Totals -->
      <div class="rcpt-totals">
        <div class="rcpt-totals-row">
          <span class="label">SOUS-TOTAL</span>
          <span class="value">${fmt(subtotal)}</span>
        </div>
        ${discountPct > 0 ? `
        <div class="rcpt-totals-row">
          <span class="label">REMISE (${discountPct}%)</span>
          <span class="value">-${fmt(discountAmt)}</span>
        </div>` : ''}
      </div>

      <!-- Grand Total -->
      <div class="rcpt-grand-total">
        <span class="label">TOTAL A PAYER</span>
        <span class="value">${fmt(grandTotal)} ${C.currencyCode}</span>
      </div>

      <!-- Payment -->
      <div class="rcpt-payment">
        <div class="rcpt-payment-row">
          <span>Especes</span>
          <span>${fmt(paidAmount)} ${C.currencyCode}</span>
        </div>
        <div class="rcpt-payment-row">
          <span>A Rendre</span>
          <span>${fmt(change)} ${C.currencyCode}</span>
        </div>
      </div>

      <div class="rcpt-divider"></div>

      <!-- Footer -->
      <div class="rcpt-footer">
        <div>Nombre d'articles: ${totalItems}</div>
        <div class="thank-you">MERCI DE VOTRE VISITE</div>
        <div class="come-back">A bientot chez ${C.storeName}</div>
        <div class="rcpt-qr-placeholder"><i class="fa-solid fa-qrcode"></i></div>
        <div class="rcpt-footer-legal">
          RC: ${C.storeRC} | ICE: ${C.storeICE}<br>
          Ce ticket tient lieu de facture.
        </div>
      </div>
    </div>`;
  }

  // ── Preview Invoice ──
  function previewInvoice(saleData) {
    const html = buildInvoice(saleData);
    PrintManager.showPreview(html);
  }

  // ── Preview Receipt ──
  function previewReceipt(saleData) {
    const html = buildReceipt(saleData);
    PrintManager.showPreview(html);
  }

  // ── Quick Invoice from POS cart ──
  function fromCart(cartItems, options = {}) {
    return {
      invoiceNo: options.invoiceNo || PrintManager.generateInvoiceNo('INV'),
      customerName: options.customerName || 'عميل عام',
      customerPhone: options.customerPhone || '',
      cashier: options.cashier || PrintManager.config.managerName,
      discount: options.discount || 0,
      taxRate: options.taxRate !== undefined ? options.taxRate : 0,
      paid: options.paid !== undefined ? options.paid : 0,
      notes: options.notes || '',
      items: cartItems.map(c => ({
        name: c.name,
        barcode: c.barcode || '',
        qty: c.qty,
        price: c.price
      }))
    };
  }

  return {
    buildInvoice,
    buildReceipt,
    previewInvoice,
    previewReceipt,
    fromCart
  };

})();
