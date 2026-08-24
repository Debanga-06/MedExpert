"""Command-line demo of the inference engine (PRD 6: CLI interface)."""
import sys
from app.knowledge_base import SYMPTOMS
from app.engine import diagnose

def main():
    print("MedExpert CLI — educational demo, not medical advice.\n")
    print("Available symptom ids:")
    for s in SYMPTOMS:
        print(f"  {s.id:24s} [{s.category}]")
    raw = input("\nEnter comma-separated symptom ids: ")
    symptoms = [s.strip() for s in raw.split(",") if s.strip()]
    result = diagnose(symptoms)

    if not result["diagnoses"]:
        print("\nNo sufficiently matching condition was found.")
        print("This does not mean you are healthy — consult a professional if symptoms persist.")
    else:
        print("\nPossible conditions:")
        for d in result["diagnoses"]:
            print(f"  {d['disease']} — {d['score']}% rule match")
            print(f"    matched: {', '.join(d['matched_symptoms'])}")
            for r in d["matched_rules"]:
                print(f"    [{r['rule_id']}] {r['explanation']}")

    for w in result["warnings"]:
        print(f"\n⚠ [{w['level'].upper()}] {w['message']}")

if __name__ == "__main__":
    main()
