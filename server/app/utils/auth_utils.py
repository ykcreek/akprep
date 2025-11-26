import requests
from flask import request, jsonify
from functools import wraps
import os

API_KEY = os.getenv("API_KEY")

if not API_KEY:
    raise ValueError("Missing FIREBASE_API_KEY environment variable")


def verify_firebase_token(id_token: str):
    """Verify Firebase ID token using REST API (no service account required)"""

    url = f"https://identitytoolkit.googleapis.com/v1/accounts:lookup?key={API_KEY}"

    res = requests.post(url, json={"idToken": id_token})
    data = res.json()

    # If ID token is invalid
    if "users" not in data:
        return None

    user_info = data["users"][0]

    # Extract only useful fields
    return {
        "uid": user_info.get("localId"),
        "email": user_info.get("email"),
        "emailVerified": user_info.get("emailVerified"),
        "provider": user_info.get("providerUserInfo", [{}])[0].get("providerId"),
        "full_raw": user_info,   # in case you need more
    }


def require_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        token = auth_header.replace("Bearer ", "").strip()

        if not token:
            return jsonify({"error": "Missing token"}), 401

        user_data = verify_firebase_token(token)
        if not user_data:
            return jsonify({"error": "Invalid or expired token"}), 401

        # Attach user to request context
        request.user = user_data

        return f(*args, **kwargs)

    return wrapper
