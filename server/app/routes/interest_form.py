from flask import Blueprint, request, jsonify
from app.utils.email_utils import send_intake_email, send_student_signup_email
from app.models.student import save_student_to_db

interest_form = Blueprint("interest-form", __name__, url_prefix="/interest-form")

@interest_form.route("/submit-form", methods=["POST"])
def submit_interest_form():
    try:
        form = request.get_json()

        student_id = save_student_to_db(form)
        print(f"Saved student with ID: {student_id}")

        send_intake_email(form)
        first = form.get("firstName")
        last = form.get("lastName")
        full_name = f"{first} {last}"

        send_student_signup_email(
            form.get("email"),
            full_name,
            student_id
        )
        return jsonify({
            "success": True,
            "message": "Intake submitted",
            "studentId": student_id
        }), 200

    except Exception as e:
        print("Intake Error:", e)
        return jsonify({"error": str(e)}), 500
