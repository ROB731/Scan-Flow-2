import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      <div className="py-20 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center">
        
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-500 to-amber-700 w-64 h-64 rounded-xl flex items-center justify-center shadow-2xl">
                <div className="bg-black w-48 h-48 rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-1 w-40 h-40">
                    {[...Array(9)].map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ 
                          opacity: [0.3, 1, 0.3],
                          backgroundColor: ['#3f3f46', '#d97706', '#3f3f46']
                        }}
                        transition={{ 
                          duration: 1.5,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        className="w-full h-full"
                      ></motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 border-2 border-amber-500 rounded-xl opacity-50"></div>
              <div className="absolute -inset-8 border-2 border-amber-500 rounded-xl opacity-30"></div>
            </div>
          </motion.div>
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 py-30"
          >
            ScanFlow
          </motion.h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;