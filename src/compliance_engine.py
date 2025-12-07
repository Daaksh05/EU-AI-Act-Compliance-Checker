import yaml
import os

def check_compliance(description: str) -> dict:
    """
    Determines the AI system's risk category based on YAML rules.
    Ensures a consistent structured response.
    """

    rules_path = os.path.join("rules", "high_risk_rules.yaml")

    # Load rules safely
    try:
        with open(rules_path, "r", encoding="utf-8") as f:
            rules = yaml.safe_load(f)
    except Exception as e:
        return {
            "risk_category": "unknown",
            "explanation": f"Error loading rules: {str(e)}",
            "rules_triggered": []
        }

    triggered = []

    # Evaluate the description against rules
    for rule in rules.get("high_risk", []):
        keywords = rule.get("keywords", [])
        for kw in keywords:
            if kw.lower() in description.lower():
                triggered.append(rule.get("id", "unknown_rule"))
                break

    # Decide risk category
    if triggered:
        risk = "high-risk"
        explanation = (
            "This AI system triggered high-risk criteria under the EU AI Act. "
            "It likely performs tasks affecting rights, employment, safety, or fairness."
        )
    else:
        risk = "minimal-risk"
        explanation = (
            "No high-risk criteria were detected. The AI system appears to fall under "
            "minimal-risk or limited-risk categories."
        )

    # Always return required fields
    return {
        "risk_category": risk,
        "explanation": explanation,
        "rules_triggered": triggered
    }
