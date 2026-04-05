import { useState, useMemo, useRef, useEffect } from "react";

const T={"β-Caryophyllene":"#C8A97E","Limonene":"#D4C85C","Myrcene":"#8EAE68","α-Humulene":"#7C9082","Linalool":"#9B7BA8","α-Bisabolol":"#8EAEC8","α-Pinene":"#5C8E6B","β-Ocimene":"#B8785C","Terpinolene":"#6BAE8E","trans-β-Farnesene":"#D4B88E","1,8-Cineole":"#4A9B7F","Citral":"#D4A84B","Carvone":"#6B8E5C","Thymol":"#8E7C5C","Menthol":"#6BAE8E","Estragole":"#B8785C"};
const EC={HIGH:"#5C8E6B",MEDIUM:"#C8A97E",LOW:"#9B7BA8"};
const P={bg:"#FAF7F2",bg2:"#F3EDE4",dark:"#1A2E1A",gold:"#C4943D",goldLight:"#C4943D18",text:"#2C2C2A",text2:"#6B6960",text3:"#A09E94",card:"#FFFFFF",shadow:"0 2px 12px rgba(0,0,0,0.06)",shadowHover:"0 4px 20px rgba(0,0,0,0.1)"};

const SP={
1:{t:"Clear Headed Grooves",u:"https://open.spotify.com/playlist/37i9dQZF1FwRiTvcvVxYuT"},
2:{t:"Lazy Afternoon Vibes",u:"https://open.spotify.com/playlist/37i9dQZF1FwTeBbEQPOa4D"},
3:{t:"Blissful Sleep Descent",u:"https://open.spotify.com/playlist/37i9dQZF1FwQSEAicBEljP"},
4:{t:"Golden Hour Backyard Grooves",u:"https://open.spotify.com/playlist/37i9dQZF1FwKBj5S7cXQfY"},
5:{t:"Gentle Dissolve To Deep Rest",u:"https://open.spotify.com/playlist/37i9dQZF1FwJAlwqZhgyQg"},
6:{t:"Quietly Grateful Contemplation",u:"https://open.spotify.com/playlist/37i9dQZF1FwWid1rBsRkVP"},
7:{t:"Tropical Sunrise Clarity",u:"https://open.spotify.com/playlist/37i9dQZF1FwRJAMwn5kAfO"},
8:{t:"Vibrant Vocal Energy",u:"https://open.spotify.com/playlist/37i9dQZF1FwUIPTsUFG0FN"},
9:{t:"Effervescent Funk & Feel-Good House",u:"https://open.spotify.com/playlist/37i9dQZF1Fx3keFOTjUeg1"},
10:{t:"Warm Gathering Grooves",u:"https://open.spotify.com/playlist/37i9dQZF1FwRJwUJNtcq0J"},
11:{t:"Velvet Cushioned Euphoria",u:"https://open.spotify.com/playlist/37i9dQZF1FwJ4IIdKxJUvk"},
12:{t:"Social Magnetism",u:"https://open.spotify.com/playlist/37i9dQZF1FwSoERXS2piSg"},
13:{t:"Cozy Intellectual Escape",u:"https://open.spotify.com/playlist/37i9dQZF1FwVceLoZOhfv0"},
14:{t:"Redwood Forest Forward Motion",u:"https://open.spotify.com/playlist/37i9dQZF1FwUv4tfukjmOS"},
15:{t:"Golden California Drive",u:"https://open.spotify.com/playlist/37i9dQZF1FwXg5Nz3J9Deo"},
16:{t:"Spring Afternoon Polish",u:"https://open.spotify.com/playlist/37i9dQZF1FwON0Gl0oxfFx"},
17:{t:"Warm Gathering Grooves",u:"https://open.spotify.com/playlist/37i9dQZF1FwRJwUJNtcq0J"},
18:{t:"Clear Focus Instrumental Jazz",u:"https://open.spotify.com/playlist/37i9dQZF1FwWZTxNep5ThD"},
19:{t:"Velvet Fireworks",u:"https://open.spotify.com/playlist/37i9dQZF1FwScIToDdQoXg"},
20:{t:"Grateful Evening Exhale",u:"https://open.spotify.com/playlist/37i9dQZF1FwZYknyiZS0iE"},
21:{t:"Golden Hour Grooves",u:"https://open.spotify.com/playlist/37i9dQZF1FwP8MqLtYUUeg"},
22:{t:"Total Surrender: A Slow Descent",u:"https://open.spotify.com/playlist/37i9dQZF1FwOgG2zVmz91Z"},
23:{t:"Candlelight Glow",u:"https://open.spotify.com/playlist/37i9dQZF1FwX01hmnDkjbM"},
24:{t:"Sun-Bleached Ocean Drift",u:"https://open.spotify.com/playlist/37i9dQZF1Fx1ienexiYIXj"},
};

const ingredients=[
  {cat:"Garden herbs",items:[
    {nm:"Prospera basil",terps:["Myrcene","β-Ocimene","Linalool","α-Pinene"],strains:[1,2,3,5,7,8,9,12,13,14,15,16,17,18,19]},
    {nm:"Spearmint",terps:["Myrcene","β-Ocimene","Carvone","α-Pinene"],strains:[6,7,8,10,14]},
    {nm:"Spice Islands rosemary",terps:["α-Pinene","1,8-Cineole","β-Caryophyllene","Myrcene"],strains:[1,2,3,4,5,7,8,11,12,14,15,17,18,19,22]},
    {nm:"Lemon verbena",terps:["Citral","Limonene","1,8-Cineole"],strains:[9]},
    {nm:"English lavender",terps:["Linalool"],strains:[]},
    {nm:"Provence lavender",terps:["1,8-Cineole","Linalool"],strains:[]},
    {nm:"Golden lemon thyme",terps:["Thymol","Limonene","Citral"],strains:[]},
    {nm:"Fresh sage",terps:["α-Humulene"],strains:[1,11,16,17,21,22]},
    {nm:"Lemon basil",terps:["Limonene","Citral","β-Ocimene"],strains:[]},
  ]},
  {cat:"Citrus juices",items:[
    {nm:"Lemon juice",terps:["Limonene"],strains:[1,2,3,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24]},
    {nm:"Lime juice",terps:["Limonene","Myrcene"],strains:[3,4,10,11,14,19]},
    {nm:"Mandarin juice",terps:["Limonene"],strains:[6,8,9,21,22]},
    {nm:"Pink grapefruit juice",terps:["Limonene","Terpinolene"],strains:[1,4,7,12,13,15,16,18,23]},
  ]},
  {cat:"Fruit juices & purees",items:[
    {nm:"Tart cherry juice",terps:["Limonene"],strains:[2,11,16,21,22]},
    {nm:"Pineapple juice",terps:["Limonene","β-Caryophyllene","Myrcene"],strains:[10,17]},
    {nm:"Green apple juice",terps:["Terpinolene","Limonene"],strains:[3,12,24]},
    {nm:"Frozen raspberries",terps:["Myrcene"],strains:[17]},
    {nm:"Frozen blueberries",terps:["Myrcene","Limonene"],strains:[23]},
    {nm:"Frozen berry blend",terps:["Myrcene","Limonene"],strains:[13,18]},
    {nm:"Frozen peach slices",terps:["Limonene"],strains:[15]},
    {nm:"Frozen banana",terps:["Myrcene"],strains:[24]},
    {nm:"Fresh kiwis",terps:["Myrcene"],strains:[19]},
    {nm:"Fresh mango",terps:["Myrcene"],strains:[8]},
    {nm:"Fresh watermelon",terps:["Myrcene"],strains:[20]},
    {nm:"Fresh papaya",terps:["Myrcene","Limonene"],strains:[24]},
    {nm:"Guava puree",terps:["Limonene","Myrcene"],strains:[4]},
  ]},
  {cat:"Spices & aromatics",items:[
    {nm:"Black pepper",terps:["β-Caryophyllene"],strains:[1,2,4,5,6,7,8,10,11,12,14,15,16,17,18,19,20,22,23]},
    {nm:"Ground cinnamon",terps:["β-Caryophyllene"],strains:[3,5,6,8,11,13,20,24]},
    {nm:"Cardamom pods",terps:["β-Caryophyllene"],strains:[2,9,11]},
    {nm:"Ground nutmeg",terps:["β-Caryophyllene"],strains:[16,22]},
    {nm:"Fresh ginger",terps:["β-Caryophyllene","α-Humulene"],strains:[1,2,4,7,10,15,17]},
  ]},
  {cat:"Sweeteners & extracts",items:[
    {nm:"Honey",terps:[],strains:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]},
    {nm:"Vanilla extract",terps:[],strains:[2,11,12,13,22,23,24]},
    {nm:"Lavender flavor",terps:["Linalool"],strains:[1,9,10,16,17,18,19,21]},
    {nm:"Orange flavor",terps:["Limonene"],strains:[8,9]},
  ]},
  {cat:"Teas & infusions",items:[
    {nm:"Chamomile tea",terps:["α-Bisabolol"],strains:[9,10,13,17,20,23]},
    {nm:"Mint tea blend",terps:["Menthol","Myrcene"],strains:[7,8,14,18]},
    {nm:"Earl Grey tea",terps:["Terpinolene","Limonene"],strains:[20]},
  ]},
];

const S=[
{id:1,nm:"Mike's Bomba",fm:"Glentucky Family Farm",rg:"Sonoma",en:"LOW",fx:"Relaxed · Calm · Alert",in:"Grounded calm with clear mental edges",ar:"Fuel, Lemon Cream, Forest Floor",thc:"28.76",cbd:"0.09",ex:"",tt:"1.38",tp:[{n:"β-Caryophyllene",p:45},{n:"Limonene",p:31},{n:"α-Humulene",p:17},{n:"Linalool",p:7}],oi:"Black Pepper (20), Lemon (10), Sage (8), Lavender (2)",ig:["2.5 oz pink grapefruit juice","1 oz lemon juice","0.75 oz fresh ginger juice","1 fresh rosemary sprig","0.25 oz honey","Pinch sage powder","Pinch black pepper","2 drops lavender flavor","2 oz sparkling water"],st:["Press 1 oz fresh ginger root through a fine grater","Steep rosemary in 1 oz warm water for 3 min, strain","Combine grapefruit, lemon, and ginger juices","Add rosemary water, honey, sage, pepper, lavender flavor","Pour over ice, top with sparkling water","Garnish with rosemary sprig"],vb:["Grounded & Present"],bg:"#F0EDE6",c1:"#C8A97E",c2:"#7C9082"},
{id:2,nm:"Natty Bumppo",fm:"Moon Gazer Farms",rg:"Mendocino",en:"LOW",fx:"Happy · Carefree · Relaxed",in:"Loose and easy, happily untethered",ar:"Kerosene, Musk, Sour Plum",thc:"32.00",cbd:"",ex:"",tt:"1.86",tp:[{n:"β-Caryophyllene",p:44},{n:"Limonene",p:25},{n:"α-Humulene",p:18},{n:"Myrcene",p:13}],oi:"Black Pepper (14), Lemon (10), Sage (6), Lemongrass (6), Geranium (4)",ig:["2.5 oz tart cherry juice","0.5 oz lemon juice","0.5 oz cardamom-vanilla syrup","0.5 oz fresh ginger juice","Pinch black pepper","1 fresh rosemary sprig","2 oz mineral water"],st:["Make syrup: crack 5 cardamom pods in 4 oz water + 2 oz honey + vanilla, simmer 5 min","Press fresh ginger to yield 0.5 oz","Steep rosemary in 1 oz warm water for 2 min, strain","Combine tart cherry, lemon, ginger, rosemary water, and syrup","Add black pepper, stir with ice for 8 seconds","Strain into rocks glass with large ice"],vb:["Grounded & Present","Social & Bright"],bg:"#F2ECE4",c1:"#993556",c2:"#C8A97E"},
{id:3,nm:"Black Lime Chem",fm:"Moon Gazer Farms",rg:"Mendocino",en:"LOW",fx:"Heavy · Blissful · Sleepy",in:"Weighted bliss melting toward rest",ar:"Sharp Lime, Rhubarb, Glue",thc:"19.00",cbd:"",ex:"",tt:"3.08",tp:[{n:"Myrcene",p:67},{n:"α-Pinene",p:15},{n:"β-Caryophyllene",p:11},{n:"β-Ocimene",p:7}],oi:"Lemongrass (16), Pine (8), Black Pepper (6), Basil (6), Lemon (4)",ig:["2 oz lime juice","1.5 oz green apple juice","1 rosemary sprig","4 basil leaves","0.25 oz cinnamon-honey syrup","Pinch cinnamon","1 oz mineral water"],st:["Simmer 1 cinnamon stick in 2 oz water + 1 oz honey, 5 min","Press 1 green apple, blend and strain","Steep rosemary 2 min, strain. Muddle basil","Combine all with cinnamon, stir with ice","Strain into rocks glass, add mineral water"],vb:["Deep Rest"],bg:"#E4EBE0",c1:"#5C8E6B",c2:"#085041"},
{id:4,nm:"Guava Gift",fm:"Alpenglow Farms",rg:"Humboldt",en:"HIGH",fx:"Social · Inspiring · Euphoric",in:"Open and expansive, easy social lift",ar:"Fresh Guava, Lemon Rind, Tamarind",thc:"29.00",cbd:"0.08",ex:"",tt:"2.34",tp:[{n:"β-Caryophyllene",p:38},{n:"Limonene",p:26},{n:"Myrcene",p:17},{n:"α-Humulene",p:13}],oi:"Black Pepper (14), Grapefruit (10), Lemongrass (8), Basil (6), Rosemary (2)",ig:["2.5 oz guava puree","1 oz grapefruit juice","0.5 oz lime juice","0.5 oz ginger juice","4 basil leaves","1 rosemary sprig","Pinch black pepper","0.25 oz honey","1.5 oz sparkling water"],st:["Halve 3-4 guavas, scoop flesh, blend and strain","Steep rosemary 2 min, strain. Muddle basil","Combine all ingredients, stir with ice","Strain into highball, top with sparkling water"],vb:["Social & Bright"],bg:"#F4EDE6",c1:"#F0997B",c2:"#D85A30"},
{id:5,nm:"Mule Fuel",fm:"Alpenglow Farms",rg:"Humboldt",en:"LOW",fx:"Happy · Hungry · Sleepy",in:"Gentle contentment settling toward rest",ar:"Skunk, Diesel, Lemon, Leather",thc:"28.69",cbd:"0.07",ex:"",tt:"3.97",tp:[{n:"Myrcene",p:66},{n:"α-Pinene",p:16},{n:"β-Caryophyllene",p:10},{n:"Limonene",p:8}],oi:"Lemongrass (20), Pine (8), Black Pepper (6), Lemon (6)",ig:["4 lemongrass stalks","1 oz lemon juice","2 rosemary sprigs","4 basil leaves","Pinch black pepper","Pinch cinnamon","0.25 oz honey","1.5 oz mineral water"],st:["Peel and smash lemongrass, cold press, strain","Steep rosemary 3 min, strain. Muddle basil","Combine all, stir with ice 10 seconds","Strain into rocks glass, add mineral water"],vb:["Deep Rest","Body Melt"],bg:"#E4E2DA",c1:"#888780",c2:"#5C8E6B"},
{id:6,nm:"Satsuma Sherbet",fm:"Alpenglow Farms",rg:"Humboldt",en:"LOW",fx:"Happy · Contemplative · Comfortable",in:"Quiet ease with thoughtful undertones",ar:"Mandarin Orange, Mochi, Mint",thc:"26.00",cbd:"",ex:"",tt:"1.85",tp:[{n:"Limonene",p:44},{n:"β-Caryophyllene",p:36},{n:"α-Humulene",p:10},{n:"Myrcene",p:9}],oi:"Sweet Orange (16), Black Pepper (12), Sage (4), Lemongrass (4), Peppermint (4)",ig:["4 oz mandarin juice","0.5 oz lemon juice","4 spearmint leaves","0.25 oz honey","Pinch cinnamon","Pinch black pepper","1.5 oz mineral water"],st:["Muddle spearmint leaves gently","Add mandarin and lemon juice","Stir in honey, cinnamon, and black pepper","Add ice, pour mineral water down the side"],vb:["Grounded & Present","Cozy Comfort"],bg:"#FEF4E8",c1:"#EF9F27",c2:"#FAC775"},
{id:7,nm:"Tropical Sleigh Ride",fm:"Greenshock Farms",rg:"Mendocino",en:"HIGH",fx:"Joyful · Alert · Euphoric",in:"Vivid lift with present clarity",ar:"Peppermint, Honeysuckle, Ginger",thc:"17.00",cbd:"",ex:"",tt:"2.35",tp:[{n:"β-Ocimene",p:37},{n:"β-Caryophyllene",p:37},{n:"α-Humulene",p:15},{n:"Limonene",p:12}],oi:"Basil (14), Black Pepper (12), Peppermint (6), Grapefruit (4), Geranium (4)",ig:["2 oz grapefruit juice","0.5 oz ginger juice","8 spearmint leaves","5 basil leaves","0.5 oz mint tea","0.25 oz honey","Pinch black pepper","2 oz sparkling water"],st:["Muddle spearmint and basil gently","Add grapefruit, ginger, mint tea, honey, pepper","Shake with ice 8 seconds, strain into highball","Top with sparkling water"],vb:["Creative Flow","Euphoric Lift"],bg:"#E6F1EB",c1:"#B8785C",c2:"#C8A97E"},
{id:8,nm:"Purple Candy Cane",fm:"Greenshock Farms",rg:"Mendocino",en:"HIGH",fx:"Energized · Invigorated · Talkative",in:"Vibrant and vocal, fully awake",ar:"Mango, Peppermint Candy, Orange Blossom",thc:"22.00",cbd:"",ex:"",tt:"1.55",tp:[{n:"Myrcene",p:46},{n:"β-Caryophyllene",p:26},{n:"α-Pinene",p:17},{n:"α-Humulene",p:11}],oi:"Lemongrass (12), Black Pepper (8), Sweet Orange (8), Pine (6), Peppermint (4), Sage (2)",ig:["1.5 cups mango chunks","1 oz mandarin juice","6 spearmint leaves","1 rosemary sprig","0.5 oz mint tea","3 drops orange flavor","Pinch cinnamon","0.25 oz honey"],st:["Blend mango until smooth, strain","Steep rosemary 2 min, strain. Muddle spearmint","Combine all ingredients","Pour over crushed ice, garnish with mint"],vb:["Creative Flow","Social & Bright"],bg:"#F0E8F4",c1:"#534AB7",c2:"#EF9F27"},
{id:9,nm:"Carambola",fm:"Higher Heights",rg:"Mendocino",en:"HIGH",fx:"Energetic · Fun · Giggly",in:"Light and playful, effervescent energy",ar:"Orange, Diesel, Incense",thc:"20.00",cbd:"",ex:"",tt:"1.45",tp:[{n:"Limonene",p:53},{n:"β-Caryophyllene",p:22},{n:"Linalool",p:14},{n:"α-Bisabolol",p:11}],oi:"Sweet Orange (16), Rosemary (8), Lavender (6), German Chamomile (6), Black Pepper (4)",ig:["3 oz mandarin juice","1 oz grapefruit juice","0.5 oz lemon juice","0.5 oz cardamom-honey syrup","1 oz chamomile tea","3 drops orange flavor","2 drops lavender flavor","3 lemon verbena leaves","2 oz sparkling water"],st:["Crack 3-4 cardamom pods, steep in warm water + honey 5 min","Brew chamomile tea strong, cool","Combine mandarin, grapefruit, lemon juices","Add syrup, chamomile, flavors, bruised verbena","Shake with ice, strain over fresh ice","Top with sparkling water"],vb:["Creative Flow","Social & Bright","Euphoric Lift"],bg:"#FEF8E8",c1:"#EF9F27",c2:"#FAC775"},
{id:10,nm:"Pineapple Mojito",fm:"Higher Heights",rg:"Mendocino",en:"MEDIUM",fx:"Relaxed · Grounded · Euphoric",in:"Rooted ease with a quiet glow",ar:"Pineapple, Ginger, Mint, Gas",thc:"24.00",cbd:"",ex:"CBG 1% · THCv 1% · CBC 1%",tt:"2.55",tp:[{n:"β-Caryophyllene",p:31},{n:"Limonene",p:28},{n:"α-Bisabolol",p:12},{n:"α-Humulene",p:9}],oi:"7-oil blend",ig:["2.5 oz pineapple juice","0.5 oz lime juice","0.5 oz lemon juice","0.75 oz ginger juice","8 spearmint leaves","0.5 oz chamomile tea","0.25 oz honey","2 drops lavender flavor","2 oz sparkling water"],st:["Muddle spearmint in highball glass","Add lime, lemon, pineapple, and ginger juices","Stir in chamomile tea, honey, lavender flavor","Fill with crushed ice, top with sparkling water"],vb:["Grounded & Present","Cozy Comfort"],bg:"#F0F4E8",c1:"#D4C85C",c2:"#C8A97E"},
{id:11,nm:"Rasta Governmint",fm:"Higher Heights",rg:"Mendocino",en:"LOW",fx:"Euphoric · Supremely Relaxed",in:"Profound ease with cushioned edges",ar:"Sour Cherry, Frankincense, Oak",thc:"19.00",cbd:"",ex:"",tt:"1.92",tp:[{n:"β-Caryophyllene",p:45},{n:"Limonene",p:30},{n:"α-Humulene",p:13},{n:"Myrcene",p:12}],oi:"Black Pepper (14), Lemon (10), Rosemary (6), Sage (6), Geranium (4)",ig:["3 oz tart cherry juice","0.5 oz lime juice","0.5 oz cardamom-honey syrup","0.25 oz vanilla extract","Pinch cinnamon","Pinch black pepper","1 sage leaf","1 rosemary sprig","1 oz mineral water"],st:["Steep rosemary and sage 2 min, strain","Combine cherry, lime, syrup, and vanilla","Add herb water, cinnamon, pepper, stir with ice","Strain into rocks glass, add mineral water"],vb:["Grounded & Present","Deep Rest"],bg:"#EDE6E0",c1:"#791F1F",c2:"#A32D2D"},
{id:12,nm:"Pink Rider",fm:"Higher Heights",rg:"Mendocino",en:"HIGH",fx:"Motivated · Creative · Social",in:"Vivid creative lift with social magnetism",ar:"Lemon Bar, Pink Grapefruit, Sugar Cookie",thc:"26.00",cbd:"",ex:"",tt:"1.44",tp:[{n:"Terpinolene",p:39},{n:"β-Caryophyllene",p:22},{n:"β-Ocimene",p:20},{n:"Limonene",p:18}],oi:"Tea Tree (12), Black Pepper (8), Basil (8), Lemon (6), Lavender (4), Geranium (2)",ig:["2.75 oz pink grapefruit juice","0.75 oz lemon juice","0.75 oz green apple juice","0.25 oz vanilla extract","0.25 oz honey","3 basil leaves","1 rosemary sprig","Pinch black pepper","1.5 oz mineral water"],st:["Press green apples, blend and strain","Combine grapefruit, lemon, and apple juice","Muddle basil and rosemary gently","Add vanilla, honey, pepper, stir with ice","Strain over fresh ice, add mineral water"],vb:["Creative Flow","Social & Bright"],bg:"#FDF0E8",c1:"#E87A90",c2:"#D4537E"},
{id:13,nm:"Strawberry Biscotti",fm:"Happy Day Farms",rg:"Mendocino",en:"MEDIUM",fx:"Comforting · Mentally Engaging",in:"Cozy anchor with a curious mind",ar:"Kettle Corn, Sour Strawberry Candy",thc:"32.00",cbd:"",ex:"CBG 2%",tt:"1.48",tp:[{n:"Limonene",p:36},{n:"β-Caryophyllene",p:28},{n:"Myrcene",p:24},{n:"α-Bisabolol",p:12}],oi:"Bergamot (14), Black Pepper (10), Lemongrass (8), German Chamomile (6), Clove (2)",ig:["1 cup frozen berry blend","1 oz grapefruit juice","0.5 oz lemon juice","1 oz chamomile tea","0.25 oz cinnamon-honey syrup","0.25 oz vanilla extract","Pinch black pepper"],st:["Thaw berries, blend, strain","Combine with grapefruit, lemon, chamomile tea","Stir in syrup, vanilla, pepper","Pour over ice, garnish with cinnamon dust"],vb:["Cozy Comfort"],bg:"#FBEAF0",c1:"#D4537E",c2:"#993556"},
{id:14,nm:"Avenue of the Giants",fm:"Happy Day Farms",rg:"Mendocino",en:"HIGH",fx:"Energizing · Buzzy · Motivating",in:"Forward momentum with electric clarity",ar:"Pine Needles, Menthol, Jasmine",thc:"22.00",cbd:"",ex:"CBG 2%",tt:"3.48",tp:[{n:"Myrcene",p:68},{n:"β-Caryophyllene",p:15},{n:"α-Pinene",p:9},{n:"β-Ocimene",p:8}],oi:"Lemongrass (16), Pine (8), Black Pepper (6), Basil (4), Peppermint (4), Geranium (2)",ig:["4 lemongrass stalks","1 oz lime juice","0.5 oz mint tea","2 rosemary sprigs","5 basil leaves","3 spearmint leaves","Pinch black pepper","0.25 oz honey","2 oz sparkling water"],st:["Peel and smash lemongrass, cold press, strain","Steep rosemary 2 min, strain","Muddle basil and spearmint gently","Add all juices, herb water, pepper, honey, stir with ice","Strain into highball, top with sparkling water","Drink within 30 minutes"],vb:["Creative Flow","Euphoric Lift"],bg:"#E8F0E6",c1:"#8EAE68",c2:"#5C8E6B"},
{id:15,nm:"Peach Flambé",fm:"TBD",rg:"Emerald Triangle",en:"HIGH",fx:"Euphoric · Bright · Joyful",in:"Warm euphoric glow",ar:"Peach, Bergamot, Warm Spice",thc:"19.00",cbd:"",ex:"",tt:"1.05",tp:[{n:"Limonene",p:40},{n:"β-Caryophyllene",p:30},{n:"β-Ocimene",p:18},{n:"α-Humulene",p:12}],oi:"TBD",ig:["1 cup frozen peach slices","1.5 oz grapefruit juice","0.5 oz lemon juice","0.5 oz ginger juice","3 basil leaves","Pinch cinnamon","0.25 oz honey","Pinch black pepper","1.5 oz sparkling water"],st:["Blend frozen peaches, strain","Press ginger, muddle basil","Combine all ingredients","Stir with ice, strain, top with sparkling water"],vb:["Euphoric Lift"],bg:"#FEF2E4",c1:"#EF9F27",c2:"#E87A90"},
{id:16,nm:"Tropicanna Cherry",fm:"Sunrise Gardens",rg:"Mendocino",en:"HIGH",fx:"Euphoric · Cerebral · Cheerful",in:"Bright lift with clear, lively edges",ar:"Sour Cherry, Sweet Citrus, Nutmeg",thc:"27.00",cbd:"",ex:"",tt:"1.18",tp:[{n:"β-Caryophyllene",p:40},{n:"Limonene",p:32},{n:"Linalool",p:16},{n:"α-Humulene",p:12}],oi:"Black Pepper (12), Sweet Orange (10), Lavender (6), Geranium (6), Sage (4), Clove (2)",ig:["2.5 oz tart cherry juice","1 oz grapefruit juice","0.5 oz lemon juice","3 drops lavender flavor","Pinch nutmeg","1 sage leaf","Pinch black pepper","0.25 oz honey","1.5 oz sparkling water"],st:["Combine cherry, grapefruit, and lemon juices","Add lavender flavor, nutmeg, pepper, honey, bruised sage","Stir with ice 10 seconds, strain","Top with sparkling water, garnish with nutmeg dust"],vb:["Creative Flow","Euphoric Lift"],bg:"#FBEAF0",c1:"#A32D2D",c2:"#D4537E"},
{id:17,nm:"Pink Jesus Reserve",fm:"Sonoma Hills Farm",rg:"Sonoma",en:"HIGH",fx:"Social · Uplifting · Euphoric",in:"Buoyant and warm, ready to share",ar:"Raspberry, French Lavender, Pineapple",thc:"23.00",cbd:"",ex:"",tt:"1.89",tp:[{n:"β-Caryophyllene",p:49},{n:"Myrcene",p:24},{n:"α-Humulene",p:17},{n:"α-Bisabolol",p:9}],oi:"Black Pepper (14), Lemongrass (8), Lavender (6), Sage (6), German Chamomile (4), Geranium (2)",ig:["1 cup frozen raspberries","1.5 oz pineapple juice","0.5 oz lemon juice","4 drops lavender flavor","0.5 oz ginger juice","1 sage leaf","0.5 oz chamomile tea","0.25 oz honey","Pinch black pepper"],st:["Blend raspberries, fine-strain seeds","Press ginger, bruise sage","Combine all ingredients","Shake with ice 8 seconds, strain into coupe"],vb:["Social & Bright","Euphoric Lift"],bg:"#F4E8F0",c1:"#D4537E",c2:"#9B7BA8"},
{id:18,nm:"Love and Laughter",fm:"Heartrock Mountain Farm",rg:"Mendocino",en:"MEDIUM",fx:"Focusing · Energizing · Clear",in:"Clear and steady, nothing clouded",ar:"Flowers, Eucalyptus, Berries",thc:"1.00",cbd:"19.00",ex:"CBD strain",tt:"1.72",tp:[{n:"Myrcene",p:43},{n:"Terpinolene",p:22},{n:"β-Caryophyllene",p:15}],oi:"TBD (CBD strain)",ig:["1 cup frozen berry blend","1 oz grapefruit juice","0.5 oz lemon juice","1 rosemary sprig","3 basil leaves","0.5 oz mint tea","2 drops lavender flavor","Pinch black pepper","0.25 oz honey","1.5 oz sparkling water"],st:["Blend berries, strain","Steep rosemary 2 min, strain. Muddle basil","Combine all ingredients","Stir with ice, strain, top with sparkling water"],vb:["Calm Focus"],bg:"#E6F1F4",c1:"#85B7EB",c2:"#378ADD"},
{id:19,nm:"Glitter Bomb",fm:"Sol Spirit Farm",rg:"Trinity",en:"HIGH",fx:"Relaxing · Cerebral · Euphoric",in:"Body at ease, mind sparkling",ar:"Kiwi, Pine, Musk",thc:"26.00",cbd:"",ex:"",tt:"2.39",tp:[{n:"Myrcene",p:62},{n:"β-Caryophyllene",p:21},{n:"β-Ocimene",p:9},{n:"Linalool",p:8}],oi:"Lemongrass (18), Black Pepper (10), Basil (4), Lavender (4), Pine (4)",ig:["3 fresh kiwis","1 rosemary sprig","4 basil leaves","2 drops lavender flavor","Pinch black pepper","0.25 oz honey","0.5 oz lime juice","2 oz sparkling water"],st:["Peel and blend kiwis, strain","Steep rosemary 2 min, strain","Muddle basil, add all ingredients","Stir with ice, strain, top with sparkling water"],vb:["Euphoric Lift","Body Melt"],bg:"#EAF3DE",c1:"#97C459",c2:"#639922"},
{id:20,nm:"Moonlight",fm:"Moon Gazer Farms",rg:"Mendocino",en:"LOW",fx:"Relaxed · Calm · Grateful",in:"Soft gratitude in a settled body",ar:"Watermelon Candy, Citrus Zest, Earl Grey",thc:"26.00",cbd:"",ex:"",tt:"2.67",tp:[{n:"Myrcene",p:40},{n:"β-Caryophyllene",p:27},{n:"Terpinolene",p:20},{n:"α-Bisabolol",p:13}],oi:"Lemongrass (12), Black Pepper (10), Tea Tree (8), German Chamomile (6), Bergamot (4)",ig:["3 oz watermelon juice","1 oz Earl Grey tea","0.5 oz lemon juice","0.5 oz chamomile tea","Pinch cinnamon","Pinch black pepper","0.25 oz honey","1 oz mineral water"],st:["Blend watermelon, strain. Brew Earl Grey strong, cool","Combine all liquids","Stir in cinnamon, pepper, honey","Pour over ice, add mineral water"],vb:["Grounded & Present","Cozy Comfort"],bg:"#EDE8F0",c1:"#ED93B1",c2:"#9B7BA8"},
{id:21,nm:"Mandarin Cherry Tree",fm:"Sticky Fields",rg:"Mendocino",en:"LOW",fx:"Full Body Relaxation · Serenity",in:"Settled body, gently wandering mind",ar:"Mandarin Orange, Sandalwood, Lavender",thc:"28.00",cbd:"",ex:"",tt:"1.75",tp:[{n:"Limonene",p:46},{n:"β-Caryophyllene",p:32},{n:"α-Humulene",p:12},{n:"Linalool",p:10}],oi:"Sweet Orange (16), Black Pepper (10), Lavender (6), Sage (4), Ylang Ylang (4)",ig:["3 oz mandarin juice","1 oz tart cherry juice","0.5 oz lemon juice","3 drops lavender flavor","Pinch black pepper","1 sage leaf","0.25 oz honey","1 oz mineral water"],st:["Combine mandarin, cherry, and lemon juices","Bruise sage, add lavender flavor, pepper, honey","Pour over ice, add mineral water"],vb:["Cozy Comfort"],bg:"#F8EDE4",c1:"#EF9F27",c2:"#993556"},
{id:22,nm:"Pinnacle",fm:"Dos Rios Farms",rg:"Mendocino",en:"LOW",fx:"Blissful · Sedated · Content",in:"Total surrender, velvet quiet",ar:"Sweet Cream, Nutmeg, Earth",thc:"20.00",cbd:"",ex:"",tt:"TBD",tp:[{n:"β-Caryophyllene",p:35},{n:"Limonene",p:28},{n:"α-Humulene",p:20},{n:"trans-β-Farnesene",p:17}],oi:"Black Pepper, Rosemary, Sweet Orange, Sage, Ylang Ylang",ig:["2 oz mandarin juice","1 oz tart cherry juice","0.5 oz lemon juice","1 rosemary sprig","1 sage leaf","Pinch nutmeg","Pinch black pepper","0.25 oz vanilla extract","0.25 oz honey","1 oz mineral water"],st:["Steep rosemary and sage 3 min, strain","Combine mandarin, cherry, and lemon juices","Add herb water, nutmeg, pepper, vanilla, honey","Pour over large ice, add mineral water"],vb:["Deep Rest"],bg:"#E8E4E0",c1:"#C8A97E",c2:"#7C9082"},
{id:23,nm:"Blueberry Muffin",fm:"TBD",rg:"Emerald Triangle",en:"LOW",fx:"Comforting · Cozy · Warm",in:"Cozy comfort with warm blanket energy",ar:"Blueberry, Vanilla, Cinnamon",thc:"",cbd:"",ex:"",tt:"TBD",tp:[{n:"Limonene",p:36},{n:"β-Caryophyllene",p:28},{n:"Myrcene",p:24},{n:"α-Bisabolol",p:12}],oi:"TBD",ig:["1 cup frozen blueberries","1 oz grapefruit juice","0.5 oz lemon juice","1 oz chamomile tea","0.25 oz cinnamon-honey syrup","0.25 oz vanilla extract","Pinch black pepper","1 oz mineral water"],st:["Thaw blueberries, blend, strain","Combine with grapefruit, lemon, chamomile tea","Stir in syrup, vanilla, pepper","Pour over ice, garnish with cinnamon dust"],vb:["Cozy Comfort","Grounded & Present"],bg:"#EEEDFE",c1:"#534AB7",c2:"#3C3489"},
{id:24,nm:"Lemon Papaya Banana",fm:"TBD",rg:"Emerald Triangle",en:"LOW",fx:"Relaxed · Spacey · Euphoric",in:"Soft tropical body, expansive mind",ar:"Papaya, Honeydew Melon, Lemon Zest",thc:"27.00",cbd:"",ex:"",tt:"1.38",tp:[{n:"Myrcene",p:53},{n:"Limonene",p:27},{n:"β-Caryophyllene",p:15},{n:"α-Humulene",p:5}],oi:"Lemongrass (14), Lemon (10), Black Pepper (6), Geranium (6), Ylang Ylang (4)",ig:["1 cup fresh papaya","0.75 cup frozen banana","0.75 oz lemon juice","0.5 oz green apple juice","0.25 oz vanilla extract","Pinch cinnamon","0.25 oz honey","1 oz mineral water"],st:["Blend papaya and banana until smooth","Press green apple","Combine puree with lemon, apple, vanilla, cinnamon, honey","Add mineral water, pour over crushed ice"],vb:["Deep Rest","Body Melt"],bg:"#FEF6E4",c1:"#EF9F27",c2:"#FAC775"},
];

const VIBES=["All","Grounded & Present","Creative Flow","Deep Rest","Social & Bright","Body Melt","Euphoric Lift","Calm Focus","Cozy Comfort"];

function Illus({s,full}){
  const w=full?360:300,h=full?200:170;
  return <svg viewBox={`0 0 ${w} ${h}`} style={{width:"100%",display:"block"}}>
    <rect width={w} height={h} fill={s.bg}/>
    <circle cx={w/2} cy={h*0.45} r={h*0.35} fill={s.c1} opacity={0.08}/>
    <circle cx={w*0.38} cy={h*0.4} r={h*0.25} fill={s.c2} opacity={0.06}/>
    <rect x={w/2-30} y={h*0.12} width={60} height={h*0.55} rx={4} fill={s.c1} opacity={0.18}/>
    <rect x={w/2-30} y={h*0.12} width={60} height={h*0.55} rx={4} fill="none" stroke={s.c1} strokeWidth={0.7} opacity={0.25}/>
    <rect x={w/2-26} y={h*0.28} width={52} height={h*0.37} rx={3} fill={s.c1} opacity={0.28}/>
    <rect x={w/2-26} y={h*0.45} width={52} height={h*0.2} rx={3} fill={s.c2} opacity={0.14}/>
    <circle cx={w*0.22} cy={h*0.42} r={12} fill={s.c1} opacity={0.28}/>
    <circle cx={w*0.78} cy={h*0.48} r={9} fill={s.c2} opacity={0.18}/>
    <line x1={w*0.72} y1={h*0.32} x2={w*0.74} y2={h*0.18} stroke="#5C8E6B" strokeWidth={1} opacity={0.35}/>
    <ellipse cx={w*0.73} cy={h*0.23} rx={3.5} ry={6} fill="#5C8E6B" opacity={0.3} transform={`rotate(-10 ${w*0.73} ${h*0.23})`}/>
    <circle cx={w*0.35} cy={h*0.32} r={1.5} fill={s.bg} opacity={0.5}/>
    <circle cx={w*0.52} cy={h*0.28} r={1} fill={s.bg} opacity={0.4}/>
  </svg>;
}

function Card({s,onClick}){
  return <div onClick={onClick} style={{background:P.card,borderRadius:16,overflow:"hidden",cursor:"pointer",boxShadow:P.shadow,transition:"box-shadow 0.15s"}}>
    <Illus s={s}/>
    <div style={{padding:"12px 16px 16px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
        <span style={{fontWeight:600,fontSize:16,fontFamily:"Georgia,serif",color:P.text}}>{s.nm}</span>
        <span style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:P.text3}}>
          <span style={{width:7,height:7,borderRadius:7,background:EC[s.en],display:"inline-block"}}/>
          {s.en}
        </span>
      </div>
      <div style={{fontSize:11,color:P.text3,marginBottom:10}}>{s.fm}{s.fm!=="TBD"?` · ${s.rg}`:""}</div>
      <div style={{display:"flex",height:5,borderRadius:3,overflow:"hidden",marginBottom:10}}>
        {s.tp.map((t,i)=><div key={i} style={{width:`${t.p}%`,background:T[t.n]||"#ccc"}}/>)}
      </div>
      <div style={{fontSize:13,color:P.text2,fontStyle:"italic",lineHeight:1.5,fontFamily:"Georgia,serif"}}>{s.in}</div>
    </div>
  </div>;
}

function Detail({s,onClose}){
  return <div style={{background:P.bg}}>
    <div style={{position:"sticky",top:0,zIndex:10,background:P.dark,padding:"10px 16px",display:"flex",alignItems:"center"}}>
      <button onClick={onClose} style={{fontSize:14,color:"#ffffffcc",background:"none",border:"none",cursor:"pointer",fontWeight:500}}>← Back</button>
    </div>
    <Illus s={s} full/>
    <div style={{padding:"0 20px 24px"}}>
      <div style={{textAlign:"center",marginTop:20}}>
        <div style={{fontSize:26,fontWeight:600,fontFamily:"Georgia,serif",color:P.text}}>{s.nm}</div>
        <div style={{fontSize:12,color:P.text3,marginTop:2}}>{s.fm}{s.fm!=="TBD"?` · ${s.rg}`:""}</div>
      </div>
      <div style={{margin:"16px 0",padding:"12px 16px",background:P.bg2,borderLeft:`3px solid ${P.gold}`,borderRadius:"0 8px 8px 0",fontStyle:"italic",fontSize:16,color:P.text2,fontFamily:"Georgia,serif",lineHeight:1.5}}>"{s.in}"</div>
      <div style={{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap",marginBottom:16}}>
        <span style={{display:"flex",alignItems:"center",gap:4,fontSize:12,padding:"4px 12px",borderRadius:20,background:P.bg2,color:P.text2}}>
          <span style={{width:8,height:8,borderRadius:8,background:EC[s.en]}}/>
          {s.en} energy
        </span>
        {s.ex&&<span style={{fontSize:12,padding:"4px 12px",borderRadius:20,background:`${P.gold}15`,color:P.gold}}>{s.ex}</span>}
      </div>
      <div style={{textAlign:"center",fontSize:13,color:P.text2,marginBottom:4}}>{s.fx}</div>
      <div style={{textAlign:"center",fontSize:12,color:P.text3,marginBottom:20}}>Aroma: {s.ar}</div>

      <div style={{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap",marginBottom:24}}>
        {s.thc&&<div style={{padding:"8px 14px",borderRadius:10,background:P.card,boxShadow:P.shadow,textAlign:"center"}}>
          <div style={{fontSize:18,fontWeight:600,color:P.text}}>{s.thc}%</div>
          <div style={{fontSize:10,color:P.text3,textTransform:"uppercase",letterSpacing:1}}>THC</div>
        </div>}
        {s.cbd&&<div style={{padding:"8px 14px",borderRadius:10,background:P.card,boxShadow:P.shadow,textAlign:"center"}}>
          <div style={{fontSize:18,fontWeight:600,color:P.text}}>{s.cbd}%</div>
          <div style={{fontSize:10,color:P.text3,textTransform:"uppercase",letterSpacing:1}}>CBD</div>
        </div>}
        <div style={{padding:"8px 14px",borderRadius:10,background:P.card,boxShadow:P.shadow,textAlign:"center"}}>
          <div style={{fontSize:18,fontWeight:600,color:P.text}}>{s.tt}%</div>
          <div style={{fontSize:10,color:P.text3,textTransform:"uppercase",letterSpacing:1}}>Terpenes</div>
        </div>
      </div>

      <div style={{marginBottom:24}}>
        <div style={{fontSize:11,fontWeight:600,color:P.text3,marginBottom:8,textTransform:"uppercase",letterSpacing:1.5}}>Terpene profile</div>
        <div style={{display:"flex",height:10,borderRadius:5,overflow:"hidden",marginBottom:10}}>
          {s.tp.map((t,i)=><div key={i} style={{width:`${t.p}%`,background:T[t.n]||"#ccc"}}/>)}
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {s.tp.map((t,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,padding:"5px 10px",borderRadius:8,background:P.card,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
            <span style={{width:8,height:8,borderRadius:2,background:T[t.n]}}/>
            <span style={{color:P.text2}}>{t.n}</span>
            <span style={{fontWeight:600,color:P.text}}>{t.p}%</span>
          </div>)}
        </div>
      </div>

      <div style={{fontSize:12,color:P.text3,marginBottom:24}}>
        <span style={{fontWeight:600,textTransform:"uppercase",letterSpacing:1}}>Essential oils: </span>{s.oi}
      </div>

      {SP[s.id]&&<a href={SP[s.id].u} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:"#191414",borderRadius:12,marginBottom:20,textDecoration:"none",boxShadow:P.shadow}}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:11,color:"#1DB954",fontWeight:600,textTransform:"uppercase",letterSpacing:1}}>Sonic layer</div>
          <div style={{fontSize:13,color:"#ffffffdd",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{SP[s.id].t}</div>
        </div>
        <span style={{fontSize:12,color:"#ffffff80"}}>▶</span>
      </a>}

      <div style={{background:P.card,borderRadius:16,padding:20,boxShadow:P.shadow,marginBottom:20}}>
        <div style={{fontSize:11,fontWeight:600,color:P.gold,marginBottom:14,textTransform:"uppercase",letterSpacing:1.5}}>Juice recipe</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
          {s.ig.map((g,i)=><span key={i} style={{fontSize:12,padding:"4px 10px",borderRadius:20,background:P.bg2,color:P.text2}}>{g}</span>)}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {s.st.map((step,i)=><div key={i} style={{display:"flex",gap:12,fontSize:14,lineHeight:1.55}}>
            <span style={{width:26,height:26,borderRadius:13,background:P.gold,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,color:"#fff",flexShrink:0}}>{i+1}</span>
            <span style={{color:P.text,paddingTop:3}}>{step}</span>
          </div>)}
        </div>
      </div>
    </div>
  </div>;
}

function IngredientsPage({onStrainClick}){
  const [tf,setTf]=useState("All");
  const [q,setQ]=useState("");
  const scrollRef=useRef(null);
  const topTerps=["All","β-Caryophyllene","Limonene","Myrcene","α-Humulene","Linalool","α-Bisabolol","α-Pinene","β-Ocimene","Terpinolene"];

  const filtered=useMemo(()=>{
    return ingredients.map(cat=>({...cat,items:cat.items.filter(item=>{
      if(tf!=="All"&&!item.terps.includes(tf))return false;
      if(q&&!item.nm.toLowerCase().includes(q.toLowerCase()))return false;
      return true;
    })})).filter(cat=>cat.items.length>0);
  },[tf,q]);

  const total=filtered.reduce((a,c)=>a+c.items.length,0);

  return <div style={{padding:"16px 16px 100px"}}>
    <input type="text" placeholder="Search ingredients..." value={q} onChange={e=>setQ(e.target.value)} style={{width:"100%",padding:"10px 14px",borderRadius:12,border:"none",background:P.card,boxShadow:"0 1px 6px rgba(0,0,0,0.06)",fontSize:14,color:P.text,marginBottom:14,outline:"none",boxSizing:"border-box"}}/>

    <div ref={scrollRef} style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:8,marginBottom:16,WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}}>
      {topTerps.map(t=><button key={t} onClick={()=>setTf(t)} style={{padding:"6px 14px",fontSize:11,borderRadius:20,border:"none",background:tf===t?(T[t]||P.gold):P.card,color:tf===t?"#fff":P.text3,cursor:"pointer",whiteSpace:"nowrap",fontWeight:tf===t?600:400,boxShadow:tf===t?"none":"0 1px 4px rgba(0,0,0,0.04)",flexShrink:0}}>
        {t==="All"?"All terpenes":t}
      </button>)}
    </div>

    <div style={{fontSize:12,color:P.text3,marginBottom:12}}>{total} ingredient{total!==1?"s":""}</div>

    {filtered.map((cat,ci)=><div key={ci} style={{marginBottom:24}}>
      <div style={{fontSize:12,fontWeight:600,color:P.gold,marginBottom:10,textTransform:"uppercase",letterSpacing:1.5,borderBottom:`1.5px solid ${P.gold}30`,paddingBottom:6}}>{cat.cat}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {cat.items.map((item,ii)=>{
          const dt=item.terps[0];
          const usedIn=item.strains.map(sid=>S.find(s=>s.id===sid)).filter(Boolean);
          return <div key={ii} style={{background:P.card,borderRadius:12,boxShadow:P.shadow,overflow:"hidden",display:"flex"}}>
            {dt&&<div style={{width:4,background:T[dt]||"#ccc",flexShrink:0}}/>}
            <div style={{padding:"12px 14px",flex:1,minWidth:0}}>
              <div style={{fontWeight:600,fontSize:14,color:P.text,marginBottom:6}}>{item.nm}</div>
              {item.terps.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}>
                {item.terps.map((t,ti)=><span key={ti} style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:`${T[t]||"#ccc"}18`,color:T[t]||P.text2,fontWeight:500,display:"flex",alignItems:"center",gap:3}}>
                  <span style={{width:5,height:5,borderRadius:5,background:T[t]||"#ccc"}}></span>{t}
                </span>)}
              </div>}
              {usedIn.length>0&&<div>
                <div style={{fontSize:10,color:P.text3,marginBottom:4,textTransform:"uppercase",letterSpacing:0.8}}>{usedIn.length} strain{usedIn.length!==1?"s":""}</div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                  {usedIn.map((str,si)=><button key={si} onClick={(e)=>{e.stopPropagation();onStrainClick(str.id);}} style={{fontSize:10,padding:"3px 8px",borderRadius:6,background:str.bg,border:"none",color:str.c2,cursor:"pointer",fontWeight:500}}>{str.nm}</button>)}
                </div>
              </div>}
              {usedIn.length===0&&item.terps.length>0&&<div style={{fontSize:11,color:P.text3,fontStyle:"italic"}}>Garden supply — freestyle recipes</div>}
            </div>
          </div>;
        })}
      </div>
    </div>)}
  </div>;
}

export default function App(){
  const [page,setPage]=useState("recipes");
  const [sel,setSel]=useState(null);
  const [en,setEn]=useState("All");
  const [vb,setVb]=useState("All");
  const [q,setQ]=useState("");

  const filtered=useMemo(()=>S.filter(s=>{
    if(en!=="All"&&s.en!==en)return false;
    if(vb!=="All"&&!s.vb.includes(vb))return false;
    if(q&&!s.nm.toLowerCase().includes(q.toLowerCase())&&!s.fm.toLowerCase().includes(q.toLowerCase()))return false;
    return true;
  }),[en,vb,q]);

  if(sel){
    const s=S.find(x=>x.id===sel);
    return <div style={{maxWidth:480,margin:"0 auto",background:P.bg,minHeight:"100vh"}}>
      <Detail s={s} onClose={()=>setSel(null)}/>
    </div>;
  }

  const header=<div style={{background:P.dark,padding:"14px 20px",textAlign:"center"}}>
    <div style={{fontSize:22,fontWeight:600,fontFamily:"Georgia,serif",color:P.gold}}>Solful Sessions</div>
    <div style={{fontSize:11,color:"#ffffff60",marginTop:2,letterSpacing:0.5}}>The same molecule · Every plant · One body</div>
  </div>;

  const tabBar=<div style={{position:"fixed",bottom:0,left:0,right:0,background:P.dark,display:"flex",justifyContent:"center",zIndex:20,maxWidth:640,margin:"0 auto",borderTop:"1px solid #ffffff10"}}>
    {[["recipes","✦","Recipes"],["ingredients","◈","Ingredients"]].map(([k,icon,l])=>
      <button key={k} onClick={()=>{setPage(k);setSel(null);}} style={{flex:1,padding:"10px 0 12px",display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",cursor:"pointer",color:page===k?P.gold:"#ffffff50",transition:"color 0.15s"}}>
        <span style={{fontSize:18}}>{icon}</span>
        <span style={{fontSize:10,fontWeight:page===k?600:400,letterSpacing:0.5}}>{l}</span>
      </button>
    )}
  </div>;

  return <div style={{maxWidth:640,margin:"0 auto",background:P.bg,minHeight:"100vh",paddingBottom:80}}>
    {header}

    {page==="ingredients"&&<IngredientsPage onStrainClick={(id)=>{setSel(id);setPage("recipes");}}/>}

    {page==="recipes"&&<div style={{padding:"16px 16px 0"}}>
      <input type="text" placeholder="Search strains, farms..." value={q} onChange={e=>setQ(e.target.value)} style={{width:"100%",padding:"10px 14px",borderRadius:12,border:"none",background:P.card,boxShadow:"0 1px 6px rgba(0,0,0,0.06)",fontSize:14,color:P.text,marginBottom:14,outline:"none",boxSizing:"border-box"}}/>

      <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:10,paddingBottom:4,WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}}>
        {["All","HIGH","MEDIUM","LOW"].map(e=><button key={e} onClick={()=>setEn(e)} style={{padding:"6px 14px",fontSize:11,borderRadius:20,border:"none",background:en===e?(EC[e]||P.gold):P.card,color:en===e?"#fff":P.text3,cursor:"pointer",whiteSpace:"nowrap",fontWeight:en===e?600:400,boxShadow:en===e?"none":"0 1px 4px rgba(0,0,0,0.04)",flexShrink:0}}>{e==="All"?"All energy":e.charAt(0)+e.slice(1).toLowerCase()}</button>)}
      </div>

      <div style={{display:"flex",gap:5,overflowX:"auto",marginBottom:16,paddingBottom:8,WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}}>
        {VIBES.map(v=><button key={v} onClick={()=>setVb(v)} style={{padding:"5px 12px",fontSize:11,borderRadius:16,border:"none",background:vb===v?P.gold:P.card,color:vb===v?"#fff":P.text3,cursor:"pointer",whiteSpace:"nowrap",fontWeight:vb===v?600:400,boxShadow:vb===v?"none":"0 1px 4px rgba(0,0,0,0.04)",flexShrink:0}}>{v}</button>)}
      </div>

      <div style={{fontSize:12,color:P.text3,marginBottom:12}}>{filtered.length} strain{filtered.length!==1?"s":""}</div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",gap:14}}>
        {filtered.map(s=><Card key={s.id} s={s} onClick={()=>setSel(s.id)}/>)}
      </div>
    </div>}

    {tabBar}
  </div>;
}
