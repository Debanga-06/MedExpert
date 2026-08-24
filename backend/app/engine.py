"""
Inference engine
-----------------
A small, dependency-free forward-chaining engine that mirrors the classic
Experta pattern (facts -> rule matching -> firing -> conclusions) without
requiring the unmaintained `experta` package. Every step below corresponds
to a step in the PRD's inference pipeline:

    symptoms -> facts -> knowledge base -> matching rules -> firing
    -> scored, explained, ranked conclusions
"""

from .knowledge_base import RULES, SYMPTOM_INDEX, SAFETY_TRIGGERS

MIN_SCORE_TO_SURFACE = 25  # below this, a rule is considered noise, not a candidate


def _rule_max_weight(rule) -> int:
    ids = set(rule.core) | set(rule.supporting)
    return sum(SYMPTOM_INDEX[i].weight for i in ids if i in SYMPTOM_INDEX)


def diagnose(symptom_ids: list[str]) -> dict:
    facts = set(s for s in symptom_ids if s in SYMPTOM_INDEX)
    unknown = [s for s in symptom_ids if s not in SYMPTOM_INDEX]

    candidates = []
    for rule in RULES:
        core_hit = [s for s in rule.core if s in facts]
        if not core_hit:
            continue  # rule not even considered — forward chaining "match" step

        supporting_hit = [s for s in rule.supporting if s in facts]
        matched = core_hit + supporting_hit
        matched_weight = sum(SYMPTOM_INDEX[s].weight for s in matched)
        max_weight = _rule_max_weight(rule)
        score = round((matched_weight / max_weight) * 100) if max_weight else 0

        if score < MIN_SCORE_TO_SURFACE:
            continue

        candidates.append({
            "disease": rule.disease,
            "disease_code": rule.id,
            "score": score,
            "matched_symptoms": matched,
            "matched_rules": [{"rule_id": rule.id, "explanation": rule.explanation}],
            "safety_level": rule.safety_level,
            "care_tips": list(rule.care_tips),
            "seek_care": list(rule.seek_care),
        })

    candidates.sort(key=lambda c: c["score"], reverse=True)

    warnings = []
    for trigger in SAFETY_TRIGGERS:
        if all(s in facts for s in trigger["symptoms"]):
            warnings.append({
                "code": trigger["code"],
                "level": trigger["level"],
                "message": trigger["message"],
            })

    return {
        "diagnoses": candidates[:5],
        "warnings": warnings,
        "unknown_symptoms": unknown,
    }
