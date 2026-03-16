"""
Terpene-Sonic Correlation Analysis

Correlates receptor activation profiles and terpene concentrations with
per-strain music parameters (BPM, energy, valence) from the 43 detailed
strain JSON files.
"""

import json
import sqlite3
import math
import os
from collections import defaultdict
from pathlib import Path

PROJECT = Path(__file__).parent
REPORT_PATH = PROJECT / "terpene_sonic_correlation_report.md"

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
        FROM terpene_receptors tr
        JOIN terpenes t ON tr.terpene_id = t.id
        JOIN receptors r ON tr.receptor_id = r.id
    """).fetchall():
        matrix[(r["terpene"], r["receptor"])] = {"strength": 1.0, "action": r["action"]}
    conn.close()
    for (t, r), s in EXTENDED_MATRIX.items():
        if (t, r) not in matrix:
            matrix[(t, r)] = {"strength": s, "action": "modulator"}
    return matrix


def load_strain_data():
    """Load all strain data from individual JSON files with music parameters."""
    strain_dir = PROJECT / "strains"
    strains_json = PROJECT / "data" / "strains.json"

    # Load the 23 core strains for terpene profiles
    with open(strains_json) as f:
        core_strains = {s["name"]: s for s in json.load(f)["strains"]}

    # Load all detailed strain files for music data
    results = []
    for fname in os.listdir(strain_dir):
        if not fname.endswith(".json"):
            continue
        with open(strain_dir / fname) as f:
            d = json.load(f)

        name = d.get("strain_name", d.get("name", ""))
        music = d.get("layer_3_music", {})
        flower = d.get("layer_1_flower", {})

        bpm_range = music.get("bpm_range", [])
        energy = music.get("energy")
        valence = music.get("valence")

        if not bpm_range or energy is None:
            continue

        bpm_mid = (bpm_range[0] + bpm_range[1]) / 2 if len(bpm_range) == 2 else None
        if bpm_mid is None:
            continue

        # Get terpene profile from core strains
        core = core_strains.get(name)
        if core:
            terpene_profile = core["terpeneProfile"]
            total_terpenes = core["totalTerpenes"]
            intent = core["intent"]
            effects = core["effects"]
            farm = core["farm"]
            region = core["region"]
        else:
            # Use flower layer data for non-core strains
            tp = flower.get("terpene_profile", {})
            terpene_profile = tp if isinstance(tp, dict) else {}
            total_terpenes = flower.get("total_terpenes", sum(terpene_profile.values()) if terpene_profile else 0)
            intent = flower.get("intent", "")
            effects = flower.get("effects", [])
            farm = flower.get("farm", "")
            region = flower.get("region", "")

        if not terpene_profile:
            continue

        results.append({
            "name": name, "farm": farm, "region": region,
            "intent": intent, "effects": effects,
            "bpm_low": bpm_range[0], "bpm_high": bpm_range[1], "bpm_mid": bpm_mid,
            "energy": energy, "valence": valence if valence else energy,
            "terpeneProfile": terpene_profile,
            "totalTerpenes": total_terpenes,
            "iso_principle": music.get("iso_principle", []),
            "genres": music.get("genres", []),
        })

    return results


def strain_receptor_vector(terpene_profile, matrix, all_receptors):
    vec = {}
    for receptor in all_receptors:
        best = 0.0
        for terp_name, conc in terpene_profile.items():
            db_name = NAME_MAP.get(terp_name, terp_name)
            data = matrix.get((db_name, receptor))
            if data:
                activation = data["strength"] * min(conc / 2.22, 1.0)
                best = max(best, activation)
        vec[receptor] = best
    return vec


def pearson_r(xs, ys):
    n = len(xs)
    if n < 4:
        return 0, 1.0
    mean_x = sum(xs) / n
    mean_y = sum(ys) / n
    num = sum((x - mean_x) * (y - mean_y) for x, y in zip(xs, ys))
    den_x = math.sqrt(sum((x - mean_x) ** 2 for x in xs))
    den_y = math.sqrt(sum((y - mean_y) ** 2 for y in ys))
    if den_x == 0 or den_y == 0:
        return 0, 1.0
    r = num / (den_x * den_y)
    if abs(r) >= 0.9999:
        return r, 0.001
    t_stat = r * math.sqrt(n - 2) / math.sqrt(1 - r ** 2)
    # Two-tailed p-value approximation
    p = 2 * (1 - 0.5 * (1 + math.erf(abs(t_stat) / math.sqrt(2))))
    return r, p


def strength_label(r):
    ar = abs(r)
    if ar >= 0.7: return "STRONG"
    if ar >= 0.5: return "MODERATE"
    if ar >= 0.3: return "WEAK"
    return "NEGLIGIBLE"


def run_analysis():
    matrix = load_receptor_matrix()
    all_receptors = sorted(set(r for (t, r) in matrix.keys()))
    strains = load_strain_data()

    # Add receptor vectors
    for s in strains:
        s["vector"] = strain_receptor_vector(s["terpeneProfile"], matrix, all_receptors)

    print(f"Loaded {len(strains)} strains with music + terpene + receptor data\n")

    # ── Receptor → Music correlations ─────────────────────────────────
    results = {"receptor_corrs": {}, "terpene_corrs": {}, "aggregate_corrs": {}, "strains": strains}

    for param in ["bpm_mid", "energy", "valence"]:
        ys = [s[param] for s in strains]
        receptor_results = []
        for receptor in all_receptors:
            xs = [s["vector"][receptor] for s in strains]
            if max(xs) == min(xs):
                continue
            r, p = pearson_r(xs, ys)
            receptor_results.append({"receptor": receptor, "r": r, "p": p, "strength": strength_label(r)})
        receptor_results.sort(key=lambda x: abs(x["r"]), reverse=True)
        results["receptor_corrs"][param] = receptor_results

    # ── Terpene concentration → Music correlations ────────────────────
    all_terps = set()
    for s in strains:
        all_terps.update(s["terpeneProfile"].keys())

    for param in ["bpm_mid", "energy", "valence"]:
        ys = [s[param] for s in strains]
        terp_results = []
        for terp in sorted(all_terps):
            xs = [s["terpeneProfile"].get(terp, 0) for s in strains]
            if max(xs) == min(xs):
                continue
            r, p = pearson_r(xs, ys)
            terp_results.append({"terpene": terp, "r": r, "p": p, "strength": strength_label(r)})
        terp_results.sort(key=lambda x: abs(x["r"]), reverse=True)
        results["terpene_corrs"][param] = terp_results

    # ── Aggregate metrics ─────────────────────────────────────────────
    for param in ["bpm_mid", "energy", "valence"]:
        ys = [s[param] for s in strains]
        agg = {}
        # Total terpenes
        xs = [s["totalTerpenes"] for s in strains]
        r, p = pearson_r(xs, ys)
        agg["total_terpenes"] = {"r": r, "p": p}
        # Receptor count (strong activations)
        xs = [sum(1 for rec in all_receptors if s["vector"][rec] > 0.3) for s in strains]
        r, p = pearson_r(xs, ys)
        agg["receptor_count"] = {"r": r, "p": p}
        # Terpene count
        xs = [len(s["terpeneProfile"]) for s in strains]
        r, p = pearson_r(xs, ys)
        agg["terpene_count"] = {"r": r, "p": p}
        results["aggregate_corrs"][param] = agg

    return results, all_receptors


def write_report(results, all_receptors):
    strains = results["strains"]
    s = []

    s.append("# Terpene-Sonic Correlation Analysis\n")
    s.append(f"*{len(strains)} strains with per-strain BPM, energy, and valence mapped to receptor activation profiles*\n")

    # Executive summary
    s.append("## Executive Summary\n")
    s.append("This analysis asks: **does the pharmacology predict the music?** When the music layer "
             "was designed for each strain, BPM, energy, and valence were assigned intuitively based "
             "on the strain's effects and intent. We now test whether those assignments correlate with "
             "the receptor activation profiles derived from terpene pharmacology.\n")
    s.append("If GABA-A activation (sedative) predicts lower BPM, and 5-HT activation (mood) predicts "
             "higher valence, then the music layer was pharmacologically intuitive even before the "
             "receptor data existed. If correlations are weak or inverted, the music layer may benefit "
             "from pharmacology-informed adjustments.\n")

    # Data overview
    s.append("## 1. Dataset\n")
    s.append(f"**{len(strains)} strains** with complete music + terpene + receptor data.\n")
    s.append("| Parameter | Range | Mean | SD |")
    s.append("|-----------|-------|------|----|")
    for param, label in [("bpm_mid", "BPM (midpoint)"), ("energy", "Energy"), ("valence", "Valence")]:
        vals = [st[param] for st in strains]
        mean = sum(vals) / len(vals)
        sd = math.sqrt(sum((v - mean) ** 2 for v in vals) / len(vals))
        s.append(f"| {label} | {min(vals):.1f} – {max(vals):.1f} | {mean:.2f} | {sd:.2f} |")
    s.append("")

    # Strain data table
    s.append("### Per-Strain Music Parameters\n")
    s.append("| Strain | BPM Range | Energy | Valence | Top Terpene | GABA-A | 5-HT | CB2 |")
    s.append("|--------|-----------|--------|---------|-------------|--------|------|-----|")
    for st in sorted(strains, key=lambda x: x["energy"]):
        top_terp = max(st["terpeneProfile"].items(), key=lambda x: x[1])
        gaba = st["vector"].get("GABA-A", 0)
        sht = st["vector"].get("5-HT", 0)
        cb2 = st["vector"].get("CB2", 0)
        s.append(f"| {st['name']} | {st['bpm_low']}-{st['bpm_high']} | {st['energy']:.2f} | "
                 f"{st['valence']:.2f} | {top_terp[0]} ({top_terp[1]:.2f}%) | "
                 f"{gaba:.2f} | {sht:.2f} | {cb2:.2f} |")
    s.append("")

    # Receptor → Music correlations
    s.append("## 2. Receptor → Music Correlations\n")
    s.append("Pearson r correlation between receptor activation strength and music parameters. "
             "Significant correlations (|r| > 0.3) suggest the music layer implicitly encodes pharmacology.\n")

    for param, label in [("bpm_mid", "BPM"), ("energy", "Energy"), ("valence", "Valence")]:
        s.append(f"### {label}\n")
        s.append("| Receptor | r | Strength | Direction | Interpretation |")
        s.append("|----------|---|----------|-----------|----------------|")
        for rc in results["receptor_corrs"][param]:
            if abs(rc["r"]) < 0.01:
                continue
            direction = "Higher activation → higher " + label.lower() if rc["r"] > 0 else "Higher activation → lower " + label.lower()
            # Pharmacological interpretation
            interp = ""
            rec = rc["receptor"]
            if rec == "GABA-A" and rc["r"] < -0.2:
                interp = "VALIDATES: sedative receptor predicts calmer music"
            elif rec == "GABA-A" and rc["r"] > 0.2:
                interp = "MISMATCH: sedative receptor predicts faster music"
            elif rec in ["5-HT", "A2A"] and rc["r"] > 0.2:
                interp = "VALIDATES: mood receptor predicts brighter music"
            elif rec in ["5-HT", "A2A"] and rc["r"] < -0.2:
                interp = "MISMATCH: mood receptor predicts darker music"
            elif rec == "AChE" and label == "Energy" and rc["r"] > 0.2:
                interp = "VALIDATES: cognitive receptor predicts higher energy"
            elif rec == "mu-opioid" and rc["r"] < -0.2:
                interp = "VALIDATES: pain receptor predicts calmer music"
            elif rec == "CB2" and label == "BPM" and rc["r"] < -0.2:
                interp = "Interesting: anti-inflammatory predicts slower tempo"
            elif abs(rc["r"]) >= 0.3:
                interp = "Notable correlation — warrants investigation"

            sig = "***" if rc["p"] < 0.01 else "**" if rc["p"] < 0.05 else "*" if rc["p"] < 0.1 else ""
            bar = "█" * max(1, int(abs(rc["r"]) * 15))
            s.append(f"| {rec} | {rc['r']:+.3f}{sig} | {rc['strength']} {bar} | {direction} | {interp} |")
        s.append("")

    # Terpene → Music correlations
    s.append("## 3. Terpene Concentration → Music Correlations\n")
    s.append("Direct correlation between terpene % and music parameters — the raw chemistry-to-sound relationship.\n")

    for param, label in [("bpm_mid", "BPM"), ("energy", "Energy"), ("valence", "Valence")]:
        s.append(f"### {label}\n")
        s.append("| Terpene | r | Strength | Interpretation |")
        s.append("|---------|---|----------|----------------|")
        for tc in results["terpene_corrs"][param]:
            if abs(tc["r"]) < 0.01:
                continue
            interp = ""
            terp = tc["terpene"]
            if "Myrcene" in terp and tc["r"] < -0.2:
                interp = "VALIDATES: sedative terpene → calmer music"
            elif "Myrcene" in terp and tc["r"] > 0.2:
                interp = "PARADOX: sedative terpene → more energetic music"
            elif "Limonene" in terp and tc["r"] > 0.2:
                interp = "VALIDATES: uplifting terpene → brighter music"
            elif "Caryophyllene" in terp:
                interp = "Ubiquitous terpene — correlation reflects overall profile"
            elif "Pinene" in terp and label == "Energy" and tc["r"] > 0.2:
                interp = "VALIDATES: alertness terpene → higher energy"
            elif abs(tc["r"]) >= 0.3:
                interp = "Notable correlation"

            sig = "***" if tc["p"] < 0.01 else "**" if tc["p"] < 0.05 else "*" if tc["p"] < 0.1 else ""
            bar = "█" * max(1, int(abs(tc["r"]) * 15))
            s.append(f"| {terp} | {tc['r']:+.3f}{sig} | {tc['strength']} {bar} | {interp} |")
        s.append("")

    # Aggregate
    s.append("## 4. Aggregate Metrics\n")
    s.append("| Metric | → BPM | → Energy | → Valence |")
    s.append("|--------|-------|----------|-----------|")
    for metric_key, label in [("total_terpenes", "Total terpene %"), ("receptor_count", "Active receptor count"), ("terpene_count", "Terpene diversity")]:
        bpm_r = results["aggregate_corrs"]["bpm_mid"][metric_key]["r"]
        eng_r = results["aggregate_corrs"]["energy"][metric_key]["r"]
        val_r = results["aggregate_corrs"]["valence"][metric_key]["r"]
        s.append(f"| {label} | {bpm_r:+.3f} | {eng_r:+.3f} | {val_r:+.3f} |")
    s.append("")

    # Key findings
    s.append("## 5. Key Findings\n")

    # Collect all significant correlations
    all_notable = []
    for param in ["bpm_mid", "energy", "valence"]:
        for rc in results["receptor_corrs"][param]:
            if abs(rc["r"]) >= 0.25:
                all_notable.append(("receptor", rc["receptor"], param, rc["r"], rc["p"]))
        for tc in results["terpene_corrs"][param]:
            if abs(tc["r"]) >= 0.25:
                all_notable.append(("terpene", tc["terpene"], param, tc["r"], tc["p"]))

    all_notable.sort(key=lambda x: abs(x[3]), reverse=True)

    if all_notable:
        s.append("### Strongest Correlations\n")
        for kind, name, param, r, p in all_notable[:15]:
            plabel = {"bpm_mid": "BPM", "energy": "energy", "valence": "valence"}[param]
            direction = "positively" if r > 0 else "negatively"
            s.append(f"- **{name}** ({kind}) {direction} correlates with **{plabel}** (r={r:+.3f})")
        s.append("")

    # Pharmacological validation check
    s.append("### Pharmacological Validation\n")
    s.append("Does the music layer encode pharmacology? We check whether receptor-music correlations "
             "align with pharmacological expectations:\n")

    validations = []
    mismatches = []
    for param in ["bpm_mid", "energy", "valence"]:
        for rc in results["receptor_corrs"][param]:
            rec, r = rc["receptor"], rc["r"]
            if rec == "GABA-A":
                if param in ["bpm_mid", "energy"] and r < -0.2:
                    validations.append(f"GABA-A (sedative) → lower {param.replace('_mid','')} (r={r:+.3f})")
                elif param in ["bpm_mid", "energy"] and r > 0.2:
                    mismatches.append(f"GABA-A (sedative) → HIGHER {param.replace('_mid','')} (r={r:+.3f})")
            if rec in ["5-HT", "A2A"]:
                if param == "valence" and r > 0.2:
                    validations.append(f"{rec} (mood) → higher valence (r={r:+.3f})")
                elif param == "valence" and r < -0.2:
                    mismatches.append(f"{rec} (mood) → LOWER valence (r={r:+.3f})")
            if rec == "mu-opioid":
                if param in ["bpm_mid", "energy"] and r < -0.2:
                    validations.append(f"mu-opioid (pain/sedation) → lower {param.replace('_mid','')} (r={r:+.3f})")
            if rec == "AChE":
                if param == "energy" and r > 0.2:
                    validations.append(f"AChE (cognitive) → higher energy (r={r:+.3f})")

    if validations:
        s.append("**Validated (music aligns with pharmacology):**")
        for v in validations:
            s.append(f"- {v}")
    else:
        s.append("**No strong pharmacological validations found** — correlations may be too weak or the "
                 "dataset too small to detect.")

    if mismatches:
        s.append("\n**Mismatches (music contradicts pharmacology):**")
        for m in mismatches:
            s.append(f"- {m}")
    else:
        s.append("\n**No strong mismatches detected.**")

    s.append("")

    # Recommendations
    s.append("## 6. Recommendations\n")

    s.append("### For Music Layer Refinement\n")
    for param in ["bpm_mid", "energy", "valence"]:
        top = results["receptor_corrs"][param][0] if results["receptor_corrs"][param] else None
        if top and abs(top["r"]) >= 0.3:
            plabel = {"bpm_mid": "BPM", "energy": "energy", "valence": "valence"}[param]
            s.append(f"- **{top['receptor']}** is the strongest predictor of {plabel} (r={top['r']:+.3f}). "
                     f"Consider explicitly using {top['receptor']} activation level when calibrating {plabel} for new strains.")

    s.append("\n### For Strain-Music Recalibration\n")
    # Find outliers: strains where predicted music differs from assigned
    for st in strains:
        gaba = st["vector"].get("GABA-A", 0)
        if gaba > 0.4 and st["energy"] > 0.5:
            s.append(f"- **{st['name']}**: High GABA-A ({gaba:.2f}) but high energy ({st['energy']:.2f}). "
                     f"Consider whether the energetic music assignment captures the pharmacological sedation.")
        sht = st["vector"].get("5-HT", 0)
        if sht > 0.15 and st["valence"] < 0.35:
            s.append(f"- **{st['name']}**: Has 5-HT activation ({sht:.2f}) but low valence ({st['valence']:.2f}). "
                     f"Pharmacology suggests brighter mood — music could be warmer.")

    s.append("")

    REPORT_PATH.write_text("\n".join(s))
    print(f"Report saved to: {REPORT_PATH}")


def main():
    results, all_receptors = run_analysis()
    write_report(results, all_receptors)

    # Console summary
    print("\n" + "=" * 70)
    print("TOP CORRELATIONS")
    print("=" * 70)
    for param, label in [("bpm_mid", "BPM"), ("energy", "Energy"), ("valence", "Valence")]:
        print(f"\n  {label}:")
        for rc in results["receptor_corrs"][param][:3]:
            if abs(rc["r"]) >= 0.01:
                print(f"    {rc['receptor']:<15} r={rc['r']:+.3f} ({rc['strength']})")
        for tc in results["terpene_corrs"][param][:3]:
            if abs(tc["r"]) >= 0.01:
                print(f"    {tc['terpene']:<25} r={tc['r']:+.3f} ({tc['strength']})")
    print(f"\n{'=' * 70}")


if __name__ == "__main__":
    main()
