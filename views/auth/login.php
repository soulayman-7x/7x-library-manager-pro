<?php
use App\Core\{Session, View, Lang};
Lang::load();
$flash_error   = Session::getFlash('error');
$flash_success = Session::getFlash('success');
?>
<!DOCTYPE html>
<html lang="<?= Lang::current() ?>" class="h-full">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= __('sign_in') ?> — <?= __('app_name') ?></title>
<meta name="description" content="Sign in to 7X Library Pro - Moroccan Business Ecosystem">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

<!-- Tailwind -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'space':    '#09090B',
                'carbon':   '#18181B',
                'royal':    '#2563EB',
                'smoke':    '#F9FAFB',
                'titanium': '#D1D5DB',
            },
            fontFamily: { sans: ['Inter', 'sans-serif'] }
        }
    }
}
</script>

<!-- Alpine.js -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- SweetAlert2 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<style>
* { font-family: 'Inter', sans-serif; }

body {
    background: #09090B;
    min-height: 100vh;
    overflow: hidden;
}

/* Animated background grid */
.bg-grid {
    position: fixed;
    inset: 0;
    background-image:
        linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
    background-size: 64px 64px;
    animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
    0%   { transform: translateY(0); }
    100% { transform: translateY(64px); }
}

/* Glowing orbs */
.orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(120px);
    animation: orbFloat 8s ease-in-out infinite;
    pointer-events: none;
}

.orb-1 {
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%);
    top: -200px; left: -100px;
    animation-delay: 0s;
}

.orb-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%);
    bottom: -100px; right: -100px;
    animation-delay: 3s;
}

@keyframes orbFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50%       { transform: translateY(30px) scale(1.05); }
}

/* Glass card */
.glass-card {
    background: rgba(24,24,27,0.85);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    box-shadow:
        0 0 0 1px rgba(37,99,235,0.08),
        0 32px 64px rgba(0,0,0,0.6),
        0 16px 32px rgba(0,0,0,0.4),
        inset 0 1px 0 rgba(255,255,255,0.05);
}

/* Input styles */
.input-field {
    background: rgba(9,9,11,0.8);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    color: #F9FAFB;
    padding: 12px 16px 12px 44px;
    width: 100%;
    transition: all 0.2s ease;
    font-size: 14px;
    outline: none;
}

.input-field:focus {
    border-color: rgba(37,99,235,0.6);
    background: rgba(9,9,11,0.95);
    box-shadow: 0 0 0 3px rgba(37,99,235,0.12), 0 0 20px rgba(37,99,235,0.08);
}

.input-field::placeholder { color: rgba(209,213,219,0.4); }

/* Submit button */
.btn-primary {
    background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
    border: none;
    border-radius: 10px;
    color: #fff;
    padding: 13px 24px;
    width: 100%;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    letter-spacing: 0.01em;
}

.btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.2s;
}

.btn-primary:hover::before { opacity: 1; }
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,0.4); }
.btn-primary:active { transform: translateY(0); }

/* Logo glow */
.logo-glow {
    filter: drop-shadow(0 0 20px rgba(37,99,235,0.3));
}

/* Status badge */
.status-dot {
    width: 8px; height: 8px;
    background: #10B981;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.6; transform: scale(1.3); }
}

/* Slide in animation */
@keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
}

.animate-slide-up { animation: slideUp 0.5s ease both; }
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
</style>
</head>

<body class="flex items-center justify-center min-h-screen p-4">

<!-- Background effects -->
<div class="bg-grid"></div>
<div class="orb orb-1"></div>
<div class="orb orb-2"></div>

<div class="relative w-full max-w-sm z-10">

    <!-- Logo + header -->
    <div class="text-center mb-8 animate-slide-up">
        <div class="flex justify-center mb-5">
            <div class="relative">
                <div style="position:absolute;inset:-12px;background:radial-gradient(circle,rgba(37,99,235,0.2) 0%,transparent 70%);border-radius:50%;"></div>
                <img src="<?= asset('logo/7x-library.png') ?>"
                     alt="<?= __('app_name') ?>"
                     class="logo-glow relative"
                     style="width:72px;height:72px;object-fit:contain;border-radius:16px;">
            </div>
        </div>
        <h1 style="color:#F9FAFB;font-size:24px;font-weight:700;letter-spacing:-0.03em;margin-bottom:6px;">
            <?= __('app_name') ?>
        </h1>
        <p style="color:#D1D5DB;font-size:13px;opacity:0.7;">
            <?= __('sign_in_subtitle') ?>
        </p>
    </div>

    <!-- Card -->
    <div class="glass-card p-7 animate-slide-up delay-100" x-data="loginForm()">

        <!-- System status -->
        <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.15);border-radius:8px;margin-bottom:24px;">
            <div class="status-dot"></div>
            <span style="color:#10B981;font-size:12px;font-weight:500;">
                <?= date('d/m/Y') ?> &nbsp;&bull;&nbsp; Systeme operationnel
            </span>
        </div>

        <!-- Form -->
        <form method="POST" action="<?= url('login') ?>" @submit="loading = true" novalidate>
            <input type="hidden" name="csrf_token" value="<?= \App\Core\Session::csrf() ?>">

            <!-- Email -->
            <div class="mb-5 animate-slide-up delay-200">
                <label style="display:block;color:#D1D5DB;font-size:12px;font-weight:500;margin-bottom:8px;letter-spacing:0.04em;text-transform:uppercase;">
                    <?= __('email') ?>
                </label>
                <div style="position:relative;">
                    <i class="fa fa-envelope" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:rgba(209,213,219,0.4);font-size:14px;"></i>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        class="input-field"
                        placeholder="admin@7xlibrary.ma"
                        value="<?= e($_POST['email'] ?? '') ?>"
                        required
                        autocomplete="email"
                    >
                </div>
            </div>

            <!-- Password -->
            <div class="mb-6 animate-slide-up delay-200">
                <label style="display:block;color:#D1D5DB;font-size:12px;font-weight:500;margin-bottom:8px;letter-spacing:0.04em;text-transform:uppercase;">
                    <?= __('password') ?>
                </label>
                <div style="position:relative;">
                    <i class="fa fa-lock" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:rgba(209,213,219,0.4);font-size:14px;"></i>
                    <input
                        :type="showPass ? 'text' : 'password'"
                        name="password"
                        id="password"
                        class="input-field"
                        placeholder="••••••••"
                        required
                        autocomplete="current-password"
                        style="padding-right:44px;"
                    >
                    <button type="button"
                        @click="showPass = !showPass"
                        style="position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;color:rgba(209,213,219,0.4);cursor:pointer;padding:0;transition:color 0.2s;"
                        :style="showPass ? 'color:#2563EB' : ''"
                    >
                        <i :class="showPass ? 'fa fa-eye-slash' : 'fa fa-eye'" style="font-size:14px;"></i>
                    </button>
                </div>
            </div>

            <!-- Submit -->
            <div class="animate-slide-up delay-300">
                <button type="submit" class="btn-primary" :disabled="loading" id="submit-btn">
                    <span x-show="!loading" class="flex items-center justify-center gap-2">
                        <i class="fa fa-arrow-right-to-bracket"></i>
                        <?= __('sign_in') ?>
                    </span>
                    <span x-show="loading" class="flex items-center justify-center gap-2">
                        <i class="fa fa-spinner fa-spin"></i>
                        Connexion...
                    </span>
                </button>
            </div>
        </form>
    </div>

    <!-- Footer -->
    <div class="text-center mt-6 animate-slide-up delay-300">
        <p style="color:rgba(209,213,219,0.35);font-size:11px;">
            &copy; <?= date('Y') ?> <?= __('app_name') ?> &mdash; Moroccan Business Ecosystem
        </p>
    </div>
</div>

<script>
function loginForm() {
    return {
        showPass: false,
        loading: false
    }
}

<?php if ($flash_error): ?>
Swal.fire({
    icon: 'error',
    title: '<?= __('error') ?>',
    text: '<?= addslashes($flash_error) ?>',
    background: '#18181B',
    color: '#F9FAFB',
    confirmButtonColor: '#2563EB',
    iconColor: '#EF4444',
    timer: 4000,
    timerProgressBar: true,
    showConfirmButton: false,
    toast: true,
    position: 'top-end'
});
<?php endif; ?>
</script>

</body>
</html>
