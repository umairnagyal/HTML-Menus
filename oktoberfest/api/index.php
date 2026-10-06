<?php
/* =====================================================================
   BIRRERIA OKTOBERFEST · API del pannello admin
   Tutte le chiamate: /api/index.php?action=...
   GET  status | draft | live | backups | images | export
   POST setup | login | logout | save | publish | discard | restore | upload | password
   ===================================================================== */
declare(strict_types=1);
require __DIR__ . '/lib.php';

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
okt_ensure_dirs();
okt_session_start();

$action = $_GET['action'] ?? '';
$body = [];
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST' && stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false) {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw ?: '[]', true);
    if (!is_array($body)) $body = [];
}

try {
    switch ($action) {

        /* ---------------- stato ---------------- */
        case 'status': {
            $cfg = okt_config();
            $live = okt_read_json(OKT_LIVE);
            okt_json([
                'ok' => true,
                'setup' => $cfg === null,                 // true = nessuna password ancora impostata
                'authed' => okt_is_authed(),
                'csrf' => $_SESSION['csrf'],
                'draft' => is_file(OKT_DRAFT),
                'draftAt' => is_file(OKT_DRAFT) ? gmdate('c', filemtime(OKT_DRAFT)) : null,
                'publishedAt' => $live['updatedAt'] ?? (is_file(OKT_LIVE) ? gmdate('c', filemtime(OKT_LIVE)) : null),
                'locked' => okt_login_locked(),
                'base' => okt_base_path(),
            ]);
        }

        /* ---------------- prima configurazione ---------------- */
        case 'setup': {
            okt_require_post();
            if (okt_config() !== null) okt_fail('Password già impostata', 409);
            $pw = (string)($body['password'] ?? '');
            if (strlen($pw) < 8) okt_fail('La password deve avere almeno 8 caratteri');
            if (!okt_save_config(['hash' => password_hash($pw, PASSWORD_DEFAULT), 'created' => gmdate('c')])) okt_fail('Impossibile salvare la configurazione (permessi cartella api/state?)', 500);
            if (!is_file(OKT_LIVE)) {
                // primo avvio senza menu.json: parte dal fallback se esiste
                $fb = is_file(OKT_FALLBACK) ? file_get_contents(OKT_FALLBACK) : '';
                if ($fb && preg_match('/window\.MENU_FALLBACK\s*=\s*(\{.*\});\s*$/s', $fb, $m)) {
                    $d = json_decode($m[1], true); if (is_array($d)) okt_publish(okt_normalize_menu($d));
                }
            }
            session_regenerate_id(true);
            $_SESSION['auth'] = true;
            okt_json(['ok' => true, 'csrf' => $_SESSION['csrf']]);
        }

        case 'login': {
            okt_require_post();
            $cfg = okt_config();
            if ($cfg === null) okt_fail('Configurazione mancante', 409, ['setup' => true]);
            $wait = okt_login_locked();
            if ($wait > 0) okt_fail('Troppi tentativi. Riprova tra ' . (int)ceil($wait / 60) . ' minuti.', 429, ['locked' => $wait]);
            $pw = (string)($body['password'] ?? '');
            if (!password_verify($pw, $cfg['hash'])) { okt_login_failed(); usleep(400000); okt_fail('Password errata', 401); }
            okt_login_ok();
            session_regenerate_id(true);
            $_SESSION['auth'] = true;
            if (password_needs_rehash($cfg['hash'], PASSWORD_DEFAULT)) { $cfg['hash'] = password_hash($pw, PASSWORD_DEFAULT); okt_save_config($cfg); }
            okt_json(['ok' => true, 'csrf' => $_SESSION['csrf']]);
        }

        case 'logout': {
            okt_require_post();
            $_SESSION = [];
            if (ini_get('session.use_cookies')) { $p = session_get_cookie_params(); setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']); }
            session_destroy();
            okt_json(['ok' => true]);
        }

        /* ---------------- lettura ---------------- */
        case 'draft': {
            okt_require_auth();
            $d = okt_read_json(OKT_DRAFT);
            $isDraft = $d !== null;
            if ($d === null) $d = okt_read_json(OKT_LIVE);
            if ($d === null) okt_fail('Nessun menù trovato', 404);
            okt_json(['ok' => true, 'menu' => $d, 'isDraft' => $isDraft]);
        }
        case 'live': {
            okt_require_auth();
            $d = okt_read_json(OKT_LIVE);
            if ($d === null) okt_fail('Nessun menù pubblicato', 404);
            okt_json(['ok' => true, 'menu' => $d]);
        }
        case 'export': {
            okt_require_auth();
            $src = is_file(OKT_DRAFT) ? OKT_DRAFT : OKT_LIVE;
            if (!is_file($src)) okt_fail('Nessun menù', 404);
            header('Content-Type: application/json; charset=utf-8');
            header('Content-Disposition: attachment; filename="menu-oktoberfest-' . gmdate('Ymd-His') . '.json"');
            readfile($src); exit;
        }
        case 'backups': {
            okt_require_auth();
            okt_json(['ok' => true, 'backups' => okt_backups()]);
        }
        case 'images': {
            okt_require_auth();
            $out = [];
            foreach (['beers', 'uploads'] as $dir) {
                foreach (glob(OKT_ROOT . "/assets/img/$dir/*.{webp,png,jpg,jpeg,svg}", GLOB_BRACE) ?: [] as $f) {
                    $out[] = ['path' => "$dir/" . basename($f), 'size' => filesize($f)];
                }
            }
            okt_json(['ok' => true, 'images' => $out]);
        }

        /* ---------------- scrittura ---------------- */
        case 'save': {   // salva la bozza
            okt_require_post(); okt_require_auth(); okt_require_csrf();
            $menu = okt_normalize_menu($body['menu'] ?? null);
            if (!okt_write(OKT_DRAFT, okt_encode($menu) . "\n")) okt_fail('Impossibile salvare la bozza (permessi cartella data?)', 500);
            okt_json(['ok' => true, 'menu' => $menu, 'draftAt' => gmdate('c')]);
        }
        case 'publish': {
            okt_require_post(); okt_require_auth(); okt_require_csrf();
            $menu = isset($body['menu']) ? okt_normalize_menu($body['menu']) : okt_read_json(OKT_DRAFT);
            if ($menu === null) okt_fail('Nessuna bozza da pubblicare');
            okt_publish($menu);
            okt_json(['ok' => true, 'menu' => $menu, 'publishedAt' => $menu['updatedAt']]);
        }
        case 'discard': {
            okt_require_post(); okt_require_auth(); okt_require_csrf();
            @unlink(OKT_DRAFT);
            $live = okt_read_json(OKT_LIVE);
            okt_json(['ok' => true, 'menu' => $live]);
        }
        case 'restore': {  // carica un backup come bozza (non pubblica)
            okt_require_post(); okt_require_auth(); okt_require_csrf();
            $name = basename((string)($body['name'] ?? ''));
            if (!preg_match('/^menu-\d{8}-\d{6}(-[0-9a-f]{4})?\.json$/', $name) || !is_file(OKT_BACKUPS . "/$name")) okt_fail('Backup non trovato', 404);
            $d = okt_read_json(OKT_BACKUPS . "/$name");
            if ($d === null) okt_fail('Backup non leggibile', 500);
            $menu = okt_normalize_menu($d);
            okt_write(OKT_DRAFT, okt_encode($menu) . "\n");
            okt_json(['ok' => true, 'menu' => $menu]);
        }
        case 'upload': {
            okt_require_post(); okt_require_auth(); okt_require_csrf();
            if (empty($_FILES['file']) || !is_uploaded_file($_FILES['file']['tmp_name'])) okt_fail('Nessun file ricevuto');
            $f = $_FILES['file'];
            if ($f['size'] > OKT_MAX_UPLOAD) okt_fail('Immagine troppo grande (max 3 MB)');
            $info = @getimagesize($f['tmp_name']);
            $types = [IMAGETYPE_JPEG => 'jpg', IMAGETYPE_PNG => 'png', IMAGETYPE_WEBP => 'webp'];
            if (!$info || !isset($types[$info[2]])) okt_fail('Formato non supportato: usa JPG, PNG o WebP');
            $ext = $types[$info[2]];
            $base = okt_slug(pathinfo($f['name'], PATHINFO_FILENAME)) ?: 'img';
            $name = substr($base, 0, 40) . '-' . substr(bin2hex(random_bytes(3)), 0, 6) . '.' . $ext;
            if (!move_uploaded_file($f['tmp_name'], OKT_UPLOADS . "/$name")) okt_fail('Impossibile salvare l’immagine (permessi?)', 500);
            @chmod(OKT_UPLOADS . "/$name", 0644);
            okt_json(['ok' => true, 'path' => "uploads/$name", 'width' => $info[0], 'height' => $info[1]]);
        }
        case 'password': {
            okt_require_post(); okt_require_auth(); okt_require_csrf();
            $cfg = okt_config();
            if ($cfg === null) okt_fail('Configurazione mancante', 409);
            if (!password_verify((string)($body['current'] ?? ''), $cfg['hash'])) okt_fail('Password attuale errata', 401);
            $new = (string)($body['new'] ?? '');
            if (strlen($new) < 8) okt_fail('La nuova password deve avere almeno 8 caratteri');
            $cfg['hash'] = password_hash($new, PASSWORD_DEFAULT); $cfg['changed'] = gmdate('c');
            if (!okt_save_config($cfg)) okt_fail('Impossibile salvare', 500);
            okt_json(['ok' => true]);
        }

        default:
            okt_fail('Azione sconosciuta', 404);
    }
} catch (InvalidArgumentException $e) {
    okt_fail($e->getMessage(), 400);
} catch (Throwable $e) {
    okt_fail('Errore interno: ' . $e->getMessage(), 500);
}
