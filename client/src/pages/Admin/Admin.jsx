// src/pages/Admin/Admin.jsx
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout/AdminLayout';
import StatsCards from '../../components/Admin/StatsCard/StatsCard';
import ClientsPanel from '../../components/Admin/ClientsPanel/ClientsPanel';
import FilesPanel from '../../components/Admin/FilesPanel/FilesPanel';
import MessagesPanel from '../../components/Admin/MessagesPanel/MessagesPanel';
import { clients, messages, clientFiles } from '../../data/mockData';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'college2025';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClientId, setSelectedClientId] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('adminLoggedIn') === 'true') setIsLoggedIn(true);
  }, []);

  const selectedClient = clients.find(c => c.id === selectedClientId);

  const totalRevenue = clients.reduce((s, c) => s + c.amount, 0);
  const monthlyRevenue = clients
    .filter(c => {
      const now = new Date();
      return c.date.getMonth() === now.getMonth() && c.date.getFullYear() === now.getFullYear();
    })
    .reduce((s, c) => s + c.amount, 0);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true');
    } else {
      setError('Wrong password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    setActiveTab('overview');
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-fullpage-login">
        <div className="login-card">
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Enter</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-wrapper">
      <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
        {activeTab === 'overview' && (
          <>
            <StatsCards totalRevenue={totalRevenue} monthlyRevenue={monthlyRevenue} totalClients={clients.length} totalMessages={messages.length} />
            <div className="grid-2">
              <ClientsPanel clients={clients} selectedClient={selectedClientId} onSelectClient={setSelectedClientId} />
              <div>
                <FilesPanel clientName={selectedClient?.name || 'Select client'} files={selectedClientId ? clientFiles[selectedClientId] || [] : []} />
                <MessagesPanel messages={messages} />
              </div>
            </div>
          </>
        )}
        {activeTab === 'clients' && <ClientsPanel clients={clients} selectedClient={selectedClientId} onSelectClient={setSelectedClientId} fullWidth />}
        {activeTab === 'files' && (selectedClient ? <FilesPanel clientName={selectedClient.name} files={clientFiles[selectedClientId]} /> : <p className="empty">Select a client first</p>)}
        {activeTab === 'messages' && <MessagesPanel messages={messages} />}
      </AdminLayout>
    </div>
  );
}