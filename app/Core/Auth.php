<?php
declare(strict_types=1);

namespace App\Core;

class Auth
{
    public static function check(): bool
    {
        return Session::has('user_id');
    }

    public static function user(): ?array
    {
        if (!self::check()) return null;
        static $user = null;
        if ($user === null) {
            $db   = Database::getInstance();
            $user = $db->fetch('SELECT * FROM users WHERE id = ? AND is_active = 1', [Session::get('user_id')]);
        }
        return $user;
    }

    public static function id(): ?int
    {
        return Session::get('user_id');
    }

    public static function role(): ?string
    {
        return Session::get('user_role');
    }

    public static function isSuperAdmin(): bool
    {
        return self::role() === 'super_admin';
    }

    public static function isCashier(): bool
    {
        return self::role() === 'cashier';
    }

    public static function can(string $permission): bool
    {
        if (self::isSuperAdmin()) return true;

        $cashierAllowed = ['pos.view', 'pos.sale', 'services.view', 'services.sale', 'clients.view', 'dashboard.view'];
        return in_array($permission, $cashierAllowed, true);
    }

    public static function login(array $user): void
    {
        Session::regenerate();
        Session::set('user_id', $user['id']);
        Session::set('user_role', $user['role']);
        Session::set('user_name', $user['name']);
        Session::set('lang', Session::get('lang', 'fr'));
    }

    public static function logout(): void
    {
        Session::destroy();
    }
}
