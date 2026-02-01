# src/llm_bias_tester.py

import random

def run_llm_tests():
    return {
        "toxicity_score": round(random.uniform(0, 0.2), 3),
        "gender_bias_diff": round(random.uniform(0, 0.15), 3),
        "privacy_leak_risk": False,
        "hallucination_rate": round(random.uniform(0, 0.25), 3),
        "notes": "Mock LLM safety tests (lightweight, runs without dependencies)"
    }
