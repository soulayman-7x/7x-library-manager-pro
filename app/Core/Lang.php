<?php
declare(strict_types=1);

namespace App\Core;

class Lang
{
    private static array $strings = [];
    private static string $current = 'fr';

    public static function load(): void
    {
        self::$current = Session::get('lang', 'fr');
        $file = LANG_PATH . '/' . self::$current . '.json';
        if (!file_exists($file)) {
            $file = LANG_PATH . '/fr.json';
        }
        self::$strings = json_decode(file_get_contents($file), true) ?? [];
    }

    public static function get(string $key, array $replace = []): string
    {
        $text = self::$strings[$key] ?? $key;
        foreach ($replace as $k => $v) {
            $text = str_replace(':' . $k, $v, $text);
        }
        return $text;
    }

    public static function current(): string
    {
        return self::$current;
    }

    public static function switch(string $lang): void
    {
        if (in_array($lang, ['en', 'fr'])) {
            Session::set('lang', $lang);
        }
    }
}

function __( string $key, array $replace = []): string
{
    return \App\Core\Lang::get($key, $replace);
}
