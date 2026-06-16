<?php
declare(strict_types=1);

namespace App\Controllers\Auth;

use App\Core\{Auth, Database, Request, Session, View, Validator};

class AuthController
{
    private Database $db;
    private Request  $request;

    public function __construct()
    {
        $this->db      = Database::getInstance();
        $this->request = new Request();
    }

    public function index(): void
    {
        header('Location: ' . BASE_URL . '/login');
        exit;
    }

    public function showLogin(): void
    {
        View::make('auth.login')->render();
    }

    public function login(): void
    {
        $email    = $this->request->post('email');
        $password = $this->request->post('password');

        $v = new Validator(['email' => $email, 'password' => $password]);
        $v->required('email')->required('password');

        if ($v->fails()) {
            Session::flash('error', $v->firstError());
            header('Location: ' . BASE_URL . '/login');
            exit;
        }

        $user = $this->db->fetch(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [$email]
        );

        if (!$user || !password_verify($password, $user['password'])) {
            Session::flash('error', __('invalid_credentials'));
            header('Location: ' . BASE_URL . '/login');
            exit;
        }

        if (!$user['is_active']) {
            Session::flash('error', __('account_disabled'));
            header('Location: ' . BASE_URL . '/login');
            exit;
        }

        // Update last login
        $this->db->update('users', ['last_login_at' => date('Y-m-d H:i:s')], 'id = :id', ['id' => $user['id']]);

        Auth::login($user);

        header('Location: ' . BASE_URL . '/dashboard');
        exit;
    }

    public function logout(): void
    {
        Auth::logout();
        header('Location: ' . BASE_URL . '/login');
        exit;
    }
}
