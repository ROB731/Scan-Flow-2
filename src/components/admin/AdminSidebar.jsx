import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiPieChart, FiHome, FiUsers, FiSettings } from 'react-icons/fi';

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-orange-600">Espace Admin</h1>
      </div>
      <nav className="p-4 space-y-1">
        <NavLink 
          to="/admin/dashboard" 
          className={({isActive}) => 
            `flex items-center p-3 rounded-md transition-all ${
              isActive 
                ? 'bg-orange-100 text-orange-600 font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <FiPieChart className="mr-2 text-lg" />
          📊 Tableau de bord
        </NavLink>
        
        <NavLink 
          to="/admin/establishments" 
          className={({isActive}) => 
            `flex items-center p-3 rounded-md transition-all ${
              isActive 
                ? 'bg-orange-100 text-orange-600 font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <FiHome className="mr-2 text-lg" />
          🏢 Établissements
        </NavLink>
        
        <NavLink 
          to="/admin/managers" 
          className={({isActive}) => 
            `flex items-center p-3 rounded-md transition-all ${
              isActive 
                ? 'bg-orange-100 text-orange-600 font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <FiUsers className="mr-2 text-lg" />
          👤 Gestion des Managers
        </NavLink>
        
        {/* Nouveau lien pour les paramètres */}
        <NavLink 
          to="/admin/settings" 
          className={({isActive}) => 
            `flex items-center p-3 rounded-md transition-all ${
              isActive 
                ? 'bg-orange-100 text-orange-600 font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <FiSettings className="mr-2 text-lg" />
          ⚙️ Paramètres
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;