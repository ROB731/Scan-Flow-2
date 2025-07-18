import React from 'react';
import { motion } from 'framer-motion';
const OrderStatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch(status) {
      case 'pending':
        return { 
          text: 'En attente', 
          color: 'bg-orange-100 text-orange-800',
          icon: '⏳'
        };
      case 'preparation':
        return { 
          text: 'En préparation', 
          color: 'bg-blue-100 text-blue-800',
          icon: '👨‍🍳'
        };
      case 'ready':
        return { 
          text: 'Prête', 
          color: 'bg-green-100 text-green-800',
          icon: '✅'
        };
      case 'completed':
        return { 
          text: 'Terminée', 
          color: 'bg-gray-100 text-gray-800',
          icon: '📦'
        };
      default:
        return { 
          text: status, 
          color: 'bg-gray-100 text-gray-800',
          icon: '❓'
        };
    }
  };
  const config = getStatusConfig();
  return (
    <motion.span 
      whileHover={{ scale: 1.05 }}
      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${config.color}`}
    >
      <span className="mr-1">{config.icon}</span>
      {config.text}
    </motion.span>
  );
};
export default OrderStatusBadge;