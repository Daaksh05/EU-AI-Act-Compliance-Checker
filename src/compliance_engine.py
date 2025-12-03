

import json
from typing import Dict, Tuple, List

DEFAULT_RULES = {
    "high_risk": {
        "data_governance": {"description": "Dataset documentation required", "refs": ["Art 10"], "severity": "high"},
        "transparency": {"description": "Technical documentation + model card", "refs": ["Art 13"], "severity": "high"},
        "human_oversight": {"description": "Human-in-loop oversight", "refs": ["Art 14"], "severity": "high"},
    },
    "limited_risk": {
        "transparency": {"description": "AI system must notify user", "refs": ["Art 52"], "severity": "medium"}
    },
    "llm": {
        "model_card": {"description": "Model card with capabilities", "refs": ["Art 13"], "severity": "high"},
        "data_documentation": {"description": "Training data source transparency", "refs": ["Art 10"], "severity": "high"}
    }
}

class ComplianceEngine:
    def __init__(self, rules_path=None):
        try:
            if rules_path:
                with open(rules_path, "r") as f:
                    self.rules = json.load(f)
            else:
                self.rules = DEFAULT_RULES
        except:
            self.rules = DEFAULT_RULES

    def evaluate(self, risk_category: str, provided: Dict[str, bool]) -> Tuple[float, List[Dict]]:
        merged = {}

        if risk_category == "high_risk":
            merged.update(self.rules["high_risk"])
        elif risk_category == "limited_risk":
            merged.update(self.rules["limited_risk"])

        if provided.get("is_llm"):
            merged.update(self.rules["llm"])

        total = len(merged)
        met = 0
        missing = []

        for key, meta in merged.items():
            if provided.get(key):
                met += 1
            else:
                missing.append({
                    "key": key,
                    "description": meta["description"],
                    "refs": meta["refs"],
                    "severity": meta["severity"]
                })
        
        score = round((met / total) * 100, 2) if total > 0 else 100
        return score, missing
