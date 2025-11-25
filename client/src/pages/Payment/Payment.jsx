import React from 'react'
import './Payment.css'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { FaCheck, FaLock } from 'react-icons/fa'

const stripePromise = loadStripe('pk_test_51YourRealKeyHere')

const packages = [
  { id: 'starter', title: 'Starter Pack', hours: '5 hours', price: 400, bonus: null, rate: null, popular: false },
  { id: 'growth', title: 'Growth Pack', hours: '10 hours', bonus: '+1 bonus hour', price: 750, popular: true },
  { id: 'premium', title: 'Premium Pack', hours: '20 hours', bonus: '+4 bonus hours', rate: '~$67/hr', price: 1340, popular: false }
]

// THIS IS THE FORM THAT USES STRIPE – MUST BE INSIDE <Elements>
function CheckoutForm({ pkg }) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = React.useState(false)
  const [succeeded, setSucceeded] = React.useState(false)
  const [customerInfo, setCustomerInfo] = React.useState({
    firstName: '', lastName: '', email: ''
  })

  React.useEffect(() => {
  const timer = setTimeout(() => {
    setCustomerInfo({ firstName: 'Alex', lastName: 'Chen', email: 'alex@example.com' })
    setSucceeded(true)
  }, 5000)
  return () => clearTimeout(timer)
}, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)
    const card = elements.getElement(CardElement)

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        email: customerInfo.email,
      },
    })

    if (error) {
      alert(error.message)
      setProcessing(false)
    } else {
      console.log('Success!', paymentMethod)
      setProcessing(false)
      setSucceeded(true)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      {/* === ALL YOUR FORM CONTENT (unchanged) === */}
      <div className="customer-info">
        <h3>Your Information</h3>
        <div className="name-row">
          <input required placeholder="First name" value={customerInfo.firstName} onChange={e => setCustomerInfo({...customerInfo, firstName: e.target.value})} />
          <input required placeholder="Last name" value={customerInfo.lastName} onChange={e => setCustomerInfo({...customerInfo, lastName: e.target.value})} />
        </div>
        <input required type="email" placeholder="Email address (receipt sent here)" value={customerInfo.email} onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})} />
      </div>

      <div className="order-summary">
        <h3>Your Order</h3>
        <div className="summary-item">
          <div>
            <strong>{pkg.title}</strong>
            {pkg.bonus && <span className="bonus-tag">{pkg.bonus}</span>}
            {pkg.rate && <span className="rate-tag">{pkg.rate}</span>}
          </div>
          <div className="price">${pkg.price}</div>
        </div>
        <div className="total">
          <span>Total</span>
          <strong>${pkg.price}</strong>
        </div>
      </div>

      <div className="payment-details">
        <h3>Card Details</h3>
        <div className="card-element-container">
          <CardElement options={{
            style: { base: { fontSize: '16px', color: '#2d2d2d', '::placeholder': { color: '#94a3b8' } } }
          }} />
        </div>
        <div className="security-notice">
          <FaLock /> Secure • Powered by Stripe
        </div>

        <button
          type="submit"
          disabled={!stripe || processing || succeeded}
          className={`pay-button ${processing ? 'processing' : ''} ${succeeded ? 'succeeded' : ''}`}
        >
          {succeeded ? (
            <>
              <div className="success-checkmark"><div className="check-icon-large"></div></div>
              <span className="success-text">Payment Successful!</span>
            </>
          ) : processing ? (
            <>
              <div className="spinner"></div> Processing...
            </>
          ) : (
            <>Pay ${pkg.price} securely</>
          )}
        </button>
      </div>

      {/* SUCCESS MODAL */}
      {succeeded && (
        <div className="success-modal-overlay" onClick={() => setSucceeded(false)}>
          <div className="success-modal" onClick={e => e.stopPropagation()}>
            <div className="success-modal-content">
              <div className="success-icon-wrapper">
  <svg width="110" height="110" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="44" fill="#a78bfa" opacity="0.2"/>
    <circle cx="50" cy="50" r="44" fill="none" stroke="#a78bfa" strokeWidth="8"
            strokeDasharray="276" strokeDashoffset="276">
      <animate attributeName="stroke-dashoffset" from="276" to="0" dur="0.9s" fill="freeze"/>
    </circle>
    <path d="M28,52 L45,69 L74,34" fill="none" stroke="#ffffff" strokeWidth="11"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="60" strokeDashoffset="60">
      <animate attributeName="stroke-dashoffset" from="60" to="0" dur="0.6s" begin="0.7s" fill="freeze"/>
    </path>
  </svg>
</div>
              <h2>Payment Successful!</h2>
              <p>Thank you, <strong>{customerInfo.firstName}</strong>!</p>
              <p>You've secured the <strong>{pkg.title}</strong> package.</p>
              <p className="receipt-note">
                A receipt has been sent to <strong>{customerInfo.email}</strong>
              </p>
              <button onClick={() => setSucceeded(false)} className="modal-close-btn">
                Continue
              </button>
            </div>
            <div className="confetti-container">
              {[...Array(80)].map((_, i) => (
                <div
                  key={i}
                  className="confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 1.2}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                />
              ))}
          </div>
          </div>
        </div>
      )}
    </form>
  )
}

// MAIN PAGE – wraps CheckoutForm with <Elements>
export default function Payment() {
  const [selected, setSelected] = React.useState(packages[1])

  return (
    <section className="payment-page">
      <div className="container">
        <div className="payment-header">
          <h1>Complete Your Purchase</h1>
          <p>One-time payment • Instant access • 100% secure</p>
        </div>

        <div className="payment-layout">
          {/* Package Selector */}
          <div className="packages-sidebar">
            <h3>Choose Package</h3>
            {packages.map(pkg => (
              <div
                key={pkg.id}
                className={`package-option ${selected.id === pkg.id ? 'selected' : ''} ${pkg.popular ? 'popular' : ''}`}
                onClick={() => setSelected(pkg)}
              >
                {pkg.popular && <div className="popular-badge">Most Popular</div>}
                <div className="package-header">
                  <h4>{pkg.title}</h4>
                  {selected.id === pkg.id && <FaCheck className="check-icon" />}
                </div>
                <p className="hours">{pkg.hours}</p>
                {(pkg.bonus || pkg.rate) && (
                  <div className="tags">
                    {pkg.bonus && <span className="bonus">{pkg.bonus}</span>}
                    {pkg.rate && <span className="rate">{pkg.rate}</span>}
                  </div>
                )}
                <div className="package-price">${pkg.price}</div>
              </div>
            ))}
          </div>

          {/* Checkout Area – NOW PROPERLY WRAPPED */}
          <div className="checkout-area">
            <Elements stripe={stripePromise}>
              <CheckoutForm pkg={selected} />
            </Elements>
          </div>
        </div>
      </div>
    </section>
  )
}