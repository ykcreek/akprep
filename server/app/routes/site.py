# app/routes/site.py
from flask import Blueprint, request, jsonify
from app.utils.auth_utils import require_auth
from app.models.site_content import (
    get_all_site_content,
    update_site_content
)
from app.utils.require_role import require_role

site_bp = Blueprint("site", __name__, url_prefix="/site")

@site_bp.get("/content")
def get_content():
    try:
        content = get_all_site_content()
        return jsonify({
            "success": True,
            "content": content
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@site_bp.route("/update", methods=["POST"])
@require_auth
@require_role("admin")
def update_content():
    try:
        data = request.get_json()
        key = data.get("key")      
        value = data.get("value")

        if not key or value is None:
            return jsonify({"error": "Missing key or value"}), 400

        updated = update_site_content(key, value)

        return jsonify({
            "success": True,
            "updated": updated
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
