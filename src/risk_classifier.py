# src/risk_classifier.py

import re

HIGH_KEYWORDS = {
    'credit': 2, 'loan': 2, 'hiring': 3, 'employment': 3,
    'medical': 3, 'health': 3, 'biometric': 3,
}

LIMITED_KEYWORDS = {
    'chatbot': 2, 'recommend': 1, 'assistant': 1
}

PROHIBITED_KEYWORDS = {
    'social scoring': 5, 'real-time biometric': 5, 'mass surveillance': 5
}

def _score(text, keywords):
    score = 0
    text = text.lower()
    for k, w in keywords.items():
        if re.search(r'\b' + re.escape(k) + r'\b', text):
            score += w
    return score

def classify_risk(description):
    if not description:
        return "minimal_risk"
    if _score(description, PROHIBITED_KEYWORDS) >= 5:
        return "prohibited"
    if _score(description, HIGH_KEYWORDS) >= 3:
        return "high_risk"
    if _score(description, LIMITED_KEYWORDS) >= 2:
        return "limited_risk"
    return "minimal_risk"
