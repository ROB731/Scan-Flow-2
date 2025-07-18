import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CategoryCard = ({ 
  category, 
  onSelect, 
  isSelected,
  onUpdate,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(category.name);

  const handleSave = () => {
    if (newName.trim()) {
      onUpdate(category.id, { name: newName });
      setIsEditing(false);
    }
  };
  
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected 
          ? 'border-orange-500 bg-orange-50 shadow-inner' 
          : 'border-gray-200 hover:border-orange-300'
      }`}
      onClick={() => !isEditing && onSelect(category)}
    >
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className="bg-green-500 text-white px-3 py-2 rounded-r-md hover:bg-green-600 transition"
          >
            ✓
          </motion.button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{category.name}</h3>
          <div className="flex space-x-2">
            <motion.button 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="text-blue-500 hover:text-blue-700 p-1"
              aria-label="Modifier"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(category.id);
              }}
              className="text-red-500 hover:text-red-700 p-1"
              aria-label="Supprimer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CategoryCard;