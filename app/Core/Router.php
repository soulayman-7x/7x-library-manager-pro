<?php
declare(strict_types=1);

namespace App\Core;

class Router
{
    private array $routes = [];
    private Request $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function add(string $method, string $path, array $handler): void
    {
        $this->routes[] = compact('method', 'path', 'handler');
    }

    public function dispatch(): void
    {
        $method = $this->request->method();
        $uri    = $this->request->uri();

        // Auth middleware — always applied
        $authMiddleware = new \App\Middleware\AuthMiddleware();

        foreach ($this->routes as $route) {
            $params = $this->match($route['path'], $uri);
            if ($params !== false && strtoupper($route['method']) === $method) {
                $authMiddleware->handle($this->request, $route['path']);
                $this->invoke($route['handler'], $params);
                return;
            }
        }

        $this->notFound();
    }

    private function match(string $routePath, string $uri): array|false
    {
        $pattern = preg_replace('/\{[a-z_]+\}/', '([^/]+)', $routePath);
        $pattern = '#^' . $pattern . '$#';

        if (!preg_match($pattern, $uri, $matches)) {
            return false;
        }

        array_shift($matches);
        return $matches;
    }

    private function invoke(array $handler, array $params): void
    {
        [$controllerPath, $method] = $handler;
        $class = 'App\\Controllers\\' . str_replace('/', '\\', $controllerPath);

        if (!class_exists($class)) {
            $this->notFound();
            return;
        }

        $controller = new $class();
        $controller->$method(...$params);
    }

    private function notFound(): void
    {
        http_response_code(404);
        echo '<h1 style="font-family:monospace;text-align:center;margin-top:20vh">404 — Not Found</h1>';
    }
}
