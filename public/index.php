<?php
declare(strict_types=1);

define('ROOT_PATH', dirname(__DIR__));
define('APP_PATH',  ROOT_PATH . '/app');
define('VIEW_PATH', ROOT_PATH . '/views');
define('LANG_PATH', ROOT_PATH . '/lang');
define('STORAGE_PATH', ROOT_PATH . '/storage');
define('ASSET_PATH', '/7x-library-manager-pro/assets');
define('BASE_URL', '/7x-library-manager-pro/public');

require_once ROOT_PATH . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(ROOT_PATH);
try { $dotenv->load(); } catch (Exception $e) {}

require_once APP_PATH . '/Core/Application.php';

$app = new \App\Core\Application();
$app->run();
