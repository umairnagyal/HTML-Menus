# HTML Menus

Menù digitali per la ristorazione, pensati per essere aperti da un QR code sul tavolo, con un pannello di gestione per il locale.

| Cartella | Locale | Stato |
| --- | --- | --- |
| [`oktoberfest/`](oktoberfest/) | Birreria Oktoberfest · Reggio Emilia | ✅ online, con pannello admin |

## Birreria Oktoberfest

```
oktoberfest/
├── index.html                ← il menù pubblico (quello del QR code)
├── manifest.webmanifest      ← "aggiungi alla schermata Home"
├── sw.js                     ← cache offline (serve HTTPS)
├── data/
│   ├── menu.json             ← ★ IL MENÙ PUBBLICATO (lo scrive il pannello)
│   ├── draft.json            ← bozza in lavorazione (generato)
│   └── backups/              ← copie automatiche ad ogni pubblicazione (generato)
├── admin/                    ← pannello di gestione (index.html, admin.css, admin.js)
├── api/
│   ├── index.php             ← API del pannello (login, salva, pubblica, backup, upload)
│   ├── lib.php               ← validazione dei dati e funzioni comuni
│   └── state/                ← password (hash) e tentativi di login (generato, protetto)
└── assets/
    ├── css/  fonts/  img/    ← grafica, font self-hosted, logo e loghi birre
    ├── img/uploads/          ← immagini caricate dal pannello
    └── js/app.js, menu-fallback.js
```

Requisiti hosting: **PHP 7.4 o superiore** (Aruba Linux va bene) e permessi di scrittura su `data/`, `api/state/`, `assets/img/uploads/` e `assets/js/` (normali su hosting condiviso: PHP scrive come l'utente FTP). Nessun database.

### Pubblicare la prima volta

1. Carica tutta la cartella sul server, per esempio in `https://www.vividlabs.it/birreriaoktoberfest/`.
2. Apri `https://…/birreriaoktoberfest/admin/`: alla prima apertura chiede di **creare la password** (almeno 8 caratteri). Da quel momento serve per entrare.
3. Collega il QR code dinamico e il link in bio a `https://…/birreriaoktoberfest/` (con la barra finale).

Se il sito principale ha regole di riscrittura (PHP app nella root), nel dubbio aggiungi in `birreriaoktoberfest/.htaccess`:

```
RewriteEngine Off
DirectoryIndex index.html
```

### Il pannello (`/admin/`)

Funziona bene da telefono e da computer.

- **Menù**: elenco sezioni → gruppi → voci. Per ogni livello: aggiungi, modifica, duplica, nascondi/mostra, riordina (trascinando o con le frecce), elimina. Le voci hanno anche **Esaurito** (visibile ma barrata, senza `+`).
- **Voce**: nome, descrizione, riga sotto il nome, etichetta rossa, uno o più **formati con prezzo**, etichette (tag), immagine (dalla galleria dei loghi o caricata), dettagli birra. Ogni testo ha il campo **IT** e il campo **EN**; se l'inglese manca, il menù mostra l'italiano.
- **Allergeni**, **Impostazioni** (contatti, Instagram, note ricorrenti, etichette) e **Backup**.
- **Bozza e pubblicazione**: ogni modifica viene salvata automaticamente come bozza. **Anteprima** apre il menù con la bozza (`?draft=1`). **Pubblica** la rende visibile ai clienti e salva il menù precedente nei backup (ultimi 40). **Scarta la bozza** torna al menù online.
- **Backup**: ripristina un backup *come bozza* (poi pubblichi), esporta/importa il menù in JSON.
- **Cambia password** ed **Esci** dal menu ⋯.

Sicurezza: password con hash bcrypt, sessione con cookie HttpOnly/SameSite, token anti-CSRF su ogni scrittura, blocco di 15 minuti dopo 6 tentativi errati, validazione completa dei dati lato server (prezzi, lunghezze, percorsi immagine), upload limitato a JPG/PNG/WebP da 3 MB, cartelle `api/state` e `data/backups` non raggiungibili dal browser.

Password dimenticata: cancella via FTP il file `api/state/config.php`; alla prossima apertura il pannello chiede di crearne una nuova.

### Il menù pubblico

- Carica `data/menu.json`; se non raggiungibile usa `assets/js/menu-fallback.js` (rigenerato ad ogni pubblicazione).
- Funzioni: barra sezioni con sotto-sezioni, frecce e torna su, ricerca con evidenziazione, **La mia lista** (promemoria con quantità, appunti, totale indicativo, copia e condivisione), tema scuro/chiaro, **IT/EN** (apre sempre in italiano), "Non so cosa bere", pagina allergeni, installabile come app, offline dopo la prima apertura. Font self-hosted, nessuna libreria esterna.

### Aggiornamenti del codice

Quando cambi i file del menù (non i dati), ricarica solo quelli modificati. Se tocchi `index.html`, CSS o JS, alza `VERSION` in `sw.js` per rinnovare la cache dei telefoni. I dati (`data/`, `api/state/`, `uploads/`) non vanno mai sovrascritti con quelli del repository.

### Fonte dei contenuti

Testi e prezzi iniziali sono trascritti dai 9 PDF del menù cartaceo; i loghi delle birre sono estratti dagli stessi PDF. `tools/migrate-menu-data.js` è lo script usato per generare il primo `menu.json` dai file originali (ora solo nella storia git).
