import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="relative">
      <motion.div
        className={`${sizes[size]} rounded-full border-4 border-t-orange-500 border-r-orange-500 border-b-orange-300 border-l-orange-300`}
        animate={{ 
          rotate: 360,
          borderWidth: ['4px', '8px', '4px'],
        }}
        transition={{ 
          rotate: { 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "linear" 
          },
          borderWidth: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      />
      <motion.div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        animate={{ 
          rotate: -360,
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className={`${sizes[size] === 'w-8 h-8' ? 'w-4 h-4' : 
                         sizes[size] === 'w-12 h-12' ? 'w-6 h-6' : 'w-8 h-8'} 
                         bg-orange-500 rounded-full`} />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;