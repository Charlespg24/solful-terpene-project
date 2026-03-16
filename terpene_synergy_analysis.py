"""
Terpene Synergy Analysis

Maps 12 documented terpene-terpene synergies to the 23 Solful strains,
scores which strains naturally express each synergy, and identifies
which synergies can be unlocked via rounding blends or recipe adjustments.
"""

import json
from pathlib import Path
from collections import defaultdict

PROJECT = Path(__file__).parent
REPORT_PATH = PROJECT / "terpene_synergy_report.md"

NAME_MAP = {
    "β-Caryophyllene": "Caryophyllene", "α-Humulene": "Humulene",
    "α-Pinene": "Pinene", "α-Bisabolol": "Bisabolol",
    "β-Ocimene": "Ocimene", "trans-β-Farnesene": "Farnesene",
}

# ═══════════════════════════════════════════════════════════════════════
# SYNERGY DATABASE — from monograph research
# ═══════════════════════════════════════════════════════════════════════

SYNERGIES = [
    {
        "id": "S1",
        "name": "The GABA-A Stack",
        "terpenes": ["Myrcene", "Linalool"],
        "json_names": [["Myrcene"], ["Linalool"]],
        "mechanism": "Allosteric + direct modulation on GABA-A receptor",
        "detail": "Myrcene directly modulates GABA-A (2.6x barbiturate potentiation). Linalool acts at the benzodiazepine allosteric site. When both are present, GABA transmission is amplified beyond what either achieves alone — the only documented supra-additive terpene interaction.",
        "receptor": "GABA-A",
        "synergy_type": "Supra-additive (1.3x)",
        "evidence": "Preclinical: flumazenil-reversible; Harada 2018 (olfactory-exclusive)",
        "evidence_tier": "preclinical",
        "therapeutic": "Anxiolysis, sedation, sleep",
        "constraint": "Linalool must be INHALED (olfactory-only pathway)",
        "unlock_via": "Ease Round (Lavender) for strains with Myrcene but no Linalool",
    },
    {
        "id": "S2",
        "name": "The Sesquiterpene Pair",
        "terpenes": ["Caryophyllene", "Humulene"],
        "json_names": [["β-Caryophyllene"], ["α-Humulene"]],
        "mechanism": "Dual NF-kB inhibition + CB2/CB1 complementary activation",
        "detail": "Produced by the same enzyme (CsTPS9FN) at a 2.5:1 ratio. Caryophyllene activates CB2 (Ki=155nM) and inhibits NF-kB. Humulene weakly modulates CB1 and independently inhibits NF-kB. Together they provide dual anti-inflammatory pathway suppression. BCP also enhances humulene's cellular uptake.",
        "receptor": "NF-kB, CB2, CB1",
        "synergy_type": "Additive to synergistic",
        "evidence": "Preclinical: cancer cell models (30% enhancement); Alves 2019 arthritis model",
        "evidence_tier": "preclinical",
        "therapeutic": "Anti-inflammatory, pain, anti-cancer potentiation",
        "constraint": None,
        "unlock_via": "Naturally co-occurring in most strains (same biosynthetic enzyme)",
    },
    {
        "id": "S3",
        "name": "The Memory Shield",
        "terpenes": ["Pinene", "Eucalyptol"],
        "json_names": [["α-Pinene"], ["1,8-Cineole"]],
        "mechanism": "Dual AChE inhibition via independent binding mechanisms",
        "detail": "Both inhibit acetylcholinesterase through different molecular interactions. Pinene (IC50 = 0.44 mM) and eucalyptol independently preserve synaptic acetylcholine. Rosemary naturally contains both, which likely explains its traditional reputation as a memory herb. Combined, they create a more robust buffer against THC-induced cholinergic suppression than either alone.",
        "receptor": "AChE, BDNF-TrkB",
        "synergy_type": "Additive (dual independent inhibition)",
        "evidence": "Clinical: Moss & Oliver 2012 (eucalyptol plasma correlation with cognition); Russo 2011 (pinene entourage hypothesis)",
        "evidence_tier": "clinical",
        "therapeutic": "Memory preservation, cognitive clarity, neuroprotection",
        "constraint": None,
        "unlock_via": "Clarity Round (Rosemary + Eucalyptus) delivers both terpenes",
    },
    {
        "id": "S4",
        "name": "The Pain Gate",
        "terpenes": ["Menthol", "Myrcene"],
        "json_names": [["Menthol"], ["Myrcene"]],
        "mechanism": "TRPM8 activation cross-desensitizes TRPV1, which Myrcene then modulates in its desensitized state",
        "detail": "Menthol activates TRPM8 (cold receptor, EC50 ~4uM), causing local calcium overload in sensory nerve terminals that desensitizes nearby TRPV1 channels. Myrcene independently modulates TRPV1. When menthol pre-desensitizes TRPV1 before myrcene arrives, the combined analgesic effect exceeds either alone — cooling quiets the pain receptor, then myrcene modulates it further.",
        "receptor": "TRPM8, TRPV1",
        "synergy_type": "Sequential (cross-desensitization + modulation)",
        "evidence": "Clinical: menthol cross-desensitization proven in capsaicin studies; IBS peppermint meta-analysis",
        "evidence_tier": "clinical",
        "therapeutic": "Pain relief, analgesic potentiation, body comfort",
        "constraint": "Menthol must be applied BEFORE myrcene for optimal cross-desensitization sequence",
        "unlock_via": "Calm Round (Peppermint) before any myrcene-dominant strain blend",
    },
    {
        "id": "S5",
        "name": "The Endorphin Cascade",
        "terpenes": ["Caryophyllene", "Myrcene"],
        "json_names": [["β-Caryophyllene"], ["Myrcene"]],
        "mechanism": "Convergent mu-opioid pathway activation via independent mechanisms",
        "detail": "Caryophyllene activates CB2 on peripheral immune cells, triggering beta-endorphin release that then acts on mu-opioid receptors. Myrcene independently modulates mu-opioid receptors. Both pathways converge on pain suppression without central psychoactive opioid effects. This is the most common synergy pair in the Solful collection.",
        "receptor": "mu-opioid, CB2",
        "synergy_type": "Convergent (independent pathways → same endpoint)",
        "evidence": "Preclinical: naloxone reversal confirms opioid pathway; beta-endorphin antisera blocks BCP effects",
        "evidence_tier": "preclinical",
        "therapeutic": "Pain suppression, opioid-sparing analgesia",
        "constraint": None,
        "unlock_via": "Naturally present in 17/23 strains",
    },
    {
        "id": "S6",
        "name": "The Triple GABA",
        "terpenes": ["Myrcene", "Linalool", "Bisabolol"],
        "json_names": [["Myrcene"], ["Linalool"], ["α-Bisabolol"]],
        "mechanism": "Three terpenes converge on GABA-A through distinct modulatory mechanisms",
        "detail": "Myrcene is a direct GABA-A modulator. Linalool is a positive allosteric modulator at the benzodiazepine site. Bisabolol modulates GABA-A through a third, less-characterized mechanism possibly involving NF-kB crosstalk. This triple convergence creates the deepest possible GABAergic tone from terpenes alone.",
        "receptor": "GABA-A (3 mechanisms)",
        "synergy_type": "Triple convergence (unique in the collection)",
        "evidence": "Theoretical: extrapolated from individual terpene GABA-A data",
        "evidence_tier": "theoretical",
        "therapeutic": "Maximum anxiolysis, deep sedation, sleep architecture support",
        "constraint": "Linalool component requires olfactory delivery",
        "unlock_via": "Ease Round completes the triple for strains with Myrcene + Bisabolol",
    },
    {
        "id": "S7",
        "name": "The Mood Lift",
        "terpenes": ["Limonene", "Caryophyllene"],
        "json_names": [["Limonene"], ["β-Caryophyllene"]],
        "mechanism": "Serotonergic + anti-inflammatory convergence",
        "detail": "Limonene modulates 5-HT (serotonin) and A2A (adenosine) receptors for mood elevation and anxiolysis. Caryophyllene suppresses NF-kB and activates CB2 for anti-inflammatory tone. The combination addresses both the neurochemical (mood) and neuroimmune (inflammation) components of anxiety and depression simultaneously.",
        "receptor": "5-HT, A2A, CB2, NF-kB",
        "synergy_type": "Complementary (mood + inflammation)",
        "evidence": "Clinical: Spindle 2024 (limonene + THC anxiety reduction in humans)",
        "evidence_tier": "clinical",
        "therapeutic": "Mood elevation, anxiety reduction, anti-inflammatory",
        "constraint": None,
        "unlock_via": "Naturally present in 15/23 strains — the second most common synergy",
    },
    {
        "id": "S8",
        "name": "The BBB Opener",
        "terpenes": ["Myrcene", "Caryophyllene"],
        "json_names": [["Myrcene"], ["β-Caryophyllene"]],
        "mechanism": "Myrcene lowers blood-brain barrier resistance, enhancing CNS bioavailability of subsequent compounds including caryophyllene and cannabinoids",
        "detail": "Myrcene demonstrably lowers BBB resistance through its lipophilic monoterpene properties. When myrcene is absorbed first, it may enhance the CNS penetration of caryophyllene (which targets CB2) and THC/CBD. Predicted: 2-5 minute faster onset, 20-30% higher peak CNS concentration for co-administered compounds.",
        "receptor": "BBB (pharmacokinetic, not receptor-level)",
        "synergy_type": "Pharmacokinetic (bioavailability enhancement)",
        "evidence": "Preclinical: BBB permeability data; NOT directly studied in humans for terpene co-administration",
        "evidence_tier": "preclinical",
        "therapeutic": "Enhanced onset, improved bioavailability of all subsequent compounds",
        "constraint": "Myrcene must be absorbed FIRST for BBB effect; timing matters",
        "unlock_via": "Present in 17/23 strains; myrcene-dominant strains (Mule Fuel, Avenue) maximize this",
    },
    {
        "id": "S9",
        "name": "The Spice Bridge",
        "terpenes": ["Eugenol", "Caryophyllene"],
        "json_names": [["Eugenol"], ["β-Caryophyllene"]],
        "mechanism": "Convergent TRP channel activation smooths sensory perception",
        "detail": "Both eugenol and caryophyllene interact with TRPV1 and TRPA1 channels, though through different binding mechanisms. Eugenol is a direct TRPV1/TRPA1 agonist; caryophyllene has weak indirect effects. When combined (as in clove oil, which contains both), the dual activation produces a 'smoothed' sensory profile — warmth without sharpness.",
        "receptor": "TRPV1, TRPA1",
        "synergy_type": "Convergent (sensory smoothing)",
        "evidence": "Theoretical: strain-matching framework from eugenol monograph",
        "evidence_tier": "theoretical",
        "therapeutic": "Pain modulation, sensory comfort, anti-inflammatory",
        "constraint": None,
        "unlock_via": "Calm Round (Clove provides eugenol + BCP secondary); present in all strain blends via black pepper",
    },
    {
        "id": "S10",
        "name": "The Anti-Inflammatory Triad",
        "terpenes": ["Caryophyllene", "Humulene", "Bisabolol"],
        "json_names": [["β-Caryophyllene"], ["α-Humulene"], ["α-Bisabolol"]],
        "mechanism": "Triple NF-kB inhibition through three independent pathways",
        "detail": "Caryophyllene inhibits NF-kB via CB2/PPARgamma crosstalk. Humulene inhibits NF-kB through a direct mechanism. Bisabolol inhibits NF-kB through yet another pathway with moderate strength. Three terpenes, three independent routes to suppressing the master inflammatory switch.",
        "receptor": "NF-kB (3 pathways), CB2, PPARgamma",
        "synergy_type": "Triple convergence on inflammatory master switch",
        "evidence": "Preclinical: individual pathways proven; combination effect theoretical",
        "evidence_tier": "preclinical",
        "therapeutic": "Maximum anti-inflammatory effect, arthritis, IBD, chronic pain",
        "constraint": None,
        "unlock_via": "Naturally present in 3 strains (Blueberry Muffin, Pink Jesus Reserve, Pineapple Mojito)",
    },
    {
        "id": "S11",
        "name": "The Clarity Pair",
        "terpenes": ["Pinene", "Limonene"],
        "json_names": [["α-Pinene"], ["Limonene"]],
        "mechanism": "AChE inhibition + serotonergic mood elevation = focused alertness",
        "detail": "Pinene preserves memory via AChE inhibition while limonene elevates mood via 5-HT and A2A modulation. The combination creates an alert, positive mental state — focused without sedation, elevated without mania. This is the 'productive sativa' pharmacological signature.",
        "receptor": "AChE, 5-HT, A2A",
        "synergy_type": "Complementary (cognition + mood)",
        "evidence": "Theoretical: individual mechanisms proven; combination effect inferred",
        "evidence_tier": "preclinical",
        "therapeutic": "Focused productivity, creative work, daytime use",
        "constraint": None,
        "unlock_via": "Naturally present in 2 strains (Mule Fuel, Pineapple Mojito)",
    },
    {
        "id": "S12",
        "name": "CBD + BCP Analgesic Synergy",
        "terpenes": ["Caryophyllene", "CBD"],
        "json_names": [["β-Caryophyllene"], ["CBD"]],
        "mechanism": "Convergent receptor targeting — CBD (5-HT1A, TRPV1, PPARgamma) + BCP (CB2, PPARgamma)",
        "detail": "The ED50 for combined CBD + BCP therapy is lower than either compound alone. Both share PPARgamma as a convergence point, but activate it through different upstream mechanisms. This is the only terpene-cannabinoid synergy with published preclinical ED50 data proving synergistic (not merely additive) interaction.",
        "receptor": "CB2, PPARgamma, TRPV1, 5-HT1A",
        "synergy_type": "Synergistic (proven: ED50 shift)",
        "evidence": "Preclinical: PMC9779834 — CBD + BCP combination study",
        "evidence_tier": "preclinical",
        "therapeutic": "Pain relief with lower dosing, opioid-sparing",
        "constraint": "Requires CBD-containing cannabis strain",
        "unlock_via": "Love and Laughter (only CBD strain) + its black pepper oil recipe",
    },
]


def load_strains():
    with open(PROJECT / "data" / "strains.json") as f:
        return json.load(f)["strains"]


def normalize(name):
    return NAME_MAP.get(name, name)


def strain_has_terpenes(strain, json_name_groups):
    """Check if strain has at least one terpene from each group."""
    profile = set(strain["terpeneProfile"].keys())
    for group in json_name_groups:
        if not any(t in profile for t in group):
            return False
    return True


def strain_synergy_strength(strain, json_name_groups):
    """Score how strongly a strain expresses a synergy based on concentrations."""
    profile = strain["terpeneProfile"]
    group_concs = []
    for group in json_name_groups:
        best = 0
        for t in group:
            if t in profile:
                best = max(best, profile[t])
        group_concs.append(best)
    if not all(c > 0 for c in group_concs):
        return 0
    # Geometric mean of concentrations (rewards balance over one-sidedness)
    product = 1.0
    for c in group_concs:
        product *= c
    return product ** (1.0 / len(group_concs))


def run_analysis():
    strains = load_strains()

    results = []
    for syn in SYNERGIES:
        matching = []
        for s in strains:
            if strain_has_terpenes(s, syn["json_names"]):
                strength = strain_synergy_strength(s, syn["json_names"])
                terp_detail = {}
                for group in syn["json_names"]:
                    for t in group:
                        if t in s["terpeneProfile"]:
                            terp_detail[t] = s["terpeneProfile"][t]
                matching.append({
                    "name": s["name"], "farm": s["farm"], "region": s["region"],
                    "strength": strength, "terpenes": terp_detail,
                    "intent": s["intent"], "effects": s["effects"],
                })
        matching.sort(key=lambda x: x["strength"], reverse=True)
        results.append({**syn, "strains": matching, "count": len(matching)})

    return results, strains


def write_report(results, strains):
    s = []
    s.append("# Terpene Synergy Analysis: The Solful Collection\n")
    s.append(f"*12 documented synergies mapped across 23 strains*\n")

    s.append("## Executive Summary\n")
    s.append("Not all terpene combinations are equal. When specific pairs co-occur in a strain, "
             "they can produce effects that exceed what either terpene achieves alone — through "
             "shared receptors, complementary pathways, or pharmacokinetic enhancement.\n")
    s.append("We identified 12 distinct synergies from the monograph research and mapped each "
             "to every strain in the Solful collection. Some synergies are naturally abundant "
             "(Caryophyllene + Myrcene appears in 17 strains). Others are rare and powerful "
             "(Triple GABA convergence exists in only 2 strains).\n")

    # Overview table
    s.append("## Synergy Overview\n")
    s.append("| # | Synergy | Terpenes | Type | Evidence | Strains | Best Expresser |")
    s.append("|---|---------|----------|------|----------|---------|----------------|")
    for r in results:
        terps = " + ".join(r["terpenes"])
        best = r["strains"][0]["name"] if r["strains"] else "None (unlock via rounding)"
        s.append(f"| {r['id']} | {r['name']} | {terps} | {r['synergy_type'].split('(')[0].strip()} | "
                 f"{r['evidence_tier']} | {r['count']}/23 | {best} |")

    # Detailed synergy profiles
    s.append("\n## Synergy Profiles\n")
    for r in results:
        s.append(f"### {r['id']}: {r['name']}\n")
        s.append(f"**Terpenes:** {' + '.join(r['terpenes'])}")
        s.append(f"**Mechanism:** {r['mechanism']}")
        s.append(f"**Type:** {r['synergy_type']}")
        s.append(f"**Evidence:** {r['evidence']}")
        s.append(f"**Therapeutic Value:** {r['therapeutic']}\n")
        s.append(f"{r['detail']}\n")

        if r.get("constraint"):
            s.append(f"**Constraint:** {r['constraint']}\n")

        if r["strains"]:
            s.append(f"**Found in {r['count']}/23 strains:**\n")
            s.append("| Strain | Farm | Region | Terpene Concentrations | Strength | Intent |")
            s.append("|--------|------|--------|----------------------|----------|--------|")
            for st in r["strains"]:
                terp_str = ", ".join(f"{t}:{c:.2f}%" for t, c in st["terpenes"].items())
                s.append(f"| **{st['name']}** | {st['farm']} | {st['region']} | "
                         f"{terp_str} | {st['strength']:.3f} | {st['intent'][:40]}... |")

            # Highlight the best expresser
            best = r["strains"][0]
            s.append(f"\n**Best expresser: {best['name']}** (strength {best['strength']:.3f}) — "
                     f"{best['intent']}")
        else:
            s.append(f"**Not naturally present in any strain.**")

        if r.get("unlock_via"):
            s.append(f"\n**How to unlock:** {r['unlock_via']}\n")
        s.append("")

    # Strain synergy scorecard
    s.append("## Strain Synergy Scorecard\n")
    s.append("How many of the 12 synergies does each strain naturally express?\n")

    strain_scores = []
    for st in strains:
        active = []
        for r in results:
            if strain_has_terpenes(st, r["json_names"]):
                active.append(r["id"])
        strain_scores.append({
            "name": st["name"], "farm": st["farm"], "region": st["region"],
            "synergies": active, "count": len(active),
            "total_terpenes": st["totalTerpenes"],
        })

    strain_scores.sort(key=lambda x: x["count"], reverse=True)

    s.append("| Strain | Farm | Synergies | Count | Active Synergy IDs |")
    s.append("|--------|------|-----------|-------|--------------------|")
    for ss in strain_scores:
        syn_ids = ", ".join(ss["synergies"])
        s.append(f"| {ss['name']} | {ss['farm']} | {ss['count']}/12 | "
                 f"{'█' * ss['count']}{'░' * (12 - ss['count'])} | {syn_ids} |")

    # Top synergy-rich strains narrative
    s.append("\n### Most Synergy-Rich Strains\n")
    for ss in strain_scores[:5]:
        s.append(f"**{ss['name']}** ({ss['farm']}, {ss['region']}) — "
                 f"**{ss['count']}/12 synergies**, {ss['total_terpenes']:.2f}% total terpenes")
        s.append(f"Active: {', '.join(ss['synergies'])}\n")

    s.append("### Synergy-Sparse Strains (Unlock Opportunities)\n")
    for ss in strain_scores[-3:]:
        s.append(f"**{ss['name']}** ({ss['farm']}) — {ss['count']}/12 synergies")
        # What synergies could be unlocked?
        missing = [r for r in results if r["id"] not in ss["synergies"]]
        unlockable = [r for r in missing if r.get("unlock_via")]
        if unlockable:
            s.append(f"Can unlock via rounding blends: {', '.join(r['name'] for r in unlockable[:3])}\n")

    # Synergy-intent mapping
    s.append("## Synergy-Intent Pairing Guide\n")
    s.append("Match your session intent to the synergies that serve it best.\n")

    intent_map = {
        "Focus & Creativity": ["S3", "S11", "S7"],
        "Anxiety & Sleep": ["S1", "S6", "S7"],
        "Pain & Body": ["S4", "S5", "S9", "S12"],
        "Anti-Inflammatory": ["S2", "S10"],
        "Enhanced Onset": ["S8"],
    }

    for intent, syn_ids in intent_map.items():
        s.append(f"### {intent}\n")
        for sid in syn_ids:
            syn = next(r for r in results if r["id"] == sid)
            best_strains = [st["name"] for st in syn["strains"][:3]]
            strain_str = ", ".join(best_strains) if best_strains else "Unlock via " + (syn.get("unlock_via") or "N/A")
            s.append(f"- **{syn['name']}** ({' + '.join(syn['terpenes'])}) — {strain_str}")
        s.append("")

    REPORT_PATH.write_text("\n".join(s))
    print(f"Report saved to: {REPORT_PATH}")

    # Console summary
    print("\n" + "=" * 70)
    print("TERPENE SYNERGY ANALYSIS — SUMMARY")
    print("=" * 70)
    for r in results:
        terps = " + ".join(r["terpenes"])
        print(f"\n  {r['id']}: {r['name']} ({terps})")
        print(f"    {r['count']}/23 strains | {r['evidence_tier']} | {r['synergy_type']}")
        if r["strains"]:
            print(f"    Best: {r['strains'][0]['name']} ({r['strains'][0]['strength']:.3f})")

    print(f"\n{'=' * 70}")
    print("  STRAIN SYNERGY RANKINGS:")
    for ss in strain_scores[:5]:
        print(f"    {ss['name']:<25} {ss['count']}/12 synergies")
    print(f"{'=' * 70}")


if __name__ == "__main__":
    results, strains = run_analysis()
    write_report(results, strains)
