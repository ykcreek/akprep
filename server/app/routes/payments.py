from flask import Blueprint, request, jsonify, redirect, current_app
import stripe

payments_bp = Blueprint("payments", __name__, url_prefix="/payments")

@payments_bp.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    try:
        stripe.api_key = current_app.config["STRIPE_SECRET_KEY"]

        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    "price": "price_1SXWWwGhATuEVVspK0A1xjut",
                    "quantity": 1,
                }
            ],
            mode="payment",
            success_url=current_app.config["YOUR_DOMAIN"] + "?success=true",
        )

        return redirect(checkout_session.url, code=303)

    except Exception as e:
        return jsonify({"error": str(e)}), 400
