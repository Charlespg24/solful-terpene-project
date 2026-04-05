import { useState, useMemo } from "react";

const TC = {
  "Myrcene":         "#8EAE68",
  "Limonene":        "#D4C85C",
  "Linalool":        "#9B7BA8",
  "β-Caryophyllene": "#C8A97E",
  "α-Humulene":      "#7C9082",
  "α-Pinene":        "#5C8E6B",
  "Geraniol":        "#D4887C",
  "β-Ocimene":       "#B8785C",
  "Farnesene":       "#D4B88E",
  "Terpinolene":     "#6BAE8E",
};

// Hop → terpene map (from published hop oil analyses)
const HOP = {
  "Citra":           {d:["Myrcene","Limonene","Linalool"],         s:["Geraniol"],            n:"Tropical citrus, passion fruit, lime"},
  "Mosaic":          {d:["Myrcene","Geraniol","Farnesene"],        s:["Linalool","β-Ocimene"],n:"Mango, blueberry, tropical"},
  "Amarillo":        {d:["Myrcene","Limonene","Geraniol"],         s:["Linalool"],            n:"Orange, peach, apricot"},
  "Galaxy":          {d:["Myrcene","β-Ocimene","Limonene"],        s:["Linalool"],            n:"Passion fruit, peach, citrus"},
  "El Dorado":       {d:["Myrcene","Limonene","Geraniol"],         s:["Farnesene"],           n:"Watermelon, pear, stone fruit"},
  "Sabro":           {d:["Myrcene","Linalool","Farnesene"],        s:["Geraniol"],            n:"Coconut, tangerine, stone fruit"},
  "Strata":          {d:["Myrcene","β-Ocimene","Limonene"],        s:["Geraniol"],            n:"Passion fruit, dank, citrus"},
  "Nectaron":        {d:["Myrcene","Limonene","Geraniol"],         s:["β-Ocimene"],           n:"Tropical, stone fruit, citrus"},
  "Azacca":          {d:["Myrcene","Limonene","β-Ocimene"],        s:["Geraniol"],            n:"Mango, orange, tropical"},
  "HBC 586":         {d:["Myrcene","Linalool","Geraniol"],         s:["β-Ocimene"],           n:"Tropical, stone fruit, floral"},
  "Belma":           {d:["Myrcene","Geraniol","Limonene"],         s:["Farnesene"],           n:"Melon, strawberry, tropical"},
  "Ekuanot":         {d:["Myrcene","Limonene","β-Ocimene"],        s:["Geraniol"],            n:"Papaya, citrus, tropical"},
  "Nelson Sauvin":   {d:["Linalool","Geraniol","β-Ocimene"],       s:["Myrcene"],             n:"White wine, gooseberry, floral"},
  "Hallertau Blanc": {d:["Linalool","Geraniol","Myrcene"],         s:["β-Ocimene"],           n:"White wine, grapefruit, floral"},
  "Motueka":         {d:["Myrcene","Limonene","Linalool"],         s:["β-Ocimene"],           n:"Lime, lemon, tropical"},
  "Wai-iti":         {d:["Myrcene","Limonene","Linalool"],         s:["Geraniol"],            n:"Lime, peach, floral"},
  "Rakau":           {d:["Myrcene","α-Pinene","Linalool"],         s:["β-Ocimene"],           n:"Passion fruit, pine, stone fruit"},
  "Riwaka":          {d:["Myrcene","Limonene","Linalool"],         s:["Geraniol"],            n:"Grapefruit, citrus, tropical NZ"},
  "Mandarina Bavaria":{d:["Myrcene","Limonene","Geraniol"],        s:["Linalool"],            n:"Mandarin orange, tangerine"},
  "Comet":           {d:["Myrcene","Limonene","α-Pinene"],         s:["β-Caryophyllene"],     n:"Grapefruit, citrus, pine"},
  "Wakatu":          {d:["Myrcene","Linalool","Limonene"],         s:["Geraniol"],            n:"Lime, floral, tropical"},
  "Denali":          {d:["Myrcene","Limonene","β-Ocimene"],        s:["Geraniol"],            n:"Pineapple, citrus, pine"},
  "Cashmere":        {d:["Myrcene","Linalool","Limonene"],         s:["Geraniol"],            n:"Coconut, lemon, melon"},
  "Talus":           {d:["Myrcene","Linalool","Geraniol"],         s:["β-Ocimene"],           n:"Rose, berry, floral tropical"},
  "Vic Secret":      {d:["Myrcene","β-Ocimene","Limonene"],        s:["Geraniol"],            n:"Pineapple, passionfruit, pine"},
  "Simcoe":          {d:["Myrcene","α-Pinene","Linalool"],         s:["β-Caryophyllene"],     n:"Pine, passion fruit, earthy"},
  "Columbus":        {d:["Myrcene","α-Humulene","β-Caryophyllene"],s:["α-Pinene"],            n:"Earthy, dank, pungent"},
  "Chinook":         {d:["Myrcene","α-Pinene","β-Caryophyllene"],  s:["α-Humulene"],          n:"Pine, grapefruit, spice"},
  "Cascade":         {d:["Myrcene","Linalool","β-Caryophyllene"],  s:["α-Pinene"],            n:"Grapefruit, floral, citrus pine"},
  "Centennial":      {d:["Myrcene","Linalool","β-Caryophyllene"],  s:["α-Pinene"],            n:"Citrus, floral, pine"},
  "Idaho 7":         {d:["β-Caryophyllene","Myrcene","α-Humulene"],s:["α-Pinene"],            n:"Resinous, pine, citrus"},
  "Ahtanum":         {d:["Myrcene","Linalool","α-Pinene"],         s:["β-Caryophyllene"],     n:"Floral, citrus, earthy"},
  "Magnum":          {d:["Myrcene","α-Humulene","β-Caryophyllene"],s:["Linalool"],            n:"Clean bitter, subtle floral"},
  "Crystal":         {d:["Myrcene","Linalool","β-Caryophyllene"],  s:["α-Pinene"],            n:"Floral, spice, mild citrus"},
  "Willamette":      {d:["Myrcene","β-Caryophyllene","α-Humulene"],s:["Linalool"],            n:"Earthy, floral, mild spice"},
  "Perle":           {d:["Myrcene","α-Humulene","β-Caryophyllene"],s:["Linalool"],            n:"Spicy, herbal, mild floral"},
  "Hallertau":       {d:["Myrcene","Linalool","α-Humulene"],       s:["β-Caryophyllene"],     n:"Herbal, floral, mild spice"},
  "Saaz":            {d:["Myrcene","β-Caryophyllene","α-Humulene"],s:["Linalool"],            n:"Earthy, herbal, noble"},
  "Tettnang":        {d:["Myrcene","Linalool","β-Caryophyllene"],  s:["α-Humulene"],          n:"Floral, herbal, mild"},
  "Styrian Goldings":{d:["β-Caryophyllene","Myrcene","Linalool"],  s:["α-Humulene"],          n:"Earthy, floral, spicy"},
  "Exp 586":         {d:["Myrcene","β-Ocimene","Geraniol"],        s:["Linalool"],            n:"Tropical, fruity, experimental"},
};

function deriveT(hops=[]) {
  const w={};
  hops.filter(h=>HOP[h]).forEach(h=>{
    HOP[h].d.forEach((t,i)=>{ w[t]=(w[t]||0)+(3-i); });
    HOP[h].s.forEach(t=>{ w[t]=(w[t]||0)+0.5; });
  });
  return Object.entries(w).sort((a,b)=>b[1]-a[1]).map(e=>e[0]);
}

// ── BREWERY CATALOG ───────────────────────────────────────────────
const BREWERIES = [

  {id:"pondfarm", name:"Pond Farm Brewing", loc:"San Rafael, CA", region:"Marin", col:"#8EAEC8",
   about:"Husband-and-wife brewpub in downtown San Rafael. German-inspired lagers, award-winning dark beers, hazys. 2025 GABF Gold Medal for Dark Mast.",
   beers:[
    {n:"Devil's Gulch",         style:"New England IPA",    abv:"6.8%", hops:["Citra","Mosaic","HBC 586"],         aroma:"Strong citrus, tropical, mango, passion fruit — juicy mouthfeel", award:"2019 GABF Bronze · 2023 Good Food Award"},
    {n:"Dark Mast",             style:"Dark Lager",         abv:"4.2%", hops:["Saaz","Magnum"],                    aroma:"Roast, coffee, chocolate, clean lager finish", award:"2025 GABF Gold Medal"},
    {n:"Lucy Pale Ale",         style:"American Pale Ale",  abv:"5.2%", hops:["Cascade","Centennial"],             aroma:"Citrus, floral, clean malt backdrop"},
    {n:"Barrel-Aged Lucy",      style:"Barrel-Aged Pale",   abv:"7.5%", hops:["Cascade"],                         aroma:"Oak, vanilla, citrus warmth — wine barrel aged"},
    {n:"Cataract Falls IPA",    style:"American IPA",       abv:"6.5%", hops:["Simcoe","Centennial","Cascade"],    aroma:"Pine, citrus, grapefruit, resinous"},
    {n:"Yes, And… Hazy Pale",   style:"Hazy Pale Ale",      abv:"5.0%", hops:["Citra","Mosaic"],                   aroma:"Juicy citrus, mango, light tropical"},
    {n:"Kolsch",                style:"Kölsch",             abv:"4.8%", hops:["Hallertau"],                        aroma:"Soft floral, subtle grain, crisp finish"},
    {n:"German Festbier",       style:"Festbier / Märzen",  abv:"5.8%", hops:["Hallertau","Tettnang"],             aroma:"Toasted malt, noble herb, clean lager — Oktoberfest staple"},
    {n:"Mexican Lager",         style:"Lager – Mexican",    abv:"4.5%", hops:["Saaz","Hallertau"],                 aroma:"Clean grain, crisp, subtle noble herb"},
    {n:"Saison",                style:"Farmhouse Saison",   abv:"6.2%", hops:["Hallertau","Cascade"],             aroma:"Floral, citrus peel, earthy spice, dry finish"},
    {n:"Imperial Dark Mast",    style:"Imperial Dark Lager",abv:"7.5%", hops:["Saaz","Magnum"],                   aroma:"Rich roast, dark chocolate, bold coffee — Dark Mast elevated"},
    {n:"Helles",                style:"Munich Helles",      abv:"4.6%", hops:["Hallertau"],                       aroma:"Soft malt, mild floral, elegant and easy"},
  ]},

  {id:"henhouse", name:"HenHouse Brewing", loc:"Santa Rosa / Petaluma, CA", region:"Sonoma", col:"#D4C85C",
   about:"Sonoma County IPA specialists since 2011. Conspiracy-themed names, aggressive DDH, built on Cascade/Simcoe/Mosaic/Belma/Hallertau Blanc backbone. Big Chicken is the annual cult release.",
   beers:[
    {n:"HenHouse IPA (Incredible Pale Ale)", style:"American IPA",     abv:"6.9%", hops:["Cascade","Simcoe","Mosaic","Belma","Hallertau Blanc"], aroma:"Tangerine, pineapple, pine, floral — the keystone, always fresh-hopped year-round"},
    {n:"Stoked! Hazy Pale",       style:"Hazy Pale Ale",    abv:"5.7%", hops:["Amarillo","Mosaic","Cascade"],           aroma:"Orange, peach, soft tropical — approachable flagship pale"},
    {n:"Frozen Envelope IPA",     style:"Hazy IPA",         abv:"6.5%", hops:["Idaho 7","Ahtanum"],                     aroma:"Danky orange, pineapple juice, guava, geranium — looks like orange juice"},
    {n:"Kubrick's Landing IPA",   style:"American IPA",     abv:"7.2%", hops:["Mosaic","Motueka","Mandarina Bavaria"],   aroma:"Mandarin orange, citrus from 3 continents, tropical complexity"},
    {n:"Big Chicken DIPA",        style:"Double IPA",       abv:"10%",  hops:["Belma","Citra","Nectaron","Simcoe","Comet"], aroma:"Melon, papaya, stone fruit, nectarine — annual Zero-Day release", award:"Annual limited cult release"},
    {n:"Deep State IPA",          style:"Hazy IPA",         abv:"7.5%", hops:["Citra","Amarillo"],                       aroma:"Tropical citrus, bright orange, juicy dank"},
    {n:"Goodness Gracious, the Vapors!", style:"Hazy IPA",  abv:"7.6%", hops:["Simcoe","Comet","Sabro"],                aroma:"Mango peel, orange, coconut — wild tropical ride"},
    {n:"ChatG.O.D. Hazy IPA",     style:"Hazy IPA",         abv:"6.5%", hops:["Motueka","Centennial","Comet","El Dorado"], aroma:"Tangerine dream, sweet orange juice, hint of cannabis (hop-derived)"},
    {n:"Hollow Planet DIPA",      style:"Double IPA",       abv:"8.2%", hops:["Mosaic","Cashmere"],                      aroma:"Pina colada, guava, coconut, tropical — DDH monster"},
    {n:"Mexican Lager",           style:"Lager – Mexican",  abv:"4.8%", hops:["Motueka","Saaz"],                         aroma:"Lime character, clean grain, refreshing — Malt y Maíz"},
    {n:"West Coast Pilsner",      style:"Pilsner",          abv:"5.2%", hops:["Strata","El Dorado"],                     aroma:"Passion fruit, tropical — West Coast hop meets pilsner crispness"},
    {n:"Saison",                  style:"Farmhouse Saison", abv:"5.5%", hops:["Cascade"],                               aroma:"Grapefruit, orange peel, black pepper, dry spiced finish"},
    {n:"Oyster Stout",            style:"Oyster Stout",     abv:"5.2%", hops:["Magnum","Hallertau"],                     aroma:"Roast, salted caramel, subtle brine, chocolate — Petaluma oyster beds"},
    {n:"Red IPA",                 style:"Red IPA",          abv:"6.8%", hops:["El Dorado","Cascade","Simcoe"],           aroma:"Citrus-forward, caramel malt, stone fruit — El Dorado shines on red malt"},
    {n:"Hella Stoked! DIPA (Collab w/ Altamont)", style:"Double IPA", abv:"8.2%", hops:["Belma","Cashmere","Citra","El Dorado"], aroma:"Fruit salad, clear and crisp, tropical dank, crushable at 8.2%"},
  ]},

  {id:"lostcoast", name:"Lost Coast Brewery", loc:"Eureka, CA", region:"Humboldt", col:"#7C9082",
   about:"Founded 1989 by Wendy Pound & Barbara Groom — pioneering female-owned craft brewery. 140+ awards. 60,000+ barrels/year. Built on Great White, Indica, and approachable Humboldt classics.",
   beers:[
    {n:"Great White",        style:"Belgian Witbier",     abv:"4.8%", hops:["Hallertau"],                          aroma:"Citrus, coriander, Humboldt herbs, soft wheat — the OG flagship", award:"CA State Fair Silver 2002, 2003"},
    {n:"Indica IPA",         style:"American IPA",        abv:"6.5%", hops:["Columbus","Willamette","Centennial"],  aroma:"Earthy dank, citrus, floral — radical bittering + dry-hop finish", award:"GABF Gold · World's Must Taste Beer 2003"},
    {n:"Tangerine Wheat",    style:"American Wheat",      abv:"4.4%", hops:["Perle"],                              aroma:"Tangerine, citrus kick, classic wheat — party starter icon"},
    {n:"Revenant IPA",       style:"American IPA",        abv:"7.0%", hops:["Simcoe","Citra"],                     aroma:"Lively citrus, amber haze, tropical backbone — refreshing full-body"},
    {n:"Hazy IPA",           style:"New England IPA",     abv:"6.2%", hops:["Mosaic","Citra"],                     aroma:"Orange, grape, passion fruit, blueberry — silky gold haze"},
    {n:"Pilsner",            style:"German Pilsner",      abv:"4.8%", hops:["Tettnang","Hallertau"],               aroma:"Herbal, spicy, grassy noble hop — crisp and clean"},
    {n:"8-Ball Stout",       style:"American Stout",      abv:"5.8%", hops:["Magnum","Saaz"],                      aroma:"Roasted dark malt, coffee — deeply comforting", award:"LA County Fair Gold 2004, 2005"},
    {n:"Downtown Brown",     style:"Brown Ale",           abv:"4.8%", hops:["Saaz"],                              aroma:"Chocolate, caramel malt, mild Czech spice — the very first Lost Coast beer"},
    {n:"Sharkinator",        style:"Belgian Wit / Hopped",abv:"6.5%", hops:["Cascade","Crystal","Chinook","Citra"], aroma:"Citrus hop blast over Great White base — dry-hop upgrade"},
    {n:"Apricot Wheat",      style:"Fruit Wheat",         abv:"4.4%", hops:["Perle"],                              aroma:"Fresh apricot, soft wheat, crisp and aromatic"},
    {n:"Alleycat Amber",     style:"Amber Ale",           abv:"5.8%", hops:["Cascade"],                            aroma:"Caramel roast malt, floral citrus, sprightly Cascade"},
    {n:"Raspberry Brown",    style:"Brown Ale – Fruit",   abv:"4.8%", hops:["Saaz"],                              aroma:"Raspberry, chocolate malt, roasted sweetness"},
    {n:"Double IPA",         style:"Double IPA",          abv:"8.0%", hops:["Cascade","Centennial","Citra"],       aroma:"Citrus, grapefruit, pine — 80 IBU bitterness perfectly balanced"},
  ]},

  {id:"sierranevada", name:"Sierra Nevada Brewing", loc:"Chico, CA", region:"NorCal – Chico", col:"#5C8E6B",
   about:"Founded 1980 by Ken Grossman. The brewery that launched American craft beer with Cascade hops. Inventors of the Hop Torpedo. One of America's largest truly independent craft breweries. Widely distributed Bay Area.",
   beers:[
    {n:"Pale Ale",               style:"American Pale Ale",  abv:"5.6%", hops:["Cascade","Perle"],                  aroma:"Grapefruit, pine, floral — the beer that started the American craft revolution", award:"Craft beer Hall of Fame"},
    {n:"Torpedo Extra IPA",      style:"West Coast IPA",     abv:"7.2%", hops:["Magnum","Crystal","Citra"],          aroma:"Resinous pine, tropical citrus, complex dank — 100% Hop Torpedo whole-cone processed"},
    {n:"Celebration IPA",        style:"American IPA",       abv:"6.8%", hops:["Centennial","Cascade","Chinook"],    aroma:"Fresh-hop citrus, pine, floral — annual winter release since 1981", award:"American craft icon since 1981"},
    {n:"Hazy Little Thing",      style:"New England IPA",    abv:"6.7%", hops:["Citra","Galaxy","Mosaic"],           aroma:"Orange, pineapple, mango, passion fruit — silky smooth hazy flagship"},
    {n:"Juicy Little Thing",     style:"Hazy IPA",           abv:"6.7%", hops:["Citra","Galaxy","Mosaic"],           aroma:"Guava, mango, grapefruit — specialized yeast enhances fruity notes"},
    {n:"Tropical Little Thing",  style:"Hazy IPA (Seasonal)",abv:"6.7%", hops:["Galaxy","Azacca","Mosaic"],          aroma:"Mango, papaya, passion fruit — island escape, limited seasonal"},
    {n:"Big Little Thing DIPA",  style:"Imperial Hazy IPA",  abv:"9.5%", hops:["Citra","Mosaic","Galaxy"],           aroma:"Mango, grapefruit, tangerine — full malt body, maximum tropical intensity"},
    {n:"Hoptimum Triple IPA",    style:"Triple IPA",         abv:"10.4%",hops:["Simcoe","Columbus","Centennial","Magnum"], aroma:"Resinous pine, tropical citrus, complex dank — pinnacle whole-cone IPA"},
    {n:"Bigfoot Barleywine",     style:"American Barleywine",abv:"9.6%", hops:["Centennial","Cascade","Chinook"],    aroma:"Bittersweet malt, aggressive NW whole-cone hops, bold vintage"},
    {n:"PILS",                   style:"Craft Lager",        abv:"5.0%", hops:["Hallertau","Saaz"],                  aroma:"Crisp, clean, innovative — premium craft lager"},
    {n:"Narwhal Imperial Stout", style:"Imperial Stout",     abv:"10.7%",hops:["Magnum"],                            aroma:"Dark roast, chocolate, vanilla, coffee — 60 IBU winter beast"},
    {n:"Wild Little Thing",      style:"Sour Wheat",         abv:"5.5%", hops:["Hallertau"],                         aroma:"Guava, hibiscus, strawberry, light tartness — refreshing sour"},
    {n:"Summerfest",             style:"Munich Lager",       abv:"5.0%", hops:["Hallertau","Tettnang"],              aroma:"Clean malt, noble herb, crisp German lager — summer seasonal"},
    {n:"Dankful West Coast IPA", style:"West Coast IPA",     abv:"6.5%", hops:["Simcoe","Columbus","Centennial","Cascade","Idaho 7","Chinook","Crystal"], aroma:"7 hop varieties — resinous dank, tropical layers, max West Coast"},
  ]},

  {id:"standarddeviant", name:"Standard Deviant Brewing", loc:"San Francisco, CA", region:"San Francisco", col:"#B8785C",
   about:"Mission (14th St) + Dogpatch bayfront locations. 'Throwing fastballs — high quality, wide array.' Known for Kolsch, Nitro Stout, barrel-aged specials, saisons, and creative IPAs. Dog-friendly, live music, SF Beer Week collabs.",
   beers:[
    {n:"Kolsch",                       style:"Kölsch",           abv:"4.8%", hops:["Hallertau","Tettnang"],            aroma:"Soft floral, herbal grain, crisp — SF's most reliable session Kolsch"},
    {n:"Nitro Oatmeal Stout",          style:"Oatmeal Stout",    abv:"5.8%", hops:["Magnum","Hallertau"],              aroma:"Silky roast, oatmeal cream, chocolate, smooth nitrogen pour"},
    {n:"Bourbon Barrel Oatmeal Stout", style:"Barrel-Aged Stout",abv:"8.5%", hops:["Magnum"],                         aroma:"Bourbon oak, vanilla, roast — Bear Republic + Four Roses barrel blend"},
    {n:"Rosé Saison",                  style:"Barrel-Aged Saison",abv:"6.2%",hops:["Hallertau","Styrian Goldings"],    aroma:"Stone fruit, wine barrel, dry farmhouse, floral"},
    {n:"Horchata Cream Ale",           style:"Cream Ale",        abv:"5.0%", hops:["Hallertau"],                       aroma:"Cinnamon, vanilla, rice, creamy — Mexican horchata inspired"},
    {n:"Comet Pale Ale",               style:"American Pale Ale",abv:"5.3%", hops:["Comet"],                           aroma:"Grapefruit, pine, citrus — single-hop Comet showcase"},
    {n:"Rotating Hazy IPA",            style:"New England IPA",  abv:"6.5%", hops:["Citra","Mosaic"],                  aroma:"Tropical citrus, mango, lush haze — Mission taproom staple"},
    {n:"Hop On Muni IPA",              style:"American IPA (Collab)",abv:"6.5%",hops:["Cascade","Centennial","Citra"], aroma:"Citrus, floral — SFMTA × SFCFC × Standard Deviant 2025 collab"},
    {n:"Rotating Belgian",             style:"Belgian Tripel",   abv:"8.0%", hops:["Hallertau","Saaz"],                aroma:"Fruity ester, spice, banana-clove — Belgian rotation"},
    {n:"Rotating Sour / Wild",         style:"Sour / Wild Ale",  abv:"5.5%", hops:["Magnum"],                         aroma:"Rotating seasonal — brett funk, tartness, fruit"},
  ]},

  {id:"barebottle", name:"Barebottle Brewing", loc:"San Francisco, CA", region:"San Francisco", col:"#8EAEC8",
   about:"Bernal Heights SF brewery specializing in IPAs and sours. Large taproom with beer garden, games. Known for Small Wonder Dust pale, rotating hazys, and notable collabs (Almanac Simian Squad DIPA).",
   beers:[
    {n:"Small Wonder Dust",      style:"Hazy Pale Ale",      abv:"5.6%", hops:["Mosaic","El Dorado","Wai-iti"],       aroma:"Watermelon, peach, soft citrus — the most approachable Barebottle flagship"},
    {n:"Pour Resolution",        style:"Hazy IPA",           abv:"6.7%", hops:["Citra","Galaxy","Nectaron"],          aroma:"Tropical, citrus, stone fruit punch — SF hazy benchmark"},
    {n:"Rotating West Coast IPA",style:"West Coast IPA",     abv:"6.5%", hops:["Simcoe","Columbus","Cascade"],        aroma:"Pine, grapefruit, resinous — clean classic WC"},
    {n:"Simian Squad DIPA",      style:"Double IPA (Collab)",abv:"8.0%", hops:["Sabro","Citra"],                      aroma:"Coconut, lime, citrus, tropical — brewed with tamarind and spices", award:"Almanac Beer Co. collab"},
    {n:"Rotating Fruited Sour",  style:"Fruited Sour",       abv:"5.5%", hops:["Hallertau"],                         aroma:"Seasonal fruit, lactic tartness, bright acidity"},
    {n:"Session IPA",            style:"Session IPA",        abv:"4.2%", hops:["Cascade","Centennial","Citra"],       aroma:"Light citrus, hop-forward, crushable low-ABV"},
    {n:"Stout",                  style:"American Stout",     abv:"6.0%", hops:["Magnum"],                            aroma:"Roast, chocolate, clean dark malt — Bernal neighborhood staple"},
  ]},

  {id:"laughingmonk", name:"Laughing Monk Brewing", loc:"San Francisco, CA", region:"San Francisco", col:"#9B7BA8",
   about:"SF Bayview brewery with a Belgian heart and a punk soul. Brewer 'Sister Jen' leads creative direction. Full event calendar — trivia, art nights, dog-friendly. Range: witbiers to barrel sours to DIPAs.",
   beers:[
    {n:"Evening Vespers",         style:"Belgian Dubbel",    abv:"7.5%", hops:["Hallertau","Saaz"],                   aroma:"Dark fruit, clove, dried plum, subtle herbal — warm contemplative dark"},
    {n:"Unholy Ghost Tripel",     style:"Belgian Tripel",    abv:"9.0%", hops:["Hallertau","Styrian Goldings"],       aroma:"Fruity ester, spice, warming malt, banana-clove yeast character"},
    {n:"White Ale",               style:"Belgian Witbier",   abv:"4.8%", hops:["Hallertau"],                         aroma:"Orange peel, coriander, soft wheat, cloudy summer"},
    {n:"Session Sour",            style:"Fruited Sour",      abv:"4.8%", hops:["Hallertau"],                         aroma:"Bright raspberry, citrus tartness, low ABV refreshment"},
    {n:"Rotating Hazy IPA",       style:"New England IPA",   abv:"6.7%", hops:["Citra","Mosaic"],                    aroma:"Tropical citrus, mango, soft floral — Belgian yeast ester twist"},
    {n:"Barrel-Aged Wild Ale",    style:"Wild / Barrel Sour",abv:"6.5%", hops:["Saaz"],                             aroma:"Brett funk, oak, lactic tartness — complex and elevated"},
    {n:"Rotating DIPA",           style:"Double IPA",        abv:"8.2%", hops:["Citra","Centennial","Columbus"],      aroma:"Citrus, tropical, resinous — Sister Jen's rotating big-beer statement"},
  ]},

  {id:"almanac", name:"Almanac Beer Co.", loc:"Alameda, CA", region:"East Bay", col:"#D4887C",
   about:"Farm-to-Barrel pioneers, founded 2010. 1940s naval hangar in Alameda with 250+ oak barrels and foudres. Best known for barrel-aged sours with NorCal farm fruit + acclaimed hazy IPAs. Wine-adjacent pricing and positioning.",
   beers:[
    {n:"LOVE DIPA",                 style:"Double IPA",           abv:"8.5%", hops:["Mosaic","Citra","Sabro"],              aroma:"Mango, cantaloupe, citrus, coconut — DDH pillowy mouthfeel"},
    {n:"LOUD! DIPA",                style:"Double IPA",           abv:"9.0%", hops:["Mosaic","Denali"],                     aroma:"Mango, papaya, pineapple — obnoxiously DDH, uses its 'outside voice'"},
    {n:"Bay of Plenty",             style:"New England IPA",      abv:"6.1%", hops:["Motueka"],                             aroma:"Lime, tropical, floral — brewed to support Alameda Food Bank"},
    {n:"Bunny Hill Hazy",           style:"Hazy IPA",             abv:"6.5%", hops:["Cashmere","Simcoe"],                   aroma:"Pillowy mouthfeel, coconut, soft tropical, light pine"},
    {n:"Basecamp Imperial Pilsner", style:"Imperial Pilsner",     abv:"6.5%", hops:["Simcoe","Centennial"],                 aroma:"Crisp clean lager backbone + West Coast hop aroma"},
    {n:"Kölsch",                    style:"Kölsch",               abv:"4.8%", hops:["Hallertau Blanc"],                     aroma:"White wine, grapefruit, crisp — Prost!"},
    {n:"Dogpatch Sour",             style:"Wild Ale – Flanders",  abv:"6.1%", hops:["Magnum"],                             aroma:"Rainier cherries, SF sourdough, brett funk, wild yeasts — the flagship", award:"Barrel program flagship"},
    {n:"Citra Sour",                style:"Sour Blonde",          abv:"5.5%", hops:["Citra"],                               aroma:"Grapefruit, melon, passion fruit — single-hop sour meets brett"},
    {n:"Berry Sournova",            style:"Fruited Sour",         abv:"5.3%", hops:["Magnum"],                             aroma:"Blueberry, strawberry, vanilla, oak — astronomically fruity"},
    {n:"Cherry Vanilla Dogpatch",   style:"Barrel Wild Ale",      abv:"6.5%", hops:["Magnum"],                             aroma:"Montmorency cherries, vanilla, brett, oak — elevated flagship"},
    {n:"Farm to Barrel Apricot",    style:"Wild Ale – Barrel",    abv:"6.5%", hops:["El Dorado","Azacca"],                 aroma:"San Joaquin Valley apricot, brett tropical, stone fruit layers"},
    {n:"Emperor Norton Tripel",     style:"Belgian Tripel Fruited",abv:"8.5%",hops:["Citra","Hallertau Blanc"],             aroma:"Apricot, lychee, lemongrass, tripel warmth — SF eccentric eccentric"},
    {n:"Passion Project Farmhouse", style:"Sour Farmhouse Barrel",abv:"5.8%", hops:["Citra","Mosaic"],                     aroma:"Passion fruit, coriander, ginger, cedar — Pichia Kluyveri yeast"},
    {n:"Mariposa Plum Sour",        style:"Wild Ale – Barrel",    abv:"5.5%", hops:["El Dorado","Azacca"],                 aroma:"Mariposa plum, brett funk, stone fruit — Blossom Bluff Orchards"},
    {n:"Purple Paisley Sour",       style:"Sour Farmhouse",       abv:"5.5%", hops:["Magnum"],                            aroma:"Plums, blackberries, black currants — Prince-inspired"},
  ]},

  {id:"magnolia", name:"Magnolia Brewing", loc:"San Francisco, CA", region:"San Francisco", col:"#8A6B3C",
   about:"SF icon since 1997. Haight-Ashbury original + Dogpatch production. Went corporate, now re-independent under local ownership (Dec 2024). Brewmaster Jon Taylor back. Proving Ground IPA + Kalifornia Kolsch returning as flagships.",
   beers:[
    {n:"Proving Ground IPA",   style:"West Coast IPA",     abv:"6.9%", hops:["Simcoe","Columbus","Cascade"],    aroma:"Pine resin, citrus, earthy — piney English-influenced WC IPA, Haight institution"},
    {n:"Kalifornia Kolsch",    style:"Kölsch",             abv:"4.8%", hops:["Hallertau","Tettnang"],           aroma:"Soft floral, herbal grain, crisp — piped from basement brewery upstairs since 1997"},
    {n:"Cloud Cover Hazy IPA", style:"Hazy IPA",           abv:"6.5%", hops:["Citra","Amarillo","Strata"],      aroma:"Bright orange, grapefruit, sticky pine, dankness, tropical — 'cheat code' hop blend"},
    {n:"Promised Land Imperial IPA",style:"Imperial IPA",  abv:"8.5%", hops:["Simcoe","Columbus","Centennial"], aroma:"Bold assertive American hops — 100+ lbs per 20bbl batch"},
    {n:"Strata DIPA",          style:"Double IPA",         abv:"8.2%", hops:["Strata","Citra"],                 aroma:"Dank and fruity — 5+ lbs/barrel, passion fruit, cannabis-adjacent"},
    {n:"Hazy DIPA (rotating)", style:"Double IPA",         abv:"8.5%", hops:["Nectaron","Talus","Sabro","Mosaic","Citra","El Dorado"], aroma:"Nectarine, coconut, pineapple, apricot, lemon, rose — maximum tropical"},
    {n:"Cole St Porter",       style:"American Porter",    abv:"5.5%", hops:["Magnum","Hallertau"],             aroma:"Chocolate wheat, rich malt complexity, subtle sweetness"},
    {n:"Low Tide English IPA", style:"English IPA",        abv:"6.0%", hops:["Fuggles","Goldings"],             aroma:"Earthy, biscuit malt, traditional English hop character"},
    {n:"Haightoberfest",       style:"Festbier",           abv:"5.8%", hops:["Hallertau","Tettnang"],           aroma:"Toasted malt, clean lager, noble herb — seasonal Haight tradition"},
    {n:"Wet Hop IPA",          style:"Fresh Hop IPA",      abv:"6.7%", hops:["Cascade","Simcoe"],              aroma:"Fresh green hop, floral, pine — Overkill Road Wet Hop, fall release"},
    {n:"Cold IPA",             style:"Cold IPA",           abv:"6.5%", hops:["Citra","Mosaic","Strata"],        aroma:"Steam beer ferment + trendy hops — crisp body, aggressive tropical aromatics"},
    {n:"Warriors Lager",       style:"American Lager (Collab)",abv:"4.5%",hops:["Hallertau","Cascade"],         aroma:"Easy drinking, swish of German + American hop aroma — Chase Center pourer"},
  ]},

  {id:"ghosttown", name:"Ghost Town Brewing", loc:"Oakland, CA", region:"East Bay", col:"#5A3A6B",
   about:"West Oakland IPA institution with goth aesthetic and metal DNA. 2 locations (Adeline + MacArthur). SMASH series, Hammer Smashed single-hops, tons of collabs (Cellarmaker, Almanac, Fort George). West Coast and Hazy IPA specialists.",
   beers:[
    {n:"Inhume West Coast IPA",  style:"West Coast IPA",   abv:"7.0%", hops:["Citra","Simcoe","Centennial"],    aroma:"Grapefruit, melon, pine — clean, clear, competitively bitter"},
    {n:"Lecherous Haze",         style:"Hazy IPA",         abv:"6.5%", hops:["Citra","Mosaic"],                 aroma:"Mango, guava, blueberry — dangerously heavy and tropical"},
    {n:"Mordant IPA",            style:"American IPA",     abv:"6.7%", hops:["Strata","Mosaic"],               aroma:"Summer melons, peaches, strawberries, citrus — corrosive spirit"},
    {n:"Nose Goblin Imperial WC",style:"Imperial IPA",     abv:"9.2%", hops:["Nelson Sauvin","Mosaic","Strata"],aroma:"Blueberry, mandarin, wine-like dankness — 'most brazen West Coast masterpiece'"},
    {n:"Hymn of Nelson",         style:"Single-Hop IPA",   abv:"6.8%", hops:["Nelson Sauvin"],                  aroma:"Sauvignon Blanc grapes, passion fruit, lychee, pine forests — 100% Nelson"},
    {n:"Sacrificial Oat Hazy",   style:"Hazy IPA",         abv:"6.66%",hops:["Citra","Mosaic","Simcoe"],        aroma:"Pineapple, passion fruit, citrus — West Coast haze hybrid"},
    {n:"Demise DIPA",            style:"Double IPA",       abv:"8.6%", hops:["Mosaic","Simcoe"],               aroma:"Grapefruit, raspberry, passion fruit, resinous — smothered in hops"},
    {n:"Geisterfaust Pilsner",   style:"German Pilsner",   abv:"5.5%", hops:["Hallertau"],                     aroma:"Sweet toasty malt, spicy floral hop — 2021 CA Craft Beer Cup Gold", award:"2021 CA Craft Beer Cup Gold"},
    {n:"Locust WC IPA",          style:"West Coast IPA",   abv:"6.8%", hops:["Citra","Mosaic","Ekuanot"],       aroma:"Lime, papaya, citrus swarm"},
    {n:"Hammer Smashed Simcoe",  style:"Single-Malt Single-Hop", abv:"6.5%",hops:["Simcoe"],                   aroma:"Pure Simcoe — pine, passion fruit, earthy citrus — SMASH series"},
    {n:"Hammer Smashed Galaxy",  style:"Single-Malt Single-Hop", abv:"6.5%",hops:["Galaxy"],                   aroma:"Pure Galaxy — passion fruit, peach, citrus"},
    {n:"Spirit in Black (Collab w/ Cellarmaker)",style:"West Coast IPA",abv:"7.0%",hops:["Citra","Mosaic","Galaxy","Cascade"], aroma:"Dank pine, grapefruit, tropical — 'quintessential modern West Coast IPA'", award:"Ghost Town × Cellarmaker collab"},
    {n:"Mosaic Architect",       style:"Single-Hop WCIPA", abv:"6.5%", hops:["Mosaic"],                        aroma:"Berries, melon, tropical fruit, pine, juicy mango — Admiral Maltings Pils malt"},
    {n:"American Lager",         style:"American Lager",   abv:"4.5%", hops:["Saaz","Hallertau"],              aroma:"Clean, crisp, sessionable palate reset"},
  ]},

  {id:"russianriver", name:"Russian River Brewing", loc:"Santa Rosa / Windsor, CA", region:"Sonoma", col:"#C8A97E",
   about:"Founded 1997. Double cult status — Pliny the Elder and Younger. Blind Pig IPA launched West Coast IPA as a style. Sonoma's most decorated brewery. Windsor production facility opened 2019.",
   beers:[
    {n:"Blind Pig IPA",       style:"West Coast IPA",      abv:"6.1%", hops:["Simcoe","Columbus","Centennial"],  aroma:"Pine resin, citrus, earthy — one of the original West Coast IPAs"},
    {n:"Pliny the Elder",     style:"Double IPA",          abv:"8.0%", hops:["Simcoe","Columbus","Centennial","Cascade"], aroma:"Resinous pine, tropical citrus, complex dank — legendary DIPA", award:"Multiple top-rated DIPA worldwide"},
    {n:"Pliny the Younger",   style:"Triple IPA (Annual)", abv:"11.0%",hops:["Simcoe","Columbus","Centennial","Cascade","Chinook"], aroma:"Intense pine, tropical, layered — February cult release", award:"Annual February release — lines around the block"},
    {n:"Damnation",           style:"Belgian Golden Strong",abv:"7.75%",hops:["Hallertau","Styrian Goldings"],   aroma:"Fruity, spicy, dry — Belgian character"},
    {n:"Supplication",        style:"Wild Ale – Pinot Barrel",abv:"7.0%",hops:["Hallertau"],                    aroma:"Sour cherries, brett, Pinot Noir barrel — Sonoma wine synergy"},
    {n:"Redemption Blonde",   style:"Blonde Ale",          abv:"6.0%", hops:["Hallertau","Centennial"],         aroma:"Soft citrus, floral, gateway sessionable"},
  ]},

  {id:"lagunitas", name:"Lagunitas Brewing", loc:"Petaluma, CA", region:"Sonoma", col:"#D4C85C",
   about:"Founded 1993 Petaluma. Cannabis-culture friendly — born from counterculture. National distribution. IPA, Little Sumpin', and Pils are cornerstones. Annual Cannabis-adjacent releases.",
   beers:[
    {n:"Lagunitas IPA",           style:"American IPA",      abv:"6.2%", hops:["Cascade","Centennial","Columbus","Chinook"], aroma:"Citrus, pine, earthy backbone, floral — the Petaluma standard", award:"National distribution icon"},
    {n:"Little Sumpin' Sumpin'",  style:"American Wheat IPA",abv:"7.5%", hops:["Cascade","Centennial","Simcoe","Amarillo"],  aroma:"Tropical, citrus, light wheat haze — flagship hybrid"},
    {n:"Pils",                    style:"Czech-Style Pilsner",abv:"6.2%", hops:["Saaz","Hallertau"],                         aroma:"Noble herbal, floral, clean crisp — dry-hopped Czech interpretation"},
    {n:"Daytime IPA",             style:"Session IPA",       abv:"4.0%", hops:["Cascade","Centennial"],                      aroma:"Light citrus, clean, full hop character — low ABV flagship"},
    {n:"12th of Never",           style:"American Pale Ale", abv:"5.3%", hops:["Cascade","Centennial"],                      aroma:"Citrus, floral, balanced malt — everyday sessionable"},
    {n:"Censored Rich Copper Ale",style:"Amber Ale",         abv:"6.7%", hops:["Columbus","Cascade"],                        aroma:"Caramel malt, citrus hop, rich copper body"},
    {n:"Aunt Sally Sour Blonde",  style:"Sour Blonde",       abv:"4.0%", hops:["Hallertau"],                                 aroma:"Light tartness, refreshing wheat, subtle floral"},
    {n:"A Little Sumpin' Wild",   style:"Wild Farmhouse Ale",abv:"8.2%", hops:["Simcoe","Cascade"],                          aroma:"Funky brett, citrus, farmhouse complexity — Sumpin' goes wild"},
  ]},

  {id:"bearrepublic", name:"Bear Republic Brewing", loc:"Healdsburg, CA", region:"Sonoma", col:"#B87840",
   about:"Founded 1995 Healdsburg. Award-winning West Coast IPA specialists. Family-owned, Dry Creek Valley ethos. Racer 5 is the Sonoma institution for WC IPA.",
   beers:[
    {n:"Racer 5 IPA",         style:"West Coast IPA",      abv:"7.0%", hops:["Cascade","Columbus","Centennial","Chinook"], aroma:"Caramel malt warmth, citrus, earthy pine — Sonoma classic", award:"GABF Gold · WBC Gold"},
    {n:"Racer X DIPA",        style:"Double IPA",          abv:"8.3%", hops:["Columbus","Simcoe","Cascade"],   aroma:"Resinous pine, dank tropical, intense WC — Racer 5's bigger sibling"},
    {n:"Red Rocket Ale",      style:"Scottish-Style Ale",  abv:"6.8%", hops:["Columbus","Cascade"],            aroma:"Caramel, toffee, floral citrus — malt-forward comfort"},
    {n:"Hop Rod Rye",         style:"Imperial Red Rye IPA",abv:"8.0%", hops:["Columbus","Centennial","Cascade"],aroma:"Spicy rye malt, piney citrus, big hop character", award:"GABF Gold"},
    {n:"Apex IPA",            style:"West Coast IPA",      abv:"7.0%", hops:["Simcoe","Citra","Amarillo"],     aroma:"Citrus-forward, tropical, modern WC clarity"},
    {n:"Big Bear Black Stout",style:"Imperial Stout",      abv:"9.3%", hops:["Magnum"],                       aroma:"Dark roast, chocolate, coffee, complex malt"},
  ]},

  {id:"cellarmaker", name:"Cellarmaker Brewing", loc:"San Francisco, CA", region:"San Francisco", col:"#8EAE68",
   about:"Arguably SF's best brewery. SoMa taproom + House of Pizza (HOP). Small-batch, constantly rotating, cult release day lines. Aggressive DDH hazys and West Coast specialists.",
   beers:[
    {n:"Honeys & Homies",     style:"New England IPA",    abv:"7.5%", hops:["Citra","Mosaic","Sabro"],       aroma:"Tropical citrus, coconut, mango, stone fruit — signature NEIPA"},
    {n:"Smoke & Mirrors",     style:"Hazy DIPA",          abv:"8.5%", hops:["Citra","Strata","Galaxy"],      aroma:"Passion fruit, dank resin, citrus zest — flagship hazy DIPA"},
    {n:"Coffee & Cigarettes", style:"Imperial Brown Ale", abv:"8.5%", hops:["Magnum"],                      aroma:"Coffee, chocolate, rich malt — cult dark beer"},
    {n:"Rotating DIPA",       style:"Double IPA",         abv:"8.0–9.0%",hops:["Citra","Mosaic","Galaxy","Strata"], aroma:"Weekly rotation — the reason people line up on release day"},
    {n:"Pilsner",             style:"Pilsner",            abv:"5.0%", hops:["Saaz","Hallertau"],             aroma:"Crisp, clean, noble hop — the palate reset between hazys"},
  ]},

  {id:"fieldwork", name:"Fieldwork Brewing", loc:"Berkeley / San Rafael / multiple, CA", region:"East Bay", col:"#6BAE8E",
   about:"All-rotating tap list — nothing permanent. Multi-location (Berkeley, San Rafael, Napa, Sacramento). Known for hazys, lagers, and fruit-forward sours. Always different, always fresh.",
   beers:[
    {n:"Rotating Hazy IPA",  style:"New England IPA",    abv:"6.5%", hops:["Citra","Galaxy","Mosaic"],      aroma:"Tropical, passion fruit, citrus — always different, always fresh"},
    {n:"Rotating DIPA",      style:"Double IPA",         abv:"8.0%", hops:["Citra","Mosaic","Strata"],      aroma:"Dank tropical, resinous citrus — all-hazy all-rotating"},
    {n:"Rotating Lager",     style:"Craft Lager",        abv:"4.8%", hops:["Hallertau","Saaz"],            aroma:"Clean, crisp, noble herb — approachable everyday"},
    {n:"Rotating Pilsner",   style:"German Pilsner",     abv:"5.0%", hops:["Saaz","Tettnang"],             aroma:"Noble herbal, light floral, elegant"},
    {n:"Rotating Fruited Sour",style:"Fruited Sour",     abv:"5.5%", hops:["Hallertau"],                   aroma:"Seasonal local NorCal fruit, lactic brightness"},
  ]},

  {id:"fortpoint", name:"Fort Point Beer Co.", loc:"San Francisco, CA", region:"San Francisco", col:"#D4A843",
   about:"Modern SF brewery, Golden Gate Bridge neighborhood roots. Multiple locations: Ferry Building, Hayes Valley, Golden Gate Park, Chase Center. Clean, accessible, design-forward.",
   beers:[
    {n:"KSA Kölsch",           style:"Kölsch",           abv:"4.6%", hops:["Hallertau","Tettnang"],         aroma:"Subtle floral, soft herbal, clean grain — most popular SF Kolsch"},
    {n:"Manzanita West Coast", style:"West Coast IPA",   abv:"6.5%", hops:["Simcoe","Chinook","Centennial"],aroma:"Pine resin, grapefruit, earthy backbone"},
    {n:"Villager Wheat",       style:"American Wheat",   abv:"4.6%", hops:["Cascade","Amarillo"],           aroma:"Citrus peel, soft floral, orange zest"},
    {n:"Westfalia Hefeweizen", style:"Hefeweizen",       abv:"4.6%", hops:["Hallertau"],                   aroma:"Banana ester, clove, soft wheat"},
    {n:"Park IPA",             style:"American IPA",     abv:"6.2%", hops:["Cascade","Centennial","Columbus"],aroma:"Citrus, floral, light pine — Golden Gate Park flagship"},
    {n:"Manzanita Session",    style:"Session IPA",      abv:"4.0%", hops:["Cascade","Centennial"],         aroma:"Light citrus, clean, low-ABV everyday"},
  ]},

  {id:"moonlight", name:"Moonlight Brewing", loc:"Santa Rosa, CA", region:"Sonoma", col:"#4A7C59",
   about:"Brian Hunt's legendary nano-operation. Almost entirely draft-only, tiny distribution. Death & Taxes is one of the most awarded beers in NorCal. Ultra-rare; if you see it, order it.",
   beers:[
    {n:"Death & Taxes",        style:"Black Lager",      abv:"4.9%", hops:["Saaz","Magnum"],               aroma:"Dark roast, restrained bitter, clean finish, subtle herbal — landmark", award:"Multiple GABF medals"},
    {n:"Reality Check",        style:"California Pale",  abv:"4.8%", hops:["Hallertau","Cascade"],         aroma:"Soft citrus, clean grain, refreshing"},
    {n:"Twist of Fate Bitter", style:"Extra Special Bitter",abv:"5.8%",hops:["Cascade","Centennial"],      aroma:"Citrus floral, malt backbone, British-influenced"},
  ]},

  {id:"ironox", name:"Iron Ox Brewing", loc:"Santa Rosa, CA", region:"Sonoma", col:"#5C8E6B",
   about:"German-influenced Santa Rosa brewery. Sonoma Coast Pils is a benchmark for terpene palate cleansing. Vegan-friendly. Precise lager work and clean ales.",
   beers:[
    {n:"Sonoma Coast Pils",   style:"German Pilsner",   abv:"4.8%", hops:["Hallertau","Tettnang","Saaz"],  aroma:"Clean herbal, subtle floral, crisp noble hop — top palate reset"},
    {n:"Helles",              style:"Munich Helles",    abv:"4.8%", hops:["Hallertau"],                   aroma:"Soft malt, mild floral, easy-drinking"},
    {n:"Rotating IPA",        style:"New England IPA",  abv:"6.5%", hops:["Citra","Mosaic"],              aroma:"Rotating tropical citrus hazy"},
  ]},

  {id:"parliament", name:"Parliament Brewing", loc:"Rohnert Park, CA", region:"Sonoma", col:"#D4887C",
   about:"Rohnert Park Sonoma brewery. Birds in Paradise is the gold-standard Limonene pairing for tropical cannabis strains — mirrors Limonene/Linalool pharmacology perfectly.",
   beers:[
    {n:"Birds in Paradise",    style:"Sour – Passionfruit Orange Guava",abv:"6.4%",hops:["Hallertau"], aroma:"Passionfruit, orange, guava, tropical acid — top Limonene strain pair"},
    {n:"Rotating Fruited Sour",style:"Fruited Sour",    abv:"5.5%", hops:["Hallertau"],               aroma:"Seasonal fruit, bright tartness"},
    {n:"Rotating IPA",         style:"American IPA",    abv:"6.5%", hops:["Cascade","Centennial"],    aroma:"Citrus, floral, clean"},
  ]},

  {id:"almanacmoon", name:"Almanac × Moonraker", loc:"Alameda / Auburn, CA", region:"East Bay", col:"#D4887C",
   about:"Notable collab between Almanac and Moonraker Brewing. Time Bender Hazy DIPA is a standout Bay Area collab release.",
   beers:[
    {n:"Time Bender Hazy DIPA (Collab)",style:"Double IPA",abv:"8.0%",hops:["Mosaic","Cashmere","Centennial","El Dorado"],aroma:"Tropical, coconut, stone fruit, DDH complexity — Moonraker collab"},
  ]},

  {id:"athletic", name:"Athletic Brewing", loc:"Milford, CT — Bay Area distributed", region:"Non-Alcoholic", col:"#9B7BA8",
   about:"The NA craft beer pioneer. Critical for high-myrcene cannabis sessions — maps terpene profiles without alcohol interference. Wide Bay Area distribution. Run Wild is the gold standard NA IPA.",
   beers:[
    {n:"Run Wild IPA",         style:"NA West Coast IPA",  abv:"0.5%", hops:["Citra","Centennial","Cascade"],   aroma:"Citrus, light pine, clean hop — flagship NA, terpene-forward"},
    {n:"Upside Dawn Golden",   style:"NA Golden Ale",      abv:"0.5%", hops:["Hallertau","Cascade"],            aroma:"Soft citrus, clean grain — most approachable NA"},
    {n:"Free Wave DIPA",       style:"NA Double IPA",      abv:"0.5%", hops:["Citra","Mosaic","Galaxy"],        aroma:"Tropical, passion fruit, intense hop — full DIPA experience, zero ABV"},
    {n:"Lite",                 style:"NA Light",           abv:"0.5%", hops:["Hallertau"],                     aroma:"Clean, light, crisp — most neutral palate reset available"},
  ]},
];

// Flatten all beers
const ALL_BEERS = [];
BREWERIES.forEach(b => b.beers.forEach(beer => {
  const hopsClean = (beer.hops||[]).filter(h=>HOP[h]);
  const terpenes = deriveT(hopsClean);
  ALL_BEERS.push({ ...beer, breweryId:b.id, breweryName:b.name, breweryCol:b.col, region:b.region, loc:b.loc, dominant:terpenes.slice(0,3), secondary:terpenes.slice(3,6) });
}));

const ALL_REGIONS = [...new Set(BREWERIES.map(b=>b.region))];
const STYLE_FILTERS = ["Hazy IPA","West Coast IPA","DIPA","Pilsner/Lager","Wheat/Hefe","Sour/Wild","Stout/Dark","Belgian","Pale Ale","Session/Kolsch","NA"];
const matchStyle = (beer, f) => {
  const s = beer.style.toLowerCase();
  if (f==="Hazy IPA")       return s.includes("new england")||s.includes("hazy");
  if (f==="West Coast IPA") return s.includes("west coast")||(s.includes("ipa")&&!s.includes("new england")&&!s.includes("hazy")&&!s.includes("double")&&!s.includes("triple")&&!s.includes("imperial"));
  if (f==="DIPA")           return s.includes("double")||s.includes("triple")||s.includes("imperial ipa")||s.includes("dipa");
  if (f==="Pilsner/Lager")  return ["pilsner","lager","pils","festbier","märzen","helles"].some(x=>s.includes(x));
  if (f==="Wheat/Hefe")     return ["wheat","hefeweizen","witbier"].some(x=>s.includes(x));
  if (f==="Sour/Wild")      return ["sour","wild","farmhouse","gose"].some(x=>s.includes(x));
  if (f==="Stout/Dark")     return ["stout","porter","barleywine","brown","black lager","dubbel"].some(x=>s.includes(x));
  if (f==="Belgian")        return s.includes("belgian")||s.includes("tripel")||s.includes("dubbel")||s.includes("witbier");
  if (f==="Pale Ale")       return s.includes("pale ale")&&!s.includes("ipa");
  if (f==="Session/Kolsch") return s.includes("session")||s.includes("kölsch")||s.includes("kolsch")||parseFloat(beer.abv)<=4.8;
  if (f==="NA")             return parseFloat(beer.abv)<=0.5;
  return true;
};

function Pill({name,size=10}) {
  const c = TC[name]||"#888";
  return <span style={{display:"inline-block",padding:"2px 8px",borderRadius:20,fontSize:size,
    fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.04em",margin:"2px",
    border:`1px solid ${c}55`,color:c,background:`${c}11`}}>{name}</span>;
}

function BeerRow({beer, expanded, onToggle}) {
  return (
    <div onClick={onToggle} style={{background:expanded?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.02)",
      border:`1px solid ${expanded?"rgba(232,224,208,0.18)":"rgba(232,224,208,0.06)"}`,
      borderLeft:`3px solid ${beer.breweryCol||"#555"}`,borderRadius:4,
      padding:"11px 14px",marginBottom:6,cursor:"pointer",transition:"all 0.2s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:6}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,letterSpacing:"0.14em",textTransform:"uppercase",color:"#3A3028",marginBottom:2}}>
            <span style={{display:"inline-block",width:5,height:5,borderRadius:"50%",background:beer.breweryCol,marginRight:5,verticalAlign:"middle"}}/>
            {beer.breweryName}
          </div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:"#F0E8D8",lineHeight:1.25,marginBottom:1}}>{beer.n}</div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#5A5040"}}>{beer.style} · {beer.abv}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",flexShrink:0,gap:2}}>
          {beer.dominant.slice(0,2).map(t=><Pill key={t} name={t}/>)}
        </div>
      </div>
      {expanded && (
        <div style={{marginTop:12,paddingTop:10,borderTop:"1px solid rgba(232,224,208,0.07)"}}>
          <div style={{marginBottom:9}}>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,letterSpacing:"0.14em",textTransform:"uppercase",color:"#3A3028",marginBottom:4}}>Aroma Profile</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#9A9080",lineHeight:1.5}}>{beer.aroma}</div>
          </div>
          <div style={{marginBottom:9}}>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,letterSpacing:"0.14em",textTransform:"uppercase",color:"#3A3028",marginBottom:4}}>Terpene Profile (from hops)</div>
            <div>{beer.dominant.map(t=><Pill key={t} name={t} size={11}/>)}</div>
            {beer.secondary.length>0&&<div style={{marginTop:3,opacity:0.5}}>{beer.secondary.map(t=><Pill key={t} name={t} size={10}/>)}</div>}
          </div>
          {(beer.hops||[]).filter(h=>h&&!h.startsWith("—")).length>0&&(
            <div style={{marginBottom:8}}>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,letterSpacing:"0.14em",textTransform:"uppercase",color:"#3A3028",marginBottom:4}}>Hop Varieties</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {beer.hops.filter(h=>h&&!h.startsWith("—")).map(h=>(
                  <span key={h} style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,padding:"2px 8px",borderRadius:2,border:"1px solid rgba(232,224,208,0.1)",color:"#7A7060",background:"rgba(255,255,255,0.02)"}}>{h}</span>
                ))}
              </div>
            </div>
          )}
          {beer.award&&<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"#C8A050",marginTop:4}}>🏅 {beer.award}</div>}
        </div>
      )}
    </div>
  );
}

function BrewerySection({brewery,sq,fStyle,fTerpene,expandedId,setExpandedId}) {
  const hopsT = h => HOP[h] ? deriveT([h]) : [];
  const visible = brewery.beers.filter(beer => {
    const tAll = deriveT((beer.hops||[]).filter(h=>HOP[h]));
    if (fTerpene && !tAll.includes(fTerpene)) return false;
    if (fStyle && !matchStyle(beer, fStyle)) return false;
    if (sq && !beer.n.toLowerCase().includes(sq) && !beer.aroma.toLowerCase().includes(sq) && !(beer.hops||[]).some(h=>h.toLowerCase().includes(sq)) && !tAll.some(t=>t.toLowerCase().includes(sq))) return false;
    return true;
  });
  if (!visible.length) return null;
  return (
    <div style={{marginBottom:26}}>
      <div style={{borderBottom:`1px solid ${brewery.col}33`,paddingBottom:7,marginBottom:9,display:"flex",gap:8,alignItems:"baseline"}}>
        <span style={{display:"inline-block",width:8,height:8,borderRadius:"50%",background:brewery.col,flexShrink:0}}/>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:brewery.col,lineHeight:1.2}}>{brewery.name}</div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"#4A4035"}}>{brewery.loc} · {brewery.region} · {brewery.beers.length} beers cataloged</div>
        </div>
      </div>
      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#4A4035",lineHeight:1.6,marginBottom:9}}>{brewery.about}</div>
      {visible.map(beer=>{
        const tAll = deriveT((beer.hops||[]).filter(h=>HOP[h]));
        const bId = `${brewery.id}__${beer.n}`;
        return <BeerRow key={bId} beer={{...beer,breweryId:brewery.id,breweryName:brewery.name,breweryCol:brewery.col,region:brewery.region,dominant:tAll.slice(0,3),secondary:tAll.slice(3,6)}} expanded={expandedId===bId} onToggle={()=>setExpandedId(expandedId===bId?null:bId)}/>;
      })}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("brewery");
  const [sq, setSq] = useState("");
  const [fRegion, setFRegion] = useState(null);
  const [fStyle, setFStyle] = useState(null);
  const [fTerpene, setFTerpene] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const sqL = sq.toLowerCase();
  const totalBeers = BREWERIES.reduce((s,b)=>s+b.beers.length,0);

  const chip = (active, color) => ({
    fontFamily:"'DM Sans',sans-serif",fontSize:10,padding:"5px 11px",borderRadius:3,cursor:"pointer",
    border:`1px solid ${active?(color||"rgba(232,224,208,0.4)"):"rgba(232,224,208,0.08)"}`,
    background:active?(color?`${color}18`:"rgba(232,224,208,0.09)"):"none",
    color:active?(color||"#E8E0D0"):"#5A5040",letterSpacing:"0.08em",whiteSpace:"nowrap",flexShrink:0,
  });

  const flatFiltered = useMemo(()=>ALL_BEERS.filter(b=>{
    if (fRegion && b.region!==fRegion) return false;
    if (fTerpene && !b.dominant.includes(fTerpene)&&!b.secondary.includes(fTerpene)) return false;
    if (fStyle && !matchStyle(b, fStyle)) return false;
    if (sqL && !b.n.toLowerCase().includes(sqL)&&!b.breweryName.toLowerCase().includes(sqL)&&!b.aroma.toLowerCase().includes(sqL)&&!(b.hops||[]).some(h=>h.toLowerCase().includes(sqL))&&!b.dominant.some(t=>t.toLowerCase().includes(sqL))) return false;
    return true;
  }),[fRegion,fTerpene,fStyle,sqL]);

  const breweriesFiltered = BREWERIES.filter(b=>!fRegion||b.region===fRegion);

  return (
    <div style={{minHeight:"100vh",background:"#09090B",color:"#E8E0D0",maxWidth:520,margin:"0 auto"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{display:none}input::placeholder{color:#3A3028}input{outline:none}`}</style>

      <div style={{padding:"30px 20px 14px",borderBottom:"1px solid rgba(232,224,208,0.06)"}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,letterSpacing:"0.22em",textTransform:"uppercase",color:"#3A3028",marginBottom:7}}>Vibe Curator · Beer Terpene Database v3.0</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,color:"#F0E8D8",lineHeight:1.1,marginBottom:4}}>Bay Area Brewery Catalog</h1>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#4A4035"}}>{totalBeers} beers · {BREWERIES.length} breweries · {Object.keys(HOP).length} hop varieties mapped</p>
      </div>

      <div style={{display:"flex",borderBottom:"1px solid rgba(232,224,208,0.06)"}}>
        {[{id:"brewery",l:"By Brewery"},{id:"flat",l:"All Beers"}].map(v=>(
          <button key={v.id} onClick={()=>setView(v.id)} style={{flex:1,padding:"11px",background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:view===v.id?"#E8E0D0":"#4A4035",borderBottom:`2px solid ${view===v.id?"rgba(232,224,208,0.35)":"transparent"}`}}>{v.l}</button>
        ))}
      </div>

      <div style={{padding:"10px 20px",borderBottom:"1px solid rgba(232,224,208,0.06)"}}>
        <input value={sq} onChange={e=>setSq(e.target.value)} placeholder="Search brewery, beer, hop, aroma, terpene…"
          style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(232,224,208,0.1)",borderRadius:4,padding:"9px 14px",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#E8E0D0"}}/>
      </div>

      <div style={{overflowX:"auto",display:"flex",gap:5,padding:"8px 20px",borderBottom:"1px solid rgba(232,224,208,0.06)"}}>
        <button style={chip(!fTerpene)} onClick={()=>setFTerpene(null)}>All</button>
        {Object.keys(TC).map(t=><button key={t} style={chip(fTerpene===t,TC[t])} onClick={()=>setFTerpene(fTerpene===t?null:t)}>{t}</button>)}
      </div>

      <div style={{overflowX:"auto",display:"flex",gap:5,padding:"7px 20px",borderBottom:"1px solid rgba(232,224,208,0.06)"}}>
        <button style={chip(!fRegion)} onClick={()=>setFRegion(null)}>All Regions</button>
        {ALL_REGIONS.map(r=><button key={r} style={chip(fRegion===r)} onClick={()=>setFRegion(fRegion===r?null:r)}>{r}</button>)}
      </div>

      <div style={{overflowX:"auto",display:"flex",gap:5,padding:"7px 20px",borderBottom:"1px solid rgba(232,224,208,0.06)"}}>
        <button style={chip(!fStyle)} onClick={()=>setFStyle(null)}>All Styles</button>
        {STYLE_FILTERS.map(s=><button key={s} style={chip(fStyle===s)} onClick={()=>setFStyle(fStyle===s?null:s)}>{s}</button>)}
      </div>

      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"#3A3028",padding:"6px 20px",borderBottom:"1px solid rgba(232,224,208,0.04)"}}>
        {view==="flat" ? `${flatFiltered.length} beers` : `${breweriesFiltered.length} breweries`}
      </div>

      <div style={{padding:"14px 20px 60px"}}>
        {view==="brewery"
          ? breweriesFiltered.map(b=><BrewerySection key={b.id} brewery={b} sq={sqL} fStyle={fStyle} fTerpene={fTerpene} expandedId={expandedId} setExpandedId={setExpandedId}/>)
          : flatFiltered.map(beer=>{
              const bId=`${beer.breweryId}__${beer.n}`;
              return <BeerRow key={bId} beer={beer} expanded={expandedId===bId} onToggle={()=>setExpandedId(expandedId===bId?null:bId)}/>;
            })
        }
      </div>

      <div style={{padding:"14px 20px 40px",borderTop:"1px solid rgba(232,224,208,0.05)"}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,letterSpacing:"0.14em",textTransform:"uppercase",color:"#3A3028",marginBottom:8}}>Terpene Key</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{Object.keys(TC).map(t=><Pill key={t} name={t} size={10}/>)}</div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:7,color:"#2A2018",letterSpacing:"0.1em",marginTop:12,textAlign:"center"}}>Terpenes derived from published hop oil analysis · Vibe Curator · Terpene Source Independence</div>
      </div>
    </div>
  );
}
