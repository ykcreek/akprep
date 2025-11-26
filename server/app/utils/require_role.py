# require_role.py

import requests
from flask import request, jsonify
from functools import wraps
import os

PROJECT_ID = os.getenv("PROJECT_ID")
API_KEY = os.getenv("API_KEY")

def get_user_role(uid):
    """Fetch role from Firestore using REST (no service account)"""

    url = (
        f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}"
        f"/databases/(default)/documents/users/{uid}"
    )

    res = requests.get(url)
    data = res.json()

    if "fields" not in data:
        return None

    return data["fields"]["role"]["stringValue"]


def require_role(required_role):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            if not hasattr(request, "user"):
                return jsonify({"error": "Authentication required"}), 401

            uid = request.user["uid"]
            role = get_user_role(uid)
            print("🔥 Firestore role for UID:", uid, "=", role)

            if role != required_role:
                return jsonify({"error": "Unauthorized"}), 403

            return f(*args, **kwargs)
        return wrapper
    return decorator
