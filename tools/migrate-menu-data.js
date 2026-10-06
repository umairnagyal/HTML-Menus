#!/usr/bin/env node
/* One-off migration (already executed; the two source files now live only in git history): merges the original menu-data.js (IT) and menu-data.en.js (EN)
   into the unified data/menu.json the admin panel edits, and writes the public
   fallback assets/js/menu-fallback.js.  Run from the repo root:
     node tools/migrate-menu-data.js
*/
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "oktoberfest");
global.window = {};
require(path.join(root, "assets/js/menu-data.js"));
require(path.join(root, "assets/js/menu-data.en.js"));
const M = window.MENU, E = window.MENU_EN;

const slug = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const out = {
  version: 1,
  updatedAt: new Date().toISOString(),
  brand: {
    name: M.brand.name, city: M.brand.city,
    instagram: M.brand.instagram, instagramUrl: M.brand.instagramUrl,
    address: M.brand.address, mapsUrl: M.brand.mapsUrl, phone: M.brand.phone, phoneHref: M.brand.phoneHref,
    serviceNote: M.brand.serviceNote, serviceNote_en: E.brand.serviceNote,
    allergyNote: M.brand.allergyNote, allergyNote_en: E.brand.allergyNote,
    frozenNote: M.brand.frozenNote, frozenNote_en: E.brand.frozenNote
  },
  priceLabels: E.priceLabels,
  tagLabels: M.tagLabels,
  sections: M.sections.map(s => {
    const S = E.sections[s.id] || { groups: {} };
    return {
      id: s.id, hidden: false,
      title: s.title, title_en: S.title || "",
      short: s.short || "", short_en: S.short || "",
      subtitle: s.subtitle || "", subtitle_en: S.subtitle || "",
      icon: s.icon, notes: s.notes || [],
      groups: s.groups.map(g => {
        const G = (S.groups && S.groups[g.title]) || {};
        return {
          id: `${s.id}--${slug(g.title)}`, hidden: false,
          title: g.title, title_en: G.title || "",
          intro: g.intro || "", intro_en: G.intro || "",
          footnotes: g.footnotes || [], footnotes_en: G.footnotes || [],
          items: g.items.map(it => {
            const I = E.items[it.id] || {};
            const o = {
              id: it.id, hidden: false, soldout: false,
              name: it.name, name_en: I.name || "",
              badge: it.badge || "", badge_en: I.badge || "",
              sub: it.sub || "", sub_en: I.sub || "",
              desc: it.desc || "", desc_en: I.desc || "",
              prices: it.prices.map(p => ({ l: p.l || "", l_en: "", p: p.p })),
              tags: it.tags || [],
              img: it.img || "", abv: it.abv || "", style: it.style || "", brewery: it.brewery || "", origin: it.origin || ""
            };
            return o;
          })
        };
      })
    };
  }),
  allergens: {
    id: M.allergens.id, hidden: false,
    title: M.allergens.title, title_en: E.allergens.title,
    short: M.allergens.short, short_en: E.allergens.short,
    heading: M.allergens.heading, heading_en: E.allergens.heading,
    legal: M.allergens.legal, legal_en: E.allergens.legal,
    notice: M.allergens.notice, notice_en: E.allergens.notice,
    listIntro: M.allergens.listIntro, listIntro_en: E.allergens.listIntro,
    list: M.allergens.list.map((a, i) => ({ n: a.n, t: a.t, t_en: E.allergens.list[i] || "" })),
    signature: M.allergens.signature, signature_en: E.allergens.signature
  }
};

fs.mkdirSync(path.join(root, "data"), { recursive: true });
const json = JSON.stringify(out, null, 2);
fs.writeFileSync(path.join(root, "data/menu.json"), json + "\n");
fs.writeFileSync(path.join(root, "assets/js/menu-fallback.js"), "/* Generato automaticamente al momento della pubblicazione: copia di data/menu.json usata se il JSON non è raggiungibile. */\nwindow.MENU_FALLBACK = " + json + ";\n");
let n = 0; out.sections.forEach(s => s.groups.forEach(g => { n += g.items.length; }));
console.log(`menu.json written: ${out.sections.length} sections, ${n} items, ${out.allergens.list.length} allergens`);
