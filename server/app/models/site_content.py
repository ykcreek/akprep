# models/site_content.py
import json
import os
from pathlib import Path

# Path to your JSON file
BASE_DIR = Path(__file__).parent.parent
JSON_PATH = BASE_DIR / "data" / "site_content.json"
JSON_PATH.parent.mkdir(exist_ok=True)  # auto-create data/ folder if missing


def _load_json():
    """Safely load JSON, create file if missing."""
    if not JSON_PATH.exists():
        return {}
    try:
        with open(JSON_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError:
        print("Warning: Corrupted JSON – starting fresh")
        return {}


def _save_json(data):
    """Write JSON with nice formatting."""
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def get_all_site_content():
    """Return the entire site content (used on page load)."""
    return _load_json()


def set_nested(data, path, value):
    """
    Deeply set a value using dot notation.
    Supports: "hero.title", "faq.2.question", "services.packs.1.desc"
    """
    keys = path.split(".")
    current = data

    for key in keys[:-1]:
        if key.isdigit():
            idx = int(key)
            # Ensure array exists and is long enough
            while len(current) <= idx:
                current.append({})
            current = current[idx]
        else:
            if key not in current:
                # Auto-create dict or list based on next key
                next_key = keys[keys.index(key) + 1] if keys.index(key) + 1 < len(keys) else None
                current[key] = [] if (next_key and next_key.isdigit()) else {}
            current = current[key]

    # Set final value
    last_key = keys[-1]
    if last_key.isdigit():
        idx = int(last_key)
        while len(current) <= idx:
            current.append(None)
        current[idx] = value
    else:
        current[last_key] = value


def update_site_content(key, value):
    """
    Update a single nested value using dot notation.
    Example: update_site_content("hero.title", "New Title")
    """
    data = _load_json()
    set_nested(data, key, value)
    _save_json(data)
    return {key: value}