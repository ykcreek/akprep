import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet, useLocation } from 'react-router-dom'; 
import "./Admin.css";

export default function Admin() {
  const location = useLocation();

  // Check if we are exactly on "/admin" (not /admin/students)
  // This prevents the "Welcome" text from staying on screen when a sub-page is active
  const isIndex = location.pathname === "/admin" || location.pathname === "/admin/";

  return (
    <div className="admin-page-layout">
      <Sidebar />
      
      <main className="admin-content">
        <div className="admin-scroll-container">

           <Outlet /> 
        </div>
      </main>
    </div>
  );
}