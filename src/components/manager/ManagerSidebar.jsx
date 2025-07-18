import React from 'react';
import { NavLink } from 'react-router-dom';
const ManagerSidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-orange-600">Espace Manager</h1>
      </div> 
      <nav className="p-4 space-y-1">
        <NavLink 
          to="/manager/dashboard" 
          className={({isActive}) => 
            `block p-3 rounded-md ${isActive ? 'bg-orange-100 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          📊 Tableau de bord
        </NavLink>
        
        <NavLink 
          to="/manager/menu" 
          className={({isActive}) => 
            `block p-3 rounded-md ${isActive ? 'bg-orange-100 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          📋 Gestion du Menu
        </NavLink>
        <NavLink 
          to="/manager/orders" 
          className={({isActive}) => 
            `block p-3 rounded-md ${isActive ? 'bg-orange-100 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          🛒 Commandes
        </NavLink>
        <NavLink 
          to="/manager/statistics" 
          className={({isActive}) => 
            `block p-3 rounded-md ${isActive ? 'bg-orange-100 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          📈 Statistiques
        </NavLink>
      </nav>
    </div>
  );
};
export default ManagerSidebar;