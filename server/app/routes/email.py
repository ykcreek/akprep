from flask import Blueprint, request, jsonify, current_app
from flask_mail import Message
from app.config import mail

email_bp = Blueprint("email", __name__, url_prefix="/email")

@email_bp.route("/send-email", methods=["POST"])
def send_email_route():
    try:
        data = request.get_json()

        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        topic = data.get("topic", "General Inquiry").strip()
        message = data.get("message", "").strip()

        # Validate required fields
        if not name or not email or not message:
            return jsonify({"error": "Missing required fields"}), 400

        # Build the email
        subject = f"{topic} — From {name}"
        recipient = current_app.config["MAIL_USERNAME"] 

        body = f"""
            New message from VitaPrep contact form:

            Name: {name}
            Email: {email}
            Subject: {topic}

            Message:
            {message}

            ---
            Sent from Vita Prep contact page
            """

        msg = Message(
            subject=subject,
            recipients=[recipient],
            body=body,
            reply_to=email  # so you can reply directly
        )

        mail.send(msg)

        return jsonify({"success": True, "message": "Email sent successfully!"}), 200

    except Exception as e:
        print("Email sending error:", e)
        return jsonify({"error": "Email failed to send"}), 500
