import React from 'react';
import { NavLink } from 'react-router-dom';

const CashierSidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-orange-600">Espace Caissier</h1>
      </div>
      <nav className="p-4 space-y-1">
        <NavLink 
          to="/cashier/dashboard" 
          className={({isActive}) => 
            `block p-3 rounded-md ${isActive ? 'bg-orange-100 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          📊 Tableau de bord
        </NavLink>
        
        <NavLink 
          to="/cashier/orders" 
          className={({isActive}) => 
            `block p-3 rounded-md ${isActive ? 'bg-orange-100 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          🛒 Gestion des commandes
        </NavLink>
        
        <NavLink 
          to="/cashier/summary" 
          className={({isActive}) => 
            `block p-3 rounded-md ${isActive ? 'bg-orange-100 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          📝 Point de la journée
        </NavLink>
      </nav>
    </div>
  );
};

export default CashierSidebar;