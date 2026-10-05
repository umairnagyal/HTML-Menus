# HTML Menus

Menù digitali in HTML per la ristorazione, pensati per essere aperti da un QR code sul tavolo.

| Cartella | Locale | Stato |
| --- | --- | --- |
| [`oktoberfest/`](oktoberfest/) | Birreria Oktoberfest · Reggio Emilia | ✅ pronto per la pubblicazione |

Ogni menù è un sito statico autonomo: nessun server, nessun database, nessuna dipendenza esterna. Basta caricare la cartella su un hosting qualsiasi.

## Birreria Oktoberfest

```
oktoberfest/
├── index.html                ← la pagina
├── manifest.webmanifest      ← "aggiungi alla schermata Home"
├── sw.js                     ← cache offline (opzionale, serve HTTPS)
└── assets/
    ├── css/style.css         ← grafica
    ├── css/fonts.css         ← font self-hosted
    ├── fonts/*.woff2
    ├── js/menu-data.js       ← ★ TUTTO IL MENÙ: piatti, birre, prezzi (italiano)
    ├── js/menu-data.en.js    ← testi in inglese, abbinati per `id`
    ├── js/app.js             ← logica (lista, ricerca, navigazione)
    └── img/                  ← logo, loghi birre, icone
```

### Pubblicare

1. Carica l'intera cartella `oktoberfest/` sul tuo hosting (es. `https://tuodominio.it/oktoberfest/`).
2. Apri l'indirizzo sul telefono per verificare.
3. Collega il QR code dinamico (uqr.to) a quell'indirizzo e metti lo stesso link in bio su Instagram.

Il menù è pensato per funzionare in una sottocartella: tutti i percorsi sono relativi.

### Aggiornare prezzi e piatti

Si modifica un solo file: `assets/js/menu-data.js`. Ogni voce è così:

```js
{ id: "bur-smash", name: "Smash Burger", desc: "pane artigianale…", prices: [{ p: 14.5 }] }
```

- `prices` può avere più formati: `[{ l: "Pinta 0.4", p: 6.5 }, { l: "Boccale 1.0", p: 13 }]`.
- `badge` aggiunge un'etichetta rossa accanto al nome (es. `"spinata a pompa"`).
- `tags` mostra chip informativi: `casa`, `senza-glutine`, `analcolico`, `vacca-rossa`, `veg`, `bimbi`, `cani`.
- Le birre hanno anche `img` (logo in `assets/img/beers/`), `abv`, `style`, `brewery`, `origin`.

Se cambi la descrizione di un piatto, aggiorna anche la voce con lo stesso `id` in `menu-data.en.js` (se manca, il menù mostra l'italiano). Dopo ogni modifica ricarica i file sull'hosting. Se usi il service worker, cambia anche `VERSION` in `sw.js` per forzare l'aggiornamento della cache.

### Funzioni

- **La mia lista**: ogni voce ha un `+`; la lista si apre dal pulsante rosso, con quantità, totale indicativo, appunti liberi, copia e condivisione (WhatsApp, ecc.). Resta salvata sul telefono del cliente. Non è un sistema di ordinazione.
- **Navigazione**: barra di sezioni scorrevole con sotto-sezioni, frecce sezione precedente/successiva, torna su, barra di avanzamento.
- **Ricerca**: per birra, piatto, cocktail, stile, birrificio; evidenzia le parole trovate.
- **Tema** scuro/chiaro e menù **IT/EN**: all'apertura è sempre in italiano; il pulsante EN traduce interfaccia, descrizioni, sezioni, formati e allergeni (i nomi dei piatti e i prezzi restano quelli originali).
- **"Non so cosa bere"**: sceglie una birra a caso e la evidenzia.
- **Allergeni**: la tabella dei 14 allergeni (Reg. CE 1169/2011) come da cartello.
- Installabile come app (manifest) e consultabile offline dopo la prima apertura (service worker).
- Font self-hosted (niente chiamate a Google Fonts), immagini WebP, nessuna libreria esterna.

### Fonte dei contenuti

I testi e i prezzi sono trascritti dai 9 PDF del menù cartaceo (Spine, Bottiglie, Cucina-Pupo, Burger Pizza, Fritti Dolci, Bar, Cantina, American Bar, Allergeni). I loghi delle birre sono estratti dagli stessi PDF.
