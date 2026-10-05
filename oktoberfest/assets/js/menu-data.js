/* =====================================================================
   BIRRERIA OKTOBERFEST – REGGIO EMILIA
   Dati del menù. Modifica QUI prezzi, piatti e descrizioni.
   ---------------------------------------------------------------------
   Struttura:
     sections[]  -> { id, title, subtitle, icon, notes[], groups[] }
     groups[]    -> { title, intro, items[], footnotes[] }
     items[]     -> { id, name, sub, desc, prices[], img, tags[] }
     prices[]    -> { l: "etichetta" (opzionale), p: 6.5 }
   Ogni voce con più formati (es. 0.2 / 0.5 / 1.0) ha un prezzo per riga.
   ===================================================================== */
window.MENU = {
  brand: {
    name: "Birreria Oktoberfest",
    city: "Reggio Emilia",
    instagram: "birreriaoktoberfestre",
    instagramUrl: "https://www.instagram.com/birreriaoktoberfestre/",
    address: "Via Ildebrando Pizzetti 2/D, 42124 Reggio Emilia (RE)",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Birreria+Oktoberfest+Via+Ildebrando+Pizzetti+2%2FD+Reggio+Emilia",
    phone: "+39 0522 702034",
    phoneHref: "tel:+390522702034",
    serviceNote: "€ 1.50 a persona",
    allergyNote: "I clienti che presentano allergie o intolleranze possono rivolgersi al responsabile di sala per un adeguato servizio.",
    frozenNote: "Alcuni ingredienti possono essere utilizzati a partire da congelato/surgelato."
  },

  sections: [
    /* ================================================================
       1 · BIRRE ALLA SPINA
       ================================================================ */
    {
      id: "spina",
      title: "Birre alla Spina",
      short: "Spina",
      subtitle: "Dodici vie, dalle birre di casa alle grandi classiche",
      icon: "tap",
      groups: [
        {
          title: "Le birre di casa",
          intro: "Birre realizzate e personalizzate per Birreria Oktoberfest.",
          items: [
            {
              id: "spina-sanprosper",
              name: "La Sanprosper",
              sub: "Indian Pale Ale · 6,5% · Reggio Emilia · Birrificio Dada",
              style: "Indian Pale Ale", abv: "6,5%", origin: "Reggio Emilia", brewery: "Birrificio Dada",
              desc: "Di color arancio acceso, con schiuma fine e compatta. All’olfatto possiamo individuare piacevoli note agrumate e sentori maltati. In bocca chiaro è l’ottimo bilanciamento fra il dolce del malto e l’amaro del luppolo. Il sapore dolce leggermente caramellato che si percepisce all’inizio, ma presto lascia lo spazio ad un amaro lungo, secco e agrumato. Il finale lascia un piacevole sapore ed una bocca pulita. Birra realizzata e personalizzata per Birreria Oktoberfest.",
              prices: [{ l: "Pinta 0.4", p: 6.5 }],
              img: "beers/sanprosper.webp",
              tags: ["casa"]
            },
            {
              id: "spina-spqr",
              name: "SPQR",
              sub: "Bock Scura · 6,9% · Piacenza · Buttiga Craft Brewery",
              style: "Bock Scura", abv: "6,9%", origin: "Piacenza", brewery: "Buttiga Craft Brewery",
              desc: "Buttiga per questo progetto sceglie un partner d’eccezione, il Birrificio Vetra, con cui condividono già tante esperienze, dalle serate “poco raccomandabili” in giro per lo stivale a progetti con scopo benefico… Una Bock appunto, uno stile di birra a bassa fermentazione che ha le sue storiche radici nella bassa Sassonia, già abbondantemente esplorato dagli amici di Vetra ma una felice novità per noi di Buttiga. Birra realizzata e personalizzata per Birreria Oktoberfest.",
              prices: [{ l: "Pinta 0.4", p: 6.5 }],
              img: "beers/spqr.webp",
              tags: ["casa"]
            },
            {
              id: "spina-paulo10",
              name: "Paulo 10",
              badge: "spinata a pompa",
              sub: "Pale Ale · 4,9% · Piacenza · Buttiga Craft Brewery",
              style: "Pale Ale", abv: "4,9%", origin: "Piacenza", brewery: "Buttiga Craft Brewery",
              desc: "PAULO 10 è una splendida pale ale, delicata e limpida, caratterizzata da una schiuma fitta e da una luppolatura intensa con tendenze erbacee. Le note fruttate si inclinano verso il tropicale, offrendo un’esperienza di degustazione rinfrescante e complessa. Il gusto secco e amaro rinfresca il palato per ore. “Paulo” sta per Paulo Futre, quando nel lontano 1993 il migliore giocatore portoghese scelse la numero 10 della Reggiana… Birra realizzata e personalizzata per Birreria Oktoberfest.",
              prices: [{ l: "Pinta 0.4", p: 6.5 }],
              img: "beers/paulo10.webp",
              tags: ["casa"]
            }
          ]
        },
        {
          title: "Le classiche alla spina",
          items: [
            {
              id: "spina-budweiser",
              name: "Budweiser",
              sub: "American Lager · 5,0% · Stati Uniti · Anheuser Busch InBev",
              style: "American Lager", abv: "5,0%", origin: "Stati Uniti", brewery: "Anheuser Busch InBev",
              desc: "La birra Budweiser, anche chiamata semplicemente Bud, è una birra americana prodotta a Saint Louis nello Stato del Missouri ed è il prodotto di punta della multinazionale della birra Anheuser-Busch. Questa birra a bassa fermentazione si presenta con un colore giallo dorato scarico ed una schiuma bianca, fine e non molto persistente. Al naso si percepiscono note floreali e fruttate molto leggere. In bocca mostra una ridotta frizzantezza ed un corpo leggero, un aroma sfumato di luppolo ed un retrogusto dolciastro accompagnato da una lieve punta alcolica.",
              prices: [{ l: "Boccale 0.2", p: 3.5 }, { l: "Boccale 0.5", p: 6.5 }, { l: "Boccale 1.0", p: 13 }],
              img: "beers/budweiser.webp"
            },
            {
              id: "spina-warsteiner-herb",
              name: "Warsteiner Herb",
              sub: "Pilsner · 4,8% · Germania · Warsteiner Brauerei",
              style: "Pilsner", abv: "4,8%", origin: "Germania", brewery: "Warsteiner Brauerei",
              desc: "Warsteiner Herb porta nel bicchiere una lieve gradazione alcolica del 4,8% e si presenta in un colore ambrato chiaro. Una corona cotonosa di schiuma bianca si trova sopra l’infuso trasparente e invia una spezia luppolata al naso. La bevuta iniziale rivela un corpo snello e una prima impressione promettente e aspra. Il malto costituisce una base stabile, il luppolo apporta note di erba appena falciata e fieno profumato oltre ad una leggera amarezza. Il piacere culmina in un finale che sa di noci tostate e luppolo erbaceo e amaro.",
              prices: [{ l: "Pinta 0.4", p: 6 }],
              img: "beers/warsteiner-herb.webp"
            },
            {
              id: "spina-franziskaner-kellerbier",
              name: "Franziskaner Kellerbier",
              sub: "Non filtrata · 5,2% · Germania · Franziskaner Bräu",
              style: "Non filtrata", abv: "5,2%", origin: "Germania", brewery: "Franziskaner Bräu",
              desc: "È naturalmente torbida, caratterizzata da un colore ambrato, da un gusto vellutato e corposo. Il termine “Kellerbier” proviene dal tedesco e significa letteralmente “birra della cantina”. Infatti, viene infustata e imbottigliata direttamente dalla cantina di stoccaggio, senza essere filtrata e mantenendo un basso contenuto di anidride carbonica. Franziskaner Kellerbier è una birra senza tempo grazie al metodo di produzione artigianale ed autentico. Lascia al palato una sensazione fresca ad alta digeribilità.",
              prices: [{ l: "Boccale 0.5", p: 6.5 }, { l: "Boccale 1.0", p: 13 }],
              img: "beers/franziskaner-kellerbier.webp"
            },
            {
              id: "spina-franziskaner-weissbier",
              name: "Franziskaner Weissbier",
              sub: "Weizen · 5,0% · Germania · Franziskaner Bräu",
              style: "Weizen", abv: "5,0%", origin: "Germania", brewery: "Franziskaner Bräu",
              desc: "Franziskaner Weissbier sviluppa nel bicchiere uno straordinario colore biondo con riflessi rosati. La schiuma è generosa, persistente e attraversata da una notevole effervescenza. Al naso risaltano aromi tipici di una buona weissbier, con note fruttate molto marcate che ricordano agrumi e banana accompagnate da aromi speziati di lievito e pepe. In bocca, la struttura gustativa è molto vicina a quella olfattiva, con sapori di frutta decisi e una netta predominanza di banana.",
              prices: [{ l: "WeizenBecker 0.5", p: 6.5 }, { l: "Boccale 1.0", p: 13 }],
              img: "beers/franziskaner-weissbier.webp"
            },
            {
              id: "spina-bulldog",
              name: "Bulldog Strong Ale",
              sub: "Strong Ale · 7,1% · Inghilterra · Courage Ltd.",
              style: "Strong Ale", abv: "7,1%", origin: "Inghilterra", brewery: "Courage Ltd.",
              desc: "Nata nel 1947 nella celebre birreria inglese Courage, Bulldog è la birra premium strong ale dalla grande forza alcolica che dona il massimo di sé quando viene degustata non troppo fredda: in questo modo si ossigena e dona intense sensazioni che possono affascinare anche il più esperto bevitore; nel bicchiere, rilascia gradualmente piacevoli aromi fra i quali sono facilmente riconoscibili il deciso luppolo a cui si avvolgono venature più dolci conferendole un’armonia che preannuncia gusto e potenza.",
              prices: [{ l: "Pinta 0.5", p: 6.5 }],
              img: "beers/bulldog.webp"
            },
            {
              id: "spina-delirium-tremens",
              name: "Delirium Tremens",
              sub: "Golden Strong Ale · 8,5% · Belgio · Brasserie Huyghe",
              style: "Golden Strong Ale", abv: "8,5%", origin: "Belgio", brewery: "Brasserie Huyghe",
              desc: "Una delle poche birre a potersi vantare di aver ricevuto la nomination per il concorso “Migliore birra del Mondo” e ad aver vinto una medaglia d’oro. Al palato offre delle punte acute di amarezza, presenta sfumature fruttate e di lievito. Aroma fantastico, profumo fruttato. Si conclude con un tono amaro e pepato stupefacente. Gli elefanti rosa dell’etichetta fanno riferimento alle allucinazioni che la mancanza di alcool talvolta provoca in certi soggetti durante deliri febbrili, chiamati appunto Delirium Tremens.",
              prices: [{ l: "Tulipano 0.5", p: 6.5 }],
              img: "beers/delirium-tremens.webp"
            },
            {
              id: "spina-hoegaarden",
              name: "Hoegaarden Blanche",
              sub: "Blanche · 4,9% · Belgio · Hoegaarden",
              style: "Blanche", abv: "4,9%", origin: "Belgio", brewery: "Hoegaarden",
              desc: "La Hoegaarden è la blanche più famosa al mondo. È fragrante e speziata, grazie all’aggiunta di buccia d’arancia amara e coriandolo come previsto dallo stile, ha un colore giallo paglierino sbiadito. Dotata di una buona carbonatura, la Hoegaarden Blanche ha una notevole schiuma bianca compatta, poco persistente, e rileva una torbidità tipica delle birre di frumento. Al naso sono presenti sentori agrumati e fruttati, oltre che i profumi della speziatura, che si percepiscono in bocca, insieme ad una dolcezza finale. La Hoegaarden Blanche è una birra fresca e dissetante.",
              prices: [{ l: "Pinta 0.5", p: 6.5 }],
              img: "beers/hoegaarden.webp"
            },
            {
              id: "spina-delirium-nocturnum",
              name: "Delirium Nocturnum",
              sub: "Brune Strong Ale · 8,5% · Belgio · Brasserie Huyghe",
              style: "Brune Strong Ale", abv: "8,5%", origin: "Belgio", brewery: "Brasserie Huyghe",
              desc: "Di colore marrone scuro con sfumature tendenti al rosso. Schiuma compatta color bianco, stabile e vaporosa. Aroma composto da caramello, caffè e cioccolato, sono presenti varie spezie del posto come liquirizia, coriandolo, rovere e scorza d’arancio. Al palato risulta molto morbida nonostante l’elevata gradazione alcolica, successivamente si farà notare una crescente amarezza. Gli elefanti rosa dell’etichetta fanno riferimento alle allucinazioni che la mancanza di alcool talvolta provoca in certi soggetti durante deliri febbrili.",
              prices: [{ l: "Tulipano 0.5", p: 6.5 }],
              img: "beers/delirium-nocturnum.webp"
            },
            {
              id: "spina-guinness",
              name: "Guinness",
              sub: "Stout · 4,2% · Irlanda · Arthur Guinness & Co",
              style: "Stout", abv: "4,2%", origin: "Irlanda", brewery: "Arthur Guinness & Co",
              desc: "Prodotta con malto di altissima qualità che, previa tostatura, conferisce il caratteristico colore scuro, tendente al nero. All’olfatto si presenta con note di caffè appena tostato. Il sapore è secco, deciso e intenso. Questa birra è considerata la stout numero uno al mondo. È caratterizzata da una schiuma densa, molto compatta e assolutamente persistente. Si chiama Arthur Guinness, lo scaltro dublinese che nel 1759 ha battezzato una delle birre più famose del pianeta: la Guinness.",
              prices: [{ l: "Pinta 0.5", p: 6.5 }],
              img: "beers/guinness.webp"
            }
          ]
        }
      ]
    },

    /* ================================================================
       2 · BIRRE IN BOTTIGLIA
       ================================================================ */
    {
      id: "bottiglie",
      title: "Birre in Bottiglia",
      short: "Bottiglie",
      subtitle: "Artigianali, d’abbazia, lambic e qualche sorpresa",
      icon: "bottle",
      groups: [
        {
          title: "Bottiglie & lattine",
          items: [
            {
              id: "bott-ambita",
              name: "Ambita",
              sub: "32 Via dei Birrai · Italia · Ale Italiana · 4.5%",
              style: "Ale Italiana", abv: "4.5%", origin: "Italia", brewery: "32 Via dei Birrai",
              desc: "“32 Via dei Birrai Ambita” è una birra artigianale chiara e di facile beva, prodotta con il 100% di ingredienti italiani e ispirata allo stile belga delle Belgian Blond Ale. Caratterizzata da un tenue colore giallo paglierino e una schiuma bianca compatta, presenta sentori erbacei, agrumati e mielosi, con un finale luppolato che la rende scorrevole e persistente.",
              prices: [{ l: "Bottiglia 0.50 l.", p: 8 }],
              img: "beers/32-ambita.webp"
            },
            {
              id: "bott-brauweisse",
              name: "Brauweisse",
              sub: "Ayinger · Germania · Weiss · 5.1%",
              style: "Weiss", abv: "5.1%", origin: "Germania", brewery: "Ayinger",
              desc: "Si presenta con un colore giallo paglierino opalescente; la schiuma è cremosa, bianca ed abbastanza persistente. Al naso si avvertono sentori di frumento, lievito ed un’inconfondibile fragranza di banana; più in sottofondo si percepiscono aromi agrumati, speziati, note erbacee e di vaniglia. In bocca risulta piena e rotonda rispecchiando le note olfattive e con un sapore tipico delle birre di frumento ed un amaro appena percettibile. Finale secco ed asciutto.",
              prices: [{ l: "Bottiglia 0.50 l.", p: 6 }],
              img: "beers/ayinger.webp"
            },
            {
              id: "bott-jahrhundertbier",
              name: "Jahrhundertbier",
              sub: "Ayinger · Germania · Export Lager · 5.5%",
              style: "Export Lager", abv: "5.5%", origin: "Germania", brewery: "Ayinger",
              desc: "È una birra dal colore giallo dorato, con un leggero sentore di lievito floreale. Dal sapore aromatico e corposo al primo sorso, in seguito diventa lieve e morbida con una fine persistenza. Svanisce con un amaro buono ed equilibrato. Birra riccamente maltata, mette in rilievo la qualità naturale e genuina degli orzi utilizzati.",
              prices: [{ l: "Bottiglia 0.50 l.", p: 6 }],
              img: "beers/ayinger.webp"
            },
            {
              id: "bott-jever",
              name: "Jever Pilsener",
              sub: "Jever · Germania · Pils · 4.9%",
              style: "Pils", abv: "4.9%", origin: "Germania", brewery: "Jever",
              desc: "Bionda giallo paglierino con riflessi dorati, limpida con schiuma bianca e compatta. Aroma fresco, secco con amaro persistente. Nasce nel 1848, in quell’epoca era uno dei tanti birrifici della zona, ma da subito questa birra aveva qualcosa di speciale. Jever Pilsener rappresenta l’eccellenza nel mondo delle pils tanto che il “gusto Jever” è il punto di riferimento tra le più vendute in Germania.",
              prices: [{ l: "Lattina 0.50 l.", p: 6 }],
              img: "beers/jever.webp"
            },
            {
              id: "bott-rye-river",
              name: "Irish Lager Senza Glutine",
              sub: "Rye River · Irlanda · Gluten Free · 5.0%",
              style: "Gluten Free Lager", abv: "5.0%", origin: "Irlanda", brewery: "Rye River",
              desc: "Questa lager senza glutine, pulita e frizzante, presenta un carattere luppolato pronunciato e un aroma di torta derivante dalle varietà di luppolo Herkules, Hersbrucker e Traditional. Il suo colore brillante è indice di un sapore ricco e intenso, una vera gioia per il palato.",
              prices: [{ l: "Bottiglia 0.50 l.", p: 6.5 }],
              img: "beers/rye-river.webp",
              tags: ["senza-glutine"]
            },
            {
              id: "bott-leffe-rouge",
              name: "Leffe Rouge",
              sub: "Leffe · Belgio · Belgian Ale · 6.6%",
              style: "Belgian Ale", abv: "6.6%", origin: "Belgio", brewery: "Leffe",
              desc: "Leffe non è una semplice birra, ma rappresenta un momento di gratificazione personale e relax da condividere con le persone più care. Leffe Rouge è un’autentica birra rossa d’abbazia dall’aroma intenso di malto con note di caffè tostato e di agrumi canditi. Il gusto rivela un corpo morbido, in cui il malto tostato lascia il posto ad un retrogusto erbaceo. Il finale, infine, lungo e persistente, lascia un senso di freschezza.",
              prices: [{ l: "Bottiglia 0.33 l.", p: 6 }],
              img: "beers/leffe-rouge.webp"
            },
            {
              id: "bott-leffe-blonde",
              name: "Leffe Blonde",
              sub: "Leffe · Belgio · Golden Ale · 6.6%",
              style: "Golden Ale", abv: "6.6%", origin: "Belgio", brewery: "Leffe",
              desc: "Dal colore ramato con schiuma bianca Leffe Blonde è una birra belga dal gradevole aroma di malto, arricchito da sentori fruttati, speziati e di cereale. Al palato tornano i sentori dell’olfatto, si apre dolce di malto e caramello, con sentori fruttati e speziati che lasciano spazio ad un finale delicatamente luppolato.",
              prices: [{ l: "Bottiglia 0.33 l.", p: 6 }],
              img: "beers/leffe-blonde.webp"
            },
            {
              id: "bott-orval",
              name: "Orval",
              sub: "Brasserie d’Orval · Belgio · Trappist Ale · 6.2%",
              style: "Trappist Ale", abv: "6.2%", origin: "Belgio", brewery: "Brasserie d’Orval",
              desc: "La Orval è una birra Trappista di un bel colore dorato intenso, brassata nell’Abbazia di Orval in Belgio. È una birra dall’aroma luppolato molto intenso se consumata giovane, acquista nel tempo una lieve acidità e delle note molto interessanti di Sherry e di torta di ciliegie. Il carattere complesso della Orval proviene da tre fermentazioni separate e dal luppolo locale che viene utilizzato per produrla. Il pesce dall’anello d’oro è rimasto l’emblema del birrificio della fontana Matilde in cui oggi brillano ancora le rovine dell’abbazia medievale fornendo sempre acqua pura dalla sua sorgente.",
              prices: [{ l: "Bottiglia 0.33 l.", p: 6.5 }],
              img: "beers/orval.webp"
            },
            {
              id: "bott-geuze-boon",
              name: "Geuze Boon",
              sub: "Boon · Belgio · Geuze · 7.0%",
              style: "Geuze", abv: "7.0%", origin: "Belgio", brewery: "Boon",
              desc: "Nasce da una miscela di Lambic invecchiati circa 18 mesi, rifermentata in bottiglia. Di colore dorato velato, al naso gli aromi sono pungenti e muffati, con note che rimandano al formaggio, il lievito, note vinose e di sottobosco (terra e funghi). Oleosa e piacevolmente secca nel finale.",
              prices: [{ l: "Bottiglia 0.25 l.", p: 7 }],
              img: "beers/boon.webp"
            },
            {
              id: "bott-psycho-ipa",
              name: "Psycho IPA",
              sub: "Buttiga · Italia · Double IPA · 7.6%",
              style: "Double IPA", abv: "7.6%", origin: "Italia", brewery: "Buttiga",
              desc: "La Birra Artigianale Psycho IPA La Buttiga lattina 33 cl è una Double IPA dai sapori intensi e intriganti, arricchita da note di frutti tropicali, agrumi e frutto della passione. L’alta concentrazione di IBU è il risultato di una sapiente combinazione di luppoli oceanici e americani, perfettamente bilanciati.",
              prices: [{ l: "Lattina 0.33 l.", p: 6.5 }],
              img: "beers/psycho.webp"
            },
            {
              id: "bott-radler-natur",
              name: "Radler Natur",
              sub: "Mönchshof · Germania · Radler · 2.5%",
              style: "Radler", abv: "2.5%", origin: "Germania", brewery: "Mönchshof",
              desc: "Mönchshof Natur Radler ti fa sperimentare il gusto puro e incontaminato della natura, rinunciando completamente a dolcificanti e conservanti artificiali. L’aroma frizzante e fruttato e il succo di limone naturale rendono Natur Radler una bevanda piacevolmente rinfrescante e leggera, non solo in estate. Stappala facendo “plop”!",
              prices: [{ l: "Bottiglia 0.50 l.", p: 6.5 }],
              img: "beers/radler.webp"
            },
            {
              id: "bott-rorschach",
              name: "Rorschach",
              sub: "Dada · Italia (Correggio RE) · Imperial Stout · 8.5%",
              style: "Imperial Stout", abv: "8.5%", origin: "Italia (Correggio RE)", brewery: "Dada",
              desc: "Nera, impenetrabile schiuma color cappuccino, profumi molto intensi che ricordano il caffè, cioccolato, caramello, in bocca è calda, appagante. Il corpo è spesso e setoso, il sapore è forte e persistente ricorda un espresso, con una nota di cacao, nocciola tostata e un accenno di caramello, nel finale emerge un amaro netto e intenso che impedisce alla birra di diventare stancante.",
              prices: [{ l: "Bottiglia 0.50 l.", p: 8.5 }],
              img: "beers/rorschach.webp"
            },
            {
              id: "bott-tennents-super",
              name: "Tennent’s Super",
              sub: "Wellpark Brewery · Scozia · Strong Lager · 9.0%",
              style: "Strong Lager", abv: "9.0%", origin: "Scozia", brewery: "Wellpark Brewery",
              desc: "Tennent’s è una birra scozzese, nata nel 1885, che viene prodotta con malto d’orzo 100% scozzese, l’acqua purissima del Loch Katrine di Glasgow e due diverse tipologie di malto. Una volta miscelate e fermentate, vengono cotte nei forni. Si aggiunge, infine, il luppolo in quantità perfetta a garantire il giusto bilanciamento dolce-amaro che caratterizza il gusto unico della Tennent’s. Il tutto viene fatto bollire e poi finalmente viene aggiunto il lievito che trasforma lo zucchero in alcol.",
              prices: [{ l: "Bottiglia 0.33 l.", p: 6 }],
              img: "beers/tennents.webp"
            },
            {
              id: "bott-xx-bitter",
              name: "XX Bitter",
              sub: "De Ranke · Belgio · Belgian Ale · 6.0%",
              style: "Belgian Ale", abv: "6.0%", origin: "Belgio", brewery: "De Ranke",
              desc: "La XX Bitter è famosa per essere la più luppolata in Belgio. Birra bionda, leggera di gradazione, ha come sapore predominante l’amaro del luppolo. Anche il suo profumo è erbaceo, quasi floreale. Nonostante la carica amara del luppolo la XX Bitter è morbida al palato, perché si bilancia con le note maltate e spezie. Questa speciale birra belga rivela tutta la sua persistenza amara nel finale, amaro, secco e deciso.",
              prices: [{ l: "Bottiglia 0.33 l.", p: 6 }],
              img: "beers/xx-bitter.webp"
            },
            {
              id: "bott-warsteiner-fresh",
              name: "Warsteiner Fresh 0,0",
              sub: "Warsteiner · Germania · Birra Analcolica · 0.0%",
              style: "Birra Analcolica", abv: "0.0%", origin: "Germania", brewery: "Warsteiner",
              desc: "Brassata secondo la Legge di Purezza, l’alcool di questa pils viene tolto dopo la completa maturazione secondo un particolare metodo. Con Warsteiner Premium Fresh 0.0, gli amanti delle birre pils possono consapevolmente assaporare l’aroma di una birra dal gusto pieno che viene mantenuto anche senza la gradazione alcolica.",
              prices: [{ l: "Bottiglia 0.33 l.", p: 6 }],
              img: "beers/warsteiner-fresh.webp",
              tags: ["analcolico"]
            }
          ]
        }
      ]
    },

    /* ================================================================
       3 · CUCINA & PUPO
       ================================================================ */
    {
      id: "cucina",
      title: "Cucina",
      short: "Cucina",
      subtitle: "Primi, secondi alla brace, taglieri, insalate e il menù Pupo",
      icon: "grill",
      notes: ["service", "allergy", "frozen"],
      groups: [
        {
          title: "Primi & Secondi",
          items: [
            { id: "cuc-penne", name: "Penne all’ubriaca", desc: "con parmigiano Reggiano", prices: [{ p: 12 }] },
            { id: "cuc-grigliata", name: "Grigliata Mista", desc: "grigliata di carne con bistecca di manzo, salsiccia alla “Warsteiner”, würstel e coppa ed nimel, patate al forno e focaccia fatà in cà", prices: [{ p: 17.5 }] },
            { id: "cuc-spiedoni", name: "Spiedoni", desc: "coppia di spiedoni misti di carne (pollo e maiale) da 350 gr.(℮), con cipollotto al bacon, maionese all’erba cipollina e patate rustiche con buccia", prices: [{ p: 19.5 }] },
            { id: "cuc-stinco", name: "Stinco di Porco", desc: "stinco ed nimel alla “Spqr” da 800 gr.(℮) con crauti, patate al forno, brezel e classic burger sauce", prices: [{ p: 17.5 }] },
            { id: "cuc-tagliata-granata", name: "Tagliata Granata", desc: "tagliata di VACCA ROSSA REGGIANA da 250 gr.(℮) con cipolla caramellata, patate al forno e focaccia fatà in cà", prices: [{ p: 25 }], tags: ["vacca-rossa"] },
            { id: "cuc-tagliata-polaster", name: "Tagliata ed Polaster", desc: "tagliata di pollo da 250 gr.(℮), con verdure alla griglia e carciofo alla romana", prices: [{ p: 16.5 }] },
            { id: "cuc-vaca-rosa", name: "Vãca Rósa", desc: "hamburger fresco da 250 gr. di VACCA ROSSA REGGIANA, con cipolla caramellata e patate rustiche con buccia", prices: [{ p: 15.5 }], tags: ["vacca-rossa"] },
            { id: "cuc-nimalata", name: "Nimalata Oktoberfest", badge: "x2 esseri umani", desc: "stinco, coppa e würstel ed nimel, speck a fette, kartoffelsalat, maionese all’erba cipollina, patate rustiche con buccia e brezel", prices: [{ p: 37 }] },
            { id: "cuc-verdure", name: "Piatto con Verdure alla Griglia", desc: "a parte", prices: [{ p: 6 }] },
            { id: "cuc-patate-forno", name: "Piatto con Patate al Forno", desc: "a parte", prices: [{ p: 5.5 }] }
          ]
        },
        {
          title: "Taglieri",
          items: [
            { id: "tag-emiliano", name: "Emiliano", desc: "con prosciutto crudo di Parma, salame felino, mortazza e crostini abbrustoliti", prices: [{ p: 15 }] },
            { id: "tag-poker", name: "Poker", desc: "con prosciutto crudo di Parma, patate al forno, carciofo alla romana, pecorino e tortillas", prices: [{ p: 15 }] },
            { id: "tag-semplice", name: "Semplice", desc: "con prosciutto crudo di Parma, scaglie di parmigiano Reggiano e crostini abbrustoliti", prices: [{ p: 10.5 }] }
          ]
        },
        {
          title: "Insalate",
          items: [
            { id: "ins-apollo", name: "Apollo", desc: "insalata mista, rucola, pomodorini, sfilacci di pollo grigliato e philadelphia", prices: [{ p: 12.5 }] },
            { id: "ins-bufala", name: "Bufala", desc: "insalata mista, pomodorini, rucola, radicchio rosso, mozzarella di bufala e tonno", prices: [{ p: 12.5 }] },
            { id: "ins-piccola", name: "Insalatina Piccola Classica", desc: "insalata mista, pomodori", prices: [{ p: 6 }] }
          ]
        },
        {
          title: "Pupo",
          intro: "Riservato ai bambini, grazie!",
          items: [
            { id: "pupo-burger", name: "Pupo Burger", desc: "pane artigianale con hamburger da 100 gr., ketchup, insalata e patatine fritte", badge: "con sorpresa!!", prices: [{ p: 8 }], tags: ["bimbi"] },
            { id: "pupo-cotoletta", name: "Pupo Cotoletta", desc: "cotoletta di pollo da 100 gr., maionese, insalata e patatine fritte", badge: "con sorpresa!!", prices: [{ p: 8 }], tags: ["bimbi"] }
          ]
        }
      ]
    },

    /* ================================================================
       4 · BURGER · PANINI · PIZZA
       ================================================================ */
    {
      id: "burger",
      title: "Burger & Pizza",
      short: "Burger",
      subtitle: "Burger con patatine, limited edition, panini & dintorni e pizza al tegamino",
      icon: "burger",
      notes: ["service", "allergy", "frozen"],
      groups: [
        {
          title: "Burger con patatine",
          items: [
            { id: "bur-bart", name: "Bart Simpson", desc: "burger bun con burger da 150 gr., scamorza affumicata, bacon, insalata e salsa bbq", prices: [{ p: 13 }] },
            { id: "bur-homer", name: "Homer Simpson", desc: "burger bun con burger da 150 gr., pomodoro, maionese, insalata e ketchup", prices: [{ p: 13 }] },
            { id: "bur-marge", name: "Marge Simpson", desc: "burger bun con cotoletta di pollo da 150 gr., maionese, pomodoro e insalata", prices: [{ p: 13 }] },
            { id: "bur-lisa", name: "Lisa Simpson", desc: "burger bun con burger green heroes da 150 gr., maionese vegan, zucchine e hummus di ceci", prices: [{ p: 13.5 }], tags: ["veg"] }
          ]
        },
        {
          title: "Burger Limited Edition",
          items: [
            { id: "bur-pork", name: "Pork Burger", desc: "pane artigianale del “Forno Davoli - RE”, con pulled pork a “km zero”, pomodoro a fette, scamorza affumicata, insalata, bacon croccante e maionese all’erba cipollina", prices: [{ p: 14.5 }] },
            { id: "bur-razza-reggiana", name: "Razza Reggiana Burger", desc: "pane artigianale del “Forno Davoli - RE”, con burger di VACCA ROSSA REGGIANA da 250 gr., crema di parmigiano Reggiano, rucola e pomodoro a fette", prices: [{ p: 16.5 }], tags: ["vacca-rossa"] },
            { id: "bur-smash", name: "Smash Burger", desc: "pane artigianale del “Forno Davoli - RE”, con macinato di manzo da 200 gr., scamorza affumicata, cipolla alla griglia, insalata, bacon croccante e salsa cheddar", prices: [{ p: 14.5 }] }
          ],
          footnotes: ["Possibilità del doppio hamburger + € 3.50"]
        },
        {
          title: "Panini & Dintorni",
          items: [
            { id: "pan-charlie", name: "Charlie Brown", desc: "ciabatta artigianale dal “Forno Davoli - RE” con salsiccia, maionese, pomodoro a fette, insalata, bacon e scamorza affumicata", prices: [{ p: 10.5 }] },
            { id: "pan-franklin", name: "Franklin", desc: "ciabatta artigianale dal “Forno Davoli - RE” con mozzarella di bufala, pomodoro a fette, prosciutto crudo di Parma e insalata", prices: [{ p: 10.5 }] },
            { id: "pan-hotdog", name: "Hot Dog", desc: "würstel, ketchup e maionese", prices: [{ p: 6 }] },
            { id: "pan-kepub", name: "Ke-Pub!", desc: "tortillas avvolta con sfilacci di pollo grigliato, bacon, insalata, pomodoro a fette, maionese e patate fritte", prices: [{ p: 12 }] },
            { id: "pan-peggy", name: "Peggy", desc: "pane brezel con speck, scamorza affumicata, funghi trifolati e classic burger sauce", prices: [{ p: 8.5 }] },
            { id: "pan-snoopy", name: "Snoopy", desc: "ciabatta artigianale dal “Forno Davoli - RE” con salsiccia, bacon, salsa ass burner, pecorino e cipolla caramellata", prices: [{ p: 10.5 }] },
            { id: "pan-violet", name: "Violet", desc: "piadina con prosciutto crudo di Parma, funghi trifolati, mozzarella e rucola", prices: [{ p: 8 }] },
            { id: "pan-woodstock", name: "Woodstock", desc: "piadina con prosciutto cotto, mozzarella, insalata, pomodoro a fette e maionese", prices: [{ p: 8 }] }
          ]
        },
        {
          title: "Pizza al Tegamino",
          items: [
            { id: "piz-margherita", name: "Margherita", desc: "farcita con polpa di pomodoro e mozzarella 100% fiordilatte", prices: [{ p: 7 }], tags: ["veg"] },
            { id: "piz-cotto-funghi", name: "Cotto e Funghi", desc: "farcita con polpa di pomodoro, mozzarella 100% fiordilatte, prosciutto cotto e funghi", prices: [{ p: 8 }] },
            { id: "piz-crudo", name: "Crudo", desc: "farcita con polpa di pomodoro, mozzarella 100% fiordilatte e prosciutto crudo di Parma", prices: [{ p: 8 }] }
          ]
        }
      ]
    },

    /* ================================================================
       5 · FRITTI & DOLCI
       ================================================================ */
    {
      id: "fritti",
      title: "Fritti & Dolci",
      short: "Fritti · Dolci",
      subtitle: "Spuntini da condividere, dolci della casa e il gelato per i cani",
      icon: "fries",
      notes: ["service", "allergy", "frozen"],
      groups: [
        {
          title: "Fritti & Spuntini",
          items: [
            { id: "fri-alette", name: "Alette di pollo in scodella", prices: [{ p: 7 }] },
            { id: "fri-anelli", name: "Anelli di cipolla", prices: [{ p: 5 }], tags: ["veg"] },
            { id: "fri-brezel", name: "Brezel", prices: [{ p: 3 }], tags: ["veg"] },
            { id: "fri-chips", name: "Chips in cestino", desc: "patatine secche", prices: [{ p: 2.5 }], tags: ["veg"] },
            { id: "fri-mozzarelle", name: "Mozzarelle impanate", prices: [{ p: 5 }], tags: ["veg"] },
            { id: "fri-oktobermix", name: "Oktobermix", desc: "olive, stick di pollo, anelli di cipolla e patatine fritte", prices: [{ p: 8.5 }] },
            { id: "fri-olive", name: "Olive all’ascolana", prices: [{ p: 5 }] },
            { id: "fri-patate", name: "Patate fritte", prices: [{ p: 5 }], tags: ["veg"] },
            { id: "fri-scarpasoun", name: "Scarpasoun frèt", desc: "erbazzone fritto", prices: [{ p: 7.5 }] },
            { id: "fri-stick", name: "Stick di pollo croccanti", desc: "leggermente piccanti", prices: [{ p: 7 }] }
          ]
        },
        {
          title: "Dolci",
          items: [
            { id: "dol-birramisu", name: "Birramisù alla “Guinness”", prices: [{ p: 6.5 }] },
            { id: "dol-coppa-gelato", name: "Coppa di gelato alla crema", desc: "con panna montata", prices: [{ p: 6 }] },
            { id: "dol-mascarpone", name: "Crema di mascarpone", desc: "con scaglie di cioccolato", prices: [{ p: 6.5 }] },
            { id: "dol-crepes", name: "Crepes alla nutella", desc: "avvolta, con zucchero a velo e panna montata", prices: [{ p: 6.5 }] },
            { id: "dol-settimana", name: "Dolce della settimana", desc: "sempre diverso, sempre fresco e sempre buono!", prices: [{ p: 6.5 }] },
            { id: "dol-sorbetto", name: "Sorbetto al limone", prices: [{ p: 5 }] },
            { id: "dol-waffle", name: "Waffle caldo", desc: "con gelato alla crema, nutella e panna montata", prices: [{ p: 7 }] }
          ]
        },
        {
          title: "Icedog",
          intro: "ungelatodacani!!",
          items: [
            { id: "ice-icedog", name: "Icedog", desc: "gelato artigianale creato specificamente per i cani, in coppetta da 60 gr.", prices: [{ p: 4 }], tags: ["cani"] }
          ]
        }
      ]
    },

    /* ================================================================
       6 · BAR
       ================================================================ */
    {
      id: "bar",
      title: "Bar",
      short: "Bar",
      subtitle: "Bevande, caffetteria, amari & liquori",
      icon: "cup",
      groups: [
        {
          title: "Bevande",
          items: [
            { id: "bev-acqua", name: "Acqua Surgiva", desc: "in vetro 0.50 cl. · liscia o con bolle", prices: [{ l: "Liscia", p: 2.5 }, { l: "Con bolle", p: 2.5 }] },
            { id: "bev-brillante", name: "Acqua Brillante", desc: "in bottiglietta", prices: [{ p: 3.5 }] },
            { id: "bev-cedrata", name: "Cedrata Tassoni", desc: "in bottiglietta", prices: [{ p: 4 }] },
            { id: "bev-chino", name: "Chinò San Pellegrino", desc: "in lattina", prices: [{ p: 4 }] },
            { id: "bev-cocacola", name: "Coca Cola alla spina", desc: "+ ghiaccio", prices: [{ l: "Piccola 0.30 cl.", p: 3.5 }, { l: "Media 0.50 cl.", p: 5 }] },
            { id: "bev-cocazero", name: "Coca Zero · Fanta · Sprite", desc: "in bottiglietta", prices: [{ l: "Coca Zero", p: 4 }, { l: "Fanta", p: 4 }, { l: "Sprite", p: 4 }] },
            { id: "bev-crodino", name: "Crodino", desc: "in bottiglietta · giallo o rosso", prices: [{ l: "Giallo", p: 3.5 }, { l: "Rosso", p: 3.5 }] },
            { id: "bev-estathe", name: "Estathè", desc: "in lattina · limone o pesca", prices: [{ l: "Limone", p: 4 }, { l: "Pesca", p: 4 }] },
            { id: "bev-lemonsoda", name: "Lemon Soda", desc: "in bottiglietta", prices: [{ p: 3.5 }] },
            { id: "bev-redbull", name: "Redbull", desc: "in lattina", prices: [{ p: 5 }] },
            { id: "bev-succhi", name: "Succhi di frutta", desc: "in bicchiere 0.30 cl.", prices: [{ l: "Ananas", p: 3.5 }, { l: "Pesca", p: 3.5 }, { l: "Pompelmo", p: 3.5 }, { l: "Arancia", p: 3.5 }] }
          ]
        },
        {
          title: "Caffè",
          items: [
            { id: "caf-espresso", name: "Caffè", desc: "espresso · corretto · deca · macchiato · orzo", prices: [{ l: "Espresso", p: 2 }, { l: "Corretto", p: 2 }, { l: "Deca", p: 2 }, { l: "Macchiato", p: 2 }, { l: "Orzo", p: 2 }] },
            { id: "caf-doppio", name: "Caffè doppio", prices: [{ p: 3.5 }] },
            { id: "caf-shakerato", name: "Caffè shakerato", prices: [{ p: 4.5 }] },
            { id: "caf-irish", name: "Irish coffee", prices: [{ p: 6 }] }
          ]
        },
        {
          title: "Amari & Liquori",
          items: [
            { id: "ama-capo", name: "Amaro del Capo", desc: "l’Italiano più amato", prices: [{ p: 4 }] },
            { id: "ama-baileys", name: "Baileys", desc: "crema di whiskey", prices: [{ p: 4 }] },
            { id: "ama-brancamenta", name: "Branca Menta", desc: "liquore amaro d’erbe", prices: [{ p: 4 }] },
            { id: "ama-braulio", name: "Braulio", desc: "liquore alpino", prices: [{ p: 4 }] },
            { id: "ama-fernet", name: "Fernet Branca", desc: "liquore alle erbe", prices: [{ p: 4 }] },
            { id: "ama-kaciuto", name: "Kaciuto", desc: "l’amaro sempre piaciuto", prices: [{ p: 4 }] },
            { id: "ama-jager", name: "Jägermeister", desc: "liquore alle erbe tedesco", prices: [{ p: 4 }] },
            { id: "ama-jefferson", name: "Jefferson", desc: "amaro importante", prices: [{ p: 4.5 }] },
            { id: "ama-limoncino", name: "Limoncino", desc: "il gusto del limone", prices: [{ p: 4 }] },
            { id: "ama-martini", name: "Martini", desc: "bianco o rosso", prices: [{ l: "Bianco", p: 4 }, { l: "Rosso", p: 4 }] },
            { id: "ama-montenegro", name: "Montenegro", desc: "sapore vero", prices: [{ p: 4 }] },
            { id: "ama-nocino", name: "Nocino", desc: "il liquore alle noci della tradizione Italiana", prices: [{ p: 4 }] },
            { id: "ama-sambuca", name: "Sambuca Molinari", desc: "il classico che non passa mai di moda", prices: [{ p: 4 }] },
            { id: "ama-unicum", name: "Unicum", desc: "amaro alle erbe", prices: [{ p: 4 }] }
          ]
        }
      ]
    },

    /* ================================================================
       7 · CANTINA
       ================================================================ */
    {
      id: "cantina",
      title: "Cantina",
      short: "Cantina",
      subtitle: "Vini, grappe, rhum e whisky",
      icon: "wine",
      groups: [
        {
          title: "Vini · Bianco",
          items: [
            { id: "vin-frizzantino", name: "Bianco Frizzantino alla spina", prices: [{ l: "Quartino", p: 3.5 }, { l: "Mezzo", p: 5 }, { l: "Litro", p: 9.5 }] },
            { id: "vin-prosecco", name: "Prosecco Blanc de Blancs", sub: "Contarini · 11%", prices: [{ l: "Calice", p: 5.5 }, { l: "0.75 cl.", p: 18 }] },
            { id: "vin-chardonnay", name: "Chardonnay", sub: "Bottega Vinai · 13%", prices: [{ l: "Calice", p: 6 }, { l: "0.75 cl.", p: 22 }] },
            { id: "vin-trento", name: "Trento DOC Millesimato Metodo Classico Brut", sub: "Altemasi · 12.5%", prices: [{ l: "0.75 cl.", p: 35 }] }
          ]
        },
        {
          title: "Vini · Rosso",
          items: [
            { id: "vin-morellino", name: "Morellino di Scansano", sub: "Roggiano · 14%", prices: [{ l: "Calice", p: 6 }, { l: "0.75 cl.", p: 21 }] },
            { id: "vin-lambrusco-tirelli", name: "Lambrusco Emilia “Testa Quedra”", sub: "Tirelli · 10.5%", prices: [{ l: "0.75 cl.", p: 12 }] },
            { id: "vin-lambrusco-puianello", name: "Lambrusco Prima Bolla", sub: "Puianello · 11%", prices: [{ l: "0.75 cl.", p: 11 }] },
            { id: "vin-valpolicella", name: "Valpolicella Ripasso Superiore", sub: "Torre d’Orti · 14,5%", prices: [{ l: "Calice", p: 7 }, { l: "0.75 cl.", p: 32 }] }
          ]
        },
        {
          title: "Grappe",
          items: [
            { id: "gra-24carati", name: "24 Carati Oro", badge: "barricata", sub: "dist. Poli · 40%", prices: [{ p: 4.5 }] },
            { id: "gra-podipoli", name: "Po’ di Poli", badge: "morbida", sub: "dist. Poli · 40%", prices: [{ p: 4.5 }] },
            { id: "gra-sarpa", name: "Sarpa di Poli", badge: "secca", sub: "dist. Poli · 40%", prices: [{ p: 4.5 }] },
            { id: "gra-storica", name: "Storica Nera", badge: "alta gradazione", sub: "dist. Domenis 1898 · 50%", prices: [{ p: 5 }] }
          ]
        },
        {
          title: "Rhum",
          items: [
            { id: "rum-diplomatico", name: "Diplomatico", desc: "mantuano", sub: "40% · Trinidad & Tobago", prices: [{ p: 6.5 }] },
            { id: "rum-donpapa", name: "Don Papa", desc: "touch of vanilla", sub: "40% · Filippine", prices: [{ p: 7 }] },
            { id: "rum-kraken", name: "Kraken", desc: "black spiced", sub: "40% · Caraibi", prices: [{ p: 5 }] },
            { id: "rum-millonario", name: "Millonario", desc: "riserva especial 15 anos", sub: "40% · Perù", prices: [{ p: 8 }] },
            { id: "rum-zacapa", name: "Zacapa Centenario", desc: "23 anni", sub: "40% · Guatemala", prices: [{ p: 8 }] }
          ]
        },
        {
          title: "Whisky",
          items: [
            { id: "whi-ardbeg", name: "Ardbeg", desc: "guaranteed TEN years old", sub: "46% · Scozia", prices: [{ p: 8 }] },
            { id: "whi-caolila", name: "Caol Ila", desc: "12 anni", sub: "43% · Scozia", prices: [{ p: 8 }] },
            { id: "whi-glenfiddich", name: "Glenfiddich", desc: "12 anni · single malt scotch whisky", sub: "40% · Scozia", prices: [{ p: 7 }] },
            { id: "whi-jack", name: "Jack Daniel’s", desc: "Old n° 7", sub: "40% · USA", prices: [{ p: 4.5 }] },
            { id: "whi-jameson", name: "Jameson", sub: "40% · Irlanda", prices: [{ p: 5 }] },
            { id: "whi-makers", name: "Maker’s Mark", desc: "straight bourbon", sub: "45% · USA", prices: [{ p: 6.5 }] },
            { id: "whi-laphroaig", name: "Laphroaig", desc: "10 anni", sub: "40% · Scozia", prices: [{ p: 8 }] },
            { id: "whi-macallan", name: "Macallan", desc: "12 anni double cask", sub: "40% · Scozia", prices: [{ p: 8 }] },
            { id: "whi-nikka", name: "Nikka Coffey Malt Whisky", sub: "45% · Giappone", prices: [{ p: 10.5 }] },
            { id: "whi-talisker", name: "Talisker Skye", desc: "single malt", sub: "45,8% · Scozia", prices: [{ p: 6.5 }] }
          ]
        }
      ]
    },

    /* ================================================================
       8 · AMERICAN BAR
       ================================================================ */
    {
      id: "american-bar",
      title: "American Bar",
      short: "Cocktails",
      subtitle: "Analcolici, gin tonic e cocktails",
      icon: "cocktail",
      notes: ["allergy"],
      groups: [
        {
          title: "Analcolici",
          items: [
            { id: "ana-cedrata", name: "Cedrata Più", desc: "cedrata, succo pesca, succo arancio e succo ananas", prices: [{ p: 7 }], tags: ["analcolico"] },
            { id: "ana-fragola", name: "Fragola Dream", desc: "succo pesca, succo arancia, succo ananas e polpa di fragola", prices: [{ p: 7 }], tags: ["analcolico"] },
            { id: "ana-pompelmo", name: "Pompelmo Zen", desc: "succo ananas, succo pompelmo, succo di limone e polpa di cocco", prices: [{ p: 7 }], tags: ["analcolico"] },
            { id: "ana-royrogers", name: "Roy Rogers", desc: "coca cola e polpa di granatina", prices: [{ p: 7 }], tags: ["analcolico"] },
            { id: "ana-spritz", name: "Spritz No Alcool", desc: "crodino rosso, succo arancia, completato con tonica", prices: [{ p: 7.5 }], tags: ["analcolico"] },
            { id: "ana-virgin-colada", name: "Virgin Colada", desc: "succo ananas, polpa di cocco e tonica", prices: [{ p: 7.5 }], tags: ["analcolico"] },
            { id: "ana-zerozero", name: "Zero.Zero Tonic", desc: "gin Tanqueray 0.0 (analcolico), con Acqua Brillante Tonica Italiana a parte", prices: [{ p: 8 }], tags: ["analcolico"] }
          ]
        },
        {
          title: "Gin Tonic",
          intro: "Serviti con Acqua Brillante Tonica Italiana a parte.",
          items: [
            { id: "gin-bombay", name: "Bombay Tonic", desc: "gin Bombay (Inghilterra) con Acqua Brillante Tonica Italiana a parte", prices: [{ p: 10 }] },
            { id: "gin-gino", name: "Gino Tonic", desc: "gin Big Gino (Italia) con Acqua Brillante Tonica Italiana a parte", prices: [{ p: 10 }] },
            { id: "gin-hendricks", name: "Hendrick’s Tonic", desc: "gin Hendrick’s (Scozia) con Acqua Brillante Tonica Italiana a parte", prices: [{ p: 10 }] },
            { id: "gin-mare", name: "Mare Tonic", desc: "gin Mare (Spagna) con Acqua Brillante Tonica Italiana a parte", prices: [{ p: 10 }] },
            { id: "gin-pompelmo", name: "Pompelmo Rosa Tonic", desc: "gin Pompelmo Rosa (Italia) con Acqua Brillante Tonica Italiana a parte", prices: [{ p: 10 }] }
          ]
        },
        {
          title: "Cocktails",
          items: [
            { id: "coc-americano", name: "Americano", desc: "campari, martini rosso e soda", prices: [{ p: 8 }] },
            { id: "coc-caipiroska", name: "Caipiroska", desc: "vodka liscia, polpa di fragola, lime e zucchero di canna pestato", prices: [{ p: 8 }] },
            { id: "coc-cocarum", name: "Coca e Rum", desc: "coca cola e rum", prices: [{ p: 8 }] },
            { id: "coc-ginlemon", name: "Gin Lemon", desc: "lemon soda e gin", prices: [{ p: 8 }] },
            { id: "coc-gintonic", name: "Gin Tonic", desc: "tonica e gin", prices: [{ p: 8 }] },
            { id: "coc-jagerbomb", name: "Jägerbomb", desc: "redbull e jägermeister", prices: [{ p: 8 }] },
            { id: "coc-longisland", name: "Long Island", desc: "vodka liscia, triple sec, gin, rum bianco e coca cola", prices: [{ p: 8 }] },
            { id: "coc-negroni", name: "Negroni", desc: "gin, campari e martini rosso", prices: [{ p: 8 }] },
            { id: "coc-sbagliato", name: "Negroni Sbagliato", desc: "campari, martini rosso e prosecco", prices: [{ p: 8 }] },
            { id: "coc-peschito", name: "Peschito", desc: "vodka alla pesca e lemon soda", prices: [{ p: 8 }] },
            { id: "coc-pinacolada", name: "Pina Colada", desc: "rum bianco, succo d’ananas e polpa di cocco", prices: [{ p: 8 }] },
            { id: "coc-sarti", name: "Sarti Spritz", desc: "sarti, prosecco e soda", prices: [{ p: 8 }] },
            { id: "coc-sexonthebeach", name: "Sex on the Beach", desc: "vodka liscia, vodka alla pesca, succo d’arancia e polpa di melograno", prices: [{ p: 8 }] },
            { id: "coc-spritz", name: "Spritz", desc: "aperol, prosecco e soda", prices: [{ p: 8 }] },
            { id: "coc-tequila-sunrise", name: "Tequila Sunrise", desc: "tequila, succo d’arancia, triple sec e polpa di melograno", prices: [{ p: 8 }] },
            { id: "coc-vodka-redbull", name: "Vodka Redbull", desc: "vodka liscia e Redbull", prices: [{ p: 8 }] },
            { id: "coc-vodka-lemon", name: "Vodka Lemon", desc: "vodka liscia e lemon soda", prices: [{ p: 8 }] }
          ]
        },
        {
          title: "Tequila",
          items: [
            { id: "teq-liscia", name: "Tequila liscia", desc: "bianca o gialla · 40%", prices: [{ l: "Bianca", p: 3.5 }, { l: "Gialla", p: 3.5 }] },
            { id: "teq-sale-limone", name: "Tequila sale e limone", prices: [{ p: 3.5 }] }
          ]
        }
      ]
    }
  ],

  /* ==================================================================
     9 · ALLERGENI
     ================================================================== */
  allergens: {
    id: "allergeni",
    title: "Allergeni",
    short: "Allergeni",
    icon: "info",
    heading: "Informazione alla clientela inerente alla presenza negli alimenti degli ingredienti o coadiuvanti tecnologici considerati allergeni o dei loro derivati",
    legal: "Cartello informativo provvisorio in attesa della pubblicazione del DPCM riportante le indicazioni e le modalità con cui l’informazione sugli allergeni dovrà essere fornita nei Pubblici esercizi, così come previsto dal Regolamento CE n. 1169/2011.",
    notice: "Si avvisa la gentile clientela che, nei piatti preparati e somministrati in questo esercizio, e nelle bevande, possono essere contenuti ingredienti o coadiuvanti considerati allergeni.",
    listIntro: "Elenco degli ingredienti o coadiuvanti considerati allergeni utilizzati in questo esercizio e presenti nell’Allegato “Sostanze o prodotti che provocano allergie o intolleranze” Reg. 1169/2011 UE:",
    list: [
      { n: 1, t: "Cereali contenenti glutine e prodotti derivati.", icon: "wheat" },
      { n: 2, t: "Crostacei e prodotti a base di crostacei e loro derivati.", icon: "shrimp" },
      { n: 3, t: "Uova e prodotti a base di uova.", icon: "egg" },
      { n: 4, t: "Pesce e prodotti a base di pesce.", icon: "fish" },
      { n: 5, t: "Arachidi e prodotti a base di arachidi.", icon: "peanut" },
      { n: 6, t: "Soia e prodotti a base di soia.", icon: "soy" },
      { n: 7, t: "Latte e prodotti a base di latte (incluso lattosio).", icon: "milk" },
      { n: 8, t: "Frutta a guscio.", icon: "nut" },
      { n: 9, t: "Sedano e prodotti a base di sedano.", icon: "celery" },
      { n: 10, t: "Senape e prodotti a base di senape.", icon: "mustard" },
      { n: 11, t: "Semi di sesamo e prodotti a base di semi di sesamo.", icon: "sesame" },
      { n: 12, t: "Anidride solforosa e solfiti.", icon: "sulfite" },
      { n: 13, t: "Lupini e prodotti a base di lupini.", icon: "lupin" },
      { n: 14, t: "Molluschi e prodotti a base di molluschi.", icon: "mollusc" }
    ],
    signature: "La Direzione."
  },

  /* Etichette dei tag mostrati sulle voci */
  tagLabels: {
    "casa": { it: "Birra di casa", en: "House beer" },
    "senza-glutine": { it: "Senza glutine", en: "Gluten free" },
    "analcolico": { it: "Analcolico", en: "Alcohol free" },
    "vacca-rossa": { it: "Vacca Rossa Reggiana", en: "Vacca Rossa Reggiana" },
    "veg": { it: "Vegetariano", en: "Vegetarian" },
    "bimbi": { it: "Bimbi", en: "Kids" },
    "cani": { it: "Per i cani", en: "For dogs" }
  }
};
