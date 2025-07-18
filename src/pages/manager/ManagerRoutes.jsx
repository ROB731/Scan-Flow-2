import React from 'react';
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import ManagerDashboard from './ManagerDashboard';
import MenuManagement from './MenuManagement';
import OrdersManagement from './OrdersManagement';
import StatisticsPage from './StatisticsPage';
import ManagerSidebar from '../../components/manager/ManagerSidebar';
import { EstablishmentProvider } from '../../contexts/EstablishmentContext';
// const ManagerSpace = () => {
//   const location = useLocation();
//   const { user } = useAuth(); 

//   if (location.pathname === '/manager') {
//     return <Navigate to="/manager/dashboard" replace />;
//   }
//   // Valeur par défaut pour établissement
//   const establishmentId = user?.establishmentId || 'default-establishment-id';
//   return (
//     <EstablishmentProvider value={establishmentId}>
//       <div className="flex min-h-screen">
//         <ManagerSidebar />
//         <div className="flex-1">
//           <div className="container mx-auto px-4 py-8">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </EstablishmentProvider>
//   );
// };
const ManagerSpace = () => {
  const location = useLocation();
  if (location.pathname === '/manager') {
    return <Navigate to="/manager/dashboard" replace />;
  }
  const establishmentId = 'default-establishment-id'; 
  return (
    <EstablishmentProvider value={establishmentId}>
      <div className="flex min-h-screen">
        <ManagerSidebar />
        <div className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <Outlet />
          </div>
        </div>
      </div>
    </EstablishmentProvider>
  );
};
const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ManagerSpace />}>
        <Route path="dashboard" element={<ManagerDashboard />} />
        <Route path="menu" element={<MenuManagement />} />
        <Route path="orders" element={<OrdersManagement />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default ManagerRoutes;