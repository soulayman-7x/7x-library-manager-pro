-- ============================================================
-- 7X Library Pro — Database Schema
-- Hybrid Business Ecosystem: Library + POS + Printing + Stationery
-- MySQL 8+ / MariaDB 10.6+
-- ============================================================

SET NAMES utf8mb4;
SET foreign_key_checks = 0;

CREATE DATABASE IF NOT EXISTS `7x_library_pro`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `7x_library_pro`;

-- ============================================================
-- USERS & AUTH
-- ============================================================
CREATE TABLE IF NOT EXISTS `users` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name`          VARCHAR(100) NOT NULL,
    `email`         VARCHAR(150) NOT NULL UNIQUE,
    `password`      VARCHAR(255) NOT NULL,
    `role`          ENUM('super_admin','cashier') NOT NULL DEFAULT 'cashier',
    `avatar`        VARCHAR(255) DEFAULT NULL,
    `is_active`     TINYINT(1) NOT NULL DEFAULT 1,
    `last_login_at` TIMESTAMP NULL DEFAULT NULL,
    `created_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- CLIENTS (unified: buyers + borrowers)
-- ============================================================
CREATE TABLE IF NOT EXISTS `clients` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `code`          VARCHAR(20) NOT NULL UNIQUE,
    `name`          VARCHAR(150) NOT NULL,
    `email`         VARCHAR(150) DEFAULT NULL,
    `phone`         VARCHAR(20) DEFAULT NULL,
    `address`       TEXT DEFAULT NULL,
    `photo`         VARCHAR(255) DEFAULT NULL,
    `type`          ENUM('individual','company','student') NOT NULL DEFAULT 'individual',
    `debt_limit`    DECIMAL(10,2) NOT NULL DEFAULT 500.00,
    `notes`         TEXT DEFAULT NULL,
    `is_active`     TINYINT(1) NOT NULL DEFAULT 1,
    `created_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- PRODUCT CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS `categories` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name`          VARCHAR(100) NOT NULL,
    `slug`          VARCHAR(120) NOT NULL UNIQUE,
    `color`         VARCHAR(10) NOT NULL DEFAULT '#2563EB',
    `icon`          VARCHAR(50) DEFAULT 'fa-tag',
    `parent_id`     INT UNSIGNED DEFAULT NULL,
    `sort_order`    INT NOT NULL DEFAULT 0,
    `is_active`     TINYINT(1) NOT NULL DEFAULT 1,
    FOREIGN KEY (`parent_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE IF NOT EXISTS `products` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `sku`           VARCHAR(50) NOT NULL UNIQUE,
    `barcode`       VARCHAR(100) DEFAULT NULL,
    `name`          VARCHAR(200) NOT NULL,
    `description`   TEXT DEFAULT NULL,
    `category_id`   INT UNSIGNED DEFAULT NULL,
    `brand`         VARCHAR(100) DEFAULT NULL,
    `unit`          VARCHAR(20) NOT NULL DEFAULT 'pcs',
    `cost_price`    DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `sell_price`    DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `stock_qty`     DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `min_stock`     DECIMAL(10,2) NOT NULL DEFAULT 5.00,
    `cover`         VARCHAR(255) DEFAULT NULL,
    `is_active`     TINYINT(1) NOT NULL DEFAULT 1,
    `created_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- SERVICE CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS `service_categories` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name`          VARCHAR(100) NOT NULL,
    `icon`          VARCHAR(50) DEFAULT 'fa-print',
    `color`         VARCHAR(10) NOT NULL DEFAULT '#2563EB',
    `sort_order`    INT NOT NULL DEFAULT 0,
    `is_active`     TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

-- ============================================================
-- SERVICES
-- ============================================================
CREATE TABLE IF NOT EXISTS `services` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `code`          VARCHAR(30) NOT NULL UNIQUE,
    `name`          VARCHAR(150) NOT NULL,
    `description`   TEXT DEFAULT NULL,
    `category_id`   INT UNSIGNED DEFAULT NULL,
    `unit`          ENUM('per_page','per_copy','per_job','per_hour','per_item') NOT NULL DEFAULT 'per_job',
    `base_price`    DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `is_active`     TINYINT(1) NOT NULL DEFAULT 1,
    `created_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `service_categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- SERVICE PRICING RULES (micro-sales engine)
-- ============================================================
CREATE TABLE IF NOT EXISTS `service_pricing` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `service_id`    INT UNSIGNED NOT NULL,
    `label`         VARCHAR(100) NOT NULL,     -- e.g. "Color A4 Double-Sided"
    `color_mode`    ENUM('bw','color','na') NOT NULL DEFAULT 'na',
    `paper_size`    ENUM('A4','A3','A5','Letter','na') NOT NULL DEFAULT 'na',
    `print_mode`    ENUM('single','double','na') NOT NULL DEFAULT 'na',
    `unit_price`    DECIMAL(10,2) NOT NULL,
    `min_qty`       INT NOT NULL DEFAULT 1,
    `is_active`     TINYINT(1) NOT NULL DEFAULT 1,
    FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- SALES (Hybrid — products + services on one invoice)
-- ============================================================
CREATE TABLE IF NOT EXISTS `sales` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `ref`           VARCHAR(30) NOT NULL UNIQUE,
    `client_id`     INT UNSIGNED DEFAULT NULL,
    `user_id`       INT UNSIGNED NOT NULL,
    `subtotal`      DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `discount`      DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `tax`           DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `total`         DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `paid`          DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `change_due`    DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `balance_due`   DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `payment_method` ENUM('cash','card','credit','mixed') NOT NULL DEFAULT 'cash',
    `status`        ENUM('completed','partial','voided') NOT NULL DEFAULT 'completed',
    `notes`         TEXT DEFAULT NULL,
    `created_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`user_id`)   REFERENCES `users`(`id`)
) ENGINE=InnoDB;

-- Product line items
CREATE TABLE IF NOT EXISTS `sale_items` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `sale_id`       INT UNSIGNED NOT NULL,
    `product_id`    INT UNSIGNED NOT NULL,
    `qty`           DECIMAL(10,2) NOT NULL,
    `unit_price`    DECIMAL(10,2) NOT NULL,
    `discount`      DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `subtotal`      DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (`sale_id`)    REFERENCES `sales`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
) ENGINE=InnoDB;

-- Service line items
CREATE TABLE IF NOT EXISTS `service_sale_items` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `sale_id`       INT UNSIGNED NOT NULL,
    `service_id`    INT UNSIGNED NOT NULL,
    `pricing_id`    INT UNSIGNED DEFAULT NULL,
    `qty`           DECIMAL(10,2) NOT NULL,
    `unit_price`    DECIMAL(10,2) NOT NULL,
    `description`   VARCHAR(255) DEFAULT NULL,   -- e.g. "Color A4 x5 pages"
    `subtotal`      DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (`sale_id`)   REFERENCES `sales`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`service_id`) REFERENCES `services`(`id`),
    FOREIGN KEY (`pricing_id`) REFERENCES `service_pricing`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- DEBTS
-- ============================================================
CREATE TABLE IF NOT EXISTS `debts` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `client_id`     INT UNSIGNED NOT NULL,
    `sale_id`       INT UNSIGNED DEFAULT NULL,
    `original_amount` DECIMAL(10,2) NOT NULL,
    `paid_amount`   DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `remaining`     DECIMAL(10,2) NOT NULL,
    `due_date`      DATE DEFAULT NULL,
    `status`        ENUM('pending','partial','paid','overdue') NOT NULL DEFAULT 'pending',
    `notes`         TEXT DEFAULT NULL,
    `created_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`),
    FOREIGN KEY (`sale_id`)   REFERENCES `sales`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `debt_payments` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `debt_id`       INT UNSIGNED NOT NULL,
    `user_id`       INT UNSIGNED NOT NULL,
    `amount`        DECIMAL(10,2) NOT NULL,
    `payment_method` ENUM('cash','card') NOT NULL DEFAULT 'cash',
    `notes`         TEXT DEFAULT NULL,
    `created_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`debt_id`) REFERENCES `debts`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB;

-- ============================================================
-- SUPPLIERS & INVENTORY
-- ============================================================
CREATE TABLE IF NOT EXISTS `suppliers` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name`          VARCHAR(150) NOT NULL,
    `contact`       VARCHAR(100) DEFAULT NULL,
    `email`         VARCHAR(150) DEFAULT NULL,
    `phone`         VARCHAR(20) DEFAULT NULL,
    `address`       TEXT DEFAULT NULL,
    `is_active`     TINYINT(1) NOT NULL DEFAULT 1,
    `created_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `purchase_orders` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `ref`           VARCHAR(30) NOT NULL UNIQUE,
    `supplier_id`   INT UNSIGNED NOT NULL,
    `user_id`       INT UNSIGNED NOT NULL,
    `total`         DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `status`        ENUM('draft','ordered','received','cancelled') NOT NULL DEFAULT 'draft',
    `notes`         TEXT DEFAULT NULL,
    `ordered_at`    TIMESTAMP NULL DEFAULT NULL,
    `received_at`   TIMESTAMP NULL DEFAULT NULL,
    `created_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`),
    FOREIGN KEY (`user_id`)     REFERENCES `users`(`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `purchase_items` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `order_id`      INT UNSIGNED NOT NULL,
    `product_id`    INT UNSIGNED NOT NULL,
    `qty`           DECIMAL(10,2) NOT NULL,
    `cost_price`    DECIMAL(10,2) NOT NULL,
    `subtotal`      DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (`order_id`)   REFERENCES `purchase_orders`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `stock_adjustments` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `product_id`    INT UNSIGNED NOT NULL,
    `user_id`       INT UNSIGNED NOT NULL,
    `type`          ENUM('increase','decrease','correction') NOT NULL,
    `qty`           DECIMAL(10,2) NOT NULL,
    `reason`        VARCHAR(255) DEFAULT NULL,
    `created_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`),
    FOREIGN KEY (`user_id`)    REFERENCES `users`(`id`)
) ENGINE=InnoDB;

-- ============================================================
-- LOANS (Library Module)
-- ============================================================
CREATE TABLE IF NOT EXISTS `loans` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `ref`           VARCHAR(30) NOT NULL UNIQUE,
    `product_id`    INT UNSIGNED NOT NULL,
    `client_id`     INT UNSIGNED NOT NULL,
    `user_id`       INT UNSIGNED NOT NULL,
    `loaned_at`     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `due_at`        DATE NOT NULL,
    `returned_at`   TIMESTAMP NULL DEFAULT NULL,
    `fine_per_day`  DECIMAL(6,2) NOT NULL DEFAULT 1.00,
    `fine_total`    DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `fine_paid`     TINYINT(1) NOT NULL DEFAULT 0,
    `status`        ENUM('active','returned','overdue','lost') NOT NULL DEFAULT 'active',
    `notes`         TEXT DEFAULT NULL,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`),
    FOREIGN KEY (`client_id`)  REFERENCES `clients`(`id`),
    FOREIGN KEY (`user_id`)    REFERENCES `users`(`id`)
) ENGINE=InnoDB;

-- ============================================================
-- SETTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS `settings` (
    `key`           VARCHAR(100) NOT NULL PRIMARY KEY,
    `value`         TEXT DEFAULT NULL,
    `group`         VARCHAR(50) NOT NULL DEFAULT 'general',
    `updated_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- ACTIVITY LOG
-- ============================================================
CREATE TABLE IF NOT EXISTS `activity_log` (
    `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id`       INT UNSIGNED DEFAULT NULL,
    `action`        VARCHAR(100) NOT NULL,
    `entity`        VARCHAR(50) DEFAULT NULL,
    `entity_id`     INT UNSIGNED DEFAULT NULL,
    `description`   TEXT DEFAULT NULL,
    `ip`            VARCHAR(45) DEFAULT NULL,
    `created_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- SEED DATA
-- ============================================================

-- Default Super Admin (password: Admin@7X)
INSERT IGNORE INTO `users` (`name`, `email`, `password`, `role`) VALUES
('Super Admin', 'admin@7xlibrary.ma', '$2y$12$LuI5cELB6Gw5tXuFj.F7CeXgCyiHrQeAbJkVkR1Qq0fFBLSGCBJoq', 'super_admin');

-- Default settings
INSERT IGNORE INTO `settings` (`key`, `value`, `group`) VALUES
('business_name',    '7X Library Pro',       'general'),
('business_phone',   '',                     'general'),
('business_address', '',                     'general'),
('business_city',    'Casablanca',           'general'),
('currency',         'MAD',                  'general'),
('currency_symbol',  'DH',                   'general'),
('receipt_footer',   'Merci de votre visite!','receipt'),
('tax_rate',         '0',                    'general'),
('loan_fine_per_day','1.00',                 'loans'),
('low_stock_alert',  '5',                    'inventory');

-- Service categories
INSERT IGNORE INTO `service_categories` (`name`, `icon`, `color`) VALUES
('Impression',      'fa-print',         '#2563EB'),
('Photocopie',      'fa-copy',          '#7C3AED'),
('Numerisation',    'fa-scanner',       '#059669'),
('Reliure',         'fa-book-open',     '#DC2626'),
('Plastification',  'fa-layer-group',   '#D97706'),
('Services Admin',  'fa-file-alt',      '#0891B2');

-- Services
INSERT IGNORE INTO `services` (`code`, `name`, `category_id`, `unit`, `base_price`) VALUES
('PRINT-BW',    'Impression Noir & Blanc',  1, 'per_page',  0.50),
('PRINT-COLOR', 'Impression Couleur',       1, 'per_page',  2.00),
('COPY-BW',     'Photocopie N&B',           2, 'per_copy',  0.50),
('COPY-COLOR',  'Photocopie Couleur',       2, 'per_copy',  2.00),
('SCAN',        'Numerisation',             3, 'per_page',  1.00),
('BIND-SPIRAL', 'Reliure Spirale',          4, 'per_job',   8.00),
('BIND-THERMO', 'Reliure Thermique',        4, 'per_job',  12.00),
('LAMINATE-A4', 'Plastification A4',        5, 'per_item',  5.00),
('LAMINATE-A3', 'Plastification A3',        5, 'per_item',  8.00),
('CV-CREATE',   'Creation de CV',           6, 'per_job',  25.00),
('CV-FORMAT',   'Mise en Forme Document',   6, 'per_job',  15.00),
('ADMIN-DOC',   'Service Administratif',    6, 'per_job',  20.00);

-- Service pricing rules
INSERT IGNORE INTO `service_pricing` (`service_id`, `label`, `color_mode`, `paper_size`, `print_mode`, `unit_price`) VALUES
(1, 'N&B A4 Recto',         'bw',    'A4', 'single', 0.50),
(1, 'N&B A4 Recto-Verso',   'bw',    'A4', 'double', 0.80),
(1, 'N&B A3 Recto',         'bw',    'A3', 'single', 1.00),
(2, 'Couleur A4 Recto',     'color', 'A4', 'single', 2.00),
(2, 'Couleur A4 Recto-Verso','color','A4', 'double', 3.50),
(2, 'Couleur A3 Recto',     'color', 'A3', 'single', 4.00);

-- Product categories
INSERT IGNORE INTO `categories` (`name`, `slug`, `color`, `icon`) VALUES
('Livres',          'livres',           '#2563EB', 'fa-book'),
('Cahiers',         'cahiers',          '#7C3AED', 'fa-book-open'),
('Stylos & Ecriture','stylos',          '#059669', 'fa-pen'),
('Fournitures Scolaires','scolaire',    '#DC2626', 'fa-backpack'),
('Fournitures Bureau','bureau',         '#D97706', 'fa-briefcase'),
('Papeterie',       'papeterie',        '#0891B2', 'fa-paperclip'),
('Divers',          'divers',           '#6B7280', 'fa-box');

SET foreign_key_checks = 1;
