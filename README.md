# EU AI Act Compliance Checker  
A research-driven prototype for evaluating Machine Learning models and Large Language Models (LLMs) under the **European Union Artificial Intelligence Act (2024)**.

This tool analyses AI systems, classifies their regulatory risk level, checks compliance with essential EU AI Act requirements, runs lightweight LLM behaviour tests, and generates automated compliance reports (TXT + Markdown).

---

# 🚀 Features

### ✔ **Risk Classification Engine**
Determines whether an AI system is:
- **Prohibited**
- **High-risk**
- **Limited-risk**
- **Minimal-risk**

Classification is based on keywords extracted from model descriptions and EU AI Act Annex III categories.

---

### ✔ **Compliance Rule Engine**
Checks whether the system meets requirements such as:
- Data governance  
- Transparency & documentation  
- Human oversight  
- Bias monitoring  
- Logging & robustness  
- LLM-specific obligations (model cards, data documentation)

You may use the default ruleset or provide a custom `rules/eu_ai_rules.json`.

---

### ✔ **LLM Bias & Safety Tester**
Includes a lightweight LLM testing module that provides:
- Toxicity score  
- Gender bias difference  
- Privacy leak risk  
- Hallucination estimate  

If `transformers` is not installed, **mock tests** run so the code works everywhere.

---

### ✔ **Automatic Report Generation**
Generates:
- `*.txt` compliance report  
- `*.md` Markdown report  
- Summary of missing requirements  
- Recommendations for compliance improvement  

---

# 📂 Project Structure

