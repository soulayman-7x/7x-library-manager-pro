<?php
return [
    'name'     => '7X Library Pro',
    'version'  => '1.0.0',
    'env'      => $_ENV['APP_ENV'] ?? 'development',
    'debug'    => ($_ENV['APP_DEBUG'] ?? 'true') === 'true',
    'url'      => $_ENV['APP_URL'] ?? 'http://localhost/7x-library-manager-pro/public',
    'timezone' => 'Africa/Casablanca',
    'locale'   => 'fr',
    'currency' => 'MAD',
    'currency_symbol' => 'DH',
];
