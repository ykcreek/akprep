import React, { useState, useEffect } from "react";
import "./Checkout.css";

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Handle Stripe redirect messages
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) setMessage("Order placed! Check your email.");
    if (query.get("canceled")) setMessage("Order canceled.");

    // Fetch Stripe products
    fetch(`${import.meta.env.VITE_API_URL}/stripe/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        }
      });
  }, []);

  if (message) return <p>{message}</p>;

  return (
    <section className="simple-checkout">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <img
            src={p.images?.[0] || "https://via.placeholder.com/150"}
            alt={p.name}
            className="product-image"
          />

          <div className="product-info">
            <h3>{p.name}</h3>
            <p>{p.description}</p>

            {/* Show all prices (supports subscriptions too) */}
            {p.prices.map((price) => (
              <form
                key={price.id}
                action={`${import.meta.env.VITE_API_URL}/payments/create-checkout-session`}
                method="POST"
              >
                <input type="hidden" name="priceId" value={price.id} />
                <button type="submit" className="checkout-button">
                  Buy for ${(price.unit_amount / 100).toFixed(2)}
                </button>
              </form>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
