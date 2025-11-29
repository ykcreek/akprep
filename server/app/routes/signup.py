# signup.py
from flask import Blueprint, request, jsonify
import requests
import os
from app.utils.firestore_utils import create_firebase_user, save_user_to_firestore, email_exists

PROJECT_ID = os.getenv("PROJECT_ID")
API_KEY = os.getenv("API_KEY")

signup_bp = Blueprint("signup", __name__, url_prefix="/signup")

@signup_bp.route("", methods=["POST"])
def signup():
    try:
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")
        document_id = data.get("documentId")  
        name = data.get("name")


        if not email or not password or not document_id:
            return jsonify({"error": "Missing email, password, or documentId"}), 400

        if email_exists(email):
            return jsonify({"error": "Email already registered"}), 409
        print("Email not found in Firestore, proceeding with signup.")
        auth_data = create_firebase_user(email, password)
        uid = auth_data["localId"]
        print("Created Firebase user with UID:", uid)
        save_user_to_firestore(uid, name, email, role="student", linked_form_id=document_id)
        print("Saved user to Firestore with UID:", uid)
        return jsonify({
            "status": "success",
            "uid": uid,
            "email": email
        }), 200

    except Exception as e:
        print("Signup error:", e)
        return jsonify({"error": str(e)}), 500
