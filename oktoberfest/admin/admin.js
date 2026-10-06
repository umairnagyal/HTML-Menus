/* =====================================================================
   BIRRERIA OKTOBERFEST · Pannello di gestione del menù · admin.js
   Lavora su una BOZZA (salvata automaticamente); "Pubblica" la rende
   visibile ai clienti. Nessuna libreria esterna.
   ===================================================================== */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const API = "../api/index.php?action=";
  const fmt = n => "€ " + Number(n || 0).toFixed(2);
  const uid = () => Math.random().toString(36).slice(2, 6);
  const slug = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const clone = o => JSON.parse(JSON.stringify(o));
  const timeFmt = iso => { if (!iso) return ""; const d = new Date(iso); return d.toLocaleString("it-IT", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }); };

  const ICON = {
    tap: '<svg viewBox="0 0 24 24"><path d="M4 7h9a3 3 0 0 1 3 3v1M4 7V5h9v2M4 7v3h4v10h4V10"/><path d="M16 11v2a2 2 0 0 0 2 2h2v6"/></svg>',
    bottle: '<svg viewBox="0 0 24 24"><path d="M10 2h4v4l2 3v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9l2-3Z"/><path d="M8 13h8"/></svg>',
    grill: '<svg viewBox="0 0 24 24"><path d="M3 9h18a9 9 0 0 1-18 0Z"/><path d="M12 18v3M7 21l2-3M17 21l-2-3M8 5c0-1 1-1 1-2M12 5c0-1 1-1 1-2M16 5c0-1 1-1 1-2"/></svg>',
    burger: '<svg viewBox="0 0 24 24"><path d="M4 10a8 8 0 0 1 16 0H4Z"/><path d="M3 14h18M5 18h14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/></svg>',
    fries: '<svg viewBox="0 0 24 24"><path d="M6 10h12l-1.5 11h-9Z"/><path d="M8 10V4M11 10V3M14 10V4M17 10l-1-5"/></svg>',
    cup: '<svg viewBox="0 0 24 24"><path d="M5 8h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2M4 21h14"/></svg>',
    wine: '<svg viewBox="0 0 24 24"><path d="M8 3h8l-1 7a3 3 0 0 1-6 0Z"/><path d="M12 13v7M8 21h8"/></svg>',
    cocktail: '<svg viewBox="0 0 24 24"><path d="M4 4h16l-8 9Z"/><path d="M12 13v7M8 21h8M14 2l3 3"/></svg>',
    pizza: '<svg viewBox="0 0 24 24"><path d="M3 4a16 16 0 0 1 18 0L12 21Z"/><path d="M5 7a13 13 0 0 1 14 0"/><circle cx="10" cy="10" r="1.2" fill="currentColor" stroke="none"/><circle cx="14" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="11" cy="15" r="1.2" fill="currentColor" stroke="none"/></svg>',
    dessert: '<svg viewBox="0 0 24 24"><path d="M4 11a8 8 0 0 1 16 0Z"/><path d="M3 15h18M6 15l1 5h10l1-5"/><path d="M12 3v2"/></svg>',
    salad: '<svg viewBox="0 0 24 24"><path d="M3 12h18a9 9 0 0 1-18 0Z"/><path d="M7 12c0-3 2-5 5-5s5 2 5 5"/></svg>',
    star: '<svg viewBox="0 0 24 24"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9Z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24"><path d="M4 20c0-9 5-15 16-16-1 11-7 16-16 16Z"/><path d="M4 20c4-5 8-8 12-11"/></svg>',
    info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>',
    // azioni
    edit: '<svg viewBox="0 0 24 24"><path d="M4 20h4l10.5-10.5a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L4 16Z"/><path d="m13 7 4 4"/></svg>',
    eye: '<svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
    eyeOff: '<svg viewBox="0 0 24 24"><path d="M3 3l18 18M10.6 10.6A3 3 0 0 0 13.4 13.4M9.9 5.2A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.3 6.3C3.7 8.1 2 12 2 12s3.5 7 10 7a9.8 9.8 0 0 0 4.2-.9"/></svg>',
    ban: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m6 6 12 12"/></svg>',
    copy: '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
    up: '<svg viewBox="0 0 24 24"><path d="m6 15 6-6 6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    grip: '<svg viewBox="0 0 24 24"><circle cx="9" cy="6" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="6" r="1.4" fill="currentColor" stroke="none"/><circle cx="9" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="9" cy="18" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="18" r="1.4" fill="currentColor" stroke="none"/></svg>',
    chev: '<svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    image: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m21 16-5-5-8 8"/></svg>',
    more: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/></svg>'
  };
  const SECTION_ICONS = ["tap", "bottle", "grill", "burger", "pizza", "fries", "dessert", "salad", "cup", "wine", "cocktail", "leaf", "star", "info"];
  const NOTE_LABELS = { service: "Nota servizio (€ 1.50)", allergy: "Nota allergie", frozen: "Nota ingredienti surgelati" };

  /* ------------------------------------------------------------------
     Stato
     ------------------------------------------------------------------ */
  const S = {
    status: null, menu: null, csrf: "",
    view: "menu", sectionId: null, query: "",
    dirty: false, saving: false, saveTimer: null, lastSaved: null, lastError: null,
    images: null
  };

  /* ------------------------------------------------------------------
     API
     ------------------------------------------------------------------ */
  async function api(action, opts = {}) {
    const init = { method: opts.method || (opts.body || opts.form ? "POST" : "GET"), credentials: "same-origin", headers: {} };
    if (opts.body) { init.headers["Content-Type"] = "application/json"; init.body = JSON.stringify(opts.body); }
    if (opts.form) init.body = opts.form;
    if (init.method === "POST") init.headers["X-CSRF"] = S.csrf;
    let res, data;
    try { res = await fetch(API + action, init); data = await res.json(); }
    catch { throw new Error("Connessione non riuscita. Controlla la rete e riprova."); }
    if (data && data.csrf) S.csrf = data.csrf;
    if (!res.ok || !data.ok) {
      if (res.status === 401 && data && data.authed === false && action !== "login") { showAuth(false); }
      throw Object.assign(new Error((data && data.error) || "Errore"), { status: res.status, data });
    }
    return data;
  }

  /* ------------------------------------------------------------------
     Toast / conferme
     ------------------------------------------------------------------ */
  let toastTimer;
  function toast(msg, isError) {
    const el = $("#toast"); el.textContent = msg; el.classList.toggle("is-error", !!isError); el.classList.add("is-on");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("is-on"), isError ? 3600 : 2000);
  }
  function confirmDlg(title, text, okLabel, danger) {
    return new Promise(resolve => {
      const d = $("#confirm");
      $("#confirmTitle").textContent = title; $("#confirmText").textContent = text || "";
      $("#confirmOk").textContent = okLabel || "Conferma"; d.classList.toggle("is-danger", !!danger);
      d.returnValue = "cancel";
      d.addEventListener("close", () => resolve(d.returnValue === "ok"), { once: true });
      d.showModal();
    });
  }

  /* ------------------------------------------------------------------
     Autenticazione
     ------------------------------------------------------------------ */
  function showAuth(setup) {
    $("#app").hidden = true; $("#authScreen").hidden = false;
    $("#authTitle").textContent = setup ? "Benvenuto" : "Gestione menù";
    $("#authSub").textContent = setup ? "Prima configurazione: scegli la password del pannello (almeno 8 caratteri)." : "Inserisci la password per entrare.";
    $("#authPwLabel").textContent = setup ? "Nuova password" : "Password";
    $("#authPw2Wrap").hidden = !setup; $("#authBtn").textContent = setup ? "Crea password ed entra" : "Entra";
    $("#authPw").autocomplete = setup ? "new-password" : "current-password";
    $("#authForm").dataset.mode = setup ? "setup" : "login";
    $("#authErr").hidden = true; $("#authPw").value = ""; $("#authPw2").value = "";
    setTimeout(() => $("#authPw").focus(), 50);
  }
  $("#authForm").addEventListener("submit", async e => {
    e.preventDefault();
    const mode = e.currentTarget.dataset.mode; const pw = $("#authPw").value;
    const err = $("#authErr"); err.hidden = true;
    if (mode === "setup" && pw !== $("#authPw2").value) { err.textContent = "Le due password non coincidono."; err.hidden = false; return; }
    $("#authBtn").disabled = true;
    try {
      await api(mode === "setup" ? "setup" : "login", { body: { password: pw } });
      await boot();
    } catch (ex) { err.textContent = ex.message; err.hidden = false; }
    finally { $("#authBtn").disabled = false; }
  });

  /* ------------------------------------------------------------------
     Avvio
     ------------------------------------------------------------------ */
  async function boot() {
    const st = await api("status"); S.status = st; S.csrf = st.csrf;
    if (st.setup) return showAuth(true);
    if (!st.authed) return showAuth(false);
    const d = await api("draft"); S.menu = d.menu; S.dirty = false; S.lastSaved = st.draftAt;
    $("#authScreen").hidden = true; $("#app").hidden = false;
    renderStatus(); render();
  }
  boot().catch(e => { showAuth(false); $("#authErr").textContent = e.message; $("#authErr").hidden = false; });

  /* ------------------------------------------------------------------
     Salvataggio bozza (automatico) · pubblicazione
     ------------------------------------------------------------------ */
  function markDirty() {
    S.dirty = true; renderStatus();
    clearTimeout(S.saveTimer); S.saveTimer = setTimeout(saveDraft, 1200);
  }
  async function saveDraft() {
    if (S.saving) { clearTimeout(S.saveTimer); S.saveTimer = setTimeout(saveDraft, 800); return; }
    S.saving = true; S.lastError = null; renderStatus();
    try {
      const r = await api("save", { body: { menu: S.menu } });
      if (!sheetOpen()) { S.menu = r.menu; render(true); }
      S.dirty = false; S.lastSaved = r.draftAt; S.status.draft = true;
    } catch (e) { S.lastError = e.message; toast("Salvataggio non riuscito: " + e.message, true); }
    finally { S.saving = false; renderStatus(); }
  }
  async function flushSave() { clearTimeout(S.saveTimer); if (S.dirty) await saveDraft(); }

  $("#publishBtn").addEventListener("click", async () => {
    await flushSave();
    if (S.lastError) return;
    const ok = await confirmDlg("Pubblicare il menù?", "Le modifiche diventano subito visibili a chi scansiona il QR code. Il menù attuale viene salvato nei backup.", "Pubblica ora");
    if (!ok) return;
    try { const r = await api("publish", { body: { menu: S.menu } }); S.menu = r.menu; S.status.draft = false; S.status.publishedAt = r.publishedAt; S.dirty = false; render(true); renderStatus(); toast("Menù pubblicato"); }
    catch (e) { toast(e.message, true); }
  });
  $("#previewBtn").addEventListener("click", async e => {
    if (S.dirty || S.saving) { e.preventDefault(); await flushSave(); window.open($("#previewBtn").href, "_blank", "noopener"); }
  });
  window.addEventListener("resize", () => { if (S.menu) renderStatus(); });
  window.addEventListener("beforeunload", e => { if (S.dirty || S.saving) { e.preventDefault(); e.returnValue = ""; } });

  function renderStatus() {
    const el = $("#barStatus"); let pill, txt;
    const narrow = window.matchMedia("(max-width: 719px)").matches;
    if (S.saving) { pill = '<span class="pill pill--saving">Salvataggio…</span>'; txt = ""; }
    else if (S.lastError) { pill = '<span class="pill pill--draft" style="color:var(--danger)">Non salvato</span>'; txt = S.lastError; }
    else if (S.dirty) { pill = `<span class="pill pill--draft">${narrow ? "Modifiche" : "Modifiche in corso"}</span>`; txt = ""; }
    else if (S.status && S.status.draft) { pill = `<span class="pill pill--draft" title="Bozza non pubblicata">${narrow ? "Bozza" : "Bozza non pubblicata"}</span>`; txt = S.lastSaved ? "salvata " + timeFmt(S.lastSaved) : ""; }
    else { pill = `<span class="pill pill--ok" title="Tutto pubblicato">${narrow ? "Online" : "Tutto pubblicato"}</span>`; txt = S.status && S.status.publishedAt ? timeFmt(S.status.publishedAt) : ""; }
    el.innerHTML = pill + (txt ? `<small>${esc(txt)}</small>` : "");
    $("#publishBtn").disabled = !(S.dirty || (S.status && S.status.draft));
  }

  /* ------------------------------------------------------------------
     Menu "altro"
     ------------------------------------------------------------------ */
  const moreBtn = $("#moreBtn"), moreMenu = $("#moreMenu");
  moreBtn.addEventListener("click", () => { const open = moreMenu.hidden; closeMenus(); moreMenu.hidden = !open; moreBtn.setAttribute("aria-expanded", String(open)); });
  document.addEventListener("click", e => { if (!e.target.closest(".menu-wrap, .row-menu")) closeMenus(); });
  function closeMenus() { $$(".menu").forEach(m => { m.hidden = true; }); moreBtn.setAttribute("aria-expanded", "false"); }
  moreMenu.addEventListener("click", async e => {
    const b = e.target.closest("[data-act]"); if (!b) return; closeMenus();
    const act = b.dataset.act;
    if (act === "theme") { const r = document.documentElement; r.dataset.theme = r.dataset.theme === "dark" ? "light" : "dark"; try { localStorage.setItem("okt.admin.theme", r.dataset.theme); } catch { /* ignora */ } }
    if (act === "discard") {
      if (!(S.dirty || S.status.draft)) return toast("Non c’è nessuna bozza da scartare");
      const ok = await confirmDlg("Scartare la bozza?", "Tutte le modifiche non pubblicate andranno perse e il pannello tornerà al menù attualmente online.", "Scarta", true);
      if (!ok) return;
      clearTimeout(S.saveTimer);
      try { const r = await api("discard", { body: {} }); S.menu = r.menu; S.dirty = false; S.status.draft = false; render(true); renderStatus(); toast("Bozza scartata"); } catch (ex) { toast(ex.message, true); }
    }
    if (act === "import") $("#importFile").click();
    if (act === "password") openPasswordSheet();
    if (act === "logout") { await flushSave(); try { await api("logout", { body: {} }); } catch { /* ignora */ } location.reload(); }
  });
  try { const th = localStorage.getItem("okt.admin.theme"); if (th) document.documentElement.dataset.theme = th; } catch { /* ignora */ }
  $("#importFile").addEventListener("change", async e => {
    const f = e.target.files[0]; e.target.value = ""; if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      if (!data || !Array.isArray(data.sections)) throw new Error("Il file non sembra un menù esportato da questo pannello.");
      const ok = await confirmDlg("Importare questo menù?", `Sostituisce la bozza con il contenuto di "${f.name}" (${data.sections.length} sezioni). Potrai controllarlo e pubblicarlo in seguito.`, "Importa");
      if (!ok) return;
      S.menu = data; S.sectionId = null; markDirty(); render();
      toast("Menù importato come bozza");
    } catch (ex) { toast(ex.message, true); }
  });

  /* ------------------------------------------------------------------
     Navigazione
     ------------------------------------------------------------------ */
  $$(".tab").forEach(t => t.addEventListener("click", () => { S.view = t.dataset.view; S.sectionId = null; render(); }));
  function render(keepScroll) {
    const y = window.scrollY;
    $$(".tab").forEach(t => t.classList.toggle("is-active", t.dataset.view === S.view));
    const v = $("#view");
    if (S.view === "menu") v.innerHTML = S.sectionId ? viewSection() : viewMenu();
    else if (S.view === "allergens") v.innerHTML = viewAllergens();
    else if (S.view === "settings") v.innerHTML = viewSettings();
    else if (S.view === "backups") { v.innerHTML = '<div class="empty">Caricamento…</div>'; viewBackups(); }
    if (keepScroll) window.scrollTo(0, y); else window.scrollTo(0, 0);
  }

  /* ------------------------------------------------------------------
     Vista: elenco sezioni
     ------------------------------------------------------------------ */
  const countItems = s => s.groups.reduce((n, g) => n + g.items.length, 0);
  const countVisible = s => s.groups.filter(g => !g.hidden).reduce((n, g) => n + g.items.filter(i => !i.hidden).length, 0);

  function viewMenu() {
    const M = S.menu;
    const total = M.sections.reduce((n, s) => n + countItems(s), 0);
    const hidden = M.sections.reduce((n, s) => n + countItems(s) - countVisible(s), 0) + M.sections.filter(s => s.hidden).reduce((n, s) => n + countVisible(s), 0);
    const soldout = M.sections.reduce((n, s) => n + s.groups.reduce((m, g) => m + g.items.filter(i => i.soldout).length, 0), 0);
    const q = S.query.trim().toLowerCase();
    let results = "";
    if (q) {
      const hits = [];
      M.sections.forEach(s => s.groups.forEach(g => g.items.forEach(it => {
        const hay = [it.name, it.name_en, it.desc, it.sub, it.badge, g.title, s.title].join(" ").toLowerCase();
        if (hay.includes(q)) hits.push({ s, g, it });
      })));
      results = `<div class="cards" style="margin-bottom:18px">${hits.length ? hits.slice(0, 60).map(h => itemCard(h.it, h.g, h.s, true)).join("") : '<div class="empty">Nessuna voce trovata.</div>'}</div>`;
    }
    return `
      <div class="vhead"><div><h1>Menù</h1><p>Tocca una sezione per modificarne le voci. Trascina ⋮⋮ o usa le frecce per riordinare.</p></div>
        <div class="vhead__actions"><button class="btn btn--primary btn--small" type="button" data-act="add-section">${ICON.plus}<span>Nuova sezione</span></button></div></div>
      <div class="stats">
        <div class="stat"><b>${M.sections.length}</b><span>sezioni</span></div>
        <div class="stat"><b>${total}</b><span>voci totali</span></div>
        <div class="stat"><b>${hidden}</b><span>nascoste</span></div>
        <div class="stat"><b>${soldout}</b><span>esaurite</span></div>
      </div>
      <div class="search">${ICON.search}<input type="search" id="menuSearch" placeholder="Cerca una voce in tutto il menù…" value="${esc(S.query)}" autocomplete="off"></div>
      ${results}
      <div class="cards" id="sectionList" data-kind="section">
        ${M.sections.map((s, i) => `
          <div class="card card--section${s.hidden ? " is-hidden" : ""}" data-id="${esc(s.id)}" draggable="true">
            <span class="card__grip" title="Trascina per riordinare">${ICON.grip}</span>
            <div class="card__icon">${ICON[s.icon] || ICON.star}</div>
            <div class="card__main" data-open="${esc(s.id)}">
              <div class="card__title">${esc(s.title)}${s.hidden ? '<span class="badge badge--muted">Nascosta</span>' : ""}</div>
              <div class="card__meta">${s.groups.length} ${s.groups.length === 1 ? "gruppo" : "gruppi"} · ${countVisible(s)}/${countItems(s)} voci visibili${s.title_en ? "" : " · manca EN"}</div>
            </div>
            <div class="card__actions">
              <button class="ibtn" type="button" data-act="move" data-dir="-1" aria-label="Sposta su" ${i === 0 ? "disabled" : ""}>${ICON.up}</button>
              <button class="ibtn" type="button" data-act="move" data-dir="1" aria-label="Sposta giù" ${i === M.sections.length - 1 ? "disabled" : ""}>${ICON.down}</button>
              <button class="ibtn${s.hidden ? "" : " is-on"}" type="button" data-act="toggle-hidden" aria-label="${s.hidden ? "Mostra" : "Nascondi"}" title="${s.hidden ? "Mostra sezione" : "Nascondi sezione"}">${s.hidden ? ICON.eyeOff : ICON.eye}</button>
              <button class="ibtn" type="button" data-act="edit-section" aria-label="Modifica">${ICON.edit}</button>
              <button class="ibtn" type="button" data-open="${esc(s.id)}" aria-label="Apri">${ICON.chev}</button>
            </div>
          </div>`).join("")}
      </div>
      ${M.sections.length ? "" : '<div class="empty">Nessuna sezione. Crea la prima con “Nuova sezione”.</div>'}
      <div class="callout" style="margin-top:16px">La pagina <b>Allergeni</b> si gestisce dalla scheda dedicata. Le voci con un’immagine mostrano il logo (come le birre).</div>`;
  }

  /* ------------------------------------------------------------------
     Vista: una sezione con gruppi e voci
     ------------------------------------------------------------------ */
  function itemCard(it, g, s, withPath) {
    const prices = (it.prices || []).filter(p => p.p !== "" && p.p != null);
    const priceTxt = prices.length ? (prices.length === 1 ? fmt(prices[0].p) : `${fmt(Math.min(...prices.map(p => +p.p)))} – ${fmt(Math.max(...prices.map(p => +p.p)))}`) : "—";
    const badges = [
      it.hidden ? '<span class="badge badge--muted">Nascosta</span>' : "",
      it.soldout ? '<span class="badge badge--warn">Esaurita</span>' : "",
      it.badge ? `<span class="badge badge--red">${esc(it.badge)}</span>` : ""
    ].join("");
    const meta = withPath ? `${esc(s.title)} › ${esc(g.title)}` : esc([it.sub, it.desc].filter(Boolean).join(" · ") || (prices.length > 1 ? prices.map(p => `${p.l || ""} ${fmt(p.p)}`).join(" · ") : ""));
    return `
      <div class="card card--item${it.hidden ? " is-hidden" : ""}" data-id="${esc(it.id)}" data-gid="${esc(g.id)}" data-sid="${esc(s.id)}" draggable="${withPath ? "false" : "true"}">
        <span class="card__grip" ${withPath ? 'style="visibility:hidden"' : ""}>${ICON.grip}</span>
        <div class="card__icon">${it.img ? `<img src="../assets/img/${esc(it.img)}" alt="" loading="lazy">` : ICON[s.icon] || ICON.star}</div>
        <div class="card__main" data-act="edit-item">
          <div class="card__title">${esc(it.name)}${badges}</div>
          <div class="card__meta">${meta}${it.name_en || it.desc_en || !it.desc ? "" : " · manca EN"}</div>
        </div>
        <div class="card__actions">
          <span class="card__price">${priceTxt}</span>
          <button class="ibtn${it.hidden ? "" : " is-on"}" type="button" data-act="toggle-hidden" title="${it.hidden ? "Mostra" : "Nascondi"}" aria-label="${it.hidden ? "Mostra" : "Nascondi"}">${it.hidden ? ICON.eyeOff : ICON.eye}</button>
          <button class="ibtn${it.soldout ? " is-on" : ""}" type="button" data-act="toggle-soldout" title="${it.soldout ? "Di nuovo disponibile" : "Segna esaurito"}" aria-label="Esaurito">${ICON.ban}</button>
          <div class="row-menu">
            <button class="ibtn" type="button" data-act="row-menu" aria-label="Altre azioni" aria-haspopup="menu">${ICON.more}</button>
            <div class="menu" hidden>
              <button type="button" data-act="edit-item">Modifica</button>
              <button type="button" data-act="move" data-dir="-1">Sposta su</button>
              <button type="button" data-act="move" data-dir="1">Sposta giù</button>
              <button type="button" data-act="move-to">Sposta in un altro gruppo…</button>
              <button type="button" data-act="duplicate">Duplica</button>
              <button type="button" data-act="delete-item" style="color:var(--danger)">Elimina</button>
            </div>
          </div>
        </div>
      </div>`;
  }

  function viewSection() {
    const s = S.menu.sections.find(x => x.id === S.sectionId);
    if (!s) { S.sectionId = null; return viewMenu(); }
    return `
      <button class="crumb" type="button" data-act="back">${ICON.back} Tutte le sezioni</button>
      <div class="vhead">
        <div><h1>${esc(s.title)}${s.hidden ? ' <span class="badge badge--muted">Nascosta</span>' : ""}</h1><p>${esc(s.subtitle || "")}</p></div>
        <div class="vhead__actions">
          <button class="btn btn--ghost btn--small" type="button" data-act="edit-section">${ICON.edit}<span>Sezione</span></button>
          <button class="btn btn--primary btn--small" type="button" data-act="add-group">${ICON.plus}<span>Nuovo gruppo</span></button>
        </div>
      </div>
      ${s.groups.map((g, gi) => `
        <div class="group" data-gid="${esc(g.id)}">
          <div class="group__head${g.hidden ? " is-hidden" : ""}">
            <h3>${esc(g.title)}${g.hidden ? '<span class="badge badge--muted">Nascosto</span>' : ""} <span class="badge badge--muted">${g.items.length}</span></h3>
            <div class="group__actions">
              <button class="ibtn" type="button" data-act="move-group" data-dir="-1" aria-label="Sposta gruppo su" ${gi === 0 ? "disabled" : ""}>${ICON.up}</button>
              <button class="ibtn" type="button" data-act="move-group" data-dir="1" aria-label="Sposta gruppo giù" ${gi === s.groups.length - 1 ? "disabled" : ""}>${ICON.down}</button>
              <button class="ibtn${g.hidden ? "" : " is-on"}" type="button" data-act="toggle-group" aria-label="${g.hidden ? "Mostra gruppo" : "Nascondi gruppo"}">${g.hidden ? ICON.eyeOff : ICON.eye}</button>
              <button class="ibtn" type="button" data-act="edit-group" aria-label="Modifica gruppo">${ICON.edit}</button>
              <button class="ibtn ibtn--danger" type="button" data-act="delete-group" aria-label="Elimina gruppo">${ICON.trash}</button>
            </div>
          </div>
          ${g.intro ? `<p class="group__intro">${esc(g.intro)}</p>` : ""}
          <div class="cards" data-kind="item" data-gid="${esc(g.id)}">
            ${g.items.map(it => itemCard(it, g, s)).join("") || '<div class="empty">Nessuna voce in questo gruppo.</div>'}
          </div>
          <div class="addrow"><button class="btn btn--ghost btn--small" type="button" data-act="add-item" data-gid="${esc(g.id)}">${ICON.plus}<span>Aggiungi voce</span></button></div>
        </div>`).join("")}
      ${s.groups.length ? "" : '<div class="empty">Questa sezione non ha ancora gruppi. Un gruppo è un blocco di voci con un titolo (es. “Primi & Secondi”).</div>'}`;
  }

  /* ------------------------------------------------------------------
     Azioni sulle liste (delegazione eventi)
     ------------------------------------------------------------------ */
  const findSection = id => S.menu.sections.find(s => s.id === id);
  const findGroup = (s, gid) => s.groups.find(g => g.id === gid);
  function move(arr, i, dir) { const j = i + dir; if (j < 0 || j >= arr.length) return false; [arr[i], arr[j]] = [arr[j], arr[i]]; return true; }
  function newId(prefix, name) { return `${prefix}-${slug(name) || "voce"}-${uid()}`; }

  $("#view").addEventListener("input", e => {
    if (e.target.id === "menuSearch") { S.query = e.target.value; const y = window.scrollY; $("#view").innerHTML = viewMenu(); window.scrollTo(0, y); const inp = $("#menuSearch"); inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
  });

  $("#view").addEventListener("click", async e => {
    const open = e.target.closest("[data-open]");
    if (open && !e.target.closest("[data-act]")) { S.sectionId = open.dataset.open; render(); return; }
    const b = e.target.closest("[data-act]"); if (!b) return;
    const act = b.dataset.act;
    const card = b.closest(".card");
    const sec = S.sectionId ? findSection(S.sectionId) : (card ? findSection(card.dataset.sid || card.dataset.id) : null);

    if (act === "back") { S.sectionId = null; render(); return; }
    if (act === "add-section") return openSectionSheet(null);
    if (act === "edit-section") return openSectionSheet(sec);
    if (act === "add-group") return openGroupSheet(sec, null);
    if (act === "row-menu") { const m = b.nextElementSibling; const wasOpen = !m.hidden; closeMenus(); m.hidden = wasOpen; return; }
    closeMenus();

    // sezioni (vista elenco)
    if (card && card.classList.contains("card--section")) {
      const i = S.menu.sections.indexOf(sec);
      if (act === "move") { if (move(S.menu.sections, i, +b.dataset.dir)) { markDirty(); render(true); } return; }
      if (act === "toggle-hidden") { sec.hidden = !sec.hidden; markDirty(); render(true); return; }
    }
    // gruppi
    const grpEl = b.closest(".group");
    if (grpEl && sec) {
      const g = findGroup(sec, grpEl.dataset.gid); const gi = sec.groups.indexOf(g);
      if (act === "move-group") { if (move(sec.groups, gi, +b.dataset.dir)) { markDirty(); render(true); } return; }
      if (act === "toggle-group") { g.hidden = !g.hidden; markDirty(); render(true); return; }
      if (act === "edit-group") return openGroupSheet(sec, g);
      if (act === "delete-group") {
        const ok = await confirmDlg(`Eliminare “${g.title}”?`, g.items.length ? `Verranno eliminate anche le ${g.items.length} voci del gruppo. Puoi sempre ripristinare un backup.` : "Il gruppo è vuoto.", "Elimina", true);
        if (ok) { sec.groups.splice(gi, 1); markDirty(); render(true); toast("Gruppo eliminato"); }
        return;
      }
      if (act === "add-item") return openItemSheet(sec, g, null);
    }
    // voci
    if (card && card.classList.contains("card--item")) {
      const s2 = findSection(card.dataset.sid) || sec; const g = findGroup(s2, card.dataset.gid); const it = g.items.find(x => x.id === card.dataset.id); const ii = g.items.indexOf(it);
      if (act === "edit-item") return openItemSheet(s2, g, it);
      if (act === "toggle-hidden") { it.hidden = !it.hidden; markDirty(); render(true); return; }
      if (act === "toggle-soldout") { it.soldout = !it.soldout; markDirty(); render(true); toast(it.soldout ? "Segnata come esaurita" : "Di nuovo disponibile"); return; }
      if (act === "move") { if (move(g.items, ii, +b.dataset.dir)) { markDirty(); render(true); } return; }
      if (act === "duplicate") { const c = clone(it); c.id = newId(s2.id.slice(0, 6), it.name); c.name = it.name + " (copia)"; g.items.splice(ii + 1, 0, c); markDirty(); render(true); toast("Voce duplicata"); return; }
      if (act === "delete-item") { const ok = await confirmDlg(`Eliminare “${it.name}”?`, "Puoi sempre ripristinare un backup.", "Elimina", true); if (ok) { g.items.splice(ii, 1); markDirty(); render(true); toast("Voce eliminata"); } return; }
      if (act === "move-to") return openMoveSheet(s2, g, it);
    }
  });

  /* Drag & drop (desktop) per sezioni e voci */
  let drag = null;
  $("#view").addEventListener("dragstart", e => {
    const card = e.target.closest(".card[draggable='true']"); if (!card) return;
    drag = { id: card.dataset.id, gid: card.dataset.gid, kind: card.closest(".cards").dataset.kind };
    card.classList.add("is-dragging"); e.dataTransfer.effectAllowed = "move"; try { e.dataTransfer.setData("text/plain", card.dataset.id); } catch { /* ignora */ }
  });
  $("#view").addEventListener("dragend", () => { drag = null; $$(".is-dragging, .is-over").forEach(c => c.classList.remove("is-dragging", "is-over")); });
  $("#view").addEventListener("dragover", e => {
    if (!drag) return; const card = e.target.closest(".card[draggable='true']"); if (!card) return;
    const list = card.closest(".cards"); if (list.dataset.kind !== drag.kind) return;
    e.preventDefault(); e.dataTransfer.dropEffect = "move";
    $$(".is-over").forEach(c => c.classList.remove("is-over")); card.classList.add("is-over");
  });
  $("#view").addEventListener("drop", e => {
    if (!drag) return; const card = e.target.closest(".card[draggable='true']"); if (!card) return;
    e.preventDefault();
    const list = card.closest(".cards"); if (list.dataset.kind !== drag.kind || card.dataset.id === drag.id) return;
    if (drag.kind === "section") {
      const arr = S.menu.sections; const from = arr.findIndex(s => s.id === drag.id); const to = arr.findIndex(s => s.id === card.dataset.id);
      arr.splice(to, 0, arr.splice(from, 1)[0]);
    } else {
      const sec = findSection(S.sectionId); const gFrom = findGroup(sec, drag.gid); const gTo = findGroup(sec, list.dataset.gid);
      const it = gFrom.items.splice(gFrom.items.findIndex(x => x.id === drag.id), 1)[0];
      const to = gTo.items.findIndex(x => x.id === card.dataset.id);
      gTo.items.splice(to, 0, it);
    }
    markDirty(); render(true);
  });

  /* ------------------------------------------------------------------
     Pannello laterale (editor generico)
     ------------------------------------------------------------------ */
  const sheet = $("#sheet"), sheetForm = $("#sheetForm"), sheetFoot = $("#sheetFoot");
  let sheetSubmit = null;
  const sheetOpen = () => !sheet.hidden;
  function openSheet(title, html, footHtml, onSubmit) {
    $("#sheetTitle").textContent = title; sheetForm.innerHTML = html; sheetFoot.innerHTML = footHtml;
    sheetSubmit = onSubmit; $("#sheetBackdrop").hidden = false; sheet.hidden = false;
    document.documentElement.style.overflow = "hidden";
    const first = sheetForm.querySelector("input:not([type=hidden]):not([type=checkbox]):not([type=radio]), textarea"); if (first) setTimeout(() => first.focus(), 60);
  }
  function closeSheet() { sheet.hidden = true; $("#sheetBackdrop").hidden = true; sheetSubmit = null; document.documentElement.style.overflow = ""; }
  $("#sheetClose").addEventListener("click", closeSheet);
  $("#sheetBackdrop").addEventListener("click", closeSheet);
  document.addEventListener("keydown", e => { if (e.key === "Escape") { if (sheetOpen()) closeSheet(); closeMenus(); } });
  sheetForm.addEventListener("submit", e => { e.preventDefault(); if (sheetSubmit) sheetSubmit(new FormData(sheetForm)); });
  sheetFoot.addEventListener("click", e => {
    const b = e.target.closest("[data-act]"); if (!b) return;
    if (b.dataset.act === "cancel") closeSheet();
    if (b.dataset.act === "submit") sheetForm.requestSubmit();
  });
  const F = (name, label, value, opt = {}) => `<label class="field"><span>${opt.lang ? `<span class="lang lang--${opt.lang}">${opt.lang.toUpperCase()}</span>` : ""}${esc(label)}</span>${opt.textarea
    ? `<textarea name="${name}" rows="${opt.rows || 3}" placeholder="${esc(opt.ph || "")}">${esc(value || "")}</textarea>`
    : `<input type="${opt.type || "text"}" name="${name}" value="${esc(value || "")}" placeholder="${esc(opt.ph || "")}" ${opt.required ? "required" : ""} ${opt.attrs || ""}>`}</label>`;
  const pair = (name, label, obj, opt = {}) => `<div class="grid2">${F(name, label, obj[name], { ...opt, lang: "it" })}${F(name + "_en", label, obj[name + "_en"], { ...opt, lang: "en", required: false })}</div>`;
  const SW = (name, label, on) => `<label class="switch"><input type="checkbox" name="${name}" ${on ? "checked" : ""}><span class="switch__track"></span><span class="switch__label">${esc(label)}</span></label>`;
  const footBtns = (okLabel, extra) => `${extra || ""}<span class="spacer"></span><button class="btn btn--ghost" type="button" data-act="cancel">Annulla</button><button class="btn btn--primary" type="button" data-act="submit">${esc(okLabel)}</button>`;

  /* ---- Sezione ---- */
  function openSectionSheet(sec) {
    const s = sec || { title: "", title_en: "", short: "", short_en: "", subtitle: "", subtitle_en: "", icon: "star", notes: [], hidden: false };
    openSheet(sec ? "Modifica sezione" : "Nuova sezione", `
      ${pair("title", "Titolo", s, { required: true, ph: "Es. Birre alla Spina" })}
      ${pair("short", "Nome breve (barra di navigazione)", s, { ph: "Es. Spina" })}
      ${pair("subtitle", "Sottotitolo", s, { ph: "Una riga sotto il titolo" })}
      <div class="field"><span>Icona</span><div class="icons">${SECTION_ICONS.map(k => `<label title="${k}"><input type="radio" name="icon" value="${k}" ${s.icon === k ? "checked" : ""}>${ICON[k]}</label>`).join("")}</div></div>
      <div class="field"><span>Note a fine sezione</span><div class="checks">${Object.keys(NOTE_LABELS).map(k => `<label class="check"><input type="checkbox" name="notes" value="${k}" ${(s.notes || []).includes(k) ? "checked" : ""}><span>${NOTE_LABELS[k]}</span></label>`).join("")}</div><p class="hint">I testi delle note si cambiano in Impostazioni.</p></div>
      ${SW("hidden", "Sezione nascosta (non appare nel menù)", s.hidden)}
    `, footBtns(sec ? "Salva" : "Crea sezione", sec ? `<button class="btn btn--ghost btn--danger" type="button" data-act="delete">Elimina sezione</button>` : ""), fd => {
      const title = (fd.get("title") || "").trim(); if (!title) return toast("Il titolo è obbligatorio", true);
      const target = sec || { id: newId("sez", title), groups: [] };
      Object.assign(target, {
        title, title_en: fd.get("title_en").trim(), short: fd.get("short").trim(), short_en: fd.get("short_en").trim(),
        subtitle: fd.get("subtitle").trim(), subtitle_en: fd.get("subtitle_en").trim(),
        icon: fd.get("icon") || "star", notes: fd.getAll("notes"), hidden: fd.get("hidden") === "on"
      });
      if (!sec) { S.menu.sections.push(target); S.sectionId = target.id; }
      markDirty(); closeSheet(); render(!!sec); toast(sec ? "Sezione aggiornata" : "Sezione creata");
    });
    if (sec) $("#sheetFoot [data-act=delete]").addEventListener("click", async () => {
      const n = countItems(sec);
      const ok = await confirmDlg(`Eliminare “${sec.title}”?`, n ? `Verranno eliminate anche le ${n} voci della sezione. Puoi sempre ripristinare un backup.` : "La sezione è vuota.", "Elimina", true);
      if (!ok) return;
      S.menu.sections.splice(S.menu.sections.indexOf(sec), 1); S.sectionId = null; markDirty(); closeSheet(); render(); toast("Sezione eliminata");
    });
  }

  /* ---- Gruppo ---- */
  function openGroupSheet(sec, grp) {
    const g = grp || { title: "", title_en: "", intro: "", intro_en: "", footnotes: [], footnotes_en: [], hidden: false };
    openSheet(grp ? "Modifica gruppo" : "Nuovo gruppo", `
      ${pair("title", "Titolo del gruppo", g, { required: true, ph: "Es. Primi & Secondi" })}
      ${pair("intro", "Riga introduttiva (opzionale)", g, { ph: "Es. Riservato ai bambini, grazie!" })}
      <div class="grid2">
        ${F("footnotes", "Note in fondo al gruppo (una per riga)", (g.footnotes || []).join("\n"), { textarea: true, rows: 2, lang: "it", ph: "Es. Possibilità del doppio hamburger + € 3.50" })}
        ${F("footnotes_en", "Note in fondo al gruppo (una per riga)", (g.footnotes_en || []).join("\n"), { textarea: true, rows: 2, lang: "en" })}
      </div>
      ${SW("hidden", "Gruppo nascosto", g.hidden)}
    `, footBtns(grp ? "Salva" : "Crea gruppo"), fd => {
      const title = (fd.get("title") || "").trim(); if (!title) return toast("Il titolo è obbligatorio", true);
      const lines = v => String(v || "").split("\n").map(x => x.trim()).filter(Boolean);
      const target = grp || { id: `${sec.id}--${slug(title) || "gruppo"}-${uid()}`, items: [] };
      Object.assign(target, { title, title_en: fd.get("title_en").trim(), intro: fd.get("intro").trim(), intro_en: fd.get("intro_en").trim(), footnotes: lines(fd.get("footnotes")), footnotes_en: lines(fd.get("footnotes_en")), hidden: fd.get("hidden") === "on" });
      if (!grp) sec.groups.push(target);
      markDirty(); closeSheet(); render(true); toast(grp ? "Gruppo aggiornato" : "Gruppo creato");
    });
  }

  /* ---- Voce ---- */
  function priceRowHtml(p, i) {
    return `<div class="price-row" data-i="${i}">
      ${F(`pl_${i}`, "Formato", p.l, { lang: "it", ph: "Es. Pinta 0.4" })}
      ${F(`ple_${i}`, "Formato", p.l_en, { lang: "en", ph: "Es. Pint 0.4" })}
      <label class="field price-row__p"><span>Prezzo €</span><input type="text" inputmode="decimal" name="pp_${i}" value="${p.p == null ? "" : esc(p.p)}" placeholder="0.00" ${i === 0 ? "required" : ""}></label>
      <button class="ibtn ibtn--danger" type="button" data-act="del-price" aria-label="Rimuovi formato">${ICON.trash}</button>
    </div>`;
  }
  function openItemSheet(sec, grp, item) {
    const it = item || { name: "", name_en: "", badge: "", badge_en: "", sub: "", sub_en: "", desc: "", desc_en: "", prices: [{ l: "", l_en: "", p: "" }], tags: [], img: "", abv: "", style: "", brewery: "", origin: "", hidden: false, soldout: false };
    const tags = S.menu.tagLabels || {};
    const isBeerSec = /spina|bottigl|birr/i.test(sec.title) || !!it.img;
    openSheet(item ? "Modifica voce" : "Nuova voce", `
      ${pair("name", "Nome", it, { required: true, ph: "Es. Smash Burger" })}
      ${pair("desc", "Descrizione / ingredienti", it, { textarea: true, rows: 3, ph: "Es. pane artigianale, bacon croccante…" })}
      ${pair("sub", "Riga sotto il nome (stile, birrificio, produttore…)", it, { ph: "Es. Pale Ale · 4,9% · Piacenza" })}
      ${pair("badge", "Etichetta rossa accanto al nome", it, { ph: "Es. spinata a pompa · novità" })}
      <div class="fieldset"><div class="fieldset__title">Prezzi e formati</div>
        <p class="hint">Un solo formato: lascia vuoto il nome del formato. Più formati (es. 0.2 / 0.5 / 1.0): una riga ciascuno. Il formato in inglese è opzionale (Pinta, Boccale, Bottiglia… vengono tradotti da soli).</p>
        <div class="prices" id="priceRows">${it.prices.map(priceRowHtml).join("")}</div>
        <div><button class="btn btn--ghost btn--small" type="button" data-act="add-price">${ICON.plus}<span>Aggiungi formato</span></button></div>
      </div>
      <div class="field"><span>Etichette</span><div class="checks">${Object.keys(tags).map(k => `<label class="check"><input type="checkbox" name="tags" value="${esc(k)}" ${(it.tags || []).includes(k) ? "checked" : ""}><span>${esc(tags[k].it)}</span></label>`).join("")}</div></div>
      <div class="field"><span>Immagine / logo</span>
        <div class="imgpick">
          <div class="imgpick__thumb" id="imgThumb">${it.img ? `<img src="../assets/img/${esc(it.img)}" alt="">` : ICON.image}</div>
          <input type="hidden" name="img" value="${esc(it.img)}">
          <div class="imgpick__btns"><button class="btn btn--ghost btn--small" type="button" data-act="pick-img">Scegli…</button><button class="btn btn--ghost btn--small" type="button" data-act="clear-img" ${it.img ? "" : "disabled"}>Rimuovi</button></div>
        </div>
        <p class="hint">Con un’immagine la voce viene mostrata come scheda grande (come le birre).</p>
      </div>
      <details class="fieldset" ${isBeerSec ? "open" : ""}><summary>Dettagli birra (opzionali)</summary>
        <div class="grid2">${F("abv", "Gradazione", it.abv, { ph: "Es. 5,2%" })}${F("style", "Stile", it.style, { ph: "Es. Weizen" })}${F("brewery", "Birrificio", it.brewery, { ph: "Es. Franziskaner Bräu" })}${F("origin", "Provenienza", it.origin, { ph: "Es. Germania" })}</div>
      </details>
      <div class="grid2">${SW("hidden", "Nascosta nel menù", it.hidden)}${SW("soldout", "Esaurita (visibile ma non ordinabile)", it.soldout)}</div>
    `, footBtns(item ? "Salva" : "Aggiungi voce", item ? `<button class="btn btn--ghost btn--danger" type="button" data-act="delete">Elimina</button>` : ""), fd => {
      const name = (fd.get("name") || "").trim(); if (!name) return toast("Il nome è obbligatorio", true);
      const prices = [];
      $$("#priceRows .price-row").forEach(r => {
        const i = r.dataset.i; const raw = String(fd.get(`pp_${i}`) || "").replace(",", ".").trim();
        if (raw === "") return; const p = Number(raw); if (!isFinite(p) || p < 0) return;
        prices.push({ l: (fd.get(`pl_${i}`) || "").trim(), l_en: (fd.get(`ple_${i}`) || "").trim(), p: Math.round(p * 100) / 100 });
      });
      if (!prices.length) return toast("Inserisci almeno un prezzo", true);
      const target = item || { id: newId(sec.id.slice(0, 6), name) };
      Object.assign(target, {
        name, name_en: fd.get("name_en").trim(), desc: fd.get("desc").trim(), desc_en: fd.get("desc_en").trim(),
        sub: fd.get("sub").trim(), sub_en: fd.get("sub_en").trim(), badge: fd.get("badge").trim(), badge_en: fd.get("badge_en").trim(),
        prices, tags: fd.getAll("tags"), img: fd.get("img") || "",
        abv: fd.get("abv").trim(), style: fd.get("style").trim(), brewery: fd.get("brewery").trim(), origin: fd.get("origin").trim(),
        hidden: fd.get("hidden") === "on", soldout: fd.get("soldout") === "on"
      });
      if (!item) grp.items.push(target);
      markDirty(); closeSheet(); render(true); toast(item ? "Voce aggiornata" : "Voce aggiunta");
    });
    if (item) $("#sheetFoot [data-act=delete]").addEventListener("click", async () => {
      const ok = await confirmDlg(`Eliminare “${item.name}”?`, "Puoi sempre ripristinare un backup.", "Elimina", true); if (!ok) return;
      grp.items.splice(grp.items.indexOf(item), 1); markDirty(); closeSheet(); render(true); toast("Voce eliminata");
    });
  }
  sheetForm.addEventListener("click", async e => {
    const b = e.target.closest("[data-act]"); if (!b) return;
    if (b.dataset.act === "add-price") { const rows = $("#priceRows"); const i = rows.children.length ? Math.max(...$$(".price-row", rows).map(r => +r.dataset.i)) + 1 : 0; rows.insertAdjacentHTML("beforeend", priceRowHtml({ l: "", l_en: "", p: "" }, i)); rows.lastElementChild.querySelector("input").focus(); }
    if (b.dataset.act === "del-price") { const rows = $("#priceRows"); if (rows.children.length > 1) b.closest(".price-row").remove(); else toast("Serve almeno un prezzo", true); }
    if (b.dataset.act === "clear-img") { sheetForm.img.value = ""; $("#imgThumb").innerHTML = ICON.image; b.disabled = true; }
    if (b.dataset.act === "pick-img") { const p = await pickImage(); if (p != null) { sheetForm.img.value = p; $("#imgThumb").innerHTML = `<img src="../assets/img/${esc(p)}" alt="">`; $("#sheetForm [data-act=clear-img]").disabled = false; } }
  });

  /* ---- Sposta voce in un altro gruppo ---- */
  function openMoveSheet(sec, grp, it) {
    const opts = S.menu.sections.flatMap(s => s.groups.map(g => ({ s, g })));
    openSheet("Sposta voce", `
      <p class="hint">Scegli dove spostare <b>${esc(it.name)}</b>.</p>
      <label class="field"><span>Destinazione</span><select name="dest">${opts.map(o => `<option value="${esc(o.s.id)}|${esc(o.g.id)}" ${o.g === grp ? "selected" : ""}>${esc(o.s.title)} › ${esc(o.g.title)}</option>`).join("")}</select></label>
    `, footBtns("Sposta"), fd => {
      const [sid, gid] = String(fd.get("dest")).split("|"); const dest = findGroup(findSection(sid), gid);
      if (dest === grp) return closeSheet();
      grp.items.splice(grp.items.indexOf(it), 1); dest.items.push(it);
      markDirty(); closeSheet(); render(true); toast("Voce spostata");
    });
  }

  /* ---- Selettore immagini ---- */
  function pickImage() {
    return new Promise(async resolve => {
      const d = $("#picker"), grid = $("#pickerGrid");
      grid.innerHTML = '<div class="empty">Caricamento…</div>';
      d.showModal();
      const done = v => { d.close(); resolve(v); };
      const draw = async () => {
        try { const r = await api("images"); S.images = r.images; } catch (e) { grid.innerHTML = `<div class="empty">${esc(e.message)}</div>`; return; }
        grid.innerHTML = S.images.map(im => `<button type="button" data-path="${esc(im.path)}"><img src="../assets/img/${esc(im.path)}" alt="" loading="lazy"><small>${esc(im.path.split("/").pop())}</small></button>`).join("") || '<div class="empty">Nessuna immagine. Caricane una.</div>';
      };
      await draw();
      grid.onclick = e => { const b = e.target.closest("button[data-path]"); if (b) done(b.dataset.path); };
      $("#pickerClose").onclick = () => done(null);
      d.oncancel = () => resolve(null);
      $("#pickerUpload").onchange = async e => {
        const f = e.target.files[0]; e.target.value = ""; if (!f) return;
        const form = new FormData(); form.append("file", f);
        try { const r = await api("upload", { form }); toast("Immagine caricata"); done(r.path); } catch (ex) { toast(ex.message, true); }
      };
    });
  }

  /* ------------------------------------------------------------------
     Vista: allergeni
     ------------------------------------------------------------------ */
  function viewAllergens() {
    const A = S.menu.allergens || (S.menu.allergens = { id: "allergeni", list: [] });
    return `
      <div class="vhead"><div><h1>Allergeni</h1><p>La pagina informativa come da cartello (Reg. CE 1169/2011).</p></div></div>
      <form id="allergenForm" class="form-section">
        ${pair("title", "Titolo", A, { required: true })}
        ${pair("short", "Nome breve (navigazione)", A)}
        ${pair("heading", "Intestazione", A, { textarea: true, rows: 3 })}
        ${pair("legal", "Nota legale (piccola)", A, { textarea: true, rows: 3 })}
        ${pair("notice", "Avviso alla clientela", A, { textarea: true, rows: 3 })}
        ${pair("listIntro", "Introduzione all’elenco", A, { textarea: true, rows: 3 })}
        <div class="field"><span>Elenco allergeni</span>
          <div class="prices" id="allergenRows">${(A.list || []).map((a, i) => `<div class="price-row" data-i="${i}" style="grid-template-columns:52px 1fr 1fr auto">
            <label class="field"><span>N.</span><input type="number" name="an_${i}" value="${esc(a.n)}" min="1" max="99"></label>
            ${F(`at_${i}`, "Testo", a.t, { lang: "it" })}${F(`ate_${i}`, "Testo", a.t_en, { lang: "en" })}
            <button class="ibtn ibtn--danger" type="button" data-act="del-allergen" aria-label="Rimuovi">${ICON.trash}</button></div>`).join("")}</div>
          <div class="addrow"><button class="btn btn--ghost btn--small" type="button" data-act="add-allergen">${ICON.plus}<span>Aggiungi riga</span></button></div>
        </div>
        ${pair("signature", "Firma", A)}
        ${SW("hidden", "Nascondi la pagina allergeni", A.hidden)}
        <div class="callout callout--warn">L’informativa sugli allergeni è un obbligo di legge: nascondila solo se la fornisci in altro modo.</div>
        <div><button class="btn btn--primary" type="submit">Salva allergeni</button></div>
      </form>`;
  }

  /* ------------------------------------------------------------------
     Vista: impostazioni
     ------------------------------------------------------------------ */
  function viewSettings() {
    const B = S.menu.brand; const tags = S.menu.tagLabels || {}; const pls = S.menu.priceLabels || {};
    return `
      <div class="vhead"><div><h1>Impostazioni</h1><p>Contatti, testi ricorrenti ed etichette.</p></div></div>
      <form id="settingsForm">
        <div class="form-section"><h2>Locale</h2>
          <div class="grid2">${F("name", "Nome", B.name, { required: true })}${F("city", "Città", B.city)}</div>
          <div class="grid2">${F("instagram", "Instagram (senza @)", B.instagram, { ph: "birreriaoktoberfestre" })}${F("instagramUrl", "Link Instagram", B.instagramUrl, { type: "url" })}</div>
          ${F("address", "Indirizzo", B.address)}
          <div class="grid2">${F("mapsUrl", "Link mappa", B.mapsUrl, { type: "url" })}${F("phone", "Telefono", B.phone, { type: "tel" })}</div>
        </div>
        <div class="form-section"><h2>Note ricorrenti</h2>
          <p class="hint">Compaiono in fondo alle sezioni che le hanno attivate e nel piè di pagina.</p>
          ${pair("serviceNote", "Servizio", B, { ph: "€ 1.50 a persona" })}
          ${pair("allergyNote", "Allergie e intolleranze", B, { textarea: true, rows: 2 })}
          ${pair("frozenNote", "Ingredienti surgelati", B, { textarea: true, rows: 2 })}
        </div>
        <details class="form-section fieldset"><summary>Etichette delle voci (tag)</summary>
          <p class="hint">Piccole etichette che puoi assegnare alle voci (es. “Senza glutine”). La chiave non si può cambiare dopo l’uso.</p>
          <div class="prices" id="tagRows">${Object.keys(tags).map((k, i) => `<div class="price-row" data-i="${i}" style="grid-template-columns:1fr 1fr 1fr auto">
            <label class="field"><span>Chiave</span><input type="text" name="tk_${i}" value="${esc(k)}" pattern="[a-z0-9\\-]+" required></label>
            ${F(`ti_${i}`, "Testo", tags[k].it, { lang: "it" })}${F(`te_${i}`, "Testo", tags[k].en, { lang: "en" })}
            <button class="ibtn ibtn--danger" type="button" data-act="del-row" aria-label="Rimuovi">${ICON.trash}</button></div>`).join("")}</div>
          <div class="addrow"><button class="btn btn--ghost btn--small" type="button" data-act="add-tag">${ICON.plus}<span>Aggiungi etichetta</span></button></div>
        </details>
        <details class="form-section fieldset"><summary>Traduzione automatica dei formati (IT → EN)</summary>
          <p class="hint">Quando un formato non ha la traduzione inglese, viene cercato qui (per parola intera o per prima parola: “Pinta 0.4” → “Pint 0.4”).</p>
          <div class="prices" id="plRows">${Object.keys(pls).map((k, i) => `<div class="price-row" data-i="${i}" style="grid-template-columns:1fr 1fr auto">
            ${F(`pk_${i}`, "Italiano", k)}${F(`pv_${i}`, "Inglese", pls[k])}
            <button class="ibtn ibtn--danger" type="button" data-act="del-row" aria-label="Rimuovi">${ICON.trash}</button></div>`).join("")}</div>
          <div class="addrow"><button class="btn btn--ghost btn--small" type="button" data-act="add-pl">${ICON.plus}<span>Aggiungi traduzione</span></button></div>
        </details>
        <div><button class="btn btn--primary" type="submit">Salva impostazioni</button></div>
      </form>`;
  }

  /* Submit dei form “pagina” (allergeni, impostazioni) e righe dinamiche */
  $("#view").addEventListener("submit", e => {
    e.preventDefault(); const fd = new FormData(e.target);
    const g = k => String(fd.get(k) == null ? "" : fd.get(k)).trim();
    if (e.target.id === "allergenForm") {
      const A = S.menu.allergens;
      ["title", "title_en", "short", "short_en", "heading", "heading_en", "legal", "legal_en", "notice", "notice_en", "listIntro", "listIntro_en", "signature", "signature_en"].forEach(k => { A[k] = g(k); });
      A.hidden = fd.get("hidden") === "on";
      A.list = $$("#allergenRows .price-row").map(r => ({ n: +g(`an_${r.dataset.i}`) || 0, t: g(`at_${r.dataset.i}`), t_en: g(`ate_${r.dataset.i}`) })).filter(a => a.t);
      markDirty(); toast("Allergeni salvati nella bozza");
    }
    if (e.target.id === "settingsForm") {
      const B = S.menu.brand;
      ["name", "city", "instagram", "instagramUrl", "address", "mapsUrl", "phone", "serviceNote", "serviceNote_en", "allergyNote", "allergyNote_en", "frozenNote", "frozenNote_en"].forEach(k => { B[k] = g(k); });
      B.instagram = B.instagram.replace(/^@/, "");
      if (B.instagram && !B.instagramUrl) B.instagramUrl = `https://www.instagram.com/${B.instagram}/`;
      const tags = {}; $$("#tagRows .price-row").forEach(r => { const k = slug(g(`tk_${r.dataset.i}`)); if (k) tags[k] = { it: g(`ti_${r.dataset.i}`) || k, en: g(`te_${r.dataset.i}`) }; });
      S.menu.tagLabels = tags;
      const pls = {}; $$("#plRows .price-row").forEach(r => { const k = g(`pk_${r.dataset.i}`), v = g(`pv_${r.dataset.i}`); if (k && v) pls[k] = v; });
      S.menu.priceLabels = pls;
      markDirty(); toast("Impostazioni salvate nella bozza");
    }
  });
  $("#view").addEventListener("click", e => {
    const b = e.target.closest("[data-act]"); if (!b) return;
    const act = b.dataset.act;
    const nextIndex = rows => rows.children.length ? Math.max(...$$(".price-row", rows).map(r => +r.dataset.i)) + 1 : 0;
    if (act === "del-row" || act === "del-allergen") b.closest(".price-row").remove();
    if (act === "add-allergen") { const rows = $("#allergenRows"); const i = nextIndex(rows); rows.insertAdjacentHTML("beforeend", `<div class="price-row" data-i="${i}" style="grid-template-columns:52px 1fr 1fr auto"><label class="field"><span>N.</span><input type="number" name="an_${i}" value="${i + 1}" min="1" max="99"></label>${F(`at_${i}`, "Testo", "", { lang: "it" })}${F(`ate_${i}`, "Testo", "", { lang: "en" })}<button class="ibtn ibtn--danger" type="button" data-act="del-allergen" aria-label="Rimuovi">${ICON.trash}</button></div>`); }
    if (act === "add-tag") { const rows = $("#tagRows"); const i = nextIndex(rows); rows.insertAdjacentHTML("beforeend", `<div class="price-row" data-i="${i}" style="grid-template-columns:1fr 1fr 1fr auto"><label class="field"><span>Chiave</span><input type="text" name="tk_${i}" value="" pattern="[a-z0-9\\-]+" placeholder="es. piccante" required></label>${F(`ti_${i}`, "Testo", "", { lang: "it" })}${F(`te_${i}`, "Testo", "", { lang: "en" })}<button class="ibtn ibtn--danger" type="button" data-act="del-row" aria-label="Rimuovi">${ICON.trash}</button></div>`); }
    if (act === "add-pl") { const rows = $("#plRows"); const i = nextIndex(rows); rows.insertAdjacentHTML("beforeend", `<div class="price-row" data-i="${i}" style="grid-template-columns:1fr 1fr auto">${F(`pk_${i}`, "Italiano", "")}${F(`pv_${i}`, "Inglese", "")}<button class="ibtn ibtn--danger" type="button" data-act="del-row" aria-label="Rimuovi">${ICON.trash}</button></div>`); }
  });

  /* ------------------------------------------------------------------
     Vista: backup
     ------------------------------------------------------------------ */
  async function viewBackups() {
    let list = [];
    try { list = (await api("backups")).backups; } catch (e) { $("#view").innerHTML = `<div class="empty">${esc(e.message)}</div>`; return; }
    $("#view").innerHTML = `
      <div class="vhead"><div><h1>Backup</h1><p>Ad ogni pubblicazione il menù precedente viene salvato qui (ultimi 40).</p></div>
        <div class="vhead__actions"><a class="btn btn--ghost btn--small" href="../api/index.php?action=export">Esporta JSON</a><button class="btn btn--ghost btn--small" type="button" id="importBtn2">Importa JSON</button></div></div>
      ${list.length ? `<table class="table"><thead><tr><th>Data</th><th>Dimensione</th><th></th></tr></thead><tbody>${list.map(b => `<tr><td>${esc(timeFmt(b.time))}</td><td>${Math.round(b.size / 1024)} KB</td><td style="text-align:right"><button class="btn btn--ghost btn--small" type="button" data-restore="${esc(b.name)}">Ripristina come bozza</button></td></tr>`).join("")}</tbody></table>` : '<div class="empty">Nessun backup ancora. Il primo viene creato alla prossima pubblicazione.</div>'}
      <div class="callout" style="margin-top:14px">Il ripristino carica il backup come <b>bozza</b>: puoi controllarlo con “Anteprima” e poi pubblicarlo, oppure scartarlo.</div>`;
    $("#importBtn2").addEventListener("click", () => $("#importFile").click());
    $$("[data-restore]").forEach(b => b.addEventListener("click", async () => {
      const ok = await confirmDlg("Ripristinare questo backup?", "La bozza attuale verrà sostituita (il menù online non cambia finché non pubblichi).", "Ripristina");
      if (!ok) return;
      try { const r = await api("restore", { body: { name: b.dataset.restore } }); S.menu = r.menu; S.dirty = false; S.status.draft = true; S.view = "menu"; S.sectionId = null; render(); renderStatus(); toast("Backup caricato come bozza"); }
      catch (e) { toast(e.message, true); }
    }));
  }

  /* ------------------------------------------------------------------
     Cambio password
     ------------------------------------------------------------------ */
  function openPasswordSheet() {
    openSheet("Cambia password", `
      ${F("current", "Password attuale", "", { type: "password", required: true, attrs: 'autocomplete="current-password"' })}
      ${F("new", "Nuova password (almeno 8 caratteri)", "", { type: "password", required: true, attrs: 'autocomplete="new-password" minlength="8"' })}
      ${F("new2", "Ripeti la nuova password", "", { type: "password", required: true, attrs: 'autocomplete="new-password"' })}
    `, footBtns("Cambia password"), async fd => {
      if (fd.get("new") !== fd.get("new2")) return toast("Le due password non coincidono", true);
      try { await api("password", { body: { current: fd.get("current"), new: fd.get("new") } }); closeSheet(); toast("Password aggiornata"); }
      catch (e) { toast(e.message, true); }
    });
  }
})();
