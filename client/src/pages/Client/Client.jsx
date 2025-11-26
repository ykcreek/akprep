// src/pages/ClientPortal.jsx
import React, { useState } from 'react'
import ClientLayout from '../../components/Client/ClientLayout/ClientLayout'
import FileUpload from '../../components/Client/FileUpload/FileUpload'
import FileList from '../../components/Client/FileList/FileList'
import MessageThread from '../../components/Client/MessageThread/MessageThread'
import { clients } from '../../data/mockClients'
import './Client.css'   // ← new CSS file

export default function ClientPortal() {
  const [email, setEmail] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [client, setClient] = useState(null)

  const handleLogin = (e) => {
    e.preventDefault()
    const foundClient = clients[email.toLowerCase().trim()]
    if (foundClient) {
      setClient(foundClient)
      setIsLoggedIn(true)
    } else {
      alert('No account found with that email. Check your payment confirmation email!')
    }
  }

  // Show login if not logged in
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Client Portal</h1>
            <p>Enter your email to access your files & messages</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
            <button type="submit" className="login-btn">
              Continue →
            </button>
          </form>

          <div className="login-footer">
            <small>
              Only paid clients can access this portal.<br />
              Purchased recently? Check your confirmation email.
            </small>
          </div>
        </div>
      </div>
    )
  }

  // Logged in → show full portal
  return (
    <ClientLayout clientName={client.name}>
      <div className="portal-grid">
        <div className="welcome-card">
          <h2>Welcome back, {client.name.split(' ')[0]}!</h2>
          <div className="package-badge">
            {client.package} • Paid ${client.amount}
          </div>
        </div>

        <FileUpload />
        <FileList title="Your Uploaded Files" files={client.theirFiles} />
        <FileList title="Files From Coach" files={client.yourFiles} downloadable />
        <MessageThread messages={client.messages} clientName={client.name.split(' ')[0]} />
      </div>
    </ClientLayout>
  )
}