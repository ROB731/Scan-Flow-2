import React from 'react';
import { motion } from 'framer-motion';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const totalPrice = (item.price + item.options.reduce((sum, opt) => sum + opt.price, 0)) * item.quantity;
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-4 border-b border-gray-200"
    >
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-start flex-1">
          {item.image && (
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-16 h-16 object-cover rounded-md mr-3"
            />
          )}
          <div className="flex-1">
            <h3 className="font-medium">{item.name}</h3>
            {item.options.length > 0 && (
              <div className="text-sm text-gray-600 mt-1">
                {item.options.map(opt => (
                  <div key={opt.id}>{opt.name} (+{opt.price.toLocaleString()} FCFA)</div>
                ))}
              </div>
            )}
            {item.notes && (
              <div className="text-sm text-gray-600 mt-1">
                Note: {item.notes}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="font-medium text-right">{totalPrice.toLocaleString()} FCFA</div>
          <div className="flex items-center mt-2">
            <div className="flex items-center border border-gray-300 rounded-md">
              <motion.button
                whileHover={{ backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                className="px-2 py-1 text-gray-600"
                disabled={item.quantity <= 1}
              >
                -
              </motion.button>
              <span className="px-2 py-1 min-w-[30px] text-center">{item.quantity}</span>
              <motion.button
                whileHover={{ backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                className="px-2 py-1 text-gray-600"
              >
                +
              </motion.button>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onRemove(item.cartId)}
              className="ml-3 text-red-500 hover:text-red-700 p-1"
              aria-label="Supprimer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;