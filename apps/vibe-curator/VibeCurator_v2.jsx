import { useState } from "react";

// ── TERPENE COLORS ─────────────────────────────────────────────────
const TC = {
  "Limonene":           "#D4C85C",
  "β-Caryophyllene":    "#C8A97E",
  "Linalool":           "#9B7BA8",
  "α-Bisabolol":        "#8EAEC8",
  "Myrcene":            "#8EAE68",
  "α-Humulene":         "#7C9082",
  "Terpinolene":        "#6BAE8E",
  "α-Pinene":           "#5C8E6B",
  "β-Ocimene":          "#B8785C",
  "trans-β-Farnesene":  "#D4B88E",
};

// ── BEER LIBRARY (reusable) ────────────────────────────────────────
const BEERS = {
  blindPig:    { brewery:"Russian River", beer:"Blind Pig IPA",       location:"Santa Rosa, CA",   style:"West Coast IPA",          abv:"6.1%", local:true  },
  plinyElder:  { brewery:"Russian River", beer:"Pliny the Elder",      location:"Santa Rosa, CA",   style:"Double IPA",              abv:"8%",   local:true  },
  racerFive:   { brewery:"Bear Republic", beer:"Racer 5 IPA",          location:"Healdsburg, CA",   style:"West Coast IPA",          abv:"7%",   local:true  },
  lagunitas:   { brewery:"Lagunitas",     beer:"IPA",                  location:"Petaluma, CA",     style:"American IPA",            abv:"6.2%", local:true  },
  henHouse:    { brewery:"HenHouse",      beer:"Hazy IPA",             location:"Santa Rosa, CA",   style:"New England IPA",         abv:"6.5%", local:true  },
  parliament:  { brewery:"Parliament",    beer:"Birds in Paradise",    location:"Rohnert Park, CA", style:"Sour · POG",              abv:"6.4%", local:true  },
  cooperage:   { brewery:"Cooperage",     beer:"Barrel Sour",          location:"Santa Rosa, CA",   style:"Barrel-Aged Sour",        abv:"6%",   local:true  },
  moonlight:   { brewery:"Moonlight",     beer:"Death & Taxes",        location:"Santa Rosa, CA",   style:"Black Lager",             abv:"4.9%", local:true  },
  barebottle:  { brewery:"Barebottle",    beer:"Small Wonder Dust",    location:"San Francisco, CA",style:"Hazy Pale Ale",           abv:"5.6%", local:true  },
  athletic:    { brewery:"Athletic",      beer:"Run Wild IPA",         location:"Milford, CT",      style:"NA West Coast IPA",       abv:"0.5%", local:false },
  healthAde:   { brewery:"Health-Ade",    beer:"Passion Fruit Kombucha",location:"San Rafael, CA",  style:"NA Kombucha",             abv:"0%",   local:true  },
  altamont:    { brewery:"Altamont",      beer:"Waui Water Seltzer",   location:"Livermore, CA",    style:"Hard Seltzer",            abv:"5.5%", local:true  },
  mikkeller:   { brewery:"Mikkeller",     beer:"Drink'in the Sun",     location:"SF / Copenhagen",  style:"Wheat Ale",               abv:"4.6%", local:false },
  weihensteph: { brewery:"Weihenstephaner",beer:"Hefeweizen",          location:"Bavaria, Germany", style:"Hefeweizen",              abv:"5.4%", local:false },
  orval:       { brewery:"Orval",         beer:"Trappist Ale",         location:"Belgium",          style:"Belgian Pale Ale",        abv:"6.2%", local:false },
  ironOx:      { brewery:"Iron Ox",       beer:"Sonoma Coast Pils",    location:"Santa Rosa, CA",   style:"German Pilsner",          abv:"4.8%", local:true  },
  pondFarm:    { brewery:"Pond Farm",     beer:"San Rafael Extra Gold", location:"San Rafael, CA",  style:"Mexican Lager",           abv:"6%",   local:true  },
  humCider:    { brewery:"Humboldt Cider",beer:"Albert's Experiment",  location:"Eureka, CA",       style:"Dry Apple Cider",         abv:"7%",   local:true  },
  barrel:      { brewery:"Barrel Brothers",beer:"Fruited Sour",        location:"Windsor, CA",      style:"Fruited Kettle Sour",     abv:"5.5%", local:true  },
  boochcraft:  { brewery:"Boochcraft",    beer:"Grapefruit Hibiscus",  location:"Chula Vista, CA",  style:"Hard Kombucha",           abv:"7%",   local:false },
  firestone:   { brewery:"Firestone Walker",beer:"Cali Squeeze Blood Orange",location:"Paso Robles",style:"Wheat Beer",             abv:"5%",   local:false },
  origPattern: { brewery:"Original Pattern",beer:"Foundation of Life", location:"Oakland, CA",      style:"German Pilsner",          abv:"5%",   local:true  },
  lostCoast:   { brewery:"Lost Coast",    beer:"Revenant IPA",         location:"Eureka, CA",       style:"West Coast IPA",          abv:"7%",   local:true  },
  henOyster:   { brewery:"HenHouse",      beer:"Oyster Stout",         location:"Santa Rosa, CA",   style:"Oyster Stout",            abv:"5.2%", local:true  },
  cooperSour:  { brewery:"Cooperage",     beer:"Rotating Sour",        location:"Santa Rosa, CA",   style:"Kettle Sour",             abv:"5%",   local:true  },
  laughingMonk:{ brewery:"Laughing Monk", beer:"Pour Resolution",      location:"San Francisco, CA",style:"Hazy IPA",               abv:"6.7%", local:true  },
};

// helper to build a beer pairing entry
const pair = (key, badge, badgeColor, terpeneLink, why) => ({
  ...BEERS[key], badge, badgeColor, terpeneLink, why
});

// ── ALL 23 STRAINS ─────────────────────────────────────────────────
const FARMS = [
  {
    id:"glentucky", name:"Glentucky Family Farm", county:"Sonoma",
    color:"#C8A97E",
    strains:[
      { id:"mikesbomba", name:"Mike's Bomba", energy:"LOW", vibe:"Grounded & Present",
        effects:["Relaxed","Calm","Alert"], intent:"Grounded calm with clear mental edges.",
        aroma:["Fuel","Lemon Cream","Forest Floor"], total:"1.38%",
        terpenes:[{name:"β-Caryophyllene",pct:0.47},{name:"Limonene",pct:0.32},{name:"α-Humulene",pct:0.18},{name:"Linalool",pct:0.07}],
        pairings:{
          complement:[
            pair("lagunitas","Terpene Match","#C8A97E","β-Caryophyllene · α-Humulene","Cascade and Centennial hops are loaded with caryophyllene and humulene — a direct molecular match to Mike's Bomba. The earthy herbal backbone echoes 'forest floor' perfectly."),
            pair("racerFive","Sonoma Match","#4A7C59","β-Caryophyllene · caramel malt","Caramel malt adds the warmth and body that mirrors 'lemon cream' softness. Healdsburg provenance ties it to the same Sonoma terroir as Glentucky."),
          ],
          contrast:[
            pair("henHouse","Tropical Contrast","#8EAE68","Myrcene · tropical lift","Juicy tropical softness contrasts Mike's Bomba's earthy fuel character — amplifies the lemon cream note by bright opposition."),
            pair("weihensteph","Exotic Contrast","#6B7C93","Linalool (yeast-derived)","Banana and clove esters create unexpected but harmonious contrast to the fuel and forest floor earthiness."),
          ],
          cleanse:[
            pair("moonlight","Palate Reset","#3A7DAE","Crisp lager cleanse","Sonoma's darkest clean lager cuts through caryophyllene's spice with restrained roast and resets the palate without sweetness."),
            pair("orval","Elevated","#8B6914","Brett dryness","Wild brett funk and bone-dry finish — the 'forest floor' earthiness bridges directly into Orval's terroir character."),
          ],
        }
      },
    ]
  },
  {
    id:"moongazer", name:"Moon Gazer Farms", county:"Mendocino",
    color:"#9B7BA8",
    strains:[
      { id:"moonlight", name:"Moonlight", energy:"MEDIUM", vibe:"Cozy Comfort · Grateful",
        effects:["Physically Relaxed","Calm","Grateful"], intent:"Soft gratitude in a settled body.",
        aroma:["Watermelon Candy","Citrus Zest","Earl Grey"], total:"2.67%",
        terpenes:[{name:"Myrcene",pct:0.74},{name:"β-Caryophyllene",pct:0.51},{name:"Terpinolene",pct:0.38},{name:"α-Bisabolol",pct:0.24}],
        pairings:{
          complement:[
            pair("firestone","Best Match","#9B7BA8","Linalool · Myrcene · floral-citrus","Blood orange wheat is Earl Grey in beer form — bergamot-adjacent citrus + wheat softness maps onto Moonlight's terpinolene-bisabolol floral character."),
            pair("barrel","Aroma Match","#6BAE8E","Myrcene · tropical fruit","Watermelon and berry fruit additions directly mirror the 'watermelon candy' aroma note. Terpene-matched and Sonoma-made."),
          ],
          contrast:[
            pair("blindPig","Dynamic Contrast","#8B3A3A","β-Pinene contrast","Pine resin bitterness cuts Moonlight's lush watermelon sweetness — creates dynamic tension that wakes the palate between relaxing waves."),
            pair("boochcraft","Floral Contrast","#A05C8A","Terpinolene · floral","Hibiscus floral acidity contrasts the watermelon sweetness while harmonizing with the terpinolene and bisabolol floral notes."),
          ],
          cleanse:[
            pair("altamont","Palate Reset","#3A7DAE","Terpinolene reset","Ultra-carbonated and nearly neutral — strips myrcene's sedating residue and snaps the palate back to alert."),
            pair("healthAde","NA Option","#7B5EA7","Limonene · probiotic cleanse","NA. Limonene in the tangerine + probiotic acidity cleanses without intoxication — ideal for a long tasting session."),
          ],
        }
      },
      { id:"nattybumppo", name:"Natty Bumppo", energy:"MEDIUM", vibe:"Grounded & Present · Social",
        effects:["Happy","Carefree","Physically Relaxed"], intent:"Loose and easy, happily untethered.",
        aroma:["Kerosene","Musk","Sour Plum"], total:"1.86%",
        terpenes:[{name:"β-Caryophyllene",pct:0.63},{name:"Limonene",pct:0.35},{name:"α-Humulene",pct:0.25},{name:"Myrcene",pct:0.19}],
        pairings:{
          complement:[
            pair("cooperage","Best Match","#7C9082","β-Caryophyllene · funky-plum","Wild fermentation and barrel funk mirror Natty Bumppo's 'kerosene-musk' character. Sour plum notes align directly with the strain's aroma."),
            pair("orval","Elevated Match","#8B6914","Brett funk · β-Caryophyllene","Brett character translates 'musk' into complexity. Dryness and earthy depth match the caryophyllene-humulene earthiness."),
          ],
          contrast:[
            pair("lagunitas","Mood Lift","#D4C85C","Limonene contrast","Bright American citrus hop character cuts Natty Bumppo's heavy musk — adds lightness without competing."),
            pair("lostCoast","NorCal Local","#4A7C59","Clear bitter contrast","Clean West Coast clarity contrasts Natty Bumppo's murky kerosene — like cutting through fog. North Coast provenance feels right."),
          ],
          cleanse:[
            pair("pondFarm","Palate Reset","#3A7DAE","Crisp lager reset","Zero terpene interference. Pure carbonated cleanse. Local Marin County brewing."),
            pair("humCider","Cider Option","#6BAE8E","Malic acid cleanse","Dry apple cider's malic acid is a different acidic pathway — uniquely effective at stripping caryophyllene's spice."),
          ],
        }
      },
      { id:"blacklimechem", name:"Black Lime Chem", energy:"LOW", vibe:"Deep Rest · Body Melt",
        effects:["Heavy","Blissful","Sleepy"], intent:"Weighted bliss melting toward rest.",
        aroma:["Sharp Lime","Rhubarb","Glue"], total:"3.08%",
        terpenes:[{name:"Myrcene",pct:1.69},{name:"α-Pinene",pct:0.39},{name:"β-Caryophyllene",pct:0.27},{name:"β-Ocimene",pct:0.19}],
        pairings:{
          complement:[
            pair("barebottle","SF Local Match","#8EAE68","Myrcene · soft-hazy","SF's Barebottle delivers a low-bitterness, myrcene-rich hazy that matches Black Lime Chem's dominant terpene without fighting the sedation."),
            pair("moonlight","Vibe Aligned","#4A3A2A","Dark depth · Myrcene","Sonoma's darkest classic lager has restrained roast and myrcene-adjacent depth. Both are slow, dark, smooth."),
          ],
          contrast:[
            pair("ironOx","Alert Contrast","#5C8E6B","α-Pinene lift contrast","Clean crisp pilsner with noble hops creates a stimulating counterweight to 1.69% myrcene sedation. Pinene in noble hops meets pinene in the strain."),
            pair("origPattern","Bay Area","#6B7C93","Noble hop clarity","Oakland craft precision in a bright German pils — crisp clarity creates maximal contrast to the 'glue-rhubarb' heaviness."),
          ],
          cleanse:[
            pair("healthAde","NA Essential","#7B5EA7","Malic acid · probiotic reset","Apple kombucha's malic acid cuts through myrcene's heavy sedating residue. NA is critical — 1.69% myrcene already does the work."),
            pair("altamont","Palate Reset","#3A7DAE","Neutral carbonation reset","Zero terpene interference. Pure carbonated cleanse to reset between the rhubarb-glue experience."),
          ],
        }
      },
    ]
  },
  {
    id:"alpenglow", name:"Alpenglow Farms", county:"Humboldt",
    color:"#8EAE68",
    strains:[
      { id:"guavagift", name:"Guava Gift", energy:"HIGH", vibe:"Social & Bright · Euphoric Lift",
        effects:["Social","Inspiring","Euphoric"], intent:"Open and expansive, easy social lift.",
        aroma:["Fresh Guava","Lemon Rind","Tamarind"], total:"2.34%",
        terpenes:[{name:"β-Caryophyllene",pct:0.73},{name:"Limonene",pct:0.50},{name:"Myrcene",pct:0.33},{name:"α-Humulene",pct:0.25}],
        pairings:{
          complement:[
            pair("parliament","Tropical Twin","#D4C85C","Limonene · tropical acid","POG sour mirrors guava's tart-tropical profile. Limonene in passionfruit and orange matches the strain's second terpene exactly."),
            pair("barrel","Guava Mirror","#8EAE68","Myrcene · tropical fruit","Barrel Brothers' fruited sours often include tropical additions — a direct guava-myrcene mirror in craft sour form."),
          ],
          contrast:[
            pair("blindPig","Resinous Cut","#8B3A3A","β-Caryophyllene · pine","West Coast resin bitterness cuts Guava Gift's tropical sweetness, creating contrast that makes the guava aroma pop."),
            pair("henHouse","Hazy Lift","#4A7C59","Myrcene · social synergy","Hazy IPA shares the social-euphoric energy of Guava Gift while adding complementary tropical hop brightness."),
          ],
          cleanse:[
            pair("athletic","NA Reset","#7B5EA7","Citrus hop cleanse","Zero ABV citrus IPA cleanses between guava waves without adding intoxication to an already social, high-energy session."),
            pair("cooperSour","Acid Reset","#3A7DAE","Lactic acid reset","Kettle sour's lactic acidity strips the palate of residual tropical sweetness for a clean reset."),
          ],
        }
      },
      { id:"mulefuel", name:"Mule Fuel", energy:"LOW", vibe:"Deep Rest · Body Melt",
        effects:["Happy","Hungry","Sleepy"], intent:"Gentle contentment settling toward rest.",
        aroma:["Skunk","Diesel","Lemon","Leather"], total:"3.97%",
        terpenes:[{name:"Myrcene",pct:2.22},{name:"α-Pinene",pct:0.54},{name:"β-Caryophyllene",pct:0.34},{name:"Limonene",pct:0.28}],
        pairings:{
          complement:[
            pair("mikkeller","Soft Complement","#8EAE68","Myrcene · wheat body","Soft wheat body with low bitterness lets Mule Fuel's 2.22% myrcene lead without competition. A gentle, non-sedating companion."),
            pair("firestone","Citrus Grounding","#C8A97E","Limonene · wheat","Blood orange wheat bridges the 'lemon' in Mule Fuel's aroma while providing enough body for this heavy strain."),
          ],
          contrast:[
            pair("ironOx","Clarity Contrast","#5C8E6B","α-Pinene · crisp lift","Noble hop pilsner creates maximum contrast to Mule Fuel's 3.97% total terpene density — a clean crisp counterpoint to the heaviest strain in the collection."),
            pair("lostCoast","NorCal Lift","#D4C85C","Limonene · skunk contrast","Clear, bright West Coast IPA contrasts Mule Fuel's 'skunk-diesel' depth. Both are NorCal native, different registers."),
          ],
          cleanse:[
            pair("healthAde","NA Essential","#7B5EA7","Probiotic reset","NA kombucha is mandatory here — Mule Fuel's 2.22% myrcene is already doing heavy sedative work. Probiotic acid cleanses cleanly."),
            pair("altamont","Seltzer Reset","#3A7DAE","Pure carbonation","Zero interference. The only appropriate full reset between Mule Fuel and anything else on the flight."),
          ],
        }
      },
      { id:"satsuma", name:"Satsuma Sherbet", energy:"MEDIUM", vibe:"Cozy Comfort · Contemplative",
        effects:["Happy","Contemplative","Comfortable"], intent:"Quiet ease with thoughtful undertones.",
        aroma:["Mandarin Orange","Mochi","Mint"], total:"1.85%",
        terpenes:[{name:"Limonene",pct:0.55},{name:"β-Caryophyllene",pct:0.45},{name:"α-Humulene",pct:0.13},{name:"Myrcene",pct:0.11}],
        pairings:{
          complement:[
            pair("parliament","Citrus Twin","#D4C85C","Limonene · orange acid","POG sour's mandarin-tangerine character matches Satsuma Sherbet's 'mandarin orange' aroma almost note-for-note."),
            pair("firestone","Mochi Softness","#9B7BA8","Linalool · wheat body","Wheat base mimics mochi's soft, pillowy texture while the citrus aligns with the mandarin. Thoughtful, contemplative pairing."),
          ],
          contrast:[
            pair("lagunitas","Classic Contrast","#C8A97E","β-Caryophyllene hop cut","American IPA bitterness cuts Satsuma's sweetness, creating the contrast that lets the mandarin and mint notes emerge separately."),
            pair("ironOx","Mint Mirror","#5C8E6B","Noble hop · mint echo","Pilsner's herbal noble hop character echoes the 'mint' aroma note while providing bright structural contrast to the sherbet sweetness."),
          ],
          cleanse:[
            pair("athletic","NA Cleanse","#7B5EA7","Citrus hop reset","Zero ABV citrus resets between mandarin orange waves without disrupting Satsuma's contemplative effect."),
            pair("altamont","Seltzer Reset","#3A7DAE","Pure carbonation","Neutral carbonated reset after the mochi-mint richness. Clean slate."),
          ],
        }
      },
    ]
  },
  {
    id:"higherheights", name:"Higher Heights", county:"Mendocino",
    color:"#D4C85C",
    strains:[
      { id:"carambola", name:"Carambola", energy:"HIGH", vibe:"Creative Flow · Euphoric Lift",
        effects:["Energetic","Fun","Giggly"], intent:"Light and playful, effervescent energy.",
        aroma:["Orange","Diesel","Incense"], total:"1.45%",
        terpenes:[{name:"Limonene",pct:0.44},{name:"β-Caryophyllene",pct:0.18},{name:"Linalool",pct:0.12},{name:"α-Bisabolol",pct:0.09}],
        pairings:{
          complement:[
            pair("parliament","Best Match","#D4C85C","Limonene twin","Passionfruit-orange acidity mirrors carambola's limonene fingerprint exactly. The POG sour is carambola in a glass."),
            pair("henHouse","Terpene Match","#8EAE68","Limonene · Myrcene","Citra and Mosaic hops share the myrcene-limonene profile. Juicy tropical sweetness, no bitterness clash."),
          ],
          contrast:[
            pair("blindPig","Sonoma Icon","#8B3A3A","β-Caryophyllene contrast","Piney resinous bitterness creates sharp counterpoint — carambola's brightness pops luminously against the hop backbone."),
            pair("mikkeller","Soft Contrast","#6B7C93","Linalool · soft contrast","Linalool-adjacent wheat softness lets carambola's diesel-incense notes surface cleanly."),
          ],
          cleanse:[
            pair("athletic","NA Option","#7B5EA7","Citrus hop reset","Zero-ABV citrus hop cleanses without sedating — essential for cannabis consumers who want full terpene clarity."),
            pair("cooperage","Palate Reset","#3A7DAE","Lactic acid reset","High acidity + carbonation strips residual sugars, priming the palate for the next limonene wave."),
          ],
        }
      },
      { id:"rastagovmint", name:"Rasta Governmint", energy:"MEDIUM", vibe:"Grounded & Present · Body Melt",
        effects:["Euphoric","Supremely Relaxed","Comforted"], intent:"Profound ease with cushioned edges.",
        aroma:["Sour Cherry","Frankincense","Oak"], total:"1.92%",
        terpenes:[{name:"β-Caryophyllene",pct:0.60},{name:"Limonene",pct:0.39},{name:"α-Humulene",pct:0.17},{name:"Myrcene",pct:0.16}],
        pairings:{
          complement:[
            pair("cooperage","Frankincense Mirror","#C8A97E","β-Caryophyllene · barrel oak","Barrel-aged sour with oak character mirrors Rasta Governmint's 'oak and frankincense' aroma. CB2 receptor pathway shared via caryophyllene."),
            pair("orval","Elevated Match","#8B6914","Brett · earthy depth","Orval's brett and oak-adjacent dryness is the elevated pairing — translates 'frankincense' earthiness into Belgian beer terroir."),
          ],
          contrast:[
            pair("parliament","Cherry Contrast","#D4C85C","Limonene · sour cherry","POG sour's tropical acidity creates bright contrast to Rasta Governmint's 'sour cherry and frankincense' — both sour, different registers."),
            pair("henHouse","Tropical Lift","#8EAE68","Myrcene · tropical","Hazy IPA's tropical softness lifts Rasta Governmint out of heavy relaxation territory and introduces social brightness."),
          ],
          cleanse:[
            pair("altamont","Seltzer Reset","#3A7DAE","Neutral reset","Strips frankincense-oak residue cleanly. Neutral carbonation is the right tool for complex aromatic strains."),
            pair("healthAde","NA Cleanse","#7B5EA7","Probiotic acid","Probiotic kombucha acid cleanse after the heavy caryophyllene euphoria."),
          ],
        }
      },
      { id:"pineapplemojito", name:"Pineapple Mojito", energy:"MEDIUM", vibe:"Grounded & Present · Cozy",
        effects:["Relaxed","Grounded","Euphoric"], intent:"Rooted ease with a quiet glow.",
        aroma:["Pineapple","Ginger","Mint","Gas"], total:"2.55%",
        terpenes:[{name:"β-Caryophyllene",pct:0.63},{name:"Limonene",pct:0.56},{name:"α-Bisabolol",pct:0.24},{name:"α-Humulene",pct:0.19},{name:"Linalool",pct:0.16},{name:"α-Pinene",pct:0.14},{name:"Myrcene",pct:0.11}],
        pairings:{
          complement:[
            pair("henHouse","Tropical Pineapple","#D4C85C","Limonene · Myrcene · tropical","Hazy IPA's pineapple-adjacent tropical hops are a direct flavor complement to the strain name and aroma. Seven terpenes need a complex beer partner."),
            pair("mikkeller","Mint Softness","#9B7BA8","Linalool · Bisabolol · wheat","Wheat body with citrus zest matches the soft 'mojito' character. Linalool from yeast mirrors linalool in the strain."),
          ],
          contrast:[
            pair("lagunitas","Gas Contrast","#C8A97E","β-Caryophyllene · hops","American IPA bitterness cuts through the 'gas' note and creates contrast with the sweet pineapple, making both cleaner."),
            pair("ironOx","Mint Herbal","#5C8E6B","α-Pinene · noble hops","Pilsner's herbal noble hops echo the mint note while providing clean structural contrast to the complex 7-terpene profile."),
          ],
          cleanse:[
            pair("athletic","NA Mint Reset","#7B5EA7","Neutral citrus reset","Zero ABV keeps the session sustainable — Pineapple Mojito's 2.55% total terpenes means you need a responsible cleanse option."),
            pair("altamont","Seltzer Reset","#3A7DAE","Carbonation cleanse","Pure reset after the mojito complexity. Neutral canvas."),
          ],
        }
      },
    ]
  },
  {
    id:"happyday", name:"Happy Day Farms", county:"Mendocino",
    color:"#D4A843",
    strains:[
      { id:"strawberrybiscotti", name:"Strawberry Biscotti", energy:"MEDIUM", vibe:"Cozy Comfort",
        effects:["Comforting","Mentally Engaging","Appetite Inducing"], intent:"Cozy anchor with a curious mind.",
        aroma:["Kettle Corn","Fuel","Sour Strawberry Candy"], total:"1.48%",
        terpenes:[{name:"Limonene",pct:0.38},{name:"β-Caryophyllene",pct:0.29},{name:"Myrcene",pct:0.25},{name:"α-Bisabolol",pct:0.13}],
        pairings:{
          complement:[
            pair("barrel","Strawberry Sour","#D4A843","Limonene · fruit acid","Fruited kettle sour with berry additions mirrors the 'sour strawberry candy' aroma — the most direct flavor translation."),
            pair("firestone","Wheat Comfort","#8EAEC8","α-Bisabolol · wheat body","Wheat body mimics the biscotti texture while citrus complements the strawberry. Soft, cozy, comfortable."),
          ],
          contrast:[
            pair("blindPig","Kettle Corn Cut","#8B3A3A","β-Caryophyllene · bitter cut","West Coast IPA bitterness cuts the 'kettle corn' sweetness, exposing the fuel note underneath and creating interesting contrast."),
            pair("lagunitas","Classic Contrast","#C8A97E","β-Caryophyllene","American IPA's citrus-hop brightness contrasts the biscotti's warm, cozy sweetness without overwhelming the softer terpene notes."),
          ],
          cleanse:[
            pair("healthAde","NA Cleanse","#7B5EA7","Probiotic acid","Probiotic kombucha cuts through the biscotti sweetness and resets for another round of the sour strawberry complexity."),
            pair("athletic","NA IPA","#5C8E6B","Citrus hop reset","Citrus hop character without alcohol — keeps the palate clean and the session grounded."),
          ],
        }
      },
      { id:"avenueofgiants", name:"Avenue of the Giants", energy:"HIGH", vibe:"Euphoric Lift · Creative Flow",
        effects:["Energizing","Buzzy","Motivating"], intent:"Forward momentum with electric clarity.",
        aroma:["Pine Needles","Menthol","Jasmine"], total:"3.48%",
        terpenes:[{name:"Myrcene",pct:1.94},{name:"β-Caryophyllene",pct:0.43},{name:"α-Pinene",pct:0.26},{name:"β-Ocimene",pct:0.24}],
        pairings:{
          complement:[
            pair("ironOx","Pine Twin","#5C8E6B","α-Pinene · noble hops","Sonoma pilsner's noble hop character shares α-pinene with Avenue of the Giants — both are piney, herbal, clear-headed. Forest meets forest."),
            pair("henHouse","Jasmine Lift","#8EAE68","β-Ocimene · Myrcene · hazy","HenHouse's hazy IPA shares the floral-tropical register of β-ocimene — the 'jasmine' note bridges directly into juicy hop character."),
          ],
          contrast:[
            pair("lagunitas","Menthol Cut","#C8A97E","β-Caryophyllene · citrus","American IPA's citrus bitterness cuts the menthol intensity and creates contrast with Avenue's 1.94% myrcene density."),
            pair("mikkeller","Soft Float","#6B7C93","Linalool wheat","Wheat ale softness contrasts Avenue of the Giants' buzzy electric energy — a gentle counterweight to the forest's intensity."),
          ],
          cleanse:[
            pair("altamont","Seltzer Reset","#3A7DAE","Neutral carbonation","Strips 3.48% total terpene complexity cleanly. Maximum carbonation for maximum reset."),
            pair("healthAde","NA Forest Reset","#7B5EA7","Probiotic + pine acid","Tangerine kombucha's acidity cuts through the pine-menthol residue without dulling the strain's electric clarity."),
          ],
        }
      },
    ]
  },
  {
    id:"greenshock", name:"Greenshock Farms", county:"Mendocino",
    color:"#6BAE8E",
    strains:[
      { id:"tropicalsleigh", name:"Tropical Sleigh Ride", energy:"HIGH", vibe:"Euphoric Lift · Creative Flow",
        effects:["Joyful","Alert","Euphoric"], intent:"Vivid lift with present clarity.",
        aroma:["Peppermint","Honeysuckle","Hint of Ginger"], total:"2.35%",
        terpenes:[{name:"β-Ocimene",pct:0.71},{name:"β-Caryophyllene",pct:0.70},{name:"α-Humulene",pct:0.28}],
        pairings:{
          complement:[
            pair("barrel","Honeysuckle Mirror","#6BAE8E","β-Ocimene · floral-fruit","Fruited sour with floral additions mirrors the 'honeysuckle' note. β-Ocimene's sweet floral character is rare in beer — fruited sour is the closest analog."),
            pair("boochcraft","Hibiscus-Ginger","#A05C8A","β-Caryophyllene · floral-spice","Grapefruit hibiscus kombucha echoes the 'honeysuckle-ginger' profile — floral and lightly spiced, shared caryophyllene pathway."),
          ],
          contrast:[
            pair("blindPig","Alert Contrast","#8B3A3A","β-Caryophyllene · resin","Piney West Coast resin contrasts the sweet honeysuckle and peppermint — sharpens the 'alert' effect by adding assertive bitterness."),
            pair("lagunitas","Classic Anchor","#C8A97E","β-Caryophyllene match","Tropical Sleigh Ride's high caryophyllene (0.70%) matches Lagunitas IPA's hop profile. Grounding contrast to the light floral sweetness."),
          ],
          cleanse:[
            pair("athletic","Alert NA Reset","#7B5EA7","Citrus reset","NA IPA keeps the alert clarity of Tropical Sleigh Ride's euphoric energy intact while resetting the palate."),
            pair("altamont","Seltzer Reset","#3A7DAE","Neutral carbonation","Strips peppermint-honeysuckle complexity. Neutral reset."),
          ],
        }
      },
    ]
  },
  {
    id:"terrapin", name:"Terrapin Farms", county:"Humboldt",
    color:"#B8A060",
    strains:[
      { id:"peachflambe", name:"Peach Flambé", energy:"HIGH", vibe:"Euphoric Lift",
        effects:["Happy","Energized","Motivated"], intent:"Sunny drive with bright momentum.",
        aroma:["White Peach","Cashew Butter","Brown Sugar"], total:"1.05%",
        terpenes:[{name:"β-Caryophyllene",pct:0.25},{name:"Myrcene",pct:0.21},{name:"Limonene",pct:0.20},{name:"α-Humulene",pct:0.12}],
        pairings:{
          complement:[
            pair("firestone","Peach Wheat","#B8A060","Myrcene · wheat body","Wheat ale's soft body mirrors the peach's stone-fruit texture. Blood orange bridges to the limonene note while the wheat echoes 'cashew butter' softness."),
            pair("parliament","Sunny Sour","#D4C85C","Limonene · tropical acid","POG sour's citrus brightness matches Peach Flambé's motivating, sunny energy perfectly."),
          ],
          contrast:[
            pair("ironOx","Brown Sugar Cut","#5C8E6B","α-Pinene pilsner","Crisp pilsner cuts through the 'brown sugar' sweetness, exposing the peach's clean, energetic core."),
            pair("lagunitas","Classic Contrast","#C8A97E","β-Caryophyllene · hop","American IPA bitterness contrasts the sweet stone-fruit while sharing the caryophyllene backbone."),
          ],
          cleanse:[
            pair("athletic","NA Peach Reset","#7B5EA7","Citrus hop cleanse","Zero ABV. Clean citrus reset between the stone-fruit layers. Keeps 'motivated' energy momentum going."),
            pair("altamont","Seltzer Reset","#3A7DAE","Neutral reset","Strips peach-brown sugar residue completely."),
          ],
        }
      },
      { id:"lemonpapaya", name:"Lemon Papaya Banana", energy:"LOW", vibe:"Deep Rest · Euphoric",
        effects:["Physically Relaxed","Spacey","Euphoric"], intent:"Soft body, drifting expansive mind.",
        aroma:["Papaya","Honeydew Melon","Lemon Zest"], total:"1.38%",
        terpenes:[{name:"Myrcene",pct:0.57},{name:"β-Caryophyllene",pct:0.32},{name:"Limonene",pct:0.24},{name:"α-Humulene",pct:0.11}],
        pairings:{
          complement:[
            pair("mikkeller","Tropical Wheat","#B8A060","Myrcene · linalool · wheat","Wheat ale's citrus-tropical softness matches the papaya-honeydew register. Low ABV keeps the session from compounding the 'spacey' effect."),
            pair("parliament","Tropical Sour","#D4C85C","Limonene · papaya acid","POG sour's tropical acid mirrors 'lemon zest and papaya' directly — limonene in passionfruit echoes the strain's citrus note."),
          ],
          contrast:[
            pair("ironOx","Spacey Contrast","#5C8E6B","α-Pinene · clarity","Crisp pilsner's alerting pinene character contrasts the spacey drift — keeps one foot in the present while the strain takes you elsewhere."),
            pair("henHouse","Juicy Lift","#8EAE68","Myrcene · tropical lift","Hazy IPA adds juicy tropical brightness against the 'spacey-euphoric' character — a lift rather than a deepener."),
          ],
          cleanse:[
            pair("healthAde","NA Essential","#7B5EA7","Probiotic acid","NA kombucha. The spacey effect from 0.57% myrcene means the cleanse should not add ABV. Lemon-tangerine bridges to the 'lemon zest' note."),
            pair("altamont","Seltzer Reset","#3A7DAE","Neutral reset","Pure carbonated reset after the papaya-honeydew drift."),
          ],
        }
      },
    ]
  },
  {
    id:"sunrisegardens", name:"Sunrise Gardens", county:"Mendocino",
    color:"#D47A5C",
    strains:[
      { id:"tropicannacherry", name:"Tropicanna Cherry", energy:"HIGH", vibe:"Euphoric Lift · Social",
        effects:["Euphoric","Cerebral","Cheerful"], intent:"Bright lift with clear, lively edges.",
        aroma:["Sour Cherry","Sweet Citrus","Nutmeg"], total:"1.18%",
        terpenes:[{name:"β-Caryophyllene",pct:0.37},{name:"Limonene",pct:0.29},{name:"Linalool",pct:0.15},{name:"α-Humulene",pct:0.11}],
        pairings:{
          complement:[
            pair("barrel","Cherry Sour","#D47A5C","Limonene · cherry fruit acid","Fruited sour with cherry or berry additions mirrors the 'sour cherry' aroma — same tart-fruit pathway, same limonene citrus backdrop."),
            pair("parliament","Citrus Lift","#D4C85C","Limonene · cheerful acid","POG sour's bright citrus acid matches Tropicanna Cherry's 'sweet citrus and cheerful' energy profile."),
          ],
          contrast:[
            pair("weihensteph","Nutmeg Contrast","#6B7C93","Linalool (yeast) · clove spice","Hefeweizen's clove ester contrasts the 'nutmeg' note in a complementary spice dialogue — both warm, different temperatures."),
            pair("lagunitas","Classic Contrast","#C8A97E","β-Caryophyllene hop","American IPA bitterness sharpens the sour cherry against a clean bitter backdrop."),
          ],
          cleanse:[
            pair("athletic","NA Cherry Reset","#7B5EA7","Citrus hop cleanse","Zero ABV. Bright citrus reset after the sour cherry-nutmeg complexity."),
            pair("healthAde","Kombucha Cleanse","#3A7DAE","Probiotic acid","Passion fruit kombucha's acidity bridges into Tropicanna Cherry's citrus note while cleansing."),
          ],
        }
      },
    ]
  },
];

// flatten all strains for lookup
const ALL_STRAINS = FARMS.flatMap(f => f.strains.map(s => ({...s, farmName:f.name, farmColor:f.color})));

// ── TERPENE BAR ────────────────────────────────────────────────────
function TerpeneBar({ terpenes }) {
  const max = Math.max(...terpenes.map(t => t.pct));
  return (
    <div style={{display:"flex",flexDirection:"column",gap:7}}>
      {terpenes.map(t => {
        const color = TC[t.name] || "#888";
        return (
          <div key={t.name} style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:110,fontSize:10,fontFamily:"'DM Sans',sans-serif",color:"#7A7060",flexShrink:0,letterSpacing:"0.02em"}}>{t.name}</div>
            <div style={{flex:1,height:4,background:"rgba(255,255,255,0.06)",borderRadius:2,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${(t.pct/max)*100}%`,background:color,borderRadius:2,transition:"width 0.5s ease"}}/>
            </div>
            <div style={{width:34,fontSize:10,fontFamily:"'DM Sans',sans-serif",color,textAlign:"right"}}>{t.pct}%</div>
          </div>
        );
      })}
    </div>
  );
}

// ── BEER CARD ──────────────────────────────────────────────────────
function BeerCard({ beer, accent }) {
  return (
    <div style={{
      background:"rgba(255,255,255,0.025)",
      border:"1px solid rgba(232,224,208,0.08)",
      borderLeft:`3px solid ${accent}88`,
      borderRadius:4,
      padding:"14px 16px",
      marginBottom:10,
    }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:6,marginBottom:8}}>
        <div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:"0.14em",textTransform:"uppercase",color:"#4A4035",marginBottom:2}}>
            {beer.local && <span style={{display:"inline-block",width:5,height:5,borderRadius:"50%",background:"#4A7C59",marginRight:5,verticalAlign:"middle"}}/>}
            {beer.brewery}
          </div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:"#F0E8D8",lineHeight:1.2,marginBottom:1}}>{beer.beer}</div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#5A5040"}}>{beer.style} · {beer.abv} · {beer.location}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
          <span style={{fontSize:9,fontFamily:"'DM Sans',sans-serif",padding:"2px 7px",borderRadius:2,
            background:`${beer.badgeColor}22`,color:beer.badgeColor,border:`1px solid ${beer.badgeColor}44`,
            letterSpacing:"0.08em",textTransform:"uppercase",fontWeight:500}}>{beer.badge}</span>
          <span style={{fontSize:9,fontFamily:"'DM Sans',sans-serif",padding:"1px 7px",borderRadius:20,
            border:"1px solid rgba(245,200,66,0.2)",color:"#A89050",letterSpacing:"0.05em"}}>
            🧬 {beer.terpeneLink}
          </span>
        </div>
      </div>
      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#7A7060",lineHeight:1.6,
        borderTop:"1px solid rgba(232,224,208,0.06)",paddingTop:8,marginTop:2}}>
        {beer.why}
      </div>
    </div>
  );
}

// ── STRAIN DETAIL SHEET ────────────────────────────────────────────
function StrainDetail({ strain, onClose }) {
  const [tab, setTab] = useState("complement");
  const tabs = [
    {id:"complement", label:"Complement", icon:"◎"},
    {id:"contrast",   label:"Contrast",   icon:"◈"},
    {id:"cleanse",    label:"Cleanse",    icon:"◇"},
  ];
  const energyColors = {HIGH:"#D4C85C",MEDIUM:"#8EAE68",LOW:"#8EAEC8"};
  const accent = strain.farmColor;

  return (
    <div style={{
      position:"fixed",inset:0,zIndex:100,
      background:"rgba(0,0,0,0.7)",
      display:"flex",alignItems:"flex-end",
    }} onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width:"100%",maxHeight:"92vh",overflow:"auto",
          background:"#0D0F0B",
          borderTop:`3px solid ${accent}`,
          borderRadius:"16px 16px 0 0",
          padding:"0 0 40px",
        }}>

        {/* Handle */}
        <div style={{display:"flex",justifyContent:"center",padding:"12px 0 4px"}}>
          <div style={{width:40,height:4,borderRadius:2,background:"rgba(232,224,208,0.15)"}}/>
        </div>

        {/* Header */}
        <div style={{padding:"16px 20px 14px",borderBottom:"1px solid rgba(232,224,208,0.07)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:"0.15em",textTransform:"uppercase",color:"#4A4035",marginBottom:4}}>
                {strain.farmName}
              </div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,color:accent,marginBottom:2}}>{strain.name}</h2>
              <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:12,color:"#5A5040",marginBottom:8}}>"{strain.intent}"</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {strain.effects.map(e => (
                  <span key={e} style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,padding:"2px 8px",borderRadius:20,
                    border:`1px solid ${accent}44`,color:accent,background:`${accent}11`,letterSpacing:"0.05em"}}>{e}</span>
                ))}
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:18,color:energyColors[strain.energy],marginBottom:2}}>{strain.energy}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"#3A3028"}}>{strain.total} terpenes</div>
            </div>
          </div>

          {/* Aroma */}
          <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
            {strain.aroma.map(a => (
              <span key={a} style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,padding:"2px 9px",
                borderRadius:2,border:"1px solid rgba(232,224,208,0.1)",color:"#8A8070",background:"rgba(255,255,255,0.02)"}}>{a}</span>
            ))}
          </div>
        </div>

        {/* Terpene bars */}
        <div style={{padding:"14px 20px 14px",borderBottom:"1px solid rgba(232,224,208,0.07)"}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:"0.15em",textTransform:"uppercase",color:"#3A3028",marginBottom:10}}>
            Terpene Profile
          </div>
          <TerpeneBar terpenes={strain.terpenes}/>
        </div>

        {/* Tabs */}
        <div style={{padding:"12px 20px 0"}}>
          <div style={{display:"flex",gap:6,marginBottom:14}}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                flex:1,background:tab===t.id?"rgba(232,224,208,0.08)":"none",
                border:`1px solid ${tab===t.id?"rgba(232,224,208,0.35)":"rgba(232,224,208,0.1)"}`,
                borderRadius:3,padding:"7px 4px",cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif",fontSize:10,
                letterSpacing:"0.1em",textTransform:"uppercase",
                color:tab===t.id?"#E8E0D0":"#5A5040",
              }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
          {strain.pairings[tab].map((beer,i) => <BeerCard key={i} beer={beer} accent={accent}/>)}
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────────
export default function VibeCurator() {
  const [activeFarm, setActiveFarm] = useState(FARMS[0]);
  const [selectedStrain, setSelectedStrain] = useState(null);
  const [view, setView] = useState("farm"); // "farm" | "all"

  return (
    <div style={{
      minHeight:"100vh",
      background:"#09090B",
      color:"#E8E0D0",
      maxWidth:500,
      margin:"0 auto",
      fontFamily:"Georgia,serif",
      position:"relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { display:none; }
        body { background:#09090B; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{padding:"32px 20px 16px",borderBottom:"1px solid rgba(232,224,208,0.06)"}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,letterSpacing:"0.22em",textTransform:"uppercase",color:"#3A3028",marginBottom:8}}>
          Vibe Curator · Terpene Beer Pairing
        </div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:"#F0E8D8",lineHeight:1.1,marginBottom:4}}>
          Strain × Beer
        </h1>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#4A4035",lineHeight:1.6}}>
          Bay Area & Sonoma · Emerald Triangle Farms · Terpene Source Independence
        </p>
      </div>

      {/* ── VIEW TOGGLE ── */}
      <div style={{display:"flex",borderBottom:"1px solid rgba(232,224,208,0.06)"}}>
        {[{id:"farm",label:"By Farm"},{id:"all",label:"All Strains"}].map(v => (
          <button key={v.id} onClick={() => setView(v.id)} style={{
            flex:1,padding:"12px",background:"none",
            border:"none",cursor:"pointer",
            fontFamily:"'DM Sans',sans-serif",fontSize:11,
            letterSpacing:"0.1em",textTransform:"uppercase",
            color:view===v.id?"#E8E0D0":"#4A4035",
            borderBottom:`2px solid ${view===v.id?"rgba(232,224,208,0.4)":"transparent"}`,
          }}>{v.label}</button>
        ))}
      </div>

      {view==="farm" ? (
        <>
          {/* ── FARM SELECTOR (horizontal scroll) ── */}
          <div style={{overflowX:"auto",display:"flex",gap:8,padding:"14px 20px",
            borderBottom:"1px solid rgba(232,224,208,0.06)"}}>
            {FARMS.map(f => (
              <button key={f.id} onClick={() => setActiveFarm(f)} style={{
                flexShrink:0,background:activeFarm.id===f.id?`${f.color}18`:"none",
                border:`1px solid ${activeFarm.id===f.id?f.color:"rgba(232,224,208,0.1)"}`,
                borderRadius:4,padding:"8px 12px",cursor:"pointer",textAlign:"left",
              }}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:12,
                  color:activeFarm.id===f.id?f.color:"#7A7060",lineHeight:1.2,whiteSpace:"nowrap"}}>{f.name}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"#3A3028",whiteSpace:"nowrap"}}>{f.county}</div>
              </button>
            ))}
          </div>

          {/* ── FARM STRAIN LIST ── */}
          <div style={{padding:"16px 20px"}}>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:"0.15em",textTransform:"uppercase",
              color:"#3A3028",marginBottom:12}}>
              {activeFarm.strains.length} {activeFarm.strains.length===1?"Strain":"Strains"} · {activeFarm.county}
            </div>
            {activeFarm.strains.map(strain => {
              const energyColors = {HIGH:"#D4C85C",MEDIUM:"#8EAE68",LOW:"#8EAEC8"};
              const domTerpene = strain.terpenes[0];
              return (
                <div key={strain.id} onClick={() => setSelectedStrain({...strain, farmName:activeFarm.name, farmColor:activeFarm.color})}
                  style={{
                    background:"rgba(255,255,255,0.025)",border:"1px solid rgba(232,224,208,0.07)",
                    borderLeft:`3px solid ${activeFarm.color}`,borderRadius:4,
                    padding:"14px 16px",marginBottom:8,cursor:"pointer",
                    transition:"all 0.2s",
                  }}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                    <div>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"#F0E8D8",lineHeight:1.2,marginBottom:2}}>
                        {strain.name}
                      </div>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#5A5040"}}>
                        {strain.aroma.join(" · ")}
                      </div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:energyColors[strain.energy],marginBottom:2}}>
                        {strain.energy}
                      </div>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"#3A3028"}}>{strain.total}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                      {strain.effects.map(e => (
                        <span key={e} style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,padding:"1px 6px",
                          borderRadius:20,border:`1px solid ${activeFarm.color}33`,
                          color:activeFarm.color,background:`${activeFarm.color}0D`}}>{e}</span>
                      ))}
                    </div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:TC[domTerpene.name]||"#888",
                      border:`1px solid ${TC[domTerpene.name]||"#888"}44`,padding:"1px 7px",borderRadius:20,
                      letterSpacing:"0.05em",flexShrink:0,marginLeft:6}}>
                      {domTerpene.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* ── ALL STRAINS VIEW ── */
        <div style={{padding:"16px 20px"}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:"0.15em",textTransform:"uppercase",
            color:"#3A3028",marginBottom:14}}>
            {ALL_STRAINS.length} Strains · 14 Farms · Emerald Triangle
          </div>
          {FARMS.map(farm => (
            <div key={farm.id} style={{marginBottom:24}}>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:"0.15em",textTransform:"uppercase",
                color:farm.color,marginBottom:8,borderBottom:`1px solid ${farm.color}33`,paddingBottom:6}}>
                {farm.name} · {farm.county}
              </div>
              {farm.strains.map(strain => {
                const energyColors = {HIGH:"#D4C85C",MEDIUM:"#8EAE68",LOW:"#8EAEC8"};
                return (
                  <div key={strain.id}
                    onClick={() => setSelectedStrain({...strain,farmName:farm.name,farmColor:farm.color})}
                    style={{
                      display:"flex",justifyContent:"space-between",alignItems:"center",
                      padding:"10px 12px",marginBottom:5,cursor:"pointer",
                      background:"rgba(255,255,255,0.02)",
                      border:"1px solid rgba(232,224,208,0.06)",
                      borderLeft:`2px solid ${farm.color}`,borderRadius:3,
                    }}>
                    <div>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:"#E8E0D0"}}>{strain.name}</div>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#4A4035"}}>{strain.aroma.slice(0,2).join(" · ")}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:energyColors[strain.energy]}}>{strain.energy}</div>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:`${TC[strain.terpenes[0].name]||"#888"}`}}>
                        {strain.terpenes[0].name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* ── FOOTER ── */}
      <div style={{padding:"12px 20px 32px",borderTop:"1px solid rgba(232,224,208,0.05)"}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:"#2A2018",letterSpacing:"0.1em",textAlign:"center"}}>
          Vibe Curator · Terpene Source Independence · Solful × Emerald Triangle
        </div>
      </div>

      {/* ── STRAIN DETAIL SHEET ── */}
      {selectedStrain && <StrainDetail strain={selectedStrain} onClose={() => setSelectedStrain(null)}/>}
    </div>
  );
}
