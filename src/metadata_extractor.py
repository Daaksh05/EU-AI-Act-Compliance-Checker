

def parse_model_card_text(text: str):
    meta = {"name": None, "purpose": None, "datasets": None, "license": None, "notes": None}

    if not text:
        return meta

    lines = [l.strip() for l in text.splitlines() if l.strip()]

    for line in lines:
        if line.lower().startswith("model:"):
            meta["name"] = line.split(":", 1)[1].strip()
        elif line.lower().startswith("purpose:"):
            meta["purpose"] = line.split(":", 1)[1].strip()
        elif line.lower().startswith("data:"):
            meta["datasets"] = line.split(":", 1)[1].strip()
        elif line.lower().startswith("license:"):
            meta["license"] = line.split(":", 1)[1].strip()
        elif line.lower().startswith("notes:"):
            meta["notes"] = line.split(":", 1)[1].strip()

    return meta
