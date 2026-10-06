<?php
/* =====================================================================
   BIRRERIA OKTOBERFEST · API del pannello admin · funzioni comuni
   PHP >= 7.4, nessun database: il menù è un file JSON.
   ===================================================================== */
declare(strict_types=1);

define('OKT_ROOT', dirname(__DIR__));                       // cartella del menù (dove sta index.html)
define('OKT_DATA', OKT_ROOT . '/data');
define('OKT_BACKUPS', OKT_DATA . '/backups');
define('OKT_STATE', __DIR__ . '/state');                    // config, tentativi di login
define('OKT_CONFIG', OKT_STATE . '/config.php');
define('OKT_UPLOADS', OKT_ROOT . '/assets/img/uploads');
define('OKT_LIVE', OKT_DATA . '/menu.json');
define('OKT_DRAFT', OKT_DATA . '/draft.json');
define('OKT_FALLBACK', OKT_ROOT . '/assets/js/menu-fallback.js');
define('OKT_MAX_BACKUPS', 40);
define('OKT_MAX_UPLOAD', 3 * 1024 * 1024);
define('OKT_LOCK_AFTER', 6);          // tentativi falliti
define('OKT_LOCK_MINUTES', 15);

/* hosting senza mbstring: ricade su substr */
if (!function_exists('mb_substr')) { function mb_substr($s, $start, $len = null) { return $len === null ? substr($s, $start) : substr($s, $start, $len); } }

function okt_json(array $data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
function okt_fail(string $msg, int $status = 400, array $extra = []): void {
    okt_json(array_merge(['ok' => false, 'error' => $msg], $extra), $status);
}

function okt_ensure_dirs(): void {
    foreach ([OKT_DATA, OKT_BACKUPS, OKT_STATE, OKT_UPLOADS] as $d) {
        if (!is_dir($d)) @mkdir($d, 0755, true);
    }
    // Protezione: niente accesso diretto a stato e backup
    $ht = "Require all denied\n";
    foreach ([OKT_STATE, OKT_BACKUPS] as $d) {
        if (is_dir($d) && !file_exists("$d/.htaccess")) @file_put_contents("$d/.htaccess", "<IfModule mod_authz_core.c>\n$ht</IfModule>\n<IfModule !mod_authz_core.c>\nDeny from all\n</IfModule>\n");
    }
}

/* Scrittura atomica (file temporaneo + rename) */
function okt_write(string $path, string $content): bool {
    $tmp = $path . '.tmp.' . bin2hex(random_bytes(4));
    if (file_put_contents($tmp, $content, LOCK_EX) === false) return false;
    if (!@rename($tmp, $path)) { @unlink($tmp); return false; }
    @chmod($path, 0644);
    return true;
}

function okt_read_json(string $path): ?array {
    if (!is_file($path)) return null;
    $raw = file_get_contents($path);
    if ($raw === false) return null;
    $data = json_decode($raw, true);
    return is_array($data) ? $data : null;
}

/* ---------- configurazione (password) ---------- */
function okt_config(): ?array {
    if (!is_file(OKT_CONFIG)) return null;
    $cfg = include OKT_CONFIG;
    return is_array($cfg) && !empty($cfg['hash']) ? $cfg : null;
}
function okt_save_config(array $cfg): bool {
    $php = "<?php\n// Generato dal pannello admin. Non modificare a mano.\nreturn " . var_export($cfg, true) . ";\n";
    return okt_write(OKT_CONFIG, $php);
}

/* ---------- sessione ---------- */
function okt_session_start(): void {
    if (session_status() === PHP_SESSION_ACTIVE) return;
    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
    session_name('oktadmin');
    session_set_cookie_params([
        'lifetime' => 0, 'path' => okt_base_path(), 'domain' => '',
        'secure' => $secure, 'httponly' => true, 'samesite' => 'Strict',
    ]);
    session_start();
    if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(24));
}
/* percorso base del menù (es. /birreriaoktoberfest/) ricavato dalla posizione dell'API */
function okt_base_path(): string {
    $script = $_SERVER['SCRIPT_NAME'] ?? '/api/index.php';
    $base = preg_replace('#/api/[^/]*$#', '/', $script);
    return $base === '' ? '/' : $base;
}
function okt_is_authed(): bool { return !empty($_SESSION['auth']) && $_SESSION['auth'] === true; }
function okt_require_auth(): void {
    if (!okt_is_authed()) okt_fail('Accesso richiesto', 401, ['authed' => false]);
}
function okt_require_csrf(): void {
    $tok = $_SERVER['HTTP_X_CSRF'] ?? '';
    if (!$tok || !hash_equals($_SESSION['csrf'] ?? '', $tok)) okt_fail('Sessione non valida, ricarica la pagina', 403);
}
function okt_require_post(): void {
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') okt_fail('Metodo non consentito', 405);
}

/* ---------- limitazione tentativi di login ---------- */
function okt_attempts_file(): string { return OKT_STATE . '/attempts.json'; }
function okt_login_locked(): int {
    $a = okt_read_json(okt_attempts_file()) ?: ['n' => 0, 't' => 0];
    if ($a['n'] >= OKT_LOCK_AFTER && time() - $a['t'] < OKT_LOCK_MINUTES * 60) {
        return OKT_LOCK_MINUTES * 60 - (time() - $a['t']);
    }
    return 0;
}
function okt_login_failed(): void {
    $a = okt_read_json(okt_attempts_file()) ?: ['n' => 0, 't' => 0];
    if (time() - $a['t'] > OKT_LOCK_MINUTES * 60) $a['n'] = 0;
    $a['n']++; $a['t'] = time();
    okt_write(okt_attempts_file(), json_encode($a));
}
function okt_login_ok(): void { @unlink(okt_attempts_file()); }

/* ---------- validazione e normalizzazione del menù ---------- */
function okt_str($v, int $max = 4000): string {
    if (is_array($v) || is_object($v)) return '';
    $s = trim((string)$v);
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $s) ?? '';
    return mb_substr($s, 0, $max);
}
function okt_bool($v): bool { return $v === true || $v === 1 || $v === '1' || $v === 'true'; }
function okt_id($v, string $fallback): string {
    $s = strtolower(okt_str($v, 80));
    $s = preg_replace('/[^a-z0-9\-]+/', '-', $s) ?? '';
    $s = trim($s, '-');
    return $s !== '' ? $s : $fallback;
}
function okt_slug(string $s): string {
    $s = strtolower(trim($s));
    if (function_exists('iconv')) { $t = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $s); if ($t !== false) $s = $t; }
    $s = preg_replace('/[^a-z0-9]+/', '-', $s) ?? '';
    return trim($s, '-');
}
function okt_price($v): ?float {
    if ($v === null || $v === '') return null;
    if (is_string($v)) $v = str_replace(',', '.', $v);
    if (!is_numeric($v)) return null;
    $f = round((float)$v, 2);
    return ($f < 0 || $f > 100000) ? null : $f;
}
function okt_img_path($v): string {
    $s = okt_str($v, 200);
    if ($s === '') return '';
    // consentiti solo file dentro assets/img (beers/ o uploads/), niente percorsi relativi
    if (!preg_match('#^(beers|uploads)/[A-Za-z0-9._\-]+\.(webp|png|jpe?g|svg)$#i', $s)) return '';
    return $s;
}
function okt_str_list($v, int $maxItems = 20): array {
    if (!is_array($v)) return [];
    $out = [];
    foreach ($v as $x) { $s = okt_str($x, 300); if ($s !== '') $out[] = $s; if (count($out) >= $maxItems) break; }
    return $out;
}

function okt_normalize_menu($in): array {
    if (!is_array($in)) throw new InvalidArgumentException('Dati non validi');
    $usedIds = [];
    $uniq = function (string $id) use (&$usedIds): string {
        $base = $id; $n = 2;
        while (isset($usedIds[$id])) { $id = $base . '-' . $n++; }
        $usedIds[$id] = true;
        return $id;
    };
    $b = is_array($in['brand'] ?? null) ? $in['brand'] : [];
    $out = [
        'version' => 1,
        'updatedAt' => gmdate('c'),
        'brand' => [
            'name' => okt_str($b['name'] ?? 'Birreria Oktoberfest', 120),
            'city' => okt_str($b['city'] ?? '', 120),
            'instagram' => ltrim(okt_str($b['instagram'] ?? '', 80), '@'),
            'instagramUrl' => okt_str($b['instagramUrl'] ?? '', 300),
            'address' => okt_str($b['address'] ?? '', 200),
            'mapsUrl' => okt_str($b['mapsUrl'] ?? '', 500),
            'phone' => okt_str($b['phone'] ?? '', 40),
            'phoneHref' => 'tel:' . preg_replace('/[^0-9+]/', '', okt_str($b['phone'] ?? '', 40)),
            'serviceNote' => okt_str($b['serviceNote'] ?? '', 200), 'serviceNote_en' => okt_str($b['serviceNote_en'] ?? '', 200),
            'allergyNote' => okt_str($b['allergyNote'] ?? '', 500), 'allergyNote_en' => okt_str($b['allergyNote_en'] ?? '', 500),
            'frozenNote' => okt_str($b['frozenNote'] ?? '', 500), 'frozenNote_en' => okt_str($b['frozenNote_en'] ?? '', 500),
        ],
        'priceLabels' => [],
        'tagLabels' => [],
        'sections' => [],
        'allergens' => [],
    ];
    if ($out['brand']['instagram'] !== '' && $out['brand']['instagramUrl'] === '') $out['brand']['instagramUrl'] = 'https://www.instagram.com/' . $out['brand']['instagram'] . '/';
    foreach ((array)($in['priceLabels'] ?? []) as $k => $v) { $k = okt_str($k, 60); $v = okt_str($v, 60); if ($k !== '' && $v !== '') $out['priceLabels'][$k] = $v; }
    foreach ((array)($in['tagLabels'] ?? []) as $k => $v) {
        $k = okt_id($k, ''); if ($k === '' || !is_array($v)) continue;
        $out['tagLabels'][$k] = ['it' => okt_str($v['it'] ?? '', 60), 'en' => okt_str($v['en'] ?? '', 60)];
    }
    $validTags = array_keys($out['tagLabels']);
    $validNotes = ['service', 'allergy', 'frozen'];
    $si = 0;
    foreach ((array)($in['sections'] ?? []) as $s) {
        if (!is_array($s)) continue; $si++;
        $sec = [
            'id' => $uniq(okt_id($s['id'] ?? '', 'sezione-' . $si)),
            'hidden' => okt_bool($s['hidden'] ?? false),
            'title' => okt_str($s['title'] ?? '', 120), 'title_en' => okt_str($s['title_en'] ?? '', 120),
            'short' => okt_str($s['short'] ?? '', 40), 'short_en' => okt_str($s['short_en'] ?? '', 40),
            'subtitle' => okt_str($s['subtitle'] ?? '', 200), 'subtitle_en' => okt_str($s['subtitle_en'] ?? '', 200),
            'icon' => okt_id($s['icon'] ?? 'star', 'star'),
            'notes' => array_values(array_intersect($validNotes, okt_str_list($s['notes'] ?? [], 3))),
            'groups' => [],
        ];
        if ($sec['title'] === '') $sec['title'] = 'Sezione ' . $si;
        $gi = 0;
        foreach ((array)($s['groups'] ?? []) as $g) {
            if (!is_array($g)) continue; $gi++;
            $grp = [
                'id' => $uniq(okt_id($g['id'] ?? '', $sec['id'] . '--' . (okt_slug(okt_str($g['title'] ?? '')) ?: 'gruppo-' . $gi))),
                'hidden' => okt_bool($g['hidden'] ?? false),
                'title' => okt_str($g['title'] ?? '', 120), 'title_en' => okt_str($g['title_en'] ?? '', 120),
                'intro' => okt_str($g['intro'] ?? '', 300), 'intro_en' => okt_str($g['intro_en'] ?? '', 300),
                'footnotes' => okt_str_list($g['footnotes'] ?? [], 5), 'footnotes_en' => okt_str_list($g['footnotes_en'] ?? [], 5),
                'items' => [],
            ];
            $ii = 0;
            foreach ((array)($g['items'] ?? []) as $it) {
                if (!is_array($it)) continue; $ii++;
                $name = okt_str($it['name'] ?? '', 120);
                if ($name === '') continue; // una voce senza nome non viene salvata
                $prices = [];
                foreach ((array)($it['prices'] ?? []) as $p) {
                    if (!is_array($p)) continue;
                    $val = okt_price($p['p'] ?? null);
                    if ($val === null) continue;
                    $prices[] = ['l' => okt_str($p['l'] ?? '', 60), 'l_en' => okt_str($p['l_en'] ?? '', 60), 'p' => $val];
                    if (count($prices) >= 12) break;
                }
                $tags = array_values(array_intersect($validTags, okt_str_list($it['tags'] ?? [], 10)));
                $item = [
                    'id' => $uniq(okt_id($it['id'] ?? '', substr($sec['id'], 0, 6) . '-' . (okt_slug($name) ?: 'voce') . '-' . $ii)),
                    'hidden' => okt_bool($it['hidden'] ?? false),
                    'soldout' => okt_bool($it['soldout'] ?? false),
                    'name' => $name, 'name_en' => okt_str($it['name_en'] ?? '', 120),
                    'badge' => okt_str($it['badge'] ?? '', 40), 'badge_en' => okt_str($it['badge_en'] ?? '', 40),
                    'sub' => okt_str($it['sub'] ?? '', 200), 'sub_en' => okt_str($it['sub_en'] ?? '', 200),
                    'desc' => okt_str($it['desc'] ?? '', 2000), 'desc_en' => okt_str($it['desc_en'] ?? '', 2000),
                    'prices' => $prices,
                    'tags' => $tags,
                    'img' => okt_img_path($it['img'] ?? ''),
                    'abv' => okt_str($it['abv'] ?? '', 12), 'style' => okt_str($it['style'] ?? '', 60),
                    'brewery' => okt_str($it['brewery'] ?? '', 80), 'origin' => okt_str($it['origin'] ?? '', 80),
                ];
                $grp['items'][] = $item;
            }
            $sec['groups'][] = $grp;
        }
        $out['sections'][] = $sec;
    }
    $a = is_array($in['allergens'] ?? null) ? $in['allergens'] : [];
    $list = [];
    foreach ((array)($a['list'] ?? []) as $i => $row) {
        if (!is_array($row)) continue;
        $t = okt_str($row['t'] ?? '', 200); if ($t === '') continue;
        $list[] = ['n' => (int)($row['n'] ?? ($i + 1)), 't' => $t, 't_en' => okt_str($row['t_en'] ?? '', 200)];
        if (count($list) >= 30) break;
    }
    $out['allergens'] = [
        'id' => 'allergeni',
        'hidden' => okt_bool($a['hidden'] ?? false),
        'title' => okt_str($a['title'] ?? 'Allergeni', 80), 'title_en' => okt_str($a['title_en'] ?? '', 80),
        'short' => okt_str($a['short'] ?? '', 40), 'short_en' => okt_str($a['short_en'] ?? '', 40),
        'heading' => okt_str($a['heading'] ?? '', 500), 'heading_en' => okt_str($a['heading_en'] ?? '', 500),
        'legal' => okt_str($a['legal'] ?? '', 800), 'legal_en' => okt_str($a['legal_en'] ?? '', 800),
        'notice' => okt_str($a['notice'] ?? '', 800), 'notice_en' => okt_str($a['notice_en'] ?? '', 800),
        'listIntro' => okt_str($a['listIntro'] ?? '', 800), 'listIntro_en' => okt_str($a['listIntro_en'] ?? '', 800),
        'list' => $list,
        'signature' => okt_str($a['signature'] ?? '', 80), 'signature_en' => okt_str($a['signature_en'] ?? '', 80),
    ];
    return $out;
}

function okt_encode(array $menu): string {
    return json_encode($menu, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
}

/* Pubblica: backup del live, scrive menu.json e il fallback JS */
function okt_publish(array $menu): void {
    okt_ensure_dirs();
    if (is_file(OKT_LIVE)) {
        $stamp = gmdate('Ymd-His') . '-' . bin2hex(random_bytes(2));
        @copy(OKT_LIVE, OKT_BACKUPS . "/menu-$stamp.json");
        // tieni solo gli ultimi N
        $files = glob(OKT_BACKUPS . '/menu-*.json') ?: [];
        sort($files);
        while (count($files) > OKT_MAX_BACKUPS) { @unlink(array_shift($files)); }
    }
    $json = okt_encode($menu);
    if (!okt_write(OKT_LIVE, $json . "\n")) throw new RuntimeException('Impossibile scrivere menu.json (permessi?)');
    okt_write(OKT_FALLBACK, "/* Generato automaticamente al momento della pubblicazione: copia di data/menu.json usata se il JSON non è raggiungibile. */\nwindow.MENU_FALLBACK = " . $json . ";\n");
    @unlink(OKT_DRAFT);
}

function okt_backups(): array {
    $files = glob(OKT_BACKUPS . '/menu-*.json') ?: [];
    rsort($files);
    $out = [];
    foreach ($files as $f) {
        $name = basename($f);
        $out[] = ['name' => $name, 'size' => filesize($f), 'time' => gmdate('c', filemtime($f))];
    }
    return $out;
}
