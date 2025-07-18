import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminManagers = () => {
  const [managers, setManagers] = useState([
    {
      id: '1',
      name: 'Koffi Amani',
      email: 'koffi@example.com',
      phone: '07 12 34 56',
      establishments: ['Le Bon Pain'],
      password: '••••••••'
    }
  ]);
  
  const [newManager, setNewManager] = useState({
    name: '',
    email: '',
    phone: '',
    establishments: [],
    password: '',
    confirmPassword: ''
  });
  
  const handleAddManager = () => {
    if (!newManager.name || !newManager.email || !newManager.password) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (newManager.password !== newManager.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    
    const manager = {
      id: Date.now().toString(),
      ...newManager,
      // Masquer le mot de passe dans l'affichage
      password: '••••••••'
    };
    
    setManagers([manager, ...managers]);
    setNewManager({
      name: '',
      email: '',
      phone: '',
      establishments: [],
      password: '',
      confirmPassword: ''
    });
    
    toast.success('Manager ajouté avec succès!');
  };
  
  const handleEstablishmentsChange = (e) => {
    const establishments = e.target.value
      .split(',')
      .map(est => est.trim())
      .filter(est => est !== '');
    
    setNewManager({
      ...newManager,
      establishments
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-8"
      >
        Gestion des Managers
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Ajouter un manager</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input
                type="text"
                value={newManager.name}
                onChange={(e) => setNewManager({...newManager, name: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                placeholder="Ex: Koffi Amani"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={newManager.email}
                onChange={(e) => setNewManager({...newManager, email: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                placeholder="Ex: koffi@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input
                type="text"
                value={newManager.phone}
                onChange={(e) => setNewManager({...newManager, phone: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                placeholder="Ex: 07 12 34 56"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={newManager.password}
                onChange={(e) => setNewManager({...newManager, password: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                value={newManager.confirmPassword}
                onChange={(e) => setNewManager({...newManager, confirmPassword: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Établissements assignés
                <span className="text-xs text-gray-500 ml-1">(séparés par des virgules)</span>
              </label>
              <input
                type="text"
                value={newManager.establishments.join(', ')}
                onChange={handleEstablishmentsChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                placeholder="Ex: Le Bon Pain, Café de Paris"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddManager}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
            >
              Ajouter le manager
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Managers enregistrés</h2>
          
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            {managers.map((manager, index) => (
              <motion.div 
                key={manager.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{manager.name}</h3>
                    <div className="text-sm text-gray-600 mt-1">
                      <div>{manager.email}</div>
                      <div>{manager.phone}</div>
                      <div className="mt-1">
                        <span className="text-gray-700">Mot de passe:</span> {manager.password}
                      </div>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setManagers(managers.filter(m => m.id !== manager.id))}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </motion.button>
                </div>
                
                <div className="mt-3">
                  <h4 className="font-medium text-gray-700">Établissements:</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {manager.establishments.map(est => (
                      <motion.span 
                        key={est} 
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800 text-sm rounded-full shadow-sm"
                      >
                        {est}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminManagers;