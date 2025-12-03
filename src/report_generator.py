
from datetime import datetime

def generate_text_report(name, description, risk, score, missing, recs):
    text = f"""
System: {name}
Risk Category: {risk}
Compliance Score: {score}%
Generated: {datetime.utcnow().isoformat()}Z

Description:
{description}

Missing Requirements:
"""
    for m in missing:
        text += f"- {m['key']} ({m['severity']}) | {m['description']} | Refs: {', '.join(m['refs'])}\n"

    text += "\nRecommendations:\n"
    for r in recs:
        text += f"- {r}\n"

    return text

def save_report(content, filename="report.txt"):
    with open(filename, "w") as f:
        f.write(content)
