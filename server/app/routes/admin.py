from flask import Blueprint, jsonify, request
from app.utils.auth_utils import require_auth
from app.utils.require_role import require_role
from app.utils.firestore_utils import firestore_get_collection, firestore_get_doc, firestore_update_doc
from app.utils.email_utils import send_plan_change_email

admin_bp = Blueprint("admin", __name__, url_prefix="/admin")

@admin_bp.get("/students")
@require_auth
@require_role("admin")
def get_all_students():
    students = firestore_get_collection("students")
    return jsonify(students), 200


@admin_bp.get("/students/<student_id>")
@require_auth
@require_role("admin")
def get_student(student_id):
    student = firestore_get_doc("students", student_id)

    if student is None:
        return jsonify({"error": "Student not found"}), 404

    return jsonify(student), 200


@admin_bp.route("/update-plan", methods=["POST"])
@require_auth
@require_role("admin")
def update_plan():
    """
    Admin updates a student's plan.
    Expected JSON:
    {
        "studentId": "abc123",
        "plan": "starter" | "growth" | "premium",
        "name": "John Doe",
        "email": "john@example.com"
    }
    """

    data = request.get_json()

    student_id = data.get("studentId")
    new_plan = data.get("plan")
    name = data.get("name")
    email = data.get("email")

    # --- Validate Input ---
    if not student_id or not new_plan:
        return jsonify({"error": "Missing studentId or plan"}), 400

    if not name or not email:
        return jsonify({"error": "Missing student name or email"}), 400

    # --- Update Firestore ---
    update_result = firestore_update_doc(
        collection="students",
        doc_id=student_id,
        data={"plan": new_plan}
    )

    if not update_result.get("success"):
        return jsonify({"error": update_result.get("error")}), 500

    updated_student = update_result["data"]

    # --- Send Email Notification ---
    try:
        send_plan_change_email(name, email, new_plan)
    except Exception as e:
        print("Email sending failed:", e)

    # --- Response ---
    return jsonify({
        "success": True,
        "student": updated_student,
        "message": f"Plan updated to {new_plan}"
    }), 200