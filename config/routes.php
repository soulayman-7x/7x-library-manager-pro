<?php
return [
    // Auth
    'GET  /'                        => ['Auth\AuthController', 'index'],
    'GET  /login'                   => ['Auth\AuthController', 'showLogin'],
    'POST /login'                   => ['Auth\AuthController', 'login'],
    'POST /logout'                  => ['Auth\AuthController', 'logout'],

    // Dashboard
    'GET  /dashboard'               => ['Dashboard\DashboardController', 'index'],
    'GET  /dashboard/stats'         => ['Dashboard\DashboardController', 'stats'],

    // POS
    'GET  /pos'                     => ['POS\PosController', 'index'],
    'POST /pos/sale'                => ['POS\PosController', 'sale'],
    'GET  /pos/receipt/{id}'        => ['POS\PosController', 'receipt'],

    // Services
    'GET  /services'                => ['Services\ServiceController', 'index'],
    'POST /services'                => ['Services\ServiceController', 'store'],
    'GET  /services/{id}/edit'      => ['Services\ServiceController', 'edit'],
    'POST /services/{id}/update'    => ['Services\ServiceController', 'update'],
    'POST /services/{id}/delete'    => ['Services\ServiceController', 'delete'],
    'GET  /service-categories'      => ['Services\ServiceController', 'categories'],
    'POST /service-categories'      => ['Services\ServiceController', 'storeCategory'],
    'GET  /service-pricing'         => ['Services\ServiceController', 'pricing'],
    'POST /service-pricing'         => ['Services\ServiceController', 'updatePricing'],

    // Products
    'GET  /products'                => ['Products\ProductController', 'index'],
    'POST /products'                => ['Products\ProductController', 'store'],
    'GET  /products/{id}/edit'      => ['Products\ProductController', 'edit'],
    'POST /products/{id}/update'    => ['Products\ProductController', 'update'],
    'POST /products/{id}/delete'    => ['Products\ProductController', 'delete'],
    'GET  /categories'              => ['Products\ProductController', 'categories'],
    'POST /categories'              => ['Products\ProductController', 'storeCategory'],

    // Clients
    'GET  /clients'                 => ['Clients\ClientController', 'index'],
    'POST /clients'                 => ['Clients\ClientController', 'store'],
    'GET  /clients/{id}'            => ['Clients\ClientController', 'show'],
    'GET  /clients/{id}/edit'       => ['Clients\ClientController', 'edit'],
    'POST /clients/{id}/update'     => ['Clients\ClientController', 'update'],
    'POST /clients/{id}/delete'     => ['Clients\ClientController', 'delete'],

    // Debts
    'GET  /debts'                   => ['Debts\DebtController', 'index'],
    'POST /debts/{id}/pay'          => ['Debts\DebtController', 'pay'],
    'GET  /debts/{id}/history'      => ['Debts\DebtController', 'history'],

    // Inventory
    'GET  /inventory'               => ['Inventory\InventoryController', 'index'],
    'POST /inventory/adjust'        => ['Inventory\InventoryController', 'adjust'],
    'GET  /suppliers'               => ['Inventory\InventoryController', 'suppliers'],
    'POST /suppliers'               => ['Inventory\InventoryController', 'storeSupplier'],
    'GET  /purchase-orders'         => ['Inventory\InventoryController', 'orders'],
    'POST /purchase-orders'         => ['Inventory\InventoryController', 'storeOrder'],

    // Loans
    'GET  /loans'                   => ['Loans\LoanController', 'index'],
    'POST /loans'                   => ['Loans\LoanController', 'store'],
    'POST /loans/{id}/return'       => ['Loans\LoanController', 'return'],

    // Reports
    'GET  /reports'                 => ['Reports\ReportController', 'index'],
    'GET  /reports/revenue'         => ['Reports\ReportController', 'revenue'],
    'GET  /reports/services'        => ['Reports\ReportController', 'services'],
    'GET  /reports/inventory'       => ['Reports\ReportController', 'inventory'],
    'GET  /reports/export'          => ['Reports\ReportController', 'export'],

    // Settings
    'GET  /settings'                => ['Settings\SettingController', 'index'],
    'POST /settings'                => ['Settings\SettingController', 'update'],
    'GET  /settings/users'          => ['Settings\SettingController', 'users'],
    'POST /settings/users'          => ['Settings\SettingController', 'storeUser'],
    'POST /settings/users/{id}/delete' => ['Settings\SettingController', 'deleteUser'],

    // API (AJAX)
    'GET  /api/products/search'     => ['Api\ApiController', 'searchProducts'],
    'GET  /api/services/search'     => ['Api\ApiController', 'searchServices'],
    'GET  /api/clients/search'      => ['Api\ApiController', 'searchClients'],
    'GET  /api/dashboard/stats'     => ['Api\ApiController', 'dashboardStats'],
    'GET  /api/stock/low'           => ['Api\ApiController', 'lowStock'],
    'GET  /api/debts/overview'      => ['Api\ApiController', 'debtsOverview'],
    'POST /api/lang/switch'         => ['Api\ApiController', 'switchLang'],
];
