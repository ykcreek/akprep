import React, { useState, useEffect } from "react";
import "./Checkout.css"; // Optional: add your own styles

const ProductDisplay = () => (
  <section className="simple-checkout">
    <div className="product-card">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="Stubborn Attachments"
        className="product-image"
      />
      <div className="product-info">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00 USD</h5>
        <p>A fantastic book by Tyler Cowen</p>
      </div>
    </div>

    {/* This form POSTs directly to your Flask backend */}
    <form action="http://127.0.0.1:4242/create-checkout-session" method="POST">
      <button type="submit" className="checkout-button">
        Checkout with Stripe
      </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section className="message-section">
    <div className="message-card">
      <h2>Payment Status</h2>
      <p>{message}</p>
      <a href="/" className="back-link">← Back to Home</a>
    </div>
  </section>
);

export default function Checkout() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      setMessage("Order canceled — continue shopping when you're ready.");
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
}