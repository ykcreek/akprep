import stripe
from flask import current_app

def init_stripe():
    stripe.api_key = current_app.config["STRIPE_SECRET_KEY"]

def get_all_products_with_prices():
    """
    Fetch all active Stripe products + their prices.
    Returns a clean, frontend-friendly dict.
    """
    init_stripe()

    products = stripe.Product.list(active=True)
    prices = stripe.Price.list(active=True, expand=["data.product"])

    # Build map of product → prices
    product_map = {}
    for price in prices.data:
        product = price.product

        if product.id not in product_map:
            product_map[product.id] = {
                "id": product.id,
                "name": product.name,
                "description": product.get("description", ""),
                "images": product.images,
                "prices": []
            }

        product_map[product.id]["prices"].append({
            "id": price.id,
            "unit_amount": price.unit_amount,
            "currency": price.currency,
            "recurring": price.recurring
        })
    return list(product_map.values())
