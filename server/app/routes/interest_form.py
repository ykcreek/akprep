from flask import Blueprint, request, jsonify, current_app
from app.utils.email_utils import send_intake_email
from app.models.student import save_student_to_db

interest_form = Blueprint("interest-form", __name__, url_prefix="/interest-form")

@interest_form.route("/submit-form", methods=["POST"])
def submit_interest_form():
    try:
        form = request.get_json()

        student_id = save_student_to_db(form)
        print(f"Saved student with ID: {student_id}")

        #send_intake_email(form, current_app)

        return jsonify({
            "success": True,
            "message": "Intake submitted",
            "studentId": student_id
        }), 200

    except Exception as e:
        print("Intake Error:", e)
        return jsonify({"error": str(e)}), 500
