/**
 * 7X Library Manager — Report Generator
 * Generates elegant HTML reports to be previewed/printed via PrintManager.
 */
const ReportGenerator = (() => {

  function getBaseHeader(title, subtitle) {
    const c = PrintManager.config;
    const dateStr = PrintManager.nowFormatted().fullAr;
    
    let logoHtml = `<div class="rpt-logo-icon"><i class="fa-solid fa-book-open"></i></div>`;
    if (c.invoiceLogo) {
      logoHtml = `<img src="${c.invoiceLogo}" style="width:52px;height:52px;border-radius:12px;object-fit:cover;box-shadow: 0 4px 16px rgba(212,175,55,.4);">`;
    }

    return `
      <div class="rpt-header">
        <div class="rpt-brand">
          ${logoHtml}
          <div class="rpt-brand-text">
            <h1>${c.storeNameAr}</h1>
            <span>${c.storeSubtitle}</span>
          </div>
        </div>
        <div class="rpt-header-info">
          <div class="rpt-type-badge">${title}</div>
          <h2>${subtitle}</h2>
          <div class="rpt-date">تاريخ التقرير: <strong>${dateStr}</strong></div>
        </div>
      </div>
      <div class="rpt-gold-line"></div>
    `;
  }

  function getFooter() {
    return `
      <div class="rpt-footer">
        <div class="f-brand">تم الإصدار من نظام <strong>7X Library Manager</strong></div>
        <div class="f-page">صفحة 1/1</div>
      </div>
    `;
  }

  // Generate generic dashboard report
  function generateDashboardReport(stats) {
    const header = getBaseHeader('التقرير العام', 'ملخص أداء المكتبة');
    const c = PrintManager.config;

    const html = `
      <div class="report-wrapper">
        ${header}
        
        <div class="rpt-meta-bar">
          <div>الفترة: <strong>الشهر الحالي</strong></div>
          <div>المسؤول: <strong>${c.managerName}</strong></div>
          <div>الفرع: <strong>الرئيسي</strong></div>
        </div>

        <div class="rpt-kpi-grid">
          <div class="rpt-kpi-card" style="--kpi-color:#16a34a;--kpi-bg:#f0fdf4">
            <div class="rpt-kpi-icon"><i class="fa-solid fa-arrow-trend-up"></i></div>
            <div class="rpt-kpi-value">${PrintManager.formatMoney(stats.totalRevenue)} ${c.currency}</div>
            <div class="rpt-kpi-label">إجمالي المبيعات</div>
          </div>
          <div class="rpt-kpi-card" style="--kpi-color:#d4af37;--kpi-bg:#fffbeb">
            <div class="rpt-kpi-icon"><i class="fa-solid fa-sack-dollar"></i></div>
            <div class="rpt-kpi-value">${PrintManager.formatMoney(stats.profit)} ${c.currency}</div>
            <div class="rpt-kpi-label">الأرباح الصافية</div>
          </div>
          <div class="rpt-kpi-card" style="--kpi-color:#dc2626;--kpi-bg:#fef2f2">
            <div class="rpt-kpi-icon"><i class="fa-solid fa-money-bill-transfer"></i></div>
            <div class="rpt-kpi-value">${PrintManager.formatMoney(stats.totalExpenses)} ${c.currency}</div>
            <div class="rpt-kpi-label">المصاريف</div>
          </div>
          <div class="rpt-kpi-card" style="--kpi-color:#0ea5e9;--kpi-bg:#f0f9ff">
            <div class="rpt-kpi-icon"><i class="fa-solid fa-users"></i></div>
            <div class="rpt-kpi-value">${stats.totalCustomers}</div>
            <div class="rpt-kpi-label">إجمالي العملاء</div>
          </div>
        </div>

        <div class="rpt-section">
          <div class="rpt-section-title"><i class="fa-solid fa-star"></i> أعلى المنتجات مبيعاً</div>
          <table class="rpt-table">
            <thead>
              <tr>
                <th class="center">الترتيب</th>
                <th class="left">اسم المنتج</th>
                <th class="center">الصنف</th>
                <th class="center">الكمية المباعة</th>
                <th class="left">إجمالي الإيرادات</th>
              </tr>
            </thead>
            <tbody>
              ${DataStore.getTopProducts().map((p, i) => `
                <tr>
                  <td class="center cell-muted">${i + 1}</td>
                  <td class="left cell-bold">${p.name}</td>
                  <td class="center">${p.category}</td>
                  <td class="center"><span class="stock-badge good">${p.sold} وحدة</span></td>
                  <td class="left cell-gold">${PrintManager.formatMoney(p.revenue)} ${c.currency}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="rpt-signature-row">
          <div class="rpt-sig-block">
            <div class="rpt-sig-label">المدير المسؤول</div>
            <div class="rpt-sig-line"></div>
            <div class="rpt-sig-name">${c.managerName}</div>
          </div>
          <div class="rpt-sig-block">
            <div class="rpt-sig-label">ختم المكتبة</div>
            <div class="rpt-sig-line"></div>
            <div class="rpt-sig-name">${c.storeNameAr}</div>
          </div>
        </div>

        ${getFooter()}
      </div>
    `;

    PrintManager.showPreview(html);
  }

  // Generate Detailed Sales Report
  function generateSalesReport(sales) {
    const header = getBaseHeader('تقرير المبيعات', 'تفصيل المبيعات والمداخيل');
    const c = PrintManager.config;
    
    const totalSales = sales.reduce((sum, s) => sum + s.total, 0);
    const totalPaid = sales.reduce((sum, s) => sum + s.paid, 0);
    const totalUnpaid = totalSales - totalPaid;

    const html = `
      <div class="report-wrapper">
        ${header}
        
        <div class="rpt-meta-bar">
          <div>عدد الفواتير: <strong>${sales.length}</strong></div>
          <div>الفترة: <strong>الشهر الحالي</strong></div>
          <div>المسؤول: <strong>${c.managerName}</strong></div>
        </div>

        <div class="rpt-section">
          <div class="rpt-section-title"><i class="fa-solid fa-list-check"></i> سجل العمليات</div>
          <table class="rpt-table">
            <thead>
              <tr>
                <th class="center">المرجع</th>
                <th class="left">العميل</th>
                <th class="center">التاريخ</th>
                <th class="center">الحالة</th>
                <th class="left">المدفوع</th>
                <th class="left">الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              ${sales.slice().reverse().map(s => `
                <tr>
                  <td class="center cell-bold" style="color:var(--primary-600)">${s.invoiceNo}</td>
                  <td class="left">${s.customerName}</td>
                  <td class="center cell-muted">${s.date}</td>
                  <td class="center">
                    <span class="stock-badge ${s.status === 'paid' ? 'good' : 'warning'}">
                      ${s.status === 'paid' ? 'خالص' : 'غير خالص'}
                    </span>
                  </td>
                  <td class="left cell-green">${PrintManager.formatMoney(s.paid)} ${c.currency}</td>
                  <td class="left cell-bold">${PrintManager.formatMoney(s.total)} ${c.currency}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" class="left">الإجماليات الكبرى</td>
                <td class="left" style="color:#16a34a">${PrintManager.formatMoney(totalPaid)} ${c.currency}</td>
                <td class="left">${PrintManager.formatMoney(totalSales)} ${c.currency}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="rpt-summary-grid">
          <div class="rpt-summary-notes">
            <div class="notes-title">ملاحظات هامة</div>
            هذا التقرير يمثل ملخصاً كاملاً للعمليات المسجلة خلال الفترة المحددة. 
            المبالغ المتبقية (غير الخالصة) هي: <strong>${PrintManager.formatMoney(totalUnpaid)} ${c.currency}</strong> 
            يجب متابعتها مع العملاء المعنيين.
          </div>
          <div>
            <div class="rpt-summary-table">
              <div class="rpt-summary-row"><span class="s-label">إجمالي المبيعات</span><span class="s-value">${PrintManager.formatMoney(totalSales)} ${c.currency}</span></div>
              <div class="rpt-summary-row"><span class="s-label">إجمالي المدفوع</span><span class="s-value" style="color:#16a34a">${PrintManager.formatMoney(totalPaid)} ${c.currency}</span></div>
              <div class="rpt-summary-row"><span class="s-label">إجمالي المتبقي</span><span class="s-value" style="color:#dc2626">${PrintManager.formatMoney(totalUnpaid)} ${c.currency}</span></div>
              <div class="rpt-summary-grand">
                <span class="sg-label">الصافي المحصل</span>
                <span class="sg-value">${PrintManager.formatMoney(totalPaid)} ${c.currency}</span>
              </div>
            </div>
          </div>
        </div>

        ${getFooter()}
      </div>
    `;

    PrintManager.showPreview(html);
  }

  // Generate Profit Report
  function generateProfitReport() {
    const header = getBaseHeader('تقرير الأرباح', 'صافي الأرباح والتكاليف المجمعة');
    const c = PrintManager.config;

    // Hardcoded demo values matching the UI for now, or you can pass these dynamically
    const revenue = 18420;
    const purchases = 8450;
    const expenses = 2330;
    const profit = 7640;
    
    const profitMargin = ((profit / revenue) * 100).toFixed(1);
    const costMargin = (((purchases + expenses) / revenue) * 100).toFixed(1);

    const html = `
      <div class="report-wrapper">
        ${header}
        
        <div class="rpt-meta-bar">
          <div>الفترة: <strong>الشهر الحالي</strong></div>
          <div>المسؤول: <strong>${c.managerName}</strong></div>
        </div>

        <div class="rpt-kpi-grid">
          <div class="rpt-kpi-card" style="--kpi-color:#16a34a;--kpi-bg:#f0fdf4">
            <div class="rpt-kpi-icon"><i class="fa-solid fa-sack-dollar"></i></div>
            <div class="rpt-kpi-value">${PrintManager.formatMoney(profit)} ${c.currency}</div>
            <div class="rpt-kpi-label">صافي الربح</div>
          </div>
          <div class="rpt-kpi-card" style="--kpi-color:#0ea5e9;--kpi-bg:#f0f9ff">
            <div class="rpt-kpi-icon"><i class="fa-solid fa-arrow-trend-up"></i></div>
            <div class="rpt-kpi-value">${PrintManager.formatMoney(revenue)} ${c.currency}</div>
            <div class="rpt-kpi-label">إجمالي المبيعات (الإيرادات)</div>
          </div>
          <div class="rpt-kpi-card" style="--kpi-color:#dc2626;--kpi-bg:#fef2f2">
            <div class="rpt-kpi-icon"><i class="fa-solid fa-money-bill-transfer"></i></div>
            <div class="rpt-kpi-value">${PrintManager.formatMoney(purchases + expenses)} ${c.currency}</div>
            <div class="rpt-kpi-label">إجمالي التكاليف</div>
          </div>
        </div>

        <div class="rpt-section">
          <div class="rpt-section-title"><i class="fa-solid fa-chart-pie"></i> التحليل المالي التفصيلي</div>
          <table class="rpt-table">
            <thead>
              <tr>
                <th class="right" style="text-align:right">البند</th>
                <th class="left">القيمة</th>
                <th class="center">النسبة من الإيرادات</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="right cell-bold">إجمالي المبيعات</td>
                <td class="left cell-bold" style="color:#0ea5e9">${PrintManager.formatMoney(revenue)} ${c.currency}</td>
                <td class="center">100%</td>
              </tr>
              <tr>
                <td class="right">المشتريات (تكلفة البضاعة)</td>
                <td class="left cell-red">- ${PrintManager.formatMoney(purchases)} ${c.currency}</td>
                <td class="center">${((purchases/revenue)*100).toFixed(1)}%</td>
              </tr>
              <tr>
                <td class="right">المصاريف التشغيلية</td>
                <td class="left cell-red">- ${PrintManager.formatMoney(expenses)} ${c.currency}</td>
                <td class="center">${((expenses/revenue)*100).toFixed(1)}%</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td class="right" style="text-align:right">صافي الربح النهائي</td>
                <td class="left" style="color:#16a34a">${PrintManager.formatMoney(profit)} ${c.currency}</td>
                <td class="center" style="color:#16a34a">${profitMargin}%</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="rpt-signature-row">
          <div class="rpt-sig-block">
            <div class="rpt-sig-label">المدير المالي</div>
            <div class="rpt-sig-line"></div>
            <div class="rpt-sig-name">...................</div>
          </div>
          <div class="rpt-sig-block">
            <div class="rpt-sig-label">المدير العام</div>
            <div class="rpt-sig-line"></div>
            <div class="rpt-sig-name">${c.managerName}</div>
          </div>
        </div>

        ${getFooter()}
      </div>
    `;

    PrintManager.showPreview(html);
  }

  // Generate Inventory Report
  function generateInventoryReport(products) {
    const header = getBaseHeader('تقرير المخزون', 'حالة وتقييم المخزون الحالي');
    const c = PrintManager.config;

    let totalValue = 0;
    let lowStock = 0;
    let outOfStock = 0;

    products.forEach(p => {
      totalValue += (p.stock * p.buyPrice);
      if (p.stock === 0) outOfStock++;
      else if (p.stock < 10) lowStock++;
    });

    const html = `
      <div class="report-wrapper">
        ${header}
        
        <div class="rpt-meta-bar">
          <div>تاريخ الجرد: <strong>${PrintManager.nowFormatted().date}</strong></div>
          <div>أمين المخزن: <strong>${c.managerName}</strong></div>
        </div>

        <div class="rpt-kpi-grid">
          <div class="rpt-kpi-card" style="--kpi-color:#0ea5e9;--kpi-bg:#f0f9ff">
            <div class="rpt-kpi-icon"><i class="fa-solid fa-boxes-stacked"></i></div>
            <div class="rpt-kpi-value">${PrintManager.formatMoney(totalValue)} ${c.currency}</div>
            <div class="rpt-kpi-label">قيمة المخزون الإجمالية</div>
          </div>
          <div class="rpt-kpi-card" style="--kpi-color:#64748b;--kpi-bg:#f8fafc">
            <div class="rpt-kpi-icon"><i class="fa-solid fa-box-open"></i></div>
            <div class="rpt-kpi-value">${products.length}</div>
            <div class="rpt-kpi-label">إجمالي المنتجات</div>
          </div>
          <div class="rpt-kpi-card" style="--kpi-color:#d97706;--kpi-bg:#fffbeb">
            <div class="rpt-kpi-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
            <div class="rpt-kpi-value">${lowStock}</div>
            <div class="rpt-kpi-label">مخزون منخفض</div>
          </div>
          <div class="rpt-kpi-card" style="--kpi-color:#dc2626;--kpi-bg:#fef2f2">
            <div class="rpt-kpi-icon"><i class="fa-solid fa-circle-exclamation"></i></div>
            <div class="rpt-kpi-value">${outOfStock}</div>
            <div class="rpt-kpi-label">نفذ من المخزون</div>
          </div>
        </div>

        <div class="rpt-section">
          <div class="rpt-section-title"><i class="fa-solid fa-list"></i> حالة المخزون التفصيلية</div>
          <table class="rpt-table">
            <thead>
              <tr>
                <th class="left">المنتج</th>
                <th class="center">الصنف</th>
                <th class="center">الكمية المتوفرة</th>
                <th class="center">الحد الأدنى</th>
                <th class="left">قيمة المخزون</th>
                <th class="center">الحالة</th>
              </tr>
            </thead>
            <tbody>
              ${products.map(p => {
                const val = p.stock * p.buyPrice;
                const status = p.stock === 0 ? ['نفذ', 'danger'] : p.stock < 10 ? ['منخفض', 'warning'] : ['متوفر', 'good'];
                return `
                  <tr>
                    <td class="left cell-bold">${p.name}</td>
                    <td class="center cell-muted">${p.category}</td>
                    <td class="center cell-bold">${p.stock} ${p.unit}</td>
                    <td class="center cell-muted">5 ${p.unit}</td>
                    <td class="left cell-bold" style="color:#0f2044">${PrintManager.formatMoney(val)} ${c.currency}</td>
                    <td class="center"><span class="stock-badge ${status[1]}">${status[0]}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" class="left">الإجمالي الكلي لقيمة المخزون</td>
                <td colspan="2" class="left" style="color:#16a34a">${PrintManager.formatMoney(totalValue)} ${c.currency}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="rpt-signature-row">
          <div class="rpt-sig-block">
            <div class="rpt-sig-label">أمين المخزن</div>
            <div class="rpt-sig-line"></div>
            <div class="rpt-sig-name">...................</div>
          </div>
          <div class="rpt-sig-block">
            <div class="rpt-sig-label">مدير المشتريات</div>
            <div class="rpt-sig-line"></div>
            <div class="rpt-sig-name">${c.managerName}</div>
          </div>
        </div>

        ${getFooter()}
      </div>
    `;

    PrintManager.showPreview(html);
  }

  // Generate Expenses Report
  function generateExpensesReport() {
    const header = getBaseHeader('تقرير المصاريف', 'تحليل مفصل لجميع التكاليف التشغيلية');
    const c = PrintManager.config;
    const expenses = DataStore.expenses || [];

    const totalExpenses = 10780; // Hardcoded UI match or calculate from expenses array
    const monthlyAvg = 1796;
    const count = expenses.length > 0 ? expenses.length : 38;

    const breakdown = [
      {n: 'المشتريات', a: 8450},
      {n: 'الكهرباء', a: 450},
      {n: 'الإيجار', a: 1200},
      {n: 'رواتب', a: 500},
      {n: 'أخرى', a: 180}
    ];

    const html = `
      <div class="report-wrapper">
        ${header}
        
        <div class="rpt-meta-bar">
          <div>الفترة: <strong>الشهر الحالي</strong></div>
          <div>المسؤول: <strong>${c.managerName}</strong></div>
          <div>عدد العمليات: <strong>${count}</strong></div>
        </div>

        <div class="rpt-kpi-grid">
          <div class="rpt-kpi-card" style="--kpi-color:#dc2626;--kpi-bg:#fef2f2">
            <div class="rpt-kpi-icon"><i class="fa-solid fa-money-bill-transfer"></i></div>
            <div class="rpt-kpi-value">${PrintManager.formatMoney(totalExpenses)} ${c.currency}</div>
            <div class="rpt-kpi-label">إجمالي المصاريف</div>
          </div>
          <div class="rpt-kpi-card" style="--kpi-color:#f59e0b;--kpi-bg:#fffbeb">
            <div class="rpt-kpi-icon"><i class="fa-solid fa-chart-line"></i></div>
            <div class="rpt-kpi-value">${PrintManager.formatMoney(monthlyAvg)} ${c.currency}</div>
            <div class="rpt-kpi-label">متوسط الشهر</div>
          </div>
          <div class="rpt-kpi-card" style="--kpi-color:#64748b;--kpi-bg:#f8fafc">
            <div class="rpt-kpi-icon"><i class="fa-solid fa-hashtag"></i></div>
            <div class="rpt-kpi-value">${count}</div>
            <div class="rpt-kpi-label">عدد العمليات</div>
          </div>
        </div>

        <div class="rpt-section">
          <div class="rpt-section-title"><i class="fa-solid fa-chart-pie"></i> تصنيف المصاريف</div>
          <table class="rpt-table" style="width: 50%; margin: 0 auto 20px;">
            <thead>
              <tr>
                <th class="right" style="text-align:right">النوع</th>
                <th class="left">القيمة</th>
                <th class="center">النسبة</th>
              </tr>
            </thead>
            <tbody>
              ${breakdown.map(b => `
                <tr>
                  <td class="right cell-bold">${b.n}</td>
                  <td class="left cell-red">${PrintManager.formatMoney(b.a)} ${c.currency}</td>
                  <td class="center cell-muted">${((b.a / totalExpenses) * 100).toFixed(1)}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="rpt-section-title"><i class="fa-solid fa-list"></i> تفاصيل العمليات</div>
          <table class="rpt-table">
            <thead>
              <tr>
                <th class="center">التاريخ</th>
                <th class="center">النوع</th>
                <th class="left">المبلغ</th>
                <th class="right" style="text-align:right">الملاحظات</th>
              </tr>
            </thead>
            <tbody>
              ${expenses.map(e => `
                <tr>
                  <td class="center cell-muted">${e.date}</td>
                  <td class="center"><span class="stock-badge out">${e.type}</span></td>
                  <td class="left cell-bold" style="color:#dc2626">${PrintManager.formatMoney(e.amount)} ${c.currency}</td>
                  <td class="right">${e.notes}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="left">الإجمالي</td>
                <td colspan="2" class="left" style="color:#dc2626">${PrintManager.formatMoney(expenses.reduce((sum, e) => sum + e.amount, 0))} ${c.currency}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="rpt-signature-row">
          <div class="rpt-sig-block">
            <div class="rpt-sig-label">المحاسب</div>
            <div class="rpt-sig-line"></div>
            <div class="rpt-sig-name">...................</div>
          </div>
          <div class="rpt-sig-block">
            <div class="rpt-sig-label">المدير العام</div>
            <div class="rpt-sig-line"></div>
            <div class="rpt-sig-name">${c.managerName}</div>
          </div>
        </div>

        ${getFooter()}
      </div>
    `;

    PrintManager.showPreview(html);
  }

  // Generate Customer Statement (Account Statement)
  function generateCustomerStatement() {
    const header = getBaseHeader('كشف حساب', 'سجل المعاملات وتفاصيل العميل');
    const c = PrintManager.config;

    // Hardcoded mock data matching the UI
    const customer = {
      name: 'محمد الصبار',
      phone: '0612345678',
      email: 'm.sabbar@gmail.com',
      totalPurchases: 1240,
      debt: 0
    };
    
    const transactions = DataStore.sales.slice(-8).reverse();

    const html = `
      <div class="report-wrapper">
        ${header}
        
        <div class="rpt-meta-bar">
          <div>اسم العميل: <strong>${customer.name}</strong></div>
          <div>الهاتف: <strong dir="ltr">${customer.phone}</strong></div>
          <div>تاريخ الكشف: <strong>${PrintManager.nowFormatted().date}</strong></div>
        </div>

        <div class="rpt-kpi-grid" style="grid-template-columns: repeat(2, 1fr);">
          <div class="rpt-kpi-card" style="--kpi-color:#0ea5e9;--kpi-bg:#f0f9ff">
            <div class="rpt-kpi-icon"><i class="fa-solid fa-cart-shopping"></i></div>
            <div class="rpt-kpi-value">${PrintManager.formatMoney(customer.totalPurchases)} ${c.currency}</div>
            <div class="rpt-kpi-label">إجمالي المشتريات</div>
          </div>
          <div class="rpt-kpi-card" style="--kpi-color:#16a34a;--kpi-bg:#f0fdf4">
            <div class="rpt-kpi-icon"><i class="fa-solid fa-hand-holding-dollar"></i></div>
            <div class="rpt-kpi-value">${customer.debt > 0 ? PrintManager.formatMoney(customer.debt) + ' ' + c.currency : 'لا يوجد'}</div>
            <div class="rpt-kpi-label">الديون المستحقة</div>
          </div>
        </div>

        <div class="rpt-section">
          <div class="rpt-section-title"><i class="fa-solid fa-list"></i> سجل المشتريات والمعاملات</div>
          <table class="rpt-table">
            <thead>
              <tr>
                <th class="center">الفاتورة</th>
                <th class="center">التاريخ</th>
                <th class="left">المبلغ</th>
                <th class="center">الحالة</th>
              </tr>
            </thead>
            <tbody>
              ${transactions.map(s => `
                <tr>
                  <td class="center cell-bold" style="color:#0f2044">${s.invoiceNo}</td>
                  <td class="center cell-muted">${s.date}</td>
                  <td class="left cell-bold">${PrintManager.formatMoney(s.total)} ${c.currency}</td>
                  <td class="center">
                    <span class="stock-badge ${s.status === 'paid' ? 'good' : 'warning'}">
                      ${s.status === 'paid' ? 'مدفوع' : 'جزئي'}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="left">إجمالي المعاملات المرفقة</td>
                <td colspan="2" class="left" style="color:#16a34a">${PrintManager.formatMoney(customer.totalPurchases)} ${c.currency}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="rpt-signature-row">
          <div class="rpt-sig-block">
            <div class="rpt-sig-label">توقيع العميل</div>
            <div class="rpt-sig-line"></div>
            <div class="rpt-sig-name">${customer.name}</div>
          </div>
          <div class="rpt-sig-block">
            <div class="rpt-sig-label">الختم والتوقيع</div>
            <div class="rpt-sig-line"></div>
            <div class="rpt-sig-name">${c.storeNameAr}</div>
          </div>
        </div>

        ${getFooter()}
      </div>
    `;

    PrintManager.showPreview(html);
  }

  // Generate Purchase Invoice
  function generatePurchaseInvoice(invoiceNo, supplierName, date, totalAmt, paidAmt) {
    const c = PrintManager.config;
    const remaining = totalAmt - paidAmt;
    const status = remaining > 0 ? 'جزئي' : 'مدفوع';

    const header = `
      <div class="rpt-header">
        <div class="rpt-header-top">
          <div class="rpt-logo">
            ${c.invoiceLogo ? `<img src="${c.invoiceLogo}" alt="Logo">` : `<div class="rpt-logo-placeholder"><i class="fa-solid fa-book-open"></i></div>`}
          </div>
          <div class="rpt-title-box">
            <h1>فاتورة مشتريات</h1>
            <p>رقم الفاتورة: ${invoiceNo}</p>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; gap:20px; margin-top:20px; border-top:1px solid #e2e8f0; padding-top:15px;">
          <div style="flex:1;">
            <div style="color:#64748b; font-size:0.85rem;">المشتري:</div>
            <div style="font-weight:700; font-size:1.1rem; color:#0f2044;">${c.storeNameAr}</div>
            <div style="font-size:0.85rem; color:#475569; word-break:break-word;">${c.storeAddress}</div>
            <div style="font-size:0.85rem; color:#475569;">ICE: ${c.storeICE}</div>
          </div>
          <div style="flex:1; text-align:left;">
            <div style="color:#64748b; font-size:0.85rem;">المورد:</div>
            <div style="font-weight:700; font-size:1.1rem; color:#0f2044;">${supplierName}</div>
            <div style="font-size:0.85rem; color:#475569;">تاريخ الإصدار: 2024-06-${date}</div>
            <div style="font-size:0.85rem; color:#475569; margin-top:4px;">
              الحالة: <span style="display:inline-block; padding:2px 8px; border-radius:4px; font-weight:700; font-size:0.8rem; background:${remaining > 0 ? '#fef3c7' : '#dcfce3'}; color:${remaining > 0 ? '#d97706' : '#16a34a'};">${status}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const html = `
      <div class="report-wrapper">
        ${header}
        
        <div class="rpt-section">
          <table class="rpt-table">
            <thead>
              <tr>
                <th class="right">البيان / الوصف</th>
                <th class="center" style="width:100px;">الكمية</th>
                <th class="left" style="width:120px;">سعر الوحدة</th>
                <th class="left" style="width:120px;">الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="right">مشتريات متنوعة (دفعة واحدة)</td>
                <td class="center">1</td>
                <td class="left">${PrintManager.formatMoney(totalAmt)} ${c.currency}</td>
                <td class="left cell-bold">${PrintManager.formatMoney(totalAmt)} ${c.currency}</td>
              </tr>
            </tbody>
          </table>
          
          <div style="display:flex; justify-content:flex-end; margin-top:20px;">
            <div style="width:300px;">
              <div style="display:flex; justify-content:space-between; padding:8px 12px; border-bottom:1px solid #f1f5f9;">
                <span style="color:#64748b; font-weight:600;">الإجمالي الكلي</span>
                <span style="font-weight:700; color:#0f2044;">${PrintManager.formatMoney(totalAmt)} ${c.currency}</span>
              </div>
              <div style="display:flex; justify-content:space-between; padding:8px 12px; border-bottom:1px solid #f1f5f9;">
                <span style="color:#64748b; font-weight:600;">المبلغ المدفوع</span>
                <span style="font-weight:700; color:#16a34a;">${PrintManager.formatMoney(paidAmt)} ${c.currency}</span>
              </div>
              <div style="display:flex; justify-content:space-between; padding:12px; background:#f8fafc; border-radius:0 0 8px 8px; font-size:1.1rem;">
                <span style="font-weight:700; color:#0f2044;">المبلغ المتبقي</span>
                <span style="font-weight:800; color:${remaining > 0 ? '#dc2626' : '#0f2044'};">${PrintManager.formatMoney(remaining)} ${c.currency}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="rpt-signature-row" style="margin-top:60px;">
          <div class="rpt-sig-block">
            <div class="rpt-sig-label">توقيع المستلم (المكتبة)</div>
            <div class="rpt-sig-line"></div>
          </div>
          <div class="rpt-sig-block">
            <div class="rpt-sig-label">توقيع المورد</div>
            <div class="rpt-sig-line"></div>
          </div>
        </div>

        ${getFooter()}
      </div>
    `;

    PrintManager.showPreview(html);
  }

  // Generate Sale Invoice (A4)
  function generateSaleInvoice(invoiceNo, customerName, date, total, statusStr) {
    const c = PrintManager.config;
    const isPaid = statusStr === 'paid';
    const statusText = isPaid ? 'مدفوع' : 'غير مدفوع';
    
    const header = `
      <div class="rpt-header">
        <div class="rpt-header-top">
          <div class="rpt-logo">
            ${c.invoiceLogo ? `<img src="${c.invoiceLogo}" alt="Logo">` : `<div class="rpt-logo-placeholder"><i class="fa-solid fa-book-open"></i></div>`}
          </div>
          <div class="rpt-title-box">
            <h1>فاتورة مبيعات</h1>
            <p>رقم الفاتورة: ${invoiceNo}</p>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; gap:20px; margin-top:20px; border-top:1px solid #e2e8f0; padding-top:15px;">
          <div style="flex:1;">
            <div style="color:#64748b; font-size:0.85rem;">من (البائع):</div>
            <div style="font-weight:700; font-size:1.1rem; color:#0f2044;">${c.storeNameAr}</div>
            <div style="font-size:0.85rem; color:#475569; word-break:break-word;">${c.storeAddress}</div>
            <div style="font-size:0.85rem; color:#475569;">ICE: ${c.storeICE}</div>
          </div>
          <div style="flex:1; text-align:left;">
            <div style="color:#64748b; font-size:0.85rem;">إلى (العميل):</div>
            <div style="font-weight:700; font-size:1.1rem; color:#0f2044;">${customerName}</div>
            <div style="font-size:0.85rem; color:#475569;">تاريخ الإصدار: ${date}</div>
            <div style="font-size:0.85rem; color:#475569; margin-top:4px;">
              الحالة: <span style="display:inline-block; padding:2px 8px; border-radius:4px; font-weight:700; font-size:0.8rem; background:${isPaid ? '#dcfce3' : '#fef2f2'}; color:${isPaid ? '#16a34a' : '#dc2626'};">${statusText}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const html = `
      <div class="report-wrapper">
        ${header}
        
        <div class="rpt-section">
          <table class="rpt-table">
            <thead>
              <tr>
                <th class="right">المنتج / البيان</th>
                <th class="center" style="width:100px;">الكمية</th>
                <th class="left" style="width:120px;">سعر الوحدة</th>
                <th class="left" style="width:120px;">الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="right">مشتريات العميل (مبيعات متنوعة)</td>
                <td class="center">1</td>
                <td class="left">${PrintManager.formatMoney(total)} ${c.currency}</td>
                <td class="left cell-bold">${PrintManager.formatMoney(total)} ${c.currency}</td>
              </tr>
            </tbody>
          </table>
          
          <div style="display:flex; justify-content:flex-end; margin-top:20px;">
            <div style="width:300px;">
              <div style="display:flex; justify-content:space-between; padding:12px; background:#f8fafc; border-radius:8px; font-size:1.1rem;">
                <span style="font-weight:700; color:#0f2044;">الإجمالي الكلي</span>
                <span style="font-weight:800; color:#0f2044;">${PrintManager.formatMoney(total)} ${c.currency}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="rpt-signature-row" style="margin-top:60px;">
          <div class="rpt-sig-block">
            <div class="rpt-sig-label">توقيع العميل</div>
            <div class="rpt-sig-line"></div>
          </div>
          <div class="rpt-sig-block">
            <div class="rpt-sig-label">ختم المكتبة</div>
            <div class="rpt-sig-line"></div>
          </div>
        </div>

        ${getFooter()}
      </div>
    `;

    PrintManager.showPreview(html);
  }

  return {
    generateDashboardReport,
    generateSalesReport,
    generateProfitReport,
    generateInventoryReport,
    generateExpensesReport,
    generateCustomerStatement,
    generatePurchaseInvoice,
    generateSaleInvoice
  };

})();
