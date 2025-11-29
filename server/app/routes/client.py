from flask import Blueprint, request, jsonify
from app.utils.auth_utils import require_auth
import requests
import os

client_bp = Blueprint("client", __name__, url_prefix="/client")

PROJECT_ID = os.getenv("PROJECT_ID")

@client_bp.route("/info", methods=["POST"])
@require_auth
def get_client_info():
    try:
        data = request.get_json()
        uid = data.get("uid")

        if not uid:
            return jsonify({"error": "Missing UID"}), 400

        user_url = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents/users/{uid}"
        user_res = requests.get(user_url)

        if user_res.status_code != 200:
            return jsonify({"error": "User account not found"}), 404

        user_fields = user_res.json().get("fields", {})
        linked_form_id = user_fields.get("linkedFormId", {}).get("stringValue")

        if not linked_form_id:
            return jsonify({"error": "No linked form found for this user"}), 404

        # 2. Fetch the student's interest form using linkedFormId
        student_url = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents/students/{linked_form_id}"
        student_res = requests.get(student_url)

        if student_res.status_code != 200:
            return jsonify({"error": "Student intake form not found"}), 404

        student_fields = student_res.json().get("fields", {})

        # Convert Firestore REST → normal dict
        student = {}
        for key, value in student_fields.items():
            vtype = list(value.keys())[0]   # stringValue / booleanValue / integerValue etc.
            student[key] = value[vtype]

        student["id"] = linked_form_id

        return jsonify({"student": student}), 200

    except Exception as e:
        print("Client info error:", e)
        return jsonify({"error": "Server error"}), 500


@client_bp.route("/update-profile", methods=["POST"])
@require_auth
def update_profile():
    """
    Update student profile.
    Frontend sends: { documentId, ...fields }
    """

    data = request.get_json()
    document_id = data.get("documentId")

    if not document_id:
        return jsonify({"error": "Missing documentId"}), 400

    # ---- Allowed fields to update ----
    allowed_fields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "gpa",
        "sat",
        "act",
        "extracurriculars"
    ]

    update_fields = {}

    # Build Firestore field format
    for field in allowed_fields:
        if field in data and data[field] is not None:
            update_fields[field] = {"stringValue": str(data[field])}

    if not update_fields:
        return jsonify({"error": "No valid fields to update"}), 400

    # ---- PATCH URL for Firestore ----
    url = (
        f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}"
        f"/databases/(default)/documents/students/{document_id}"
        f"?updateMask.fieldPaths=" + "&updateMask.fieldPaths=".join(update_fields.keys())
    )

    payload = {"fields": update_fields}

    res = requests.patch(url, json=payload)

    if res.status_code not in (200, 201):
        print("Firestore update error:", res.text)
        return jsonify({"error": "Failed to update profile"}), 500

    # Clean Firestore format
    fields = res.json().get("fields", {})
    cleaned = {k: v.get(list(v.keys())[0]) for k, v in fields.items()}
    cleaned["id"] = document_id

    return jsonify({
        "success": True,
        "student": cleaned
    }), 200