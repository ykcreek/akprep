from flask import Blueprint, jsonify, request
from app.utils.auth_utils import require_auth

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.route("/check", methods=["POST"])
@require_auth
def check_auth():
    return jsonify({"authenticated": True}), 200