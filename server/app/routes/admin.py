from flask import Blueprint, jsonify, request
from app.utils.auth_utils import require_auth
from app.utils.require_role import require_role
from app.utils.firestore_utils import firestore_get_collection, firestore_get_doc, firestore_update_doc

admin_bp = Blueprint("admin", __name__, url_prefix="/admin")


# ------------------------
# GET ALL STUDENTS (ADMIN)
# ------------------------
@admin_bp.get("/students")
@require_auth
@require_role("admin")
def get_all_students():
    students = firestore_get_collection("students")
    return jsonify(students), 200


# ------------------------
# GET SINGLE STUDENT (ADMIN)
# ------------------------
@admin_bp.get("/students/<student_id>")
@require_auth
@require_role("admin")
def get_student(student_id):
    student = firestore_get_doc("students", student_id)

    if student is None:
        return jsonify({"error": "Student not found"}), 404

    return jsonify(student), 200


# ------------------------
# UPDATE STUDENT (ADMIN)
# ------------------------
@admin_bp.patch("/students/<student_id>")
@require_auth
@require_role("admin")
def update_student(student_id):
    payload = request.json

    success = firestore_update_doc("students", student_id, payload)

    if not success:
        return jsonify({"error": "Student not found"}), 404

    return jsonify({"status": "updated"}), 200


# ------------------------
# DELETE STUDENT (ADMIN)
# ------------------------
@admin_bp.delete("/students/<student_id>")
@require_auth
@require_role("admin")
def delete_student(student_id):
    import requests
    import os

    PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID")

    url = (
        f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/"
        f"databases/(default)/documents/students/{student_id}"
    )

    res = requests.delete(url)

    if res.status_code != 200:
        return jsonify({"error": "Student not found"}), 404

    return jsonify({"status": "deleted"}), 200
