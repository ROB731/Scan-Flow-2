import React from 'react';
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminEstablishments from './AdminEstablishments';
import AdminManagers from './AdminManagers';
import AdminSettings from './AdminSettings'; // Import ajouté
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminSpace = () => {
  const location = useLocation();
  
  // Redirection vers le dashboard
  if (location.pathname === '/admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminSpace />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="establishments" element={<AdminEstablishments />} />
        <Route path="managers" element={<AdminManagers />} />
        <Route path="settings" element={<AdminSettings />} /> {/* Nouvelle route ajoutée */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;