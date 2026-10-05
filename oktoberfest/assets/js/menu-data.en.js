/* =====================================================================
   BIRRERIA OKTOBERFEST – English version of the menu texts.
   ---------------------------------------------------------------------
   Prices and item names live in menu-data.js (Italian, the source of
   truth). This file only overrides the TEXTS shown when the guest taps EN.
   Items are matched by their `id`. Anything missing here falls back to
   Italian automatically.
   ===================================================================== */
window.MENU_EN = {
  brand: {
    serviceNote: "€ 1.50 per person",
    allergyNote: "Guests with allergies or intolerances are welcome to ask the floor manager for appropriate service.",
    frozenNote: "Some ingredients may be prepared from frozen or deep-frozen products."
  },

  /* Price format labels: translated by exact match, or by first word */
  priceLabels: {
    "Pinta": "Pint", "Boccale": "Mug", "Tulipano": "Tulip glass", "WeizenBecker": "Weizen glass",
    "Bottiglia": "Bottle", "Lattina": "Can", "Calice": "Glass",
    "Quartino": "¼ litre", "Mezzo": "½ litre", "Litro": "1 litre",
    "Piccola 0.30 cl.": "Small 0.30 cl.", "Media 0.50 cl.": "Medium 0.50 cl.",
    "Liscia": "Still", "Con bolle": "Sparkling",
    "Giallo": "Yellow", "Rosso": "Red", "Bianco": "White", "Bianca": "White", "Gialla": "Gold",
    "Limone": "Lemon", "Pesca": "Peach", "Ananas": "Pineapple", "Pompelmo": "Grapefruit", "Arancia": "Orange",
    "Espresso": "Espresso", "Corretto": "Corretto (with a shot)", "Deca": "Decaf", "Macchiato": "Macchiato", "Orzo": "Barley coffee",
    "Coca Zero": "Coke Zero"
  },

  sections: {
    "spina": {
      title: "Draught Beers", short: "Draught", subtitle: "Twelve taps, from our house beers to the great classics",
      groups: {
        "Le birre di casa": { title: "House beers", intro: "Beers brewed and customised for Birreria Oktoberfest." },
        "Le classiche alla spina": { title: "Classics on tap" }
      }
    },
    "bottiglie": {
      title: "Bottled Beers", short: "Bottles", subtitle: "Craft, abbey, lambic and a few surprises",
      groups: { "Bottiglie & lattine": { title: "Bottles & cans" } }
    },
    "cucina": {
      title: "Kitchen", short: "Kitchen", subtitle: "Pasta, grilled mains, boards, salads and the kids’ Pupo menu",
      groups: {
        "Primi & Secondi": { title: "Pasta & Mains" },
        "Taglieri": { title: "Boards" },
        "Insalate": { title: "Salads" },
        "Pupo": { title: "Pupo · kids", intro: "For children only, thank you!" }
      }
    },
    "burger": {
      title: "Burgers & Pizza", short: "Burgers", subtitle: "Burgers with fries, limited editions, sandwiches & more, pan pizza",
      groups: {
        "Burger con patatine": { title: "Burgers with fries" },
        "Burger Limited Edition": { title: "Limited Edition Burgers", footnotes: ["Double patty available + € 3.50"] },
        "Panini & Dintorni": { title: "Sandwiches & More" },
        "Pizza al Tegamino": { title: "Pan Pizza" }
      }
    },
    "fritti": {
      title: "Fried & Desserts", short: "Fried · Sweets", subtitle: "Snacks to share, house desserts and ice cream for dogs",
      groups: {
        "Fritti & Spuntini": { title: "Fried & Snacks" },
        "Dolci": { title: "Desserts" },
        "Icedog": { title: "Icedog", intro: "an ice cream for dogs!!" }
      }
    },
    "bar": {
      title: "Bar", short: "Bar", subtitle: "Soft drinks, coffee, bitters & liqueurs",
      groups: {
        "Bevande": { title: "Drinks" },
        "Caffè": { title: "Coffee" },
        "Amari & Liquori": { title: "Bitters & Liqueurs" }
      }
    },
    "cantina": {
      title: "Cellar", short: "Cellar", subtitle: "Wines, grappa, rum and whisky",
      groups: {
        "Vini · Bianco": { title: "Wines · White" },
        "Vini · Rosso": { title: "Wines · Red" },
        "Grappe": { title: "Grappa" },
        "Rhum": { title: "Rum" },
        "Whisky": { title: "Whisky" }
      }
    },
    "american-bar": {
      title: "American Bar", short: "Cocktails", subtitle: "Alcohol-free, gin & tonics and cocktails",
      groups: {
        "Analcolici": { title: "Alcohol-free" },
        "Gin Tonic": { title: "Gin & Tonic", intro: "Served with Acqua Brillante Italian tonic water on the side." },
        "Cocktails": { title: "Cocktails" },
        "Tequila": { title: "Tequila" }
      }
    }
  },

  items: {
    /* ---------------- Draught ---------------- */
    "spina-sanprosper": {
      sub: "Indian Pale Ale · 6.5% · Reggio Emilia · Birrificio Dada",
      desc: "Bright orange in colour with a fine, compact head. On the nose, pleasant citrus notes and hints of malt. In the mouth the excellent balance between the sweetness of the malt and the bitterness of the hops is clear. A slightly caramelised sweetness at first, soon giving way to a long, dry, citrusy bitterness. The finish leaves a pleasant flavour and a clean mouth. Brewed and customised for Birreria Oktoberfest."
    },
    "spina-spqr": {
      sub: "Dark Bock · 6.9% · Piacenza · Buttiga Craft Brewery",
      desc: "For this project Buttiga chose an exceptional partner, Birrificio Vetra, with whom they already share many experiences, from “disreputable” nights out around Italy to charity projects… A Bock, a bottom-fermented style with historic roots in Lower Saxony, already well explored by their friends at Vetra but a happy novelty for Buttiga. Brewed and customised for Birreria Oktoberfest."
    },
    "spina-paulo10": {
      badge: "hand-pumped",
      sub: "Pale Ale · 4.9% · Piacenza · Buttiga Craft Brewery",
      desc: "PAULO 10 is a splendid pale ale, delicate and clear, with a dense head and intense, grassy hopping. The fruity notes lean towards the tropical, for a refreshing and complex tasting experience. The dry, bitter taste refreshes the palate for hours. “Paulo” stands for Paulo Futre, the best Portuguese player, who back in 1993 chose the number 10 shirt at Reggiana… Brewed and customised for Birreria Oktoberfest."
    },
    "spina-budweiser": {
      sub: "American Lager · 5.0% · United States · Anheuser Busch InBev",
      desc: "Budweiser, also simply called Bud, is an American beer brewed in Saint Louis, Missouri, and the flagship of the Anheuser-Busch brewing group. This bottom-fermented beer has a pale golden colour and a fine white head that is not very persistent. On the nose, very light floral and fruity notes. In the mouth it shows restrained fizz and a light body, a subtle hop aroma and a sweetish aftertaste with a slight alcoholic edge."
    },
    "spina-warsteiner-herb": {
      sub: "Pilsner · 4.8% · Germany · Warsteiner Brauerei",
      desc: "Warsteiner Herb brings a light 4.8% to the glass and shows a pale amber colour. A cottony crown of white foam sits on the clear brew and sends hoppy spice to the nose. The first sip reveals a slim body and a promising, tart first impression. The malt forms a stable base, the hops add notes of freshly cut grass and fragrant hay plus a light bitterness. The pleasure peaks in a finish of toasted nuts and grassy, bitter hops."
    },
    "spina-franziskaner-kellerbier": {
      sub: "Unfiltered · 5.2% · Germany · Franziskaner Bräu",
      desc: "Naturally cloudy, amber in colour, velvety and full-bodied. The term “Kellerbier” is German and literally means “cellar beer”: it is kegged and bottled straight from the storage cellar, unfiltered and with a low carbon dioxide content. Franziskaner Kellerbier is a timeless beer thanks to its artisanal, authentic production method. It leaves the palate fresh and highly digestible."
    },
    "spina-franziskaner-weissbier": {
      sub: "Weizen · 5.0% · Germany · Franziskaner Bräu",
      desc: "Franziskaner Weissbier develops an extraordinary blond colour with pinkish highlights. The head is generous, persistent and lifted by lively effervescence. On the nose, the aromas typical of a good weissbier: strongly fruity notes of citrus and banana with spicy yeast and pepper. In the mouth the taste closely follows the nose, with firm fruit flavours and a clear dominance of banana."
    },
    "spina-bulldog": {
      sub: "Strong Ale · 7.1% · England · Courage Ltd.",
      desc: "Born in 1947 at the famous English brewery Courage, Bulldog is a premium strong ale of great alcoholic strength that gives its best when not served too cold: this way it breathes and releases intense sensations that can charm even the most expert drinker. In the glass it gradually releases pleasant aromas in which the firm hops are easy to recognise, wrapped in sweeter veins that give it a harmony promising taste and power."
    },
    "spina-delirium-tremens": {
      sub: "Golden Strong Ale · 8.5% · Belgium · Brasserie Huyghe",
      desc: "One of the few beers that can boast a nomination for the “Best Beer in the World” competition and a gold medal. On the palate it offers sharp peaks of bitterness, with fruity and yeasty nuances. Fantastic aroma, fruity bouquet. It ends on an astonishing bitter, peppery note. The pink elephants on the label refer to the hallucinations that lack of alcohol sometimes causes in certain people during feverish deliriums, known as Delirium Tremens."
    },
    "spina-hoegaarden": {
      sub: "Blanche · 4.9% · Belgium · Hoegaarden",
      desc: "Hoegaarden is the most famous blanche in the world. Fragrant and spicy thanks to the addition of bitter orange peel and coriander as the style requires, it has a faded straw-yellow colour. Well carbonated, Hoegaarden Blanche has a remarkable compact white head, not very persistent, and the haze typical of wheat beers. On the nose, citrus and fruity hints as well as the aromas of the spicing, which carry through to the mouth together with a sweet finish. Hoegaarden Blanche is a fresh, thirst-quenching beer."
    },
    "spina-delirium-nocturnum": {
      sub: "Brune Strong Ale · 8.5% · Belgium · Brasserie Huyghe",
      desc: "Dark brown with reddish highlights. Compact white head, stable and airy. The aroma combines caramel, coffee and chocolate, with local spices such as liquorice, coriander, oak and orange zest. Very soft on the palate despite the high alcohol content, followed by a growing bitterness. The pink elephants on the label refer to the hallucinations that lack of alcohol sometimes causes in certain people during feverish deliriums."
    },
    "spina-guinness": {
      sub: "Stout · 4.2% · Ireland · Arthur Guinness & Co",
      desc: "Brewed with top-quality malt which, once roasted, gives the characteristic dark, almost black colour. On the nose, notes of freshly roasted coffee. The taste is dry, firm and intense. This beer is considered the number one stout in the world, with a dense, very compact and absolutely persistent head. Arthur Guinness was the shrewd Dubliner who in 1759 christened one of the most famous beers on the planet: Guinness."
    },

    /* ---------------- Bottles ---------------- */
    "bott-ambita": {
      sub: "32 Via dei Birrai · Italy · Italian Ale · 4.5%",
      desc: "“32 Via dei Birrai Ambita” is a pale, easy-drinking craft beer made with 100% Italian ingredients and inspired by the Belgian Blond Ale style. Pale straw-yellow with a compact white head, it offers grassy, citrus and honeyed notes with a hoppy finish that keeps it smooth and persistent."
    },
    "bott-brauweisse": {
      sub: "Ayinger · Germany · Weiss · 5.1%",
      desc: "Opalescent straw-yellow; the head is creamy, white and fairly persistent. On the nose, hints of wheat, yeast and the unmistakable fragrance of banana; in the background citrus, spicy, grassy and vanilla notes. In the mouth it is full and round, mirroring the nose, with the typical taste of wheat beers and barely perceptible bitterness. Dry, crisp finish."
    },
    "bott-jahrhundertbier": {
      sub: "Ayinger · Germany · Export Lager · 5.5%",
      desc: "A golden-yellow beer with a light hint of floral yeast. Aromatic and full-bodied on the first sip, then light and soft with a fine persistence. It fades on a good, balanced bitterness. Richly malted, it highlights the natural, genuine quality of the barley used."
    },
    "bott-jever": {
      sub: "Jever · Germany · Pils · 4.9%",
      desc: "Straw-blond with golden highlights, clear, with a compact white head. Fresh, dry aroma with persistent bitterness. Born in 1848, when it was one of many breweries in the area, this beer had something special from the start. Jever Pilsener represents excellence in the world of pils, so much so that the “Jever taste” is the benchmark among Germany’s best sellers."
    },
    "bott-rye-river": {
      sub: "Rye River · Ireland · Gluten Free · 5.0%",
      desc: "This clean, crisp gluten-free lager has a pronounced hop character and a cake-like aroma from the Herkules, Hersbrucker and Traditional hop varieties. Its bright colour signals a rich, intense flavour, a true joy for the palate."
    },
    "bott-leffe-rouge": {
      sub: "Leffe · Belgium · Belgian Ale · 6.6%",
      desc: "Leffe is not just a beer but a moment of personal reward and relaxation to share with the people you love. Leffe Rouge is an authentic red abbey beer with an intense malt aroma and notes of roasted coffee and candied citrus. The taste reveals a soft body in which roasted malt gives way to a grassy aftertaste. The long, persistent finish leaves a sense of freshness."
    },
    "bott-leffe-blonde": {
      sub: "Leffe · Belgium · Golden Ale · 6.6%",
      desc: "Copper-coloured with a white head, Leffe Blonde is a Belgian beer with a pleasant malt aroma enriched by fruity, spicy and cereal notes. On the palate the nose returns: it opens sweet with malt and caramel, with fruity and spicy hints that give way to a delicately hoppy finish."
    },
    "bott-orval": {
      sub: "Brasserie d’Orval · Belgium · Trappist Ale · 6.2%",
      desc: "Orval is a Trappist beer of a fine deep golden colour, brewed at the Abbey of Orval in Belgium. Its hop aroma is very intense when drunk young; with age it gains a slight acidity and very interesting notes of Sherry and cherry pie. Orval’s complex character comes from three separate fermentations and the local hops used to brew it. The fish with the golden ring remains the emblem of the brewery at the Matilda fountain, where the ruins of the medieval abbey still shine and pure water still flows from its spring."
    },
    "bott-geuze-boon": {
      sub: "Boon · Belgium · Geuze · 7.0%",
      desc: "Born from a blend of Lambics aged about 18 months and refermented in the bottle. Hazy gold in colour; on the nose the aromas are pungent and musty, with notes recalling cheese, yeast, wine and undergrowth (earth and mushrooms). Oily, with a pleasantly dry finish."
    },
    "bott-psycho-ipa": {
      sub: "Buttiga · Italy · Double IPA · 7.6%",
      desc: "La Buttiga’s craft Psycho IPA, in a 33 cl can, is a Double IPA with intense, intriguing flavours, enriched by notes of tropical fruit, citrus and passion fruit. The high IBU count comes from a skilful, perfectly balanced combination of Oceanic and American hops."
    },
    "bott-radler-natur": {
      sub: "Mönchshof · Germany · Radler · 2.5%",
      desc: "Mönchshof Natur Radler lets you experience the pure, unspoilt taste of nature, with no artificial sweeteners or preservatives at all. The sparkling, fruity aroma and natural lemon juice make Natur Radler a pleasantly refreshing, light drink, and not only in summer. Open it with a “plop”!"
    },
    "bott-rorschach": {
      sub: "Dada · Italy (Correggio RE) · Imperial Stout · 8.5%",
      desc: "Black and impenetrable with a cappuccino-coloured head; very intense aromas of coffee, chocolate and caramel. In the mouth it is warm and satisfying. The body is thick and silky, the flavour strong and persistent, recalling an espresso with a note of cocoa, toasted hazelnut and a hint of caramel; in the finish a clean, intense bitterness stops the beer from becoming tiring."
    },
    "bott-tennents-super": {
      sub: "Wellpark Brewery · Scotland · Strong Lager · 9.0%",
      desc: "Tennent’s is a Scottish beer, born in 1885, brewed with 100% Scottish barley malt, the pure water of Glasgow’s Loch Katrine and two different types of malt. Once mixed and fermented, they are kilned. Hops are then added in the perfect amount to guarantee the sweet-bitter balance that defines Tennent’s unique taste. Everything is boiled and finally the yeast is added, turning sugar into alcohol."
    },
    "bott-xx-bitter": {
      sub: "De Ranke · Belgium · Belgian Ale · 6.0%",
      desc: "XX Bitter is famous for being the hoppiest beer in Belgium. A blond beer, light in strength, whose predominant flavour is hop bitterness. Its aroma too is grassy, almost floral. Despite the bitter hop charge, XX Bitter is soft on the palate, balanced by malty notes and spices. This special Belgian beer reveals all its bitter persistence in the finish: bitter, dry and firm."
    },
    "bott-warsteiner-fresh": {
      sub: "Warsteiner · Germany · Alcohol-free beer · 0.0%",
      desc: "Brewed according to the Purity Law, the alcohol in this pils is removed after full maturation using a special method. With Warsteiner Premium Fresh 0.0, pils lovers can consciously enjoy the aroma of a full-flavoured beer, preserved even without the alcohol."
    },

    /* ---------------- Kitchen ---------------- */
    "cuc-penne": { desc: "with Parmigiano Reggiano" },
    "cuc-grigliata": { desc: "mixed grill with beef steak, “Warsteiner” sausage, würstel and pork coppa, roast potatoes and home-made focaccia" },
    "cuc-spiedoni": { desc: "a pair of mixed meat skewers (chicken and pork), 350 g (℮), with bacon-wrapped spring onion, chive mayonnaise and skin-on rustic potatoes" },
    "cuc-stinco": { desc: "pork shank cooked in “SPQR” beer, 800 g (℮), with sauerkraut, roast potatoes, pretzel and classic burger sauce" },
    "cuc-tagliata-granata": { desc: "sliced VACCA ROSSA REGGIANA beef, 250 g (℮), with caramelised onion, roast potatoes and home-made focaccia" },
    "cuc-tagliata-polaster": { desc: "sliced chicken, 250 g (℮), with grilled vegetables and Roman-style artichoke" },
    "cuc-vaca-rosa": { desc: "fresh 250 g VACCA ROSSA REGGIANA beef burger with caramelised onion and skin-on rustic potatoes" },
    "cuc-nimalata": { badge: "for 2 humans", desc: "pork shank, coppa and würstel, sliced speck, kartoffelsalat, chive mayonnaise, skin-on rustic potatoes and pretzel" },
    "cuc-verdure": { desc: "side dish" },
    "cuc-patate-forno": { desc: "side dish" },
    "tag-emiliano": { desc: "with Parma ham, Felino salami, mortadella and toasted croutons" },
    "tag-poker": { desc: "with Parma ham, roast potatoes, Roman-style artichoke, pecorino and tortillas" },
    "tag-semplice": { desc: "with Parma ham, Parmigiano Reggiano shavings and toasted croutons" },
    "ins-apollo": { desc: "mixed salad, rocket, cherry tomatoes, shredded grilled chicken and Philadelphia" },
    "ins-bufala": { desc: "mixed salad, cherry tomatoes, rocket, red radicchio, buffalo mozzarella and tuna" },
    "ins-piccola": { desc: "mixed salad, tomatoes" },
    "pupo-burger": { badge: "with a surprise!!", desc: "artisan bun with a 100 g burger, ketchup, salad and French fries" },
    "pupo-cotoletta": { badge: "with a surprise!!", desc: "100 g chicken cutlet, mayonnaise, salad and French fries" },

    /* ---------------- Burgers & Pizza ---------------- */
    "bur-bart": { desc: "burger bun with a 150 g patty, smoked scamorza, bacon, salad and BBQ sauce" },
    "bur-homer": { desc: "burger bun with a 150 g patty, tomato, mayonnaise, salad and ketchup" },
    "bur-marge": { desc: "burger bun with a 150 g chicken cutlet, mayonnaise, tomato and salad" },
    "bur-lisa": { desc: "burger bun with a 150 g Green Heroes plant-based patty, vegan mayonnaise, courgettes and chickpea hummus" },
    "bur-pork": { desc: "artisan bread from “Forno Davoli - RE”, with locally sourced pulled pork, sliced tomato, smoked scamorza, salad, crispy bacon and chive mayonnaise" },
    "bur-razza-reggiana": { desc: "artisan bread from “Forno Davoli - RE”, with a 250 g VACCA ROSSA REGGIANA beef patty, Parmigiano Reggiano cream, rocket and sliced tomato" },
    "bur-smash": { desc: "artisan bread from “Forno Davoli - RE”, with 200 g minced beef, smoked scamorza, grilled onion, salad, crispy bacon and cheddar sauce" },
    "pan-charlie": { desc: "artisan ciabatta from “Forno Davoli - RE” with sausage, mayonnaise, sliced tomato, salad, bacon and smoked scamorza" },
    "pan-franklin": { desc: "artisan ciabatta from “Forno Davoli - RE” with buffalo mozzarella, sliced tomato, Parma ham and salad" },
    "pan-hotdog": { desc: "würstel, ketchup and mayonnaise" },
    "pan-kepub": { desc: "tortilla wrap with shredded grilled chicken, bacon, salad, sliced tomato, mayonnaise and French fries" },
    "pan-peggy": { desc: "pretzel bun with speck, smoked scamorza, sautéed mushrooms and classic burger sauce" },
    "pan-snoopy": { desc: "artisan ciabatta from “Forno Davoli - RE” with sausage, bacon, Ass Burner hot sauce, pecorino and caramelised onion" },
    "pan-violet": { desc: "piadina flatbread with Parma ham, sautéed mushrooms, mozzarella and rocket" },
    "pan-woodstock": { desc: "piadina flatbread with cooked ham, mozzarella, salad, sliced tomato and mayonnaise" },
    "piz-margherita": { desc: "topped with tomato pulp and 100% fiordilatte mozzarella" },
    "piz-cotto-funghi": { desc: "topped with tomato pulp, 100% fiordilatte mozzarella, cooked ham and mushrooms" },
    "piz-crudo": { desc: "topped with tomato pulp, 100% fiordilatte mozzarella and Parma ham" },

    /* ---------------- Fried & Desserts ---------------- */
    "fri-alette": { name: "Chicken wings in a bowl" },
    "fri-anelli": { name: "Onion rings" },
    "fri-brezel": { name: "Pretzel" },
    "fri-chips": { name: "Chips in a basket", desc: "crisps" },
    "fri-mozzarelle": { name: "Breaded mozzarella" },
    "fri-oktobermix": { desc: "olives, chicken sticks, onion rings and French fries" },
    "fri-olive": { name: "Ascoli-style stuffed olives" },
    "fri-patate": { name: "French fries" },
    "fri-scarpasoun": { desc: "fried erbazzone, the local chard and Parmigiano pie" },
    "fri-stick": { name: "Crispy chicken sticks", desc: "lightly spicy" },
    "dol-birramisu": { name: "“Guinness” Birramisù", desc: "tiramisù made with Guinness" },
    "dol-coppa-gelato": { name: "Cream ice cream cup", desc: "with whipped cream" },
    "dol-mascarpone": { name: "Mascarpone cream", desc: "with chocolate flakes" },
    "dol-crepes": { name: "Nutella crêpe", desc: "rolled, with icing sugar and whipped cream" },
    "dol-settimana": { name: "Dessert of the week", desc: "always different, always fresh and always good!" },
    "dol-sorbetto": { name: "Lemon sorbet" },
    "dol-waffle": { name: "Hot waffle", desc: "with cream ice cream, Nutella and whipped cream" },
    "ice-icedog": { desc: "artisan ice cream made specifically for dogs, 60 g cup" },

    /* ---------------- Bar ---------------- */
    "bev-acqua": { name: "Surgiva mineral water", desc: "glass bottle 0.50 cl · still or sparkling" },
    "bev-brillante": { desc: "small bottle" },
    "bev-cedrata": { desc: "small bottle" },
    "bev-chino": { desc: "can" },
    "bev-cocacola": { name: "Coca Cola on tap", desc: "+ ice" },
    "bev-cocazero": { name: "Coke Zero · Fanta · Sprite", desc: "small bottle" },
    "bev-crodino": { desc: "small bottle · yellow or red" },
    "bev-estathe": { desc: "can · lemon or peach" },
    "bev-lemonsoda": { desc: "small bottle" },
    "bev-redbull": { desc: "can" },
    "bev-succhi": { name: "Fruit juices", desc: "0.30 cl glass" },
    "caf-espresso": { name: "Coffee", desc: "espresso · corretto · decaf · macchiato · barley" },
    "caf-doppio": { name: "Double espresso" },
    "caf-shakerato": { name: "Shaken iced coffee" },
    "caf-irish": { name: "Irish coffee" },
    "ama-capo": { desc: "Italy’s best-loved bitter" },
    "ama-baileys": { desc: "whiskey cream liqueur" },
    "ama-brancamenta": { desc: "mint herbal bitter" },
    "ama-braulio": { desc: "alpine herbal liqueur" },
    "ama-fernet": { desc: "herbal liqueur" },
    "ama-kaciuto": { desc: "the bitter everyone has always liked" },
    "ama-jager": { desc: "German herbal liqueur" },
    "ama-jefferson": { desc: "a serious bitter" },
    "ama-limoncino": { desc: "the taste of lemon" },
    "ama-martini": { desc: "white or red" },
    "ama-montenegro": { desc: "true flavour" },
    "ama-nocino": { desc: "the traditional Italian walnut liqueur" },
    "ama-sambuca": { desc: "the classic that never goes out of style" },
    "ama-unicum": { desc: "herbal bitter" },

    /* ---------------- Cellar ---------------- */
    "vin-frizzantino": { name: "House sparkling white on tap" },
    "vin-prosecco": { sub: "Contarini · 11%" },
    "vin-chardonnay": { sub: "Bottega Vinai · 13%" },
    "vin-trento": { sub: "Altemasi · 12.5%" },
    "vin-morellino": { sub: "Roggiano · 14%" },
    "vin-lambrusco-tirelli": { sub: "Tirelli · 10.5%" },
    "vin-lambrusco-puianello": { sub: "Puianello · 11%" },
    "vin-valpolicella": { sub: "Torre d’Orti · 14.5%" },
    "gra-24carati": { badge: "barrel-aged", sub: "Poli distillery · 40%" },
    "gra-podipoli": { badge: "smooth", sub: "Poli distillery · 40%" },
    "gra-sarpa": { badge: "dry", sub: "Poli distillery · 40%" },
    "gra-storica": { badge: "high strength", sub: "Domenis 1898 distillery · 50%" },
    "rum-diplomatico": { desc: "mantuano", sub: "40% · Trinidad & Tobago" },
    "rum-donpapa": { desc: "touch of vanilla", sub: "40% · Philippines" },
    "rum-kraken": { desc: "black spiced", sub: "40% · Caribbean" },
    "rum-millonario": { desc: "reserva especial 15 años", sub: "40% · Peru" },
    "rum-zacapa": { desc: "23 years", sub: "40% · Guatemala" },
    "whi-ardbeg": { desc: "guaranteed TEN years old", sub: "46% · Scotland" },
    "whi-caolila": { desc: "12 years", sub: "43% · Scotland" },
    "whi-glenfiddich": { desc: "12 years · single malt scotch whisky", sub: "40% · Scotland" },
    "whi-jack": { desc: "Old No. 7", sub: "40% · USA" },
    "whi-jameson": { sub: "40% · Ireland" },
    "whi-makers": { desc: "straight bourbon", sub: "45% · USA" },
    "whi-laphroaig": { desc: "10 years", sub: "40% · Scotland" },
    "whi-macallan": { desc: "12 years double cask", sub: "40% · Scotland" },
    "whi-nikka": { sub: "45% · Japan" },
    "whi-talisker": { desc: "single malt", sub: "45.8% · Scotland" },

    /* ---------------- American Bar ---------------- */
    "ana-cedrata": { desc: "cedrata citron soda, peach juice, orange juice and pineapple juice" },
    "ana-fragola": { desc: "peach juice, orange juice, pineapple juice and strawberry pulp" },
    "ana-pompelmo": { desc: "pineapple juice, grapefruit juice, lemon juice and coconut pulp" },
    "ana-royrogers": { desc: "Coca Cola and grenadine" },
    "ana-spritz": { name: "Alcohol-free Spritz", desc: "red Crodino, orange juice, topped with tonic" },
    "ana-virgin-colada": { desc: "pineapple juice, coconut pulp and tonic" },
    "ana-zerozero": { desc: "Tanqueray 0.0 alcohol-free gin, with Acqua Brillante Italian tonic water on the side" },
    "gin-bombay": { desc: "Bombay gin (England) with Acqua Brillante Italian tonic water on the side" },
    "gin-gino": { desc: "Big Gino gin (Italy) with Acqua Brillante Italian tonic water on the side" },
    "gin-hendricks": { desc: "Hendrick’s gin (Scotland) with Acqua Brillante Italian tonic water on the side" },
    "gin-mare": { desc: "Gin Mare (Spain) with Acqua Brillante Italian tonic water on the side" },
    "gin-pompelmo": { desc: "Pompelmo Rosa pink grapefruit gin (Italy) with Acqua Brillante Italian tonic water on the side" },
    "coc-americano": { desc: "Campari, Martini Rosso and soda" },
    "coc-caipiroska": { desc: "vodka, strawberry pulp, lime and muddled brown sugar" },
    "coc-cocarum": { name: "Rum & Coke", desc: "Coca Cola and rum" },
    "coc-ginlemon": { desc: "Lemon Soda and gin" },
    "coc-gintonic": { desc: "tonic and gin" },
    "coc-jagerbomb": { desc: "Red Bull and Jägermeister" },
    "coc-longisland": { desc: "vodka, triple sec, gin, white rum and Coca Cola" },
    "coc-negroni": { desc: "gin, Campari and Martini Rosso" },
    "coc-sbagliato": { desc: "Campari, Martini Rosso and prosecco" },
    "coc-peschito": { desc: "peach vodka and Lemon Soda" },
    "coc-pinacolada": { desc: "white rum, pineapple juice and coconut pulp" },
    "coc-sarti": { desc: "Sarti Rosa, prosecco and soda" },
    "coc-sexonthebeach": { desc: "vodka, peach vodka, orange juice and pomegranate pulp" },
    "coc-spritz": { desc: "Aperol, prosecco and soda" },
    "coc-tequila-sunrise": { desc: "tequila, orange juice, triple sec and pomegranate pulp" },
    "coc-vodka-redbull": { desc: "vodka and Red Bull" },
    "coc-vodka-lemon": { desc: "vodka and Lemon Soda" },
    "teq-liscia": { name: "Tequila, neat", desc: "white or gold · 40%" },
    "teq-sale-limone": { name: "Tequila with salt and lemon" }
  },

  allergens: {
    title: "Allergens", short: "Allergens",
    heading: "Information for customers on the presence in food of ingredients or processing aids considered allergens or their derivatives",
    legal: "Provisional information notice pending publication of the Prime Ministerial Decree setting out how allergen information must be provided in public catering, as required by EC Regulation No. 1169/2011.",
    notice: "Customers are advised that the dishes prepared and served in this establishment, and the drinks, may contain ingredients or processing aids considered allergens.",
    listIntro: "List of the ingredients or processing aids considered allergens that are used in this establishment and listed in the Annex “Substances or products causing allergies or intolerances” of EU Reg. 1169/2011:",
    list: [
      "Cereals containing gluten and products thereof.",
      "Crustaceans and products based on crustaceans and derivatives.",
      "Eggs and egg-based products.",
      "Fish and fish-based products.",
      "Peanuts and peanut-based products.",
      "Soybeans and soy-based products.",
      "Milk and milk-based products (including lactose).",
      "Tree nuts.",
      "Celery and celery-based products.",
      "Mustard and mustard-based products.",
      "Sesame seeds and sesame-based products.",
      "Sulphur dioxide and sulphites.",
      "Lupin and lupin-based products.",
      "Molluscs and mollusc-based products."
    ],
    signature: "The Management."
  }
};
