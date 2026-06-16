<?php
declare(strict_types=1);

namespace App\Middleware;

use App\Core\Auth;
use App\Core\Session;

class AuthMiddleware
{
    private const PUBLIC_ROUTES = ['/login', '/'];

    public function handle(\App\Core\Request $request, string $route): void
    {
        $uri = $request->uri();

        if (in_array($uri, self::PUBLIC_ROUTES, true)) {
            // If already logged in, redirect to dashboard
            if (Auth::check()) {
                header('Location: ' . BASE_URL . '/dashboard');
                exit;
            }
            return;
        }

        if (!Auth::check()) {
            Session::flash('error', 'Please log in to continue.');
            header('Location: ' . BASE_URL . '/login');
            exit;
        }
    }
}
