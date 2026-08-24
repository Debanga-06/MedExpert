"""
Tests for the REST API (app/main.py), covering the endpoints listed in
PRD section 9.2 and the error-handling cases in PRD section 16.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}


def test_get_symptoms():
    res = client.get("/api/symptoms")
    assert res.status_code == 200
    body = res.json()
    assert len(body) >= 30
    assert {"id", "label", "category"} <= body[0].keys()


def test_diagnose_influenza():
    res = client.post("/api/diagnose", json={"symptoms": ["fever", "cough", "fatigue", "body_pain"]})
    assert res.status_code == 200
    body = res.json()
    assert body["diagnoses"][0]["disease"] == "Influenza"
    assert "disclaimer" in body and len(body["disclaimer"]) > 0
    assert len(body["diagnoses"][0]["care_tips"]) > 0
    assert len(body["diagnoses"][0]["seek_care"]) > 0


def test_diagnose_common_cold():
    res = client.post("/api/diagnose", json={"symptoms": ["sneezing", "runny_nose", "sore_throat"]})
    assert res.status_code == 200
    assert res.json()["diagnoses"][0]["disease"] == "Common Cold"


def test_diagnose_asthma_like():
    res = client.post("/api/diagnose", json={"symptoms": ["wheezing", "shortness_of_breath"]})
    assert res.status_code == 200
    assert res.json()["diagnoses"][0]["disease"] == "Asthma"


def test_diagnose_no_symptoms_is_rejected():
    # PRD 16 — "Please select at least one symptom before continuing."
    res = client.post("/api/diagnose", json={"symptoms": []})
    assert res.status_code == 422


def test_diagnose_no_rule_match_returns_empty_list_not_an_error():
    res = client.post("/api/diagnose", json={"symptoms": ["dizziness"]})
    assert res.status_code == 200
    assert res.json()["diagnoses"] == []


def test_diagnose_missing_body_field_is_rejected():
    res = client.post("/api/diagnose", json={})
    assert res.status_code == 422


def test_diagnose_emergency_warning_shape():
    res = client.post("/api/diagnose", json={"symptoms": ["chest_pain", "shortness_of_breath"]})
    body = res.json()
    assert any(w["level"] == "emergency" and w["code"] for w in body["warnings"])
