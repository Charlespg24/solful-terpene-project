import { useState, useEffect, useRef } from "react";

// ─── Terpene Color System ───
const TERPENE_COLORS = {
  caryophyllene: { primary: "#C8A97E", bg: "#1a1610", text: "#e8ddd0", accent: "#C8A97E", muted: "#8a7a6a" },
  limonene:      { primary: "#D4C85C", bg: "#1a1912", text: "#f0ecd0", accent: "#D4C85C", muted: "#9a9450" },
  myrcene:       { primary: "#8EAE68", bg: "#121a14", text: "#d8e8d0", accent: "#8EAE68", muted: "#6a8a5a" },
  humulene:      { primary: "#7C9082", bg: "#141a16", text: "#d0ddd6", accent: "#7C9082", muted: "#5a7a6a" },
  linalool:      { primary: "#9B7BA8", bg: "#1a1420", text: "#e0d0e8", accent: "#9B7BA8", muted: "#7a6088" },
  bisabolol:     { primary: "#8EAEC8", bg: "#121820", text: "#d0dde8", accent: "#8EAEC8", muted: "#6080a0" },
  pinene:        { primary: "#5C8E6B", bg: "#101a14", text: "#c8e0d0", accent: "#5C8E6B", muted: "#4a7058" },
  ocimene:       { primary: "#B8785C", bg: "#1a1410", text: "#e8d8c8", accent: "#B8785C", muted: "#8a6048" },
  terpinolene:   { primary: "#6BAE8E", bg: "#121a18", text: "#d0e8e0", accent: "#6BAE8E", muted: "#508a70" },
};

const ENERGY_BADGE = {
  LOW:  { label: "LOW", color: "#6a8a7a", bg: "rgba(106,138,122,0.15)" },
  MEDIUM: { label: "MED", color: "#C8A97E", bg: "rgba(200,169,126,0.15)" },
  HIGH: { label: "HIGH", color: "#D4C85C", bg: "rgba(212,200,92,0.15)" },
};

// ─── Strain Data ───
const STRAINS = [
  {
    id: "moonlight",
    name: "Moonlight",
    farm: "Moon Gazer Farms",
    region: "Mendocino",
    energy: "LOW",
    effects: "Physically Relaxed, Calm, Grateful",
    intent: "Soft gratitude in a settled body",
    aroma: "Watermelon Candy, Citrus Zest, Earl Grey",
    totalTerpenes: "2.67%",
    dominantTerpene: "myrcene",
    voiceBlend: "40% myrcene-slow · 27% caryophyllene-warm · 20% terpinolene-cerebral · 13% bisabolol-tender",
    oils: "Lemongrass (12), Black Pepper (10), Tea Tree (8), German Chamomile (6), Bergamot (4)",
    terpeneProfile: [
      { name: "Myrcene", pct: 0.74, ratio: 40 },
      { name: "β-Caryophyllene", pct: 0.51, ratio: 27 },
      { name: "Terpinolene", pct: 0.38, ratio: 20 },
      { name: "α-Bisabolol", pct: 0.24, ratio: 13 },
    ],
    story: {
      title: "The Nightcap",
      text: `Jess hadn't sat down in eleven hours.

Not truly sat down — not the kind where your weight actually commits to the surface beneath you. She'd perched on the edge of her desk chair during calls, half-stood at the kitchen counter eating leftover rice with a fork, leaned against the bathroom doorframe while her daughter brushed her teeth. But committed sitting, the kind where your spine remembers it has curves? Not once.

It was 9:47 PM and the house was finally quiet in the way that houses get quiet — not silent, but released. The dishwasher hummed its low opinion of dinner plates. Somewhere upstairs, her daughter was breathing the slow metronome of genuine sleep.

Jess walked to the living room. She didn't turn on the overhead light. Instead she pressed the button on the small remote by the couch — the Hue lights eased into a color she could only describe as "the inside of a honey jar." She'd set the scene last weekend after reading something about amber light and stress. 2200K. Thirty percent. It made the room look like a memory of itself.

The diffuser was already loaded. She'd mixed the blend that morning in a small moment of optimism — lemongrass, black pepper, tea tree, chamomile, a few drops of bergamot because the label said it was what made Earl Grey smell like Earl Grey. She pressed the button and a thin stream of vapor climbed into the amber air like a question mark that already knew the answer.

She sat down.

Actually sat down. Felt the couch accept her full weight like it had been waiting. She pulled the weighted blanket from the arm of the sofa — fifteen pounds of tiny glass beads sewn into grey velvet — and draped it over her lap. The weight settled onto her thighs with a pressure that felt less like heaviness and more like being taken seriously.

The bergamot reached her first. Then the lemongrass, green and clean, followed by the peppery warmth underneath — not sharp, more like the memory of sharpness, rounded by the chamomile into something almost sweet. The tea tree arrived last, cerebral and bright, a terpinolene note that kept the blend from sinking into total sedation — a small, sharp window of awareness inside the warmth. She took one breath that was intentional. Four counts in. Seven held. Eight out. The exhale lasted longer than she expected, as if her lungs had been saving this breath all day, rationing it, waiting for the right room.

On the side table sat a small jar she'd bought from the dispensary in Sebastopol last Saturday. The woman behind the counter — sun-freckled, calm in a way that suggested either deep practice or simply not having a commute — had handed it to her and said, "This one's from Moon Gazer Farms. Josh and Sandra Khan, up in Redwood Valley." She'd turned the jar in her hand. "They're biodynamic. Seed-sown, sun-grown — everything done with the moon and the seasons. They build their own soil from fallen trees in their forest, layer it with native dirt and manure from their animals. Closed-loop system. Nothing comes in from outside." She'd paused, then smiled. "Every seed is a little different, so every plant is a little different. This one came out moonlight." She'd set the jar on the counter. "It's for the end of the day. When the day was a lot."

Jess had smiled at that. "The day is always a lot."

"Then you'll use the whole jar."

Now she opened it. The smell rose to meet the diffuser's work and something clicked — not in her mind but lower, somewhere in the animal part of her brain that recognized patterns before language could name them. The bergamot from the diffuser and the citrus zest from the jar. The lemongrass and the watermelon sweetness. The pepper warmth in both. They weren't the same smell, but they were the same sentence said in two dialects.

She packed a small bowl. Not much — she'd learned that when the room was already primed, you needed less. One modest inhale, held gently, released through barely parted lips. The smoke joined the vapor in the amber light and for a moment the room looked like a painting of a room, everything soft-edged and significant.

It arrived the way it always arrived when the preparation was right — not as a wave but as a permission. Her shoulders dropped two inches. Her jaw unclenched and she realized, with something between humor and grief, that she'd been biting the inside of her cheek since lunch. Her hands, which had been fists of competence all day — typing, gripping, pointing, holding — opened on her lap like small animals deciding the coast was clear.

The weighted blanket pressed down. The amber light held steady. The bergamot and lemongrass continued their quiet molecular diplomacy.

And there it was. The feeling the jar was named for. Not happiness, exactly — happiness was too active, too much like a project. This was more like the moment after happiness takes off its shoes. It was gratitude without an object. Calm without a reason. The physical sensation of not needing the next moment to be different from this one.

She picked up the small notebook from the side table. A pen. She'd read somewhere that writing by hand was different — slower, more honest, like the words had to pass through more of your body before reaching the page. She wrote:

What does your body feel grateful for right now?

She paused. Then:

My body is grateful for this blanket that doesn't want anything from me. For this room that looks the way sleep feels. For the fact that my daughter said "you smell like tea" when I kissed her goodnight and she meant it as a compliment.

My body is grateful for the version of me that loaded the diffuser this morning. She didn't know what tonight would bring. She just trusted that tonight would come.

My body is grateful for a farm in Redwood Valley where someone decided that the way you grow something matters as much as what you grow, and every seed is allowed to be its own small self, and the soil is built from what the forest no longer needs, and the whole thing turns in a circle that nobody has to force.

She closed the notebook. Set down the pen. Leaned her head back against the couch and looked at the ceiling, where the amber light made small shadows out of nothing.

She breathed in bergamot. She breathed out Tuesday.

The moon, visible through the half-open blinds, didn't ask how her day was. It just did what moonlight does — arrived without effort, illuminated without heat, and made the ordinary world look like it was worth being gentle with.

Jess closed her eyes.

She was, for the first time all day, simply where she was.`
    },
    prosePoemTitle: "Terpene Cartography",
    prosePoem: `There is a map of you that smells like Earl Grey and watermelon candy. It was drawn by a farm in Redwood Valley where Josh and Sandra Khan build their soil from fallen trees and chicken-composted calcium and native Mendocino dirt, where every seed is sown by hand and every plant is allowed to be its own small self because they believe that diversity is not a problem to be solved but a garden to be loved. The fog comes in like a second blanket and the plants lean toward each other in the dark as if sharing a secret about your GABA receptors, and the whole farm turns in a closed loop — forest to soil, soil to plant, plant to compost, compost back to soil — a circle of gratitude that requires nothing from outside. The map says: here is where your tension lives — at the corner of your neck and your to-do list. And here is where your gratitude hides — underneath the assumption that rest must be earned. And here, in the space between your fourth and fifth ribs, is a room with amber walls and no clock, where a version of you has been waiting all day to exhale. The cartographer used lemongrass for the borders, black pepper for the roads, tea tree for the elevation lines, and chamomile for the places too tender to name out loud. The bergamot is the legend — the key that unlocks every symbol, the Earl Grey note that says this map was drawn by someone who believes that the way you grow a thing determines the way it makes you feel. You don't read this map. You breathe it in. And then you arrive.`,
    haiku: {
      title: "Three Breaths of Moonlight",
      stanzas: [
        { label: "Inhale", lines: ["Lemongrass and pepper —", "the room already knows what", "my body still learns."] },
        { label: "Hold", lines: ["Watermelon light", "on the backs of closing eyes.", "Gratitude has weight."] },
        { label: "Exhale", lines: ["Settled. Not sleeping.", "Just the tender hum of not", "needing anything."] },
      ]
    },
    sonnet: `The diffuser hums its bergamot refrain,
and amber light pools soft against the wall.
The body, once a ledger keeping pain,
decides tonight it doesn't owe at all.

The watermelon sweetness fills the room
like something half-remembered, half-invented —
a seed-sown farm, a Mendocino bloom,
a life that never asked to be augmented.

The weighted blanket settles on my chest.
I breathe: four in, hold seven, eight counts out.
The day's sharp edges blur and acquiesce.
The tea tree keeps one flame of gentle doubt.

The moon has never tried to be the sun.
Tonight I practice being simply done.`,
  },
  {
    id: "mikes-bomba",
    name: "Mike's Bomba",
    farm: "Glentucky Family Farm",
    region: "Sonoma Mountain",
    energy: "MEDIUM",
    effects: "Relaxed, Alert, Euphoric",
    intent: "Post-adventure calm with bright, clear edges",
    aroma: "Wedding Cake, Lemony Jet Fuel, Ice Cream, OG Lemon, Forest Floor",
    totalTerpenes: "~3%",
    dominantTerpene: "caryophyllene",
    voiceBlend: "45% caryophyllene-warm · 31% limonene-bright · 17% humulene-grounding · 7% linalool-gentle",
    oils: "Black Pepper (20), Lemon (10), Sage (8), Lavender (2)",
    terpeneProfile: [
      { name: "β-Caryophyllene", pct: 1.35, ratio: 45 },
      { name: "Limonene", pct: 0.93, ratio: 31 },
      { name: "α-Humulene", pct: 0.51, ratio: 17 },
      { name: "Linalool", pct: 0.21, ratio: 7 },
    ],
    story: {
      title: "The Earned Mile",
      text: `Sol hadn't stopped moving in four hours, and the stopping was the best part.

Not because the ride was bad — the ride was the reason he'd moved to the North Bay in the first place, the reason he'd taken the apartment in Mill Valley with the rent that made his mother call once a month to ask if he was eating. The ride was a twenty-three-mile loop through the Mt. Tam watershed, up through the redwoods on the fire road where the canopy closed overhead like a cathedral that charged no admission, along the ridge where the Pacific appeared between the trees in bright slashes of blue, and back down the single-track that dropped through fern gullies so green they looked like they were running their own photosynthesis marketing campaign.

But the stopping. The stopping was where the ride paid you back.

He'd leaned the bike against the wall by the door, stripped off his jersey in the hallway, and walked into the kitchen still trailing the smell of eucalyptus and sweat and the particular metallic tang of brakes used on a long descent. His calves were buzzing with that post-ride hum — not pain, not fatigue, just the low electrical noise of muscles that had been asked to do something real and had answered with enthusiasm.

The diffuser was already loaded. He'd set it up before the ride, the way some people lay out their clothes the night before — a small act of faith in the future self who would need it. Black pepper, twenty drops, the dominant voice. Lemon, ten drops. Sage, eight. Lavender, two. He pressed the button and the vapor climbed into the late-afternoon light coming through the kitchen window, and the black pepper reached him first, warm and direct, meeting the post-ride heat in his chest like a handshake between two kinds of warmth — one earned, one offered.

He filled the shaker. This was the part he'd been building toward since the descent.

Raspberries at the bottom, muddled with maple syrup — firm presses, not violent, just enough to break the skin and let the color bleed. Fresh lemon juice, two ounces, squeezed from the tree in the backyard that produced lemons with the kind of reckless generosity that suggested the tree had no concept of scarcity. Half an ounce of lime. A quarter teaspoon of sage from the spice rack — the same herb running in the diffuser, the same terpene in the flower he'd smoke in fifteen minutes. Two drops of lavender flavor. Two drops of orange. A quarter teaspoon of vanilla extract. A pinch of cinnamon. Then three coarse cracks of black pepper directly in — the grinder making a sound like a small, satisfied argument — and he did not stir after this, because the pepper needed to sit on top of everything like punctuation at the end of a sentence.

The rosemary sprig he clapped once between his palms. The oil released, invisible but immediate — a sharp herbal brightness that joined the black pepper from the diffuser and the lemon from the juice and the sage from both the shaker and the air, and for a moment his kitchen smelled like the inside of a terpene profile translated into food. He rubbed the rosemary along the rim of the chilled glass, then dropped it in. Then the pivot — an ounce and a half of Pisco poured directly into the base, one gentle stir, no shake, the base was already built.

Ice, generous. Pour, slow. The Pisco and the muddled raspberry met the ice at the same time, and the drink settled into the glass the way the afternoon was settling into his body — in layers, each one distinct, each one making the others more themselves.

He set three carambola slices on the rim — small five-pointed stars that caught the light and looked, he thought, like the kind of fruit a geometry teacher would grow if geometry teachers had farms. The rosemary sprig rested across the top like a bridge between the drink and the air above it.

The first sip told him everything was right. The Pisco present but not dominant. The raspberry sweetness cut by the lemon and lime. The black pepper landing at the back of the throat like the caryophyllene it carried. The sage and lavender somewhere underneath, not announcing themselves but holding the structure the way humulene holds the ground in a terpene profile — you'd miss them if they left, but you don't notice them while they're working.

On the counter sat the glass jar from Solful. Mike's Bomba. Glentucky Family Farm, up on Sonoma Mountain — biodynamic, Demeter-certified, the actual thing. Wedding Cake crossed with Jet Fuel Gelato. The guy at the counter had told him the whole story — the famed vintner, the 8.5-acre volcanic bench, the hugelkultur super soil, the hand-harvest during the Hunter's Moon. "Gold at the State Fair," he'd said, turning the jar. "And you can taste why. It's got this thing where the fuel and the cake are doing completely different jobs but they're in the same room cooperating."

Now Sol cracked the jar and the smell joined the kitchen — sweet and architectural at first, that wedding cake structure of vanilla and dough, then the jet fuel lemon cutting underneath it, bright and purposeful, and below that the woody spice, the pine and OG Kush lime, the forest floor that said this flower was grown in volcanic dirt by a man who farmed in sync with the cosmos.

He packed the small pipe. One draw. The smoke was medium-bodied, clean, no sting — ice cream cake with a bright lemon rim. He held it while the diffuser's black pepper and the cocktail's black pepper and the flower's caryophyllene all found each other in his chest, three dialects of the same warmth, and the hold felt like the moment at the top of the ridge where you can see both the ocean and the valley and you don't move because moving would mean choosing one view over the other.

The exhale let the ride go.

Not the memory — he'd keep the memory, the fern gullies and the cathedral canopy and the blue Pacific in its bright slashes. What he let go was the effort. The four hours of asking his body to climb and descend and balance and brake. The effort exited on the exhale the way the day's last tension exits when you finally sit down in a place that was built for sitting.

The caryophyllene settled in like a warm hand on a sore shoulder — not fixing anything, just acknowledging the work. The limonene kept his eyes open and his mind clean, the brightness that kept this from tipping into couch-lock. The humulene grounded the whole thing in the body — his body, the one that had just carried him twenty-three miles through a forest and was now being thanked with black pepper and lemon and pisco and sage and the particular terpene signature of a flower grown on an old volcano by a man who believed that the way you grow something is the way it makes you feel.

He wasn't sleepy. That was the thing. Four hours on a mountain bike should have put him on the couch, but this wasn't that kind of strain and this wasn't that kind of tired. He was relaxed the way a bow is relaxed after the arrow has been released — the tension was gone but the structure was still there, still capable, still alert. Calm but not vacant. Present but not wired. The exact place where a body lands when it's been used well and rewarded honestly.

The cocktail was half-finished. The diffuser was doing its steady work. Through the window the light was going golden in that way that Northern California light goes golden when it's deciding whether to become sunset or just to glow indefinitely.

He'd shower soon. Stand under the hot water and let the eucalyptus and the sweat and the last of the trail dust wash down the drain. But not yet. For now the kitchen was the right room, and the drink was the right drink, and the flower was the right flower, and his body — this particular body, the one with the buzzing calves and the open chest and the clear, unhurried mind — was exactly where it had been heading all day.

The ride was the question. This was the answer.

And the answer was: you're here, you earned it, and you don't have to do a single thing about it except notice.`
    },
    prosePoemTitle: "Forest & Compass",
    prosePoem: `There is a kitchen in Mill Valley where the post-ride light comes through the window the color of warm honey and the diffuser is running twenty drops of black pepper and ten of lemon and eight of sage and two of lavender, and the man standing at the counter has just ridden twenty-three miles through a redwood cathedral and a fern gully and along a ridge where the Pacific appeared like a secret between the trees, and now he is building a cocktail the way a terpene profile is built — in layers, each one functional, each one beautiful, each one making the next one land differently. The raspberries are the sweetness and the Pisco is the fuel and the lemon is the brightness and the three coarse cracks of black pepper at the top of the shaker are the caryophyllene saying I'm here, I'm dominant, I'm the warmth that holds the rest together. The sage is the ground — in the diffuser and in the spice rack and in the flower itself, humulene triangulating from three sources like a GPS locking onto the body's exact location in the world. And the rosemary, clapped once between the palms and rubbed along the rim, is the bridge between the drink and the air, between the cocktail and the cannabis, between the ride that's over and the evening that's just beginning. Glentucky Family Farm grew this on a volcanic bench on Sonoma Mountain where the soil self-fertilizes and Mike Benziger harvests by the Hunter's Moon and shall never a machine touch, and they called it Bomba, which sounds like an explosion but lands like a reward — the earned calm after the earned miles, the warmth that comes not from rest but from having done something worth resting from. The carambola slices on the rim are small stars. The light through the window is going gold. The body is relaxed but the mind is bright and the evening is ahead and nobody needs to do anything about any of it except stand in this kitchen, in this light, with this drink and this smoke and this particular version of being alive, which is the version where everything you did today is still in your muscles and everything you'll do tonight starts with a shower and a clear head and the quiet, persistent hum of a body that knows it was used well.`,
    haiku: {
      title: "Three Draws of the Earned Mile",
      stanzas: [
        { label: "Inhale", lines: ["Black pepper and sage —", "twenty-three miles in my legs,", "the trail still breathing."] },
        { label: "Hold", lines: ["Cake and fuel and lime.", "Lemon keeps the mind awake.", "The calves hum, grateful."] },
        { label: "Exhale", lines: ["Relaxed. Not finished.", "Just a body that earned this", "particular still."] },
      ]
    },
    sonnet: `The black pepper finds the chest the ride left warm,
the lemon cuts the golden kitchen light.
The sage says ground — the same hill, the same form
from diffuser, drink, and flower. All three right.

The caryophyllene sits like hands on shoulders,
the limonene keeps both eyes sharp and clear.
The Pisco and the raspberry are the holders
of everything the trail delivered here.

The wedding cake, the jet fuel underneath —
a flower grown in volcanic, moonlit dirt.
The rosemary is clapped, the pepper breathed,
the body is relaxed but still alert.

The ride was twenty-three miles through the trees.
This kitchen, this earned calm, is where it leads.`,
  },
  {
    id: "carambola",
    name: "Carambola",
    farm: "Higher Heights",
    region: "Mendocino",
    energy: "HIGH",
    effects: "Energetic, Fun, Giggly",
    intent: "Light and playful, effervescent energy",
    aroma: "Orange, Diesel, Incense",
    totalTerpenes: "1.45%",
    dominantTerpene: "limonene",
    voiceBlend: "53% limonene-bright · 22% caryophyllene-warm · 14% linalool-gentle · 11% bisabolol-tender",
    oils: "Sweet Orange (16), Rosemary (8), Lavender (6), German Chamomile (6), Black Pepper (4)",
    terpeneProfile: [
      { name: "Limonene", pct: 0.44, ratio: 53 },
      { name: "β-Caryophyllene", pct: 0.18, ratio: 22 },
      { name: "Linalool", pct: 0.12, ratio: 14 },
      { name: "α-Bisabolol", pct: 0.09, ratio: 11 },
    ],
    story: {
      title: "Starfruit Morning",
      text: `The sunrise came in orange, and Davi said, "See? Even the sky is on theme."

They were parked at the campsite above Albion, the one you have to know someone to know about — no sign, no reservation system, just a clearing in the redwoods where the coast appears through a gap in the trees like a secret being told mid-sentence. Yuki's van, a 1987 Westfalia the color of a sage leaf, was nosed toward the view. The sliding door was open. Two camping chairs sat in the dirt like thrones for people with no ambitions beyond coffee and the next four hours.

It was 7:15 on a Sunday in May, and the air had that Mendocino morning quality — cool enough to justify a sweatshirt, bright enough to make the sweatshirt feel like an event with a time limit.

"Hand me the oranges," Yuki said. She was standing at the fold-out table they'd set up last night. In front of her: a cutting board, a knife, four starfruit she'd found at the Mendocino co-op yesterday, and a small hand-press juicer that she carried everywhere like other people carry phone chargers.

Davi tossed her an orange from the cooler. It caught the early light and for a half second looked like a small sun being passed between friends, which is essentially what it was.

The diffuser was running on the van's fold-down counter — a portable one, USB-powered, the size of a coffee mug. The sweet orange was the lead note — bright and immediate and absurdly cheerful, like a friend who arrives at your door already laughing about something that happened on the way. The rosemary sat underneath, warm and herbal and specific. The lavender was barely there — a softness at the edges. And the German chamomile rounded the whole thing into something you could breathe without thinking and think without trying.

"Okay," Yuki said, slicing a starfruit crosswise. The slices fell onto the cutting board in perfect five-pointed stars, and she held one up to the light. "Tell me this fruit wasn't designed by someone who was extremely high and also a geometry teacher."

"Carambola," Davi said, because he'd looked it up last night. "That's the real name. Star fruit is just the marketing."

From the Bluetooth speaker wedged in the van's cup holder, FKJ was doing that thing where a single person somehow sounds like an entire band having the best morning of their lives.

The jar was sitting on the fold-out table between the cutting board and a half-eaten bag of dried mango. Davi had bought it Friday at Solful. The woman at the counter — mid-forties, turquoise rings on three fingers — had pulled it from behind the display and said, "Carambola. Higher Heights farm, up here in Mendocino. It's limonene-forward." She'd smiled. "Think of it as optimism in a jar. The kind that doesn't require evidence."

Now he opened the jar and the smell joined the morning — orange peel and something faintly diesel, like a beautiful machine, and underneath that a whisper of incense. It met the sweet orange from the diffuser and the fresh-pressed starfruit in the air and suddenly the campsite smelled like a place where every good idea you'd ever had was planning a reunion.

It arrived fast. Limonene doesn't wait in line. Between one breath and the next, the beauty sharpened. Not intensified — sharpened. Like someone had adjusted the contrast on reality and now the bark of the redwoods was more itself, and the ocean in the gap between the trees was a color that blue had been trying to be all along.

"Why is everything—" Davi started.

"I know," Yuki said.

"I didn't even—"

"I know."

They sat there grinning at each other like two people who'd just discovered that the morning had a secret level and they'd found the entrance by accident.

"What do you want to do today?" Yuki asked, not looking up from her sketch.

"Exactly this," he said. "But in different locations."

Yuki looked up. Grinned. "Carambola," she said, like it was a toast.

"Carambola," he agreed.

The morning kept going. It didn't need their permission. It just kept offering — light, and warmth, and the particular effervescence of a day that hasn't been planned, in a place that smells like oranges and rosemary and the soft chamomile tenderness of a world that, at least right now, in this clearing, in this light, with this person, required absolutely no improvement.`
    },
    prosePoemTitle: "Terpene Effervescence",
    prosePoem: `There is a campsite in Mendocino where the redwoods open like a curtain and the Pacific appears like a punchline you weren't expecting but that makes everything before it funnier, and if you arrive on a Sunday morning with starfruit and a friend and a jar from Higher Heights farm, the sweet orange will reach you first — sixteen drops of sunrise in a bottle, the limonene arriving in your prefrontal cortex before your body has finished yawning, telling every synapse that today has no ceiling. The rosemary is next, eight drops of the warmth that lives underneath playfulness, the caryophyllene saying you can be bright without being brittle, the way a campfire is both light and heat. The lavender — six drops of a softness so quiet you might mistake it for the morning air itself — is the part that lets you laugh without flinching, the linalool padding the edges of every sensation so the joy has somewhere soft to land. And the German chamomile, six tender drops of a garden that grows only forgiveness and wildflowers, the bisabolol holding the whole effervescent mess together with a gentleness that says: feel everything, I'll keep watch. Four drops of black pepper at the bottom of the blend, a warmth so subtle you only notice it when it stops, and then you realize it was the floor all along. This is what a carambola morning tastes like — starfruit and orange juice over crushed ice, FKJ on a speaker the size of your fist, your best friend drawing five-pointed stars in a sketchbook while the fog offshore decides not to come in, and every molecule in the air conspiring to make right now the most interesting thing that has ever happened, not because it is, but because for once you are paying attention with your whole body, and your whole body is saying yes.`,
    haiku: {
      title: "Three Stars of Carambola",
      stanzas: [
        { label: "Inhale", lines: ["Sweet orange and dawn —", "the redwoods hold still while we", "remember to play."] },
        { label: "Hold", lines: ["Starfruit geometry.", "Rosemary warmth beneath the fizz.", "The morning sharpens."] },
        { label: "Exhale", lines: ["Bright. Not brittle. Just", "the soft hum of two friends who", "found the day's frequency."] },
      ]
    },
    sonnet: `The starfruit falls in perfect fives of light,
and sweet orange fills the campsite clearing's air.
The rosemary says warmth beneath the bright,
the chamomile says tenderness is there.

The fog sits on the ocean line, polite,
and knows today it won't be asked ashore.
The FKJ floats upward through the light
like joy that's learned it doesn't need to roar.

I sipped the juice — tart, strange, a little gold —
and felt the morning tighten into focus.
Not sharper. Cleaner. Everything I hold
is realer than the name I give to know it.

The lavender is barely there, but stays —
the softness underneath effervescent days.`,
  },
  {
    id: "natty-bumppo",
    name: "Natty Bumppo",
    farm: "Moon Gazer Farms",
    region: "Mendocino",
    energy: "LOW",
    effects: "Happy, Carefree, Physically Relaxed",
    intent: "Loose and easy, happily untethered",
    aroma: "Kerosene, Musk, Sour Plum",
    totalTerpenes: "1.86%",
    dominantTerpene: "caryophyllene",
    voiceBlend: "44% caryophyllene-warm · 25% limonene-bright · 18% humulene-grounding · 13% myrcene-slow",
    oils: "Black Pepper (14), Lemon (10), Sage (6), Lemongrass (6), Geranium (4)",
    terpeneProfile: [
      { name: "β-Caryophyllene", pct: 0.63, ratio: 44 },
      { name: "Limonene", pct: 0.35, ratio: 25 },
      { name: "α-Humulene", pct: 0.25, ratio: 18 },
      { name: "Myrcene", pct: 0.19, ratio: 13 },
    ],
    story: {
      title: "The Frontiersman's Saturday",
      text: `Ellis hadn't owned an alarm clock in nineteen days.

He knew the number because he was still counting, the way you count the days of a vacation at the beginning, before the rhythm of not-working replaces the rhythm of working and the counting stops on its own. He was sixty-two and had taught seventh-grade history for thirty-four years at a middle school in Ukiah, and now he didn't, and the Saturday stretching out in front of him was identical to the Friday behind it and the Sunday ahead of it, and this fact — which should have terrified him — felt instead like the first interesting thing that had happened to his body in years.

He was on the back porch of his place in Redwood Valley, a two-bedroom on three acres that he'd bought in 2004 when a history teacher could still afford land in Mendocino County. The porch faced east, toward the hills, and the September light was doing that thing it does in Northern California wine country — arriving at an angle that made everything look like it was posing for a photograph it didn't know was being taken.

The diffuser was running on the small table beside him. He'd mixed the blend that morning: black pepper, the backbone, fourteen drops. Lemon, ten drops of a brightness so specific it was almost a sound. Sage, six drops, and this was the one that got him, because the sage oil smelled exactly like the hillside behind his house. Lemongrass underneath, six drops of something green and soft. And geranium — four drops, floral and faintly tart, like a garden that was also somehow a plum.

The jar sat on the porch railing. He'd gotten it from Josh, his neighbor a half-mile down the road. Josh Khan ran Moon Gazer Farms with his wife Sandra — a biodynamic operation, seed-sown, everything grown in the sun and under the moon. Ellis had watched them build the place, watched them haul dead trees from the forest to make their own soil — hugelkulture, Josh called it. A closed-loop system. The chickens ate the snails and turned the shells into calcium in their droppings, which went back into the beds.

Josh had stopped by last week with a jar and a grin. "Natty Bumppo," he'd said, handing it over the fence.

"Like the Leatherstocking Tales?"

Josh had looked genuinely pleased. "You're the first person who's gotten that without me explaining."

"I taught American Lit for two years before I switched to history. Cooper was terrible at dialogue but he understood something about being in the woods."

"That's exactly it. That's this strain. It puts you in the landscape without making you do anything about it."

Now Ellis opened the jar and the smell met the September air — kerosene and musk and sour plum, three aromas that had no business working together and yet did, the way a good jazz trio works.

It came on easy. That was the thing about this one — it didn't arrive like a wave or a permission or a door opening. It arrived like a fact you'd forgotten and then remembered without urgency. Oh, right. I don't have to do anything.

His body did something it hadn't done in thirty-four years of standing in front of classrooms: it went genuinely, completely, purposelessly loose. Not tired. Not sedated. Loose. The difference was important. Tired is a debt. Loose is a gift.

He thought about Natty Bumppo — the character, not the strain. A man who lived in the forest and needed nothing from civilization except the occasional conversation and a good rifle. A man who was happiest when he was between places.

The hawk had landed on a fencepost across the drainage. It was looking at something in the grass with the calm focus of a creature that had never once worried about retirement.

Ellis smiled.

Not at anything. Not for anyone.

Just because his face, like the rest of him, was free to do what it wanted, and what it wanted, on this particular Saturday, was to simply agree with the afternoon.`
    },
    prosePoemTitle: "Terpene Frontier",
    prosePoem: `There is a porch in Redwood Valley where the sage on the hillside and the sage in the diffuser are having the same conversation in different dialects, and if you sit long enough with black pepper warmth in your chest and lemon clarity in the air and the geranium floating its strange plum-sweet question above it all, you will remember something you forgot the day you got your first job: that your body, before it was an employee, was an animal, and animals don't need a reason to sit in the sun. Moon Gazer Farms is a half-mile down the road — Josh and Sandra built the soil themselves, hauled dead trees from the forest, layered them with native dirt and chicken-composted calcium in a closed loop that turns snail shells into medicine. Every seed is different. Every plant is a little bit its own thing. That's the philosophy: don't clone, don't control, let each one be what it becomes. Natty Bumppo became this — fourteen drops of black pepper like a handshake from a warmth that means it, ten drops of lemon like a sentence that says exactly one thing and says it clearly, six drops of sage like the hill you can see from where you're sitting, six drops of lemongrass like the part of relaxation that doesn't need to announce itself, and four drops of geranium like the sour plum tartness that makes happiness interesting instead of just sweet. The frontiersman moved through the forest without needing to own it. The retiree sits on the porch without needing to schedule it. The kerosene in the aroma is the earth giving up something ancient. The musk is the body admitting it's warm. The sour plum is joy with a tart edge, the kind that doesn't cloy because it never pretended to be simple. You don't untether yourself. You just stop holding the rope, and discover your hands were the only thing keeping you from the Saturday you were always owed.`,
    haiku: {
      title: "Three Freedoms of the Frontiersman",
      stanzas: [
        { label: "Inhale", lines: ["Black pepper and sage —", "the hillside sends its regards", "through the diffuser."] },
        { label: "Hold", lines: ["Sour plum, kerosene.", "Lemon keeps the mind just bright", "enough to notice."] },
        { label: "Exhale", lines: ["Loose. Not lazy. Just", "a body that remembers", "it was free all along."] },
      ]
    },
    sonnet: `The sage oil smells like every hill I know —
the dry September slopes behind my home.
The black pepper is warmth without a show,
a steady fire that doesn't need to roam.

The lemon cuts the afternoon to size,
the geranium floats a plum-tart sweetness here.
The lemongrass is soft below the skies
and asks for nothing, which is why I hear.

I taught for thirty years the frontier's song —
how Bumppo moved through woods without a deed.
Today I learn what he knew all along:
that freedom isn't found, it's just agreed.

The hawk lands. The garden's done. The sun is slow.
I'm loose inside my life, with nowhere else to go.`,
  },
  {
    id: "black-lime-chem",
    name: "Black Lime Chem",
    farm: "Moon Gazer Farms",
    region: "Mendocino",
    energy: "LOW",
    effects: "Heavy, Blissful, Sleepy",
    intent: "Weighted bliss melting toward rest",
    aroma: "Sharp Lime, Rhubarb, Glue",
    totalTerpenes: "3.08%",
    dominantTerpene: "myrcene",
    voiceBlend: "67% myrcene-slow · 15% pinene-sharp · 11% caryophyllene-warm · 7% ocimene-herbal",
    oils: "Lemongrass (16), Pine (8), Black Pepper (6), Basil (6), Lemon (4)",
    terpeneProfile: [
      { name: "Myrcene", pct: 1.69, ratio: 67 },
      { name: "α-Pinene", pct: 0.39, ratio: 15 },
      { name: "β-Caryophyllene", pct: 0.27, ratio: 11 },
      { name: "β-Ocimene", pct: 0.19, ratio: 7 },
    ],
    story: {
      title: "The River After",
      text: `Maren hadn't been warm in four months. Not really warm — not the kind that goes all the way to the center. She'd been functional-warm, layered-warm, the kind of warm that comes from Gore-Tex and SmartWool and the constant low-grade friction of moving through cold water all day. But bone-warm, core-warm, the kind where your marrow relaxes? Not since May.

She was a river guide on the Eel. Six seasons now. April through September she ran the upper fork out of a base near Dos Rios — class III rapids, some IV when the water was up. It was the best job she'd ever had and also the most physical, and by October her body carried the season the way a riverbank carries the high-water mark.

Now it was the first Saturday of October and she was in the claw-foot tub in her cabin above the river, in water so hot it had turned her skin the pink of cooked shrimp, and she was not moving.

The diffuser sat on the edge of the tub. She'd loaded it heavily — lemongrass, sixteen drops, more than she'd ever used, and the smell filled the small bathroom like a green tide coming in. Pine, eight drops, sharp and briefly clarifying, like a window opened in a warm room. Black pepper, six drops, warm and steady. Basil, six drops, herbal and green and slightly strange. And lemon, four drops, sharp enough to echo the lime she'd smell later.

The lemongrass reached her first. It was insistent the way sleep is insistent — not aggressive but undeniable.

She'd made the tea before getting in the tub — dried rhubarb, dried lime peel, rosemary, basil, bay leaf, a pinch of cinnamon, agave. It sat on the stool beside the tub in a ceramic mug the color of river stone.

The jar was on the shelf above the sink. She'd bought it at Solful. The guy at the counter had held the jar up to the light and said, "Black Lime Chem. Moon Gazer Farms, out in Mendocino. Josh and Sandra Khan. Biodynamic. They build their own soil — fallen trees from the forest, native dirt, chicken manure, the whole cycle. Every seed is different." He'd looked at her. "This one's got the highest myrcene in the collection. Three-point-oh-eight percent total terpenes. It's the heaviest thing we carry." He'd paused. "End of season?"

"Three days ago."

He'd nodded. "Then this is yours. This is the one that lets your body stop being a tool and start being a body again."

The myrcene hit like a tide. Not a wave — a tide. Slower than a wave, deeper, more inevitable. It started in her legs, which had spent six months bracing against river current, and it moved upward. Her thighs went first. Then her hips. Then her lower back — the place where every paddle stroke had been filed away.

The pine flashed through — one bright moment of clarity where she noticed the quality of the light in the bathroom, the amber of the candle, the way the steam made halos around everything — and then the moment passed and the lemongrass closed over it like water over a stone.

Her body was no longer a tool.

It was a riverbed. And everything that had been rushing through it all season was slowing now, settling, becoming sediment, becoming the soft, weighted floor that the next season's current would run over without disturbing.

She breathed in lemongrass. She breathed out October.

And the bliss settled over her like a second water, heavier than the bath, warmer than the bath, and she let it hold her because that was its only request, and she had spent six months holding everything else.`
    },
    prosePoemTitle: "Terpene Sediment",
    prosePoem: `There is a cabin on the Eel River where the water runs all night like a lullaby that doesn't know when to stop, and if you fill the tub and load the diffuser with sixteen drops of lemongrass — enough to make the air itself feel heavy, the myrcene pulling everything toward the floor the way gravity pulls a river toward the sea — and then add eight drops of pine for the one flash of clarity you'll need to notice how beautiful the steam looks in the candlelight before the lemongrass closes over that clarity like water over a stone, and six drops of black pepper for the warmth that sits at the bottom of every good rest like coals in a woodstove, and six drops of basil for the green herbal strangeness that keeps the heaviness from becoming monotone, and four drops of lemon for the sharp lime edge that says you are still here, still conscious, still choosing this — if you do all of this, and then open the jar from Moon Gazer Farms where Josh and Sandra build their soil from fallen trees and chicken-composted calcium and native Mendocino dirt and every seed is different because they believe in what's wild, you will smell sharp lime and rhubarb and something dense and adhesive that the word glue doesn't quite capture but your body understands immediately as an invitation to stop — not to stop living but to stop holding, stop gripping, stop bracing against the current — and the myrcene will come for you the way a tide comes for a shore, not aggressive but total, and your arms will go heavy and your jaw will forget it ever clenched and your back will release a season's worth of effort into the water and the water will accept it without opinion, and you will understand, finally, in the only language the body trusts, that bliss is not a feeling you arrive at but a weight you allow, and rest is not the absence of the river but the moment you stop swimming and let it carry you.`,
    haiku: {
      title: "Three Descents into Black Lime",
      stanzas: [
        { label: "Inhale", lines: ["Lemongrass and pine —", "one pulls me down, one flashes", "clear. Then the green wins."] },
        { label: "Hold", lines: ["Sharp lime. Rhubarb. Glue.", "The body stops being a tool", "and starts being held."] },
        { label: "Exhale", lines: ["Heavy. Not broken.", "Just the slow tide of a season", "finally arriving home."] },
      ]
    },
    sonnet: `The lemongrass is heavy — sixteen drops
of green that pulls like gravity, like tide.
The pine flares once, a clarity that stops
the drift just long enough to look inside.

The black pepper is coals beneath the rest,
the basil adds its strange green herbal hum.
The lemon keeps a sharpness in the chest —
a reminder I'm still here, not fully numb.

The river runs below. The woodstove ticks.
The steam and smoke and vapor merge to one.
My body, done with rapids and with tricks,
becomes the bed the current settles on.

The myrcene pulls. The bliss has weight, not wings.
I rest the way a riverbed just — rests. And sings.`,
  },
];

// ─── Terpene Bar Component ───
function TerpeneBar({ profile, colors }) {
  return (
    <div style={{ display: "flex", gap: 2, height: 6, borderRadius: 3, overflow: "hidden", width: "100%" }}>
      {profile.map((t, i) => {
        const terpKey = t.name.toLowerCase().replace(/[^a-z]/g, "");
        const colorMap = {
          myrcene: "#8EAE68", caryophyllene: "#C8A97E", limonene: "#D4C85C",
          humulene: "#7C9082", linalool: "#9B7BA8", bisabolol: "#8EAEC8",
          pinene: "#5C8E6B", ocimene: "#B8785C", terpinolene: "#6BAE8E",
        };
        const c = Object.entries(colorMap).find(([k]) => terpKey.includes(k));
        return (
          <div key={i} style={{ flex: t.ratio, backgroundColor: c ? c[1] : colors.primary, opacity: 0.9, transition: "flex 0.6s ease" }} />
        );
      })}
    </div>
  );
}

// ─── Format Tabs ───
const FORMATS = [
  { key: "story", label: "Short Story" },
  { key: "prosePoem", label: "Prose Poem" },
  { key: "haiku", label: "Haiku" },
  { key: "sonnet", label: "Sonnet" },
];

// ─── Main App ───
export default function SolfulNarrativePriming() {
  const [selectedStrain, setSelectedStrain] = useState(0);
  const [activeFormat, setActiveFormat] = useState("story");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const contentRef = useRef(null);

  const strain = STRAINS[selectedStrain];
  const colors = TERPENE_COLORS[strain.dominantTerpene] || TERPENE_COLORS.myrcene;
  const energy = ENERGY_BADGE[strain.energy];

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedStrain, activeFormat]);

  const renderContent = () => {
    switch (activeFormat) {
      case "story":
        return (
          <div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 400, color: colors.primary, marginBottom: 8, letterSpacing: -0.5 }}>
              {strain.story.title}
            </h2>
            <p style={{ fontSize: 13, color: colors.muted, marginBottom: 32, fontStyle: "italic" }}>Short Story</p>
            {strain.story.text.split("\n\n").map((p, i) => (
              <p key={i} style={{ fontFamily: "Georgia, serif", fontSize: 17, lineHeight: 1.8, color: colors.text, marginBottom: 20, opacity: 0.92 }}>
                {p}
              </p>
            ))}
          </div>
        );
      case "prosePoem":
        return (
          <div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 400, color: colors.primary, marginBottom: 8, letterSpacing: -0.5 }}>
              {strain.prosePoemTitle}
            </h2>
            <p style={{ fontSize: 13, color: colors.muted, marginBottom: 32, fontStyle: "italic" }}>Prose Poem</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 18, lineHeight: 2, color: colors.text, opacity: 0.92 }}>
              {strain.prosePoem}
            </p>
          </div>
        );
      case "haiku":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "60vh", justifyContent: "center" }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 400, color: colors.primary, marginBottom: 48, letterSpacing: -0.5 }}>
              {strain.haiku.title}
            </h2>
            {strain.haiku.stanzas.map((s, i) => (
              <div key={i} style={{ marginBottom: 48, textAlign: "center" }}>
                <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: colors.primary, marginBottom: 12, fontWeight: 600 }}>
                  {s.label}
                </p>
                {s.lines.map((l, j) => (
                  <p key={j} style={{ fontFamily: "Georgia, serif", fontSize: 20, lineHeight: 1.6, color: colors.text, opacity: 0.92 }}>
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>
        );
      case "sonnet":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "60vh", justifyContent: "center" }}>
            <p style={{ fontSize: 13, color: colors.muted, marginBottom: 32, fontStyle: "italic" }}>Sonnet</p>
            {strain.sonnet.split("\n\n").map((stanza, i) => (
              <div key={i} style={{ marginBottom: 28, textAlign: "center" }}>
                {stanza.split("\n").map((line, j) => (
                  <p key={j} style={{ fontFamily: "Georgia, serif", fontSize: 19, lineHeight: 1.7, color: colors.text, opacity: 0.92 }}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#0a0a0a", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 300 : 0, minWidth: sidebarOpen ? 300 : 0, backgroundColor: "#111",
        borderRight: `1px solid ${colors.primary}22`, transition: "all 0.3s ease", overflow: "hidden",
        display: "flex", flexDirection: "column"
      }}>
        <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid #222" }}>
          <h1 style={{ fontSize: 14, letterSpacing: 3, textTransform: "uppercase", color: "#888", fontWeight: 500, marginBottom: 4 }}>
            Solful Sessions
          </h1>
          <p style={{ fontSize: 11, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>Narrative Priming</p>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px" }}>
          {STRAINS.map((s, i) => {
            const sc = TERPENE_COLORS[s.dominantTerpene] || TERPENE_COLORS.myrcene;
            const isActive = i === selectedStrain;
            const en = ENERGY_BADGE[s.energy];
            return (
              <button key={s.id} onClick={() => { setSelectedStrain(i); setActiveFormat("story"); }}
                style={{
                  display: "block", width: "100%", textAlign: "left", padding: "14px 16px", marginBottom: 4,
                  backgroundColor: isActive ? `${sc.primary}18` : "transparent",
                  border: isActive ? `1px solid ${sc.primary}44` : "1px solid transparent",
                  borderRadius: 8, cursor: "pointer", transition: "all 0.2s ease",
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: isActive ? 600 : 400, color: isActive ? sc.primary : "#999", transition: "color 0.2s" }}>
                    {s.name}
                  </span>
                  <span style={{
                    fontSize: 9, padding: "2px 6px", borderRadius: 4, fontWeight: 600,
                    backgroundColor: en.bg, color: en.color, letterSpacing: 1,
                  }}>
                    {en.label}
                  </span>
                </div>
                <p style={{ fontSize: 11, color: "#666", margin: 0 }}>{s.farm} · {s.region}</p>
                <div style={{ marginTop: 8 }}>
                  <TerpeneBar profile={s.terpeneProfile} colors={sc} />
                </div>
              </button>
            );
          })}
        </div>
        <div style={{ padding: "12px 20px", borderTop: "1px solid #222", fontSize: 10, color: "#444" }}>
          {STRAINS.length} of 24 strains complete
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", transition: "background-color 0.5s ease", backgroundColor: colors.bg }}>
        {/* Header */}
        <div style={{ padding: "20px 40px", borderBottom: `1px solid ${colors.primary}22`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: "none", border: "none", color: colors.muted, cursor: "pointer", fontSize: 18, padding: "4px 8px" }}>
              {sidebarOpen ? "◀" : "▶"}
            </button>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <h2 style={{ fontSize: 22, fontWeight: 300, color: colors.text, letterSpacing: -0.5, margin: 0 }}>
                  {strain.name}
                </h2>
                <span style={{
                  fontSize: 9, padding: "2px 8px", borderRadius: 4, fontWeight: 600,
                  backgroundColor: energy.bg, color: energy.color, letterSpacing: 1,
                }}>
                  {energy.label}
                </span>
              </div>
              <p style={{ fontSize: 12, color: colors.muted, margin: "4px 0 0", fontStyle: "italic" }}>
                {strain.intent}
              </p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 11, color: colors.muted, margin: 0 }}>{strain.farm} · {strain.region}</p>
            <p style={{ fontSize: 11, color: colors.muted, margin: "2px 0 0" }}>
              {strain.aroma} · {strain.totalTerpenes}
            </p>
          </div>
        </div>

        {/* Format Tabs */}
        <div style={{ padding: "0 40px", borderBottom: `1px solid ${colors.primary}15`, display: "flex", gap: 0 }}>
          {FORMATS.map(f => (
            <button key={f.key} onClick={() => setActiveFormat(f.key)}
              style={{
                padding: "14px 20px", background: "none", border: "none",
                borderBottom: activeFormat === f.key ? `2px solid ${colors.primary}` : "2px solid transparent",
                color: activeFormat === f.key ? colors.primary : colors.muted,
                fontSize: 12, letterSpacing: 0.5, cursor: "pointer", fontWeight: activeFormat === f.key ? 600 : 400,
                transition: "all 0.2s ease",
              }}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Terpene Voice Bar */}
        <div style={{ padding: "12px 40px 0" }}>
          <p style={{ fontSize: 10, color: colors.muted, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>
            Voice Blend
          </p>
          <TerpeneBar profile={strain.terpeneProfile} colors={colors} />
          <p style={{ fontSize: 10, color: `${colors.muted}99`, marginTop: 4 }}>{strain.voiceBlend}</p>
        </div>

        {/* Content */}
        <div ref={contentRef} style={{ flex: 1, overflowY: "auto", padding: "32px 40px 80px", maxWidth: 720 }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
