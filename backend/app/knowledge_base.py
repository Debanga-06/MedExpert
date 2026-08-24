"""
MedExpert Knowledge Base
-------------------------
Educational, non-clinical IF-THEN knowledge base. Every symptom carries a
point weight; every disease rule lists the symptoms it cares about, split
into `core` (at least one must be present for the rule to even be considered)
and `supporting` (raises the score but isn't required on its own).

This is intentionally simple and transparent — the whole point of the
project is that a human can read every rule and see exactly why a result
was produced. Nothing here is derived from real clinical scoring systems;
weights were chosen for demonstration purposes only.
"""

from dataclasses import dataclass, field


@dataclass(frozen=True)
class Symptom:
    id: str
    label: str
    category: str
    weight: int  # relative severity/specificity weight, used in scoring


@dataclass(frozen=True)
class Rule:
    id: str
    disease: str
    core: tuple          # symptom ids — at least one required to consider this rule
    supporting: tuple    # symptom ids — optional, adds to the score
    explanation: str
    safety_level: str = "info"  # "info" | "warning" | "emergency"
    care_tips: tuple = ()   # general, non-prescriptive self-care pointers — not a treatment plan
    seek_care: tuple = ()   # red-flag signs that mean "stop self-managing, see a professional"


SYMPTOMS: list[Symptom] = [
    Symptom("fever", "Fever", "General", 9),
    Symptom("chills", "Chills", "General", 6),
    Symptom("fatigue", "Fatigue", "General", 6),
    Symptom("body_pain", "Body pain", "General", 7),
    Symptom("muscle_ache", "Muscle ache", "General", 6),
    Symptom("headache", "Headache", "Neurological", 6),
    Symptom("light_sensitivity", "Sensitivity to light", "Neurological", 7),
    Symptom("sound_sensitivity", "Sensitivity to sound", "Neurological", 6),
    Symptom("dizziness", "Dizziness", "Neurological", 5),
    Symptom("blurred_vision", "Blurred vision", "Neurological", 5),
    Symptom("cough", "Cough", "Respiratory", 8),
    Symptom("sore_throat", "Sore throat", "Respiratory", 6),
    Symptom("sneezing", "Sneezing", "Respiratory", 5),
    Symptom("runny_nose", "Runny nose", "Respiratory", 5),
    Symptom("nasal_congestion", "Nasal congestion", "Respiratory", 5),
    Symptom("wheezing", "Wheezing", "Respiratory", 9),
    Symptom("shortness_of_breath", "Shortness of breath", "Respiratory", 10),
    Symptom("chest_discomfort", "Chest discomfort", "Respiratory", 8),
    Symptom("chest_pain", "Chest pain", "Respiratory", 10),
    Symptom("itchy_eyes", "Itchy eyes", "Allergy", 5),
    Symptom("watery_eyes", "Watery eyes", "Allergy", 5),
    Symptom("nausea", "Nausea", "Digestive", 6),
    Symptom("vomiting", "Vomiting", "Digestive", 7),
    Symptom("diarrhea", "Diarrhea", "Digestive", 7),
    Symptom("abdominal_pain", "Abdominal pain", "Digestive", 7),
    Symptom("loss_of_appetite", "Loss of appetite", "Digestive", 5),
    Symptom("dry_mouth", "Dry mouth", "Metabolic", 5),
    Symptom("increased_thirst", "Increased thirst", "Metabolic", 8),
    Symptom("frequent_urination", "Frequent urination", "Metabolic", 8),
    Symptom("dark_urine", "Dark urine", "Metabolic", 6),
    Symptom("unexplained_weight_loss", "Unexplained weight loss", "Metabolic", 7),
    Symptom("sweating", "Excess sweating", "General", 4),
    Symptom("rapid_heartbeat", "Rapid heartbeat", "General", 6),
]

SYMPTOM_INDEX = {s.id: s for s in SYMPTOMS}

RULES: list[Rule] = [
    Rule(
        id="R001",
        disease="Influenza",
        core=("fever", "cough", "fatigue"),
        supporting=("body_pain", "chills", "headache", "muscle_ache"),
        explanation="Fever combined with cough and fatigue is a classic influenza-like pattern.",
        care_tips=("Rest and prioritize sleep", "Drink fluids regularly", "Track your temperature twice a day"),
        seek_care=("Fever lasts more than 3–4 days", "Breathing becomes difficult", "Symptoms suddenly worsen"),
    ),
    Rule(
        id="R002",
        disease="Common Cold",
        core=("sneezing", "runny_nose", "sore_throat"),
        supporting=("nasal_congestion", "cough", "headache"),
        explanation="Sneezing, a runny nose, and sore throat without high fever suggest a common cold.",
        care_tips=("Rest and stay hydrated", "Warm salt-water gargle for the throat", "Use a humidifier or steam"),
        seek_care=("Symptoms last more than 10 days", "High fever develops", "Ear or sinus pain appears"),
    ),
    Rule(
        id="R003",
        disease="Possible Viral Infection",
        core=("fever", "fatigue"),
        supporting=("body_pain", "chills", "headache", "sore_throat", "loss_of_appetite"),
        explanation="A broader fever-and-fatigue pattern consistent with a general viral illness.",
        care_tips=("Rest as much as possible", "Keep fluid intake steady", "Monitor temperature daily"),
        seek_care=("Symptoms persist beyond a week", "You feel confused or very weak", "Fever spikes suddenly"),
    ),
    Rule(
        id="R004",
        disease="Asthma",
        core=("wheezing", "shortness_of_breath"),
        supporting=("chest_discomfort", "cough"),
        explanation="Wheezing together with shortness of breath is characteristic of asthma-like airway constriction.",
        safety_level="warning",
        care_tips=("Avoid known triggers (smoke, dust, cold air)", "Keep any prescribed inhaler within reach", "Sit upright and breathe slowly"),
        seek_care=("Breathing gets noticeably harder", "Lips or fingertips look bluish", "Rescue inhaler isn't helping"),
    ),
    Rule(
        id="R005",
        disease="Possible Respiratory Infection",
        core=("cough", "chest_discomfort"),
        supporting=("fever", "shortness_of_breath", "fatigue", "sore_throat"),
        explanation="A persistent cough with chest discomfort may indicate a lower respiratory infection.",
        safety_level="warning",
        care_tips=("Rest and stay hydrated", "Monitor your breathing rate", "Avoid smoke and irritants"),
        seek_care=("Breathing becomes labored", "Fever is high and persistent", "Chest pain develops"),
    ),
    Rule(
        id="R006",
        disease="Migraine",
        core=("headache", "light_sensitivity"),
        supporting=("sound_sensitivity", "nausea", "dizziness", "blurred_vision"),
        explanation="Headache paired with sensitivity to light or sound is a typical migraine pattern.",
        care_tips=("Rest in a quiet, dark room", "Stay hydrated", "Note possible triggers (sleep, food, stress)"),
        seek_care=("It's the worst headache you've ever had", "Vision loss, confusion, or weakness occurs", "It follows a head injury"),
    ),
    Rule(
        id="R007",
        disease="Gastroenteritis",
        core=("nausea", "vomiting", "diarrhea"),
        supporting=("abdominal_pain", "fever", "loss_of_appetite"),
        explanation="Nausea, vomiting, and diarrhea together point toward an inflamed digestive tract.",
        care_tips=("Sip oral rehydration solution or water often", "Eat a bland diet once tolerated", "Rest and avoid dairy/fatty food"),
        seek_care=("Fluids can't be kept down", "Signs of dehydration appear", "Blood appears in stool or vomit"),
    ),
    Rule(
        id="R008",
        disease="Allergic Rhinitis",
        core=("sneezing", "itchy_eyes", "watery_eyes"),
        supporting=("runny_nose", "nasal_congestion"),
        explanation="Sneezing with itchy, watery eyes and no fever is typical of an allergic reaction.",
        care_tips=("Identify and avoid the likely allergen", "Keep windows closed on high-pollen days", "Rinse eyes/nose with clean water"),
        seek_care=("Breathing difficulty appears", "Facial or throat swelling occurs", "Symptoms don't improve with avoidance"),
    ),
    Rule(
        id="R009",
        disease="Dehydration",
        core=("dry_mouth", "increased_thirst", "dizziness"),
        supporting=("fatigue", "dark_urine", "headache"),
        explanation="Dry mouth, thirst, and dizziness together suggest fluid loss.",
        care_tips=("Increase fluid and electrolyte intake", "Rest in a cool, shaded place", "Avoid caffeine and alcohol for now"),
        seek_care=("Confusion or fainting occurs", "Fluids can't be kept down", "Urination stops almost entirely"),
    ),
    Rule(
        id="R010",
        disease="Possible Diabetes-Related Symptoms",
        core=("increased_thirst", "frequent_urination"),
        supporting=("fatigue", "unexplained_weight_loss", "blurred_vision", "dry_mouth"),
        explanation="Persistent thirst and frequent urination are patterns worth discussing with a clinician; "
                    "not a diagnosis on their own.",
        safety_level="warning",
        care_tips=("Note when symptoms started and how often they occur", "Keep a simple log of fluid intake and urination", "Avoid self-diagnosing or self-medicating"),
        seek_care=("These symptoms persist more than a few days", "Unexplained weight loss occurs alongside them", "Vision becomes blurred"),
    ),
    Rule(
        id="R011",
        disease="Possible Cardiac Concern",
        core=("chest_pain", "shortness_of_breath"),
        supporting=("sweating", "rapid_heartbeat", "dizziness"),
        explanation="Chest pain with shortness of breath is a pattern that always warrants urgent evaluation.",
        safety_level="emergency",
        care_tips=("Stop physical activity and sit down", "Stay as calm as possible", "Don't drive yourself — have someone else take you or call for help"),
        seek_care=("This combination is present at all — treat it as urgent every time",),
    ),
]

# Combinations that should surface a standalone safety banner regardless of
# which disease rules fire. Each entry: (symptom ids that must ALL be present, message)
# `code` is a stable key the frontend uses to localize the message (don't rename).
SAFETY_TRIGGERS: list[dict] = [
    {
        "code": "chest_shortness",
        "symptoms": ("chest_pain", "shortness_of_breath"),
        "level": "emergency",
        "message": "Chest pain with shortness of breath can indicate a medical emergency. "
                    "Please seek urgent medical attention or contact emergency services.",
    },
    {
        "code": "wheeze_shortness",
        "symptoms": ("wheezing", "shortness_of_breath"),
        "level": "warning",
        "message": "Wheezing with shortness of breath may require prompt medical attention, "
                    "especially if it worsens or does not improve.",
    },
    {
        "code": "vomit_diarrhea",
        "symptoms": ("vomiting", "diarrhea"),
        "level": "warning",
        "message": "Vomiting combined with diarrhea can cause rapid dehydration. "
                    "Seek medical advice if symptoms are severe or persistent.",
    },
]
