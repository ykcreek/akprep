from flask import Blueprint, request, jsonify, redirect, current_app
import stripe

payments_bp = Blueprint("payments", __name__, url_prefix="/payments")

@payments_bp.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    try:
        data = request.form
        price_id = data.get("priceId")

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="payment",
            line_items=[{"price": price_id, "quantity": 1}],
            success_url=f"{current_app.config["YOUR_DOMAIN"]}?success=true",
            cancel_url=f"{current_app.config["YOUR_DOMAIN"]}?canceled=true",
        )

        return redirect(session.url, code=303)

    except Exception as e:
        print("❌ Checkout session error:", e)
        return jsonify({"error": str(e)}), 500

