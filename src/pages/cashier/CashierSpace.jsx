import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import CashierSidebar from '../../components/cashier/CashierSidebar';
import { useAuth } from '../../contexts/AuthContext';

const CashierSpace = () => {
  const { currentUser } = useAuth(); // Changé de 'user' à 'currentUser'
  
  // Vérification du rôle et redirection
  if (!currentUser || currentUser.role !== 'cashier') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CashierSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CashierSpace;