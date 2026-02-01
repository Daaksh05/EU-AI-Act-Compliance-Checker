# src/main.py

from risk_classifier import classify_risk
from metadata_extractor import parse_model_card_text
from compliance_engine import ComplianceEngine
from llm_bias_tester import run_llm_tests
from report_generator import generate_text_report, save_report

def build_provided_items(meta, is_llm):
    return {
        "is_llm": is_llm,
        "data_governance": bool(meta["datasets"]),
        "transparency": bool(meta["name"]),
        "human_oversight": False,
        "bias_monitoring": False,
        "model_card": bool(meta["name"]),
        "data_documentation": bool(meta["datasets"])
    }

def run_checker(model_card_path, is_llm=False):
    with open(model_card_path, "r") as f:
        text = f.read()

    meta = parse_model_card_text(text)
    description = meta["purpose"] or ""

    risk = classify_risk(description)

    provided = build_provided_items(meta, is_llm)

    engine = ComplianceEngine()
    score, missing = engine.evaluate(risk, provided)

    recs = [f"Fix {m['key']} ({m['severity']}) requirement." for m in missing]

    report = generate_text_report(meta["name"], description, risk, score, missing, recs)
    save_report(report, f"{meta['name']}_compliance.txt")

    print(report)

if __name__ == "__main__":
    run_checker("examples/model_card_hiring.txt", is_llm=False)
