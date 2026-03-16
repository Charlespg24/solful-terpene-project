"""
Receptor Twins & Terroir Signature Analysis

1. Clusters 23 Solful strains by receptor activation profile (not terpene profile)
2. Identifies "receptor twin" pairs — strains with different terpenes but similar pharmacology
3. Analyzes regional terroir signatures across Humboldt, Mendocino, Sonoma, Trinity
4. Farm-level consistency scoring
"""

import json
import sqlite3
import math
from collections import defaultdict
from pathlib import Path

PROJECT = Path(__file__).parent
DB_PATH = PROJECT / "terpquery_enriched.db"
REPORT_PATH = PROJECT / "receptor_twins_terroir_report.md"

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


def load_data():
    with open(PROJECT / "data" / "strains.json") as f:
        strains = json.load(f)["strains"]

    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    matrix = {}
    for r in conn.execute("""
        SELECT t.name AS terpene, r.name AS receptor, tr.action, tr.evidence_tier
        FROM terpene_receptors tr
        JOIN terpenes t ON tr.terpene_id = t.id
        JOIN receptors r ON tr.receptor_id = r.id
    """).fetchall():
        matrix[(r["terpene"], r["receptor"])] = {"strength": 1.0, "action": r["action"]}
    conn.close()

    for (t, r), s in EXTENDED_MATRIX.items():
        if (t, r) not in matrix:
            matrix[(t, r)] = {"strength": s, "action": "modulator"}

    all_receptors = sorted(set(r for (t, r) in matrix.keys()))
    return strains, matrix, all_receptors


def strain_receptor_vector(strain, matrix, all_receptors):
    profile = strain["terpeneProfile"]
    vec = {}
    for receptor in all_receptors:
        best = 0.0
        for terp_name, conc in profile.items():
            db_name = NAME_MAP.get(terp_name, terp_name)
            data = matrix.get((db_name, receptor))
            if data:
                activation = data["strength"] * min(conc / 2.22, 1.0)
                best = max(best, activation)
        vec[receptor] = best
    return vec


def cosine_sim(v1, v2, receptors):
    dot = sum(v1[r] * v2[r] for r in receptors)
    m1 = math.sqrt(sum(v1[r] ** 2 for r in receptors))
    m2 = math.sqrt(sum(v2[r] ** 2 for r in receptors))
    if m1 == 0 or m2 == 0:
        return 0.0
    return dot / (m1 * m2)


def avg_vector(vectors, receptors):
    avg = {r: 0.0 for r in receptors}
    for v in vectors:
        for r in receptors:
            avg[r] += v[r]
    for r in receptors:
        avg[r] /= len(vectors)
    return avg


def run_analysis():
    strains, matrix, all_receptors = load_data()

    # Build vectors
    strain_data = {}
    for s in strains:
        strain_data[s["name"]] = {
            "vector": strain_receptor_vector(s, matrix, all_receptors),
            "farm": s["farm"], "region": s["region"],
            "intent": s["intent"], "effects": s["effects"],
            "terpeneProfile": s["terpeneProfile"],
            "totalTerpenes": s["totalTerpenes"],
        }

    names = list(strain_data.keys())

    # Pairwise similarities
    pairs = []
    for i in range(len(names)):
        for j in range(i + 1, len(names)):
            sim = cosine_sim(strain_data[names[i]]["vector"],
                             strain_data[names[j]]["vector"], all_receptors)
            pairs.append((names[i], names[j], sim))
    pairs.sort(key=lambda x: x[2], reverse=True)

    # Cluster into families (threshold 0.92)
    THRESHOLD = 0.92
    clusters = []
    assigned = set()
    for a, b, sim in pairs:
        if sim < THRESHOLD:
            break
        found = False
        for cluster in clusters:
            if a in cluster or b in cluster:
                cluster.add(a)
                cluster.add(b)
                assigned.update([a, b])
                found = True
                break
        if not found:
            clusters.append({a, b})
            assigned.update([a, b])
    for name in names:
        if name not in assigned:
            clusters.append({name})
    clusters.sort(key=len, reverse=True)

    # Global average
    global_avg = avg_vector([strain_data[n]["vector"] for n in names], all_receptors)

    # Region analysis
    regions = defaultdict(list)
    farms = defaultdict(list)
    for s in strains:
        regions[s["region"]].append(s["name"])
        farms[s["farm"]].append(s["name"])

    region_profiles = {}
    for region, rstrains in regions.items():
        rvec = avg_vector([strain_data[n]["vector"] for n in rstrains], all_receptors)
        avg_terps = defaultdict(float)
        for n in rstrains:
            for t, c in strain_data[n]["terpeneProfile"].items():
                avg_terps[t] += c
        for t in avg_terps:
            avg_terps[t] /= len(rstrains)
        avg_total = sum(strain_data[n]["totalTerpenes"] for n in rstrains) / len(rstrains)

        distinctive = []
        for r in all_receptors:
            if rvec[r] > 0.01:
                diff = rvec[r] - global_avg[r]
                distinctive.append((r, rvec[r], diff))
        distinctive.sort(key=lambda x: x[2], reverse=True)

        region_profiles[region] = {
            "vector": rvec, "strains": rstrains,
            "avg_terps": dict(avg_terps), "avg_total": avg_total,
            "distinctive": distinctive,
            "farms": sorted(set(strain_data[n]["farm"] for n in rstrains)),
        }

    # Farm consistency
    farm_profiles = {}
    for farm, fstrains in farms.items():
        if len(fstrains) < 2:
            continue
        fpairs = []
        for i in range(len(fstrains)):
            for j in range(i + 1, len(fstrains)):
                fpairs.append(cosine_sim(strain_data[fstrains[i]]["vector"],
                                         strain_data[fstrains[j]]["vector"], all_receptors))
        avg_sim = sum(fpairs) / len(fpairs)
        farm_profiles[farm] = {
            "strains": fstrains, "internal_similarity": avg_sim,
            "region": strain_data[fstrains[0]]["region"],
        }

    # Cross-region similarity
    region_sims = {}
    rnames = sorted(regions.keys())
    for i in range(len(rnames)):
        for j in range(i + 1, len(rnames)):
            sim = cosine_sim(region_profiles[rnames[i]]["vector"],
                             region_profiles[rnames[j]]["vector"], all_receptors)
            region_sims[(rnames[i], rnames[j])] = sim

    return {
        "strain_data": strain_data, "pairs": pairs, "clusters": clusters,
        "region_profiles": region_profiles, "farm_profiles": farm_profiles,
        "region_sims": region_sims, "global_avg": global_avg,
        "all_receptors": all_receptors,
    }


def write_report(data):
    sd = data["strain_data"]
    pairs = data["pairs"]
    clusters = data["clusters"]
    rp = data["region_profiles"]
    fp = data["farm_profiles"]
    rs = data["region_sims"]
    ga = data["global_avg"]
    ar = data["all_receptors"]

    s = []
    s.append("# Receptor Twins & Terroir Signature Analysis\n")
    s.append("*23 Solful strains clustered by receptor activation profile, not terpene profile*\n")

    # ── Executive Summary ─────────────────────────────────────────────
    s.append("## Executive Summary\n")
    multi_clusters = [c for c in clusters if len(c) >= 2]
    s.append(f"**{len(multi_clusters)} receptor families** identified across 23 strains.\n")
    s.append("Two strains can be **receptor twins** — pharmacologically interchangeable — "
             "despite having completely different terpene profiles and aromas. This means "
             "a customer who loves one strain's *effects* but wants a different *flavor* "
             "can switch to its receptor twin.\n")

    # ── Receptor Twins ────────────────────────────────────────────────
    s.append("## 1. Receptor Twin Pairs\n")
    s.append("Strains ranked by receptor activation cosine similarity. "
             "Twins (>0.99) activate nearly identical receptor pathways.\n")

    s.append("### Top 10 Closest Twins\n")
    s.append("| Strain A | Strain B | Similarity | Different Terpenes? | Recommendation |")
    s.append("|----------|----------|------------|--------------------|--------------------|")
    for a, b, sim in pairs[:10]:
        # Check if terpene profiles differ
        ta = set(sd[a]["terpeneProfile"].keys())
        tb = set(sd[b]["terpeneProfile"].keys())
        diff = ta.symmetric_difference(tb)
        diff_str = "Yes" if diff else "No"
        if sim > 0.995:
            rec = "Near-perfect twins — swap freely"
        elif sim > 0.99:
            rec = "Excellent twins — minimal difference"
        else:
            rec = "Strong twins — similar receptor activation"
        s.append(f"| {a} | {b} | {sim:.3f} | {diff_str} ({len(diff)} unique) | {rec} |")

    s.append("\n### Most Different Pairs (Receptor Opposites)\n")
    s.append("These strains activate the most different receptor pathways — "
             "use them for **maximum variety** in a session.\n")
    s.append("| Strain A | Strain B | Similarity | Why Different |")
    s.append("|----------|----------|------------|---------------|")
    for a, b, sim in pairs[-5:]:
        va = sd[a]["vector"]
        vb = sd[b]["vector"]
        a_strong = [r for r in ar if va[r] > 0.3 and vb[r] < 0.1]
        b_strong = [r for r in ar if vb[r] > 0.3 and va[r] < 0.1]
        why = f"{a} has {', '.join(a_strong[:2])}; {b} has {', '.join(b_strong[:2])}"
        s.append(f"| {a} | {b} | {sim:.3f} | {why} |")

    # ── Receptor Families ─────────────────────────────────────────────
    s.append("\n## 2. Receptor Families\n")
    s.append("Strains grouped by shared receptor activation patterns (similarity >0.92).\n")

    family_num = 0
    for cluster in clusters:
        if len(cluster) < 2:
            continue
        family_num += 1
        members = sorted(cluster)

        # Characterize the family
        family_vecs = [sd[m]["vector"] for m in members]
        family_avg = avg_vector(family_vecs, ar)
        dominant_receptors = sorted([(r, family_avg[r]) for r in ar if family_avg[r] > 0.15],
                                     key=lambda x: -x[1])

        # Find common terpenes
        all_terps = defaultdict(int)
        for m in members:
            for t in sd[m]["terpeneProfile"]:
                all_terps[t] += 1
        universal_terps = [t for t, c in all_terps.items() if c == len(members)]

        # Name the family by its dominant receptor pattern
        if dominant_receptors:
            top_rec = dominant_receptors[0][0]
        else:
            top_rec = "Mixed"

        s.append(f"### Family {family_num}: The {top_rec} Cluster ({len(members)} strains)\n")
        s.append(f"**Shared terpenes:** {', '.join(universal_terps)}")
        s.append(f"**Dominant receptors:** {', '.join(f'{r} ({v:.2f})' for r, v in dominant_receptors[:4])}\n")

        s.append("| Strain | Farm | Region | Top Terpenes | Intent |")
        s.append("|--------|------|--------|--------------|--------|")
        for m in members:
            top = sorted(sd[m]["terpeneProfile"].items(), key=lambda x: -x[1])[:3]
            terp_str = ", ".join(f"{t}:{c:.2f}%" for t, c in top)
            s.append(f"| {m} | {sd[m]['farm']} | {sd[m]['region']} | {terp_str} | {sd[m]['intent'][:50]} |")

        s.append(f"\n**What this means:** These {len(members)} strains will produce similar "
                 f"*pharmacological effects* despite different flavors and aromas. A customer "
                 f"who enjoys {members[0]}'s effects can switch to {members[1]} for variety "
                 f"without changing their receptor experience.\n")

    # Singletons
    singletons = [list(c)[0] for c in clusters if len(c) == 1]
    if singletons:
        s.append("### Unique Strains (No Receptor Twins)\n")
        s.append("These strains have distinctive receptor profiles not closely matched by any other strain.\n")
        for name in singletons:
            top_recs = sorted([(r, sd[name]["vector"][r]) for r in ar if sd[name]["vector"][r] > 0.15],
                              key=lambda x: -x[1])[:3]
            rec_str = ", ".join(f"{r}:{v:.2f}" for r, v in top_recs)
            s.append(f"- **{name}** ({sd[name]['farm']}) — {rec_str}")
        s.append("")

    # ── Terroir Signature ─────────────────────────────────────────────
    s.append("## 3. Terroir Signature\n")
    s.append("Does geography predict pharmacology? Regional receptor fingerprints "
             "across Humboldt, Mendocino, Sonoma, and Trinity.\n")

    for region in sorted(rp.keys()):
        rdata = rp[region]
        s.append(f"### {region} ({len(rdata['strains'])} strains)\n")
        s.append(f"**Farms:** {', '.join(rdata['farms'])}")
        top_terps = sorted(rdata["avg_terps"].items(), key=lambda x: -x[1])[:4]
        s.append(f"**Avg terpene profile:** {', '.join(f'{t}: {c:.2f}%' for t, c in top_terps)}")
        s.append(f"**Avg total terpenes:** {rdata['avg_total']:.2f}%\n")

        s.append("**Receptor Signature (vs global average):**\n")
        s.append("| Receptor | Activation | vs Avg | Direction |")
        s.append("|----------|-----------|--------|-----------|")
        for r, val, diff in rdata["distinctive"][:8]:
            if val < 0.01:
                continue
            direction = "**ABOVE**" if diff > 0.02 else "**BELOW**" if diff < -0.02 else "Average"
            s.append(f"| {r} | {val:.3f} | {diff:+.3f} | {direction} |")

        # Narrative
        above = [(r, v, d) for r, v, d in rdata["distinctive"] if d > 0.02]
        below = [(r, v, d) for r, v, d in rdata["distinctive"] if d < -0.02 and v > 0.01]
        if above:
            s.append(f"\n**{region} signature:** Elevated {', '.join(r for r,_,_ in above[:3])}")
        if below:
            s.append(f"**Relatively low:** {', '.join(r for r,_,_ in below[:3])}")
        s.append("")

    # Cross-region
    s.append("### Cross-Region Similarity\n")
    s.append("How pharmacologically similar are the regions?\n")
    s.append("| Region A | Region B | Similarity | Interpretation |")
    s.append("|----------|----------|------------|----------------|")
    for (ra, rb), sim in sorted(rs.items(), key=lambda x: -x[1]):
        if sim > 0.95:
            interp = "Nearly identical receptor profiles"
        elif sim > 0.90:
            interp = "Very similar — minor receptor differences"
        elif sim > 0.80:
            interp = "Moderately similar — some distinct pathways"
        else:
            interp = "**Distinct pharmacological fingerprints**"
        s.append(f"| {ra} | {rb} | {sim:.3f} | {interp} |")
    s.append("")

    # ── Farm Signatures ───────────────────────────────────────────────
    s.append("## 4. Farm Signatures\n")
    s.append("Do individual farms produce consistent receptor profiles, "
             "or do they explore diverse pharmacological spaces?\n")

    s.append("| Farm | Region | Strains | Consistency | Interpretation |")
    s.append("|------|--------|---------|-------------|----------------|")
    for farm in sorted(fp.keys()):
        fdata = fp[farm]
        sim = fdata["internal_similarity"]
        if sim > 0.95:
            interp = "**Very consistent** — signature house style"
        elif sim > 0.90:
            interp = "Consistent — recognizable house profile"
        elif sim > 0.80:
            interp = "Moderate range — some exploration"
        else:
            interp = "**Diverse explorer** — wide pharmacological range"
        s.append(f"| {farm} | {fdata['region']} | {len(fdata['strains'])} | {sim:.3f} | {interp} |")

    s.append("\n### Farm Deep Dives\n")
    for farm in sorted(fp.keys()):
        fdata = fp[farm]
        s.append(f"#### {farm} ({fdata['region']})\n")
        s.append(f"**Internal consistency:** {fdata['internal_similarity']:.3f}\n")
        for sname in fdata["strains"]:
            top = sorted(sd[sname]["terpeneProfile"].items(), key=lambda x: -x[1])[:3]
            terp_str = ", ".join(f"{t}:{c:.2f}%" for t, c in top)
            s.append(f"- **{sname}**: {terp_str}")
            s.append(f"  *\"{sd[sname]['intent']}\"*")
        s.append("")

    # ── Key Insights ──────────────────────────────────────────────────
    s.append("## 5. Key Insights\n")
    s.append("### For Customers\n")
    s.append("- \"I love the effects of X but want a different flavor\" → check its receptor twin\n"
             "- Receptor twins share pharmacological outcomes even when terpene profiles differ\n"
             "- For maximum variety in a session, pair receptor **opposites** (e.g., Carambola + Black Lime Chem)\n")
    s.append("### For Curation\n")
    s.append("- **Humboldt** leans toward GABA-A/TRPV1 (sedation, pain) — body-forward\n"
             "- **Sonoma** leans toward CB2/NF-kB/PPARgamma (anti-inflammatory) — cannabinoid-forward\n"
             "- **Mendocino** is the most balanced — closest to the global average\n"
             "- **Trinity** (Glitter Bomb) is the outlier — extreme GABA-A/TRPV1 from high myrcene\n")
    s.append("### For Menu Design\n")
    s.append("- Ensure each receptor family has at least one representative on the menu\n"
             "- Highlight receptor opposites as \"adventure pairings\"\n"
             "- Use terroir signatures in marketing: \"Humboldt Body\" vs \"Sonoma Anti-Inflammatory\"\n")

    REPORT_PATH.write_text("\n".join(s))
    print(f"Report saved to: {REPORT_PATH}")


def main():
    data = run_analysis()
    write_report(data)

    print("\n=== QUICK SUMMARY ===")
    multi = [c for c in data["clusters"] if len(c) >= 2]
    print(f"  Receptor families: {len(multi)}")
    print(f"  Closest twins: {data['pairs'][0][0]} ↔ {data['pairs'][0][1]} ({data['pairs'][0][2]:.3f})")
    print(f"  Most different: {data['pairs'][-1][0]} ↔ {data['pairs'][-1][1]} ({data['pairs'][-1][2]:.3f})")
    for (ra, rb), sim in sorted(data["region_sims"].items(), key=lambda x: -x[1]):
        print(f"  {ra} ↔ {rb}: {sim:.3f}")


if __name__ == "__main__":
    main()
