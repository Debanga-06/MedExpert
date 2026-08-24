"""
Tests for the inference engine (app/engine.py), covering the five cases
from PRD section 19.
"""

import pytest
from app.engine import diagnose


def _top_disease(result):
    return result["diagnoses"][0]["disease"] if result["diagnoses"] else None


def test_case_1_influenza():
    result = diagnose(["fever", "cough", "fatigue", "body_pain"])
    assert _top_disease(result) == "Influenza"
    assert result["diagnoses"][0]["score"] > 0


def test_case_2_common_cold():
    result = diagnose(["sneezing", "runny_nose", "sore_throat"])
    assert _top_disease(result) == "Common Cold"


def test_case_3_asthma():
    result = diagnose(["wheezing", "shortness_of_breath"])
    assert _top_disease(result) == "Asthma"
    # this combination is also a safety-warning trigger
    assert any(w["code"] == "wheeze_shortness" for w in result["warnings"])


def test_case_4_no_symptoms():
    # PRD expects a validation error for an empty submission — that's
    # enforced at the API layer (see test_api.py); the engine itself
    # should simply return no candidates for an empty fact set.
    result = diagnose([])
    assert result["diagnoses"] == []


def test_case_5_no_rule_match():
    # A single, low-specificity symptom shouldn't surface any candidate.
    result = diagnose(["dizziness"])
    assert result["diagnoses"] == []


def test_every_matched_rule_explains_itself():
    result = diagnose(["fever", "cough", "fatigue", "body_pain"])
    for d in result["diagnoses"]:
        assert d["matched_rules"], f"{d['disease']} fired with no explanation attached"
        for rule in d["matched_rules"]:
            assert rule["rule_id"].startswith("R")
            assert len(rule["explanation"]) > 0


def test_emergency_warning_fires():
    result = diagnose(["chest_pain", "shortness_of_breath", "sweating"])
    assert any(w["level"] == "emergency" for w in result["warnings"])


def test_unknown_symptom_ids_are_ignored_not_crashed_on():
    result = diagnose(["fever", "not_a_real_symptom"])
    assert result["unknown_symptoms"] == ["not_a_real_symptom"]


def test_every_rule_has_care_guidance():
    from app.knowledge_base import RULES
    for rule in RULES:
        assert rule.care_tips, f"{rule.id} ({rule.disease}) has no care_tips"
        assert rule.seek_care, f"{rule.id} ({rule.disease}) has no seek_care guidance"
