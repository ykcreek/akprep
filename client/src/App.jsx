import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import StudentForm from './pages/StudentForm/StudentForm'
import Calendar from './pages/Calendar/Calendar'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import Login from './pages/Login/Login'
import Signup from './pages/SignUp/SignUp'
import Client from './pages/Client/Client'
import { useState } from 'react'

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <>
      {!isAdmin && <Navbar />}
      <div className="main-layout">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student-form" element={<StudentForm />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin"
            element={
              isAuthenticated && localStorage.getItem("role") === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/client"
            element={
              isAuthenticated && localStorage.getItem("role") === "student" ? (
                <Client />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
      {!isAdmin && <Footer />}
    </>
  )
}

export default App