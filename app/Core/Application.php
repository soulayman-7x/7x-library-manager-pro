<?php
declare(strict_types=1);

namespace App\Core;

class Application
{
    private Router $router;
    private Request $request;

    public function __construct()
    {
        date_default_timezone_set('Africa/Casablanca');

        if (config('app.debug')) {
            error_reporting(E_ALL);
            ini_set('display_errors', '1');
        }

        Session::start();
        $this->request = new Request();
        $this->router  = new Router($this->request);

        $routes = require ROOT_PATH . '/config/routes.php';
        foreach ($routes as $route => $handler) {
            [$method, $path] = explode('  ', $route, 2);
            $this->router->add(trim($method), trim($path), $handler);
        }
    }

    public function run(): void
    {
        $this->router->dispatch();
    }
}

function config(string $key): mixed
{
    static $configs = [];
    [$file, $k] = explode('.', $key, 2);
    if (!isset($configs[$file])) {
        $configs[$file] = require ROOT_PATH . '/config/' . $file . '.php';
    }
    return $configs[$file][$k] ?? null;
}
