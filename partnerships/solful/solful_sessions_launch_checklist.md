# Solful Sessions — The Terpene Files
## Launch Checklist: From Script to Subscribers

*Target: Episode 01 published within 2–3 weeks*
*Phases: AI-narrated → Self-recorded option → Hybrid*

---

## PHASE 0 — SETUP (One-Time, ~3–4 Hours Total)

### Step 1: Get Your Mic (Day 1)
**Buy one of these — nothing else needed:**
- **Budget:** Samson Q2U (~$70) — USB + XLR dual-mode, so it grows with you. Plug-and-play via USB now, upgrade to audio interface later if you want.
- **Mid-range:** Shure MV7 (~$250) — the podcaster standard. USB-C + XLR. Built-in noise rejection.
- **Already have an iPhone?** Start there. Voice Memos app in a quiet room, phone 6 inches from mouth, works for voice cloning samples. Not ideal, but fast.

**Recording environment:** Closet full of clothes > empty room. Soft surfaces kill echo. No fans, no fridge hum. Record a 10-second silence test — if you hear anything, fix it.

### Step 2: Record Voice Cloning Samples (Day 1–2, ~90 min)
**What ElevenLabs needs for Professional Voice Cloning:**
- **Minimum:** 30 minutes of clean speech
- **Recommended:** 1–3 hours for best quality
- **Format:** WAV or MP3, 44.1kHz, mono

**What to record:**
Record yourself reading aloud — but not robotically. Read with energy, as if explaining something fascinating to a friend. Sources to read from:
1. Your own writing (the Solful pitch doc, Article 1 abstract, strain card descriptions) — this captures YOUR voice on YOUR topic
2. The Episode 01 transcript we already wrote — this becomes both training data AND a quality benchmark to compare against
3. Any long-form content you enjoy — a book passage, a Russo paper abstract

**Recording tips for clone quality:**
- Speak at your natural podcast pace — conversational, not rushed
- Vary your tone naturally (questions, emphasis, asides)
- Include some French-Canadian pronunciation naturally if that's part of your voice — the clone should capture YOUR accent
- Leave 1 second of silence between paragraphs
- Don't edit out minor imperfections — they make the clone sound human
- DO edit out coughs, phone buzzes, dog barks

**Save all raw recordings.** You'll use them for the clone AND as backup if you switch to self-recorded later.

### Step 3: Set Up ElevenLabs (Day 2, ~20 min)
1. Go to [elevenlabs.io](https://elevenlabs.io) → Sign up
2. Subscribe to **Creator plan** ($22/month) — this unlocks Professional Voice Cloning + ~100 min of generation/month
3. Navigate to **Voices → Voice Cloning → Professional Voice Cloning**
4. Upload your recordings
5. Complete voice verification (read a short passage to confirm it's your voice)
6. Submit for processing — takes **2–6 hours**
7. While waiting: test with a stock voice. Paste the first paragraph of Episode 01, generate, listen. Get familiar with the interface.

### Step 4: Set Up Auphonic (Day 2, ~15 min)
1. Go to [auphonic.com](https://auphonic.com) → Create free account
2. Free tier gives you **2 hours/month** — enough for 2 biweekly episodes
3. Create a **Preset** called "Solful Sessions" with these settings:
   - Loudness Target: **-16 LUFS** (podcast standard)
   - Noise Reduction: On (Auto)
   - Leveler: On
   - Output: MP3 192kbps + WAV backup
   - Intro/Outro: Upload your audio files (see Step 6)
4. Optional: Connect a Dropbox watch folder for zero-touch processing later

### Step 5: Set Up Hosting — Buzzsprout (Day 2–3, ~20 min)
1. Go to [buzzsprout.com](https://buzzsprout.com) → Sign up for **$12/month plan** (3 hrs upload/month, sufficient for biweekly)
2. Fill in show details:
   - **Show name:** Solful Sessions — The Terpene Files
   - **Description:** "The same molecule. Every plant. One body. Solful Sessions explores the science of terpenes — the aromatic compounds that connect cannabis, aromatherapy, forest bathing, food, and perfumery through shared pharmacology. Hosted by Charles Pelletier-Gagné. Scripted and produced by Charles Pelletier-Gagné; narrated using AI voice technology."
   - **Category:** Science → Natural Sciences (primary), Health & Fitness → Alternative Health (secondary)
   - **Language:** English
   - **Explicit:** No (unless you plan cannabis consumption discussions that warrant it)
3. **Submit to directories** — Buzzsprout does this in one click:
   - Apple Podcasts (2–5 days for approval)
   - Spotify (usually same-day)
   - Amazon Music / Audible
   - iHeartRadio
   - YouTube Music (submit RSS feed)
4. Copy your **RSS feed URL** — you'll need it for YouTube

### Step 6: Create Audio Assets (Day 2–3, ~30 min)

**Intro (15–18 seconds):**
Structure: Music bed fades in → "This is Solful Sessions — The Terpene Files. I'm Charles Pelletier-Gagné." → Music bed continues under...

- **Music:** License a track from Artlist ($17/month, cancel after one month) or use royalty-free from Pixabay/Free Music Archive. Search "organic ambient" or "science documentary." You want something that feels botanical, not corporate.
- **Generate the voice line** using your ElevenLabs clone
- **Mix in Descript or GarageBand:** Music at -20dB under voice, fade music in 2 sec before voice, let it tail 3 sec after

**Outro (20–25 seconds):**
"Solful Sessions is written and produced by Charles Pelletier-Gagné. Narrated using AI voice technology. Show notes and references at [website]. New episodes every other [day]."

**Disclosure stamp (use in every episode, first 60 seconds):**
Build this into your cold open template: "Quick note before we start: this episode is narrated using my AI-cloned voice — same words, same research, same perspective, just delivered through neural networks instead of vocal cords. All the science is mine. Let's get into it."

### Step 7: Create Cover Art (Day 3, ~30 min)
**Specs:** 3000×3000px, JPEG or PNG, RGB, under 512KB

**Design in Canva (free):**
- Use the Solful Sessions design system: dark charcoal background, botanical/molecular accent imagery
- Show title large and readable at thumbnail size (170×170px is how it appears on phones)
- Your name smaller underneath
- Consider a terpene molecule or botanical silhouette as a visual anchor
- Test: shrink it to 170px. Can you still read the title? If no, simplify.

---

## PHASE 1 — PUBLISH EPISODE 01 (Week 2)

### Step 8: Generate Episode Audio (45 min)
1. Open your **Episode 01 transcript** (α-Pinene — The Forest's Fingerprint)
2. In ElevenLabs:
   - Select your cloned voice
   - Set model to **Multilingual v2** or **Turbo v2.5** (test both — Multilingual is higher quality, Turbo is faster)
   - Set Stability to **~0.50** (more expressive) and Similarity to **~0.75** (close to your voice but not robotic)
3. **Generate in sections, not all at once:**
   - Cold Open (separate generation)
   - The Molecule section
   - The Science section
   - The Bridge section
   - The Cannabis Connection
   - The Pre-Load
   - The Close
4. **Listen to each section.** Flag any:
   - Mispronunciations (acetylcholinesterase, phytoncides, shinrin-yoku — regenerate with phonetic spelling if needed)
   - Unnatural pauses or run-on phrasing
   - Flat delivery on lines that need emphasis
5. **Fix issues** by regenerating individual sections with tweaked text (add commas for pauses, periods for full stops, "..." for beats)
6. Download all sections as MP3

### Step 9: Assemble Final Audio (15 min)
**Option A — Descript (free tier):**
1. Import all audio sections in order
2. Add intro at the beginning
3. Add outro at the end
4. Add 1–2 seconds of silence between major sections
5. Export as WAV

**Option B — Auphonic (automated):**
1. Upload your concatenated episode audio
2. Select your "Solful Sessions" preset (which auto-adds intro/outro)
3. Process → Download final MP3

### Step 10: Upload and Schedule (10 min)
1. Log into Buzzsprout
2. Upload your final MP3
3. Fill in episode details:
   - **Title:** "α-Pinene — The Forest's Fingerprint | Episode 01"
   - **Description:** 2–3 sentence summary + "Show notes and full references at [link]"
   - **Episode number:** 1
   - **Season:** 1
   - **Episode type:** Full
4. Add **chapter markers** (Buzzsprout supports these):
   - 00:00 — Cold Open
   - 01:30 — The Molecule
   - 05:00 — The Science (adjust timestamps to your actual audio)
   - 10:00 — The Bridge
   - 12:30 — The Cannabis Connection
   - 15:00 — The Pre-Load
   - 17:00 — The Close
5. **Schedule for release** — don't publish immediately. Set a date.
   - Pick your recurring day: **Tuesday or Wednesday, 5:00 AM EST**
   - This becomes your permanent slot

### Step 11: Publish Trailer First (Before Episode 01)
Before Episode 01 goes live, publish a **90-second trailer:**

Script template:
> "What if the molecule that makes pine forests smell alive is the same molecule that shapes your cannabis experience? What if rosemary, juniper, frankincense, and Jack Herer are all speaking the same pharmacological language — and your body already knows how to listen?
>
> I'm Charles Pelletier-Gagné, and this is Solful Sessions — The Terpene Files.
>
> Each episode, we go deep on a single terpene or terpene profile — the science, the history, the strains, and the practical protocols that connect cannabis, aromatherapy, forest bathing, and food through one unifying principle: the same molecule activates the same receptor, regardless of the plant it came from.
>
> New episodes every other [Tuesday/Wednesday]. Episode one drops [date]. Subscribe now."

Publish trailer → wait 3–5 days → publish Episode 01 + Episodes 02–03 simultaneously (the "launch with three" strategy).

This means you should **write and produce Episodes 02 and 03 before launching.** Use the production framework. β-Caryophyllene and Limonene are the natural next picks — both have strong data and direct Solful strain connections.

### Step 12: Create YouTube Presence (30 min, one-time)
1. Create a YouTube channel (or use existing) named "Solful Sessions"
2. **Submit your RSS feed** to YouTube via YouTube Studio → Settings → Upload defaults → RSS feed import
3. For each episode, also upload a **video version:**
   - Simplest: Use Descript's "Publish to YouTube" — generates waveform + captions automatically
   - Better: Use Canva to create a branded background image, overlay waveform + animated captions using Headliner or Descript
   - Best (later): Use a tool to add relevant botanical/molecular imagery synced to sections

### Step 13: Generate Social Clips (15 min per episode)
1. Upload your full episode to **OpusClip** ($15/month)
2. Let it auto-detect 8–15 highlight clips (15–60 seconds each)
3. Review, select the best 3–5
4. Download with auto-generated captions
5. Post to:
   - Instagram Reels (terpene science audience)
   - TikTok (younger cannabis-curious audience)
   - YouTube Shorts (algorithmic discovery)
   - LinkedIn (your professional network — this positions your expertise)

---

## PHASE 1 CONTINUED — EPISODES 2–10 (Weeks 3–12)

### Biweekly Production Rhythm
Every two weeks, block **90 minutes** and execute:

| Monday | Activity | Time |
|--------|----------|------|
| Week A, Day 1 | Write/refine script (with AI drafting assist) | 50 min |
| Week A, Day 2 | Generate audio, assemble, upload, schedule | 40 min |
| Week B | No production — episode auto-publishes | 0 min |

**Episode queue (first 10):**
1. ✅ α-Pinene — The Forest's Fingerprint
2. β-Caryophyllene — The Dietary Cannabinoid
3. d-Limonene — The Anxiety Molecule (leverage Spindle 2024 RCT)
4. Myrcene — The Couch-Lock Question
5. Linalool — Lavender's Secret Life
6. α-Humulene — The Anti-Inflammatory Nobody Talks About
7. Terpinolene — The Rare One
8. β-Ocimene — The Sweet Disruptor
9. α-Bisabolol — Chamomile's Hidden Power
10. **Mike's Bomba — The Grounding Session** (first Type B strain episode)

### Phase 1 Review Gate (After Episode 10, ~Month 5)
Before moving to Phase 2, assess:
- [ ] Downloads per episode trending upward?
- [ ] Completion rate above 65%?
- [ ] Any listener feedback on AI voice quality?
- [ ] Has anyone asked "is this AI?" (positive signal — means it's close enough to question)
- [ ] Are you hitting 90-minute production target consistently?
- [ ] Which episodes performed best? (guides future topic selection)

---

## PHASE 2 — SELF-RECORDED TEST (Month 5–6)

### Step 14: Record One Episode Yourself
Pick an episode you're personally passionate about — probably a strain episode where your personal experience adds color.

1. Use the same mic you bought for voice cloning
2. Read from the script, but let yourself deviate naturally — ad-lib asides, emphasize differently than the AI would
3. Record in one take if possible (edit out major flubs in Descript)
4. Process through Auphonic with the same preset
5. Publish as a normal episode — no announcement, no A/B test framing

### Step 15: Compare the Data
After 2 weeks, pull metrics:
- Downloads vs. AI-narrated episode average
- Completion rate vs. AI-narrated average
- Any qualitative listener feedback?

**Decision matrix:**
| If... | Then... |
|-------|---------|
| Self-recorded performs significantly better | Consider switching to self-recorded for all episodes |
| Self-recorded performs the same | Stay with AI — save the time |
| Self-recorded performs worse | Your AI clone is better than your live read (this happens more than you'd think) — stay with AI |
| You enjoyed recording | Move to Phase 3 hybrid regardless of data |
| You hated recording | Stay with AI, don't look back |

---

## PHASE 3 — HYBRID MODEL (Month 6+)

### The 80/20 Split
- **You record:** Cold open + close (90 seconds each = 3 minutes total recording)
- **AI generates:** Everything between (the science body, 12–15 minutes)
- **Why this works:** Your authentic voice anchors the personal/emotional beats. The AI handles the dense pharmacology where consistent pacing matters more than vocal personality.

### Production change:
Same 90-minute workflow, but replace "generate cold open/close in ElevenLabs" with "record cold open/close on mic" (~5 minutes). Net time impact: zero.

---

## MONETIZATION TIMELINE

| Milestone | Action |
|-----------|--------|
| Episode 1 | Include Solful Sessions essential oil blend CTAs in show notes |
| Episode 5 | Set up essential oil affiliate links (Plant Therapy, Eden's Garden) |
| Episode 10 | Launch Vibe Curator app CTA in episodes |
| Episode 15 | Assess audience size for Patreon/membership |
| Episode 20 | If 500+ downloads/ep: pitch direct sponsors (diffuser brands, CBD companies) |
| Episode 25 | If 1,000+ downloads/ep: apply to podcast ad networks |

---

## MONTHLY COST SUMMARY

| Tool | Cost | Purpose |
|------|------|---------|
| ElevenLabs Creator | $22/mo | AI voice generation + cloning |
| Buzzsprout | $12/mo | Hosting + distribution + basic analytics |
| Auphonic | $0–11/mo | Audio post-production (free tier may suffice) |
| OpusClip | $15/mo | Social clip generation |
| Artlist (month 1 only) | $17 | Music licensing for intro/outro |
| Domain + simple site | $10/mo | Show notes, links, email capture |
| **Total** | **$59–76/mo** | |

---

## LAUNCH WEEK CHECKLIST (Copy-Paste to Your Task Manager)

- [ ] Buy microphone
- [ ] Record 1–3 hours of voice samples
- [ ] Sign up for ElevenLabs Creator ($22/mo)
- [ ] Submit voice for Professional Voice Cloning
- [ ] Sign up for Buzzsprout ($12/mo)
- [ ] Fill in show details and submit to directories
- [ ] Sign up for Auphonic (free tier)
- [ ] Create Auphonic preset "Solful Sessions"
- [ ] License one music track for intro/outro
- [ ] Generate intro and outro audio
- [ ] Design cover art in Canva (3000×3000px)
- [ ] Upload cover art to Buzzsprout
- [ ] Write Episode 02 script (β-Caryophyllene)
- [ ] Write Episode 03 script (Limonene)
- [ ] Generate audio for Episodes 01, 02, 03
- [ ] Assemble and master all three episodes
- [ ] Record and publish trailer
- [ ] Wait 3–5 days
- [ ] Publish Episodes 01–03 simultaneously
- [ ] Create YouTube channel and submit RSS
- [ ] Upload video versions of all three episodes
- [ ] Generate and post social clips
- [ ] Set up biweekly production calendar

---

*Solful Sessions Launch Plan v1.0 — March 2026*
*Designed for <2 hours/week production constraint*
*Three-phase evolution: AI-only → Test self-recorded → Hybrid*
