from flask import Blueprint, jsonify
from app.utils.stripe_utils import get_all_products_with_prices

stripe_bp = Blueprint("stripe_bp", __name__, url_prefix="/stripe")

@stripe_bp.route("/products", methods=["GET"])
def list_products():
    try:
        products = get_all_products_with_prices()
        return jsonify({"success": True, "products": products}), 200
    except Exception as e:
        print("❌ Stripe product fetch failed:", e)
        return jsonify({"success": False, "error": str(e)}), 500
