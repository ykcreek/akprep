import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from "react";
import './App.css';

// Layout Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Loading from './pages/Loading/Loading'; 

// Public Pages
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs'; 
import FAQ from './pages/FAQ/FAQ';
import InterestForm from './pages/InterestForm/InterestForm';
import Login from './pages/Login/Login';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';

// Protected Student/Client Page
import Client from './pages/Client/Client';

// Admin Components
import Admin from './pages/Admin/Admin';
import StudentList from './components/StudentList/StudentList';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import SiteEditor from './components/SiteEditor/SiteEditor';

// Auth Context & Guards
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

function AppContent() {
  const location = useLocation();
  const { loading } = useContext(AuthContext);
  
  const isAdminRoute = location.pathname.startsWith("/admin");
  // Optional: Hide footer/navbar for client portal if you want a cleaner look
  const isClientRoute = location.pathname.startsWith("/client");

  // Global Loader: Prevents UI "flicker" during session verification
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* Navbar only shows on public and client routes */}
      {!isAdminRoute && <Navbar />}
      
      <main className={isAdminRoute ? "admin-root-container" : "site-root-container"}>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/interest-form" element={<InterestForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* --- Protected Client Route --- */}
          <Route 
            path="/client" 
            element={
              <ProtectedRoute adminOnly={false}>
                <Client />
              </ProtectedRoute>
            } 
          />

          {/* --- Protected Admin Routes (Nested) --- */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <Admin />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} /> 
            <Route path="students" element={<StudentList />} />
            <Route path="site-editor" element={<SiteEditor />} />
          </Route>

          {/* --- Fallback Redirect --- */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider> 
        <AppContent />
      </AuthProvider>
    </Router>
  );
}