// ============================================================
// VIBE CURATOR — Terpene × Spotify Playlist Engine
// ============================================================
// SETUP:
//   1. Create a Spotify App at https://developer.spotify.com/dashboard
//   2. Set Redirect URI to: http://localhost:3000 (or your deployed URL)
//   3. Replace CLIENT_ID below with your App's Client ID
//   4. Required scopes: user-top-read, playlist-modify-public, playlist-modify-private
// ============================================================

import { useState, useEffect, useCallback, useRef } from "react";

const CLIENT_ID = "YOUR_SPOTIFY_CLIENT_ID"; // ← Replace this
const REDIRECT_URI = window.location.origin;
const SCOPES = [
  "user-top-read",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-read-private",
].join(" ");

// ============================================================
// TERPENE → AUDIO PARAMETER MAP
// Core algorithm: each terpene maps to a target Spotify audio profile
// Values are midpoints; blending produces weighted averages
// ============================================================
const TERPENE_PARAMS = {
  myrcene: {
    tempo: 72, energy: 0.20, valence: 0.30, danceability: 0.30,
    acousticness: 0.75, instrumentalness: 0.65,
    genres: ["ambient", "trip-hop", "dub", "downtempo"],
    color: "#4a7c59", label: "Myrcene", effect: "sedative anchor",
  },
  limonene: {
    tempo: 112, energy: 0.72, valence: 0.75, danceability: 0.72,
    acousticness: 0.15, instrumentalness: 0.20,
    genres: ["funk", "soul", "afrobeat", "pop"],
    color: "#e8b84b", label: "Limonene", effect: "uplifting",
  },
  beta_caryophyllene: {
    tempo: 97, energy: 0.40, valence: 0.50, danceability: 0.52,
    acousticness: 0.45, instrumentalness: 0.40,
    genres: ["deep-house", "reggae", "jazz", "soul"],
    color: "#8b4513", label: "β-Caryophyllene", effect: "grounding",
  },
  linalool: {
    tempo: 70, energy: 0.18, valence: 0.50, danceability: 0.28,
    acousticness: 0.80, instrumentalness: 0.55,
    genres: ["ambient", "classical", "folk", "new-age"],
    color: "#9b7fa8", label: "Linalool", effect: "calming",
  },
  alpha_pinene: {
    tempo: 115, energy: 0.68, valence: 0.60, danceability: 0.52,
    acousticness: 0.55, instrumentalness: 0.60,
    genres: ["folk", "bluegrass", "acoustic", "indie-folk"],
    color: "#2d6a4f", label: "α-Pinene", effect: "alerting",
  },
  terpinolene: {
    tempo: 97, energy: 0.52, valence: 0.62, danceability: 0.57,
    acousticness: 0.45, instrumentalness: 0.60,
    genres: ["psychedelic", "art-pop", "progressive", "experimental"],
    color: "#e07a5f", label: "Terpinolene", effect: "creative paradox",
  },
  alpha_humulene: {
    tempo: 87, energy: 0.38, valence: 0.45, danceability: 0.45,
    acousticness: 0.67, instrumentalness: 0.50,
    genres: ["dub", "downtempo", "roots", "world-music"],
    color: "#7a6b45", label: "α-Humulene", effect: "earthy centering",
  },
  ocimene: {
    tempo: 126, energy: 0.80, valence: 0.70, danceability: 0.75,
    acousticness: 0.12, instrumentalness: 0.35,
    genres: ["electronic", "dance", "indie-pop", "synth-pop"],
    color: "#48cae4", label: "Ocimene", effect: "bright energizer",
  },
  alpha_bisabolol: {
    tempo: 68, energy: 0.15, valence: 0.48, danceability: 0.25,
    acousticness: 0.82, instrumentalness: 0.60,
    genres: ["ambient", "new-age", "classical", "minimal"],
    color: "#b5c4b1", label: "α-Bisabolol", effect: "gentle soothing",
  },
};

// ============================================================
// SOLFUL STRAIN LIBRARY — SC Labs COA data
// ============================================================
const STRAINS = [
  {
    id: "mikes_bomba", name: "Mike's Bomba", farm: "Glentucky Family Farm",
    region: "Sonoma", vibe: "Grounded & Present", energy: "LOW",
    terpenes: { myrcene: 0.48, beta_caryophyllene: 0.22, alpha_humulene: 0.09, limonene: 0.08, linalool: 0.06, alpha_pinene: 0.04, ocimene: 0.03 },
  },
  {
    id: "blueberry_muffin", name: "Blueberry Muffin", farm: "Glentucky Family Farm",
    region: "Sonoma", vibe: "Cozy Comfort", energy: "LOW-MED",
    terpenes: { myrcene: 0.35, limonene: 0.28, linalool: 0.18, beta_caryophyllene: 0.12, ocimene: 0.07 },
  },
  {
    id: "strawberry_biscotti", name: "Strawberry Biscotti", farm: "Happy Day Farms",
    region: "Mendocino", vibe: "Cozy Comfort", energy: "MEDIUM",
    terpenes: { limonene: 0.36, beta_caryophyllene: 0.28, myrcene: 0.24, alpha_bisabolol: 0.12 },
  },
  {
    id: "pink_rider", name: "Pink Rider", farm: "Glentucky Family Farm",
    region: "Sonoma", vibe: "Creative Flow", energy: "MEDIUM",
    terpenes: { terpinolene: 0.42, limonene: 0.28, ocimene: 0.15, beta_caryophyllene: 0.10, myrcene: 0.05 },
  },
  {
    id: "carambola", name: "Carambola", farm: "Moon Made Farms",
    region: "Humboldt", vibe: "Euphoric Lift", energy: "HIGH",
    terpenes: { limonene: 0.38, ocimene: 0.25, terpinolene: 0.18, alpha_pinene: 0.12, myrcene: 0.07 },
  },
  {
    id: "mule_fuel", name: "Mule Fuel", farm: "Fiddler's Greens",
    region: "Mendocino", vibe: "Deep Rest", energy: "LOW",
    terpenes: { myrcene: 0.52, beta_caryophyllene: 0.24, alpha_humulene: 0.12, linalool: 0.08, limonene: 0.04 },
  },
  {
    id: "pinnacle", name: "Pinnacle", farm: "Dos Rios Farms",
    region: "Mendocino", vibe: "Deep Rest", energy: "LOW",
    terpenes: { beta_caryophyllene: 0.44, limonene: 0.33, alpha_humulene: 0.14, terpinolene: 0.09 },
  },
  {
    id: "tropical_sleigh_ride", name: "Tropical Sleigh Ride", farm: "Wonderland Nursery",
    region: "Trinity", vibe: "Euphoric Lift", energy: "HIGH",
    terpenes: { terpinolene: 0.35, limonene: 0.30, ocimene: 0.20, myrcene: 0.10, beta_caryophyllene: 0.05 },
  },
  {
    id: "glitter_bomb", name: "Glitter Bomb", farm: "Moon Made Farms",
    region: "Humboldt", vibe: "Body Melt", energy: "LOW-MED",
    terpenes: { myrcene: 0.40, beta_caryophyllene: 0.30, linalool: 0.15, limonene: 0.10, alpha_humulene: 0.05 },
  },
  {
    id: "guava_gift", name: "Guava Gift", farm: "Glentucky Family Farm",
    region: "Sonoma", vibe: "Social & Bright", energy: "MEDIUM",
    terpenes: { limonene: 0.32, ocimene: 0.28, terpinolene: 0.20, myrcene: 0.12, beta_caryophyllene: 0.08 },
  },
  {
    id: "love_and_laughter", name: "Love and Laughter", farm: "Fiddler's Greens",
    region: "Mendocino", vibe: "Calm Focus", energy: "MEDIUM",
    terpenes: { alpha_pinene: 0.35, terpinolene: 0.28, limonene: 0.20, beta_caryophyllene: 0.12, myrcene: 0.05 },
  },
  {
    id: "avenue_of_giants", name: "Avenue of the Giants", farm: "Fiddler's Greens",
    region: "Mendocino", vibe: "Euphoric Lift", energy: "HIGH",
    terpenes: { terpinolene: 0.40, ocimene: 0.25, limonene: 0.20, alpha_pinene: 0.10, myrcene: 0.05 },
  },
];

// ============================================================
// SPOTIFY PKCE AUTH HELPERS
// ============================================================
function generateCodeVerifier(length = 64) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => chars[b % chars.length]).join("");
}

async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function initiateSpotifyAuth() {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  sessionStorage.setItem("spotify_verifier", verifier);
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    code_challenge_method: "S256",
    code_challenge: challenge,
  });
  window.location.href = `https://accounts.spotify.com/authorize?${params}`;
}

async function exchangeCodeForToken(code) {
  const verifier = sessionStorage.getItem("spotify_verifier");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: verifier,
    }),
  });
  if (!res.ok) throw new Error("Token exchange failed");
  return res.json();
}

async function refreshAccessToken(refreshToken) {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  if (!res.ok) throw new Error("Token refresh failed");
  return res.json();
}

// ============================================================
// SPOTIFY API CLIENT
// ============================================================
function createSpotifyClient(accessToken) {
  const headers = { Authorization: `Bearer ${accessToken}` };

  async function get(path) {
    const res = await fetch(`https://api.spotify.com/v1${path}`, { headers });
    if (!res.ok) throw new Error(`Spotify API error: ${res.status} ${path}`);
    return res.json();
  }

  async function post(path, body) {
    const res = await fetch(`https://api.spotify.com/v1${path}`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Spotify API error: ${res.status} ${path}`);
    return res.json();
  }

  // Fetch user's top tracks and compute their audio baseline
  async function getUserAudioProfile(timeRange = "medium_term") {
    const topTracks = await get(`/me/top/tracks?time_range=${timeRange}&limit=50`);
    const ids = topTracks.items.map((t) => t.id).join(",");
    const features = await get(`/audio-features?ids=${ids}`);
    const validFeatures = features.audio_features.filter(Boolean);

    const avg = (key) =>
      validFeatures.reduce((s, f) => s + (f[key] || 0), 0) / validFeatures.length;

    return {
      energy: avg("energy"),
      valence: avg("valence"),
      tempo: avg("tempo"),
      danceability: avg("danceability"),
      acousticness: avg("acousticness"),
      instrumentalness: avg("instrumentalness"),
      trackCount: validFeatures.length,
      topArtistIds: [...new Set(topTracks.items.flatMap((t) => t.artists.map((a) => a.id)))].slice(0, 5),
      topTrackIds: topTracks.items.slice(0, 5).map((t) => t.id),
    };
  }

  // Fetch user profile
  async function getMe() {
    return get("/me");
  }

  // Core recommendations call with full audio parameter targeting
  async function getRecommendations({ seedGenres, seedArtists, seedTracks, audioParams, limit = 30 }) {
    // Spotify allows max 5 seeds total across all types
    const seeds = [];
    const params = new URLSearchParams({ limit });

    if (seedTracks?.length) {
      seeds.push(...seedTracks.slice(0, 2).map((id) => ({ type: "seed_tracks", value: id })));
    }
    if (seedArtists?.length) {
      const remaining = 3 - (seedTracks?.length || 0);
      seeds.push(...seedArtists.slice(0, remaining).map((id) => ({ type: "seed_artists", value: id })));
    }
    if (seedGenres?.length && seeds.length < 5) {
      seeds.push(...seedGenres.slice(0, 5 - seeds.length).map((g) => ({ type: "seed_genres", value: g })));
    }

    if (seeds.length === 0) {
      seeds.push({ type: "seed_genres", value: "pop" }); // fallback
    }

    // Apply seed types to params
    const trackSeeds = seeds.filter((s) => s.type === "seed_tracks").map((s) => s.value);
    const artistSeeds = seeds.filter((s) => s.type === "seed_artists").map((s) => s.value);
    const genreSeeds = seeds.filter((s) => s.type === "seed_genres").map((s) => s.value);

    if (trackSeeds.length) params.set("seed_tracks", trackSeeds.join(","));
    if (artistSeeds.length) params.set("seed_artists", artistSeeds.join(","));
    if (genreSeeds.length) params.set("seed_genres", genreSeeds.join(","));

    // Audio parameter targeting
    const audioKeys = ["energy", "valence", "tempo", "danceability", "acousticness", "instrumentalness"];
    for (const key of audioKeys) {
      if (audioParams[key] != null) {
        params.set(`target_${key}`, audioParams[key].toFixed(3));
        // Add min/max bounds (±15% tolerance) to prevent extreme outliers
        const val = audioParams[key];
        if (key !== "tempo") {
          params.set(`min_${key}`, Math.max(0, val - 0.20).toFixed(3));
          params.set(`max_${key}`, Math.min(1, val + 0.20).toFixed(3));
        } else {
          params.set(`min_tempo`, Math.max(40, val - 25).toString());
          params.set(`max_tempo`, Math.min(200, val + 25).toString());
        }
      }
    }

    const data = await get(`/recommendations?${params}`);
    return data.tracks;
  }

  // Save tracks as a new playlist
  async function savePlaylist(userId, name, description, trackUris) {
    const playlist = await post(`/users/${userId}/playlists`, {
      name, description, public: false,
    });
    await post(`/playlists/${playlist.id}/tracks`, { uris: trackUris });
    return playlist;
  }

  return { getUserAudioProfile, getMe, getRecommendations, savePlaylist };
}

// ============================================================
// CORE ALGORITHM: Terpene Profile → Audio Parameters
// ============================================================
function computeAudioTarget(strainTerpenes) {
  // Step 1: Normalize terpene ratios
  const total = Object.values(strainTerpenes).reduce((s, v) => s + v, 0);
  const ratios = {};
  for (const [t, v] of Object.entries(strainTerpenes)) {
    ratios[t] = v / total;
  }

  // Step 2: Weighted blend across all audio parameters
  const params = { tempo: 0, energy: 0, valence: 0, danceability: 0, acousticness: 0, instrumentalness: 0 };
  for (const [terpene, ratio] of Object.entries(ratios)) {
    const tp = TERPENE_PARAMS[terpene];
    if (!tp) continue;
    params.tempo += tp.tempo * ratio;
    params.energy += tp.energy * ratio;
    params.valence += tp.valence * ratio;
    params.danceability += tp.danceability * ratio;
    params.acousticness += tp.acousticness * ratio;
    params.instrumentalness += tp.instrumentalness * ratio;
  }

  // Step 3: Derive genre mix from top 3 terpenes by ratio
  const sortedTerpenes = Object.entries(ratios).sort((a, b) => b[1] - a[1]);
  const genreScores = {};
  for (const [terpene, ratio] of sortedTerpenes.slice(0, 3)) {
    const tp = TERPENE_PARAMS[terpene];
    if (!tp) continue;
    for (const genre of tp.genres) {
      genreScores[genre] = (genreScores[genre] || 0) + ratio;
    }
  }
  const genres = Object.entries(genreScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([g]) => g);

  return { params, genres, dominantTerpene: sortedTerpenes[0][0] };
}

// Apply iso principle: blend user baseline toward strain target
function applyIsoOffset(strainTarget, userBaseline, isoStrength = 0.70) {
  if (!userBaseline) return strainTarget;
  const result = {};
  for (const key of ["energy", "valence", "danceability", "acousticness", "instrumentalness"]) {
    result[key] = strainTarget[key] + (userBaseline[key] - strainTarget[key]) * isoStrength;
  }
  result.tempo = strainTarget.tempo + (userBaseline.tempo - strainTarget.tempo) * (isoStrength * 0.5);
  return result;
}

// ============================================================
// TOKEN STORAGE HELPERS
// ============================================================
const TOKEN_KEY = "vc_spotify_token";
function storeToken(data) {
  const expiry = Date.now() + data.expires_in * 1000;
  sessionStorage.setItem(TOKEN_KEY, JSON.stringify({ ...data, expiry }));
}
function loadToken() {
  try {
    return JSON.parse(sessionStorage.getItem(TOKEN_KEY));
  } catch { return null; }
}
function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

// ============================================================
// UI COMPONENTS
// ============================================================
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg: #0a130b;
    --surface: #111a12;
    --surface2: #162018;
    --border: #1e2e1f;
    --gold: #c9a84c;
    --gold-dim: #8a6f32;
    --green: #3a7d44;
    --green-bright: #5aad68;
    --text: #e8e4d8;
    --text-dim: #8a9b8c;
    --text-muted: #4a5e4c;
    --error: #c0504d;
    --radius: 12px;
    --radius-sm: 8px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }

  .app {
    min-height: 100vh;
    background: radial-gradient(ellipse at 20% 0%, #0f2412 0%, transparent 60%),
                radial-gradient(ellipse at 80% 100%, #0d1a0e 0%, transparent 50%),
                var(--bg);
  }

  .header {
    padding: 28px 40px 20px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    background: rgba(10,19,11,0.92);
    backdrop-filter: blur(12px);
    z-index: 100;
  }

  .logo {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    letter-spacing: 0.02em;
    color: var(--text);
  }

  .logo span { color: var(--gold); font-style: italic; }

  .user-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 6px 14px 6px 6px;
    font-size: 13px;
    color: var(--text-dim);
  }

  .user-pill img { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; }

  .main { max-width: 1100px; margin: 0 auto; padding: 40px 24px 80px; }

  .connect-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 70vh;
    text-align: center;
    gap: 24px;
  }

  .connect-screen h1 {
    font-family: 'Playfair Display', serif;
    font-size: 52px;
    font-weight: 700;
    line-height: 1.1;
    max-width: 600px;
  }

  .connect-screen h1 em { color: var(--gold); font-style: italic; }

  .connect-screen p {
    color: var(--text-dim);
    font-size: 17px;
    max-width: 480px;
    line-height: 1.6;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    border-radius: 100px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }

  .btn-primary {
    background: var(--gold);
    color: #0a130b;
  }

  .btn-primary:hover { background: #e0bc5a; transform: translateY(-1px); }

  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .btn-outline {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border);
  }

  .btn-outline:hover { border-color: var(--gold-dim); color: var(--gold); }

  .btn-spotify {
    background: #1DB954;
    color: white;
  }

  .btn-spotify:hover { background: #1ed760; transform: translateY(-1px); }

  .btn-sm { padding: 8px 16px; font-size: 13px; }

  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 16px;
  }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

  @media (max-width: 720px) { .grid-2 { grid-template-columns: 1fr; } }

  /* Strain Cards */
  .strain-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 12px;
    margin-bottom: 32px;
  }

  .strain-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }

  .strain-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--card-color, var(--green));
    opacity: 0.6;
  }

  .strain-card:hover { border-color: var(--gold-dim); transform: translateY(-2px); }

  .strain-card.selected {
    border-color: var(--gold);
    background: var(--surface2);
  }

  .strain-card.selected::before { opacity: 1; height: 3px; }

  .strain-name {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .strain-meta {
    font-size: 11px;
    color: var(--text-muted);
    font-family: 'DM Mono', monospace;
    margin-bottom: 10px;
  }

  .strain-vibe {
    font-size: 12px;
    color: var(--text-dim);
    margin-bottom: 10px;
  }

  .terpene-bars { display: flex; flex-direction: column; gap: 4px; }

  .terpene-bar-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    font-family: 'DM Mono', monospace;
    color: var(--text-muted);
  }

  .terpene-bar-label { width: 72px; flex-shrink: 0; }

  .terpene-bar-track {
    flex: 1;
    height: 3px;
    background: var(--border);
    border-radius: 2px;
    overflow: hidden;
  }

  .terpene-bar-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.4s ease;
  }

  /* Algorithm Panel */
  .algo-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
    margin-bottom: 24px;
  }

  .algo-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    margin-bottom: 20px;
    color: var(--text);
  }

  .param-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) { .param-grid { grid-template-columns: repeat(2, 1fr); } }

  .param-card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 14px;
  }

  .param-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 8px;
  }

  .param-value {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 600;
    color: var(--gold);
  }

  .param-sub {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 2px;
    font-family: 'DM Mono', monospace;
  }

  .iso-bar-wrapper { margin-top: 16px; }

  .iso-label {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    font-family: 'DM Mono', monospace;
    color: var(--text-muted);
    margin-bottom: 6px;
  }

  .iso-track {
    height: 6px;
    background: var(--border);
    border-radius: 3px;
    position: relative;
    overflow: visible;
    margin-bottom: 8px;
  }

  .iso-fill {
    position: absolute;
    height: 100%;
    border-radius: 3px;
    background: linear-gradient(90deg, var(--green), var(--gold));
    transition: width 0.5s ease;
  }

  .iso-dot {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid var(--bg);
  }

  .genres-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }

  .genre-pill {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 12px;
    font-family: 'DM Mono', monospace;
    color: var(--text-dim);
  }

  /* Track List */
  .track-list { display: flex; flex-direction: column; gap: 8px; margin-top: 20px; }

  .track-row {
    display: flex;
    align-items: center;
    gap: 14px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 10px 14px;
    transition: border-color 0.15s;
  }

  .track-row:hover { border-color: var(--gold-dim); }

  .track-num {
    width: 24px;
    text-align: right;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: var(--text-muted);
    flex-shrink: 0;
  }

  .track-img {
    width: 42px;
    height: 42px;
    border-radius: 4px;
    object-fit: cover;
    background: var(--border);
    flex-shrink: 0;
  }

  .track-info { flex: 1; min-width: 0; }

  .track-name {
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .track-artist {
    font-size: 12px;
    color: var(--text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .track-duration {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: var(--text-muted);
    flex-shrink: 0;
  }

  .track-energy-bar {
    width: 48px;
    height: 3px;
    background: var(--border);
    border-radius: 2px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .track-energy-fill { height: 100%; border-radius: 2px; background: var(--green); }

  /* States */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 24px;
    gap: 16px;
    color: var(--text-dim);
  }

  .spinner {
    width: 32px;
    height: 32px;
    border: 2px solid var(--border);
    border-top-color: var(--gold);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .error-box {
    background: rgba(192,80,77,0.1);
    border: 1px solid rgba(192,80,77,0.3);
    border-radius: var(--radius-sm);
    padding: 14px 18px;
    color: #e07a78;
    font-size: 14px;
    margin-bottom: 16px;
  }

  .success-box {
    background: rgba(58,125,68,0.15);
    border: 1px solid rgba(90,173,104,0.3);
    border-radius: var(--radius-sm);
    padding: 14px 18px;
    color: var(--green-bright);
    font-size: 14px;
    margin-bottom: 16px;
  }

  .divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 32px 0;
  }

  .profile-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px 24px;
    margin-bottom: 32px;
  }

  .profile-stats {
    display: flex;
    gap: 32px;
    margin-top: 16px;
    flex-wrap: wrap;
  }

  .profile-stat { text-align: center; }
  .profile-stat .val { font-size: 22px; font-weight: 600; color: var(--gold); font-family: 'Playfair Display', serif; }
  .profile-stat .lbl { font-size: 11px; color: var(--text-muted); font-family: 'DM Mono', monospace; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.08em; }

  .actions-row {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 24px;
  }

  .playlist-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .playlist-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 3px 10px;
    font-size: 11px;
    font-family: 'DM Mono', monospace;
    color: var(--text-muted);
  }

  a { color: var(--gold); text-decoration: none; }
  a:hover { text-decoration: underline; }
`;

function formatDuration(ms) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// ============================================================
// MAIN APP
// ============================================================
export default function VibeCuratorSpotify() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedStrain, setSelectedStrain] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [audioTarget, setAudioTarget] = useState(null);
  const [isoTarget, setIsoTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [savingPlaylist, setSavingPlaylist] = useState(false);
  const clientRef = useRef(null);

  // ── On mount: check for OAuth callback or stored token ──
  useEffect(() => {
    const stored = loadToken();
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      window.history.replaceState({}, "", window.location.pathname);
      exchangeCodeForToken(code)
        .then((data) => {
          storeToken(data);
          setToken(data.access_token);
        })
        .catch((e) => setError("Auth failed: " + e.message));
    } else if (stored && stored.expiry > Date.now()) {
      setToken(stored.access_token);
    }
  }, []);

  // ── When token is ready, bootstrap client + load user data ──
  useEffect(() => {
    if (!token) return;
    clientRef.current = createSpotifyClient(token);
    const client = clientRef.current;

    setProfileLoading(true);
    Promise.all([client.getMe(), client.getUserAudioProfile()])
      .then(([me, profile]) => {
        setUser(me);
        setUserProfile(profile);
      })
      .catch((e) => setError("Failed to load Spotify profile: " + e.message))
      .finally(() => setProfileLoading(false));
  }, [token]);

  // ── When strain is selected, compute algorithm targets ──
  useEffect(() => {
    if (!selectedStrain) return;
    const { params, genres, dominantTerpene } = computeAudioTarget(selectedStrain.terpenes);
    const iso = applyIsoOffset(params, userProfile);
    setAudioTarget({ params, genres, dominantTerpene });
    setIsoTarget(iso);
    setTracks([]);
    setSuccess(null);
  }, [selectedStrain, userProfile]);

  const generatePlaylist = useCallback(async () => {
    if (!selectedStrain || !audioTarget) return;
    setLoading(true);
    setError(null);
    setTracks([]);
    try {
      const client = clientRef.current;
      const seedArtists = userProfile?.topArtistIds?.slice(0, 2) || [];
      const seedTracks = userProfile?.topTrackIds?.slice(0, 1) || [];
      const results = await client.getRecommendations({
        seedGenres: audioTarget.genres.slice(0, 5 - seedArtists.length - seedTracks.length),
        seedArtists,
        seedTracks,
        audioParams: isoTarget,
        limit: 25,
      });
      setTracks(results);
    } catch (e) {
      setError("Couldn't generate playlist: " + e.message);
    } finally {
      setLoading(false);
    }
  }, [selectedStrain, audioTarget, isoTarget, userProfile]);

  const saveToSpotify = useCallback(async () => {
    if (!tracks.length || !user) return;
    setSavingPlaylist(true);
    setError(null);
    try {
      const client = clientRef.current;
      const dominantTerpene = audioTarget.dominantTerpene;
      const terpeneLabel = TERPENE_PARAMS[dominantTerpene]?.label || dominantTerpene;
      const playlist = await client.savePlaylist(
        user.id,
        `${selectedStrain.name} — Vibe Curator`,
        `Terpene-matched playlist for ${selectedStrain.name} by Vibe Curator. Dominant: ${terpeneLabel}. ${selectedStrain.vibe}.`,
        tracks.map((t) => t.uri)
      );
      setSuccess(`Saved to Spotify → "${playlist.name}"`);
    } catch (e) {
      setError("Save failed: " + e.message);
    } finally {
      setSavingPlaylist(false);
    }
  }, [tracks, user, selectedStrain, audioTarget]);

  const logout = useCallback(() => {
    clearToken();
    setToken(null);
    setUser(null);
    setUserProfile(null);
    setSelectedStrain(null);
    setTracks([]);
    setAudioTarget(null);
    clientRef.current = null;
  }, []);

  // ── Render helpers ──
  function renderTerpeneBar(terpene, ratio) {
    const tp = TERPENE_PARAMS[terpene];
    const color = tp?.color || "#4a7c59";
    const label = tp?.label || terpene;
    const pct = (ratio * 100).toFixed(0);
    return (
      <div key={terpene} className="terpene-bar-row">
        <span className="terpene-bar-label">{label}</span>
        <div className="terpene-bar-track">
          <div className="terpene-bar-fill" style={{ width: `${ratio * 100 * 1.5}%`, background: color }} />
        </div>
        <span>{pct}%</span>
      </div>
    );
  }

  function renderParamCard(label, value, subLabel, isPercent = true) {
    const display = isPercent
      ? (value * 100).toFixed(0) + "%"
      : Math.round(value) + " BPM";
    return (
      <div className="param-card" key={label}>
        <div className="param-label">{label}</div>
        <div className="param-value">{display}</div>
        {subLabel && <div className="param-sub">{subLabel}</div>}
      </div>
    );
  }

  function renderIsoBar(label, strainVal, isoVal, userVal) {
    const strainPct = (strainVal * 100).toFixed(0);
    const isoPct = (isoVal * 100).toFixed(0);
    const userPct = userVal != null ? (userVal * 100).toFixed(0) : null;
    return (
      <div className="iso-bar-wrapper" key={label}>
        <div className="iso-label">
          <span>{label}</span>
          <span>{userPct != null ? `${userPct}% → ${isoPct}% → ${strainPct}%` : `target: ${strainPct}%`}</span>
        </div>
        <div className="iso-track">
          <div className="iso-fill" style={{ width: `${isoPct}%` }} />
          <div className="iso-dot" style={{ left: `${strainPct}%`, background: "var(--gold)" }} />
          {userPct != null && (
            <div className="iso-dot" style={{ left: `${userPct}%`, background: "var(--green-bright)" }} />
          )}
        </div>
      </div>
    );
  }

  // ── Not authenticated ──
  if (!token) {
    return (
      <>
        <style>{styles}</style>
        <div className="app">
          <header className="header">
            <div className="logo">Vibe <span>Curator</span></div>
          </header>
          <div className="main">
            <div className="connect-screen">
              <h1>Strain-matched playlists from <em>terpene science</em></h1>
              <p>Connect your Spotify account. Select a strain. The algorithm reads its terpene fingerprint and generates a personalized playlist calibrated to your listening history.</p>
              <button className="btn btn-spotify" onClick={initiateSpotifyAuth}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Connect Spotify
              </button>
              <p style={{fontSize: "12px", color: "var(--text-muted)", marginTop: "-8px"}}>
                Requires: user-top-read, playlist-modify-private
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Loading profile ──
  if (profileLoading) {
    return (
      <>
        <style>{styles}</style>
        <div className="app">
          <header className="header"><div className="logo">Vibe <span>Curator</span></div></header>
          <div className="main">
            <div className="loading-state">
              <div className="spinner" />
              <span>Building your audio profile…</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Main UI ──
  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <header className="header">
          <div className="logo">Vibe <span>Curator</span></div>
          {user && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div className="user-pill">
                {user.images?.[0] && <img src={user.images[0].url} alt={user.display_name} />}
                <span>{user.display_name}</span>
              </div>
              <button className="btn btn-outline btn-sm" onClick={logout}>Sign out</button>
            </div>
          )}
        </header>

        <div className="main">
          {error && <div className="error-box">{error}</div>}
          {success && <div className="success-box">{success}</div>}

          {/* User Audio Profile */}
          {userProfile && (
            <div className="profile-card">
              <div className="section-label">Your Spotify Audio Profile</div>
              <div className="profile-stats">
                {[
                  { val: (userProfile.energy * 100).toFixed(0) + "%", lbl: "Energy" },
                  { val: (userProfile.valence * 100).toFixed(0) + "%", lbl: "Valence" },
                  { val: Math.round(userProfile.tempo) + " BPM", lbl: "Tempo" },
                  { val: (userProfile.danceability * 100).toFixed(0) + "%", lbl: "Danceability" },
                  { val: (userProfile.acousticness * 100).toFixed(0) + "%", lbl: "Acousticness" },
                  { val: userProfile.trackCount, lbl: "Tracks analyzed" },
                ].map(({ val, lbl }) => (
                  <div className="profile-stat" key={lbl}>
                    <div className="val">{val}</div>
                    <div className="lbl">{lbl}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "14px", fontFamily: "'DM Mono', monospace" }}>
                This becomes your iso departure point — the playlist starts here, arcs toward the strain's terpene target.
              </p>
            </div>
          )}

          {/* Strain Selector */}
          <div className="section-label">Select a Strain</div>
          <div className="strain-grid">
            {STRAINS.map((strain) => {
              const dominantT = Object.entries(strain.terpenes).sort((a, b) => b[1] - a[1])[0][0];
              const cardColor = TERPENE_PARAMS[dominantT]?.color || "var(--green)";
              const ratioTotal = Object.values(strain.terpenes).reduce((s, v) => s + v, 0);
              return (
                <div
                  key={strain.id}
                  className={`strain-card ${selectedStrain?.id === strain.id ? "selected" : ""}`}
                  style={{ "--card-color": cardColor }}
                  onClick={() => setSelectedStrain(strain)}
                >
                  <div className="strain-name">{strain.name}</div>
                  <div className="strain-meta">{strain.farm} · {strain.region}</div>
                  <div className="strain-vibe">{strain.vibe}</div>
                  <div className="terpene-bars">
                    {Object.entries(strain.terpenes)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 4)
                      .map(([t, v]) => renderTerpeneBar(t, v / ratioTotal))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Algorithm Output */}
          {selectedStrain && audioTarget && isoTarget && (
            <>
              <hr className="divider" />
              <div className="algo-panel">
                <div className="algo-title">
                  Algorithm Output — {selectedStrain.name}
                </div>

                <div className="section-label">Strain Target Parameters</div>
                <div className="param-grid">
                  {renderParamCard("Energy", audioTarget.params.energy, TERPENE_PARAMS[audioTarget.dominantTerpene]?.effect)}
                  {renderParamCard("Valence", audioTarget.params.valence, "mood positivity")}
                  {renderParamCard("Tempo", audioTarget.params.tempo, null, false)}
                  {renderParamCard("Danceability", audioTarget.params.danceability, "rhythmic groove")}
                  {renderParamCard("Acousticness", audioTarget.params.acousticness, "organic vs electronic")}
                  {renderParamCard("Instrumentalness", audioTarget.params.instrumentalness, "vocals vs instrumental")}
                </div>

                {/* Iso principle visualization */}
                {userProfile && (
                  <>
                    <div className="section-label" style={{ marginBottom: "12px" }}>
                      Iso Arc — <span style={{ color: "var(--green-bright)" }}>■</span> your baseline →{" "}
                      <span style={{ color: "var(--gold)" }}>■</span> strain target (sent to Spotify)
                    </div>
                    {["energy", "valence", "danceability", "acousticness"].map((key) =>
                      renderIsoBar(
                        key.charAt(0).toUpperCase() + key.slice(1),
                        audioTarget.params[key],
                        isoTarget[key],
                        userProfile[key]
                      )
                    )}
                  </>
                )}

                <div className="section-label" style={{ marginTop: "20px" }}>Genre Seeds</div>
                <div className="genres-row">
                  {audioTarget.genres.map((g) => (
                    <span key={g} className="genre-pill">{g}</span>
                  ))}
                  <span className="tag">+ {userProfile?.topArtistIds?.length || 0} of your top artists</span>
                </div>
              </div>

              <div className="actions-row">
                <button
                  className="btn btn-primary"
                  onClick={generatePlaylist}
                  disabled={loading}
                >
                  {loading ? "Generating…" : "Generate Playlist"}
                </button>
                {tracks.length > 0 && (
                  <button
                    className="btn btn-spotify"
                    onClick={saveToSpotify}
                    disabled={savingPlaylist}
                  >
                    {savingPlaylist ? "Saving…" : `Save to Spotify (${tracks.length} tracks)`}
                  </button>
                )}
              </div>

              {loading && (
                <div className="loading-state">
                  <div className="spinner" />
                  <span>Querying Spotify Recommendations API…</span>
                </div>
              )}

              {tracks.length > 0 && (
                <>
                  <hr className="divider" />
                  <div className="playlist-header">
                    <div className="playlist-title">{selectedStrain.name} — Playlist</div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <span className="tag">{tracks.length} tracks</span>
                      <span className="tag">{TERPENE_PARAMS[audioTarget.dominantTerpene]?.label} dominant</span>
                      <span className="tag">{selectedStrain.vibe}</span>
                    </div>
                  </div>
                  <div className="track-list">
                    {tracks.map((track, i) => (
                      <div key={track.id} className="track-row">
                        <span className="track-num">{i + 1}</span>
                        {track.album?.images?.[2] ? (
                          <img
                            className="track-img"
                            src={track.album.images[2].url}
                            alt={track.album.name}
                          />
                        ) : (
                          <div className="track-img" />
                        )}
                        <div className="track-info">
                          <div className="track-name">
                            <a href={track.external_urls?.spotify} target="_blank" rel="noreferrer">
                              {track.name}
                            </a>
                          </div>
                          <div className="track-artist">
                            {track.artists?.map((a) => a.name).join(", ")}
                          </div>
                        </div>
                        <div className="track-energy-bar">
                          <div
                            className="track-energy-fill"
                            style={{ width: `${(track.popularity || 50)}%` }}
                          />
                        </div>
                        <span className="track-duration">
                          {formatDuration(track.duration_ms)}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
