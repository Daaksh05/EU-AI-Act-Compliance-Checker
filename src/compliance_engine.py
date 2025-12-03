import yaml

# Load EU AI Act rules
def load_rules(path="rules/high_risk_rules.yaml"):
    with open(path, "r", encoding="utf-8") as file:
        return yaml.safe_load(file)

# Main compliance function
def check_compliance(system_description: str):
    """
    Takes a text description of an AI system and performs rule-based checks.
    """
    rules = load_rules()

    missing_requirements = []

    # Check category
    category = "high_risk" if "hiring" in system_description.lower() else "other"

    # Apply each rule
    for rule in rules.get("high_risk", []):
        if rule["keyword"].lower() not in system_description.lower():
            missing_requirements.append(rule)

    score = round(
        100 - (len(missing_requirements) / len(rules.get("high_risk", [])) * 100), 2
    )

    return {
        "category": category,
        "compliance_score": score,
        "missing_requirements": missing_requirements
    }
