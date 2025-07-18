import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRScanner from '../../components/QRScanner';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [showScanner, setShowScanner] = useState(false);
  const navigate = useNavigate();

  const handleScanSuccess = (data) => {
    try {
      const parsedData = JSON.parse(data);
      if (parsedData.establishmentId) {
        navigate(`/menu/${parsedData.establishmentId}`);
      }
    } catch (error) {
      console.error('Invalid QR code data', error);
    }
  };

  // Données des services
  const services = [
    {
      id: 1,
      title: "Menu Principal",
      description: "Découvrez notre sélection culinaire complète",
      image: "/images/restaurant.jpg"
    },
    {
      id: 2,
      title: "Desserts & Boissons",
      description: "Sélection de douceurs et rafraîchissements",
      image: "/images/patisserie.jpg"
    },
    {
      id: 3,
      title: "Menu Spécial",
      description: "Nos créations exclusives du moment",
      image: "/images/bar.jpg"
    },
    {
      id: 4,
      title: "Offres Promotionnelles",
      description: "Découvrez nos formules avantageuses",
      image: "/images/cafe.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Image de fond avec superposition sombre */}
        <div className="absolute inset-0">
          <div className="bg-black bg-opacity-60 absolute inset-0 z-10"></div>
          <div 
            className="bg-cover bg-center w-full h-full" 
            style={{ backgroundImage: "url('/images/digital-menu.jpg')" }}
          ></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center px-4 max-w-4xl"
        >
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600"
          >
            Menu Digital
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
          >
            L'expérience de commande réinventée - Rapide, intuitive et sans contact
          </motion.p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowScanner(true)}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-xl"
          >
            Scanner le QR Code
          </motion.button>
        </motion.div>
        
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="mb-2">Découvrez nos fonctionnalités</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Services Section */}
      <div className="py-20 px-4 max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl text-center mb-16"
        >
          Notre Solution Complète
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -15 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl"
            >
              <div className="h-56 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-110" 
                  style={{ backgroundImage: `url(${service.image})` }}
                ></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <div className="text-amber-500 font-medium flex items-center opacity-70">
                  Disponible via QR Code
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* QR Section */}
      <div className="py-20 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
          >
            <div className="bg-gray-700 p-8 rounded-2xl shadow-xl">
              <h3 className="text-3xl mb-6">Comment ça marche ?</h3>
              <p className="text-gray-300 mb-6">
                Notre solution Menu Digital transforme l'expérience de commande :
                scannez le QR code, accédez au menu digital et commandez en quelques clics.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Interface intuitive et moderne</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Mise à jour des menus en temps réel</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Système de paiement intégré</span>
                </li>
              </ul>
              <button
                onClick={() => setShowScanner(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
              >
                Essayer maintenant
              </button>
            </div>
          </motion.div>
          
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
        </div>
      </div>
      
      {/* Scanner Modal */}
      {showScanner && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-bold mb-4 text-center">Scanner QR Code</h3>
            <QRScanner onScanSuccess={handleScanSuccess} />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowScanner(false)}
              className="mt-4 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg w-full transition-all duration-200"
            >
              Annuler
            </motion.button>
          </motion.div>
        </motion.div>
      )}
      
      {/* Footer */}
      <footer className="py-10 px-4 border-t border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold">Menu Digital</div>
              <p className="text-gray-400 mt-2">Solution de commande digitale</p>
            </div>
            <div className="text-gray-400 text-center">
              Technologie sans contact - Solution clé en main
            </div>
          </div>
          <div className="mt-10 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Menu Digital. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;