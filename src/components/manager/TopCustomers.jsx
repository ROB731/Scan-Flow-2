import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../LoadingSpinner';
import { useEstablishment } from '../../contexts/EstablishmentContext';

const TopCustomers = () => {
  const [topCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const establishmentId = useEstablishment();

  useEffect(() => {
    // Simulation de données pour le développement
    const mockCustomers = [
      { id: '1', name: 'Client Premium', orderCount: 12, totalSpent: 125000 },
      { id: '2', name: 'Client Fidèle', orderCount: 8, totalSpent: 85000 },
      { id: '3', name: 'Nouveau Client', orderCount: 5, totalSpent: 45000 },
      { id: '4', name: 'Client Occasionnel', orderCount: 3, totalSpent: 28000 },
      { id: '5', name: 'Client Entreprise', orderCount: 7, totalSpent: 65000 },
    ];

    const fetchTopCustomers = async () => {
      try {
        setLoading(true);
        
        // Simulation de délai
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setTopCustomers(mockCustomers);
      } catch (err) {
        setError('Erreur de chargement des données');
        console.error('Erreur TopCustomers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCustomers();
  }, [establishmentId]);

  if (loading) {
    return (
      <motion.div 
        className="mt-8 bg-white rounded-xl shadow-sm p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-xl font-semibold mb-4">Meilleurs Clients</h2>
        <div className="flex justify-center py-8">
          <LoadingSpinner size="md" />
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="mt-8 bg-white rounded-xl shadow-sm p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-xl font-semibold mb-4">Meilleurs Clients</h2>
        <div className="text-center py-6 text-red-500">
          <p>Erreur: {error}</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow"
            onClick={() => window.location.reload()}
          >
            Réessayer
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (topCustomers.length === 0) {
    return (
      <motion.div 
        className="mt-8 bg-white rounded-xl shadow-sm p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-xl font-semibold mb-4">Meilleurs Clients</h2>
        <div className="text-center py-6 text-gray-500">
          <p>Aucune donnée de client disponible</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="mt-8 bg-white rounded-xl shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4">Meilleurs Clients</h2>
      <div className="space-y-4">
        <AnimatePresence>
          {topCustomers.map((customer, index) => (
            <motion.div
              key={`${customer.id}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { delay: 0.1 * index } 
              }}
              exit={{ opacity: 0 }}
              whileHover={{ backgroundColor: "#f9fafb" }}
              className="flex items-center justify-between p-3 rounded-lg transition-colors duration-300"
            >
              <div className="flex items-center">
                <div className="mr-3 w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow">
                  <motion.span
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="text-orange-600 font-medium"
                  >
                    {index + 1}
                  </motion.span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {customer.name || `Client #${customer.id.slice(0, 6)}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {customer.orderCount} commande{customer.orderCount > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">
                  {customer.totalSpent?.toLocaleString() || '0'} FCFA
                </p>
                <p className="text-sm text-gray-500">Total dépensé</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TopCustomers;