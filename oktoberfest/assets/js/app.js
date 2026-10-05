/* =====================================================================
   BIRRERIA OKTOBERFEST · Menù digitale · app.js
   Rendering, navigazione, ricerca, "La mia lista", tema, lingua.
   ===================================================================== */
(function () {
  "use strict";

  const M = window.MENU;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const LS = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage non disponibile */ } }
  };

  /* ------------------------------------------------------------------
     i18n (solo interfaccia: i piatti restano in italiano)
     ------------------------------------------------------------------ */
  const I18N = {
    it: {
      heroTag: "Il menù completo. Scorri, cerca, aggiungi alla tua lista.",
      surprise: "Non so cosa bere",
      searchPh: "Cerca birra, piatto, cocktail…",
      search: "Cerca nel menù", theme: "Cambia tema", close: "Chiudi",
      backToTop: "Torna all'inizio", prevSection: "Sezione precedente", nextSection: "Sezione successiva",
      myList: "La mia lista",
      listSub: "Un promemoria per ordinare con calma. Non è un ordine.",
      listEmpty: "La lista è vuota. Tocca <b>+</b> accanto a una voce per aggiungerla.",
      noteLabel: "Appunti", notePh: "Es. tavolo 6 · senza cipolla · due cannucce…",
      estTotal: "Totale indicativo", clear: "Svuota", copy: "Copia", share: "Condividi",
      noResults: "Nessun risultato. Prova con un’altra parola.",
      legal: "Prezzi in euro, IVA inclusa. Il menù può subire variazioni.",
      added: "Aggiunto alla lista", removed: "Rimosso dalla lista", cleared: "Lista svuotata",
      copied: "Lista copiata", shareFail: "Condivisione non disponibile, lista copiata",
      results: n => n === 1 ? "1 risultato" : `${n} risultati`,
      more: "Leggi tutto", less: "Mostra meno",
      add: "Aggiungi alla lista", inList: "Nella lista",
      service: "Servizio", allergy: "Allergie e intolleranze", frozen: "Ingredienti",
      shareTitle: "La mia lista · Birreria Oktoberfest",
      noteHead: "Appunti", totalHead: "Totale indicativo",
      surpriseToast: n => `Oggi ti consigliamo: ${n}`,
      qtyMinus: "Diminuisci", qtyPlus: "Aumenta", sectionsLabel: "Sezioni del menù"
    },
    en: {
      heroTag: "The full menu. Scroll, search, add to your list.",
      surprise: "Pick a beer for me",
      searchPh: "Search beer, dish, cocktail…",
      search: "Search the menu", theme: "Toggle theme", close: "Close",
      backToTop: "Back to top", prevSection: "Previous section", nextSection: "Next section",
      myList: "My list",
      listSub: "A reminder to order at your pace. This is not an order.",
      listEmpty: "Your list is empty. Tap <b>+</b> next to an item to add it.",
      noteLabel: "Notes", notePh: "E.g. table 6 · no onion · two straws…",
      estTotal: "Estimated total", clear: "Clear", copy: "Copy", share: "Share",
      noResults: "No results. Try another word.",
      legal: "Prices in euro, VAT included. The menu may change.",
      added: "Added to your list", removed: "Removed from your list", cleared: "List cleared",
      copied: "List copied", shareFail: "Sharing unavailable, list copied",
      results: n => n === 1 ? "1 result" : `${n} results`,
      more: "Read more", less: "Show less",
      add: "Add to list", inList: "In your list",
      service: "Service charge", allergy: "Allergies and intolerances", frozen: "Ingredients",
      shareTitle: "My list · Birreria Oktoberfest",
      noteHead: "Notes", totalHead: "Estimated total",
      surpriseToast: n => `Tonight we suggest: ${n}`,
      qtyMinus: "Decrease", qtyPlus: "Increase", sectionsLabel: "Menu sections"
    }
  };
  let lang = "it"; // all'apertura SEMPRE italiano; EN solo su richiesta dal pulsante in alto
  const t = (k, ...a) => { const v = I18N[lang][k]; return typeof v === "function" ? v(...a) : v; };

  /* Traduzioni del menù (menu-data.en.js). Ogni funzione ricade sull'italiano se manca la voce. */
  const EN = window.MENU_EN || null;
  const tr = () => (lang === "en" ? EN : null);
  const sx = (sec, f) => { const S = tr() && tr().sections[sec.id]; return (S && S[f] != null) ? S[f] : sec[f]; };
  const gx = (sec, g, f) => { const S = tr() && tr().sections[sec.id]; const G = S && S.groups && S.groups[g.title]; return (G && G[f] != null) ? G[f] : g[f]; };
  const ix = (it, f) => { const I = tr() && tr().items[it.id]; return (I && I[f] != null) ? I[f] : it[f]; };
  const ax = f => { const A = tr() && tr().allergens; return (A && A[f] != null) ? A[f] : M.allergens[f]; };
  const bx = f => { const B = tr() && tr().brand; return (B && B[f] != null) ? B[f] : M.brand[f]; };
  const pl = l => {
    if (!l || !tr()) return l;
    const m = tr().priceLabels || {}; if (m[l]) return m[l];
    const w = l.split(" "); return m[w[0]] ? [m[w[0]], ...w.slice(1)].join(" ") : l;
  };

  /* ------------------------------------------------------------------
     Icone (inline SVG)
     ------------------------------------------------------------------ */
  const ICON = {
    tap: '<svg viewBox="0 0 24 24"><path d="M4 7h9a3 3 0 0 1 3 3v1M4 7V5h9v2M4 7v3h4v10h4V10"/><path d="M16 11v2a2 2 0 0 0 2 2h2v6"/></svg>',
    bottle: '<svg viewBox="0 0 24 24"><path d="M10 2h4v4l2 3v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9l2-3Z"/><path d="M8 13h8"/></svg>',
    grill: '<svg viewBox="0 0 24 24"><path d="M3 9h18a9 9 0 0 1-18 0Z"/><path d="M12 18v3M7 21l2-3M17 21l-2-3M8 5c0-1 1-1 1-2M12 5c0-1 1-1 1-2M16 5c0-1 1-1 1-2"/></svg>',
    burger: '<svg viewBox="0 0 24 24"><path d="M4 10a8 8 0 0 1 16 0H4Z"/><path d="M3 14h18M5 18h14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/></svg>',
    fries: '<svg viewBox="0 0 24 24"><path d="M6 10h12l-1.5 11h-9Z"/><path d="M8 10V4M11 10V3M14 10V4M17 10l-1-5"/></svg>',
    cup: '<svg viewBox="0 0 24 24"><path d="M5 8h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2M4 21h14"/></svg>',
    wine: '<svg viewBox="0 0 24 24"><path d="M8 3h8l-1 7a3 3 0 0 1-6 0Z"/><path d="M12 13v7M8 21h8"/></svg>',
    cocktail: '<svg viewBox="0 0 24 24"><path d="M4 4h16l-8 9Z"/><path d="M12 13v7M8 21h8M14 2l3 3"/></svg>',
    info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 7"/></svg>',
    minus: '<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
    note: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>'
  };

  /* ------------------------------------------------------------------
     Stato lista
     ------------------------------------------------------------------ */
  const list = LS.get("okt.list", {});        // key -> qty
  const INDEX = {};                            // key -> {item, price, section, group}
  const fmt = n => "€ " + n.toFixed(2);
  const keyOf = (item, pi) => `${item.id}#${pi}`;

  /* ------------------------------------------------------------------
     Rendering
     ------------------------------------------------------------------ */
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const slug = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  function renderTags(item) {
    if (!item.tags || !item.tags.length) return "";
    return `<div class="item__tags">${item.tags.map(tag => {
      const l = M.tagLabels[tag]; return `<span class="tag tag--${tag}">${esc(l ? l[lang] : tag)}</span>`;
    }).join("")}</div>`;
  }

  function addBtn(item, pi) {
    const key = keyOf(item, pi);
    const qty = list[key] || 0;
    return `<button class="add${qty ? " is-in" : ""}" type="button" data-key="${esc(key)}" aria-label="${esc(t("add"))}: ${esc(item.name)}" aria-pressed="${qty ? "true" : "false"}">
      ${qty ? ICON.check : ICON.plus}${qty ? `<span class="add__qty">${qty}</span>` : ""}</button>`;
  }

  function renderPrices(item) {
    const multi = item.prices.length > 1 || (item.prices[0].l);
    if (!multi) {
      return `<div class="prices"><div class="price-row price-row--single"><span class="price-row__dots"></span><span class="price">${fmt(item.prices[0].p)}</span>${addBtn(item, 0)}</div></div>`;
    }
    return `<div class="prices">${item.prices.map((pr, i) =>
      `<div class="price-row"><span class="price-row__label">${esc(pl(pr.l) || "")}</span><span class="price-row__dots"></span><span class="price">${fmt(pr.p)}</span>${addBtn(item, i)}</div>`
    ).join("")}</div>`;
  }

  function renderItem(item, section, group) {
    item.prices.forEach((pr, i) => { INDEX[keyOf(item, i)] = { item, pi: i, section, group }; });
    const isBeer = !!item.img;
    const name = ix(item, "name"), sub = ix(item, "sub"), desc = ix(item, "desc");
    const badge = ix(item, "badge") ? `<span class="item__badge">${esc(ix(item, "badge"))}</span>` : "";
    const inList = item.prices.some((_, i) => list[keyOf(item, i)]);
    const en = EN && EN.items[item.id] ? Object.values(EN.items[item.id]).filter(v => typeof v === "string") : [];
    const search = esc([item.name, item.sub, item.desc, item.badge, item.style, item.brewery, item.origin, group.title, section.title, ...en].filter(Boolean).join(" ").toLowerCase());

    if (isBeer) {
      return `<article class="item item--beer reveal${inList ? " is-in" : ""}" id="${esc(item.id)}" data-search="${search}">
        <div class="item__logo"><img src="assets/img/${esc(item.img)}" alt="" loading="lazy" decoding="async" width="62" height="62"></div>
        <div class="item__head">
          <div>
            <h4 class="item__name">${esc(name)}${badge}</h4>
            <p class="item__sub">${esc(sub || "")}</p>
          </div>
          ${item.abv ? `<span class="pill-abv">${esc(item.abv)}</span>` : ""}
        </div>
        <div class="item__body">
          ${desc ? `<p class="item__desc item__desc--clamp">${esc(desc)}</p><button class="item__more" type="button" aria-expanded="false">${esc(t("more"))}</button>` : ""}
          ${renderTags(item)}
          ${renderPrices(item)}
        </div>
      </article>`;
    }
    return `<article class="item item--simple reveal${inList ? " is-in" : ""}" id="${esc(item.id)}" data-search="${search}">
      <div class="item__head">
        <h4 class="item__name">${esc(name)}${badge}</h4>
        ${sub ? `<p class="item__sub">${esc(sub)}</p>` : ""}
        ${desc ? `<p class="item__desc">${esc(desc)}</p>` : ""}
        ${renderTags(item)}
      </div>
      ${renderPrices(item)}
    </article>`;
  }

  function noteHtml(kind) {
    const map = { service: bx("serviceNote"), allergy: bx("allergyNote"), frozen: bx("frozenNote") };
    return `<div class="note">${ICON.note}<div><b>${esc(t(kind))}</b> · ${esc(map[kind])}</div></div>`;
  }

  function renderSection(section, idx) {
    const groups = section.groups.map(g => {
      const gid = `${section.id}--${slug(g.title)}`;
      g._id = gid;
      const gTitle = gx(section, g, "title"), gIntro = gx(section, g, "intro"), gFoot = gx(section, g, "footnotes");
      return `<div class="group" id="${gid}" data-title="${esc(gTitle)}">
        <div class="group__head"><h3 class="group__title">${esc(gTitle)}</h3></div>
        ${gIntro ? `<p class="group__intro">${esc(gIntro)}</p>` : ""}
        <div class="grid${section.id === "spina" || section.id === "bottiglie" ? " grid--beer" : ""}">${g.items.map(it => renderItem(it, section, g)).join("")}</div>
        ${gFoot ? gFoot.map(f => `<p class="group__foot">${esc(f).replace(/(\+ € [\d.,]+)/, "<b>$1</b>")}</p>`).join("") : ""}
      </div>`;
    }).join("");
    const notes = section.notes ? `<div class="notes">${section.notes.map(noteHtml).join("")}</div>` : "";
    return `<section class="section" id="${esc(section.id)}" data-title="${esc(sx(section, "title"))}">
      <div class="section__head">
        <div><h2 class="section__title">${esc(sx(section, "title"))}</h2><p class="section__sub">${esc(sx(section, "subtitle") || "")}</p></div>
        <span class="section__num" aria-hidden="true">${String(idx + 1).padStart(2, "0")}</span>
      </div>
      ${groups}${notes}
    </section>`;
  }

  function renderAllergens() {
    const A = M.allergens;
    const enList = tr() && tr().allergens ? tr().allergens.list : null;
    return `<section class="section allergens" id="${A.id}" data-title="${esc(ax("title"))}">
      <div class="section__head">
        <div><h2 class="section__title">${esc(ax("title"))}</h2><p class="section__sub">Reg. ${lang === "en" ? "EC" : "CE"} 1169/2011</p></div>
        <span class="section__num" aria-hidden="true">${String(M.sections.length + 1).padStart(2, "0")}</span>
      </div>
      <div class="allergens__card reveal">
        <h3 class="allergens__heading">${esc(ax("heading"))}</h3>
        <p class="allergens__legal">${esc(ax("legal"))}</p>
        <p class="allergens__notice">${esc(ax("notice"))}</p>
        <p class="allergens__intro">${esc(ax("listIntro"))}</p>
        <div class="allergens__grid">${A.list.map((a, i) => `<div class="allergen"><span class="allergen__n">${a.n}</span><span class="allergen__t">${esc(enList && enList[i] ? enList[i] : a.t)}</span></div>`).join("")}</div>
        <p class="allergens__sign">${esc(ax("signature"))}</p>
      </div>
    </section>`;
  }

  function renderNav() {
    const all = [...M.sections, M.allergens];
    $("#navScroller").innerHTML = all.map(s =>
      `<a class="nav-chip" href="#${esc(s.id)}" data-target="${esc(s.id)}">${ICON[s.icon] || ""}<span>${esc(s === M.allergens ? ax("short") : (sx(s, "short") || sx(s, "title")))}</span></a>`
    ).join("");
  }

  function renderAll() {
    $("#menuRoot").innerHTML = M.sections.map(renderSection).join("") + renderAllergens();
    renderNav();
    // Brand info
    $("#addrText").textContent = M.brand.address.replace(/,.*$/, "");
    $("#mapsLink").href = M.brand.mapsUrl;
    $("#phoneText").textContent = M.brand.phone;
    $("#phoneLink").href = M.brand.phoneHref;
    $("#footerAddr").innerHTML = `<a href="${esc(M.brand.mapsUrl)}" target="_blank" rel="noopener">${esc(M.brand.address)}</a>`;
    $("#footerPhone").innerHTML = `<a href="${esc(M.brand.phoneHref)}">${esc(M.brand.phone)}</a>`;
    $("#footerNotes").innerHTML = ["service", "allergy", "frozen"].map(noteHtml).join("");
    $("#igTop").href = M.brand.instagramUrl;
    $$(".logo-card__ig").forEach(a => { a.href = M.brand.instagramUrl; });
  }

  /* ------------------------------------------------------------------
     Lingua & tema
     ------------------------------------------------------------------ */
  function applyLang(rerender) {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    $$("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    $$("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    $("#langToggle").textContent = lang === "it" ? "EN" : "IT";
    $("#langToggle").setAttribute("aria-label", lang === "it" ? "Switch language to English" : "Passa all'italiano");
    $("#nav").setAttribute("aria-label", t("sectionsLabel"));
    if (rerender) {
      // Rigenera tutto il menù nella lingua scelta, senza perdere la posizione
      const y = window.scrollY; const q = searchInput.value;
      renderAll();
      $$(".reveal").forEach(e => e.classList.add("is-visible"));
      activeId = null; updateActive();
      if (q) runSearch(q);
      window.scrollTo({ top: y, behavior: "auto" });
    }
    renderDrawer();
  }
  $("#langToggle").addEventListener("click", () => { lang = lang === "it" ? "en" : "it"; applyLang(true); });

  const root = document.documentElement;
  let theme = LS.get("okt.theme", null) || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  const applyTheme = () => { root.dataset.theme = theme; };
  $("#themeToggle").addEventListener("click", () => { theme = theme === "dark" ? "light" : "dark"; LS.set("okt.theme", theme); applyTheme(); });
  applyTheme();

  /* ------------------------------------------------------------------
     Toast
     ------------------------------------------------------------------ */
  let toastTimer;
  function toast(msg) {
    const el = $("#toast"); el.textContent = msg; el.classList.add("is-on");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("is-on"), 1800);
  }

  /* ------------------------------------------------------------------
     Lista: add / remove / render / share
     ------------------------------------------------------------------ */
  function saveList() { LS.set("okt.list", list); }
  function listCount() { return Object.values(list).reduce((a, b) => a + b, 0); }
  function listTotal() { return Object.entries(list).reduce((s, [k, q]) => s + (INDEX[k] ? INDEX[k].item.prices[INDEX[k].pi].p * q : 0), 0); }

  function syncButtons(key) {
    const qty = list[key] || 0;
    $$(`.add[data-key="${CSS.escape(key)}"]`).forEach(btn => {
      btn.classList.toggle("is-in", qty > 0);
      btn.setAttribute("aria-pressed", qty > 0 ? "true" : "false");
      btn.innerHTML = (qty ? ICON.check : ICON.plus) + (qty ? `<span class="add__qty">${qty}</span>` : "");
      btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump");
      const card = btn.closest(".item");
      if (card) { const any = $$(".add", card).some(b => b.classList.contains("is-in")); card.classList.toggle("is-in", any); }
    });
    const n = listCount();
    const c = $("#listCount"); c.textContent = n; c.hidden = n === 0;
    const fab = $("#listFab"); fab.classList.remove("bump"); void fab.offsetWidth; fab.classList.add("bump");
    $("#listTotal").textContent = fmt(listTotal());
  }

  function changeQty(key, delta) {
    const q = (list[key] || 0) + delta;
    if (q <= 0) delete list[key]; else list[key] = q;
    saveList(); syncButtons(key);
    if (!$("#listDrawer").hidden) renderDrawer();
  }

  document.addEventListener("click", e => {
    const add = e.target.closest(".add");
    if (add) { changeQty(add.dataset.key, 1); toast(t("added")); return; }
    const more = e.target.closest(".item__more");
    if (more) {
      const p = more.previousElementSibling; const open = more.getAttribute("aria-expanded") === "true";
      p.classList.toggle("item__desc--clamp", open); more.setAttribute("aria-expanded", String(!open)); more.textContent = open ? t("more") : t("less");
    }
  });

  function renderDrawer() {
    const body = $("#drawerBody"); const empty = $("#drawerEmpty");
    const entries = Object.entries(list).filter(([k]) => INDEX[k]);
    empty.hidden = entries.length > 0;
    if (!entries.length) { body.innerHTML = ""; $("#listTotal").textContent = fmt(0); return; }
    // raggruppa per sezione mantenendo l'ordine del menù
    const bySection = new Map();
    entries.forEach(([k, q]) => { const r = INDEX[k]; if (!bySection.has(r.section.id)) bySection.set(r.section.id, { s: r.section, rows: [] }); bySection.get(r.section.id).rows.push({ k, q, r }); });
    body.innerHTML = Array.from(bySection.values()).map(({ s, rows }) => `<div class="list-group">
      <p class="list-group__title">${esc(sx(s, "title"))}</p>
      ${rows.map(({ k, q, r }) => {
        const pr = r.item.prices[r.pi];
        return `<div class="list-row" data-key="${esc(k)}">
          <div><div class="list-row__name">${esc(ix(r.item, "name"))}</div><div class="list-row__meta">${esc([pl(pr.l), gx(r.section, r.group, "title")].filter(Boolean).join(" · "))}</div></div>
          <div class="qty" role="group"><button type="button" data-d="-1" aria-label="${esc(t("qtyMinus"))}">${q === 1 ? ICON.trash : ICON.minus}</button><output>${q}</output><button type="button" data-d="1" aria-label="${esc(t("qtyPlus"))}">${ICON.plus}</button></div>
          <div class="list-row__price">${fmt(pr.p * q)}</div>
        </div>`;
      }).join("")}
    </div>`).join("");
    $("#listTotal").textContent = fmt(listTotal());
  }
  $("#drawerBody").addEventListener("click", e => {
    const b = e.target.closest("button[data-d]"); if (!b) return;
    const key = b.closest(".list-row").dataset.key; const d = +b.dataset.d;
    changeQty(key, d); if (d < 0 && !list[key]) toast(t("removed"));
  });

  function openDrawer() {
    renderDrawer();
    $("#drawerBackdrop").hidden = false; $("#listDrawer").hidden = false;
    $("#listFab").setAttribute("aria-expanded", "true");
    $("#drawerClose").focus({ preventScroll: true });
  }
  function closeDrawer() {
    $("#drawerBackdrop").hidden = true; $("#listDrawer").hidden = true;
    $("#listFab").setAttribute("aria-expanded", "false");
  }
  $("#listFab").addEventListener("click", () => ($("#listDrawer").hidden ? openDrawer() : closeDrawer()));
  $("#drawerClose").addEventListener("click", closeDrawer);
  $("#drawerBackdrop").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { if (!$("#listDrawer").hidden) closeDrawer(); else if (!$("#searchBar").hidden) toggleSearch(false); }
    if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") { e.preventDefault(); toggleSearch(true); }
  });
  // swipe-down per chiudere il drawer
  (function () {
    let y0 = null;
    const d = $("#listDrawer");
    d.addEventListener("touchstart", e => { if ($("#drawerBody").scrollTop === 0) y0 = e.touches[0].clientY; }, { passive: true });
    d.addEventListener("touchmove", e => { if (y0 != null && e.touches[0].clientY - y0 > 90) { y0 = null; closeDrawer(); } }, { passive: true });
    d.addEventListener("touchend", () => { y0 = null; });
  })();

  $("#listClear").addEventListener("click", () => {
    const keys = Object.keys(list); keys.forEach(k => delete list[k]); saveList(); keys.forEach(syncButtons); renderDrawer(); toast(t("cleared"));
  });

  const note = $("#listNote");
  note.value = LS.get("okt.note", "");
  note.addEventListener("input", () => LS.set("okt.note", note.value));

  function listText() {
    const lines = [t("shareTitle"), ""];
    const entries = Object.entries(list).filter(([k]) => INDEX[k]);
    const bySection = new Map();
    entries.forEach(([k, q]) => { const r = INDEX[k]; if (!bySection.has(r.section.id)) bySection.set(r.section.id, []); bySection.get(r.section.id).push({ q, r }); });
    bySection.forEach((rows, sid) => {
      lines.push(`— ${sx(rows[0].r.section, "title").toUpperCase()} —`);
      rows.forEach(({ q, r }) => { const pr = r.item.prices[r.pi]; lines.push(`${q}× ${ix(r.item, "name")}${pr.l ? ` (${pl(pr.l)})` : ""} · ${fmt(pr.p * q)}`); });
      lines.push("");
    });
    if (note.value.trim()) { lines.push(`${t("noteHead")}: ${note.value.trim()}`, ""); }
    lines.push(`${t("totalHead")}: ${fmt(listTotal())}`);
    lines.push("", `${M.brand.name} · ${M.brand.city}`, location.href.split("#")[0]);
    return lines.join("\n");
  }
  async function copyText(txt) {
    try { await navigator.clipboard.writeText(txt); return true; }
    catch {
      const ta = document.createElement("textarea"); ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand("copy"); } catch { /* noop */ } ta.remove(); return ok;
    }
  }
  $("#listCopy").addEventListener("click", async () => { if (await copyText(listText())) toast(t("copied")); });
  $("#listShare").addEventListener("click", async () => {
    const text = listText();
    if (navigator.share) { try { await navigator.share({ title: t("shareTitle"), text }); return; } catch (e) { if (e && e.name === "AbortError") return; } }
    if (await copyText(text)) toast(t("shareFail"));
  });

  /* ------------------------------------------------------------------
     Ricerca
     ------------------------------------------------------------------ */
  const searchBar = $("#searchBar"), searchInput = $("#searchInput"), searchClear = $("#searchClear"), searchHint = $("#searchHint");
  function toggleSearch(force) {
    const open = force == null ? searchBar.hidden : force;
    searchBar.hidden = !open; $("#searchToggle").setAttribute("aria-expanded", String(open));
    if (open) { searchInput.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: "smooth" }); }
    else { searchInput.value = ""; runSearch(""); }
  }
  $("#searchToggle").addEventListener("click", () => toggleSearch());
  searchClear.addEventListener("click", () => { searchInput.value = ""; runSearch(""); searchInput.focus(); });
  let searchTimer;
  searchInput.addEventListener("input", () => { clearTimeout(searchTimer); searchTimer = setTimeout(() => runSearch(searchInput.value), 90); });

  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  function runSearch(q) {
    const query = norm(q.trim());
    const terms = query.split(/\s+/).filter(Boolean);
    searchClear.hidden = !query;
    document.body.classList.toggle("is-searching", terms.length > 0);
    if (!terms.length) {
      $$(".is-hidden").forEach(el => el.classList.remove("is-hidden"));
      $$("mark.hl").forEach(m => m.replaceWith(m.textContent));
      $("#emptyState").hidden = true; searchHint.textContent = ""; $("#navSub").hidden = true; updateActive(); return;
    }
    // Prima prova: ogni termine deve iniziare una parola ("ipa" → "IPA", non "Ripasso").
    // Se non trova nulla, ricade sulla ricerca per sottostringa.
    const items = $$(".item");
    const match = (hay, loose) => terms.every(tm => loose ? hay.includes(tm) : hay.split(/[^a-z0-9]+/).some(w => w.startsWith(tm)));
    let hits = 0;
    let hitSet = items.filter(it => match(norm(it.dataset.search || ""), false));
    if (!hitSet.length) hitSet = items.filter(it => match(norm(it.dataset.search || ""), true));
    items.forEach(it => { const ok = hitSet.includes(it); it.classList.toggle("is-hidden", !ok); if (ok) { hits++; it.classList.add("is-visible"); } });
    window.scrollTo({ top: 0, behavior: "auto" });
    $$(".group").forEach(g => g.classList.toggle("is-hidden", !$$(".item:not(.is-hidden)", g).length));
    $$(".section").forEach(s => {
      if (s.classList.contains("allergens")) { const ok = terms.every(tm => norm(s.textContent).includes(tm)); s.classList.toggle("is-hidden", !ok); if (ok) hits++; return; }
      s.classList.toggle("is-hidden", !$$(".group:not(.is-hidden)", s).length);
    });
    $("#emptyState").hidden = hits > 0;
    searchHint.textContent = t("results", hits);
    highlight(terms);
  }
  function highlight(terms) {
    $$("mark.hl").forEach(m => m.replaceWith(m.textContent));
    document.body.normalize();
    const re = new RegExp(`(${terms.map(x => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "ig");
    $$(".item:not(.is-hidden) .item__name, .item:not(.is-hidden) .item__desc, .item:not(.is-hidden) .item__sub").forEach(el => {
      el.childNodes.forEach(n => {
        if (n.nodeType !== 3) return;
        const txt = n.nodeValue; const plain = norm(txt);
        if (!re.test(plain)) return; re.lastIndex = 0;
        // mappa posizioni sul testo normalizzato (stessa lunghezza se solo diacritici)
        if (plain.length !== txt.length) return;
        const frag = document.createDocumentFragment(); let last = 0, m;
        while ((m = re.exec(plain))) {
          frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
          const mk = document.createElement("mark"); mk.className = "hl"; mk.textContent = txt.slice(m.index, m.index + m[0].length); frag.appendChild(mk);
          last = m.index + m[0].length;
        }
        frag.appendChild(document.createTextNode(txt.slice(last)));
        n.replaceWith(frag);
      });
    });
  }

  /* ------------------------------------------------------------------
     Navigazione: sezione attiva, sotto-sezioni, prev/next, top
     ------------------------------------------------------------------ */
  const sections = () => $$("main .section:not(.is-hidden)");
  let activeId = null;
  function navOffset() { return $("#topbar").offsetHeight + $("#nav").offsetHeight + (searchBar.hidden ? 0 : searchBar.offsetHeight) + 8; }

  function centerChip(chip) {
    if (!chip) return;
    const sc = chip.parentElement;
    sc.scrollTo({ left: chip.offsetLeft - (sc.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
  }

  function updateActive() {
    const y = window.scrollY + navOffset() + 40;
    let cur = null;
    sections().forEach(s => { if (s.offsetTop <= y) cur = s; });
    const id = cur ? cur.id : null;
    if (id !== activeId) {
      activeId = id;
      $$(".nav-chip:not(.nav-chip--sub)").forEach(c => c.classList.toggle("is-active", c.dataset.target === id));
      centerChip($(`.nav-chip[data-target="${id}"]`));
      renderSubNav(cur);
    }
    // sottosezione attiva
    if (cur) {
      let g = null; $$(".group:not(.is-hidden)", cur).forEach(x => { if (x.offsetTop <= y + 10) g = x; });
      $$(".nav-chip--sub").forEach(c => c.classList.toggle("is-active", g && c.dataset.target === g.id));
      centerChip($(".nav-chip--sub.is-active"));
    }
    const list = sections(); const i = list.findIndex(s => s.id === id);
    $("#prevSection").disabled = i <= 0 && window.scrollY < 10;
    $("#nextSection").disabled = i >= list.length - 1;
    $("#toTop").classList.toggle("is-visible", window.scrollY > 500);
  }
  function renderSubNav(sec) {
    const sub = $("#navSub");
    const groups = sec ? $$(".group:not(.is-hidden)", sec) : [];
    if (!sec || groups.length < 2 || document.body.classList.contains("is-searching")) { sub.hidden = true; sub.innerHTML = ""; return; }
    sub.innerHTML = groups.map(g => `<a class="nav-chip nav-chip--sub" href="#${g.id}" data-target="${g.id}">${esc(g.dataset.title)}</a>`).join("");
    sub.hidden = false;
  }
  function scrollToEl(el) {
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }
  $("#nav").addEventListener("click", e => {
    const a = e.target.closest("a.nav-chip"); if (!a) return;
    e.preventDefault();
    const target = document.getElementById(a.dataset.target);
    if (a.classList.contains("nav-chip--sub")) { scrollToEl(target); return; }
    // la riga delle sottosezioni compare dopo lo scroll: compensa in due passi
    renderSubNav(target); scrollToEl(target);
    history.replaceState(null, "", "#" + a.dataset.target);
  });
  $("#prevSection").addEventListener("click", () => {
    const list = sections(); const i = list.findIndex(s => s.id === activeId);
    const cur = list[i];
    if (cur && window.scrollY > cur.offsetTop - navOffset() + 60) { scrollToEl(cur); return; }
    if (i > 0) scrollToEl(list[i - 1]); else window.scrollTo({ top: 0, behavior: "smooth" });
  });
  $("#nextSection").addEventListener("click", () => {
    const list = sections(); const i = list.findIndex(s => s.id === activeId);
    if (i < list.length - 1) scrollToEl(list[i + 1]);
  });
  $("#toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  $(".topbar__brand").addEventListener("click", e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });

  // progress bar + active section (throttled con rAF)
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      $("#progressBar").style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
      updateActive(); ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* ------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------ */
  function setupReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("is-visible")); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .05 });
    els.forEach(e => io.observe(e));
  }

  /* ------------------------------------------------------------------
     "Non so cosa bere": scegli una birra a caso
     ------------------------------------------------------------------ */
  $("#surpriseBtn").addEventListener("click", () => {
    const beers = M.sections.filter(s => s.id === "spina" || s.id === "bottiglie").flatMap(s => s.groups.flatMap(g => g.items));
    const pick = beers[Math.floor(Math.random() * beers.length)];
    const el = document.getElementById(pick.id); if (!el) return;
    if (!searchBar.hidden) toggleSearch(false);
    el.classList.add("is-visible");
    scrollToEl(el);
    setTimeout(() => { el.classList.remove("is-hit"); void el.offsetWidth; el.classList.add("is-hit"); toast(t("surpriseToast", ix(pick, "name"))); }, 450);
  });

  /* ------------------------------------------------------------------
     Avvio
     ------------------------------------------------------------------ */
  renderAll();
  applyLang(false);
  setupReveal();
  syncButtons("__init__");
  updateActive();
  // deep link (#sezione o #id-voce)
  if (location.hash) {
    const el = document.getElementById(location.hash.slice(1));
    if (el) setTimeout(() => { el.classList.add("is-visible"); scrollToEl(el); if (el.classList.contains("item")) el.classList.add("is-hit"); }, 120);
  }
  // Service worker (cache offline, aggiornamenti network-first)
  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => { /* opzionale */ }); });
  }
})();
