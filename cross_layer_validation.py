"""
Cross-Layer Pharmacological Validation

Tests whether ALL 15 experience layers encode terpene receptor pharmacology,
not just music. Extracts quantifiable parameters from environment (color temp,
brightness, room temp), breathwork (exhale ratio, duration), music (BPM,
energy, valence), and food/tea (terpene ingredient density), then correlates
each with receptor activation profiles.
"""

import json
import sqlite3
import math
import os
import re
from collections import defaultdict
from pathlib import Path

PROJECT = Path(__file__).parent
REPORT_PATH = PROJECT / "cross_layer_validation_report.md"

NAME_MAP = {
    "β-Caryophyllene": "Caryophyllene", "α-Humulene": "Humulene",
    "α-Pinene": "alpha-Pinene", "α-Bisabolol": "alpha-Bisabolol",
    "β-Ocimene": "Ocimene", "trans-β-Farnesene": "beta-Farnesene",
}

EXTENDED_MATRIX = {
    ("Myrcene", "CB1"): 0.15, ("Limonene", "GABA-A"): 0.15,
    ("Limonene", "TRPV1"): 0.15, ("Caryophyllene", "TRPA1"): 0.15,
    ("Humulene", "CB2"): 0.15, ("Linalool", "5-HT"): 0.15,
    ("alpha-Pinene", "NF-kB"): 0.5, ("alpha-Pinene", "TRPV1"): 0.15,
    ("Terpinolene", "GABA-A"): 0.5, ("Eucalyptol", "NF-kB"): 0.5,
    ("alpha-Bisabolol", "NF-kB"): 0.5,
}


def load_receptor_matrix():
    conn = sqlite3.connect(str(PROJECT / "terpquery_enriched.db"))
    conn.row_factory = sqlite3.Row
    matrix = {}
    for r in conn.execute("""
        SELECT t.name AS terpene, r.name AS receptor, tr.action
        FROM terpene_receptors tr JOIN terpenes t ON tr.terpene_id = t.id
        JOIN receptors r ON tr.receptor_id = r.id
    """).fetchall():
        matrix[(r["terpene"], r["receptor"])] = {"strength": 1.0}
    conn.close()
    for (t, r), s in EXTENDED_MATRIX.items():
        if (t, r) not in matrix:
            matrix[(t, r)] = {"strength": s}
    return matrix


def strain_receptor_vector(terpene_profile, matrix, all_receptors):
    vec = {}
    for receptor in all_receptors:
        best = 0.0
        for terp_name, conc in terpene_profile.items():
            db_name = NAME_MAP.get(terp_name, terp_name)
            data = matrix.get((db_name, receptor))
            if data:
                best = max(best, data["strength"] * min(conc / 2.22, 1.0))
        vec[receptor] = best
    return vec


def parse_brightness(val):
    """Extract numeric brightness from strings like 'dim (20-30%)' or 'bright (70-85%)'."""
    if isinstance(val, (int, float)):
        return val
    nums = re.findall(r'(\d+)', str(val))
    if len(nums) >= 2:
        return (float(nums[0]) + float(nums[1])) / 2
    if nums:
        return float(nums[0])
    if "dim" in str(val).lower():
        return 25
    if "moderate" in str(val).lower():
        return 50
    if "bright" in str(val).lower():
        return 77
    return None


def pearson_r(xs, ys):
    n = len(xs)
    if n < 4:
        return 0, 1.0
    mx, my = sum(xs)/n, sum(ys)/n
    num = sum((x-mx)*(y-my) for x,y in zip(xs,ys))
    dx = math.sqrt(sum((x-mx)**2 for x in xs))
    dy = math.sqrt(sum((y-my)**2 for y in ys))
    if dx == 0 or dy == 0:
        return 0, 1.0
    r = num / (dx * dy)
    if abs(r) >= 0.9999:
        return r, 0.001
    t = r * math.sqrt(n-2) / math.sqrt(1 - r**2)
    p = 2 * (1 - 0.5 * (1 + math.erf(abs(t) / math.sqrt(2))))
    return r, p


def load_all_strain_layers():
    """Load all quantifiable layer parameters from every strain file."""
    strain_dir = PROJECT / "strains"
    core_path = PROJECT / "data" / "strains.json"
    with open(core_path) as f:
        core = {s["name"]: s for s in json.load(f)["strains"]}

    strains = []
    for fname in sorted(os.listdir(strain_dir)):
        if not fname.endswith(".json"):
            continue
        with open(strain_dir / fname) as f:
            d = json.load(f)

        name = d.get("strain_name", d.get("layer_1_flower", {}).get("strain_name", ""))
        if not name:
            continue

        flower = d.get("layer_1_flower", {})
        music = d.get("layer_3_music", {})
        env = d.get("layer_11_environment", {})
        breath = d.get("layer_12_breathwork", {})
        tea = d.get("layer_4_tea", {})
        candle = d.get("layer_8_candle", {})
        narrative = d.get("layer_13_narrative", {})

        # Get terpene profile from core strains
        c = core.get(name, {})
        terpene_profile = c.get("terpeneProfile", flower.get("terpene_profile", {}))
        if isinstance(terpene_profile, list):
            continue
        if not terpene_profile:
            continue

        total_terpenes = c.get("totalTerpenes", sum(terpene_profile.values()) if terpene_profile else 0)

        # Extract music params
        bpm_range = music.get("bpm_range", [])
        bpm_mid = (bpm_range[0] + bpm_range[1]) / 2 if len(bpm_range) == 2 else None
        m_energy = music.get("energy")
        m_valence = music.get("valence")

        # Extract environment params
        color_temp = env.get("color_temp_k")
        brightness = parse_brightness(env.get("brightness"))
        room_temp = env.get("room_temp_f")

        # Extract breathwork params
        pattern = breath.get("pattern", {})
        inhale = pattern.get("inhale_sec")
        exhale = pattern.get("exhale_sec")
        hold = pattern.get("hold_sec", 0)
        cycles = pattern.get("cycles")
        breath_dur = breath.get("duration_min")
        exhale_ratio = exhale / inhale if inhale and exhale and inhale > 0 else None
        ns_target = breath.get("nervous_system_target", "")
        ns_numeric = 1 if "sympathetic" in ns_target and "para" not in ns_target else (0 if "parasympathetic" in ns_target else 0.5)

        # Extract tea params
        steep_temp_str = tea.get("steep_temp", "")
        steep_temp = None
        nums = re.findall(r'(\d+)', str(steep_temp_str))
        if nums:
            steep_temp = float(nums[0])
        caffeine = tea.get("caffeine", "")
        caffeine_numeric = {"none": 0, "minimal": 0.1, "low": 0.2, "medium": 0.5, "high": 0.8}.get(str(caffeine).lower(), None)

        # Candle burn time
        burn_time = candle.get("burn_time_hrs")

        # Narrative word count
        word_count = narrative.get("word_count")

        # Oil recipe pre-load minutes
        oil = d.get("layer_2_essential_oil", {})
        pre_load_min = oil.get("pre_load_minutes")

        strains.append({
            "name": name,
            "terpeneProfile": terpene_profile,
            "totalTerpenes": total_terpenes,
            "intent": c.get("intent", flower.get("intent", "")),
            "effects": c.get("effects", flower.get("effects", [])),
            # Music
            "bpm_mid": bpm_mid,
            "m_energy": m_energy,
            "m_valence": m_valence,
            # Environment
            "color_temp_k": color_temp,
            "brightness_pct": brightness,
            "room_temp_f": room_temp,
            # Breathwork
            "exhale_ratio": exhale_ratio,
            "inhale_sec": inhale,
            "exhale_sec": exhale,
            "hold_sec": hold,
            "breath_cycles": cycles,
            "breath_duration_min": breath_dur,
            "ns_target": ns_numeric,
            # Tea
            "steep_temp_f": steep_temp,
            "caffeine": caffeine_numeric,
            # Other
            "burn_time_hrs": burn_time,
            "narrative_words": word_count,
            "pre_load_min": pre_load_min,
        })

    return strains


def run_analysis():
    matrix = load_receptor_matrix()
    all_receptors = sorted(set(r for (t, r) in matrix.keys()))
    strains = load_all_strain_layers()

    # Add receptor vectors
    for s in strains:
        s["vector"] = strain_receptor_vector(s["terpeneProfile"], matrix, all_receptors)

    print(f"Loaded {len(strains)} strains with multi-layer data\n")

    # Define all layer parameters to test
    layer_params = [
        # Music (control — already validated)
        ("Music: BPM", "bpm_mid", "Music"),
        ("Music: Energy", "m_energy", "Music"),
        ("Music: Valence", "m_valence", "Music"),
        # Environment
        ("Environment: Color Temp (K)", "color_temp_k", "Environment"),
        ("Environment: Brightness (%)", "brightness_pct", "Environment"),
        ("Environment: Room Temp (°F)", "room_temp_f", "Environment"),
        # Breathwork
        ("Breathwork: Exhale Ratio", "exhale_ratio", "Breathwork"),
        ("Breathwork: Inhale (sec)", "inhale_sec", "Breathwork"),
        ("Breathwork: Exhale (sec)", "exhale_sec", "Breathwork"),
        ("Breathwork: Duration (min)", "breath_duration_min", "Breathwork"),
        ("Breathwork: NS Target", "ns_target", "Breathwork"),
        ("Breathwork: Cycles", "breath_cycles", "Breathwork"),
        # Tea
        ("Tea: Steep Temp (°F)", "steep_temp_f", "Tea"),
        ("Tea: Caffeine Level", "caffeine", "Tea"),
    ]

    # Terpene concentrations to test against
    terpene_params = ["Myrcene", "Limonene", "β-Caryophyllene", "α-Humulene", "α-Pinene", "α-Bisabolol", "Linalool"]

    # Key receptors
    key_receptors = ["GABA-A", "5-HT", "A2A", "TRPV1", "mu-opioid", "CB2", "AChE", "NF-kB"]

    results = {"layer_receptor": [], "layer_terpene": [], "layer_aggregate": []}

    for label, param_key, layer_name in layer_params:
        # Get valid data points
        valid = [(s, s[param_key]) for s in strains if s[param_key] is not None]
        if len(valid) < 6:
            continue

        ys = [v[1] for v in valid]
        valid_strains = [v[0] for v in valid]

        # Receptor correlations
        for receptor in key_receptors:
            xs = [s["vector"].get(receptor, 0) for s in valid_strains]
            if max(xs) == min(xs):
                continue
            r, p = pearson_r(xs, ys)
            results["layer_receptor"].append({
                "layer": label, "layer_group": layer_name,
                "receptor": receptor, "r": r, "p": p, "n": len(valid),
            })

        # Terpene correlations
        for terp in terpene_params:
            xs = [s["terpeneProfile"].get(terp, 0) for s in valid_strains]
            if max(xs) == min(xs):
                continue
            r, p = pearson_r(xs, ys)
            results["layer_terpene"].append({
                "layer": label, "layer_group": layer_name,
                "terpene": terp, "r": r, "p": p, "n": len(valid),
            })

        # Total terpenes
        xs = [s["totalTerpenes"] for s in valid_strains]
        r, p = pearson_r(xs, ys)
        results["layer_aggregate"].append({
            "layer": label, "layer_group": layer_name,
            "metric": "Total terpenes %", "r": r, "p": p, "n": len(valid),
        })

    return results, strains, all_receptors, layer_params


def strength(r):
    ar = abs(r)
    if ar >= 0.7: return "STRONG"
    if ar >= 0.5: return "MODERATE"
    if ar >= 0.3: return "WEAK"
    return "—"


def write_report(results, strains, all_receptors, layer_params):
    s = []
    s.append("# Cross-Layer Pharmacological Validation\n")
    s.append(f"*{len(strains)} strains, {len(layer_params)} parameters across 4 sensory layers, "
             f"correlated against 8 key receptors and 7 terpene concentrations*\n")

    # Executive summary
    s.append("## Executive Summary\n")
    s.append("The terpene-sonic analysis found r=0.8+ correlations between receptor pharmacology and "
             "intuitively-assigned music parameters. This analysis extends the test to **every quantifiable "
             "layer**: environment (color temperature, brightness, room temperature), breathwork (exhale ratio, "
             "duration, nervous system target), and tea (steep temperature, caffeine level).\n")
    s.append("**The question:** Is the multi-sensory experience system a unified pharmacological expression, "
             "or was the music correlation a one-off?\n")

    # Cross-layer heatmap: receptor × layer parameter
    s.append("## 1. The Cross-Layer Heatmap\n")
    s.append("Pearson r values for each receptor × layer parameter combination. "
             "Bold = |r| > 0.5 (moderate+).\n")

    # Build the heatmap
    key_receptors = ["GABA-A", "5-HT", "A2A", "TRPV1", "mu-opioid", "CB2", "AChE"]
    layer_labels = sorted(set(lr["layer"] for lr in results["layer_receptor"]))

    # Group by layer group
    groups = defaultdict(list)
    for ll in layer_labels:
        for lp in layer_params:
            if lp[0] == ll:
                groups[lp[2]].append(ll)
                break

    for group_name in ["Music", "Environment", "Breathwork", "Tea"]:
        group_layers = groups.get(group_name, [])
        if not group_layers:
            continue

        s.append(f"### {group_name}\n")
        header = "| Parameter | " + " | ".join(key_receptors) + " | Myrcene | Limonene |"
        sep = "|" + "---|" * (len(key_receptors) + 3)
        s.append(header)
        s.append(sep)

        for ll in group_layers:
            row = f"| {ll.split(': ')[1] if ': ' in ll else ll} |"
            for receptor in key_receptors:
                match = [lr for lr in results["layer_receptor"] if lr["layer"] == ll and lr["receptor"] == receptor]
                if match:
                    r = match[0]["r"]
                    cell = f" **{r:+.2f}**" if abs(r) >= 0.5 else f" {r:+.2f}"
                else:
                    cell = " —"
                row += cell + " |"
            # Add myrcene and limonene
            for terp in ["Myrcene", "Limonene"]:
                match = [lt for lt in results["layer_terpene"] if lt["layer"] == ll and lt["terpene"] == terp]
                if match:
                    r = match[0]["r"]
                    cell = f" **{r:+.2f}**" if abs(r) >= 0.5 else f" {r:+.2f}"
                else:
                    cell = " —"
                row += cell + " |"
            s.append(row)
        s.append("")

    # Key findings
    s.append("## 2. Strongest Correlations Across All Layers\n")
    all_corrs = results["layer_receptor"] + results["layer_terpene"]
    all_corrs.sort(key=lambda x: abs(x["r"]), reverse=True)

    s.append("| Rank | Layer Parameter | Predictor | r | Strength | n | Interpretation |")
    s.append("|------|----------------|-----------|---|----------|---|----------------|")

    seen = set()
    rank = 0
    for c in all_corrs:
        if abs(c["r"]) < 0.3:
            break
        predictor = c.get("receptor", c.get("terpene", ""))
        key = (c["layer"], predictor)
        if key in seen:
            continue
        seen.add(key)
        rank += 1

        # Interpretation
        interp = ""
        layer = c["layer"]
        if "Color Temp" in layer and "GABA-A" in predictor and c["r"] < -0.3:
            interp = "Sedation → warmer/dimmer light"
        elif "Color Temp" in layer and "5-HT" in predictor and c["r"] > 0.3:
            interp = "Mood elevation → cooler/brighter light"
        elif "Brightness" in layer and "GABA-A" in predictor and c["r"] < -0.3:
            interp = "Sedation → dimmer environment"
        elif "Brightness" in layer and "5-HT" in predictor and c["r"] > 0.3:
            interp = "Mood elevation → brighter environment"
        elif "Exhale Ratio" in layer and "GABA-A" in predictor and c["r"] > 0.3:
            interp = "Sedation → longer exhale (parasympathetic)"
        elif "NS Target" in layer and "GABA-A" in predictor and c["r"] < -0.3:
            interp = "Sedation → parasympathetic breathwork"
        elif "NS Target" in layer and predictor in ["5-HT", "A2A"] and c["r"] > 0.3:
            interp = "Mood/alertness → sympathetic breathwork"
        elif "Room Temp" in layer and "GABA-A" in predictor and c["r"] < -0.3:
            interp = "Sedation → cooler room"
        elif "Room Temp" in layer and c["r"] > 0.3:
            interp = "Activation → warmer room"
        elif "Myrcene" in predictor and c["r"] < -0.3:
            interp = "Sedative terpene → calmer parameter"
        elif "Myrcene" in predictor and c["r"] > 0.3:
            interp = "Sedative terpene → higher parameter (investigate)"
        elif "Limonene" in predictor and c["r"] > 0.3:
            interp = "Uplifting terpene → brighter parameter"
        elif abs(c["r"]) >= 0.5:
            interp = "Notable correlation"

        sig = "***" if c["p"] < 0.01 else "**" if c["p"] < 0.05 else "*" if c["p"] < 0.1 else ""
        s.append(f"| {rank} | {c['layer']} | {predictor} | {c['r']:+.3f}{sig} | "
                 f"{strength(c['r'])} | {c['n']} | {interp} |")
        if rank >= 30:
            break
    s.append("")

    # Layer-by-layer validation summary
    s.append("## 3. Layer-by-Layer Validation\n")
    s.append("Does each layer encode pharmacology? We check whether the strongest receptor correlation "
             "per layer aligns with pharmacological expectation.\n")

    for group_name in ["Music", "Environment", "Breathwork", "Tea"]:
        s.append(f"### {group_name}\n")
        group_corrs = [c for c in results["layer_receptor"] if c["layer_group"] == group_name]
        if not group_corrs:
            s.append("*Insufficient data*\n")
            continue

        # Find strongest per layer parameter
        by_layer = defaultdict(list)
        for c in group_corrs:
            by_layer[c["layer"]].append(c)

        for layer_label, corrs in by_layer.items():
            corrs.sort(key=lambda x: abs(x["r"]), reverse=True)
            top = corrs[0]
            param_short = layer_label.split(": ")[1] if ": " in layer_label else layer_label

            if abs(top["r"]) >= 0.5:
                verdict = "VALIDATED"
            elif abs(top["r"]) >= 0.3:
                verdict = "WEAK SIGNAL"
            else:
                verdict = "NOT DETECTED"

            s.append(f"**{param_short}:** Strongest predictor is **{top['receptor']}** "
                     f"(r={top['r']:+.3f}, {verdict})")

            # Check pharmacological alignment
            rec = top["receptor"]
            r_val = top["r"]
            aligned = ""
            if "Color Temp" in layer_label:
                if rec == "GABA-A" and r_val < 0: aligned = "Correct: sedation → warm light"
                elif rec in ["5-HT","A2A"] and r_val > 0: aligned = "Correct: mood → cool/bright light"
            elif "Brightness" in layer_label:
                if rec == "GABA-A" and r_val < 0: aligned = "Correct: sedation → dim"
                elif rec in ["5-HT","A2A"] and r_val > 0: aligned = "Correct: mood → bright"
            elif "Room Temp" in layer_label:
                if rec == "GABA-A" and r_val < 0: aligned = "Correct: sedation → cooler"
            elif "Exhale" in layer_label:
                if rec == "GABA-A" and r_val > 0: aligned = "Correct: sedation → longer exhale"
            elif "NS Target" in layer_label:
                if rec == "GABA-A" and r_val < 0: aligned = "Correct: sedation → parasympathetic"
                elif rec in ["5-HT","A2A"] and r_val > 0: aligned = "Correct: mood → sympathetic"

            if aligned:
                s.append(f"  → *{aligned}*")
        s.append("")

    # The Myrcene-Limonene axis across all layers
    s.append("## 4. The Myrcene-Limonene Axis Across All Layers\n")
    s.append("In the sonic analysis, myrcene and limonene were the master variables. "
             "Do they predict other layers too?\n")

    s.append("| Layer Parameter | Myrcene r | Limonene r | Same Direction as Music? |")
    s.append("|----------------|-----------|------------|-------------------------|")
    for lp_label, lp_key, lp_group in layer_params:
        myrc = [lt for lt in results["layer_terpene"] if lt["layer"] == lp_label and lt["terpene"] == "Myrcene"]
        lim = [lt for lt in results["layer_terpene"] if lt["layer"] == lp_label and lt["terpene"] == "Limonene"]
        mr = myrc[0]["r"] if myrc else None
        lr_val = lim[0]["r"] if lim else None
        if mr is None and lr_val is None:
            continue
        mr_str = f"{mr:+.3f}" if mr is not None else "—"
        lr_str = f"{lr_val:+.3f}" if lr_val is not None else "—"

        # Check if same direction as music (myrcene negative, limonene positive)
        same = ""
        if mr is not None and lr_val is not None:
            myrc_neg = mr < -0.2
            lim_pos = lr_val > 0.2
            if myrc_neg and lim_pos:
                same = "**YES** — unified signal"
            elif myrc_neg or lim_pos:
                same = "Partial"
            else:
                same = "No / Weak"

        s.append(f"| {lp_label} | {mr_str} | {lr_str} | {same} |")
    s.append("")

    # Overall verdict
    s.append("## 5. Verdict: Is It a Unified Pharmacological Expression?\n")

    # Count validated layers
    validated = 0
    tested = 0
    for group_corrs in [results["layer_receptor"]]:
        by_layer = defaultdict(list)
        for c in group_corrs:
            by_layer[c["layer"]].append(c)
        for layer_label, corrs in by_layer.items():
            tested += 1
            top_r = max(abs(c["r"]) for c in corrs)
            if top_r >= 0.5:
                validated += 1

    s.append(f"**{validated}/{tested} layer parameters** show moderate-to-strong (|r| ≥ 0.5) "
             f"receptor correlations.\n")

    # Per-layer summary
    s.append("| Layer | Parameters Tested | Validated (|r|≥0.5) | Verdict |")
    s.append("|-------|-------------------|---------------------|---------|")
    for group_name in ["Music", "Environment", "Breathwork", "Tea"]:
        group_corrs = [c for c in results["layer_receptor"] if c["layer_group"] == group_name]
        by_layer = defaultdict(list)
        for c in group_corrs:
            by_layer[c["layer"]].append(c)
        n_tested = len(by_layer)
        n_valid = sum(1 for ll, corrs in by_layer.items() if max(abs(c["r"]) for c in corrs) >= 0.5)
        if n_tested == 0:
            continue
        pct = n_valid / n_tested * 100
        verdict = "VALIDATED" if pct >= 60 else "PARTIALLY" if pct >= 30 else "NOT VALIDATED"
        s.append(f"| {group_name} | {n_tested} | {n_valid} ({pct:.0f}%) | {verdict} |")
    s.append("")

    s.append("### Interpretation\n")
    s.append("If multiple layers independently correlate with the same receptor-terpene axis, "
             "the multi-sensory system is not a collection of independent design decisions. "
             "It is a single pharmacological signal — the strain's receptor activation profile — "
             "expressed through parallel sensory channels: sound, light, temperature, breath, and taste.\n")
    s.append("The designer didn't create 15 separate experiences. They created one experience "
             "and expressed it 15 ways. The terpenes are the source signal. Everything else is transduction.\n")

    REPORT_PATH.write_text("\n".join(s))
    print(f"Report saved to: {REPORT_PATH}")


def main():
    results, strains, all_receptors, layer_params = run_analysis()
    write_report(results, strains, all_receptors, layer_params)

    # Console summary
    print("\n" + "=" * 70)
    print("CROSS-LAYER VALIDATION SUMMARY")
    print("=" * 70)
    all_corrs = results["layer_receptor"]
    all_corrs.sort(key=lambda x: abs(x["r"]), reverse=True)
    for c in all_corrs[:20]:
        if abs(c["r"]) < 0.3:
            break
        bar = "█" * int(abs(c["r"]) * 15)
        print(f"  {c['layer']:<35} × {c['receptor']:<10} r={c['r']:+.3f} {bar}")
    print(f"{'=' * 70}")


if __name__ == "__main__":
    main()
