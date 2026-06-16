<?php
declare(strict_types=1);

namespace App\Core;

class View
{
    private array $data = [];

    public function __construct(private string $view)
    {
        Lang::load();
    }

    public function with(string $key, mixed $value): static
    {
        $this->data[$key] = $value;
        return $this;
    }

    public function withMany(array $data): static
    {
        $this->data = array_merge($this->data, $data);
        return $this;
    }

    public function render(): void
    {
        extract($this->data);
        $viewFile = VIEW_PATH . '/' . str_replace('.', '/', $this->view) . '.php';

        if (!file_exists($viewFile)) {
            throw new \RuntimeException("View not found: {$this->view}");
        }

        require $viewFile;
    }

    public static function make(string $view, array $data = []): static
    {
        return (new static($view))->withMany($data);
    }

    public static function partial(string $partial, array $data = []): void
    {
        extract($data);
        $file = VIEW_PATH . '/partials/' . $partial . '.php';
        if (file_exists($file)) require $file;
    }

    public static function escape(mixed $value): string
    {
        return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }
}

function e(mixed $value): string
{
    return \App\Core\View::escape($value);
}

function asset(string $path): string
{
    return ASSET_PATH . '/' . ltrim($path, '/');
}

function url(string $path = ''): string
{
    return BASE_URL . '/' . ltrim($path, '/');
}
